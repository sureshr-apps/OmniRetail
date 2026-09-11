# Firebase authentication foundation

Firebase Authentication and the current AppUser/RBAC profile are production-backed.
Organizations, Plans, Administrators, Licensing, and Overview data remain mock-backed.

## Local prerequisites

- Node.js 22
- Firebase CLI 15 or newer
- Java 21 or newer for the Firebase Emulator Suite
- A local `.env` copied from `.env.example`

Install dependencies and generate SQL Connect SDKs:

```powershell
npx --yes bun@1.4.2 install
npm --prefix functions install
firebase dataconnect:sdk:generate --project demo-omniretail
```

Run the existing mock frontend and the Firebase emulators in separate shells:

```powershell
npm run dev
npm run firebase:emulators
```

The default emulator ports are Auth `9099`, Functions `5001`, SQL Connect
`9399`, Hosting `5000`, and Emulator UI `4000`.

## Environment selection

Use independent Firebase projects for development, staging, and production.
Copy `.firebaserc.example` to the ignored `.firebaserc` file and replace its
placeholder values, or pass `--project <alias-or-project-id>` to every Firebase
command. No project IDs or service-account files belong in source control.

The SQL Connect service expects a Cloud SQL instance named `omniretail-sql`, a
database named `omniretail`, and the `asia-south1` region. Change these values
before the first deployment if the confirmed infrastructure naming or data
residency requirements differ. They must remain consistent in every environment.

## Manual Firebase Console and Google Cloud setup

For each environment:

1. Create or select a Firebase project with billing enabled.
2. Register a Web application and copy its public Firebase configuration into
   the environment's deployment settings. Do not commit the resulting `.env`.
3. Enable Firebase Authentication and the Email/Password provider. Enable email
   enumeration protection before production.
4. Configure the Firebase-managed password reset template, sender name,
   authorized domains, and action URL.
5. In SQL Connect, create the `omniretail-platform` service in `asia-south1` and
   provision or link the `omniretail-sql` PostgreSQL instance and `omniretail`
   database.
6. Confirm Cloud SQL backups, point-in-time recovery, high availability, and
   data-retention settings for staging and production.
7. Enable Cloud Functions, Cloud Build, Artifact Registry, Secret Manager,
   Hosting, SQL Connect, Cloud SQL Admin, and Firebase App Check APIs as prompted.
8. Register the Web app with App Check using reCAPTCHA Enterprise. Start in
   monitoring mode; enforcement is enabled after Phase 2 authentication testing.
9. Grant the Functions runtime service account only the SQL Connect Admin access
   and custom-token signing permissions required by the Phase 2 functions.
10. Configure a Firebase Hosting site and any custom domains. Add those domains
    to Firebase Authentication's authorized domains.

No Admin SDK JSON key should be downloaded for deployed Functions. Google-managed
runtime credentials and Secret Manager are used instead.

## Deployment and validation

Generate SDKs whenever schema or connector operations change:

```powershell
npm run firebase:sdk
```

Validate locally:

```powershell
npm run check
firebase deploy --dry-run --only dataconnect,functions,hosting --project development
```

The dry run requires access to a real configured Firebase project and can prompt
to enable required APIs. Deploy SQL Connect schema/connectors first, then
Functions, and finally Hosting.

## Schema notes

SQL Connect represents unique keys, foreign keys, enums, nullability, and numeric
column types directly. PostgreSQL `CHECK` constraints such as positive plan
limits, non-negative negotiated price, and expiry after start are not expressible
as table directives. The feature mutations added in later phases will enforce
those rules with server-side checks and transactional operations. Before the
production schema is deployed, database-level checks will be added through an
approved migration approach and retained with compatible schema validation if
SQL Connect cannot own them directly.

The canonical production seed will include Starter level 1, Professional level
2, and Enterprise level 3 only. Phase 1 intentionally does not seed any project.

## RBAC bootstrap

After the SQL Connect schema is available, explicitly bootstrap the idempotent
Master Admin role and capability catalogue in each environment:

```powershell
firebase dataconnect:execute dataconnect/bootstrap_rbac.gql BootstrapPlatformRbac --project development
```

This bootstrap contains deterministic reference-data UUIDs only. It creates no
user, organization, license, or credential records and is not run by deployment.

## First Master Admin bootstrap

Prerequisites:

1. Run `gcloud auth application-default login` using an account authorized for
   Firebase Authentication and SQL Connect administration.
2. Set the project and public Firebase Web API key in the current PowerShell
   session. Do not save a password in a repository file.
3. Run the RBAC bootstrap above before creating the first administrator.

```powershell
gcloud config set project omniretail-60c71
gcloud auth application-default set-quota-project omniretail-60c71
$env:OMNIRETAIL_FIREBASE_PROJECT_ID = "omniretail-60c71"
$env:OMNIRETAIL_WEB_API_KEY = "<VITE_FIREBASE_API_KEY from .env.local>"
npm --prefix functions run bootstrap:master-admin -- --email "owner@example.com" --username "owner" --display-name "Platform Owner" --phone "+910000000000"
```

The command prompts for the initial password without echoing it. For non-interactive
automation, inject `OMNIRETAIL_BOOTSTRAP_PASSWORD` from a secret manager for the
duration of the process and remove it afterward. The command never prints the
password or Firebase tokens.

The command creates the Firebase user only when absent, upserts the matching
AppUser and Master Admin role assignment, writes one deterministic audit event,
and sends a Firebase-managed verification email. Normal application access stays
blocked until Firebase reports the email as verified. Re-running it with the same
Firebase user is safe; an existing Firebase password is not overwritten.

Afterward, clear the session-only values:

```powershell
Remove-Item Env:\OMNIRETAIL_FIREBASE_PROJECT_ID -ErrorAction SilentlyContinue
Remove-Item Env:\OMNIRETAIL_WEB_API_KEY -ErrorAction SilentlyContinue
Remove-Item Env:\OMNIRETAIL_BOOTSTRAP_PASSWORD -ErrorAction SilentlyContinue
```

## Phase 2 App Check activation

The callables support App Check enforcement and replay protection, but
`AUTH_ENFORCE_APP_CHECK` remains false until a reCAPTCHA Enterprise site key is
registered for the Web app. To activate it:

1. Register the OmniRetail Web app in Firebase App Check with reCAPTCHA Enterprise.
2. Add the public site key as `VITE_FIREBASE_APP_CHECK_SITE_KEY` in the Web app's
   deployment environment.
3. Grant the **Firebase App Check Token Verifier** role to the 2nd-gen Functions
   runtime service account (currently
   `1039046217091-compute@developer.gserviceaccount.com`).
4. Set `AUTH_ENFORCE_APP_CHECK=true` in the Functions environment and redeploy
   Functions.
5. Verify valid browser traffic in App Check metrics, then keep enforcement on.

The username callable also applies a hashed IP-and-username attempt window and a
bounded instance count. Do not place credential values or authentication tokens
in application logs.
