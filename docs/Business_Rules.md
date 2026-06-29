# BUSINESS_RULES.md

# Business Rules

## Project Overview

**Laste Wahdek** is a healthcare platform that connects mothers with pediatricians and child-development specialists.

The platform focuses on:

* Child healthcare follow-up
* Online consultations
* Monthly subscription plans
* Child medical records
* Appointment management
* Long-term treatment tracking

The platform is designed around security, trust, and simplicity.

---

# User Roles

The system currently supports three roles.

## Mother

A mother can:

* Create an account.
* Verify email.
* Login.
* Manage her profile.
* Manage multiple children.
* Upload child images.
* View medical records.
* Book appointments.
* Subscribe to a monthly plan.
* View consultation history.

---

## Doctor

A doctor can:

* Register.
* Upload professional certificates.
* Wait for approval.
* Login only after approval.
* Manage appointments.
* View assigned mothers.
* View child medical profiles.
* Upload consultation reports.

---

## Admin (Planned)

The admin will:

* Approve doctors.
* Reject doctors.
* Manage subscriptions.
* Manage platform users.
* View analytics.
* Moderate uploaded content.
* have access and overall view to the current working platform

---

# Registration Rules

## Mother Registration

After registration:

* Email verification is required.
* Profile is automatically active after verification.
* Mother can immediately access the dashboard.

---

## Doctor Registration

Doctor registration requires:

* Personal information.
* Professional information.
* Certificate upload.

After submission:

* Status becomes:

Pending Approval

The doctor cannot access the dashboard until approved.

---

# Authentication Rules

Authentication is handled by Supabase Auth.

Protected pages require an authenticated session.

Role-based authorization determines which dashboard is accessible.

Users must never access dashboards belonging to another role.

---

# Children Rules

Each mother may have multiple children.

Each child has:

* Name
* Birth date
* Medical summary
* Profile image

Every child owns exactly one active profile image.

---

## Child Images

Image requirements:

* JPG
* JPEG
* PNG
* WEBP

Maximum size:

1 MB

Images are validated before upload.

Images are stored using the pattern:

images/{childId}/avatar.{extension}

Only one image should exist for a child.

Uploading a new image replaces the old one.

Old avatar files are cleaned automatically.

Deleting a child removes:

* Database row
* Storage images

No orphan files should remain.

---

# Medical Records

Every child owns one medical profile.

Medical information belongs to the child.

Doctors may update records after consultations.

Medical history should remain chronological.

Previous reports must never be silently overwritten.

---

# Appointments

Appointments are created automatically according to:

* Mother's availability
* Doctor's availability

The system should prevent:

* Double booking
* Overlapping appointments
* Booking outside working hours

Appointments belong to exactly one:

* Mother
* Child
* Doctor

---

# Consultation Sessions

Every consultation session has a strict duration.

Maximum duration:

30 minutes

Session duration is enforced regardless of subscription package.



# Subscription Rules

Subscriptions are monthly.

A mother may have only one active subscription.

Changing plans updates future monthly limits.

Expired subscriptions remove booking privileges until renewed.



## Current Plans

### Essential Care

* 2 sessions / month

Includes:

* Educational articles
* Automatic booking
* Appointment reminders

---

### Integrated Support

* 4 sessions / month

Includes:

* Assessment reports
* Home action plans
* Child medical profile

---

### Comprehensive Care

* 6 sessions / month

Includes:

* Consultant reports
* External report uploads
* Comprehensive treatment plans

---

# Session Consumption

Booking a consultation reserves one session.

Cancelled appointments should follow platform cancellation policy.

Completed appointments consume one session.

Sessions reset when a new billing cycle begins.

---

# Doctor Capacity

Every doctor has a maximum patient capacity.

New bookings must respect this capacity.

The system must prevent assigning new families once capacity is reached.

## Doctor Availability & Appointment Scheduling

## Overview

The appointment system is built around the doctor's availability.

Instead of administrators manually assigning appointments, each doctor defines the time slots during which they are available to conduct consultation sessions.

Mothers can only book appointments within these available time slots.

---

## Doctor Availability

After a doctor's account has been approved by the administrator, the doctor gains access to an Availability Management section inside the dashboard.

The doctor can configure availability in a flexible way.

Examples include:

- Every Monday from 5:00 PM to 9:00 PM
- Tuesday and Thursday from 10:00 AM to 2:00 PM
- Weekends only
- A custom schedule for a specific week
- A custom schedule for an entire month

The doctor should be able to:

- Add new availability periods.
- Edit existing availability.
- Delete availability.
- Temporarily disable specific dates.
- Mark vacations or days off.

The system should never require administrators to manage doctor schedules.

---

## Time Slots

The system automatically divides each availability period into consultation slots.

Current business rule:

- Every consultation session lasts exactly **30 minutes**.

Example:

Availability:
09:00 → 12:00

Generated slots:

- 09:00
- 09:30
- 10:00
- 10:30
- 11:00
- 11:30

Only available slots are shown to mothers.

---

## Booking Rules

A mother cannot manually enter a time.

Instead, she:

1. Selects the doctor.
2. Chooses one of the available dates.
3. Chooses one of the generated available time slots.

Once booked:

- The slot becomes unavailable.
- Double-booking is impossible.
- Other mothers immediately stop seeing that slot.

---

## Availability Updates

If the doctor edits future availability:

- Existing appointments must remain unchanged.
- Only unbooked future slots may be regenerated.

Doctors cannot delete or modify time slots that already contain confirmed appointments.

---

## Flexibility

The scheduling system should support future enhancements without requiring major redesign.

Potential future capabilities include:

- Weekly recurring schedules.
- Monthly recurring schedules.
- One-time custom schedules.
- Holidays.
- Vacation mode.
- Breaks during the day.
- Different session durations (future feature).
- Buffer time between sessions (future feature).

---

## Design Goal

The scheduling experience should be intuitive for both doctors and mothers.

Doctors should feel that they are managing their own calendar naturally, similar to Google Calendar or Microsoft Outlook, without needing technical knowledge.

Mothers should only see appointment times that are actually available, making the booking process simple and error-free.

## Scheduling Principles

The availability calendar is the single source of truth for appointments.

Appointments must never be created outside the doctor's availability.

Availability generates bookable time slots.

Appointments consume those slots.

If a slot is booked, it cannot be booked again until the appointment is cancelled or completed.

# Storage Rules

Storage buckets:

* images
* certificates

Certificates are immutable.

Profile images may be replaced.

Storage should never contain orphan files.

---
# Consultation Method

All consultations on the platform are conducted through an integrated video calling system built directly into the platform.

The platform does not use third-party meeting links such as:

- Zoom
- Google Meet
- Microsoft Teams
- Skype

Appointments create an in-platform consultation room that is accessible only to the assigned doctor and the assigned mother.

Only authenticated users participating in the appointment may join the call.

The video consultation is considered part of the medical platform experience rather than an external meeting.

Future enhancements may include:

- Screen sharing
- Live chat
- File sharing
- Session recording (subject to legal requirements)
- Live captions
- Connection quality indicators

An appointment has the following lifecycle:

Scheduled
↓

Waiting Room Open
↓

Doctor Joined
↓

Mother Joined
↓

Consultation Started
↓

Consultation Completed
↓

Medical Report Submitted
↓

Appointment Closed
# Security Rules

All database access must be protected by RLS.

Sensitive operations should use secure server-side functions when necessary.

Client-side validation improves UX but never replaces backend validation.

Every uploaded file must be validated before storage.

---

# Performance Rules

Prefer optimistic UI only when consistency can be guaranteed.

Avoid unnecessary network requests.

Prevent duplicate uploads.

Disable actions while uploads are running.

Cache should always be invalidated after image replacement.

---

# Error Handling

Users should receive friendly error messages.

Internal errors should be logged only in development.

Never expose database or storage internals to users.

---

# UX Rules

Every loading operation should provide feedback.

Uploads should display progress or loading indicators.

Editable images should visually indicate they are editable.

Validation errors should explain:

* Allowed image types
* Maximum file size

---

# Internationalization

Every user-facing string must support:

* English
* Arabic

No hardcoded UI text should exist.

Layouts must fully support RTL.

---

# Future Business Rules

The following modules are planned and should follow the same principles:

* Payment Gateway
* Subscription Renewal
* Admin Dashboard
* Notifications
* Real-time Messaging
* Consultation Reports
* Child Growth Tracking
* Medical File Uploads
* Analytics
* Audit Logs

---

# Core Project Principles

Every new feature should respect the following priorities:

1. Security
2. Data Integrity
3. Performance
4. Maintainability
5. User Experience
6. Accessibility
7. Consistency
8. Scalability

No feature should compromise these principles.
