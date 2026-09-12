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
  - [*GetLicensePlan*](#getlicenseplan)
  - [*ListOrganizations*](#listorganizations)
  - [*GetOrganization*](#getorganization)
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
- [**Mutations**](#mutations)
  - [*RecordSuccessfulLogin*](#recordsuccessfullogin)
  - [*UpdateAppUserProfile*](#updateappuserprofile)
  - [*RecordPasswordChange*](#recordpasswordchange)
  - [*BootstrapMasterAdmin*](#bootstrapmasteradmin)
  - [*CreateLicensePlan*](#createlicenseplan)
  - [*UpdateLicensePlan*](#updatelicenseplan)
  - [*ChangeLicensePlanStatus*](#changelicenseplanstatus)
  - [*ProvisionOrganizationAdministrator*](#provisionorganizationadministrator)
  - [*UpdateOrganizationAdministrator*](#updateorganizationadministrator)
  - [*ChangeOrganizationAdministratorStatus*](#changeorganizationadministratorstatus)
  - [*RecordAdministratorSecurityEvent*](#recordadministratorsecurityevent)
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
    console.log(mutation.data.auditEvent_insert);
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

