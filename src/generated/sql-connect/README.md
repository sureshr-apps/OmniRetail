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
  - [*GetOrganizationAdministratorTrusted*](#getorganizationadministratortrusted)
  - [*ResolveOrganizationAdministratorIdentity*](#resolveorganizationadministratoridentity)
  - [*GetLifecycleIdempotency*](#getlifecycleidempotency)
  - [*GetOrganizationLicense*](#getorganizationlicense)
  - [*GetOrganizationLicenseTrusted*](#getorganizationlicensetrusted)
  - [*GetOrganizationLicenseHistory*](#getorganizationlicensehistory)
  - [*GetOrganizationLicensePublic*](#getorganizationlicensepublic)
  - [*GetOrganizationLicenseHistoryPublic*](#getorganizationlicensehistorypublic)
  - [*ListOrganizationsTrusted*](#listorganizationstrusted)
  - [*ListOrganizationUsersForDeletionTrusted*](#listorganizationusersfordeletiontrusted)
  - [*ListTenantOutlets*](#listtenantoutlets)
  - [*ListTenantEmployees*](#listtenantemployees)
  - [*ListTenantServicePersons*](#listtenantservicepersons)
  - [*ListTenantProducts*](#listtenantproducts)
  - [*ListTenantInventory*](#listtenantinventory)
  - [*ListTenantCustomers*](#listtenantcustomers)
  - [*ListTenantSuppliers*](#listtenantsuppliers)
  - [*ListTenantPurchases*](#listtenantpurchases)
  - [*ListTenantExpenses*](#listtenantexpenses)
  - [*ListTenantSales*](#listtenantsales)
  - [*GetTenantInventoryStockTrusted*](#gettenantinventorystocktrusted)
  - [*GetTenantSupplierTrusted*](#gettenantsuppliertrusted)
  - [*GetTenantCustomerTrusted*](#gettenantcustomertrusted)
  - [*GetTenantProductTrusted*](#gettenantproducttrusted)
  - [*GetTenantMembershipTrusted*](#gettenantmembershiptrusted)
  - [*ResolveTenantEmployeeIdentityTrusted*](#resolvetenantemployeeidentitytrusted)
  - [*GetTenantOutletTrusted*](#gettenantoutlettrusted)
  - [*GetTenantEmployeeTrusted*](#gettenantemployeetrusted)
  - [*GetTenantServicePersonTrusted*](#gettenantservicepersontrusted)
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
  - [*EnsureAppUserRoleTrusted*](#ensureappuserroletrusted)
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
  - [*CreateTenantExpense*](#createtenantexpense)
  - [*UpdateTenantExpense*](#updatetenantexpense)
  - [*ChangeTenantExpenseApproval*](#changetenantexpenseapproval)
  - [*VoidTenantExpense*](#voidtenantexpense)
  - [*CreateTenantSale*](#createtenantsale)
  - [*AddTenantSaleLine*](#addtenantsaleline)
  - [*VoidTenantSale*](#voidtenantsale)
  - [*CreateTenantPurchase*](#createtenantpurchase)
  - [*CreateTenantPurchaseLine*](#createtenantpurchaseline)
  - [*ChangeTenantPurchaseStatus*](#changetenantpurchasestatus)
  - [*ReceiveTenantPurchaseLine*](#receivetenantpurchaseline)
  - [*CreateTenantSupplier*](#createtenantsupplier)
  - [*UpdateTenantSupplier*](#updatetenantsupplier)
  - [*ChangeTenantSupplierStatus*](#changetenantsupplierstatus)
  - [*CreateTenantCustomer*](#createtenantcustomer)
  - [*UpdateTenantCustomer*](#updatetenantcustomer)
  - [*ChangeTenantCustomerStatus*](#changetenantcustomerstatus)
  - [*CreateTenantProduct*](#createtenantproduct)
  - [*UpdateTenantProduct*](#updatetenantproduct)
  - [*ChangeTenantProductStatus*](#changetenantproductstatus)
  - [*AdjustTenantInventory*](#adjusttenantinventory)
  - [*CreateTenantInventoryStock*](#createtenantinventorystock)
  - [*CreateTenantOutlet*](#createtenantoutlet)
  - [*UpdateTenantOutlet*](#updatetenantoutlet)
  - [*ChangeTenantOutletStatus*](#changetenantoutletstatus)
  - [*CreateTenantOutletTrusted*](#createtenantoutlettrusted)
  - [*UpdateTenantOutletTrusted*](#updatetenantoutlettrusted)
  - [*ChangeTenantOutletStatusTrusted*](#changetenantoutletstatustrusted)
  - [*DeleteTenantOutletTrusted*](#deletetenantoutlettrusted)
  - [*DeleteTenantEmployeeTrusted*](#deletetenantemployeetrusted)
  - [*DeleteTenantServicePersonTrusted*](#deletetenantservicepersontrusted)
  - [*DeleteTenantCustomerTrusted*](#deletetenantcustomertrusted)
  - [*DeleteTenantSupplierTrusted*](#deletetenantsuppliertrusted)
  - [*DeleteTenantProductTrusted*](#deletetenantproducttrusted)
  - [*CreateTenantEmployeeProfileTrusted*](#createtenantemployeeprofiletrusted)
  - [*ProvisionTenantEmployeeTrusted*](#provisiontenantemployeetrusted)
  - [*UpdateTenantEmployeeTrusted*](#updatetenantemployeetrusted)
  - [*ChangeTenantEmployeeStatusTrusted*](#changetenantemployeestatustrusted)
  - [*ChangeTenantEmployeeLoginAccessTrusted*](#changetenantemployeeloginaccesstrusted)
  - [*CreateTenantServicePersonTrusted*](#createtenantservicepersontrusted)
  - [*UpdateTenantServicePersonTrusted*](#updatetenantservicepersontrusted)
  - [*ChangeTenantServicePersonStatusTrusted*](#changetenantservicepersonstatustrusted)
  - [*AssignTenantEmployeeOutletTrusted*](#assigntenantemployeeoutlettrusted)
  - [*AssignTenantServicePersonOutletTrusted*](#assigntenantservicepersonoutlettrusted)

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
    organizationMemberships_on_user: ({
      organization: {
        id: UUIDString;
      } & Organization_Key;
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
      status: MembershipStatus;
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
    organizationMemberships_on_user: ({
      organization: {
        id: UUIDString;
      } & Organization_Key;
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
      status: MembershipStatus;
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

## GetOrganizationAdministratorTrusted
You can execute the `GetOrganizationAdministratorTrusted` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
getOrganizationAdministratorTrusted(vars: GetOrganizationAdministratorTrustedVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganizationAdministratorTrustedData, GetOrganizationAdministratorTrustedVariables>;

interface GetOrganizationAdministratorTrustedRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOrganizationAdministratorTrustedVariables): QueryRef<GetOrganizationAdministratorTrustedData, GetOrganizationAdministratorTrustedVariables>;
}
export const getOrganizationAdministratorTrustedRef: GetOrganizationAdministratorTrustedRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getOrganizationAdministratorTrusted(dc: DataConnect, vars: GetOrganizationAdministratorTrustedVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganizationAdministratorTrustedData, GetOrganizationAdministratorTrustedVariables>;

interface GetOrganizationAdministratorTrustedRef {
  ...
  (dc: DataConnect, vars: GetOrganizationAdministratorTrustedVariables): QueryRef<GetOrganizationAdministratorTrustedData, GetOrganizationAdministratorTrustedVariables>;
}
export const getOrganizationAdministratorTrustedRef: GetOrganizationAdministratorTrustedRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getOrganizationAdministratorTrustedRef:
```typescript
const name = getOrganizationAdministratorTrustedRef.operationName;
console.log(name);
```

### Variables
The `GetOrganizationAdministratorTrusted` query requires an argument of type `GetOrganizationAdministratorTrustedVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetOrganizationAdministratorTrustedVariables {
  organizationId: UUIDString;
  userId: UUIDString;
}
```
### Return Type
Recall that executing the `GetOrganizationAdministratorTrusted` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetOrganizationAdministratorTrustedData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetOrganizationAdministratorTrustedData {
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
### Using `GetOrganizationAdministratorTrusted`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getOrganizationAdministratorTrusted, GetOrganizationAdministratorTrustedVariables } from '@omniretail/sql-connect';

// The `GetOrganizationAdministratorTrusted` query requires an argument of type `GetOrganizationAdministratorTrustedVariables`:
const getOrganizationAdministratorTrustedVars: GetOrganizationAdministratorTrustedVariables = {
  organizationId: ..., 
  userId: ..., 
};

// Call the `getOrganizationAdministratorTrusted()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getOrganizationAdministratorTrusted(getOrganizationAdministratorTrustedVars);
// Variables can be defined inline as well.
const { data } = await getOrganizationAdministratorTrusted({ organizationId: ..., userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getOrganizationAdministratorTrusted(dataConnect, getOrganizationAdministratorTrustedVars);

console.log(data.organizationMemberships);

// Or, you can use the `Promise` API.
getOrganizationAdministratorTrusted(getOrganizationAdministratorTrustedVars).then((response) => {
  const data = response.data;
  console.log(data.organizationMemberships);
});
```

### Using `GetOrganizationAdministratorTrusted`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getOrganizationAdministratorTrustedRef, GetOrganizationAdministratorTrustedVariables } from '@omniretail/sql-connect';

// The `GetOrganizationAdministratorTrusted` query requires an argument of type `GetOrganizationAdministratorTrustedVariables`:
const getOrganizationAdministratorTrustedVars: GetOrganizationAdministratorTrustedVariables = {
  organizationId: ..., 
  userId: ..., 
};

// Call the `getOrganizationAdministratorTrustedRef()` function to get a reference to the query.
const ref = getOrganizationAdministratorTrustedRef(getOrganizationAdministratorTrustedVars);
// Variables can be defined inline as well.
const ref = getOrganizationAdministratorTrustedRef({ organizationId: ..., userId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getOrganizationAdministratorTrustedRef(dataConnect, getOrganizationAdministratorTrustedVars);

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

## ListTenantOutlets
You can execute the `ListTenantOutlets` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
listTenantOutlets(vars: ListTenantOutletsVariables, options?: ExecuteQueryOptions): QueryPromise<ListTenantOutletsData, ListTenantOutletsVariables>;

interface ListTenantOutletsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListTenantOutletsVariables): QueryRef<ListTenantOutletsData, ListTenantOutletsVariables>;
}
export const listTenantOutletsRef: ListTenantOutletsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listTenantOutlets(dc: DataConnect, vars: ListTenantOutletsVariables, options?: ExecuteQueryOptions): QueryPromise<ListTenantOutletsData, ListTenantOutletsVariables>;

interface ListTenantOutletsRef {
  ...
  (dc: DataConnect, vars: ListTenantOutletsVariables): QueryRef<ListTenantOutletsData, ListTenantOutletsVariables>;
}
export const listTenantOutletsRef: ListTenantOutletsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listTenantOutletsRef:
```typescript
const name = listTenantOutletsRef.operationName;
console.log(name);
```

### Variables
The `ListTenantOutlets` query requires an argument of type `ListTenantOutletsVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListTenantOutletsVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that executing the `ListTenantOutlets` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListTenantOutletsData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListTenantOutletsData {
  organizationMemberships: ({
    organization: {
      id: UUIDString;
    } & Organization_Key;
    role: {
      code: string;
      rolePermissions_on_role: ({
        permission: {
          code: string;
        };
      })[];
    };
  })[];
  outlets: ({
    id: UUIDString;
    organization: {
      id: UUIDString;
    } & Organization_Key;
    outletCode: number;
    name: string;
    contactPerson: string;
    email?: string | null;
    phone: string;
    address: string;
    status: OutletStatus;
  } & Outlet_Key)[];
}
```
### Using `ListTenantOutlets`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listTenantOutlets, ListTenantOutletsVariables } from '@omniretail/sql-connect';

// The `ListTenantOutlets` query requires an argument of type `ListTenantOutletsVariables`:
const listTenantOutletsVars: ListTenantOutletsVariables = {
  organizationId: ..., 
};

// Call the `listTenantOutlets()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listTenantOutlets(listTenantOutletsVars);
// Variables can be defined inline as well.
const { data } = await listTenantOutlets({ organizationId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listTenantOutlets(dataConnect, listTenantOutletsVars);

console.log(data.organizationMemberships);
console.log(data.outlets);

// Or, you can use the `Promise` API.
listTenantOutlets(listTenantOutletsVars).then((response) => {
  const data = response.data;
  console.log(data.organizationMemberships);
  console.log(data.outlets);
});
```

### Using `ListTenantOutlets`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listTenantOutletsRef, ListTenantOutletsVariables } from '@omniretail/sql-connect';

// The `ListTenantOutlets` query requires an argument of type `ListTenantOutletsVariables`:
const listTenantOutletsVars: ListTenantOutletsVariables = {
  organizationId: ..., 
};

// Call the `listTenantOutletsRef()` function to get a reference to the query.
const ref = listTenantOutletsRef(listTenantOutletsVars);
// Variables can be defined inline as well.
const ref = listTenantOutletsRef({ organizationId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listTenantOutletsRef(dataConnect, listTenantOutletsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.organizationMemberships);
console.log(data.outlets);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.organizationMemberships);
  console.log(data.outlets);
});
```

## ListTenantEmployees
You can execute the `ListTenantEmployees` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
listTenantEmployees(vars: ListTenantEmployeesVariables, options?: ExecuteQueryOptions): QueryPromise<ListTenantEmployeesData, ListTenantEmployeesVariables>;

interface ListTenantEmployeesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListTenantEmployeesVariables): QueryRef<ListTenantEmployeesData, ListTenantEmployeesVariables>;
}
export const listTenantEmployeesRef: ListTenantEmployeesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listTenantEmployees(dc: DataConnect, vars: ListTenantEmployeesVariables, options?: ExecuteQueryOptions): QueryPromise<ListTenantEmployeesData, ListTenantEmployeesVariables>;

interface ListTenantEmployeesRef {
  ...
  (dc: DataConnect, vars: ListTenantEmployeesVariables): QueryRef<ListTenantEmployeesData, ListTenantEmployeesVariables>;
}
export const listTenantEmployeesRef: ListTenantEmployeesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listTenantEmployeesRef:
```typescript
const name = listTenantEmployeesRef.operationName;
console.log(name);
```

### Variables
The `ListTenantEmployees` query requires an argument of type `ListTenantEmployeesVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListTenantEmployeesVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that executing the `ListTenantEmployees` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListTenantEmployeesData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListTenantEmployeesData {
  organizationMemberships: ({
    organization: {
      id: UUIDString;
    } & Organization_Key;
    role: {
      code: string;
      rolePermissions_on_role: ({
        permission: {
          code: string;
        };
      })[];
    };
  })[];
  employees: ({
    id: UUIDString;
    organization: {
      id: UUIDString;
    } & Organization_Key;
    user?: {
      id: UUIDString;
      username: string;
      email: string;
    } & AppUser_Key;
    employeeCode: number;
    fullName: string;
    email?: string | null;
    phone: string;
    designation: string;
    department?: string | null;
    dateOfJoining: DateString;
    assignmentScope: string;
    employmentStatus: EmploymentStatus;
    loginAccess: LoginAccessStatus;
    createdAt: TimestampString;
    updatedAt: TimestampString;
    employeeOutlets_on_employee: ({
      outlet: {
        id: UUIDString;
        outletCode: number;
        name: string;
      } & Outlet_Key;
    })[];
  } & Employee_Key)[];
}
```
### Using `ListTenantEmployees`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listTenantEmployees, ListTenantEmployeesVariables } from '@omniretail/sql-connect';

// The `ListTenantEmployees` query requires an argument of type `ListTenantEmployeesVariables`:
const listTenantEmployeesVars: ListTenantEmployeesVariables = {
  organizationId: ..., 
};

// Call the `listTenantEmployees()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listTenantEmployees(listTenantEmployeesVars);
// Variables can be defined inline as well.
const { data } = await listTenantEmployees({ organizationId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listTenantEmployees(dataConnect, listTenantEmployeesVars);

console.log(data.organizationMemberships);
console.log(data.employees);

// Or, you can use the `Promise` API.
listTenantEmployees(listTenantEmployeesVars).then((response) => {
  const data = response.data;
  console.log(data.organizationMemberships);
  console.log(data.employees);
});
```

### Using `ListTenantEmployees`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listTenantEmployeesRef, ListTenantEmployeesVariables } from '@omniretail/sql-connect';

// The `ListTenantEmployees` query requires an argument of type `ListTenantEmployeesVariables`:
const listTenantEmployeesVars: ListTenantEmployeesVariables = {
  organizationId: ..., 
};

// Call the `listTenantEmployeesRef()` function to get a reference to the query.
const ref = listTenantEmployeesRef(listTenantEmployeesVars);
// Variables can be defined inline as well.
const ref = listTenantEmployeesRef({ organizationId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listTenantEmployeesRef(dataConnect, listTenantEmployeesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.organizationMemberships);
console.log(data.employees);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.organizationMemberships);
  console.log(data.employees);
});
```

## ListTenantServicePersons
You can execute the `ListTenantServicePersons` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
listTenantServicePersons(vars: ListTenantServicePersonsVariables, options?: ExecuteQueryOptions): QueryPromise<ListTenantServicePersonsData, ListTenantServicePersonsVariables>;

interface ListTenantServicePersonsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListTenantServicePersonsVariables): QueryRef<ListTenantServicePersonsData, ListTenantServicePersonsVariables>;
}
export const listTenantServicePersonsRef: ListTenantServicePersonsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listTenantServicePersons(dc: DataConnect, vars: ListTenantServicePersonsVariables, options?: ExecuteQueryOptions): QueryPromise<ListTenantServicePersonsData, ListTenantServicePersonsVariables>;

interface ListTenantServicePersonsRef {
  ...
  (dc: DataConnect, vars: ListTenantServicePersonsVariables): QueryRef<ListTenantServicePersonsData, ListTenantServicePersonsVariables>;
}
export const listTenantServicePersonsRef: ListTenantServicePersonsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listTenantServicePersonsRef:
```typescript
const name = listTenantServicePersonsRef.operationName;
console.log(name);
```

### Variables
The `ListTenantServicePersons` query requires an argument of type `ListTenantServicePersonsVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListTenantServicePersonsVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that executing the `ListTenantServicePersons` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListTenantServicePersonsData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListTenantServicePersonsData {
  organizationMemberships: ({
    organization: {
      id: UUIDString;
    } & Organization_Key;
    role: {
      code: string;
      rolePermissions_on_role: ({
        permission: {
          code: string;
        };
      })[];
    };
  })[];
  servicePeople: ({
    id: UUIDString;
    organization: {
      id: UUIDString;
    } & Organization_Key;
    servicePersonCode: number;
    fullName: string;
    email?: string | null;
    phone: string;
    specialization: string;
    skills?: string | null;
    yearsOfExperience?: number | null;
    assignmentScope: string;
    status: EmploymentStatus;
    createdAt: TimestampString;
    updatedAt: TimestampString;
    servicePersonOutlets_on_servicePerson: ({
      outlet: {
        id: UUIDString;
        outletCode: number;
        name: string;
      } & Outlet_Key;
    })[];
  } & ServicePerson_Key)[];
}
```
### Using `ListTenantServicePersons`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listTenantServicePersons, ListTenantServicePersonsVariables } from '@omniretail/sql-connect';

// The `ListTenantServicePersons` query requires an argument of type `ListTenantServicePersonsVariables`:
const listTenantServicePersonsVars: ListTenantServicePersonsVariables = {
  organizationId: ..., 
};

// Call the `listTenantServicePersons()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listTenantServicePersons(listTenantServicePersonsVars);
// Variables can be defined inline as well.
const { data } = await listTenantServicePersons({ organizationId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listTenantServicePersons(dataConnect, listTenantServicePersonsVars);

console.log(data.organizationMemberships);
console.log(data.servicePeople);

// Or, you can use the `Promise` API.
listTenantServicePersons(listTenantServicePersonsVars).then((response) => {
  const data = response.data;
  console.log(data.organizationMemberships);
  console.log(data.servicePeople);
});
```

### Using `ListTenantServicePersons`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listTenantServicePersonsRef, ListTenantServicePersonsVariables } from '@omniretail/sql-connect';

// The `ListTenantServicePersons` query requires an argument of type `ListTenantServicePersonsVariables`:
const listTenantServicePersonsVars: ListTenantServicePersonsVariables = {
  organizationId: ..., 
};

// Call the `listTenantServicePersonsRef()` function to get a reference to the query.
const ref = listTenantServicePersonsRef(listTenantServicePersonsVars);
// Variables can be defined inline as well.
const ref = listTenantServicePersonsRef({ organizationId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listTenantServicePersonsRef(dataConnect, listTenantServicePersonsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.organizationMemberships);
console.log(data.servicePeople);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.organizationMemberships);
  console.log(data.servicePeople);
});
```

## ListTenantProducts
You can execute the `ListTenantProducts` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
listTenantProducts(vars: ListTenantProductsVariables, options?: ExecuteQueryOptions): QueryPromise<ListTenantProductsData, ListTenantProductsVariables>;

interface ListTenantProductsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListTenantProductsVariables): QueryRef<ListTenantProductsData, ListTenantProductsVariables>;
}
export const listTenantProductsRef: ListTenantProductsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listTenantProducts(dc: DataConnect, vars: ListTenantProductsVariables, options?: ExecuteQueryOptions): QueryPromise<ListTenantProductsData, ListTenantProductsVariables>;

interface ListTenantProductsRef {
  ...
  (dc: DataConnect, vars: ListTenantProductsVariables): QueryRef<ListTenantProductsData, ListTenantProductsVariables>;
}
export const listTenantProductsRef: ListTenantProductsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listTenantProductsRef:
```typescript
const name = listTenantProductsRef.operationName;
console.log(name);
```

### Variables
The `ListTenantProducts` query requires an argument of type `ListTenantProductsVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListTenantProductsVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that executing the `ListTenantProducts` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListTenantProductsData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListTenantProductsData {
  organizationMemberships: ({
    role: {
      code: string;
      rolePermissions_on_role: ({
        permission: {
          code: string;
        };
      })[];
    };
  })[];
  products: ({
    id: UUIDString;
    organization: {
      id: UUIDString;
    } & Organization_Key;
    productCode: number;
    name: string;
    brand: string;
    categoryId: string;
    categoryName: string;
    subcategory?: string | null;
    type: ProductType;
    sku: string;
    barcode?: string | null;
    hsnCode?: string | null;
    unitOfMeasure?: string | null;
    sellingPrice: number;
    mrp?: number | null;
    cost?: number | null;
    minSellingPrice?: number | null;
    discountAllowed: boolean;
    taxCategory?: string | null;
    status: ProductStatus;
    reorderLevel?: number | null;
    reorderQuantity?: number | null;
    primarySupplier?: string | null;
    supplierProductCode?: string | null;
    description?: string | null;
    imageUrl?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & Product_Key)[];
}
```
### Using `ListTenantProducts`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listTenantProducts, ListTenantProductsVariables } from '@omniretail/sql-connect';

// The `ListTenantProducts` query requires an argument of type `ListTenantProductsVariables`:
const listTenantProductsVars: ListTenantProductsVariables = {
  organizationId: ..., 
};

// Call the `listTenantProducts()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listTenantProducts(listTenantProductsVars);
// Variables can be defined inline as well.
const { data } = await listTenantProducts({ organizationId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listTenantProducts(dataConnect, listTenantProductsVars);

console.log(data.organizationMemberships);
console.log(data.products);

// Or, you can use the `Promise` API.
listTenantProducts(listTenantProductsVars).then((response) => {
  const data = response.data;
  console.log(data.organizationMemberships);
  console.log(data.products);
});
```

### Using `ListTenantProducts`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listTenantProductsRef, ListTenantProductsVariables } from '@omniretail/sql-connect';

// The `ListTenantProducts` query requires an argument of type `ListTenantProductsVariables`:
const listTenantProductsVars: ListTenantProductsVariables = {
  organizationId: ..., 
};

// Call the `listTenantProductsRef()` function to get a reference to the query.
const ref = listTenantProductsRef(listTenantProductsVars);
// Variables can be defined inline as well.
const ref = listTenantProductsRef({ organizationId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listTenantProductsRef(dataConnect, listTenantProductsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.organizationMemberships);
console.log(data.products);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.organizationMemberships);
  console.log(data.products);
});
```

## ListTenantInventory
You can execute the `ListTenantInventory` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
listTenantInventory(vars: ListTenantInventoryVariables, options?: ExecuteQueryOptions): QueryPromise<ListTenantInventoryData, ListTenantInventoryVariables>;

interface ListTenantInventoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListTenantInventoryVariables): QueryRef<ListTenantInventoryData, ListTenantInventoryVariables>;
}
export const listTenantInventoryRef: ListTenantInventoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listTenantInventory(dc: DataConnect, vars: ListTenantInventoryVariables, options?: ExecuteQueryOptions): QueryPromise<ListTenantInventoryData, ListTenantInventoryVariables>;

interface ListTenantInventoryRef {
  ...
  (dc: DataConnect, vars: ListTenantInventoryVariables): QueryRef<ListTenantInventoryData, ListTenantInventoryVariables>;
}
export const listTenantInventoryRef: ListTenantInventoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listTenantInventoryRef:
```typescript
const name = listTenantInventoryRef.operationName;
console.log(name);
```

### Variables
The `ListTenantInventory` query requires an argument of type `ListTenantInventoryVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListTenantInventoryVariables {
  organizationId: UUIDString;
  outletId?: UUIDString | null;
}
```
### Return Type
Recall that executing the `ListTenantInventory` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListTenantInventoryData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListTenantInventoryData {
  organizationMemberships: ({
    role: {
      code: string;
      rolePermissions_on_role: ({
        permission: {
          code: string;
        };
      })[];
    };
  })[];
  inventoryStocks: ({
    _id: {
    };
    organization: {
      id: UUIDString;
    } & Organization_Key;
    outlet: {
      id: UUIDString;
      outletCode: number;
      name: string;
    } & Outlet_Key;
    product: {
      id: UUIDString;
      productCode: number;
      name: string;
      sku: string;
      barcode?: string | null;
      categoryName: string;
      brand: string;
      primarySupplier?: string | null;
      sellingPrice: number;
      cost?: number | null;
    } & Product_Key;
    binRack?: string | null;
    onHandQty: number;
    reorderLevel: number;
    overstockThreshold: number;
    incomingPurchaseOrder?: string | null;
    updatedAt: TimestampString;
  })[];
}
```
### Using `ListTenantInventory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listTenantInventory, ListTenantInventoryVariables } from '@omniretail/sql-connect';

// The `ListTenantInventory` query requires an argument of type `ListTenantInventoryVariables`:
const listTenantInventoryVars: ListTenantInventoryVariables = {
  organizationId: ..., 
  outletId: ..., // optional
};

// Call the `listTenantInventory()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listTenantInventory(listTenantInventoryVars);
// Variables can be defined inline as well.
const { data } = await listTenantInventory({ organizationId: ..., outletId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listTenantInventory(dataConnect, listTenantInventoryVars);

console.log(data.organizationMemberships);
console.log(data.inventoryStocks);

// Or, you can use the `Promise` API.
listTenantInventory(listTenantInventoryVars).then((response) => {
  const data = response.data;
  console.log(data.organizationMemberships);
  console.log(data.inventoryStocks);
});
```

### Using `ListTenantInventory`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listTenantInventoryRef, ListTenantInventoryVariables } from '@omniretail/sql-connect';

// The `ListTenantInventory` query requires an argument of type `ListTenantInventoryVariables`:
const listTenantInventoryVars: ListTenantInventoryVariables = {
  organizationId: ..., 
  outletId: ..., // optional
};

// Call the `listTenantInventoryRef()` function to get a reference to the query.
const ref = listTenantInventoryRef(listTenantInventoryVars);
// Variables can be defined inline as well.
const ref = listTenantInventoryRef({ organizationId: ..., outletId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listTenantInventoryRef(dataConnect, listTenantInventoryVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.organizationMemberships);
console.log(data.inventoryStocks);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.organizationMemberships);
  console.log(data.inventoryStocks);
});
```

## ListTenantCustomers
You can execute the `ListTenantCustomers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
listTenantCustomers(vars: ListTenantCustomersVariables, options?: ExecuteQueryOptions): QueryPromise<ListTenantCustomersData, ListTenantCustomersVariables>;

interface ListTenantCustomersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListTenantCustomersVariables): QueryRef<ListTenantCustomersData, ListTenantCustomersVariables>;
}
export const listTenantCustomersRef: ListTenantCustomersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listTenantCustomers(dc: DataConnect, vars: ListTenantCustomersVariables, options?: ExecuteQueryOptions): QueryPromise<ListTenantCustomersData, ListTenantCustomersVariables>;

interface ListTenantCustomersRef {
  ...
  (dc: DataConnect, vars: ListTenantCustomersVariables): QueryRef<ListTenantCustomersData, ListTenantCustomersVariables>;
}
export const listTenantCustomersRef: ListTenantCustomersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listTenantCustomersRef:
```typescript
const name = listTenantCustomersRef.operationName;
console.log(name);
```

### Variables
The `ListTenantCustomers` query requires an argument of type `ListTenantCustomersVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListTenantCustomersVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that executing the `ListTenantCustomers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListTenantCustomersData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListTenantCustomersData {
  organizationMemberships: ({
    role: {
      code: string;
      rolePermissions_on_role: ({
        permission: {
          code: string;
        };
      })[];
    };
  })[];
  customers: ({
    id: UUIDString;
    organization: {
      id: UUIDString;
    } & Organization_Key;
    customerCode: number;
    type: CustomerType;
    name: string;
    phone: string;
    email: string;
    taxId?: string | null;
    address?: string | null;
    city: string;
    state: string;
    postalCode?: string | null;
    country?: string | null;
    creditLimit?: number | null;
    preferredContact?: string | null;
    dateOfBirth?: DateString | null;
    gender?: string | null;
    status: CustomerStatus;
    notes?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & Customer_Key)[];
}
```
### Using `ListTenantCustomers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listTenantCustomers, ListTenantCustomersVariables } from '@omniretail/sql-connect';

// The `ListTenantCustomers` query requires an argument of type `ListTenantCustomersVariables`:
const listTenantCustomersVars: ListTenantCustomersVariables = {
  organizationId: ..., 
};

// Call the `listTenantCustomers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listTenantCustomers(listTenantCustomersVars);
// Variables can be defined inline as well.
const { data } = await listTenantCustomers({ organizationId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listTenantCustomers(dataConnect, listTenantCustomersVars);

console.log(data.organizationMemberships);
console.log(data.customers);

// Or, you can use the `Promise` API.
listTenantCustomers(listTenantCustomersVars).then((response) => {
  const data = response.data;
  console.log(data.organizationMemberships);
  console.log(data.customers);
});
```

### Using `ListTenantCustomers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listTenantCustomersRef, ListTenantCustomersVariables } from '@omniretail/sql-connect';

// The `ListTenantCustomers` query requires an argument of type `ListTenantCustomersVariables`:
const listTenantCustomersVars: ListTenantCustomersVariables = {
  organizationId: ..., 
};

// Call the `listTenantCustomersRef()` function to get a reference to the query.
const ref = listTenantCustomersRef(listTenantCustomersVars);
// Variables can be defined inline as well.
const ref = listTenantCustomersRef({ organizationId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listTenantCustomersRef(dataConnect, listTenantCustomersVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.organizationMemberships);
console.log(data.customers);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.organizationMemberships);
  console.log(data.customers);
});
```

## ListTenantSuppliers
You can execute the `ListTenantSuppliers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
listTenantSuppliers(vars: ListTenantSuppliersVariables, options?: ExecuteQueryOptions): QueryPromise<ListTenantSuppliersData, ListTenantSuppliersVariables>;

interface ListTenantSuppliersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListTenantSuppliersVariables): QueryRef<ListTenantSuppliersData, ListTenantSuppliersVariables>;
}
export const listTenantSuppliersRef: ListTenantSuppliersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listTenantSuppliers(dc: DataConnect, vars: ListTenantSuppliersVariables, options?: ExecuteQueryOptions): QueryPromise<ListTenantSuppliersData, ListTenantSuppliersVariables>;

interface ListTenantSuppliersRef {
  ...
  (dc: DataConnect, vars: ListTenantSuppliersVariables): QueryRef<ListTenantSuppliersData, ListTenantSuppliersVariables>;
}
export const listTenantSuppliersRef: ListTenantSuppliersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listTenantSuppliersRef:
```typescript
const name = listTenantSuppliersRef.operationName;
console.log(name);
```

### Variables
The `ListTenantSuppliers` query requires an argument of type `ListTenantSuppliersVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListTenantSuppliersVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that executing the `ListTenantSuppliers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListTenantSuppliersData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListTenantSuppliersData {
  organizationMemberships: ({
    role: {
      code: string;
      rolePermissions_on_role: ({
        permission: {
          code: string;
        };
      })[];
    };
  })[];
  suppliers: ({
    id: UUIDString;
    organization: {
      id: UUIDString;
    } & Organization_Key;
    supplierCode: number;
    name: string;
    contactPerson: string;
    phone: string;
    email: string;
    taxId: string;
    address?: string | null;
    city: string;
    state?: string | null;
    postalCode?: string | null;
    country?: string | null;
    category: string;
    paymentTerms: string;
    creditLimit: number;
    status: SupplierStatus;
    notes?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & Supplier_Key)[];
}
```
### Using `ListTenantSuppliers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listTenantSuppliers, ListTenantSuppliersVariables } from '@omniretail/sql-connect';

// The `ListTenantSuppliers` query requires an argument of type `ListTenantSuppliersVariables`:
const listTenantSuppliersVars: ListTenantSuppliersVariables = {
  organizationId: ..., 
};

// Call the `listTenantSuppliers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listTenantSuppliers(listTenantSuppliersVars);
// Variables can be defined inline as well.
const { data } = await listTenantSuppliers({ organizationId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listTenantSuppliers(dataConnect, listTenantSuppliersVars);

console.log(data.organizationMemberships);
console.log(data.suppliers);

// Or, you can use the `Promise` API.
listTenantSuppliers(listTenantSuppliersVars).then((response) => {
  const data = response.data;
  console.log(data.organizationMemberships);
  console.log(data.suppliers);
});
```

### Using `ListTenantSuppliers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listTenantSuppliersRef, ListTenantSuppliersVariables } from '@omniretail/sql-connect';

// The `ListTenantSuppliers` query requires an argument of type `ListTenantSuppliersVariables`:
const listTenantSuppliersVars: ListTenantSuppliersVariables = {
  organizationId: ..., 
};

// Call the `listTenantSuppliersRef()` function to get a reference to the query.
const ref = listTenantSuppliersRef(listTenantSuppliersVars);
// Variables can be defined inline as well.
const ref = listTenantSuppliersRef({ organizationId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listTenantSuppliersRef(dataConnect, listTenantSuppliersVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.organizationMemberships);
console.log(data.suppliers);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.organizationMemberships);
  console.log(data.suppliers);
});
```

## ListTenantPurchases
You can execute the `ListTenantPurchases` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
listTenantPurchases(vars: ListTenantPurchasesVariables, options?: ExecuteQueryOptions): QueryPromise<ListTenantPurchasesData, ListTenantPurchasesVariables>;

interface ListTenantPurchasesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListTenantPurchasesVariables): QueryRef<ListTenantPurchasesData, ListTenantPurchasesVariables>;
}
export const listTenantPurchasesRef: ListTenantPurchasesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listTenantPurchases(dc: DataConnect, vars: ListTenantPurchasesVariables, options?: ExecuteQueryOptions): QueryPromise<ListTenantPurchasesData, ListTenantPurchasesVariables>;

interface ListTenantPurchasesRef {
  ...
  (dc: DataConnect, vars: ListTenantPurchasesVariables): QueryRef<ListTenantPurchasesData, ListTenantPurchasesVariables>;
}
export const listTenantPurchasesRef: ListTenantPurchasesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listTenantPurchasesRef:
```typescript
const name = listTenantPurchasesRef.operationName;
console.log(name);
```

### Variables
The `ListTenantPurchases` query requires an argument of type `ListTenantPurchasesVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListTenantPurchasesVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that executing the `ListTenantPurchases` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListTenantPurchasesData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListTenantPurchasesData {
  organizationMemberships: ({
    role: {
      code: string;
      rolePermissions_on_role: ({
        permission: {
          code: string;
        };
      })[];
    };
  })[];
  purchases: ({
    id: UUIDString;
    organization: {
      id: UUIDString;
    } & Organization_Key;
    purchaseNumber: string;
    purchaseOrderNumber?: string | null;
    invoiceNumber?: string | null;
    purchaseDate: DateString;
    supplier: {
      id: UUIDString;
      supplierCode: number;
      name: string;
      taxId: string;
    } & Supplier_Key;
    outlet?: {
      id: UUIDString;
      outletCode: number;
      name: string;
    } & Outlet_Key;
    scope: string;
    paymentTerms?: string | null;
    subtotal: number;
    shippingFee: number;
    handlingFee: number;
    tax: number;
    totalAmount: number;
    amountPaid: number;
    outstandingAmount: number;
    paymentStatus: PurchasePaymentStatus;
    receiptStatus: PurchaseReceiptStatus;
    status: PurchaseStatus;
    receivingNotes?: string | null;
    batchNumber?: string | null;
    mfgDate?: DateString | null;
    expiryDate?: DateString | null;
    createdBy: string;
    createdAt: TimestampString;
    updatedAt: TimestampString;
    purchaseLines_on_purchase: ({
      id: UUIDString;
      product: {
        id: UUIDString;
        productCode: number;
        name: string;
        sku: string;
      } & Product_Key;
      quantityOrdered: number;
      quantityReceived: number;
      unitCost: number;
      discountPercent: number;
      taxRate: number;
      taxAmount: number;
      lineTotal: number;
    } & PurchaseLine_Key)[];
  } & Purchase_Key)[];
}
```
### Using `ListTenantPurchases`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listTenantPurchases, ListTenantPurchasesVariables } from '@omniretail/sql-connect';

// The `ListTenantPurchases` query requires an argument of type `ListTenantPurchasesVariables`:
const listTenantPurchasesVars: ListTenantPurchasesVariables = {
  organizationId: ..., 
};

// Call the `listTenantPurchases()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listTenantPurchases(listTenantPurchasesVars);
// Variables can be defined inline as well.
const { data } = await listTenantPurchases({ organizationId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listTenantPurchases(dataConnect, listTenantPurchasesVars);

console.log(data.organizationMemberships);
console.log(data.purchases);

// Or, you can use the `Promise` API.
listTenantPurchases(listTenantPurchasesVars).then((response) => {
  const data = response.data;
  console.log(data.organizationMemberships);
  console.log(data.purchases);
});
```

### Using `ListTenantPurchases`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listTenantPurchasesRef, ListTenantPurchasesVariables } from '@omniretail/sql-connect';

// The `ListTenantPurchases` query requires an argument of type `ListTenantPurchasesVariables`:
const listTenantPurchasesVars: ListTenantPurchasesVariables = {
  organizationId: ..., 
};

// Call the `listTenantPurchasesRef()` function to get a reference to the query.
const ref = listTenantPurchasesRef(listTenantPurchasesVars);
// Variables can be defined inline as well.
const ref = listTenantPurchasesRef({ organizationId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listTenantPurchasesRef(dataConnect, listTenantPurchasesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.organizationMemberships);
console.log(data.purchases);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.organizationMemberships);
  console.log(data.purchases);
});
```

## ListTenantExpenses
You can execute the `ListTenantExpenses` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
listTenantExpenses(vars: ListTenantExpensesVariables, options?: ExecuteQueryOptions): QueryPromise<ListTenantExpensesData, ListTenantExpensesVariables>;

interface ListTenantExpensesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListTenantExpensesVariables): QueryRef<ListTenantExpensesData, ListTenantExpensesVariables>;
}
export const listTenantExpensesRef: ListTenantExpensesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listTenantExpenses(dc: DataConnect, vars: ListTenantExpensesVariables, options?: ExecuteQueryOptions): QueryPromise<ListTenantExpensesData, ListTenantExpensesVariables>;

interface ListTenantExpensesRef {
  ...
  (dc: DataConnect, vars: ListTenantExpensesVariables): QueryRef<ListTenantExpensesData, ListTenantExpensesVariables>;
}
export const listTenantExpensesRef: ListTenantExpensesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listTenantExpensesRef:
```typescript
const name = listTenantExpensesRef.operationName;
console.log(name);
```

### Variables
The `ListTenantExpenses` query requires an argument of type `ListTenantExpensesVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListTenantExpensesVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that executing the `ListTenantExpenses` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListTenantExpensesData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListTenantExpensesData {
  organizationMemberships: ({
    role: {
      code: string;
      rolePermissions_on_role: ({
        permission: {
          code: string;
        };
      })[];
    };
  })[];
  expenses: ({
    id: UUIDString;
    organization: {
      id: UUIDString;
    } & Organization_Key;
    expenseNumber: string;
    expenseDate: DateString;
    category: string;
    description: string;
    reference?: string | null;
    vendorName?: string | null;
    outlet?: {
      id: UUIDString;
      outletCode: number;
      name: string;
    } & Outlet_Key;
    scope: string;
    baseAmount: number;
    taxAmount: number;
    amount: number;
    paymentMethod: string;
    paidByEmployee: string;
    settlementDate?: DateString | null;
    status: ExpenseStatus;
    approvalStatus: ExpenseApprovalStatus;
    submittedBy: string;
    notes?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & Expense_Key)[];
}
```
### Using `ListTenantExpenses`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listTenantExpenses, ListTenantExpensesVariables } from '@omniretail/sql-connect';

// The `ListTenantExpenses` query requires an argument of type `ListTenantExpensesVariables`:
const listTenantExpensesVars: ListTenantExpensesVariables = {
  organizationId: ..., 
};

// Call the `listTenantExpenses()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listTenantExpenses(listTenantExpensesVars);
// Variables can be defined inline as well.
const { data } = await listTenantExpenses({ organizationId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listTenantExpenses(dataConnect, listTenantExpensesVars);

console.log(data.organizationMemberships);
console.log(data.expenses);

// Or, you can use the `Promise` API.
listTenantExpenses(listTenantExpensesVars).then((response) => {
  const data = response.data;
  console.log(data.organizationMemberships);
  console.log(data.expenses);
});
```

### Using `ListTenantExpenses`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listTenantExpensesRef, ListTenantExpensesVariables } from '@omniretail/sql-connect';

// The `ListTenantExpenses` query requires an argument of type `ListTenantExpensesVariables`:
const listTenantExpensesVars: ListTenantExpensesVariables = {
  organizationId: ..., 
};

// Call the `listTenantExpensesRef()` function to get a reference to the query.
const ref = listTenantExpensesRef(listTenantExpensesVars);
// Variables can be defined inline as well.
const ref = listTenantExpensesRef({ organizationId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listTenantExpensesRef(dataConnect, listTenantExpensesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.organizationMemberships);
console.log(data.expenses);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.organizationMemberships);
  console.log(data.expenses);
});
```

## ListTenantSales
You can execute the `ListTenantSales` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
listTenantSales(vars: ListTenantSalesVariables, options?: ExecuteQueryOptions): QueryPromise<ListTenantSalesData, ListTenantSalesVariables>;

interface ListTenantSalesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListTenantSalesVariables): QueryRef<ListTenantSalesData, ListTenantSalesVariables>;
}
export const listTenantSalesRef: ListTenantSalesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listTenantSales(dc: DataConnect, vars: ListTenantSalesVariables, options?: ExecuteQueryOptions): QueryPromise<ListTenantSalesData, ListTenantSalesVariables>;

interface ListTenantSalesRef {
  ...
  (dc: DataConnect, vars: ListTenantSalesVariables): QueryRef<ListTenantSalesData, ListTenantSalesVariables>;
}
export const listTenantSalesRef: ListTenantSalesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listTenantSalesRef:
```typescript
const name = listTenantSalesRef.operationName;
console.log(name);
```

### Variables
The `ListTenantSales` query requires an argument of type `ListTenantSalesVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListTenantSalesVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that executing the `ListTenantSales` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListTenantSalesData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListTenantSalesData {
  organizationMemberships: ({
    role: {
      code: string;
      rolePermissions_on_role: ({
        permission: {
          code: string;
        };
      })[];
    };
  })[];
  sales: ({
    id: UUIDString;
    organization: {
      id: UUIDString;
    } & Organization_Key;
    outlet: {
      id: UUIDString;
      outletCode: number;
      name: string;
    } & Outlet_Key;
    receiptNumber: string;
    saleTimestamp: TimestampString;
    customer?: {
      id: UUIDString;
      customerCode: number;
      name: string;
      phone: string;
      email: string;
    } & Customer_Key;
    customerName: string;
    staffName: string;
    channel: string;
    terminalId: string;
    tenderType: SaleTenderType;
    tax: number;
    discount: number;
    subtotal: number;
    totalNet: number;
    status: SaleStatus;
    createdAt: TimestampString;
    saleLines_on_sale: ({
      id: UUIDString;
      product: {
        id: UUIDString;
        productCode: number;
        name: string;
        sku: string;
      } & Product_Key;
      quantity: number;
      unitPrice: number;
      subtotal: number;
    } & SaleLine_Key)[];
  } & Sale_Key)[];
}
```
### Using `ListTenantSales`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listTenantSales, ListTenantSalesVariables } from '@omniretail/sql-connect';

// The `ListTenantSales` query requires an argument of type `ListTenantSalesVariables`:
const listTenantSalesVars: ListTenantSalesVariables = {
  organizationId: ..., 
};

// Call the `listTenantSales()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listTenantSales(listTenantSalesVars);
// Variables can be defined inline as well.
const { data } = await listTenantSales({ organizationId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listTenantSales(dataConnect, listTenantSalesVars);

console.log(data.organizationMemberships);
console.log(data.sales);

// Or, you can use the `Promise` API.
listTenantSales(listTenantSalesVars).then((response) => {
  const data = response.data;
  console.log(data.organizationMemberships);
  console.log(data.sales);
});
```

### Using `ListTenantSales`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listTenantSalesRef, ListTenantSalesVariables } from '@omniretail/sql-connect';

// The `ListTenantSales` query requires an argument of type `ListTenantSalesVariables`:
const listTenantSalesVars: ListTenantSalesVariables = {
  organizationId: ..., 
};

// Call the `listTenantSalesRef()` function to get a reference to the query.
const ref = listTenantSalesRef(listTenantSalesVars);
// Variables can be defined inline as well.
const ref = listTenantSalesRef({ organizationId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listTenantSalesRef(dataConnect, listTenantSalesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.organizationMemberships);
console.log(data.sales);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.organizationMemberships);
  console.log(data.sales);
});
```

## GetTenantInventoryStockTrusted
You can execute the `GetTenantInventoryStockTrusted` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
getTenantInventoryStockTrusted(vars: GetTenantInventoryStockTrustedVariables, options?: ExecuteQueryOptions): QueryPromise<GetTenantInventoryStockTrustedData, GetTenantInventoryStockTrustedVariables>;

interface GetTenantInventoryStockTrustedRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTenantInventoryStockTrustedVariables): QueryRef<GetTenantInventoryStockTrustedData, GetTenantInventoryStockTrustedVariables>;
}
export const getTenantInventoryStockTrustedRef: GetTenantInventoryStockTrustedRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getTenantInventoryStockTrusted(dc: DataConnect, vars: GetTenantInventoryStockTrustedVariables, options?: ExecuteQueryOptions): QueryPromise<GetTenantInventoryStockTrustedData, GetTenantInventoryStockTrustedVariables>;

interface GetTenantInventoryStockTrustedRef {
  ...
  (dc: DataConnect, vars: GetTenantInventoryStockTrustedVariables): QueryRef<GetTenantInventoryStockTrustedData, GetTenantInventoryStockTrustedVariables>;
}
export const getTenantInventoryStockTrustedRef: GetTenantInventoryStockTrustedRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getTenantInventoryStockTrustedRef:
```typescript
const name = getTenantInventoryStockTrustedRef.operationName;
console.log(name);
```

### Variables
The `GetTenantInventoryStockTrusted` query requires an argument of type `GetTenantInventoryStockTrustedVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetTenantInventoryStockTrustedVariables {
  organizationId: UUIDString;
  outletId: UUIDString;
  productId: UUIDString;
}
```
### Return Type
Recall that executing the `GetTenantInventoryStockTrusted` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetTenantInventoryStockTrustedData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetTenantInventoryStockTrustedData {
  inventoryStocks: ({
    onHandQty: number;
  })[];
}
```
### Using `GetTenantInventoryStockTrusted`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getTenantInventoryStockTrusted, GetTenantInventoryStockTrustedVariables } from '@omniretail/sql-connect';

// The `GetTenantInventoryStockTrusted` query requires an argument of type `GetTenantInventoryStockTrustedVariables`:
const getTenantInventoryStockTrustedVars: GetTenantInventoryStockTrustedVariables = {
  organizationId: ..., 
  outletId: ..., 
  productId: ..., 
};

// Call the `getTenantInventoryStockTrusted()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getTenantInventoryStockTrusted(getTenantInventoryStockTrustedVars);
// Variables can be defined inline as well.
const { data } = await getTenantInventoryStockTrusted({ organizationId: ..., outletId: ..., productId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getTenantInventoryStockTrusted(dataConnect, getTenantInventoryStockTrustedVars);

console.log(data.inventoryStocks);

// Or, you can use the `Promise` API.
getTenantInventoryStockTrusted(getTenantInventoryStockTrustedVars).then((response) => {
  const data = response.data;
  console.log(data.inventoryStocks);
});
```

### Using `GetTenantInventoryStockTrusted`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getTenantInventoryStockTrustedRef, GetTenantInventoryStockTrustedVariables } from '@omniretail/sql-connect';

// The `GetTenantInventoryStockTrusted` query requires an argument of type `GetTenantInventoryStockTrustedVariables`:
const getTenantInventoryStockTrustedVars: GetTenantInventoryStockTrustedVariables = {
  organizationId: ..., 
  outletId: ..., 
  productId: ..., 
};

// Call the `getTenantInventoryStockTrustedRef()` function to get a reference to the query.
const ref = getTenantInventoryStockTrustedRef(getTenantInventoryStockTrustedVars);
// Variables can be defined inline as well.
const ref = getTenantInventoryStockTrustedRef({ organizationId: ..., outletId: ..., productId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getTenantInventoryStockTrustedRef(dataConnect, getTenantInventoryStockTrustedVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.inventoryStocks);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.inventoryStocks);
});
```

## GetTenantSupplierTrusted
You can execute the `GetTenantSupplierTrusted` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
getTenantSupplierTrusted(vars: GetTenantSupplierTrustedVariables, options?: ExecuteQueryOptions): QueryPromise<GetTenantSupplierTrustedData, GetTenantSupplierTrustedVariables>;

interface GetTenantSupplierTrustedRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTenantSupplierTrustedVariables): QueryRef<GetTenantSupplierTrustedData, GetTenantSupplierTrustedVariables>;
}
export const getTenantSupplierTrustedRef: GetTenantSupplierTrustedRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getTenantSupplierTrusted(dc: DataConnect, vars: GetTenantSupplierTrustedVariables, options?: ExecuteQueryOptions): QueryPromise<GetTenantSupplierTrustedData, GetTenantSupplierTrustedVariables>;

interface GetTenantSupplierTrustedRef {
  ...
  (dc: DataConnect, vars: GetTenantSupplierTrustedVariables): QueryRef<GetTenantSupplierTrustedData, GetTenantSupplierTrustedVariables>;
}
export const getTenantSupplierTrustedRef: GetTenantSupplierTrustedRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getTenantSupplierTrustedRef:
```typescript
const name = getTenantSupplierTrustedRef.operationName;
console.log(name);
```

### Variables
The `GetTenantSupplierTrusted` query requires an argument of type `GetTenantSupplierTrustedVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetTenantSupplierTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetTenantSupplierTrusted` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetTenantSupplierTrustedData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetTenantSupplierTrustedData {
  suppliers: ({
    id: UUIDString;
    organization: {
      id: UUIDString;
    } & Organization_Key;
    supplierCode: number;
    name: string;
    contactPerson: string;
    phone: string;
    email: string;
    taxId: string;
    address?: string | null;
    city: string;
    state?: string | null;
    postalCode?: string | null;
    country?: string | null;
    category: string;
    paymentTerms: string;
    creditLimit: number;
    status: SupplierStatus;
    notes?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & Supplier_Key)[];
}
```
### Using `GetTenantSupplierTrusted`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getTenantSupplierTrusted, GetTenantSupplierTrustedVariables } from '@omniretail/sql-connect';

// The `GetTenantSupplierTrusted` query requires an argument of type `GetTenantSupplierTrustedVariables`:
const getTenantSupplierTrustedVars: GetTenantSupplierTrustedVariables = {
  organizationId: ..., 
  id: ..., 
};

// Call the `getTenantSupplierTrusted()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getTenantSupplierTrusted(getTenantSupplierTrustedVars);
// Variables can be defined inline as well.
const { data } = await getTenantSupplierTrusted({ organizationId: ..., id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getTenantSupplierTrusted(dataConnect, getTenantSupplierTrustedVars);

console.log(data.suppliers);

// Or, you can use the `Promise` API.
getTenantSupplierTrusted(getTenantSupplierTrustedVars).then((response) => {
  const data = response.data;
  console.log(data.suppliers);
});
```

### Using `GetTenantSupplierTrusted`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getTenantSupplierTrustedRef, GetTenantSupplierTrustedVariables } from '@omniretail/sql-connect';

// The `GetTenantSupplierTrusted` query requires an argument of type `GetTenantSupplierTrustedVariables`:
const getTenantSupplierTrustedVars: GetTenantSupplierTrustedVariables = {
  organizationId: ..., 
  id: ..., 
};

// Call the `getTenantSupplierTrustedRef()` function to get a reference to the query.
const ref = getTenantSupplierTrustedRef(getTenantSupplierTrustedVars);
// Variables can be defined inline as well.
const ref = getTenantSupplierTrustedRef({ organizationId: ..., id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getTenantSupplierTrustedRef(dataConnect, getTenantSupplierTrustedVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.suppliers);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.suppliers);
});
```

## GetTenantCustomerTrusted
You can execute the `GetTenantCustomerTrusted` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
getTenantCustomerTrusted(vars: GetTenantCustomerTrustedVariables, options?: ExecuteQueryOptions): QueryPromise<GetTenantCustomerTrustedData, GetTenantCustomerTrustedVariables>;

interface GetTenantCustomerTrustedRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTenantCustomerTrustedVariables): QueryRef<GetTenantCustomerTrustedData, GetTenantCustomerTrustedVariables>;
}
export const getTenantCustomerTrustedRef: GetTenantCustomerTrustedRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getTenantCustomerTrusted(dc: DataConnect, vars: GetTenantCustomerTrustedVariables, options?: ExecuteQueryOptions): QueryPromise<GetTenantCustomerTrustedData, GetTenantCustomerTrustedVariables>;

interface GetTenantCustomerTrustedRef {
  ...
  (dc: DataConnect, vars: GetTenantCustomerTrustedVariables): QueryRef<GetTenantCustomerTrustedData, GetTenantCustomerTrustedVariables>;
}
export const getTenantCustomerTrustedRef: GetTenantCustomerTrustedRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getTenantCustomerTrustedRef:
```typescript
const name = getTenantCustomerTrustedRef.operationName;
console.log(name);
```

### Variables
The `GetTenantCustomerTrusted` query requires an argument of type `GetTenantCustomerTrustedVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetTenantCustomerTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetTenantCustomerTrusted` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetTenantCustomerTrustedData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetTenantCustomerTrustedData {
  customers: ({
    id: UUIDString;
    organization: {
      id: UUIDString;
    } & Organization_Key;
    customerCode: number;
    type: CustomerType;
    name: string;
    phone: string;
    email: string;
    taxId?: string | null;
    address?: string | null;
    city: string;
    state: string;
    postalCode?: string | null;
    country?: string | null;
    creditLimit?: number | null;
    preferredContact?: string | null;
    dateOfBirth?: DateString | null;
    gender?: string | null;
    status: CustomerStatus;
    notes?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & Customer_Key)[];
}
```
### Using `GetTenantCustomerTrusted`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getTenantCustomerTrusted, GetTenantCustomerTrustedVariables } from '@omniretail/sql-connect';

// The `GetTenantCustomerTrusted` query requires an argument of type `GetTenantCustomerTrustedVariables`:
const getTenantCustomerTrustedVars: GetTenantCustomerTrustedVariables = {
  organizationId: ..., 
  id: ..., 
};

// Call the `getTenantCustomerTrusted()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getTenantCustomerTrusted(getTenantCustomerTrustedVars);
// Variables can be defined inline as well.
const { data } = await getTenantCustomerTrusted({ organizationId: ..., id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getTenantCustomerTrusted(dataConnect, getTenantCustomerTrustedVars);

console.log(data.customers);

// Or, you can use the `Promise` API.
getTenantCustomerTrusted(getTenantCustomerTrustedVars).then((response) => {
  const data = response.data;
  console.log(data.customers);
});
```

### Using `GetTenantCustomerTrusted`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getTenantCustomerTrustedRef, GetTenantCustomerTrustedVariables } from '@omniretail/sql-connect';

// The `GetTenantCustomerTrusted` query requires an argument of type `GetTenantCustomerTrustedVariables`:
const getTenantCustomerTrustedVars: GetTenantCustomerTrustedVariables = {
  organizationId: ..., 
  id: ..., 
};

// Call the `getTenantCustomerTrustedRef()` function to get a reference to the query.
const ref = getTenantCustomerTrustedRef(getTenantCustomerTrustedVars);
// Variables can be defined inline as well.
const ref = getTenantCustomerTrustedRef({ organizationId: ..., id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getTenantCustomerTrustedRef(dataConnect, getTenantCustomerTrustedVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.customers);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.customers);
});
```

## GetTenantProductTrusted
You can execute the `GetTenantProductTrusted` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
getTenantProductTrusted(vars: GetTenantProductTrustedVariables, options?: ExecuteQueryOptions): QueryPromise<GetTenantProductTrustedData, GetTenantProductTrustedVariables>;

interface GetTenantProductTrustedRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTenantProductTrustedVariables): QueryRef<GetTenantProductTrustedData, GetTenantProductTrustedVariables>;
}
export const getTenantProductTrustedRef: GetTenantProductTrustedRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getTenantProductTrusted(dc: DataConnect, vars: GetTenantProductTrustedVariables, options?: ExecuteQueryOptions): QueryPromise<GetTenantProductTrustedData, GetTenantProductTrustedVariables>;

interface GetTenantProductTrustedRef {
  ...
  (dc: DataConnect, vars: GetTenantProductTrustedVariables): QueryRef<GetTenantProductTrustedData, GetTenantProductTrustedVariables>;
}
export const getTenantProductTrustedRef: GetTenantProductTrustedRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getTenantProductTrustedRef:
```typescript
const name = getTenantProductTrustedRef.operationName;
console.log(name);
```

### Variables
The `GetTenantProductTrusted` query requires an argument of type `GetTenantProductTrustedVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetTenantProductTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetTenantProductTrusted` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetTenantProductTrustedData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetTenantProductTrustedData {
  products: ({
    id: UUIDString;
    organization: {
      id: UUIDString;
    } & Organization_Key;
    productCode: number;
    name: string;
    brand: string;
    categoryId: string;
    categoryName: string;
    subcategory?: string | null;
    type: ProductType;
    sku: string;
    barcode?: string | null;
    hsnCode?: string | null;
    unitOfMeasure?: string | null;
    sellingPrice: number;
    mrp?: number | null;
    cost?: number | null;
    minSellingPrice?: number | null;
    discountAllowed: boolean;
    taxCategory?: string | null;
    status: ProductStatus;
    reorderLevel?: number | null;
    reorderQuantity?: number | null;
    primarySupplier?: string | null;
    supplierProductCode?: string | null;
    description?: string | null;
    imageUrl?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & Product_Key)[];
}
```
### Using `GetTenantProductTrusted`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getTenantProductTrusted, GetTenantProductTrustedVariables } from '@omniretail/sql-connect';

// The `GetTenantProductTrusted` query requires an argument of type `GetTenantProductTrustedVariables`:
const getTenantProductTrustedVars: GetTenantProductTrustedVariables = {
  organizationId: ..., 
  id: ..., 
};

// Call the `getTenantProductTrusted()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getTenantProductTrusted(getTenantProductTrustedVars);
// Variables can be defined inline as well.
const { data } = await getTenantProductTrusted({ organizationId: ..., id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getTenantProductTrusted(dataConnect, getTenantProductTrustedVars);

console.log(data.products);

// Or, you can use the `Promise` API.
getTenantProductTrusted(getTenantProductTrustedVars).then((response) => {
  const data = response.data;
  console.log(data.products);
});
```

### Using `GetTenantProductTrusted`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getTenantProductTrustedRef, GetTenantProductTrustedVariables } from '@omniretail/sql-connect';

// The `GetTenantProductTrusted` query requires an argument of type `GetTenantProductTrustedVariables`:
const getTenantProductTrustedVars: GetTenantProductTrustedVariables = {
  organizationId: ..., 
  id: ..., 
};

// Call the `getTenantProductTrustedRef()` function to get a reference to the query.
const ref = getTenantProductTrustedRef(getTenantProductTrustedVars);
// Variables can be defined inline as well.
const ref = getTenantProductTrustedRef({ organizationId: ..., id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getTenantProductTrustedRef(dataConnect, getTenantProductTrustedVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.products);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.products);
});
```

## GetTenantMembershipTrusted
You can execute the `GetTenantMembershipTrusted` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
getTenantMembershipTrusted(vars: GetTenantMembershipTrustedVariables, options?: ExecuteQueryOptions): QueryPromise<GetTenantMembershipTrustedData, GetTenantMembershipTrustedVariables>;

interface GetTenantMembershipTrustedRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTenantMembershipTrustedVariables): QueryRef<GetTenantMembershipTrustedData, GetTenantMembershipTrustedVariables>;
}
export const getTenantMembershipTrustedRef: GetTenantMembershipTrustedRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getTenantMembershipTrusted(dc: DataConnect, vars: GetTenantMembershipTrustedVariables, options?: ExecuteQueryOptions): QueryPromise<GetTenantMembershipTrustedData, GetTenantMembershipTrustedVariables>;

interface GetTenantMembershipTrustedRef {
  ...
  (dc: DataConnect, vars: GetTenantMembershipTrustedVariables): QueryRef<GetTenantMembershipTrustedData, GetTenantMembershipTrustedVariables>;
}
export const getTenantMembershipTrustedRef: GetTenantMembershipTrustedRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getTenantMembershipTrustedRef:
```typescript
const name = getTenantMembershipTrustedRef.operationName;
console.log(name);
```

### Variables
The `GetTenantMembershipTrusted` query requires an argument of type `GetTenantMembershipTrustedVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetTenantMembershipTrustedVariables {
  organizationId: UUIDString;
  firebaseUid: string;
}
```
### Return Type
Recall that executing the `GetTenantMembershipTrusted` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetTenantMembershipTrustedData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetTenantMembershipTrustedData {
  organizationMemberships: ({
    organization: {
      id: UUIDString;
    } & Organization_Key;
    user: {
      id: UUIDString;
      firebaseUid: string;
    } & AppUser_Key;
    role: {
      code: string;
      scope: RoleScope;
      rolePermissions_on_role: ({
        permission: {
          code: string;
        };
      })[];
    };
  })[];
}
```
### Using `GetTenantMembershipTrusted`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getTenantMembershipTrusted, GetTenantMembershipTrustedVariables } from '@omniretail/sql-connect';

// The `GetTenantMembershipTrusted` query requires an argument of type `GetTenantMembershipTrustedVariables`:
const getTenantMembershipTrustedVars: GetTenantMembershipTrustedVariables = {
  organizationId: ..., 
  firebaseUid: ..., 
};

// Call the `getTenantMembershipTrusted()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getTenantMembershipTrusted(getTenantMembershipTrustedVars);
// Variables can be defined inline as well.
const { data } = await getTenantMembershipTrusted({ organizationId: ..., firebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getTenantMembershipTrusted(dataConnect, getTenantMembershipTrustedVars);

console.log(data.organizationMemberships);

// Or, you can use the `Promise` API.
getTenantMembershipTrusted(getTenantMembershipTrustedVars).then((response) => {
  const data = response.data;
  console.log(data.organizationMemberships);
});
```

### Using `GetTenantMembershipTrusted`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getTenantMembershipTrustedRef, GetTenantMembershipTrustedVariables } from '@omniretail/sql-connect';

// The `GetTenantMembershipTrusted` query requires an argument of type `GetTenantMembershipTrustedVariables`:
const getTenantMembershipTrustedVars: GetTenantMembershipTrustedVariables = {
  organizationId: ..., 
  firebaseUid: ..., 
};

// Call the `getTenantMembershipTrustedRef()` function to get a reference to the query.
const ref = getTenantMembershipTrustedRef(getTenantMembershipTrustedVars);
// Variables can be defined inline as well.
const ref = getTenantMembershipTrustedRef({ organizationId: ..., firebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getTenantMembershipTrustedRef(dataConnect, getTenantMembershipTrustedVars);

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

## ResolveTenantEmployeeIdentityTrusted
You can execute the `ResolveTenantEmployeeIdentityTrusted` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
resolveTenantEmployeeIdentityTrusted(vars: ResolveTenantEmployeeIdentityTrustedVariables, options?: ExecuteQueryOptions): QueryPromise<ResolveTenantEmployeeIdentityTrustedData, ResolveTenantEmployeeIdentityTrustedVariables>;

interface ResolveTenantEmployeeIdentityTrustedRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ResolveTenantEmployeeIdentityTrustedVariables): QueryRef<ResolveTenantEmployeeIdentityTrustedData, ResolveTenantEmployeeIdentityTrustedVariables>;
}
export const resolveTenantEmployeeIdentityTrustedRef: ResolveTenantEmployeeIdentityTrustedRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
resolveTenantEmployeeIdentityTrusted(dc: DataConnect, vars: ResolveTenantEmployeeIdentityTrustedVariables, options?: ExecuteQueryOptions): QueryPromise<ResolveTenantEmployeeIdentityTrustedData, ResolveTenantEmployeeIdentityTrustedVariables>;

interface ResolveTenantEmployeeIdentityTrustedRef {
  ...
  (dc: DataConnect, vars: ResolveTenantEmployeeIdentityTrustedVariables): QueryRef<ResolveTenantEmployeeIdentityTrustedData, ResolveTenantEmployeeIdentityTrustedVariables>;
}
export const resolveTenantEmployeeIdentityTrustedRef: ResolveTenantEmployeeIdentityTrustedRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the resolveTenantEmployeeIdentityTrustedRef:
```typescript
const name = resolveTenantEmployeeIdentityTrustedRef.operationName;
console.log(name);
```

### Variables
The `ResolveTenantEmployeeIdentityTrusted` query requires an argument of type `ResolveTenantEmployeeIdentityTrustedVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ResolveTenantEmployeeIdentityTrustedVariables {
  organizationId: UUIDString;
  employeeId: UUIDString;
}
```
### Return Type
Recall that executing the `ResolveTenantEmployeeIdentityTrusted` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ResolveTenantEmployeeIdentityTrustedData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ResolveTenantEmployeeIdentityTrustedData {
  employees: ({
    id: UUIDString;
    loginAccess: LoginAccessStatus;
    user?: {
      id: UUIDString;
      firebaseUid: string;
    } & AppUser_Key;
  } & Employee_Key)[];
}
```
### Using `ResolveTenantEmployeeIdentityTrusted`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, resolveTenantEmployeeIdentityTrusted, ResolveTenantEmployeeIdentityTrustedVariables } from '@omniretail/sql-connect';

// The `ResolveTenantEmployeeIdentityTrusted` query requires an argument of type `ResolveTenantEmployeeIdentityTrustedVariables`:
const resolveTenantEmployeeIdentityTrustedVars: ResolveTenantEmployeeIdentityTrustedVariables = {
  organizationId: ..., 
  employeeId: ..., 
};

// Call the `resolveTenantEmployeeIdentityTrusted()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await resolveTenantEmployeeIdentityTrusted(resolveTenantEmployeeIdentityTrustedVars);
// Variables can be defined inline as well.
const { data } = await resolveTenantEmployeeIdentityTrusted({ organizationId: ..., employeeId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await resolveTenantEmployeeIdentityTrusted(dataConnect, resolveTenantEmployeeIdentityTrustedVars);

console.log(data.employees);

// Or, you can use the `Promise` API.
resolveTenantEmployeeIdentityTrusted(resolveTenantEmployeeIdentityTrustedVars).then((response) => {
  const data = response.data;
  console.log(data.employees);
});
```

### Using `ResolveTenantEmployeeIdentityTrusted`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, resolveTenantEmployeeIdentityTrustedRef, ResolveTenantEmployeeIdentityTrustedVariables } from '@omniretail/sql-connect';

// The `ResolveTenantEmployeeIdentityTrusted` query requires an argument of type `ResolveTenantEmployeeIdentityTrustedVariables`:
const resolveTenantEmployeeIdentityTrustedVars: ResolveTenantEmployeeIdentityTrustedVariables = {
  organizationId: ..., 
  employeeId: ..., 
};

// Call the `resolveTenantEmployeeIdentityTrustedRef()` function to get a reference to the query.
const ref = resolveTenantEmployeeIdentityTrustedRef(resolveTenantEmployeeIdentityTrustedVars);
// Variables can be defined inline as well.
const ref = resolveTenantEmployeeIdentityTrustedRef({ organizationId: ..., employeeId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = resolveTenantEmployeeIdentityTrustedRef(dataConnect, resolveTenantEmployeeIdentityTrustedVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.employees);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.employees);
});
```

## GetTenantOutletTrusted
You can execute the `GetTenantOutletTrusted` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
getTenantOutletTrusted(vars: GetTenantOutletTrustedVariables, options?: ExecuteQueryOptions): QueryPromise<GetTenantOutletTrustedData, GetTenantOutletTrustedVariables>;

interface GetTenantOutletTrustedRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTenantOutletTrustedVariables): QueryRef<GetTenantOutletTrustedData, GetTenantOutletTrustedVariables>;
}
export const getTenantOutletTrustedRef: GetTenantOutletTrustedRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getTenantOutletTrusted(dc: DataConnect, vars: GetTenantOutletTrustedVariables, options?: ExecuteQueryOptions): QueryPromise<GetTenantOutletTrustedData, GetTenantOutletTrustedVariables>;

interface GetTenantOutletTrustedRef {
  ...
  (dc: DataConnect, vars: GetTenantOutletTrustedVariables): QueryRef<GetTenantOutletTrustedData, GetTenantOutletTrustedVariables>;
}
export const getTenantOutletTrustedRef: GetTenantOutletTrustedRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getTenantOutletTrustedRef:
```typescript
const name = getTenantOutletTrustedRef.operationName;
console.log(name);
```

### Variables
The `GetTenantOutletTrusted` query requires an argument of type `GetTenantOutletTrustedVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetTenantOutletTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetTenantOutletTrusted` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetTenantOutletTrustedData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetTenantOutletTrustedData {
  outlets: ({
    id: UUIDString;
    outletCode: number;
    name: string;
    contactPerson: string;
    email?: string | null;
    phone: string;
    address: string;
    status: OutletStatus;
    organization: {
      id: UUIDString;
    } & Organization_Key;
  } & Outlet_Key)[];
}
```
### Using `GetTenantOutletTrusted`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getTenantOutletTrusted, GetTenantOutletTrustedVariables } from '@omniretail/sql-connect';

// The `GetTenantOutletTrusted` query requires an argument of type `GetTenantOutletTrustedVariables`:
const getTenantOutletTrustedVars: GetTenantOutletTrustedVariables = {
  organizationId: ..., 
  id: ..., 
};

// Call the `getTenantOutletTrusted()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getTenantOutletTrusted(getTenantOutletTrustedVars);
// Variables can be defined inline as well.
const { data } = await getTenantOutletTrusted({ organizationId: ..., id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getTenantOutletTrusted(dataConnect, getTenantOutletTrustedVars);

console.log(data.outlets);

// Or, you can use the `Promise` API.
getTenantOutletTrusted(getTenantOutletTrustedVars).then((response) => {
  const data = response.data;
  console.log(data.outlets);
});
```

### Using `GetTenantOutletTrusted`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getTenantOutletTrustedRef, GetTenantOutletTrustedVariables } from '@omniretail/sql-connect';

// The `GetTenantOutletTrusted` query requires an argument of type `GetTenantOutletTrustedVariables`:
const getTenantOutletTrustedVars: GetTenantOutletTrustedVariables = {
  organizationId: ..., 
  id: ..., 
};

// Call the `getTenantOutletTrustedRef()` function to get a reference to the query.
const ref = getTenantOutletTrustedRef(getTenantOutletTrustedVars);
// Variables can be defined inline as well.
const ref = getTenantOutletTrustedRef({ organizationId: ..., id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getTenantOutletTrustedRef(dataConnect, getTenantOutletTrustedVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.outlets);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.outlets);
});
```

## GetTenantEmployeeTrusted
You can execute the `GetTenantEmployeeTrusted` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
getTenantEmployeeTrusted(vars: GetTenantEmployeeTrustedVariables, options?: ExecuteQueryOptions): QueryPromise<GetTenantEmployeeTrustedData, GetTenantEmployeeTrustedVariables>;

interface GetTenantEmployeeTrustedRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTenantEmployeeTrustedVariables): QueryRef<GetTenantEmployeeTrustedData, GetTenantEmployeeTrustedVariables>;
}
export const getTenantEmployeeTrustedRef: GetTenantEmployeeTrustedRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getTenantEmployeeTrusted(dc: DataConnect, vars: GetTenantEmployeeTrustedVariables, options?: ExecuteQueryOptions): QueryPromise<GetTenantEmployeeTrustedData, GetTenantEmployeeTrustedVariables>;

interface GetTenantEmployeeTrustedRef {
  ...
  (dc: DataConnect, vars: GetTenantEmployeeTrustedVariables): QueryRef<GetTenantEmployeeTrustedData, GetTenantEmployeeTrustedVariables>;
}
export const getTenantEmployeeTrustedRef: GetTenantEmployeeTrustedRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getTenantEmployeeTrustedRef:
```typescript
const name = getTenantEmployeeTrustedRef.operationName;
console.log(name);
```

### Variables
The `GetTenantEmployeeTrusted` query requires an argument of type `GetTenantEmployeeTrustedVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetTenantEmployeeTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetTenantEmployeeTrusted` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetTenantEmployeeTrustedData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetTenantEmployeeTrustedData {
  employees: ({
    id: UUIDString;
    organization: {
      id: UUIDString;
    } & Organization_Key;
    user?: {
      id: UUIDString;
      username: string;
      email: string;
      firebaseUid: string;
    } & AppUser_Key;
    employeeCode: number;
    fullName: string;
    email?: string | null;
    phone: string;
    designation: string;
    department?: string | null;
    dateOfJoining: DateString;
    assignmentScope: string;
    employmentStatus: EmploymentStatus;
    loginAccess: LoginAccessStatus;
    createdAt: TimestampString;
    updatedAt: TimestampString;
    employeeOutlets_on_employee: ({
      outlet: {
        id: UUIDString;
        outletCode: number;
        name: string;
      } & Outlet_Key;
    })[];
  } & Employee_Key)[];
}
```
### Using `GetTenantEmployeeTrusted`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getTenantEmployeeTrusted, GetTenantEmployeeTrustedVariables } from '@omniretail/sql-connect';

// The `GetTenantEmployeeTrusted` query requires an argument of type `GetTenantEmployeeTrustedVariables`:
const getTenantEmployeeTrustedVars: GetTenantEmployeeTrustedVariables = {
  organizationId: ..., 
  id: ..., 
};

// Call the `getTenantEmployeeTrusted()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getTenantEmployeeTrusted(getTenantEmployeeTrustedVars);
// Variables can be defined inline as well.
const { data } = await getTenantEmployeeTrusted({ organizationId: ..., id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getTenantEmployeeTrusted(dataConnect, getTenantEmployeeTrustedVars);

console.log(data.employees);

// Or, you can use the `Promise` API.
getTenantEmployeeTrusted(getTenantEmployeeTrustedVars).then((response) => {
  const data = response.data;
  console.log(data.employees);
});
```

### Using `GetTenantEmployeeTrusted`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getTenantEmployeeTrustedRef, GetTenantEmployeeTrustedVariables } from '@omniretail/sql-connect';

// The `GetTenantEmployeeTrusted` query requires an argument of type `GetTenantEmployeeTrustedVariables`:
const getTenantEmployeeTrustedVars: GetTenantEmployeeTrustedVariables = {
  organizationId: ..., 
  id: ..., 
};

// Call the `getTenantEmployeeTrustedRef()` function to get a reference to the query.
const ref = getTenantEmployeeTrustedRef(getTenantEmployeeTrustedVars);
// Variables can be defined inline as well.
const ref = getTenantEmployeeTrustedRef({ organizationId: ..., id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getTenantEmployeeTrustedRef(dataConnect, getTenantEmployeeTrustedVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.employees);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.employees);
});
```

## GetTenantServicePersonTrusted
You can execute the `GetTenantServicePersonTrusted` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
getTenantServicePersonTrusted(vars: GetTenantServicePersonTrustedVariables, options?: ExecuteQueryOptions): QueryPromise<GetTenantServicePersonTrustedData, GetTenantServicePersonTrustedVariables>;

interface GetTenantServicePersonTrustedRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTenantServicePersonTrustedVariables): QueryRef<GetTenantServicePersonTrustedData, GetTenantServicePersonTrustedVariables>;
}
export const getTenantServicePersonTrustedRef: GetTenantServicePersonTrustedRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getTenantServicePersonTrusted(dc: DataConnect, vars: GetTenantServicePersonTrustedVariables, options?: ExecuteQueryOptions): QueryPromise<GetTenantServicePersonTrustedData, GetTenantServicePersonTrustedVariables>;

interface GetTenantServicePersonTrustedRef {
  ...
  (dc: DataConnect, vars: GetTenantServicePersonTrustedVariables): QueryRef<GetTenantServicePersonTrustedData, GetTenantServicePersonTrustedVariables>;
}
export const getTenantServicePersonTrustedRef: GetTenantServicePersonTrustedRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getTenantServicePersonTrustedRef:
```typescript
const name = getTenantServicePersonTrustedRef.operationName;
console.log(name);
```

### Variables
The `GetTenantServicePersonTrusted` query requires an argument of type `GetTenantServicePersonTrustedVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetTenantServicePersonTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetTenantServicePersonTrusted` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetTenantServicePersonTrustedData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetTenantServicePersonTrustedData {
  servicePeople: ({
    id: UUIDString;
    organization: {
      id: UUIDString;
    } & Organization_Key;
    servicePersonCode: number;
    fullName: string;
    email?: string | null;
    phone: string;
    specialization: string;
    skills?: string | null;
    yearsOfExperience?: number | null;
    assignmentScope: string;
    status: EmploymentStatus;
    createdAt: TimestampString;
    updatedAt: TimestampString;
    servicePersonOutlets_on_servicePerson: ({
      outlet: {
        id: UUIDString;
        outletCode: number;
        name: string;
      } & Outlet_Key;
    })[];
  } & ServicePerson_Key)[];
}
```
### Using `GetTenantServicePersonTrusted`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getTenantServicePersonTrusted, GetTenantServicePersonTrustedVariables } from '@omniretail/sql-connect';

// The `GetTenantServicePersonTrusted` query requires an argument of type `GetTenantServicePersonTrustedVariables`:
const getTenantServicePersonTrustedVars: GetTenantServicePersonTrustedVariables = {
  organizationId: ..., 
  id: ..., 
};

// Call the `getTenantServicePersonTrusted()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getTenantServicePersonTrusted(getTenantServicePersonTrustedVars);
// Variables can be defined inline as well.
const { data } = await getTenantServicePersonTrusted({ organizationId: ..., id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getTenantServicePersonTrusted(dataConnect, getTenantServicePersonTrustedVars);

console.log(data.servicePeople);

// Or, you can use the `Promise` API.
getTenantServicePersonTrusted(getTenantServicePersonTrustedVars).then((response) => {
  const data = response.data;
  console.log(data.servicePeople);
});
```

### Using `GetTenantServicePersonTrusted`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getTenantServicePersonTrustedRef, GetTenantServicePersonTrustedVariables } from '@omniretail/sql-connect';

// The `GetTenantServicePersonTrusted` query requires an argument of type `GetTenantServicePersonTrustedVariables`:
const getTenantServicePersonTrustedVars: GetTenantServicePersonTrustedVariables = {
  organizationId: ..., 
  id: ..., 
};

// Call the `getTenantServicePersonTrustedRef()` function to get a reference to the query.
const ref = getTenantServicePersonTrustedRef(getTenantServicePersonTrustedVars);
// Variables can be defined inline as well.
const ref = getTenantServicePersonTrustedRef({ organizationId: ..., id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getTenantServicePersonTrustedRef(dataConnect, getTenantServicePersonTrustedVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.servicePeople);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.servicePeople);
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
  idempotencyKey: string;
  resultReference: string;
}
```
### Return Type
Recall that executing the `ProvisionOrganizationAdministrator` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ProvisionOrganizationAdministratorData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ProvisionOrganizationAdministratorData {
  appUser_insert: AppUser_Key;
  organizationMembership_insert: OrganizationMembership_Key;
  userRole_upsert: UserRole_Key;
  auditEvent_insert: AuditEvent_Key;
  lifecycleIdempotency_update?: LifecycleIdempotency_Key | null;
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
  idempotencyKey: ..., 
  resultReference: ..., 
};

// Call the `provisionOrganizationAdministrator()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await provisionOrganizationAdministrator(provisionOrganizationAdministratorVars);
// Variables can be defined inline as well.
const { data } = await provisionOrganizationAdministrator({ userId: ..., firebaseUid: ..., username: ..., email: ..., displayName: ..., phone: ..., organizationId: ..., roleId: ..., auditId: ..., requestId: ..., idempotencyKey: ..., resultReference: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await provisionOrganizationAdministrator(dataConnect, provisionOrganizationAdministratorVars);

console.log(data.appUser_insert);
console.log(data.organizationMembership_insert);
console.log(data.userRole_upsert);
console.log(data.auditEvent_insert);
console.log(data.lifecycleIdempotency_update);

// Or, you can use the `Promise` API.
provisionOrganizationAdministrator(provisionOrganizationAdministratorVars).then((response) => {
  const data = response.data;
  console.log(data.appUser_insert);
  console.log(data.organizationMembership_insert);
  console.log(data.userRole_upsert);
  console.log(data.auditEvent_insert);
  console.log(data.lifecycleIdempotency_update);
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
  idempotencyKey: ..., 
  resultReference: ..., 
};

// Call the `provisionOrganizationAdministratorRef()` function to get a reference to the mutation.
const ref = provisionOrganizationAdministratorRef(provisionOrganizationAdministratorVars);
// Variables can be defined inline as well.
const ref = provisionOrganizationAdministratorRef({ userId: ..., firebaseUid: ..., username: ..., email: ..., displayName: ..., phone: ..., organizationId: ..., roleId: ..., auditId: ..., requestId: ..., idempotencyKey: ..., resultReference: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = provisionOrganizationAdministratorRef(dataConnect, provisionOrganizationAdministratorVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.appUser_insert);
console.log(data.organizationMembership_insert);
console.log(data.userRole_upsert);
console.log(data.auditEvent_insert);
console.log(data.lifecycleIdempotency_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.appUser_insert);
  console.log(data.organizationMembership_insert);
  console.log(data.userRole_upsert);
  console.log(data.auditEvent_insert);
  console.log(data.lifecycleIdempotency_update);
});
```

## EnsureAppUserRoleTrusted
You can execute the `EnsureAppUserRoleTrusted` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
ensureAppUserRoleTrusted(vars: EnsureAppUserRoleTrustedVariables): MutationPromise<EnsureAppUserRoleTrustedData, EnsureAppUserRoleTrustedVariables>;

interface EnsureAppUserRoleTrustedRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: EnsureAppUserRoleTrustedVariables): MutationRef<EnsureAppUserRoleTrustedData, EnsureAppUserRoleTrustedVariables>;
}
export const ensureAppUserRoleTrustedRef: EnsureAppUserRoleTrustedRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
ensureAppUserRoleTrusted(dc: DataConnect, vars: EnsureAppUserRoleTrustedVariables): MutationPromise<EnsureAppUserRoleTrustedData, EnsureAppUserRoleTrustedVariables>;

interface EnsureAppUserRoleTrustedRef {
  ...
  (dc: DataConnect, vars: EnsureAppUserRoleTrustedVariables): MutationRef<EnsureAppUserRoleTrustedData, EnsureAppUserRoleTrustedVariables>;
}
export const ensureAppUserRoleTrustedRef: EnsureAppUserRoleTrustedRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the ensureAppUserRoleTrustedRef:
```typescript
const name = ensureAppUserRoleTrustedRef.operationName;
console.log(name);
```

### Variables
The `EnsureAppUserRoleTrusted` mutation requires an argument of type `EnsureAppUserRoleTrustedVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface EnsureAppUserRoleTrustedVariables {
  userId: UUIDString;
  roleId: UUIDString;
}
```
### Return Type
Recall that executing the `EnsureAppUserRoleTrusted` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `EnsureAppUserRoleTrustedData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface EnsureAppUserRoleTrustedData {
  userRole_upsert: UserRole_Key;
}
```
### Using `EnsureAppUserRoleTrusted`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ensureAppUserRoleTrusted, EnsureAppUserRoleTrustedVariables } from '@omniretail/sql-connect';

// The `EnsureAppUserRoleTrusted` mutation requires an argument of type `EnsureAppUserRoleTrustedVariables`:
const ensureAppUserRoleTrustedVars: EnsureAppUserRoleTrustedVariables = {
  userId: ..., 
  roleId: ..., 
};

// Call the `ensureAppUserRoleTrusted()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await ensureAppUserRoleTrusted(ensureAppUserRoleTrustedVars);
// Variables can be defined inline as well.
const { data } = await ensureAppUserRoleTrusted({ userId: ..., roleId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await ensureAppUserRoleTrusted(dataConnect, ensureAppUserRoleTrustedVars);

console.log(data.userRole_upsert);

// Or, you can use the `Promise` API.
ensureAppUserRoleTrusted(ensureAppUserRoleTrustedVars).then((response) => {
  const data = response.data;
  console.log(data.userRole_upsert);
});
```

### Using `EnsureAppUserRoleTrusted`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, ensureAppUserRoleTrustedRef, EnsureAppUserRoleTrustedVariables } from '@omniretail/sql-connect';

// The `EnsureAppUserRoleTrusted` mutation requires an argument of type `EnsureAppUserRoleTrustedVariables`:
const ensureAppUserRoleTrustedVars: EnsureAppUserRoleTrustedVariables = {
  userId: ..., 
  roleId: ..., 
};

// Call the `ensureAppUserRoleTrustedRef()` function to get a reference to the mutation.
const ref = ensureAppUserRoleTrustedRef(ensureAppUserRoleTrustedVars);
// Variables can be defined inline as well.
const ref = ensureAppUserRoleTrustedRef({ userId: ..., roleId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = ensureAppUserRoleTrustedRef(dataConnect, ensureAppUserRoleTrustedVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.userRole_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.userRole_upsert);
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
  id: ..., 
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
const { data } = await createOrganization({ id: ..., organizationCode: ..., businessName: ..., legalEntityName: ..., taxId: ..., primaryContactName: ..., email: ..., phone: ..., address: ..., city: ..., state: ..., postalCode: ..., timezone: ..., currency: ..., auditId: ..., requestId: ..., });

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
  id: ..., 
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
const ref = createOrganizationRef({ id: ..., organizationCode: ..., businessName: ..., legalEntityName: ..., taxId: ..., primaryContactName: ..., email: ..., phone: ..., address: ..., city: ..., state: ..., postalCode: ..., timezone: ..., currency: ..., auditId: ..., requestId: ..., });

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

## CreateTenantExpense
You can execute the `CreateTenantExpense` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
createTenantExpense(vars: CreateTenantExpenseVariables): MutationPromise<CreateTenantExpenseData, CreateTenantExpenseVariables>;

interface CreateTenantExpenseRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTenantExpenseVariables): MutationRef<CreateTenantExpenseData, CreateTenantExpenseVariables>;
}
export const createTenantExpenseRef: CreateTenantExpenseRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createTenantExpense(dc: DataConnect, vars: CreateTenantExpenseVariables): MutationPromise<CreateTenantExpenseData, CreateTenantExpenseVariables>;

interface CreateTenantExpenseRef {
  ...
  (dc: DataConnect, vars: CreateTenantExpenseVariables): MutationRef<CreateTenantExpenseData, CreateTenantExpenseVariables>;
}
export const createTenantExpenseRef: CreateTenantExpenseRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createTenantExpenseRef:
```typescript
const name = createTenantExpenseRef.operationName;
console.log(name);
```

### Variables
The `CreateTenantExpense` mutation requires an argument of type `CreateTenantExpenseVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateTenantExpenseVariables {
  organizationId: UUIDString;
  expenseNumber: string;
  expenseDate: DateString;
  category: string;
  description: string;
  reference?: string | null;
  vendorName?: string | null;
  outletId?: UUIDString | null;
  scope: string;
  baseAmount: number;
  taxAmount: number;
  amount: number;
  paymentMethod: string;
  paidByEmployee: string;
  submittedBy: string;
  notes?: string | null;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}
```
### Return Type
Recall that executing the `CreateTenantExpense` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateTenantExpenseData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateTenantExpenseData {
  expense_insert: Expense_Key;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `CreateTenantExpense`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createTenantExpense, CreateTenantExpenseVariables } from '@omniretail/sql-connect';

// The `CreateTenantExpense` mutation requires an argument of type `CreateTenantExpenseVariables`:
const createTenantExpenseVars: CreateTenantExpenseVariables = {
  organizationId: ..., 
  expenseNumber: ..., 
  expenseDate: ..., 
  category: ..., 
  description: ..., 
  reference: ..., // optional
  vendorName: ..., // optional
  outletId: ..., // optional
  scope: ..., 
  baseAmount: ..., 
  taxAmount: ..., 
  amount: ..., 
  paymentMethod: ..., 
  paidByEmployee: ..., 
  submittedBy: ..., 
  notes: ..., // optional
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `createTenantExpense()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createTenantExpense(createTenantExpenseVars);
// Variables can be defined inline as well.
const { data } = await createTenantExpense({ organizationId: ..., expenseNumber: ..., expenseDate: ..., category: ..., description: ..., reference: ..., vendorName: ..., outletId: ..., scope: ..., baseAmount: ..., taxAmount: ..., amount: ..., paymentMethod: ..., paidByEmployee: ..., submittedBy: ..., notes: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createTenantExpense(dataConnect, createTenantExpenseVars);

console.log(data.expense_insert);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
createTenantExpense(createTenantExpenseVars).then((response) => {
  const data = response.data;
  console.log(data.expense_insert);
  console.log(data.auditEvent_insert);
});
```

### Using `CreateTenantExpense`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createTenantExpenseRef, CreateTenantExpenseVariables } from '@omniretail/sql-connect';

// The `CreateTenantExpense` mutation requires an argument of type `CreateTenantExpenseVariables`:
const createTenantExpenseVars: CreateTenantExpenseVariables = {
  organizationId: ..., 
  expenseNumber: ..., 
  expenseDate: ..., 
  category: ..., 
  description: ..., 
  reference: ..., // optional
  vendorName: ..., // optional
  outletId: ..., // optional
  scope: ..., 
  baseAmount: ..., 
  taxAmount: ..., 
  amount: ..., 
  paymentMethod: ..., 
  paidByEmployee: ..., 
  submittedBy: ..., 
  notes: ..., // optional
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `createTenantExpenseRef()` function to get a reference to the mutation.
const ref = createTenantExpenseRef(createTenantExpenseVars);
// Variables can be defined inline as well.
const ref = createTenantExpenseRef({ organizationId: ..., expenseNumber: ..., expenseDate: ..., category: ..., description: ..., reference: ..., vendorName: ..., outletId: ..., scope: ..., baseAmount: ..., taxAmount: ..., amount: ..., paymentMethod: ..., paidByEmployee: ..., submittedBy: ..., notes: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createTenantExpenseRef(dataConnect, createTenantExpenseVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.expense_insert);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.expense_insert);
  console.log(data.auditEvent_insert);
});
```

## UpdateTenantExpense
You can execute the `UpdateTenantExpense` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
updateTenantExpense(vars: UpdateTenantExpenseVariables): MutationPromise<UpdateTenantExpenseData, UpdateTenantExpenseVariables>;

interface UpdateTenantExpenseRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTenantExpenseVariables): MutationRef<UpdateTenantExpenseData, UpdateTenantExpenseVariables>;
}
export const updateTenantExpenseRef: UpdateTenantExpenseRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateTenantExpense(dc: DataConnect, vars: UpdateTenantExpenseVariables): MutationPromise<UpdateTenantExpenseData, UpdateTenantExpenseVariables>;

interface UpdateTenantExpenseRef {
  ...
  (dc: DataConnect, vars: UpdateTenantExpenseVariables): MutationRef<UpdateTenantExpenseData, UpdateTenantExpenseVariables>;
}
export const updateTenantExpenseRef: UpdateTenantExpenseRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateTenantExpenseRef:
```typescript
const name = updateTenantExpenseRef.operationName;
console.log(name);
```

### Variables
The `UpdateTenantExpense` mutation requires an argument of type `UpdateTenantExpenseVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateTenantExpenseVariables {
  organizationId: UUIDString;
  id: UUIDString;
  expenseDate: DateString;
  category: string;
  description: string;
  reference?: string | null;
  vendorName?: string | null;
  scope: string;
  baseAmount: number;
  taxAmount: number;
  amount: number;
  paymentMethod: string;
  paidByEmployee: string;
  notes?: string | null;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}
```
### Return Type
Recall that executing the `UpdateTenantExpense` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateTenantExpenseData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateTenantExpenseData {
  expense_update?: Expense_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `UpdateTenantExpense`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateTenantExpense, UpdateTenantExpenseVariables } from '@omniretail/sql-connect';

// The `UpdateTenantExpense` mutation requires an argument of type `UpdateTenantExpenseVariables`:
const updateTenantExpenseVars: UpdateTenantExpenseVariables = {
  organizationId: ..., 
  id: ..., 
  expenseDate: ..., 
  category: ..., 
  description: ..., 
  reference: ..., // optional
  vendorName: ..., // optional
  scope: ..., 
  baseAmount: ..., 
  taxAmount: ..., 
  amount: ..., 
  paymentMethod: ..., 
  paidByEmployee: ..., 
  notes: ..., // optional
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `updateTenantExpense()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateTenantExpense(updateTenantExpenseVars);
// Variables can be defined inline as well.
const { data } = await updateTenantExpense({ organizationId: ..., id: ..., expenseDate: ..., category: ..., description: ..., reference: ..., vendorName: ..., scope: ..., baseAmount: ..., taxAmount: ..., amount: ..., paymentMethod: ..., paidByEmployee: ..., notes: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateTenantExpense(dataConnect, updateTenantExpenseVars);

console.log(data.expense_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
updateTenantExpense(updateTenantExpenseVars).then((response) => {
  const data = response.data;
  console.log(data.expense_update);
  console.log(data.auditEvent_insert);
});
```

### Using `UpdateTenantExpense`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateTenantExpenseRef, UpdateTenantExpenseVariables } from '@omniretail/sql-connect';

// The `UpdateTenantExpense` mutation requires an argument of type `UpdateTenantExpenseVariables`:
const updateTenantExpenseVars: UpdateTenantExpenseVariables = {
  organizationId: ..., 
  id: ..., 
  expenseDate: ..., 
  category: ..., 
  description: ..., 
  reference: ..., // optional
  vendorName: ..., // optional
  scope: ..., 
  baseAmount: ..., 
  taxAmount: ..., 
  amount: ..., 
  paymentMethod: ..., 
  paidByEmployee: ..., 
  notes: ..., // optional
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `updateTenantExpenseRef()` function to get a reference to the mutation.
const ref = updateTenantExpenseRef(updateTenantExpenseVars);
// Variables can be defined inline as well.
const ref = updateTenantExpenseRef({ organizationId: ..., id: ..., expenseDate: ..., category: ..., description: ..., reference: ..., vendorName: ..., scope: ..., baseAmount: ..., taxAmount: ..., amount: ..., paymentMethod: ..., paidByEmployee: ..., notes: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateTenantExpenseRef(dataConnect, updateTenantExpenseVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.expense_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.expense_update);
  console.log(data.auditEvent_insert);
});
```

## ChangeTenantExpenseApproval
You can execute the `ChangeTenantExpenseApproval` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
changeTenantExpenseApproval(vars: ChangeTenantExpenseApprovalVariables): MutationPromise<ChangeTenantExpenseApprovalData, ChangeTenantExpenseApprovalVariables>;

interface ChangeTenantExpenseApprovalRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ChangeTenantExpenseApprovalVariables): MutationRef<ChangeTenantExpenseApprovalData, ChangeTenantExpenseApprovalVariables>;
}
export const changeTenantExpenseApprovalRef: ChangeTenantExpenseApprovalRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
changeTenantExpenseApproval(dc: DataConnect, vars: ChangeTenantExpenseApprovalVariables): MutationPromise<ChangeTenantExpenseApprovalData, ChangeTenantExpenseApprovalVariables>;

interface ChangeTenantExpenseApprovalRef {
  ...
  (dc: DataConnect, vars: ChangeTenantExpenseApprovalVariables): MutationRef<ChangeTenantExpenseApprovalData, ChangeTenantExpenseApprovalVariables>;
}
export const changeTenantExpenseApprovalRef: ChangeTenantExpenseApprovalRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the changeTenantExpenseApprovalRef:
```typescript
const name = changeTenantExpenseApprovalRef.operationName;
console.log(name);
```

### Variables
The `ChangeTenantExpenseApproval` mutation requires an argument of type `ChangeTenantExpenseApprovalVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ChangeTenantExpenseApprovalVariables {
  organizationId: UUIDString;
  id: UUIDString;
  approvalStatus: ExpenseApprovalStatus;
  reason?: string | null;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}
```
### Return Type
Recall that executing the `ChangeTenantExpenseApproval` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ChangeTenantExpenseApprovalData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ChangeTenantExpenseApprovalData {
  expense_update?: Expense_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `ChangeTenantExpenseApproval`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, changeTenantExpenseApproval, ChangeTenantExpenseApprovalVariables } from '@omniretail/sql-connect';

// The `ChangeTenantExpenseApproval` mutation requires an argument of type `ChangeTenantExpenseApprovalVariables`:
const changeTenantExpenseApprovalVars: ChangeTenantExpenseApprovalVariables = {
  organizationId: ..., 
  id: ..., 
  approvalStatus: ..., 
  reason: ..., // optional
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `changeTenantExpenseApproval()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await changeTenantExpenseApproval(changeTenantExpenseApprovalVars);
// Variables can be defined inline as well.
const { data } = await changeTenantExpenseApproval({ organizationId: ..., id: ..., approvalStatus: ..., reason: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await changeTenantExpenseApproval(dataConnect, changeTenantExpenseApprovalVars);

console.log(data.expense_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
changeTenantExpenseApproval(changeTenantExpenseApprovalVars).then((response) => {
  const data = response.data;
  console.log(data.expense_update);
  console.log(data.auditEvent_insert);
});
```

### Using `ChangeTenantExpenseApproval`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, changeTenantExpenseApprovalRef, ChangeTenantExpenseApprovalVariables } from '@omniretail/sql-connect';

// The `ChangeTenantExpenseApproval` mutation requires an argument of type `ChangeTenantExpenseApprovalVariables`:
const changeTenantExpenseApprovalVars: ChangeTenantExpenseApprovalVariables = {
  organizationId: ..., 
  id: ..., 
  approvalStatus: ..., 
  reason: ..., // optional
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `changeTenantExpenseApprovalRef()` function to get a reference to the mutation.
const ref = changeTenantExpenseApprovalRef(changeTenantExpenseApprovalVars);
// Variables can be defined inline as well.
const ref = changeTenantExpenseApprovalRef({ organizationId: ..., id: ..., approvalStatus: ..., reason: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = changeTenantExpenseApprovalRef(dataConnect, changeTenantExpenseApprovalVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.expense_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.expense_update);
  console.log(data.auditEvent_insert);
});
```

## VoidTenantExpense
You can execute the `VoidTenantExpense` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
voidTenantExpense(vars: VoidTenantExpenseVariables): MutationPromise<VoidTenantExpenseData, VoidTenantExpenseVariables>;

interface VoidTenantExpenseRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: VoidTenantExpenseVariables): MutationRef<VoidTenantExpenseData, VoidTenantExpenseVariables>;
}
export const voidTenantExpenseRef: VoidTenantExpenseRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
voidTenantExpense(dc: DataConnect, vars: VoidTenantExpenseVariables): MutationPromise<VoidTenantExpenseData, VoidTenantExpenseVariables>;

interface VoidTenantExpenseRef {
  ...
  (dc: DataConnect, vars: VoidTenantExpenseVariables): MutationRef<VoidTenantExpenseData, VoidTenantExpenseVariables>;
}
export const voidTenantExpenseRef: VoidTenantExpenseRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the voidTenantExpenseRef:
```typescript
const name = voidTenantExpenseRef.operationName;
console.log(name);
```

### Variables
The `VoidTenantExpense` mutation requires an argument of type `VoidTenantExpenseVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface VoidTenantExpenseVariables {
  organizationId: UUIDString;
  id: UUIDString;
  reason: string;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}
```
### Return Type
Recall that executing the `VoidTenantExpense` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `VoidTenantExpenseData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface VoidTenantExpenseData {
  expense_update?: Expense_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `VoidTenantExpense`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, voidTenantExpense, VoidTenantExpenseVariables } from '@omniretail/sql-connect';

// The `VoidTenantExpense` mutation requires an argument of type `VoidTenantExpenseVariables`:
const voidTenantExpenseVars: VoidTenantExpenseVariables = {
  organizationId: ..., 
  id: ..., 
  reason: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `voidTenantExpense()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await voidTenantExpense(voidTenantExpenseVars);
// Variables can be defined inline as well.
const { data } = await voidTenantExpense({ organizationId: ..., id: ..., reason: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await voidTenantExpense(dataConnect, voidTenantExpenseVars);

console.log(data.expense_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
voidTenantExpense(voidTenantExpenseVars).then((response) => {
  const data = response.data;
  console.log(data.expense_update);
  console.log(data.auditEvent_insert);
});
```

### Using `VoidTenantExpense`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, voidTenantExpenseRef, VoidTenantExpenseVariables } from '@omniretail/sql-connect';

// The `VoidTenantExpense` mutation requires an argument of type `VoidTenantExpenseVariables`:
const voidTenantExpenseVars: VoidTenantExpenseVariables = {
  organizationId: ..., 
  id: ..., 
  reason: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `voidTenantExpenseRef()` function to get a reference to the mutation.
const ref = voidTenantExpenseRef(voidTenantExpenseVars);
// Variables can be defined inline as well.
const ref = voidTenantExpenseRef({ organizationId: ..., id: ..., reason: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = voidTenantExpenseRef(dataConnect, voidTenantExpenseVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.expense_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.expense_update);
  console.log(data.auditEvent_insert);
});
```

## CreateTenantSale
You can execute the `CreateTenantSale` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
createTenantSale(vars: CreateTenantSaleVariables): MutationPromise<CreateTenantSaleData, CreateTenantSaleVariables>;

interface CreateTenantSaleRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTenantSaleVariables): MutationRef<CreateTenantSaleData, CreateTenantSaleVariables>;
}
export const createTenantSaleRef: CreateTenantSaleRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createTenantSale(dc: DataConnect, vars: CreateTenantSaleVariables): MutationPromise<CreateTenantSaleData, CreateTenantSaleVariables>;

interface CreateTenantSaleRef {
  ...
  (dc: DataConnect, vars: CreateTenantSaleVariables): MutationRef<CreateTenantSaleData, CreateTenantSaleVariables>;
}
export const createTenantSaleRef: CreateTenantSaleRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createTenantSaleRef:
```typescript
const name = createTenantSaleRef.operationName;
console.log(name);
```

### Variables
The `CreateTenantSale` mutation requires an argument of type `CreateTenantSaleVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateTenantSaleVariables {
  organizationId: UUIDString;
  outletId: UUIDString;
  receiptNumber: string;
  saleTimestamp: TimestampString;
  customerId?: UUIDString | null;
  customerName: string;
  staffName: string;
  channel?: string | null;
  terminalId: string;
  tenderType: SaleTenderType;
  tax: number;
  discount: number;
  subtotal: number;
  totalNet: number;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}
```
### Return Type
Recall that executing the `CreateTenantSale` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateTenantSaleData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateTenantSaleData {
  sale_insert: Sale_Key;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `CreateTenantSale`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createTenantSale, CreateTenantSaleVariables } from '@omniretail/sql-connect';

// The `CreateTenantSale` mutation requires an argument of type `CreateTenantSaleVariables`:
const createTenantSaleVars: CreateTenantSaleVariables = {
  organizationId: ..., 
  outletId: ..., 
  receiptNumber: ..., 
  saleTimestamp: ..., 
  customerId: ..., // optional
  customerName: ..., 
  staffName: ..., 
  channel: ..., // optional
  terminalId: ..., 
  tenderType: ..., 
  tax: ..., 
  discount: ..., 
  subtotal: ..., 
  totalNet: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `createTenantSale()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createTenantSale(createTenantSaleVars);
// Variables can be defined inline as well.
const { data } = await createTenantSale({ organizationId: ..., outletId: ..., receiptNumber: ..., saleTimestamp: ..., customerId: ..., customerName: ..., staffName: ..., channel: ..., terminalId: ..., tenderType: ..., tax: ..., discount: ..., subtotal: ..., totalNet: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createTenantSale(dataConnect, createTenantSaleVars);

console.log(data.sale_insert);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
createTenantSale(createTenantSaleVars).then((response) => {
  const data = response.data;
  console.log(data.sale_insert);
  console.log(data.auditEvent_insert);
});
```

### Using `CreateTenantSale`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createTenantSaleRef, CreateTenantSaleVariables } from '@omniretail/sql-connect';

// The `CreateTenantSale` mutation requires an argument of type `CreateTenantSaleVariables`:
const createTenantSaleVars: CreateTenantSaleVariables = {
  organizationId: ..., 
  outletId: ..., 
  receiptNumber: ..., 
  saleTimestamp: ..., 
  customerId: ..., // optional
  customerName: ..., 
  staffName: ..., 
  channel: ..., // optional
  terminalId: ..., 
  tenderType: ..., 
  tax: ..., 
  discount: ..., 
  subtotal: ..., 
  totalNet: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `createTenantSaleRef()` function to get a reference to the mutation.
const ref = createTenantSaleRef(createTenantSaleVars);
// Variables can be defined inline as well.
const ref = createTenantSaleRef({ organizationId: ..., outletId: ..., receiptNumber: ..., saleTimestamp: ..., customerId: ..., customerName: ..., staffName: ..., channel: ..., terminalId: ..., tenderType: ..., tax: ..., discount: ..., subtotal: ..., totalNet: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createTenantSaleRef(dataConnect, createTenantSaleVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.sale_insert);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.sale_insert);
  console.log(data.auditEvent_insert);
});
```

## AddTenantSaleLine
You can execute the `AddTenantSaleLine` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
addTenantSaleLine(vars: AddTenantSaleLineVariables): MutationPromise<AddTenantSaleLineData, AddTenantSaleLineVariables>;

interface AddTenantSaleLineRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddTenantSaleLineVariables): MutationRef<AddTenantSaleLineData, AddTenantSaleLineVariables>;
}
export const addTenantSaleLineRef: AddTenantSaleLineRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
addTenantSaleLine(dc: DataConnect, vars: AddTenantSaleLineVariables): MutationPromise<AddTenantSaleLineData, AddTenantSaleLineVariables>;

interface AddTenantSaleLineRef {
  ...
  (dc: DataConnect, vars: AddTenantSaleLineVariables): MutationRef<AddTenantSaleLineData, AddTenantSaleLineVariables>;
}
export const addTenantSaleLineRef: AddTenantSaleLineRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the addTenantSaleLineRef:
```typescript
const name = addTenantSaleLineRef.operationName;
console.log(name);
```

### Variables
The `AddTenantSaleLine` mutation requires an argument of type `AddTenantSaleLineVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AddTenantSaleLineVariables {
  organizationId: UUIDString;
  saleId: UUIDString;
  outletId: UUIDString;
  productId: UUIDString;
  quantity: number;
  newStockQty: number;
  unitPrice: number;
  subtotal: number;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}
```
### Return Type
Recall that executing the `AddTenantSaleLine` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddTenantSaleLineData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AddTenantSaleLineData {
  saleLine_insert: SaleLine_Key;
  inventoryStock_update?: InventoryStock_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `AddTenantSaleLine`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addTenantSaleLine, AddTenantSaleLineVariables } from '@omniretail/sql-connect';

// The `AddTenantSaleLine` mutation requires an argument of type `AddTenantSaleLineVariables`:
const addTenantSaleLineVars: AddTenantSaleLineVariables = {
  organizationId: ..., 
  saleId: ..., 
  outletId: ..., 
  productId: ..., 
  quantity: ..., 
  newStockQty: ..., 
  unitPrice: ..., 
  subtotal: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `addTenantSaleLine()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addTenantSaleLine(addTenantSaleLineVars);
// Variables can be defined inline as well.
const { data } = await addTenantSaleLine({ organizationId: ..., saleId: ..., outletId: ..., productId: ..., quantity: ..., newStockQty: ..., unitPrice: ..., subtotal: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addTenantSaleLine(dataConnect, addTenantSaleLineVars);

console.log(data.saleLine_insert);
console.log(data.inventoryStock_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
addTenantSaleLine(addTenantSaleLineVars).then((response) => {
  const data = response.data;
  console.log(data.saleLine_insert);
  console.log(data.inventoryStock_update);
  console.log(data.auditEvent_insert);
});
```

### Using `AddTenantSaleLine`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addTenantSaleLineRef, AddTenantSaleLineVariables } from '@omniretail/sql-connect';

// The `AddTenantSaleLine` mutation requires an argument of type `AddTenantSaleLineVariables`:
const addTenantSaleLineVars: AddTenantSaleLineVariables = {
  organizationId: ..., 
  saleId: ..., 
  outletId: ..., 
  productId: ..., 
  quantity: ..., 
  newStockQty: ..., 
  unitPrice: ..., 
  subtotal: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `addTenantSaleLineRef()` function to get a reference to the mutation.
const ref = addTenantSaleLineRef(addTenantSaleLineVars);
// Variables can be defined inline as well.
const ref = addTenantSaleLineRef({ organizationId: ..., saleId: ..., outletId: ..., productId: ..., quantity: ..., newStockQty: ..., unitPrice: ..., subtotal: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addTenantSaleLineRef(dataConnect, addTenantSaleLineVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.saleLine_insert);
console.log(data.inventoryStock_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.saleLine_insert);
  console.log(data.inventoryStock_update);
  console.log(data.auditEvent_insert);
});
```

## VoidTenantSale
You can execute the `VoidTenantSale` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
voidTenantSale(vars: VoidTenantSaleVariables): MutationPromise<VoidTenantSaleData, VoidTenantSaleVariables>;

interface VoidTenantSaleRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: VoidTenantSaleVariables): MutationRef<VoidTenantSaleData, VoidTenantSaleVariables>;
}
export const voidTenantSaleRef: VoidTenantSaleRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
voidTenantSale(dc: DataConnect, vars: VoidTenantSaleVariables): MutationPromise<VoidTenantSaleData, VoidTenantSaleVariables>;

interface VoidTenantSaleRef {
  ...
  (dc: DataConnect, vars: VoidTenantSaleVariables): MutationRef<VoidTenantSaleData, VoidTenantSaleVariables>;
}
export const voidTenantSaleRef: VoidTenantSaleRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the voidTenantSaleRef:
```typescript
const name = voidTenantSaleRef.operationName;
console.log(name);
```

### Variables
The `VoidTenantSale` mutation requires an argument of type `VoidTenantSaleVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface VoidTenantSaleVariables {
  organizationId: UUIDString;
  saleId: UUIDString;
  reason: string;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}
```
### Return Type
Recall that executing the `VoidTenantSale` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `VoidTenantSaleData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface VoidTenantSaleData {
  sale_update?: Sale_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `VoidTenantSale`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, voidTenantSale, VoidTenantSaleVariables } from '@omniretail/sql-connect';

// The `VoidTenantSale` mutation requires an argument of type `VoidTenantSaleVariables`:
const voidTenantSaleVars: VoidTenantSaleVariables = {
  organizationId: ..., 
  saleId: ..., 
  reason: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `voidTenantSale()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await voidTenantSale(voidTenantSaleVars);
// Variables can be defined inline as well.
const { data } = await voidTenantSale({ organizationId: ..., saleId: ..., reason: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await voidTenantSale(dataConnect, voidTenantSaleVars);

console.log(data.sale_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
voidTenantSale(voidTenantSaleVars).then((response) => {
  const data = response.data;
  console.log(data.sale_update);
  console.log(data.auditEvent_insert);
});
```

### Using `VoidTenantSale`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, voidTenantSaleRef, VoidTenantSaleVariables } from '@omniretail/sql-connect';

// The `VoidTenantSale` mutation requires an argument of type `VoidTenantSaleVariables`:
const voidTenantSaleVars: VoidTenantSaleVariables = {
  organizationId: ..., 
  saleId: ..., 
  reason: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `voidTenantSaleRef()` function to get a reference to the mutation.
const ref = voidTenantSaleRef(voidTenantSaleVars);
// Variables can be defined inline as well.
const ref = voidTenantSaleRef({ organizationId: ..., saleId: ..., reason: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = voidTenantSaleRef(dataConnect, voidTenantSaleVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.sale_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.sale_update);
  console.log(data.auditEvent_insert);
});
```

## CreateTenantPurchase
You can execute the `CreateTenantPurchase` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
createTenantPurchase(vars: CreateTenantPurchaseVariables): MutationPromise<CreateTenantPurchaseData, CreateTenantPurchaseVariables>;

interface CreateTenantPurchaseRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTenantPurchaseVariables): MutationRef<CreateTenantPurchaseData, CreateTenantPurchaseVariables>;
}
export const createTenantPurchaseRef: CreateTenantPurchaseRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createTenantPurchase(dc: DataConnect, vars: CreateTenantPurchaseVariables): MutationPromise<CreateTenantPurchaseData, CreateTenantPurchaseVariables>;

interface CreateTenantPurchaseRef {
  ...
  (dc: DataConnect, vars: CreateTenantPurchaseVariables): MutationRef<CreateTenantPurchaseData, CreateTenantPurchaseVariables>;
}
export const createTenantPurchaseRef: CreateTenantPurchaseRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createTenantPurchaseRef:
```typescript
const name = createTenantPurchaseRef.operationName;
console.log(name);
```

### Variables
The `CreateTenantPurchase` mutation requires an argument of type `CreateTenantPurchaseVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateTenantPurchaseVariables {
  organizationId: UUIDString;
  purchaseNumber: string;
  purchaseDate: DateString;
  supplierId: UUIDString;
  outletId?: UUIDString | null;
  scope: string;
  paymentTerms?: string | null;
  subtotal: number;
  shippingFee: number;
  handlingFee: number;
  tax: number;
  totalAmount: number;
  amountPaid: number;
  outstandingAmount: number;
  paymentStatus: PurchasePaymentStatus;
  receiptStatus: PurchaseReceiptStatus;
  status: PurchaseStatus;
  createdBy: string;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}
```
### Return Type
Recall that executing the `CreateTenantPurchase` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateTenantPurchaseData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateTenantPurchaseData {
  purchase_insert: Purchase_Key;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `CreateTenantPurchase`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createTenantPurchase, CreateTenantPurchaseVariables } from '@omniretail/sql-connect';

// The `CreateTenantPurchase` mutation requires an argument of type `CreateTenantPurchaseVariables`:
const createTenantPurchaseVars: CreateTenantPurchaseVariables = {
  organizationId: ..., 
  purchaseNumber: ..., 
  purchaseDate: ..., 
  supplierId: ..., 
  outletId: ..., // optional
  scope: ..., 
  paymentTerms: ..., // optional
  subtotal: ..., 
  shippingFee: ..., 
  handlingFee: ..., 
  tax: ..., 
  totalAmount: ..., 
  amountPaid: ..., 
  outstandingAmount: ..., 
  paymentStatus: ..., 
  receiptStatus: ..., 
  status: ..., 
  createdBy: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `createTenantPurchase()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createTenantPurchase(createTenantPurchaseVars);
// Variables can be defined inline as well.
const { data } = await createTenantPurchase({ organizationId: ..., purchaseNumber: ..., purchaseDate: ..., supplierId: ..., outletId: ..., scope: ..., paymentTerms: ..., subtotal: ..., shippingFee: ..., handlingFee: ..., tax: ..., totalAmount: ..., amountPaid: ..., outstandingAmount: ..., paymentStatus: ..., receiptStatus: ..., status: ..., createdBy: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createTenantPurchase(dataConnect, createTenantPurchaseVars);

console.log(data.purchase_insert);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
createTenantPurchase(createTenantPurchaseVars).then((response) => {
  const data = response.data;
  console.log(data.purchase_insert);
  console.log(data.auditEvent_insert);
});
```

### Using `CreateTenantPurchase`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createTenantPurchaseRef, CreateTenantPurchaseVariables } from '@omniretail/sql-connect';

// The `CreateTenantPurchase` mutation requires an argument of type `CreateTenantPurchaseVariables`:
const createTenantPurchaseVars: CreateTenantPurchaseVariables = {
  organizationId: ..., 
  purchaseNumber: ..., 
  purchaseDate: ..., 
  supplierId: ..., 
  outletId: ..., // optional
  scope: ..., 
  paymentTerms: ..., // optional
  subtotal: ..., 
  shippingFee: ..., 
  handlingFee: ..., 
  tax: ..., 
  totalAmount: ..., 
  amountPaid: ..., 
  outstandingAmount: ..., 
  paymentStatus: ..., 
  receiptStatus: ..., 
  status: ..., 
  createdBy: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `createTenantPurchaseRef()` function to get a reference to the mutation.
const ref = createTenantPurchaseRef(createTenantPurchaseVars);
// Variables can be defined inline as well.
const ref = createTenantPurchaseRef({ organizationId: ..., purchaseNumber: ..., purchaseDate: ..., supplierId: ..., outletId: ..., scope: ..., paymentTerms: ..., subtotal: ..., shippingFee: ..., handlingFee: ..., tax: ..., totalAmount: ..., amountPaid: ..., outstandingAmount: ..., paymentStatus: ..., receiptStatus: ..., status: ..., createdBy: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createTenantPurchaseRef(dataConnect, createTenantPurchaseVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.purchase_insert);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.purchase_insert);
  console.log(data.auditEvent_insert);
});
```

## CreateTenantPurchaseLine
You can execute the `CreateTenantPurchaseLine` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
createTenantPurchaseLine(vars: CreateTenantPurchaseLineVariables): MutationPromise<CreateTenantPurchaseLineData, CreateTenantPurchaseLineVariables>;

interface CreateTenantPurchaseLineRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTenantPurchaseLineVariables): MutationRef<CreateTenantPurchaseLineData, CreateTenantPurchaseLineVariables>;
}
export const createTenantPurchaseLineRef: CreateTenantPurchaseLineRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createTenantPurchaseLine(dc: DataConnect, vars: CreateTenantPurchaseLineVariables): MutationPromise<CreateTenantPurchaseLineData, CreateTenantPurchaseLineVariables>;

interface CreateTenantPurchaseLineRef {
  ...
  (dc: DataConnect, vars: CreateTenantPurchaseLineVariables): MutationRef<CreateTenantPurchaseLineData, CreateTenantPurchaseLineVariables>;
}
export const createTenantPurchaseLineRef: CreateTenantPurchaseLineRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createTenantPurchaseLineRef:
```typescript
const name = createTenantPurchaseLineRef.operationName;
console.log(name);
```

### Variables
The `CreateTenantPurchaseLine` mutation requires an argument of type `CreateTenantPurchaseLineVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateTenantPurchaseLineVariables {
  organizationId: UUIDString;
  purchaseId: UUIDString;
  productId: UUIDString;
  quantityOrdered: number;
  unitCost: number;
  discountPercent: number;
  taxRate: number;
  taxAmount: number;
  lineTotal: number;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}
```
### Return Type
Recall that executing the `CreateTenantPurchaseLine` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateTenantPurchaseLineData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateTenantPurchaseLineData {
  purchaseLine_insert: PurchaseLine_Key;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `CreateTenantPurchaseLine`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createTenantPurchaseLine, CreateTenantPurchaseLineVariables } from '@omniretail/sql-connect';

// The `CreateTenantPurchaseLine` mutation requires an argument of type `CreateTenantPurchaseLineVariables`:
const createTenantPurchaseLineVars: CreateTenantPurchaseLineVariables = {
  organizationId: ..., 
  purchaseId: ..., 
  productId: ..., 
  quantityOrdered: ..., 
  unitCost: ..., 
  discountPercent: ..., 
  taxRate: ..., 
  taxAmount: ..., 
  lineTotal: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `createTenantPurchaseLine()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createTenantPurchaseLine(createTenantPurchaseLineVars);
// Variables can be defined inline as well.
const { data } = await createTenantPurchaseLine({ organizationId: ..., purchaseId: ..., productId: ..., quantityOrdered: ..., unitCost: ..., discountPercent: ..., taxRate: ..., taxAmount: ..., lineTotal: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createTenantPurchaseLine(dataConnect, createTenantPurchaseLineVars);

console.log(data.purchaseLine_insert);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
createTenantPurchaseLine(createTenantPurchaseLineVars).then((response) => {
  const data = response.data;
  console.log(data.purchaseLine_insert);
  console.log(data.auditEvent_insert);
});
```

### Using `CreateTenantPurchaseLine`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createTenantPurchaseLineRef, CreateTenantPurchaseLineVariables } from '@omniretail/sql-connect';

// The `CreateTenantPurchaseLine` mutation requires an argument of type `CreateTenantPurchaseLineVariables`:
const createTenantPurchaseLineVars: CreateTenantPurchaseLineVariables = {
  organizationId: ..., 
  purchaseId: ..., 
  productId: ..., 
  quantityOrdered: ..., 
  unitCost: ..., 
  discountPercent: ..., 
  taxRate: ..., 
  taxAmount: ..., 
  lineTotal: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `createTenantPurchaseLineRef()` function to get a reference to the mutation.
const ref = createTenantPurchaseLineRef(createTenantPurchaseLineVars);
// Variables can be defined inline as well.
const ref = createTenantPurchaseLineRef({ organizationId: ..., purchaseId: ..., productId: ..., quantityOrdered: ..., unitCost: ..., discountPercent: ..., taxRate: ..., taxAmount: ..., lineTotal: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createTenantPurchaseLineRef(dataConnect, createTenantPurchaseLineVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.purchaseLine_insert);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.purchaseLine_insert);
  console.log(data.auditEvent_insert);
});
```

## ChangeTenantPurchaseStatus
You can execute the `ChangeTenantPurchaseStatus` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
changeTenantPurchaseStatus(vars: ChangeTenantPurchaseStatusVariables): MutationPromise<ChangeTenantPurchaseStatusData, ChangeTenantPurchaseStatusVariables>;

interface ChangeTenantPurchaseStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ChangeTenantPurchaseStatusVariables): MutationRef<ChangeTenantPurchaseStatusData, ChangeTenantPurchaseStatusVariables>;
}
export const changeTenantPurchaseStatusRef: ChangeTenantPurchaseStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
changeTenantPurchaseStatus(dc: DataConnect, vars: ChangeTenantPurchaseStatusVariables): MutationPromise<ChangeTenantPurchaseStatusData, ChangeTenantPurchaseStatusVariables>;

interface ChangeTenantPurchaseStatusRef {
  ...
  (dc: DataConnect, vars: ChangeTenantPurchaseStatusVariables): MutationRef<ChangeTenantPurchaseStatusData, ChangeTenantPurchaseStatusVariables>;
}
export const changeTenantPurchaseStatusRef: ChangeTenantPurchaseStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the changeTenantPurchaseStatusRef:
```typescript
const name = changeTenantPurchaseStatusRef.operationName;
console.log(name);
```

### Variables
The `ChangeTenantPurchaseStatus` mutation requires an argument of type `ChangeTenantPurchaseStatusVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ChangeTenantPurchaseStatusVariables {
  organizationId: UUIDString;
  id: UUIDString;
  status: PurchaseStatus;
  reason?: string | null;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}
```
### Return Type
Recall that executing the `ChangeTenantPurchaseStatus` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ChangeTenantPurchaseStatusData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ChangeTenantPurchaseStatusData {
  purchase_update?: Purchase_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `ChangeTenantPurchaseStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, changeTenantPurchaseStatus, ChangeTenantPurchaseStatusVariables } from '@omniretail/sql-connect';

// The `ChangeTenantPurchaseStatus` mutation requires an argument of type `ChangeTenantPurchaseStatusVariables`:
const changeTenantPurchaseStatusVars: ChangeTenantPurchaseStatusVariables = {
  organizationId: ..., 
  id: ..., 
  status: ..., 
  reason: ..., // optional
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `changeTenantPurchaseStatus()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await changeTenantPurchaseStatus(changeTenantPurchaseStatusVars);
// Variables can be defined inline as well.
const { data } = await changeTenantPurchaseStatus({ organizationId: ..., id: ..., status: ..., reason: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await changeTenantPurchaseStatus(dataConnect, changeTenantPurchaseStatusVars);

console.log(data.purchase_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
changeTenantPurchaseStatus(changeTenantPurchaseStatusVars).then((response) => {
  const data = response.data;
  console.log(data.purchase_update);
  console.log(data.auditEvent_insert);
});
```

### Using `ChangeTenantPurchaseStatus`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, changeTenantPurchaseStatusRef, ChangeTenantPurchaseStatusVariables } from '@omniretail/sql-connect';

// The `ChangeTenantPurchaseStatus` mutation requires an argument of type `ChangeTenantPurchaseStatusVariables`:
const changeTenantPurchaseStatusVars: ChangeTenantPurchaseStatusVariables = {
  organizationId: ..., 
  id: ..., 
  status: ..., 
  reason: ..., // optional
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `changeTenantPurchaseStatusRef()` function to get a reference to the mutation.
const ref = changeTenantPurchaseStatusRef(changeTenantPurchaseStatusVars);
// Variables can be defined inline as well.
const ref = changeTenantPurchaseStatusRef({ organizationId: ..., id: ..., status: ..., reason: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = changeTenantPurchaseStatusRef(dataConnect, changeTenantPurchaseStatusVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.purchase_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.purchase_update);
  console.log(data.auditEvent_insert);
});
```

## ReceiveTenantPurchaseLine
You can execute the `ReceiveTenantPurchaseLine` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
receiveTenantPurchaseLine(vars: ReceiveTenantPurchaseLineVariables): MutationPromise<ReceiveTenantPurchaseLineData, ReceiveTenantPurchaseLineVariables>;

interface ReceiveTenantPurchaseLineRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ReceiveTenantPurchaseLineVariables): MutationRef<ReceiveTenantPurchaseLineData, ReceiveTenantPurchaseLineVariables>;
}
export const receiveTenantPurchaseLineRef: ReceiveTenantPurchaseLineRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
receiveTenantPurchaseLine(dc: DataConnect, vars: ReceiveTenantPurchaseLineVariables): MutationPromise<ReceiveTenantPurchaseLineData, ReceiveTenantPurchaseLineVariables>;

interface ReceiveTenantPurchaseLineRef {
  ...
  (dc: DataConnect, vars: ReceiveTenantPurchaseLineVariables): MutationRef<ReceiveTenantPurchaseLineData, ReceiveTenantPurchaseLineVariables>;
}
export const receiveTenantPurchaseLineRef: ReceiveTenantPurchaseLineRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the receiveTenantPurchaseLineRef:
```typescript
const name = receiveTenantPurchaseLineRef.operationName;
console.log(name);
```

### Variables
The `ReceiveTenantPurchaseLine` mutation requires an argument of type `ReceiveTenantPurchaseLineVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ReceiveTenantPurchaseLineVariables {
  organizationId: UUIDString;
  purchaseId: UUIDString;
  lineId: UUIDString;
  outletId: UUIDString;
  productId: UUIDString;
  quantityReceived: number;
  newStockQty: number;
  receiptStatus: PurchaseReceiptStatus;
  batchNumber?: string | null;
  mfgDate?: DateString | null;
  expiryDate?: DateString | null;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}
```
### Return Type
Recall that executing the `ReceiveTenantPurchaseLine` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ReceiveTenantPurchaseLineData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ReceiveTenantPurchaseLineData {
  purchaseLine_update?: PurchaseLine_Key | null;
  purchase_update?: Purchase_Key | null;
  inventoryStock_update?: InventoryStock_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `ReceiveTenantPurchaseLine`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, receiveTenantPurchaseLine, ReceiveTenantPurchaseLineVariables } from '@omniretail/sql-connect';

// The `ReceiveTenantPurchaseLine` mutation requires an argument of type `ReceiveTenantPurchaseLineVariables`:
const receiveTenantPurchaseLineVars: ReceiveTenantPurchaseLineVariables = {
  organizationId: ..., 
  purchaseId: ..., 
  lineId: ..., 
  outletId: ..., 
  productId: ..., 
  quantityReceived: ..., 
  newStockQty: ..., 
  receiptStatus: ..., 
  batchNumber: ..., // optional
  mfgDate: ..., // optional
  expiryDate: ..., // optional
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `receiveTenantPurchaseLine()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await receiveTenantPurchaseLine(receiveTenantPurchaseLineVars);
// Variables can be defined inline as well.
const { data } = await receiveTenantPurchaseLine({ organizationId: ..., purchaseId: ..., lineId: ..., outletId: ..., productId: ..., quantityReceived: ..., newStockQty: ..., receiptStatus: ..., batchNumber: ..., mfgDate: ..., expiryDate: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await receiveTenantPurchaseLine(dataConnect, receiveTenantPurchaseLineVars);

console.log(data.purchaseLine_update);
console.log(data.purchase_update);
console.log(data.inventoryStock_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
receiveTenantPurchaseLine(receiveTenantPurchaseLineVars).then((response) => {
  const data = response.data;
  console.log(data.purchaseLine_update);
  console.log(data.purchase_update);
  console.log(data.inventoryStock_update);
  console.log(data.auditEvent_insert);
});
```

### Using `ReceiveTenantPurchaseLine`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, receiveTenantPurchaseLineRef, ReceiveTenantPurchaseLineVariables } from '@omniretail/sql-connect';

// The `ReceiveTenantPurchaseLine` mutation requires an argument of type `ReceiveTenantPurchaseLineVariables`:
const receiveTenantPurchaseLineVars: ReceiveTenantPurchaseLineVariables = {
  organizationId: ..., 
  purchaseId: ..., 
  lineId: ..., 
  outletId: ..., 
  productId: ..., 
  quantityReceived: ..., 
  newStockQty: ..., 
  receiptStatus: ..., 
  batchNumber: ..., // optional
  mfgDate: ..., // optional
  expiryDate: ..., // optional
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `receiveTenantPurchaseLineRef()` function to get a reference to the mutation.
const ref = receiveTenantPurchaseLineRef(receiveTenantPurchaseLineVars);
// Variables can be defined inline as well.
const ref = receiveTenantPurchaseLineRef({ organizationId: ..., purchaseId: ..., lineId: ..., outletId: ..., productId: ..., quantityReceived: ..., newStockQty: ..., receiptStatus: ..., batchNumber: ..., mfgDate: ..., expiryDate: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = receiveTenantPurchaseLineRef(dataConnect, receiveTenantPurchaseLineVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.purchaseLine_update);
console.log(data.purchase_update);
console.log(data.inventoryStock_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.purchaseLine_update);
  console.log(data.purchase_update);
  console.log(data.inventoryStock_update);
  console.log(data.auditEvent_insert);
});
```

## CreateTenantSupplier
You can execute the `CreateTenantSupplier` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
createTenantSupplier(vars: CreateTenantSupplierVariables): MutationPromise<CreateTenantSupplierData, CreateTenantSupplierVariables>;

interface CreateTenantSupplierRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTenantSupplierVariables): MutationRef<CreateTenantSupplierData, CreateTenantSupplierVariables>;
}
export const createTenantSupplierRef: CreateTenantSupplierRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createTenantSupplier(dc: DataConnect, vars: CreateTenantSupplierVariables): MutationPromise<CreateTenantSupplierData, CreateTenantSupplierVariables>;

interface CreateTenantSupplierRef {
  ...
  (dc: DataConnect, vars: CreateTenantSupplierVariables): MutationRef<CreateTenantSupplierData, CreateTenantSupplierVariables>;
}
export const createTenantSupplierRef: CreateTenantSupplierRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createTenantSupplierRef:
```typescript
const name = createTenantSupplierRef.operationName;
console.log(name);
```

### Variables
The `CreateTenantSupplier` mutation requires an argument of type `CreateTenantSupplierVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateTenantSupplierVariables {
  id: UUIDString;
  organizationId: UUIDString;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  taxId: string;
  address?: string | null;
  city: string;
  state?: string | null;
  postalCode?: string | null;
  country?: string | null;
  category: string;
  paymentTerms: string;
  creditLimit: number;
  notes?: string | null;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}
```
### Return Type
Recall that executing the `CreateTenantSupplier` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateTenantSupplierData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateTenantSupplierData {
  supplier_insert: Supplier_Key;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `CreateTenantSupplier`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createTenantSupplier, CreateTenantSupplierVariables } from '@omniretail/sql-connect';

// The `CreateTenantSupplier` mutation requires an argument of type `CreateTenantSupplierVariables`:
const createTenantSupplierVars: CreateTenantSupplierVariables = {
  id: ..., 
  organizationId: ..., 
  name: ..., 
  contactPerson: ..., 
  phone: ..., 
  email: ..., 
  taxId: ..., 
  address: ..., // optional
  city: ..., 
  state: ..., // optional
  postalCode: ..., // optional
  country: ..., // optional
  category: ..., 
  paymentTerms: ..., 
  creditLimit: ..., 
  notes: ..., // optional
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `createTenantSupplier()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createTenantSupplier(createTenantSupplierVars);
// Variables can be defined inline as well.
const { data } = await createTenantSupplier({ id: ..., organizationId: ..., name: ..., contactPerson: ..., phone: ..., email: ..., taxId: ..., address: ..., city: ..., state: ..., postalCode: ..., country: ..., category: ..., paymentTerms: ..., creditLimit: ..., notes: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createTenantSupplier(dataConnect, createTenantSupplierVars);

console.log(data.supplier_insert);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
createTenantSupplier(createTenantSupplierVars).then((response) => {
  const data = response.data;
  console.log(data.supplier_insert);
  console.log(data.auditEvent_insert);
});
```

### Using `CreateTenantSupplier`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createTenantSupplierRef, CreateTenantSupplierVariables } from '@omniretail/sql-connect';

// The `CreateTenantSupplier` mutation requires an argument of type `CreateTenantSupplierVariables`:
const createTenantSupplierVars: CreateTenantSupplierVariables = {
  id: ..., 
  organizationId: ..., 
  name: ..., 
  contactPerson: ..., 
  phone: ..., 
  email: ..., 
  taxId: ..., 
  address: ..., // optional
  city: ..., 
  state: ..., // optional
  postalCode: ..., // optional
  country: ..., // optional
  category: ..., 
  paymentTerms: ..., 
  creditLimit: ..., 
  notes: ..., // optional
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `createTenantSupplierRef()` function to get a reference to the mutation.
const ref = createTenantSupplierRef(createTenantSupplierVars);
// Variables can be defined inline as well.
const ref = createTenantSupplierRef({ id: ..., organizationId: ..., name: ..., contactPerson: ..., phone: ..., email: ..., taxId: ..., address: ..., city: ..., state: ..., postalCode: ..., country: ..., category: ..., paymentTerms: ..., creditLimit: ..., notes: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createTenantSupplierRef(dataConnect, createTenantSupplierVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.supplier_insert);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.supplier_insert);
  console.log(data.auditEvent_insert);
});
```

## UpdateTenantSupplier
You can execute the `UpdateTenantSupplier` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
updateTenantSupplier(vars: UpdateTenantSupplierVariables): MutationPromise<UpdateTenantSupplierData, UpdateTenantSupplierVariables>;

interface UpdateTenantSupplierRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTenantSupplierVariables): MutationRef<UpdateTenantSupplierData, UpdateTenantSupplierVariables>;
}
export const updateTenantSupplierRef: UpdateTenantSupplierRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateTenantSupplier(dc: DataConnect, vars: UpdateTenantSupplierVariables): MutationPromise<UpdateTenantSupplierData, UpdateTenantSupplierVariables>;

interface UpdateTenantSupplierRef {
  ...
  (dc: DataConnect, vars: UpdateTenantSupplierVariables): MutationRef<UpdateTenantSupplierData, UpdateTenantSupplierVariables>;
}
export const updateTenantSupplierRef: UpdateTenantSupplierRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateTenantSupplierRef:
```typescript
const name = updateTenantSupplierRef.operationName;
console.log(name);
```

### Variables
The `UpdateTenantSupplier` mutation requires an argument of type `UpdateTenantSupplierVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateTenantSupplierVariables {
  organizationId: UUIDString;
  id: UUIDString;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  taxId: string;
  address?: string | null;
  city: string;
  state?: string | null;
  postalCode?: string | null;
  country?: string | null;
  category: string;
  paymentTerms: string;
  creditLimit: number;
  notes?: string | null;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}
```
### Return Type
Recall that executing the `UpdateTenantSupplier` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateTenantSupplierData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateTenantSupplierData {
  supplier_update?: Supplier_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `UpdateTenantSupplier`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateTenantSupplier, UpdateTenantSupplierVariables } from '@omniretail/sql-connect';

// The `UpdateTenantSupplier` mutation requires an argument of type `UpdateTenantSupplierVariables`:
const updateTenantSupplierVars: UpdateTenantSupplierVariables = {
  organizationId: ..., 
  id: ..., 
  name: ..., 
  contactPerson: ..., 
  phone: ..., 
  email: ..., 
  taxId: ..., 
  address: ..., // optional
  city: ..., 
  state: ..., // optional
  postalCode: ..., // optional
  country: ..., // optional
  category: ..., 
  paymentTerms: ..., 
  creditLimit: ..., 
  notes: ..., // optional
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `updateTenantSupplier()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateTenantSupplier(updateTenantSupplierVars);
// Variables can be defined inline as well.
const { data } = await updateTenantSupplier({ organizationId: ..., id: ..., name: ..., contactPerson: ..., phone: ..., email: ..., taxId: ..., address: ..., city: ..., state: ..., postalCode: ..., country: ..., category: ..., paymentTerms: ..., creditLimit: ..., notes: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateTenantSupplier(dataConnect, updateTenantSupplierVars);

console.log(data.supplier_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
updateTenantSupplier(updateTenantSupplierVars).then((response) => {
  const data = response.data;
  console.log(data.supplier_update);
  console.log(data.auditEvent_insert);
});
```

### Using `UpdateTenantSupplier`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateTenantSupplierRef, UpdateTenantSupplierVariables } from '@omniretail/sql-connect';

// The `UpdateTenantSupplier` mutation requires an argument of type `UpdateTenantSupplierVariables`:
const updateTenantSupplierVars: UpdateTenantSupplierVariables = {
  organizationId: ..., 
  id: ..., 
  name: ..., 
  contactPerson: ..., 
  phone: ..., 
  email: ..., 
  taxId: ..., 
  address: ..., // optional
  city: ..., 
  state: ..., // optional
  postalCode: ..., // optional
  country: ..., // optional
  category: ..., 
  paymentTerms: ..., 
  creditLimit: ..., 
  notes: ..., // optional
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `updateTenantSupplierRef()` function to get a reference to the mutation.
const ref = updateTenantSupplierRef(updateTenantSupplierVars);
// Variables can be defined inline as well.
const ref = updateTenantSupplierRef({ organizationId: ..., id: ..., name: ..., contactPerson: ..., phone: ..., email: ..., taxId: ..., address: ..., city: ..., state: ..., postalCode: ..., country: ..., category: ..., paymentTerms: ..., creditLimit: ..., notes: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateTenantSupplierRef(dataConnect, updateTenantSupplierVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.supplier_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.supplier_update);
  console.log(data.auditEvent_insert);
});
```

## ChangeTenantSupplierStatus
You can execute the `ChangeTenantSupplierStatus` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
changeTenantSupplierStatus(vars: ChangeTenantSupplierStatusVariables): MutationPromise<ChangeTenantSupplierStatusData, ChangeTenantSupplierStatusVariables>;

interface ChangeTenantSupplierStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ChangeTenantSupplierStatusVariables): MutationRef<ChangeTenantSupplierStatusData, ChangeTenantSupplierStatusVariables>;
}
export const changeTenantSupplierStatusRef: ChangeTenantSupplierStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
changeTenantSupplierStatus(dc: DataConnect, vars: ChangeTenantSupplierStatusVariables): MutationPromise<ChangeTenantSupplierStatusData, ChangeTenantSupplierStatusVariables>;

interface ChangeTenantSupplierStatusRef {
  ...
  (dc: DataConnect, vars: ChangeTenantSupplierStatusVariables): MutationRef<ChangeTenantSupplierStatusData, ChangeTenantSupplierStatusVariables>;
}
export const changeTenantSupplierStatusRef: ChangeTenantSupplierStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the changeTenantSupplierStatusRef:
```typescript
const name = changeTenantSupplierStatusRef.operationName;
console.log(name);
```

### Variables
The `ChangeTenantSupplierStatus` mutation requires an argument of type `ChangeTenantSupplierStatusVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ChangeTenantSupplierStatusVariables {
  organizationId: UUIDString;
  id: UUIDString;
  status: SupplierStatus;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}
```
### Return Type
Recall that executing the `ChangeTenantSupplierStatus` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ChangeTenantSupplierStatusData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ChangeTenantSupplierStatusData {
  supplier_update?: Supplier_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `ChangeTenantSupplierStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, changeTenantSupplierStatus, ChangeTenantSupplierStatusVariables } from '@omniretail/sql-connect';

// The `ChangeTenantSupplierStatus` mutation requires an argument of type `ChangeTenantSupplierStatusVariables`:
const changeTenantSupplierStatusVars: ChangeTenantSupplierStatusVariables = {
  organizationId: ..., 
  id: ..., 
  status: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `changeTenantSupplierStatus()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await changeTenantSupplierStatus(changeTenantSupplierStatusVars);
// Variables can be defined inline as well.
const { data } = await changeTenantSupplierStatus({ organizationId: ..., id: ..., status: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await changeTenantSupplierStatus(dataConnect, changeTenantSupplierStatusVars);

console.log(data.supplier_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
changeTenantSupplierStatus(changeTenantSupplierStatusVars).then((response) => {
  const data = response.data;
  console.log(data.supplier_update);
  console.log(data.auditEvent_insert);
});
```

### Using `ChangeTenantSupplierStatus`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, changeTenantSupplierStatusRef, ChangeTenantSupplierStatusVariables } from '@omniretail/sql-connect';

// The `ChangeTenantSupplierStatus` mutation requires an argument of type `ChangeTenantSupplierStatusVariables`:
const changeTenantSupplierStatusVars: ChangeTenantSupplierStatusVariables = {
  organizationId: ..., 
  id: ..., 
  status: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `changeTenantSupplierStatusRef()` function to get a reference to the mutation.
const ref = changeTenantSupplierStatusRef(changeTenantSupplierStatusVars);
// Variables can be defined inline as well.
const ref = changeTenantSupplierStatusRef({ organizationId: ..., id: ..., status: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = changeTenantSupplierStatusRef(dataConnect, changeTenantSupplierStatusVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.supplier_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.supplier_update);
  console.log(data.auditEvent_insert);
});
```

## CreateTenantCustomer
You can execute the `CreateTenantCustomer` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
createTenantCustomer(vars: CreateTenantCustomerVariables): MutationPromise<CreateTenantCustomerData, CreateTenantCustomerVariables>;

interface CreateTenantCustomerRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTenantCustomerVariables): MutationRef<CreateTenantCustomerData, CreateTenantCustomerVariables>;
}
export const createTenantCustomerRef: CreateTenantCustomerRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createTenantCustomer(dc: DataConnect, vars: CreateTenantCustomerVariables): MutationPromise<CreateTenantCustomerData, CreateTenantCustomerVariables>;

interface CreateTenantCustomerRef {
  ...
  (dc: DataConnect, vars: CreateTenantCustomerVariables): MutationRef<CreateTenantCustomerData, CreateTenantCustomerVariables>;
}
export const createTenantCustomerRef: CreateTenantCustomerRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createTenantCustomerRef:
```typescript
const name = createTenantCustomerRef.operationName;
console.log(name);
```

### Variables
The `CreateTenantCustomer` mutation requires an argument of type `CreateTenantCustomerVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateTenantCustomerVariables {
  id: UUIDString;
  organizationId: UUIDString;
  type: CustomerType;
  name: string;
  phone: string;
  email: string;
  taxId?: string | null;
  address?: string | null;
  city: string;
  state: string;
  postalCode?: string | null;
  country?: string | null;
  creditLimit?: number | null;
  preferredContact?: string | null;
  dateOfBirth?: DateString | null;
  gender?: string | null;
  notes?: string | null;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}
```
### Return Type
Recall that executing the `CreateTenantCustomer` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateTenantCustomerData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateTenantCustomerData {
  customer_insert: Customer_Key;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `CreateTenantCustomer`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createTenantCustomer, CreateTenantCustomerVariables } from '@omniretail/sql-connect';

// The `CreateTenantCustomer` mutation requires an argument of type `CreateTenantCustomerVariables`:
const createTenantCustomerVars: CreateTenantCustomerVariables = {
  id: ..., 
  organizationId: ..., 
  type: ..., 
  name: ..., 
  phone: ..., 
  email: ..., 
  taxId: ..., // optional
  address: ..., // optional
  city: ..., 
  state: ..., 
  postalCode: ..., // optional
  country: ..., // optional
  creditLimit: ..., // optional
  preferredContact: ..., // optional
  dateOfBirth: ..., // optional
  gender: ..., // optional
  notes: ..., // optional
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `createTenantCustomer()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createTenantCustomer(createTenantCustomerVars);
// Variables can be defined inline as well.
const { data } = await createTenantCustomer({ id: ..., organizationId: ..., type: ..., name: ..., phone: ..., email: ..., taxId: ..., address: ..., city: ..., state: ..., postalCode: ..., country: ..., creditLimit: ..., preferredContact: ..., dateOfBirth: ..., gender: ..., notes: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createTenantCustomer(dataConnect, createTenantCustomerVars);

console.log(data.customer_insert);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
createTenantCustomer(createTenantCustomerVars).then((response) => {
  const data = response.data;
  console.log(data.customer_insert);
  console.log(data.auditEvent_insert);
});
```

### Using `CreateTenantCustomer`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createTenantCustomerRef, CreateTenantCustomerVariables } from '@omniretail/sql-connect';

// The `CreateTenantCustomer` mutation requires an argument of type `CreateTenantCustomerVariables`:
const createTenantCustomerVars: CreateTenantCustomerVariables = {
  id: ..., 
  organizationId: ..., 
  type: ..., 
  name: ..., 
  phone: ..., 
  email: ..., 
  taxId: ..., // optional
  address: ..., // optional
  city: ..., 
  state: ..., 
  postalCode: ..., // optional
  country: ..., // optional
  creditLimit: ..., // optional
  preferredContact: ..., // optional
  dateOfBirth: ..., // optional
  gender: ..., // optional
  notes: ..., // optional
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `createTenantCustomerRef()` function to get a reference to the mutation.
const ref = createTenantCustomerRef(createTenantCustomerVars);
// Variables can be defined inline as well.
const ref = createTenantCustomerRef({ id: ..., organizationId: ..., type: ..., name: ..., phone: ..., email: ..., taxId: ..., address: ..., city: ..., state: ..., postalCode: ..., country: ..., creditLimit: ..., preferredContact: ..., dateOfBirth: ..., gender: ..., notes: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createTenantCustomerRef(dataConnect, createTenantCustomerVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.customer_insert);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.customer_insert);
  console.log(data.auditEvent_insert);
});
```

## UpdateTenantCustomer
You can execute the `UpdateTenantCustomer` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
updateTenantCustomer(vars: UpdateTenantCustomerVariables): MutationPromise<UpdateTenantCustomerData, UpdateTenantCustomerVariables>;

interface UpdateTenantCustomerRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTenantCustomerVariables): MutationRef<UpdateTenantCustomerData, UpdateTenantCustomerVariables>;
}
export const updateTenantCustomerRef: UpdateTenantCustomerRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateTenantCustomer(dc: DataConnect, vars: UpdateTenantCustomerVariables): MutationPromise<UpdateTenantCustomerData, UpdateTenantCustomerVariables>;

interface UpdateTenantCustomerRef {
  ...
  (dc: DataConnect, vars: UpdateTenantCustomerVariables): MutationRef<UpdateTenantCustomerData, UpdateTenantCustomerVariables>;
}
export const updateTenantCustomerRef: UpdateTenantCustomerRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateTenantCustomerRef:
```typescript
const name = updateTenantCustomerRef.operationName;
console.log(name);
```

### Variables
The `UpdateTenantCustomer` mutation requires an argument of type `UpdateTenantCustomerVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateTenantCustomerVariables {
  organizationId: UUIDString;
  id: UUIDString;
  type: CustomerType;
  name: string;
  phone: string;
  email: string;
  taxId?: string | null;
  address?: string | null;
  city: string;
  state: string;
  postalCode?: string | null;
  country?: string | null;
  creditLimit?: number | null;
  preferredContact?: string | null;
  dateOfBirth?: DateString | null;
  gender?: string | null;
  notes?: string | null;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}
```
### Return Type
Recall that executing the `UpdateTenantCustomer` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateTenantCustomerData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateTenantCustomerData {
  customer_update?: Customer_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `UpdateTenantCustomer`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateTenantCustomer, UpdateTenantCustomerVariables } from '@omniretail/sql-connect';

// The `UpdateTenantCustomer` mutation requires an argument of type `UpdateTenantCustomerVariables`:
const updateTenantCustomerVars: UpdateTenantCustomerVariables = {
  organizationId: ..., 
  id: ..., 
  type: ..., 
  name: ..., 
  phone: ..., 
  email: ..., 
  taxId: ..., // optional
  address: ..., // optional
  city: ..., 
  state: ..., 
  postalCode: ..., // optional
  country: ..., // optional
  creditLimit: ..., // optional
  preferredContact: ..., // optional
  dateOfBirth: ..., // optional
  gender: ..., // optional
  notes: ..., // optional
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `updateTenantCustomer()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateTenantCustomer(updateTenantCustomerVars);
// Variables can be defined inline as well.
const { data } = await updateTenantCustomer({ organizationId: ..., id: ..., type: ..., name: ..., phone: ..., email: ..., taxId: ..., address: ..., city: ..., state: ..., postalCode: ..., country: ..., creditLimit: ..., preferredContact: ..., dateOfBirth: ..., gender: ..., notes: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateTenantCustomer(dataConnect, updateTenantCustomerVars);

console.log(data.customer_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
updateTenantCustomer(updateTenantCustomerVars).then((response) => {
  const data = response.data;
  console.log(data.customer_update);
  console.log(data.auditEvent_insert);
});
```

### Using `UpdateTenantCustomer`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateTenantCustomerRef, UpdateTenantCustomerVariables } from '@omniretail/sql-connect';

// The `UpdateTenantCustomer` mutation requires an argument of type `UpdateTenantCustomerVariables`:
const updateTenantCustomerVars: UpdateTenantCustomerVariables = {
  organizationId: ..., 
  id: ..., 
  type: ..., 
  name: ..., 
  phone: ..., 
  email: ..., 
  taxId: ..., // optional
  address: ..., // optional
  city: ..., 
  state: ..., 
  postalCode: ..., // optional
  country: ..., // optional
  creditLimit: ..., // optional
  preferredContact: ..., // optional
  dateOfBirth: ..., // optional
  gender: ..., // optional
  notes: ..., // optional
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `updateTenantCustomerRef()` function to get a reference to the mutation.
const ref = updateTenantCustomerRef(updateTenantCustomerVars);
// Variables can be defined inline as well.
const ref = updateTenantCustomerRef({ organizationId: ..., id: ..., type: ..., name: ..., phone: ..., email: ..., taxId: ..., address: ..., city: ..., state: ..., postalCode: ..., country: ..., creditLimit: ..., preferredContact: ..., dateOfBirth: ..., gender: ..., notes: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateTenantCustomerRef(dataConnect, updateTenantCustomerVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.customer_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.customer_update);
  console.log(data.auditEvent_insert);
});
```

## ChangeTenantCustomerStatus
You can execute the `ChangeTenantCustomerStatus` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
changeTenantCustomerStatus(vars: ChangeTenantCustomerStatusVariables): MutationPromise<ChangeTenantCustomerStatusData, ChangeTenantCustomerStatusVariables>;

interface ChangeTenantCustomerStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ChangeTenantCustomerStatusVariables): MutationRef<ChangeTenantCustomerStatusData, ChangeTenantCustomerStatusVariables>;
}
export const changeTenantCustomerStatusRef: ChangeTenantCustomerStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
changeTenantCustomerStatus(dc: DataConnect, vars: ChangeTenantCustomerStatusVariables): MutationPromise<ChangeTenantCustomerStatusData, ChangeTenantCustomerStatusVariables>;

interface ChangeTenantCustomerStatusRef {
  ...
  (dc: DataConnect, vars: ChangeTenantCustomerStatusVariables): MutationRef<ChangeTenantCustomerStatusData, ChangeTenantCustomerStatusVariables>;
}
export const changeTenantCustomerStatusRef: ChangeTenantCustomerStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the changeTenantCustomerStatusRef:
```typescript
const name = changeTenantCustomerStatusRef.operationName;
console.log(name);
```

### Variables
The `ChangeTenantCustomerStatus` mutation requires an argument of type `ChangeTenantCustomerStatusVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ChangeTenantCustomerStatusVariables {
  organizationId: UUIDString;
  id: UUIDString;
  status: CustomerStatus;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}
```
### Return Type
Recall that executing the `ChangeTenantCustomerStatus` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ChangeTenantCustomerStatusData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ChangeTenantCustomerStatusData {
  customer_update?: Customer_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `ChangeTenantCustomerStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, changeTenantCustomerStatus, ChangeTenantCustomerStatusVariables } from '@omniretail/sql-connect';

// The `ChangeTenantCustomerStatus` mutation requires an argument of type `ChangeTenantCustomerStatusVariables`:
const changeTenantCustomerStatusVars: ChangeTenantCustomerStatusVariables = {
  organizationId: ..., 
  id: ..., 
  status: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `changeTenantCustomerStatus()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await changeTenantCustomerStatus(changeTenantCustomerStatusVars);
// Variables can be defined inline as well.
const { data } = await changeTenantCustomerStatus({ organizationId: ..., id: ..., status: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await changeTenantCustomerStatus(dataConnect, changeTenantCustomerStatusVars);

console.log(data.customer_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
changeTenantCustomerStatus(changeTenantCustomerStatusVars).then((response) => {
  const data = response.data;
  console.log(data.customer_update);
  console.log(data.auditEvent_insert);
});
```

### Using `ChangeTenantCustomerStatus`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, changeTenantCustomerStatusRef, ChangeTenantCustomerStatusVariables } from '@omniretail/sql-connect';

// The `ChangeTenantCustomerStatus` mutation requires an argument of type `ChangeTenantCustomerStatusVariables`:
const changeTenantCustomerStatusVars: ChangeTenantCustomerStatusVariables = {
  organizationId: ..., 
  id: ..., 
  status: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `changeTenantCustomerStatusRef()` function to get a reference to the mutation.
const ref = changeTenantCustomerStatusRef(changeTenantCustomerStatusVars);
// Variables can be defined inline as well.
const ref = changeTenantCustomerStatusRef({ organizationId: ..., id: ..., status: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = changeTenantCustomerStatusRef(dataConnect, changeTenantCustomerStatusVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.customer_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.customer_update);
  console.log(data.auditEvent_insert);
});
```

## CreateTenantProduct
You can execute the `CreateTenantProduct` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
createTenantProduct(vars: CreateTenantProductVariables): MutationPromise<CreateTenantProductData, CreateTenantProductVariables>;

interface CreateTenantProductRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTenantProductVariables): MutationRef<CreateTenantProductData, CreateTenantProductVariables>;
}
export const createTenantProductRef: CreateTenantProductRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createTenantProduct(dc: DataConnect, vars: CreateTenantProductVariables): MutationPromise<CreateTenantProductData, CreateTenantProductVariables>;

interface CreateTenantProductRef {
  ...
  (dc: DataConnect, vars: CreateTenantProductVariables): MutationRef<CreateTenantProductData, CreateTenantProductVariables>;
}
export const createTenantProductRef: CreateTenantProductRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createTenantProductRef:
```typescript
const name = createTenantProductRef.operationName;
console.log(name);
```

### Variables
The `CreateTenantProduct` mutation requires an argument of type `CreateTenantProductVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateTenantProductVariables {
  id: UUIDString;
  organizationId: UUIDString;
  name: string;
  brand: string;
  categoryId: string;
  categoryName: string;
  subcategory?: string | null;
  type: ProductType;
  sku: string;
  barcode?: string | null;
  hsnCode?: string | null;
  unitOfMeasure?: string | null;
  sellingPrice: number;
  mrp?: number | null;
  cost?: number | null;
  minSellingPrice?: number | null;
  discountAllowed: boolean;
  taxCategory?: string | null;
  reorderLevel?: number | null;
  reorderQuantity?: number | null;
  primarySupplier?: string | null;
  supplierProductCode?: string | null;
  description?: string | null;
  imageUrl?: string | null;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}
```
### Return Type
Recall that executing the `CreateTenantProduct` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateTenantProductData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateTenantProductData {
  product_insert: Product_Key;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `CreateTenantProduct`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createTenantProduct, CreateTenantProductVariables } from '@omniretail/sql-connect';

// The `CreateTenantProduct` mutation requires an argument of type `CreateTenantProductVariables`:
const createTenantProductVars: CreateTenantProductVariables = {
  id: ..., 
  organizationId: ..., 
  name: ..., 
  brand: ..., 
  categoryId: ..., 
  categoryName: ..., 
  subcategory: ..., // optional
  type: ..., 
  sku: ..., 
  barcode: ..., // optional
  hsnCode: ..., // optional
  unitOfMeasure: ..., // optional
  sellingPrice: ..., 
  mrp: ..., // optional
  cost: ..., // optional
  minSellingPrice: ..., // optional
  discountAllowed: ..., 
  taxCategory: ..., // optional
  reorderLevel: ..., // optional
  reorderQuantity: ..., // optional
  primarySupplier: ..., // optional
  supplierProductCode: ..., // optional
  description: ..., // optional
  imageUrl: ..., // optional
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `createTenantProduct()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createTenantProduct(createTenantProductVars);
// Variables can be defined inline as well.
const { data } = await createTenantProduct({ id: ..., organizationId: ..., name: ..., brand: ..., categoryId: ..., categoryName: ..., subcategory: ..., type: ..., sku: ..., barcode: ..., hsnCode: ..., unitOfMeasure: ..., sellingPrice: ..., mrp: ..., cost: ..., minSellingPrice: ..., discountAllowed: ..., taxCategory: ..., reorderLevel: ..., reorderQuantity: ..., primarySupplier: ..., supplierProductCode: ..., description: ..., imageUrl: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createTenantProduct(dataConnect, createTenantProductVars);

console.log(data.product_insert);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
createTenantProduct(createTenantProductVars).then((response) => {
  const data = response.data;
  console.log(data.product_insert);
  console.log(data.auditEvent_insert);
});
```

### Using `CreateTenantProduct`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createTenantProductRef, CreateTenantProductVariables } from '@omniretail/sql-connect';

// The `CreateTenantProduct` mutation requires an argument of type `CreateTenantProductVariables`:
const createTenantProductVars: CreateTenantProductVariables = {
  id: ..., 
  organizationId: ..., 
  name: ..., 
  brand: ..., 
  categoryId: ..., 
  categoryName: ..., 
  subcategory: ..., // optional
  type: ..., 
  sku: ..., 
  barcode: ..., // optional
  hsnCode: ..., // optional
  unitOfMeasure: ..., // optional
  sellingPrice: ..., 
  mrp: ..., // optional
  cost: ..., // optional
  minSellingPrice: ..., // optional
  discountAllowed: ..., 
  taxCategory: ..., // optional
  reorderLevel: ..., // optional
  reorderQuantity: ..., // optional
  primarySupplier: ..., // optional
  supplierProductCode: ..., // optional
  description: ..., // optional
  imageUrl: ..., // optional
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `createTenantProductRef()` function to get a reference to the mutation.
const ref = createTenantProductRef(createTenantProductVars);
// Variables can be defined inline as well.
const ref = createTenantProductRef({ id: ..., organizationId: ..., name: ..., brand: ..., categoryId: ..., categoryName: ..., subcategory: ..., type: ..., sku: ..., barcode: ..., hsnCode: ..., unitOfMeasure: ..., sellingPrice: ..., mrp: ..., cost: ..., minSellingPrice: ..., discountAllowed: ..., taxCategory: ..., reorderLevel: ..., reorderQuantity: ..., primarySupplier: ..., supplierProductCode: ..., description: ..., imageUrl: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createTenantProductRef(dataConnect, createTenantProductVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.product_insert);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.product_insert);
  console.log(data.auditEvent_insert);
});
```

## UpdateTenantProduct
You can execute the `UpdateTenantProduct` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
updateTenantProduct(vars: UpdateTenantProductVariables): MutationPromise<UpdateTenantProductData, UpdateTenantProductVariables>;

interface UpdateTenantProductRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTenantProductVariables): MutationRef<UpdateTenantProductData, UpdateTenantProductVariables>;
}
export const updateTenantProductRef: UpdateTenantProductRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateTenantProduct(dc: DataConnect, vars: UpdateTenantProductVariables): MutationPromise<UpdateTenantProductData, UpdateTenantProductVariables>;

interface UpdateTenantProductRef {
  ...
  (dc: DataConnect, vars: UpdateTenantProductVariables): MutationRef<UpdateTenantProductData, UpdateTenantProductVariables>;
}
export const updateTenantProductRef: UpdateTenantProductRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateTenantProductRef:
```typescript
const name = updateTenantProductRef.operationName;
console.log(name);
```

### Variables
The `UpdateTenantProduct` mutation requires an argument of type `UpdateTenantProductVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateTenantProductVariables {
  organizationId: UUIDString;
  id: UUIDString;
  name: string;
  brand: string;
  categoryId: string;
  categoryName: string;
  subcategory?: string | null;
  type: ProductType;
  sku: string;
  barcode?: string | null;
  hsnCode?: string | null;
  unitOfMeasure?: string | null;
  sellingPrice: number;
  mrp?: number | null;
  cost?: number | null;
  minSellingPrice?: number | null;
  discountAllowed: boolean;
  taxCategory?: string | null;
  reorderLevel?: number | null;
  reorderQuantity?: number | null;
  primarySupplier?: string | null;
  supplierProductCode?: string | null;
  description?: string | null;
  imageUrl?: string | null;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}
```
### Return Type
Recall that executing the `UpdateTenantProduct` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateTenantProductData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateTenantProductData {
  product_update?: Product_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `UpdateTenantProduct`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateTenantProduct, UpdateTenantProductVariables } from '@omniretail/sql-connect';

// The `UpdateTenantProduct` mutation requires an argument of type `UpdateTenantProductVariables`:
const updateTenantProductVars: UpdateTenantProductVariables = {
  organizationId: ..., 
  id: ..., 
  name: ..., 
  brand: ..., 
  categoryId: ..., 
  categoryName: ..., 
  subcategory: ..., // optional
  type: ..., 
  sku: ..., 
  barcode: ..., // optional
  hsnCode: ..., // optional
  unitOfMeasure: ..., // optional
  sellingPrice: ..., 
  mrp: ..., // optional
  cost: ..., // optional
  minSellingPrice: ..., // optional
  discountAllowed: ..., 
  taxCategory: ..., // optional
  reorderLevel: ..., // optional
  reorderQuantity: ..., // optional
  primarySupplier: ..., // optional
  supplierProductCode: ..., // optional
  description: ..., // optional
  imageUrl: ..., // optional
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `updateTenantProduct()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateTenantProduct(updateTenantProductVars);
// Variables can be defined inline as well.
const { data } = await updateTenantProduct({ organizationId: ..., id: ..., name: ..., brand: ..., categoryId: ..., categoryName: ..., subcategory: ..., type: ..., sku: ..., barcode: ..., hsnCode: ..., unitOfMeasure: ..., sellingPrice: ..., mrp: ..., cost: ..., minSellingPrice: ..., discountAllowed: ..., taxCategory: ..., reorderLevel: ..., reorderQuantity: ..., primarySupplier: ..., supplierProductCode: ..., description: ..., imageUrl: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateTenantProduct(dataConnect, updateTenantProductVars);

console.log(data.product_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
updateTenantProduct(updateTenantProductVars).then((response) => {
  const data = response.data;
  console.log(data.product_update);
  console.log(data.auditEvent_insert);
});
```

### Using `UpdateTenantProduct`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateTenantProductRef, UpdateTenantProductVariables } from '@omniretail/sql-connect';

// The `UpdateTenantProduct` mutation requires an argument of type `UpdateTenantProductVariables`:
const updateTenantProductVars: UpdateTenantProductVariables = {
  organizationId: ..., 
  id: ..., 
  name: ..., 
  brand: ..., 
  categoryId: ..., 
  categoryName: ..., 
  subcategory: ..., // optional
  type: ..., 
  sku: ..., 
  barcode: ..., // optional
  hsnCode: ..., // optional
  unitOfMeasure: ..., // optional
  sellingPrice: ..., 
  mrp: ..., // optional
  cost: ..., // optional
  minSellingPrice: ..., // optional
  discountAllowed: ..., 
  taxCategory: ..., // optional
  reorderLevel: ..., // optional
  reorderQuantity: ..., // optional
  primarySupplier: ..., // optional
  supplierProductCode: ..., // optional
  description: ..., // optional
  imageUrl: ..., // optional
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `updateTenantProductRef()` function to get a reference to the mutation.
const ref = updateTenantProductRef(updateTenantProductVars);
// Variables can be defined inline as well.
const ref = updateTenantProductRef({ organizationId: ..., id: ..., name: ..., brand: ..., categoryId: ..., categoryName: ..., subcategory: ..., type: ..., sku: ..., barcode: ..., hsnCode: ..., unitOfMeasure: ..., sellingPrice: ..., mrp: ..., cost: ..., minSellingPrice: ..., discountAllowed: ..., taxCategory: ..., reorderLevel: ..., reorderQuantity: ..., primarySupplier: ..., supplierProductCode: ..., description: ..., imageUrl: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateTenantProductRef(dataConnect, updateTenantProductVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.product_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.product_update);
  console.log(data.auditEvent_insert);
});
```

## ChangeTenantProductStatus
You can execute the `ChangeTenantProductStatus` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
changeTenantProductStatus(vars: ChangeTenantProductStatusVariables): MutationPromise<ChangeTenantProductStatusData, ChangeTenantProductStatusVariables>;

interface ChangeTenantProductStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ChangeTenantProductStatusVariables): MutationRef<ChangeTenantProductStatusData, ChangeTenantProductStatusVariables>;
}
export const changeTenantProductStatusRef: ChangeTenantProductStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
changeTenantProductStatus(dc: DataConnect, vars: ChangeTenantProductStatusVariables): MutationPromise<ChangeTenantProductStatusData, ChangeTenantProductStatusVariables>;

interface ChangeTenantProductStatusRef {
  ...
  (dc: DataConnect, vars: ChangeTenantProductStatusVariables): MutationRef<ChangeTenantProductStatusData, ChangeTenantProductStatusVariables>;
}
export const changeTenantProductStatusRef: ChangeTenantProductStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the changeTenantProductStatusRef:
```typescript
const name = changeTenantProductStatusRef.operationName;
console.log(name);
```

### Variables
The `ChangeTenantProductStatus` mutation requires an argument of type `ChangeTenantProductStatusVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ChangeTenantProductStatusVariables {
  organizationId: UUIDString;
  id: UUIDString;
  status: ProductStatus;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}
```
### Return Type
Recall that executing the `ChangeTenantProductStatus` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ChangeTenantProductStatusData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ChangeTenantProductStatusData {
  product_update?: Product_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `ChangeTenantProductStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, changeTenantProductStatus, ChangeTenantProductStatusVariables } from '@omniretail/sql-connect';

// The `ChangeTenantProductStatus` mutation requires an argument of type `ChangeTenantProductStatusVariables`:
const changeTenantProductStatusVars: ChangeTenantProductStatusVariables = {
  organizationId: ..., 
  id: ..., 
  status: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `changeTenantProductStatus()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await changeTenantProductStatus(changeTenantProductStatusVars);
// Variables can be defined inline as well.
const { data } = await changeTenantProductStatus({ organizationId: ..., id: ..., status: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await changeTenantProductStatus(dataConnect, changeTenantProductStatusVars);

console.log(data.product_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
changeTenantProductStatus(changeTenantProductStatusVars).then((response) => {
  const data = response.data;
  console.log(data.product_update);
  console.log(data.auditEvent_insert);
});
```

### Using `ChangeTenantProductStatus`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, changeTenantProductStatusRef, ChangeTenantProductStatusVariables } from '@omniretail/sql-connect';

// The `ChangeTenantProductStatus` mutation requires an argument of type `ChangeTenantProductStatusVariables`:
const changeTenantProductStatusVars: ChangeTenantProductStatusVariables = {
  organizationId: ..., 
  id: ..., 
  status: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `changeTenantProductStatusRef()` function to get a reference to the mutation.
const ref = changeTenantProductStatusRef(changeTenantProductStatusVars);
// Variables can be defined inline as well.
const ref = changeTenantProductStatusRef({ organizationId: ..., id: ..., status: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = changeTenantProductStatusRef(dataConnect, changeTenantProductStatusVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.product_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.product_update);
  console.log(data.auditEvent_insert);
});
```

## AdjustTenantInventory
You can execute the `AdjustTenantInventory` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
adjustTenantInventory(vars: AdjustTenantInventoryVariables): MutationPromise<AdjustTenantInventoryData, AdjustTenantInventoryVariables>;

interface AdjustTenantInventoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdjustTenantInventoryVariables): MutationRef<AdjustTenantInventoryData, AdjustTenantInventoryVariables>;
}
export const adjustTenantInventoryRef: AdjustTenantInventoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adjustTenantInventory(dc: DataConnect, vars: AdjustTenantInventoryVariables): MutationPromise<AdjustTenantInventoryData, AdjustTenantInventoryVariables>;

interface AdjustTenantInventoryRef {
  ...
  (dc: DataConnect, vars: AdjustTenantInventoryVariables): MutationRef<AdjustTenantInventoryData, AdjustTenantInventoryVariables>;
}
export const adjustTenantInventoryRef: AdjustTenantInventoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adjustTenantInventoryRef:
```typescript
const name = adjustTenantInventoryRef.operationName;
console.log(name);
```

### Variables
The `AdjustTenantInventory` mutation requires an argument of type `AdjustTenantInventoryVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdjustTenantInventoryVariables {
  organizationId: UUIDString;
  outletId: UUIDString;
  productId: UUIDString;
  mode: InventoryAdjustmentMode;
  quantity: number;
  previousQty: number;
  newQty: number;
  reasonCode: string;
  auditNote?: string | null;
  requestId: string;
  actorFirebaseUid: string;
}
```
### Return Type
Recall that executing the `AdjustTenantInventory` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdjustTenantInventoryData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdjustTenantInventoryData {
  inventoryStock_update?: InventoryStock_Key | null;
  inventoryMovement_insert: InventoryMovement_Key;
}
```
### Using `AdjustTenantInventory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adjustTenantInventory, AdjustTenantInventoryVariables } from '@omniretail/sql-connect';

// The `AdjustTenantInventory` mutation requires an argument of type `AdjustTenantInventoryVariables`:
const adjustTenantInventoryVars: AdjustTenantInventoryVariables = {
  organizationId: ..., 
  outletId: ..., 
  productId: ..., 
  mode: ..., 
  quantity: ..., 
  previousQty: ..., 
  newQty: ..., 
  reasonCode: ..., 
  auditNote: ..., // optional
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `adjustTenantInventory()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adjustTenantInventory(adjustTenantInventoryVars);
// Variables can be defined inline as well.
const { data } = await adjustTenantInventory({ organizationId: ..., outletId: ..., productId: ..., mode: ..., quantity: ..., previousQty: ..., newQty: ..., reasonCode: ..., auditNote: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adjustTenantInventory(dataConnect, adjustTenantInventoryVars);

console.log(data.inventoryStock_update);
console.log(data.inventoryMovement_insert);

// Or, you can use the `Promise` API.
adjustTenantInventory(adjustTenantInventoryVars).then((response) => {
  const data = response.data;
  console.log(data.inventoryStock_update);
  console.log(data.inventoryMovement_insert);
});
```

### Using `AdjustTenantInventory`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adjustTenantInventoryRef, AdjustTenantInventoryVariables } from '@omniretail/sql-connect';

// The `AdjustTenantInventory` mutation requires an argument of type `AdjustTenantInventoryVariables`:
const adjustTenantInventoryVars: AdjustTenantInventoryVariables = {
  organizationId: ..., 
  outletId: ..., 
  productId: ..., 
  mode: ..., 
  quantity: ..., 
  previousQty: ..., 
  newQty: ..., 
  reasonCode: ..., 
  auditNote: ..., // optional
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `adjustTenantInventoryRef()` function to get a reference to the mutation.
const ref = adjustTenantInventoryRef(adjustTenantInventoryVars);
// Variables can be defined inline as well.
const ref = adjustTenantInventoryRef({ organizationId: ..., outletId: ..., productId: ..., mode: ..., quantity: ..., previousQty: ..., newQty: ..., reasonCode: ..., auditNote: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adjustTenantInventoryRef(dataConnect, adjustTenantInventoryVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.inventoryStock_update);
console.log(data.inventoryMovement_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.inventoryStock_update);
  console.log(data.inventoryMovement_insert);
});
```

## CreateTenantInventoryStock
You can execute the `CreateTenantInventoryStock` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
createTenantInventoryStock(vars: CreateTenantInventoryStockVariables): MutationPromise<CreateTenantInventoryStockData, CreateTenantInventoryStockVariables>;

interface CreateTenantInventoryStockRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTenantInventoryStockVariables): MutationRef<CreateTenantInventoryStockData, CreateTenantInventoryStockVariables>;
}
export const createTenantInventoryStockRef: CreateTenantInventoryStockRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createTenantInventoryStock(dc: DataConnect, vars: CreateTenantInventoryStockVariables): MutationPromise<CreateTenantInventoryStockData, CreateTenantInventoryStockVariables>;

interface CreateTenantInventoryStockRef {
  ...
  (dc: DataConnect, vars: CreateTenantInventoryStockVariables): MutationRef<CreateTenantInventoryStockData, CreateTenantInventoryStockVariables>;
}
export const createTenantInventoryStockRef: CreateTenantInventoryStockRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createTenantInventoryStockRef:
```typescript
const name = createTenantInventoryStockRef.operationName;
console.log(name);
```

### Variables
The `CreateTenantInventoryStock` mutation requires an argument of type `CreateTenantInventoryStockVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateTenantInventoryStockVariables {
  organizationId: UUIDString;
  outletId: UUIDString;
  productId: UUIDString;
  onHandQty: number;
  reorderLevel: number;
  overstockThreshold: number;
  requestId: string;
  actorFirebaseUid: string;
}
```
### Return Type
Recall that executing the `CreateTenantInventoryStock` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateTenantInventoryStockData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateTenantInventoryStockData {
  inventoryStock_upsert: InventoryStock_Key;
  inventoryMovement_insert: InventoryMovement_Key;
}
```
### Using `CreateTenantInventoryStock`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createTenantInventoryStock, CreateTenantInventoryStockVariables } from '@omniretail/sql-connect';

// The `CreateTenantInventoryStock` mutation requires an argument of type `CreateTenantInventoryStockVariables`:
const createTenantInventoryStockVars: CreateTenantInventoryStockVariables = {
  organizationId: ..., 
  outletId: ..., 
  productId: ..., 
  onHandQty: ..., 
  reorderLevel: ..., 
  overstockThreshold: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `createTenantInventoryStock()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createTenantInventoryStock(createTenantInventoryStockVars);
// Variables can be defined inline as well.
const { data } = await createTenantInventoryStock({ organizationId: ..., outletId: ..., productId: ..., onHandQty: ..., reorderLevel: ..., overstockThreshold: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createTenantInventoryStock(dataConnect, createTenantInventoryStockVars);

console.log(data.inventoryStock_upsert);
console.log(data.inventoryMovement_insert);

// Or, you can use the `Promise` API.
createTenantInventoryStock(createTenantInventoryStockVars).then((response) => {
  const data = response.data;
  console.log(data.inventoryStock_upsert);
  console.log(data.inventoryMovement_insert);
});
```

### Using `CreateTenantInventoryStock`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createTenantInventoryStockRef, CreateTenantInventoryStockVariables } from '@omniretail/sql-connect';

// The `CreateTenantInventoryStock` mutation requires an argument of type `CreateTenantInventoryStockVariables`:
const createTenantInventoryStockVars: CreateTenantInventoryStockVariables = {
  organizationId: ..., 
  outletId: ..., 
  productId: ..., 
  onHandQty: ..., 
  reorderLevel: ..., 
  overstockThreshold: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `createTenantInventoryStockRef()` function to get a reference to the mutation.
const ref = createTenantInventoryStockRef(createTenantInventoryStockVars);
// Variables can be defined inline as well.
const ref = createTenantInventoryStockRef({ organizationId: ..., outletId: ..., productId: ..., onHandQty: ..., reorderLevel: ..., overstockThreshold: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createTenantInventoryStockRef(dataConnect, createTenantInventoryStockVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.inventoryStock_upsert);
console.log(data.inventoryMovement_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.inventoryStock_upsert);
  console.log(data.inventoryMovement_insert);
});
```

## CreateTenantOutlet
You can execute the `CreateTenantOutlet` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
createTenantOutlet(vars: CreateTenantOutletVariables): MutationPromise<CreateTenantOutletData, CreateTenantOutletVariables>;

interface CreateTenantOutletRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTenantOutletVariables): MutationRef<CreateTenantOutletData, CreateTenantOutletVariables>;
}
export const createTenantOutletRef: CreateTenantOutletRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createTenantOutlet(dc: DataConnect, vars: CreateTenantOutletVariables): MutationPromise<CreateTenantOutletData, CreateTenantOutletVariables>;

interface CreateTenantOutletRef {
  ...
  (dc: DataConnect, vars: CreateTenantOutletVariables): MutationRef<CreateTenantOutletData, CreateTenantOutletVariables>;
}
export const createTenantOutletRef: CreateTenantOutletRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createTenantOutletRef:
```typescript
const name = createTenantOutletRef.operationName;
console.log(name);
```

### Variables
The `CreateTenantOutlet` mutation requires an argument of type `CreateTenantOutletVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateTenantOutletVariables {
  organizationId: UUIDString;
  name: string;
  contactPerson: string;
  email?: string | null;
  phone: string;
  address: string;
  auditId: UUIDString;
  requestId: string;
}
```
### Return Type
Recall that executing the `CreateTenantOutlet` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateTenantOutletData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateTenantOutletData {
  outlet_insert: Outlet_Key;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `CreateTenantOutlet`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createTenantOutlet, CreateTenantOutletVariables } from '@omniretail/sql-connect';

// The `CreateTenantOutlet` mutation requires an argument of type `CreateTenantOutletVariables`:
const createTenantOutletVars: CreateTenantOutletVariables = {
  organizationId: ..., 
  name: ..., 
  contactPerson: ..., 
  email: ..., // optional
  phone: ..., 
  address: ..., 
  auditId: ..., 
  requestId: ..., 
};

// Call the `createTenantOutlet()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createTenantOutlet(createTenantOutletVars);
// Variables can be defined inline as well.
const { data } = await createTenantOutlet({ organizationId: ..., name: ..., contactPerson: ..., email: ..., phone: ..., address: ..., auditId: ..., requestId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createTenantOutlet(dataConnect, createTenantOutletVars);

console.log(data.outlet_insert);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
createTenantOutlet(createTenantOutletVars).then((response) => {
  const data = response.data;
  console.log(data.outlet_insert);
  console.log(data.auditEvent_insert);
});
```

### Using `CreateTenantOutlet`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createTenantOutletRef, CreateTenantOutletVariables } from '@omniretail/sql-connect';

// The `CreateTenantOutlet` mutation requires an argument of type `CreateTenantOutletVariables`:
const createTenantOutletVars: CreateTenantOutletVariables = {
  organizationId: ..., 
  name: ..., 
  contactPerson: ..., 
  email: ..., // optional
  phone: ..., 
  address: ..., 
  auditId: ..., 
  requestId: ..., 
};

// Call the `createTenantOutletRef()` function to get a reference to the mutation.
const ref = createTenantOutletRef(createTenantOutletVars);
// Variables can be defined inline as well.
const ref = createTenantOutletRef({ organizationId: ..., name: ..., contactPerson: ..., email: ..., phone: ..., address: ..., auditId: ..., requestId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createTenantOutletRef(dataConnect, createTenantOutletVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.outlet_insert);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.outlet_insert);
  console.log(data.auditEvent_insert);
});
```

## UpdateTenantOutlet
You can execute the `UpdateTenantOutlet` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
updateTenantOutlet(vars: UpdateTenantOutletVariables): MutationPromise<UpdateTenantOutletData, UpdateTenantOutletVariables>;

interface UpdateTenantOutletRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTenantOutletVariables): MutationRef<UpdateTenantOutletData, UpdateTenantOutletVariables>;
}
export const updateTenantOutletRef: UpdateTenantOutletRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateTenantOutlet(dc: DataConnect, vars: UpdateTenantOutletVariables): MutationPromise<UpdateTenantOutletData, UpdateTenantOutletVariables>;

interface UpdateTenantOutletRef {
  ...
  (dc: DataConnect, vars: UpdateTenantOutletVariables): MutationRef<UpdateTenantOutletData, UpdateTenantOutletVariables>;
}
export const updateTenantOutletRef: UpdateTenantOutletRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateTenantOutletRef:
```typescript
const name = updateTenantOutletRef.operationName;
console.log(name);
```

### Variables
The `UpdateTenantOutlet` mutation requires an argument of type `UpdateTenantOutletVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateTenantOutletVariables {
  organizationId: UUIDString;
  id: UUIDString;
  name: string;
  contactPerson: string;
  email?: string | null;
  phone: string;
  address: string;
  auditId: UUIDString;
  requestId: string;
}
```
### Return Type
Recall that executing the `UpdateTenantOutlet` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateTenantOutletData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateTenantOutletData {
  outlet_update?: Outlet_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `UpdateTenantOutlet`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateTenantOutlet, UpdateTenantOutletVariables } from '@omniretail/sql-connect';

// The `UpdateTenantOutlet` mutation requires an argument of type `UpdateTenantOutletVariables`:
const updateTenantOutletVars: UpdateTenantOutletVariables = {
  organizationId: ..., 
  id: ..., 
  name: ..., 
  contactPerson: ..., 
  email: ..., // optional
  phone: ..., 
  address: ..., 
  auditId: ..., 
  requestId: ..., 
};

// Call the `updateTenantOutlet()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateTenantOutlet(updateTenantOutletVars);
// Variables can be defined inline as well.
const { data } = await updateTenantOutlet({ organizationId: ..., id: ..., name: ..., contactPerson: ..., email: ..., phone: ..., address: ..., auditId: ..., requestId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateTenantOutlet(dataConnect, updateTenantOutletVars);

console.log(data.outlet_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
updateTenantOutlet(updateTenantOutletVars).then((response) => {
  const data = response.data;
  console.log(data.outlet_update);
  console.log(data.auditEvent_insert);
});
```

### Using `UpdateTenantOutlet`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateTenantOutletRef, UpdateTenantOutletVariables } from '@omniretail/sql-connect';

// The `UpdateTenantOutlet` mutation requires an argument of type `UpdateTenantOutletVariables`:
const updateTenantOutletVars: UpdateTenantOutletVariables = {
  organizationId: ..., 
  id: ..., 
  name: ..., 
  contactPerson: ..., 
  email: ..., // optional
  phone: ..., 
  address: ..., 
  auditId: ..., 
  requestId: ..., 
};

// Call the `updateTenantOutletRef()` function to get a reference to the mutation.
const ref = updateTenantOutletRef(updateTenantOutletVars);
// Variables can be defined inline as well.
const ref = updateTenantOutletRef({ organizationId: ..., id: ..., name: ..., contactPerson: ..., email: ..., phone: ..., address: ..., auditId: ..., requestId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateTenantOutletRef(dataConnect, updateTenantOutletVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.outlet_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.outlet_update);
  console.log(data.auditEvent_insert);
});
```

## ChangeTenantOutletStatus
You can execute the `ChangeTenantOutletStatus` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
changeTenantOutletStatus(vars: ChangeTenantOutletStatusVariables): MutationPromise<ChangeTenantOutletStatusData, ChangeTenantOutletStatusVariables>;

interface ChangeTenantOutletStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ChangeTenantOutletStatusVariables): MutationRef<ChangeTenantOutletStatusData, ChangeTenantOutletStatusVariables>;
}
export const changeTenantOutletStatusRef: ChangeTenantOutletStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
changeTenantOutletStatus(dc: DataConnect, vars: ChangeTenantOutletStatusVariables): MutationPromise<ChangeTenantOutletStatusData, ChangeTenantOutletStatusVariables>;

interface ChangeTenantOutletStatusRef {
  ...
  (dc: DataConnect, vars: ChangeTenantOutletStatusVariables): MutationRef<ChangeTenantOutletStatusData, ChangeTenantOutletStatusVariables>;
}
export const changeTenantOutletStatusRef: ChangeTenantOutletStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the changeTenantOutletStatusRef:
```typescript
const name = changeTenantOutletStatusRef.operationName;
console.log(name);
```

### Variables
The `ChangeTenantOutletStatus` mutation requires an argument of type `ChangeTenantOutletStatusVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ChangeTenantOutletStatusVariables {
  organizationId: UUIDString;
  id: UUIDString;
  status: OutletStatus;
  auditId: UUIDString;
  requestId: string;
}
```
### Return Type
Recall that executing the `ChangeTenantOutletStatus` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ChangeTenantOutletStatusData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ChangeTenantOutletStatusData {
  outlet_update?: Outlet_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `ChangeTenantOutletStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, changeTenantOutletStatus, ChangeTenantOutletStatusVariables } from '@omniretail/sql-connect';

// The `ChangeTenantOutletStatus` mutation requires an argument of type `ChangeTenantOutletStatusVariables`:
const changeTenantOutletStatusVars: ChangeTenantOutletStatusVariables = {
  organizationId: ..., 
  id: ..., 
  status: ..., 
  auditId: ..., 
  requestId: ..., 
};

// Call the `changeTenantOutletStatus()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await changeTenantOutletStatus(changeTenantOutletStatusVars);
// Variables can be defined inline as well.
const { data } = await changeTenantOutletStatus({ organizationId: ..., id: ..., status: ..., auditId: ..., requestId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await changeTenantOutletStatus(dataConnect, changeTenantOutletStatusVars);

console.log(data.outlet_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
changeTenantOutletStatus(changeTenantOutletStatusVars).then((response) => {
  const data = response.data;
  console.log(data.outlet_update);
  console.log(data.auditEvent_insert);
});
```

### Using `ChangeTenantOutletStatus`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, changeTenantOutletStatusRef, ChangeTenantOutletStatusVariables } from '@omniretail/sql-connect';

// The `ChangeTenantOutletStatus` mutation requires an argument of type `ChangeTenantOutletStatusVariables`:
const changeTenantOutletStatusVars: ChangeTenantOutletStatusVariables = {
  organizationId: ..., 
  id: ..., 
  status: ..., 
  auditId: ..., 
  requestId: ..., 
};

// Call the `changeTenantOutletStatusRef()` function to get a reference to the mutation.
const ref = changeTenantOutletStatusRef(changeTenantOutletStatusVars);
// Variables can be defined inline as well.
const ref = changeTenantOutletStatusRef({ organizationId: ..., id: ..., status: ..., auditId: ..., requestId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = changeTenantOutletStatusRef(dataConnect, changeTenantOutletStatusVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.outlet_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.outlet_update);
  console.log(data.auditEvent_insert);
});
```

## CreateTenantOutletTrusted
You can execute the `CreateTenantOutletTrusted` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
createTenantOutletTrusted(vars: CreateTenantOutletTrustedVariables): MutationPromise<CreateTenantOutletTrustedData, CreateTenantOutletTrustedVariables>;

interface CreateTenantOutletTrustedRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTenantOutletTrustedVariables): MutationRef<CreateTenantOutletTrustedData, CreateTenantOutletTrustedVariables>;
}
export const createTenantOutletTrustedRef: CreateTenantOutletTrustedRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createTenantOutletTrusted(dc: DataConnect, vars: CreateTenantOutletTrustedVariables): MutationPromise<CreateTenantOutletTrustedData, CreateTenantOutletTrustedVariables>;

interface CreateTenantOutletTrustedRef {
  ...
  (dc: DataConnect, vars: CreateTenantOutletTrustedVariables): MutationRef<CreateTenantOutletTrustedData, CreateTenantOutletTrustedVariables>;
}
export const createTenantOutletTrustedRef: CreateTenantOutletTrustedRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createTenantOutletTrustedRef:
```typescript
const name = createTenantOutletTrustedRef.operationName;
console.log(name);
```

### Variables
The `CreateTenantOutletTrusted` mutation requires an argument of type `CreateTenantOutletTrustedVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateTenantOutletTrustedVariables {
  id: UUIDString;
  organizationId: UUIDString;
  name: string;
  contactPerson: string;
  email?: string | null;
  phone: string;
  address: string;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}
```
### Return Type
Recall that executing the `CreateTenantOutletTrusted` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateTenantOutletTrustedData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateTenantOutletTrustedData {
  outlet_insert: Outlet_Key;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `CreateTenantOutletTrusted`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createTenantOutletTrusted, CreateTenantOutletTrustedVariables } from '@omniretail/sql-connect';

// The `CreateTenantOutletTrusted` mutation requires an argument of type `CreateTenantOutletTrustedVariables`:
const createTenantOutletTrustedVars: CreateTenantOutletTrustedVariables = {
  id: ..., 
  organizationId: ..., 
  name: ..., 
  contactPerson: ..., 
  email: ..., // optional
  phone: ..., 
  address: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `createTenantOutletTrusted()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createTenantOutletTrusted(createTenantOutletTrustedVars);
// Variables can be defined inline as well.
const { data } = await createTenantOutletTrusted({ id: ..., organizationId: ..., name: ..., contactPerson: ..., email: ..., phone: ..., address: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createTenantOutletTrusted(dataConnect, createTenantOutletTrustedVars);

console.log(data.outlet_insert);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
createTenantOutletTrusted(createTenantOutletTrustedVars).then((response) => {
  const data = response.data;
  console.log(data.outlet_insert);
  console.log(data.auditEvent_insert);
});
```

### Using `CreateTenantOutletTrusted`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createTenantOutletTrustedRef, CreateTenantOutletTrustedVariables } from '@omniretail/sql-connect';

// The `CreateTenantOutletTrusted` mutation requires an argument of type `CreateTenantOutletTrustedVariables`:
const createTenantOutletTrustedVars: CreateTenantOutletTrustedVariables = {
  id: ..., 
  organizationId: ..., 
  name: ..., 
  contactPerson: ..., 
  email: ..., // optional
  phone: ..., 
  address: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `createTenantOutletTrustedRef()` function to get a reference to the mutation.
const ref = createTenantOutletTrustedRef(createTenantOutletTrustedVars);
// Variables can be defined inline as well.
const ref = createTenantOutletTrustedRef({ id: ..., organizationId: ..., name: ..., contactPerson: ..., email: ..., phone: ..., address: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createTenantOutletTrustedRef(dataConnect, createTenantOutletTrustedVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.outlet_insert);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.outlet_insert);
  console.log(data.auditEvent_insert);
});
```

## UpdateTenantOutletTrusted
You can execute the `UpdateTenantOutletTrusted` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
updateTenantOutletTrusted(vars: UpdateTenantOutletTrustedVariables): MutationPromise<UpdateTenantOutletTrustedData, UpdateTenantOutletTrustedVariables>;

interface UpdateTenantOutletTrustedRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTenantOutletTrustedVariables): MutationRef<UpdateTenantOutletTrustedData, UpdateTenantOutletTrustedVariables>;
}
export const updateTenantOutletTrustedRef: UpdateTenantOutletTrustedRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateTenantOutletTrusted(dc: DataConnect, vars: UpdateTenantOutletTrustedVariables): MutationPromise<UpdateTenantOutletTrustedData, UpdateTenantOutletTrustedVariables>;

interface UpdateTenantOutletTrustedRef {
  ...
  (dc: DataConnect, vars: UpdateTenantOutletTrustedVariables): MutationRef<UpdateTenantOutletTrustedData, UpdateTenantOutletTrustedVariables>;
}
export const updateTenantOutletTrustedRef: UpdateTenantOutletTrustedRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateTenantOutletTrustedRef:
```typescript
const name = updateTenantOutletTrustedRef.operationName;
console.log(name);
```

### Variables
The `UpdateTenantOutletTrusted` mutation requires an argument of type `UpdateTenantOutletTrustedVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateTenantOutletTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
  name: string;
  contactPerson: string;
  email?: string | null;
  phone: string;
  address: string;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}
```
### Return Type
Recall that executing the `UpdateTenantOutletTrusted` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateTenantOutletTrustedData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateTenantOutletTrustedData {
  outlet_update?: Outlet_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `UpdateTenantOutletTrusted`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateTenantOutletTrusted, UpdateTenantOutletTrustedVariables } from '@omniretail/sql-connect';

// The `UpdateTenantOutletTrusted` mutation requires an argument of type `UpdateTenantOutletTrustedVariables`:
const updateTenantOutletTrustedVars: UpdateTenantOutletTrustedVariables = {
  organizationId: ..., 
  id: ..., 
  name: ..., 
  contactPerson: ..., 
  email: ..., // optional
  phone: ..., 
  address: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `updateTenantOutletTrusted()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateTenantOutletTrusted(updateTenantOutletTrustedVars);
// Variables can be defined inline as well.
const { data } = await updateTenantOutletTrusted({ organizationId: ..., id: ..., name: ..., contactPerson: ..., email: ..., phone: ..., address: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateTenantOutletTrusted(dataConnect, updateTenantOutletTrustedVars);

console.log(data.outlet_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
updateTenantOutletTrusted(updateTenantOutletTrustedVars).then((response) => {
  const data = response.data;
  console.log(data.outlet_update);
  console.log(data.auditEvent_insert);
});
```

### Using `UpdateTenantOutletTrusted`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateTenantOutletTrustedRef, UpdateTenantOutletTrustedVariables } from '@omniretail/sql-connect';

// The `UpdateTenantOutletTrusted` mutation requires an argument of type `UpdateTenantOutletTrustedVariables`:
const updateTenantOutletTrustedVars: UpdateTenantOutletTrustedVariables = {
  organizationId: ..., 
  id: ..., 
  name: ..., 
  contactPerson: ..., 
  email: ..., // optional
  phone: ..., 
  address: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `updateTenantOutletTrustedRef()` function to get a reference to the mutation.
const ref = updateTenantOutletTrustedRef(updateTenantOutletTrustedVars);
// Variables can be defined inline as well.
const ref = updateTenantOutletTrustedRef({ organizationId: ..., id: ..., name: ..., contactPerson: ..., email: ..., phone: ..., address: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateTenantOutletTrustedRef(dataConnect, updateTenantOutletTrustedVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.outlet_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.outlet_update);
  console.log(data.auditEvent_insert);
});
```

## ChangeTenantOutletStatusTrusted
You can execute the `ChangeTenantOutletStatusTrusted` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
changeTenantOutletStatusTrusted(vars: ChangeTenantOutletStatusTrustedVariables): MutationPromise<ChangeTenantOutletStatusTrustedData, ChangeTenantOutletStatusTrustedVariables>;

interface ChangeTenantOutletStatusTrustedRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ChangeTenantOutletStatusTrustedVariables): MutationRef<ChangeTenantOutletStatusTrustedData, ChangeTenantOutletStatusTrustedVariables>;
}
export const changeTenantOutletStatusTrustedRef: ChangeTenantOutletStatusTrustedRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
changeTenantOutletStatusTrusted(dc: DataConnect, vars: ChangeTenantOutletStatusTrustedVariables): MutationPromise<ChangeTenantOutletStatusTrustedData, ChangeTenantOutletStatusTrustedVariables>;

interface ChangeTenantOutletStatusTrustedRef {
  ...
  (dc: DataConnect, vars: ChangeTenantOutletStatusTrustedVariables): MutationRef<ChangeTenantOutletStatusTrustedData, ChangeTenantOutletStatusTrustedVariables>;
}
export const changeTenantOutletStatusTrustedRef: ChangeTenantOutletStatusTrustedRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the changeTenantOutletStatusTrustedRef:
```typescript
const name = changeTenantOutletStatusTrustedRef.operationName;
console.log(name);
```

### Variables
The `ChangeTenantOutletStatusTrusted` mutation requires an argument of type `ChangeTenantOutletStatusTrustedVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ChangeTenantOutletStatusTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
  status: OutletStatus;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}
```
### Return Type
Recall that executing the `ChangeTenantOutletStatusTrusted` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ChangeTenantOutletStatusTrustedData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ChangeTenantOutletStatusTrustedData {
  outlet_update?: Outlet_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `ChangeTenantOutletStatusTrusted`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, changeTenantOutletStatusTrusted, ChangeTenantOutletStatusTrustedVariables } from '@omniretail/sql-connect';

// The `ChangeTenantOutletStatusTrusted` mutation requires an argument of type `ChangeTenantOutletStatusTrustedVariables`:
const changeTenantOutletStatusTrustedVars: ChangeTenantOutletStatusTrustedVariables = {
  organizationId: ..., 
  id: ..., 
  status: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `changeTenantOutletStatusTrusted()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await changeTenantOutletStatusTrusted(changeTenantOutletStatusTrustedVars);
// Variables can be defined inline as well.
const { data } = await changeTenantOutletStatusTrusted({ organizationId: ..., id: ..., status: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await changeTenantOutletStatusTrusted(dataConnect, changeTenantOutletStatusTrustedVars);

console.log(data.outlet_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
changeTenantOutletStatusTrusted(changeTenantOutletStatusTrustedVars).then((response) => {
  const data = response.data;
  console.log(data.outlet_update);
  console.log(data.auditEvent_insert);
});
```

### Using `ChangeTenantOutletStatusTrusted`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, changeTenantOutletStatusTrustedRef, ChangeTenantOutletStatusTrustedVariables } from '@omniretail/sql-connect';

// The `ChangeTenantOutletStatusTrusted` mutation requires an argument of type `ChangeTenantOutletStatusTrustedVariables`:
const changeTenantOutletStatusTrustedVars: ChangeTenantOutletStatusTrustedVariables = {
  organizationId: ..., 
  id: ..., 
  status: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `changeTenantOutletStatusTrustedRef()` function to get a reference to the mutation.
const ref = changeTenantOutletStatusTrustedRef(changeTenantOutletStatusTrustedVars);
// Variables can be defined inline as well.
const ref = changeTenantOutletStatusTrustedRef({ organizationId: ..., id: ..., status: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = changeTenantOutletStatusTrustedRef(dataConnect, changeTenantOutletStatusTrustedVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.outlet_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.outlet_update);
  console.log(data.auditEvent_insert);
});
```

## DeleteTenantOutletTrusted
You can execute the `DeleteTenantOutletTrusted` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
deleteTenantOutletTrusted(vars: DeleteTenantOutletTrustedVariables): MutationPromise<DeleteTenantOutletTrustedData, DeleteTenantOutletTrustedVariables>;

interface DeleteTenantOutletTrustedRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteTenantOutletTrustedVariables): MutationRef<DeleteTenantOutletTrustedData, DeleteTenantOutletTrustedVariables>;
}
export const deleteTenantOutletTrustedRef: DeleteTenantOutletTrustedRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteTenantOutletTrusted(dc: DataConnect, vars: DeleteTenantOutletTrustedVariables): MutationPromise<DeleteTenantOutletTrustedData, DeleteTenantOutletTrustedVariables>;

interface DeleteTenantOutletTrustedRef {
  ...
  (dc: DataConnect, vars: DeleteTenantOutletTrustedVariables): MutationRef<DeleteTenantOutletTrustedData, DeleteTenantOutletTrustedVariables>;
}
export const deleteTenantOutletTrustedRef: DeleteTenantOutletTrustedRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteTenantOutletTrustedRef:
```typescript
const name = deleteTenantOutletTrustedRef.operationName;
console.log(name);
```

### Variables
The `DeleteTenantOutletTrusted` mutation requires an argument of type `DeleteTenantOutletTrustedVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteTenantOutletTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}
```
### Return Type
Recall that executing the `DeleteTenantOutletTrusted` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteTenantOutletTrustedData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteTenantOutletTrustedData {
  outlet_delete?: Outlet_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `DeleteTenantOutletTrusted`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteTenantOutletTrusted, DeleteTenantOutletTrustedVariables } from '@omniretail/sql-connect';

// The `DeleteTenantOutletTrusted` mutation requires an argument of type `DeleteTenantOutletTrustedVariables`:
const deleteTenantOutletTrustedVars: DeleteTenantOutletTrustedVariables = {
  organizationId: ..., 
  id: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `deleteTenantOutletTrusted()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteTenantOutletTrusted(deleteTenantOutletTrustedVars);
// Variables can be defined inline as well.
const { data } = await deleteTenantOutletTrusted({ organizationId: ..., id: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteTenantOutletTrusted(dataConnect, deleteTenantOutletTrustedVars);

console.log(data.outlet_delete);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
deleteTenantOutletTrusted(deleteTenantOutletTrustedVars).then((response) => {
  const data = response.data;
  console.log(data.outlet_delete);
  console.log(data.auditEvent_insert);
});
```

### Using `DeleteTenantOutletTrusted`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteTenantOutletTrustedRef, DeleteTenantOutletTrustedVariables } from '@omniretail/sql-connect';

// The `DeleteTenantOutletTrusted` mutation requires an argument of type `DeleteTenantOutletTrustedVariables`:
const deleteTenantOutletTrustedVars: DeleteTenantOutletTrustedVariables = {
  organizationId: ..., 
  id: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `deleteTenantOutletTrustedRef()` function to get a reference to the mutation.
const ref = deleteTenantOutletTrustedRef(deleteTenantOutletTrustedVars);
// Variables can be defined inline as well.
const ref = deleteTenantOutletTrustedRef({ organizationId: ..., id: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteTenantOutletTrustedRef(dataConnect, deleteTenantOutletTrustedVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.outlet_delete);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.outlet_delete);
  console.log(data.auditEvent_insert);
});
```

## DeleteTenantEmployeeTrusted
You can execute the `DeleteTenantEmployeeTrusted` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
deleteTenantEmployeeTrusted(vars: DeleteTenantEmployeeTrustedVariables): MutationPromise<DeleteTenantEmployeeTrustedData, DeleteTenantEmployeeTrustedVariables>;

interface DeleteTenantEmployeeTrustedRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteTenantEmployeeTrustedVariables): MutationRef<DeleteTenantEmployeeTrustedData, DeleteTenantEmployeeTrustedVariables>;
}
export const deleteTenantEmployeeTrustedRef: DeleteTenantEmployeeTrustedRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteTenantEmployeeTrusted(dc: DataConnect, vars: DeleteTenantEmployeeTrustedVariables): MutationPromise<DeleteTenantEmployeeTrustedData, DeleteTenantEmployeeTrustedVariables>;

interface DeleteTenantEmployeeTrustedRef {
  ...
  (dc: DataConnect, vars: DeleteTenantEmployeeTrustedVariables): MutationRef<DeleteTenantEmployeeTrustedData, DeleteTenantEmployeeTrustedVariables>;
}
export const deleteTenantEmployeeTrustedRef: DeleteTenantEmployeeTrustedRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteTenantEmployeeTrustedRef:
```typescript
const name = deleteTenantEmployeeTrustedRef.operationName;
console.log(name);
```

### Variables
The `DeleteTenantEmployeeTrusted` mutation requires an argument of type `DeleteTenantEmployeeTrustedVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteTenantEmployeeTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}
```
### Return Type
Recall that executing the `DeleteTenantEmployeeTrusted` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteTenantEmployeeTrustedData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteTenantEmployeeTrustedData {
  employee_delete?: Employee_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `DeleteTenantEmployeeTrusted`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteTenantEmployeeTrusted, DeleteTenantEmployeeTrustedVariables } from '@omniretail/sql-connect';

// The `DeleteTenantEmployeeTrusted` mutation requires an argument of type `DeleteTenantEmployeeTrustedVariables`:
const deleteTenantEmployeeTrustedVars: DeleteTenantEmployeeTrustedVariables = {
  organizationId: ..., 
  id: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `deleteTenantEmployeeTrusted()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteTenantEmployeeTrusted(deleteTenantEmployeeTrustedVars);
// Variables can be defined inline as well.
const { data } = await deleteTenantEmployeeTrusted({ organizationId: ..., id: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteTenantEmployeeTrusted(dataConnect, deleteTenantEmployeeTrustedVars);

console.log(data.employee_delete);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
deleteTenantEmployeeTrusted(deleteTenantEmployeeTrustedVars).then((response) => {
  const data = response.data;
  console.log(data.employee_delete);
  console.log(data.auditEvent_insert);
});
```

### Using `DeleteTenantEmployeeTrusted`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteTenantEmployeeTrustedRef, DeleteTenantEmployeeTrustedVariables } from '@omniretail/sql-connect';

// The `DeleteTenantEmployeeTrusted` mutation requires an argument of type `DeleteTenantEmployeeTrustedVariables`:
const deleteTenantEmployeeTrustedVars: DeleteTenantEmployeeTrustedVariables = {
  organizationId: ..., 
  id: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `deleteTenantEmployeeTrustedRef()` function to get a reference to the mutation.
const ref = deleteTenantEmployeeTrustedRef(deleteTenantEmployeeTrustedVars);
// Variables can be defined inline as well.
const ref = deleteTenantEmployeeTrustedRef({ organizationId: ..., id: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteTenantEmployeeTrustedRef(dataConnect, deleteTenantEmployeeTrustedVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.employee_delete);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.employee_delete);
  console.log(data.auditEvent_insert);
});
```

## DeleteTenantServicePersonTrusted
You can execute the `DeleteTenantServicePersonTrusted` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
deleteTenantServicePersonTrusted(vars: DeleteTenantServicePersonTrustedVariables): MutationPromise<DeleteTenantServicePersonTrustedData, DeleteTenantServicePersonTrustedVariables>;

interface DeleteTenantServicePersonTrustedRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteTenantServicePersonTrustedVariables): MutationRef<DeleteTenantServicePersonTrustedData, DeleteTenantServicePersonTrustedVariables>;
}
export const deleteTenantServicePersonTrustedRef: DeleteTenantServicePersonTrustedRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteTenantServicePersonTrusted(dc: DataConnect, vars: DeleteTenantServicePersonTrustedVariables): MutationPromise<DeleteTenantServicePersonTrustedData, DeleteTenantServicePersonTrustedVariables>;

interface DeleteTenantServicePersonTrustedRef {
  ...
  (dc: DataConnect, vars: DeleteTenantServicePersonTrustedVariables): MutationRef<DeleteTenantServicePersonTrustedData, DeleteTenantServicePersonTrustedVariables>;
}
export const deleteTenantServicePersonTrustedRef: DeleteTenantServicePersonTrustedRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteTenantServicePersonTrustedRef:
```typescript
const name = deleteTenantServicePersonTrustedRef.operationName;
console.log(name);
```

### Variables
The `DeleteTenantServicePersonTrusted` mutation requires an argument of type `DeleteTenantServicePersonTrustedVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteTenantServicePersonTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}
```
### Return Type
Recall that executing the `DeleteTenantServicePersonTrusted` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteTenantServicePersonTrustedData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteTenantServicePersonTrustedData {
  servicePerson_delete?: ServicePerson_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `DeleteTenantServicePersonTrusted`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteTenantServicePersonTrusted, DeleteTenantServicePersonTrustedVariables } from '@omniretail/sql-connect';

// The `DeleteTenantServicePersonTrusted` mutation requires an argument of type `DeleteTenantServicePersonTrustedVariables`:
const deleteTenantServicePersonTrustedVars: DeleteTenantServicePersonTrustedVariables = {
  organizationId: ..., 
  id: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `deleteTenantServicePersonTrusted()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteTenantServicePersonTrusted(deleteTenantServicePersonTrustedVars);
// Variables can be defined inline as well.
const { data } = await deleteTenantServicePersonTrusted({ organizationId: ..., id: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteTenantServicePersonTrusted(dataConnect, deleteTenantServicePersonTrustedVars);

console.log(data.servicePerson_delete);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
deleteTenantServicePersonTrusted(deleteTenantServicePersonTrustedVars).then((response) => {
  const data = response.data;
  console.log(data.servicePerson_delete);
  console.log(data.auditEvent_insert);
});
```

### Using `DeleteTenantServicePersonTrusted`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteTenantServicePersonTrustedRef, DeleteTenantServicePersonTrustedVariables } from '@omniretail/sql-connect';

// The `DeleteTenantServicePersonTrusted` mutation requires an argument of type `DeleteTenantServicePersonTrustedVariables`:
const deleteTenantServicePersonTrustedVars: DeleteTenantServicePersonTrustedVariables = {
  organizationId: ..., 
  id: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `deleteTenantServicePersonTrustedRef()` function to get a reference to the mutation.
const ref = deleteTenantServicePersonTrustedRef(deleteTenantServicePersonTrustedVars);
// Variables can be defined inline as well.
const ref = deleteTenantServicePersonTrustedRef({ organizationId: ..., id: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteTenantServicePersonTrustedRef(dataConnect, deleteTenantServicePersonTrustedVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.servicePerson_delete);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.servicePerson_delete);
  console.log(data.auditEvent_insert);
});
```

## DeleteTenantCustomerTrusted
You can execute the `DeleteTenantCustomerTrusted` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
deleteTenantCustomerTrusted(vars: DeleteTenantCustomerTrustedVariables): MutationPromise<DeleteTenantCustomerTrustedData, DeleteTenantCustomerTrustedVariables>;

interface DeleteTenantCustomerTrustedRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteTenantCustomerTrustedVariables): MutationRef<DeleteTenantCustomerTrustedData, DeleteTenantCustomerTrustedVariables>;
}
export const deleteTenantCustomerTrustedRef: DeleteTenantCustomerTrustedRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteTenantCustomerTrusted(dc: DataConnect, vars: DeleteTenantCustomerTrustedVariables): MutationPromise<DeleteTenantCustomerTrustedData, DeleteTenantCustomerTrustedVariables>;

interface DeleteTenantCustomerTrustedRef {
  ...
  (dc: DataConnect, vars: DeleteTenantCustomerTrustedVariables): MutationRef<DeleteTenantCustomerTrustedData, DeleteTenantCustomerTrustedVariables>;
}
export const deleteTenantCustomerTrustedRef: DeleteTenantCustomerTrustedRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteTenantCustomerTrustedRef:
```typescript
const name = deleteTenantCustomerTrustedRef.operationName;
console.log(name);
```

### Variables
The `DeleteTenantCustomerTrusted` mutation requires an argument of type `DeleteTenantCustomerTrustedVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteTenantCustomerTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}
```
### Return Type
Recall that executing the `DeleteTenantCustomerTrusted` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteTenantCustomerTrustedData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteTenantCustomerTrustedData {
  customer_delete?: Customer_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `DeleteTenantCustomerTrusted`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteTenantCustomerTrusted, DeleteTenantCustomerTrustedVariables } from '@omniretail/sql-connect';

// The `DeleteTenantCustomerTrusted` mutation requires an argument of type `DeleteTenantCustomerTrustedVariables`:
const deleteTenantCustomerTrustedVars: DeleteTenantCustomerTrustedVariables = {
  organizationId: ..., 
  id: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `deleteTenantCustomerTrusted()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteTenantCustomerTrusted(deleteTenantCustomerTrustedVars);
// Variables can be defined inline as well.
const { data } = await deleteTenantCustomerTrusted({ organizationId: ..., id: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteTenantCustomerTrusted(dataConnect, deleteTenantCustomerTrustedVars);

console.log(data.customer_delete);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
deleteTenantCustomerTrusted(deleteTenantCustomerTrustedVars).then((response) => {
  const data = response.data;
  console.log(data.customer_delete);
  console.log(data.auditEvent_insert);
});
```

### Using `DeleteTenantCustomerTrusted`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteTenantCustomerTrustedRef, DeleteTenantCustomerTrustedVariables } from '@omniretail/sql-connect';

// The `DeleteTenantCustomerTrusted` mutation requires an argument of type `DeleteTenantCustomerTrustedVariables`:
const deleteTenantCustomerTrustedVars: DeleteTenantCustomerTrustedVariables = {
  organizationId: ..., 
  id: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `deleteTenantCustomerTrustedRef()` function to get a reference to the mutation.
const ref = deleteTenantCustomerTrustedRef(deleteTenantCustomerTrustedVars);
// Variables can be defined inline as well.
const ref = deleteTenantCustomerTrustedRef({ organizationId: ..., id: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteTenantCustomerTrustedRef(dataConnect, deleteTenantCustomerTrustedVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.customer_delete);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.customer_delete);
  console.log(data.auditEvent_insert);
});
```

## DeleteTenantSupplierTrusted
You can execute the `DeleteTenantSupplierTrusted` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
deleteTenantSupplierTrusted(vars: DeleteTenantSupplierTrustedVariables): MutationPromise<DeleteTenantSupplierTrustedData, DeleteTenantSupplierTrustedVariables>;

interface DeleteTenantSupplierTrustedRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteTenantSupplierTrustedVariables): MutationRef<DeleteTenantSupplierTrustedData, DeleteTenantSupplierTrustedVariables>;
}
export const deleteTenantSupplierTrustedRef: DeleteTenantSupplierTrustedRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteTenantSupplierTrusted(dc: DataConnect, vars: DeleteTenantSupplierTrustedVariables): MutationPromise<DeleteTenantSupplierTrustedData, DeleteTenantSupplierTrustedVariables>;

interface DeleteTenantSupplierTrustedRef {
  ...
  (dc: DataConnect, vars: DeleteTenantSupplierTrustedVariables): MutationRef<DeleteTenantSupplierTrustedData, DeleteTenantSupplierTrustedVariables>;
}
export const deleteTenantSupplierTrustedRef: DeleteTenantSupplierTrustedRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteTenantSupplierTrustedRef:
```typescript
const name = deleteTenantSupplierTrustedRef.operationName;
console.log(name);
```

### Variables
The `DeleteTenantSupplierTrusted` mutation requires an argument of type `DeleteTenantSupplierTrustedVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteTenantSupplierTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}
```
### Return Type
Recall that executing the `DeleteTenantSupplierTrusted` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteTenantSupplierTrustedData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteTenantSupplierTrustedData {
  supplier_delete?: Supplier_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `DeleteTenantSupplierTrusted`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteTenantSupplierTrusted, DeleteTenantSupplierTrustedVariables } from '@omniretail/sql-connect';

// The `DeleteTenantSupplierTrusted` mutation requires an argument of type `DeleteTenantSupplierTrustedVariables`:
const deleteTenantSupplierTrustedVars: DeleteTenantSupplierTrustedVariables = {
  organizationId: ..., 
  id: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `deleteTenantSupplierTrusted()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteTenantSupplierTrusted(deleteTenantSupplierTrustedVars);
// Variables can be defined inline as well.
const { data } = await deleteTenantSupplierTrusted({ organizationId: ..., id: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteTenantSupplierTrusted(dataConnect, deleteTenantSupplierTrustedVars);

console.log(data.supplier_delete);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
deleteTenantSupplierTrusted(deleteTenantSupplierTrustedVars).then((response) => {
  const data = response.data;
  console.log(data.supplier_delete);
  console.log(data.auditEvent_insert);
});
```

### Using `DeleteTenantSupplierTrusted`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteTenantSupplierTrustedRef, DeleteTenantSupplierTrustedVariables } from '@omniretail/sql-connect';

// The `DeleteTenantSupplierTrusted` mutation requires an argument of type `DeleteTenantSupplierTrustedVariables`:
const deleteTenantSupplierTrustedVars: DeleteTenantSupplierTrustedVariables = {
  organizationId: ..., 
  id: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `deleteTenantSupplierTrustedRef()` function to get a reference to the mutation.
const ref = deleteTenantSupplierTrustedRef(deleteTenantSupplierTrustedVars);
// Variables can be defined inline as well.
const ref = deleteTenantSupplierTrustedRef({ organizationId: ..., id: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteTenantSupplierTrustedRef(dataConnect, deleteTenantSupplierTrustedVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.supplier_delete);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.supplier_delete);
  console.log(data.auditEvent_insert);
});
```

## DeleteTenantProductTrusted
You can execute the `DeleteTenantProductTrusted` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
deleteTenantProductTrusted(vars: DeleteTenantProductTrustedVariables): MutationPromise<DeleteTenantProductTrustedData, DeleteTenantProductTrustedVariables>;

interface DeleteTenantProductTrustedRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteTenantProductTrustedVariables): MutationRef<DeleteTenantProductTrustedData, DeleteTenantProductTrustedVariables>;
}
export const deleteTenantProductTrustedRef: DeleteTenantProductTrustedRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteTenantProductTrusted(dc: DataConnect, vars: DeleteTenantProductTrustedVariables): MutationPromise<DeleteTenantProductTrustedData, DeleteTenantProductTrustedVariables>;

interface DeleteTenantProductTrustedRef {
  ...
  (dc: DataConnect, vars: DeleteTenantProductTrustedVariables): MutationRef<DeleteTenantProductTrustedData, DeleteTenantProductTrustedVariables>;
}
export const deleteTenantProductTrustedRef: DeleteTenantProductTrustedRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteTenantProductTrustedRef:
```typescript
const name = deleteTenantProductTrustedRef.operationName;
console.log(name);
```

### Variables
The `DeleteTenantProductTrusted` mutation requires an argument of type `DeleteTenantProductTrustedVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteTenantProductTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}
```
### Return Type
Recall that executing the `DeleteTenantProductTrusted` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteTenantProductTrustedData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteTenantProductTrustedData {
  product_delete?: Product_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `DeleteTenantProductTrusted`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteTenantProductTrusted, DeleteTenantProductTrustedVariables } from '@omniretail/sql-connect';

// The `DeleteTenantProductTrusted` mutation requires an argument of type `DeleteTenantProductTrustedVariables`:
const deleteTenantProductTrustedVars: DeleteTenantProductTrustedVariables = {
  organizationId: ..., 
  id: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `deleteTenantProductTrusted()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteTenantProductTrusted(deleteTenantProductTrustedVars);
// Variables can be defined inline as well.
const { data } = await deleteTenantProductTrusted({ organizationId: ..., id: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteTenantProductTrusted(dataConnect, deleteTenantProductTrustedVars);

console.log(data.product_delete);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
deleteTenantProductTrusted(deleteTenantProductTrustedVars).then((response) => {
  const data = response.data;
  console.log(data.product_delete);
  console.log(data.auditEvent_insert);
});
```

### Using `DeleteTenantProductTrusted`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteTenantProductTrustedRef, DeleteTenantProductTrustedVariables } from '@omniretail/sql-connect';

// The `DeleteTenantProductTrusted` mutation requires an argument of type `DeleteTenantProductTrustedVariables`:
const deleteTenantProductTrustedVars: DeleteTenantProductTrustedVariables = {
  organizationId: ..., 
  id: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `deleteTenantProductTrustedRef()` function to get a reference to the mutation.
const ref = deleteTenantProductTrustedRef(deleteTenantProductTrustedVars);
// Variables can be defined inline as well.
const ref = deleteTenantProductTrustedRef({ organizationId: ..., id: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteTenantProductTrustedRef(dataConnect, deleteTenantProductTrustedVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.product_delete);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.product_delete);
  console.log(data.auditEvent_insert);
});
```

## CreateTenantEmployeeProfileTrusted
You can execute the `CreateTenantEmployeeProfileTrusted` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
createTenantEmployeeProfileTrusted(vars: CreateTenantEmployeeProfileTrustedVariables): MutationPromise<CreateTenantEmployeeProfileTrustedData, CreateTenantEmployeeProfileTrustedVariables>;

interface CreateTenantEmployeeProfileTrustedRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTenantEmployeeProfileTrustedVariables): MutationRef<CreateTenantEmployeeProfileTrustedData, CreateTenantEmployeeProfileTrustedVariables>;
}
export const createTenantEmployeeProfileTrustedRef: CreateTenantEmployeeProfileTrustedRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createTenantEmployeeProfileTrusted(dc: DataConnect, vars: CreateTenantEmployeeProfileTrustedVariables): MutationPromise<CreateTenantEmployeeProfileTrustedData, CreateTenantEmployeeProfileTrustedVariables>;

interface CreateTenantEmployeeProfileTrustedRef {
  ...
  (dc: DataConnect, vars: CreateTenantEmployeeProfileTrustedVariables): MutationRef<CreateTenantEmployeeProfileTrustedData, CreateTenantEmployeeProfileTrustedVariables>;
}
export const createTenantEmployeeProfileTrustedRef: CreateTenantEmployeeProfileTrustedRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createTenantEmployeeProfileTrustedRef:
```typescript
const name = createTenantEmployeeProfileTrustedRef.operationName;
console.log(name);
```

### Variables
The `CreateTenantEmployeeProfileTrusted` mutation requires an argument of type `CreateTenantEmployeeProfileTrustedVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateTenantEmployeeProfileTrustedVariables {
  id: UUIDString;
  organizationId: UUIDString;
  fullName: string;
  email?: string | null;
  phone: string;
  designation: string;
  department?: string | null;
  dateOfJoining: DateString;
  assignmentScope: string;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}
```
### Return Type
Recall that executing the `CreateTenantEmployeeProfileTrusted` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateTenantEmployeeProfileTrustedData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateTenantEmployeeProfileTrustedData {
  employee_insert: Employee_Key;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `CreateTenantEmployeeProfileTrusted`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createTenantEmployeeProfileTrusted, CreateTenantEmployeeProfileTrustedVariables } from '@omniretail/sql-connect';

// The `CreateTenantEmployeeProfileTrusted` mutation requires an argument of type `CreateTenantEmployeeProfileTrustedVariables`:
const createTenantEmployeeProfileTrustedVars: CreateTenantEmployeeProfileTrustedVariables = {
  id: ..., 
  organizationId: ..., 
  fullName: ..., 
  email: ..., // optional
  phone: ..., 
  designation: ..., 
  department: ..., // optional
  dateOfJoining: ..., 
  assignmentScope: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `createTenantEmployeeProfileTrusted()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createTenantEmployeeProfileTrusted(createTenantEmployeeProfileTrustedVars);
// Variables can be defined inline as well.
const { data } = await createTenantEmployeeProfileTrusted({ id: ..., organizationId: ..., fullName: ..., email: ..., phone: ..., designation: ..., department: ..., dateOfJoining: ..., assignmentScope: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createTenantEmployeeProfileTrusted(dataConnect, createTenantEmployeeProfileTrustedVars);

console.log(data.employee_insert);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
createTenantEmployeeProfileTrusted(createTenantEmployeeProfileTrustedVars).then((response) => {
  const data = response.data;
  console.log(data.employee_insert);
  console.log(data.auditEvent_insert);
});
```

### Using `CreateTenantEmployeeProfileTrusted`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createTenantEmployeeProfileTrustedRef, CreateTenantEmployeeProfileTrustedVariables } from '@omniretail/sql-connect';

// The `CreateTenantEmployeeProfileTrusted` mutation requires an argument of type `CreateTenantEmployeeProfileTrustedVariables`:
const createTenantEmployeeProfileTrustedVars: CreateTenantEmployeeProfileTrustedVariables = {
  id: ..., 
  organizationId: ..., 
  fullName: ..., 
  email: ..., // optional
  phone: ..., 
  designation: ..., 
  department: ..., // optional
  dateOfJoining: ..., 
  assignmentScope: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `createTenantEmployeeProfileTrustedRef()` function to get a reference to the mutation.
const ref = createTenantEmployeeProfileTrustedRef(createTenantEmployeeProfileTrustedVars);
// Variables can be defined inline as well.
const ref = createTenantEmployeeProfileTrustedRef({ id: ..., organizationId: ..., fullName: ..., email: ..., phone: ..., designation: ..., department: ..., dateOfJoining: ..., assignmentScope: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createTenantEmployeeProfileTrustedRef(dataConnect, createTenantEmployeeProfileTrustedVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.employee_insert);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.employee_insert);
  console.log(data.auditEvent_insert);
});
```

## ProvisionTenantEmployeeTrusted
You can execute the `ProvisionTenantEmployeeTrusted` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
provisionTenantEmployeeTrusted(vars: ProvisionTenantEmployeeTrustedVariables): MutationPromise<ProvisionTenantEmployeeTrustedData, ProvisionTenantEmployeeTrustedVariables>;

interface ProvisionTenantEmployeeTrustedRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ProvisionTenantEmployeeTrustedVariables): MutationRef<ProvisionTenantEmployeeTrustedData, ProvisionTenantEmployeeTrustedVariables>;
}
export const provisionTenantEmployeeTrustedRef: ProvisionTenantEmployeeTrustedRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
provisionTenantEmployeeTrusted(dc: DataConnect, vars: ProvisionTenantEmployeeTrustedVariables): MutationPromise<ProvisionTenantEmployeeTrustedData, ProvisionTenantEmployeeTrustedVariables>;

interface ProvisionTenantEmployeeTrustedRef {
  ...
  (dc: DataConnect, vars: ProvisionTenantEmployeeTrustedVariables): MutationRef<ProvisionTenantEmployeeTrustedData, ProvisionTenantEmployeeTrustedVariables>;
}
export const provisionTenantEmployeeTrustedRef: ProvisionTenantEmployeeTrustedRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the provisionTenantEmployeeTrustedRef:
```typescript
const name = provisionTenantEmployeeTrustedRef.operationName;
console.log(name);
```

### Variables
The `ProvisionTenantEmployeeTrusted` mutation requires an argument of type `ProvisionTenantEmployeeTrustedVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ProvisionTenantEmployeeTrustedVariables {
  id: UUIDString;
  userId: UUIDString;
  firebaseUid: string;
  username: string;
  email: string;
  organizationId: UUIDString;
  fullName: string;
  phone: string;
  designation: string;
  department?: string | null;
  dateOfJoining: DateString;
  assignmentScope: string;
  roleId: UUIDString;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}
```
### Return Type
Recall that executing the `ProvisionTenantEmployeeTrusted` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ProvisionTenantEmployeeTrustedData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ProvisionTenantEmployeeTrustedData {
  appUser_insert: AppUser_Key;
  organizationMembership_insert: OrganizationMembership_Key;
  userRole_upsert: UserRole_Key;
  employee_insert: Employee_Key;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `ProvisionTenantEmployeeTrusted`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, provisionTenantEmployeeTrusted, ProvisionTenantEmployeeTrustedVariables } from '@omniretail/sql-connect';

// The `ProvisionTenantEmployeeTrusted` mutation requires an argument of type `ProvisionTenantEmployeeTrustedVariables`:
const provisionTenantEmployeeTrustedVars: ProvisionTenantEmployeeTrustedVariables = {
  id: ..., 
  userId: ..., 
  firebaseUid: ..., 
  username: ..., 
  email: ..., 
  organizationId: ..., 
  fullName: ..., 
  phone: ..., 
  designation: ..., 
  department: ..., // optional
  dateOfJoining: ..., 
  assignmentScope: ..., 
  roleId: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `provisionTenantEmployeeTrusted()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await provisionTenantEmployeeTrusted(provisionTenantEmployeeTrustedVars);
// Variables can be defined inline as well.
const { data } = await provisionTenantEmployeeTrusted({ id: ..., userId: ..., firebaseUid: ..., username: ..., email: ..., organizationId: ..., fullName: ..., phone: ..., designation: ..., department: ..., dateOfJoining: ..., assignmentScope: ..., roleId: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await provisionTenantEmployeeTrusted(dataConnect, provisionTenantEmployeeTrustedVars);

console.log(data.appUser_insert);
console.log(data.organizationMembership_insert);
console.log(data.userRole_upsert);
console.log(data.employee_insert);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
provisionTenantEmployeeTrusted(provisionTenantEmployeeTrustedVars).then((response) => {
  const data = response.data;
  console.log(data.appUser_insert);
  console.log(data.organizationMembership_insert);
  console.log(data.userRole_upsert);
  console.log(data.employee_insert);
  console.log(data.auditEvent_insert);
});
```

### Using `ProvisionTenantEmployeeTrusted`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, provisionTenantEmployeeTrustedRef, ProvisionTenantEmployeeTrustedVariables } from '@omniretail/sql-connect';

// The `ProvisionTenantEmployeeTrusted` mutation requires an argument of type `ProvisionTenantEmployeeTrustedVariables`:
const provisionTenantEmployeeTrustedVars: ProvisionTenantEmployeeTrustedVariables = {
  id: ..., 
  userId: ..., 
  firebaseUid: ..., 
  username: ..., 
  email: ..., 
  organizationId: ..., 
  fullName: ..., 
  phone: ..., 
  designation: ..., 
  department: ..., // optional
  dateOfJoining: ..., 
  assignmentScope: ..., 
  roleId: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `provisionTenantEmployeeTrustedRef()` function to get a reference to the mutation.
const ref = provisionTenantEmployeeTrustedRef(provisionTenantEmployeeTrustedVars);
// Variables can be defined inline as well.
const ref = provisionTenantEmployeeTrustedRef({ id: ..., userId: ..., firebaseUid: ..., username: ..., email: ..., organizationId: ..., fullName: ..., phone: ..., designation: ..., department: ..., dateOfJoining: ..., assignmentScope: ..., roleId: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = provisionTenantEmployeeTrustedRef(dataConnect, provisionTenantEmployeeTrustedVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.appUser_insert);
console.log(data.organizationMembership_insert);
console.log(data.userRole_upsert);
console.log(data.employee_insert);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.appUser_insert);
  console.log(data.organizationMembership_insert);
  console.log(data.userRole_upsert);
  console.log(data.employee_insert);
  console.log(data.auditEvent_insert);
});
```

## UpdateTenantEmployeeTrusted
You can execute the `UpdateTenantEmployeeTrusted` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
updateTenantEmployeeTrusted(vars: UpdateTenantEmployeeTrustedVariables): MutationPromise<UpdateTenantEmployeeTrustedData, UpdateTenantEmployeeTrustedVariables>;

interface UpdateTenantEmployeeTrustedRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTenantEmployeeTrustedVariables): MutationRef<UpdateTenantEmployeeTrustedData, UpdateTenantEmployeeTrustedVariables>;
}
export const updateTenantEmployeeTrustedRef: UpdateTenantEmployeeTrustedRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateTenantEmployeeTrusted(dc: DataConnect, vars: UpdateTenantEmployeeTrustedVariables): MutationPromise<UpdateTenantEmployeeTrustedData, UpdateTenantEmployeeTrustedVariables>;

interface UpdateTenantEmployeeTrustedRef {
  ...
  (dc: DataConnect, vars: UpdateTenantEmployeeTrustedVariables): MutationRef<UpdateTenantEmployeeTrustedData, UpdateTenantEmployeeTrustedVariables>;
}
export const updateTenantEmployeeTrustedRef: UpdateTenantEmployeeTrustedRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateTenantEmployeeTrustedRef:
```typescript
const name = updateTenantEmployeeTrustedRef.operationName;
console.log(name);
```

### Variables
The `UpdateTenantEmployeeTrusted` mutation requires an argument of type `UpdateTenantEmployeeTrustedVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateTenantEmployeeTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
  fullName: string;
  email?: string | null;
  phone: string;
  designation: string;
  department?: string | null;
  dateOfJoining: DateString;
  assignmentScope: string;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}
```
### Return Type
Recall that executing the `UpdateTenantEmployeeTrusted` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateTenantEmployeeTrustedData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateTenantEmployeeTrustedData {
  employee_update?: Employee_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `UpdateTenantEmployeeTrusted`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateTenantEmployeeTrusted, UpdateTenantEmployeeTrustedVariables } from '@omniretail/sql-connect';

// The `UpdateTenantEmployeeTrusted` mutation requires an argument of type `UpdateTenantEmployeeTrustedVariables`:
const updateTenantEmployeeTrustedVars: UpdateTenantEmployeeTrustedVariables = {
  organizationId: ..., 
  id: ..., 
  fullName: ..., 
  email: ..., // optional
  phone: ..., 
  designation: ..., 
  department: ..., // optional
  dateOfJoining: ..., 
  assignmentScope: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `updateTenantEmployeeTrusted()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateTenantEmployeeTrusted(updateTenantEmployeeTrustedVars);
// Variables can be defined inline as well.
const { data } = await updateTenantEmployeeTrusted({ organizationId: ..., id: ..., fullName: ..., email: ..., phone: ..., designation: ..., department: ..., dateOfJoining: ..., assignmentScope: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateTenantEmployeeTrusted(dataConnect, updateTenantEmployeeTrustedVars);

console.log(data.employee_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
updateTenantEmployeeTrusted(updateTenantEmployeeTrustedVars).then((response) => {
  const data = response.data;
  console.log(data.employee_update);
  console.log(data.auditEvent_insert);
});
```

### Using `UpdateTenantEmployeeTrusted`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateTenantEmployeeTrustedRef, UpdateTenantEmployeeTrustedVariables } from '@omniretail/sql-connect';

// The `UpdateTenantEmployeeTrusted` mutation requires an argument of type `UpdateTenantEmployeeTrustedVariables`:
const updateTenantEmployeeTrustedVars: UpdateTenantEmployeeTrustedVariables = {
  organizationId: ..., 
  id: ..., 
  fullName: ..., 
  email: ..., // optional
  phone: ..., 
  designation: ..., 
  department: ..., // optional
  dateOfJoining: ..., 
  assignmentScope: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `updateTenantEmployeeTrustedRef()` function to get a reference to the mutation.
const ref = updateTenantEmployeeTrustedRef(updateTenantEmployeeTrustedVars);
// Variables can be defined inline as well.
const ref = updateTenantEmployeeTrustedRef({ organizationId: ..., id: ..., fullName: ..., email: ..., phone: ..., designation: ..., department: ..., dateOfJoining: ..., assignmentScope: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateTenantEmployeeTrustedRef(dataConnect, updateTenantEmployeeTrustedVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.employee_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.employee_update);
  console.log(data.auditEvent_insert);
});
```

## ChangeTenantEmployeeStatusTrusted
You can execute the `ChangeTenantEmployeeStatusTrusted` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
changeTenantEmployeeStatusTrusted(vars: ChangeTenantEmployeeStatusTrustedVariables): MutationPromise<ChangeTenantEmployeeStatusTrustedData, ChangeTenantEmployeeStatusTrustedVariables>;

interface ChangeTenantEmployeeStatusTrustedRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ChangeTenantEmployeeStatusTrustedVariables): MutationRef<ChangeTenantEmployeeStatusTrustedData, ChangeTenantEmployeeStatusTrustedVariables>;
}
export const changeTenantEmployeeStatusTrustedRef: ChangeTenantEmployeeStatusTrustedRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
changeTenantEmployeeStatusTrusted(dc: DataConnect, vars: ChangeTenantEmployeeStatusTrustedVariables): MutationPromise<ChangeTenantEmployeeStatusTrustedData, ChangeTenantEmployeeStatusTrustedVariables>;

interface ChangeTenantEmployeeStatusTrustedRef {
  ...
  (dc: DataConnect, vars: ChangeTenantEmployeeStatusTrustedVariables): MutationRef<ChangeTenantEmployeeStatusTrustedData, ChangeTenantEmployeeStatusTrustedVariables>;
}
export const changeTenantEmployeeStatusTrustedRef: ChangeTenantEmployeeStatusTrustedRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the changeTenantEmployeeStatusTrustedRef:
```typescript
const name = changeTenantEmployeeStatusTrustedRef.operationName;
console.log(name);
```

### Variables
The `ChangeTenantEmployeeStatusTrusted` mutation requires an argument of type `ChangeTenantEmployeeStatusTrustedVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ChangeTenantEmployeeStatusTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
  status: EmploymentStatus;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}
```
### Return Type
Recall that executing the `ChangeTenantEmployeeStatusTrusted` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ChangeTenantEmployeeStatusTrustedData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ChangeTenantEmployeeStatusTrustedData {
  employee_update?: Employee_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `ChangeTenantEmployeeStatusTrusted`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, changeTenantEmployeeStatusTrusted, ChangeTenantEmployeeStatusTrustedVariables } from '@omniretail/sql-connect';

// The `ChangeTenantEmployeeStatusTrusted` mutation requires an argument of type `ChangeTenantEmployeeStatusTrustedVariables`:
const changeTenantEmployeeStatusTrustedVars: ChangeTenantEmployeeStatusTrustedVariables = {
  organizationId: ..., 
  id: ..., 
  status: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `changeTenantEmployeeStatusTrusted()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await changeTenantEmployeeStatusTrusted(changeTenantEmployeeStatusTrustedVars);
// Variables can be defined inline as well.
const { data } = await changeTenantEmployeeStatusTrusted({ organizationId: ..., id: ..., status: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await changeTenantEmployeeStatusTrusted(dataConnect, changeTenantEmployeeStatusTrustedVars);

console.log(data.employee_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
changeTenantEmployeeStatusTrusted(changeTenantEmployeeStatusTrustedVars).then((response) => {
  const data = response.data;
  console.log(data.employee_update);
  console.log(data.auditEvent_insert);
});
```

### Using `ChangeTenantEmployeeStatusTrusted`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, changeTenantEmployeeStatusTrustedRef, ChangeTenantEmployeeStatusTrustedVariables } from '@omniretail/sql-connect';

// The `ChangeTenantEmployeeStatusTrusted` mutation requires an argument of type `ChangeTenantEmployeeStatusTrustedVariables`:
const changeTenantEmployeeStatusTrustedVars: ChangeTenantEmployeeStatusTrustedVariables = {
  organizationId: ..., 
  id: ..., 
  status: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `changeTenantEmployeeStatusTrustedRef()` function to get a reference to the mutation.
const ref = changeTenantEmployeeStatusTrustedRef(changeTenantEmployeeStatusTrustedVars);
// Variables can be defined inline as well.
const ref = changeTenantEmployeeStatusTrustedRef({ organizationId: ..., id: ..., status: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = changeTenantEmployeeStatusTrustedRef(dataConnect, changeTenantEmployeeStatusTrustedVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.employee_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.employee_update);
  console.log(data.auditEvent_insert);
});
```

## ChangeTenantEmployeeLoginAccessTrusted
You can execute the `ChangeTenantEmployeeLoginAccessTrusted` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
changeTenantEmployeeLoginAccessTrusted(vars: ChangeTenantEmployeeLoginAccessTrustedVariables): MutationPromise<ChangeTenantEmployeeLoginAccessTrustedData, ChangeTenantEmployeeLoginAccessTrustedVariables>;

interface ChangeTenantEmployeeLoginAccessTrustedRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ChangeTenantEmployeeLoginAccessTrustedVariables): MutationRef<ChangeTenantEmployeeLoginAccessTrustedData, ChangeTenantEmployeeLoginAccessTrustedVariables>;
}
export const changeTenantEmployeeLoginAccessTrustedRef: ChangeTenantEmployeeLoginAccessTrustedRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
changeTenantEmployeeLoginAccessTrusted(dc: DataConnect, vars: ChangeTenantEmployeeLoginAccessTrustedVariables): MutationPromise<ChangeTenantEmployeeLoginAccessTrustedData, ChangeTenantEmployeeLoginAccessTrustedVariables>;

interface ChangeTenantEmployeeLoginAccessTrustedRef {
  ...
  (dc: DataConnect, vars: ChangeTenantEmployeeLoginAccessTrustedVariables): MutationRef<ChangeTenantEmployeeLoginAccessTrustedData, ChangeTenantEmployeeLoginAccessTrustedVariables>;
}
export const changeTenantEmployeeLoginAccessTrustedRef: ChangeTenantEmployeeLoginAccessTrustedRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the changeTenantEmployeeLoginAccessTrustedRef:
```typescript
const name = changeTenantEmployeeLoginAccessTrustedRef.operationName;
console.log(name);
```

### Variables
The `ChangeTenantEmployeeLoginAccessTrusted` mutation requires an argument of type `ChangeTenantEmployeeLoginAccessTrustedVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ChangeTenantEmployeeLoginAccessTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
  userId: UUIDString;
  loginAccess: LoginAccessStatus;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}
```
### Return Type
Recall that executing the `ChangeTenantEmployeeLoginAccessTrusted` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ChangeTenantEmployeeLoginAccessTrustedData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ChangeTenantEmployeeLoginAccessTrustedData {
  employee_update?: Employee_Key | null;
  appUser_update?: AppUser_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `ChangeTenantEmployeeLoginAccessTrusted`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, changeTenantEmployeeLoginAccessTrusted, ChangeTenantEmployeeLoginAccessTrustedVariables } from '@omniretail/sql-connect';

// The `ChangeTenantEmployeeLoginAccessTrusted` mutation requires an argument of type `ChangeTenantEmployeeLoginAccessTrustedVariables`:
const changeTenantEmployeeLoginAccessTrustedVars: ChangeTenantEmployeeLoginAccessTrustedVariables = {
  organizationId: ..., 
  id: ..., 
  userId: ..., 
  loginAccess: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `changeTenantEmployeeLoginAccessTrusted()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await changeTenantEmployeeLoginAccessTrusted(changeTenantEmployeeLoginAccessTrustedVars);
// Variables can be defined inline as well.
const { data } = await changeTenantEmployeeLoginAccessTrusted({ organizationId: ..., id: ..., userId: ..., loginAccess: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await changeTenantEmployeeLoginAccessTrusted(dataConnect, changeTenantEmployeeLoginAccessTrustedVars);

console.log(data.employee_update);
console.log(data.appUser_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
changeTenantEmployeeLoginAccessTrusted(changeTenantEmployeeLoginAccessTrustedVars).then((response) => {
  const data = response.data;
  console.log(data.employee_update);
  console.log(data.appUser_update);
  console.log(data.auditEvent_insert);
});
```

### Using `ChangeTenantEmployeeLoginAccessTrusted`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, changeTenantEmployeeLoginAccessTrustedRef, ChangeTenantEmployeeLoginAccessTrustedVariables } from '@omniretail/sql-connect';

// The `ChangeTenantEmployeeLoginAccessTrusted` mutation requires an argument of type `ChangeTenantEmployeeLoginAccessTrustedVariables`:
const changeTenantEmployeeLoginAccessTrustedVars: ChangeTenantEmployeeLoginAccessTrustedVariables = {
  organizationId: ..., 
  id: ..., 
  userId: ..., 
  loginAccess: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `changeTenantEmployeeLoginAccessTrustedRef()` function to get a reference to the mutation.
const ref = changeTenantEmployeeLoginAccessTrustedRef(changeTenantEmployeeLoginAccessTrustedVars);
// Variables can be defined inline as well.
const ref = changeTenantEmployeeLoginAccessTrustedRef({ organizationId: ..., id: ..., userId: ..., loginAccess: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = changeTenantEmployeeLoginAccessTrustedRef(dataConnect, changeTenantEmployeeLoginAccessTrustedVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.employee_update);
console.log(data.appUser_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.employee_update);
  console.log(data.appUser_update);
  console.log(data.auditEvent_insert);
});
```

## CreateTenantServicePersonTrusted
You can execute the `CreateTenantServicePersonTrusted` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
createTenantServicePersonTrusted(vars: CreateTenantServicePersonTrustedVariables): MutationPromise<CreateTenantServicePersonTrustedData, CreateTenantServicePersonTrustedVariables>;

interface CreateTenantServicePersonTrustedRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTenantServicePersonTrustedVariables): MutationRef<CreateTenantServicePersonTrustedData, CreateTenantServicePersonTrustedVariables>;
}
export const createTenantServicePersonTrustedRef: CreateTenantServicePersonTrustedRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createTenantServicePersonTrusted(dc: DataConnect, vars: CreateTenantServicePersonTrustedVariables): MutationPromise<CreateTenantServicePersonTrustedData, CreateTenantServicePersonTrustedVariables>;

interface CreateTenantServicePersonTrustedRef {
  ...
  (dc: DataConnect, vars: CreateTenantServicePersonTrustedVariables): MutationRef<CreateTenantServicePersonTrustedData, CreateTenantServicePersonTrustedVariables>;
}
export const createTenantServicePersonTrustedRef: CreateTenantServicePersonTrustedRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createTenantServicePersonTrustedRef:
```typescript
const name = createTenantServicePersonTrustedRef.operationName;
console.log(name);
```

### Variables
The `CreateTenantServicePersonTrusted` mutation requires an argument of type `CreateTenantServicePersonTrustedVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateTenantServicePersonTrustedVariables {
  id: UUIDString;
  organizationId: UUIDString;
  fullName: string;
  email?: string | null;
  phone: string;
  specialization: string;
  skills?: string | null;
  yearsOfExperience?: number | null;
  assignmentScope: string;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}
```
### Return Type
Recall that executing the `CreateTenantServicePersonTrusted` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateTenantServicePersonTrustedData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateTenantServicePersonTrustedData {
  servicePerson_insert: ServicePerson_Key;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `CreateTenantServicePersonTrusted`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createTenantServicePersonTrusted, CreateTenantServicePersonTrustedVariables } from '@omniretail/sql-connect';

// The `CreateTenantServicePersonTrusted` mutation requires an argument of type `CreateTenantServicePersonTrustedVariables`:
const createTenantServicePersonTrustedVars: CreateTenantServicePersonTrustedVariables = {
  id: ..., 
  organizationId: ..., 
  fullName: ..., 
  email: ..., // optional
  phone: ..., 
  specialization: ..., 
  skills: ..., // optional
  yearsOfExperience: ..., // optional
  assignmentScope: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `createTenantServicePersonTrusted()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createTenantServicePersonTrusted(createTenantServicePersonTrustedVars);
// Variables can be defined inline as well.
const { data } = await createTenantServicePersonTrusted({ id: ..., organizationId: ..., fullName: ..., email: ..., phone: ..., specialization: ..., skills: ..., yearsOfExperience: ..., assignmentScope: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createTenantServicePersonTrusted(dataConnect, createTenantServicePersonTrustedVars);

console.log(data.servicePerson_insert);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
createTenantServicePersonTrusted(createTenantServicePersonTrustedVars).then((response) => {
  const data = response.data;
  console.log(data.servicePerson_insert);
  console.log(data.auditEvent_insert);
});
```

### Using `CreateTenantServicePersonTrusted`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createTenantServicePersonTrustedRef, CreateTenantServicePersonTrustedVariables } from '@omniretail/sql-connect';

// The `CreateTenantServicePersonTrusted` mutation requires an argument of type `CreateTenantServicePersonTrustedVariables`:
const createTenantServicePersonTrustedVars: CreateTenantServicePersonTrustedVariables = {
  id: ..., 
  organizationId: ..., 
  fullName: ..., 
  email: ..., // optional
  phone: ..., 
  specialization: ..., 
  skills: ..., // optional
  yearsOfExperience: ..., // optional
  assignmentScope: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `createTenantServicePersonTrustedRef()` function to get a reference to the mutation.
const ref = createTenantServicePersonTrustedRef(createTenantServicePersonTrustedVars);
// Variables can be defined inline as well.
const ref = createTenantServicePersonTrustedRef({ id: ..., organizationId: ..., fullName: ..., email: ..., phone: ..., specialization: ..., skills: ..., yearsOfExperience: ..., assignmentScope: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createTenantServicePersonTrustedRef(dataConnect, createTenantServicePersonTrustedVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.servicePerson_insert);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.servicePerson_insert);
  console.log(data.auditEvent_insert);
});
```

## UpdateTenantServicePersonTrusted
You can execute the `UpdateTenantServicePersonTrusted` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
updateTenantServicePersonTrusted(vars: UpdateTenantServicePersonTrustedVariables): MutationPromise<UpdateTenantServicePersonTrustedData, UpdateTenantServicePersonTrustedVariables>;

interface UpdateTenantServicePersonTrustedRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTenantServicePersonTrustedVariables): MutationRef<UpdateTenantServicePersonTrustedData, UpdateTenantServicePersonTrustedVariables>;
}
export const updateTenantServicePersonTrustedRef: UpdateTenantServicePersonTrustedRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateTenantServicePersonTrusted(dc: DataConnect, vars: UpdateTenantServicePersonTrustedVariables): MutationPromise<UpdateTenantServicePersonTrustedData, UpdateTenantServicePersonTrustedVariables>;

interface UpdateTenantServicePersonTrustedRef {
  ...
  (dc: DataConnect, vars: UpdateTenantServicePersonTrustedVariables): MutationRef<UpdateTenantServicePersonTrustedData, UpdateTenantServicePersonTrustedVariables>;
}
export const updateTenantServicePersonTrustedRef: UpdateTenantServicePersonTrustedRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateTenantServicePersonTrustedRef:
```typescript
const name = updateTenantServicePersonTrustedRef.operationName;
console.log(name);
```

### Variables
The `UpdateTenantServicePersonTrusted` mutation requires an argument of type `UpdateTenantServicePersonTrustedVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateTenantServicePersonTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
  fullName: string;
  email?: string | null;
  phone: string;
  specialization: string;
  skills?: string | null;
  yearsOfExperience?: number | null;
  assignmentScope: string;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}
```
### Return Type
Recall that executing the `UpdateTenantServicePersonTrusted` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateTenantServicePersonTrustedData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateTenantServicePersonTrustedData {
  servicePerson_update?: ServicePerson_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `UpdateTenantServicePersonTrusted`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateTenantServicePersonTrusted, UpdateTenantServicePersonTrustedVariables } from '@omniretail/sql-connect';

// The `UpdateTenantServicePersonTrusted` mutation requires an argument of type `UpdateTenantServicePersonTrustedVariables`:
const updateTenantServicePersonTrustedVars: UpdateTenantServicePersonTrustedVariables = {
  organizationId: ..., 
  id: ..., 
  fullName: ..., 
  email: ..., // optional
  phone: ..., 
  specialization: ..., 
  skills: ..., // optional
  yearsOfExperience: ..., // optional
  assignmentScope: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `updateTenantServicePersonTrusted()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateTenantServicePersonTrusted(updateTenantServicePersonTrustedVars);
// Variables can be defined inline as well.
const { data } = await updateTenantServicePersonTrusted({ organizationId: ..., id: ..., fullName: ..., email: ..., phone: ..., specialization: ..., skills: ..., yearsOfExperience: ..., assignmentScope: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateTenantServicePersonTrusted(dataConnect, updateTenantServicePersonTrustedVars);

console.log(data.servicePerson_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
updateTenantServicePersonTrusted(updateTenantServicePersonTrustedVars).then((response) => {
  const data = response.data;
  console.log(data.servicePerson_update);
  console.log(data.auditEvent_insert);
});
```

### Using `UpdateTenantServicePersonTrusted`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateTenantServicePersonTrustedRef, UpdateTenantServicePersonTrustedVariables } from '@omniretail/sql-connect';

// The `UpdateTenantServicePersonTrusted` mutation requires an argument of type `UpdateTenantServicePersonTrustedVariables`:
const updateTenantServicePersonTrustedVars: UpdateTenantServicePersonTrustedVariables = {
  organizationId: ..., 
  id: ..., 
  fullName: ..., 
  email: ..., // optional
  phone: ..., 
  specialization: ..., 
  skills: ..., // optional
  yearsOfExperience: ..., // optional
  assignmentScope: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `updateTenantServicePersonTrustedRef()` function to get a reference to the mutation.
const ref = updateTenantServicePersonTrustedRef(updateTenantServicePersonTrustedVars);
// Variables can be defined inline as well.
const ref = updateTenantServicePersonTrustedRef({ organizationId: ..., id: ..., fullName: ..., email: ..., phone: ..., specialization: ..., skills: ..., yearsOfExperience: ..., assignmentScope: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateTenantServicePersonTrustedRef(dataConnect, updateTenantServicePersonTrustedVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.servicePerson_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.servicePerson_update);
  console.log(data.auditEvent_insert);
});
```

## ChangeTenantServicePersonStatusTrusted
You can execute the `ChangeTenantServicePersonStatusTrusted` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
changeTenantServicePersonStatusTrusted(vars: ChangeTenantServicePersonStatusTrustedVariables): MutationPromise<ChangeTenantServicePersonStatusTrustedData, ChangeTenantServicePersonStatusTrustedVariables>;

interface ChangeTenantServicePersonStatusTrustedRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ChangeTenantServicePersonStatusTrustedVariables): MutationRef<ChangeTenantServicePersonStatusTrustedData, ChangeTenantServicePersonStatusTrustedVariables>;
}
export const changeTenantServicePersonStatusTrustedRef: ChangeTenantServicePersonStatusTrustedRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
changeTenantServicePersonStatusTrusted(dc: DataConnect, vars: ChangeTenantServicePersonStatusTrustedVariables): MutationPromise<ChangeTenantServicePersonStatusTrustedData, ChangeTenantServicePersonStatusTrustedVariables>;

interface ChangeTenantServicePersonStatusTrustedRef {
  ...
  (dc: DataConnect, vars: ChangeTenantServicePersonStatusTrustedVariables): MutationRef<ChangeTenantServicePersonStatusTrustedData, ChangeTenantServicePersonStatusTrustedVariables>;
}
export const changeTenantServicePersonStatusTrustedRef: ChangeTenantServicePersonStatusTrustedRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the changeTenantServicePersonStatusTrustedRef:
```typescript
const name = changeTenantServicePersonStatusTrustedRef.operationName;
console.log(name);
```

### Variables
The `ChangeTenantServicePersonStatusTrusted` mutation requires an argument of type `ChangeTenantServicePersonStatusTrustedVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ChangeTenantServicePersonStatusTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
  status: EmploymentStatus;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}
```
### Return Type
Recall that executing the `ChangeTenantServicePersonStatusTrusted` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ChangeTenantServicePersonStatusTrustedData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ChangeTenantServicePersonStatusTrustedData {
  servicePerson_update?: ServicePerson_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `ChangeTenantServicePersonStatusTrusted`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, changeTenantServicePersonStatusTrusted, ChangeTenantServicePersonStatusTrustedVariables } from '@omniretail/sql-connect';

// The `ChangeTenantServicePersonStatusTrusted` mutation requires an argument of type `ChangeTenantServicePersonStatusTrustedVariables`:
const changeTenantServicePersonStatusTrustedVars: ChangeTenantServicePersonStatusTrustedVariables = {
  organizationId: ..., 
  id: ..., 
  status: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `changeTenantServicePersonStatusTrusted()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await changeTenantServicePersonStatusTrusted(changeTenantServicePersonStatusTrustedVars);
// Variables can be defined inline as well.
const { data } = await changeTenantServicePersonStatusTrusted({ organizationId: ..., id: ..., status: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await changeTenantServicePersonStatusTrusted(dataConnect, changeTenantServicePersonStatusTrustedVars);

console.log(data.servicePerson_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
changeTenantServicePersonStatusTrusted(changeTenantServicePersonStatusTrustedVars).then((response) => {
  const data = response.data;
  console.log(data.servicePerson_update);
  console.log(data.auditEvent_insert);
});
```

### Using `ChangeTenantServicePersonStatusTrusted`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, changeTenantServicePersonStatusTrustedRef, ChangeTenantServicePersonStatusTrustedVariables } from '@omniretail/sql-connect';

// The `ChangeTenantServicePersonStatusTrusted` mutation requires an argument of type `ChangeTenantServicePersonStatusTrustedVariables`:
const changeTenantServicePersonStatusTrustedVars: ChangeTenantServicePersonStatusTrustedVariables = {
  organizationId: ..., 
  id: ..., 
  status: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `changeTenantServicePersonStatusTrustedRef()` function to get a reference to the mutation.
const ref = changeTenantServicePersonStatusTrustedRef(changeTenantServicePersonStatusTrustedVars);
// Variables can be defined inline as well.
const ref = changeTenantServicePersonStatusTrustedRef({ organizationId: ..., id: ..., status: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = changeTenantServicePersonStatusTrustedRef(dataConnect, changeTenantServicePersonStatusTrustedVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.servicePerson_update);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.servicePerson_update);
  console.log(data.auditEvent_insert);
});
```

## AssignTenantEmployeeOutletTrusted
You can execute the `AssignTenantEmployeeOutletTrusted` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
assignTenantEmployeeOutletTrusted(vars: AssignTenantEmployeeOutletTrustedVariables): MutationPromise<AssignTenantEmployeeOutletTrustedData, AssignTenantEmployeeOutletTrustedVariables>;

interface AssignTenantEmployeeOutletTrustedRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AssignTenantEmployeeOutletTrustedVariables): MutationRef<AssignTenantEmployeeOutletTrustedData, AssignTenantEmployeeOutletTrustedVariables>;
}
export const assignTenantEmployeeOutletTrustedRef: AssignTenantEmployeeOutletTrustedRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
assignTenantEmployeeOutletTrusted(dc: DataConnect, vars: AssignTenantEmployeeOutletTrustedVariables): MutationPromise<AssignTenantEmployeeOutletTrustedData, AssignTenantEmployeeOutletTrustedVariables>;

interface AssignTenantEmployeeOutletTrustedRef {
  ...
  (dc: DataConnect, vars: AssignTenantEmployeeOutletTrustedVariables): MutationRef<AssignTenantEmployeeOutletTrustedData, AssignTenantEmployeeOutletTrustedVariables>;
}
export const assignTenantEmployeeOutletTrustedRef: AssignTenantEmployeeOutletTrustedRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the assignTenantEmployeeOutletTrustedRef:
```typescript
const name = assignTenantEmployeeOutletTrustedRef.operationName;
console.log(name);
```

### Variables
The `AssignTenantEmployeeOutletTrusted` mutation requires an argument of type `AssignTenantEmployeeOutletTrustedVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AssignTenantEmployeeOutletTrustedVariables {
  organizationId: UUIDString;
  employeeId: UUIDString;
  outletId: UUIDString;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}
```
### Return Type
Recall that executing the `AssignTenantEmployeeOutletTrusted` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AssignTenantEmployeeOutletTrustedData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AssignTenantEmployeeOutletTrustedData {
  employeeOutlet_upsert: EmployeeOutlet_Key;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `AssignTenantEmployeeOutletTrusted`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, assignTenantEmployeeOutletTrusted, AssignTenantEmployeeOutletTrustedVariables } from '@omniretail/sql-connect';

// The `AssignTenantEmployeeOutletTrusted` mutation requires an argument of type `AssignTenantEmployeeOutletTrustedVariables`:
const assignTenantEmployeeOutletTrustedVars: AssignTenantEmployeeOutletTrustedVariables = {
  organizationId: ..., 
  employeeId: ..., 
  outletId: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `assignTenantEmployeeOutletTrusted()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await assignTenantEmployeeOutletTrusted(assignTenantEmployeeOutletTrustedVars);
// Variables can be defined inline as well.
const { data } = await assignTenantEmployeeOutletTrusted({ organizationId: ..., employeeId: ..., outletId: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await assignTenantEmployeeOutletTrusted(dataConnect, assignTenantEmployeeOutletTrustedVars);

console.log(data.employeeOutlet_upsert);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
assignTenantEmployeeOutletTrusted(assignTenantEmployeeOutletTrustedVars).then((response) => {
  const data = response.data;
  console.log(data.employeeOutlet_upsert);
  console.log(data.auditEvent_insert);
});
```

### Using `AssignTenantEmployeeOutletTrusted`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, assignTenantEmployeeOutletTrustedRef, AssignTenantEmployeeOutletTrustedVariables } from '@omniretail/sql-connect';

// The `AssignTenantEmployeeOutletTrusted` mutation requires an argument of type `AssignTenantEmployeeOutletTrustedVariables`:
const assignTenantEmployeeOutletTrustedVars: AssignTenantEmployeeOutletTrustedVariables = {
  organizationId: ..., 
  employeeId: ..., 
  outletId: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `assignTenantEmployeeOutletTrustedRef()` function to get a reference to the mutation.
const ref = assignTenantEmployeeOutletTrustedRef(assignTenantEmployeeOutletTrustedVars);
// Variables can be defined inline as well.
const ref = assignTenantEmployeeOutletTrustedRef({ organizationId: ..., employeeId: ..., outletId: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = assignTenantEmployeeOutletTrustedRef(dataConnect, assignTenantEmployeeOutletTrustedVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.employeeOutlet_upsert);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.employeeOutlet_upsert);
  console.log(data.auditEvent_insert);
});
```

## AssignTenantServicePersonOutletTrusted
You can execute the `AssignTenantServicePersonOutletTrusted` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [sql-connect/index.d.ts](./index.d.ts):
```typescript
assignTenantServicePersonOutletTrusted(vars: AssignTenantServicePersonOutletTrustedVariables): MutationPromise<AssignTenantServicePersonOutletTrustedData, AssignTenantServicePersonOutletTrustedVariables>;

interface AssignTenantServicePersonOutletTrustedRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AssignTenantServicePersonOutletTrustedVariables): MutationRef<AssignTenantServicePersonOutletTrustedData, AssignTenantServicePersonOutletTrustedVariables>;
}
export const assignTenantServicePersonOutletTrustedRef: AssignTenantServicePersonOutletTrustedRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
assignTenantServicePersonOutletTrusted(dc: DataConnect, vars: AssignTenantServicePersonOutletTrustedVariables): MutationPromise<AssignTenantServicePersonOutletTrustedData, AssignTenantServicePersonOutletTrustedVariables>;

interface AssignTenantServicePersonOutletTrustedRef {
  ...
  (dc: DataConnect, vars: AssignTenantServicePersonOutletTrustedVariables): MutationRef<AssignTenantServicePersonOutletTrustedData, AssignTenantServicePersonOutletTrustedVariables>;
}
export const assignTenantServicePersonOutletTrustedRef: AssignTenantServicePersonOutletTrustedRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the assignTenantServicePersonOutletTrustedRef:
```typescript
const name = assignTenantServicePersonOutletTrustedRef.operationName;
console.log(name);
```

### Variables
The `AssignTenantServicePersonOutletTrusted` mutation requires an argument of type `AssignTenantServicePersonOutletTrustedVariables`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AssignTenantServicePersonOutletTrustedVariables {
  organizationId: UUIDString;
  servicePersonId: UUIDString;
  outletId: UUIDString;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}
```
### Return Type
Recall that executing the `AssignTenantServicePersonOutletTrusted` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AssignTenantServicePersonOutletTrustedData`, which is defined in [sql-connect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AssignTenantServicePersonOutletTrustedData {
  servicePersonOutlet_upsert: ServicePersonOutlet_Key;
  auditEvent_insert: AuditEvent_Key;
}
```
### Using `AssignTenantServicePersonOutletTrusted`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, assignTenantServicePersonOutletTrusted, AssignTenantServicePersonOutletTrustedVariables } from '@omniretail/sql-connect';

// The `AssignTenantServicePersonOutletTrusted` mutation requires an argument of type `AssignTenantServicePersonOutletTrustedVariables`:
const assignTenantServicePersonOutletTrustedVars: AssignTenantServicePersonOutletTrustedVariables = {
  organizationId: ..., 
  servicePersonId: ..., 
  outletId: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `assignTenantServicePersonOutletTrusted()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await assignTenantServicePersonOutletTrusted(assignTenantServicePersonOutletTrustedVars);
// Variables can be defined inline as well.
const { data } = await assignTenantServicePersonOutletTrusted({ organizationId: ..., servicePersonId: ..., outletId: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await assignTenantServicePersonOutletTrusted(dataConnect, assignTenantServicePersonOutletTrustedVars);

console.log(data.servicePersonOutlet_upsert);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
assignTenantServicePersonOutletTrusted(assignTenantServicePersonOutletTrustedVars).then((response) => {
  const data = response.data;
  console.log(data.servicePersonOutlet_upsert);
  console.log(data.auditEvent_insert);
});
```

### Using `AssignTenantServicePersonOutletTrusted`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, assignTenantServicePersonOutletTrustedRef, AssignTenantServicePersonOutletTrustedVariables } from '@omniretail/sql-connect';

// The `AssignTenantServicePersonOutletTrusted` mutation requires an argument of type `AssignTenantServicePersonOutletTrustedVariables`:
const assignTenantServicePersonOutletTrustedVars: AssignTenantServicePersonOutletTrustedVariables = {
  organizationId: ..., 
  servicePersonId: ..., 
  outletId: ..., 
  auditId: ..., 
  requestId: ..., 
  actorFirebaseUid: ..., 
};

// Call the `assignTenantServicePersonOutletTrustedRef()` function to get a reference to the mutation.
const ref = assignTenantServicePersonOutletTrustedRef(assignTenantServicePersonOutletTrustedVars);
// Variables can be defined inline as well.
const ref = assignTenantServicePersonOutletTrustedRef({ organizationId: ..., servicePersonId: ..., outletId: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = assignTenantServicePersonOutletTrustedRef(dataConnect, assignTenantServicePersonOutletTrustedVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.servicePersonOutlet_upsert);
console.log(data.auditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.servicePersonOutlet_upsert);
  console.log(data.auditEvent_insert);
});
```

