# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useGetCurrentUserAuthorization, useGetUserAuthorizationByFirebaseUid, useResolveUsernameLogin, useRecordSuccessfulLogin, useUpdateAppUserProfile, useGetAppUserForBootstrap, useBootstrapMasterAdmin, useGetCurrentAppUser, useGetAppUserByFirebaseUid, useListLicensePlans } from '@omniretail/sql-connect/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useGetCurrentUserAuthorization();

const { data, isPending, isSuccess, isError, error } = useGetUserAuthorizationByFirebaseUid(getUserAuthorizationByFirebaseUidVars);

const { data, isPending, isSuccess, isError, error } = useResolveUsernameLogin(resolveUsernameLoginVars);

const { data, isPending, isSuccess, isError, error } = useRecordSuccessfulLogin(recordSuccessfulLoginVars);

const { data, isPending, isSuccess, isError, error } = useUpdateAppUserProfile(updateAppUserProfileVars);

const { data, isPending, isSuccess, isError, error } = useGetAppUserForBootstrap(getAppUserForBootstrapVars);

const { data, isPending, isSuccess, isError, error } = useBootstrapMasterAdmin(bootstrapMasterAdminVars);

const { data, isPending, isSuccess, isError, error } = useGetCurrentAppUser();

const { data, isPending, isSuccess, isError, error } = useGetAppUserByFirebaseUid(getAppUserByFirebaseUidVars);

const { data, isPending, isSuccess, isError, error } = useListLicensePlans();

```

Here's an example from a different generated SDK:

```ts
import { useListAllMovies } from '@dataconnect/generated/react';

function MyComponent() {
  const { isLoading, data, error } = useListAllMovies();
  if(isLoading) {
    return <div>Loading...</div>
  }
  if(error) {
    return <div> An Error Occurred: {error} </div>
  }
}

// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyComponent from './my-component';

function App() {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>
    <MyComponent />
  </QueryClientProvider>
}
```



## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { getCurrentUserAuthorization, getUserAuthorizationByFirebaseUid, resolveUsernameLogin, recordSuccessfulLogin, updateAppUserProfile, getAppUserForBootstrap, bootstrapMasterAdmin, getCurrentAppUser, getAppUserByFirebaseUid, listLicensePlans } from '@omniretail/sql-connect';


// Operation GetCurrentUserAuthorization:
const { data } = await GetCurrentUserAuthorization(dataConnect);

// Operation GetUserAuthorizationByFirebaseUid:  For variables, look at type GetUserAuthorizationByFirebaseUidVars in ../index.d.ts
const { data } = await GetUserAuthorizationByFirebaseUid(dataConnect, getUserAuthorizationByFirebaseUidVars);

// Operation ResolveUsernameLogin:  For variables, look at type ResolveUsernameLoginVars in ../index.d.ts
const { data } = await ResolveUsernameLogin(dataConnect, resolveUsernameLoginVars);

// Operation RecordSuccessfulLogin:  For variables, look at type RecordSuccessfulLoginVars in ../index.d.ts
const { data } = await RecordSuccessfulLogin(dataConnect, recordSuccessfulLoginVars);

// Operation UpdateAppUserProfile:  For variables, look at type UpdateAppUserProfileVars in ../index.d.ts
const { data } = await UpdateAppUserProfile(dataConnect, updateAppUserProfileVars);

// Operation GetAppUserForBootstrap:  For variables, look at type GetAppUserForBootstrapVars in ../index.d.ts
const { data } = await GetAppUserForBootstrap(dataConnect, getAppUserForBootstrapVars);

// Operation BootstrapMasterAdmin:  For variables, look at type BootstrapMasterAdminVars in ../index.d.ts
const { data } = await BootstrapMasterAdmin(dataConnect, bootstrapMasterAdminVars);

// Operation GetCurrentAppUser:
const { data } = await GetCurrentAppUser(dataConnect);

// Operation GetAppUserByFirebaseUid:  For variables, look at type GetAppUserByFirebaseUidVars in ../index.d.ts
const { data } = await GetAppUserByFirebaseUid(dataConnect, getAppUserByFirebaseUidVars);

// Operation ListLicensePlans:
const { data } = await ListLicensePlans(dataConnect);


```