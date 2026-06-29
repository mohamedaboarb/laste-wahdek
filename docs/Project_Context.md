# PROJECT_CONTEXT.md

# Laste Wahdek (لست وحدك)

## Project Context

---

# Project Overview

**Laste Wahdek** is a modern medical platform that connects mothers with pediatricians and child psychology specialists through secure online consultations.

The platform focuses on providing continuous medical follow-up rather than one-time appointments.

The project is designed around security, simplicity, maintainability, and an excellent user experience.

---

# Business Vision

The platform provides one integrated ecosystem where a mother can:

* Create an account
* Build her family's medical profile
* Register multiple children
* Subscribe to a healthcare package
* Get matched with qualified specialists
* Book consultation sessions
* Attend secure online appointments
* Receive reports and treatment plans
* Track her children's medical history

Doctors use a separate dashboard to:

* Register professionally
* Upload verification documents
* Manage availability
* Conduct consultations
* Upload medical reports
* Receive ratings
* Track earnings

Administrators are responsible for:

* Reviewing doctor registrations
* Approving or rejecting specialists
* Managing platform content
* Monitoring system health
* Handling exceptional cases

---

# User Types

## Mother

Capabilities

* Register using Email or Google OAuth
* Manage personal profile
* Manage children profiles
* Upload children photos
* Subscribe to healthcare packages
* Book appointments
* Join online consultations
* View medical records
* Download doctor reports
* Submit ratings and reviews

---

## Doctor

Capabilities

* Professional registration
* Upload certificates
* Wait for approval
* Manage working hours
* Accept appointments
* Conduct consultations
* Upload reports
* Receive ratings
* Track earnings

---

## Administrator (Planned)

Capabilities

* Approve doctors
* Reject registrations
* Request document resubmission
* Manage subscriptions
* Monitor platform activity
* Handle disputes

---

# Business Workflows

## Mother Journey

1. Register
2. Confirm email
3. Complete profile
4. Add children
5. Subscribe
6. Payment
7. Doctor matching
8. Appointment booking
9. Consultation
10. Medical report
11. Rating

---

## Doctor Journey

1. Register
2. Upload professional documents
3. Await approval
4. Configure schedule
5. Receive appointments
6. Conduct consultation
7. Upload diagnosis/report
8. Receive payment

---

# Subscription Model

Current packages

## Essential Care

* 2 sessions/month
* Educational resources
* Automatic booking
* Reminder notifications

---

## Integrated Support (Featured)

* 4 sessions/month
* Weekly consultations
* Medical reports
* Home action plans
* Unified Child Medical Profile

---

## Comprehensive Care

* 6 sessions/month
* Advanced reports
* External report uploads
* Comprehensive treatment plans
* Monthly consultant report

Payments are planned but are not yet implemented.

---

# Technical Stack

Frontend

* Next.js App Router
* React 19
* TypeScript
* Tailwind CSS v4
* Framer Motion
* Radix UI
* shadcn/ui

Backend

* Supabase
* PostgreSQL
* Supabase Auth
* Supabase Storage
* Row Level Security
* RPC Functions

State Management

* React Context
* TanStack Query
* React Hook Form

Validation

* Zod

Package Manager

* pnpm

---

# Architecture

The project follows a feature-oriented architecture.

```
app/
features/
components/
contexts/
hooks/
lib/
supabase/
docs/
```

Business logic lives inside **features/**.

Shared UI lives inside **components/**.

Pages remain thin wrappers.

Services handle Supabase communication.

Schemas contain validation.

Reusable UI components are shared only when they clearly improve maintainability.

---

# Authentication

Current authentication

* Email & Password
* Google OAuth

Authorization

* Supabase Auth
* Row Level Security
* Protected dashboard routes

Doctors

New doctors register with

pending_approval

They cannot access the doctor dashboard until approved.

Mothers become active immediately after email verification.

---

# Database

Known tables

* profiles
* children
* doctor_details
* doctor_certificates

Additional tables are planned for

* subscriptions
* appointments
* payments
* notifications
* reports

---

# Storage Architecture

Buckets

```
images/
certificates/
```

Children images

```
images/{childId}/avatar.{extension}
```

Doctor certificates

```
certificates/{doctorId}/...
```

---

# Child Image Upload Architecture

The image upload system has been extensively redesigned.

Goals

* secure uploads
* deterministic storage
* no duplicate avatars
* race-condition prevention
* immediate preview
* cache-safe updates

Upload Flow

1. Validate MIME type
2. Validate extension
3. Validate file size
4. Upload avatar
5. Update database
6. Update React Hook Form state
7. Trigger cache busting
8. Cleanup old avatar extensions

Only one logical avatar exists per child.

---

# Image Security

Implemented protections

* MIME validation
* Extension whitelist
* Maximum file size validation
* Upload locking
* Save button disabled during uploads
* Immediate preview
* Deterministic file naming
* No user-controlled filenames
* Automatic cleanup
* Browser cache protection

---

# Cache Busting Strategy

The platform uses two cache layers.

Layer 1

```
cacheControl: no-cache
```

Layer 2

```
?v=image_version
```

image_version is temporary.

It exists only inside React Hook Form state.

It is never stored in the database.

---

# UI / UX Language

Primary Color

```
#d11765
```

Secondary

```
#fb9b8f
```

Background

```
#fffbf0
```

Dashboard

Light theme only.

Design philosophy

* rounded cards
* soft shadows
* generous spacing
* subtle animations
* medical aesthetic
* friendly interactions

The project intentionally no longer supports Dark Mode.

-----------------------------------------------------------------------------------------------

# Internationalization

The platform is fully localized.

Supported languages:

* English (LTR)
* Arabic (RTL)

Localization is implemented using a centralized translation file and the `LocaleContext`.

Rules:

* Never hardcode user-facing text.
* Every new feature must include translations for both languages.
* Components should remain language-agnostic.
* Layouts must support both LTR and RTL directions.
* Dates, labels, placeholders, and validation messages should respect the active locale.

---

# Design Principles

Every screen should prioritize

* simplicity
* accessibility
* visual clarity
* immediate feedback
* predictable interactions

Loading states

* Skeletons
* Spinners
* Optimistic updates

Error handling

* Friendly messages
* Toast notifications
* Graceful recovery

---

# Development Philosophy

The project intentionally avoids over-engineering.

Priorities

1. Security
2. Maintainability
3. Readability
4. Performance
5. User Experience

Prefer

* explicit code
* small components
* feature-oriented structure
* reusable components only when justified

Avoid

* unnecessary abstractions
* premature optimization
* rewriting working code
* introducing new architectural patterns without clear value

---

# Current Feature Status

## Completed

* Authentication
* Google OAuth
* Password recovery
* Mother profile
* Children management
* Child image upload
* Dashboard sidebar
* Landing page
* Localization (AR/EN)
* Secure storage flow
* Cache busting
* Upload synchronization
* Upload cleanup
* Race-condition prevention

---

## In Progress

* Subscription Dashboard
* Appointment Dashboard
* Medical Records
* Doctor Dashboard
* Notifications

---

## Planned

* Admin Dashboard
* Payments
* Real-time notifications
* Video consultation
* Advanced analytics
* Reports center

---

# Technical Debt

Known improvements

* Remove remaining mock data
* Commit Supabase migrations
* Remove obsolete commented code
* Enable TypeScript build validation
* Upgrade Next.js
* Complete authorization review
* Add automated testing
* Add CI/CD

---

# Project Goals

This project aims to become production-grade medical software.

Every implementation should prioritize

* security
* performance
* correctness
* maintainability
* scalability
* professional medical UX

Feature completeness should never come at the expense of architecture quality.

---

# AI Notes

Any AI assistant joining this project should:

* Understand the project before implementing anything.
* Preserve the existing architecture.
* Extend existing patterns instead of replacing them.
* Avoid introducing unnecessary abstractions.
* Never rewrite working code without a clear reason.
* Explain architectural decisions before making them.
* Treat this document and the workflow diagrams as the primary source of truth.
