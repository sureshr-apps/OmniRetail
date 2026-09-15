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
  - [*IsLicensePlanLevelTaken*](#islicenseplanleveltaken)
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
  - [*ListTenantCategories*](#listtenantcategories)
  - [*ListTenantProducts*](#listtenantproducts)
  - [*ListTenantInventory*](#listtenantinventory)
  - [*ListTenantCustomers*](#listtenantcustomers)
  - [*ListTenantCustomerPurchaseHistory*](#listtenantcustomerpurchasehistory)
  - [*ListTenantSuppliers*](#listtenantsuppliers)
  - [*ListTenantPurchases*](#listtenantpurchases)
  - [*ListTenantExpenses*](#listtenantexpenses)
  - [*ListTenantSales*](#listtenantsales)
  - [*GetTenantInventoryStockTrusted*](#gettenantinventorystocktrusted)
  - [*GetTenantSupplierTrusted*](#gettenantsuppliertrusted)
  - [*GetTenantCustomerTrusted*](#gettenantcustomertrusted)
  - [*ListTenantCategoriesTrusted*](#listtenantcategoriestrusted)
  - [*GetTenantProductTrusted*](#gettenantproducttrusted)
  - [*GetTenantMembershipTrusted*](#gettenantmembershiptrusted)
  - [*ResolveTenantEmployeeIdentityTrusted*](#resolvetenantemployeeidentitytrusted)
  - [*GetTenantOutletTrusted*](#gettenantoutlettrusted)
  - [*GetTenantEmployeeTrusted*](#gettenantemployeetrusted)
  - [*GetTenantServicePersonTrusted*](#gettenantservicepersontrusted)
- [**Mutations**](#mutations)
  - [*UpdateAppUserProfile*](#updateappuserprofile)
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
  - [*DeleteOrganizationTrusted*](#deleteorganizationtrusted)
  - [*DeleteAppUserTrusted*](#deleteappusertrusted)
  - [*AssignOrganizationLicenseTrusted*](#assignorganizationlicensetrusted)
  - [*ChangeOrganizationLicensePlanTrusted*](#changeorganizationlicenseplantrusted)
  - [*ModifyOrganizationCommercialTermsTrusted*](#modifyorganizationcommercialtermstrusted)
  - [*RenewOrganizationLicenseTrusted*](#reneworganizationlicensetrusted)
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
  - [*CreateTenantCategoryTrusted*](#createtenantcategorytrusted)
  - [*CreateTenantSubcategoryTrusted*](#createtenantsubcategorytrusted)
  - [*UpdateTenantCategoryTrusted*](#updatetenantcategorytrusted)
  - [*UpdateTenantSubcategoryTrusted*](#updatetenantsubcategorytrusted)
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
  - [*DeleteTenantServicePersonOutletTrusted*](#deletetenantservicepersonoutlettrusted)
  - [*DeleteTenantCustomerTrusted*](#deletetenantcustomertrusted)
  - [*DeleteTenantSupplierTrusted*](#deletetenantsuppliertrusted)
  - [*DeleteTenantProductTrusted*](#deletetenantproducttrusted)
  - [*DeleteTenantCategoryTrusted*](#deletetenantcategorytrusted)
  - [*DeleteTenantSubcategoryTrusted*](#deletetenantsubcategorytrusted)
  - [*CreateTenantEmployeeProfileTrusted*](#createtenantemployeeprofiletrusted)
  - [*ProvisionTenantEmployeeTrusted*](#provisiontenantemployeetrusted)
  - [*ProvisionTenantEmployeeLoginTrusted*](#provisiontenantemployeelogintrusted)
  - [*UpdateTenantEmployeeLoginTrusted*](#updatetenantemployeelogintrusted)
  - [*UpdateTenantEmployeeTrusted*](#updatetenantemployeetrusted)
  - [*ChangeTenantEmployeeStatusTrusted*](#changetenantemployeestatustrusted)
  - [*ChangeTenantEmployeeStatusWithLoginTrusted*](#changetenantemployeestatuswithlogintrusted)
  - [*ChangeTenantEmployeeLoginAccessTrusted*](#changetenantemployeeloginaccesstrusted)
  - [*CreateTenantServicePersonTrusted*](#createtenantservicepersontrusted)
  - [*UpdateTenantServicePersonTrusted*](#updatetenantservicepersontrusted)
  - [*ChangeTenantServicePersonStatusTrusted*](#changetenantservicepersonstatustrusted)
  - [*AssignTenantEmployeeOutletTrusted*](#assigntenantemployeeoutlettrusted)
  - [*DeleteTenantEmployeeOutletTrusted*](#deletetenantemployeeoutlettrusted)
  - [*AssignTenantServicePersonOutletTrusted*](#assigntenantservicepersonoutlettrusted)

# TanStack Query Firebase & TanStack React Query
This SDK provides [React](https://react.dev/) hooks generated specific to your application, for the operations found in the connector `master-admin`. These hooks are generated using [TanStack Query Firebase](https://react-query-firebase.invertase.dev/) by our partners at Invertase, a library built on top of [TanStack React Query v5](https://tanstack.com/query/v5/docs/framework/react/overview).

***You do not need to be familiar with Tanstack Query or Tanstack Query Firebase to use this SDK.*** However, you may find it useful to learn more about them, as they will empower you as a user of this Generated React SDK.

## Installing TanStack Query Firebase and TanStack React Query Packages
In order to use the React generated SDK, you must install the `TanStack React Query` and `TanStack Query Firebase` packages.
```bash
npm i --save @tanstack/react-query @tanstack-query-firebase/reac
```
```bash
npm i --save firebase@latest # Note: React has a peer dependency on ^11.3.0
```

You can also follow the installation instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#tanstack-install), or the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react) and [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/installation).

## Configuring TanStack Query
In order to use the React generated SDK in your application, you must wrap your application's component tree in a `QueryClientProvider` component from TanStack React Query. None of your generated React SDK hooks will work without this provider.

```javascrip
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

```javascrip
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@omniretail/sql-connect';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#emulator-react-angular).

```javascrip
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

```javascrip
useGetCurrentUserAuthorization(dc: DataConnect, options?: useDataConnectQueryOptions<GetCurrentUserAuthorizationData>): UseDataConnectQueryResult<GetCurrentUserAuthorizationData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascrip
useGetCurrentUserAuthorization(options?: useDataConnectQueryOptions<GetCurrentUserAuthorizationData>): UseDataConnectQueryResult<GetCurrentUserAuthorizationData, undefined>;
```

### Variables
The `GetCurrentUserAuthorization` Query has no variables.
### Return Type
Recall that calling the `GetCurrentUserAuthorization` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetCurrentUserAuthorization` Query is of type `GetCurrentUserAuthorizationData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface GetCurrentUserAuthorizationData {
  appUsers: ({
    id: UUIDString;
    firebaseUid: string;
    username: string;
    email: string;
    displayName: string;
    phone?: string | null;
    status: AppUserStatus;
    employees_on_user: ({
      employmentStatus: EmploymentStatus;
      loginAccess: LoginAccessStatus;
      employeeOutlets_on_employee: ({
        outlet: {
          id: UUIDString;
          status: OutletStatus;
        } & Outlet_Key;
      })[];
    })[];
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

```javascrip
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

```javascrip
useGetUserAuthorizationByFirebaseUid(dc: DataConnect, vars: GetUserAuthorizationByFirebaseUidVariables, options?: useDataConnectQueryOptions<GetUserAuthorizationByFirebaseUidData>): UseDataConnectQueryResult<GetUserAuthorizationByFirebaseUidData, GetUserAuthorizationByFirebaseUidVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascrip
useGetUserAuthorizationByFirebaseUid(vars: GetUserAuthorizationByFirebaseUidVariables, options?: useDataConnectQueryOptions<GetUserAuthorizationByFirebaseUidData>): UseDataConnectQueryResult<GetUserAuthorizationByFirebaseUidData, GetUserAuthorizationByFirebaseUidVariables>;
```

### Variables
The `GetUserAuthorizationByFirebaseUid` Query requires an argument of type `GetUserAuthorizationByFirebaseUidVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface GetUserAuthorizationByFirebaseUidVariables {
  firebaseUid: string;
}
```
### Return Type
Recall that calling the `GetUserAuthorizationByFirebaseUid` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetUserAuthorizationByFirebaseUid` Query is of type `GetUserAuthorizationByFirebaseUidData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface GetUserAuthorizationByFirebaseUidData {
  appUsers: ({
    id: UUIDString;
    firebaseUid: string;
    username: string;
    email: string;
    displayName: string;
    phone?: string | null;
    status: AppUserStatus;
    employees_on_user: ({
      employmentStatus: EmploymentStatus;
      loginAccess: LoginAccessStatus;
    })[];
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

```javascrip
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

```javascrip
useResolveUsernameLogin(dc: DataConnect, vars: ResolveUsernameLoginVariables, options?: useDataConnectQueryOptions<ResolveUsernameLoginData>): UseDataConnectQueryResult<ResolveUsernameLoginData, ResolveUsernameLoginVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascrip
useResolveUsernameLogin(vars: ResolveUsernameLoginVariables, options?: useDataConnectQueryOptions<ResolveUsernameLoginData>): UseDataConnectQueryResult<ResolveUsernameLoginData, ResolveUsernameLoginVariables>;
```

### Variables
The `ResolveUsernameLogin` Query requires an argument of type `ResolveUsernameLoginVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface ResolveUsernameLoginVariables {
  username: string;
}
```
### Return Type
Recall that calling the `ResolveUsernameLogin` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ResolveUsernameLogin` Query is of type `ResolveUsernameLoginData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface ResolveUsernameLoginData {
  appUsers: ({
    id: UUIDString;
    firebaseUid: string;
    email: string;
    status: AppUserStatus;
    employees_on_user: ({
      employmentStatus: EmploymentStatus;
      loginAccess: LoginAccessStatus;
    })[];
  } & AppUser_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ResolveUsernameLogin`'s Query hook function

```javascrip
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

```javascrip
useGetAppUserForBootstrap(dc: DataConnect, vars: GetAppUserForBootstrapVariables, options?: useDataConnectQueryOptions<GetAppUserForBootstrapData>): UseDataConnectQueryResult<GetAppUserForBootstrapData, GetAppUserForBootstrapVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascrip
useGetAppUserForBootstrap(vars: GetAppUserForBootstrapVariables, options?: useDataConnectQueryOptions<GetAppUserForBootstrapData>): UseDataConnectQueryResult<GetAppUserForBootstrapData, GetAppUserForBootstrapVariables>;
```

### Variables
The `GetAppUserForBootstrap` Query requires an argument of type `GetAppUserForBootstrapVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface GetAppUserForBootstrapVariables {
  firebaseUid: string;
}
```
### Return Type
Recall that calling the `GetAppUserForBootstrap` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetAppUserForBootstrap` Query is of type `GetAppUserForBootstrapData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
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

```javascrip
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

```javascrip
useGetCurrentAppUser(dc: DataConnect, options?: useDataConnectQueryOptions<GetCurrentAppUserData>): UseDataConnectQueryResult<GetCurrentAppUserData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascrip
useGetCurrentAppUser(options?: useDataConnectQueryOptions<GetCurrentAppUserData>): UseDataConnectQueryResult<GetCurrentAppUserData, undefined>;
```

### Variables
The `GetCurrentAppUser` Query has no variables.
### Return Type
Recall that calling the `GetCurrentAppUser` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetCurrentAppUser` Query is of type `GetCurrentAppUserData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface GetCurrentAppUserData {
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

### Using `GetCurrentAppUser`'s Query hook function

```javascrip
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

```javascrip
useGetAppUserByFirebaseUid(dc: DataConnect, vars: GetAppUserByFirebaseUidVariables, options?: useDataConnectQueryOptions<GetAppUserByFirebaseUidData>): UseDataConnectQueryResult<GetAppUserByFirebaseUidData, GetAppUserByFirebaseUidVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascrip
useGetAppUserByFirebaseUid(vars: GetAppUserByFirebaseUidVariables, options?: useDataConnectQueryOptions<GetAppUserByFirebaseUidData>): UseDataConnectQueryResult<GetAppUserByFirebaseUidData, GetAppUserByFirebaseUidVariables>;
```

### Variables
The `GetAppUserByFirebaseUid` Query requires an argument of type `GetAppUserByFirebaseUidVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface GetAppUserByFirebaseUidVariables {
  firebaseUid: string;
}
```
### Return Type
Recall that calling the `GetAppUserByFirebaseUid` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetAppUserByFirebaseUid` Query is of type `GetAppUserByFirebaseUidData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
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

```javascrip
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

```javascrip
useListLicensePlans(dc: DataConnect, options?: useDataConnectQueryOptions<ListLicensePlansData>): UseDataConnectQueryResult<ListLicensePlansData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascrip
useListLicensePlans(options?: useDataConnectQueryOptions<ListLicensePlansData>): UseDataConnectQueryResult<ListLicensePlansData, undefined>;
```

### Variables
The `ListLicensePlans` Query has no variables.
### Return Type
Recall that calling the `ListLicensePlans` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListLicensePlans` Query is of type `ListLicensePlansData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
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

```javascrip
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

```javascrip
useListOrganizationLicensePlanAssignments(dc: DataConnect, options?: useDataConnectQueryOptions<ListOrganizationLicensePlanAssignmentsData>): UseDataConnectQueryResult<ListOrganizationLicensePlanAssignmentsData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascrip
useListOrganizationLicensePlanAssignments(options?: useDataConnectQueryOptions<ListOrganizationLicensePlanAssignmentsData>): UseDataConnectQueryResult<ListOrganizationLicensePlanAssignmentsData, undefined>;
```

### Variables
The `ListOrganizationLicensePlanAssignments` Query has no variables.
### Return Type
Recall that calling the `ListOrganizationLicensePlanAssignments` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListOrganizationLicensePlanAssignments` Query is of type `ListOrganizationLicensePlanAssignmentsData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
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

```javascrip
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

## IsLicensePlanLevelTaken
You can execute the `IsLicensePlanLevelTaken` Query using the following Query hook function, which is defined in [sql-connect/react/index.d.ts](./index.d.ts):

```javascrip
useIsLicensePlanLevelTaken(dc: DataConnect, vars: IsLicensePlanLevelTakenVariables, options?: useDataConnectQueryOptions<IsLicensePlanLevelTakenData>): UseDataConnectQueryResult<IsLicensePlanLevelTakenData, IsLicensePlanLevelTakenVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascrip
useIsLicensePlanLevelTaken(vars: IsLicensePlanLevelTakenVariables, options?: useDataConnectQueryOptions<IsLicensePlanLevelTakenData>): UseDataConnectQueryResult<IsLicensePlanLevelTakenData, IsLicensePlanLevelTakenVariables>;
```

### Variables
The `IsLicensePlanLevelTaken` Query requires an argument of type `IsLicensePlanLevelTakenVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface IsLicensePlanLevelTakenVariables {
  level: number;
}
```
### Return Type
Recall that calling the `IsLicensePlanLevelTaken` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `IsLicensePlanLevelTaken` Query is of type `IsLicensePlanLevelTakenData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface IsLicensePlanLevelTakenData {
  licensePlans: ({
    id: UUIDString;
  } & LicensePlan_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `IsLicensePlanLevelTaken`'s Query hook function

```javascrip
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, IsLicensePlanLevelTakenVariables } from '@omniretail/sql-connect';
import { useIsLicensePlanLevelTaken } from '@omniretail/sql-connect/react'

export default function IsLicensePlanLevelTakenComponent() {
  // The `useIsLicensePlanLevelTaken` Query hook requires an argument of type `IsLicensePlanLevelTakenVariables`:
  const isLicensePlanLevelTakenVars: IsLicensePlanLevelTakenVariables = {
    level: ...,
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useIsLicensePlanLevelTaken(isLicensePlanLevelTakenVars);
  // Variables can be defined inline as well.
  const query = useIsLicensePlanLevelTaken({ level: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useIsLicensePlanLevelTaken(dataConnect, isLicensePlanLevelTakenVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useIsLicensePlanLevelTaken(isLicensePlanLevelTakenVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useIsLicensePlanLevelTaken(dataConnect, isLicensePlanLevelTakenVars, options);

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

```javascrip
useGetLicensePlan(dc: DataConnect, vars: GetLicensePlanVariables, options?: useDataConnectQueryOptions<GetLicensePlanData>): UseDataConnectQueryResult<GetLicensePlanData, GetLicensePlanVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascrip
useGetLicensePlan(vars: GetLicensePlanVariables, options?: useDataConnectQueryOptions<GetLicensePlanData>): UseDataConnectQueryResult<GetLicensePlanData, GetLicensePlanVariables>;
```

### Variables
The `GetLicensePlan` Query requires an argument of type `GetLicensePlanVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface GetLicensePlanVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `GetLicensePlan` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetLicensePlan` Query is of type `GetLicensePlanData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
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

```javascrip
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

```javascrip
useGetLicensePlanTrusted(dc: DataConnect, vars: GetLicensePlanTrustedVariables, options?: useDataConnectQueryOptions<GetLicensePlanTrustedData>): UseDataConnectQueryResult<GetLicensePlanTrustedData, GetLicensePlanTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascrip
useGetLicensePlanTrusted(vars: GetLicensePlanTrustedVariables, options?: useDataConnectQueryOptions<GetLicensePlanTrustedData>): UseDataConnectQueryResult<GetLicensePlanTrustedData, GetLicensePlanTrustedVariables>;
```

### Variables
The `GetLicensePlanTrusted` Query requires an argument of type `GetLicensePlanTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface GetLicensePlanTrustedVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `GetLicensePlanTrusted` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetLicensePlanTrusted` Query is of type `GetLicensePlanTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
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

```javascrip
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

```javascrip
useGetLicensePlanReferencesTrusted(dc: DataConnect, vars: GetLicensePlanReferencesTrustedVariables, options?: useDataConnectQueryOptions<GetLicensePlanReferencesTrustedData>): UseDataConnectQueryResult<GetLicensePlanReferencesTrustedData, GetLicensePlanReferencesTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascrip
useGetLicensePlanReferencesTrusted(vars: GetLicensePlanReferencesTrustedVariables, options?: useDataConnectQueryOptions<GetLicensePlanReferencesTrustedData>): UseDataConnectQueryResult<GetLicensePlanReferencesTrustedData, GetLicensePlanReferencesTrustedVariables>;
```

### Variables
The `GetLicensePlanReferencesTrusted` Query requires an argument of type `GetLicensePlanReferencesTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface GetLicensePlanReferencesTrustedVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `GetLicensePlanReferencesTrusted` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetLicensePlanReferencesTrusted` Query is of type `GetLicensePlanReferencesTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
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

```javascrip
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

```javascrip
useListOrganizations(dc: DataConnect, options?: useDataConnectQueryOptions<ListOrganizationsData>): UseDataConnectQueryResult<ListOrganizationsData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascrip
useListOrganizations(options?: useDataConnectQueryOptions<ListOrganizationsData>): UseDataConnectQueryResult<ListOrganizationsData, undefined>;
```

### Variables
The `ListOrganizations` Query has no variables.
### Return Type
Recall that calling the `ListOrganizations` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListOrganizations` Query is of type `ListOrganizationsData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
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

```javascrip
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

```javascrip
useGetOrganization(dc: DataConnect, vars: GetOrganizationVariables, options?: useDataConnectQueryOptions<GetOrganizationData>): UseDataConnectQueryResult<GetOrganizationData, GetOrganizationVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascrip
useGetOrganization(vars: GetOrganizationVariables, options?: useDataConnectQueryOptions<GetOrganizationData>): UseDataConnectQueryResult<GetOrganizationData, GetOrganizationVariables>;
```

### Variables
The `GetOrganization` Query requires an argument of type `GetOrganizationVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface GetOrganizationVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `GetOrganization` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetOrganization` Query is of type `GetOrganizationData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
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

```javascrip
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

```javascrip
useGetOrganizationTrusted(dc: DataConnect, vars: GetOrganizationTrustedVariables, options?: useDataConnectQueryOptions<GetOrganizationTrustedData>): UseDataConnectQueryResult<GetOrganizationTrustedData, GetOrganizationTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascrip
useGetOrganizationTrusted(vars: GetOrganizationTrustedVariables, options?: useDataConnectQueryOptions<GetOrganizationTrustedData>): UseDataConnectQueryResult<GetOrganizationTrustedData, GetOrganizationTrustedVariables>;
```

### Variables
The `GetOrganizationTrusted` Query requires an argument of type `GetOrganizationTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface GetOrganizationTrustedVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `GetOrganizationTrusted` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetOrganizationTrusted` Query is of type `GetOrganizationTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
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

```javascrip
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

```javascrip
useListOrganizationAdministrators(dc: DataConnect, vars: ListOrganizationAdministratorsVariables, options?: useDataConnectQueryOptions<ListOrganizationAdministratorsData>): UseDataConnectQueryResult<ListOrganizationAdministratorsData, ListOrganizationAdministratorsVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascrip
useListOrganizationAdministrators(vars: ListOrganizationAdministratorsVariables, options?: useDataConnectQueryOptions<ListOrganizationAdministratorsData>): UseDataConnectQueryResult<ListOrganizationAdministratorsData, ListOrganizationAdministratorsVariables>;
```

### Variables
The `ListOrganizationAdministrators` Query requires an argument of type `ListOrganizationAdministratorsVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface ListOrganizationAdministratorsVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that calling the `ListOrganizationAdministrators` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListOrganizationAdministrators` Query is of type `ListOrganizationAdministratorsData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
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
    } & AppUser_Key;
  })[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListOrganizationAdministrators`'s Query hook function

```javascrip
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

```javascrip
useGetOrganizationAdministrator(dc: DataConnect, vars: GetOrganizationAdministratorVariables, options?: useDataConnectQueryOptions<GetOrganizationAdministratorData>): UseDataConnectQueryResult<GetOrganizationAdministratorData, GetOrganizationAdministratorVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascrip
useGetOrganizationAdministrator(vars: GetOrganizationAdministratorVariables, options?: useDataConnectQueryOptions<GetOrganizationAdministratorData>): UseDataConnectQueryResult<GetOrganizationAdministratorData, GetOrganizationAdministratorVariables>;
```

### Variables
The `GetOrganizationAdministrator` Query requires an argument of type `GetOrganizationAdministratorVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface GetOrganizationAdministratorVariables {
  organizationId: UUIDString;
  userId: UUIDString;
}
```
### Return Type
Recall that calling the `GetOrganizationAdministrator` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetOrganizationAdministrator` Query is of type `GetOrganizationAdministratorData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
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
    } & AppUser_Key;
  })[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetOrganizationAdministrator`'s Query hook function

```javascrip
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

## GetOrganizationAdministratorTrusted
You can execute the `GetOrganizationAdministratorTrusted` Query using the following Query hook function, which is defined in [sql-connect/react/index.d.ts](./index.d.ts):

```javascrip
useGetOrganizationAdministratorTrusted(dc: DataConnect, vars: GetOrganizationAdministratorTrustedVariables, options?: useDataConnectQueryOptions<GetOrganizationAdministratorTrustedData>): UseDataConnectQueryResult<GetOrganizationAdministratorTrustedData, GetOrganizationAdministratorTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascrip
useGetOrganizationAdministratorTrusted(vars: GetOrganizationAdministratorTrustedVariables, options?: useDataConnectQueryOptions<GetOrganizationAdministratorTrustedData>): UseDataConnectQueryResult<GetOrganizationAdministratorTrustedData, GetOrganizationAdministratorTrustedVariables>;
```

### Variables
The `GetOrganizationAdministratorTrusted` Query requires an argument of type `GetOrganizationAdministratorTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface GetOrganizationAdministratorTrustedVariables {
  organizationId: UUIDString;
  userId: UUIDString;
}
```
### Return Type
Recall that calling the `GetOrganizationAdministratorTrusted` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetOrganizationAdministratorTrusted` Query is of type `GetOrganizationAdministratorTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
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
    } & AppUser_Key;
  })[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetOrganizationAdministratorTrusted`'s Query hook function

```javascrip
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetOrganizationAdministratorTrustedVariables } from '@omniretail/sql-connect';
import { useGetOrganizationAdministratorTrusted } from '@omniretail/sql-connect/react'

export default function GetOrganizationAdministratorTrustedComponent() {
  // The `useGetOrganizationAdministratorTrusted` Query hook requires an argument of type `GetOrganizationAdministratorTrustedVariables`:
  const getOrganizationAdministratorTrustedVars: GetOrganizationAdministratorTrustedVariables = {
    organizationId: ...,
    userId: ...,
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetOrganizationAdministratorTrusted(getOrganizationAdministratorTrustedVars);
  // Variables can be defined inline as well.
  const query = useGetOrganizationAdministratorTrusted({ organizationId: ..., userId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetOrganizationAdministratorTrusted(dataConnect, getOrganizationAdministratorTrustedVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetOrganizationAdministratorTrusted(getOrganizationAdministratorTrustedVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetOrganizationAdministratorTrusted(dataConnect, getOrganizationAdministratorTrustedVars, options);

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

```javascrip
useResolveOrganizationAdministratorIdentity(dc: DataConnect, vars: ResolveOrganizationAdministratorIdentityVariables, options?: useDataConnectQueryOptions<ResolveOrganizationAdministratorIdentityData>): UseDataConnectQueryResult<ResolveOrganizationAdministratorIdentityData, ResolveOrganizationAdministratorIdentityVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascrip
useResolveOrganizationAdministratorIdentity(vars: ResolveOrganizationAdministratorIdentityVariables, options?: useDataConnectQueryOptions<ResolveOrganizationAdministratorIdentityData>): UseDataConnectQueryResult<ResolveOrganizationAdministratorIdentityData, ResolveOrganizationAdministratorIdentityVariables>;
```

### Variables
The `ResolveOrganizationAdministratorIdentity` Query requires an argument of type `ResolveOrganizationAdministratorIdentityVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface ResolveOrganizationAdministratorIdentityVariables {
  organizationId: UUIDString;
  appUserId: UUIDString;
}
```
### Return Type
Recall that calling the `ResolveOrganizationAdministratorIdentity` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ResolveOrganizationAdministratorIdentity` Query is of type `ResolveOrganizationAdministratorIdentityData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
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

```javascrip
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

## GetOrganizationLicense
You can execute the `GetOrganizationLicense` Query using the following Query hook function, which is defined in [sql-connect/react/index.d.ts](./index.d.ts):

```javascrip
useGetOrganizationLicense(dc: DataConnect, vars: GetOrganizationLicenseVariables, options?: useDataConnectQueryOptions<GetOrganizationLicenseData>): UseDataConnectQueryResult<GetOrganizationLicenseData, GetOrganizationLicenseVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascrip
useGetOrganizationLicense(vars: GetOrganizationLicenseVariables, options?: useDataConnectQueryOptions<GetOrganizationLicenseData>): UseDataConnectQueryResult<GetOrganizationLicenseData, GetOrganizationLicenseVariables>;
```

### Variables
The `GetOrganizationLicense` Query requires an argument of type `GetOrganizationLicenseVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface GetOrganizationLicenseVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that calling the `GetOrganizationLicense` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetOrganizationLicense` Query is of type `GetOrganizationLicenseData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
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

```javascrip
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

```javascrip
useGetOrganizationLicenseTrusted(dc: DataConnect, vars: GetOrganizationLicenseTrustedVariables, options?: useDataConnectQueryOptions<GetOrganizationLicenseTrustedData>): UseDataConnectQueryResult<GetOrganizationLicenseTrustedData, GetOrganizationLicenseTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascrip
useGetOrganizationLicenseTrusted(vars: GetOrganizationLicenseTrustedVariables, options?: useDataConnectQueryOptions<GetOrganizationLicenseTrustedData>): UseDataConnectQueryResult<GetOrganizationLicenseTrustedData, GetOrganizationLicenseTrustedVariables>;
```

### Variables
The `GetOrganizationLicenseTrusted` Query requires an argument of type `GetOrganizationLicenseTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface GetOrganizationLicenseTrustedVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that calling the `GetOrganizationLicenseTrusted` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetOrganizationLicenseTrusted` Query is of type `GetOrganizationLicenseTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
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

```javascrip
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

```javascrip
useGetOrganizationLicenseHistory(dc: DataConnect, vars: GetOrganizationLicenseHistoryVariables, options?: useDataConnectQueryOptions<GetOrganizationLicenseHistoryData>): UseDataConnectQueryResult<GetOrganizationLicenseHistoryData, GetOrganizationLicenseHistoryVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascrip
useGetOrganizationLicenseHistory(vars: GetOrganizationLicenseHistoryVariables, options?: useDataConnectQueryOptions<GetOrganizationLicenseHistoryData>): UseDataConnectQueryResult<GetOrganizationLicenseHistoryData, GetOrganizationLicenseHistoryVariables>;
```

### Variables
The `GetOrganizationLicenseHistory` Query requires an argument of type `GetOrganizationLicenseHistoryVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface GetOrganizationLicenseHistoryVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that calling the `GetOrganizationLicenseHistory` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetOrganizationLicenseHistory` Query is of type `GetOrganizationLicenseHistoryData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
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

```javascrip
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

```javascrip
useGetOrganizationLicensePublic(dc: DataConnect, vars: GetOrganizationLicensePublicVariables, options?: useDataConnectQueryOptions<GetOrganizationLicensePublicData>): UseDataConnectQueryResult<GetOrganizationLicensePublicData, GetOrganizationLicensePublicVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascrip
useGetOrganizationLicensePublic(vars: GetOrganizationLicensePublicVariables, options?: useDataConnectQueryOptions<GetOrganizationLicensePublicData>): UseDataConnectQueryResult<GetOrganizationLicensePublicData, GetOrganizationLicensePublicVariables>;
```

### Variables
The `GetOrganizationLicensePublic` Query requires an argument of type `GetOrganizationLicensePublicVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface GetOrganizationLicensePublicVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that calling the `GetOrganizationLicensePublic` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetOrganizationLicensePublic` Query is of type `GetOrganizationLicensePublicData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
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

```javascrip
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

```javascrip
useGetOrganizationLicenseHistoryPublic(dc: DataConnect, vars: GetOrganizationLicenseHistoryPublicVariables, options?: useDataConnectQueryOptions<GetOrganizationLicenseHistoryPublicData>): UseDataConnectQueryResult<GetOrganizationLicenseHistoryPublicData, GetOrganizationLicenseHistoryPublicVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascrip
useGetOrganizationLicenseHistoryPublic(vars: GetOrganizationLicenseHistoryPublicVariables, options?: useDataConnectQueryOptions<GetOrganizationLicenseHistoryPublicData>): UseDataConnectQueryResult<GetOrganizationLicenseHistoryPublicData, GetOrganizationLicenseHistoryPublicVariables>;
```

### Variables
The `GetOrganizationLicenseHistoryPublic` Query requires an argument of type `GetOrganizationLicenseHistoryPublicVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface GetOrganizationLicenseHistoryPublicVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that calling the `GetOrganizationLicenseHistoryPublic` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetOrganizationLicenseHistoryPublic` Query is of type `GetOrganizationLicenseHistoryPublicData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
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

```javascrip
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

```javascrip
useListOrganizationsTrusted(dc: DataConnect, options?: useDataConnectQueryOptions<ListOrganizationsTrustedData>): UseDataConnectQueryResult<ListOrganizationsTrustedData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascrip
useListOrganizationsTrusted(options?: useDataConnectQueryOptions<ListOrganizationsTrustedData>): UseDataConnectQueryResult<ListOrganizationsTrustedData, undefined>;
```

### Variables
The `ListOrganizationsTrusted` Query has no variables.
### Return Type
Recall that calling the `ListOrganizationsTrusted` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListOrganizationsTrusted` Query is of type `ListOrganizationsTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
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
    organizationLicense_on_organization?: {
      id: UUIDString;
      startDate: DateString;
      expiryDate: DateString;
      negotiatedPrice: number;
      currency: string;
      createdAt: TimestampString;
      updatedAt: TimestampString;
      plan: {
        id: UUIDString;
        planCode: string;
        name: string;
        level: number;
        maxStores: number;
        maxUsers: number;
        status: LicensePlanStatus;
      } & LicensePlan_Key;
    } & OrganizationLicense_Key;
  } & Organization_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListOrganizationsTrusted`'s Query hook function

```javascrip
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

```javascrip
useListOrganizationUsersForDeletionTrusted(dc: DataConnect, vars: ListOrganizationUsersForDeletionTrustedVariables, options?: useDataConnectQueryOptions<ListOrganizationUsersForDeletionTrustedData>): UseDataConnectQueryResult<ListOrganizationUsersForDeletionTrustedData, ListOrganizationUsersForDeletionTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascrip
useListOrganizationUsersForDeletionTrusted(vars: ListOrganizationUsersForDeletionTrustedVariables, options?: useDataConnectQueryOptions<ListOrganizationUsersForDeletionTrustedData>): UseDataConnectQueryResult<ListOrganizationUsersForDeletionTrustedData, ListOrganizationUsersForDeletionTrustedVariables>;
```

### Variables
The `ListOrganizationUsersForDeletionTrusted` Query requires an argument of type `ListOrganizationUsersForDeletionTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface ListOrganizationUsersForDeletionTrustedVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that calling the `ListOrganizationUsersForDeletionTrusted` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListOrganizationUsersForDeletionTrusted` Query is of type `ListOrganizationUsersForDeletionTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
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

```javascrip
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

```javascrip
useListTenantOutlets(dc: DataConnect, vars: ListTenantOutletsVariables, options?: useDataConnectQueryOptions<ListTenantOutletsData>): UseDataConnectQueryResult<ListTenantOutletsData, ListTenantOutletsVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascrip
useListTenantOutlets(vars: ListTenantOutletsVariables, options?: useDataConnectQueryOptions<ListTenantOutletsData>): UseDataConnectQueryResult<ListTenantOutletsData, ListTenantOutletsVariables>;
```

### Variables
The `ListTenantOutlets` Query requires an argument of type `ListTenantOutletsVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface ListTenantOutletsVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that calling the `ListTenantOutlets` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListTenantOutlets` Query is of type `ListTenantOutletsData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListTenantOutlets`'s Query hook function

```javascrip
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

```javascrip
useListTenantEmployees(dc: DataConnect, vars: ListTenantEmployeesVariables, options?: useDataConnectQueryOptions<ListTenantEmployeesData>): UseDataConnectQueryResult<ListTenantEmployeesData, ListTenantEmployeesVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascrip
useListTenantEmployees(vars: ListTenantEmployeesVariables, options?: useDataConnectQueryOptions<ListTenantEmployeesData>): UseDataConnectQueryResult<ListTenantEmployeesData, ListTenantEmployeesVariables>;
```

### Variables
The `ListTenantEmployees` Query requires an argument of type `ListTenantEmployeesVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface ListTenantEmployeesVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that calling the `ListTenantEmployees` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListTenantEmployees` Query is of type `ListTenantEmployeesData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
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
      employeeMemberships: ({
        role: {
          code: string;
        };
      })[];
    } & AppUser_Key;
    employeeCode: number;
    fullName: string;
    email?: string | null;
    phone: string;
    designation: string;
    department?: string | null;
    gender?: string | null;
    dateOfBirth?: DateString | null;
    dateOfJoining: DateString;
    address?: string | null;
    notes?: string | null;
    assignmentScope: string;
    employmentStatus: EmploymentStatus;
    loginAccess: LoginAccessStatus;
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListTenantEmployees`'s Query hook function

```javascrip
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

```javascrip
useListTenantServicePersons(dc: DataConnect, vars: ListTenantServicePersonsVariables, options?: useDataConnectQueryOptions<ListTenantServicePersonsData>): UseDataConnectQueryResult<ListTenantServicePersonsData, ListTenantServicePersonsVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascrip
useListTenantServicePersons(vars: ListTenantServicePersonsVariables, options?: useDataConnectQueryOptions<ListTenantServicePersonsData>): UseDataConnectQueryResult<ListTenantServicePersonsData, ListTenantServicePersonsVariables>;
```

### Variables
The `ListTenantServicePersons` Query requires an argument of type `ListTenantServicePersonsVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface ListTenantServicePersonsVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that calling the `ListTenantServicePersons` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListTenantServicePersons` Query is of type `ListTenantServicePersonsData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
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
    address?: string | null;
    specialization?: string | null;
    yearsOfExperience?: number | null;
    assignmentScope: string;
    status: EmploymentStatus;
    notes?: string | null;
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListTenantServicePersons`'s Query hook function

```javascrip
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

## ListTenantCategories
You can execute the `ListTenantCategories` Query using the following Query hook function, which is defined in [sql-connect/react/index.d.ts](./index.d.ts):

```javascrip
useListTenantCategories(dc: DataConnect, vars: ListTenantCategoriesVariables, options?: useDataConnectQueryOptions<ListTenantCategoriesData>): UseDataConnectQueryResult<ListTenantCategoriesData, ListTenantCategoriesVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascrip
useListTenantCategories(vars: ListTenantCategoriesVariables, options?: useDataConnectQueryOptions<ListTenantCategoriesData>): UseDataConnectQueryResult<ListTenantCategoriesData, ListTenantCategoriesVariables>;
```

### Variables
The `ListTenantCategories` Query requires an argument of type `ListTenantCategoriesVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface ListTenantCategoriesVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that calling the `ListTenantCategories` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListTenantCategories` Query is of type `ListTenantCategoriesData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface ListTenantCategoriesData {
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
  categories: ({
    id: UUIDString;
    value: string;
    subcategories_on_category: ({
      id: UUIDString;
      value: string;
    } & Subcategory_Key)[];
  } & Category_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListTenantCategories`'s Query hook function

```javascrip
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListTenantCategoriesVariables } from '@omniretail/sql-connect';
import { useListTenantCategories } from '@omniretail/sql-connect/react'

export default function ListTenantCategoriesComponent() {
  // The `useListTenantCategories` Query hook requires an argument of type `ListTenantCategoriesVariables`:
  const listTenantCategoriesVars: ListTenantCategoriesVariables = {
    organizationId: ...,
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListTenantCategories(listTenantCategoriesVars);
  // Variables can be defined inline as well.
  const query = useListTenantCategories({ organizationId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListTenantCategories(dataConnect, listTenantCategoriesVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListTenantCategories(listTenantCategoriesVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListTenantCategories(dataConnect, listTenantCategoriesVars, options);

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
    console.log(query.data.categories);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListTenantProducts
You can execute the `ListTenantProducts` Query using the following Query hook function, which is defined in [sql-connect/react/index.d.ts](./index.d.ts):

```javascrip
useListTenantProducts(dc: DataConnect, vars: ListTenantProductsVariables, options?: useDataConnectQueryOptions<ListTenantProductsData>): UseDataConnectQueryResult<ListTenantProductsData, ListTenantProductsVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascrip
useListTenantProducts(vars: ListTenantProductsVariables, options?: useDataConnectQueryOptions<ListTenantProductsData>): UseDataConnectQueryResult<ListTenantProductsData, ListTenantProductsVariables>;
```

### Variables
The `ListTenantProducts` Query requires an argument of type `ListTenantProductsVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface ListTenantProductsVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that calling the `ListTenantProducts` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListTenantProducts` Query is of type `ListTenantProductsData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
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
    category: {
      id: UUIDString;
      value: string;
    } & Category_Key;
    subcategory?: {
      id: UUIDString;
      value: string;
    } & Subcategory_Key;
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
    description?: string | null;
  } & Product_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListTenantProducts`'s Query hook function

```javascrip
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

```javascrip
useListTenantInventory(dc: DataConnect, vars: ListTenantInventoryVariables, options?: useDataConnectQueryOptions<ListTenantInventoryData>): UseDataConnectQueryResult<ListTenantInventoryData, ListTenantInventoryVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascrip
useListTenantInventory(vars: ListTenantInventoryVariables, options?: useDataConnectQueryOptions<ListTenantInventoryData>): UseDataConnectQueryResult<ListTenantInventoryData, ListTenantInventoryVariables>;
```

### Variables
The `ListTenantInventory` Query requires an argument of type `ListTenantInventoryVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface ListTenantInventoryVariables {
  organizationId: UUIDString;
  outletId?: UUIDString | null;
}
```
### Return Type
Recall that calling the `ListTenantInventory` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListTenantInventory` Query is of type `ListTenantInventoryData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
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
      category: {
        value: string;
      };
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

```javascrip
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

```javascrip
useListTenantCustomers(dc: DataConnect, vars: ListTenantCustomersVariables, options?: useDataConnectQueryOptions<ListTenantCustomersData>): UseDataConnectQueryResult<ListTenantCustomersData, ListTenantCustomersVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascrip
useListTenantCustomers(vars: ListTenantCustomersVariables, options?: useDataConnectQueryOptions<ListTenantCustomersData>): UseDataConnectQueryResult<ListTenantCustomersData, ListTenantCustomersVariables>;
```

### Variables
The `ListTenantCustomers` Query requires an argument of type `ListTenantCustomersVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface ListTenantCustomersVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that calling the `ListTenantCustomers` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListTenantCustomers` Query is of type `ListTenantCustomersData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
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
    email?: string | null;
    taxId?: string | null;
    documentType?: string | null;
    documentValue?: string | null;
    address?: string | null;
    creditLimit?: number | null;
    preferredContact?: string | null;
    dateOfBirth?: DateString | null;
    gender?: string | null;
    status: CustomerStatus;
    notes?: string | null;
    customerSales: ({
      totalNet: number;
      status: SaleStatus;
    })[];
  } & Customer_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListTenantCustomers`'s Query hook function

```javascrip
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

## ListTenantCustomerPurchaseHistory
You can execute the `ListTenantCustomerPurchaseHistory` Query using the following Query hook function, which is defined in [sql-connect/react/index.d.ts](./index.d.ts):

```javascrip
useListTenantCustomerPurchaseHistory(dc: DataConnect, vars: ListTenantCustomerPurchaseHistoryVariables, options?: useDataConnectQueryOptions<ListTenantCustomerPurchaseHistoryData>): UseDataConnectQueryResult<ListTenantCustomerPurchaseHistoryData, ListTenantCustomerPurchaseHistoryVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascrip
useListTenantCustomerPurchaseHistory(vars: ListTenantCustomerPurchaseHistoryVariables, options?: useDataConnectQueryOptions<ListTenantCustomerPurchaseHistoryData>): UseDataConnectQueryResult<ListTenantCustomerPurchaseHistoryData, ListTenantCustomerPurchaseHistoryVariables>;
```

### Variables
The `ListTenantCustomerPurchaseHistory` Query requires an argument of type `ListTenantCustomerPurchaseHistoryVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface ListTenantCustomerPurchaseHistoryVariables {
  organizationId: UUIDString;
  customerId: UUIDString;
}
```
### Return Type
Recall that calling the `ListTenantCustomerPurchaseHistory` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListTenantCustomerPurchaseHistory` Query is of type `ListTenantCustomerPurchaseHistoryData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface ListTenantCustomerPurchaseHistoryData {
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
    receiptNumber: string;
    saleTimestamp: TimestampString;
    totalNet: number;
    outlet: {
      name: string;
    };
  })[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListTenantCustomerPurchaseHistory`'s Query hook function

```javascrip
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListTenantCustomerPurchaseHistoryVariables } from '@omniretail/sql-connect';
import { useListTenantCustomerPurchaseHistory } from '@omniretail/sql-connect/react'

export default function ListTenantCustomerPurchaseHistoryComponent() {
  // The `useListTenantCustomerPurchaseHistory` Query hook requires an argument of type `ListTenantCustomerPurchaseHistoryVariables`:
  const listTenantCustomerPurchaseHistoryVars: ListTenantCustomerPurchaseHistoryVariables = {
    organizationId: ...,
    customerId: ...,
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListTenantCustomerPurchaseHistory(listTenantCustomerPurchaseHistoryVars);
  // Variables can be defined inline as well.
  const query = useListTenantCustomerPurchaseHistory({ organizationId: ..., customerId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListTenantCustomerPurchaseHistory(dataConnect, listTenantCustomerPurchaseHistoryVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListTenantCustomerPurchaseHistory(listTenantCustomerPurchaseHistoryVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListTenantCustomerPurchaseHistory(dataConnect, listTenantCustomerPurchaseHistoryVars, options);

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

## ListTenantSuppliers
You can execute the `ListTenantSuppliers` Query using the following Query hook function, which is defined in [sql-connect/react/index.d.ts](./index.d.ts):

```javascrip
useListTenantSuppliers(dc: DataConnect, vars: ListTenantSuppliersVariables, options?: useDataConnectQueryOptions<ListTenantSuppliersData>): UseDataConnectQueryResult<ListTenantSuppliersData, ListTenantSuppliersVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascrip
useListTenantSuppliers(vars: ListTenantSuppliersVariables, options?: useDataConnectQueryOptions<ListTenantSuppliersData>): UseDataConnectQueryResult<ListTenantSuppliersData, ListTenantSuppliersVariables>;
```

### Variables
The `ListTenantSuppliers` Query requires an argument of type `ListTenantSuppliersVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface ListTenantSuppliersVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that calling the `ListTenantSuppliers` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListTenantSuppliers` Query is of type `ListTenantSuppliersData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
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
    taxId?: string | null;
    address?: string | null;
    category: string;
    paymentTerms: string;
    creditLimit: number;
    status: SupplierStatus;
    notes?: string | null;
    supplierPurchases: ({
      totalAmount: number;
      outstandingAmount: number;
      receiptStatus: PurchaseReceiptStatus;
      status: PurchaseStatus;
    })[];
  } & Supplier_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListTenantSuppliers`'s Query hook function

```javascrip
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

```javascrip
useListTenantPurchases(dc: DataConnect, vars: ListTenantPurchasesVariables, options?: useDataConnectQueryOptions<ListTenantPurchasesData>): UseDataConnectQueryResult<ListTenantPurchasesData, ListTenantPurchasesVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascrip
useListTenantPurchases(vars: ListTenantPurchasesVariables, options?: useDataConnectQueryOptions<ListTenantPurchasesData>): UseDataConnectQueryResult<ListTenantPurchasesData, ListTenantPurchasesVariables>;
```

### Variables
The `ListTenantPurchases` Query requires an argument of type `ListTenantPurchasesVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface ListTenantPurchasesVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that calling the `ListTenantPurchases` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListTenantPurchases` Query is of type `ListTenantPurchasesData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
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
      taxId?: string | null;
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListTenantPurchases`'s Query hook function

```javascrip
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

```javascrip
useListTenantExpenses(dc: DataConnect, vars: ListTenantExpensesVariables, options?: useDataConnectQueryOptions<ListTenantExpensesData>): UseDataConnectQueryResult<ListTenantExpensesData, ListTenantExpensesVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascrip
useListTenantExpenses(vars: ListTenantExpensesVariables, options?: useDataConnectQueryOptions<ListTenantExpensesData>): UseDataConnectQueryResult<ListTenantExpensesData, ListTenantExpensesVariables>;
```

### Variables
The `ListTenantExpenses` Query requires an argument of type `ListTenantExpensesVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface ListTenantExpensesVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that calling the `ListTenantExpenses` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListTenantExpenses` Query is of type `ListTenantExpensesData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListTenantExpenses`'s Query hook function

```javascrip
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

```javascrip
useListTenantSales(dc: DataConnect, vars: ListTenantSalesVariables, options?: useDataConnectQueryOptions<ListTenantSalesData>): UseDataConnectQueryResult<ListTenantSalesData, ListTenantSalesVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascrip
useListTenantSales(vars: ListTenantSalesVariables, options?: useDataConnectQueryOptions<ListTenantSalesData>): UseDataConnectQueryResult<ListTenantSalesData, ListTenantSalesVariables>;
```

### Variables
The `ListTenantSales` Query requires an argument of type `ListTenantSalesVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface ListTenantSalesVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that calling the `ListTenantSales` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListTenantSales` Query is of type `ListTenantSalesData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
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
      email?: string | null;
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
      itemName?: string | null;
      product?: {
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListTenantSales`'s Query hook function

```javascrip
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

```javascrip
useGetTenantInventoryStockTrusted(dc: DataConnect, vars: GetTenantInventoryStockTrustedVariables, options?: useDataConnectQueryOptions<GetTenantInventoryStockTrustedData>): UseDataConnectQueryResult<GetTenantInventoryStockTrustedData, GetTenantInventoryStockTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascrip
useGetTenantInventoryStockTrusted(vars: GetTenantInventoryStockTrustedVariables, options?: useDataConnectQueryOptions<GetTenantInventoryStockTrustedData>): UseDataConnectQueryResult<GetTenantInventoryStockTrustedData, GetTenantInventoryStockTrustedVariables>;
```

### Variables
The `GetTenantInventoryStockTrusted` Query requires an argument of type `GetTenantInventoryStockTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
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
```javascrip
export interface GetTenantInventoryStockTrustedData {
  inventoryStocks: ({
    onHandQty: number;
  })[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetTenantInventoryStockTrusted`'s Query hook function

```javascrip
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

## GetTenantSupplierTrusted
You can execute the `GetTenantSupplierTrusted` Query using the following Query hook function, which is defined in [sql-connect/react/index.d.ts](./index.d.ts):

```javascrip
useGetTenantSupplierTrusted(dc: DataConnect, vars: GetTenantSupplierTrustedVariables, options?: useDataConnectQueryOptions<GetTenantSupplierTrustedData>): UseDataConnectQueryResult<GetTenantSupplierTrustedData, GetTenantSupplierTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascrip
useGetTenantSupplierTrusted(vars: GetTenantSupplierTrustedVariables, options?: useDataConnectQueryOptions<GetTenantSupplierTrustedData>): UseDataConnectQueryResult<GetTenantSupplierTrustedData, GetTenantSupplierTrustedVariables>;
```

### Variables
The `GetTenantSupplierTrusted` Query requires an argument of type `GetTenantSupplierTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface GetTenantSupplierTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
}
```
### Return Type
Recall that calling the `GetTenantSupplierTrusted` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetTenantSupplierTrusted` Query is of type `GetTenantSupplierTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
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
    taxId?: string | null;
    address?: string | null;
    category: string;
    paymentTerms: string;
    creditLimit: number;
    status: SupplierStatus;
    notes?: string | null;
  } & Supplier_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetTenantSupplierTrusted`'s Query hook function

```javascrip
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetTenantSupplierTrustedVariables } from '@omniretail/sql-connect';
import { useGetTenantSupplierTrusted } from '@omniretail/sql-connect/react'

export default function GetTenantSupplierTrustedComponent() {
  // The `useGetTenantSupplierTrusted` Query hook requires an argument of type `GetTenantSupplierTrustedVariables`:
  const getTenantSupplierTrustedVars: GetTenantSupplierTrustedVariables = {
    organizationId: ...,
    id: ...,
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetTenantSupplierTrusted(getTenantSupplierTrustedVars);
  // Variables can be defined inline as well.
  const query = useGetTenantSupplierTrusted({ organizationId: ..., id: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetTenantSupplierTrusted(dataConnect, getTenantSupplierTrustedVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetTenantSupplierTrusted(getTenantSupplierTrustedVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetTenantSupplierTrusted(dataConnect, getTenantSupplierTrustedVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.suppliers);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetTenantCustomerTrusted
You can execute the `GetTenantCustomerTrusted` Query using the following Query hook function, which is defined in [sql-connect/react/index.d.ts](./index.d.ts):

```javascrip
useGetTenantCustomerTrusted(dc: DataConnect, vars: GetTenantCustomerTrustedVariables, options?: useDataConnectQueryOptions<GetTenantCustomerTrustedData>): UseDataConnectQueryResult<GetTenantCustomerTrustedData, GetTenantCustomerTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascrip
useGetTenantCustomerTrusted(vars: GetTenantCustomerTrustedVariables, options?: useDataConnectQueryOptions<GetTenantCustomerTrustedData>): UseDataConnectQueryResult<GetTenantCustomerTrustedData, GetTenantCustomerTrustedVariables>;
```

### Variables
The `GetTenantCustomerTrusted` Query requires an argument of type `GetTenantCustomerTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface GetTenantCustomerTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
}
```
### Return Type
Recall that calling the `GetTenantCustomerTrusted` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetTenantCustomerTrusted` Query is of type `GetTenantCustomerTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
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
    email?: string | null;
    taxId?: string | null;
    documentType?: string | null;
    documentValue?: string | null;
    address?: string | null;
    creditLimit?: number | null;
    preferredContact?: string | null;
    dateOfBirth?: DateString | null;
    gender?: string | null;
    status: CustomerStatus;
    notes?: string | null;
  } & Customer_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetTenantCustomerTrusted`'s Query hook function

```javascrip
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetTenantCustomerTrustedVariables } from '@omniretail/sql-connect';
import { useGetTenantCustomerTrusted } from '@omniretail/sql-connect/react'

export default function GetTenantCustomerTrustedComponent() {
  // The `useGetTenantCustomerTrusted` Query hook requires an argument of type `GetTenantCustomerTrustedVariables`:
  const getTenantCustomerTrustedVars: GetTenantCustomerTrustedVariables = {
    organizationId: ...,
    id: ...,
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetTenantCustomerTrusted(getTenantCustomerTrustedVars);
  // Variables can be defined inline as well.
  const query = useGetTenantCustomerTrusted({ organizationId: ..., id: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetTenantCustomerTrusted(dataConnect, getTenantCustomerTrustedVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetTenantCustomerTrusted(getTenantCustomerTrustedVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetTenantCustomerTrusted(dataConnect, getTenantCustomerTrustedVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.customers);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListTenantCategoriesTrusted
You can execute the `ListTenantCategoriesTrusted` Query using the following Query hook function, which is defined in [sql-connect/react/index.d.ts](./index.d.ts):

```javascrip
useListTenantCategoriesTrusted(dc: DataConnect, vars: ListTenantCategoriesTrustedVariables, options?: useDataConnectQueryOptions<ListTenantCategoriesTrustedData>): UseDataConnectQueryResult<ListTenantCategoriesTrustedData, ListTenantCategoriesTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascrip
useListTenantCategoriesTrusted(vars: ListTenantCategoriesTrustedVariables, options?: useDataConnectQueryOptions<ListTenantCategoriesTrustedData>): UseDataConnectQueryResult<ListTenantCategoriesTrustedData, ListTenantCategoriesTrustedVariables>;
```

### Variables
The `ListTenantCategoriesTrusted` Query requires an argument of type `ListTenantCategoriesTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface ListTenantCategoriesTrustedVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that calling the `ListTenantCategoriesTrusted` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListTenantCategoriesTrusted` Query is of type `ListTenantCategoriesTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface ListTenantCategoriesTrustedData {
  categories: ({
    id: UUIDString;
    organization: {
      id: UUIDString;
    } & Organization_Key;
    value: string;
    subcategories_on_category: ({
      id: UUIDString;
      value: string;
    } & Subcategory_Key)[];
  } & Category_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListTenantCategoriesTrusted`'s Query hook function

```javascrip
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListTenantCategoriesTrustedVariables } from '@omniretail/sql-connect';
import { useListTenantCategoriesTrusted } from '@omniretail/sql-connect/react'

export default function ListTenantCategoriesTrustedComponent() {
  // The `useListTenantCategoriesTrusted` Query hook requires an argument of type `ListTenantCategoriesTrustedVariables`:
  const listTenantCategoriesTrustedVars: ListTenantCategoriesTrustedVariables = {
    organizationId: ...,
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListTenantCategoriesTrusted(listTenantCategoriesTrustedVars);
  // Variables can be defined inline as well.
  const query = useListTenantCategoriesTrusted({ organizationId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListTenantCategoriesTrusted(dataConnect, listTenantCategoriesTrustedVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListTenantCategoriesTrusted(listTenantCategoriesTrustedVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListTenantCategoriesTrusted(dataConnect, listTenantCategoriesTrustedVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.categories);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetTenantProductTrusted
You can execute the `GetTenantProductTrusted` Query using the following Query hook function, which is defined in [sql-connect/react/index.d.ts](./index.d.ts):

```javascrip
useGetTenantProductTrusted(dc: DataConnect, vars: GetTenantProductTrustedVariables, options?: useDataConnectQueryOptions<GetTenantProductTrustedData>): UseDataConnectQueryResult<GetTenantProductTrustedData, GetTenantProductTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascrip
useGetTenantProductTrusted(vars: GetTenantProductTrustedVariables, options?: useDataConnectQueryOptions<GetTenantProductTrustedData>): UseDataConnectQueryResult<GetTenantProductTrustedData, GetTenantProductTrustedVariables>;
```

### Variables
The `GetTenantProductTrusted` Query requires an argument of type `GetTenantProductTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface GetTenantProductTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
}
```
### Return Type
Recall that calling the `GetTenantProductTrusted` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetTenantProductTrusted` Query is of type `GetTenantProductTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface GetTenantProductTrustedData {
  products: ({
    id: UUIDString;
    organization: {
      id: UUIDString;
    } & Organization_Key;
    productCode: number;
    name: string;
    brand: string;
    category: {
      id: UUIDString;
      value: string;
    } & Category_Key;
    subcategory?: {
      id: UUIDString;
      value: string;
    } & Subcategory_Key;
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
    description?: string | null;
  } & Product_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetTenantProductTrusted`'s Query hook function

```javascrip
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetTenantProductTrustedVariables } from '@omniretail/sql-connect';
import { useGetTenantProductTrusted } from '@omniretail/sql-connect/react'

export default function GetTenantProductTrustedComponent() {
  // The `useGetTenantProductTrusted` Query hook requires an argument of type `GetTenantProductTrustedVariables`:
  const getTenantProductTrustedVars: GetTenantProductTrustedVariables = {
    organizationId: ...,
    id: ...,
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetTenantProductTrusted(getTenantProductTrustedVars);
  // Variables can be defined inline as well.
  const query = useGetTenantProductTrusted({ organizationId: ..., id: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetTenantProductTrusted(dataConnect, getTenantProductTrustedVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetTenantProductTrusted(getTenantProductTrustedVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetTenantProductTrusted(dataConnect, getTenantProductTrustedVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.products);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetTenantMembershipTrusted
You can execute the `GetTenantMembershipTrusted` Query using the following Query hook function, which is defined in [sql-connect/react/index.d.ts](./index.d.ts):

```javascrip
useGetTenantMembershipTrusted(dc: DataConnect, vars: GetTenantMembershipTrustedVariables, options?: useDataConnectQueryOptions<GetTenantMembershipTrustedData>): UseDataConnectQueryResult<GetTenantMembershipTrustedData, GetTenantMembershipTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascrip
useGetTenantMembershipTrusted(vars: GetTenantMembershipTrustedVariables, options?: useDataConnectQueryOptions<GetTenantMembershipTrustedData>): UseDataConnectQueryResult<GetTenantMembershipTrustedData, GetTenantMembershipTrustedVariables>;
```

### Variables
The `GetTenantMembershipTrusted` Query requires an argument of type `GetTenantMembershipTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface GetTenantMembershipTrustedVariables {
  organizationId: UUIDString;
  firebaseUid: string;
}
```
### Return Type
Recall that calling the `GetTenantMembershipTrusted` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetTenantMembershipTrusted` Query is of type `GetTenantMembershipTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
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

```javascrip
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

## ResolveTenantEmployeeIdentityTrusted
You can execute the `ResolveTenantEmployeeIdentityTrusted` Query using the following Query hook function, which is defined in [sql-connect/react/index.d.ts](./index.d.ts):

```javascrip
useResolveTenantEmployeeIdentityTrusted(dc: DataConnect, vars: ResolveTenantEmployeeIdentityTrustedVariables, options?: useDataConnectQueryOptions<ResolveTenantEmployeeIdentityTrustedData>): UseDataConnectQueryResult<ResolveTenantEmployeeIdentityTrustedData, ResolveTenantEmployeeIdentityTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascrip
useResolveTenantEmployeeIdentityTrusted(vars: ResolveTenantEmployeeIdentityTrustedVariables, options?: useDataConnectQueryOptions<ResolveTenantEmployeeIdentityTrustedData>): UseDataConnectQueryResult<ResolveTenantEmployeeIdentityTrustedData, ResolveTenantEmployeeIdentityTrustedVariables>;
```

### Variables
The `ResolveTenantEmployeeIdentityTrusted` Query requires an argument of type `ResolveTenantEmployeeIdentityTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface ResolveTenantEmployeeIdentityTrustedVariables {
  organizationId: UUIDString;
  employeeId: UUIDString;
}
```
### Return Type
Recall that calling the `ResolveTenantEmployeeIdentityTrusted` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ResolveTenantEmployeeIdentityTrusted` Query is of type `ResolveTenantEmployeeIdentityTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ResolveTenantEmployeeIdentityTrusted`'s Query hook function

```javascrip
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ResolveTenantEmployeeIdentityTrustedVariables } from '@omniretail/sql-connect';
import { useResolveTenantEmployeeIdentityTrusted } from '@omniretail/sql-connect/react'

export default function ResolveTenantEmployeeIdentityTrustedComponent() {
  // The `useResolveTenantEmployeeIdentityTrusted` Query hook requires an argument of type `ResolveTenantEmployeeIdentityTrustedVariables`:
  const resolveTenantEmployeeIdentityTrustedVars: ResolveTenantEmployeeIdentityTrustedVariables = {
    organizationId: ...,
    employeeId: ...,
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useResolveTenantEmployeeIdentityTrusted(resolveTenantEmployeeIdentityTrustedVars);
  // Variables can be defined inline as well.
  const query = useResolveTenantEmployeeIdentityTrusted({ organizationId: ..., employeeId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useResolveTenantEmployeeIdentityTrusted(dataConnect, resolveTenantEmployeeIdentityTrustedVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useResolveTenantEmployeeIdentityTrusted(resolveTenantEmployeeIdentityTrustedVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useResolveTenantEmployeeIdentityTrusted(dataConnect, resolveTenantEmployeeIdentityTrustedVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.employees);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetTenantOutletTrusted
You can execute the `GetTenantOutletTrusted` Query using the following Query hook function, which is defined in [sql-connect/react/index.d.ts](./index.d.ts):

```javascrip
useGetTenantOutletTrusted(dc: DataConnect, vars: GetTenantOutletTrustedVariables, options?: useDataConnectQueryOptions<GetTenantOutletTrustedData>): UseDataConnectQueryResult<GetTenantOutletTrustedData, GetTenantOutletTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascrip
useGetTenantOutletTrusted(vars: GetTenantOutletTrustedVariables, options?: useDataConnectQueryOptions<GetTenantOutletTrustedData>): UseDataConnectQueryResult<GetTenantOutletTrustedData, GetTenantOutletTrustedVariables>;
```

### Variables
The `GetTenantOutletTrusted` Query requires an argument of type `GetTenantOutletTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface GetTenantOutletTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
}
```
### Return Type
Recall that calling the `GetTenantOutletTrusted` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetTenantOutletTrusted` Query is of type `GetTenantOutletTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetTenantOutletTrusted`'s Query hook function

```javascrip
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetTenantOutletTrustedVariables } from '@omniretail/sql-connect';
import { useGetTenantOutletTrusted } from '@omniretail/sql-connect/react'

export default function GetTenantOutletTrustedComponent() {
  // The `useGetTenantOutletTrusted` Query hook requires an argument of type `GetTenantOutletTrustedVariables`:
  const getTenantOutletTrustedVars: GetTenantOutletTrustedVariables = {
    organizationId: ...,
    id: ...,
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetTenantOutletTrusted(getTenantOutletTrustedVars);
  // Variables can be defined inline as well.
  const query = useGetTenantOutletTrusted({ organizationId: ..., id: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetTenantOutletTrusted(dataConnect, getTenantOutletTrustedVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetTenantOutletTrusted(getTenantOutletTrustedVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetTenantOutletTrusted(dataConnect, getTenantOutletTrustedVars, options);

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

## GetTenantEmployeeTrusted
You can execute the `GetTenantEmployeeTrusted` Query using the following Query hook function, which is defined in [sql-connect/react/index.d.ts](./index.d.ts):

```javascrip
useGetTenantEmployeeTrusted(dc: DataConnect, vars: GetTenantEmployeeTrustedVariables, options?: useDataConnectQueryOptions<GetTenantEmployeeTrustedData>): UseDataConnectQueryResult<GetTenantEmployeeTrustedData, GetTenantEmployeeTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascrip
useGetTenantEmployeeTrusted(vars: GetTenantEmployeeTrustedVariables, options?: useDataConnectQueryOptions<GetTenantEmployeeTrustedData>): UseDataConnectQueryResult<GetTenantEmployeeTrustedData, GetTenantEmployeeTrustedVariables>;
```

### Variables
The `GetTenantEmployeeTrusted` Query requires an argument of type `GetTenantEmployeeTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface GetTenantEmployeeTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
}
```
### Return Type
Recall that calling the `GetTenantEmployeeTrusted` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetTenantEmployeeTrusted` Query is of type `GetTenantEmployeeTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
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
      employeeTrustedMemberships: ({
        role: {
          code: string;
        };
      })[];
    } & AppUser_Key;
    employeeCode: number;
    fullName: string;
    email?: string | null;
    phone: string;
    designation: string;
    department?: string | null;
    gender?: string | null;
    dateOfBirth?: DateString | null;
    dateOfJoining: DateString;
    address?: string | null;
    notes?: string | null;
    assignmentScope: string;
    employmentStatus: EmploymentStatus;
    loginAccess: LoginAccessStatus;
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetTenantEmployeeTrusted`'s Query hook function

```javascrip
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetTenantEmployeeTrustedVariables } from '@omniretail/sql-connect';
import { useGetTenantEmployeeTrusted } from '@omniretail/sql-connect/react'

export default function GetTenantEmployeeTrustedComponent() {
  // The `useGetTenantEmployeeTrusted` Query hook requires an argument of type `GetTenantEmployeeTrustedVariables`:
  const getTenantEmployeeTrustedVars: GetTenantEmployeeTrustedVariables = {
    organizationId: ...,
    id: ...,
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetTenantEmployeeTrusted(getTenantEmployeeTrustedVars);
  // Variables can be defined inline as well.
  const query = useGetTenantEmployeeTrusted({ organizationId: ..., id: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetTenantEmployeeTrusted(dataConnect, getTenantEmployeeTrustedVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetTenantEmployeeTrusted(getTenantEmployeeTrustedVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetTenantEmployeeTrusted(dataConnect, getTenantEmployeeTrustedVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.employees);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetTenantServicePersonTrusted
You can execute the `GetTenantServicePersonTrusted` Query using the following Query hook function, which is defined in [sql-connect/react/index.d.ts](./index.d.ts):

```javascrip
useGetTenantServicePersonTrusted(dc: DataConnect, vars: GetTenantServicePersonTrustedVariables, options?: useDataConnectQueryOptions<GetTenantServicePersonTrustedData>): UseDataConnectQueryResult<GetTenantServicePersonTrustedData, GetTenantServicePersonTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascrip
useGetTenantServicePersonTrusted(vars: GetTenantServicePersonTrustedVariables, options?: useDataConnectQueryOptions<GetTenantServicePersonTrustedData>): UseDataConnectQueryResult<GetTenantServicePersonTrustedData, GetTenantServicePersonTrustedVariables>;
```

### Variables
The `GetTenantServicePersonTrusted` Query requires an argument of type `GetTenantServicePersonTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface GetTenantServicePersonTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
}
```
### Return Type
Recall that calling the `GetTenantServicePersonTrusted` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetTenantServicePersonTrusted` Query is of type `GetTenantServicePersonTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
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
    address?: string | null;
    specialization?: string | null;
    yearsOfExperience?: number | null;
    assignmentScope: string;
    status: EmploymentStatus;
    notes?: string | null;
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetTenantServicePersonTrusted`'s Query hook function

```javascrip
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetTenantServicePersonTrustedVariables } from '@omniretail/sql-connect';
import { useGetTenantServicePersonTrusted } from '@omniretail/sql-connect/react'

export default function GetTenantServicePersonTrustedComponent() {
  // The `useGetTenantServicePersonTrusted` Query hook requires an argument of type `GetTenantServicePersonTrustedVariables`:
  const getTenantServicePersonTrustedVars: GetTenantServicePersonTrustedVariables = {
    organizationId: ...,
    id: ...,
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetTenantServicePersonTrusted(getTenantServicePersonTrustedVars);
  // Variables can be defined inline as well.
  const query = useGetTenantServicePersonTrusted({ organizationId: ..., id: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetTenantServicePersonTrusted(dataConnect, getTenantServicePersonTrustedVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetTenantServicePersonTrusted(getTenantServicePersonTrustedVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetTenantServicePersonTrusted(dataConnect, getTenantServicePersonTrustedVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.servicePeople);
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

## UpdateAppUserProfile
You can execute the `UpdateAppUserProfile` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useUpdateAppUserProfile(options?: useDataConnectMutationOptions<UpdateAppUserProfileData, FirebaseError, UpdateAppUserProfileVariables>): UseDataConnectMutationResult<UpdateAppUserProfileData, UpdateAppUserProfileVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useUpdateAppUserProfile(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateAppUserProfileData, FirebaseError, UpdateAppUserProfileVariables>): UseDataConnectMutationResult<UpdateAppUserProfileData, UpdateAppUserProfileVariables>;
```

### Variables
The `UpdateAppUserProfile` Mutation requires an argument of type `UpdateAppUserProfileVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface UpdateAppUserProfileVariables {
  userId: UUIDString;
  displayName: string;
  phone?: string | null;
}
```
### Return Type
Recall that calling the `UpdateAppUserProfile` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateAppUserProfile` Mutation is of type `UpdateAppUserProfileData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface UpdateAppUserProfileData {
  appUser_update?: AppUser_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateAppUserProfile`'s Mutation hook function

```javascrip
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
  };
  mutation.mutate(updateAppUserProfileVars);
  // Variables can be defined inline as well.
  mutation.mutate({ userId: ..., displayName: ..., phone: ..., });

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
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## BootstrapMasterAdmin
You can execute the `BootstrapMasterAdmin` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useBootstrapMasterAdmin(options?: useDataConnectMutationOptions<BootstrapMasterAdminData, FirebaseError, BootstrapMasterAdminVariables>): UseDataConnectMutationResult<BootstrapMasterAdminData, BootstrapMasterAdminVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useBootstrapMasterAdmin(dc: DataConnect, options?: useDataConnectMutationOptions<BootstrapMasterAdminData, FirebaseError, BootstrapMasterAdminVariables>): UseDataConnectMutationResult<BootstrapMasterAdminData, BootstrapMasterAdminVariables>;
```

### Variables
The `BootstrapMasterAdmin` Mutation requires an argument of type `BootstrapMasterAdminVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface BootstrapMasterAdminVariables {
  userId: UUIDString;
  firebaseUid: string;
  username: string;
  email: string;
  displayName: string;
  phone?: string | null;
  roleId: UUIDString;
}
```
### Return Type
Recall that calling the `BootstrapMasterAdmin` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `BootstrapMasterAdmin` Mutation is of type `BootstrapMasterAdminData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface BootstrapMasterAdminData {
  appUser_upsert: AppUser_Key;
  userRole_upsert: UserRole_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `BootstrapMasterAdmin`'s Mutation hook function

```javascrip
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
  };
  mutation.mutate(bootstrapMasterAdminVars);
  // Variables can be defined inline as well.
  mutation.mutate({ userId: ..., firebaseUid: ..., username: ..., email: ..., displayName: ..., phone: ..., roleId: ..., });

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
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateLicensePlan
You can execute the `CreateLicensePlan` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useCreateLicensePlan(options?: useDataConnectMutationOptions<CreateLicensePlanData, FirebaseError, CreateLicensePlanVariables>): UseDataConnectMutationResult<CreateLicensePlanData, CreateLicensePlanVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useCreateLicensePlan(dc: DataConnect, options?: useDataConnectMutationOptions<CreateLicensePlanData, FirebaseError, CreateLicensePlanVariables>): UseDataConnectMutationResult<CreateLicensePlanData, CreateLicensePlanVariables>;
```

### Variables
The `CreateLicensePlan` Mutation requires an argument of type `CreateLicensePlanVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface CreateLicensePlanVariables {
  planCode: string;
  name: string;
  description?: string | null;
  level: number;
  maxStores: number;
  maxUsers: number;
}
```
### Return Type
Recall that calling the `CreateLicensePlan` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateLicensePlan` Mutation is of type `CreateLicensePlanData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface CreateLicensePlanData {
  licensePlan_insert: LicensePlan_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateLicensePlan`'s Mutation hook function

```javascrip
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
  };
  mutation.mutate(createLicensePlanVars);
  // Variables can be defined inline as well.
  mutation.mutate({ planCode: ..., name: ..., description: ..., level: ..., maxStores: ..., maxUsers: ..., });

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
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateLicensePlan
You can execute the `UpdateLicensePlan` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useUpdateLicensePlan(options?: useDataConnectMutationOptions<UpdateLicensePlanData, FirebaseError, UpdateLicensePlanVariables>): UseDataConnectMutationResult<UpdateLicensePlanData, UpdateLicensePlanVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useUpdateLicensePlan(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateLicensePlanData, FirebaseError, UpdateLicensePlanVariables>): UseDataConnectMutationResult<UpdateLicensePlanData, UpdateLicensePlanVariables>;
```

### Variables
The `UpdateLicensePlan` Mutation requires an argument of type `UpdateLicensePlanVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface UpdateLicensePlanVariables {
  id: UUIDString;
  name: string;
  description?: string | null;
  level: number;
  maxStores: number;
  maxUsers: number;
}
```
### Return Type
Recall that calling the `UpdateLicensePlan` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateLicensePlan` Mutation is of type `UpdateLicensePlanData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface UpdateLicensePlanData {
  licensePlan_update?: LicensePlan_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateLicensePlan`'s Mutation hook function

```javascrip
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
  };
  mutation.mutate(updateLicensePlanVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., name: ..., description: ..., level: ..., maxStores: ..., maxUsers: ..., });

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
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ChangeLicensePlanStatus
You can execute the `ChangeLicensePlanStatus` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useChangeLicensePlanStatus(options?: useDataConnectMutationOptions<ChangeLicensePlanStatusData, FirebaseError, ChangeLicensePlanStatusVariables>): UseDataConnectMutationResult<ChangeLicensePlanStatusData, ChangeLicensePlanStatusVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useChangeLicensePlanStatus(dc: DataConnect, options?: useDataConnectMutationOptions<ChangeLicensePlanStatusData, FirebaseError, ChangeLicensePlanStatusVariables>): UseDataConnectMutationResult<ChangeLicensePlanStatusData, ChangeLicensePlanStatusVariables>;
```

### Variables
The `ChangeLicensePlanStatus` Mutation requires an argument of type `ChangeLicensePlanStatusVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface ChangeLicensePlanStatusVariables {
  id: UUIDString;
  status: LicensePlanStatus;
}
```
### Return Type
Recall that calling the `ChangeLicensePlanStatus` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ChangeLicensePlanStatus` Mutation is of type `ChangeLicensePlanStatusData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface ChangeLicensePlanStatusData {
  licensePlan_update?: LicensePlan_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ChangeLicensePlanStatus`'s Mutation hook function

```javascrip
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
  };
  mutation.mutate(changeLicensePlanStatusVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., status: ..., });

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
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteLicensePlan
You can execute the `DeleteLicensePlan` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useDeleteLicensePlan(options?: useDataConnectMutationOptions<DeleteLicensePlanData, FirebaseError, DeleteLicensePlanVariables>): UseDataConnectMutationResult<DeleteLicensePlanData, DeleteLicensePlanVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useDeleteLicensePlan(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteLicensePlanData, FirebaseError, DeleteLicensePlanVariables>): UseDataConnectMutationResult<DeleteLicensePlanData, DeleteLicensePlanVariables>;
```

### Variables
The `DeleteLicensePlan` Mutation requires an argument of type `DeleteLicensePlanVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface DeleteLicensePlanVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteLicensePlan` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteLicensePlan` Mutation is of type `DeleteLicensePlanData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface DeleteLicensePlanData {
  licensePlan_delete?: LicensePlan_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteLicensePlan`'s Mutation hook function

```javascrip
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
  };
  mutation.mutate(deleteLicensePlanVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., });

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
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteLicensePlanTrusted
You can execute the `DeleteLicensePlanTrusted` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useDeleteLicensePlanTrusted(options?: useDataConnectMutationOptions<DeleteLicensePlanTrustedData, FirebaseError, DeleteLicensePlanTrustedVariables>): UseDataConnectMutationResult<DeleteLicensePlanTrustedData, DeleteLicensePlanTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useDeleteLicensePlanTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteLicensePlanTrustedData, FirebaseError, DeleteLicensePlanTrustedVariables>): UseDataConnectMutationResult<DeleteLicensePlanTrustedData, DeleteLicensePlanTrustedVariables>;
```

### Variables
The `DeleteLicensePlanTrusted` Mutation requires an argument of type `DeleteLicensePlanTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface DeleteLicensePlanTrustedVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteLicensePlanTrusted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteLicensePlanTrusted` Mutation is of type `DeleteLicensePlanTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface DeleteLicensePlanTrustedData {
  licensePlan_delete?: LicensePlan_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteLicensePlanTrusted`'s Mutation hook function

```javascrip
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
  };
  mutation.mutate(deleteLicensePlanTrustedVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., });

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
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ProvisionOrganizationAdministrator
You can execute the `ProvisionOrganizationAdministrator` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useProvisionOrganizationAdministrator(options?: useDataConnectMutationOptions<ProvisionOrganizationAdministratorData, FirebaseError, ProvisionOrganizationAdministratorVariables>): UseDataConnectMutationResult<ProvisionOrganizationAdministratorData, ProvisionOrganizationAdministratorVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useProvisionOrganizationAdministrator(dc: DataConnect, options?: useDataConnectMutationOptions<ProvisionOrganizationAdministratorData, FirebaseError, ProvisionOrganizationAdministratorVariables>): UseDataConnectMutationResult<ProvisionOrganizationAdministratorData, ProvisionOrganizationAdministratorVariables>;
```

### Variables
The `ProvisionOrganizationAdministrator` Mutation requires an argument of type `ProvisionOrganizationAdministratorVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface ProvisionOrganizationAdministratorVariables {
  userId: UUIDString;
  firebaseUid: string;
  username: string;
  email: string;
  displayName: string;
  phone: string;
  organizationId: UUIDString;
  roleId: UUIDString;
}
```
### Return Type
Recall that calling the `ProvisionOrganizationAdministrator` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ProvisionOrganizationAdministrator` Mutation is of type `ProvisionOrganizationAdministratorData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface ProvisionOrganizationAdministratorData {
  appUser_insert: AppUser_Key;
  organizationMembership_insert: OrganizationMembership_Key;
  userRole_upsert: UserRole_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ProvisionOrganizationAdministrator`'s Mutation hook function

```javascrip
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
  };
  mutation.mutate(provisionOrganizationAdministratorVars);
  // Variables can be defined inline as well.
  mutation.mutate({ userId: ..., firebaseUid: ..., username: ..., email: ..., displayName: ..., phone: ..., organizationId: ..., roleId: ..., });

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
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## EnsureAppUserRoleTrusted
You can execute the `EnsureAppUserRoleTrusted` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useEnsureAppUserRoleTrusted(options?: useDataConnectMutationOptions<EnsureAppUserRoleTrustedData, FirebaseError, EnsureAppUserRoleTrustedVariables>): UseDataConnectMutationResult<EnsureAppUserRoleTrustedData, EnsureAppUserRoleTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useEnsureAppUserRoleTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<EnsureAppUserRoleTrustedData, FirebaseError, EnsureAppUserRoleTrustedVariables>): UseDataConnectMutationResult<EnsureAppUserRoleTrustedData, EnsureAppUserRoleTrustedVariables>;
```

### Variables
The `EnsureAppUserRoleTrusted` Mutation requires an argument of type `EnsureAppUserRoleTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
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
```javascrip
export interface EnsureAppUserRoleTrustedData {
  userRole_upsert: UserRole_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `EnsureAppUserRoleTrusted`'s Mutation hook function

```javascrip
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
```javascrip
useUpdateOrganizationAdministrator(options?: useDataConnectMutationOptions<UpdateOrganizationAdministratorData, FirebaseError, UpdateOrganizationAdministratorVariables>): UseDataConnectMutationResult<UpdateOrganizationAdministratorData, UpdateOrganizationAdministratorVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useUpdateOrganizationAdministrator(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateOrganizationAdministratorData, FirebaseError, UpdateOrganizationAdministratorVariables>): UseDataConnectMutationResult<UpdateOrganizationAdministratorData, UpdateOrganizationAdministratorVariables>;
```

### Variables
The `UpdateOrganizationAdministrator` Mutation requires an argument of type `UpdateOrganizationAdministratorVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface UpdateOrganizationAdministratorVariables {
  organizationId: UUIDString;
  userId: UUIDString;
  displayName: string;
  phone: string;
}
```
### Return Type
Recall that calling the `UpdateOrganizationAdministrator` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateOrganizationAdministrator` Mutation is of type `UpdateOrganizationAdministratorData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface UpdateOrganizationAdministratorData {
  appUser_update?: AppUser_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateOrganizationAdministrator`'s Mutation hook function

```javascrip
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
  };
  mutation.mutate(updateOrganizationAdministratorVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., userId: ..., displayName: ..., phone: ..., });

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
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ChangeOrganizationAdministratorStatus
You can execute the `ChangeOrganizationAdministratorStatus` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useChangeOrganizationAdministratorStatus(options?: useDataConnectMutationOptions<ChangeOrganizationAdministratorStatusData, FirebaseError, ChangeOrganizationAdministratorStatusVariables>): UseDataConnectMutationResult<ChangeOrganizationAdministratorStatusData, ChangeOrganizationAdministratorStatusVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useChangeOrganizationAdministratorStatus(dc: DataConnect, options?: useDataConnectMutationOptions<ChangeOrganizationAdministratorStatusData, FirebaseError, ChangeOrganizationAdministratorStatusVariables>): UseDataConnectMutationResult<ChangeOrganizationAdministratorStatusData, ChangeOrganizationAdministratorStatusVariables>;
```

### Variables
The `ChangeOrganizationAdministratorStatus` Mutation requires an argument of type `ChangeOrganizationAdministratorStatusVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface ChangeOrganizationAdministratorStatusVariables {
  organizationId: UUIDString;
  userId: UUIDString;
  status: AppUserStatus;
  membershipStatus: MembershipStatus;
}
```
### Return Type
Recall that calling the `ChangeOrganizationAdministratorStatus` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ChangeOrganizationAdministratorStatus` Mutation is of type `ChangeOrganizationAdministratorStatusData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface ChangeOrganizationAdministratorStatusData {
  appUser_update?: AppUser_Key | null;
  organizationMembership_update?: OrganizationMembership_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ChangeOrganizationAdministratorStatus`'s Mutation hook function

```javascrip
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
  };
  mutation.mutate(changeOrganizationAdministratorStatusVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., userId: ..., status: ..., membershipStatus: ..., });

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
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteOrganizationTrusted
You can execute the `DeleteOrganizationTrusted` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useDeleteOrganizationTrusted(options?: useDataConnectMutationOptions<DeleteOrganizationTrustedData, FirebaseError, DeleteOrganizationTrustedVariables>): UseDataConnectMutationResult<DeleteOrganizationTrustedData, DeleteOrganizationTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useDeleteOrganizationTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteOrganizationTrustedData, FirebaseError, DeleteOrganizationTrustedVariables>): UseDataConnectMutationResult<DeleteOrganizationTrustedData, DeleteOrganizationTrustedVariables>;
```

### Variables
The `DeleteOrganizationTrusted` Mutation requires an argument of type `DeleteOrganizationTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface DeleteOrganizationTrustedVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteOrganizationTrusted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteOrganizationTrusted` Mutation is of type `DeleteOrganizationTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface DeleteOrganizationTrustedData {
  organization_delete?: Organization_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteOrganizationTrusted`'s Mutation hook function

```javascrip
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
```javascrip
useDeleteAppUserTrusted(options?: useDataConnectMutationOptions<DeleteAppUserTrustedData, FirebaseError, DeleteAppUserTrustedVariables>): UseDataConnectMutationResult<DeleteAppUserTrustedData, DeleteAppUserTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useDeleteAppUserTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteAppUserTrustedData, FirebaseError, DeleteAppUserTrustedVariables>): UseDataConnectMutationResult<DeleteAppUserTrustedData, DeleteAppUserTrustedVariables>;
```

### Variables
The `DeleteAppUserTrusted` Mutation requires an argument of type `DeleteAppUserTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface DeleteAppUserTrustedVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteAppUserTrusted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteAppUserTrusted` Mutation is of type `DeleteAppUserTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface DeleteAppUserTrustedData {
  appUser_delete?: AppUser_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteAppUserTrusted`'s Mutation hook function

```javascrip
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
```javascrip
useAssignOrganizationLicenseTrusted(options?: useDataConnectMutationOptions<AssignOrganizationLicenseTrustedData, FirebaseError, AssignOrganizationLicenseTrustedVariables>): UseDataConnectMutationResult<AssignOrganizationLicenseTrustedData, AssignOrganizationLicenseTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useAssignOrganizationLicenseTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<AssignOrganizationLicenseTrustedData, FirebaseError, AssignOrganizationLicenseTrustedVariables>): UseDataConnectMutationResult<AssignOrganizationLicenseTrustedData, AssignOrganizationLicenseTrustedVariables>;
```

### Variables
The `AssignOrganizationLicenseTrusted` Mutation requires an argument of type `AssignOrganizationLicenseTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
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
}
```
### Return Type
Recall that calling the `AssignOrganizationLicenseTrusted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AssignOrganizationLicenseTrusted` Mutation is of type `AssignOrganizationLicenseTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface AssignOrganizationLicenseTrustedData {
  organizationLicense_insert: OrganizationLicense_Key;
  licenseHistory_insert: LicenseHistory_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AssignOrganizationLicenseTrusted`'s Mutation hook function

```javascrip
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
  };
  mutation.mutate(assignOrganizationLicenseTrustedVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., organizationId: ..., planId: ..., startDate: ..., expiryDate: ..., negotiatedPrice: ..., currency: ..., historyId: ..., planCode: ..., planName: ..., planLevel: ..., maxStores: ..., maxUsers: ..., });

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
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ChangeOrganizationLicensePlanTrusted
You can execute the `ChangeOrganizationLicensePlanTrusted` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useChangeOrganizationLicensePlanTrusted(options?: useDataConnectMutationOptions<ChangeOrganizationLicensePlanTrustedData, FirebaseError, ChangeOrganizationLicensePlanTrustedVariables>): UseDataConnectMutationResult<ChangeOrganizationLicensePlanTrustedData, ChangeOrganizationLicensePlanTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useChangeOrganizationLicensePlanTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<ChangeOrganizationLicensePlanTrustedData, FirebaseError, ChangeOrganizationLicensePlanTrustedVariables>): UseDataConnectMutationResult<ChangeOrganizationLicensePlanTrustedData, ChangeOrganizationLicensePlanTrustedVariables>;
```

### Variables
The `ChangeOrganizationLicensePlanTrusted` Mutation requires an argument of type `ChangeOrganizationLicensePlanTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
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
  changes?: unknown | null;
}
```
### Return Type
Recall that calling the `ChangeOrganizationLicensePlanTrusted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ChangeOrganizationLicensePlanTrusted` Mutation is of type `ChangeOrganizationLicensePlanTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface ChangeOrganizationLicensePlanTrustedData {
  organizationLicense_update?: OrganizationLicense_Key | null;
  licenseHistory_insert: LicenseHistory_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ChangeOrganizationLicensePlanTrusted`'s Mutation hook function

```javascrip
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
    changes: ..., // optional
  };
  mutation.mutate(changeOrganizationLicensePlanTrustedVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., organizationId: ..., planId: ..., startDate: ..., expiryDate: ..., negotiatedPrice: ..., currency: ..., historyId: ..., planCode: ..., planName: ..., planLevel: ..., maxStores: ..., maxUsers: ..., changes: ..., });

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
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ModifyOrganizationCommercialTermsTrusted
You can execute the `ModifyOrganizationCommercialTermsTrusted` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useModifyOrganizationCommercialTermsTrusted(options?: useDataConnectMutationOptions<ModifyOrganizationCommercialTermsTrustedData, FirebaseError, ModifyOrganizationCommercialTermsTrustedVariables>): UseDataConnectMutationResult<ModifyOrganizationCommercialTermsTrustedData, ModifyOrganizationCommercialTermsTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useModifyOrganizationCommercialTermsTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<ModifyOrganizationCommercialTermsTrustedData, FirebaseError, ModifyOrganizationCommercialTermsTrustedVariables>): UseDataConnectMutationResult<ModifyOrganizationCommercialTermsTrustedData, ModifyOrganizationCommercialTermsTrustedVariables>;
```

### Variables
The `ModifyOrganizationCommercialTermsTrusted` Mutation requires an argument of type `ModifyOrganizationCommercialTermsTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
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
  changes?: unknown | null;
}
```
### Return Type
Recall that calling the `ModifyOrganizationCommercialTermsTrusted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ModifyOrganizationCommercialTermsTrusted` Mutation is of type `ModifyOrganizationCommercialTermsTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface ModifyOrganizationCommercialTermsTrustedData {
  organizationLicense_update?: OrganizationLicense_Key | null;
  licenseHistory_insert: LicenseHistory_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ModifyOrganizationCommercialTermsTrusted`'s Mutation hook function

```javascrip
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
    changes: ..., // optional
  };
  mutation.mutate(modifyOrganizationCommercialTermsTrustedVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., organizationId: ..., planId: ..., startDate: ..., expiryDate: ..., negotiatedPrice: ..., currency: ..., historyId: ..., planCode: ..., planName: ..., planLevel: ..., maxStores: ..., maxUsers: ..., changes: ..., });

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
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## RenewOrganizationLicenseTrusted
You can execute the `RenewOrganizationLicenseTrusted` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useRenewOrganizationLicenseTrusted(options?: useDataConnectMutationOptions<RenewOrganizationLicenseTrustedData, FirebaseError, RenewOrganizationLicenseTrustedVariables>): UseDataConnectMutationResult<RenewOrganizationLicenseTrustedData, RenewOrganizationLicenseTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useRenewOrganizationLicenseTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<RenewOrganizationLicenseTrustedData, FirebaseError, RenewOrganizationLicenseTrustedVariables>): UseDataConnectMutationResult<RenewOrganizationLicenseTrustedData, RenewOrganizationLicenseTrustedVariables>;
```

### Variables
The `RenewOrganizationLicenseTrusted` Mutation requires an argument of type `RenewOrganizationLicenseTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
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
  changes?: unknown | null;
}
```
### Return Type
Recall that calling the `RenewOrganizationLicenseTrusted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `RenewOrganizationLicenseTrusted` Mutation is of type `RenewOrganizationLicenseTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface RenewOrganizationLicenseTrustedData {
  organizationLicense_update?: OrganizationLicense_Key | null;
  licenseHistory_insert: LicenseHistory_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `RenewOrganizationLicenseTrusted`'s Mutation hook function

```javascrip
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
    changes: ..., // optional
  };
  mutation.mutate(renewOrganizationLicenseTrustedVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., organizationId: ..., planId: ..., startDate: ..., expiryDate: ..., negotiatedPrice: ..., currency: ..., historyId: ..., planCode: ..., planName: ..., planLevel: ..., maxStores: ..., maxUsers: ..., changes: ..., });

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
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateOrganization
You can execute the `CreateOrganization` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useCreateOrganization(options?: useDataConnectMutationOptions<CreateOrganizationData, FirebaseError, CreateOrganizationVariables>): UseDataConnectMutationResult<CreateOrganizationData, CreateOrganizationVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useCreateOrganization(dc: DataConnect, options?: useDataConnectMutationOptions<CreateOrganizationData, FirebaseError, CreateOrganizationVariables>): UseDataConnectMutationResult<CreateOrganizationData, CreateOrganizationVariables>;
```

### Variables
The `CreateOrganization` Mutation requires an argument of type `CreateOrganizationVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
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
}
```
### Return Type
Recall that calling the `CreateOrganization` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateOrganization` Mutation is of type `CreateOrganizationData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface CreateOrganizationData {
  organization_insert: Organization_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateOrganization`'s Mutation hook function

```javascrip
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
  };
  mutation.mutate(createOrganizationVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., organizationCode: ..., businessName: ..., legalEntityName: ..., taxId: ..., primaryContactName: ..., email: ..., phone: ..., address: ..., city: ..., state: ..., postalCode: ..., timezone: ..., currency: ..., });

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
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateOrganization
You can execute the `UpdateOrganization` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useUpdateOrganization(options?: useDataConnectMutationOptions<UpdateOrganizationData, FirebaseError, UpdateOrganizationVariables>): UseDataConnectMutationResult<UpdateOrganizationData, UpdateOrganizationVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useUpdateOrganization(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateOrganizationData, FirebaseError, UpdateOrganizationVariables>): UseDataConnectMutationResult<UpdateOrganizationData, UpdateOrganizationVariables>;
```

### Variables
The `UpdateOrganization` Mutation requires an argument of type `UpdateOrganizationVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
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
}
```
### Return Type
Recall that calling the `UpdateOrganization` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateOrganization` Mutation is of type `UpdateOrganizationData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface UpdateOrganizationData {
  organization_update?: Organization_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateOrganization`'s Mutation hook function

```javascrip
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
  };
  mutation.mutate(updateOrganizationVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., businessName: ..., legalEntityName: ..., taxId: ..., primaryContactName: ..., email: ..., phone: ..., address: ..., city: ..., state: ..., postalCode: ..., timezone: ..., currency: ..., });

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
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ChangeOrganizationStatus
You can execute the `ChangeOrganizationStatus` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useChangeOrganizationStatus(options?: useDataConnectMutationOptions<ChangeOrganizationStatusData, FirebaseError, ChangeOrganizationStatusVariables>): UseDataConnectMutationResult<ChangeOrganizationStatusData, ChangeOrganizationStatusVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useChangeOrganizationStatus(dc: DataConnect, options?: useDataConnectMutationOptions<ChangeOrganizationStatusData, FirebaseError, ChangeOrganizationStatusVariables>): UseDataConnectMutationResult<ChangeOrganizationStatusData, ChangeOrganizationStatusVariables>;
```

### Variables
The `ChangeOrganizationStatus` Mutation requires an argument of type `ChangeOrganizationStatusVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface ChangeOrganizationStatusVariables {
  id: UUIDString;
  status: OrganizationStatus;
}
```
### Return Type
Recall that calling the `ChangeOrganizationStatus` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ChangeOrganizationStatus` Mutation is of type `ChangeOrganizationStatusData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface ChangeOrganizationStatusData {
  organization_update?: Organization_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ChangeOrganizationStatus`'s Mutation hook function

```javascrip
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
  };
  mutation.mutate(changeOrganizationStatusVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., status: ..., });

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
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateTenantExpense
You can execute the `CreateTenantExpense` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useCreateTenantExpense(options?: useDataConnectMutationOptions<CreateTenantExpenseData, FirebaseError, CreateTenantExpenseVariables>): UseDataConnectMutationResult<CreateTenantExpenseData, CreateTenantExpenseVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useCreateTenantExpense(dc: DataConnect, options?: useDataConnectMutationOptions<CreateTenantExpenseData, FirebaseError, CreateTenantExpenseVariables>): UseDataConnectMutationResult<CreateTenantExpenseData, CreateTenantExpenseVariables>;
```

### Variables
The `CreateTenantExpense` Mutation requires an argument of type `CreateTenantExpenseVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
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
}
```
### Return Type
Recall that calling the `CreateTenantExpense` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateTenantExpense` Mutation is of type `CreateTenantExpenseData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface CreateTenantExpenseData {
  expense_insert: Expense_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateTenantExpense`'s Mutation hook function

```javascrip
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
  };
  mutation.mutate(createTenantExpenseVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., expenseNumber: ..., expenseDate: ..., category: ..., description: ..., reference: ..., vendorName: ..., outletId: ..., scope: ..., baseAmount: ..., taxAmount: ..., amount: ..., paymentMethod: ..., paidByEmployee: ..., submittedBy: ..., notes: ..., });

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
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateTenantExpense
You can execute the `UpdateTenantExpense` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useUpdateTenantExpense(options?: useDataConnectMutationOptions<UpdateTenantExpenseData, FirebaseError, UpdateTenantExpenseVariables>): UseDataConnectMutationResult<UpdateTenantExpenseData, UpdateTenantExpenseVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useUpdateTenantExpense(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateTenantExpenseData, FirebaseError, UpdateTenantExpenseVariables>): UseDataConnectMutationResult<UpdateTenantExpenseData, UpdateTenantExpenseVariables>;
```

### Variables
The `UpdateTenantExpense` Mutation requires an argument of type `UpdateTenantExpenseVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
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
}
```
### Return Type
Recall that calling the `UpdateTenantExpense` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateTenantExpense` Mutation is of type `UpdateTenantExpenseData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface UpdateTenantExpenseData {
  expense_update?: Expense_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateTenantExpense`'s Mutation hook function

```javascrip
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
  };
  mutation.mutate(updateTenantExpenseVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., id: ..., expenseDate: ..., category: ..., description: ..., reference: ..., vendorName: ..., scope: ..., baseAmount: ..., taxAmount: ..., amount: ..., paymentMethod: ..., paidByEmployee: ..., notes: ..., });

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
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ChangeTenantExpenseApproval
You can execute the `ChangeTenantExpenseApproval` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useChangeTenantExpenseApproval(options?: useDataConnectMutationOptions<ChangeTenantExpenseApprovalData, FirebaseError, ChangeTenantExpenseApprovalVariables>): UseDataConnectMutationResult<ChangeTenantExpenseApprovalData, ChangeTenantExpenseApprovalVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useChangeTenantExpenseApproval(dc: DataConnect, options?: useDataConnectMutationOptions<ChangeTenantExpenseApprovalData, FirebaseError, ChangeTenantExpenseApprovalVariables>): UseDataConnectMutationResult<ChangeTenantExpenseApprovalData, ChangeTenantExpenseApprovalVariables>;
```

### Variables
The `ChangeTenantExpenseApproval` Mutation requires an argument of type `ChangeTenantExpenseApprovalVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface ChangeTenantExpenseApprovalVariables {
  organizationId: UUIDString;
  id: UUIDString;
  approvalStatus: ExpenseApprovalStatus;
  reason?: string | null;
}
```
### Return Type
Recall that calling the `ChangeTenantExpenseApproval` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ChangeTenantExpenseApproval` Mutation is of type `ChangeTenantExpenseApprovalData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface ChangeTenantExpenseApprovalData {
  expense_update?: Expense_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ChangeTenantExpenseApproval`'s Mutation hook function

```javascrip
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
  };
  mutation.mutate(changeTenantExpenseApprovalVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., id: ..., approvalStatus: ..., reason: ..., });

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
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## VoidTenantExpense
You can execute the `VoidTenantExpense` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useVoidTenantExpense(options?: useDataConnectMutationOptions<VoidTenantExpenseData, FirebaseError, VoidTenantExpenseVariables>): UseDataConnectMutationResult<VoidTenantExpenseData, VoidTenantExpenseVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useVoidTenantExpense(dc: DataConnect, options?: useDataConnectMutationOptions<VoidTenantExpenseData, FirebaseError, VoidTenantExpenseVariables>): UseDataConnectMutationResult<VoidTenantExpenseData, VoidTenantExpenseVariables>;
```

### Variables
The `VoidTenantExpense` Mutation requires an argument of type `VoidTenantExpenseVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface VoidTenantExpenseVariables {
  organizationId: UUIDString;
  id: UUIDString;
  reason: string;
}
```
### Return Type
Recall that calling the `VoidTenantExpense` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `VoidTenantExpense` Mutation is of type `VoidTenantExpenseData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface VoidTenantExpenseData {
  expense_update?: Expense_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `VoidTenantExpense`'s Mutation hook function

```javascrip
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
  };
  mutation.mutate(voidTenantExpenseVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., id: ..., reason: ..., });

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
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateTenantSale
You can execute the `CreateTenantSale` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useCreateTenantSale(options?: useDataConnectMutationOptions<CreateTenantSaleData, FirebaseError, CreateTenantSaleVariables>): UseDataConnectMutationResult<CreateTenantSaleData, CreateTenantSaleVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useCreateTenantSale(dc: DataConnect, options?: useDataConnectMutationOptions<CreateTenantSaleData, FirebaseError, CreateTenantSaleVariables>): UseDataConnectMutationResult<CreateTenantSaleData, CreateTenantSaleVariables>;
```

### Variables
The `CreateTenantSale` Mutation requires an argument of type `CreateTenantSaleVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
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
}
```
### Return Type
Recall that calling the `CreateTenantSale` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateTenantSale` Mutation is of type `CreateTenantSaleData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface CreateTenantSaleData {
  sale_insert: Sale_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateTenantSale`'s Mutation hook function

```javascrip
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
  };
  mutation.mutate(createTenantSaleVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., outletId: ..., receiptNumber: ..., saleTimestamp: ..., customerId: ..., customerName: ..., staffName: ..., channel: ..., terminalId: ..., tenderType: ..., tax: ..., discount: ..., subtotal: ..., totalNet: ..., });

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
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AddTenantSaleLine
You can execute the `AddTenantSaleLine` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useAddTenantSaleLine(options?: useDataConnectMutationOptions<AddTenantSaleLineData, FirebaseError, AddTenantSaleLineVariables>): UseDataConnectMutationResult<AddTenantSaleLineData, AddTenantSaleLineVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useAddTenantSaleLine(dc: DataConnect, options?: useDataConnectMutationOptions<AddTenantSaleLineData, FirebaseError, AddTenantSaleLineVariables>): UseDataConnectMutationResult<AddTenantSaleLineData, AddTenantSaleLineVariables>;
```

### Variables
The `AddTenantSaleLine` Mutation requires an argument of type `AddTenantSaleLineVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface AddTenantSaleLineVariables {
  organizationId: UUIDString;
  saleId: UUIDString;
  outletId: UUIDString;
  productId: UUIDString;
  quantity: number;
  newStockQty: number;
  unitPrice: number;
  subtotal: number;
}
```
### Return Type
Recall that calling the `AddTenantSaleLine` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AddTenantSaleLine` Mutation is of type `AddTenantSaleLineData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface AddTenantSaleLineData {
  saleLine_insert: SaleLine_Key;
  inventoryStock_update?: InventoryStock_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AddTenantSaleLine`'s Mutation hook function

```javascrip
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
  };
  mutation.mutate(addTenantSaleLineVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., saleId: ..., outletId: ..., productId: ..., quantity: ..., newStockQty: ..., unitPrice: ..., subtotal: ..., });

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
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## VoidTenantSale
You can execute the `VoidTenantSale` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useVoidTenantSale(options?: useDataConnectMutationOptions<VoidTenantSaleData, FirebaseError, VoidTenantSaleVariables>): UseDataConnectMutationResult<VoidTenantSaleData, VoidTenantSaleVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useVoidTenantSale(dc: DataConnect, options?: useDataConnectMutationOptions<VoidTenantSaleData, FirebaseError, VoidTenantSaleVariables>): UseDataConnectMutationResult<VoidTenantSaleData, VoidTenantSaleVariables>;
```

### Variables
The `VoidTenantSale` Mutation requires an argument of type `VoidTenantSaleVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface VoidTenantSaleVariables {
  organizationId: UUIDString;
  saleId: UUIDString;
  reason: string;
}
```
### Return Type
Recall that calling the `VoidTenantSale` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `VoidTenantSale` Mutation is of type `VoidTenantSaleData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface VoidTenantSaleData {
  sale_update?: Sale_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `VoidTenantSale`'s Mutation hook function

```javascrip
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
  };
  mutation.mutate(voidTenantSaleVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., saleId: ..., reason: ..., });

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
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateTenantPurchase
You can execute the `CreateTenantPurchase` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useCreateTenantPurchase(options?: useDataConnectMutationOptions<CreateTenantPurchaseData, FirebaseError, CreateTenantPurchaseVariables>): UseDataConnectMutationResult<CreateTenantPurchaseData, CreateTenantPurchaseVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useCreateTenantPurchase(dc: DataConnect, options?: useDataConnectMutationOptions<CreateTenantPurchaseData, FirebaseError, CreateTenantPurchaseVariables>): UseDataConnectMutationResult<CreateTenantPurchaseData, CreateTenantPurchaseVariables>;
```

### Variables
The `CreateTenantPurchase` Mutation requires an argument of type `CreateTenantPurchaseVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
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
}
```
### Return Type
Recall that calling the `CreateTenantPurchase` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateTenantPurchase` Mutation is of type `CreateTenantPurchaseData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface CreateTenantPurchaseData {
  purchase_insert: Purchase_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateTenantPurchase`'s Mutation hook function

```javascrip
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
  };
  mutation.mutate(createTenantPurchaseVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., purchaseNumber: ..., purchaseDate: ..., supplierId: ..., outletId: ..., scope: ..., paymentTerms: ..., subtotal: ..., shippingFee: ..., handlingFee: ..., tax: ..., totalAmount: ..., amountPaid: ..., outstandingAmount: ..., paymentStatus: ..., receiptStatus: ..., status: ..., createdBy: ..., });

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
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateTenantPurchaseLine
You can execute the `CreateTenantPurchaseLine` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useCreateTenantPurchaseLine(options?: useDataConnectMutationOptions<CreateTenantPurchaseLineData, FirebaseError, CreateTenantPurchaseLineVariables>): UseDataConnectMutationResult<CreateTenantPurchaseLineData, CreateTenantPurchaseLineVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useCreateTenantPurchaseLine(dc: DataConnect, options?: useDataConnectMutationOptions<CreateTenantPurchaseLineData, FirebaseError, CreateTenantPurchaseLineVariables>): UseDataConnectMutationResult<CreateTenantPurchaseLineData, CreateTenantPurchaseLineVariables>;
```

### Variables
The `CreateTenantPurchaseLine` Mutation requires an argument of type `CreateTenantPurchaseLineVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
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
}
```
### Return Type
Recall that calling the `CreateTenantPurchaseLine` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateTenantPurchaseLine` Mutation is of type `CreateTenantPurchaseLineData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface CreateTenantPurchaseLineData {
  purchaseLine_insert: PurchaseLine_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateTenantPurchaseLine`'s Mutation hook function

```javascrip
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
  };
  mutation.mutate(createTenantPurchaseLineVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., purchaseId: ..., productId: ..., quantityOrdered: ..., unitCost: ..., discountPercent: ..., taxRate: ..., taxAmount: ..., lineTotal: ..., });

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
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ChangeTenantPurchaseStatus
You can execute the `ChangeTenantPurchaseStatus` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useChangeTenantPurchaseStatus(options?: useDataConnectMutationOptions<ChangeTenantPurchaseStatusData, FirebaseError, ChangeTenantPurchaseStatusVariables>): UseDataConnectMutationResult<ChangeTenantPurchaseStatusData, ChangeTenantPurchaseStatusVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useChangeTenantPurchaseStatus(dc: DataConnect, options?: useDataConnectMutationOptions<ChangeTenantPurchaseStatusData, FirebaseError, ChangeTenantPurchaseStatusVariables>): UseDataConnectMutationResult<ChangeTenantPurchaseStatusData, ChangeTenantPurchaseStatusVariables>;
```

### Variables
The `ChangeTenantPurchaseStatus` Mutation requires an argument of type `ChangeTenantPurchaseStatusVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface ChangeTenantPurchaseStatusVariables {
  organizationId: UUIDString;
  id: UUIDString;
  status: PurchaseStatus;
  reason?: string | null;
}
```
### Return Type
Recall that calling the `ChangeTenantPurchaseStatus` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ChangeTenantPurchaseStatus` Mutation is of type `ChangeTenantPurchaseStatusData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface ChangeTenantPurchaseStatusData {
  purchase_update?: Purchase_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ChangeTenantPurchaseStatus`'s Mutation hook function

```javascrip
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
  };
  mutation.mutate(changeTenantPurchaseStatusVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., id: ..., status: ..., reason: ..., });

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
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ReceiveTenantPurchaseLine
You can execute the `ReceiveTenantPurchaseLine` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useReceiveTenantPurchaseLine(options?: useDataConnectMutationOptions<ReceiveTenantPurchaseLineData, FirebaseError, ReceiveTenantPurchaseLineVariables>): UseDataConnectMutationResult<ReceiveTenantPurchaseLineData, ReceiveTenantPurchaseLineVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useReceiveTenantPurchaseLine(dc: DataConnect, options?: useDataConnectMutationOptions<ReceiveTenantPurchaseLineData, FirebaseError, ReceiveTenantPurchaseLineVariables>): UseDataConnectMutationResult<ReceiveTenantPurchaseLineData, ReceiveTenantPurchaseLineVariables>;
```

### Variables
The `ReceiveTenantPurchaseLine` Mutation requires an argument of type `ReceiveTenantPurchaseLineVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
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
}
```
### Return Type
Recall that calling the `ReceiveTenantPurchaseLine` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ReceiveTenantPurchaseLine` Mutation is of type `ReceiveTenantPurchaseLineData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface ReceiveTenantPurchaseLineData {
  purchaseLine_update?: PurchaseLine_Key | null;
  purchase_update?: Purchase_Key | null;
  inventoryStock_update?: InventoryStock_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ReceiveTenantPurchaseLine`'s Mutation hook function

```javascrip
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
  };
  mutation.mutate(receiveTenantPurchaseLineVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., purchaseId: ..., lineId: ..., outletId: ..., productId: ..., quantityReceived: ..., newStockQty: ..., receiptStatus: ..., batchNumber: ..., mfgDate: ..., expiryDate: ..., });

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
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateTenantSupplier
You can execute the `CreateTenantSupplier` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useCreateTenantSupplier(options?: useDataConnectMutationOptions<CreateTenantSupplierData, FirebaseError, CreateTenantSupplierVariables>): UseDataConnectMutationResult<CreateTenantSupplierData, CreateTenantSupplierVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useCreateTenantSupplier(dc: DataConnect, options?: useDataConnectMutationOptions<CreateTenantSupplierData, FirebaseError, CreateTenantSupplierVariables>): UseDataConnectMutationResult<CreateTenantSupplierData, CreateTenantSupplierVariables>;
```

### Variables
The `CreateTenantSupplier` Mutation requires an argument of type `CreateTenantSupplierVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface CreateTenantSupplierVariables {
  id: UUIDString;
  organizationId: UUIDString;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  taxId?: string | null;
  address?: string | null;
  category: string;
  paymentTerms: string;
  creditLimit: number;
  notes?: string | null;
}
```
### Return Type
Recall that calling the `CreateTenantSupplier` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateTenantSupplier` Mutation is of type `CreateTenantSupplierData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface CreateTenantSupplierData {
  supplier_insert: Supplier_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateTenantSupplier`'s Mutation hook function

```javascrip
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
    id: ...,
    organizationId: ...,
    name: ...,
    contactPerson: ...,
    phone: ...,
    email: ...,
    taxId: ..., // optional
    address: ..., // optional
    category: ...,
    paymentTerms: ...,
    creditLimit: ...,
    notes: ..., // optional
  };
  mutation.mutate(createTenantSupplierVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., organizationId: ..., name: ..., contactPerson: ..., phone: ..., email: ..., taxId: ..., address: ..., category: ..., paymentTerms: ..., creditLimit: ..., notes: ..., });

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
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateTenantSupplier
You can execute the `UpdateTenantSupplier` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useUpdateTenantSupplier(options?: useDataConnectMutationOptions<UpdateTenantSupplierData, FirebaseError, UpdateTenantSupplierVariables>): UseDataConnectMutationResult<UpdateTenantSupplierData, UpdateTenantSupplierVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useUpdateTenantSupplier(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateTenantSupplierData, FirebaseError, UpdateTenantSupplierVariables>): UseDataConnectMutationResult<UpdateTenantSupplierData, UpdateTenantSupplierVariables>;
```

### Variables
The `UpdateTenantSupplier` Mutation requires an argument of type `UpdateTenantSupplierVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface UpdateTenantSupplierVariables {
  organizationId: UUIDString;
  id: UUIDString;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  taxId?: string | null;
  address?: string | null;
  category: string;
  paymentTerms: string;
  creditLimit: number;
  notes?: string | null;
}
```
### Return Type
Recall that calling the `UpdateTenantSupplier` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateTenantSupplier` Mutation is of type `UpdateTenantSupplierData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface UpdateTenantSupplierData {
  supplier_update?: Supplier_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateTenantSupplier`'s Mutation hook function

```javascrip
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
    taxId: ..., // optional
    address: ..., // optional
    category: ...,
    paymentTerms: ...,
    creditLimit: ...,
    notes: ..., // optional
  };
  mutation.mutate(updateTenantSupplierVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., id: ..., name: ..., contactPerson: ..., phone: ..., email: ..., taxId: ..., address: ..., category: ..., paymentTerms: ..., creditLimit: ..., notes: ..., });

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
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ChangeTenantSupplierStatus
You can execute the `ChangeTenantSupplierStatus` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useChangeTenantSupplierStatus(options?: useDataConnectMutationOptions<ChangeTenantSupplierStatusData, FirebaseError, ChangeTenantSupplierStatusVariables>): UseDataConnectMutationResult<ChangeTenantSupplierStatusData, ChangeTenantSupplierStatusVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useChangeTenantSupplierStatus(dc: DataConnect, options?: useDataConnectMutationOptions<ChangeTenantSupplierStatusData, FirebaseError, ChangeTenantSupplierStatusVariables>): UseDataConnectMutationResult<ChangeTenantSupplierStatusData, ChangeTenantSupplierStatusVariables>;
```

### Variables
The `ChangeTenantSupplierStatus` Mutation requires an argument of type `ChangeTenantSupplierStatusVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface ChangeTenantSupplierStatusVariables {
  organizationId: UUIDString;
  id: UUIDString;
  status: SupplierStatus;
}
```
### Return Type
Recall that calling the `ChangeTenantSupplierStatus` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ChangeTenantSupplierStatus` Mutation is of type `ChangeTenantSupplierStatusData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface ChangeTenantSupplierStatusData {
  supplier_update?: Supplier_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ChangeTenantSupplierStatus`'s Mutation hook function

```javascrip
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
  };
  mutation.mutate(changeTenantSupplierStatusVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., id: ..., status: ..., });

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
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateTenantCustomer
You can execute the `CreateTenantCustomer` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useCreateTenantCustomer(options?: useDataConnectMutationOptions<CreateTenantCustomerData, FirebaseError, CreateTenantCustomerVariables>): UseDataConnectMutationResult<CreateTenantCustomerData, CreateTenantCustomerVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useCreateTenantCustomer(dc: DataConnect, options?: useDataConnectMutationOptions<CreateTenantCustomerData, FirebaseError, CreateTenantCustomerVariables>): UseDataConnectMutationResult<CreateTenantCustomerData, CreateTenantCustomerVariables>;
```

### Variables
The `CreateTenantCustomer` Mutation requires an argument of type `CreateTenantCustomerVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface CreateTenantCustomerVariables {
  id: UUIDString;
  organizationId: UUIDString;
  type: CustomerType;
  name: string;
  phone: string;
  email?: string | null;
  taxId?: string | null;
  documentType?: string | null;
  documentValue?: string | null;
  address?: string | null;
  creditLimit?: number | null;
  preferredContact?: string | null;
  dateOfBirth?: DateString | null;
  gender?: string | null;
  notes?: string | null;
}
```
### Return Type
Recall that calling the `CreateTenantCustomer` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateTenantCustomer` Mutation is of type `CreateTenantCustomerData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface CreateTenantCustomerData {
  customer_insert: Customer_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateTenantCustomer`'s Mutation hook function

```javascrip
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
    id: ...,
    organizationId: ...,
    type: ...,
    name: ...,
    phone: ...,
    email: ..., // optional
    taxId: ..., // optional
    documentType: ..., // optional
    documentValue: ..., // optional
    address: ..., // optional
    creditLimit: ..., // optional
    preferredContact: ..., // optional
    dateOfBirth: ..., // optional
    gender: ..., // optional
    notes: ..., // optional
  };
  mutation.mutate(createTenantCustomerVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., organizationId: ..., type: ..., name: ..., phone: ..., email: ..., taxId: ..., documentType: ..., documentValue: ..., address: ..., creditLimit: ..., preferredContact: ..., dateOfBirth: ..., gender: ..., notes: ..., });

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
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateTenantCustomer
You can execute the `UpdateTenantCustomer` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useUpdateTenantCustomer(options?: useDataConnectMutationOptions<UpdateTenantCustomerData, FirebaseError, UpdateTenantCustomerVariables>): UseDataConnectMutationResult<UpdateTenantCustomerData, UpdateTenantCustomerVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useUpdateTenantCustomer(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateTenantCustomerData, FirebaseError, UpdateTenantCustomerVariables>): UseDataConnectMutationResult<UpdateTenantCustomerData, UpdateTenantCustomerVariables>;
```

### Variables
The `UpdateTenantCustomer` Mutation requires an argument of type `UpdateTenantCustomerVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface UpdateTenantCustomerVariables {
  organizationId: UUIDString;
  id: UUIDString;
  type: CustomerType;
  name: string;
  phone: string;
  email?: string | null;
  taxId?: string | null;
  documentType?: string | null;
  documentValue?: string | null;
  address?: string | null;
  creditLimit?: number | null;
  preferredContact?: string | null;
  dateOfBirth?: DateString | null;
  gender?: string | null;
  notes?: string | null;
}
```
### Return Type
Recall that calling the `UpdateTenantCustomer` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateTenantCustomer` Mutation is of type `UpdateTenantCustomerData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface UpdateTenantCustomerData {
  customer_update?: Customer_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateTenantCustomer`'s Mutation hook function

```javascrip
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
    email: ..., // optional
    taxId: ..., // optional
    documentType: ..., // optional
    documentValue: ..., // optional
    address: ..., // optional
    creditLimit: ..., // optional
    preferredContact: ..., // optional
    dateOfBirth: ..., // optional
    gender: ..., // optional
    notes: ..., // optional
  };
  mutation.mutate(updateTenantCustomerVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., id: ..., type: ..., name: ..., phone: ..., email: ..., taxId: ..., documentType: ..., documentValue: ..., address: ..., creditLimit: ..., preferredContact: ..., dateOfBirth: ..., gender: ..., notes: ..., });

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
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ChangeTenantCustomerStatus
You can execute the `ChangeTenantCustomerStatus` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useChangeTenantCustomerStatus(options?: useDataConnectMutationOptions<ChangeTenantCustomerStatusData, FirebaseError, ChangeTenantCustomerStatusVariables>): UseDataConnectMutationResult<ChangeTenantCustomerStatusData, ChangeTenantCustomerStatusVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useChangeTenantCustomerStatus(dc: DataConnect, options?: useDataConnectMutationOptions<ChangeTenantCustomerStatusData, FirebaseError, ChangeTenantCustomerStatusVariables>): UseDataConnectMutationResult<ChangeTenantCustomerStatusData, ChangeTenantCustomerStatusVariables>;
```

### Variables
The `ChangeTenantCustomerStatus` Mutation requires an argument of type `ChangeTenantCustomerStatusVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface ChangeTenantCustomerStatusVariables {
  organizationId: UUIDString;
  id: UUIDString;
  status: CustomerStatus;
}
```
### Return Type
Recall that calling the `ChangeTenantCustomerStatus` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ChangeTenantCustomerStatus` Mutation is of type `ChangeTenantCustomerStatusData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface ChangeTenantCustomerStatusData {
  customer_update?: Customer_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ChangeTenantCustomerStatus`'s Mutation hook function

```javascrip
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
  };
  mutation.mutate(changeTenantCustomerStatusVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., id: ..., status: ..., });

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
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateTenantCategoryTrusted
You can execute the `CreateTenantCategoryTrusted` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useCreateTenantCategoryTrusted(options?: useDataConnectMutationOptions<CreateTenantCategoryTrustedData, FirebaseError, CreateTenantCategoryTrustedVariables>): UseDataConnectMutationResult<CreateTenantCategoryTrustedData, CreateTenantCategoryTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useCreateTenantCategoryTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<CreateTenantCategoryTrustedData, FirebaseError, CreateTenantCategoryTrustedVariables>): UseDataConnectMutationResult<CreateTenantCategoryTrustedData, CreateTenantCategoryTrustedVariables>;
```

### Variables
The `CreateTenantCategoryTrusted` Mutation requires an argument of type `CreateTenantCategoryTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface CreateTenantCategoryTrustedVariables {
  id: UUIDString;
  organizationId: UUIDString;
  value: string;
}
```
### Return Type
Recall that calling the `CreateTenantCategoryTrusted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateTenantCategoryTrusted` Mutation is of type `CreateTenantCategoryTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface CreateTenantCategoryTrustedData {
  category_insert: Category_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateTenantCategoryTrusted`'s Mutation hook function

```javascrip
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateTenantCategoryTrustedVariables } from '@omniretail/sql-connect';
import { useCreateTenantCategoryTrusted } from '@omniretail/sql-connect/react'

export default function CreateTenantCategoryTrustedComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateTenantCategoryTrusted();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateTenantCategoryTrusted(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateTenantCategoryTrusted(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateTenantCategoryTrusted(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateTenantCategoryTrusted` Mutation requires an argument of type `CreateTenantCategoryTrustedVariables`:
  const createTenantCategoryTrustedVars: CreateTenantCategoryTrustedVariables = {
    id: ...,
    organizationId: ...,
    value: ...,
  };
  mutation.mutate(createTenantCategoryTrustedVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., organizationId: ..., value: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createTenantCategoryTrustedVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.category_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateTenantSubcategoryTrusted
You can execute the `CreateTenantSubcategoryTrusted` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useCreateTenantSubcategoryTrusted(options?: useDataConnectMutationOptions<CreateTenantSubcategoryTrustedData, FirebaseError, CreateTenantSubcategoryTrustedVariables>): UseDataConnectMutationResult<CreateTenantSubcategoryTrustedData, CreateTenantSubcategoryTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useCreateTenantSubcategoryTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<CreateTenantSubcategoryTrustedData, FirebaseError, CreateTenantSubcategoryTrustedVariables>): UseDataConnectMutationResult<CreateTenantSubcategoryTrustedData, CreateTenantSubcategoryTrustedVariables>;
```

### Variables
The `CreateTenantSubcategoryTrusted` Mutation requires an argument of type `CreateTenantSubcategoryTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface CreateTenantSubcategoryTrustedVariables {
  id: UUIDString;
  organizationId: UUIDString;
  categoryId: UUIDString;
  value: string;
}
```
### Return Type
Recall that calling the `CreateTenantSubcategoryTrusted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateTenantSubcategoryTrusted` Mutation is of type `CreateTenantSubcategoryTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface CreateTenantSubcategoryTrustedData {
  subcategory_insert: Subcategory_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateTenantSubcategoryTrusted`'s Mutation hook function

```javascrip
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateTenantSubcategoryTrustedVariables } from '@omniretail/sql-connect';
import { useCreateTenantSubcategoryTrusted } from '@omniretail/sql-connect/react'

export default function CreateTenantSubcategoryTrustedComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateTenantSubcategoryTrusted();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateTenantSubcategoryTrusted(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateTenantSubcategoryTrusted(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateTenantSubcategoryTrusted(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateTenantSubcategoryTrusted` Mutation requires an argument of type `CreateTenantSubcategoryTrustedVariables`:
  const createTenantSubcategoryTrustedVars: CreateTenantSubcategoryTrustedVariables = {
    id: ...,
    organizationId: ...,
    categoryId: ...,
    value: ...,
  };
  mutation.mutate(createTenantSubcategoryTrustedVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., organizationId: ..., categoryId: ..., value: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createTenantSubcategoryTrustedVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.subcategory_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateTenantCategoryTrusted
You can execute the `UpdateTenantCategoryTrusted` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useUpdateTenantCategoryTrusted(options?: useDataConnectMutationOptions<UpdateTenantCategoryTrustedData, FirebaseError, UpdateTenantCategoryTrustedVariables>): UseDataConnectMutationResult<UpdateTenantCategoryTrustedData, UpdateTenantCategoryTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useUpdateTenantCategoryTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateTenantCategoryTrustedData, FirebaseError, UpdateTenantCategoryTrustedVariables>): UseDataConnectMutationResult<UpdateTenantCategoryTrustedData, UpdateTenantCategoryTrustedVariables>;
```

### Variables
The `UpdateTenantCategoryTrusted` Mutation requires an argument of type `UpdateTenantCategoryTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface UpdateTenantCategoryTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
  value: string;
}
```
### Return Type
Recall that calling the `UpdateTenantCategoryTrusted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateTenantCategoryTrusted` Mutation is of type `UpdateTenantCategoryTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface UpdateTenantCategoryTrustedData {
  category_update?: Category_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateTenantCategoryTrusted`'s Mutation hook function

```javascrip
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateTenantCategoryTrustedVariables } from '@omniretail/sql-connect';
import { useUpdateTenantCategoryTrusted } from '@omniretail/sql-connect/react'

export default function UpdateTenantCategoryTrustedComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateTenantCategoryTrusted();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateTenantCategoryTrusted(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateTenantCategoryTrusted(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateTenantCategoryTrusted(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateTenantCategoryTrusted` Mutation requires an argument of type `UpdateTenantCategoryTrustedVariables`:
  const updateTenantCategoryTrustedVars: UpdateTenantCategoryTrustedVariables = {
    organizationId: ...,
    id: ...,
    value: ...,
  };
  mutation.mutate(updateTenantCategoryTrustedVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., id: ..., value: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateTenantCategoryTrustedVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.category_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateTenantSubcategoryTrusted
You can execute the `UpdateTenantSubcategoryTrusted` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useUpdateTenantSubcategoryTrusted(options?: useDataConnectMutationOptions<UpdateTenantSubcategoryTrustedData, FirebaseError, UpdateTenantSubcategoryTrustedVariables>): UseDataConnectMutationResult<UpdateTenantSubcategoryTrustedData, UpdateTenantSubcategoryTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useUpdateTenantSubcategoryTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateTenantSubcategoryTrustedData, FirebaseError, UpdateTenantSubcategoryTrustedVariables>): UseDataConnectMutationResult<UpdateTenantSubcategoryTrustedData, UpdateTenantSubcategoryTrustedVariables>;
```

### Variables
The `UpdateTenantSubcategoryTrusted` Mutation requires an argument of type `UpdateTenantSubcategoryTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface UpdateTenantSubcategoryTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
  value: string;
}
```
### Return Type
Recall that calling the `UpdateTenantSubcategoryTrusted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateTenantSubcategoryTrusted` Mutation is of type `UpdateTenantSubcategoryTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface UpdateTenantSubcategoryTrustedData {
  subcategory_update?: Subcategory_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateTenantSubcategoryTrusted`'s Mutation hook function

```javascrip
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateTenantSubcategoryTrustedVariables } from '@omniretail/sql-connect';
import { useUpdateTenantSubcategoryTrusted } from '@omniretail/sql-connect/react'

export default function UpdateTenantSubcategoryTrustedComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateTenantSubcategoryTrusted();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateTenantSubcategoryTrusted(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateTenantSubcategoryTrusted(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateTenantSubcategoryTrusted(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateTenantSubcategoryTrusted` Mutation requires an argument of type `UpdateTenantSubcategoryTrustedVariables`:
  const updateTenantSubcategoryTrustedVars: UpdateTenantSubcategoryTrustedVariables = {
    organizationId: ...,
    id: ...,
    value: ...,
  };
  mutation.mutate(updateTenantSubcategoryTrustedVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., id: ..., value: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateTenantSubcategoryTrustedVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.subcategory_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateTenantProduc
You can execute the `CreateTenantProduct` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useCreateTenantProduct(options?: useDataConnectMutationOptions<CreateTenantProductData, FirebaseError, CreateTenantProductVariables>): UseDataConnectMutationResult<CreateTenantProductData, CreateTenantProductVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useCreateTenantProduct(dc: DataConnect, options?: useDataConnectMutationOptions<CreateTenantProductData, FirebaseError, CreateTenantProductVariables>): UseDataConnectMutationResult<CreateTenantProductData, CreateTenantProductVariables>;
```

### Variables
The `CreateTenantProduct` Mutation requires an argument of type `CreateTenantProductVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface CreateTenantProductVariables {
  id: UUIDString;
  organizationId: UUIDString;
  name: string;
  brand: string;
  categoryId: UUIDString;
  subcategoryId?: UUIDString | null;
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
  description?: string | null;
}
```
### Return Type
Recall that calling the `CreateTenantProduct` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateTenantProduct` Mutation is of type `CreateTenantProductData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface CreateTenantProductData {
  product_insert: Product_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateTenantProduct`'s Mutation hook function

```javascrip
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
    id: ...,
    organizationId: ...,
    name: ...,
    brand: ...,
    categoryId: ...,
    subcategoryId: ..., // optional
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
    description: ..., // optional
  };
  mutation.mutate(createTenantProductVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., organizationId: ..., name: ..., brand: ..., categoryId: ..., subcategoryId: ..., type: ..., sku: ..., barcode: ..., hsnCode: ..., unitOfMeasure: ..., sellingPrice: ..., mrp: ..., cost: ..., minSellingPrice: ..., discountAllowed: ..., taxCategory: ..., reorderLevel: ..., reorderQuantity: ..., primarySupplier: ..., description: ..., });

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
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateTenantProduc
You can execute the `UpdateTenantProduct` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useUpdateTenantProduct(options?: useDataConnectMutationOptions<UpdateTenantProductData, FirebaseError, UpdateTenantProductVariables>): UseDataConnectMutationResult<UpdateTenantProductData, UpdateTenantProductVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useUpdateTenantProduct(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateTenantProductData, FirebaseError, UpdateTenantProductVariables>): UseDataConnectMutationResult<UpdateTenantProductData, UpdateTenantProductVariables>;
```

### Variables
The `UpdateTenantProduct` Mutation requires an argument of type `UpdateTenantProductVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface UpdateTenantProductVariables {
  organizationId: UUIDString;
  id: UUIDString;
  name: string;
  brand: string;
  categoryId: UUIDString;
  subcategoryId?: UUIDString | null;
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
  description?: string | null;
}
```
### Return Type
Recall that calling the `UpdateTenantProduct` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateTenantProduct` Mutation is of type `UpdateTenantProductData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface UpdateTenantProductData {
  product_update?: Product_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateTenantProduct`'s Mutation hook function

```javascrip
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
    subcategoryId: ..., // optional
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
    description: ..., // optional
  };
  mutation.mutate(updateTenantProductVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., id: ..., name: ..., brand: ..., categoryId: ..., subcategoryId: ..., type: ..., sku: ..., barcode: ..., hsnCode: ..., unitOfMeasure: ..., sellingPrice: ..., mrp: ..., cost: ..., minSellingPrice: ..., discountAllowed: ..., taxCategory: ..., reorderLevel: ..., reorderQuantity: ..., primarySupplier: ..., description: ..., });

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
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ChangeTenantProductStatus
You can execute the `ChangeTenantProductStatus` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useChangeTenantProductStatus(options?: useDataConnectMutationOptions<ChangeTenantProductStatusData, FirebaseError, ChangeTenantProductStatusVariables>): UseDataConnectMutationResult<ChangeTenantProductStatusData, ChangeTenantProductStatusVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useChangeTenantProductStatus(dc: DataConnect, options?: useDataConnectMutationOptions<ChangeTenantProductStatusData, FirebaseError, ChangeTenantProductStatusVariables>): UseDataConnectMutationResult<ChangeTenantProductStatusData, ChangeTenantProductStatusVariables>;
```

### Variables
The `ChangeTenantProductStatus` Mutation requires an argument of type `ChangeTenantProductStatusVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface ChangeTenantProductStatusVariables {
  organizationId: UUIDString;
  id: UUIDString;
  status: ProductStatus;
}
```
### Return Type
Recall that calling the `ChangeTenantProductStatus` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ChangeTenantProductStatus` Mutation is of type `ChangeTenantProductStatusData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface ChangeTenantProductStatusData {
  product_update?: Product_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ChangeTenantProductStatus`'s Mutation hook function

```javascrip
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
  };
  mutation.mutate(changeTenantProductStatusVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., id: ..., status: ..., });

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
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdjustTenantInventory
You can execute the `AdjustTenantInventory` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useAdjustTenantInventory(options?: useDataConnectMutationOptions<AdjustTenantInventoryData, FirebaseError, AdjustTenantInventoryVariables>): UseDataConnectMutationResult<AdjustTenantInventoryData, AdjustTenantInventoryVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useAdjustTenantInventory(dc: DataConnect, options?: useDataConnectMutationOptions<AdjustTenantInventoryData, FirebaseError, AdjustTenantInventoryVariables>): UseDataConnectMutationResult<AdjustTenantInventoryData, AdjustTenantInventoryVariables>;
```

### Variables
The `AdjustTenantInventory` Mutation requires an argument of type `AdjustTenantInventoryVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
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
```javascrip
export interface AdjustTenantInventoryData {
  inventoryStock_update?: InventoryStock_Key | null;
  inventoryMovement_insert: InventoryMovement_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdjustTenantInventory`'s Mutation hook function

```javascrip
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
```javascrip
useCreateTenantInventoryStock(options?: useDataConnectMutationOptions<CreateTenantInventoryStockData, FirebaseError, CreateTenantInventoryStockVariables>): UseDataConnectMutationResult<CreateTenantInventoryStockData, CreateTenantInventoryStockVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useCreateTenantInventoryStock(dc: DataConnect, options?: useDataConnectMutationOptions<CreateTenantInventoryStockData, FirebaseError, CreateTenantInventoryStockVariables>): UseDataConnectMutationResult<CreateTenantInventoryStockData, CreateTenantInventoryStockVariables>;
```

### Variables
The `CreateTenantInventoryStock` Mutation requires an argument of type `CreateTenantInventoryStockVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
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
```javascrip
export interface CreateTenantInventoryStockData {
  inventoryStock_upsert: InventoryStock_Key;
  inventoryMovement_insert: InventoryMovement_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateTenantInventoryStock`'s Mutation hook function

```javascrip
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

## CreateTenantOutle
You can execute the `CreateTenantOutlet` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useCreateTenantOutlet(options?: useDataConnectMutationOptions<CreateTenantOutletData, FirebaseError, CreateTenantOutletVariables>): UseDataConnectMutationResult<CreateTenantOutletData, CreateTenantOutletVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useCreateTenantOutlet(dc: DataConnect, options?: useDataConnectMutationOptions<CreateTenantOutletData, FirebaseError, CreateTenantOutletVariables>): UseDataConnectMutationResult<CreateTenantOutletData, CreateTenantOutletVariables>;
```

### Variables
The `CreateTenantOutlet` Mutation requires an argument of type `CreateTenantOutletVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface CreateTenantOutletVariables {
  organizationId: UUIDString;
  name: string;
  contactPerson: string;
  email?: string | null;
  phone: string;
  address: string;
}
```
### Return Type
Recall that calling the `CreateTenantOutlet` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateTenantOutlet` Mutation is of type `CreateTenantOutletData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface CreateTenantOutletData {
  outlet_insert: Outlet_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateTenantOutlet`'s Mutation hook function

```javascrip
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
    name: ...,
    contactPerson: ...,
    email: ..., // optional
    phone: ...,
    address: ...,
  };
  mutation.mutate(createTenantOutletVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., name: ..., contactPerson: ..., email: ..., phone: ..., address: ..., });

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
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateTenantOutle
You can execute the `UpdateTenantOutlet` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useUpdateTenantOutlet(options?: useDataConnectMutationOptions<UpdateTenantOutletData, FirebaseError, UpdateTenantOutletVariables>): UseDataConnectMutationResult<UpdateTenantOutletData, UpdateTenantOutletVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useUpdateTenantOutlet(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateTenantOutletData, FirebaseError, UpdateTenantOutletVariables>): UseDataConnectMutationResult<UpdateTenantOutletData, UpdateTenantOutletVariables>;
```

### Variables
The `UpdateTenantOutlet` Mutation requires an argument of type `UpdateTenantOutletVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface UpdateTenantOutletVariables {
  organizationId: UUIDString;
  id: UUIDString;
  name: string;
  contactPerson: string;
  email?: string | null;
  phone: string;
  address: string;
}
```
### Return Type
Recall that calling the `UpdateTenantOutlet` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateTenantOutlet` Mutation is of type `UpdateTenantOutletData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface UpdateTenantOutletData {
  outlet_update?: Outlet_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateTenantOutlet`'s Mutation hook function

```javascrip
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
  };
  mutation.mutate(updateTenantOutletVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., id: ..., name: ..., contactPerson: ..., email: ..., phone: ..., address: ..., });

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
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ChangeTenantOutletStatus
You can execute the `ChangeTenantOutletStatus` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useChangeTenantOutletStatus(options?: useDataConnectMutationOptions<ChangeTenantOutletStatusData, FirebaseError, ChangeTenantOutletStatusVariables>): UseDataConnectMutationResult<ChangeTenantOutletStatusData, ChangeTenantOutletStatusVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useChangeTenantOutletStatus(dc: DataConnect, options?: useDataConnectMutationOptions<ChangeTenantOutletStatusData, FirebaseError, ChangeTenantOutletStatusVariables>): UseDataConnectMutationResult<ChangeTenantOutletStatusData, ChangeTenantOutletStatusVariables>;
```

### Variables
The `ChangeTenantOutletStatus` Mutation requires an argument of type `ChangeTenantOutletStatusVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface ChangeTenantOutletStatusVariables {
  organizationId: UUIDString;
  id: UUIDString;
  status: OutletStatus;
}
```
### Return Type
Recall that calling the `ChangeTenantOutletStatus` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ChangeTenantOutletStatus` Mutation is of type `ChangeTenantOutletStatusData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface ChangeTenantOutletStatusData {
  outlet_update?: Outlet_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ChangeTenantOutletStatus`'s Mutation hook function

```javascrip
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
  };
  mutation.mutate(changeTenantOutletStatusVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., id: ..., status: ..., });

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
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateTenantOutletTrusted
You can execute the `CreateTenantOutletTrusted` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useCreateTenantOutletTrusted(options?: useDataConnectMutationOptions<CreateTenantOutletTrustedData, FirebaseError, CreateTenantOutletTrustedVariables>): UseDataConnectMutationResult<CreateTenantOutletTrustedData, CreateTenantOutletTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useCreateTenantOutletTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<CreateTenantOutletTrustedData, FirebaseError, CreateTenantOutletTrustedVariables>): UseDataConnectMutationResult<CreateTenantOutletTrustedData, CreateTenantOutletTrustedVariables>;
```

### Variables
The `CreateTenantOutletTrusted` Mutation requires an argument of type `CreateTenantOutletTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface CreateTenantOutletTrustedVariables {
  id: UUIDString;
  organizationId: UUIDString;
  name: string;
  contactPerson: string;
  email?: string | null;
  phone: string;
  address: string;
}
```
### Return Type
Recall that calling the `CreateTenantOutletTrusted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateTenantOutletTrusted` Mutation is of type `CreateTenantOutletTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface CreateTenantOutletTrustedData {
  outlet_insert: Outlet_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateTenantOutletTrusted`'s Mutation hook function

```javascrip
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
    id: ...,
    organizationId: ...,
    name: ...,
    contactPerson: ...,
    email: ..., // optional
    phone: ...,
    address: ...,
  };
  mutation.mutate(createTenantOutletTrustedVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., organizationId: ..., name: ..., contactPerson: ..., email: ..., phone: ..., address: ..., });

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
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateTenantOutletTrusted
You can execute the `UpdateTenantOutletTrusted` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useUpdateTenantOutletTrusted(options?: useDataConnectMutationOptions<UpdateTenantOutletTrustedData, FirebaseError, UpdateTenantOutletTrustedVariables>): UseDataConnectMutationResult<UpdateTenantOutletTrustedData, UpdateTenantOutletTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useUpdateTenantOutletTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateTenantOutletTrustedData, FirebaseError, UpdateTenantOutletTrustedVariables>): UseDataConnectMutationResult<UpdateTenantOutletTrustedData, UpdateTenantOutletTrustedVariables>;
```

### Variables
The `UpdateTenantOutletTrusted` Mutation requires an argument of type `UpdateTenantOutletTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface UpdateTenantOutletTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
  name: string;
  contactPerson: string;
  email?: string | null;
  phone: string;
  address: string;
}
```
### Return Type
Recall that calling the `UpdateTenantOutletTrusted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateTenantOutletTrusted` Mutation is of type `UpdateTenantOutletTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface UpdateTenantOutletTrustedData {
  outlet_update?: Outlet_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateTenantOutletTrusted`'s Mutation hook function

```javascrip
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
  };
  mutation.mutate(updateTenantOutletTrustedVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., id: ..., name: ..., contactPerson: ..., email: ..., phone: ..., address: ..., });

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
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ChangeTenantOutletStatusTrusted
You can execute the `ChangeTenantOutletStatusTrusted` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useChangeTenantOutletStatusTrusted(options?: useDataConnectMutationOptions<ChangeTenantOutletStatusTrustedData, FirebaseError, ChangeTenantOutletStatusTrustedVariables>): UseDataConnectMutationResult<ChangeTenantOutletStatusTrustedData, ChangeTenantOutletStatusTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useChangeTenantOutletStatusTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<ChangeTenantOutletStatusTrustedData, FirebaseError, ChangeTenantOutletStatusTrustedVariables>): UseDataConnectMutationResult<ChangeTenantOutletStatusTrustedData, ChangeTenantOutletStatusTrustedVariables>;
```

### Variables
The `ChangeTenantOutletStatusTrusted` Mutation requires an argument of type `ChangeTenantOutletStatusTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface ChangeTenantOutletStatusTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
  status: OutletStatus;
}
```
### Return Type
Recall that calling the `ChangeTenantOutletStatusTrusted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ChangeTenantOutletStatusTrusted` Mutation is of type `ChangeTenantOutletStatusTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface ChangeTenantOutletStatusTrustedData {
  outlet_update?: Outlet_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ChangeTenantOutletStatusTrusted`'s Mutation hook function

```javascrip
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
  };
  mutation.mutate(changeTenantOutletStatusTrustedVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., id: ..., status: ..., });

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
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteTenantOutletTrusted
You can execute the `DeleteTenantOutletTrusted` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useDeleteTenantOutletTrusted(options?: useDataConnectMutationOptions<DeleteTenantOutletTrustedData, FirebaseError, DeleteTenantOutletTrustedVariables>): UseDataConnectMutationResult<DeleteTenantOutletTrustedData, DeleteTenantOutletTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useDeleteTenantOutletTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteTenantOutletTrustedData, FirebaseError, DeleteTenantOutletTrustedVariables>): UseDataConnectMutationResult<DeleteTenantOutletTrustedData, DeleteTenantOutletTrustedVariables>;
```

### Variables
The `DeleteTenantOutletTrusted` Mutation requires an argument of type `DeleteTenantOutletTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface DeleteTenantOutletTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteTenantOutletTrusted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteTenantOutletTrusted` Mutation is of type `DeleteTenantOutletTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface DeleteTenantOutletTrustedData {
  outlet_delete?: Outlet_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteTenantOutletTrusted`'s Mutation hook function

```javascrip
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteTenantOutletTrustedVariables } from '@omniretail/sql-connect';
import { useDeleteTenantOutletTrusted } from '@omniretail/sql-connect/react'

export default function DeleteTenantOutletTrustedComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteTenantOutletTrusted();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteTenantOutletTrusted(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteTenantOutletTrusted(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteTenantOutletTrusted(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteTenantOutletTrusted` Mutation requires an argument of type `DeleteTenantOutletTrustedVariables`:
  const deleteTenantOutletTrustedVars: DeleteTenantOutletTrustedVariables = {
    organizationId: ...,
    id: ...,
  };
  mutation.mutate(deleteTenantOutletTrustedVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteTenantOutletTrustedVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.outlet_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteTenantEmployeeTrusted
You can execute the `DeleteTenantEmployeeTrusted` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useDeleteTenantEmployeeTrusted(options?: useDataConnectMutationOptions<DeleteTenantEmployeeTrustedData, FirebaseError, DeleteTenantEmployeeTrustedVariables>): UseDataConnectMutationResult<DeleteTenantEmployeeTrustedData, DeleteTenantEmployeeTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useDeleteTenantEmployeeTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteTenantEmployeeTrustedData, FirebaseError, DeleteTenantEmployeeTrustedVariables>): UseDataConnectMutationResult<DeleteTenantEmployeeTrustedData, DeleteTenantEmployeeTrustedVariables>;
```

### Variables
The `DeleteTenantEmployeeTrusted` Mutation requires an argument of type `DeleteTenantEmployeeTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface DeleteTenantEmployeeTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteTenantEmployeeTrusted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteTenantEmployeeTrusted` Mutation is of type `DeleteTenantEmployeeTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface DeleteTenantEmployeeTrustedData {
  employee_delete?: Employee_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteTenantEmployeeTrusted`'s Mutation hook function

```javascrip
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteTenantEmployeeTrustedVariables } from '@omniretail/sql-connect';
import { useDeleteTenantEmployeeTrusted } from '@omniretail/sql-connect/react'

export default function DeleteTenantEmployeeTrustedComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteTenantEmployeeTrusted();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteTenantEmployeeTrusted(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteTenantEmployeeTrusted(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteTenantEmployeeTrusted(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteTenantEmployeeTrusted` Mutation requires an argument of type `DeleteTenantEmployeeTrustedVariables`:
  const deleteTenantEmployeeTrustedVars: DeleteTenantEmployeeTrustedVariables = {
    organizationId: ...,
    id: ...,
  };
  mutation.mutate(deleteTenantEmployeeTrustedVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteTenantEmployeeTrustedVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.employee_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteTenantServicePersonTrusted
You can execute the `DeleteTenantServicePersonTrusted` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useDeleteTenantServicePersonTrusted(options?: useDataConnectMutationOptions<DeleteTenantServicePersonTrustedData, FirebaseError, DeleteTenantServicePersonTrustedVariables>): UseDataConnectMutationResult<DeleteTenantServicePersonTrustedData, DeleteTenantServicePersonTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useDeleteTenantServicePersonTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteTenantServicePersonTrustedData, FirebaseError, DeleteTenantServicePersonTrustedVariables>): UseDataConnectMutationResult<DeleteTenantServicePersonTrustedData, DeleteTenantServicePersonTrustedVariables>;
```

### Variables
The `DeleteTenantServicePersonTrusted` Mutation requires an argument of type `DeleteTenantServicePersonTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface DeleteTenantServicePersonTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteTenantServicePersonTrusted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteTenantServicePersonTrusted` Mutation is of type `DeleteTenantServicePersonTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface DeleteTenantServicePersonTrustedData {
  servicePerson_delete?: ServicePerson_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteTenantServicePersonTrusted`'s Mutation hook function

```javascrip
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteTenantServicePersonTrustedVariables } from '@omniretail/sql-connect';
import { useDeleteTenantServicePersonTrusted } from '@omniretail/sql-connect/react'

export default function DeleteTenantServicePersonTrustedComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteTenantServicePersonTrusted();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteTenantServicePersonTrusted(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteTenantServicePersonTrusted(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteTenantServicePersonTrusted(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteTenantServicePersonTrusted` Mutation requires an argument of type `DeleteTenantServicePersonTrustedVariables`:
  const deleteTenantServicePersonTrustedVars: DeleteTenantServicePersonTrustedVariables = {
    organizationId: ...,
    id: ...,
  };
  mutation.mutate(deleteTenantServicePersonTrustedVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteTenantServicePersonTrustedVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.servicePerson_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteTenantServicePersonOutletTrusted
You can execute the `DeleteTenantServicePersonOutletTrusted` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useDeleteTenantServicePersonOutletTrusted(options?: useDataConnectMutationOptions<DeleteTenantServicePersonOutletTrustedData, FirebaseError, DeleteTenantServicePersonOutletTrustedVariables>): UseDataConnectMutationResult<DeleteTenantServicePersonOutletTrustedData, DeleteTenantServicePersonOutletTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useDeleteTenantServicePersonOutletTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteTenantServicePersonOutletTrustedData, FirebaseError, DeleteTenantServicePersonOutletTrustedVariables>): UseDataConnectMutationResult<DeleteTenantServicePersonOutletTrustedData, DeleteTenantServicePersonOutletTrustedVariables>;
```

### Variables
The `DeleteTenantServicePersonOutletTrusted` Mutation requires an argument of type `DeleteTenantServicePersonOutletTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface DeleteTenantServicePersonOutletTrustedVariables {
  organizationId: UUIDString;
  servicePersonId: UUIDString;
  outletId: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteTenantServicePersonOutletTrusted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteTenantServicePersonOutletTrusted` Mutation is of type `DeleteTenantServicePersonOutletTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface DeleteTenantServicePersonOutletTrustedData {
  servicePersonOutlet_delete?: ServicePersonOutlet_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteTenantServicePersonOutletTrusted`'s Mutation hook function

```javascrip
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteTenantServicePersonOutletTrustedVariables } from '@omniretail/sql-connect';
import { useDeleteTenantServicePersonOutletTrusted } from '@omniretail/sql-connect/react'

export default function DeleteTenantServicePersonOutletTrustedComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteTenantServicePersonOutletTrusted();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteTenantServicePersonOutletTrusted(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteTenantServicePersonOutletTrusted(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteTenantServicePersonOutletTrusted(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteTenantServicePersonOutletTrusted` Mutation requires an argument of type `DeleteTenantServicePersonOutletTrustedVariables`:
  const deleteTenantServicePersonOutletTrustedVars: DeleteTenantServicePersonOutletTrustedVariables = {
    organizationId: ...,
    servicePersonId: ...,
    outletId: ...,
  };
  mutation.mutate(deleteTenantServicePersonOutletTrustedVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., servicePersonId: ..., outletId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteTenantServicePersonOutletTrustedVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.servicePersonOutlet_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteTenantCustomerTrusted
You can execute the `DeleteTenantCustomerTrusted` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useDeleteTenantCustomerTrusted(options?: useDataConnectMutationOptions<DeleteTenantCustomerTrustedData, FirebaseError, DeleteTenantCustomerTrustedVariables>): UseDataConnectMutationResult<DeleteTenantCustomerTrustedData, DeleteTenantCustomerTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useDeleteTenantCustomerTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteTenantCustomerTrustedData, FirebaseError, DeleteTenantCustomerTrustedVariables>): UseDataConnectMutationResult<DeleteTenantCustomerTrustedData, DeleteTenantCustomerTrustedVariables>;
```

### Variables
The `DeleteTenantCustomerTrusted` Mutation requires an argument of type `DeleteTenantCustomerTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface DeleteTenantCustomerTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteTenantCustomerTrusted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteTenantCustomerTrusted` Mutation is of type `DeleteTenantCustomerTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface DeleteTenantCustomerTrustedData {
  customer_delete?: Customer_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteTenantCustomerTrusted`'s Mutation hook function

```javascrip
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteTenantCustomerTrustedVariables } from '@omniretail/sql-connect';
import { useDeleteTenantCustomerTrusted } from '@omniretail/sql-connect/react'

export default function DeleteTenantCustomerTrustedComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteTenantCustomerTrusted();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteTenantCustomerTrusted(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteTenantCustomerTrusted(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteTenantCustomerTrusted(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteTenantCustomerTrusted` Mutation requires an argument of type `DeleteTenantCustomerTrustedVariables`:
  const deleteTenantCustomerTrustedVars: DeleteTenantCustomerTrustedVariables = {
    organizationId: ...,
    id: ...,
  };
  mutation.mutate(deleteTenantCustomerTrustedVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteTenantCustomerTrustedVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.customer_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteTenantSupplierTrusted
You can execute the `DeleteTenantSupplierTrusted` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useDeleteTenantSupplierTrusted(options?: useDataConnectMutationOptions<DeleteTenantSupplierTrustedData, FirebaseError, DeleteTenantSupplierTrustedVariables>): UseDataConnectMutationResult<DeleteTenantSupplierTrustedData, DeleteTenantSupplierTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useDeleteTenantSupplierTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteTenantSupplierTrustedData, FirebaseError, DeleteTenantSupplierTrustedVariables>): UseDataConnectMutationResult<DeleteTenantSupplierTrustedData, DeleteTenantSupplierTrustedVariables>;
```

### Variables
The `DeleteTenantSupplierTrusted` Mutation requires an argument of type `DeleteTenantSupplierTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface DeleteTenantSupplierTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteTenantSupplierTrusted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteTenantSupplierTrusted` Mutation is of type `DeleteTenantSupplierTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface DeleteTenantSupplierTrustedData {
  supplier_delete?: Supplier_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteTenantSupplierTrusted`'s Mutation hook function

```javascrip
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteTenantSupplierTrustedVariables } from '@omniretail/sql-connect';
import { useDeleteTenantSupplierTrusted } from '@omniretail/sql-connect/react'

export default function DeleteTenantSupplierTrustedComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteTenantSupplierTrusted();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteTenantSupplierTrusted(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteTenantSupplierTrusted(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteTenantSupplierTrusted(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteTenantSupplierTrusted` Mutation requires an argument of type `DeleteTenantSupplierTrustedVariables`:
  const deleteTenantSupplierTrustedVars: DeleteTenantSupplierTrustedVariables = {
    organizationId: ...,
    id: ...,
  };
  mutation.mutate(deleteTenantSupplierTrustedVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteTenantSupplierTrustedVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.supplier_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteTenantProductTrusted
You can execute the `DeleteTenantProductTrusted` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useDeleteTenantProductTrusted(options?: useDataConnectMutationOptions<DeleteTenantProductTrustedData, FirebaseError, DeleteTenantProductTrustedVariables>): UseDataConnectMutationResult<DeleteTenantProductTrustedData, DeleteTenantProductTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useDeleteTenantProductTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteTenantProductTrustedData, FirebaseError, DeleteTenantProductTrustedVariables>): UseDataConnectMutationResult<DeleteTenantProductTrustedData, DeleteTenantProductTrustedVariables>;
```

### Variables
The `DeleteTenantProductTrusted` Mutation requires an argument of type `DeleteTenantProductTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface DeleteTenantProductTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteTenantProductTrusted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteTenantProductTrusted` Mutation is of type `DeleteTenantProductTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface DeleteTenantProductTrustedData {
  product_delete?: Product_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteTenantProductTrusted`'s Mutation hook function

```javascrip
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteTenantProductTrustedVariables } from '@omniretail/sql-connect';
import { useDeleteTenantProductTrusted } from '@omniretail/sql-connect/react'

export default function DeleteTenantProductTrustedComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteTenantProductTrusted();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteTenantProductTrusted(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteTenantProductTrusted(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteTenantProductTrusted(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteTenantProductTrusted` Mutation requires an argument of type `DeleteTenantProductTrustedVariables`:
  const deleteTenantProductTrustedVars: DeleteTenantProductTrustedVariables = {
    organizationId: ...,
    id: ...,
  };
  mutation.mutate(deleteTenantProductTrustedVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteTenantProductTrustedVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.product_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteTenantCategoryTrusted
You can execute the `DeleteTenantCategoryTrusted` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useDeleteTenantCategoryTrusted(options?: useDataConnectMutationOptions<DeleteTenantCategoryTrustedData, FirebaseError, DeleteTenantCategoryTrustedVariables>): UseDataConnectMutationResult<DeleteTenantCategoryTrustedData, DeleteTenantCategoryTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useDeleteTenantCategoryTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteTenantCategoryTrustedData, FirebaseError, DeleteTenantCategoryTrustedVariables>): UseDataConnectMutationResult<DeleteTenantCategoryTrustedData, DeleteTenantCategoryTrustedVariables>;
```

### Variables
The `DeleteTenantCategoryTrusted` Mutation requires an argument of type `DeleteTenantCategoryTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface DeleteTenantCategoryTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteTenantCategoryTrusted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteTenantCategoryTrusted` Mutation is of type `DeleteTenantCategoryTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface DeleteTenantCategoryTrustedData {
  category_delete?: Category_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteTenantCategoryTrusted`'s Mutation hook function

```javascrip
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteTenantCategoryTrustedVariables } from '@omniretail/sql-connect';
import { useDeleteTenantCategoryTrusted } from '@omniretail/sql-connect/react'

export default function DeleteTenantCategoryTrustedComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteTenantCategoryTrusted();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteTenantCategoryTrusted(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteTenantCategoryTrusted(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteTenantCategoryTrusted(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteTenantCategoryTrusted` Mutation requires an argument of type `DeleteTenantCategoryTrustedVariables`:
  const deleteTenantCategoryTrustedVars: DeleteTenantCategoryTrustedVariables = {
    organizationId: ...,
    id: ...,
  };
  mutation.mutate(deleteTenantCategoryTrustedVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteTenantCategoryTrustedVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.category_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteTenantSubcategoryTrusted
You can execute the `DeleteTenantSubcategoryTrusted` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useDeleteTenantSubcategoryTrusted(options?: useDataConnectMutationOptions<DeleteTenantSubcategoryTrustedData, FirebaseError, DeleteTenantSubcategoryTrustedVariables>): UseDataConnectMutationResult<DeleteTenantSubcategoryTrustedData, DeleteTenantSubcategoryTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useDeleteTenantSubcategoryTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteTenantSubcategoryTrustedData, FirebaseError, DeleteTenantSubcategoryTrustedVariables>): UseDataConnectMutationResult<DeleteTenantSubcategoryTrustedData, DeleteTenantSubcategoryTrustedVariables>;
```

### Variables
The `DeleteTenantSubcategoryTrusted` Mutation requires an argument of type `DeleteTenantSubcategoryTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface DeleteTenantSubcategoryTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteTenantSubcategoryTrusted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteTenantSubcategoryTrusted` Mutation is of type `DeleteTenantSubcategoryTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface DeleteTenantSubcategoryTrustedData {
  subcategory_delete?: Subcategory_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteTenantSubcategoryTrusted`'s Mutation hook function

```javascrip
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteTenantSubcategoryTrustedVariables } from '@omniretail/sql-connect';
import { useDeleteTenantSubcategoryTrusted } from '@omniretail/sql-connect/react'

export default function DeleteTenantSubcategoryTrustedComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteTenantSubcategoryTrusted();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteTenantSubcategoryTrusted(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteTenantSubcategoryTrusted(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteTenantSubcategoryTrusted(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteTenantSubcategoryTrusted` Mutation requires an argument of type `DeleteTenantSubcategoryTrustedVariables`:
  const deleteTenantSubcategoryTrustedVars: DeleteTenantSubcategoryTrustedVariables = {
    organizationId: ...,
    id: ...,
  };
  mutation.mutate(deleteTenantSubcategoryTrustedVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteTenantSubcategoryTrustedVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.subcategory_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateTenantEmployeeProfileTrusted
You can execute the `CreateTenantEmployeeProfileTrusted` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useCreateTenantEmployeeProfileTrusted(options?: useDataConnectMutationOptions<CreateTenantEmployeeProfileTrustedData, FirebaseError, CreateTenantEmployeeProfileTrustedVariables>): UseDataConnectMutationResult<CreateTenantEmployeeProfileTrustedData, CreateTenantEmployeeProfileTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useCreateTenantEmployeeProfileTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<CreateTenantEmployeeProfileTrustedData, FirebaseError, CreateTenantEmployeeProfileTrustedVariables>): UseDataConnectMutationResult<CreateTenantEmployeeProfileTrustedData, CreateTenantEmployeeProfileTrustedVariables>;
```

### Variables
The `CreateTenantEmployeeProfileTrusted` Mutation requires an argument of type `CreateTenantEmployeeProfileTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface CreateTenantEmployeeProfileTrustedVariables {
  id: UUIDString;
  organizationId: UUIDString;
  fullName: string;
  email?: string | null;
  phone: string;
  designation: string;
  department?: string | null;
  gender?: string | null;
  dateOfBirth?: DateString | null;
  dateOfJoining: DateString;
  address?: string | null;
  notes?: string | null;
  assignmentScope: string;
}
```
### Return Type
Recall that calling the `CreateTenantEmployeeProfileTrusted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateTenantEmployeeProfileTrusted` Mutation is of type `CreateTenantEmployeeProfileTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface CreateTenantEmployeeProfileTrustedData {
  employee_insert: Employee_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateTenantEmployeeProfileTrusted`'s Mutation hook function

```javascrip
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
    id: ...,
    organizationId: ...,
    fullName: ...,
    email: ..., // optional
    phone: ...,
    designation: ...,
    department: ..., // optional
    gender: ..., // optional
    dateOfBirth: ..., // optional
    dateOfJoining: ...,
    address: ..., // optional
    notes: ..., // optional
    assignmentScope: ...,
  };
  mutation.mutate(createTenantEmployeeProfileTrustedVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., organizationId: ..., fullName: ..., email: ..., phone: ..., designation: ..., department: ..., gender: ..., dateOfBirth: ..., dateOfJoining: ..., address: ..., notes: ..., assignmentScope: ..., });

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
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ProvisionTenantEmployeeTrusted
You can execute the `ProvisionTenantEmployeeTrusted` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useProvisionTenantEmployeeTrusted(options?: useDataConnectMutationOptions<ProvisionTenantEmployeeTrustedData, FirebaseError, ProvisionTenantEmployeeTrustedVariables>): UseDataConnectMutationResult<ProvisionTenantEmployeeTrustedData, ProvisionTenantEmployeeTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useProvisionTenantEmployeeTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<ProvisionTenantEmployeeTrustedData, FirebaseError, ProvisionTenantEmployeeTrustedVariables>): UseDataConnectMutationResult<ProvisionTenantEmployeeTrustedData, ProvisionTenantEmployeeTrustedVariables>;
```

### Variables
The `ProvisionTenantEmployeeTrusted` Mutation requires an argument of type `ProvisionTenantEmployeeTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
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
  gender?: string | null;
  dateOfBirth?: DateString | null;
  dateOfJoining: DateString;
  address?: string | null;
  notes?: string | null;
  assignmentScope: string;
  roleId: UUIDString;
}
```
### Return Type
Recall that calling the `ProvisionTenantEmployeeTrusted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ProvisionTenantEmployeeTrusted` Mutation is of type `ProvisionTenantEmployeeTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface ProvisionTenantEmployeeTrustedData {
  appUser_insert: AppUser_Key;
  organizationMembership_insert: OrganizationMembership_Key;
  userRole_upsert: UserRole_Key;
  employee_insert: Employee_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ProvisionTenantEmployeeTrusted`'s Mutation hook function

```javascrip
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
    gender: ..., // optional
    dateOfBirth: ..., // optional
    dateOfJoining: ...,
    address: ..., // optional
    notes: ..., // optional
    assignmentScope: ...,
    roleId: ...,
  };
  mutation.mutate(provisionTenantEmployeeTrustedVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., userId: ..., firebaseUid: ..., username: ..., email: ..., organizationId: ..., fullName: ..., phone: ..., designation: ..., department: ..., gender: ..., dateOfBirth: ..., dateOfJoining: ..., address: ..., notes: ..., assignmentScope: ..., roleId: ..., });

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
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ProvisionTenantEmployeeLoginTrusted
You can execute the `ProvisionTenantEmployeeLoginTrusted` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useProvisionTenantEmployeeLoginTrusted(options?: useDataConnectMutationOptions<ProvisionTenantEmployeeLoginTrustedData, FirebaseError, ProvisionTenantEmployeeLoginTrustedVariables>): UseDataConnectMutationResult<ProvisionTenantEmployeeLoginTrustedData, ProvisionTenantEmployeeLoginTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useProvisionTenantEmployeeLoginTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<ProvisionTenantEmployeeLoginTrustedData, FirebaseError, ProvisionTenantEmployeeLoginTrustedVariables>): UseDataConnectMutationResult<ProvisionTenantEmployeeLoginTrustedData, ProvisionTenantEmployeeLoginTrustedVariables>;
```

### Variables
The `ProvisionTenantEmployeeLoginTrusted` Mutation requires an argument of type `ProvisionTenantEmployeeLoginTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface ProvisionTenantEmployeeLoginTrustedVariables {
  organizationId: UUIDString;
  employeeId: UUIDString;
  userId: UUIDString;
  firebaseUid: string;
  username: string;
  email: string;
  displayName: string;
  phone?: string | null;
  roleId: UUIDString;
}
```
### Return Type
Recall that calling the `ProvisionTenantEmployeeLoginTrusted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ProvisionTenantEmployeeLoginTrusted` Mutation is of type `ProvisionTenantEmployeeLoginTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface ProvisionTenantEmployeeLoginTrustedData {
  appUser_insert: AppUser_Key;
  organizationMembership_insert: OrganizationMembership_Key;
  userRole_upsert: UserRole_Key;
  employee_update?: Employee_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ProvisionTenantEmployeeLoginTrusted`'s Mutation hook function

```javascrip
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ProvisionTenantEmployeeLoginTrustedVariables } from '@omniretail/sql-connect';
import { useProvisionTenantEmployeeLoginTrusted } from '@omniretail/sql-connect/react'

export default function ProvisionTenantEmployeeLoginTrustedComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useProvisionTenantEmployeeLoginTrusted();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useProvisionTenantEmployeeLoginTrusted(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useProvisionTenantEmployeeLoginTrusted(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useProvisionTenantEmployeeLoginTrusted(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useProvisionTenantEmployeeLoginTrusted` Mutation requires an argument of type `ProvisionTenantEmployeeLoginTrustedVariables`:
  const provisionTenantEmployeeLoginTrustedVars: ProvisionTenantEmployeeLoginTrustedVariables = {
    organizationId: ...,
    employeeId: ...,
    userId: ...,
    firebaseUid: ...,
    username: ...,
    email: ...,
    displayName: ...,
    phone: ..., // optional
    roleId: ...,
  };
  mutation.mutate(provisionTenantEmployeeLoginTrustedVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., employeeId: ..., userId: ..., firebaseUid: ..., username: ..., email: ..., displayName: ..., phone: ..., roleId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(provisionTenantEmployeeLoginTrustedVars, options);

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
    console.log(mutation.data.employee_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateTenantEmployeeLoginTrusted
You can execute the `UpdateTenantEmployeeLoginTrusted` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useUpdateTenantEmployeeLoginTrusted(options?: useDataConnectMutationOptions<UpdateTenantEmployeeLoginTrustedData, FirebaseError, UpdateTenantEmployeeLoginTrustedVariables>): UseDataConnectMutationResult<UpdateTenantEmployeeLoginTrustedData, UpdateTenantEmployeeLoginTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useUpdateTenantEmployeeLoginTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateTenantEmployeeLoginTrustedData, FirebaseError, UpdateTenantEmployeeLoginTrustedVariables>): UseDataConnectMutationResult<UpdateTenantEmployeeLoginTrustedData, UpdateTenantEmployeeLoginTrustedVariables>;
```

### Variables
The `UpdateTenantEmployeeLoginTrusted` Mutation requires an argument of type `UpdateTenantEmployeeLoginTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface UpdateTenantEmployeeLoginTrustedVariables {
  organizationId: UUIDString;
  employeeId: UUIDString;
  userId: UUIDString;
  username: string;
  email: string;
  roleId: UUIDString;
  loginAccess: LoginAccessStatus;
}
```
### Return Type
Recall that calling the `UpdateTenantEmployeeLoginTrusted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateTenantEmployeeLoginTrusted` Mutation is of type `UpdateTenantEmployeeLoginTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface UpdateTenantEmployeeLoginTrustedData {
  appUser_update?: AppUser_Key | null;
  organizationMembership_update?: OrganizationMembership_Key | null;
  removeAdminRole?: UserRole_Key | null;
  removeEmployeeRole?: UserRole_Key | null;
  userRole_upsert: UserRole_Key;
  employee_update?: Employee_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateTenantEmployeeLoginTrusted`'s Mutation hook function

```javascrip
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateTenantEmployeeLoginTrustedVariables } from '@omniretail/sql-connect';
import { useUpdateTenantEmployeeLoginTrusted } from '@omniretail/sql-connect/react'

export default function UpdateTenantEmployeeLoginTrustedComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateTenantEmployeeLoginTrusted();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateTenantEmployeeLoginTrusted(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateTenantEmployeeLoginTrusted(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateTenantEmployeeLoginTrusted(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateTenantEmployeeLoginTrusted` Mutation requires an argument of type `UpdateTenantEmployeeLoginTrustedVariables`:
  const updateTenantEmployeeLoginTrustedVars: UpdateTenantEmployeeLoginTrustedVariables = {
    organizationId: ...,
    employeeId: ...,
    userId: ...,
    username: ...,
    email: ...,
    roleId: ...,
    loginAccess: ...,
  };
  mutation.mutate(updateTenantEmployeeLoginTrustedVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., employeeId: ..., userId: ..., username: ..., email: ..., roleId: ..., loginAccess: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateTenantEmployeeLoginTrustedVars, options);

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
    console.log(mutation.data.removeAdminRole);
    console.log(mutation.data.removeEmployeeRole);
    console.log(mutation.data.userRole_upsert);
    console.log(mutation.data.employee_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateTenantEmployeeTrusted
You can execute the `UpdateTenantEmployeeTrusted` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useUpdateTenantEmployeeTrusted(options?: useDataConnectMutationOptions<UpdateTenantEmployeeTrustedData, FirebaseError, UpdateTenantEmployeeTrustedVariables>): UseDataConnectMutationResult<UpdateTenantEmployeeTrustedData, UpdateTenantEmployeeTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useUpdateTenantEmployeeTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateTenantEmployeeTrustedData, FirebaseError, UpdateTenantEmployeeTrustedVariables>): UseDataConnectMutationResult<UpdateTenantEmployeeTrustedData, UpdateTenantEmployeeTrustedVariables>;
```

### Variables
The `UpdateTenantEmployeeTrusted` Mutation requires an argument of type `UpdateTenantEmployeeTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface UpdateTenantEmployeeTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
  fullName: string;
  email?: string | null;
  phone: string;
  designation: string;
  department?: string | null;
  gender?: string | null;
  dateOfBirth?: DateString | null;
  dateOfJoining: DateString;
  address?: string | null;
  notes?: string | null;
  assignmentScope: string;
}
```
### Return Type
Recall that calling the `UpdateTenantEmployeeTrusted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateTenantEmployeeTrusted` Mutation is of type `UpdateTenantEmployeeTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface UpdateTenantEmployeeTrustedData {
  employee_update?: Employee_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateTenantEmployeeTrusted`'s Mutation hook function

```javascrip
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
    gender: ..., // optional
    dateOfBirth: ..., // optional
    dateOfJoining: ...,
    address: ..., // optional
    notes: ..., // optional
    assignmentScope: ...,
  };
  mutation.mutate(updateTenantEmployeeTrustedVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., id: ..., fullName: ..., email: ..., phone: ..., designation: ..., department: ..., gender: ..., dateOfBirth: ..., dateOfJoining: ..., address: ..., notes: ..., assignmentScope: ..., });

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
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ChangeTenantEmployeeStatusTrusted
You can execute the `ChangeTenantEmployeeStatusTrusted` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useChangeTenantEmployeeStatusTrusted(options?: useDataConnectMutationOptions<ChangeTenantEmployeeStatusTrustedData, FirebaseError, ChangeTenantEmployeeStatusTrustedVariables>): UseDataConnectMutationResult<ChangeTenantEmployeeStatusTrustedData, ChangeTenantEmployeeStatusTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useChangeTenantEmployeeStatusTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<ChangeTenantEmployeeStatusTrustedData, FirebaseError, ChangeTenantEmployeeStatusTrustedVariables>): UseDataConnectMutationResult<ChangeTenantEmployeeStatusTrustedData, ChangeTenantEmployeeStatusTrustedVariables>;
```

### Variables
The `ChangeTenantEmployeeStatusTrusted` Mutation requires an argument of type `ChangeTenantEmployeeStatusTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface ChangeTenantEmployeeStatusTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
  status: EmploymentStatus;
}
```
### Return Type
Recall that calling the `ChangeTenantEmployeeStatusTrusted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ChangeTenantEmployeeStatusTrusted` Mutation is of type `ChangeTenantEmployeeStatusTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface ChangeTenantEmployeeStatusTrustedData {
  employee_update?: Employee_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ChangeTenantEmployeeStatusTrusted`'s Mutation hook function

```javascrip
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
  };
  mutation.mutate(changeTenantEmployeeStatusTrustedVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., id: ..., status: ..., });

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
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ChangeTenantEmployeeStatusWithLoginTrusted
You can execute the `ChangeTenantEmployeeStatusWithLoginTrusted` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useChangeTenantEmployeeStatusWithLoginTrusted(options?: useDataConnectMutationOptions<ChangeTenantEmployeeStatusWithLoginTrustedData, FirebaseError, ChangeTenantEmployeeStatusWithLoginTrustedVariables>): UseDataConnectMutationResult<ChangeTenantEmployeeStatusWithLoginTrustedData, ChangeTenantEmployeeStatusWithLoginTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useChangeTenantEmployeeStatusWithLoginTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<ChangeTenantEmployeeStatusWithLoginTrustedData, FirebaseError, ChangeTenantEmployeeStatusWithLoginTrustedVariables>): UseDataConnectMutationResult<ChangeTenantEmployeeStatusWithLoginTrustedData, ChangeTenantEmployeeStatusWithLoginTrustedVariables>;
```

### Variables
The `ChangeTenantEmployeeStatusWithLoginTrusted` Mutation requires an argument of type `ChangeTenantEmployeeStatusWithLoginTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface ChangeTenantEmployeeStatusWithLoginTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
  userId: UUIDString;
  status: EmploymentStatus;
  appUserStatus: AppUserStatus;
}
```
### Return Type
Recall that calling the `ChangeTenantEmployeeStatusWithLoginTrusted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ChangeTenantEmployeeStatusWithLoginTrusted` Mutation is of type `ChangeTenantEmployeeStatusWithLoginTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface ChangeTenantEmployeeStatusWithLoginTrustedData {
  employee_update?: Employee_Key | null;
  appUser_update?: AppUser_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ChangeTenantEmployeeStatusWithLoginTrusted`'s Mutation hook function

```javascrip
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ChangeTenantEmployeeStatusWithLoginTrustedVariables } from '@omniretail/sql-connect';
import { useChangeTenantEmployeeStatusWithLoginTrusted } from '@omniretail/sql-connect/react'

export default function ChangeTenantEmployeeStatusWithLoginTrustedComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useChangeTenantEmployeeStatusWithLoginTrusted();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useChangeTenantEmployeeStatusWithLoginTrusted(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useChangeTenantEmployeeStatusWithLoginTrusted(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useChangeTenantEmployeeStatusWithLoginTrusted(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useChangeTenantEmployeeStatusWithLoginTrusted` Mutation requires an argument of type `ChangeTenantEmployeeStatusWithLoginTrustedVariables`:
  const changeTenantEmployeeStatusWithLoginTrustedVars: ChangeTenantEmployeeStatusWithLoginTrustedVariables = {
    organizationId: ...,
    id: ...,
    userId: ...,
    status: ...,
    appUserStatus: ...,
  };
  mutation.mutate(changeTenantEmployeeStatusWithLoginTrustedVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., id: ..., userId: ..., status: ..., appUserStatus: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(changeTenantEmployeeStatusWithLoginTrustedVars, options);

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
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ChangeTenantEmployeeLoginAccessTrusted
You can execute the `ChangeTenantEmployeeLoginAccessTrusted` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useChangeTenantEmployeeLoginAccessTrusted(options?: useDataConnectMutationOptions<ChangeTenantEmployeeLoginAccessTrustedData, FirebaseError, ChangeTenantEmployeeLoginAccessTrustedVariables>): UseDataConnectMutationResult<ChangeTenantEmployeeLoginAccessTrustedData, ChangeTenantEmployeeLoginAccessTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useChangeTenantEmployeeLoginAccessTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<ChangeTenantEmployeeLoginAccessTrustedData, FirebaseError, ChangeTenantEmployeeLoginAccessTrustedVariables>): UseDataConnectMutationResult<ChangeTenantEmployeeLoginAccessTrustedData, ChangeTenantEmployeeLoginAccessTrustedVariables>;
```

### Variables
The `ChangeTenantEmployeeLoginAccessTrusted` Mutation requires an argument of type `ChangeTenantEmployeeLoginAccessTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface ChangeTenantEmployeeLoginAccessTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
  userId: UUIDString;
  loginAccess: LoginAccessStatus;
}
```
### Return Type
Recall that calling the `ChangeTenantEmployeeLoginAccessTrusted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ChangeTenantEmployeeLoginAccessTrusted` Mutation is of type `ChangeTenantEmployeeLoginAccessTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface ChangeTenantEmployeeLoginAccessTrustedData {
  employee_update?: Employee_Key | null;
  appUser_update?: AppUser_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ChangeTenantEmployeeLoginAccessTrusted`'s Mutation hook function

```javascrip
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
  };
  mutation.mutate(changeTenantEmployeeLoginAccessTrustedVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., id: ..., userId: ..., loginAccess: ..., });

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
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateTenantServicePersonTrusted
You can execute the `CreateTenantServicePersonTrusted` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useCreateTenantServicePersonTrusted(options?: useDataConnectMutationOptions<CreateTenantServicePersonTrustedData, FirebaseError, CreateTenantServicePersonTrustedVariables>): UseDataConnectMutationResult<CreateTenantServicePersonTrustedData, CreateTenantServicePersonTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useCreateTenantServicePersonTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<CreateTenantServicePersonTrustedData, FirebaseError, CreateTenantServicePersonTrustedVariables>): UseDataConnectMutationResult<CreateTenantServicePersonTrustedData, CreateTenantServicePersonTrustedVariables>;
```

### Variables
The `CreateTenantServicePersonTrusted` Mutation requires an argument of type `CreateTenantServicePersonTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface CreateTenantServicePersonTrustedVariables {
  id: UUIDString;
  organizationId: UUIDString;
  fullName: string;
  email?: string | null;
  phone: string;
  address?: string | null;
  specialization?: string | null;
  yearsOfExperience?: number | null;
  assignmentScope: string;
  notes?: string | null;
}
```
### Return Type
Recall that calling the `CreateTenantServicePersonTrusted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateTenantServicePersonTrusted` Mutation is of type `CreateTenantServicePersonTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface CreateTenantServicePersonTrustedData {
  servicePerson_insert: ServicePerson_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateTenantServicePersonTrusted`'s Mutation hook function

```javascrip
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
    id: ...,
    organizationId: ...,
    fullName: ...,
    email: ..., // optional
    phone: ...,
    address: ..., // optional
    specialization: ..., // optional
    yearsOfExperience: ..., // optional
    assignmentScope: ...,
    notes: ..., // optional
  };
  mutation.mutate(createTenantServicePersonTrustedVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., organizationId: ..., fullName: ..., email: ..., phone: ..., address: ..., specialization: ..., yearsOfExperience: ..., assignmentScope: ..., notes: ..., });

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
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateTenantServicePersonTrusted
You can execute the `UpdateTenantServicePersonTrusted` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useUpdateTenantServicePersonTrusted(options?: useDataConnectMutationOptions<UpdateTenantServicePersonTrustedData, FirebaseError, UpdateTenantServicePersonTrustedVariables>): UseDataConnectMutationResult<UpdateTenantServicePersonTrustedData, UpdateTenantServicePersonTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useUpdateTenantServicePersonTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateTenantServicePersonTrustedData, FirebaseError, UpdateTenantServicePersonTrustedVariables>): UseDataConnectMutationResult<UpdateTenantServicePersonTrustedData, UpdateTenantServicePersonTrustedVariables>;
```

### Variables
The `UpdateTenantServicePersonTrusted` Mutation requires an argument of type `UpdateTenantServicePersonTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface UpdateTenantServicePersonTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
  fullName: string;
  email?: string | null;
  phone: string;
  address?: string | null;
  specialization?: string | null;
  yearsOfExperience?: number | null;
  assignmentScope: string;
  notes?: string | null;
}
```
### Return Type
Recall that calling the `UpdateTenantServicePersonTrusted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateTenantServicePersonTrusted` Mutation is of type `UpdateTenantServicePersonTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface UpdateTenantServicePersonTrustedData {
  servicePerson_update?: ServicePerson_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateTenantServicePersonTrusted`'s Mutation hook function

```javascrip
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
    address: ..., // optional
    specialization: ..., // optional
    yearsOfExperience: ..., // optional
    assignmentScope: ...,
    notes: ..., // optional
  };
  mutation.mutate(updateTenantServicePersonTrustedVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., id: ..., fullName: ..., email: ..., phone: ..., address: ..., specialization: ..., yearsOfExperience: ..., assignmentScope: ..., notes: ..., });

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
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ChangeTenantServicePersonStatusTrusted
You can execute the `ChangeTenantServicePersonStatusTrusted` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useChangeTenantServicePersonStatusTrusted(options?: useDataConnectMutationOptions<ChangeTenantServicePersonStatusTrustedData, FirebaseError, ChangeTenantServicePersonStatusTrustedVariables>): UseDataConnectMutationResult<ChangeTenantServicePersonStatusTrustedData, ChangeTenantServicePersonStatusTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useChangeTenantServicePersonStatusTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<ChangeTenantServicePersonStatusTrustedData, FirebaseError, ChangeTenantServicePersonStatusTrustedVariables>): UseDataConnectMutationResult<ChangeTenantServicePersonStatusTrustedData, ChangeTenantServicePersonStatusTrustedVariables>;
```

### Variables
The `ChangeTenantServicePersonStatusTrusted` Mutation requires an argument of type `ChangeTenantServicePersonStatusTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface ChangeTenantServicePersonStatusTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
  status: EmploymentStatus;
}
```
### Return Type
Recall that calling the `ChangeTenantServicePersonStatusTrusted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ChangeTenantServicePersonStatusTrusted` Mutation is of type `ChangeTenantServicePersonStatusTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface ChangeTenantServicePersonStatusTrustedData {
  servicePerson_update?: ServicePerson_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ChangeTenantServicePersonStatusTrusted`'s Mutation hook function

```javascrip
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
  };
  mutation.mutate(changeTenantServicePersonStatusTrustedVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., id: ..., status: ..., });

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
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AssignTenantEmployeeOutletTrusted
You can execute the `AssignTenantEmployeeOutletTrusted` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useAssignTenantEmployeeOutletTrusted(options?: useDataConnectMutationOptions<AssignTenantEmployeeOutletTrustedData, FirebaseError, AssignTenantEmployeeOutletTrustedVariables>): UseDataConnectMutationResult<AssignTenantEmployeeOutletTrustedData, AssignTenantEmployeeOutletTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useAssignTenantEmployeeOutletTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<AssignTenantEmployeeOutletTrustedData, FirebaseError, AssignTenantEmployeeOutletTrustedVariables>): UseDataConnectMutationResult<AssignTenantEmployeeOutletTrustedData, AssignTenantEmployeeOutletTrustedVariables>;
```

### Variables
The `AssignTenantEmployeeOutletTrusted` Mutation requires an argument of type `AssignTenantEmployeeOutletTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface AssignTenantEmployeeOutletTrustedVariables {
  organizationId: UUIDString;
  employeeId: UUIDString;
  outletId: UUIDString;
}
```
### Return Type
Recall that calling the `AssignTenantEmployeeOutletTrusted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AssignTenantEmployeeOutletTrusted` Mutation is of type `AssignTenantEmployeeOutletTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface AssignTenantEmployeeOutletTrustedData {
  employeeOutlet_upsert: EmployeeOutlet_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AssignTenantEmployeeOutletTrusted`'s Mutation hook function

```javascrip
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
  };
  mutation.mutate(assignTenantEmployeeOutletTrustedVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., employeeId: ..., outletId: ..., });

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
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteTenantEmployeeOutletTrusted
You can execute the `DeleteTenantEmployeeOutletTrusted` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useDeleteTenantEmployeeOutletTrusted(options?: useDataConnectMutationOptions<DeleteTenantEmployeeOutletTrustedData, FirebaseError, DeleteTenantEmployeeOutletTrustedVariables>): UseDataConnectMutationResult<DeleteTenantEmployeeOutletTrustedData, DeleteTenantEmployeeOutletTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useDeleteTenantEmployeeOutletTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteTenantEmployeeOutletTrustedData, FirebaseError, DeleteTenantEmployeeOutletTrustedVariables>): UseDataConnectMutationResult<DeleteTenantEmployeeOutletTrustedData, DeleteTenantEmployeeOutletTrustedVariables>;
```

### Variables
The `DeleteTenantEmployeeOutletTrusted` Mutation requires an argument of type `DeleteTenantEmployeeOutletTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface DeleteTenantEmployeeOutletTrustedVariables {
  organizationId: UUIDString;
  employeeId: UUIDString;
  outletId: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteTenantEmployeeOutletTrusted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteTenantEmployeeOutletTrusted` Mutation is of type `DeleteTenantEmployeeOutletTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface DeleteTenantEmployeeOutletTrustedData {
  employeeOutlet_delete?: EmployeeOutlet_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteTenantEmployeeOutletTrusted`'s Mutation hook function

```javascrip
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteTenantEmployeeOutletTrustedVariables } from '@omniretail/sql-connect';
import { useDeleteTenantEmployeeOutletTrusted } from '@omniretail/sql-connect/react'

export default function DeleteTenantEmployeeOutletTrustedComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteTenantEmployeeOutletTrusted();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteTenantEmployeeOutletTrusted(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteTenantEmployeeOutletTrusted(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteTenantEmployeeOutletTrusted(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteTenantEmployeeOutletTrusted` Mutation requires an argument of type `DeleteTenantEmployeeOutletTrustedVariables`:
  const deleteTenantEmployeeOutletTrustedVars: DeleteTenantEmployeeOutletTrustedVariables = {
    organizationId: ...,
    employeeId: ...,
    outletId: ...,
  };
  mutation.mutate(deleteTenantEmployeeOutletTrustedVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., employeeId: ..., outletId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteTenantEmployeeOutletTrustedVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.employeeOutlet_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AssignTenantServicePersonOutletTrusted
You can execute the `AssignTenantServicePersonOutletTrusted` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [sql-connect/react/index.d.ts](./index.d.ts)):
```javascrip
useAssignTenantServicePersonOutletTrusted(options?: useDataConnectMutationOptions<AssignTenantServicePersonOutletTrustedData, FirebaseError, AssignTenantServicePersonOutletTrustedVariables>): UseDataConnectMutationResult<AssignTenantServicePersonOutletTrustedData, AssignTenantServicePersonOutletTrustedVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascrip
useAssignTenantServicePersonOutletTrusted(dc: DataConnect, options?: useDataConnectMutationOptions<AssignTenantServicePersonOutletTrustedData, FirebaseError, AssignTenantServicePersonOutletTrustedVariables>): UseDataConnectMutationResult<AssignTenantServicePersonOutletTrustedData, AssignTenantServicePersonOutletTrustedVariables>;
```

### Variables
The `AssignTenantServicePersonOutletTrusted` Mutation requires an argument of type `AssignTenantServicePersonOutletTrustedVariables`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:

```javascrip
export interface AssignTenantServicePersonOutletTrustedVariables {
  organizationId: UUIDString;
  servicePersonId: UUIDString;
  outletId: UUIDString;
}
```
### Return Type
Recall that calling the `AssignTenantServicePersonOutletTrusted` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AssignTenantServicePersonOutletTrusted` Mutation is of type `AssignTenantServicePersonOutletTrustedData`, which is defined in [sql-connect/index.d.ts](../index.d.ts). It has the following fields:
```javascrip
export interface AssignTenantServicePersonOutletTrustedData {
  servicePersonOutlet_upsert: ServicePersonOutlet_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AssignTenantServicePersonOutletTrusted`'s Mutation hook function

```javascrip
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
  };
  mutation.mutate(assignTenantServicePersonOutletTrustedVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., servicePersonId: ..., outletId: ..., });

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
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

