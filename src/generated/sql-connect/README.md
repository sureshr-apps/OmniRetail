# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `master-admin`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`sql-connect/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetCurrentUserAuthorization*](#getcurrentuserauthorization)
  - [*GetUserAuthorizationByFirebaseUid*](#getuserauthorizationbyfirebaseuid)
  - [*ResolveUsernameLogin*](#resolveusernamelogin)
  - [*GetAppUserForBootstrap*](#getappuserforbootstrap)
  - [*GetCurrentAppUser*](#getcurrentappuser)
  - [*GetAppUserByFirebaseUid*](#getappuserbyfirebaseuid)
  - [*ListLicensePlans*](#listlicenseplans)
  - [*ListOrganizationLicensePlanAssignments*](#listorganizationlicenseplanassignments)
  - [*GetLicensePlan*](#getlicenseplan)
  - [*GetLicensePlanTrusted*](#getlicenseplantrusted)
  - [*GetLicensePlanReferencesTrusted*](#getlicenseplanreferencestrusted)
  - [*ListOrganizations*](#listorganizations)
  - [*GetOrganization*](#getorganization)
  - [*GetOrganizationTrusted*](#getorganizationtrusted)
  - [*ListOrganizationAdministrators*](#listorganizationadministrators)
  - [*GetOrganizationAdministrator*](#getorganizationadministrator)
  - [*ResolveOrganizationAdministratorIdentity*](#resolveorganizationadministratoridentity)
  - [*GetLifecycleIdempotency*](#getlifecycleidempotency)
  - [*GetOrganizationLicense*](#getorganizationlicense)
  - [*GetOrganizationLicenseTrusted*](#getorganizationlicensetrusted)
  - [*GetOrganizationLicenseHistory*](#getorganizationlicensehistory)
  - [*GetOrganizationLicensePublic*](#getorganizationlicensepublic)
  - [*GetOrganizationLicenseHistoryPublic*](#getorganizationlicensehistorypublic)
  - [*ListOrganizationsTrusted*](#listorganizationstrusted)
  - [*ListOrganizationUsersForDeletionTrusted*](#listorganizationusersfordeletiontrusted)
- [**Mutations**](#mutations)
  - [*RecordSuccessfulLogin*](#recordsuccessfullogin)
  - [*UpdateAppUserProfile*](#updateappuserprofile)
  - [*RecordPasswordChange*](#recordpasswordchange)
  - [*BootstrapMasterAdmin*](#bootstrapmasteradmin)
  - [*CreateLicensePlan*](#createlicenseplan)
  - [*UpdateLicensePlan*](#updatelicenseplan)
  - [*ChangeLicensePlanStatus*](#changelicenseplanstatus)
  - [*DeleteLicensePlan*](#deletelicenseplan)
  - [*DeleteLicensePlanTrusted*](#deletelicenseplantrusted)
  - [*ProvisionOrganizationAdministrator*](#provisionorganizationadministrator)
  - [*UpdateOrganizationAdministrator*](#updateorganizationadministrator)
  - [*ChangeOrganizationAdministratorStatus*](#changeorganizationadministratorstatus)
  - [*RecordAdministratorSecurityEvent*](#recordadministratorsecurityevent)
  - [*DeleteOrganizationTrusted*](#deleteorganizationtrusted)
  - [*DeleteAppUserTrusted*](#deleteappusertrusted)
  - [*AssignOrganizationLicenseTrusted*](#assignorganizationlicensetrusted)
  - [*ChangeOrganizationLicensePlanTrusted*](#changeorganizationlicenseplantrusted)
  - [*ModifyOrganizationCommercialTermsTrusted*](#modifyorganizationcommercialtermstrusted)
  - [*RenewOrganizationLicenseTrusted*](#reneworganizationlicensetrusted)
  - [*ClaimLifecycleIdempotency*](#claimlifecycleidempotency)
  - [*CompleteLifecycleIdempotency*](#completelifecycleidempotency)
  - [*RecordProvisioningReconciliation*](#recordprovisioningreconciliation)
  - [*CreateOrganization*](#createorganization)
  - [*UpdateOrganization*](#updateorganization)
  - [*ChangeOrganizationStatus*](#changeorganizationstatus)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `master-admin`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@omniretail/sql-connect` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@omniretail/sql-connect';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@omniretail/sql-connect';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `master-admin` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetCurrentUserAuthorization
You can execute the `GetCurrentUserAuthorization` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
getCurrentUserAuthorization(options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserAuthorizationData, undefined>;

interface GetCurrentUserAuthorizationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetCurrentUserAuthorizationData, undefined>;
}
export const getCurrentUserAuthorizationRef: GetCurrentUserAuthorizationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCurrentUserAuthorization(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserAuthorizationData, undefined>;

interface GetCurrentUserAuthorizationRef {
  ...
  (dc: DataConnect): QueryRef<GetCurrentUserAuthorizationData, undefined>;
}
export const getCurrentUserAuthorizationRef: GetCurrentUserAuthorizationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCurrentUserAuthorizationRef:
```typescript
const name = getCurrentUserAuthorizationRef.operationName;
console.log(name);
```

### Variables
The `GetCurrentUserAuthorization` query has no variables.
### Return Type
Recall that executing the `GetCurrentUserAuthorization` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCurrentUserAuthorizationData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetCurrentUserAuthorizationData {
  appUsers: ({
    id: UUIDString;
    firebaseUid: string;
    username: string;
    email: string;
    displayName: string;
    phone?: string | null;
    status: AppUserStatus;
    createdAt: TimestampString;
    updatedAt: TimestampString;
    userRoles_on_user: ({
      role: {
        code: string;
        name: string;
        scope: RoleScope;
        rolePermissions_on_role: ({
          permission: {
            code: string;
          };
        })[];
      };
    })[];
  } & AppUser_Key)[];
}
```
### Using `GetCurrentUserAuthorization`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCurrentUserAuthorization } from '@omniretail/sql-connect';


// Call the `getCurrentUserAuthorization()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCurrentUserAuthorization();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCurrentUserAuthorization(dataConnect);

console.log(data.appUsers);

// Or, you can use the `Promise` API.
getCurrentUserAuthorization().then((response) => {
  const data = response.data;
  console.log(data.appUsers);
});
```

### Using `GetCurrentUserAuthorization`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCurrentUserAuthorizationRef } from '@omniretail/sql-connect';


// Call the `getCurrentUserAuthorizationRef()` function to get a reference to the query.
const ref = getCurrentUserAuthorizationRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCurrentUserAuthorizationRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.appUsers);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.appUsers);
});
```

## GetUserAuthorizationByFirebaseUid
You can execute the `GetUserAuthorizationByFirebaseUid` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
getUserAuthorizationByFirebaseUid(vars: GetUserAuthorizationByFirebaseUidVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserAuthorizationByFirebaseUidData, GetUserAuthorizationByFirebaseUidVariables>;

interface GetUserAuthorizationByFirebaseUidRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserAuthorizationByFirebaseUidVariables): QueryRef<GetUserAuthorizationByFirebaseUidData, GetUserAuthorizationByFirebaseUidVariables>;
}
export const getUserAuthorizationByFirebaseUidRef: GetUserAuthorizationByFirebaseUidRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUserAuthorizationByFirebaseUid(dc: DataConnect, vars: GetUserAuthorizationByFirebaseUidVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserAuthorizationByFirebaseUidData, GetUserAuthorizationByFirebaseUidVariables>;

interface GetUserAuthorizationByFirebaseUidRef {
  ...
  (dc: DataConnect, vars: GetUserAuthorizationByFirebaseUidVariables): QueryRef<GetUserAuthorizationByFirebaseUidData, GetUserAuthorizationByFirebaseUidVariables>;
}
export const getUserAuthorizationByFirebaseUidRef: GetUserAuthorizationByFirebaseUidRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserAuthorizationByFirebaseUidRef:
```typescript
const name = getUserAuthorizationByFirebaseUidRef.operationName;
console.log(name);
```

### Variables
The `GetUserAuthorizationByFirebaseUid` query requires an argument of type `GetUserAuthorizationByFirebaseUidVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetUserAuthorizationByFirebaseUidVariables {
  firebaseUid: string;
}
```
### Return Type
Recall that executing the `GetUserAuthorizationByFirebaseUid` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserAuthorizationByFirebaseUidData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetUserAuthorizationByFirebaseUidData {
  appUsers: ({
    id: UUIDString;
    firebaseUid: string;
    username: string;
    email: string;
    displayName: string;
    phone?: string | null;
    status: AppUserStatus;
    createdAt: TimestampString;
    updatedAt: TimestampString;
    userRoles_on_user: ({
      role: {
        code: string;
        name: string;
        scope: RoleScope;
        rolePermissions_on_role: ({
          permission: {
            code: string;
          };
        })[];
      };
    })[];
  } & AppUser_Key)[];
}
```
### Using `GetUserAuthorizationByFirebaseUid`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUserAuthorizationByFirebaseUid, GetUserAuthorizationByFirebaseUidVariables } from '@omniretail/sql-connect';

// The `GetUserAuthorizationByFirebaseUid` query requires an argument of type `GetUserAuthorizationByFirebaseUidVariables`:
const getUserAuthorizationByFirebaseUidVars: GetUserAuthorizationByFirebaseUidVariables = {
  firebaseUid: ..., 
};

// Call the `getUserAuthorizationByFirebaseUid()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUserAuthorizationByFirebaseUid(getUserAuthorizationByFirebaseUidVars);
// Variables can be defined inline as well.
const { data } = await getUserAuthorizationByFirebaseUid({ firebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUserAuthorizationByFirebaseUid(dataConnect, getUserAuthorizationByFirebaseUidVars);

console.log(data.appUsers);

// Or, you can use the `Promise` API.
getUserAuthorizationByFirebaseUid(getUserAuthorizationByFirebaseUidVars).then((response) => {
  const data = response.data;
  console.log(data.appUsers);
});
```

### Using `GetUserAuthorizationByFirebaseUid`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserAuthorizationByFirebaseUidRef, GetUserAuthorizationByFirebaseUidVariables } from '@omniretail/sql-connect';

// The `GetUserAuthorizationByFirebaseUid` query requires an argument of type `GetUserAuthorizationByFirebaseUidVariables`:
const getUserAuthorizationByFirebaseUidVars: GetUserAuthorizationByFirebaseUidVariables = {
  firebaseUid: ..., 
};

// Call the `getUserAuthorizationByFirebaseUidRef()` function to get a reference to the query.
const ref = getUserAuthorizationByFirebaseUidRef(getUserAuthorizationByFirebaseUidVars);
// Variables can be defined inline as well.
const ref = getUserAuthorizationByFirebaseUidRef({ firebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserAuthorizationByFirebaseUidRef(dataConnect, getUserAuthorizationByFirebaseUidVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.appUsers);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.appUsers);
});
```

## ResolveUsernameLogin
You can execute the `ResolveUsernameLogin` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
resolveUsernameLogin(vars: ResolveUsernameLoginVariables, options?: ExecuteQueryOptions): QueryPromise<ResolveUsernameLoginData, ResolveUsernameLoginVariables>;

interface ResolveUsernameLoginRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ResolveUsernameLoginVariables): QueryRef<ResolveUsernameLoginData, ResolveUsernameLoginVariables>;
}
export const resolveUsernameLoginRef: ResolveUsernameLoginRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
resolveUsernameLogin(dc: DataConnect, vars: ResolveUsernameLoginVariables, options?: ExecuteQueryOptions): QueryPromise<ResolveUsernameLoginData, ResolveUsernameLoginVariables>;

interface ResolveUsernameLoginRef {
  ...
  (dc: DataConnect, vars: ResolveUsernameLoginVariables): QueryRef<ResolveUsernameLoginData, ResolveUsernameLoginVariables>;
}
export const resolveUsernameLoginRef: ResolveUsernameLoginRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the resolveUsernameLoginRef:
```typescript
const name = resolveUsernameLoginRef.operationName;
console.log(name);
```

### Variables
The `ResolveUsernameLogin` query requires an argument of type `ResolveUsernameLoginVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ResolveUsernameLoginVariables {
  username: string;
}
```
### Return Type
Recall that executing the `ResolveUsernameLogin` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ResolveUsernameLoginData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ResolveUsernameLoginData {
  appUsers: ({
    id: UUIDString;
    firebaseUid: string;
    email: string;
    status: AppUserStatus;
  } & AppUser_Key)[];
}
```
### Using `ResolveUsernameLogin`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, resolveUsernameLogin, ResolveUsernameLoginVariables } from '@omniretail/sql-connect';

// The `ResolveUsernameLogin` query requires an argument of type `ResolveUsernameLoginVariables`:
const resolveUsernameLoginVars: ResolveUsernameLoginVariables = {
  username: ..., 
};

// Call the `resolveUsernameLogin()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await resolveUsernameLogin(resolveUsernameLoginVars);
// Variables can be defined inline as well.
const { data } = await resolveUsernameLogin({ username: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await resolveUsernameLogin(dataConnect, resolveUsernameLoginVars);

console.log(data.appUsers);

// Or, you can use the `Promise` API.
resolveUsernameLogin(resolveUsernameLoginVars).then((response) => {
  const data = response.data;
  console.log(data.appUsers);
});
```

### Using `ResolveUsernameLogin`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, resolveUsernameLoginRef, ResolveUsernameLoginVariables } from '@omniretail/sql-connect';

// The `ResolveUsernameLogin` query requires an argument of type `ResolveUsernameLoginVariables`:
const resolveUsernameLoginVars: ResolveUsernameLoginVariables = {
  username: ..., 
};

// Call the `resolveUsernameLoginRef()` function to get a reference to the query.
const ref = resolveUsernameLoginRef(resolveUsernameLoginVars);
// Variables can be defined inline as well.
const ref = resolveUsernameLoginRef({ username: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = resolveUsernameLoginRef(dataConnect, resolveUsernameLoginVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.appUsers);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.appUsers);
});
```

## GetAppUserForBootstrap
You can execute the `GetAppUserForBootstrap` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
getAppUserForBootstrap(vars: GetAppUserForBootstrapVariables, options?: ExecuteQueryOptions): QueryPromise<GetAppUserForBootstrapData, GetAppUserForBootstrapVariables>;

interface GetAppUserForBootstrapRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetAppUserForBootstrapVariables): QueryRef<GetAppUserForBootstrapData, GetAppUserForBootstrapVariables>;
}
export const getAppUserForBootstrapRef: GetAppUserForBootstrapRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getAppUserForBootstrap(dc: DataConnect, vars: GetAppUserForBootstrapVariables, options?: ExecuteQueryOptions): QueryPromise<GetAppUserForBootstrapData, GetAppUserForBootstrapVariables>;

interface GetAppUserForBootstrapRef {
  ...
  (dc: DataConnect, vars: GetAppUserForBootstrapVariables): QueryRef<GetAppUserForBootstrapData, GetAppUserForBootstrapVariables>;
}
export const getAppUserForBootstrapRef: GetAppUserForBootstrapRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getAppUserForBootstrapRef:
```typescript
const name = getAppUserForBootstrapRef.operationName;
console.log(name);
```

### Variables
The `GetAppUserForBootstrap` query requires an argument of type `GetAppUserForBootstrapVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetAppUserForBootstrapVariables {
  firebaseUid: string;
}
```
### Return Type
Recall that executing the `GetAppUserForBootstrap` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetAppUserForBootstrapData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetAppUserForBootstrapData {
  appUsers: ({
    id: UUIDString;
    firebaseUid: string;
    username: string;
    email: string;
    displayName: string;
    phone?: string | null;
    status: AppUserStatus;
  } & AppUser_Key)[];
}
```
### Using `GetAppUserForBootstrap`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getAppUserForBootstrap, GetAppUserForBootstrapVariables } from '@omniretail/sql-connect';

// The `GetAppUserForBootstrap` query requires an argument of type `GetAppUserForBootstrapVariables`:
const getAppUserForBootstrapVars: GetAppUserForBootstrapVariables = {
  firebaseUid: ..., 
};

// Call the `getAppUserForBootstrap()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getAppUserForBootstrap(getAppUserForBootstrapVars);
// Variables can be defined inline as well.
const { data } = await getAppUserForBootstrap({ firebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getAppUserForBootstrap(dataConnect, getAppUserForBootstrapVars);

console.log(data.appUsers);

// Or, you can use the `Promise` API.
getAppUserForBootstrap(getAppUserForBootstrapVars).then((response) => {
  const data = response.data;
  console.log(data.appUsers);
});
```

### Using `GetAppUserForBootstrap`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getAppUserForBootstrapRef, GetAppUserForBootstrapVariables } from '@omniretail/sql-connect';

// The `GetAppUserForBootstrap` query requires an argument of type `GetAppUserForBootstrapVariables`:
const getAppUserForBootstrapVars: GetAppUserForBootstrapVariables = {
  firebaseUid: ..., 
};

// Call the `getAppUserForBootstrapRef()` function to get a reference to the query.
const ref = getAppUserForBootstrapRef(getAppUserForBootstrapVars);
// Variables can be defined inline as well.
const ref = getAppUserForBootstrapRef({ firebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getAppUserForBootstrapRef(dataConnect, getAppUserForBootstrapVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.appUsers);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.appUsers);
});
```

## GetCurrentAppUser
You can execute the `GetCurrentAppUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
getCurrentAppUser(options?: ExecuteQueryOptions): QueryPromise<GetCurrentAppUserData, undefined>;

interface GetCurrentAppUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetCurrentAppUserData, undefined>;
}
export const getCurrentAppUserRef: GetCurrentAppUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCurrentAppUser(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetCurrentAppUserData, undefined>;

interface GetCurrentAppUserRef {
  ...
  (dc: DataConnect): QueryRef<GetCurrentAppUserData, undefined>;
}
export const getCurrentAppUserRef: GetCurrentAppUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCurrentAppUserRef:
```typescript
const name = getCurrentAppUserRef.operationName;
console.log(name);
```

### Variables
The `GetCurrentAppUser` query has no variables.
### Return Type
Recall that executing the `GetCurrentAppUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCurrentAppUserData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetCurrentAppUserData {
  appUsers: ({
    id: UUIDString;
    firebaseUid: string;
    username: string;
    email: string;
    displayName: string;
    phone?: string | null;
    status: AppUserStatus;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & AppUser_Key)[];
}
```
### Using `GetCurrentAppUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCurrentAppUser } from '@omniretail/sql-connect';


// Call the `getCurrentAppUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCurrentAppUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCurrentAppUser(dataConnect);

console.log(data.appUsers);

// Or, you can use the `Promise` API.
getCurrentAppUser().then((response) => {
  const data = response.data;
  console.log(data.appUsers);
});
```

### Using `GetCurrentAppUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCurrentAppUserRef } from '@omniretail/sql-connect';


// Call the `getCurrentAppUserRef()` function to get a reference to the query.
const ref = getCurrentAppUserRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCurrentAppUserRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.appUsers);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.appUsers);
});
```

## GetAppUserByFirebaseUid
You can execute the `GetAppUserByFirebaseUid` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
getAppUserByFirebaseUid(vars: GetAppUserByFirebaseUidVariables, options?: ExecuteQueryOptions): QueryPromise<GetAppUserByFirebaseUidData, GetAppUserByFirebaseUidVariables>;

interface GetAppUserByFirebaseUidRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetAppUserByFirebaseUidVariables): QueryRef<GetAppUserByFirebaseUidData, GetAppUserByFirebaseUidVariables>;
}
export const getAppUserByFirebaseUidRef: GetAppUserByFirebaseUidRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getAppUserByFirebaseUid(dc: DataConnect, vars: GetAppUserByFirebaseUidVariables, options?: ExecuteQueryOptions): QueryPromise<GetAppUserByFirebaseUidData, GetAppUserByFirebaseUidVariables>;

interface GetAppUserByFirebaseUidRef {
  ...
  (dc: DataConnect, vars: GetAppUserByFirebaseUidVariables): QueryRef<GetAppUserByFirebaseUidData, GetAppUserByFirebaseUidVariables>;
}
export const getAppUserByFirebaseUidRef: GetAppUserByFirebaseUidRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getAppUserByFirebaseUidRef:
```typescript
const name = getAppUserByFirebaseUidRef.operationName;
console.log(name);
```

### Variables
The `GetAppUserByFirebaseUid` query requires an argument of type `GetAppUserByFirebaseUidVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetAppUserByFirebaseUidVariables {
  firebaseUid: string;
}
```
### Return Type
Recall that executing the `GetAppUserByFirebaseUid` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetAppUserByFirebaseUidData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetAppUserByFirebaseUidData {
  appUsers: ({
    id: UUIDString;
    firebaseUid: string;
    username: string;
    email: string;
    displayName: string;
    phone?: string | null;
    status: AppUserStatus;
  } & AppUser_Key)[];
}
```
### Using `GetAppUserByFirebaseUid`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getAppUserByFirebaseUid, GetAppUserByFirebaseUidVariables } from '@omniretail/sql-connect';

// The `GetAppUserByFirebaseUid` query requires an argument of type `GetAppUserByFirebaseUidVariables`:
const getAppUserByFirebaseUidVars: GetAppUserByFirebaseUidVariables = {
  firebaseUid: ..., 
};

// Call the `getAppUserByFirebaseUid()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getAppUserByFirebaseUid(getAppUserByFirebaseUidVars);
// Variables can be defined inline as well.
const { data } = await getAppUserByFirebaseUid({ firebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getAppUserByFirebaseUid(dataConnect, getAppUserByFirebaseUidVars);

console.log(data.appUsers);

// Or, you can use the `Promise` API.
getAppUserByFirebaseUid(getAppUserByFirebaseUidVars).then((response) => {
  const data = response.data;
  console.log(data.appUsers);
});
```

### Using `GetAppUserByFirebaseUid`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getAppUserByFirebaseUidRef, GetAppUserByFirebaseUidVariables } from '@omniretail/sql-connect';

// The `GetAppUserByFirebaseUid` query requires an argument of type `GetAppUserByFirebaseUidVariables`:
const getAppUserByFirebaseUidVars: GetAppUserByFirebaseUidVariables = {
  firebaseUid: ..., 
};

// Call the `getAppUserByFirebaseUidRef()` function to get a reference to the query.
const ref = getAppUserByFirebaseUidRef(getAppUserByFirebaseUidVars);
// Variables can be defined inline as well.
const ref = getAppUserByFirebaseUidRef({ firebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getAppUserByFirebaseUidRef(dataConnect, getAppUserByFirebaseUidVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.appUsers);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.appUsers);
});
```

## ListLicensePlans
You can execute the `ListLicensePlans` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
listLicensePlans(options?: ExecuteQueryOptions): QueryPromise<ListLicensePlansData, undefined>;

interface ListLicensePlansRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListLicensePlansData, undefined>;
}
export const listLicensePlansRef: ListLicensePlansRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listLicensePlans(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListLicensePlansData, undefined>;

interface ListLicensePlansRef {
  ...
  (dc: DataConnect): QueryRef<ListLicensePlansData, undefined>;
}
export const listLicensePlansRef: ListLicensePlansRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listLicensePlansRef:
```typescript
const name = listLicensePlansRef.operationName;
console.log(name);
```

### Variables
The `ListLicensePlans` query has no variables.
### Return Type
Recall that executing the `ListLicensePlans` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListLicensePlansData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListLicensePlansData {
  licensePlans: ({
    id: UUIDString;
    planCode: string;
    name: string;
    description?: string | null;
    level: number;
    maxStores: number;
    maxUsers: number;
    status: LicensePlanStatus;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & LicensePlan_Key)[];
}
```
### Using `ListLicensePlans`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listLicensePlans } from '@omniretail/sql-connect';


// Call the `listLicensePlans()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listLicensePlans();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listLicensePlans(dataConnect);

console.log(data.licensePlans);

// Or, you can use the `Promise` API.
listLicensePlans().then((response) => {
  const data = response.data;
  console.log(data.licensePlans);
});
```

### Using `ListLicensePlans`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listLicensePlansRef } from '@omniretail/sql-connect';


// Call the `listLicensePlansRef()` function to get a reference to the query.
const ref = listLicensePlansRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listLicensePlansRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.licensePlans);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.licensePlans);
});
```

## ListOrganizationLicensePlanAssignments
You can execute the `ListOrganizationLicensePlanAssignments` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
listOrganizationLicensePlanAssignments(options?: ExecuteQueryOptions): QueryPromise<ListOrganizationLicensePlanAssignmentsData, undefined>;

interface ListOrganizationLicensePlanAssignmentsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListOrganizationLicensePlanAssignmentsData, undefined>;
}
export const listOrganizationLicensePlanAssignmentsRef: ListOrganizationLicensePlanAssignmentsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listOrganizationLicensePlanAssignments(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListOrganizationLicensePlanAssignmentsData, undefined>;

interface ListOrganizationLicensePlanAssignmentsRef {
  ...
  (dc: DataConnect): QueryRef<ListOrganizationLicensePlanAssignmentsData, undefined>;
}
export const listOrganizationLicensePlanAssignmentsRef: ListOrganizationLicensePlanAssignmentsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listOrganizationLicensePlanAssignmentsRef:
```typescript
const name = listOrganizationLicensePlanAssignmentsRef.operationName;
console.log(name);
```

### Variables
The `ListOrganizationLicensePlanAssignments` query has no variables.
### Return Type
Recall that executing the `ListOrganizationLicensePlanAssignments` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListOrganizationLicensePlanAssignmentsData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListOrganizationLicensePlanAssignmentsData {
  organizationLicenses: ({
    plan: {
      id: UUIDString;
    } & LicensePlan_Key;
  })[];
}
```
### Using `ListOrganizationLicensePlanAssignments`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listOrganizationLicensePlanAssignments } from '@omniretail/sql-connect';


// Call the `listOrganizationLicensePlanAssignments()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listOrganizationLicensePlanAssignments();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listOrganizationLicensePlanAssignments(dataConnect);

console.log(data.organizationLicenses);

// Or, you can use the `Promise` API.
listOrganizationLicensePlanAssignments().then((response) => {
  const data = response.data;
  console.log(data.organizationLicenses);
});
```

### Using `ListOrganizationLicensePlanAssignments`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listOrganizationLicensePlanAssignmentsRef } from '@omniretail/sql-connect';


// Call the `listOrganizationLicensePlanAssignmentsRef()` function to get a reference to the query.
const ref = listOrganizationLicensePlanAssignmentsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listOrganizationLicensePlanAssignmentsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.organizationLicenses);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.organizationLicenses);
});
```

## GetLicensePlan
You can execute the `GetLicensePlan` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
getLicensePlan(vars: GetLicensePlanVariables, options?: ExecuteQueryOptions): QueryPromise<GetLicensePlanData, GetLicensePlanVariables>;

interface GetLicensePlanRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetLicensePlanVariables): QueryRef<GetLicensePlanData, GetLicensePlanVariables>;
}
export const getLicensePlanRef: GetLicensePlanRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getLicensePlan(dc: DataConnect, vars: GetLicensePlanVariables, options?: ExecuteQueryOptions): QueryPromise<GetLicensePlanData, GetLicensePlanVariables>;

interface GetLicensePlanRef {
  ...
  (dc: DataConnect, vars: GetLicensePlanVariables): QueryRef<GetLicensePlanData, GetLicensePlanVariables>;
}
export const getLicensePlanRef: GetLicensePlanRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getLicensePlanRef:
```typescript
const name = getLicensePlanRef.operationName;
console.log(name);
```

### Variables
The `GetLicensePlan` query requires an argument of type `GetLicensePlanVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetLicensePlanVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetLicensePlan` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetLicensePlanData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetLicensePlanData {
  licensePlan?: {
    id: UUIDString;
    planCode: string;
    name: string;
    description?: string | null;
    level: number;
    maxStores: number;
    maxUsers: number;
    status: LicensePlanStatus;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & LicensePlan_Key;
}
```
### Using `GetLicensePlan`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getLicensePlan, GetLicensePlanVariables } from '@omniretail/sql-connect';

// The `GetLicensePlan` query requires an argument of type `GetLicensePlanVariables`:
const getLicensePlanVars: GetLicensePlanVariables = {
  id: ..., 
};

// Call the `getLicensePlan()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getLicensePlan(getLicensePlanVars);
// Variables can be defined inline as well.
const { data } = await getLicensePlan({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getLicensePlan(dataConnect, getLicensePlanVars);

console.log(data.licensePlan);

// Or, you can use the `Promise` API.
getLicensePlan(getLicensePlanVars).then((response) => {
  const data = response.data;
  console.log(data.licensePlan);
});
```

### Using `GetLicensePlan`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getLicensePlanRef, GetLicensePlanVariables } from '@omniretail/sql-connect';

// The `GetLicensePlan` query requires an argument of type `GetLicensePlanVariables`:
const getLicensePlanVars: GetLicensePlanVariables = {
  id: ..., 
};

// Call the `getLicensePlanRef()` function to get a reference to the query.
const ref = getLicensePlanRef(getLicensePlanVars);
// Variables can be defined inline as well.
const ref = getLicensePlanRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getLicensePlanRef(dataConnect, getLicensePlanVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.licensePlan);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.licensePlan);
});
```

## GetLicensePlanTrusted
You can execute the `GetLicensePlanTrusted` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
getLicensePlanTrusted(vars: GetLicensePlanTrustedVariables, options?: ExecuteQueryOptions): QueryPromise<GetLicensePlanTrustedData, GetLicensePlanTrustedVariables>;

interface GetLicensePlanTrustedRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetLicensePlanTrustedVariables): QueryRef<GetLicensePlanTrustedData, GetLicensePlanTrustedVariables>;
}
export const getLicensePlanTrustedRef: GetLicensePlanTrustedRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getLicensePlanTrusted(dc: DataConnect, vars: GetLicensePlanTrustedVariables, options?: ExecuteQueryOptions): QueryPromise<GetLicensePlanTrustedData, GetLicensePlanTrustedVariables>;

interface GetLicensePlanTrustedRef {
  ...
  (dc: DataConnect, vars: GetLicensePlanTrustedVariables): QueryRef<GetLicensePlanTrustedData, GetLicensePlanTrustedVariables>;
}
export const getLicensePlanTrustedRef: GetLicensePlanTrustedRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getLicensePlanTrustedRef:
```typescript
const name = getLicensePlanTrustedRef.operationName;
console.log(name);
```

### Variables
The `GetLicensePlanTrusted` query requires an argument of type `GetLicensePlanTrustedVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetLicensePlanTrustedVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetLicensePlanTrusted` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetLicensePlanTrustedData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetLicensePlanTrustedData {
  licensePlan?: {
    id: UUIDString;
    planCode: string;
    name: string;
    description?: string | null;
    level: number;
    maxStores: number;
    maxUsers: number;
    status: LicensePlanStatus;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & LicensePlan_Key;
}
```
### Using `GetLicensePlanTrusted`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getLicensePlanTrusted, GetLicensePlanTrustedVariables } from '@omniretail/sql-connect';

// The `GetLicensePlanTrusted` query requires an argument of type `GetLicensePlanTrustedVariables`:
const getLicensePlanTrustedVars: GetLicensePlanTrustedVariables = {
  id: ..., 
};

// Call the `getLicensePlanTrusted()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getLicensePlanTrusted(getLicensePlanTrustedVars);
// Variables can be defined inline as well.
const { data } = await getLicensePlanTrusted({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getLicensePlanTrusted(dataConnect, getLicensePlanTrustedVars);

console.log(data.licensePlan);

// Or, you can use the `Promise` API.
getLicensePlanTrusted(getLicensePlanTrustedVars).then((response) => {
  const data = response.data;
  console.log(data.licensePlan);
});
```

### Using `GetLicensePlanTrusted`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getLicensePlanTrustedRef, GetLicensePlanTrustedVariables } from '@omniretail/sql-connect';

// The `GetLicensePlanTrusted` query requires an argument of type `GetLicensePlanTrustedVariables`:
const getLicensePlanTrustedVars: GetLicensePlanTrustedVariables = {
  id: ..., 
};

// Call the `getLicensePlanTrustedRef()` function to get a reference to the query.
const ref = getLicensePlanTrustedRef(getLicensePlanTrustedVars);
// Variables can be defined inline as well.
const ref = getLicensePlanTrustedRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getLicensePlanTrustedRef(dataConnect, getLicensePlanTrustedVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.licensePlan);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.licensePlan);
});
```

## GetLicensePlanReferencesTrusted
You can execute the `GetLicensePlanReferencesTrusted` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
getLicensePlanReferencesTrusted(vars: GetLicensePlanReferencesTrustedVariables, options?: ExecuteQueryOptions): QueryPromise<GetLicensePlanReferencesTrustedData, GetLicensePlanReferencesTrustedVariables>;

interface GetLicensePlanReferencesTrustedRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetLicensePlanReferencesTrustedVariables): QueryRef<GetLicensePlanReferencesTrustedData, GetLicensePlanReferencesTrustedVariables>;
}
export const getLicensePlanReferencesTrustedRef: GetLicensePlanReferencesTrustedRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getLicensePlanReferencesTrusted(dc: DataConnect, vars: GetLicensePlanReferencesTrustedVariables, options?: ExecuteQueryOptions): QueryPromise<GetLicensePlanReferencesTrustedData, GetLicensePlanReferencesTrustedVariables>;

interface GetLicensePlanReferencesTrustedRef {
  ...
  (dc: DataConnect, vars: GetLicensePlanReferencesTrustedVariables): QueryRef<GetLicensePlanReferencesTrustedData, GetLicensePlanReferencesTrustedVariables>;
}
export const getLicensePlanReferencesTrustedRef: GetLicensePlanReferencesTrustedRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getLicensePlanReferencesTrustedRef:
```typescript
const name = getLicensePlanReferencesTrustedRef.operationName;
console.log(name);
```

### Variables
The `GetLicensePlanReferencesTrusted` query requires an argument of type `GetLicensePlanReferencesTrustedVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetLicensePlanReferencesTrustedVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetLicensePlanReferencesTrusted` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetLicensePlanReferencesTrustedData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetLicensePlanReferencesTrustedData {
  organizationLicenses: ({
    id: UUIDString;
  } & OrganizationLicense_Key)[];
  licenseHistories: ({
    id: UUIDString;
  } & LicenseHistory_Key)[];
}
```
### Using `GetLicensePlanReferencesTrusted`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getLicensePlanReferencesTrusted, GetLicensePlanReferencesTrustedVariables } from '@omniretail/sql-connect';

// The `GetLicensePlanReferencesTrusted` query requires an argument of type `GetLicensePlanReferencesTrustedVariables`:
const getLicensePlanReferencesTrustedVars: GetLicensePlanReferencesTrustedVariables = {
  id: ..., 
};

// Call the `getLicensePlanReferencesTrusted()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getLicensePlanReferencesTrusted(getLicensePlanReferencesTrustedVars);
// Variables can be defined inline as well.
const { data } = await getLicensePlanReferencesTrusted({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getLicensePlanReferencesTrusted(dataConnect, getLicensePlanReferencesTrustedVars);

console.log(data.organizationLicenses);
console.log(data.licenseHistories);

// Or, you can use the `Promise` API.
getLicensePlanReferencesTrusted(getLicensePlanReferencesTrustedVars).then((response) => {
  const data = response.data;
  console.log(data.organizationLicenses);
  console.log(data.licenseHistories);
});
```

### Using `GetLicensePlanReferencesTrusted`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getLicensePlanReferencesTrustedRef, GetLicensePlanReferencesTrustedVariables } from '@omniretail/sql-connect';

// The `GetLicensePlanReferencesTrusted` query requires an argument of type `GetLicensePlanReferencesTrustedVariables`:
const getLicensePlanReferencesTrustedVars: GetLicensePlanReferencesTrustedVariables = {
  id: ..., 
};

// Call the `getLicensePlanReferencesTrustedRef()` function to get a reference to the query.
const ref = getLicensePlanReferencesTrustedRef(getLicensePlanReferencesTrustedVars);
// Variables can be defined inline as well.
const ref = getLicensePlanReferencesTrustedRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getLicensePlanReferencesTrustedRef(dataConnect, getLicensePlanReferencesTrustedVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.organizationLicenses);
console.log(data.licenseHistories);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.organizationLicenses);
  console.log(data.licenseHistories);
});
```

## ListOrganizations
You can execute the `ListOrganizations` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
listOrganizations(options?: ExecuteQueryOptions): QueryPromise<ListOrganizationsData, undefined>;

interface ListOrganizationsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListOrganizationsData, undefined>;
}
export const listOrganizationsRef: ListOrganizationsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listOrganizations(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListOrganizationsData, undefined>;

interface ListOrganizationsRef {
  ...
  (dc: DataConnect): QueryRef<ListOrganizationsData, undefined>;
}
export const listOrganizationsRef: ListOrganizationsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listOrganizationsRef:
```typescript
const name = listOrganizationsRef.operationName;
console.log(name);
```

### Variables
The `ListOrganizations` query has no variables.
### Return Type
Recall that executing the `ListOrganizations` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListOrganizationsData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListOrganizationsData {
  organizations: ({
    id: UUIDString;
    organizationCode: string;
    businessName: string;
    legalEntityName?: string | null;
    taxId?: string | null;
    primaryContactName: string;
    email: string;
    phone: string;
    address?: string | null;
    city?: string | null;
    state?: string | null;
    postalCode?: string | null;
    timezone: string;
    currency: string;
    status: OrganizationStatus;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & Organization_Key)[];
}
```
### Using `ListOrganizations`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listOrganizations } from '@omniretail/sql-connect';


// Call the `listOrganizations()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listOrganizations();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listOrganizations(dataConnect);

console.log(data.organizations);

// Or, you can use the `Promise` API.
listOrganizations().then((response) => {
  const data = response.data;
  console.log(data.organizations);
});
```

### Using `ListOrganizations`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listOrganizationsRef } from '@omniretail/sql-connect';


// Call the `listOrganizationsRef()` function to get a reference to the query.
const ref = listOrganizationsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listOrganizationsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.organizations);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.organizations);
});
```

## GetOrganization
You can execute the `GetOrganization` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
getOrganization(vars: GetOrganizationVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganizationData, GetOrganizationVariables>;

interface GetOrganizationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOrganizationVariables): QueryRef<GetOrganizationData, GetOrganizationVariables>;
}
export const getOrganizationRef: GetOrganizationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getOrganization(dc: DataConnect, vars: GetOrganizationVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganizationData, GetOrganizationVariables>;

interface GetOrganizationRef {
  ...
  (dc: DataConnect, vars: GetOrganizationVariables): QueryRef<GetOrganizationData, GetOrganizationVariables>;
}
export const getOrganizationRef: GetOrganizationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getOrganizationRef:
```typescript
const name = getOrganizationRef.operationName;
console.log(name);
```

### Variables
The `GetOrganization` query requires an argument of type `GetOrganizationVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetOrganizationVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetOrganization` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetOrganizationData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetOrganizationData {
  organization?: {
    id: UUIDString;
    organizationCode: string;
    businessName: string;
    legalEntityName?: string | null;
    taxId?: string | null;
    primaryContactName: string;
    email: string;
    phone: string;
    address?: string | null;
    city?: string | null;
    state?: string | null;
    postalCode?: string | null;
    timezone: string;
    currency: string;
    status: OrganizationStatus;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & Organization_Key;
}
```
### Using `GetOrganization`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getOrganization, GetOrganizationVariables } from '@omniretail/sql-connect';

// The `GetOrganization` query requires an argument of type `GetOrganizationVariables`:
const getOrganizationVars: GetOrganizationVariables = {
  id: ..., 
};

// Call the `getOrganization()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getOrganization(getOrganizationVars);
// Variables can be defined inline as well.
const { data } = await getOrganization({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getOrganization(dataConnect, getOrganizationVars);

console.log(data.organization);

// Or, you can use the `Promise` API.
getOrganization(getOrganizationVars).then((response) => {
  const data = response.data;
  console.log(data.organization);
});
```

### Using `GetOrganization`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getOrganizationRef, GetOrganizationVariables } from '@omniretail/sql-connect';

// The `GetOrganization` query requires an argument of type `GetOrganizationVariables`:
const getOrganizationVars: GetOrganizationVariables = {
  id: ..., 
};

// Call the `getOrganizationRef()` function to get a reference to the query.
const ref = getOrganizationRef(getOrganizationVars);
// Variables can be defined inline as well.
const ref = getOrganizationRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getOrganizationRef(dataConnect, getOrganizationVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.organization);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.organization);
});
```

## GetOrganizationTrusted
You can execute the `GetOrganizationTrusted` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
getOrganizationTrusted(vars: GetOrganizationTrustedVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganizationTrustedData, GetOrganizationTrustedVariables>;

interface GetOrganizationTrustedRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOrganizationTrustedVariables): QueryRef<GetOrganizationTrustedData, GetOrganizationTrustedVariables>;
}
export const getOrganizationTrustedRef: GetOrganizationTrustedRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getOrganizationTrusted(dc: DataConnect, vars: GetOrganizationTrustedVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganizationTrustedData, GetOrganizationTrustedVariables>;

interface GetOrganizationTrustedRef {
  ...
  (dc: DataConnect, vars: GetOrganizationTrustedVariables): QueryRef<GetOrganizationTrustedData, GetOrganizationTrustedVariables>;
}
export const getOrganizationTrustedRef: GetOrganizationTrustedRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getOrganizationTrustedRef:
```typescript
const name = getOrganizationTrustedRef.operationName;
console.log(name);
```

### Variables
The `GetOrganizationTrusted` query requires an argument of type `GetOrganizationTrustedVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetOrganizationTrustedVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetOrganizationTrusted` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetOrganizationTrustedData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetOrganizationTrustedData {
  organization?: {
    id: UUIDString;
    organizationCode: string;
    businessName: string;
    legalEntityName?: string | null;
    taxId?: string | null;
    primaryContactName: string;
    email: string;
    phone: string;
    address?: string | null;
    city?: string | null;
    state?: string | null;
    postalCode?: string | null;
    timezone: string;
    currency: string;
    status: OrganizationStatus;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & Organization_Key;
}
```
### Using `GetOrganizationTrusted`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getOrganizationTrusted, GetOrganizationTrustedVariables } from '@omniretail/sql-connect';

// The `GetOrganizationTrusted` query requires an argument of type `GetOrganizationTrustedVariables`:
const getOrganizationTrustedVars: GetOrganizationTrustedVariables = {
  id: ..., 
};

// Call the `getOrganizationTrusted()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getOrganizationTrusted(getOrganizationTrustedVars);
// Variables can be defined inline as well.
const { data } = await getOrganizationTrusted({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getOrganizationTrusted(dataConnect, getOrganizationTrustedVars);

console.log(data.organization);

// Or, you can use the `Promise` API.
getOrganizationTrusted(getOrganizationTrustedVars).then((response) => {
  const data = response.data;
  console.log(data.organization);
});
```

### Using `GetOrganizationTrusted`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getOrganizationTrustedRef, GetOrganizationTrustedVariables } from '@omniretail/sql-connect';

// The `GetOrganizationTrusted` query requires an argument of type `GetOrganizationTrustedVariables`:
const getOrganizationTrustedVars: GetOrganizationTrustedVariables = {
  id: ..., 
};

// Call the `getOrganizationTrustedRef()` function to get a reference to the query.
const ref = getOrganizationTrustedRef(getOrganizationTrustedVars);
// Variables can be defined inline as well.
const ref = getOrganizationTrustedRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getOrganizationTrustedRef(dataConnect, getOrganizationTrustedVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.organization);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.organization);
});
```

## ListOrganizationAdministrators
You can execute the `ListOrganizationAdministrators` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
listOrganizationAdministrators(vars: ListOrganizationAdministratorsVariables, options?: ExecuteQueryOptions): QueryPromise<ListOrganizationAdministratorsData, ListOrganizationAdministratorsVariables>;

interface ListOrganizationAdministratorsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListOrganizationAdministratorsVariables): QueryRef<ListOrganizationAdministratorsData, ListOrganizationAdministratorsVariables>;
}
export const listOrganizationAdministratorsRef: ListOrganizationAdministratorsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listOrganizationAdministrators(dc: DataConnect, vars: ListOrganizationAdministratorsVariables, options?: ExecuteQueryOptions): QueryPromise<ListOrganizationAdministratorsData, ListOrganizationAdministratorsVariables>;

interface ListOrganizationAdministratorsRef {
  ...
  (dc: DataConnect, vars: ListOrganizationAdministratorsVariables): QueryRef<ListOrganizationAdministratorsData, ListOrganizationAdministratorsVariables>;
}
export const listOrganizationAdministratorsRef: ListOrganizationAdministratorsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listOrganizationAdministratorsRef:
```typescript
const name = listOrganizationAdministratorsRef.operationName;
console.log(name);
```

### Variables
The `ListOrganizationAdministrators` query requires an argument of type `ListOrganizationAdministratorsVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListOrganizationAdministratorsVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that executing the `ListOrganizationAdministrators` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListOrganizationAdministratorsData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListOrganizationAdministratorsData {
  organizationMemberships: ({
    createdAt: TimestampString;
    status: MembershipStatus;
    user: {
      id: UUIDString;
      username: string;
      email: string;
      displayName: string;
      phone?: string | null;
      status: AppUserStatus;
      createdAt: TimestampString;
      updatedAt: TimestampString;
      lastLoginAt?: TimestampString | null;
    } & AppUser_Key;
  })[];
}
```
### Using `ListOrganizationAdministrators`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listOrganizationAdministrators, ListOrganizationAdministratorsVariables } from '@omniretail/sql-connect';

// The `ListOrganizationAdministrators` query requires an argument of type `ListOrganizationAdministratorsVariables`:
const listOrganizationAdministratorsVars: ListOrganizationAdministratorsVariables = {
  organizationId: ..., 
};

// Call the `listOrganizationAdministrators()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listOrganizationAdministrators(listOrganizationAdministratorsVars);
// Variables can be defined inline as well.
const { data } = await listOrganizationAdministrators({ organizationId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listOrganizationAdministrators(dataConnect, listOrganizationAdministratorsVars);

console.log(data.organizationMemberships);

// Or, you can use the `Promise` API.
listOrganizationAdministrators(listOrganizationAdministratorsVars).then((response) => {
  const data = response.data;
  console.log(data.organizationMemberships);
});
```

### Using `ListOrganizationAdministrators`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listOrganizationAdministratorsRef, ListOrganizationAdministratorsVariables } from '@omniretail/sql-connect';

// The `ListOrganizationAdministrators` query requires an argument of type `ListOrganizationAdministratorsVariables`:
const listOrganizationAdministratorsVars: ListOrganizationAdministratorsVariables = {
  organizationId: ..., 
};

// Call the `listOrganizationAdministratorsRef()` function to get a reference to the query.
const ref = listOrganizationAdministratorsRef(listOrganizationAdministratorsVars);
// Variables can be defined inline as well.
const ref = listOrganizationAdministratorsRef({ organizationId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listOrganizationAdministratorsRef(dataConnect, listOrganizationAdministratorsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.organizationMemberships);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.organizationMemberships);
});
```

## GetOrganizationAdministrator
You can execute the `GetOrganizationAdministrator` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
getOrganizationAdministrator(vars: GetOrganizationAdministratorVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganizationAdministratorData, GetOrganizationAdministratorVariables>;

interface GetOrganizationAdministratorRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOrganizationAdministratorVariables): QueryRef<GetOrganizationAdministratorData, GetOrganizationAdministratorVariables>;
}
export const getOrganizationAdministratorRef: GetOrganizationAdministratorRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getOrganizationAdministrator(dc: DataConnect, vars: GetOrganizationAdministratorVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganizationAdministratorData, GetOrganizationAdministratorVariables>;

interface GetOrganizationAdministratorRef {
  ...
  (dc: DataConnect, vars: GetOrganizationAdministratorVariables): QueryRef<GetOrganizationAdministratorData, GetOrganizationAdministratorVariables>;
}
export const getOrganizationAdministratorRef: GetOrganizationAdministratorRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getOrganizationAdministratorRef:
```typescript
const name = getOrganizationAdministratorRef.operationName;
console.log(name);
```

### Variables
The `GetOrganizationAdministrator` query requires an argument of type `GetOrganizationAdministratorVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetOrganizationAdministratorVariables {
  organizationId: UUIDString;
  userId: UUIDString;
}
```
### Return Type
Recall that executing the `GetOrganizationAdministrator` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetOrganizationAdministratorData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetOrganizationAdministratorData {
  organizationMemberships: ({
    createdAt: TimestampString;
    status: MembershipStatus;
    user: {
      id: UUIDString;
      username: string;
      email: string;
      displayName: string;
      phone?: string | null;
      status: AppUserStatus;
      createdAt: TimestampString;
      updatedAt: TimestampString;
      lastLoginAt?: TimestampString | null;
    } & AppUser_Key;
  })[];
}
```
### Using `GetOrganizationAdministrator`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getOrganizationAdministrator, GetOrganizationAdministratorVariables } from '@omniretail/sql-connect';

// The `GetOrganizationAdministrator` query requires an argument of type `GetOrganizationAdministratorVariables`:
const getOrganizationAdministratorVars: GetOrganizationAdministratorVariables = {
  organizationId: ..., 
  userId: ..., 
};

// Call the `getOrganizationAdministrator()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getOrganizationAdministrator(getOrganizationAdministratorVars);
// Variables can be defined inline as well.
const { data } = await getOrganizationAdministrator({ organizationId: ..., userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getOrganizationAdministrator(dataConnect, getOrganizationAdministratorVars);

console.log(data.organizationMemberships);

// Or, you can use the `Promise` API.
getOrganizationAdministrator(getOrganizationAdministratorVars).then((response) => {
  const data = response.data;
  console.log(data.organizationMemberships);
});
```

### Using `GetOrganizationAdministrator`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getOrganizationAdministratorRef, GetOrganizationAdministratorVariables } from '@omniretail/sql-connect';

// The `GetOrganizationAdministrator` query requires an argument of type `GetOrganizationAdministratorVariables`:
const getOrganizationAdministratorVars: GetOrganizationAdministratorVariables = {
  organizationId: ..., 
  userId: ..., 
};

// Call the `getOrganizationAdministratorRef()` function to get a reference to the query.
const ref = getOrganizationAdministratorRef(getOrganizationAdministratorVars);
// Variables can be defined inline as well.
const ref = getOrganizationAdministratorRef({ organizationId: ..., userId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getOrganizationAdministratorRef(dataConnect, getOrganizationAdministratorVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.organizationMemberships);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.organizationMemberships);
});
```

## ResolveOrganizationAdministratorIdentity
You can execute the `ResolveOrganizationAdministratorIdentity` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
resolveOrganizationAdministratorIdentity(vars: ResolveOrganizationAdministratorIdentityVariables, options?: ExecuteQueryOptions): QueryPromise<ResolveOrganizationAdministratorIdentityData, ResolveOrganizationAdministratorIdentityVariables>;

interface ResolveOrganizationAdministratorIdentityRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ResolveOrganizationAdministratorIdentityVariables): QueryRef<ResolveOrganizationAdministratorIdentityData, ResolveOrganizationAdministratorIdentityVariables>;
}
export const resolveOrganizationAdministratorIdentityRef: ResolveOrganizationAdministratorIdentityRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
resolveOrganizationAdministratorIdentity(dc: DataConnect, vars: ResolveOrganizationAdministratorIdentityVariables, options?: ExecuteQueryOptions): QueryPromise<ResolveOrganizationAdministratorIdentityData, ResolveOrganizationAdministratorIdentityVariables>;

interface ResolveOrganizationAdministratorIdentityRef {
  ...
  (dc: DataConnect, vars: ResolveOrganizationAdministratorIdentityVariables): QueryRef<ResolveOrganizationAdministratorIdentityData, ResolveOrganizationAdministratorIdentityVariables>;
}
export const resolveOrganizationAdministratorIdentityRef: ResolveOrganizationAdministratorIdentityRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the resolveOrganizationAdministratorIdentityRef:
```typescript
const name = resolveOrganizationAdministratorIdentityRef.operationName;
console.log(name);
```

### Variables
The `ResolveOrganizationAdministratorIdentity` query requires an argument of type `ResolveOrganizationAdministratorIdentityVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ResolveOrganizationAdministratorIdentityVariables {
  organizationId: UUIDString;
  appUserId: UUIDString;
}
```
### Return Type
Recall that executing the `ResolveOrganizationAdministratorIdentity` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ResolveOrganizationAdministratorIdentityData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ResolveOrganizationAdministratorIdentityData {
  organizationMembership?: {
    organizationId: UUIDString;
    userId: UUIDString;
    status: MembershipStatus;
    user: {
      id: UUIDString;
      firebaseUid: string;
      status: AppUserStatus;
      email: string;
    } & AppUser_Key;
  } & OrganizationMembership_Key;
}
```
### Using `ResolveOrganizationAdministratorIdentity`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, resolveOrganizationAdministratorIdentity, ResolveOrganizationAdministratorIdentityVariables } from '@omniretail/sql-connect';

// The `ResolveOrganizationAdministratorIdentity` query requires an argument of type `ResolveOrganizationAdministratorIdentityVariables`:
const resolveOrganizationAdministratorIdentityVars: ResolveOrganizationAdministratorIdentityVariables = {
  organizationId: ..., 
  appUserId: ..., 
};

// Call the `resolveOrganizationAdministratorIdentity()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await resolveOrganizationAdministratorIdentity(resolveOrganizationAdministratorIdentityVars);
// Variables can be defined inline as well.
const { data } = await resolveOrganizationAdministratorIdentity({ organizationId: ..., appUserId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await resolveOrganizationAdministratorIdentity(dataConnect, resolveOrganizationAdministratorIdentityVars);

console.log(data.organizationMembership);

// Or, you can use the `Promise` API.
resolveOrganizationAdministratorIdentity(resolveOrganizationAdministratorIdentityVars).then((response) => {
  const data = response.data;
  console.log(data.organizationMembership);
});
```

### Using `ResolveOrganizationAdministratorIdentity`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, resolveOrganizationAdministratorIdentityRef, ResolveOrganizationAdministratorIdentityVariables } from '@omniretail/sql-connect';

// The `ResolveOrganizationAdministratorIdentity` query requires an argument of type `ResolveOrganizationAdministratorIdentityVariables`:
const resolveOrganizationAdministratorIdentityVars: ResolveOrganizationAdministratorIdentityVariables = {
  organizationId: ..., 
  appUserId: ..., 
};

// Call the `resolveOrganizationAdministratorIdentityRef()` function to get a reference to the query.
const ref = resolveOrganizationAdministratorIdentityRef(resolveOrganizationAdministratorIdentityVars);
// Variables can be defined inline as well.
const ref = resolveOrganizationAdministratorIdentityRef({ organizationId: ..., appUserId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = resolveOrganizationAdministratorIdentityRef(dataConnect, resolveOrganizationAdministratorIdentityVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.organizationMembership);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.organizationMembership);
});
```

## GetLifecycleIdempotency
You can execute the `GetLifecycleIdempotency` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
getLifecycleIdempotency(vars: GetLifecycleIdempotencyVariables, options?: ExecuteQueryOptions): QueryPromise<GetLifecycleIdempotencyData, GetLifecycleIdempotencyVariables>;

interface GetLifecycleIdempotencyRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetLifecycleIdempotencyVariables): QueryRef<GetLifecycleIdempotencyData, GetLifecycleIdempotencyVariables>;
}
export const getLifecycleIdempotencyRef: GetLifecycleIdempotencyRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getLifecycleIdempotency(dc: DataConnect, vars: GetLifecycleIdempotencyVariables, options?: ExecuteQueryOptions): QueryPromise<GetLifecycleIdempotencyData, GetLifecycleIdempotencyVariables>;

interface GetLifecycleIdempotencyRef {
  ...
  (dc: DataConnect, vars: GetLifecycleIdempotencyVariables): QueryRef<GetLifecycleIdempotencyData, GetLifecycleIdempotencyVariables>;
}
export const getLifecycleIdempotencyRef: GetLifecycleIdempotencyRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getLifecycleIdempotencyRef:
```typescript
const name = getLifecycleIdempotencyRef.operationName;
console.log(name);
```

### Variables
The `GetLifecycleIdempotency` query requires an argument of type `GetLifecycleIdempotencyVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetLifecycleIdempotencyVariables {
  idempotencyKey: string;
}
```
### Return Type
Recall that executing the `GetLifecycleIdempotency` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetLifecycleIdempotencyData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetLifecycleIdempotencyData {
  lifecycleIdempotency?: {
    idempotencyKey: string;
    operationType: string;
    status: ProvisioningAttemptStatus;
    requestFingerprint: string;
    resultReference?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
    completedAt?: TimestampString | null;
  } & LifecycleIdempotency_Key;
}
```
### Using `GetLifecycleIdempotency`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getLifecycleIdempotency, GetLifecycleIdempotencyVariables } from '@omniretail/sql-connect';

// The `GetLifecycleIdempotency` query requires an argument of type `GetLifecycleIdempotencyVariables`:
const getLifecycleIdempotencyVars: GetLifecycleIdempotencyVariables = {
  idempotencyKey: ..., 
};

// Call the `getLifecycleIdempotency()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getLifecycleIdempotency(getLifecycleIdempotencyVars);
// Variables can be defined inline as well.
const { data } = await getLifecycleIdempotency({ idempotencyKey: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getLifecycleIdempotency(dataConnect, getLifecycleIdempotencyVars);

console.log(data.lifecycleIdempotency);

// Or, you can use the `Promise` API.
getLifecycleIdempotency(getLifecycleIdempotencyVars).then((response) => {
  const data = response.data;
  console.log(data.lifecycleIdempotency);
});
```

### Using `GetLifecycleIdempotency`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getLifecycleIdempotencyRef, GetLifecycleIdempotencyVariables } from '@omniretail/sql-connect';

// The `GetLifecycleIdempotency` query requires an argument of type `GetLifecycleIdempotencyVariables`:
const getLifecycleIdempotencyVars: GetLifecycleIdempotencyVariables = {
  idempotencyKey: ..., 
};

// Call the `getLifecycleIdempotencyRef()` function to get a reference to the query.
const ref = getLifecycleIdempotencyRef(getLifecycleIdempotencyVars);
// Variables can be defined inline as well.
const ref = getLifecycleIdempotencyRef({ idempotencyKey: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getLifecycleIdempotencyRef(dataConnect, getLifecycleIdempotencyVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.lifecycleIdempotency);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.lifecycleIdempotency);
});
```

## GetOrganizationLicense
You can execute the `GetOrganizationLicense` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
getOrganizationLicense(vars: GetOrganizationLicenseVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganizationLicenseData, GetOrganizationLicenseVariables>;

interface GetOrganizationLicenseRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOrganizationLicenseVariables): QueryRef<GetOrganizationLicenseData, GetOrganizationLicenseVariables>;
}
export const getOrganizationLicenseRef: GetOrganizationLicenseRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getOrganizationLicense(dc: DataConnect, vars: GetOrganizationLicenseVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganizationLicenseData, GetOrganizationLicenseVariables>;

interface GetOrganizationLicenseRef {
  ...
  (dc: DataConnect, vars: GetOrganizationLicenseVariables): QueryRef<GetOrganizationLicenseData, GetOrganizationLicenseVariables>;
}
export const getOrganizationLicenseRef: GetOrganizationLicenseRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getOrganizationLicenseRef:
```typescript
const name = getOrganizationLicenseRef.operationName;
console.log(name);
```

### Variables
The `GetOrganizationLicense` query requires an argument of type `GetOrganizationLicenseVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetOrganizationLicenseVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that executing the `GetOrganizationLicense` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetOrganizationLicenseData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetOrganizationLicenseData {
  organizationLicenses: ({
    id: UUIDString;
    organization: {
      id: UUIDString;
    } & Organization_Key;
    plan: {
      id: UUIDString;
      planCode: string;
      name: string;
      level: number;
      maxStores: number;
      maxUsers: number;
      status: LicensePlanStatus;
    } & LicensePlan_Key;
    startDate: DateString;
    expiryDate: DateString;
    negotiatedPrice: number;
    currency: string;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & OrganizationLicense_Key)[];
}
```
### Using `GetOrganizationLicense`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getOrganizationLicense, GetOrganizationLicenseVariables } from '@omniretail/sql-connect';

// The `GetOrganizationLicense` query requires an argument of type `GetOrganizationLicenseVariables`:
const getOrganizationLicenseVars: GetOrganizationLicenseVariables = {
  organizationId: ..., 
};

// Call the `getOrganizationLicense()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getOrganizationLicense(getOrganizationLicenseVars);
// Variables can be defined inline as well.
const { data } = await getOrganizationLicense({ organizationId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getOrganizationLicense(dataConnect, getOrganizationLicenseVars);

console.log(data.organizationLicenses);

// Or, you can use the `Promise` API.
getOrganizationLicense(getOrganizationLicenseVars).then((response) => {
  const data = response.data;
  console.log(data.organizationLicenses);
});
```

### Using `GetOrganizationLicense`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getOrganizationLicenseRef, GetOrganizationLicenseVariables } from '@omniretail/sql-connect';

// The `GetOrganizationLicense` query requires an argument of type `GetOrganizationLicenseVariables`:
const getOrganizationLicenseVars: GetOrganizationLicenseVariables = {
  organizationId: ..., 
};

// Call the `getOrganizationLicenseRef()` function to get a reference to the query.
const ref = getOrganizationLicenseRef(getOrganizationLicenseVars);
// Variables can be defined inline as well.
const ref = getOrganizationLicenseRef({ organizationId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getOrganizationLicenseRef(dataConnect, getOrganizationLicenseVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.organizationLicenses);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.organizationLicenses);
});
```

## GetOrganizationLicenseTrusted
You can execute the `GetOrganizationLicenseTrusted` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
getOrganizationLicenseTrusted(vars: GetOrganizationLicenseTrustedVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganizationLicenseTrustedData, GetOrganizationLicenseTrustedVariables>;

interface GetOrganizationLicenseTrustedRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOrganizationLicenseTrustedVariables): QueryRef<GetOrganizationLicenseTrustedData, GetOrganizationLicenseTrustedVariables>;
}
export const getOrganizationLicenseTrustedRef: GetOrganizationLicenseTrustedRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getOrganizationLicenseTrusted(dc: DataConnect, vars: GetOrganizationLicenseTrustedVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganizationLicenseTrustedData, GetOrganizationLicenseTrustedVariables>;

interface GetOrganizationLicenseTrustedRef {
  ...
  (dc: DataConnect, vars: GetOrganizationLicenseTrustedVariables): QueryRef<GetOrganizationLicenseTrustedData, GetOrganizationLicenseTrustedVariables>;
}
export const getOrganizationLicenseTrustedRef: GetOrganizationLicenseTrustedRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getOrganizationLicenseTrustedRef:
```typescript
const name = getOrganizationLicenseTrustedRef.operationName;
console.log(name);
```

### Variables
The `GetOrganizationLicenseTrusted` query requires an argument of type `GetOrganizationLicenseTrustedVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetOrganizationLicenseTrustedVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that executing the `GetOrganizationLicenseTrusted` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetOrganizationLicenseTrustedData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetOrganizationLicenseTrustedData {
  organizationLicenses: ({
    id: UUIDString;
    organization: {
      id: UUIDString;
    } & Organization_Key;
    plan: {
      id: UUIDString;
      planCode: string;
      name: string;
      level: number;
      maxStores: number;
      maxUsers: number;
      status: LicensePlanStatus;
    } & LicensePlan_Key;
    startDate: DateString;
    expiryDate: DateString;
    negotiatedPrice: number;
    currency: string;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & OrganizationLicense_Key)[];
}
```
### Using `GetOrganizationLicenseTrusted`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getOrganizationLicenseTrusted, GetOrganizationLicenseTrustedVariables } from '@omniretail/sql-connect';

// The `GetOrganizationLicenseTrusted` query requires an argument of type `GetOrganizationLicenseTrustedVariables`:
const getOrganizationLicenseTrustedVars: GetOrganizationLicenseTrustedVariables = {
  organizationId: ..., 
};

// Call the `getOrganizationLicenseTrusted()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getOrganizationLicenseTrusted(getOrganizationLicenseTrustedVars);
// Variables can be defined inline as well.
const { data } = await getOrganizationLicenseTrusted({ organizationId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getOrganizationLicenseTrusted(dataConnect, getOrganizationLicenseTrustedVars);

console.log(data.organizationLicenses);

// Or, you can use the `Promise` API.
getOrganizationLicenseTrusted(getOrganizationLicenseTrustedVars).then((response) => {
  const data = response.data;
  console.log(data.organizationLicenses);
});
```

### Using `GetOrganizationLicenseTrusted`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getOrganizationLicenseTrustedRef, GetOrganizationLicenseTrustedVariables } from '@omniretail/sql-connect';

// The `GetOrganizationLicenseTrusted` query requires an argument of type `GetOrganizationLicenseTrustedVariables`:
const getOrganizationLicenseTrustedVars: GetOrganizationLicenseTrustedVariables = {
  organizationId: ..., 
};

// Call the `getOrganizationLicenseTrustedRef()` function to get a reference to the query.
const ref = getOrganizationLicenseTrustedRef(getOrganizationLicenseTrustedVars);
// Variables can be defined inline as well.
const ref = getOrganizationLicenseTrustedRef({ organizationId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getOrganizationLicenseTrustedRef(dataConnect, getOrganizationLicenseTrustedVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.organizationLicenses);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.organizationLicenses);
});
```

## GetOrganizationLicenseHistory
You can execute the `GetOrganizationLicenseHistory` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
getOrganizationLicenseHistory(vars: GetOrganizationLicenseHistoryVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganizationLicenseHistoryData, GetOrganizationLicenseHistoryVariables>;

interface GetOrganizationLicenseHistoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOrganizationLicenseHistoryVariables): QueryRef<GetOrganizationLicenseHistoryData, GetOrganizationLicenseHistoryVariables>;
}
export const getOrganizationLicenseHistoryRef: GetOrganizationLicenseHistoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getOrganizationLicenseHistory(dc: DataConnect, vars: GetOrganizationLicenseHistoryVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganizationLicenseHistoryData, GetOrganizationLicenseHistoryVariables>;

interface GetOrganizationLicenseHistoryRef {
  ...
  (dc: DataConnect, vars: GetOrganizationLicenseHistoryVariables): QueryRef<GetOrganizationLicenseHistoryData, GetOrganizationLicenseHistoryVariables>;
}
export const getOrganizationLicenseHistoryRef: GetOrganizationLicenseHistoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getOrganizationLicenseHistoryRef:
```typescript
const name = getOrganizationLicenseHistoryRef.operationName;
console.log(name);
```

### Variables
The `GetOrganizationLicenseHistory` query requires an argument of type `GetOrganizationLicenseHistoryVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetOrganizationLicenseHistoryVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that executing the `GetOrganizationLicenseHistory` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetOrganizationLicenseHistoryData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetOrganizationLicenseHistoryData {
  licenseHistories: ({
    id: UUIDString;
    license: {
      id: UUIDString;
    } & OrganizationLicense_Key;
    organization: {
      id: UUIDString;
    } & Organization_Key;
    eventType: LicenseEventType;
    eventAt: TimestampString;
    plan: {
      id: UUIDString;
      planCode: string;
      name: string;
      level: number;
      maxStores: number;
      maxUsers: number;
    } & LicensePlan_Key;
    planCode: string;
    planName: string;
    planLevel: number;
    maxStores: number;
    maxUsers: number;
    startDate: DateString;
    expiryDate: DateString;
    negotiatedPrice: number;
    currency: string;
    changes?: unknown | null;
  } & LicenseHistory_Key)[];
}
```
### Using `GetOrganizationLicenseHistory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getOrganizationLicenseHistory, GetOrganizationLicenseHistoryVariables } from '@omniretail/sql-connect';

// The `GetOrganizationLicenseHistory` query requires an argument of type `GetOrganizationLicenseHistoryVariables`:
const getOrganizationLicenseHistoryVars: GetOrganizationLicenseHistoryVariables = {
  organizationId: ..., 
};

// Call the `getOrganizationLicenseHistory()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getOrganizationLicenseHistory(getOrganizationLicenseHistoryVars);
// Variables can be defined inline as well.
const { data } = await getOrganizationLicenseHistory({ organizationId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getOrganizationLicenseHistory(dataConnect, getOrganizationLicenseHistoryVars);

console.log(data.licenseHistories);

// Or, you can use the `Promise` API.
getOrganizationLicenseHistory(getOrganizationLicenseHistoryVars).then((response) => {
  const data = response.data;
  console.log(data.licenseHistories);
});
```

### Using `GetOrganizationLicenseHistory`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getOrganizationLicenseHistoryRef, GetOrganizationLicenseHistoryVariables } from '@omniretail/sql-connect';

// The `GetOrganizationLicenseHistory` query requires an argument of type `GetOrganizationLicenseHistoryVariables`:
const getOrganizationLicenseHistoryVars: GetOrganizationLicenseHistoryVariables = {
  organizationId: ..., 
};

// Call the `getOrganizationLicenseHistoryRef()` function to get a reference to the query.
const ref = getOrganizationLicenseHistoryRef(getOrganizationLicenseHistoryVars);
// Variables can be defined inline as well.
const ref = getOrganizationLicenseHistoryRef({ organizationId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getOrganizationLicenseHistoryRef(dataConnect, getOrganizationLicenseHistoryVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.licenseHistories);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.licenseHistories);
});
```

## GetOrganizationLicensePublic
You can execute the `GetOrganizationLicensePublic` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
getOrganizationLicensePublic(vars: GetOrganizationLicensePublicVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganizationLicensePublicData, GetOrganizationLicensePublicVariables>;

interface GetOrganizationLicensePublicRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOrganizationLicensePublicVariables): QueryRef<GetOrganizationLicensePublicData, GetOrganizationLicensePublicVariables>;
}
export const getOrganizationLicensePublicRef: GetOrganizationLicensePublicRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getOrganizationLicensePublic(dc: DataConnect, vars: GetOrganizationLicensePublicVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganizationLicensePublicData, GetOrganizationLicensePublicVariables>;

interface GetOrganizationLicensePublicRef {
  ...
  (dc: DataConnect, vars: GetOrganizationLicensePublicVariables): QueryRef<GetOrganizationLicensePublicData, GetOrganizationLicensePublicVariables>;
}
export const getOrganizationLicensePublicRef: GetOrganizationLicensePublicRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getOrganizationLicensePublicRef:
```typescript
const name = getOrganizationLicensePublicRef.operationName;
console.log(name);
```

### Variables
The `GetOrganizationLicensePublic` query requires an argument of type `GetOrganizationLicensePublicVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetOrganizationLicensePublicVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that executing the `GetOrganizationLicensePublic` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetOrganizationLicensePublicData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetOrganizationLicensePublicData {
  organizationLicenses: ({
    id: UUIDString;
    organization: {
      id: UUIDString;
    } & Organization_Key;
    plan: {
      id: UUIDString;
      planCode: string;
      name: string;
      level: number;
      maxStores: number;
      maxUsers: number;
      status: LicensePlanStatus;
    } & LicensePlan_Key;
    startDate: DateString;
    expiryDate: DateString;
    negotiatedPrice: number;
    currency: string;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & OrganizationLicense_Key)[];
}
```
### Using `GetOrganizationLicensePublic`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getOrganizationLicensePublic, GetOrganizationLicensePublicVariables } from '@omniretail/sql-connect';

// The `GetOrganizationLicensePublic` query requires an argument of type `GetOrganizationLicensePublicVariables`:
const getOrganizationLicensePublicVars: GetOrganizationLicensePublicVariables = {
  organizationId: ..., 
};

// Call the `getOrganizationLicensePublic()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getOrganizationLicensePublic(getOrganizationLicensePublicVars);
// Variables can be defined inline as well.
const { data } = await getOrganizationLicensePublic({ organizationId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getOrganizationLicensePublic(dataConnect, getOrganizationLicensePublicVars);

console.log(data.organizationLicenses);

// Or, you can use the `Promise` API.
getOrganizationLicensePublic(getOrganizationLicensePublicVars).then((response) => {
  const data = response.data;
  console.log(data.organizationLicenses);
});
```

### Using `GetOrganizationLicensePublic`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getOrganizationLicensePublicRef, GetOrganizationLicensePublicVariables } from '@omniretail/sql-connect';

// The `GetOrganizationLicensePublic` query requires an argument of type `GetOrganizationLicensePublicVariables`:
const getOrganizationLicensePublicVars: GetOrganizationLicensePublicVariables = {
  organizationId: ..., 
};

// Call the `getOrganizationLicensePublicRef()` function to get a reference to the query.
const ref = getOrganizationLicensePublicRef(getOrganizationLicensePublicVars);
// Variables can be defined inline as well.
const ref = getOrganizationLicensePublicRef({ organizationId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getOrganizationLicensePublicRef(dataConnect, getOrganizationLicensePublicVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.organizationLicenses);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.organizationLicenses);
});
```

## GetOrganizationLicenseHistoryPublic
You can execute the `GetOrganizationLicenseHistoryPublic` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
getOrganizationLicenseHistoryPublic(vars: GetOrganizationLicenseHistoryPublicVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganizationLicenseHistoryPublicData, GetOrganizationLicenseHistoryPublicVariables>;

interface GetOrganizationLicenseHistoryPublicRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOrganizationLicenseHistoryPublicVariables): QueryRef<GetOrganizationLicenseHistoryPublicData, GetOrganizationLicenseHistoryPublicVariables>;
}
export const getOrganizationLicenseHistoryPublicRef: GetOrganizationLicenseHistoryPublicRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getOrganizationLicenseHistoryPublic(dc: DataConnect, vars: GetOrganizationLicenseHistoryPublicVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganizationLicenseHistoryPublicData, GetOrganizationLicenseHistoryPublicVariables>;

interface GetOrganizationLicenseHistoryPublicRef {
  ...
  (dc: DataConnect, vars: GetOrganizationLicenseHistoryPublicVariables): QueryRef<GetOrganizationLicenseHistoryPublicData, GetOrganizationLicenseHistoryPublicVariables>;
}
export const getOrganizationLicenseHistoryPublicRef: GetOrganizationLicenseHistoryPublicRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getOrganizationLicenseHistoryPublicRef:
```typescript
const name = getOrganizationLicenseHistoryPublicRef.operationName;
console.log(name);
```

### Variables
The `GetOrganizationLicenseHistoryPublic` query requires an argument of type `GetOrganizationLicenseHistoryPublicVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetOrganizationLicenseHistoryPublicVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that executing the `GetOrganizationLicenseHistoryPublic` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetOrganizationLicenseHistoryPublicData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetOrganizationLicenseHistoryPublicData {
  licenseHistories: ({
    id: UUIDString;
    license: {
      id: UUIDString;
    } & OrganizationLicense_Key;
    organization: {
      id: UUIDString;
    } & Organization_Key;
    eventType: LicenseEventType;
    eventAt: TimestampString;
    plan: {
      id: UUIDString;
      planCode: string;
      name: string;
      level: number;
      maxStores: number;
      maxUsers: number;
    } & LicensePlan_Key;
    planCode: string;
    planName: string;
    planLevel: number;
    maxStores: number;
    maxUsers: number;
    startDate: DateString;
    expiryDate: DateString;
    negotiatedPrice: number;
    currency: string;
    changes?: unknown | null;
  } & LicenseHistory_Key)[];
}
```
### Using `GetOrganizationLicenseHistoryPublic`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getOrganizationLicenseHistoryPublic, GetOrganizationLicenseHistoryPublicVariables } from '@omniretail/sql-connect';

// The `GetOrganizationLicenseHistoryPublic` query requires an argument of type `GetOrganizationLicenseHistoryPublicVariables`:
const getOrganizationLicenseHistoryPublicVars: GetOrganizationLicenseHistoryPublicVariables = {
  organizationId: ..., 
};

// Call the `getOrganizationLicenseHistoryPublic()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getOrganizationLicenseHistoryPublic(getOrganizationLicenseHistoryPublicVars);
// Variables can be defined inline as well.
const { data } = await getOrganizationLicenseHistoryPublic({ organizationId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getOrganizationLicenseHistoryPublic(dataConnect, getOrganizationLicenseHistoryPublicVars);

console.log(data.licenseHistories);

// Or, you can use the `Promise` API.
getOrganizationLicenseHistoryPublic(getOrganizationLicenseHistoryPublicVars).then((response) => {
  const data = response.data;
  console.log(data.licenseHistories);
});
```

### Using `GetOrganizationLicenseHistoryPublic`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getOrganizationLicenseHistoryPublicRef, GetOrganizationLicenseHistoryPublicVariables } from '@omniretail/sql-connect';

// The `GetOrganizationLicenseHistoryPublic` query requires an argument of type `GetOrganizationLicenseHistoryPublicVariables`:
const getOrganizationLicenseHistoryPublicVars: GetOrganizationLicenseHistoryPublicVariables = {
  organizationId: ..., 
};

// Call the `getOrganizationLicenseHistoryPublicRef()` function to get a reference to the query.
const ref = getOrganizationLicenseHistoryPublicRef(getOrganizationLicenseHistoryPublicVars);
// Variables can be defined inline as well.
const ref = getOrganizationLicenseHistoryPublicRef({ organizationId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getOrganizationLicenseHistoryPublicRef(dataConnect, getOrganizationLicenseHistoryPublicVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.licenseHistories);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.licenseHistories);
});
```

## ListOrganizationsTrusted
You can execute the `ListOrganizationsTrusted` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
listOrganizationsTrusted(options?: ExecuteQueryOptions): QueryPromise<ListOrganizationsTrustedData, undefined>;

interface ListOrganizationsTrustedRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListOrganizationsTrustedData, undefined>;
}
export const listOrganizationsTrustedRef: ListOrganizationsTrustedRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listOrganizationsTrusted(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListOrganizationsTrustedData, undefined>;

interface ListOrganizationsTrustedRef {
  ...
  (dc: DataConnect): QueryRef<ListOrganizationsTrustedData, undefined>;
}
export const listOrganizationsTrustedRef: ListOrganizationsTrustedRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listOrganizationsTrustedRef:
```typescript
const name = listOrganizationsTrustedRef.operationName;
console.log(name);
```

### Variables
The `ListOrganizationsTrusted` query has no variables.
### Return Type
Recall that executing the `ListOrganizationsTrusted` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListOrganizationsTrustedData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListOrganizationsTrustedData {
  organizations: ({
    id: UUIDString;
    organizationCode: string;
    businessName: string;
    legalEntityName?: string | null;
    taxId?: string | null;
    primaryContactName: string;
    email: string;
    phone: string;
    address?: string | null;
    city?: string | null;
    state?: string | null;
    postalCode?: string | null;
    timezone: string;
    currency: string;
    status: OrganizationStatus;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & Organization_Key)[];
}
```
### Using `ListOrganizationsTrusted`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listOrganizationsTrusted } from '@omniretail/sql-connect';


// Call the `listOrganizationsTrusted()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listOrganizationsTrusted();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listOrganizationsTrusted(dataConnect);

console.log(data.organizations);

// Or, you can use the `Promise` API.
listOrganizationsTrusted().then((response) => {
  const data = response.data;
  console.log(data.organizations);
});
```

### Using `ListOrganizationsTrusted`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listOrganizationsTrustedRef } from '@omniretail/sql-connect';


// Call the `listOrganizationsTrustedRef()` function to get a reference to the query.
const ref = listOrganizationsTrustedRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listOrganizationsTrustedRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.organizations);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.organizations);
});
```

## ListOrganizationUsersForDeletionTrusted
You can execute the `ListOrganizationUsersForDeletionTrusted` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
listOrganizationUsersForDeletionTrusted(vars: ListOrganizationUsersForDeletionTrustedVariables, options?: ExecuteQueryOptions): QueryPromise<ListOrganizationUsersForDeletionTrustedData, ListOrganizationUsersForDeletionTrustedVariables>;

interface ListOrganizationUsersForDeletionTrustedRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListOrganizationUsersForDeletionTrustedVariables): QueryRef<ListOrganizationUsersForDeletionTrustedData, ListOrganizationUsersForDeletionTrustedVariables>;
}
export const listOrganizationUsersForDeletionTrustedRef: ListOrganizationUsersForDeletionTrustedRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listOrganizationUsersForDeletionTrusted(dc: DataConnect, vars: ListOrganizationUsersForDeletionTrustedVariables, options?: ExecuteQueryOptions): QueryPromise<ListOrganizationUsersForDeletionTrustedData, ListOrganizationUsersForDeletionTrustedVariables>;

interface ListOrganizationUsersForDeletionTrustedRef {
  ...
  (dc: DataConnect, vars: ListOrganizationUsersForDeletionTrustedVariables): QueryRef<ListOrganizationUsersForDeletionTrustedData, ListOrganizationUsersForDeletionTrustedVariables>;
}
export const listOrganizationUsersForDeletionTrustedRef: ListOrganizationUsersForDeletionTrustedRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listOrganizationUsersForDeletionTrustedRef:
```typescript
const name = listOrganizationUsersForDeletionTrustedRef.operationName;
console.log(name);
```

### Variables
The `ListOrganizationUsersForDeletionTrusted` query requires an argument of type `ListOrganizationUsersForDeletionTrustedVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListOrganizationUsersForDeletionTrustedVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that executing the `ListOrganizationUsersForDeletionTrusted` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListOrganizationUsersForDeletionTrustedData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListOrganizationUsersForDeletionTrustedData {
  organizationMemberships: ({
    user: {
      id: UUIDString;
      firebaseUid: string;
    } & AppUser_Key;
  })[];
}
```
### Using `ListOrganizationUsersForDeletionTrusted`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listOrganizationUsersForDeletionTrusted, ListOrganizationUsersForDeletionTrustedVariables } from '@omniretail/sql-connect';

// The `ListOrganizationUsersForDeletionTrusted` query requires an argument of type `ListOrganizationUsersForDeletionTrustedVariables`:
const listOrganizationUsersForDeletionTrustedVars: ListOrganizationUsersForDeletionTrustedVariables = {
  organizationId: ..., 
};

// Call the `listOrganizationUsersForDeletionTrusted()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listOrganizationUsersForDeletionTrusted(listOrganizationUsersForDeletionTrustedVars);
// Variables can be defined inline as well.
const { data } = await listOrganizationUsersForDeletionTrusted({ organizationId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listOrganizationUsersForDeletionTrusted(dataConnect, listOrganizationUsersForDeletionTrustedVars);

console.log(data.organizationMemberships);

// Or, you can use the `Promise` API.
listOrganizationUsersForDeletionTrusted(listOrganizationUsersForDeletionTrustedVars).then((response) => {
  const data = response.data;
  console.log(data.organizationMemberships);
});
```

### Using `ListOrganizationUsersForDeletionTrusted`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listOrganizationUsersForDeletionTrustedRef, ListOrganizationUsersForDeletionTrustedVariables } from '@omniretail/sql-connect';

// The `ListOrganizationUsersForDeletionTrusted` query requires an argument of type `ListOrganizationUsersForDeletionTrustedVariables`:
const listOrganizationUsersForDeletionTrustedVars: ListOrganizationUsersForDeletionTrustedVariables = {
  organizationId: ..., 
};

// Call the `listOrganizationUsersForDeletionTrustedRef()` function to get a reference to the query.
const ref = listOrganizationUsersForDeletionTrustedRef(listOrganizationUsersForDeletionTrustedVars);
// Variables can be defined inline as well.
const ref = listOrganizationUsersForDeletionTrustedRef({ organizationId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listOrganizationUsersForDeletionTrustedRef(dataConnect, listOrganizationUsersForDeletionTrustedVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.organizationMemberships);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.organizationMemberships);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `master-admin` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## RecordSuccessfulLogin
You can execute the `RecordSuccessfulLogin` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
recordSuccessfulLogin(vars: RecordSuccessfulLoginVariables): MutationPromise<RecordSuccessfulLoginData, RecordSuccessfulLoginVariables>;

interface RecordSuccessfulLoginRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RecordSuccessfulLoginVariables): MutationRef<RecordSuccessfulLoginData, RecordSuccessfulLoginVariables>;
}
export const recordSuccessfulLoginRef: RecordSuccessfulLoginRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
recordSuccessfulLogin(dc: DataConnect, vars: RecordSuccessfulLoginVariables): MutationPromise<RecordSuccessfulLoginData, RecordSuccessfulLoginVariables>;

interface RecordSuccessfulLoginRef {
  ...
  (dc: DataConnect, vars: RecordSuccessfulLoginVariables): MutationRef<RecordSuccessfulLoginData, RecordSuccessfulLoginVariables>;
}
export const recordSuccessfulLoginRef: RecordSuccessfulLoginRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the recordSuccessfulLoginRef:
```typescript
const name = recordSuccessfulLoginRef.operationName;
console.log(name);
```

### Variables
The `RecordSuccessfulLogin` mutation requires an argument of type `RecordSuccessfulLoginVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RecordSuccessfulLoginVariables {
  userId: UUIDString;
  auditId: UUIDString;
  requestId: string;
}
```
### Return Type
Recall that executing the `RecordSuccessfulLogin` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RecordSuccessfulLoginData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RecordSuccessfulLoginData {
  appUser_update?: AppUser_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `RecordSuccessfulLogin`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, recordSuccessfulLogin, RecordSuccessfulLoginVariables } from '@omniretail/sql-connect';

// The `RecordSuccessfulLogin` mutation requires an argument of type `RecordSuccessfulLoginVariables`:
const recordSuccessfulLoginVars: RecordSuccessfulLoginVariables = {
  userId: ..., 
  auditId: ..., 
  requestId: ..., 
};

// Call the `recordSuccessfulLogin()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await recordSuccessfulLogin(recordSuccessfulLoginVars);
// Variables can be defined inline as well.
const { data } = await recordSuccessfulLogin({ userId: ..., auditId: ..., requestId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await recordSuccessfulLogin(dataConnect, recordSuccessfulLoginVars);

console.log(data.appUser_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
recordSuccessfulLogin(recordSuccessfulLoginVars).then((response) => {
  const data = response.data;
  console.log(data.appUser_update);
  console.log(data.auditEvent_insert);
});
```

### Using `RecordSuccessfulLogin`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, recordSuccessfulLoginRef, RecordSuccessfulLoginVariables } from '@omniretail/sql-connect';

// The `RecordSuccessfulLogin` mutation requires an argument of type `RecordSuccessfulLoginVariables`:
const recordSuccessfulLoginVars: RecordSuccessfulLoginVariables = {
  userId: ..., 
  auditId: ..., 
  requestId: ..., 
};

// Call the `recordSuccessfulLoginRef()` function to get a reference to the mutation.
const ref = recordSuccessfulLoginRef(recordSuccessfulLoginVars);
// Variables can be defined inline as well.
const ref = recordSuccessfulLoginRef({ userId: ..., auditId: ..., requestId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = recordSuccessfulLoginRef(dataConnect, recordSuccessfulLoginVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.appUser_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.appUser_update);
  console.log(data.auditEvent_insert);
});
```

## UpdateAppUserProfile
You can execute the `UpdateAppUserProfile` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
updateAppUserProfile(vars: UpdateAppUserProfileVariables): MutationPromise<UpdateAppUserProfileData, UpdateAppUserProfileVariables>;

interface UpdateAppUserProfileRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateAppUserProfileVariables): MutationRef<UpdateAppUserProfileData, UpdateAppUserProfileVariables>;
}
export const updateAppUserProfileRef: UpdateAppUserProfileRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateAppUserProfile(dc: DataConnect, vars: UpdateAppUserProfileVariables): MutationPromise<UpdateAppUserProfileData, UpdateAppUserProfileVariables>;

interface UpdateAppUserProfileRef {
  ...
  (dc: DataConnect, vars: UpdateAppUserProfileVariables): MutationRef<UpdateAppUserProfileData, UpdateAppUserProfileVariables>;
}
export const updateAppUserProfileRef: UpdateAppUserProfileRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateAppUserProfileRef:
```typescript
const name = updateAppUserProfileRef.operationName;
console.log(name);
```

### Variables
The `UpdateAppUserProfile` mutation requires an argument of type `UpdateAppUserProfileVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateAppUserProfileVariables {
  userId: UUIDString;
  displayName: string;
  phone?: string | null;
  auditId: UUIDString;
  requestId: string;
}
```
### Return Type
Recall that executing the `UpdateAppUserProfile` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateAppUserProfileData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateAppUserProfileData {
  appUser_update?: AppUser_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `UpdateAppUserProfile`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateAppUserProfile, UpdateAppUserProfileVariables } from '@omniretail/sql-connect';

// The `UpdateAppUserProfile` mutation requires an argument of type `UpdateAppUserProfileVariables`:
const updateAppUserProfileVars: UpdateAppUserProfileVariables = {
  userId: ..., 
  displayName: ..., 
  phone: ..., // optional
  auditId: ..., 
  requestId: ..., 
};

// Call the `updateAppUserProfile()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateAppUserProfile(updateAppUserProfileVars);
// Variables can be defined inline as well.
const { data } = await updateAppUserProfile({ userId: ..., displayName: ..., phone: ..., auditId: ..., requestId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateAppUserProfile(dataConnect, updateAppUserProfileVars);

console.log(data.appUser_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
updateAppUserProfile(updateAppUserProfileVars).then((response) => {
  const data = response.data;
  console.log(data.appUser_update);
  console.log(data.auditEvent_insert);
});
```

### Using `UpdateAppUserProfile`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateAppUserProfileRef, UpdateAppUserProfileVariables } from '@omniretail/sql-connect';

// The `UpdateAppUserProfile` mutation requires an argument of type `UpdateAppUserProfileVariables`:
const updateAppUserProfileVars: UpdateAppUserProfileVariables = {
  userId: ..., 
  displayName: ..., 
  phone: ..., // optional
  auditId: ..., 
  requestId: ..., 
};

// Call the `updateAppUserProfileRef()` function to get a reference to the mutation.
const ref = updateAppUserProfileRef(updateAppUserProfileVars);
// Variables can be defined inline as well.
const ref = updateAppUserProfileRef({ userId: ..., displayName: ..., phone: ..., auditId: ..., requestId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateAppUserProfileRef(dataConnect, updateAppUserProfileVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.appUser_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.appUser_update);
  console.log(data.auditEvent_insert);
});
```

## RecordPasswordChange
You can execute the `RecordPasswordChange` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
recordPasswordChange(vars: RecordPasswordChangeVariables): MutationPromise<RecordPasswordChangeData, RecordPasswordChangeVariables>;

interface RecordPasswordChangeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RecordPasswordChangeVariables): MutationRef<RecordPasswordChangeData, RecordPasswordChangeVariables>;
}
export const recordPasswordChangeRef: RecordPasswordChangeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
recordPasswordChange(dc: DataConnect, vars: RecordPasswordChangeVariables): MutationPromise<RecordPasswordChangeData, RecordPasswordChangeVariables>;

interface RecordPasswordChangeRef {
  ...
  (dc: DataConnect, vars: RecordPasswordChangeVariables): MutationRef<RecordPasswordChangeData, RecordPasswordChangeVariables>;
}
export const recordPasswordChangeRef: RecordPasswordChangeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the recordPasswordChangeRef:
```typescript
const name = recordPasswordChangeRef.operationName;
console.log(name);
```

### Variables
The `RecordPasswordChange` mutation requires an argument of type `RecordPasswordChangeVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RecordPasswordChangeVariables {
  userId: UUIDString;
  auditId: UUIDString;
  requestId: string;
}
```
### Return Type
Recall that executing the `RecordPasswordChange` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RecordPasswordChangeData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RecordPasswordChangeData {
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `RecordPasswordChange`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, recordPasswordChange, RecordPasswordChangeVariables } from '@omniretail/sql-connect';

// The `RecordPasswordChange` mutation requires an argument of type `RecordPasswordChangeVariables`:
const recordPasswordChangeVars: RecordPasswordChangeVariables = {
  userId: ..., 
  auditId: ..., 
  requestId: ..., 
};

// Call the `recordPasswordChange()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await recordPasswordChange(recordPasswordChangeVars);
// Variables can be defined inline as well.
const { data } = await recordPasswordChange({ userId: ..., auditId: ..., requestId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await recordPasswordChange(dataConnect, recordPasswordChangeVars);

console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
recordPasswordChange(recordPasswordChangeVars).then((response) => {
  const data = response.data;
  console.log(data.auditEvent_insert);
});
```

### Using `RecordPasswordChange`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, recordPasswordChangeRef, RecordPasswordChangeVariables } from '@omniretail/sql-connect';

// The `RecordPasswordChange` mutation requires an argument of type `RecordPasswordChangeVariables`:
const recordPasswordChangeVars: RecordPasswordChangeVariables = {
  userId: ..., 
  auditId: ..., 
  requestId: ..., 
};

// Call the `recordPasswordChangeRef()` function to get a reference to the mutation.
const ref = recordPasswordChangeRef(recordPasswordChangeVars);
// Variables can be defined inline as well.
const ref = recordPasswordChangeRef({ userId: ..., auditId: ..., requestId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = recordPasswordChangeRef(dataConnect, recordPasswordChangeVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.auditEvent_insert);
});
```

## BootstrapMasterAdmin
You can execute the `BootstrapMasterAdmin` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
bootstrapMasterAdmin(vars: BootstrapMasterAdminVariables): MutationPromise<BootstrapMasterAdminData, BootstrapMasterAdminVariables>;

interface BootstrapMasterAdminRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: BootstrapMasterAdminVariables): MutationRef<BootstrapMasterAdminData, BootstrapMasterAdminVariables>;
}
export const bootstrapMasterAdminRef: BootstrapMasterAdminRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
bootstrapMasterAdmin(dc: DataConnect, vars: BootstrapMasterAdminVariables): MutationPromise<BootstrapMasterAdminData, BootstrapMasterAdminVariables>;

interface BootstrapMasterAdminRef {
  ...
  (dc: DataConnect, vars: BootstrapMasterAdminVariables): MutationRef<BootstrapMasterAdminData, BootstrapMasterAdminVariables>;
}
export const bootstrapMasterAdminRef: BootstrapMasterAdminRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the bootstrapMasterAdminRef:
```typescript
const name = bootstrapMasterAdminRef.operationName;
console.log(name);
```

### Variables
The `BootstrapMasterAdmin` mutation requires an argument of type `BootstrapMasterAdminVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface BootstrapMasterAdminVariables {
  userId: UUIDString;
  firebaseUid: string;
  username: string;
  email: string;
  displayName: string;
  phone?: string | null;
  roleId: UUIDString;
  auditId: UUIDString;
  requestId: string;
}
```
### Return Type
Recall that executing the `BootstrapMasterAdmin` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `BootstrapMasterAdminData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface BootstrapMasterAdminData {
  appUser_upsert: AppUser_Key;
  userRole_upsert: UserRole_Key;
  auditEvent_upsert: AuditEvent_Key;
}
```
### Using `BootstrapMasterAdmin`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, bootstrapMasterAdmin, BootstrapMasterAdminVariables } from '@omniretail/sql-connect';

// The `BootstrapMasterAdmin` mutation requires an argument of type `BootstrapMasterAdminVariables`:
const bootstrapMasterAdminVars: BootstrapMasterAdminVariables = {
  userId: ..., 
  firebaseUid: ..., 
  username: ..., 
  email: ..., 
  displayName: ..., 
  phone: ..., // optional
  roleId: ..., 
  auditId: ..., 
  requestId: ..., 
};

// Call the `bootstrapMasterAdmin()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await bootstrapMasterAdmin(bootstrapMasterAdminVars);
// Variables can be defined inline as well.
const { data } = await bootstrapMasterAdmin({ userId: ..., firebaseUid: ..., username: ..., email: ..., displayName: ..., phone: ..., roleId: ..., auditId: ..., requestId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await bootstrapMasterAdmin(dataConnect, bootstrapMasterAdminVars);

console.log(data.appUser_upsert);
console.log(data.userRole_upsert);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
bootstrapMasterAdmin(bootstrapMasterAdminVars).then((response) => {
  const data = response.data;
  console.log(data.appUser_upsert);
  console.log(data.userRole_upsert);
  console.log(data.auditEvent_upsert);
});
```

### Using `BootstrapMasterAdmin`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, bootstrapMasterAdminRef, BootstrapMasterAdminVariables } from '@omniretail/sql-connect';

// The `BootstrapMasterAdmin` mutation requires an argument of type `BootstrapMasterAdminVariables`:
const bootstrapMasterAdminVars: BootstrapMasterAdminVariables = {
  userId: ..., 
  firebaseUid: ..., 
  username: ..., 
  email: ..., 
  displayName: ..., 
  phone: ..., // optional
  roleId: ..., 
  auditId: ..., 
  requestId: ..., 
};

// Call the `bootstrapMasterAdminRef()` function to get a reference to the mutation.
const ref = bootstrapMasterAdminRef(bootstrapMasterAdminVars);
// Variables can be defined inline as well.
const ref = bootstrapMasterAdminRef({ userId: ..., firebaseUid: ..., username: ..., email: ..., displayName: ..., phone: ..., roleId: ..., auditId: ..., requestId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = bootstrapMasterAdminRef(dataConnect, bootstrapMasterAdminVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.appUser_upsert);
console.log(data.userRole_upsert);
console.log(data.auditEvent_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.appUser_upsert);
  console.log(data.userRole_upsert);
  console.log(data.auditEvent_upsert);
});
```

## CreateLicensePlan
You can execute the `CreateLicensePlan` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
createLicensePlan(vars: CreateLicensePlanVariables): MutationPromise<CreateLicensePlanData, CreateLicensePlanVariables>;

interface CreateLicensePlanRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateLicensePlanVariables): MutationRef<CreateLicensePlanData, CreateLicensePlanVariables>;
}
export const createLicensePlanRef: CreateLicensePlanRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createLicensePlan(dc: DataConnect, vars: CreateLicensePlanVariables): MutationPromise<CreateLicensePlanData, CreateLicensePlanVariables>;

interface CreateLicensePlanRef {
  ...
  (dc: DataConnect, vars: CreateLicensePlanVariables): MutationRef<CreateLicensePlanData, CreateLicensePlanVariables>;
}
export const createLicensePlanRef: CreateLicensePlanRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createLicensePlanRef:
```typescript
const name = createLicensePlanRef.operationName;
console.log(name);
```

### Variables
The `CreateLicensePlan` mutation requires an argument of type `CreateLicensePlanVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateLicensePlanVariables {
  planCode: string;
  name: string;
  description?: string | null;
  level: number;
  maxStores: number;
  maxUsers: number;
  auditId: UUIDString;
  requestId: string;
}
```
### Return Type
Recall that executing the `CreateLicensePlan` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateLicensePlanData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateLicensePlanData {
  licensePlan_insert: LicensePlan_Key;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `CreateLicensePlan`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createLicensePlan, CreateLicensePlanVariables } from '@omniretail/sql-connect';

// The `CreateLicensePlan` mutation requires an argument of type `CreateLicensePlanVariables`:
const createLicensePlanVars: CreateLicensePlanVariables = {
  planCode: ..., 
  name: ..., 
  description: ..., // optional
  level: ..., 
  maxStores: ..., 
  maxUsers: ..., 
  auditId: ..., 
  requestId: ..., 
};

// Call the `createLicensePlan()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createLicensePlan(createLicensePlanVars);
// Variables can be defined inline as well.
const { data } = await createLicensePlan({ planCode: ..., name: ..., description: ..., level: ..., maxStores: ..., maxUsers: ..., auditId: ..., requestId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createLicensePlan(dataConnect, createLicensePlanVars);

console.log(data.licensePlan_insert);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
createLicensePlan(createLicensePlanVars).then((response) => {
  const data = response.data;
  console.log(data.licensePlan_insert);
  console.log(data.auditEvent_insert);
});
```

### Using `CreateLicensePlan`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createLicensePlanRef, CreateLicensePlanVariables } from '@omniretail/sql-connect';

// The `CreateLicensePlan` mutation requires an argument of type `CreateLicensePlanVariables`:
const createLicensePlanVars: CreateLicensePlanVariables = {
  planCode: ..., 
  name: ..., 
  description: ..., // optional
  level: ..., 
  maxStores: ..., 
  maxUsers: ..., 
  auditId: ..., 
  requestId: ..., 
};

// Call the `createLicensePlanRef()` function to get a reference to the mutation.
const ref = createLicensePlanRef(createLicensePlanVars);
// Variables can be defined inline as well.
const ref = createLicensePlanRef({ planCode: ..., name: ..., description: ..., level: ..., maxStores: ..., maxUsers: ..., auditId: ..., requestId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createLicensePlanRef(dataConnect, createLicensePlanVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.licensePlan_insert);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.licensePlan_insert);
  console.log(data.auditEvent_insert);
});
```

## UpdateLicensePlan
You can execute the `UpdateLicensePlan` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
updateLicensePlan(vars: UpdateLicensePlanVariables): MutationPromise<UpdateLicensePlanData, UpdateLicensePlanVariables>;

interface UpdateLicensePlanRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateLicensePlanVariables): MutationRef<UpdateLicensePlanData, UpdateLicensePlanVariables>;
}
export const updateLicensePlanRef: UpdateLicensePlanRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateLicensePlan(dc: DataConnect, vars: UpdateLicensePlanVariables): MutationPromise<UpdateLicensePlanData, UpdateLicensePlanVariables>;

interface UpdateLicensePlanRef {
  ...
  (dc: DataConnect, vars: UpdateLicensePlanVariables): MutationRef<UpdateLicensePlanData, UpdateLicensePlanVariables>;
}
export const updateLicensePlanRef: UpdateLicensePlanRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateLicensePlanRef:
```typescript
const name = updateLicensePlanRef.operationName;
console.log(name);
```

### Variables
The `UpdateLicensePlan` mutation requires an argument of type `UpdateLicensePlanVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateLicensePlanVariables {
  id: UUIDString;
  name: string;
  description?: string | null;
  level: number;
  maxStores: number;
  maxUsers: number;
  auditId: UUIDString;
  requestId: string;
}
```
### Return Type
Recall that executing the `UpdateLicensePlan` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateLicensePlanData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateLicensePlanData {
  licensePlan_update?: LicensePlan_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `UpdateLicensePlan`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateLicensePlan, UpdateLicensePlanVariables } from '@omniretail/sql-connect';

// The `UpdateLicensePlan` mutation requires an argument of type `UpdateLicensePlanVariables`:
const updateLicensePlanVars: UpdateLicensePlanVariables = {
  id: ..., 
  name: ..., 
  description: ..., // optional
  level: ..., 
  maxStores: ..., 
  maxUsers: ..., 
  auditId: ..., 
  requestId: ..., 
};

// Call the `updateLicensePlan()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateLicensePlan(updateLicensePlanVars);
// Variables can be defined inline as well.
const { data } = await updateLicensePlan({ id: ..., name: ..., description: ..., level: ..., maxStores: ..., maxUsers: ..., auditId: ..., requestId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateLicensePlan(dataConnect, updateLicensePlanVars);

console.log(data.licensePlan_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
updateLicensePlan(updateLicensePlanVars).then((response) => {
  const data = response.data;
  console.log(data.licensePlan_update);
  console.log(data.auditEvent_insert);
});
```

### Using `UpdateLicensePlan`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateLicensePlanRef, UpdateLicensePlanVariables } from '@omniretail/sql-connect';

// The `UpdateLicensePlan` mutation requires an argument of type `UpdateLicensePlanVariables`:
const updateLicensePlanVars: UpdateLicensePlanVariables = {
  id: ..., 
  name: ..., 
  description: ..., // optional
  level: ..., 
  maxStores: ..., 
  maxUsers: ..., 
  auditId: ..., 
  requestId: ..., 
};

// Call the `updateLicensePlanRef()` function to get a reference to the mutation.
const ref = updateLicensePlanRef(updateLicensePlanVars);
// Variables can be defined inline as well.
const ref = updateLicensePlanRef({ id: ..., name: ..., description: ..., level: ..., maxStores: ..., maxUsers: ..., auditId: ..., requestId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateLicensePlanRef(dataConnect, updateLicensePlanVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.licensePlan_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.licensePlan_update);
  console.log(data.auditEvent_insert);
});
```

## ChangeLicensePlanStatus
You can execute the `ChangeLicensePlanStatus` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
changeLicensePlanStatus(vars: ChangeLicensePlanStatusVariables): MutationPromise<ChangeLicensePlanStatusData, ChangeLicensePlanStatusVariables>;

interface ChangeLicensePlanStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ChangeLicensePlanStatusVariables): MutationRef<ChangeLicensePlanStatusData, ChangeLicensePlanStatusVariables>;
}
export const changeLicensePlanStatusRef: ChangeLicensePlanStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
changeLicensePlanStatus(dc: DataConnect, vars: ChangeLicensePlanStatusVariables): MutationPromise<ChangeLicensePlanStatusData, ChangeLicensePlanStatusVariables>;

interface ChangeLicensePlanStatusRef {
  ...
  (dc: DataConnect, vars: ChangeLicensePlanStatusVariables): MutationRef<ChangeLicensePlanStatusData, ChangeLicensePlanStatusVariables>;
}
export const changeLicensePlanStatusRef: ChangeLicensePlanStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the changeLicensePlanStatusRef:
```typescript
const name = changeLicensePlanStatusRef.operationName;
console.log(name);
```

### Variables
The `ChangeLicensePlanStatus` mutation requires an argument of type `ChangeLicensePlanStatusVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ChangeLicensePlanStatusVariables {
  id: UUIDString;
  status: LicensePlanStatus;
  action: string;
  auditId: UUIDString;
  requestId: string;
}
```
### Return Type
Recall that executing the `ChangeLicensePlanStatus` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ChangeLicensePlanStatusData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ChangeLicensePlanStatusData {
  licensePlan_update?: LicensePlan_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `ChangeLicensePlanStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, changeLicensePlanStatus, ChangeLicensePlanStatusVariables } from '@omniretail/sql-connect';

// The `ChangeLicensePlanStatus` mutation requires an argument of type `ChangeLicensePlanStatusVariables`:
const changeLicensePlanStatusVars: ChangeLicensePlanStatusVariables = {
  id: ..., 
  status: ..., 
  action: ..., 
  auditId: ..., 
  requestId: ..., 
};

// Call the `changeLicensePlanStatus()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await changeLicensePlanStatus(changeLicensePlanStatusVars);
// Variables can be defined inline as well.
const { data } = await changeLicensePlanStatus({ id: ..., status: ..., action: ..., auditId: ..., requestId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await changeLicensePlanStatus(dataConnect, changeLicensePlanStatusVars);

console.log(data.licensePlan_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
changeLicensePlanStatus(changeLicensePlanStatusVars).then((response) => {
  const data = response.data;
  console.log(data.licensePlan_update);
  console.log(data.auditEvent_insert);
});
```

### Using `ChangeLicensePlanStatus`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, changeLicensePlanStatusRef, ChangeLicensePlanStatusVariables } from '@omniretail/sql-connect';

// The `ChangeLicensePlanStatus` mutation requires an argument of type `ChangeLicensePlanStatusVariables`:
const changeLicensePlanStatusVars: ChangeLicensePlanStatusVariables = {
  id: ..., 
  status: ..., 
  action: ..., 
  auditId: ..., 
  requestId: ..., 
};

// Call the `changeLicensePlanStatusRef()` function to get a reference to the mutation.
const ref = changeLicensePlanStatusRef(changeLicensePlanStatusVars);
// Variables can be defined inline as well.
const ref = changeLicensePlanStatusRef({ id: ..., status: ..., action: ..., auditId: ..., requestId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = changeLicensePlanStatusRef(dataConnect, changeLicensePlanStatusVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.licensePlan_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.licensePlan_update);
  console.log(data.auditEvent_insert);
});
```

## DeleteLicensePlan
You can execute the `DeleteLicensePlan` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
deleteLicensePlan(vars: DeleteLicensePlanVariables): MutationPromise<DeleteLicensePlanData, DeleteLicensePlanVariables>;

interface DeleteLicensePlanRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteLicensePlanVariables): MutationRef<DeleteLicensePlanData, DeleteLicensePlanVariables>;
}
export const deleteLicensePlanRef: DeleteLicensePlanRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteLicensePlan(dc: DataConnect, vars: DeleteLicensePlanVariables): MutationPromise<DeleteLicensePlanData, DeleteLicensePlanVariables>;

interface DeleteLicensePlanRef {
  ...
  (dc: DataConnect, vars: DeleteLicensePlanVariables): MutationRef<DeleteLicensePlanData, DeleteLicensePlanVariables>;
}
export const deleteLicensePlanRef: DeleteLicensePlanRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteLicensePlanRef:
```typescript
const name = deleteLicensePlanRef.operationName;
console.log(name);
```

### Variables
The `DeleteLicensePlan` mutation requires an argument of type `DeleteLicensePlanVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteLicensePlanVariables {
  id: UUIDString;
  auditId: UUIDString;
  requestId: string;
}
```
### Return Type
Recall that executing the `DeleteLicensePlan` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteLicensePlanData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteLicensePlanData {
  licensePlan_delete?: LicensePlan_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `DeleteLicensePlan`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteLicensePlan, DeleteLicensePlanVariables } from '@omniretail/sql-connect';

// The `DeleteLicensePlan` mutation requires an argument of type `DeleteLicensePlanVariables`:
const deleteLicensePlanVars: DeleteLicensePlanVariables = {
  id: ..., 
  auditId: ..., 
  requestId: ..., 
};

// Call the `deleteLicensePlan()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteLicensePlan(deleteLicensePlanVars);
// Variables can be defined inline as well.
const { data } = await deleteLicensePlan({ id: ..., auditId: ..., requestId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteLicensePlan(dataConnect, deleteLicensePlanVars);

console.log(data.licensePlan_delete);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
deleteLicensePlan(deleteLicensePlanVars).then((response) => {
  const data = response.data;
  console.log(data.licensePlan_delete);
  console.log(data.auditEvent_insert);
});
```

### Using `DeleteLicensePlan`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteLicensePlanRef, DeleteLicensePlanVariables } from '@omniretail/sql-connect';

// The `DeleteLicensePlan` mutation requires an argument of type `DeleteLicensePlanVariables`:
const deleteLicensePlanVars: DeleteLicensePlanVariables = {
  id: ..., 
  auditId: ..., 
  requestId: ..., 
};

// Call the `deleteLicensePlanRef()` function to get a reference to the mutation.
const ref = deleteLicensePlanRef(deleteLicensePlanVars);
// Variables can be defined inline as well.
const ref = deleteLicensePlanRef({ id: ..., auditId: ..., requestId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteLicensePlanRef(dataConnect, deleteLicensePlanVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.licensePlan_delete);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.licensePlan_delete);
  console.log(data.auditEvent_insert);
});
```

## DeleteLicensePlanTrusted
You can execute the `DeleteLicensePlanTrusted` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
deleteLicensePlanTrusted(vars: DeleteLicensePlanTrustedVariables): MutationPromise<DeleteLicensePlanTrustedData, DeleteLicensePlanTrustedVariables>;

interface DeleteLicensePlanTrustedRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteLicensePlanTrustedVariables): MutationRef<DeleteLicensePlanTrustedData, DeleteLicensePlanTrustedVariables>;
}
export const deleteLicensePlanTrustedRef: DeleteLicensePlanTrustedRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteLicensePlanTrusted(dc: DataConnect, vars: DeleteLicensePlanTrustedVariables): MutationPromise<DeleteLicensePlanTrustedData, DeleteLicensePlanTrustedVariables>;

interface DeleteLicensePlanTrustedRef {
  ...
  (dc: DataConnect, vars: DeleteLicensePlanTrustedVariables): MutationRef<DeleteLicensePlanTrustedData, DeleteLicensePlanTrustedVariables>;
}
export const deleteLicensePlanTrustedRef: DeleteLicensePlanTrustedRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteLicensePlanTrustedRef:
```typescript
const name = deleteLicensePlanTrustedRef.operationName;
console.log(name);
```

### Variables
The `DeleteLicensePlanTrusted` mutation requires an argument of type `DeleteLicensePlanTrustedVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteLicensePlanTrustedVariables {
  id: UUIDString;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}
```
### Return Type
Recall that executing the `DeleteLicensePlanTrusted` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteLicensePlanTrustedData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteLicensePlanTrustedData {
  licensePlan_delete?: LicensePlan_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `DeleteLicensePlanTrusted`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteLicensePlanTrusted, DeleteLicensePlanTrustedVariables } from '@omniretail/sql-connect';

// The `DeleteLicensePlanTrusted` mutation requires an argument of type `DeleteLicensePlanTrustedVariables`:
const deleteLicensePlanTrustedVars: DeleteLicensePlanTrustedVariables = {
  id: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `deleteLicensePlanTrusted()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteLicensePlanTrusted(deleteLicensePlanTrustedVars);
// Variables can be defined inline as well.
const { data } = await deleteLicensePlanTrusted({ id: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteLicensePlanTrusted(dataConnect, deleteLicensePlanTrustedVars);

console.log(data.licensePlan_delete);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
deleteLicensePlanTrusted(deleteLicensePlanTrustedVars).then((response) => {
  const data = response.data;
  console.log(data.licensePlan_delete);
  console.log(data.auditEvent_insert);
});
```

### Using `DeleteLicensePlanTrusted`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteLicensePlanTrustedRef, DeleteLicensePlanTrustedVariables } from '@omniretail/sql-connect';

// The `DeleteLicensePlanTrusted` mutation requires an argument of type `DeleteLicensePlanTrustedVariables`:
const deleteLicensePlanTrustedVars: DeleteLicensePlanTrustedVariables = {
  id: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `deleteLicensePlanTrustedRef()` function to get a reference to the mutation.
const ref = deleteLicensePlanTrustedRef(deleteLicensePlanTrustedVars);
// Variables can be defined inline as well.
const ref = deleteLicensePlanTrustedRef({ id: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteLicensePlanTrustedRef(dataConnect, deleteLicensePlanTrustedVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.licensePlan_delete);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.licensePlan_delete);
  console.log(data.auditEvent_insert);
});
```

## ProvisionOrganizationAdministrator
You can execute the `ProvisionOrganizationAdministrator` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
provisionOrganizationAdministrator(vars: ProvisionOrganizationAdministratorVariables): MutationPromise<ProvisionOrganizationAdministratorData, ProvisionOrganizationAdministratorVariables>;

interface ProvisionOrganizationAdministratorRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ProvisionOrganizationAdministratorVariables): MutationRef<ProvisionOrganizationAdministratorData, ProvisionOrganizationAdministratorVariables>;
}
export const provisionOrganizationAdministratorRef: ProvisionOrganizationAdministratorRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
provisionOrganizationAdministrator(dc: DataConnect, vars: ProvisionOrganizationAdministratorVariables): MutationPromise<ProvisionOrganizationAdministratorData, ProvisionOrganizationAdministratorVariables>;

interface ProvisionOrganizationAdministratorRef {
  ...
  (dc: DataConnect, vars: ProvisionOrganizationAdministratorVariables): MutationRef<ProvisionOrganizationAdministratorData, ProvisionOrganizationAdministratorVariables>;
}
export const provisionOrganizationAdministratorRef: ProvisionOrganizationAdministratorRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the provisionOrganizationAdministratorRef:
```typescript
const name = provisionOrganizationAdministratorRef.operationName;
console.log(name);
```

### Variables
The `ProvisionOrganizationAdministrator` mutation requires an argument of type `ProvisionOrganizationAdministratorVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ProvisionOrganizationAdministratorVariables {
  userId: UUIDString;
  firebaseUid: string;
  username: string;
  email: string;
  displayName: string;
  phone: string;
  organizationId: UUIDString;
  roleId: UUIDString;
  auditId: UUIDString;
  requestId: string;
}
```
### Return Type
Recall that executing the `ProvisionOrganizationAdministrator` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ProvisionOrganizationAdministratorData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ProvisionOrganizationAdministratorData {
  appUser_insert: AppUser_Key;
  organizationMembership_insert: OrganizationMembership_Key;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `ProvisionOrganizationAdministrator`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, provisionOrganizationAdministrator, ProvisionOrganizationAdministratorVariables } from '@omniretail/sql-connect';

// The `ProvisionOrganizationAdministrator` mutation requires an argument of type `ProvisionOrganizationAdministratorVariables`:
const provisionOrganizationAdministratorVars: ProvisionOrganizationAdministratorVariables = {
  userId: ..., 
  firebaseUid: ..., 
  username: ..., 
  email: ..., 
  displayName: ..., 
  phone: ..., 
  organizationId: ..., 
  roleId: ..., 
  auditId: ..., 
  requestId: ..., 
};

// Call the `provisionOrganizationAdministrator()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await provisionOrganizationAdministrator(provisionOrganizationAdministratorVars);
// Variables can be defined inline as well.
const { data } = await provisionOrganizationAdministrator({ userId: ..., firebaseUid: ..., username: ..., email: ..., displayName: ..., phone: ..., organizationId: ..., roleId: ..., auditId: ..., requestId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await provisionOrganizationAdministrator(dataConnect, provisionOrganizationAdministratorVars);

console.log(data.appUser_insert);
console.log(data.organizationMembership_insert);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
provisionOrganizationAdministrator(provisionOrganizationAdministratorVars).then((response) => {
  const data = response.data;
  console.log(data.appUser_insert);
  console.log(data.organizationMembership_insert);
  console.log(data.auditEvent_insert);
});
```

### Using `ProvisionOrganizationAdministrator`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, provisionOrganizationAdministratorRef, ProvisionOrganizationAdministratorVariables } from '@omniretail/sql-connect';

// The `ProvisionOrganizationAdministrator` mutation requires an argument of type `ProvisionOrganizationAdministratorVariables`:
const provisionOrganizationAdministratorVars: ProvisionOrganizationAdministratorVariables = {
  userId: ..., 
  firebaseUid: ..., 
  username: ..., 
  email: ..., 
  displayName: ..., 
  phone: ..., 
  organizationId: ..., 
  roleId: ..., 
  auditId: ..., 
  requestId: ..., 
};

// Call the `provisionOrganizationAdministratorRef()` function to get a reference to the mutation.
const ref = provisionOrganizationAdministratorRef(provisionOrganizationAdministratorVars);
// Variables can be defined inline as well.
const ref = provisionOrganizationAdministratorRef({ userId: ..., firebaseUid: ..., username: ..., email: ..., displayName: ..., phone: ..., organizationId: ..., roleId: ..., auditId: ..., requestId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = provisionOrganizationAdministratorRef(dataConnect, provisionOrganizationAdministratorVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.appUser_insert);
console.log(data.organizationMembership_insert);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.appUser_insert);
  console.log(data.organizationMembership_insert);
  console.log(data.auditEvent_insert);
});
```

## UpdateOrganizationAdministrator
You can execute the `UpdateOrganizationAdministrator` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
updateOrganizationAdministrator(vars: UpdateOrganizationAdministratorVariables): MutationPromise<UpdateOrganizationAdministratorData, UpdateOrganizationAdministratorVariables>;

interface UpdateOrganizationAdministratorRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateOrganizationAdministratorVariables): MutationRef<UpdateOrganizationAdministratorData, UpdateOrganizationAdministratorVariables>;
}
export const updateOrganizationAdministratorRef: UpdateOrganizationAdministratorRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateOrganizationAdministrator(dc: DataConnect, vars: UpdateOrganizationAdministratorVariables): MutationPromise<UpdateOrganizationAdministratorData, UpdateOrganizationAdministratorVariables>;

interface UpdateOrganizationAdministratorRef {
  ...
  (dc: DataConnect, vars: UpdateOrganizationAdministratorVariables): MutationRef<UpdateOrganizationAdministratorData, UpdateOrganizationAdministratorVariables>;
}
export const updateOrganizationAdministratorRef: UpdateOrganizationAdministratorRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateOrganizationAdministratorRef:
```typescript
const name = updateOrganizationAdministratorRef.operationName;
console.log(name);
```

### Variables
The `UpdateOrganizationAdministrator` mutation requires an argument of type `UpdateOrganizationAdministratorVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateOrganizationAdministratorVariables {
  organizationId: UUIDString;
  userId: UUIDString;
  displayName: string;
  phone: string;
  auditId: UUIDString;
  requestId: string;
}
```
### Return Type
Recall that executing the `UpdateOrganizationAdministrator` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateOrganizationAdministratorData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateOrganizationAdministratorData {
  appUser_update?: AppUser_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `UpdateOrganizationAdministrator`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateOrganizationAdministrator, UpdateOrganizationAdministratorVariables } from '@omniretail/sql-connect';

// The `UpdateOrganizationAdministrator` mutation requires an argument of type `UpdateOrganizationAdministratorVariables`:
const updateOrganizationAdministratorVars: UpdateOrganizationAdministratorVariables = {
  organizationId: ..., 
  userId: ..., 
  displayName: ..., 
  phone: ..., 
  auditId: ..., 
  requestId: ..., 
};

// Call the `updateOrganizationAdministrator()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateOrganizationAdministrator(updateOrganizationAdministratorVars);
// Variables can be defined inline as well.
const { data } = await updateOrganizationAdministrator({ organizationId: ..., userId: ..., displayName: ..., phone: ..., auditId: ..., requestId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateOrganizationAdministrator(dataConnect, updateOrganizationAdministratorVars);

console.log(data.appUser_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
updateOrganizationAdministrator(updateOrganizationAdministratorVars).then((response) => {
  const data = response.data;
  console.log(data.appUser_update);
  console.log(data.auditEvent_insert);
});
```

### Using `UpdateOrganizationAdministrator`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateOrganizationAdministratorRef, UpdateOrganizationAdministratorVariables } from '@omniretail/sql-connect';

// The `UpdateOrganizationAdministrator` mutation requires an argument of type `UpdateOrganizationAdministratorVariables`:
const updateOrganizationAdministratorVars: UpdateOrganizationAdministratorVariables = {
  organizationId: ..., 
  userId: ..., 
  displayName: ..., 
  phone: ..., 
  auditId: ..., 
  requestId: ..., 
};

// Call the `updateOrganizationAdministratorRef()` function to get a reference to the mutation.
const ref = updateOrganizationAdministratorRef(updateOrganizationAdministratorVars);
// Variables can be defined inline as well.
const ref = updateOrganizationAdministratorRef({ organizationId: ..., userId: ..., displayName: ..., phone: ..., auditId: ..., requestId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateOrganizationAdministratorRef(dataConnect, updateOrganizationAdministratorVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.appUser_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.appUser_update);
  console.log(data.auditEvent_insert);
});
```

## ChangeOrganizationAdministratorStatus
You can execute the `ChangeOrganizationAdministratorStatus` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
changeOrganizationAdministratorStatus(vars: ChangeOrganizationAdministratorStatusVariables): MutationPromise<ChangeOrganizationAdministratorStatusData, ChangeOrganizationAdministratorStatusVariables>;

interface ChangeOrganizationAdministratorStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ChangeOrganizationAdministratorStatusVariables): MutationRef<ChangeOrganizationAdministratorStatusData, ChangeOrganizationAdministratorStatusVariables>;
}
export const changeOrganizationAdministratorStatusRef: ChangeOrganizationAdministratorStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
changeOrganizationAdministratorStatus(dc: DataConnect, vars: ChangeOrganizationAdministratorStatusVariables): MutationPromise<ChangeOrganizationAdministratorStatusData, ChangeOrganizationAdministratorStatusVariables>;

interface ChangeOrganizationAdministratorStatusRef {
  ...
  (dc: DataConnect, vars: ChangeOrganizationAdministratorStatusVariables): MutationRef<ChangeOrganizationAdministratorStatusData, ChangeOrganizationAdministratorStatusVariables>;
}
export const changeOrganizationAdministratorStatusRef: ChangeOrganizationAdministratorStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the changeOrganizationAdministratorStatusRef:
```typescript
const name = changeOrganizationAdministratorStatusRef.operationName;
console.log(name);
```

### Variables
The `ChangeOrganizationAdministratorStatus` mutation requires an argument of type `ChangeOrganizationAdministratorStatusVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ChangeOrganizationAdministratorStatusVariables {
  organizationId: UUIDString;
  userId: UUIDString;
  status: AppUserStatus;
  membershipStatus: MembershipStatus;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid?: string | null;
  action?: string | null;
}
```
### Return Type
Recall that executing the `ChangeOrganizationAdministratorStatus` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ChangeOrganizationAdministratorStatusData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ChangeOrganizationAdministratorStatusData {
  appUser_update?: AppUser_Key | null;
  organizationMembership_update?: OrganizationMembership_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `ChangeOrganizationAdministratorStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, changeOrganizationAdministratorStatus, ChangeOrganizationAdministratorStatusVariables } from '@omniretail/sql-connect';

// The `ChangeOrganizationAdministratorStatus` mutation requires an argument of type `ChangeOrganizationAdministratorStatusVariables`:
const changeOrganizationAdministratorStatusVars: ChangeOrganizationAdministratorStatusVariables = {
  organizationId: ..., 
  userId: ..., 
  status: ..., 
  membershipStatus: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., // optional
  action: ..., // optional
};

// Call the `changeOrganizationAdministratorStatus()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await changeOrganizationAdministratorStatus(changeOrganizationAdministratorStatusVars);
// Variables can be defined inline as well.
const { data } = await changeOrganizationAdministratorStatus({ organizationId: ..., userId: ..., status: ..., membershipStatus: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., action: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await changeOrganizationAdministratorStatus(dataConnect, changeOrganizationAdministratorStatusVars);

console.log(data.appUser_update);
console.log(data.organizationMembership_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
changeOrganizationAdministratorStatus(changeOrganizationAdministratorStatusVars).then((response) => {
  const data = response.data;
  console.log(data.appUser_update);
  console.log(data.organizationMembership_update);
  console.log(data.auditEvent_insert);
});
```

### Using `ChangeOrganizationAdministratorStatus`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, changeOrganizationAdministratorStatusRef, ChangeOrganizationAdministratorStatusVariables } from '@omniretail/sql-connect';

// The `ChangeOrganizationAdministratorStatus` mutation requires an argument of type `ChangeOrganizationAdministratorStatusVariables`:
const changeOrganizationAdministratorStatusVars: ChangeOrganizationAdministratorStatusVariables = {
  organizationId: ..., 
  userId: ..., 
  status: ..., 
  membershipStatus: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., // optional
  action: ..., // optional
};

// Call the `changeOrganizationAdministratorStatusRef()` function to get a reference to the mutation.
const ref = changeOrganizationAdministratorStatusRef(changeOrganizationAdministratorStatusVars);
// Variables can be defined inline as well.
const ref = changeOrganizationAdministratorStatusRef({ organizationId: ..., userId: ..., status: ..., membershipStatus: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., action: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = changeOrganizationAdministratorStatusRef(dataConnect, changeOrganizationAdministratorStatusVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.appUser_update);
console.log(data.organizationMembership_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.appUser_update);
  console.log(data.organizationMembership_update);
  console.log(data.auditEvent_insert);
});
```

## RecordAdministratorSecurityEvent
You can execute the `RecordAdministratorSecurityEvent` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
recordAdministratorSecurityEvent(vars: RecordAdministratorSecurityEventVariables): MutationPromise<RecordAdministratorSecurityEventData, RecordAdministratorSecurityEventVariables>;

interface RecordAdministratorSecurityEventRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RecordAdministratorSecurityEventVariables): MutationRef<RecordAdministratorSecurityEventData, RecordAdministratorSecurityEventVariables>;
}
export const recordAdministratorSecurityEventRef: RecordAdministratorSecurityEventRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
recordAdministratorSecurityEvent(dc: DataConnect, vars: RecordAdministratorSecurityEventVariables): MutationPromise<RecordAdministratorSecurityEventData, RecordAdministratorSecurityEventVariables>;

interface RecordAdministratorSecurityEventRef {
  ...
  (dc: DataConnect, vars: RecordAdministratorSecurityEventVariables): MutationRef<RecordAdministratorSecurityEventData, RecordAdministratorSecurityEventVariables>;
}
export const recordAdministratorSecurityEventRef: RecordAdministratorSecurityEventRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the recordAdministratorSecurityEventRef:
```typescript
const name = recordAdministratorSecurityEventRef.operationName;
console.log(name);
```

### Variables
The `RecordAdministratorSecurityEvent` mutation requires an argument of type `RecordAdministratorSecurityEventVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RecordAdministratorSecurityEventVariables {
  auditId: UUIDString;
  actorFirebaseUid: string;
  action: string;
  targetId: UUIDString;
  organizationId: UUIDString;
  requestId: string;
}
```
### Return Type
Recall that executing the `RecordAdministratorSecurityEvent` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RecordAdministratorSecurityEventData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RecordAdministratorSecurityEventData {
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `RecordAdministratorSecurityEvent`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, recordAdministratorSecurityEvent, RecordAdministratorSecurityEventVariables } from '@omniretail/sql-connect';

// The `RecordAdministratorSecurityEvent` mutation requires an argument of type `RecordAdministratorSecurityEventVariables`:
const recordAdministratorSecurityEventVars: RecordAdministratorSecurityEventVariables = {
  auditId: ..., 
  actorFirebaseUid: ..., 
  action: ..., 
  targetId: ..., 
  organizationId: ..., 
  requestId: ..., 
};

// Call the `recordAdministratorSecurityEvent()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await recordAdministratorSecurityEvent(recordAdministratorSecurityEventVars);
// Variables can be defined inline as well.
const { data } = await recordAdministratorSecurityEvent({ auditId: ..., actorFirebaseUid: ..., action: ..., targetId: ..., organizationId: ..., requestId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await recordAdministratorSecurityEvent(dataConnect, recordAdministratorSecurityEventVars);

console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
recordAdministratorSecurityEvent(recordAdministratorSecurityEventVars).then((response) => {
  const data = response.data;
  console.log(data.auditEvent_insert);
});
```

### Using `RecordAdministratorSecurityEvent`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, recordAdministratorSecurityEventRef, RecordAdministratorSecurityEventVariables } from '@omniretail/sql-connect';

// The `RecordAdministratorSecurityEvent` mutation requires an argument of type `RecordAdministratorSecurityEventVariables`:
const recordAdministratorSecurityEventVars: RecordAdministratorSecurityEventVariables = {
  auditId: ..., 
  actorFirebaseUid: ..., 
  action: ..., 
  targetId: ..., 
  organizationId: ..., 
  requestId: ..., 
};

// Call the `recordAdministratorSecurityEventRef()` function to get a reference to the mutation.
const ref = recordAdministratorSecurityEventRef(recordAdministratorSecurityEventVars);
// Variables can be defined inline as well.
const ref = recordAdministratorSecurityEventRef({ auditId: ..., actorFirebaseUid: ..., action: ..., targetId: ..., organizationId: ..., requestId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = recordAdministratorSecurityEventRef(dataConnect, recordAdministratorSecurityEventVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.auditEvent_insert);
});
```

## DeleteOrganizationTrusted
You can execute the `DeleteOrganizationTrusted` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
deleteOrganizationTrusted(vars: DeleteOrganizationTrustedVariables): MutationPromise<DeleteOrganizationTrustedData, DeleteOrganizationTrustedVariables>;

interface DeleteOrganizationTrustedRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteOrganizationTrustedVariables): MutationRef<DeleteOrganizationTrustedData, DeleteOrganizationTrustedVariables>;
}
export const deleteOrganizationTrustedRef: DeleteOrganizationTrustedRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteOrganizationTrusted(dc: DataConnect, vars: DeleteOrganizationTrustedVariables): MutationPromise<DeleteOrganizationTrustedData, DeleteOrganizationTrustedVariables>;

interface DeleteOrganizationTrustedRef {
  ...
  (dc: DataConnect, vars: DeleteOrganizationTrustedVariables): MutationRef<DeleteOrganizationTrustedData, DeleteOrganizationTrustedVariables>;
}
export const deleteOrganizationTrustedRef: DeleteOrganizationTrustedRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteOrganizationTrustedRef:
```typescript
const name = deleteOrganizationTrustedRef.operationName;
console.log(name);
```

### Variables
The `DeleteOrganizationTrusted` mutation requires an argument of type `DeleteOrganizationTrustedVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteOrganizationTrustedVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteOrganizationTrusted` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteOrganizationTrustedData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteOrganizationTrustedData {
  organization_delete?: Organization_Key | null;
}
```
### Using `DeleteOrganizationTrusted`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteOrganizationTrusted, DeleteOrganizationTrustedVariables } from '@omniretail/sql-connect';

// The `DeleteOrganizationTrusted` mutation requires an argument of type `DeleteOrganizationTrustedVariables`:
const deleteOrganizationTrustedVars: DeleteOrganizationTrustedVariables = {
  id: ..., 
};

// Call the `deleteOrganizationTrusted()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteOrganizationTrusted(deleteOrganizationTrustedVars);
// Variables can be defined inline as well.
const { data } = await deleteOrganizationTrusted({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteOrganizationTrusted(dataConnect, deleteOrganizationTrustedVars);

console.log(data.organization_delete);

// Or, you can use the `Promise` API.
deleteOrganizationTrusted(deleteOrganizationTrustedVars).then((response) => {
  const data = response.data;
  console.log(data.organization_delete);
});
```

### Using `DeleteOrganizationTrusted`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteOrganizationTrustedRef, DeleteOrganizationTrustedVariables } from '@omniretail/sql-connect';

// The `DeleteOrganizationTrusted` mutation requires an argument of type `DeleteOrganizationTrustedVariables`:
const deleteOrganizationTrustedVars: DeleteOrganizationTrustedVariables = {
  id: ..., 
};

// Call the `deleteOrganizationTrustedRef()` function to get a reference to the mutation.
const ref = deleteOrganizationTrustedRef(deleteOrganizationTrustedVars);
// Variables can be defined inline as well.
const ref = deleteOrganizationTrustedRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteOrganizationTrustedRef(dataConnect, deleteOrganizationTrustedVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.organization_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.organization_delete);
});
```

## DeleteAppUserTrusted
You can execute the `DeleteAppUserTrusted` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
deleteAppUserTrusted(vars: DeleteAppUserTrustedVariables): MutationPromise<DeleteAppUserTrustedData, DeleteAppUserTrustedVariables>;

interface DeleteAppUserTrustedRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteAppUserTrustedVariables): MutationRef<DeleteAppUserTrustedData, DeleteAppUserTrustedVariables>;
}
export const deleteAppUserTrustedRef: DeleteAppUserTrustedRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteAppUserTrusted(dc: DataConnect, vars: DeleteAppUserTrustedVariables): MutationPromise<DeleteAppUserTrustedData, DeleteAppUserTrustedVariables>;

interface DeleteAppUserTrustedRef {
  ...
  (dc: DataConnect, vars: DeleteAppUserTrustedVariables): MutationRef<DeleteAppUserTrustedData, DeleteAppUserTrustedVariables>;
}
export const deleteAppUserTrustedRef: DeleteAppUserTrustedRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteAppUserTrustedRef:
```typescript
const name = deleteAppUserTrustedRef.operationName;
console.log(name);
```

### Variables
The `DeleteAppUserTrusted` mutation requires an argument of type `DeleteAppUserTrustedVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteAppUserTrustedVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteAppUserTrusted` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteAppUserTrustedData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteAppUserTrustedData {
  appUser_delete?: AppUser_Key | null;
}
```
### Using `DeleteAppUserTrusted`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteAppUserTrusted, DeleteAppUserTrustedVariables } from '@omniretail/sql-connect';

// The `DeleteAppUserTrusted` mutation requires an argument of type `DeleteAppUserTrustedVariables`:
const deleteAppUserTrustedVars: DeleteAppUserTrustedVariables = {
  id: ..., 
};

// Call the `deleteAppUserTrusted()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteAppUserTrusted(deleteAppUserTrustedVars);
// Variables can be defined inline as well.
const { data } = await deleteAppUserTrusted({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteAppUserTrusted(dataConnect, deleteAppUserTrustedVars);

console.log(data.appUser_delete);

// Or, you can use the `Promise` API.
deleteAppUserTrusted(deleteAppUserTrustedVars).then((response) => {
  const data = response.data;
  console.log(data.appUser_delete);
});
```

### Using `DeleteAppUserTrusted`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteAppUserTrustedRef, DeleteAppUserTrustedVariables } from '@omniretail/sql-connect';

// The `DeleteAppUserTrusted` mutation requires an argument of type `DeleteAppUserTrustedVariables`:
const deleteAppUserTrustedVars: DeleteAppUserTrustedVariables = {
  id: ..., 
};

// Call the `deleteAppUserTrustedRef()` function to get a reference to the mutation.
const ref = deleteAppUserTrustedRef(deleteAppUserTrustedVars);
// Variables can be defined inline as well.
const ref = deleteAppUserTrustedRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteAppUserTrustedRef(dataConnect, deleteAppUserTrustedVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.appUser_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.appUser_delete);
});
```

## AssignOrganizationLicenseTrusted
You can execute the `AssignOrganizationLicenseTrusted` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
assignOrganizationLicenseTrusted(vars: AssignOrganizationLicenseTrustedVariables): MutationPromise<AssignOrganizationLicenseTrustedData, AssignOrganizationLicenseTrustedVariables>;

interface AssignOrganizationLicenseTrustedRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AssignOrganizationLicenseTrustedVariables): MutationRef<AssignOrganizationLicenseTrustedData, AssignOrganizationLicenseTrustedVariables>;
}
export const assignOrganizationLicenseTrustedRef: AssignOrganizationLicenseTrustedRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
assignOrganizationLicenseTrusted(dc: DataConnect, vars: AssignOrganizationLicenseTrustedVariables): MutationPromise<AssignOrganizationLicenseTrustedData, AssignOrganizationLicenseTrustedVariables>;

interface AssignOrganizationLicenseTrustedRef {
  ...
  (dc: DataConnect, vars: AssignOrganizationLicenseTrustedVariables): MutationRef<AssignOrganizationLicenseTrustedData, AssignOrganizationLicenseTrustedVariables>;
}
export const assignOrganizationLicenseTrustedRef: AssignOrganizationLicenseTrustedRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the assignOrganizationLicenseTrustedRef:
```typescript
const name = assignOrganizationLicenseTrustedRef.operationName;
console.log(name);
```

### Variables
The `AssignOrganizationLicenseTrusted` mutation requires an argument of type `AssignOrganizationLicenseTrustedVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AssignOrganizationLicenseTrustedVariables {
  id: UUIDString;
  organizationId: UUIDString;
  planId: UUIDString;
  startDate: DateString;
  expiryDate: DateString;
  negotiatedPrice: number;
  currency: string;
  historyId: UUIDString;
  planCode: string;
  planName: string;
  planLevel: number;
  maxStores: number;
  maxUsers: number;
  auditId: UUIDString;
  actorFirebaseUid: string;
  requestId: string;
}
```
### Return Type
Recall that executing the `AssignOrganizationLicenseTrusted` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AssignOrganizationLicenseTrustedData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AssignOrganizationLicenseTrustedData {
  organizationLicense_insert: OrganizationLicense_Key;
  licenseHistory_insert: LicenseHistory_Key;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `AssignOrganizationLicenseTrusted`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, assignOrganizationLicenseTrusted, AssignOrganizationLicenseTrustedVariables } from '@omniretail/sql-connect';

// The `AssignOrganizationLicenseTrusted` mutation requires an argument of type `AssignOrganizationLicenseTrustedVariables`:
const assignOrganizationLicenseTrustedVars: AssignOrganizationLicenseTrustedVariables = {
  id: ..., 
  organizationId: ..., 
  planId: ..., 
  startDate: ..., 
  expiryDate: ..., 
  negotiatedPrice: ..., 
  currency: ..., 
  historyId: ..., 
  planCode: ..., 
  planName: ..., 
  planLevel: ..., 
  maxStores: ..., 
  maxUsers: ..., 
  auditId: ..., 
  actorFirebaseUid: ..., 
  requestId: ..., 
};

// Call the `assignOrganizationLicenseTrusted()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await assignOrganizationLicenseTrusted(assignOrganizationLicenseTrustedVars);
// Variables can be defined inline as well.
const { data } = await assignOrganizationLicenseTrusted({ id: ..., organizationId: ..., planId: ..., startDate: ..., expiryDate: ..., negotiatedPrice: ..., currency: ..., historyId: ..., planCode: ..., planName: ..., planLevel: ..., maxStores: ..., maxUsers: ..., auditId: ..., actorFirebaseUid: ..., requestId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await assignOrganizationLicenseTrusted(dataConnect, assignOrganizationLicenseTrustedVars);

console.log(data.organizationLicense_insert);
console.log(data.licenseHistory_insert);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
assignOrganizationLicenseTrusted(assignOrganizationLicenseTrustedVars).then((response) => {
  const data = response.data;
  console.log(data.organizationLicense_insert);
  console.log(data.licenseHistory_insert);
  console.log(data.auditEvent_insert);
});
```

### Using `AssignOrganizationLicenseTrusted`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, assignOrganizationLicenseTrustedRef, AssignOrganizationLicenseTrustedVariables } from '@omniretail/sql-connect';

// The `AssignOrganizationLicenseTrusted` mutation requires an argument of type `AssignOrganizationLicenseTrustedVariables`:
const assignOrganizationLicenseTrustedVars: AssignOrganizationLicenseTrustedVariables = {
  id: ..., 
  organizationId: ..., 
  planId: ..., 
  startDate: ..., 
  expiryDate: ..., 
  negotiatedPrice: ..., 
  currency: ..., 
  historyId: ..., 
  planCode: ..., 
  planName: ..., 
  planLevel: ..., 
  maxStores: ..., 
  maxUsers: ..., 
  auditId: ..., 
  actorFirebaseUid: ..., 
  requestId: ..., 
};

// Call the `assignOrganizationLicenseTrustedRef()` function to get a reference to the mutation.
const ref = assignOrganizationLicenseTrustedRef(assignOrganizationLicenseTrustedVars);
// Variables can be defined inline as well.
const ref = assignOrganizationLicenseTrustedRef({ id: ..., organizationId: ..., planId: ..., startDate: ..., expiryDate: ..., negotiatedPrice: ..., currency: ..., historyId: ..., planCode: ..., planName: ..., planLevel: ..., maxStores: ..., maxUsers: ..., auditId: ..., actorFirebaseUid: ..., requestId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = assignOrganizationLicenseTrustedRef(dataConnect, assignOrganizationLicenseTrustedVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.organizationLicense_insert);
console.log(data.licenseHistory_insert);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.organizationLicense_insert);
  console.log(data.licenseHistory_insert);
  console.log(data.auditEvent_insert);
});
```

## ChangeOrganizationLicensePlanTrusted
You can execute the `ChangeOrganizationLicensePlanTrusted` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
changeOrganizationLicensePlanTrusted(vars: ChangeOrganizationLicensePlanTrustedVariables): MutationPromise<ChangeOrganizationLicensePlanTrustedData, ChangeOrganizationLicensePlanTrustedVariables>;

interface ChangeOrganizationLicensePlanTrustedRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ChangeOrganizationLicensePlanTrustedVariables): MutationRef<ChangeOrganizationLicensePlanTrustedData, ChangeOrganizationLicensePlanTrustedVariables>;
}
export const changeOrganizationLicensePlanTrustedRef: ChangeOrganizationLicensePlanTrustedRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
changeOrganizationLicensePlanTrusted(dc: DataConnect, vars: ChangeOrganizationLicensePlanTrustedVariables): MutationPromise<ChangeOrganizationLicensePlanTrustedData, ChangeOrganizationLicensePlanTrustedVariables>;

interface ChangeOrganizationLicensePlanTrustedRef {
  ...
  (dc: DataConnect, vars: ChangeOrganizationLicensePlanTrustedVariables): MutationRef<ChangeOrganizationLicensePlanTrustedData, ChangeOrganizationLicensePlanTrustedVariables>;
}
export const changeOrganizationLicensePlanTrustedRef: ChangeOrganizationLicensePlanTrustedRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the changeOrganizationLicensePlanTrustedRef:
```typescript
const name = changeOrganizationLicensePlanTrustedRef.operationName;
console.log(name);
```

### Variables
The `ChangeOrganizationLicensePlanTrusted` mutation requires an argument of type `ChangeOrganizationLicensePlanTrustedVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ChangeOrganizationLicensePlanTrustedVariables {
  id: UUIDString;
  organizationId: UUIDString;
  planId: UUIDString;
  startDate: DateString;
  expiryDate: DateString;
  negotiatedPrice: number;
  currency: string;
  historyId: UUIDString;
  planCode: string;
  planName: string;
  planLevel: number;
  maxStores: number;
  maxUsers: number;
  auditId: UUIDString;
  actorFirebaseUid: string;
  requestId: string;
  changes?: unknown | null;
}
```
### Return Type
Recall that executing the `ChangeOrganizationLicensePlanTrusted` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ChangeOrganizationLicensePlanTrustedData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ChangeOrganizationLicensePlanTrustedData {
  organizationLicense_update?: OrganizationLicense_Key | null;
  licenseHistory_insert: LicenseHistory_Key;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `ChangeOrganizationLicensePlanTrusted`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, changeOrganizationLicensePlanTrusted, ChangeOrganizationLicensePlanTrustedVariables } from '@omniretail/sql-connect';

// The `ChangeOrganizationLicensePlanTrusted` mutation requires an argument of type `ChangeOrganizationLicensePlanTrustedVariables`:
const changeOrganizationLicensePlanTrustedVars: ChangeOrganizationLicensePlanTrustedVariables = {
  id: ..., 
  organizationId: ..., 
  planId: ..., 
  startDate: ..., 
  expiryDate: ..., 
  negotiatedPrice: ..., 
  currency: ..., 
  historyId: ..., 
  planCode: ..., 
  planName: ..., 
  planLevel: ..., 
  maxStores: ..., 
  maxUsers: ..., 
  auditId: ..., 
  actorFirebaseUid: ..., 
  requestId: ..., 
  changes: ..., // optional
};

// Call the `changeOrganizationLicensePlanTrusted()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await changeOrganizationLicensePlanTrusted(changeOrganizationLicensePlanTrustedVars);
// Variables can be defined inline as well.
const { data } = await changeOrganizationLicensePlanTrusted({ id: ..., organizationId: ..., planId: ..., startDate: ..., expiryDate: ..., negotiatedPrice: ..., currency: ..., historyId: ..., planCode: ..., planName: ..., planLevel: ..., maxStores: ..., maxUsers: ..., auditId: ..., actorFirebaseUid: ..., requestId: ..., changes: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await changeOrganizationLicensePlanTrusted(dataConnect, changeOrganizationLicensePlanTrustedVars);

console.log(data.organizationLicense_update);
console.log(data.licenseHistory_insert);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
changeOrganizationLicensePlanTrusted(changeOrganizationLicensePlanTrustedVars).then((response) => {
  const data = response.data;
  console.log(data.organizationLicense_update);
  console.log(data.licenseHistory_insert);
  console.log(data.auditEvent_insert);
});
```

### Using `ChangeOrganizationLicensePlanTrusted`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, changeOrganizationLicensePlanTrustedRef, ChangeOrganizationLicensePlanTrustedVariables } from '@omniretail/sql-connect';

// The `ChangeOrganizationLicensePlanTrusted` mutation requires an argument of type `ChangeOrganizationLicensePlanTrustedVariables`:
const changeOrganizationLicensePlanTrustedVars: ChangeOrganizationLicensePlanTrustedVariables = {
  id: ..., 
  organizationId: ..., 
  planId: ..., 
  startDate: ..., 
  expiryDate: ..., 
  negotiatedPrice: ..., 
  currency: ..., 
  historyId: ..., 
  planCode: ..., 
  planName: ..., 
  planLevel: ..., 
  maxStores: ..., 
  maxUsers: ..., 
  auditId: ..., 
  actorFirebaseUid: ..., 
  requestId: ..., 
  changes: ..., // optional
};

// Call the `changeOrganizationLicensePlanTrustedRef()` function to get a reference to the mutation.
const ref = changeOrganizationLicensePlanTrustedRef(changeOrganizationLicensePlanTrustedVars);
// Variables can be defined inline as well.
const ref = changeOrganizationLicensePlanTrustedRef({ id: ..., organizationId: ..., planId: ..., startDate: ..., expiryDate: ..., negotiatedPrice: ..., currency: ..., historyId: ..., planCode: ..., planName: ..., planLevel: ..., maxStores: ..., maxUsers: ..., auditId: ..., actorFirebaseUid: ..., requestId: ..., changes: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = changeOrganizationLicensePlanTrustedRef(dataConnect, changeOrganizationLicensePlanTrustedVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.organizationLicense_update);
console.log(data.licenseHistory_insert);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.organizationLicense_update);
  console.log(data.licenseHistory_insert);
  console.log(data.auditEvent_insert);
});
```

## ModifyOrganizationCommercialTermsTrusted
You can execute the `ModifyOrganizationCommercialTermsTrusted` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
modifyOrganizationCommercialTermsTrusted(vars: ModifyOrganizationCommercialTermsTrustedVariables): MutationPromise<ModifyOrganizationCommercialTermsTrustedData, ModifyOrganizationCommercialTermsTrustedVariables>;

interface ModifyOrganizationCommercialTermsTrustedRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ModifyOrganizationCommercialTermsTrustedVariables): MutationRef<ModifyOrganizationCommercialTermsTrustedData, ModifyOrganizationCommercialTermsTrustedVariables>;
}
export const modifyOrganizationCommercialTermsTrustedRef: ModifyOrganizationCommercialTermsTrustedRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
modifyOrganizationCommercialTermsTrusted(dc: DataConnect, vars: ModifyOrganizationCommercialTermsTrustedVariables): MutationPromise<ModifyOrganizationCommercialTermsTrustedData, ModifyOrganizationCommercialTermsTrustedVariables>;

interface ModifyOrganizationCommercialTermsTrustedRef {
  ...
  (dc: DataConnect, vars: ModifyOrganizationCommercialTermsTrustedVariables): MutationRef<ModifyOrganizationCommercialTermsTrustedData, ModifyOrganizationCommercialTermsTrustedVariables>;
}
export const modifyOrganizationCommercialTermsTrustedRef: ModifyOrganizationCommercialTermsTrustedRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the modifyOrganizationCommercialTermsTrustedRef:
```typescript
const name = modifyOrganizationCommercialTermsTrustedRef.operationName;
console.log(name);
```

### Variables
The `ModifyOrganizationCommercialTermsTrusted` mutation requires an argument of type `ModifyOrganizationCommercialTermsTrustedVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ModifyOrganizationCommercialTermsTrustedVariables {
  id: UUIDString;
  organizationId: UUIDString;
  planId: UUIDString;
  startDate: DateString;
  expiryDate: DateString;
  negotiatedPrice: number;
  currency: string;
  historyId: UUIDString;
  planCode: string;
  planName: string;
  planLevel: number;
  maxStores: number;
  maxUsers: number;
  auditId: UUIDString;
  actorFirebaseUid: string;
  requestId: string;
  changes?: unknown | null;
}
```
### Return Type
Recall that executing the `ModifyOrganizationCommercialTermsTrusted` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ModifyOrganizationCommercialTermsTrustedData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ModifyOrganizationCommercialTermsTrustedData {
  organizationLicense_update?: OrganizationLicense_Key | null;
  licenseHistory_insert: LicenseHistory_Key;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `ModifyOrganizationCommercialTermsTrusted`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, modifyOrganizationCommercialTermsTrusted, ModifyOrganizationCommercialTermsTrustedVariables } from '@omniretail/sql-connect';

// The `ModifyOrganizationCommercialTermsTrusted` mutation requires an argument of type `ModifyOrganizationCommercialTermsTrustedVariables`:
const modifyOrganizationCommercialTermsTrustedVars: ModifyOrganizationCommercialTermsTrustedVariables = {
  id: ..., 
  organizationId: ..., 
  planId: ..., 
  startDate: ..., 
  expiryDate: ..., 
  negotiatedPrice: ..., 
  currency: ..., 
  historyId: ..., 
  planCode: ..., 
  planName: ..., 
  planLevel: ..., 
  maxStores: ..., 
  maxUsers: ..., 
  auditId: ..., 
  actorFirebaseUid: ..., 
  requestId: ..., 
  changes: ..., // optional
};

// Call the `modifyOrganizationCommercialTermsTrusted()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await modifyOrganizationCommercialTermsTrusted(modifyOrganizationCommercialTermsTrustedVars);
// Variables can be defined inline as well.
const { data } = await modifyOrganizationCommercialTermsTrusted({ id: ..., organizationId: ..., planId: ..., startDate: ..., expiryDate: ..., negotiatedPrice: ..., currency: ..., historyId: ..., planCode: ..., planName: ..., planLevel: ..., maxStores: ..., maxUsers: ..., auditId: ..., actorFirebaseUid: ..., requestId: ..., changes: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await modifyOrganizationCommercialTermsTrusted(dataConnect, modifyOrganizationCommercialTermsTrustedVars);

console.log(data.organizationLicense_update);
console.log(data.licenseHistory_insert);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
modifyOrganizationCommercialTermsTrusted(modifyOrganizationCommercialTermsTrustedVars).then((response) => {
  const data = response.data;
  console.log(data.organizationLicense_update);
  console.log(data.licenseHistory_insert);
  console.log(data.auditEvent_insert);
});
```

### Using `ModifyOrganizationCommercialTermsTrusted`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, modifyOrganizationCommercialTermsTrustedRef, ModifyOrganizationCommercialTermsTrustedVariables } from '@omniretail/sql-connect';

// The `ModifyOrganizationCommercialTermsTrusted` mutation requires an argument of type `ModifyOrganizationCommercialTermsTrustedVariables`:
const modifyOrganizationCommercialTermsTrustedVars: ModifyOrganizationCommercialTermsTrustedVariables = {
  id: ..., 
  organizationId: ..., 
  planId: ..., 
  startDate: ..., 
  expiryDate: ..., 
  negotiatedPrice: ..., 
  currency: ..., 
  historyId: ..., 
  planCode: ..., 
  planName: ..., 
  planLevel: ..., 
  maxStores: ..., 
  maxUsers: ..., 
  auditId: ..., 
  actorFirebaseUid: ..., 
  requestId: ..., 
  changes: ..., // optional
};

// Call the `modifyOrganizationCommercialTermsTrustedRef()` function to get a reference to the mutation.
const ref = modifyOrganizationCommercialTermsTrustedRef(modifyOrganizationCommercialTermsTrustedVars);
// Variables can be defined inline as well.
const ref = modifyOrganizationCommercialTermsTrustedRef({ id: ..., organizationId: ..., planId: ..., startDate: ..., expiryDate: ..., negotiatedPrice: ..., currency: ..., historyId: ..., planCode: ..., planName: ..., planLevel: ..., maxStores: ..., maxUsers: ..., auditId: ..., actorFirebaseUid: ..., requestId: ..., changes: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = modifyOrganizationCommercialTermsTrustedRef(dataConnect, modifyOrganizationCommercialTermsTrustedVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.organizationLicense_update);
console.log(data.licenseHistory_insert);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.organizationLicense_update);
  console.log(data.licenseHistory_insert);
  console.log(data.auditEvent_insert);
});
```

## RenewOrganizationLicenseTrusted
You can execute the `RenewOrganizationLicenseTrusted` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
renewOrganizationLicenseTrusted(vars: RenewOrganizationLicenseTrustedVariables): MutationPromise<RenewOrganizationLicenseTrustedData, RenewOrganizationLicenseTrustedVariables>;

interface RenewOrganizationLicenseTrustedRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RenewOrganizationLicenseTrustedVariables): MutationRef<RenewOrganizationLicenseTrustedData, RenewOrganizationLicenseTrustedVariables>;
}
export const renewOrganizationLicenseTrustedRef: RenewOrganizationLicenseTrustedRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
renewOrganizationLicenseTrusted(dc: DataConnect, vars: RenewOrganizationLicenseTrustedVariables): MutationPromise<RenewOrganizationLicenseTrustedData, RenewOrganizationLicenseTrustedVariables>;

interface RenewOrganizationLicenseTrustedRef {
  ...
  (dc: DataConnect, vars: RenewOrganizationLicenseTrustedVariables): MutationRef<RenewOrganizationLicenseTrustedData, RenewOrganizationLicenseTrustedVariables>;
}
export const renewOrganizationLicenseTrustedRef: RenewOrganizationLicenseTrustedRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the renewOrganizationLicenseTrustedRef:
```typescript
const name = renewOrganizationLicenseTrustedRef.operationName;
console.log(name);
```

### Variables
The `RenewOrganizationLicenseTrusted` mutation requires an argument of type `RenewOrganizationLicenseTrustedVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RenewOrganizationLicenseTrustedVariables {
  id: UUIDString;
  organizationId: UUIDString;
  planId: UUIDString;
  startDate: DateString;
  expiryDate: DateString;
  negotiatedPrice: number;
  currency: string;
  historyId: UUIDString;
  planCode: string;
  planName: string;
  planLevel: number;
  maxStores: number;
  maxUsers: number;
  auditId: UUIDString;
  actorFirebaseUid: string;
  requestId: string;
  changes?: unknown | null;
}
```
### Return Type
Recall that executing the `RenewOrganizationLicenseTrusted` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RenewOrganizationLicenseTrustedData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RenewOrganizationLicenseTrustedData {
  organizationLicense_update?: OrganizationLicense_Key | null;
  licenseHistory_insert: LicenseHistory_Key;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `RenewOrganizationLicenseTrusted`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, renewOrganizationLicenseTrusted, RenewOrganizationLicenseTrustedVariables } from '@omniretail/sql-connect';

// The `RenewOrganizationLicenseTrusted` mutation requires an argument of type `RenewOrganizationLicenseTrustedVariables`:
const renewOrganizationLicenseTrustedVars: RenewOrganizationLicenseTrustedVariables = {
  id: ..., 
  organizationId: ..., 
  planId: ..., 
  startDate: ..., 
  expiryDate: ..., 
  negotiatedPrice: ..., 
  currency: ..., 
  historyId: ..., 
  planCode: ..., 
  planName: ..., 
  planLevel: ..., 
  maxStores: ..., 
  maxUsers: ..., 
  auditId: ..., 
  actorFirebaseUid: ..., 
  requestId: ..., 
  changes: ..., // optional
};

// Call the `renewOrganizationLicenseTrusted()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await renewOrganizationLicenseTrusted(renewOrganizationLicenseTrustedVars);
// Variables can be defined inline as well.
const { data } = await renewOrganizationLicenseTrusted({ id: ..., organizationId: ..., planId: ..., startDate: ..., expiryDate: ..., negotiatedPrice: ..., currency: ..., historyId: ..., planCode: ..., planName: ..., planLevel: ..., maxStores: ..., maxUsers: ..., auditId: ..., actorFirebaseUid: ..., requestId: ..., changes: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await renewOrganizationLicenseTrusted(dataConnect, renewOrganizationLicenseTrustedVars);

console.log(data.organizationLicense_update);
console.log(data.licenseHistory_insert);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
renewOrganizationLicenseTrusted(renewOrganizationLicenseTrustedVars).then((response) => {
  const data = response.data;
  console.log(data.organizationLicense_update);
  console.log(data.licenseHistory_insert);
  console.log(data.auditEvent_insert);
});
```

### Using `RenewOrganizationLicenseTrusted`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, renewOrganizationLicenseTrustedRef, RenewOrganizationLicenseTrustedVariables } from '@omniretail/sql-connect';

// The `RenewOrganizationLicenseTrusted` mutation requires an argument of type `RenewOrganizationLicenseTrustedVariables`:
const renewOrganizationLicenseTrustedVars: RenewOrganizationLicenseTrustedVariables = {
  id: ..., 
  organizationId: ..., 
  planId: ..., 
  startDate: ..., 
  expiryDate: ..., 
  negotiatedPrice: ..., 
  currency: ..., 
  historyId: ..., 
  planCode: ..., 
  planName: ..., 
  planLevel: ..., 
  maxStores: ..., 
  maxUsers: ..., 
  auditId: ..., 
  actorFirebaseUid: ..., 
  requestId: ..., 
  changes: ..., // optional
};

// Call the `renewOrganizationLicenseTrustedRef()` function to get a reference to the mutation.
const ref = renewOrganizationLicenseTrustedRef(renewOrganizationLicenseTrustedVars);
// Variables can be defined inline as well.
const ref = renewOrganizationLicenseTrustedRef({ id: ..., organizationId: ..., planId: ..., startDate: ..., expiryDate: ..., negotiatedPrice: ..., currency: ..., historyId: ..., planCode: ..., planName: ..., planLevel: ..., maxStores: ..., maxUsers: ..., auditId: ..., actorFirebaseUid: ..., requestId: ..., changes: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = renewOrganizationLicenseTrustedRef(dataConnect, renewOrganizationLicenseTrustedVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.organizationLicense_update);
console.log(data.licenseHistory_insert);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.organizationLicense_update);
  console.log(data.licenseHistory_insert);
  console.log(data.auditEvent_insert);
});
```

## ClaimLifecycleIdempotency
You can execute the `ClaimLifecycleIdempotency` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
claimLifecycleIdempotency(vars: ClaimLifecycleIdempotencyVariables): MutationPromise<ClaimLifecycleIdempotencyData, ClaimLifecycleIdempotencyVariables>;

interface ClaimLifecycleIdempotencyRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ClaimLifecycleIdempotencyVariables): MutationRef<ClaimLifecycleIdempotencyData, ClaimLifecycleIdempotencyVariables>;
}
export const claimLifecycleIdempotencyRef: ClaimLifecycleIdempotencyRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
claimLifecycleIdempotency(dc: DataConnect, vars: ClaimLifecycleIdempotencyVariables): MutationPromise<ClaimLifecycleIdempotencyData, ClaimLifecycleIdempotencyVariables>;

interface ClaimLifecycleIdempotencyRef {
  ...
  (dc: DataConnect, vars: ClaimLifecycleIdempotencyVariables): MutationRef<ClaimLifecycleIdempotencyData, ClaimLifecycleIdempotencyVariables>;
}
export const claimLifecycleIdempotencyRef: ClaimLifecycleIdempotencyRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the claimLifecycleIdempotencyRef:
```typescript
const name = claimLifecycleIdempotencyRef.operationName;
console.log(name);
```

### Variables
The `ClaimLifecycleIdempotency` mutation requires an argument of type `ClaimLifecycleIdempotencyVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ClaimLifecycleIdempotencyVariables {
  idempotencyKey: string;
  operationType: string;
  requestFingerprint: string;
}
```
### Return Type
Recall that executing the `ClaimLifecycleIdempotency` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ClaimLifecycleIdempotencyData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ClaimLifecycleIdempotencyData {
  lifecycleIdempotency_insert: LifecycleIdempotency_Key;
}
```
### Using `ClaimLifecycleIdempotency`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, claimLifecycleIdempotency, ClaimLifecycleIdempotencyVariables } from '@omniretail/sql-connect';

// The `ClaimLifecycleIdempotency` mutation requires an argument of type `ClaimLifecycleIdempotencyVariables`:
const claimLifecycleIdempotencyVars: ClaimLifecycleIdempotencyVariables = {
  idempotencyKey: ..., 
  operationType: ..., 
  requestFingerprint: ..., 
};

// Call the `claimLifecycleIdempotency()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await claimLifecycleIdempotency(claimLifecycleIdempotencyVars);
// Variables can be defined inline as well.
const { data } = await claimLifecycleIdempotency({ idempotencyKey: ..., operationType: ..., requestFingerprint: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await claimLifecycleIdempotency(dataConnect, claimLifecycleIdempotencyVars);

console.log(data.lifecycleIdempotency_insert);

// Or, you can use the `Promise` API.
claimLifecycleIdempotency(claimLifecycleIdempotencyVars).then((response) => {
  const data = response.data;
  console.log(data.lifecycleIdempotency_insert);
});
```

### Using `ClaimLifecycleIdempotency`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, claimLifecycleIdempotencyRef, ClaimLifecycleIdempotencyVariables } from '@omniretail/sql-connect';

// The `ClaimLifecycleIdempotency` mutation requires an argument of type `ClaimLifecycleIdempotencyVariables`:
const claimLifecycleIdempotencyVars: ClaimLifecycleIdempotencyVariables = {
  idempotencyKey: ..., 
  operationType: ..., 
  requestFingerprint: ..., 
};

// Call the `claimLifecycleIdempotencyRef()` function to get a reference to the mutation.
const ref = claimLifecycleIdempotencyRef(claimLifecycleIdempotencyVars);
// Variables can be defined inline as well.
const ref = claimLifecycleIdempotencyRef({ idempotencyKey: ..., operationType: ..., requestFingerprint: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = claimLifecycleIdempotencyRef(dataConnect, claimLifecycleIdempotencyVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.lifecycleIdempotency_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.lifecycleIdempotency_insert);
});
```

## CompleteLifecycleIdempotency
You can execute the `CompleteLifecycleIdempotency` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
completeLifecycleIdempotency(vars: CompleteLifecycleIdempotencyVariables): MutationPromise<CompleteLifecycleIdempotencyData, CompleteLifecycleIdempotencyVariables>;

interface CompleteLifecycleIdempotencyRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CompleteLifecycleIdempotencyVariables): MutationRef<CompleteLifecycleIdempotencyData, CompleteLifecycleIdempotencyVariables>;
}
export const completeLifecycleIdempotencyRef: CompleteLifecycleIdempotencyRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
completeLifecycleIdempotency(dc: DataConnect, vars: CompleteLifecycleIdempotencyVariables): MutationPromise<CompleteLifecycleIdempotencyData, CompleteLifecycleIdempotencyVariables>;

interface CompleteLifecycleIdempotencyRef {
  ...
  (dc: DataConnect, vars: CompleteLifecycleIdempotencyVariables): MutationRef<CompleteLifecycleIdempotencyData, CompleteLifecycleIdempotencyVariables>;
}
export const completeLifecycleIdempotencyRef: CompleteLifecycleIdempotencyRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the completeLifecycleIdempotencyRef:
```typescript
const name = completeLifecycleIdempotencyRef.operationName;
console.log(name);
```

### Variables
The `CompleteLifecycleIdempotency` mutation requires an argument of type `CompleteLifecycleIdempotencyVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CompleteLifecycleIdempotencyVariables {
  idempotencyKey: string;
  status: ProvisioningAttemptStatus;
  resultReference?: string | null;
}
```
### Return Type
Recall that executing the `CompleteLifecycleIdempotency` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CompleteLifecycleIdempotencyData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CompleteLifecycleIdempotencyData {
  lifecycleIdempotency_update?: LifecycleIdempotency_Key | null;
}
```
### Using `CompleteLifecycleIdempotency`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, completeLifecycleIdempotency, CompleteLifecycleIdempotencyVariables } from '@omniretail/sql-connect';

// The `CompleteLifecycleIdempotency` mutation requires an argument of type `CompleteLifecycleIdempotencyVariables`:
const completeLifecycleIdempotencyVars: CompleteLifecycleIdempotencyVariables = {
  idempotencyKey: ..., 
  status: ..., 
  resultReference: ..., // optional
};

// Call the `completeLifecycleIdempotency()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await completeLifecycleIdempotency(completeLifecycleIdempotencyVars);
// Variables can be defined inline as well.
const { data } = await completeLifecycleIdempotency({ idempotencyKey: ..., status: ..., resultReference: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await completeLifecycleIdempotency(dataConnect, completeLifecycleIdempotencyVars);

console.log(data.lifecycleIdempotency_update);

// Or, you can use the `Promise` API.
completeLifecycleIdempotency(completeLifecycleIdempotencyVars).then((response) => {
  const data = response.data;
  console.log(data.lifecycleIdempotency_update);
});
```

### Using `CompleteLifecycleIdempotency`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, completeLifecycleIdempotencyRef, CompleteLifecycleIdempotencyVariables } from '@omniretail/sql-connect';

// The `CompleteLifecycleIdempotency` mutation requires an argument of type `CompleteLifecycleIdempotencyVariables`:
const completeLifecycleIdempotencyVars: CompleteLifecycleIdempotencyVariables = {
  idempotencyKey: ..., 
  status: ..., 
  resultReference: ..., // optional
};

// Call the `completeLifecycleIdempotencyRef()` function to get a reference to the mutation.
const ref = completeLifecycleIdempotencyRef(completeLifecycleIdempotencyVars);
// Variables can be defined inline as well.
const ref = completeLifecycleIdempotencyRef({ idempotencyKey: ..., status: ..., resultReference: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = completeLifecycleIdempotencyRef(dataConnect, completeLifecycleIdempotencyVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.lifecycleIdempotency_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.lifecycleIdempotency_update);
});
```

## RecordProvisioningReconciliation
You can execute the `RecordProvisioningReconciliation` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
recordProvisioningReconciliation(vars: RecordProvisioningReconciliationVariables): MutationPromise<RecordProvisioningReconciliationData, RecordProvisioningReconciliationVariables>;

interface RecordProvisioningReconciliationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RecordProvisioningReconciliationVariables): MutationRef<RecordProvisioningReconciliationData, RecordProvisioningReconciliationVariables>;
}
export const recordProvisioningReconciliationRef: RecordProvisioningReconciliationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
recordProvisioningReconciliation(dc: DataConnect, vars: RecordProvisioningReconciliationVariables): MutationPromise<RecordProvisioningReconciliationData, RecordProvisioningReconciliationVariables>;

interface RecordProvisioningReconciliationRef {
  ...
  (dc: DataConnect, vars: RecordProvisioningReconciliationVariables): MutationRef<RecordProvisioningReconciliationData, RecordProvisioningReconciliationVariables>;
}
export const recordProvisioningReconciliationRef: RecordProvisioningReconciliationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the recordProvisioningReconciliationRef:
```typescript
const name = recordProvisioningReconciliationRef.operationName;
console.log(name);
```

### Variables
The `RecordProvisioningReconciliation` mutation requires an argument of type `RecordProvisioningReconciliationVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RecordProvisioningReconciliationVariables {
  idempotencyKey: string;
  firebaseUid: string;
  errorClass: string;
}
```
### Return Type
Recall that executing the `RecordProvisioningReconciliation` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RecordProvisioningReconciliationData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RecordProvisioningReconciliationData {
  provisioningReconciliation_insert: ProvisioningReconciliation_Key;
}
```
### Using `RecordProvisioningReconciliation`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, recordProvisioningReconciliation, RecordProvisioningReconciliationVariables } from '@omniretail/sql-connect';

// The `RecordProvisioningReconciliation` mutation requires an argument of type `RecordProvisioningReconciliationVariables`:
const recordProvisioningReconciliationVars: RecordProvisioningReconciliationVariables = {
  idempotencyKey: ..., 
  firebaseUid: ..., 
  errorClass: ..., 
};

// Call the `recordProvisioningReconciliation()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await recordProvisioningReconciliation(recordProvisioningReconciliationVars);
// Variables can be defined inline as well.
const { data } = await recordProvisioningReconciliation({ idempotencyKey: ..., firebaseUid: ..., errorClass: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await recordProvisioningReconciliation(dataConnect, recordProvisioningReconciliationVars);

console.log(data.provisioningReconciliation_insert);

// Or, you can use the `Promise` API.
recordProvisioningReconciliation(recordProvisioningReconciliationVars).then((response) => {
  const data = response.data;
  console.log(data.provisioningReconciliation_insert);
});
```

### Using `RecordProvisioningReconciliation`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, recordProvisioningReconciliationRef, RecordProvisioningReconciliationVariables } from '@omniretail/sql-connect';

// The `RecordProvisioningReconciliation` mutation requires an argument of type `RecordProvisioningReconciliationVariables`:
const recordProvisioningReconciliationVars: RecordProvisioningReconciliationVariables = {
  idempotencyKey: ..., 
  firebaseUid: ..., 
  errorClass: ..., 
};

// Call the `recordProvisioningReconciliationRef()` function to get a reference to the mutation.
const ref = recordProvisioningReconciliationRef(recordProvisioningReconciliationVars);
// Variables can be defined inline as well.
const ref = recordProvisioningReconciliationRef({ idempotencyKey: ..., firebaseUid: ..., errorClass: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = recordProvisioningReconciliationRef(dataConnect, recordProvisioningReconciliationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.provisioningReconciliation_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.provisioningReconciliation_insert);
});
```

## CreateOrganization
You can execute the `CreateOrganization` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
createOrganization(vars: CreateOrganizationVariables): MutationPromise<CreateOrganizationData, CreateOrganizationVariables>;

interface CreateOrganizationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateOrganizationVariables): MutationRef<CreateOrganizationData, CreateOrganizationVariables>;
}
export const createOrganizationRef: CreateOrganizationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createOrganization(dc: DataConnect, vars: CreateOrganizationVariables): MutationPromise<CreateOrganizationData, CreateOrganizationVariables>;

interface CreateOrganizationRef {
  ...
  (dc: DataConnect, vars: CreateOrganizationVariables): MutationRef<CreateOrganizationData, CreateOrganizationVariables>;
}
export const createOrganizationRef: CreateOrganizationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createOrganizationRef:
```typescript
const name = createOrganizationRef.operationName;
console.log(name);
```

### Variables
The `CreateOrganization` mutation requires an argument of type `CreateOrganizationVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateOrganizationVariables {
  organizationCode: string;
  businessName: string;
  legalEntityName?: string | null;
  taxId?: string | null;
  primaryContactName: string;
  email: string;
  phone: string;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  postalCode?: string | null;
  timezone: string;
  currency: string;
  auditId: UUIDString;
  requestId: string;
}
```
### Return Type
Recall that executing the `CreateOrganization` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateOrganizationData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateOrganizationData {
  organization_insert: Organization_Key;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `CreateOrganization`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createOrganization, CreateOrganizationVariables } from '@omniretail/sql-connect';

// The `CreateOrganization` mutation requires an argument of type `CreateOrganizationVariables`:
const createOrganizationVars: CreateOrganizationVariables = {
  organizationCode: ..., 
  businessName: ..., 
  legalEntityName: ..., // optional
  taxId: ..., // optional
  primaryContactName: ..., 
  email: ..., 
  phone: ..., 
  address: ..., // optional
  city: ..., // optional
  state: ..., // optional
  postalCode: ..., // optional
  timezone: ..., 
  currency: ..., 
  auditId: ..., 
  requestId: ..., 
};

// Call the `createOrganization()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createOrganization(createOrganizationVars);
// Variables can be defined inline as well.
const { data } = await createOrganization({ organizationCode: ..., businessName: ..., legalEntityName: ..., taxId: ..., primaryContactName: ..., email: ..., phone: ..., address: ..., city: ..., state: ..., postalCode: ..., timezone: ..., currency: ..., auditId: ..., requestId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createOrganization(dataConnect, createOrganizationVars);

console.log(data.organization_insert);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
createOrganization(createOrganizationVars).then((response) => {
  const data = response.data;
  console.log(data.organization_insert);
  console.log(data.auditEvent_insert);
});
```

### Using `CreateOrganization`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createOrganizationRef, CreateOrganizationVariables } from '@omniretail/sql-connect';

// The `CreateOrganization` mutation requires an argument of type `CreateOrganizationVariables`:
const createOrganizationVars: CreateOrganizationVariables = {
  organizationCode: ..., 
  businessName: ..., 
  legalEntityName: ..., // optional
  taxId: ..., // optional
  primaryContactName: ..., 
  email: ..., 
  phone: ..., 
  address: ..., // optional
  city: ..., // optional
  state: ..., // optional
  postalCode: ..., // optional
  timezone: ..., 
  currency: ..., 
  auditId: ..., 
  requestId: ..., 
};

// Call the `createOrganizationRef()` function to get a reference to the mutation.
const ref = createOrganizationRef(createOrganizationVars);
// Variables can be defined inline as well.
const ref = createOrganizationRef({ organizationCode: ..., businessName: ..., legalEntityName: ..., taxId: ..., primaryContactName: ..., email: ..., phone: ..., address: ..., city: ..., state: ..., postalCode: ..., timezone: ..., currency: ..., auditId: ..., requestId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createOrganizationRef(dataConnect, createOrganizationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.organization_insert);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.organization_insert);
  console.log(data.auditEvent_insert);
});
```

## UpdateOrganization
You can execute the `UpdateOrganization` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
updateOrganization(vars: UpdateOrganizationVariables): MutationPromise<UpdateOrganizationData, UpdateOrganizationVariables>;

interface UpdateOrganizationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateOrganizationVariables): MutationRef<UpdateOrganizationData, UpdateOrganizationVariables>;
}
export const updateOrganizationRef: UpdateOrganizationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateOrganization(dc: DataConnect, vars: UpdateOrganizationVariables): MutationPromise<UpdateOrganizationData, UpdateOrganizationVariables>;

interface UpdateOrganizationRef {
  ...
  (dc: DataConnect, vars: UpdateOrganizationVariables): MutationRef<UpdateOrganizationData, UpdateOrganizationVariables>;
}
export const updateOrganizationRef: UpdateOrganizationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateOrganizationRef:
```typescript
const name = updateOrganizationRef.operationName;
console.log(name);
```

### Variables
The `UpdateOrganization` mutation requires an argument of type `UpdateOrganizationVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateOrganizationVariables {
  id: UUIDString;
  businessName: string;
  legalEntityName?: string | null;
  taxId?: string | null;
  primaryContactName: string;
  email: string;
  phone: string;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  postalCode?: string | null;
  timezone: string;
  currency: string;
  auditId: UUIDString;
  requestId: string;
}
```
### Return Type
Recall that executing the `UpdateOrganization` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateOrganizationData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateOrganizationData {
  organization_update?: Organization_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `UpdateOrganization`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateOrganization, UpdateOrganizationVariables } from '@omniretail/sql-connect';

// The `UpdateOrganization` mutation requires an argument of type `UpdateOrganizationVariables`:
const updateOrganizationVars: UpdateOrganizationVariables = {
  id: ..., 
  businessName: ..., 
  legalEntityName: ..., // optional
  taxId: ..., // optional
  primaryContactName: ..., 
  email: ..., 
  phone: ..., 
  address: ..., // optional
  city: ..., // optional
  state: ..., // optional
  postalCode: ..., // optional
  timezone: ..., 
  currency: ..., 
  auditId: ..., 
  requestId: ..., 
};

// Call the `updateOrganization()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateOrganization(updateOrganizationVars);
// Variables can be defined inline as well.
const { data } = await updateOrganization({ id: ..., businessName: ..., legalEntityName: ..., taxId: ..., primaryContactName: ..., email: ..., phone: ..., address: ..., city: ..., state: ..., postalCode: ..., timezone: ..., currency: ..., auditId: ..., requestId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateOrganization(dataConnect, updateOrganizationVars);

console.log(data.organization_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
updateOrganization(updateOrganizationVars).then((response) => {
  const data = response.data;
  console.log(data.organization_update);
  console.log(data.auditEvent_insert);
});
```

### Using `UpdateOrganization`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateOrganizationRef, UpdateOrganizationVariables } from '@omniretail/sql-connect';

// The `UpdateOrganization` mutation requires an argument of type `UpdateOrganizationVariables`:
const updateOrganizationVars: UpdateOrganizationVariables = {
  id: ..., 
  businessName: ..., 
  legalEntityName: ..., // optional
  taxId: ..., // optional
  primaryContactName: ..., 
  email: ..., 
  phone: ..., 
  address: ..., // optional
  city: ..., // optional
  state: ..., // optional
  postalCode: ..., // optional
  timezone: ..., 
  currency: ..., 
  auditId: ..., 
  requestId: ..., 
};

// Call the `updateOrganizationRef()` function to get a reference to the mutation.
const ref = updateOrganizationRef(updateOrganizationVars);
// Variables can be defined inline as well.
const ref = updateOrganizationRef({ id: ..., businessName: ..., legalEntityName: ..., taxId: ..., primaryContactName: ..., email: ..., phone: ..., address: ..., city: ..., state: ..., postalCode: ..., timezone: ..., currency: ..., auditId: ..., requestId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateOrganizationRef(dataConnect, updateOrganizationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.organization_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.organization_update);
  console.log(data.auditEvent_insert);
});
```

## ChangeOrganizationStatus
You can execute the `ChangeOrganizationStatus` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
changeOrganizationStatus(vars: ChangeOrganizationStatusVariables): MutationPromise<ChangeOrganizationStatusData, ChangeOrganizationStatusVariables>;

interface ChangeOrganizationStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ChangeOrganizationStatusVariables): MutationRef<ChangeOrganizationStatusData, ChangeOrganizationStatusVariables>;
}
export const changeOrganizationStatusRef: ChangeOrganizationStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
changeOrganizationStatus(dc: DataConnect, vars: ChangeOrganizationStatusVariables): MutationPromise<ChangeOrganizationStatusData, ChangeOrganizationStatusVariables>;

interface ChangeOrganizationStatusRef {
  ...
  (dc: DataConnect, vars: ChangeOrganizationStatusVariables): MutationRef<ChangeOrganizationStatusData, ChangeOrganizationStatusVariables>;
}
export const changeOrganizationStatusRef: ChangeOrganizationStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the changeOrganizationStatusRef:
```typescript
const name = changeOrganizationStatusRef.operationName;
console.log(name);
```

### Variables
The `ChangeOrganizationStatus` mutation requires an argument of type `ChangeOrganizationStatusVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ChangeOrganizationStatusVariables {
  id: UUIDString;
  status: OrganizationStatus;
  action: string;
  auditId: UUIDString;
  requestId: string;
}
```
### Return Type
Recall that executing the `ChangeOrganizationStatus` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ChangeOrganizationStatusData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ChangeOrganizationStatusData {
  organization_update?: Organization_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `ChangeOrganizationStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, changeOrganizationStatus, ChangeOrganizationStatusVariables } from '@omniretail/sql-connect';

// The `ChangeOrganizationStatus` mutation requires an argument of type `ChangeOrganizationStatusVariables`:
const changeOrganizationStatusVars: ChangeOrganizationStatusVariables = {
  id: ..., 
  status: ..., 
  action: ..., 
  auditId: ..., 
  requestId: ..., 
};

// Call the `changeOrganizationStatus()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await changeOrganizationStatus(changeOrganizationStatusVars);
// Variables can be defined inline as well.
const { data } = await changeOrganizationStatus({ id: ..., status: ..., action: ..., auditId: ..., requestId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await changeOrganizationStatus(dataConnect, changeOrganizationStatusVars);

console.log(data.organization_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
changeOrganizationStatus(changeOrganizationStatusVars).then((response) => {
  const data = response.data;
  console.log(data.organization_update);
  console.log(data.auditEvent_insert);
});
```

### Using `ChangeOrganizationStatus`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, changeOrganizationStatusRef, ChangeOrganizationStatusVariables } from '@omniretail/sql-connect';

// The `ChangeOrganizationStatus` mutation requires an argument of type `ChangeOrganizationStatusVariables`:
const changeOrganizationStatusVars: ChangeOrganizationStatusVariables = {
  id: ..., 
  status: ..., 
  action: ..., 
  auditId: ..., 
  requestId: ..., 
};

// Call the `changeOrganizationStatusRef()` function to get a reference to the mutation.
const ref = changeOrganizationStatusRef(changeOrganizationStatusVars);
// Variables can be defined inline as well.
const ref = changeOrganizationStatusRef({ id: ..., status: ..., action: ..., auditId: ..., requestId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = changeOrganizationStatusRef(dataConnect, changeOrganizationStatusVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.organization_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.organization_update);
  console.log(data.auditEvent_insert);
});
```

