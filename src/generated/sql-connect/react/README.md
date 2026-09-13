# Generated React README
This README will guide you through the process of using the generated React SDK package for the connector `master-admin`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `JavaScript README`, you can find it at [`sql-connect/README.md`](../README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

You can use this generated SDK by importing from the package `@omniretail/sql-connect/react` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#react).

# Table of Contents
- [**Overview**](#generated-react-readme)
- [**TanStack Query Firebase & TanStack React Query**](#tanstack-query-firebase-tanstack-react-query)
  - [*Package Installation*](#installing-tanstack-query-firebase-and-tanstack-react-query-packages)
  - [*Configuring TanStack Query*](#configuring-tanstack-query)
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
  - [*GetTenantMembershipTrusted*](#gettenantmembershiptrusted)
  - [*ListTenantOutletCodesTrusted*](#listtenantoutletcodestrusted)
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

# TanStack Query Firebase & TanStack React Query
This SDK provides [React](https://react.dev/) hooks generated specific to your application, for the operations found in the connector `master-admin`. These hooks are generated using [TanStack Query Firebase](https://react-query-firebase.invertase.dev/) by our partners at Invertase, a library built on top of [TanStack React Query v5](https://tanstack.com/query/v5/docs/framework/react/overview).

***You do not need to be familiar with Tanstack Query or Tanstack Query Firebase to use this SDK.*** However, you may find it useful to learn more about them, as they will empower you as a user of this Generated React SDK.

## Installing TanStack Query Firebase and TanStack React Query Packages
In order to use the React generated SDK, you must install the `TanStack React Query` and `TanStack Query Firebase` packages.
```bash
npm i --save @tanstack/react-query @tanstack-query-firebase/react
```
```bash
npm i --save firebase@latest # Note: React has a peer dependency on ^11.3.0
```

You can also follow the installation instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#tanstack-install), or the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react) and [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/installation).

## Configuring TanStack Query
In order to use the React generated SDK in your application, you must wrap your application's component tree in a `QueryClientProvider` component from TanStack React Query. None of your generated React SDK hooks will work without this provider.

```javascript
import { QueryClientProvider } from '@tanstack/react-query';

// Create a TanStack Query client instance
const queryClient = new QueryClient()

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <MyApplication />
    </QueryClientProvider>
  )
}
```

To learn more about `QueryClientProvider`, see the [TanStack React Query documentation](https://tanstack.com/query/latest/docs/framework/react/quick-start) and the [TanStack Query Firebase documentation](https://invertase.docs.page/tanstack-query-firebase/react#usage).

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `master-admin`.

You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@omniretail/sql-connect';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#emulator-react-angular).

```javascript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@omniretail/sql-connect';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) using the hooks provided from your generated React SDK.

# Queries

The React generated SDK provides Query hook functions that call and return [`useDataConnectQuery`](https://react-query-firebase.invertase.dev/react/data-connect/querying) hooks from TanStack Query Firebase.

Calling these hook functions will return a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and the most recent data returned by the Query, among other things. To learn more about these hooks and how to use them, see the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react/data-connect/querying).

TanStack React Query caches the results of your Queries, so using the same Query hook function in multiple places in your application allows the entire application to automatically see updates to that Query's data.

Query hooks execute their Queries automatically when called, and periodically refresh, unless you change the `queryOptions` for the Query. To learn how to stop a Query from automatically executing, including how to make a query "lazy", see the [TanStack React Query documentation](https://tanstack.com/query/latest/docs/framework/react/guides/disabling-queries).

To learn more about TanStack React Query's Queries, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/queries).

## Using Query Hooks
Here's a general overview of how to use the generated Query hooks in your code:

- If the Query has no variables, the Query hook function does not require arguments.
- If the Query has any required variables, the Query hook function will require at least one argument: an object that contains all the required variables for the Query.
- If the Query has some required and some optional variables, only required variables are necessary in the variables argument object, and optional variables may be provided as well.
- If all of the Query's variables are optional, the Query hook function does not require any arguments.
- Query hook functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.
- Query hooks functions can be called with or without passing in an `options` argument of type `useDataConnectQueryOptions`. To learn more about the `options` argument, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/query-options).
  - ***Special case:***  If the Query has all optional variables and you would like to provide an `options` argument to the Query hook function without providing any variables, you must pass `undefined` where you would normally pass the Query's variables, and then may provide the `options` argument.

Below are examples of how to use the `master-admin` connector's generated Query hook functions to execute each Query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#operations-react-angular).

## GetCurrentUserAuthorization
You can execute the `GetCurrentUserAuthorization` Query using the following Query hook function, which is defined in [sql-connect/react/index.d.ts](./index.d.ts):

```javascript
useGetCurrentUserAuthorization(dc: DataConnect, options?: useDataConnectQueryOptions<GetCurrentUserAuthorizationData>): UseDataConnectQueryResult<GetCurrentUserAuthorizationData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetCurrentUserAuthorization(options?: useDataConnectQueryOptions<GetCurrentUserAuthorizationData>): UseDataConnectQueryResult<GetCurrentUserAuthorizationData, undefined>;
```

### Variables
The `GetCurrentUserAuthorization` Query has no variables.
### Return Type
Recall that calling the `GetCurrentUserAuthorization` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetCurrentUserAuthorization` Query is of type `GetCurrentUserAuthorizationData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetCurrentUserAuthorization`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@omniretail/sql-connect';
import { useGetCurrentUserAuthorization } from '@omniretail/sql-connect/react'

export default function GetCurrentUserAuthorizationComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetCurrentUserAuthorization();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetCurrentUserAuthorization(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetCurrentUserAuthorization(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetCurrentUserAuthorization(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.appUsers);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetUserAuthorizationByFirebaseUid
You can execute the `GetUserAuthorizationByFirebaseUid` Query using the following Query hook function, which is defined in [sql-connect/react/index.d.ts](./index.d.ts):

```javascript
useGetUserAuthorizationByFirebaseUid(dc: DataConnect, vars: GetUserAuthorizationByFirebaseUidVariables, options?: useDataConnectQueryOptions<GetUserAuthorizationByFirebaseUidData>): UseDataConnectQueryResult<GetUserAuthorizationByFirebaseUidData, GetUserAuthorizationByFirebaseUidVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetUserAuthorizationByFirebaseUid(vars: GetUserAuthorizationByFirebaseUidVariables, options?: useDataConnectQueryOptions<GetUserAuthorizationByFirebaseUidData>): UseDataConnectQueryResult<GetUserAuthorizationByFirebaseUidData, GetUserAuthorizationByFirebaseUidVariables>;
```

### Variables
The `GetUserAuthorizationByFirebaseUid` Query requires an argument of type `GetUserAuthorizationByFirebaseUidVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetUserAuthorizationByFirebaseUidVariables {
  firebaseUid: string;
}
```
### Return Type
Recall that calling the `GetUserAuthorizationByFirebaseUid` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetUserAuthorizationByFirebaseUid` Query is of type `GetUserAuthorizationByFirebaseUidData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetUserAuthorizationByFirebaseUid`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetUserAuthorizationByFirebaseUidVariables } from '@omniretail/sql-connect';
import { useGetUserAuthorizationByFirebaseUid } from '@omniretail/sql-connect/react'

export default function GetUserAuthorizationByFirebaseUidComponent() {
  // The `useGetUserAuthorizationByFirebaseUid` Query hook requires an argument of type `GetUserAuthorizationByFirebaseUidVariables`:
  const getUserAuthorizationByFirebaseUidVars: GetUserAuthorizationByFirebaseUidVariables = {
    firebaseUid: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetUserAuthorizationByFirebaseUid(getUserAuthorizationByFirebaseUidVars);
  // Variables can be defined inline as well.
  const query = useGetUserAuthorizationByFirebaseUid({ firebaseUid: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetUserAuthorizationByFirebaseUid(dataConnect, getUserAuthorizationByFirebaseUidVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetUserAuthorizationByFirebaseUid(getUserAuthorizationByFirebaseUidVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetUserAuthorizationByFirebaseUid(dataConnect, getUserAuthorizationByFirebaseUidVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.appUsers);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ResolveUsernameLogin
You can execute the `ResolveUsernameLogin` Query using the following Query hook function, which is defined in [sql-connect/react/index.d.ts](./index.d.ts):

```javascript
useResolveUsernameLogin(dc: DataConnect, vars: ResolveUsernameLoginVariables, options?: useDataConnectQueryOptions<ResolveUsernameLoginData>): UseDataConnectQueryResult<ResolveUsernameLoginData, ResolveUsernameLoginVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useResolveUsernameLogin(vars: ResolveUsernameLoginVariables, options?: useDataConnectQueryOptions<ResolveUsernameLoginData>): UseDataConnectQueryResult<ResolveUsernameLoginData, ResolveUsernameLoginVariables>;
```

### Variables
The `ResolveUsernameLogin` Query requires an argument of type `ResolveUsernameLoginVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ResolveUsernameLoginVariables {
  username: string;
}
```
### Return Type
Recall that calling the `ResolveUsernameLogin` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ResolveUsernameLogin` Query is of type `ResolveUsernameLoginData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ResolveUsernameLoginData {
  appUsers: ({
    id: UUIDString;
    firebaseUid: string;
    email: string;
    status: AppUserStatus;
  } & AppUser_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ResolveUsernameLogin`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ResolveUsernameLoginVariables } from '@omniretail/sql-connect';
import { useResolveUsernameLogin } from '@omniretail/sql-connect/react'

export default function ResolveUsernameLoginComponent() {
  // The `useResolveUsernameLogin` Query hook requires an argument of type `ResolveUsernameLoginVariables`:
  const resolveUsernameLoginVars: ResolveUsernameLoginVariables = {
    username: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useResolveUsernameLogin(resolveUsernameLoginVars);
  // Variables can be defined inline as well.
  const query = useResolveUsernameLogin({ username: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useResolveUsernameLogin(dataConnect, resolveUsernameLoginVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useResolveUsernameLogin(resolveUsernameLoginVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useResolveUsernameLogin(dataConnect, resolveUsernameLoginVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.appUsers);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetAppUserForBootstrap
You can execute the `GetAppUserForBootstrap` Query using the following Query hook function, which is defined in [sql-connect/react/index.d.ts](./index.d.ts):

```javascript
useGetAppUserForBootstrap(dc: DataConnect, vars: GetAppUserForBootstrapVariables, options?: useDataConnectQueryOptions<GetAppUserForBootstrapData>): UseDataConnectQueryResult<GetAppUserForBootstrapData, GetAppUserForBootstrapVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetAppUserForBootstrap(vars: GetAppUserForBootstrapVariables, options?: useDataConnectQueryOptions<GetAppUserForBootstrapData>): UseDataConnectQueryResult<GetAppUserForBootstrapData, GetAppUserForBootstrapVariables>;
```

### Variables
The `GetAppUserForBootstrap` Query requires an argument of type `GetAppUserForBootstrapVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetAppUserForBootstrapVariables {
  firebaseUid: string;
}
```
### Return Type
Recall that calling the `GetAppUserForBootstrap` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetAppUserForBootstrap` Query is of type `GetAppUserForBootstrapData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetAppUserForBootstrap`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetAppUserForBootstrapVariables } from '@omniretail/sql-connect';
import { useGetAppUserForBootstrap } from '@omniretail/sql-connect/react'

export default function GetAppUserForBootstrapComponent() {
  // The `useGetAppUserForBootstrap` Query hook requires an argument of type `GetAppUserForBootstrapVariables`:
  const getAppUserForBootstrapVars: GetAppUserForBootstrapVariables = {
    firebaseUid: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetAppUserForBootstrap(getAppUserForBootstrapVars);
  // Variables can be defined inline as well.
  const query = useGetAppUserForBootstrap({ firebaseUid: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetAppUserForBootstrap(dataConnect, getAppUserForBootstrapVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetAppUserForBootstrap(getAppUserForBootstrapVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetAppUserForBootstrap(dataConnect, getAppUserForBootstrapVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.appUsers);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetCurrentAppUser
You can execute the `GetCurrentAppUser` Query using the following Query hook function, which is defined in [sql-connect/react/index.d.ts](./index.d.ts):

```javascript
useGetCurrentAppUser(dc: DataConnect, options?: useDataConnectQueryOptions<GetCurrentAppUserData>): UseDataConnectQueryResult<GetCurrentAppUserData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetCurrentAppUser(options?: useDataConnectQueryOptions<GetCurrentAppUserData>): UseDataConnectQueryResult<GetCurrentAppUserData, undefined>;
```

### Variables
The `GetCurrentAppUser` Query has no variables.
### Return Type
Recall that calling the `GetCurrentAppUser` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetCurrentAppUser` Query is of type `GetCurrentAppUserData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetCurrentAppUser`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@omniretail/sql-connect';
import { useGetCurrentAppUser } from '@omniretail/sql-connect/react'

export default function GetCurrentAppUserComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetCurrentAppUser();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetCurrentAppUser(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetCurrentAppUser(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetCurrentAppUser(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.appUsers);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetAppUserByFirebaseUid
You can execute the `GetAppUserByFirebaseUid` Query using the following Query hook function, which is defined in [sql-connect/react/index.d.ts](./index.d.ts):

```javascript
useGetAppUserByFirebaseUid(dc: DataConnect, vars: GetAppUserByFirebaseUidVariables, options?: useDataConnectQueryOptions<GetAppUserByFirebaseUidData>): UseDataConnectQueryResult<GetAppUserByFirebaseUidData, GetAppUserByFirebaseUidVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetAppUserByFirebaseUid(vars: GetAppUserByFirebaseUidVariables, options?: useDataConnectQueryOptions<GetAppUserByFirebaseUidData>): UseDataConnectQueryResult<GetAppUserByFirebaseUidData, GetAppUserByFirebaseUidVariables>;
```

### Variables
The `GetAppUserByFirebaseUid` Query requires an argument of type `GetAppUserByFirebaseUidVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetAppUserByFirebaseUidVariables {
  firebaseUid: string;
}
```
### Return Type
Recall that calling the `GetAppUserByFirebaseUid` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetAppUserByFirebaseUid` Query is of type `GetAppUserByFirebaseUidData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetAppUserByFirebaseUid`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetAppUserByFirebaseUidVariables } from '@omniretail/sql-connect';
import { useGetAppUserByFirebaseUid } from '@omniretail/sql-connect/react'

export default function GetAppUserByFirebaseUidComponent() {
  // The `useGetAppUserByFirebaseUid` Query hook requires an argument of type `GetAppUserByFirebaseUidVariables`:
  const getAppUserByFirebaseUidVars: GetAppUserByFirebaseUidVariables = {
    firebaseUid: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetAppUserByFirebaseUid(getAppUserByFirebaseUidVars);
  // Variables can be defined inline as well.
  const query = useGetAppUserByFirebaseUid({ firebaseUid: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetAppUserByFirebaseUid(dataConnect, getAppUserByFirebaseUidVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetAppUserByFirebaseUid(getAppUserByFirebaseUidVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetAppUserByFirebaseUid(dataConnect, getAppUserByFirebaseUidVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.appUsers);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListLicensePlans
You can execute the `ListLicensePlans` Query using the following Query hook function, which is defined in [sql-connect/react/index.d.ts](./index.d.ts):

```javascript
useListLicensePlans(dc: DataConnect, options?: useDataConnectQueryOptions<ListLicensePlansData>): UseDataConnectQueryResult<ListLicensePlansData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListLicensePlans(options?: useDataConnectQueryOptions<ListLicensePlansData>): UseDataConnectQueryResult<ListLicensePlansData, undefined>;
```

### Variables
The `ListLicensePlans` Query has no variables.
### Return Type
Recall that calling the `ListLicensePlans` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListLicensePlans` Query is of type `ListLicensePlansData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListLicensePlans`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@omniretail/sql-connect';
import { useListLicensePlans } from '@omniretail/sql-connect/react'

export default function ListLicensePlansComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListLicensePlans();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListLicensePlans(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListLicensePlans(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListLicensePlans(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.licensePlans);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListOrganizationLicensePlanAssignments
You can execute the `ListOrganizationLicensePlanAssignments` Query using the following Query hook function, which is defined in [sql-connect/react/index.d.ts](./index.d.ts):

```javascript
useListOrganizationLicensePlanAssignments(dc: DataConnect, options?: useDataConnectQueryOptions<ListOrganizationLicensePlanAssignmentsData>): UseDataConnectQueryResult<ListOrganizationLicensePlanAssignmentsData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListOrganizationLicensePlanAssignments(options?: useDataConnectQueryOptions<ListOrganizationLicensePlanAssignmentsData>): UseDataConnectQueryResult<ListOrganizationLicensePlanAssignmentsData, undefined>;
```

### Variables
The `ListOrganizationLicensePlanAssignments` Query has no variables.
### Return Type
Recall that calling the `ListOrganizationLicensePlanAssignments` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListOrganizationLicensePlanAssignments` Query is of type `ListOrganizationLicensePlanAssignmentsData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ListOrganizationLicensePlanAssignmentsData {
  organizationLicenses: ({
    plan: {
      id: UUIDString;
    } & LicensePlan_Key;
  })[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListOrganizationLicensePlanAssignments`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@omniretail/sql-connect';
import { useListOrganizationLicensePlanAssignments } from '@omniretail/sql-connect/react'

export default function ListOrganizationLicensePlanAssignmentsComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListOrganizationLicensePlanAssignments();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListOrganizationLicensePlanAssignments(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListOrganizationLicensePlanAssignments(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListOrganizationLicensePlanAssignments(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.organizationLicenses);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetLicensePlan
You can execute the `GetLicensePlan` Query using the following Query hook function, which is defined in [sql-connect/react/index.d.ts](./index.d.ts):

```javascript
useGetLicensePlan(dc: DataConnect, vars: GetLicensePlanVariables, options?: useDataConnectQueryOptions<GetLicensePlanData>): UseDataConnectQueryResult<GetLicensePlanData, GetLicensePlanVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetLicensePlan(vars: GetLicensePlanVariables, options?: useDataConnectQueryOptions<GetLicensePlanData>): UseDataConnectQueryResult<GetLicensePlanData, GetLicensePlanVariables>;
```

### Variables
The `GetLicensePlan` Query requires an argument of type `GetLicensePlanVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetLicensePlanVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `GetLicensePlan` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetLicensePlan` Query is of type `GetLicensePlanData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetLicensePlan`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetLicensePlanVariables } from '@omniretail/sql-connect';
import { useGetLicensePlan } from '@omniretail/sql-connect/react'

export default function GetLicensePlanComponent() {
  // The `useGetLicensePlan` Query hook requires an argument of type `GetLicensePlanVariables`:
  const getLicensePlanVars: GetLicensePlanVariables = {
    id: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetLicensePlan(getLicensePlanVars);
  // Variables can be defined inline as well.
  const query = useGetLicensePlan({ id: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetLicensePlan(dataConnect, getLicensePlanVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetLicensePlan(getLicensePlanVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetLicensePlan(dataConnect, getLicensePlanVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.licensePlan);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetLicensePlanTrusted
You can execute the `GetLicensePlanTrusted` Query using the following Query hook function, which is defined in [sql-connect/react/index.d.ts](./index.d.ts):

```javascript
useGetLicensePlanTrusted(dc: DataConnect, vars: GetLicensePlanTrustedVariables, options?: useDataConnectQueryOptions<GetLicensePlanTrustedData>): UseDataConnectQueryResult<GetLicensePlanTrustedData, GetLicensePlanTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetLicensePlanTrusted(vars: GetLicensePlanTrustedVariables, options?: useDataConnectQueryOptions<GetLicensePlanTrustedData>): UseDataConnectQueryResult<GetLicensePlanTrustedData, GetLicensePlanTrustedVariables>;
```

### Variables
The `GetLicensePlanTrusted` Query requires an argument of type `GetLicensePlanTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetLicensePlanTrustedVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `GetLicensePlanTrusted` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetLicensePlanTrusted` Query is of type `GetLicensePlanTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetLicensePlanTrusted`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetLicensePlanTrustedVariables } from '@omniretail/sql-connect';
import { useGetLicensePlanTrusted } from '@omniretail/sql-connect/react'

export default function GetLicensePlanTrustedComponent() {
  // The `useGetLicensePlanTrusted` Query hook requires an argument of type `GetLicensePlanTrustedVariables`:
  const getLicensePlanTrustedVars: GetLicensePlanTrustedVariables = {
    id: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetLicensePlanTrusted(getLicensePlanTrustedVars);
  // Variables can be defined inline as well.
  const query = useGetLicensePlanTrusted({ id: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetLicensePlanTrusted(dataConnect, getLicensePlanTrustedVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetLicensePlanTrusted(getLicensePlanTrustedVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetLicensePlanTrusted(dataConnect, getLicensePlanTrustedVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.licensePlan);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetLicensePlanReferencesTrusted
You can execute the `GetLicensePlanReferencesTrusted` Query using the following Query hook function, which is defined in [sql-connect/react/index.d.ts](./index.d.ts):

```javascript
useGetLicensePlanReferencesTrusted(dc: DataConnect, vars: GetLicensePlanReferencesTrustedVariables, options?: useDataConnectQueryOptions<GetLicensePlanReferencesTrustedData>): UseDataConnectQueryResult<GetLicensePlanReferencesTrustedData, GetLicensePlanReferencesTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetLicensePlanReferencesTrusted(vars: GetLicensePlanReferencesTrustedVariables, options?: useDataConnectQueryOptions<GetLicensePlanReferencesTrustedData>): UseDataConnectQueryResult<GetLicensePlanReferencesTrustedData, GetLicensePlanReferencesTrustedVariables>;
```

### Variables
The `GetLicensePlanReferencesTrusted` Query requires an argument of type `GetLicensePlanReferencesTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetLicensePlanReferencesTrustedVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `GetLicensePlanReferencesTrusted` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetLicensePlanReferencesTrusted` Query is of type `GetLicensePlanReferencesTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetLicensePlanReferencesTrustedData {
  organizationLicenses: ({
    id: UUIDString;
  } & OrganizationLicense_Key)[];
  licenseHistories: ({
    id: UUIDString;
  } & LicenseHistory_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetLicensePlanReferencesTrusted`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetLicensePlanReferencesTrustedVariables } from '@omniretail/sql-connect';
import { useGetLicensePlanReferencesTrusted } from '@omniretail/sql-connect/react'

export default function GetLicensePlanReferencesTrustedComponent() {
  // The `useGetLicensePlanReferencesTrusted` Query hook requires an argument of type `GetLicensePlanReferencesTrustedVariables`:
  const getLicensePlanReferencesTrustedVars: GetLicensePlanReferencesTrustedVariables = {
    id: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetLicensePlanReferencesTrusted(getLicensePlanReferencesTrustedVars);
  // Variables can be defined inline as well.
  const query = useGetLicensePlanReferencesTrusted({ id: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetLicensePlanReferencesTrusted(dataConnect, getLicensePlanReferencesTrustedVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetLicensePlanReferencesTrusted(getLicensePlanReferencesTrustedVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetLicensePlanReferencesTrusted(dataConnect, getLicensePlanReferencesTrustedVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.organizationLicenses);
    console.log(query.data.licenseHistories);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListOrganizations
You can execute the `ListOrganizations` Query using the following Query hook function, which is defined in [sql-connect/react/index.d.ts](./index.d.ts):

```javascript
useListOrganizations(dc: DataConnect, options?: useDataConnectQueryOptions<ListOrganizationsData>): UseDataConnectQueryResult<ListOrganizationsData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListOrganizations(options?: useDataConnectQueryOptions<ListOrganizationsData>): UseDataConnectQueryResult<ListOrganizationsData, undefined>;
```

### Variables
The `ListOrganizations` Query has no variables.
### Return Type
Recall that calling the `ListOrganizations` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListOrganizations` Query is of type `ListOrganizationsData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListOrganizations`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@omniretail/sql-connect';
import { useListOrganizations } from '@omniretail/sql-connect/react'

export default function ListOrganizationsComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListOrganizations();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListOrganizations(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListOrganizations(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListOrganizations(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.organizations);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetOrganization
You can execute the `GetOrganization` Query using the following Query hook function, which is defined in [sql-connect/react/index.d.ts](./index.d.ts):

```javascript
useGetOrganization(dc: DataConnect, vars: GetOrganizationVariables, options?: useDataConnectQueryOptions<GetOrganizationData>): UseDataConnectQueryResult<GetOrganizationData, GetOrganizationVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetOrganization(vars: GetOrganizationVariables, options?: useDataConnectQueryOptions<GetOrganizationData>): UseDataConnectQueryResult<GetOrganizationData, GetOrganizationVariables>;
```

### Variables
The `GetOrganization` Query requires an argument of type `GetOrganizationVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetOrganizationVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `GetOrganization` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetOrganization` Query is of type `GetOrganizationData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetOrganization`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetOrganizationVariables } from '@omniretail/sql-connect';
import { useGetOrganization } from '@omniretail/sql-connect/react'

export default function GetOrganizationComponent() {
  // The `useGetOrganization` Query hook requires an argument of type `GetOrganizationVariables`:
  const getOrganizationVars: GetOrganizationVariables = {
    id: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetOrganization(getOrganizationVars);
  // Variables can be defined inline as well.
  const query = useGetOrganization({ id: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetOrganization(dataConnect, getOrganizationVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetOrganization(getOrganizationVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetOrganization(dataConnect, getOrganizationVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.organization);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetOrganizationTrusted
You can execute the `GetOrganizationTrusted` Query using the following Query hook function, which is defined in [sql-connect/react/index.d.ts](./index.d.ts):

```javascript
useGetOrganizationTrusted(dc: DataConnect, vars: GetOrganizationTrustedVariables, options?: useDataConnectQueryOptions<GetOrganizationTrustedData>): UseDataConnectQueryResult<GetOrganizationTrustedData, GetOrganizationTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetOrganizationTrusted(vars: GetOrganizationTrustedVariables, options?: useDataConnectQueryOptions<GetOrganizationTrustedData>): UseDataConnectQueryResult<GetOrganizationTrustedData, GetOrganizationTrustedVariables>;
```

### Variables
The `GetOrganizationTrusted` Query requires an argument of type `GetOrganizationTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetOrganizationTrustedVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `GetOrganizationTrusted` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetOrganizationTrusted` Query is of type `GetOrganizationTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetOrganizationTrusted`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetOrganizationTrustedVariables } from '@omniretail/sql-connect';
import { useGetOrganizationTrusted } from '@omniretail/sql-connect/react'

export default function GetOrganizationTrustedComponent() {
  // The `useGetOrganizationTrusted` Query hook requires an argument of type `GetOrganizationTrustedVariables`:
  const getOrganizationTrustedVars: GetOrganizationTrustedVariables = {
    id: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetOrganizationTrusted(getOrganizationTrustedVars);
  // Variables can be defined inline as well.
  const query = useGetOrganizationTrusted({ id: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetOrganizationTrusted(dataConnect, getOrganizationTrustedVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetOrganizationTrusted(getOrganizationTrustedVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetOrganizationTrusted(dataConnect, getOrganizationTrustedVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.organization);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListOrganizationAdministrators
You can execute the `ListOrganizationAdministrators` Query using the following Query hook function, which is defined in [sql-connect/react/index.d.ts](./index.d.ts):

```javascript
useListOrganizationAdministrators(dc: DataConnect, vars: ListOrganizationAdministratorsVariables, options?: useDataConnectQueryOptions<ListOrganizationAdministratorsData>): UseDataConnectQueryResult<ListOrganizationAdministratorsData, ListOrganizationAdministratorsVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListOrganizationAdministrators(vars: ListOrganizationAdministratorsVariables, options?: useDataConnectQueryOptions<ListOrganizationAdministratorsData>): UseDataConnectQueryResult<ListOrganizationAdministratorsData, ListOrganizationAdministratorsVariables>;
```

### Variables
The `ListOrganizationAdministrators` Query requires an argument of type `ListOrganizationAdministratorsVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListOrganizationAdministratorsVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that calling the `ListOrganizationAdministrators` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListOrganizationAdministrators` Query is of type `ListOrganizationAdministratorsData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListOrganizationAdministrators`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListOrganizationAdministratorsVariables } from '@omniretail/sql-connect';
import { useListOrganizationAdministrators } from '@omniretail/sql-connect/react'

export default function ListOrganizationAdministratorsComponent() {
  // The `useListOrganizationAdministrators` Query hook requires an argument of type `ListOrganizationAdministratorsVariables`:
  const listOrganizationAdministratorsVars: ListOrganizationAdministratorsVariables = {
    organizationId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListOrganizationAdministrators(listOrganizationAdministratorsVars);
  // Variables can be defined inline as well.
  const query = useListOrganizationAdministrators({ organizationId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListOrganizationAdministrators(dataConnect, listOrganizationAdministratorsVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListOrganizationAdministrators(listOrganizationAdministratorsVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListOrganizationAdministrators(dataConnect, listOrganizationAdministratorsVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.organizationMemberships);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetOrganizationAdministrator
You can execute the `GetOrganizationAdministrator` Query using the following Query hook function, which is defined in [sql-connect/react/index.d.ts](./index.d.ts):

```javascript
useGetOrganizationAdministrator(dc: DataConnect, vars: GetOrganizationAdministratorVariables, options?: useDataConnectQueryOptions<GetOrganizationAdministratorData>): UseDataConnectQueryResult<GetOrganizationAdministratorData, GetOrganizationAdministratorVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetOrganizationAdministrator(vars: GetOrganizationAdministratorVariables, options?: useDataConnectQueryOptions<GetOrganizationAdministratorData>): UseDataConnectQueryResult<GetOrganizationAdministratorData, GetOrganizationAdministratorVariables>;
```

### Variables
The `GetOrganizationAdministrator` Query requires an argument of type `GetOrganizationAdministratorVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetOrganizationAdministratorVariables {
  organizationId: UUIDString;
  userId: UUIDString;
}
```
### Return Type
Recall that calling the `GetOrganizationAdministrator` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetOrganizationAdministrator` Query is of type `GetOrganizationAdministratorData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetOrganizationAdministrator`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetOrganizationAdministratorVariables } from '@omniretail/sql-connect';
import { useGetOrganizationAdministrator } from '@omniretail/sql-connect/react'

export default function GetOrganizationAdministratorComponent() {
  // The `useGetOrganizationAdministrator` Query hook requires an argument of type `GetOrganizationAdministratorVariables`:
  const getOrganizationAdministratorVars: GetOrganizationAdministratorVariables = {
    organizationId: ..., 
    userId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetOrganizationAdministrator(getOrganizationAdministratorVars);
  // Variables can be defined inline as well.
  const query = useGetOrganizationAdministrator({ organizationId: ..., userId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetOrganizationAdministrator(dataConnect, getOrganizationAdministratorVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetOrganizationAdministrator(getOrganizationAdministratorVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetOrganizationAdministrator(dataConnect, getOrganizationAdministratorVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.organizationMemberships);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ResolveOrganizationAdministratorIdentity
You can execute the `ResolveOrganizationAdministratorIdentity` Query using the following Query hook function, which is defined in [sql-connect/react/index.d.ts](./index.d.ts):

```javascript
useResolveOrganizationAdministratorIdentity(dc: DataConnect, vars: ResolveOrganizationAdministratorIdentityVariables, options?: useDataConnectQueryOptions<ResolveOrganizationAdministratorIdentityData>): UseDataConnectQueryResult<ResolveOrganizationAdministratorIdentityData, ResolveOrganizationAdministratorIdentityVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useResolveOrganizationAdministratorIdentity(vars: ResolveOrganizationAdministratorIdentityVariables, options?: useDataConnectQueryOptions<ResolveOrganizationAdministratorIdentityData>): UseDataConnectQueryResult<ResolveOrganizationAdministratorIdentityData, ResolveOrganizationAdministratorIdentityVariables>;
```

### Variables
The `ResolveOrganizationAdministratorIdentity` Query requires an argument of type `ResolveOrganizationAdministratorIdentityVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ResolveOrganizationAdministratorIdentityVariables {
  organizationId: UUIDString;
  appUserId: UUIDString;
}
```
### Return Type
Recall that calling the `ResolveOrganizationAdministratorIdentity` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ResolveOrganizationAdministratorIdentity` Query is of type `ResolveOrganizationAdministratorIdentityData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ResolveOrganizationAdministratorIdentity`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ResolveOrganizationAdministratorIdentityVariables } from '@omniretail/sql-connect';
import { useResolveOrganizationAdministratorIdentity } from '@omniretail/sql-connect/react'

export default function ResolveOrganizationAdministratorIdentityComponent() {
  // The `useResolveOrganizationAdministratorIdentity` Query hook requires an argument of type `ResolveOrganizationAdministratorIdentityVariables`:
  const resolveOrganizationAdministratorIdentityVars: ResolveOrganizationAdministratorIdentityVariables = {
    organizationId: ..., 
    appUserId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useResolveOrganizationAdministratorIdentity(resolveOrganizationAdministratorIdentityVars);
  // Variables can be defined inline as well.
  const query = useResolveOrganizationAdministratorIdentity({ organizationId: ..., appUserId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useResolveOrganizationAdministratorIdentity(dataConnect, resolveOrganizationAdministratorIdentityVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useResolveOrganizationAdministratorIdentity(resolveOrganizationAdministratorIdentityVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useResolveOrganizationAdministratorIdentity(dataConnect, resolveOrganizationAdministratorIdentityVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.organizationMembership);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetLifecycleIdempotency
You can execute the `GetLifecycleIdempotency` Query using the following Query hook function, which is defined in [sql-connect/react/index.d.ts](./index.d.ts):

```javascript
useGetLifecycleIdempotency(dc: DataConnect, vars: GetLifecycleIdempotencyVariables, options?: useDataConnectQueryOptions<GetLifecycleIdempotencyData>): UseDataConnectQueryResult<GetLifecycleIdempotencyData, GetLifecycleIdempotencyVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetLifecycleIdempotency(vars: GetLifecycleIdempotencyVariables, options?: useDataConnectQueryOptions<GetLifecycleIdempotencyData>): UseDataConnectQueryResult<GetLifecycleIdempotencyData, GetLifecycleIdempotencyVariables>;
```

### Variables
The `GetLifecycleIdempotency` Query requires an argument of type `GetLifecycleIdempotencyVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetLifecycleIdempotencyVariables {
  idempotencyKey: string;
}
```
### Return Type
Recall that calling the `GetLifecycleIdempotency` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetLifecycleIdempotency` Query is of type `GetLifecycleIdempotencyData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetLifecycleIdempotency`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetLifecycleIdempotencyVariables } from '@omniretail/sql-connect';
import { useGetLifecycleIdempotency } from '@omniretail/sql-connect/react'

export default function GetLifecycleIdempotencyComponent() {
  // The `useGetLifecycleIdempotency` Query hook requires an argument of type `GetLifecycleIdempotencyVariables`:
  const getLifecycleIdempotencyVars: GetLifecycleIdempotencyVariables = {
    idempotencyKey: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetLifecycleIdempotency(getLifecycleIdempotencyVars);
  // Variables can be defined inline as well.
  const query = useGetLifecycleIdempotency({ idempotencyKey: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetLifecycleIdempotency(dataConnect, getLifecycleIdempotencyVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetLifecycleIdempotency(getLifecycleIdempotencyVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetLifecycleIdempotency(dataConnect, getLifecycleIdempotencyVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.lifecycleIdempotency);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetOrganizationLicense
You can execute the `GetOrganizationLicense` Query using the following Query hook function, which is defined in [sql-connect/react/index.d.ts](./index.d.ts):

```javascript
useGetOrganizationLicense(dc: DataConnect, vars: GetOrganizationLicenseVariables, options?: useDataConnectQueryOptions<GetOrganizationLicenseData>): UseDataConnectQueryResult<GetOrganizationLicenseData, GetOrganizationLicenseVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetOrganizationLicense(vars: GetOrganizationLicenseVariables, options?: useDataConnectQueryOptions<GetOrganizationLicenseData>): UseDataConnectQueryResult<GetOrganizationLicenseData, GetOrganizationLicenseVariables>;
```

### Variables
The `GetOrganizationLicense` Query requires an argument of type `GetOrganizationLicenseVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetOrganizationLicenseVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that calling the `GetOrganizationLicense` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetOrganizationLicense` Query is of type `GetOrganizationLicenseData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetOrganizationLicense`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetOrganizationLicenseVariables } from '@omniretail/sql-connect';
import { useGetOrganizationLicense } from '@omniretail/sql-connect/react'

export default function GetOrganizationLicenseComponent() {
  // The `useGetOrganizationLicense` Query hook requires an argument of type `GetOrganizationLicenseVariables`:
  const getOrganizationLicenseVars: GetOrganizationLicenseVariables = {
    organizationId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetOrganizationLicense(getOrganizationLicenseVars);
  // Variables can be defined inline as well.
  const query = useGetOrganizationLicense({ organizationId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetOrganizationLicense(dataConnect, getOrganizationLicenseVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetOrganizationLicense(getOrganizationLicenseVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetOrganizationLicense(dataConnect, getOrganizationLicenseVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.organizationLicenses);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetOrganizationLicenseTrusted
You can execute the `GetOrganizationLicenseTrusted` Query using the following Query hook function, which is defined in [sql-connect/react/index.d.ts](./index.d.ts):

```javascript
useGetOrganizationLicenseTrusted(dc: DataConnect, vars: GetOrganizationLicenseTrustedVariables, options?: useDataConnectQueryOptions<GetOrganizationLicenseTrustedData>): UseDataConnectQueryResult<GetOrganizationLicenseTrustedData, GetOrganizationLicenseTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetOrganizationLicenseTrusted(vars: GetOrganizationLicenseTrustedVariables, options?: useDataConnectQueryOptions<GetOrganizationLicenseTrustedData>): UseDataConnectQueryResult<GetOrganizationLicenseTrustedData, GetOrganizationLicenseTrustedVariables>;
```

### Variables
The `GetOrganizationLicenseTrusted` Query requires an argument of type `GetOrganizationLicenseTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetOrganizationLicenseTrustedVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that calling the `GetOrganizationLicenseTrusted` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetOrganizationLicenseTrusted` Query is of type `GetOrganizationLicenseTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetOrganizationLicenseTrusted`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetOrganizationLicenseTrustedVariables } from '@omniretail/sql-connect';
import { useGetOrganizationLicenseTrusted } from '@omniretail/sql-connect/react'

export default function GetOrganizationLicenseTrustedComponent() {
  // The `useGetOrganizationLicenseTrusted` Query hook requires an argument of type `GetOrganizationLicenseTrustedVariables`:
  const getOrganizationLicenseTrustedVars: GetOrganizationLicenseTrustedVariables = {
    organizationId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetOrganizationLicenseTrusted(getOrganizationLicenseTrustedVars);
  // Variables can be defined inline as well.
  const query = useGetOrganizationLicenseTrusted({ organizationId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetOrganizationLicenseTrusted(dataConnect, getOrganizationLicenseTrustedVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetOrganizationLicenseTrusted(getOrganizationLicenseTrustedVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetOrganizationLicenseTrusted(dataConnect, getOrganizationLicenseTrustedVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.organizationLicenses);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetOrganizationLicenseHistory
You can execute the `GetOrganizationLicenseHistory` Query using the following Query hook function, which is defined in [sql-connect/react/index.d.ts](./index.d.ts):

```javascript
useGetOrganizationLicenseHistory(dc: DataConnect, vars: GetOrganizationLicenseHistoryVariables, options?: useDataConnectQueryOptions<GetOrganizationLicenseHistoryData>): UseDataConnectQueryResult<GetOrganizationLicenseHistoryData, GetOrganizationLicenseHistoryVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetOrganizationLicenseHistory(vars: GetOrganizationLicenseHistoryVariables, options?: useDataConnectQueryOptions<GetOrganizationLicenseHistoryData>): UseDataConnectQueryResult<GetOrganizationLicenseHistoryData, GetOrganizationLicenseHistoryVariables>;
```

### Variables
The `GetOrganizationLicenseHistory` Query requires an argument of type `GetOrganizationLicenseHistoryVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetOrganizationLicenseHistoryVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that calling the `GetOrganizationLicenseHistory` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetOrganizationLicenseHistory` Query is of type `GetOrganizationLicenseHistoryData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetOrganizationLicenseHistory`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetOrganizationLicenseHistoryVariables } from '@omniretail/sql-connect';
import { useGetOrganizationLicenseHistory } from '@omniretail/sql-connect/react'

export default function GetOrganizationLicenseHistoryComponent() {
  // The `useGetOrganizationLicenseHistory` Query hook requires an argument of type `GetOrganizationLicenseHistoryVariables`:
  const getOrganizationLicenseHistoryVars: GetOrganizationLicenseHistoryVariables = {
    organizationId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetOrganizationLicenseHistory(getOrganizationLicenseHistoryVars);
  // Variables can be defined inline as well.
  const query = useGetOrganizationLicenseHistory({ organizationId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetOrganizationLicenseHistory(dataConnect, getOrganizationLicenseHistoryVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetOrganizationLicenseHistory(getOrganizationLicenseHistoryVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetOrganizationLicenseHistory(dataConnect, getOrganizationLicenseHistoryVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.licenseHistories);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetOrganizationLicensePublic
You can execute the `GetOrganizationLicensePublic` Query using the following Query hook function, which is defined in [sql-connect/react/index.d.ts](./index.d.ts):

```javascript
useGetOrganizationLicensePublic(dc: DataConnect, vars: GetOrganizationLicensePublicVariables, options?: useDataConnectQueryOptions<GetOrganizationLicensePublicData>): UseDataConnectQueryResult<GetOrganizationLicensePublicData, GetOrganizationLicensePublicVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetOrganizationLicensePublic(vars: GetOrganizationLicensePublicVariables, options?: useDataConnectQueryOptions<GetOrganizationLicensePublicData>): UseDataConnectQueryResult<GetOrganizationLicensePublicData, GetOrganizationLicensePublicVariables>;
```

### Variables
The `GetOrganizationLicensePublic` Query requires an argument of type `GetOrganizationLicensePublicVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetOrganizationLicensePublicVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that calling the `GetOrganizationLicensePublic` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetOrganizationLicensePublic` Query is of type `GetOrganizationLicensePublicData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetOrganizationLicensePublic`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetOrganizationLicensePublicVariables } from '@omniretail/sql-connect';
import { useGetOrganizationLicensePublic } from '@omniretail/sql-connect/react'

export default function GetOrganizationLicensePublicComponent() {
  // The `useGetOrganizationLicensePublic` Query hook requires an argument of type `GetOrganizationLicensePublicVariables`:
  const getOrganizationLicensePublicVars: GetOrganizationLicensePublicVariables = {
    organizationId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetOrganizationLicensePublic(getOrganizationLicensePublicVars);
  // Variables can be defined inline as well.
  const query = useGetOrganizationLicensePublic({ organizationId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetOrganizationLicensePublic(dataConnect, getOrganizationLicensePublicVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetOrganizationLicensePublic(getOrganizationLicensePublicVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetOrganizationLicensePublic(dataConnect, getOrganizationLicensePublicVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.organizationLicenses);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetOrganizationLicenseHistoryPublic
You can execute the `GetOrganizationLicenseHistoryPublic` Query using the following Query hook function, which is defined in [sql-connect/react/index.d.ts](./index.d.ts):

```javascript
useGetOrganizationLicenseHistoryPublic(dc: DataConnect, vars: GetOrganizationLicenseHistoryPublicVariables, options?: useDataConnectQueryOptions<GetOrganizationLicenseHistoryPublicData>): UseDataConnectQueryResult<GetOrganizationLicenseHistoryPublicData, GetOrganizationLicenseHistoryPublicVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetOrganizationLicenseHistoryPublic(vars: GetOrganizationLicenseHistoryPublicVariables, options?: useDataConnectQueryOptions<GetOrganizationLicenseHistoryPublicData>): UseDataConnectQueryResult<GetOrganizationLicenseHistoryPublicData, GetOrganizationLicenseHistoryPublicVariables>;
```

### Variables
The `GetOrganizationLicenseHistoryPublic` Query requires an argument of type `GetOrganizationLicenseHistoryPublicVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetOrganizationLicenseHistoryPublicVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that calling the `GetOrganizationLicenseHistoryPublic` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetOrganizationLicenseHistoryPublic` Query is of type `GetOrganizationLicenseHistoryPublicData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetOrganizationLicenseHistoryPublic`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetOrganizationLicenseHistoryPublicVariables } from '@omniretail/sql-connect';
import { useGetOrganizationLicenseHistoryPublic } from '@omniretail/sql-connect/react'

export default function GetOrganizationLicenseHistoryPublicComponent() {
  // The `useGetOrganizationLicenseHistoryPublic` Query hook requires an argument of type `GetOrganizationLicenseHistoryPublicVariables`:
  const getOrganizationLicenseHistoryPublicVars: GetOrganizationLicenseHistoryPublicVariables = {
    organizationId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetOrganizationLicenseHistoryPublic(getOrganizationLicenseHistoryPublicVars);
  // Variables can be defined inline as well.
  const query = useGetOrganizationLicenseHistoryPublic({ organizationId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetOrganizationLicenseHistoryPublic(dataConnect, getOrganizationLicenseHistoryPublicVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetOrganizationLicenseHistoryPublic(getOrganizationLicenseHistoryPublicVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetOrganizationLicenseHistoryPublic(dataConnect, getOrganizationLicenseHistoryPublicVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.licenseHistories);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListOrganizationsTrusted
You can execute the `ListOrganizationsTrusted` Query using the following Query hook function, which is defined in [sql-connect/react/index.d.ts](./index.d.ts):

```javascript
useListOrganizationsTrusted(dc: DataConnect, options?: useDataConnectQueryOptions<ListOrganizationsTrustedData>): UseDataConnectQueryResult<ListOrganizationsTrustedData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListOrganizationsTrusted(options?: useDataConnectQueryOptions<ListOrganizationsTrustedData>): UseDataConnectQueryResult<ListOrganizationsTrustedData, undefined>;
```

### Variables
The `ListOrganizationsTrusted` Query has no variables.
### Return Type
Recall that calling the `ListOrganizationsTrusted` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListOrganizationsTrusted` Query is of type `ListOrganizationsTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListOrganizationsTrusted`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@omniretail/sql-connect';
import { useListOrganizationsTrusted } from '@omniretail/sql-connect/react'

export default function ListOrganizationsTrustedComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListOrganizationsTrusted();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListOrganizationsTrusted(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListOrganizationsTrusted(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListOrganizationsTrusted(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.organizations);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListOrganizationUsersForDeletionTrusted
You can execute the `ListOrganizationUsersForDeletionTrusted` Query using the following Query hook function, which is defined in [sql-connect/react/index.d.ts](./index.d.ts):

```javascript
useListOrganizationUsersForDeletionTrusted(dc: DataConnect, vars: ListOrganizationUsersForDeletionTrustedVariables, options?: useDataConnectQueryOptions<ListOrganizationUsersForDeletionTrustedData>): UseDataConnectQueryResult<ListOrganizationUsersForDeletionTrustedData, ListOrganizationUsersForDeletionTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListOrganizationUsersForDeletionTrusted(vars: ListOrganizationUsersForDeletionTrustedVariables, options?: useDataConnectQueryOptions<ListOrganizationUsersForDeletionTrustedData>): UseDataConnectQueryResult<ListOrganizationUsersForDeletionTrustedData, ListOrganizationUsersForDeletionTrustedVariables>;
```

### Variables
The `ListOrganizationUsersForDeletionTrusted` Query requires an argument of type `ListOrganizationUsersForDeletionTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListOrganizationUsersForDeletionTrustedVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that calling the `ListOrganizationUsersForDeletionTrusted` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListOrganizationUsersForDeletionTrusted` Query is of type `ListOrganizationUsersForDeletionTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ListOrganizationUsersForDeletionTrustedData {
  organizationMemberships: ({
    user: {
      id: UUIDString;
      firebaseUid: string;
    } & AppUser_Key;
  })[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListOrganizationUsersForDeletionTrusted`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListOrganizationUsersForDeletionTrustedVariables } from '@omniretail/sql-connect';
import { useListOrganizationUsersForDeletionTrusted } from '@omniretail/sql-connect/react'

export default function ListOrganizationUsersForDeletionTrustedComponent() {
  // The `useListOrganizationUsersForDeletionTrusted` Query hook requires an argument of type `ListOrganizationUsersForDeletionTrustedVariables`:
  const listOrganizationUsersForDeletionTrustedVars: ListOrganizationUsersForDeletionTrustedVariables = {
    organizationId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListOrganizationUsersForDeletionTrusted(listOrganizationUsersForDeletionTrustedVars);
  // Variables can be defined inline as well.
  const query = useListOrganizationUsersForDeletionTrusted({ organizationId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListOrganizationUsersForDeletionTrusted(dataConnect, listOrganizationUsersForDeletionTrustedVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListOrganizationUsersForDeletionTrusted(listOrganizationUsersForDeletionTrustedVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListOrganizationUsersForDeletionTrusted(dataConnect, listOrganizationUsersForDeletionTrustedVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.organizationMemberships);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListTenantOutlets
You can execute the `ListTenantOutlets` Query using the following Query hook function, which is defined in [sql-connect/react/index.d.ts](./index.d.ts):

```javascript
useListTenantOutlets(dc: DataConnect, vars: ListTenantOutletsVariables, options?: useDataConnectQueryOptions<ListTenantOutletsData>): UseDataConnectQueryResult<ListTenantOutletsData, ListTenantOutletsVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListTenantOutlets(vars: ListTenantOutletsVariables, options?: useDataConnectQueryOptions<ListTenantOutletsData>): UseDataConnectQueryResult<ListTenantOutletsData, ListTenantOutletsVariables>;
```

### Variables
The `ListTenantOutlets` Query requires an argument of type `ListTenantOutletsVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListTenantOutletsVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that calling the `ListTenantOutlets` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListTenantOutlets` Query is of type `ListTenantOutletsData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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
    outletCode: string;
    name: string;
    contactPerson: string;
    email?: string | null;
    phone: string;
    address: string;
    timezone: string;
    currency: string;
    status: OutletStatus;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & Outlet_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListTenantOutlets`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListTenantOutletsVariables } from '@omniretail/sql-connect';
import { useListTenantOutlets } from '@omniretail/sql-connect/react'

export default function ListTenantOutletsComponent() {
  // The `useListTenantOutlets` Query hook requires an argument of type `ListTenantOutletsVariables`:
  const listTenantOutletsVars: ListTenantOutletsVariables = {
    organizationId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListTenantOutlets(listTenantOutletsVars);
  // Variables can be defined inline as well.
  const query = useListTenantOutlets({ organizationId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListTenantOutlets(dataConnect, listTenantOutletsVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListTenantOutlets(listTenantOutletsVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListTenantOutlets(dataConnect, listTenantOutletsVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.organizationMemberships);
    console.log(query.data.outlets);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListTenantEmployees
You can execute the `ListTenantEmployees` Query using the following Query hook function, which is defined in [sql-connect/react/index.d.ts](./index.d.ts):

```javascript
useListTenantEmployees(dc: DataConnect, vars: ListTenantEmployeesVariables, options?: useDataConnectQueryOptions<ListTenantEmployeesData>): UseDataConnectQueryResult<ListTenantEmployeesData, ListTenantEmployeesVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListTenantEmployees(vars: ListTenantEmployeesVariables, options?: useDataConnectQueryOptions<ListTenantEmployeesData>): UseDataConnectQueryResult<ListTenantEmployeesData, ListTenantEmployeesVariables>;
```

### Variables
The `ListTenantEmployees` Query requires an argument of type `ListTenantEmployeesVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListTenantEmployeesVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that calling the `ListTenantEmployees` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListTenantEmployees` Query is of type `ListTenantEmployeesData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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
      firebaseUid: string;
    } & AppUser_Key;
    employeeCode: string;
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
        outletCode: string;
        name: string;
      } & Outlet_Key;
    })[];
  } & Employee_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListTenantEmployees`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListTenantEmployeesVariables } from '@omniretail/sql-connect';
import { useListTenantEmployees } from '@omniretail/sql-connect/react'

export default function ListTenantEmployeesComponent() {
  // The `useListTenantEmployees` Query hook requires an argument of type `ListTenantEmployeesVariables`:
  const listTenantEmployeesVars: ListTenantEmployeesVariables = {
    organizationId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListTenantEmployees(listTenantEmployeesVars);
  // Variables can be defined inline as well.
  const query = useListTenantEmployees({ organizationId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListTenantEmployees(dataConnect, listTenantEmployeesVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListTenantEmployees(listTenantEmployeesVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListTenantEmployees(dataConnect, listTenantEmployeesVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.organizationMemberships);
    console.log(query.data.employees);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListTenantServicePersons
You can execute the `ListTenantServicePersons` Query using the following Query hook function, which is defined in [sql-connect/react/index.d.ts](./index.d.ts):

```javascript
useListTenantServicePersons(dc: DataConnect, vars: ListTenantServicePersonsVariables, options?: useDataConnectQueryOptions<ListTenantServicePersonsData>): UseDataConnectQueryResult<ListTenantServicePersonsData, ListTenantServicePersonsVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListTenantServicePersons(vars: ListTenantServicePersonsVariables, options?: useDataConnectQueryOptions<ListTenantServicePersonsData>): UseDataConnectQueryResult<ListTenantServicePersonsData, ListTenantServicePersonsVariables>;
```

### Variables
The `ListTenantServicePersons` Query requires an argument of type `ListTenantServicePersonsVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListTenantServicePersonsVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that calling the `ListTenantServicePersons` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListTenantServicePersons` Query is of type `ListTenantServicePersonsData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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
    servicePersonCode: string;
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
        outletCode: string;
        name: string;
      } & Outlet_Key;
    })[];
  } & ServicePerson_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListTenantServicePersons`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListTenantServicePersonsVariables } from '@omniretail/sql-connect';
import { useListTenantServicePersons } from '@omniretail/sql-connect/react'

export default function ListTenantServicePersonsComponent() {
  // The `useListTenantServicePersons` Query hook requires an argument of type `ListTenantServicePersonsVariables`:
  const listTenantServicePersonsVars: ListTenantServicePersonsVariables = {
    organizationId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListTenantServicePersons(listTenantServicePersonsVars);
  // Variables can be defined inline as well.
  const query = useListTenantServicePersons({ organizationId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListTenantServicePersons(dataConnect, listTenantServicePersonsVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListTenantServicePersons(listTenantServicePersonsVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListTenantServicePersons(dataConnect, listTenantServicePersonsVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.organizationMemberships);
    console.log(query.data.servicePeople);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListTenantProducts
You can execute the `ListTenantProducts` Query using the following Query hook function, which is defined in [sql-connect/react/index.d.ts](./index.d.ts):

```javascript
useListTenantProducts(dc: DataConnect, vars: ListTenantProductsVariables, options?: useDataConnectQueryOptions<ListTenantProductsData>): UseDataConnectQueryResult<ListTenantProductsData, ListTenantProductsVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListTenantProducts(vars: ListTenantProductsVariables, options?: useDataConnectQueryOptions<ListTenantProductsData>): UseDataConnectQueryResult<ListTenantProductsData, ListTenantProductsVariables>;
```

### Variables
The `ListTenantProducts` Query requires an argument of type `ListTenantProductsVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListTenantProductsVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that calling the `ListTenantProducts` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListTenantProducts` Query is of type `ListTenantProductsData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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
    productCode: string;
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListTenantProducts`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListTenantProductsVariables } from '@omniretail/sql-connect';
import { useListTenantProducts } from '@omniretail/sql-connect/react'

export default function ListTenantProductsComponent() {
  // The `useListTenantProducts` Query hook requires an argument of type `ListTenantProductsVariables`:
  const listTenantProductsVars: ListTenantProductsVariables = {
    organizationId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListTenantProducts(listTenantProductsVars);
  // Variables can be defined inline as well.
  const query = useListTenantProducts({ organizationId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListTenantProducts(dataConnect, listTenantProductsVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListTenantProducts(listTenantProductsVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListTenantProducts(dataConnect, listTenantProductsVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.organizationMemberships);
    console.log(query.data.products);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListTenantInventory
You can execute the `ListTenantInventory` Query using the following Query hook function, which is defined in [sql-connect/react/index.d.ts](./index.d.ts):

```javascript
useListTenantInventory(dc: DataConnect, vars: ListTenantInventoryVariables, options?: useDataConnectQueryOptions<ListTenantInventoryData>): UseDataConnectQueryResult<ListTenantInventoryData, ListTenantInventoryVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListTenantInventory(vars: ListTenantInventoryVariables, options?: useDataConnectQueryOptions<ListTenantInventoryData>): UseDataConnectQueryResult<ListTenantInventoryData, ListTenantInventoryVariables>;
```

### Variables
The `ListTenantInventory` Query requires an argument of type `ListTenantInventoryVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListTenantInventoryVariables {
  organizationId: UUIDString;
  outletId?: UUIDString | null;
}
```
### Return Type
Recall that calling the `ListTenantInventory` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListTenantInventory` Query is of type `ListTenantInventoryData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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
      outletCode: string;
      name: string;
    } & Outlet_Key;
    product: {
      id: UUIDString;
      productCode: string;
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListTenantInventory`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListTenantInventoryVariables } from '@omniretail/sql-connect';
import { useListTenantInventory } from '@omniretail/sql-connect/react'

export default function ListTenantInventoryComponent() {
  // The `useListTenantInventory` Query hook requires an argument of type `ListTenantInventoryVariables`:
  const listTenantInventoryVars: ListTenantInventoryVariables = {
    organizationId: ..., 
    outletId: ..., // optional
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListTenantInventory(listTenantInventoryVars);
  // Variables can be defined inline as well.
  const query = useListTenantInventory({ organizationId: ..., outletId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListTenantInventory(dataConnect, listTenantInventoryVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListTenantInventory(listTenantInventoryVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListTenantInventory(dataConnect, listTenantInventoryVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.organizationMemberships);
    console.log(query.data.inventoryStocks);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListTenantCustomers
You can execute the `ListTenantCustomers` Query using the following Query hook function, which is defined in [sql-connect/react/index.d.ts](./index.d.ts):

```javascript
useListTenantCustomers(dc: DataConnect, vars: ListTenantCustomersVariables, options?: useDataConnectQueryOptions<ListTenantCustomersData>): UseDataConnectQueryResult<ListTenantCustomersData, ListTenantCustomersVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListTenantCustomers(vars: ListTenantCustomersVariables, options?: useDataConnectQueryOptions<ListTenantCustomersData>): UseDataConnectQueryResult<ListTenantCustomersData, ListTenantCustomersVariables>;
```

### Variables
The `ListTenantCustomers` Query requires an argument of type `ListTenantCustomersVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListTenantCustomersVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that calling the `ListTenantCustomers` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListTenantCustomers` Query is of type `ListTenantCustomersData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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
    customerCode: string;
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListTenantCustomers`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListTenantCustomersVariables } from '@omniretail/sql-connect';
import { useListTenantCustomers } from '@omniretail/sql-connect/react'

export default function ListTenantCustomersComponent() {
  // The `useListTenantCustomers` Query hook requires an argument of type `ListTenantCustomersVariables`:
  const listTenantCustomersVars: ListTenantCustomersVariables = {
    organizationId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListTenantCustomers(listTenantCustomersVars);
  // Variables can be defined inline as well.
  const query = useListTenantCustomers({ organizationId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListTenantCustomers(dataConnect, listTenantCustomersVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListTenantCustomers(listTenantCustomersVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListTenantCustomers(dataConnect, listTenantCustomersVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.organizationMemberships);
    console.log(query.data.customers);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListTenantSuppliers
You can execute the `ListTenantSuppliers` Query using the following Query hook function, which is defined in [sql-connect/react/index.d.ts](./index.d.ts):

```javascript
useListTenantSuppliers(dc: DataConnect, vars: ListTenantSuppliersVariables, options?: useDataConnectQueryOptions<ListTenantSuppliersData>): UseDataConnectQueryResult<ListTenantSuppliersData, ListTenantSuppliersVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListTenantSuppliers(vars: ListTenantSuppliersVariables, options?: useDataConnectQueryOptions<ListTenantSuppliersData>): UseDataConnectQueryResult<ListTenantSuppliersData, ListTenantSuppliersVariables>;
```

### Variables
The `ListTenantSuppliers` Query requires an argument of type `ListTenantSuppliersVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListTenantSuppliersVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that calling the `ListTenantSuppliers` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListTenantSuppliers` Query is of type `ListTenantSuppliersData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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
    supplierCode: string;
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListTenantSuppliers`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListTenantSuppliersVariables } from '@omniretail/sql-connect';
import { useListTenantSuppliers } from '@omniretail/sql-connect/react'

export default function ListTenantSuppliersComponent() {
  // The `useListTenantSuppliers` Query hook requires an argument of type `ListTenantSuppliersVariables`:
  const listTenantSuppliersVars: ListTenantSuppliersVariables = {
    organizationId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListTenantSuppliers(listTenantSuppliersVars);
  // Variables can be defined inline as well.
  const query = useListTenantSuppliers({ organizationId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListTenantSuppliers(dataConnect, listTenantSuppliersVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListTenantSuppliers(listTenantSuppliersVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListTenantSuppliers(dataConnect, listTenantSuppliersVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.organizationMemberships);
    console.log(query.data.suppliers);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListTenantPurchases
You can execute the `ListTenantPurchases` Query using the following Query hook function, which is defined in [sql-connect/react/index.d.ts](./index.d.ts):

```javascript
useListTenantPurchases(dc: DataConnect, vars: ListTenantPurchasesVariables, options?: useDataConnectQueryOptions<ListTenantPurchasesData>): UseDataConnectQueryResult<ListTenantPurchasesData, ListTenantPurchasesVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListTenantPurchases(vars: ListTenantPurchasesVariables, options?: useDataConnectQueryOptions<ListTenantPurchasesData>): UseDataConnectQueryResult<ListTenantPurchasesData, ListTenantPurchasesVariables>;
```

### Variables
The `ListTenantPurchases` Query requires an argument of type `ListTenantPurchasesVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListTenantPurchasesVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that calling the `ListTenantPurchases` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListTenantPurchases` Query is of type `ListTenantPurchasesData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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
      supplierCode: string;
      name: string;
      taxId: string;
    } & Supplier_Key;
    outlet?: {
      id: UUIDString;
      outletCode: string;
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
        productCode: string;
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListTenantPurchases`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListTenantPurchasesVariables } from '@omniretail/sql-connect';
import { useListTenantPurchases } from '@omniretail/sql-connect/react'

export default function ListTenantPurchasesComponent() {
  // The `useListTenantPurchases` Query hook requires an argument of type `ListTenantPurchasesVariables`:
  const listTenantPurchasesVars: ListTenantPurchasesVariables = {
    organizationId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListTenantPurchases(listTenantPurchasesVars);
  // Variables can be defined inline as well.
  const query = useListTenantPurchases({ organizationId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListTenantPurchases(dataConnect, listTenantPurchasesVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListTenantPurchases(listTenantPurchasesVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListTenantPurchases(dataConnect, listTenantPurchasesVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.organizationMemberships);
    console.log(query.data.purchases);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListTenantExpenses
You can execute the `ListTenantExpenses` Query using the following Query hook function, which is defined in [sql-connect/react/index.d.ts](./index.d.ts):

```javascript
useListTenantExpenses(dc: DataConnect, vars: ListTenantExpensesVariables, options?: useDataConnectQueryOptions<ListTenantExpensesData>): UseDataConnectQueryResult<ListTenantExpensesData, ListTenantExpensesVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListTenantExpenses(vars: ListTenantExpensesVariables, options?: useDataConnectQueryOptions<ListTenantExpensesData>): UseDataConnectQueryResult<ListTenantExpensesData, ListTenantExpensesVariables>;
```

### Variables
The `ListTenantExpenses` Query requires an argument of type `ListTenantExpensesVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListTenantExpensesVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that calling the `ListTenantExpenses` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListTenantExpenses` Query is of type `ListTenantExpensesData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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
      outletCode: string;
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListTenantExpenses`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListTenantExpensesVariables } from '@omniretail/sql-connect';
import { useListTenantExpenses } from '@omniretail/sql-connect/react'

export default function ListTenantExpensesComponent() {
  // The `useListTenantExpenses` Query hook requires an argument of type `ListTenantExpensesVariables`:
  const listTenantExpensesVars: ListTenantExpensesVariables = {
    organizationId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListTenantExpenses(listTenantExpensesVars);
  // Variables can be defined inline as well.
  const query = useListTenantExpenses({ organizationId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListTenantExpenses(dataConnect, listTenantExpensesVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListTenantExpenses(listTenantExpensesVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListTenantExpenses(dataConnect, listTenantExpensesVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.organizationMemberships);
    console.log(query.data.expenses);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListTenantSales
You can execute the `ListTenantSales` Query using the following Query hook function, which is defined in [sql-connect/react/index.d.ts](./index.d.ts):

```javascript
useListTenantSales(dc: DataConnect, vars: ListTenantSalesVariables, options?: useDataConnectQueryOptions<ListTenantSalesData>): UseDataConnectQueryResult<ListTenantSalesData, ListTenantSalesVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListTenantSales(vars: ListTenantSalesVariables, options?: useDataConnectQueryOptions<ListTenantSalesData>): UseDataConnectQueryResult<ListTenantSalesData, ListTenantSalesVariables>;
```

### Variables
The `ListTenantSales` Query requires an argument of type `ListTenantSalesVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListTenantSalesVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that calling the `ListTenantSales` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListTenantSales` Query is of type `ListTenantSalesData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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
      outletCode: string;
      name: string;
    } & Outlet_Key;
    receiptNumber: string;
    saleTimestamp: TimestampString;
    customer?: {
      id: UUIDString;
      customerCode: string;
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
        productCode: string;
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListTenantSales`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListTenantSalesVariables } from '@omniretail/sql-connect';
import { useListTenantSales } from '@omniretail/sql-connect/react'

export default function ListTenantSalesComponent() {
  // The `useListTenantSales` Query hook requires an argument of type `ListTenantSalesVariables`:
  const listTenantSalesVars: ListTenantSalesVariables = {
    organizationId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListTenantSales(listTenantSalesVars);
  // Variables can be defined inline as well.
  const query = useListTenantSales({ organizationId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListTenantSales(dataConnect, listTenantSalesVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListTenantSales(listTenantSalesVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListTenantSales(dataConnect, listTenantSalesVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.organizationMemberships);
    console.log(query.data.sales);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetTenantInventoryStockTrusted
You can execute the `GetTenantInventoryStockTrusted` Query using the following Query hook function, which is defined in [sql-connect/react/index.d.ts](./index.d.ts):

```javascript
useGetTenantInventoryStockTrusted(dc: DataConnect, vars: GetTenantInventoryStockTrustedVariables, options?: useDataConnectQueryOptions<GetTenantInventoryStockTrustedData>): UseDataConnectQueryResult<GetTenantInventoryStockTrustedData, GetTenantInventoryStockTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetTenantInventoryStockTrusted(vars: GetTenantInventoryStockTrustedVariables, options?: useDataConnectQueryOptions<GetTenantInventoryStockTrustedData>): UseDataConnectQueryResult<GetTenantInventoryStockTrustedData, GetTenantInventoryStockTrustedVariables>;
```

### Variables
The `GetTenantInventoryStockTrusted` Query requires an argument of type `GetTenantInventoryStockTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetTenantInventoryStockTrustedVariables {
  organizationId: UUIDString;
  outletId: UUIDString;
  productId: UUIDString;
}
```
### Return Type
Recall that calling the `GetTenantInventoryStockTrusted` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetTenantInventoryStockTrusted` Query is of type `GetTenantInventoryStockTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetTenantInventoryStockTrustedData {
  inventoryStocks: ({
    onHandQty: number;
  })[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetTenantInventoryStockTrusted`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetTenantInventoryStockTrustedVariables } from '@omniretail/sql-connect';
import { useGetTenantInventoryStockTrusted } from '@omniretail/sql-connect/react'

export default function GetTenantInventoryStockTrustedComponent() {
  // The `useGetTenantInventoryStockTrusted` Query hook requires an argument of type `GetTenantInventoryStockTrustedVariables`:
  const getTenantInventoryStockTrustedVars: GetTenantInventoryStockTrustedVariables = {
    organizationId: ..., 
    outletId: ..., 
    productId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetTenantInventoryStockTrusted(getTenantInventoryStockTrustedVars);
  // Variables can be defined inline as well.
  const query = useGetTenantInventoryStockTrusted({ organizationId: ..., outletId: ..., productId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetTenantInventoryStockTrusted(dataConnect, getTenantInventoryStockTrustedVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetTenantInventoryStockTrusted(getTenantInventoryStockTrustedVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetTenantInventoryStockTrusted(dataConnect, getTenantInventoryStockTrustedVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.inventoryStocks);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetTenantMembershipTrusted
You can execute the `GetTenantMembershipTrusted` Query using the following Query hook function, which is defined in [sql-connect/react/index.d.ts](./index.d.ts):

```javascript
useGetTenantMembershipTrusted(dc: DataConnect, vars: GetTenantMembershipTrustedVariables, options?: useDataConnectQueryOptions<GetTenantMembershipTrustedData>): UseDataConnectQueryResult<GetTenantMembershipTrustedData, GetTenantMembershipTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetTenantMembershipTrusted(vars: GetTenantMembershipTrustedVariables, options?: useDataConnectQueryOptions<GetTenantMembershipTrustedData>): UseDataConnectQueryResult<GetTenantMembershipTrustedData, GetTenantMembershipTrustedVariables>;
```

### Variables
The `GetTenantMembershipTrusted` Query requires an argument of type `GetTenantMembershipTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetTenantMembershipTrustedVariables {
  organizationId: UUIDString;
  firebaseUid: string;
}
```
### Return Type
Recall that calling the `GetTenantMembershipTrusted` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetTenantMembershipTrusted` Query is of type `GetTenantMembershipTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetTenantMembershipTrusted`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetTenantMembershipTrustedVariables } from '@omniretail/sql-connect';
import { useGetTenantMembershipTrusted } from '@omniretail/sql-connect/react'

export default function GetTenantMembershipTrustedComponent() {
  // The `useGetTenantMembershipTrusted` Query hook requires an argument of type `GetTenantMembershipTrustedVariables`:
  const getTenantMembershipTrustedVars: GetTenantMembershipTrustedVariables = {
    organizationId: ..., 
    firebaseUid: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetTenantMembershipTrusted(getTenantMembershipTrustedVars);
  // Variables can be defined inline as well.
  const query = useGetTenantMembershipTrusted({ organizationId: ..., firebaseUid: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetTenantMembershipTrusted(dataConnect, getTenantMembershipTrustedVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetTenantMembershipTrusted(getTenantMembershipTrustedVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetTenantMembershipTrusted(dataConnect, getTenantMembershipTrustedVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.organizationMemberships);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListTenantOutletCodesTrusted
You can execute the `ListTenantOutletCodesTrusted` Query using the following Query hook function, which is defined in [sql-connect/react/index.d.ts](./index.d.ts):

```javascript
useListTenantOutletCodesTrusted(dc: DataConnect, options?: useDataConnectQueryOptions<ListTenantOutletCodesTrustedData>): UseDataConnectQueryResult<ListTenantOutletCodesTrustedData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListTenantOutletCodesTrusted(options?: useDataConnectQueryOptions<ListTenantOutletCodesTrustedData>): UseDataConnectQueryResult<ListTenantOutletCodesTrustedData, undefined>;
```

### Variables
The `ListTenantOutletCodesTrusted` Query has no variables.
### Return Type
Recall that calling the `ListTenantOutletCodesTrusted` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListTenantOutletCodesTrusted` Query is of type `ListTenantOutletCodesTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ListTenantOutletCodesTrustedData {
  outlets: ({
    outletCode: string;
  })[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListTenantOutletCodesTrusted`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@omniretail/sql-connect';
import { useListTenantOutletCodesTrusted } from '@omniretail/sql-connect/react'

export default function ListTenantOutletCodesTrustedComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListTenantOutletCodesTrusted();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListTenantOutletCodesTrusted(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListTenantOutletCodesTrusted(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListTenantOutletCodesTrusted(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.outlets);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

# Mutations

The React generated SDK provides Mutations hook functions that call and return [`useDataConnectMutation`](https://react-query-firebase.invertase.dev/react/data-connect/mutations) hooks from TanStack Query Firebase.

Calling these hook functions will return a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, and the most recent data returned by the Mutation, among other things. To learn more about these hooks and how to use them, see the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react/data-connect/mutations).

Mutation hooks do not execute their Mutations automatically when called. Rather, after calling the Mutation hook function and getting a `UseMutationResult` object, you must call the `UseMutationResult.mutate()` function to execute the Mutation.

To learn more about TanStack React Query's Mutations, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/mutations).

## Using Mutation Hooks
Here's a general overview of how to use the generated Mutation hooks in your code:

- Mutation hook functions are not called with the arguments to the Mutation. Instead, arguments are passed to `UseMutationResult.mutate()`.
- If the Mutation has no variables, the `mutate()` function does not require arguments.
- If the Mutation has any required variables, the `mutate()` function will require at least one argument: an object that contains all the required variables for the Mutation.
- If the Mutation has some required and some optional variables, only required variables are necessary in the variables argument object, and optional variables may be provided as well.
- If all of the Mutation's variables are optional, the Mutation hook function does not require any arguments.
- Mutation hook functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.
- Mutation hooks also accept an `options` argument of type `useDataConnectMutationOptions`. To learn more about the `options` argument, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/mutations#mutation-side-effects).
  - `UseMutationResult.mutate()` also accepts an `options` argument of type `useDataConnectMutationOptions`.
  - ***Special case:*** If the Mutation has no arguments (or all optional arguments and you wish to provide none), and you want to pass `options` to `UseMutationResult.mutate()`, you must pass `undefined` where you would normally pass the Mutation's arguments, and then may provide the options argument.

Below are examples of how to use the `master-admin` connector's generated Mutation hook functions to execute each Mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#operations-react-angular).

## RecordSuccessfulLogin
You can execute the `RecordSuccessfulLogin` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useRecordSuccessfulLogin(options?: useDataConnectMutationOptions<RecordSuccessfulLoginData, FirebaseError, RecordSuccessfulLoginVariables>): UseDataConnectMutationResult<RecordSuccessfulLoginData, RecordSuccessfulLoginVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useRecordSuccessfulLogin(dc: DataConnect, options?: useDataConnectMutationOptions<RecordSuccessfulLoginData, FirebaseError, RecordSuccessfulLoginVariables>): UseDataConnectMutationResult<RecordSuccessfulLoginData, RecordSuccessfulLoginVariables>;
```

### Variables
The `RecordSuccessfulLogin` Mutation requires an argument of type `RecordSuccessfulLoginVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface RecordSuccessfulLoginVariables {
  userId: UUIDString;
  auditId: UUIDString;
  requestId: string;
}
```
### Return Type
Recall that calling the `RecordSuccessfulLogin` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `RecordSuccessfulLogin` Mutation is of type `RecordSuccessfulLoginData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface RecordSuccessfulLoginData {
  appUser_update?: AppUser_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `RecordSuccessfulLogin`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, RecordSuccessfulLoginVariables } from '@omniretail/sql-connect';
import { useRecordSuccessfulLogin } from '@omniretail/sql-connect/react'

export default function RecordSuccessfulLoginComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useRecordSuccessfulLogin();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useRecordSuccessfulLogin(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useRecordSuccessfulLogin(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useRecordSuccessfulLogin(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useRecordSuccessfulLogin` Mutation requires an argument of type `RecordSuccessfulLoginVariables`:
  const recordSuccessfulLoginVars: RecordSuccessfulLoginVariables = {
    userId: ..., 
    auditId: ..., 
    requestId: ..., 
  };
  mutation.mutate(recordSuccessfulLoginVars);
  // Variables can be defined inline as well.
  mutation.mutate({ userId: ..., auditId: ..., requestId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(recordSuccessfulLoginVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.appUser_update);
    console.log(mutation.data.auditEvent_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateAppUserProfile
You can execute the `UpdateAppUserProfile` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateAppUserProfile(options?: useDataConnectMutationOptions<UpdateAppUserProfileData, FirebaseError, UpdateAppUserProfileVariables>): UseDataConnectMutationResult<UpdateAppUserProfileData, UpdateAppUserProfileVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateAppUserProfile(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateAppUserProfileData, FirebaseError, UpdateAppUserProfileVariables>): UseDataConnectMutationResult<UpdateAppUserProfileData, UpdateAppUserProfileVariables>;
```

### Variables
The `UpdateAppUserProfile` Mutation requires an argument of type `UpdateAppUserProfileVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateAppUserProfileVariables {
  userId: UUIDString;
  displayName: string;
  phone?: string | null;
  auditId: UUIDString;
  requestId: string;
}
```
### Return Type
Recall that calling the `UpdateAppUserProfile` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateAppUserProfile` Mutation is of type `UpdateAppUserProfileData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateAppUserProfileData {
  appUser_update?: AppUser_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateAppUserProfile`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateAppUserProfileVariables } from '@omniretail/sql-connect';
import { useUpdateAppUserProfile } from '@omniretail/sql-connect/react'

export default function UpdateAppUserProfileComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateAppUserProfile();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateAppUserProfile(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateAppUserProfile(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateAppUserProfile(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateAppUserProfile` Mutation requires an argument of type `UpdateAppUserProfileVariables`:
  const updateAppUserProfileVars: UpdateAppUserProfileVariables = {
    userId: ..., 
    displayName: ..., 
    phone: ..., // optional
    auditId: ..., 
    requestId: ..., 
  };
  mutation.mutate(updateAppUserProfileVars);
  // Variables can be defined inline as well.
  mutation.mutate({ userId: ..., displayName: ..., phone: ..., auditId: ..., requestId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateAppUserProfileVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.appUser_update);
    console.log(mutation.data.auditEvent_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## RecordPasswordChange
You can execute the `RecordPasswordChange` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useRecordPasswordChange(options?: useDataConnectMutationOptions<RecordPasswordChangeData, FirebaseError, RecordPasswordChangeVariables>): UseDataConnectMutationResult<RecordPasswordChangeData, RecordPasswordChangeVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useRecordPasswordChange(dc: DataConnect, options?: useDataConnectMutationOptions<RecordPasswordChangeData, FirebaseError, RecordPasswordChangeVariables>): UseDataConnectMutationResult<RecordPasswordChangeData, RecordPasswordChangeVariables>;
```

### Variables
The `RecordPasswordChange` Mutation requires an argument of type `RecordPasswordChangeVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface RecordPasswordChangeVariables {
  userId: UUIDString;
  auditId: UUIDString;
  requestId: string;
}
```
### Return Type
Recall that calling the `RecordPasswordChange` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `RecordPasswordChange` Mutation is of type `RecordPasswordChangeData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface RecordPasswordChangeData {
  auditEvent_insert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `RecordPasswordChange`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, RecordPasswordChangeVariables } from '@omniretail/sql-connect';
import { useRecordPasswordChange } from '@omniretail/sql-connect/react'

export default function RecordPasswordChangeComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useRecordPasswordChange();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useRecordPasswordChange(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useRecordPasswordChange(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useRecordPasswordChange(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useRecordPasswordChange` Mutation requires an argument of type `RecordPasswordChangeVariables`:
  const recordPasswordChangeVars: RecordPasswordChangeVariables = {
    userId: ..., 
    auditId: ..., 
    requestId: ..., 
  };
  mutation.mutate(recordPasswordChangeVars);
  // Variables can be defined inline as well.
  mutation.mutate({ userId: ..., auditId: ..., requestId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(recordPasswordChangeVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.auditEvent_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## BootstrapMasterAdmin
You can execute the `BootstrapMasterAdmin` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useBootstrapMasterAdmin(options?: useDataConnectMutationOptions<BootstrapMasterAdminData, FirebaseError, BootstrapMasterAdminVariables>): UseDataConnectMutationResult<BootstrapMasterAdminData, BootstrapMasterAdminVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useBootstrapMasterAdmin(dc: DataConnect, options?: useDataConnectMutationOptions<BootstrapMasterAdminData, FirebaseError, BootstrapMasterAdminVariables>): UseDataConnectMutationResult<BootstrapMasterAdminData, BootstrapMasterAdminVariables>;
```

### Variables
The `BootstrapMasterAdmin` Mutation requires an argument of type `BootstrapMasterAdminVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `BootstrapMasterAdmin` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `BootstrapMasterAdmin` Mutation is of type `BootstrapMasterAdminData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface BootstrapMasterAdminData {
  appUser_upsert: AppUser_Key;
  userRole_upsert: UserRole_Key;
  auditEvent_upsert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `BootstrapMasterAdmin`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, BootstrapMasterAdminVariables } from '@omniretail/sql-connect';
import { useBootstrapMasterAdmin } from '@omniretail/sql-connect/react'

export default function BootstrapMasterAdminComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useBootstrapMasterAdmin();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useBootstrapMasterAdmin(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useBootstrapMasterAdmin(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useBootstrapMasterAdmin(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useBootstrapMasterAdmin` Mutation requires an argument of type `BootstrapMasterAdminVariables`:
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
  mutation.mutate(bootstrapMasterAdminVars);
  // Variables can be defined inline as well.
  mutation.mutate({ userId: ..., firebaseUid: ..., username: ..., email: ..., displayName: ..., phone: ..., roleId: ..., auditId: ..., requestId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(bootstrapMasterAdminVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.appUser_upsert);
    console.log(mutation.data.userRole_upsert);
    console.log(mutation.data.auditEvent_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateLicensePlan
You can execute the `CreateLicensePlan` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useCreateLicensePlan(options?: useDataConnectMutationOptions<CreateLicensePlanData, FirebaseError, CreateLicensePlanVariables>): UseDataConnectMutationResult<CreateLicensePlanData, CreateLicensePlanVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateLicensePlan(dc: DataConnect, options?: useDataConnectMutationOptions<CreateLicensePlanData, FirebaseError, CreateLicensePlanVariables>): UseDataConnectMutationResult<CreateLicensePlanData, CreateLicensePlanVariables>;
```

### Variables
The `CreateLicensePlan` Mutation requires an argument of type `CreateLicensePlanVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `CreateLicensePlan` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateLicensePlan` Mutation is of type `CreateLicensePlanData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateLicensePlanData {
  licensePlan_insert: LicensePlan_Key;
  auditEvent_insert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateLicensePlan`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateLicensePlanVariables } from '@omniretail/sql-connect';
import { useCreateLicensePlan } from '@omniretail/sql-connect/react'

export default function CreateLicensePlanComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateLicensePlan();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateLicensePlan(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateLicensePlan(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateLicensePlan(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateLicensePlan` Mutation requires an argument of type `CreateLicensePlanVariables`:
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
  mutation.mutate(createLicensePlanVars);
  // Variables can be defined inline as well.
  mutation.mutate({ planCode: ..., name: ..., description: ..., level: ..., maxStores: ..., maxUsers: ..., auditId: ..., requestId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createLicensePlanVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.licensePlan_insert);
    console.log(mutation.data.auditEvent_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateLicensePlan
You can execute the `UpdateLicensePlan` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateLicensePlan(options?: useDataConnectMutationOptions<UpdateLicensePlanData, FirebaseError, UpdateLicensePlanVariables>): UseDataConnectMutationResult<UpdateLicensePlanData, UpdateLicensePlanVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateLicensePlan(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateLicensePlanData, FirebaseError, UpdateLicensePlanVariables>): UseDataConnectMutationResult<UpdateLicensePlanData, UpdateLicensePlanVariables>;
```

### Variables
The `UpdateLicensePlan` Mutation requires an argument of type `UpdateLicensePlanVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `UpdateLicensePlan` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateLicensePlan` Mutation is of type `UpdateLicensePlanData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateLicensePlanData {
  licensePlan_update?: LicensePlan_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateLicensePlan`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateLicensePlanVariables } from '@omniretail/sql-connect';
import { useUpdateLicensePlan } from '@omniretail/sql-connect/react'

export default function UpdateLicensePlanComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateLicensePlan();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateLicensePlan(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateLicensePlan(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateLicensePlan(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateLicensePlan` Mutation requires an argument of type `UpdateLicensePlanVariables`:
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
  mutation.mutate(updateLicensePlanVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., name: ..., description: ..., level: ..., maxStores: ..., maxUsers: ..., auditId: ..., requestId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateLicensePlanVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.licensePlan_update);
    console.log(mutation.data.auditEvent_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ChangeLicensePlanStatus
You can execute the `ChangeLicensePlanStatus` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useChangeLicensePlanStatus(options?: useDataConnectMutationOptions<ChangeLicensePlanStatusData, FirebaseError, ChangeLicensePlanStatusVariables>): UseDataConnectMutationResult<ChangeLicensePlanStatusData, ChangeLicensePlanStatusVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useChangeLicensePlanStatus(dc: DataConnect, options?: useDataConnectMutationOptions<ChangeLicensePlanStatusData, FirebaseError, ChangeLicensePlanStatusVariables>): UseDataConnectMutationResult<ChangeLicensePlanStatusData, ChangeLicensePlanStatusVariables>;
```

### Variables
The `ChangeLicensePlanStatus` Mutation requires an argument of type `ChangeLicensePlanStatusVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ChangeLicensePlanStatusVariables {
  id: UUIDString;
  status: LicensePlanStatus;
  action: string;
  auditId: UUIDString;
  requestId: string;
}
```
### Return Type
Recall that calling the `ChangeLicensePlanStatus` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ChangeLicensePlanStatus` Mutation is of type `ChangeLicensePlanStatusData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ChangeLicensePlanStatusData {
  licensePlan_update?: LicensePlan_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ChangeLicensePlanStatus`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ChangeLicensePlanStatusVariables } from '@omniretail/sql-connect';
import { useChangeLicensePlanStatus } from '@omniretail/sql-connect/react'

export default function ChangeLicensePlanStatusComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useChangeLicensePlanStatus();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useChangeLicensePlanStatus(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useChangeLicensePlanStatus(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useChangeLicensePlanStatus(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useChangeLicensePlanStatus` Mutation requires an argument of type `ChangeLicensePlanStatusVariables`:
  const changeLicensePlanStatusVars: ChangeLicensePlanStatusVariables = {
    id: ..., 
    status: ..., 
    action: ..., 
    auditId: ..., 
    requestId: ..., 
  };
  mutation.mutate(changeLicensePlanStatusVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., status: ..., action: ..., auditId: ..., requestId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(changeLicensePlanStatusVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.licensePlan_update);
    console.log(mutation.data.auditEvent_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteLicensePlan
You can execute the `DeleteLicensePlan` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useDeleteLicensePlan(options?: useDataConnectMutationOptions<DeleteLicensePlanData, FirebaseError, DeleteLicensePlanVariables>): UseDataConnectMutationResult<DeleteLicensePlanData, DeleteLicensePlanVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeleteLicensePlan(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteLicensePlanData, FirebaseError, DeleteLicensePlanVariables>): UseDataConnectMutationResult<DeleteLicensePlanData, DeleteLicensePlanVariables>;
```

### Variables
The `DeleteLicensePlan` Mutation requires an argument of type `DeleteLicensePlanVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteLicensePlanVariables {
  id: UUIDString;
  auditId: UUIDString;
  requestId: string;
}
```
### Return Type
Recall that calling the `DeleteLicensePlan` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteLicensePlan` Mutation is of type `DeleteLicensePlanData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteLicensePlanData {
  licensePlan_delete?: LicensePlan_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteLicensePlan`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteLicensePlanVariables } from '@omniretail/sql-connect';
import { useDeleteLicensePlan } from '@omniretail/sql-connect/react'

export default function DeleteLicensePlanComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteLicensePlan();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteLicensePlan(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteLicensePlan(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteLicensePlan(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteLicensePlan` Mutation requires an argument of type `DeleteLicensePlanVariables`:
  const deleteLicensePlanVars: DeleteLicensePlanVariables = {
    id: ..., 
    auditId: ..., 
    requestId: ..., 
  };
  mutation.mutate(deleteLicensePlanVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., auditId: ..., requestId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteLicensePlanVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.licensePlan_delete);
    console.log(mutation.data.auditEvent_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteLicensePlanTrusted
You can execute the `DeleteLicensePlanTrusted` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useDeleteLicensePlanTrusted(options?: useDataConnectMutationOptions<DeleteLicensePlanTrustedData, FirebaseError, DeleteLicensePlanTrustedVariables>): UseDataConnectMutationResult<DeleteLicensePlanTrustedData, DeleteLicensePlanTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeleteLicensePlanTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteLicensePlanTrustedData, FirebaseError, DeleteLicensePlanTrustedVariables>): UseDataConnectMutationResult<DeleteLicensePlanTrustedData, DeleteLicensePlanTrustedVariables>;
```

### Variables
The `DeleteLicensePlanTrusted` Mutation requires an argument of type `DeleteLicensePlanTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteLicensePlanTrustedVariables {
  id: UUIDString;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}
```
### Return Type
Recall that calling the `DeleteLicensePlanTrusted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteLicensePlanTrusted` Mutation is of type `DeleteLicensePlanTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteLicensePlanTrustedData {
  licensePlan_delete?: LicensePlan_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteLicensePlanTrusted`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteLicensePlanTrustedVariables } from '@omniretail/sql-connect';
import { useDeleteLicensePlanTrusted } from '@omniretail/sql-connect/react'

export default function DeleteLicensePlanTrustedComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteLicensePlanTrusted();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteLicensePlanTrusted(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteLicensePlanTrusted(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteLicensePlanTrusted(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteLicensePlanTrusted` Mutation requires an argument of type `DeleteLicensePlanTrustedVariables`:
  const deleteLicensePlanTrustedVars: DeleteLicensePlanTrustedVariables = {
    id: ..., 
    auditId: ..., 
    requestId: ..., 
    actorFirebaseUid: ..., 
  };
  mutation.mutate(deleteLicensePlanTrustedVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteLicensePlanTrustedVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.licensePlan_delete);
    console.log(mutation.data.auditEvent_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ProvisionOrganizationAdministrator
You can execute the `ProvisionOrganizationAdministrator` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useProvisionOrganizationAdministrator(options?: useDataConnectMutationOptions<ProvisionOrganizationAdministratorData, FirebaseError, ProvisionOrganizationAdministratorVariables>): UseDataConnectMutationResult<ProvisionOrganizationAdministratorData, ProvisionOrganizationAdministratorVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useProvisionOrganizationAdministrator(dc: DataConnect, options?: useDataConnectMutationOptions<ProvisionOrganizationAdministratorData, FirebaseError, ProvisionOrganizationAdministratorVariables>): UseDataConnectMutationResult<ProvisionOrganizationAdministratorData, ProvisionOrganizationAdministratorVariables>;
```

### Variables
The `ProvisionOrganizationAdministrator` Mutation requires an argument of type `ProvisionOrganizationAdministratorVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `ProvisionOrganizationAdministrator` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ProvisionOrganizationAdministrator` Mutation is of type `ProvisionOrganizationAdministratorData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ProvisionOrganizationAdministratorData {
  appUser_insert: AppUser_Key;
  organizationMembership_insert: OrganizationMembership_Key;
  userRole_upsert: UserRole_Key;
  auditEvent_insert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ProvisionOrganizationAdministrator`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ProvisionOrganizationAdministratorVariables } from '@omniretail/sql-connect';
import { useProvisionOrganizationAdministrator } from '@omniretail/sql-connect/react'

export default function ProvisionOrganizationAdministratorComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useProvisionOrganizationAdministrator();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useProvisionOrganizationAdministrator(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useProvisionOrganizationAdministrator(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useProvisionOrganizationAdministrator(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useProvisionOrganizationAdministrator` Mutation requires an argument of type `ProvisionOrganizationAdministratorVariables`:
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
  mutation.mutate(provisionOrganizationAdministratorVars);
  // Variables can be defined inline as well.
  mutation.mutate({ userId: ..., firebaseUid: ..., username: ..., email: ..., displayName: ..., phone: ..., organizationId: ..., roleId: ..., auditId: ..., requestId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(provisionOrganizationAdministratorVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.appUser_insert);
    console.log(mutation.data.organizationMembership_insert);
    console.log(mutation.data.userRole_upsert);
    console.log(mutation.data.auditEvent_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## EnsureAppUserRoleTrusted
You can execute the `EnsureAppUserRoleTrusted` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useEnsureAppUserRoleTrusted(options?: useDataConnectMutationOptions<EnsureAppUserRoleTrustedData, FirebaseError, EnsureAppUserRoleTrustedVariables>): UseDataConnectMutationResult<EnsureAppUserRoleTrustedData, EnsureAppUserRoleTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useEnsureAppUserRoleTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<EnsureAppUserRoleTrustedData, FirebaseError, EnsureAppUserRoleTrustedVariables>): UseDataConnectMutationResult<EnsureAppUserRoleTrustedData, EnsureAppUserRoleTrustedVariables>;
```

### Variables
The `EnsureAppUserRoleTrusted` Mutation requires an argument of type `EnsureAppUserRoleTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface EnsureAppUserRoleTrustedVariables {
  userId: UUIDString;
  roleId: UUIDString;
}
```
### Return Type
Recall that calling the `EnsureAppUserRoleTrusted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `EnsureAppUserRoleTrusted` Mutation is of type `EnsureAppUserRoleTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface EnsureAppUserRoleTrustedData {
  userRole_upsert: UserRole_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `EnsureAppUserRoleTrusted`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, EnsureAppUserRoleTrustedVariables } from '@omniretail/sql-connect';
import { useEnsureAppUserRoleTrusted } from '@omniretail/sql-connect/react'

export default function EnsureAppUserRoleTrustedComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useEnsureAppUserRoleTrusted();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useEnsureAppUserRoleTrusted(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useEnsureAppUserRoleTrusted(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useEnsureAppUserRoleTrusted(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useEnsureAppUserRoleTrusted` Mutation requires an argument of type `EnsureAppUserRoleTrustedVariables`:
  const ensureAppUserRoleTrustedVars: EnsureAppUserRoleTrustedVariables = {
    userId: ..., 
    roleId: ..., 
  };
  mutation.mutate(ensureAppUserRoleTrustedVars);
  // Variables can be defined inline as well.
  mutation.mutate({ userId: ..., roleId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(ensureAppUserRoleTrustedVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.userRole_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateOrganizationAdministrator
You can execute the `UpdateOrganizationAdministrator` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateOrganizationAdministrator(options?: useDataConnectMutationOptions<UpdateOrganizationAdministratorData, FirebaseError, UpdateOrganizationAdministratorVariables>): UseDataConnectMutationResult<UpdateOrganizationAdministratorData, UpdateOrganizationAdministratorVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateOrganizationAdministrator(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateOrganizationAdministratorData, FirebaseError, UpdateOrganizationAdministratorVariables>): UseDataConnectMutationResult<UpdateOrganizationAdministratorData, UpdateOrganizationAdministratorVariables>;
```

### Variables
The `UpdateOrganizationAdministrator` Mutation requires an argument of type `UpdateOrganizationAdministratorVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `UpdateOrganizationAdministrator` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateOrganizationAdministrator` Mutation is of type `UpdateOrganizationAdministratorData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateOrganizationAdministratorData {
  appUser_update?: AppUser_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateOrganizationAdministrator`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateOrganizationAdministratorVariables } from '@omniretail/sql-connect';
import { useUpdateOrganizationAdministrator } from '@omniretail/sql-connect/react'

export default function UpdateOrganizationAdministratorComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateOrganizationAdministrator();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateOrganizationAdministrator(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateOrganizationAdministrator(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateOrganizationAdministrator(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateOrganizationAdministrator` Mutation requires an argument of type `UpdateOrganizationAdministratorVariables`:
  const updateOrganizationAdministratorVars: UpdateOrganizationAdministratorVariables = {
    organizationId: ..., 
    userId: ..., 
    displayName: ..., 
    phone: ..., 
    auditId: ..., 
    requestId: ..., 
  };
  mutation.mutate(updateOrganizationAdministratorVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., userId: ..., displayName: ..., phone: ..., auditId: ..., requestId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateOrganizationAdministratorVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.appUser_update);
    console.log(mutation.data.auditEvent_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ChangeOrganizationAdministratorStatus
You can execute the `ChangeOrganizationAdministratorStatus` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useChangeOrganizationAdministratorStatus(options?: useDataConnectMutationOptions<ChangeOrganizationAdministratorStatusData, FirebaseError, ChangeOrganizationAdministratorStatusVariables>): UseDataConnectMutationResult<ChangeOrganizationAdministratorStatusData, ChangeOrganizationAdministratorStatusVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useChangeOrganizationAdministratorStatus(dc: DataConnect, options?: useDataConnectMutationOptions<ChangeOrganizationAdministratorStatusData, FirebaseError, ChangeOrganizationAdministratorStatusVariables>): UseDataConnectMutationResult<ChangeOrganizationAdministratorStatusData, ChangeOrganizationAdministratorStatusVariables>;
```

### Variables
The `ChangeOrganizationAdministratorStatus` Mutation requires an argument of type `ChangeOrganizationAdministratorStatusVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `ChangeOrganizationAdministratorStatus` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ChangeOrganizationAdministratorStatus` Mutation is of type `ChangeOrganizationAdministratorStatusData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ChangeOrganizationAdministratorStatusData {
  appUser_update?: AppUser_Key | null;
  organizationMembership_update?: OrganizationMembership_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ChangeOrganizationAdministratorStatus`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ChangeOrganizationAdministratorStatusVariables } from '@omniretail/sql-connect';
import { useChangeOrganizationAdministratorStatus } from '@omniretail/sql-connect/react'

export default function ChangeOrganizationAdministratorStatusComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useChangeOrganizationAdministratorStatus();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useChangeOrganizationAdministratorStatus(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useChangeOrganizationAdministratorStatus(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useChangeOrganizationAdministratorStatus(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useChangeOrganizationAdministratorStatus` Mutation requires an argument of type `ChangeOrganizationAdministratorStatusVariables`:
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
  mutation.mutate(changeOrganizationAdministratorStatusVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., userId: ..., status: ..., membershipStatus: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., action: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(changeOrganizationAdministratorStatusVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.appUser_update);
    console.log(mutation.data.organizationMembership_update);
    console.log(mutation.data.auditEvent_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## RecordAdministratorSecurityEvent
You can execute the `RecordAdministratorSecurityEvent` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useRecordAdministratorSecurityEvent(options?: useDataConnectMutationOptions<RecordAdministratorSecurityEventData, FirebaseError, RecordAdministratorSecurityEventVariables>): UseDataConnectMutationResult<RecordAdministratorSecurityEventData, RecordAdministratorSecurityEventVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useRecordAdministratorSecurityEvent(dc: DataConnect, options?: useDataConnectMutationOptions<RecordAdministratorSecurityEventData, FirebaseError, RecordAdministratorSecurityEventVariables>): UseDataConnectMutationResult<RecordAdministratorSecurityEventData, RecordAdministratorSecurityEventVariables>;
```

### Variables
The `RecordAdministratorSecurityEvent` Mutation requires an argument of type `RecordAdministratorSecurityEventVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `RecordAdministratorSecurityEvent` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `RecordAdministratorSecurityEvent` Mutation is of type `RecordAdministratorSecurityEventData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface RecordAdministratorSecurityEventData {
  auditEvent_insert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `RecordAdministratorSecurityEvent`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, RecordAdministratorSecurityEventVariables } from '@omniretail/sql-connect';
import { useRecordAdministratorSecurityEvent } from '@omniretail/sql-connect/react'

export default function RecordAdministratorSecurityEventComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useRecordAdministratorSecurityEvent();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useRecordAdministratorSecurityEvent(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useRecordAdministratorSecurityEvent(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useRecordAdministratorSecurityEvent(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useRecordAdministratorSecurityEvent` Mutation requires an argument of type `RecordAdministratorSecurityEventVariables`:
  const recordAdministratorSecurityEventVars: RecordAdministratorSecurityEventVariables = {
    auditId: ..., 
    actorFirebaseUid: ..., 
    action: ..., 
    targetId: ..., 
    organizationId: ..., 
    requestId: ..., 
  };
  mutation.mutate(recordAdministratorSecurityEventVars);
  // Variables can be defined inline as well.
  mutation.mutate({ auditId: ..., actorFirebaseUid: ..., action: ..., targetId: ..., organizationId: ..., requestId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(recordAdministratorSecurityEventVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.auditEvent_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteOrganizationTrusted
You can execute the `DeleteOrganizationTrusted` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useDeleteOrganizationTrusted(options?: useDataConnectMutationOptions<DeleteOrganizationTrustedData, FirebaseError, DeleteOrganizationTrustedVariables>): UseDataConnectMutationResult<DeleteOrganizationTrustedData, DeleteOrganizationTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeleteOrganizationTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteOrganizationTrustedData, FirebaseError, DeleteOrganizationTrustedVariables>): UseDataConnectMutationResult<DeleteOrganizationTrustedData, DeleteOrganizationTrustedVariables>;
```

### Variables
The `DeleteOrganizationTrusted` Mutation requires an argument of type `DeleteOrganizationTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteOrganizationTrustedVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteOrganizationTrusted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteOrganizationTrusted` Mutation is of type `DeleteOrganizationTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteOrganizationTrustedData {
  organization_delete?: Organization_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteOrganizationTrusted`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteOrganizationTrustedVariables } from '@omniretail/sql-connect';
import { useDeleteOrganizationTrusted } from '@omniretail/sql-connect/react'

export default function DeleteOrganizationTrustedComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteOrganizationTrusted();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteOrganizationTrusted(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteOrganizationTrusted(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteOrganizationTrusted(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteOrganizationTrusted` Mutation requires an argument of type `DeleteOrganizationTrustedVariables`:
  const deleteOrganizationTrustedVars: DeleteOrganizationTrustedVariables = {
    id: ..., 
  };
  mutation.mutate(deleteOrganizationTrustedVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteOrganizationTrustedVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.organization_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteAppUserTrusted
You can execute the `DeleteAppUserTrusted` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useDeleteAppUserTrusted(options?: useDataConnectMutationOptions<DeleteAppUserTrustedData, FirebaseError, DeleteAppUserTrustedVariables>): UseDataConnectMutationResult<DeleteAppUserTrustedData, DeleteAppUserTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeleteAppUserTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteAppUserTrustedData, FirebaseError, DeleteAppUserTrustedVariables>): UseDataConnectMutationResult<DeleteAppUserTrustedData, DeleteAppUserTrustedVariables>;
```

### Variables
The `DeleteAppUserTrusted` Mutation requires an argument of type `DeleteAppUserTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteAppUserTrustedVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteAppUserTrusted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteAppUserTrusted` Mutation is of type `DeleteAppUserTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteAppUserTrustedData {
  appUser_delete?: AppUser_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteAppUserTrusted`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteAppUserTrustedVariables } from '@omniretail/sql-connect';
import { useDeleteAppUserTrusted } from '@omniretail/sql-connect/react'

export default function DeleteAppUserTrustedComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteAppUserTrusted();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteAppUserTrusted(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteAppUserTrusted(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteAppUserTrusted(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteAppUserTrusted` Mutation requires an argument of type `DeleteAppUserTrustedVariables`:
  const deleteAppUserTrustedVars: DeleteAppUserTrustedVariables = {
    id: ..., 
  };
  mutation.mutate(deleteAppUserTrustedVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteAppUserTrustedVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.appUser_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AssignOrganizationLicenseTrusted
You can execute the `AssignOrganizationLicenseTrusted` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useAssignOrganizationLicenseTrusted(options?: useDataConnectMutationOptions<AssignOrganizationLicenseTrustedData, FirebaseError, AssignOrganizationLicenseTrustedVariables>): UseDataConnectMutationResult<AssignOrganizationLicenseTrustedData, AssignOrganizationLicenseTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAssignOrganizationLicenseTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<AssignOrganizationLicenseTrustedData, FirebaseError, AssignOrganizationLicenseTrustedVariables>): UseDataConnectMutationResult<AssignOrganizationLicenseTrustedData, AssignOrganizationLicenseTrustedVariables>;
```

### Variables
The `AssignOrganizationLicenseTrusted` Mutation requires an argument of type `AssignOrganizationLicenseTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `AssignOrganizationLicenseTrusted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AssignOrganizationLicenseTrusted` Mutation is of type `AssignOrganizationLicenseTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AssignOrganizationLicenseTrustedData {
  organizationLicense_insert: OrganizationLicense_Key;
  licenseHistory_insert: LicenseHistory_Key;
  auditEvent_insert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AssignOrganizationLicenseTrusted`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AssignOrganizationLicenseTrustedVariables } from '@omniretail/sql-connect';
import { useAssignOrganizationLicenseTrusted } from '@omniretail/sql-connect/react'

export default function AssignOrganizationLicenseTrustedComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAssignOrganizationLicenseTrusted();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAssignOrganizationLicenseTrusted(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAssignOrganizationLicenseTrusted(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAssignOrganizationLicenseTrusted(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAssignOrganizationLicenseTrusted` Mutation requires an argument of type `AssignOrganizationLicenseTrustedVariables`:
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
  mutation.mutate(assignOrganizationLicenseTrustedVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., organizationId: ..., planId: ..., startDate: ..., expiryDate: ..., negotiatedPrice: ..., currency: ..., historyId: ..., planCode: ..., planName: ..., planLevel: ..., maxStores: ..., maxUsers: ..., auditId: ..., actorFirebaseUid: ..., requestId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(assignOrganizationLicenseTrustedVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.organizationLicense_insert);
    console.log(mutation.data.licenseHistory_insert);
    console.log(mutation.data.auditEvent_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ChangeOrganizationLicensePlanTrusted
You can execute the `ChangeOrganizationLicensePlanTrusted` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useChangeOrganizationLicensePlanTrusted(options?: useDataConnectMutationOptions<ChangeOrganizationLicensePlanTrustedData, FirebaseError, ChangeOrganizationLicensePlanTrustedVariables>): UseDataConnectMutationResult<ChangeOrganizationLicensePlanTrustedData, ChangeOrganizationLicensePlanTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useChangeOrganizationLicensePlanTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<ChangeOrganizationLicensePlanTrustedData, FirebaseError, ChangeOrganizationLicensePlanTrustedVariables>): UseDataConnectMutationResult<ChangeOrganizationLicensePlanTrustedData, ChangeOrganizationLicensePlanTrustedVariables>;
```

### Variables
The `ChangeOrganizationLicensePlanTrusted` Mutation requires an argument of type `ChangeOrganizationLicensePlanTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `ChangeOrganizationLicensePlanTrusted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ChangeOrganizationLicensePlanTrusted` Mutation is of type `ChangeOrganizationLicensePlanTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ChangeOrganizationLicensePlanTrustedData {
  organizationLicense_update?: OrganizationLicense_Key | null;
  licenseHistory_insert: LicenseHistory_Key;
  auditEvent_insert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ChangeOrganizationLicensePlanTrusted`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ChangeOrganizationLicensePlanTrustedVariables } from '@omniretail/sql-connect';
import { useChangeOrganizationLicensePlanTrusted } from '@omniretail/sql-connect/react'

export default function ChangeOrganizationLicensePlanTrustedComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useChangeOrganizationLicensePlanTrusted();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useChangeOrganizationLicensePlanTrusted(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useChangeOrganizationLicensePlanTrusted(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useChangeOrganizationLicensePlanTrusted(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useChangeOrganizationLicensePlanTrusted` Mutation requires an argument of type `ChangeOrganizationLicensePlanTrustedVariables`:
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
  mutation.mutate(changeOrganizationLicensePlanTrustedVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., organizationId: ..., planId: ..., startDate: ..., expiryDate: ..., negotiatedPrice: ..., currency: ..., historyId: ..., planCode: ..., planName: ..., planLevel: ..., maxStores: ..., maxUsers: ..., auditId: ..., actorFirebaseUid: ..., requestId: ..., changes: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(changeOrganizationLicensePlanTrustedVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.organizationLicense_update);
    console.log(mutation.data.licenseHistory_insert);
    console.log(mutation.data.auditEvent_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ModifyOrganizationCommercialTermsTrusted
You can execute the `ModifyOrganizationCommercialTermsTrusted` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useModifyOrganizationCommercialTermsTrusted(options?: useDataConnectMutationOptions<ModifyOrganizationCommercialTermsTrustedData, FirebaseError, ModifyOrganizationCommercialTermsTrustedVariables>): UseDataConnectMutationResult<ModifyOrganizationCommercialTermsTrustedData, ModifyOrganizationCommercialTermsTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useModifyOrganizationCommercialTermsTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<ModifyOrganizationCommercialTermsTrustedData, FirebaseError, ModifyOrganizationCommercialTermsTrustedVariables>): UseDataConnectMutationResult<ModifyOrganizationCommercialTermsTrustedData, ModifyOrganizationCommercialTermsTrustedVariables>;
```

### Variables
The `ModifyOrganizationCommercialTermsTrusted` Mutation requires an argument of type `ModifyOrganizationCommercialTermsTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `ModifyOrganizationCommercialTermsTrusted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ModifyOrganizationCommercialTermsTrusted` Mutation is of type `ModifyOrganizationCommercialTermsTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ModifyOrganizationCommercialTermsTrustedData {
  organizationLicense_update?: OrganizationLicense_Key | null;
  licenseHistory_insert: LicenseHistory_Key;
  auditEvent_insert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ModifyOrganizationCommercialTermsTrusted`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ModifyOrganizationCommercialTermsTrustedVariables } from '@omniretail/sql-connect';
import { useModifyOrganizationCommercialTermsTrusted } from '@omniretail/sql-connect/react'

export default function ModifyOrganizationCommercialTermsTrustedComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useModifyOrganizationCommercialTermsTrusted();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useModifyOrganizationCommercialTermsTrusted(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useModifyOrganizationCommercialTermsTrusted(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useModifyOrganizationCommercialTermsTrusted(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useModifyOrganizationCommercialTermsTrusted` Mutation requires an argument of type `ModifyOrganizationCommercialTermsTrustedVariables`:
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
  mutation.mutate(modifyOrganizationCommercialTermsTrustedVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., organizationId: ..., planId: ..., startDate: ..., expiryDate: ..., negotiatedPrice: ..., currency: ..., historyId: ..., planCode: ..., planName: ..., planLevel: ..., maxStores: ..., maxUsers: ..., auditId: ..., actorFirebaseUid: ..., requestId: ..., changes: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(modifyOrganizationCommercialTermsTrustedVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.organizationLicense_update);
    console.log(mutation.data.licenseHistory_insert);
    console.log(mutation.data.auditEvent_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## RenewOrganizationLicenseTrusted
You can execute the `RenewOrganizationLicenseTrusted` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useRenewOrganizationLicenseTrusted(options?: useDataConnectMutationOptions<RenewOrganizationLicenseTrustedData, FirebaseError, RenewOrganizationLicenseTrustedVariables>): UseDataConnectMutationResult<RenewOrganizationLicenseTrustedData, RenewOrganizationLicenseTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useRenewOrganizationLicenseTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<RenewOrganizationLicenseTrustedData, FirebaseError, RenewOrganizationLicenseTrustedVariables>): UseDataConnectMutationResult<RenewOrganizationLicenseTrustedData, RenewOrganizationLicenseTrustedVariables>;
```

### Variables
The `RenewOrganizationLicenseTrusted` Mutation requires an argument of type `RenewOrganizationLicenseTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `RenewOrganizationLicenseTrusted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `RenewOrganizationLicenseTrusted` Mutation is of type `RenewOrganizationLicenseTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface RenewOrganizationLicenseTrustedData {
  organizationLicense_update?: OrganizationLicense_Key | null;
  licenseHistory_insert: LicenseHistory_Key;
  auditEvent_insert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `RenewOrganizationLicenseTrusted`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, RenewOrganizationLicenseTrustedVariables } from '@omniretail/sql-connect';
import { useRenewOrganizationLicenseTrusted } from '@omniretail/sql-connect/react'

export default function RenewOrganizationLicenseTrustedComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useRenewOrganizationLicenseTrusted();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useRenewOrganizationLicenseTrusted(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useRenewOrganizationLicenseTrusted(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useRenewOrganizationLicenseTrusted(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useRenewOrganizationLicenseTrusted` Mutation requires an argument of type `RenewOrganizationLicenseTrustedVariables`:
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
  mutation.mutate(renewOrganizationLicenseTrustedVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., organizationId: ..., planId: ..., startDate: ..., expiryDate: ..., negotiatedPrice: ..., currency: ..., historyId: ..., planCode: ..., planName: ..., planLevel: ..., maxStores: ..., maxUsers: ..., auditId: ..., actorFirebaseUid: ..., requestId: ..., changes: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(renewOrganizationLicenseTrustedVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.organizationLicense_update);
    console.log(mutation.data.licenseHistory_insert);
    console.log(mutation.data.auditEvent_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ClaimLifecycleIdempotency
You can execute the `ClaimLifecycleIdempotency` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useClaimLifecycleIdempotency(options?: useDataConnectMutationOptions<ClaimLifecycleIdempotencyData, FirebaseError, ClaimLifecycleIdempotencyVariables>): UseDataConnectMutationResult<ClaimLifecycleIdempotencyData, ClaimLifecycleIdempotencyVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useClaimLifecycleIdempotency(dc: DataConnect, options?: useDataConnectMutationOptions<ClaimLifecycleIdempotencyData, FirebaseError, ClaimLifecycleIdempotencyVariables>): UseDataConnectMutationResult<ClaimLifecycleIdempotencyData, ClaimLifecycleIdempotencyVariables>;
```

### Variables
The `ClaimLifecycleIdempotency` Mutation requires an argument of type `ClaimLifecycleIdempotencyVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ClaimLifecycleIdempotencyVariables {
  idempotencyKey: string;
  operationType: string;
  requestFingerprint: string;
}
```
### Return Type
Recall that calling the `ClaimLifecycleIdempotency` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ClaimLifecycleIdempotency` Mutation is of type `ClaimLifecycleIdempotencyData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ClaimLifecycleIdempotencyData {
  lifecycleIdempotency_insert: LifecycleIdempotency_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ClaimLifecycleIdempotency`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ClaimLifecycleIdempotencyVariables } from '@omniretail/sql-connect';
import { useClaimLifecycleIdempotency } from '@omniretail/sql-connect/react'

export default function ClaimLifecycleIdempotencyComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useClaimLifecycleIdempotency();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useClaimLifecycleIdempotency(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useClaimLifecycleIdempotency(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useClaimLifecycleIdempotency(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useClaimLifecycleIdempotency` Mutation requires an argument of type `ClaimLifecycleIdempotencyVariables`:
  const claimLifecycleIdempotencyVars: ClaimLifecycleIdempotencyVariables = {
    idempotencyKey: ..., 
    operationType: ..., 
    requestFingerprint: ..., 
  };
  mutation.mutate(claimLifecycleIdempotencyVars);
  // Variables can be defined inline as well.
  mutation.mutate({ idempotencyKey: ..., operationType: ..., requestFingerprint: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(claimLifecycleIdempotencyVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.lifecycleIdempotency_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CompleteLifecycleIdempotency
You can execute the `CompleteLifecycleIdempotency` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useCompleteLifecycleIdempotency(options?: useDataConnectMutationOptions<CompleteLifecycleIdempotencyData, FirebaseError, CompleteLifecycleIdempotencyVariables>): UseDataConnectMutationResult<CompleteLifecycleIdempotencyData, CompleteLifecycleIdempotencyVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCompleteLifecycleIdempotency(dc: DataConnect, options?: useDataConnectMutationOptions<CompleteLifecycleIdempotencyData, FirebaseError, CompleteLifecycleIdempotencyVariables>): UseDataConnectMutationResult<CompleteLifecycleIdempotencyData, CompleteLifecycleIdempotencyVariables>;
```

### Variables
The `CompleteLifecycleIdempotency` Mutation requires an argument of type `CompleteLifecycleIdempotencyVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CompleteLifecycleIdempotencyVariables {
  idempotencyKey: string;
  status: ProvisioningAttemptStatus;
  resultReference?: string | null;
}
```
### Return Type
Recall that calling the `CompleteLifecycleIdempotency` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CompleteLifecycleIdempotency` Mutation is of type `CompleteLifecycleIdempotencyData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CompleteLifecycleIdempotencyData {
  lifecycleIdempotency_update?: LifecycleIdempotency_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CompleteLifecycleIdempotency`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CompleteLifecycleIdempotencyVariables } from '@omniretail/sql-connect';
import { useCompleteLifecycleIdempotency } from '@omniretail/sql-connect/react'

export default function CompleteLifecycleIdempotencyComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCompleteLifecycleIdempotency();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCompleteLifecycleIdempotency(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCompleteLifecycleIdempotency(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCompleteLifecycleIdempotency(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCompleteLifecycleIdempotency` Mutation requires an argument of type `CompleteLifecycleIdempotencyVariables`:
  const completeLifecycleIdempotencyVars: CompleteLifecycleIdempotencyVariables = {
    idempotencyKey: ..., 
    status: ..., 
    resultReference: ..., // optional
  };
  mutation.mutate(completeLifecycleIdempotencyVars);
  // Variables can be defined inline as well.
  mutation.mutate({ idempotencyKey: ..., status: ..., resultReference: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(completeLifecycleIdempotencyVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.lifecycleIdempotency_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## RecordProvisioningReconciliation
You can execute the `RecordProvisioningReconciliation` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useRecordProvisioningReconciliation(options?: useDataConnectMutationOptions<RecordProvisioningReconciliationData, FirebaseError, RecordProvisioningReconciliationVariables>): UseDataConnectMutationResult<RecordProvisioningReconciliationData, RecordProvisioningReconciliationVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useRecordProvisioningReconciliation(dc: DataConnect, options?: useDataConnectMutationOptions<RecordProvisioningReconciliationData, FirebaseError, RecordProvisioningReconciliationVariables>): UseDataConnectMutationResult<RecordProvisioningReconciliationData, RecordProvisioningReconciliationVariables>;
```

### Variables
The `RecordProvisioningReconciliation` Mutation requires an argument of type `RecordProvisioningReconciliationVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface RecordProvisioningReconciliationVariables {
  idempotencyKey: string;
  firebaseUid: string;
  errorClass: string;
}
```
### Return Type
Recall that calling the `RecordProvisioningReconciliation` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `RecordProvisioningReconciliation` Mutation is of type `RecordProvisioningReconciliationData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface RecordProvisioningReconciliationData {
  provisioningReconciliation_insert: ProvisioningReconciliation_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `RecordProvisioningReconciliation`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, RecordProvisioningReconciliationVariables } from '@omniretail/sql-connect';
import { useRecordProvisioningReconciliation } from '@omniretail/sql-connect/react'

export default function RecordProvisioningReconciliationComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useRecordProvisioningReconciliation();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useRecordProvisioningReconciliation(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useRecordProvisioningReconciliation(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useRecordProvisioningReconciliation(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useRecordProvisioningReconciliation` Mutation requires an argument of type `RecordProvisioningReconciliationVariables`:
  const recordProvisioningReconciliationVars: RecordProvisioningReconciliationVariables = {
    idempotencyKey: ..., 
    firebaseUid: ..., 
    errorClass: ..., 
  };
  mutation.mutate(recordProvisioningReconciliationVars);
  // Variables can be defined inline as well.
  mutation.mutate({ idempotencyKey: ..., firebaseUid: ..., errorClass: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(recordProvisioningReconciliationVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.provisioningReconciliation_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateOrganization
You can execute the `CreateOrganization` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useCreateOrganization(options?: useDataConnectMutationOptions<CreateOrganizationData, FirebaseError, CreateOrganizationVariables>): UseDataConnectMutationResult<CreateOrganizationData, CreateOrganizationVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateOrganization(dc: DataConnect, options?: useDataConnectMutationOptions<CreateOrganizationData, FirebaseError, CreateOrganizationVariables>): UseDataConnectMutationResult<CreateOrganizationData, CreateOrganizationVariables>;
```

### Variables
The `CreateOrganization` Mutation requires an argument of type `CreateOrganizationVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `CreateOrganization` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateOrganization` Mutation is of type `CreateOrganizationData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateOrganizationData {
  organization_insert: Organization_Key;
  auditEvent_insert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateOrganization`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateOrganizationVariables } from '@omniretail/sql-connect';
import { useCreateOrganization } from '@omniretail/sql-connect/react'

export default function CreateOrganizationComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateOrganization();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateOrganization(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateOrganization(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateOrganization(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateOrganization` Mutation requires an argument of type `CreateOrganizationVariables`:
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
  mutation.mutate(createOrganizationVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationCode: ..., businessName: ..., legalEntityName: ..., taxId: ..., primaryContactName: ..., email: ..., phone: ..., address: ..., city: ..., state: ..., postalCode: ..., timezone: ..., currency: ..., auditId: ..., requestId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createOrganizationVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.organization_insert);
    console.log(mutation.data.auditEvent_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateOrganization
You can execute the `UpdateOrganization` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateOrganization(options?: useDataConnectMutationOptions<UpdateOrganizationData, FirebaseError, UpdateOrganizationVariables>): UseDataConnectMutationResult<UpdateOrganizationData, UpdateOrganizationVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateOrganization(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateOrganizationData, FirebaseError, UpdateOrganizationVariables>): UseDataConnectMutationResult<UpdateOrganizationData, UpdateOrganizationVariables>;
```

### Variables
The `UpdateOrganization` Mutation requires an argument of type `UpdateOrganizationVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `UpdateOrganization` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateOrganization` Mutation is of type `UpdateOrganizationData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateOrganizationData {
  organization_update?: Organization_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateOrganization`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateOrganizationVariables } from '@omniretail/sql-connect';
import { useUpdateOrganization } from '@omniretail/sql-connect/react'

export default function UpdateOrganizationComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateOrganization();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateOrganization(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateOrganization(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateOrganization(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateOrganization` Mutation requires an argument of type `UpdateOrganizationVariables`:
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
  mutation.mutate(updateOrganizationVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., businessName: ..., legalEntityName: ..., taxId: ..., primaryContactName: ..., email: ..., phone: ..., address: ..., city: ..., state: ..., postalCode: ..., timezone: ..., currency: ..., auditId: ..., requestId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateOrganizationVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.organization_update);
    console.log(mutation.data.auditEvent_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ChangeOrganizationStatus
You can execute the `ChangeOrganizationStatus` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useChangeOrganizationStatus(options?: useDataConnectMutationOptions<ChangeOrganizationStatusData, FirebaseError, ChangeOrganizationStatusVariables>): UseDataConnectMutationResult<ChangeOrganizationStatusData, ChangeOrganizationStatusVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useChangeOrganizationStatus(dc: DataConnect, options?: useDataConnectMutationOptions<ChangeOrganizationStatusData, FirebaseError, ChangeOrganizationStatusVariables>): UseDataConnectMutationResult<ChangeOrganizationStatusData, ChangeOrganizationStatusVariables>;
```

### Variables
The `ChangeOrganizationStatus` Mutation requires an argument of type `ChangeOrganizationStatusVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ChangeOrganizationStatusVariables {
  id: UUIDString;
  status: OrganizationStatus;
  action: string;
  auditId: UUIDString;
  requestId: string;
}
```
### Return Type
Recall that calling the `ChangeOrganizationStatus` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ChangeOrganizationStatus` Mutation is of type `ChangeOrganizationStatusData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ChangeOrganizationStatusData {
  organization_update?: Organization_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ChangeOrganizationStatus`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ChangeOrganizationStatusVariables } from '@omniretail/sql-connect';
import { useChangeOrganizationStatus } from '@omniretail/sql-connect/react'

export default function ChangeOrganizationStatusComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useChangeOrganizationStatus();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useChangeOrganizationStatus(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useChangeOrganizationStatus(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useChangeOrganizationStatus(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useChangeOrganizationStatus` Mutation requires an argument of type `ChangeOrganizationStatusVariables`:
  const changeOrganizationStatusVars: ChangeOrganizationStatusVariables = {
    id: ..., 
    status: ..., 
    action: ..., 
    auditId: ..., 
    requestId: ..., 
  };
  mutation.mutate(changeOrganizationStatusVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., status: ..., action: ..., auditId: ..., requestId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(changeOrganizationStatusVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.organization_update);
    console.log(mutation.data.auditEvent_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateTenantExpense
You can execute the `CreateTenantExpense` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useCreateTenantExpense(options?: useDataConnectMutationOptions<CreateTenantExpenseData, FirebaseError, CreateTenantExpenseVariables>): UseDataConnectMutationResult<CreateTenantExpenseData, CreateTenantExpenseVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateTenantExpense(dc: DataConnect, options?: useDataConnectMutationOptions<CreateTenantExpenseData, FirebaseError, CreateTenantExpenseVariables>): UseDataConnectMutationResult<CreateTenantExpenseData, CreateTenantExpenseVariables>;
```

### Variables
The `CreateTenantExpense` Mutation requires an argument of type `CreateTenantExpenseVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `CreateTenantExpense` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateTenantExpense` Mutation is of type `CreateTenantExpenseData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateTenantExpenseData {
  expense_insert: Expense_Key;
  auditEvent_insert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateTenantExpense`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateTenantExpenseVariables } from '@omniretail/sql-connect';
import { useCreateTenantExpense } from '@omniretail/sql-connect/react'

export default function CreateTenantExpenseComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateTenantExpense();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateTenantExpense(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateTenantExpense(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateTenantExpense(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateTenantExpense` Mutation requires an argument of type `CreateTenantExpenseVariables`:
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
  mutation.mutate(createTenantExpenseVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., expenseNumber: ..., expenseDate: ..., category: ..., description: ..., reference: ..., vendorName: ..., outletId: ..., scope: ..., baseAmount: ..., taxAmount: ..., amount: ..., paymentMethod: ..., paidByEmployee: ..., submittedBy: ..., notes: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createTenantExpenseVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.expense_insert);
    console.log(mutation.data.auditEvent_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateTenantExpense
You can execute the `UpdateTenantExpense` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateTenantExpense(options?: useDataConnectMutationOptions<UpdateTenantExpenseData, FirebaseError, UpdateTenantExpenseVariables>): UseDataConnectMutationResult<UpdateTenantExpenseData, UpdateTenantExpenseVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateTenantExpense(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateTenantExpenseData, FirebaseError, UpdateTenantExpenseVariables>): UseDataConnectMutationResult<UpdateTenantExpenseData, UpdateTenantExpenseVariables>;
```

### Variables
The `UpdateTenantExpense` Mutation requires an argument of type `UpdateTenantExpenseVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `UpdateTenantExpense` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateTenantExpense` Mutation is of type `UpdateTenantExpenseData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateTenantExpenseData {
  expense_update?: Expense_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateTenantExpense`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateTenantExpenseVariables } from '@omniretail/sql-connect';
import { useUpdateTenantExpense } from '@omniretail/sql-connect/react'

export default function UpdateTenantExpenseComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateTenantExpense();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateTenantExpense(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateTenantExpense(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateTenantExpense(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateTenantExpense` Mutation requires an argument of type `UpdateTenantExpenseVariables`:
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
  mutation.mutate(updateTenantExpenseVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., id: ..., expenseDate: ..., category: ..., description: ..., reference: ..., vendorName: ..., scope: ..., baseAmount: ..., taxAmount: ..., amount: ..., paymentMethod: ..., paidByEmployee: ..., notes: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateTenantExpenseVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.expense_update);
    console.log(mutation.data.auditEvent_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ChangeTenantExpenseApproval
You can execute the `ChangeTenantExpenseApproval` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useChangeTenantExpenseApproval(options?: useDataConnectMutationOptions<ChangeTenantExpenseApprovalData, FirebaseError, ChangeTenantExpenseApprovalVariables>): UseDataConnectMutationResult<ChangeTenantExpenseApprovalData, ChangeTenantExpenseApprovalVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useChangeTenantExpenseApproval(dc: DataConnect, options?: useDataConnectMutationOptions<ChangeTenantExpenseApprovalData, FirebaseError, ChangeTenantExpenseApprovalVariables>): UseDataConnectMutationResult<ChangeTenantExpenseApprovalData, ChangeTenantExpenseApprovalVariables>;
```

### Variables
The `ChangeTenantExpenseApproval` Mutation requires an argument of type `ChangeTenantExpenseApprovalVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `ChangeTenantExpenseApproval` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ChangeTenantExpenseApproval` Mutation is of type `ChangeTenantExpenseApprovalData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ChangeTenantExpenseApprovalData {
  expense_update?: Expense_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ChangeTenantExpenseApproval`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ChangeTenantExpenseApprovalVariables } from '@omniretail/sql-connect';
import { useChangeTenantExpenseApproval } from '@omniretail/sql-connect/react'

export default function ChangeTenantExpenseApprovalComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useChangeTenantExpenseApproval();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useChangeTenantExpenseApproval(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useChangeTenantExpenseApproval(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useChangeTenantExpenseApproval(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useChangeTenantExpenseApproval` Mutation requires an argument of type `ChangeTenantExpenseApprovalVariables`:
  const changeTenantExpenseApprovalVars: ChangeTenantExpenseApprovalVariables = {
    organizationId: ..., 
    id: ..., 
    approvalStatus: ..., 
    reason: ..., // optional
    auditId: ..., 
    requestId: ..., 
    actorFirebaseUid: ..., 
  };
  mutation.mutate(changeTenantExpenseApprovalVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., id: ..., approvalStatus: ..., reason: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(changeTenantExpenseApprovalVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.expense_update);
    console.log(mutation.data.auditEvent_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## VoidTenantExpense
You can execute the `VoidTenantExpense` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useVoidTenantExpense(options?: useDataConnectMutationOptions<VoidTenantExpenseData, FirebaseError, VoidTenantExpenseVariables>): UseDataConnectMutationResult<VoidTenantExpenseData, VoidTenantExpenseVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useVoidTenantExpense(dc: DataConnect, options?: useDataConnectMutationOptions<VoidTenantExpenseData, FirebaseError, VoidTenantExpenseVariables>): UseDataConnectMutationResult<VoidTenantExpenseData, VoidTenantExpenseVariables>;
```

### Variables
The `VoidTenantExpense` Mutation requires an argument of type `VoidTenantExpenseVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `VoidTenantExpense` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `VoidTenantExpense` Mutation is of type `VoidTenantExpenseData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface VoidTenantExpenseData {
  expense_update?: Expense_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `VoidTenantExpense`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, VoidTenantExpenseVariables } from '@omniretail/sql-connect';
import { useVoidTenantExpense } from '@omniretail/sql-connect/react'

export default function VoidTenantExpenseComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useVoidTenantExpense();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useVoidTenantExpense(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useVoidTenantExpense(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useVoidTenantExpense(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useVoidTenantExpense` Mutation requires an argument of type `VoidTenantExpenseVariables`:
  const voidTenantExpenseVars: VoidTenantExpenseVariables = {
    organizationId: ..., 
    id: ..., 
    reason: ..., 
    auditId: ..., 
    requestId: ..., 
    actorFirebaseUid: ..., 
  };
  mutation.mutate(voidTenantExpenseVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., id: ..., reason: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(voidTenantExpenseVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.expense_update);
    console.log(mutation.data.auditEvent_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateTenantSale
You can execute the `CreateTenantSale` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useCreateTenantSale(options?: useDataConnectMutationOptions<CreateTenantSaleData, FirebaseError, CreateTenantSaleVariables>): UseDataConnectMutationResult<CreateTenantSaleData, CreateTenantSaleVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateTenantSale(dc: DataConnect, options?: useDataConnectMutationOptions<CreateTenantSaleData, FirebaseError, CreateTenantSaleVariables>): UseDataConnectMutationResult<CreateTenantSaleData, CreateTenantSaleVariables>;
```

### Variables
The `CreateTenantSale` Mutation requires an argument of type `CreateTenantSaleVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `CreateTenantSale` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateTenantSale` Mutation is of type `CreateTenantSaleData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateTenantSaleData {
  sale_insert: Sale_Key;
  auditEvent_insert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateTenantSale`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateTenantSaleVariables } from '@omniretail/sql-connect';
import { useCreateTenantSale } from '@omniretail/sql-connect/react'

export default function CreateTenantSaleComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateTenantSale();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateTenantSale(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateTenantSale(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateTenantSale(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateTenantSale` Mutation requires an argument of type `CreateTenantSaleVariables`:
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
  mutation.mutate(createTenantSaleVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., outletId: ..., receiptNumber: ..., saleTimestamp: ..., customerId: ..., customerName: ..., staffName: ..., channel: ..., terminalId: ..., tenderType: ..., tax: ..., discount: ..., subtotal: ..., totalNet: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createTenantSaleVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.sale_insert);
    console.log(mutation.data.auditEvent_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AddTenantSaleLine
You can execute the `AddTenantSaleLine` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useAddTenantSaleLine(options?: useDataConnectMutationOptions<AddTenantSaleLineData, FirebaseError, AddTenantSaleLineVariables>): UseDataConnectMutationResult<AddTenantSaleLineData, AddTenantSaleLineVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAddTenantSaleLine(dc: DataConnect, options?: useDataConnectMutationOptions<AddTenantSaleLineData, FirebaseError, AddTenantSaleLineVariables>): UseDataConnectMutationResult<AddTenantSaleLineData, AddTenantSaleLineVariables>;
```

### Variables
The `AddTenantSaleLine` Mutation requires an argument of type `AddTenantSaleLineVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `AddTenantSaleLine` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AddTenantSaleLine` Mutation is of type `AddTenantSaleLineData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AddTenantSaleLineData {
  saleLine_insert: SaleLine_Key;
  inventoryStock_update?: InventoryStock_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AddTenantSaleLine`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AddTenantSaleLineVariables } from '@omniretail/sql-connect';
import { useAddTenantSaleLine } from '@omniretail/sql-connect/react'

export default function AddTenantSaleLineComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAddTenantSaleLine();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAddTenantSaleLine(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAddTenantSaleLine(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAddTenantSaleLine(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAddTenantSaleLine` Mutation requires an argument of type `AddTenantSaleLineVariables`:
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
  mutation.mutate(addTenantSaleLineVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., saleId: ..., outletId: ..., productId: ..., quantity: ..., newStockQty: ..., unitPrice: ..., subtotal: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(addTenantSaleLineVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.saleLine_insert);
    console.log(mutation.data.inventoryStock_update);
    console.log(mutation.data.auditEvent_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## VoidTenantSale
You can execute the `VoidTenantSale` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useVoidTenantSale(options?: useDataConnectMutationOptions<VoidTenantSaleData, FirebaseError, VoidTenantSaleVariables>): UseDataConnectMutationResult<VoidTenantSaleData, VoidTenantSaleVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useVoidTenantSale(dc: DataConnect, options?: useDataConnectMutationOptions<VoidTenantSaleData, FirebaseError, VoidTenantSaleVariables>): UseDataConnectMutationResult<VoidTenantSaleData, VoidTenantSaleVariables>;
```

### Variables
The `VoidTenantSale` Mutation requires an argument of type `VoidTenantSaleVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `VoidTenantSale` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `VoidTenantSale` Mutation is of type `VoidTenantSaleData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface VoidTenantSaleData {
  sale_update?: Sale_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `VoidTenantSale`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, VoidTenantSaleVariables } from '@omniretail/sql-connect';
import { useVoidTenantSale } from '@omniretail/sql-connect/react'

export default function VoidTenantSaleComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useVoidTenantSale();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useVoidTenantSale(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useVoidTenantSale(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useVoidTenantSale(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useVoidTenantSale` Mutation requires an argument of type `VoidTenantSaleVariables`:
  const voidTenantSaleVars: VoidTenantSaleVariables = {
    organizationId: ..., 
    saleId: ..., 
    reason: ..., 
    auditId: ..., 
    requestId: ..., 
    actorFirebaseUid: ..., 
  };
  mutation.mutate(voidTenantSaleVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., saleId: ..., reason: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(voidTenantSaleVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.sale_update);
    console.log(mutation.data.auditEvent_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateTenantPurchase
You can execute the `CreateTenantPurchase` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useCreateTenantPurchase(options?: useDataConnectMutationOptions<CreateTenantPurchaseData, FirebaseError, CreateTenantPurchaseVariables>): UseDataConnectMutationResult<CreateTenantPurchaseData, CreateTenantPurchaseVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateTenantPurchase(dc: DataConnect, options?: useDataConnectMutationOptions<CreateTenantPurchaseData, FirebaseError, CreateTenantPurchaseVariables>): UseDataConnectMutationResult<CreateTenantPurchaseData, CreateTenantPurchaseVariables>;
```

### Variables
The `CreateTenantPurchase` Mutation requires an argument of type `CreateTenantPurchaseVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `CreateTenantPurchase` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateTenantPurchase` Mutation is of type `CreateTenantPurchaseData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateTenantPurchaseData {
  purchase_insert: Purchase_Key;
  auditEvent_insert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateTenantPurchase`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateTenantPurchaseVariables } from '@omniretail/sql-connect';
import { useCreateTenantPurchase } from '@omniretail/sql-connect/react'

export default function CreateTenantPurchaseComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateTenantPurchase();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateTenantPurchase(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateTenantPurchase(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateTenantPurchase(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateTenantPurchase` Mutation requires an argument of type `CreateTenantPurchaseVariables`:
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
  mutation.mutate(createTenantPurchaseVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., purchaseNumber: ..., purchaseDate: ..., supplierId: ..., outletId: ..., scope: ..., paymentTerms: ..., subtotal: ..., shippingFee: ..., handlingFee: ..., tax: ..., totalAmount: ..., amountPaid: ..., outstandingAmount: ..., paymentStatus: ..., receiptStatus: ..., status: ..., createdBy: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createTenantPurchaseVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.purchase_insert);
    console.log(mutation.data.auditEvent_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateTenantPurchaseLine
You can execute the `CreateTenantPurchaseLine` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useCreateTenantPurchaseLine(options?: useDataConnectMutationOptions<CreateTenantPurchaseLineData, FirebaseError, CreateTenantPurchaseLineVariables>): UseDataConnectMutationResult<CreateTenantPurchaseLineData, CreateTenantPurchaseLineVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateTenantPurchaseLine(dc: DataConnect, options?: useDataConnectMutationOptions<CreateTenantPurchaseLineData, FirebaseError, CreateTenantPurchaseLineVariables>): UseDataConnectMutationResult<CreateTenantPurchaseLineData, CreateTenantPurchaseLineVariables>;
```

### Variables
The `CreateTenantPurchaseLine` Mutation requires an argument of type `CreateTenantPurchaseLineVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `CreateTenantPurchaseLine` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateTenantPurchaseLine` Mutation is of type `CreateTenantPurchaseLineData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateTenantPurchaseLineData {
  purchaseLine_insert: PurchaseLine_Key;
  auditEvent_insert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateTenantPurchaseLine`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateTenantPurchaseLineVariables } from '@omniretail/sql-connect';
import { useCreateTenantPurchaseLine } from '@omniretail/sql-connect/react'

export default function CreateTenantPurchaseLineComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateTenantPurchaseLine();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateTenantPurchaseLine(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateTenantPurchaseLine(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateTenantPurchaseLine(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateTenantPurchaseLine` Mutation requires an argument of type `CreateTenantPurchaseLineVariables`:
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
  mutation.mutate(createTenantPurchaseLineVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., purchaseId: ..., productId: ..., quantityOrdered: ..., unitCost: ..., discountPercent: ..., taxRate: ..., taxAmount: ..., lineTotal: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createTenantPurchaseLineVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.purchaseLine_insert);
    console.log(mutation.data.auditEvent_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ChangeTenantPurchaseStatus
You can execute the `ChangeTenantPurchaseStatus` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useChangeTenantPurchaseStatus(options?: useDataConnectMutationOptions<ChangeTenantPurchaseStatusData, FirebaseError, ChangeTenantPurchaseStatusVariables>): UseDataConnectMutationResult<ChangeTenantPurchaseStatusData, ChangeTenantPurchaseStatusVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useChangeTenantPurchaseStatus(dc: DataConnect, options?: useDataConnectMutationOptions<ChangeTenantPurchaseStatusData, FirebaseError, ChangeTenantPurchaseStatusVariables>): UseDataConnectMutationResult<ChangeTenantPurchaseStatusData, ChangeTenantPurchaseStatusVariables>;
```

### Variables
The `ChangeTenantPurchaseStatus` Mutation requires an argument of type `ChangeTenantPurchaseStatusVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `ChangeTenantPurchaseStatus` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ChangeTenantPurchaseStatus` Mutation is of type `ChangeTenantPurchaseStatusData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ChangeTenantPurchaseStatusData {
  purchase_update?: Purchase_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ChangeTenantPurchaseStatus`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ChangeTenantPurchaseStatusVariables } from '@omniretail/sql-connect';
import { useChangeTenantPurchaseStatus } from '@omniretail/sql-connect/react'

export default function ChangeTenantPurchaseStatusComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useChangeTenantPurchaseStatus();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useChangeTenantPurchaseStatus(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useChangeTenantPurchaseStatus(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useChangeTenantPurchaseStatus(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useChangeTenantPurchaseStatus` Mutation requires an argument of type `ChangeTenantPurchaseStatusVariables`:
  const changeTenantPurchaseStatusVars: ChangeTenantPurchaseStatusVariables = {
    organizationId: ..., 
    id: ..., 
    status: ..., 
    reason: ..., // optional
    auditId: ..., 
    requestId: ..., 
    actorFirebaseUid: ..., 
  };
  mutation.mutate(changeTenantPurchaseStatusVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., id: ..., status: ..., reason: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(changeTenantPurchaseStatusVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.purchase_update);
    console.log(mutation.data.auditEvent_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ReceiveTenantPurchaseLine
You can execute the `ReceiveTenantPurchaseLine` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useReceiveTenantPurchaseLine(options?: useDataConnectMutationOptions<ReceiveTenantPurchaseLineData, FirebaseError, ReceiveTenantPurchaseLineVariables>): UseDataConnectMutationResult<ReceiveTenantPurchaseLineData, ReceiveTenantPurchaseLineVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useReceiveTenantPurchaseLine(dc: DataConnect, options?: useDataConnectMutationOptions<ReceiveTenantPurchaseLineData, FirebaseError, ReceiveTenantPurchaseLineVariables>): UseDataConnectMutationResult<ReceiveTenantPurchaseLineData, ReceiveTenantPurchaseLineVariables>;
```

### Variables
The `ReceiveTenantPurchaseLine` Mutation requires an argument of type `ReceiveTenantPurchaseLineVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `ReceiveTenantPurchaseLine` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ReceiveTenantPurchaseLine` Mutation is of type `ReceiveTenantPurchaseLineData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ReceiveTenantPurchaseLineData {
  purchaseLine_update?: PurchaseLine_Key | null;
  purchase_update?: Purchase_Key | null;
  inventoryStock_update?: InventoryStock_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ReceiveTenantPurchaseLine`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ReceiveTenantPurchaseLineVariables } from '@omniretail/sql-connect';
import { useReceiveTenantPurchaseLine } from '@omniretail/sql-connect/react'

export default function ReceiveTenantPurchaseLineComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useReceiveTenantPurchaseLine();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useReceiveTenantPurchaseLine(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useReceiveTenantPurchaseLine(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useReceiveTenantPurchaseLine(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useReceiveTenantPurchaseLine` Mutation requires an argument of type `ReceiveTenantPurchaseLineVariables`:
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
  mutation.mutate(receiveTenantPurchaseLineVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., purchaseId: ..., lineId: ..., outletId: ..., productId: ..., quantityReceived: ..., newStockQty: ..., receiptStatus: ..., batchNumber: ..., mfgDate: ..., expiryDate: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(receiveTenantPurchaseLineVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.purchaseLine_update);
    console.log(mutation.data.purchase_update);
    console.log(mutation.data.inventoryStock_update);
    console.log(mutation.data.auditEvent_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateTenantSupplier
You can execute the `CreateTenantSupplier` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useCreateTenantSupplier(options?: useDataConnectMutationOptions<CreateTenantSupplierData, FirebaseError, CreateTenantSupplierVariables>): UseDataConnectMutationResult<CreateTenantSupplierData, CreateTenantSupplierVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateTenantSupplier(dc: DataConnect, options?: useDataConnectMutationOptions<CreateTenantSupplierData, FirebaseError, CreateTenantSupplierVariables>): UseDataConnectMutationResult<CreateTenantSupplierData, CreateTenantSupplierVariables>;
```

### Variables
The `CreateTenantSupplier` Mutation requires an argument of type `CreateTenantSupplierVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateTenantSupplierVariables {
  organizationId: UUIDString;
  supplierCode: string;
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
Recall that calling the `CreateTenantSupplier` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateTenantSupplier` Mutation is of type `CreateTenantSupplierData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateTenantSupplierData {
  supplier_insert: Supplier_Key;
  auditEvent_insert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateTenantSupplier`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateTenantSupplierVariables } from '@omniretail/sql-connect';
import { useCreateTenantSupplier } from '@omniretail/sql-connect/react'

export default function CreateTenantSupplierComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateTenantSupplier();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateTenantSupplier(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateTenantSupplier(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateTenantSupplier(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateTenantSupplier` Mutation requires an argument of type `CreateTenantSupplierVariables`:
  const createTenantSupplierVars: CreateTenantSupplierVariables = {
    organizationId: ..., 
    supplierCode: ..., 
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
  mutation.mutate(createTenantSupplierVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., supplierCode: ..., name: ..., contactPerson: ..., phone: ..., email: ..., taxId: ..., address: ..., city: ..., state: ..., postalCode: ..., country: ..., category: ..., paymentTerms: ..., creditLimit: ..., notes: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createTenantSupplierVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.supplier_insert);
    console.log(mutation.data.auditEvent_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateTenantSupplier
You can execute the `UpdateTenantSupplier` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateTenantSupplier(options?: useDataConnectMutationOptions<UpdateTenantSupplierData, FirebaseError, UpdateTenantSupplierVariables>): UseDataConnectMutationResult<UpdateTenantSupplierData, UpdateTenantSupplierVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateTenantSupplier(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateTenantSupplierData, FirebaseError, UpdateTenantSupplierVariables>): UseDataConnectMutationResult<UpdateTenantSupplierData, UpdateTenantSupplierVariables>;
```

### Variables
The `UpdateTenantSupplier` Mutation requires an argument of type `UpdateTenantSupplierVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `UpdateTenantSupplier` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateTenantSupplier` Mutation is of type `UpdateTenantSupplierData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateTenantSupplierData {
  supplier_update?: Supplier_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateTenantSupplier`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateTenantSupplierVariables } from '@omniretail/sql-connect';
import { useUpdateTenantSupplier } from '@omniretail/sql-connect/react'

export default function UpdateTenantSupplierComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateTenantSupplier();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateTenantSupplier(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateTenantSupplier(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateTenantSupplier(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateTenantSupplier` Mutation requires an argument of type `UpdateTenantSupplierVariables`:
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
  mutation.mutate(updateTenantSupplierVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., id: ..., name: ..., contactPerson: ..., phone: ..., email: ..., taxId: ..., address: ..., city: ..., state: ..., postalCode: ..., country: ..., category: ..., paymentTerms: ..., creditLimit: ..., notes: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateTenantSupplierVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.supplier_update);
    console.log(mutation.data.auditEvent_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ChangeTenantSupplierStatus
You can execute the `ChangeTenantSupplierStatus` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useChangeTenantSupplierStatus(options?: useDataConnectMutationOptions<ChangeTenantSupplierStatusData, FirebaseError, ChangeTenantSupplierStatusVariables>): UseDataConnectMutationResult<ChangeTenantSupplierStatusData, ChangeTenantSupplierStatusVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useChangeTenantSupplierStatus(dc: DataConnect, options?: useDataConnectMutationOptions<ChangeTenantSupplierStatusData, FirebaseError, ChangeTenantSupplierStatusVariables>): UseDataConnectMutationResult<ChangeTenantSupplierStatusData, ChangeTenantSupplierStatusVariables>;
```

### Variables
The `ChangeTenantSupplierStatus` Mutation requires an argument of type `ChangeTenantSupplierStatusVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `ChangeTenantSupplierStatus` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ChangeTenantSupplierStatus` Mutation is of type `ChangeTenantSupplierStatusData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ChangeTenantSupplierStatusData {
  supplier_update?: Supplier_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ChangeTenantSupplierStatus`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ChangeTenantSupplierStatusVariables } from '@omniretail/sql-connect';
import { useChangeTenantSupplierStatus } from '@omniretail/sql-connect/react'

export default function ChangeTenantSupplierStatusComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useChangeTenantSupplierStatus();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useChangeTenantSupplierStatus(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useChangeTenantSupplierStatus(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useChangeTenantSupplierStatus(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useChangeTenantSupplierStatus` Mutation requires an argument of type `ChangeTenantSupplierStatusVariables`:
  const changeTenantSupplierStatusVars: ChangeTenantSupplierStatusVariables = {
    organizationId: ..., 
    id: ..., 
    status: ..., 
    auditId: ..., 
    requestId: ..., 
    actorFirebaseUid: ..., 
  };
  mutation.mutate(changeTenantSupplierStatusVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., id: ..., status: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(changeTenantSupplierStatusVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.supplier_update);
    console.log(mutation.data.auditEvent_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateTenantCustomer
You can execute the `CreateTenantCustomer` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useCreateTenantCustomer(options?: useDataConnectMutationOptions<CreateTenantCustomerData, FirebaseError, CreateTenantCustomerVariables>): UseDataConnectMutationResult<CreateTenantCustomerData, CreateTenantCustomerVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateTenantCustomer(dc: DataConnect, options?: useDataConnectMutationOptions<CreateTenantCustomerData, FirebaseError, CreateTenantCustomerVariables>): UseDataConnectMutationResult<CreateTenantCustomerData, CreateTenantCustomerVariables>;
```

### Variables
The `CreateTenantCustomer` Mutation requires an argument of type `CreateTenantCustomerVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateTenantCustomerVariables {
  organizationId: UUIDString;
  customerCode: string;
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
Recall that calling the `CreateTenantCustomer` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateTenantCustomer` Mutation is of type `CreateTenantCustomerData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateTenantCustomerData {
  customer_insert: Customer_Key;
  auditEvent_insert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateTenantCustomer`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateTenantCustomerVariables } from '@omniretail/sql-connect';
import { useCreateTenantCustomer } from '@omniretail/sql-connect/react'

export default function CreateTenantCustomerComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateTenantCustomer();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateTenantCustomer(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateTenantCustomer(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateTenantCustomer(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateTenantCustomer` Mutation requires an argument of type `CreateTenantCustomerVariables`:
  const createTenantCustomerVars: CreateTenantCustomerVariables = {
    organizationId: ..., 
    customerCode: ..., 
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
  mutation.mutate(createTenantCustomerVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., customerCode: ..., type: ..., name: ..., phone: ..., email: ..., taxId: ..., address: ..., city: ..., state: ..., postalCode: ..., country: ..., creditLimit: ..., preferredContact: ..., dateOfBirth: ..., gender: ..., notes: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createTenantCustomerVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.customer_insert);
    console.log(mutation.data.auditEvent_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateTenantCustomer
You can execute the `UpdateTenantCustomer` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateTenantCustomer(options?: useDataConnectMutationOptions<UpdateTenantCustomerData, FirebaseError, UpdateTenantCustomerVariables>): UseDataConnectMutationResult<UpdateTenantCustomerData, UpdateTenantCustomerVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateTenantCustomer(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateTenantCustomerData, FirebaseError, UpdateTenantCustomerVariables>): UseDataConnectMutationResult<UpdateTenantCustomerData, UpdateTenantCustomerVariables>;
```

### Variables
The `UpdateTenantCustomer` Mutation requires an argument of type `UpdateTenantCustomerVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `UpdateTenantCustomer` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateTenantCustomer` Mutation is of type `UpdateTenantCustomerData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateTenantCustomerData {
  customer_update?: Customer_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateTenantCustomer`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateTenantCustomerVariables } from '@omniretail/sql-connect';
import { useUpdateTenantCustomer } from '@omniretail/sql-connect/react'

export default function UpdateTenantCustomerComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateTenantCustomer();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateTenantCustomer(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateTenantCustomer(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateTenantCustomer(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateTenantCustomer` Mutation requires an argument of type `UpdateTenantCustomerVariables`:
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
  mutation.mutate(updateTenantCustomerVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., id: ..., type: ..., name: ..., phone: ..., email: ..., taxId: ..., address: ..., city: ..., state: ..., postalCode: ..., country: ..., creditLimit: ..., preferredContact: ..., dateOfBirth: ..., gender: ..., notes: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateTenantCustomerVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.customer_update);
    console.log(mutation.data.auditEvent_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ChangeTenantCustomerStatus
You can execute the `ChangeTenantCustomerStatus` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useChangeTenantCustomerStatus(options?: useDataConnectMutationOptions<ChangeTenantCustomerStatusData, FirebaseError, ChangeTenantCustomerStatusVariables>): UseDataConnectMutationResult<ChangeTenantCustomerStatusData, ChangeTenantCustomerStatusVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useChangeTenantCustomerStatus(dc: DataConnect, options?: useDataConnectMutationOptions<ChangeTenantCustomerStatusData, FirebaseError, ChangeTenantCustomerStatusVariables>): UseDataConnectMutationResult<ChangeTenantCustomerStatusData, ChangeTenantCustomerStatusVariables>;
```

### Variables
The `ChangeTenantCustomerStatus` Mutation requires an argument of type `ChangeTenantCustomerStatusVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `ChangeTenantCustomerStatus` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ChangeTenantCustomerStatus` Mutation is of type `ChangeTenantCustomerStatusData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ChangeTenantCustomerStatusData {
  customer_update?: Customer_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ChangeTenantCustomerStatus`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ChangeTenantCustomerStatusVariables } from '@omniretail/sql-connect';
import { useChangeTenantCustomerStatus } from '@omniretail/sql-connect/react'

export default function ChangeTenantCustomerStatusComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useChangeTenantCustomerStatus();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useChangeTenantCustomerStatus(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useChangeTenantCustomerStatus(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useChangeTenantCustomerStatus(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useChangeTenantCustomerStatus` Mutation requires an argument of type `ChangeTenantCustomerStatusVariables`:
  const changeTenantCustomerStatusVars: ChangeTenantCustomerStatusVariables = {
    organizationId: ..., 
    id: ..., 
    status: ..., 
    auditId: ..., 
    requestId: ..., 
    actorFirebaseUid: ..., 
  };
  mutation.mutate(changeTenantCustomerStatusVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., id: ..., status: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(changeTenantCustomerStatusVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.customer_update);
    console.log(mutation.data.auditEvent_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateTenantProduct
You can execute the `CreateTenantProduct` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useCreateTenantProduct(options?: useDataConnectMutationOptions<CreateTenantProductData, FirebaseError, CreateTenantProductVariables>): UseDataConnectMutationResult<CreateTenantProductData, CreateTenantProductVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateTenantProduct(dc: DataConnect, options?: useDataConnectMutationOptions<CreateTenantProductData, FirebaseError, CreateTenantProductVariables>): UseDataConnectMutationResult<CreateTenantProductData, CreateTenantProductVariables>;
```

### Variables
The `CreateTenantProduct` Mutation requires an argument of type `CreateTenantProductVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateTenantProductVariables {
  organizationId: UUIDString;
  productCode: string;
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
Recall that calling the `CreateTenantProduct` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateTenantProduct` Mutation is of type `CreateTenantProductData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateTenantProductData {
  product_insert: Product_Key;
  auditEvent_insert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateTenantProduct`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateTenantProductVariables } from '@omniretail/sql-connect';
import { useCreateTenantProduct } from '@omniretail/sql-connect/react'

export default function CreateTenantProductComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateTenantProduct();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateTenantProduct(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateTenantProduct(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateTenantProduct(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateTenantProduct` Mutation requires an argument of type `CreateTenantProductVariables`:
  const createTenantProductVars: CreateTenantProductVariables = {
    organizationId: ..., 
    productCode: ..., 
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
  mutation.mutate(createTenantProductVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., productCode: ..., name: ..., brand: ..., categoryId: ..., categoryName: ..., subcategory: ..., type: ..., sku: ..., barcode: ..., hsnCode: ..., unitOfMeasure: ..., sellingPrice: ..., mrp: ..., cost: ..., minSellingPrice: ..., discountAllowed: ..., taxCategory: ..., reorderLevel: ..., reorderQuantity: ..., primarySupplier: ..., supplierProductCode: ..., description: ..., imageUrl: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createTenantProductVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.product_insert);
    console.log(mutation.data.auditEvent_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateTenantProduct
You can execute the `UpdateTenantProduct` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateTenantProduct(options?: useDataConnectMutationOptions<UpdateTenantProductData, FirebaseError, UpdateTenantProductVariables>): UseDataConnectMutationResult<UpdateTenantProductData, UpdateTenantProductVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateTenantProduct(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateTenantProductData, FirebaseError, UpdateTenantProductVariables>): UseDataConnectMutationResult<UpdateTenantProductData, UpdateTenantProductVariables>;
```

### Variables
The `UpdateTenantProduct` Mutation requires an argument of type `UpdateTenantProductVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `UpdateTenantProduct` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateTenantProduct` Mutation is of type `UpdateTenantProductData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateTenantProductData {
  product_update?: Product_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateTenantProduct`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateTenantProductVariables } from '@omniretail/sql-connect';
import { useUpdateTenantProduct } from '@omniretail/sql-connect/react'

export default function UpdateTenantProductComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateTenantProduct();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateTenantProduct(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateTenantProduct(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateTenantProduct(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateTenantProduct` Mutation requires an argument of type `UpdateTenantProductVariables`:
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
  mutation.mutate(updateTenantProductVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., id: ..., name: ..., brand: ..., categoryId: ..., categoryName: ..., subcategory: ..., type: ..., sku: ..., barcode: ..., hsnCode: ..., unitOfMeasure: ..., sellingPrice: ..., mrp: ..., cost: ..., minSellingPrice: ..., discountAllowed: ..., taxCategory: ..., reorderLevel: ..., reorderQuantity: ..., primarySupplier: ..., supplierProductCode: ..., description: ..., imageUrl: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateTenantProductVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.product_update);
    console.log(mutation.data.auditEvent_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ChangeTenantProductStatus
You can execute the `ChangeTenantProductStatus` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useChangeTenantProductStatus(options?: useDataConnectMutationOptions<ChangeTenantProductStatusData, FirebaseError, ChangeTenantProductStatusVariables>): UseDataConnectMutationResult<ChangeTenantProductStatusData, ChangeTenantProductStatusVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useChangeTenantProductStatus(dc: DataConnect, options?: useDataConnectMutationOptions<ChangeTenantProductStatusData, FirebaseError, ChangeTenantProductStatusVariables>): UseDataConnectMutationResult<ChangeTenantProductStatusData, ChangeTenantProductStatusVariables>;
```

### Variables
The `ChangeTenantProductStatus` Mutation requires an argument of type `ChangeTenantProductStatusVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `ChangeTenantProductStatus` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ChangeTenantProductStatus` Mutation is of type `ChangeTenantProductStatusData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ChangeTenantProductStatusData {
  product_update?: Product_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ChangeTenantProductStatus`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ChangeTenantProductStatusVariables } from '@omniretail/sql-connect';
import { useChangeTenantProductStatus } from '@omniretail/sql-connect/react'

export default function ChangeTenantProductStatusComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useChangeTenantProductStatus();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useChangeTenantProductStatus(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useChangeTenantProductStatus(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useChangeTenantProductStatus(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useChangeTenantProductStatus` Mutation requires an argument of type `ChangeTenantProductStatusVariables`:
  const changeTenantProductStatusVars: ChangeTenantProductStatusVariables = {
    organizationId: ..., 
    id: ..., 
    status: ..., 
    auditId: ..., 
    requestId: ..., 
    actorFirebaseUid: ..., 
  };
  mutation.mutate(changeTenantProductStatusVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., id: ..., status: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(changeTenantProductStatusVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.product_update);
    console.log(mutation.data.auditEvent_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdjustTenantInventory
You can execute the `AdjustTenantInventory` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useAdjustTenantInventory(options?: useDataConnectMutationOptions<AdjustTenantInventoryData, FirebaseError, AdjustTenantInventoryVariables>): UseDataConnectMutationResult<AdjustTenantInventoryData, AdjustTenantInventoryVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdjustTenantInventory(dc: DataConnect, options?: useDataConnectMutationOptions<AdjustTenantInventoryData, FirebaseError, AdjustTenantInventoryVariables>): UseDataConnectMutationResult<AdjustTenantInventoryData, AdjustTenantInventoryVariables>;
```

### Variables
The `AdjustTenantInventory` Mutation requires an argument of type `AdjustTenantInventoryVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `AdjustTenantInventory` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdjustTenantInventory` Mutation is of type `AdjustTenantInventoryData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdjustTenantInventoryData {
  inventoryStock_update?: InventoryStock_Key | null;
  inventoryMovement_insert: InventoryMovement_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdjustTenantInventory`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdjustTenantInventoryVariables } from '@omniretail/sql-connect';
import { useAdjustTenantInventory } from '@omniretail/sql-connect/react'

export default function AdjustTenantInventoryComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdjustTenantInventory();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdjustTenantInventory(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdjustTenantInventory(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdjustTenantInventory(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdjustTenantInventory` Mutation requires an argument of type `AdjustTenantInventoryVariables`:
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
  mutation.mutate(adjustTenantInventoryVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., outletId: ..., productId: ..., mode: ..., quantity: ..., previousQty: ..., newQty: ..., reasonCode: ..., auditNote: ..., requestId: ..., actorFirebaseUid: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adjustTenantInventoryVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.inventoryStock_update);
    console.log(mutation.data.inventoryMovement_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateTenantInventoryStock
You can execute the `CreateTenantInventoryStock` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useCreateTenantInventoryStock(options?: useDataConnectMutationOptions<CreateTenantInventoryStockData, FirebaseError, CreateTenantInventoryStockVariables>): UseDataConnectMutationResult<CreateTenantInventoryStockData, CreateTenantInventoryStockVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateTenantInventoryStock(dc: DataConnect, options?: useDataConnectMutationOptions<CreateTenantInventoryStockData, FirebaseError, CreateTenantInventoryStockVariables>): UseDataConnectMutationResult<CreateTenantInventoryStockData, CreateTenantInventoryStockVariables>;
```

### Variables
The `CreateTenantInventoryStock` Mutation requires an argument of type `CreateTenantInventoryStockVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `CreateTenantInventoryStock` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateTenantInventoryStock` Mutation is of type `CreateTenantInventoryStockData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateTenantInventoryStockData {
  inventoryStock_upsert: InventoryStock_Key;
  inventoryMovement_insert: InventoryMovement_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateTenantInventoryStock`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateTenantInventoryStockVariables } from '@omniretail/sql-connect';
import { useCreateTenantInventoryStock } from '@omniretail/sql-connect/react'

export default function CreateTenantInventoryStockComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateTenantInventoryStock();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateTenantInventoryStock(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateTenantInventoryStock(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateTenantInventoryStock(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateTenantInventoryStock` Mutation requires an argument of type `CreateTenantInventoryStockVariables`:
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
  mutation.mutate(createTenantInventoryStockVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., outletId: ..., productId: ..., onHandQty: ..., reorderLevel: ..., overstockThreshold: ..., requestId: ..., actorFirebaseUid: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createTenantInventoryStockVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.inventoryStock_upsert);
    console.log(mutation.data.inventoryMovement_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateTenantOutlet
You can execute the `CreateTenantOutlet` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useCreateTenantOutlet(options?: useDataConnectMutationOptions<CreateTenantOutletData, FirebaseError, CreateTenantOutletVariables>): UseDataConnectMutationResult<CreateTenantOutletData, CreateTenantOutletVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateTenantOutlet(dc: DataConnect, options?: useDataConnectMutationOptions<CreateTenantOutletData, FirebaseError, CreateTenantOutletVariables>): UseDataConnectMutationResult<CreateTenantOutletData, CreateTenantOutletVariables>;
```

### Variables
The `CreateTenantOutlet` Mutation requires an argument of type `CreateTenantOutletVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateTenantOutletVariables {
  organizationId: UUIDString;
  outletCode: string;
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
Recall that calling the `CreateTenantOutlet` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateTenantOutlet` Mutation is of type `CreateTenantOutletData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateTenantOutletData {
  outlet_insert: Outlet_Key;
  auditEvent_insert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateTenantOutlet`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateTenantOutletVariables } from '@omniretail/sql-connect';
import { useCreateTenantOutlet } from '@omniretail/sql-connect/react'

export default function CreateTenantOutletComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateTenantOutlet();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateTenantOutlet(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateTenantOutlet(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateTenantOutlet(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateTenantOutlet` Mutation requires an argument of type `CreateTenantOutletVariables`:
  const createTenantOutletVars: CreateTenantOutletVariables = {
    organizationId: ..., 
    outletCode: ..., 
    name: ..., 
    contactPerson: ..., 
    email: ..., // optional
    phone: ..., 
    address: ..., 
    auditId: ..., 
    requestId: ..., 
  };
  mutation.mutate(createTenantOutletVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., outletCode: ..., name: ..., contactPerson: ..., email: ..., phone: ..., address: ..., auditId: ..., requestId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createTenantOutletVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.outlet_insert);
    console.log(mutation.data.auditEvent_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateTenantOutlet
You can execute the `UpdateTenantOutlet` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateTenantOutlet(options?: useDataConnectMutationOptions<UpdateTenantOutletData, FirebaseError, UpdateTenantOutletVariables>): UseDataConnectMutationResult<UpdateTenantOutletData, UpdateTenantOutletVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateTenantOutlet(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateTenantOutletData, FirebaseError, UpdateTenantOutletVariables>): UseDataConnectMutationResult<UpdateTenantOutletData, UpdateTenantOutletVariables>;
```

### Variables
The `UpdateTenantOutlet` Mutation requires an argument of type `UpdateTenantOutletVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `UpdateTenantOutlet` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateTenantOutlet` Mutation is of type `UpdateTenantOutletData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateTenantOutletData {
  outlet_update?: Outlet_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateTenantOutlet`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateTenantOutletVariables } from '@omniretail/sql-connect';
import { useUpdateTenantOutlet } from '@omniretail/sql-connect/react'

export default function UpdateTenantOutletComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateTenantOutlet();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateTenantOutlet(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateTenantOutlet(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateTenantOutlet(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateTenantOutlet` Mutation requires an argument of type `UpdateTenantOutletVariables`:
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
  mutation.mutate(updateTenantOutletVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., id: ..., name: ..., contactPerson: ..., email: ..., phone: ..., address: ..., auditId: ..., requestId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateTenantOutletVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.outlet_update);
    console.log(mutation.data.auditEvent_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ChangeTenantOutletStatus
You can execute the `ChangeTenantOutletStatus` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useChangeTenantOutletStatus(options?: useDataConnectMutationOptions<ChangeTenantOutletStatusData, FirebaseError, ChangeTenantOutletStatusVariables>): UseDataConnectMutationResult<ChangeTenantOutletStatusData, ChangeTenantOutletStatusVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useChangeTenantOutletStatus(dc: DataConnect, options?: useDataConnectMutationOptions<ChangeTenantOutletStatusData, FirebaseError, ChangeTenantOutletStatusVariables>): UseDataConnectMutationResult<ChangeTenantOutletStatusData, ChangeTenantOutletStatusVariables>;
```

### Variables
The `ChangeTenantOutletStatus` Mutation requires an argument of type `ChangeTenantOutletStatusVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ChangeTenantOutletStatusVariables {
  organizationId: UUIDString;
  id: UUIDString;
  status: OutletStatus;
  auditId: UUIDString;
  requestId: string;
}
```
### Return Type
Recall that calling the `ChangeTenantOutletStatus` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ChangeTenantOutletStatus` Mutation is of type `ChangeTenantOutletStatusData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ChangeTenantOutletStatusData {
  outlet_update?: Outlet_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ChangeTenantOutletStatus`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ChangeTenantOutletStatusVariables } from '@omniretail/sql-connect';
import { useChangeTenantOutletStatus } from '@omniretail/sql-connect/react'

export default function ChangeTenantOutletStatusComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useChangeTenantOutletStatus();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useChangeTenantOutletStatus(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useChangeTenantOutletStatus(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useChangeTenantOutletStatus(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useChangeTenantOutletStatus` Mutation requires an argument of type `ChangeTenantOutletStatusVariables`:
  const changeTenantOutletStatusVars: ChangeTenantOutletStatusVariables = {
    organizationId: ..., 
    id: ..., 
    status: ..., 
    auditId: ..., 
    requestId: ..., 
  };
  mutation.mutate(changeTenantOutletStatusVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., id: ..., status: ..., auditId: ..., requestId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(changeTenantOutletStatusVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.outlet_update);
    console.log(mutation.data.auditEvent_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateTenantOutletTrusted
You can execute the `CreateTenantOutletTrusted` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useCreateTenantOutletTrusted(options?: useDataConnectMutationOptions<CreateTenantOutletTrustedData, FirebaseError, CreateTenantOutletTrustedVariables>): UseDataConnectMutationResult<CreateTenantOutletTrustedData, CreateTenantOutletTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateTenantOutletTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<CreateTenantOutletTrustedData, FirebaseError, CreateTenantOutletTrustedVariables>): UseDataConnectMutationResult<CreateTenantOutletTrustedData, CreateTenantOutletTrustedVariables>;
```

### Variables
The `CreateTenantOutletTrusted` Mutation requires an argument of type `CreateTenantOutletTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateTenantOutletTrustedVariables {
  organizationId: UUIDString;
  outletCode: string;
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
Recall that calling the `CreateTenantOutletTrusted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateTenantOutletTrusted` Mutation is of type `CreateTenantOutletTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateTenantOutletTrustedData {
  outlet_insert: Outlet_Key;
  auditEvent_insert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateTenantOutletTrusted`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateTenantOutletTrustedVariables } from '@omniretail/sql-connect';
import { useCreateTenantOutletTrusted } from '@omniretail/sql-connect/react'

export default function CreateTenantOutletTrustedComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateTenantOutletTrusted();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateTenantOutletTrusted(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateTenantOutletTrusted(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateTenantOutletTrusted(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateTenantOutletTrusted` Mutation requires an argument of type `CreateTenantOutletTrustedVariables`:
  const createTenantOutletTrustedVars: CreateTenantOutletTrustedVariables = {
    organizationId: ..., 
    outletCode: ..., 
    name: ..., 
    contactPerson: ..., 
    email: ..., // optional
    phone: ..., 
    address: ..., 
    auditId: ..., 
    requestId: ..., 
    actorFirebaseUid: ..., 
  };
  mutation.mutate(createTenantOutletTrustedVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., outletCode: ..., name: ..., contactPerson: ..., email: ..., phone: ..., address: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createTenantOutletTrustedVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.outlet_insert);
    console.log(mutation.data.auditEvent_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateTenantOutletTrusted
You can execute the `UpdateTenantOutletTrusted` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateTenantOutletTrusted(options?: useDataConnectMutationOptions<UpdateTenantOutletTrustedData, FirebaseError, UpdateTenantOutletTrustedVariables>): UseDataConnectMutationResult<UpdateTenantOutletTrustedData, UpdateTenantOutletTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateTenantOutletTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateTenantOutletTrustedData, FirebaseError, UpdateTenantOutletTrustedVariables>): UseDataConnectMutationResult<UpdateTenantOutletTrustedData, UpdateTenantOutletTrustedVariables>;
```

### Variables
The `UpdateTenantOutletTrusted` Mutation requires an argument of type `UpdateTenantOutletTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `UpdateTenantOutletTrusted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateTenantOutletTrusted` Mutation is of type `UpdateTenantOutletTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateTenantOutletTrustedData {
  outlet_update?: Outlet_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateTenantOutletTrusted`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateTenantOutletTrustedVariables } from '@omniretail/sql-connect';
import { useUpdateTenantOutletTrusted } from '@omniretail/sql-connect/react'

export default function UpdateTenantOutletTrustedComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateTenantOutletTrusted();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateTenantOutletTrusted(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateTenantOutletTrusted(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateTenantOutletTrusted(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateTenantOutletTrusted` Mutation requires an argument of type `UpdateTenantOutletTrustedVariables`:
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
  mutation.mutate(updateTenantOutletTrustedVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., id: ..., name: ..., contactPerson: ..., email: ..., phone: ..., address: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateTenantOutletTrustedVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.outlet_update);
    console.log(mutation.data.auditEvent_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ChangeTenantOutletStatusTrusted
You can execute the `ChangeTenantOutletStatusTrusted` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useChangeTenantOutletStatusTrusted(options?: useDataConnectMutationOptions<ChangeTenantOutletStatusTrustedData, FirebaseError, ChangeTenantOutletStatusTrustedVariables>): UseDataConnectMutationResult<ChangeTenantOutletStatusTrustedData, ChangeTenantOutletStatusTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useChangeTenantOutletStatusTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<ChangeTenantOutletStatusTrustedData, FirebaseError, ChangeTenantOutletStatusTrustedVariables>): UseDataConnectMutationResult<ChangeTenantOutletStatusTrustedData, ChangeTenantOutletStatusTrustedVariables>;
```

### Variables
The `ChangeTenantOutletStatusTrusted` Mutation requires an argument of type `ChangeTenantOutletStatusTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `ChangeTenantOutletStatusTrusted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ChangeTenantOutletStatusTrusted` Mutation is of type `ChangeTenantOutletStatusTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ChangeTenantOutletStatusTrustedData {
  outlet_update?: Outlet_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ChangeTenantOutletStatusTrusted`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ChangeTenantOutletStatusTrustedVariables } from '@omniretail/sql-connect';
import { useChangeTenantOutletStatusTrusted } from '@omniretail/sql-connect/react'

export default function ChangeTenantOutletStatusTrustedComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useChangeTenantOutletStatusTrusted();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useChangeTenantOutletStatusTrusted(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useChangeTenantOutletStatusTrusted(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useChangeTenantOutletStatusTrusted(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useChangeTenantOutletStatusTrusted` Mutation requires an argument of type `ChangeTenantOutletStatusTrustedVariables`:
  const changeTenantOutletStatusTrustedVars: ChangeTenantOutletStatusTrustedVariables = {
    organizationId: ..., 
    id: ..., 
    status: ..., 
    auditId: ..., 
    requestId: ..., 
    actorFirebaseUid: ..., 
  };
  mutation.mutate(changeTenantOutletStatusTrustedVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., id: ..., status: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(changeTenantOutletStatusTrustedVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.outlet_update);
    console.log(mutation.data.auditEvent_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateTenantEmployeeProfileTrusted
You can execute the `CreateTenantEmployeeProfileTrusted` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useCreateTenantEmployeeProfileTrusted(options?: useDataConnectMutationOptions<CreateTenantEmployeeProfileTrustedData, FirebaseError, CreateTenantEmployeeProfileTrustedVariables>): UseDataConnectMutationResult<CreateTenantEmployeeProfileTrustedData, CreateTenantEmployeeProfileTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateTenantEmployeeProfileTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<CreateTenantEmployeeProfileTrustedData, FirebaseError, CreateTenantEmployeeProfileTrustedVariables>): UseDataConnectMutationResult<CreateTenantEmployeeProfileTrustedData, CreateTenantEmployeeProfileTrustedVariables>;
```

### Variables
The `CreateTenantEmployeeProfileTrusted` Mutation requires an argument of type `CreateTenantEmployeeProfileTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateTenantEmployeeProfileTrustedVariables {
  organizationId: UUIDString;
  employeeCode: string;
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
Recall that calling the `CreateTenantEmployeeProfileTrusted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateTenantEmployeeProfileTrusted` Mutation is of type `CreateTenantEmployeeProfileTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateTenantEmployeeProfileTrustedData {
  employee_insert: Employee_Key;
  auditEvent_insert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateTenantEmployeeProfileTrusted`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateTenantEmployeeProfileTrustedVariables } from '@omniretail/sql-connect';
import { useCreateTenantEmployeeProfileTrusted } from '@omniretail/sql-connect/react'

export default function CreateTenantEmployeeProfileTrustedComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateTenantEmployeeProfileTrusted();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateTenantEmployeeProfileTrusted(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateTenantEmployeeProfileTrusted(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateTenantEmployeeProfileTrusted(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateTenantEmployeeProfileTrusted` Mutation requires an argument of type `CreateTenantEmployeeProfileTrustedVariables`:
  const createTenantEmployeeProfileTrustedVars: CreateTenantEmployeeProfileTrustedVariables = {
    organizationId: ..., 
    employeeCode: ..., 
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
  mutation.mutate(createTenantEmployeeProfileTrustedVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., employeeCode: ..., fullName: ..., email: ..., phone: ..., designation: ..., department: ..., dateOfJoining: ..., assignmentScope: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createTenantEmployeeProfileTrustedVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.employee_insert);
    console.log(mutation.data.auditEvent_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ProvisionTenantEmployeeTrusted
You can execute the `ProvisionTenantEmployeeTrusted` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useProvisionTenantEmployeeTrusted(options?: useDataConnectMutationOptions<ProvisionTenantEmployeeTrustedData, FirebaseError, ProvisionTenantEmployeeTrustedVariables>): UseDataConnectMutationResult<ProvisionTenantEmployeeTrustedData, ProvisionTenantEmployeeTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useProvisionTenantEmployeeTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<ProvisionTenantEmployeeTrustedData, FirebaseError, ProvisionTenantEmployeeTrustedVariables>): UseDataConnectMutationResult<ProvisionTenantEmployeeTrustedData, ProvisionTenantEmployeeTrustedVariables>;
```

### Variables
The `ProvisionTenantEmployeeTrusted` Mutation requires an argument of type `ProvisionTenantEmployeeTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ProvisionTenantEmployeeTrustedVariables {
  userId: UUIDString;
  firebaseUid: string;
  username: string;
  email: string;
  organizationId: UUIDString;
  employeeCode: string;
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
Recall that calling the `ProvisionTenantEmployeeTrusted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ProvisionTenantEmployeeTrusted` Mutation is of type `ProvisionTenantEmployeeTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ProvisionTenantEmployeeTrustedData {
  appUser_insert: AppUser_Key;
  organizationMembership_insert: OrganizationMembership_Key;
  userRole_upsert: UserRole_Key;
  employee_insert: Employee_Key;
  auditEvent_insert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ProvisionTenantEmployeeTrusted`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ProvisionTenantEmployeeTrustedVariables } from '@omniretail/sql-connect';
import { useProvisionTenantEmployeeTrusted } from '@omniretail/sql-connect/react'

export default function ProvisionTenantEmployeeTrustedComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useProvisionTenantEmployeeTrusted();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useProvisionTenantEmployeeTrusted(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useProvisionTenantEmployeeTrusted(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useProvisionTenantEmployeeTrusted(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useProvisionTenantEmployeeTrusted` Mutation requires an argument of type `ProvisionTenantEmployeeTrustedVariables`:
  const provisionTenantEmployeeTrustedVars: ProvisionTenantEmployeeTrustedVariables = {
    userId: ..., 
    firebaseUid: ..., 
    username: ..., 
    email: ..., 
    organizationId: ..., 
    employeeCode: ..., 
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
  mutation.mutate(provisionTenantEmployeeTrustedVars);
  // Variables can be defined inline as well.
  mutation.mutate({ userId: ..., firebaseUid: ..., username: ..., email: ..., organizationId: ..., employeeCode: ..., fullName: ..., phone: ..., designation: ..., department: ..., dateOfJoining: ..., assignmentScope: ..., roleId: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(provisionTenantEmployeeTrustedVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.appUser_insert);
    console.log(mutation.data.organizationMembership_insert);
    console.log(mutation.data.userRole_upsert);
    console.log(mutation.data.employee_insert);
    console.log(mutation.data.auditEvent_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateTenantEmployeeTrusted
You can execute the `UpdateTenantEmployeeTrusted` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateTenantEmployeeTrusted(options?: useDataConnectMutationOptions<UpdateTenantEmployeeTrustedData, FirebaseError, UpdateTenantEmployeeTrustedVariables>): UseDataConnectMutationResult<UpdateTenantEmployeeTrustedData, UpdateTenantEmployeeTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateTenantEmployeeTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateTenantEmployeeTrustedData, FirebaseError, UpdateTenantEmployeeTrustedVariables>): UseDataConnectMutationResult<UpdateTenantEmployeeTrustedData, UpdateTenantEmployeeTrustedVariables>;
```

### Variables
The `UpdateTenantEmployeeTrusted` Mutation requires an argument of type `UpdateTenantEmployeeTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `UpdateTenantEmployeeTrusted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateTenantEmployeeTrusted` Mutation is of type `UpdateTenantEmployeeTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateTenantEmployeeTrustedData {
  employee_update?: Employee_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateTenantEmployeeTrusted`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateTenantEmployeeTrustedVariables } from '@omniretail/sql-connect';
import { useUpdateTenantEmployeeTrusted } from '@omniretail/sql-connect/react'

export default function UpdateTenantEmployeeTrustedComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateTenantEmployeeTrusted();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateTenantEmployeeTrusted(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateTenantEmployeeTrusted(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateTenantEmployeeTrusted(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateTenantEmployeeTrusted` Mutation requires an argument of type `UpdateTenantEmployeeTrustedVariables`:
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
  mutation.mutate(updateTenantEmployeeTrustedVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., id: ..., fullName: ..., email: ..., phone: ..., designation: ..., department: ..., dateOfJoining: ..., assignmentScope: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateTenantEmployeeTrustedVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.employee_update);
    console.log(mutation.data.auditEvent_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ChangeTenantEmployeeStatusTrusted
You can execute the `ChangeTenantEmployeeStatusTrusted` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useChangeTenantEmployeeStatusTrusted(options?: useDataConnectMutationOptions<ChangeTenantEmployeeStatusTrustedData, FirebaseError, ChangeTenantEmployeeStatusTrustedVariables>): UseDataConnectMutationResult<ChangeTenantEmployeeStatusTrustedData, ChangeTenantEmployeeStatusTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useChangeTenantEmployeeStatusTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<ChangeTenantEmployeeStatusTrustedData, FirebaseError, ChangeTenantEmployeeStatusTrustedVariables>): UseDataConnectMutationResult<ChangeTenantEmployeeStatusTrustedData, ChangeTenantEmployeeStatusTrustedVariables>;
```

### Variables
The `ChangeTenantEmployeeStatusTrusted` Mutation requires an argument of type `ChangeTenantEmployeeStatusTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `ChangeTenantEmployeeStatusTrusted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ChangeTenantEmployeeStatusTrusted` Mutation is of type `ChangeTenantEmployeeStatusTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ChangeTenantEmployeeStatusTrustedData {
  employee_update?: Employee_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ChangeTenantEmployeeStatusTrusted`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ChangeTenantEmployeeStatusTrustedVariables } from '@omniretail/sql-connect';
import { useChangeTenantEmployeeStatusTrusted } from '@omniretail/sql-connect/react'

export default function ChangeTenantEmployeeStatusTrustedComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useChangeTenantEmployeeStatusTrusted();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useChangeTenantEmployeeStatusTrusted(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useChangeTenantEmployeeStatusTrusted(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useChangeTenantEmployeeStatusTrusted(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useChangeTenantEmployeeStatusTrusted` Mutation requires an argument of type `ChangeTenantEmployeeStatusTrustedVariables`:
  const changeTenantEmployeeStatusTrustedVars: ChangeTenantEmployeeStatusTrustedVariables = {
    organizationId: ..., 
    id: ..., 
    status: ..., 
    auditId: ..., 
    requestId: ..., 
    actorFirebaseUid: ..., 
  };
  mutation.mutate(changeTenantEmployeeStatusTrustedVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., id: ..., status: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(changeTenantEmployeeStatusTrustedVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.employee_update);
    console.log(mutation.data.auditEvent_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ChangeTenantEmployeeLoginAccessTrusted
You can execute the `ChangeTenantEmployeeLoginAccessTrusted` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useChangeTenantEmployeeLoginAccessTrusted(options?: useDataConnectMutationOptions<ChangeTenantEmployeeLoginAccessTrustedData, FirebaseError, ChangeTenantEmployeeLoginAccessTrustedVariables>): UseDataConnectMutationResult<ChangeTenantEmployeeLoginAccessTrustedData, ChangeTenantEmployeeLoginAccessTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useChangeTenantEmployeeLoginAccessTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<ChangeTenantEmployeeLoginAccessTrustedData, FirebaseError, ChangeTenantEmployeeLoginAccessTrustedVariables>): UseDataConnectMutationResult<ChangeTenantEmployeeLoginAccessTrustedData, ChangeTenantEmployeeLoginAccessTrustedVariables>;
```

### Variables
The `ChangeTenantEmployeeLoginAccessTrusted` Mutation requires an argument of type `ChangeTenantEmployeeLoginAccessTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `ChangeTenantEmployeeLoginAccessTrusted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ChangeTenantEmployeeLoginAccessTrusted` Mutation is of type `ChangeTenantEmployeeLoginAccessTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ChangeTenantEmployeeLoginAccessTrustedData {
  employee_update?: Employee_Key | null;
  appUser_update?: AppUser_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ChangeTenantEmployeeLoginAccessTrusted`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ChangeTenantEmployeeLoginAccessTrustedVariables } from '@omniretail/sql-connect';
import { useChangeTenantEmployeeLoginAccessTrusted } from '@omniretail/sql-connect/react'

export default function ChangeTenantEmployeeLoginAccessTrustedComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useChangeTenantEmployeeLoginAccessTrusted();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useChangeTenantEmployeeLoginAccessTrusted(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useChangeTenantEmployeeLoginAccessTrusted(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useChangeTenantEmployeeLoginAccessTrusted(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useChangeTenantEmployeeLoginAccessTrusted` Mutation requires an argument of type `ChangeTenantEmployeeLoginAccessTrustedVariables`:
  const changeTenantEmployeeLoginAccessTrustedVars: ChangeTenantEmployeeLoginAccessTrustedVariables = {
    organizationId: ..., 
    id: ..., 
    userId: ..., 
    loginAccess: ..., 
    auditId: ..., 
    requestId: ..., 
    actorFirebaseUid: ..., 
  };
  mutation.mutate(changeTenantEmployeeLoginAccessTrustedVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., id: ..., userId: ..., loginAccess: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(changeTenantEmployeeLoginAccessTrustedVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.employee_update);
    console.log(mutation.data.appUser_update);
    console.log(mutation.data.auditEvent_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateTenantServicePersonTrusted
You can execute the `CreateTenantServicePersonTrusted` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useCreateTenantServicePersonTrusted(options?: useDataConnectMutationOptions<CreateTenantServicePersonTrustedData, FirebaseError, CreateTenantServicePersonTrustedVariables>): UseDataConnectMutationResult<CreateTenantServicePersonTrustedData, CreateTenantServicePersonTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateTenantServicePersonTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<CreateTenantServicePersonTrustedData, FirebaseError, CreateTenantServicePersonTrustedVariables>): UseDataConnectMutationResult<CreateTenantServicePersonTrustedData, CreateTenantServicePersonTrustedVariables>;
```

### Variables
The `CreateTenantServicePersonTrusted` Mutation requires an argument of type `CreateTenantServicePersonTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateTenantServicePersonTrustedVariables {
  organizationId: UUIDString;
  servicePersonCode: string;
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
Recall that calling the `CreateTenantServicePersonTrusted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateTenantServicePersonTrusted` Mutation is of type `CreateTenantServicePersonTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateTenantServicePersonTrustedData {
  servicePerson_insert: ServicePerson_Key;
  auditEvent_insert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateTenantServicePersonTrusted`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateTenantServicePersonTrustedVariables } from '@omniretail/sql-connect';
import { useCreateTenantServicePersonTrusted } from '@omniretail/sql-connect/react'

export default function CreateTenantServicePersonTrustedComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateTenantServicePersonTrusted();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateTenantServicePersonTrusted(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateTenantServicePersonTrusted(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateTenantServicePersonTrusted(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateTenantServicePersonTrusted` Mutation requires an argument of type `CreateTenantServicePersonTrustedVariables`:
  const createTenantServicePersonTrustedVars: CreateTenantServicePersonTrustedVariables = {
    organizationId: ..., 
    servicePersonCode: ..., 
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
  mutation.mutate(createTenantServicePersonTrustedVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., servicePersonCode: ..., fullName: ..., email: ..., phone: ..., specialization: ..., skills: ..., yearsOfExperience: ..., assignmentScope: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createTenantServicePersonTrustedVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.servicePerson_insert);
    console.log(mutation.data.auditEvent_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateTenantServicePersonTrusted
You can execute the `UpdateTenantServicePersonTrusted` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateTenantServicePersonTrusted(options?: useDataConnectMutationOptions<UpdateTenantServicePersonTrustedData, FirebaseError, UpdateTenantServicePersonTrustedVariables>): UseDataConnectMutationResult<UpdateTenantServicePersonTrustedData, UpdateTenantServicePersonTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateTenantServicePersonTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateTenantServicePersonTrustedData, FirebaseError, UpdateTenantServicePersonTrustedVariables>): UseDataConnectMutationResult<UpdateTenantServicePersonTrustedData, UpdateTenantServicePersonTrustedVariables>;
```

### Variables
The `UpdateTenantServicePersonTrusted` Mutation requires an argument of type `UpdateTenantServicePersonTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `UpdateTenantServicePersonTrusted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateTenantServicePersonTrusted` Mutation is of type `UpdateTenantServicePersonTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateTenantServicePersonTrustedData {
  servicePerson_update?: ServicePerson_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateTenantServicePersonTrusted`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateTenantServicePersonTrustedVariables } from '@omniretail/sql-connect';
import { useUpdateTenantServicePersonTrusted } from '@omniretail/sql-connect/react'

export default function UpdateTenantServicePersonTrustedComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateTenantServicePersonTrusted();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateTenantServicePersonTrusted(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateTenantServicePersonTrusted(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateTenantServicePersonTrusted(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateTenantServicePersonTrusted` Mutation requires an argument of type `UpdateTenantServicePersonTrustedVariables`:
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
  mutation.mutate(updateTenantServicePersonTrustedVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., id: ..., fullName: ..., email: ..., phone: ..., specialization: ..., skills: ..., yearsOfExperience: ..., assignmentScope: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateTenantServicePersonTrustedVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.servicePerson_update);
    console.log(mutation.data.auditEvent_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ChangeTenantServicePersonStatusTrusted
You can execute the `ChangeTenantServicePersonStatusTrusted` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useChangeTenantServicePersonStatusTrusted(options?: useDataConnectMutationOptions<ChangeTenantServicePersonStatusTrustedData, FirebaseError, ChangeTenantServicePersonStatusTrustedVariables>): UseDataConnectMutationResult<ChangeTenantServicePersonStatusTrustedData, ChangeTenantServicePersonStatusTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useChangeTenantServicePersonStatusTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<ChangeTenantServicePersonStatusTrustedData, FirebaseError, ChangeTenantServicePersonStatusTrustedVariables>): UseDataConnectMutationResult<ChangeTenantServicePersonStatusTrustedData, ChangeTenantServicePersonStatusTrustedVariables>;
```

### Variables
The `ChangeTenantServicePersonStatusTrusted` Mutation requires an argument of type `ChangeTenantServicePersonStatusTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `ChangeTenantServicePersonStatusTrusted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ChangeTenantServicePersonStatusTrusted` Mutation is of type `ChangeTenantServicePersonStatusTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ChangeTenantServicePersonStatusTrustedData {
  servicePerson_update?: ServicePerson_Key | null;
  auditEvent_insert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ChangeTenantServicePersonStatusTrusted`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ChangeTenantServicePersonStatusTrustedVariables } from '@omniretail/sql-connect';
import { useChangeTenantServicePersonStatusTrusted } from '@omniretail/sql-connect/react'

export default function ChangeTenantServicePersonStatusTrustedComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useChangeTenantServicePersonStatusTrusted();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useChangeTenantServicePersonStatusTrusted(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useChangeTenantServicePersonStatusTrusted(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useChangeTenantServicePersonStatusTrusted(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useChangeTenantServicePersonStatusTrusted` Mutation requires an argument of type `ChangeTenantServicePersonStatusTrustedVariables`:
  const changeTenantServicePersonStatusTrustedVars: ChangeTenantServicePersonStatusTrustedVariables = {
    organizationId: ..., 
    id: ..., 
    status: ..., 
    auditId: ..., 
    requestId: ..., 
    actorFirebaseUid: ..., 
  };
  mutation.mutate(changeTenantServicePersonStatusTrustedVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., id: ..., status: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(changeTenantServicePersonStatusTrustedVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.servicePerson_update);
    console.log(mutation.data.auditEvent_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AssignTenantEmployeeOutletTrusted
You can execute the `AssignTenantEmployeeOutletTrusted` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useAssignTenantEmployeeOutletTrusted(options?: useDataConnectMutationOptions<AssignTenantEmployeeOutletTrustedData, FirebaseError, AssignTenantEmployeeOutletTrustedVariables>): UseDataConnectMutationResult<AssignTenantEmployeeOutletTrustedData, AssignTenantEmployeeOutletTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAssignTenantEmployeeOutletTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<AssignTenantEmployeeOutletTrustedData, FirebaseError, AssignTenantEmployeeOutletTrustedVariables>): UseDataConnectMutationResult<AssignTenantEmployeeOutletTrustedData, AssignTenantEmployeeOutletTrustedVariables>;
```

### Variables
The `AssignTenantEmployeeOutletTrusted` Mutation requires an argument of type `AssignTenantEmployeeOutletTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `AssignTenantEmployeeOutletTrusted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AssignTenantEmployeeOutletTrusted` Mutation is of type `AssignTenantEmployeeOutletTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AssignTenantEmployeeOutletTrustedData {
  employeeOutlet_upsert: EmployeeOutlet_Key;
  auditEvent_insert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AssignTenantEmployeeOutletTrusted`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AssignTenantEmployeeOutletTrustedVariables } from '@omniretail/sql-connect';
import { useAssignTenantEmployeeOutletTrusted } from '@omniretail/sql-connect/react'

export default function AssignTenantEmployeeOutletTrustedComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAssignTenantEmployeeOutletTrusted();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAssignTenantEmployeeOutletTrusted(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAssignTenantEmployeeOutletTrusted(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAssignTenantEmployeeOutletTrusted(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAssignTenantEmployeeOutletTrusted` Mutation requires an argument of type `AssignTenantEmployeeOutletTrustedVariables`:
  const assignTenantEmployeeOutletTrustedVars: AssignTenantEmployeeOutletTrustedVariables = {
    organizationId: ..., 
    employeeId: ..., 
    outletId: ..., 
    auditId: ..., 
    requestId: ..., 
    actorFirebaseUid: ..., 
  };
  mutation.mutate(assignTenantEmployeeOutletTrustedVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., employeeId: ..., outletId: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(assignTenantEmployeeOutletTrustedVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.employeeOutlet_upsert);
    console.log(mutation.data.auditEvent_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AssignTenantServicePersonOutletTrusted
You can execute the `AssignTenantServicePersonOutletTrusted` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascript
useAssignTenantServicePersonOutletTrusted(options?: useDataConnectMutationOptions<AssignTenantServicePersonOutletTrustedData, FirebaseError, AssignTenantServicePersonOutletTrustedVariables>): UseDataConnectMutationResult<AssignTenantServicePersonOutletTrustedData, AssignTenantServicePersonOutletTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAssignTenantServicePersonOutletTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<AssignTenantServicePersonOutletTrustedData, FirebaseError, AssignTenantServicePersonOutletTrustedVariables>): UseDataConnectMutationResult<AssignTenantServicePersonOutletTrustedData, AssignTenantServicePersonOutletTrustedVariables>;
```

### Variables
The `AssignTenantServicePersonOutletTrusted` Mutation requires an argument of type `AssignTenantServicePersonOutletTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `AssignTenantServicePersonOutletTrusted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AssignTenantServicePersonOutletTrusted` Mutation is of type `AssignTenantServicePersonOutletTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AssignTenantServicePersonOutletTrustedData {
  servicePersonOutlet_upsert: ServicePersonOutlet_Key;
  auditEvent_insert: AuditEvent_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AssignTenantServicePersonOutletTrusted`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AssignTenantServicePersonOutletTrustedVariables } from '@omniretail/sql-connect';
import { useAssignTenantServicePersonOutletTrusted } from '@omniretail/sql-connect/react'

export default function AssignTenantServicePersonOutletTrustedComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAssignTenantServicePersonOutletTrusted();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAssignTenantServicePersonOutletTrusted(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAssignTenantServicePersonOutletTrusted(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAssignTenantServicePersonOutletTrusted(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAssignTenantServicePersonOutletTrusted` Mutation requires an argument of type `AssignTenantServicePersonOutletTrustedVariables`:
  const assignTenantServicePersonOutletTrustedVars: AssignTenantServicePersonOutletTrustedVariables = {
    organizationId: ..., 
    servicePersonId: ..., 
    outletId: ..., 
    auditId: ..., 
    requestId: ..., 
    actorFirebaseUid: ..., 
  };
  mutation.mutate(assignTenantServicePersonOutletTrustedVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., servicePersonId: ..., outletId: ..., auditId: ..., requestId: ..., actorFirebaseUid: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(assignTenantServicePersonOutletTrustedVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.servicePersonOutlet_upsert);
    console.log(mutation.data.auditEvent_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

