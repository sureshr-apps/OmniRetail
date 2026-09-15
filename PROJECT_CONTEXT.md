# OmniRetail — Project Context & Engineering Handoff

You are taking over development of **OmniRetail**, a multi-tenant retail management web application.

Read this document first, then inspect the repository thoroughly before proposing or implementing changes.

The repository is the source of truth for exact implementation details. This document provides the product and architectural intent behind it.

---

## 1. Product

OmniRetail is a multi-tenant retail management platform intended for retail businesses.

The product supports initial implementations of areas such as:

- Billing / POS
- Products
- Inventory
- Purchases
- Suppliers
- Customers
- Expenses
- Employees/users
- Stores
- Reports
- Other retail operations

These tenant-facing modules now have production-backed foundations and UI workflows. Their operational depth and integration coverage vary by module.

The currently completed area is **Platform / Master Administration**.

---

## 2. Multi-tenancy

An **Organization** represents a customer/business using OmniRetail.

Example:

`Punarva Fashion Hub`

Punarva Fashion Hub is a customer organization, **not the product name**.

Organization-owned data must always have an explicit tenant boundary.

Future organization users must never be able to access another organization's data by manipulating URLs, IDs, API parameters, Data Connect variables, etc.

Tenant isolation must ultimately be enforced server-side.

---

## 3. Current technology stack

### Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- React Router
- Lucide React
- Motion where appropriate

### Backend/platform

- Firebase
- Firebase Authentication
- Firebase Cloud Functions v2
- Firebase Data Connect / SQL Connect
- Cloud SQL for PostgreSQL
- Firebase Hosting deployed

### Current Firebase environment

- Firebase project: `omniretail-60c71`
- Primary Firebase/Data Connect region: `asia-south1`
- Cloud SQL database: `omniretail`
- Cloud SQL instance: `omniretail-sql`

---

## 4. Engineering principles

Treat this as a production application, not a prototype.

Follow:

- SOLID
- separation of concerns
- DRY
- KISS
- YAGNI
- strong typing
- feature/domain-oriented organization
- cohesive modules
- small maintainable components/services
- testability
- explicit trust boundaries

Avoid:

- huge files
- monolithic services/components
- business logic inside React presentation components
- scattered role checks
- duplicated authorization logic
- speculative abstractions
- unnecessary microservices
- frontend-only security

Prefer maintainable, extensible architecture over quick hacks.

Do not rewrite working infrastructure merely because another approach is possible.

---

## 5. UI/design rule

The existing UI was designed through Google Stitch and implemented before the production backend migration.

**The current UI is approved and is the visual source of truth.**

Do not redesign existing screens unless explicitly requested.

Preserve:

- typography
- colors
- spacing
- navigation
- forms
- tables
- cards
- badges
- dialogs
- application shell
- interaction patterns

Reuse existing components before creating new ones.

---

## 6. Role-neutral architecture

Roles must **not appear in URLs**.

Correct:

```text
/login
/overview
/organizations
/organizations/:organizationId
/organizations/:organizationId/administrators
/organizations/:organizationId/license
/plans
/profile
```

Incorrect:

```text
/master-admin/*
/super-admin/*
/admin/*
```

Routing identifies resources.

Authorization determines whether the authenticated user can access them.

---

## 7. Master Admin scope

Master Admin currently has access only to:

- Overview
- Organizations
- Plans
- Organization Administrators within an Organization
- Organization License within an Organization
- Profile / Change Password

Sidebar:

```text
Overview
Organizations
Plans
```

Profile menu contains:

- Profile
- Change Password
- Sign Out

Master Admin must NOT have tenant operational access to:

- POS
- Sales
- Inventory
- Products
- Purchases
- Suppliers
- Customers
- Expenses
- Store operations
- Cash register
- Tenant operational reports

Do not merely hide these features.

Authorization must prevent access server-side.

---

## 8. Authentication

**Firebase Authentication is the authoritative authentication/session system.**

Firebase owns:

- password credentials
- password verification
- Firebase UID
- ID tokens
- refresh/session state
- email verification state (verification is optional for application access)

Passwords/password hashes are NOT stored in application SQL.

Login accepts:

```text
Email or Username
Password
```

Email login uses Firebase email/password authentication directly.

Username login uses a trusted Cloud Function:

```text
username + password
      ↓
trusted Function
      ↓
resolve username internally
      ↓
Firebase verifies password
      ↓
custom Firebase token
      ↓
browser establishes Firebase session
```

The resolved email is not exposed to the browser.

Normal application access requires:

- authenticated Firebase user
- matching AppUser
- active AppUser
- appropriate capabilities

`emailVerified` may be false. Do not reintroduce a verified-email gate unless the product decision is explicitly changed.

---

## 9. Identity semantics

Do not conflate these identifiers:

```text
Firebase UID
    Authentication identity

AppUser.id
    Application/domain user identity

OrganizationMembership.id
    Organization membership identity
```

`AppUser.id` is the canonical application-facing user/administrator ID.

Firebase UID remains internal authentication infrastructure.

Do not expose Firebase UID to normal UI/domain operations.

---

## 10. Authorization / RBAC

Authentication and authorization are separate.

Authorization is capability based.

Do NOT scatter:

```text
if (role === "masterAdmin")
```

through components/services.

Current relational model includes concepts such as:

```text
AppUser
Role
Permission
UserRole
RolePermission
OrganizationMembership
```

Typical authorization path:

```text
Firebase auth.uid
      ↓
AppUser
      ↓
ACTIVE?
      ↓
UserRole
      ↓
Role
      ↓
RolePermission
      ↓
Permission
```

Browser-accessible Data Connect operations enforce capability checks.

Trusted lifecycle operations use Cloud Functions and server-side Data Connect/Admin SDK access.

---

## 11. Master Admin capabilities

Current capabilities include:

```text
overview.read

organizations.read
organizations.create
organizations.update
organizations.change_status

organization_admins.read
organization_admins.create
organization_admins.update
organization_admins.change_status
organization_admins.reset_password

plans.read
plans.create
plans.update
plans.change_status

licenses.read
licenses.assign
licenses.change_plan
licenses.modify_commercial_terms
licenses.renew
licenses.history.read

profile.read
profile.update
profile.change_password
```

Inspect the repository/database seed for the exact current catalogue.

---

## 12. Organizations

Organization uses an internal database identity plus a separate human-readable immutable code.

Conceptually:

```text
Organization
  id
  organizationCode
  businessName
  legalEntityName
  taxId
  primaryContactName
  email
  phone
  address
  city
  state
  timezone
  currency
  status
  createdAt
  updatedAt
```

Human-facing code:

```text
ORG-XXXXX
```

`organizationCode` is NOT the database primary key.

Current Organization statuses:

```text
ACTIVE
SUSPENDED
```

Do not introduce hard deletion as the normal workflow.

Creating an Organization creates only the organization/business/contact record.

It does NOT automatically create:

- Administrator
- Firebase Auth account
- License
- Plan assignment

Those are separate operations.

---

## 13. Organization Administrators

Organization Administrators are:

```text
Firebase Auth identity
      +
AppUser
      +
OrganizationMembership
      +
Organization Administrator role
```

Administrator operations are organization-scoped.

Production-backed functionality currently includes:

- List/get administrators
- Provision administrator
- Edit administrator
- Activate
- Deactivate
- Onboarding/setup email
- Resend onboarding
- Reset password

Provisioning uses:

- trusted Cloud Function
- Firebase Admin Auth
- SQL persistence
- compensation/reconciliation
- audit

Provisioning assigns the `organization.admin` role both on the organization membership and through the `UserRole` relation. The role is organization-scoped and is not a Master Admin role.

Firebase Auth and PostgreSQL cannot participate in the same transaction. Provisioning therefore creates the Firebase identity first, persists the SQL records in a transaction, and attempts compensating Auth cleanup if SQL persistence fails. Cleanup failures are recorded for reconciliation; duplicate usernames/emails are rejected by existing Auth and database uniqueness checks.

---

## 14. Administrator status

Deactivation:

- updates application/membership status
- disables Firebase Auth identity
- revokes refresh tokens
- records audit

Activation:

- restores application/membership status
- re-enables Firebase Auth
- records audit

Trusted Functions resolve:

```text
AppUser.id → firebaseUid
```

internally.

Firebase UID is never supplied by the browser for lifecycle operations.

---

## 15. Administrator onboarding/reset

Firebase-managed email flows are used.

Never expose:

- temporary passwords
- reset tokens
- action codes
- reset links
- Firebase UID

Password Reset:

- requires `organization_admins.reset_password`
- validates organization scope
- rejects inactive targets
- revokes refresh tokens
- sends Firebase-managed reset email
- records audit

The current administrator password-management UI supports a trusted initial-password operation; passwords are sent only to Firebase Auth and are never returned or persisted in SQL. Email verification is not required for login or application access.

---

## 16. License Plans

Plans are centrally managed by Master Admin.

Plan model:

```text
LicensePlan
  id
  name
  description
  level
  maxStores
  maxUsers
  status
  createdAt
  updatedAt
```

Plan status:

```text
ACTIVE
INACTIVE
```

`level` defines plan progression.

Current canonical development plans:

```text
Starter
Level 1
Max Stores 1
Max Users 5

Professional
Level 2
Max Stores 5
Max Users 25

Enterprise
Level 3
Max Stores 20
Max Users 100
```

Plans do NOT have a fixed price.

Do not add:

- list price
- monthly price
- annual price
- billing cycle

---

## 17. Plan entitlement rule

Plans define:

- Maximum Stores
- Maximum Users

Organization licenses cannot override these.

Example:

```text
Professional
5 Stores
25 Users
```

Every organization on Professional receives those entitlements.

If more capacity is required, the organization moves to a higher plan.

Do not implement organization-specific entitlement overrides.

---

## 18. Organization License

Data Connect uses its native generated UUID identity for OrganizationLicense.

Conceptually:

```text
OrganizationLicense
  id
  organization
  plan
  startDate
  expiryDate
  negotiatedPrice
  currency
  createdAt
  updatedAt
```

One current license exists per organization.

`organization @unique` enforces this relationship.

Price is negotiated independently per organization.

Therefore two organizations using the same Plan may pay different amounts.

---

## 19. License status

License status is derived, not manually editable.

States:

```text
NOT_ASSIGNED
NOT_YET_ACTIVE
ACTIVE
EXPIRING_SOON
EXPIRED
```

Expiring Soon:

```text
expiry within 30 days
```

Organization status and License status are independent.

An expired license does not automatically suspend the Organization.

---

## 20. License operations

Production-backed trusted Functions currently include:

```text
assignOrganizationLicense
changeOrganizationLicensePlan
modifyOrganizationCommercialTerms
renewOrganizationLicense
```

Writes go through trusted Cloud Functions.

Reads use generated Data Connect SDK operations.

Do NOT expose generic browser-callable license mutations.

---

## 21. License business rules

### Assignment

- selected Plan must be Active
- expiry > start
- negotiated price >= 0
- currency required
- organization must not already have a current license

### Change Plan

- immediate
- only higher-level Active Plan allowed
- same/lower level rejected
- validity dates remain unchanged
- negotiated price may change

### Commercial Terms

Only:

- negotiated price
- currency

may change.

Plan/dates/entitlements remain unchanged.

True no-op creates no history/audit noise.

### Renewal

- `newStartDate > current expiryDate`
- `newExpiryDate > newStartDate`
- no overlap
- same Plan allowed
- higher Active Plan allowed
- lower Plan rejected
- negotiated price/currency specified for renewed term

---

## 22. License History

LicenseHistory uses native generated UUID identity and references OrganizationLicense.

History is immutable.

Event types:

```text
ASSIGNED
PLAN_CHANGED
COMMERCIAL_TERMS_MODIFIED
RENEWED
```

Each event snapshots:

- Plan ID/code/name
- Plan level
- maxStores
- maxUsers
- start date
- expiry date
- negotiated price
- currency
- event timestamp
- relevant before/after changes

Historical values must not change if the Plan is later edited.

History snapshot data is constructed from trusted server-loaded data, never browser input.

---

## 23. Licensing transactions

License writes use trusted Cloud Functions plus internal:

```text
@auth(level: NO_ACCESS)
```

Data Connect transactional mutations.

License update/create + LicenseHistory + AuditEvent must succeed/fail atomically in PostgreSQL.

Browser clients never choose arbitrary history event types or snapshot values.

---

## 24. Reconciliation

Cross-system Auth/SQL failures that cannot be compensated cleanly are recorded through reconciliation state.

Never silently ignore partial lifecycle failure.

Reconciliation records contain no passwords/tokens.

---

## 25. Audit

Important administrative mutations write AuditEvent records.

Audit identifies:

- actor
- action
- target
- organization where relevant
- timestamp
- safe metadata

Audit never stores:

- passwords
- password hashes
- tokens
- reset codes

LicenseHistory and AuditEvent have different responsibilities:

- LicenseHistory = business history of the agreement
- AuditEvent = who performed the administrative action

---

## 26. Organizations directory

The Organizations directory is production-backed.

A trusted:

```text
listOrganizationsDirectory
```

Cloud Function aggregates organization + current license/plan data server-side.

This avoids browser N+1 queries.

Directory displays persisted:

- Current Plan
- License Status
- License Expiry

and supports:

- search
- organization status filtering
- license status filtering
- pagination

---

## 27. Master Admin Overview

Overview is production-backed through:

```text
getMasterAdminOverview
```

trusted Cloud Function.

Requires:

```text
overview.read
```

It provides persisted:

- Total Organizations
- Active Organizations
- Suspended Organizations
- Licenses Expiring Soon
- Recently Added Organizations
- Expiring License details

It avoids browser N+1 queries.

Existing Add Organization and Renew License actions reuse their production workflows.

---

## 28. Profile

Current Profile functionality is intentionally minimal.

Supported profile data includes:

- display name
- username read-only
- email read-only
- phone
- account status

Password change uses Firebase Authentication with reauthentication.

Do not introduce username/email-change workflows without explicitly designing their security semantics.

---

## 29. Current production status

Master Admin is now essentially production-backed end-to-end.

Production-backed areas include:

- Firebase Authentication
- Email/username login
- AppUser bootstrap
- RBAC/capabilities
- Profile/password
- Organizations
- Organization Administrators
- Plans
- Organization Licensing
- License History
- Organizations directory license projection
- Master Admin Overview

Email verification is optional. Email and username login are supported, while active-AppUser and capability checks remain mandatory.

The latest changes are on `main` and have been pushed to `https://github.com/sureshr-apps/OmniRetail`. Development hosting URLs are `https://omniretail-60c71.web.app` and `https://omniretail.web.app`.

Latest verified deployment revisions include:

- `bootstrapAuthenticatedUser`: `bootstrapauthenticateduser-00019-qow` (ACTIVE)
- `usernameLogin`: `usernamelogin-00019-duw` (ACTIVE)
- `provisionOrganizationAdministrator`: `provisionorganizationadministrator-00022-miz` (ACTIVE)

The `organization.admin` role is now assigned through both `OrganizationMembership.roleId` and `UserRole` during administrator provisioning. The role currently has no seeded `RolePermission` grants; defining the exact organization-admin capability set is a pending product/authorization decision and must not be guessed.

---

## 30. Current deployed Functions

Known deployed trusted Functions include:

```text
usernameLogin
bootstrapAuthenticatedUser
updateCurrentUserProfile
recordPasswordChange

provisionOrganizationAdministrator
changeOrganizationAdministratorStatus
resendAdministratorOnboardingEmail
resetOrganizationAdministratorPassword

assignOrganizationLicense
changeOrganizationLicensePlan
modifyOrganizationCommercialTerms
renewOrganizationLicense

listOrganizationsDirectory
getMasterAdminOverview
```

Inspect Firebase configuration/repository for the exact current deployed list rather than assuming this document is exhaustive.

---

## 31. Current development data

Known development organizations include:

- Punarva Fashion Hub
- Meridian Home Goods
- Cedar Valley Provisions

Known development license examples include:

- Punarva Fashion Hub → Professional
- Meridian Home Goods → Starter

Use clearly fictional data for additional fixtures.

Do not use recognizable real-world brands as fictional customers.

---

## 32. Database environment

Development currently uses Cloud SQL PostgreSQL.

Earlier configuration used a small zonal development/trial instance without production-grade HA/backups.

Before staging/production, explicitly review:

- backups
- PITR
- HA
- sizing
- environment separation
- secrets
- IAM
- monitoring

Do not assume the current development database configuration is production-ready.

---

## 33. App Check

App Check support has been prepared, but verify current enforcement/configuration before relying on it.

Do not assume it is enabled merely because code supports it.

Production readiness should include App Check configuration/enforcement where appropriate.

---

## 34. Tests and regression coverage

The repository currently has passing Vitest tests covering authentication, optional email verification, username login, active-AppUser/bootstrap behavior, safe errors, provisioning compensation/reconciliation, role assignment, protected routes, tenant service boundaries, connector authorization, license status derivation, and mutation refresh regressions.

Run `npm test -- --run` before handing off changes.

## 35. Remaining technical debt / verification

Some production workflows were deployed after build/dry-run validation without exhaustive dedicated live integration tests.

Examples may include:

- Change Plan
- Commercial Terms modification
- Renewal
- some administrator lifecycle paths

Do not assume “deployed successfully” means every failure path has exhaustive integration coverage.

A stabilization/hardening pass is recommended before production release.

### Current handoff audit

The following gaps have been confirmed and remain open:

- `deleteOrganizationLicensePlan` and `deleteOrganization` Cloud Functions exist even though hard deletion is not the normal organization workflow. Their security and product-rule alignment require review before further use.
- `organization.admin` is seeded and assigned, but currently has no `RolePermission` grants. The exact Organization Administrator capability model remains unresolved and must be decided explicitly.
- App Check is supported but not enabled by default (`AUTH_ENFORCE_APP_CHECK=false`); browser enforcement also depends on a configured site key.
- The documented 39 tests are unit/component-oriented. Dedicated live integration coverage for several deployed licensing and administrator lifecycle failure paths remains limited.
- `firebase.json` and environment defaults still reference emulator/demo configuration in places. Deployment and environment separation require explicit verification.
- Generated Data Connect artifacts and build outputs are present alongside source. Regeneration consistency must be checked before schema changes.

---

## 36. Known compatibility cleanup

The dead `OrganizationLicenseService.getLicenseSync()` compatibility API and the unused mock administrator fallback have been removed. Do not reintroduce synchronous mock license state.

---

## 37. Bundle warning

Route-level lazy loading and stable React, Firebase, and icon vendor chunks now keep every production chunk below Vite's warning threshold. Preserve those split points as new modules are added.

---

## 38. What NOT to implement without product design

Do not invent:

- subscription billing
- fixed Plan prices
- automatic renewals
- plan downgrades
- organization-specific entitlement overrides
- license proration
- payment collection
- billing/dunning
- POS/register licensing
- hardware quotas
- platform-health monitoring
- tenant-cluster concepts

These were deliberately excluded.

---

## 39. Next major product phase

The next major product area is expected to be the **organization/tenant-facing application**.

Do not assume its architecture or permissions automatically.

Before implementing tenant modules, we should design:

- Organization Admin role
- Store model
- store membership/access
- organization-user permissions
- tenant application shell/navigation
- tenant isolation rules

Then proceed into operational modules such as Products, Inventory, POS, etc.

---

## 40. How to work on this repository

When receiving a task:

1. Inspect relevant existing implementation first.
2. Preserve established architecture and UI.
3. Understand the business rule before changing schema/API.
4. Use existing service abstractions.
5. Enforce security server-side.
6. Treat browser input as untrusted.
7. Add tests for meaningful business/security rules.
8. Run TypeScript/lint/build/tests.
9. Run Data Connect generation/validation when relevant.
10. Run Firebase dry-run before deployment.
11. Do not deploy destructive changes to real data without explicit approval.

You may resolve ordinary engineering prerequisites yourself.

Do **not** repeatedly stop for implementation details that can reasonably be inferred from this architecture.

Ask for confirmation only when:

- a genuine product/business decision is missing
- there are materially different long-term architectural choices
- an action could destructively affect real data
- production security/cost/infrastructure requires approval
- required credentials/permissions are unavailable

---

## 41. Codex / Stitch / Google AI Studio workflow

Use Codex as the coordination and implementation source of truth for future work:

1. Establish or update product requirements and architecture in this repository.
2. Generate a focused Stitch prompt for new screens or visual changes.
3. After UI approval, generate a Google AI Studio implementation prompt referencing the approved UI and existing components.
4. Review the resulting frontend against the approved design.
5. Implement production persistence, trusted Functions, authorization, tests, and deployment in Codex.

Update this file whenever a product decision, trust boundary, schema contract, deployment target, or major implementation status changes.

## 42. First action

Before implementing anything:

**Inspect the repository and compare it against this handoff.**

Identify:

- anything in this document that is stale or inconsistent with the current code
- current Firebase/Data Connect architecture
- current service boundaries
- current test coverage
- remaining mocks/dead compatibility code
- security gaps
- production-readiness gaps

Do not rewrite working code during this initial inspection.

Return a concise **Current State / Gaps / Recommended Next Steps** assessment.

Then wait for the next task.
