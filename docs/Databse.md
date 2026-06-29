Database Architecture Reference (Supabase Postgres)

1) Overview
This project uses Supabase Postgres with:

Auth: Supabase Auth is enabled and backed by tables in the auth schema.
Public API tables: Application data lives in the public schema.
Row Level Security (RLS): Application tables use RLS to restrict access per authenticated user.
Storage: Files are stored via Supabase Storage tables in the storage schema, also protected by RLS policies.
Realtime: Realtime internals exist in realtime schema (plus snapshot tables under realtime.messages_*).*_

2) Schemas
auth
Supabase-managed authentication and session tables.

Key tables include:

auth.users
auth.sessions
auth.refresh_tokens
auth.identities
various MFA / OAuth / SSO tables (many may be empty depending on usage)
public
Application tables.

Currently observed application tables:

public.profiles
public.doctor_details
public.doctor_certificates
public.children
storage
Supabase-managed storage tables:

storage.buckets
storage.objects
multipart upload support tables
analytics/vector related bucket/index tables
realtime
Realtime internal tables + message storage:

realtime.messages
realtime.subscription
plus multiple partition-like tables: realtime.messages_YYYY_MM_DD

3) Core Data Model (Application Tables in public)
3.1 public.profiles (user profile “hub”)
Purpose

Base profile record for every user.
Distinguishes role between:
mother
doctor
Columns (high level)

id (UUID, PK)
role (text, constrained to 'mother' | 'doctor')
status (default 'active')
full_name, national_id, phone, birth_date
chronic_diseases (text[])
psychological_status (constrained set)
clinical_history
created_at
Important relationships (FKs)

public.profiles.id ↔ auth.users.id
3.2 public.doctor_details (doctor-specific profile)
Purpose

Stores additional doctor metadata.
Columns (high level)

id (UUID, PK)
gender (constrained: 'male' | 'female')
specialization, scientific_degree, title
medical_license_number (unique)
bio
status (default 'pending_approval')
full_name
Relationships (FKs)

public.doctor_details.id ↔ public.profiles.id
(FK named doctor_details_id_fkey)
3.3 public.doctor_certificates (certificate files metadata)
Purpose

Metadata about uploaded doctor certificate files.
Columns (high level)

id (UUID, PK)
doctor_id (UUID)
file_path (unique)
file_name
uploaded_at (default now())
Relationships (FKs)

public.doctor_certificates.doctor_id → public.doctor_details.id
3.4 public.children (mother-linked child records)
Purpose

Stores children records associated with a mother profile.
Columns (high level)

id (UUID, PK)
profile_id (UUID FK to profiles.id)
full_name, birth_date
medical_summary (nullable)
image_url (text, nullable)
created_at (UTC-normalized via timezone('utc', now()))
Relationships (FKs)

public.children.profile_id → public.profiles.id

4) Authentication & “Who is a user?”
Auth identity
Every authenticated user has an auth.users.id UUID.
App records link back to auth.users.id via:
public.profiles.id → auth.users.id
JWT helpers used in policies
RLS policies use Supabase helpers like:

auth.uid() – current user UUID
auth.role() – current auth role (e.g. authenticated)

5) Authorization Model (RLS)
What RLS means here
RLS is enabled on the application tables listed above (public.*).
Access is controlled by policies using USING and (for writes) WITH CHECK.*
Below are the RLS policies that were observed from your project.

5.1 Policies on public.profiles
Policy: Users read own profile

Command: SELECT
Roles: public
Condition: (auth.uid() = id)
Policy: Users read own doctor details

Command: SELECT
Roles: public
Condition: (auth.uid() = id)
Policy: profiles_insert_own

Command: INSERT
Roles: authenticated
WITH CHECK: (auth.uid() = id)
Policy: profiles_update_own

Command: UPDATE
Roles: authenticated
USING: (auth.uid() = id)
WITH CHECK: (auth.uid() = id)
Implication

Users can only read/write their own profiles row.
5.2 Policies on public.doctor_details (observed via policy output)
Policy: doctors_select_certificates

Command: SELECT
Roles: public
Condition: (auth.uid() = doctor_id)
(Note: this policy name suggests certificates access, but the output indicates doctor_id-based condition.)
Implication

Doctor-related data is intended to be scoped by user ownership (doctor ID).
5.3 Policies on public.doctor_certificates
No explicit public.doctor_certificates policies were shown in the policy dump snippet you provided, but access is likely mediated via:

ownership relations to doctor_id
and storage policies for certificate file access
5.4 Policies on public.children
Policy: Mothers can manage their own children

Command: ALL
Roles: public
Condition: (auth.uid() = profile_id)
Implication

Children rows are fully accessible (read/write/delete) only to the mother who owns profile_id.

6) Storage Authorization (RLS + Bucket/Object Policies)
Your Storage policies include access scoped to buckets and filenames.

Bucket/object table context
Storage objects are represented by:

storage.objects (with bucket_id, name, owner_id, etc.)
Policies observed
Policy: doctors_storage_select_own

Command: SELECT
Roles: authenticated
Condition:
bucket_id = 'certificates'
and current user matches the first path segment from the object name
Policy: doctors_storage_delete_own

Command: DELETE
Roles: authenticated
Condition:
bucket_id = 'certificates'
and current user matches the first path segment from the object name
Policy: final_hope_doctor_upload_policy

Command: INSERT
Roles: anon, authenticated
WITH CHECK:
bucket_id = 'certificates'
check_is_pending_doctor(split_part(name, '/', 1))
(meaning: only allow uploads when the uploader/doctor is pending approval)
Policy: doctors_storage_insert_pending

Command: INSERT
Roles: anon, authenticated
WITH CHECK includes:
bucket must be certificates
filename first segment must match UUID regex format
user referenced by that UUID must exist in public.profiles with:
role = 'doctor'
status = 'pending_approval'
Image bucket policies (bucket images)

Enable Access to authenticated users ...
Roles: public
Commands: SELECT, INSERT, UPDATE, DELETE
Condition:
bucket_id = 'images'
and auth.role() = 'authenticated'
Implications

Doctor certificates are guarded by doctor approval state and strict naming conventions.
Images are open to authenticated users for CRUD within the images bucket.

7) Realtime
Your project uses Supabase Realtime internals:

realtime.subscription (contains subscription metadata)
realtime.messages and multiple realtime.messages_* tables*_
Realtime access control (if you use it for app tables) is typically enforced at the application table level via RLS and/or Postgres grants.

8) Installed Extensions (DB-wide)
This project has many Postgres extensions installed, including (not exhaustive):

pgcrypto, pgjwt, pg_cron
spatial: postgis
search: pg_trgm, pgroonga, rum
performance/monitoring: pg_stat_statements
queue: pgmq
vector support: vector
Supabase-specific: supabase_vault (via vault schema)

9) Summary of “Authenticated User Permissions”
User identity mapping
User UUID: auth.users.id
App profile row: public.profiles.id = auth.users.id
Effective behavior (based on observed policies)
Profiles
Users can read/update their own public.profiles row
Insert/update is restricted to auth.uid() = id
Children
The owning mother can CRUD public.children rows where profile_id = auth.uid()
Doctor-related storage
Certificate upload to certificates bucket is restricted to doctors with status = pending_approval
Access is scoped by how the object name is structured (UUID in first path segment)
Images
Authenticated users can CRUD objects within images bucket
