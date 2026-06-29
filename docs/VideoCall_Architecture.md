
## Purpose

The platform provides secure online medical consultations between mothers and doctors.

Video consultations are conducted entirely inside the platform.

The platform will not rely on external meeting providers such as:

- Zoom
- Google Meet
- Microsoft Teams
- Skype

The video consultation is considered part of the appointment workflow.

---

# Business Requirements

Every consultation belongs to exactly one appointment.

Every appointment has exactly one doctor.

Every appointment has exactly one mother.

Only authenticated participants assigned to the appointment may join.

A consultation can only start during its scheduled appointment window.

The consultation ends automatically when the appointment is completed or cancelled.

---

# Participants

Doctor

Mother

(No guests)

No public invitations.

No anonymous access.

---

# Appointment Flow

Scheduled

↓

Waiting Room

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

---

# Security Requirements

Users must be authenticated.

Users must be authorized for the appointment.

Meeting rooms must never be publicly accessible.

Meeting identifiers must not be guessable.

Communication must be encrypted.

Only appointment participants may access media streams.

---

# Future Features

Screen sharing

In-call chat

Connection quality indicator

Camera and microphone controls

Waiting room

File sharing

Session timer

Session recording (optional)

Live captions (optional)

AI transcription (future)

---

# Technology

Technology has not yet been selected.

Candidate technologies include:

- LiveKit
- WebRTC
- Daily.co
- Twilio Video

The implementation will be chosen after evaluating:

- Scalability
- Security
- Performance
- Cost
- Ease of integration with Next.js and Supabase