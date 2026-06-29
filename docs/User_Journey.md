# USER JOURNEYS

This document describes the primary user journeys of the **Laste Wahdek** platform.

It complements the flow diagrams included in the documentation and explains how users are expected to interact with the platform from a business perspective.

---

# Platform Users

The platform currently supports three user roles:

- Mother
- Doctor
- Administrator

Each role has its own dashboard, permissions, and workflow.

---

# Mother Journey

## 1. Registration

The mother creates an account using:

- Email & Password
or
- Google Authentication

After email verification (if applicable), the account becomes active immediately.

---

## 2. Complete Personal Profile

The mother completes her profile by providing:

- Personal information
- Contact details
- Address
- Medical information (if required)

The profile can be updated at any time.

---

## 3. Add Children

The mother can create one or more child profiles.

Each child profile contains:

- Child photo
- Full name
- Birth date
- Medical summary

Child images are securely uploaded to Supabase Storage.

---

## 4. Choose a Subscription

Before booking appointments, the mother selects one of the available subscription packages.

The subscription determines:

- Number of monthly consultation sessions
- Available platform features
- Medical report capabilities
- Additional benefits

---

## 5. Book an Appointment

The mother:

1. Browses available doctors.
2. Opens a doctor's profile.
3. Selects an available date.
4. Selects one of the available time slots.
5. Confirms the booking.

The system only displays available slots generated from the doctor's schedule.

Double-booking is never allowed.

---

## 6. Appointment Reminder

Before the appointment, the system sends reminder notifications.

Examples:

- Dashboard notification
- Email reminder
- Future notification channels

---

## 7. Consultation

Mother joins the scheduled appointment.

↓

Doctor joins the same appointment.

↓

Both users enter the secure in-platform video consultation room.

↓

The consultation takes place.

↓

Doctor submits the medical report.

↓

Mother receives the report.

## 8. Consultation Report

After the appointment, the doctor submits:

- Medical observations
- Recommendations
- Treatment plan
- Follow-up notes

The report becomes available inside the mother's dashboard.

---

## 9. Subscription Renewal

When the subscription expires:

- The mother may renew.
- Upgrade.
- Downgrade.
- Cancel.

Future appointments require an active subscription.

---

# Doctor Journey

## 1. Registration

The doctor creates an account and submits:

- Personal information
- Professional details
- Medical certificates

Certificates are uploaded securely to Supabase Storage.

---

## 2. Pending Approval

New doctor accounts remain in a **Pending Approval** state.

Doctors cannot access the dashboard until approved.

---

## 3. Administrator Review

The administrator reviews:

- Identity
- Certificates
- Registration information

The application is either:

- Approved
- Rejected

---

## 4. Dashboard Access

Once approved:

The doctor receives access to the Doctor Dashboard.

---

## 5. Complete Profile

The doctor may update:

- Biography
- Specialization
- Experience
- Consultation information
- Profile image

---

## 6. Configure Availability

The doctor manages personal availability.

Examples:

- Weekly schedule
- Monthly schedule
- Custom dates
- Vacation days
- Days off

The doctor owns their calendar.

Administrators do not manage doctor schedules.

---

## 7. Appointment Management

Appointments are automatically created from available time slots.

The doctor can:

- View upcoming appointments
- View patient information
- Cancel according to business rules
- Reschedule according to future platform policies

---

## 8. Consultation

During the appointment the doctor:

- Reviews child information
- Conducts the consultation
- Records observations

---

## 9. Medical Report

After the consultation the doctor submits:

- Diagnosis
- Recommendations
- Home exercises
- Follow-up instructions

The report becomes immediately available to the mother.

---

# Administrator Journey

## Doctor Management

The administrator:

- Reviews doctor registrations
- Approves applications
- Rejects applications
- Reviews certificates

---

## Platform Management

Future responsibilities include:

- User management
- Subscription management
- Payment monitoring
- Dashboard analytics
- Reports
- Platform configuration

---

# Appointment Journey

The appointment lifecycle is:

Doctor defines availability

↓

System generates available consultation slots

↓

Mother selects a doctor

↓

Mother selects an available slot

↓

Appointment is created

↓

Slot becomes unavailable

↓

Reminder notifications are sent

↓

Consultation takes place

↓

Doctor submits medical report

↓

Mother receives report

↓

Appointment marked as completed

---

# Subscription Journey

Mother chooses subscription

↓

Payment completed

↓

Subscription activated

↓

Monthly session quota assigned

↓

Each completed consultation consumes one available session

↓

Subscription expires

↓

Mother renews or upgrades

---

# Child Profile Journey

Mother creates child profile

↓

Uploads child image

↓

Image validated

↓

Image uploaded securely

↓

Child profile saved

↓

Profile available for future consultations

↓

Doctor can reference the child's medical information during appointments

---

# Doctor Availability Journey

Doctor creates availability

↓

System validates schedule

↓

30-minute consultation slots are generated

↓

Booked slots become unavailable

↓

Future availability may be modified

↓

Existing appointments remain protected

---

# Business Rules Summary

The following principles apply across the platform:

- Doctors require administrator approval before accessing the dashboard.
- Mothers become active after successful registration and email verification.
- Every appointment belongs to exactly one doctor and one mother.
- Appointment slots originate from doctor availability.
- Double booking is never allowed.
- Each completed consultation consumes one subscription session.
- Child medical information is available only to authorized users.
- Medical reports are created only after completed consultations.
- Images and certificates are securely stored in Supabase Storage.
- Authorization is enforced through Supabase Authentication and Row Level Security (RLS).

---

# Visual Reference

Detailed platform workflows are documented visually in the accompanying diagrams.

These diagrams should be considered the primary visual reference for:

- Mother workflow
- Doctor workflow
- Appointment lifecycle
- User interactions

This document complements those diagrams by describing the business behavior in a structured, implementation-independent manner.