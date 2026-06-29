When implementing features:

Never rewrite working code.

Never introduce unnecessary abstractions.

Prefer extending the existing architecture.

Keep components small.

Respect the current folder structure.

Always explain why changes are needed.

Prefer performance, security, maintainability and readability equally.

Do not replace existing UI unless requested.

Maintain the current visual language.

Avoid introducing new state management libraries.

Prefer React Hook Form, TanStack Query and Supabase patterns already used in the project.
## 🌍 Internationalization (i18n)

The platform is fully bilingual and supports both **English** and **Arabic**.

### Translation System

- All user-facing text should come from the centralized translation file.
- Avoid hardcoding strings inside components whenever possible.
- New features should always include both English and Arabic translations.
- The UI must remain fully functional in both languages.

### Current Implementation

- Locale management is handled through `LocaleContext`.
- Translation data is stored in a centralized translation file.
- The application supports:
  - 🇺🇸 English (LTR)
  - 🇪🇬 Arabic (RTL)

### UI Rules

- Every new page or component must be translation-ready.
- Text alignment, spacing, and layouts should respect RTL when Arabic is active.
- Icons should remain visually consistent in both directions unless directional icons require flipping.
- Dates, numbers, and labels should follow the active locale whenever possible.


### AI Instructions

When generating code:
- Never hardcode UI text.
- Always retrieve labels from the translation file.
- Preserve compatibility with both Arabic and English.
- Keep component APIs language-agnostic.

## 🎨 Design Consistency

The project follows a consistent design language.

Every new page or component should:
- Reuse existing UI components whenever possible.
- Follow the current dashboard spacing and border radius.
- Match the existing color palette.
- Use the same animation style (Framer Motion).
- Prefer composition over creating duplicate components.
- Avoid introducing a different visual language.

## ⚠️ Project Philosophy

This project is being actively refactored.

Priority order for all future work:

1. Security
2. Performance
3. Maintainability
4. UX
5. New Features

The project intentionally avoids unnecessary abstractions.

When modifying code:
- Preserve the existing architecture.
- Do not rewrite working code for style only.
- Prefer the smallest safe change.
- Keep business logic inside feature services.
- Keep components focused on presentation.
- Maintain consistency with the existing codebase.

# Coding Standards

General Rules

- TypeScript Strict Mode.
- Avoid `any` whenever possible.
- Prefer explicit types.
- Keep functions focused on one responsibility.
- Remove unused imports and dead code.
- Prefer async/await over promise chains.
- Use early returns instead of nested conditions.
- Handle errors with user-friendly messages.
- Never expose internal errors to users.

React Rules

- Prefer functional components.
- Use React Hook Form for forms.
- Use TanStack Query for server state.
- Avoid unnecessary useEffect calls.
- Memoize only when profiling justifies it.

Supabase Rules

- Keep Row Level Security enabled.
- Validate all uploads before storage.
- Use deterministic storage paths.
- Never trust client-side validation alone.

# Architecture Principles

The project follows a feature-oriented architecture.

Guidelines:

- Pages should remain thin.
- Business logic belongs inside feature services.
- Validation belongs in Zod schemas.
- API communication belongs in services.
- Components should focus on rendering.
- Shared UI should only be extracted when it clearly improves maintainability.
- Avoid circular dependencies.
- Keep imports feature-local whenever possible.