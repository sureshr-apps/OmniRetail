import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;


export enum AppUserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
};

export enum CustomerStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
};

export enum CustomerType {
  INDIVIDUAL = "INDIVIDUAL",
  BUSINESS = "BUSINESS",
};

export enum EmploymentStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
};

export enum ExpenseApprovalStatus {
  DRAFT = "DRAFT",
  PENDING_APPROVAL = "PENDING_APPROVAL",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
};

export enum ExpenseStatus {
  ACTIVE = "ACTIVE",
  VOIDED = "VOIDED",
};

export enum InventoryAdjustmentMode {
  INCREASE = "INCREASE",
  DECREASE = "DECREASE",
  RECONCILE = "RECONCILE",
};

export enum LicenseEventType {
  ASSIGNED = "ASSIGNED",
  PLAN_CHANGED = "PLAN_CHANGED",
  COMMERCIAL_TERMS_MODIFIED = "COMMERCIAL_TERMS_MODIFIED",
  RENEWED = "RENEWED",
};

export enum LicensePlanStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
};

export enum LoginAccessStatus {
  ENABLED = "ENABLED",
  DISABLED = "DISABLED",
};

export enum MembershipStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
};

export enum OrganizationStatus {
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
};

export enum OutletStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
};

export enum ProductStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
};

export enum ProductType {
  STOCKABLE = "STOCKABLE",
  SERVICE = "SERVICE",
  CONSUMABLE = "CONSUMABLE",
};

export enum ProvisioningAttemptStatus {
  IN_PROGRESS = "IN_PROGRESS",
  SUCCEEDED = "SUCCEEDED",
  FAILED_RETRYABLE = "FAILED_RETRYABLE",
  FAILED_TERMINAL = "FAILED_TERMINAL",
  REQUIRES_RECONCILIATION = "REQUIRES_RECONCILIATION",
};

export enum PurchasePaymentStatus {
  PAID = "PAID",
  PARTIALLY_PAID = "PARTIALLY_PAID",
  UNPAID = "UNPAID",
};

export enum PurchaseReceiptStatus {
  PENDING = "PENDING",
  PARTIALLY_RECEIVED = "PARTIALLY_RECEIVED",
  RECEIVED = "RECEIVED",
};

export enum PurchaseStatus {
  ACTIVE = "ACTIVE",
  DRAFT = "DRAFT",
  CANCELLED = "CANCELLED",
};

export enum SaleStatus {
  COMPLETED = "COMPLETED",
  PARTIAL_REFUND = "PARTIAL_REFUND",
  REFUNDED = "REFUNDED",
  VOIDED = "VOIDED",
};

export enum SaleTenderType {
  VISA = "VISA",
  MASTERCARD = "MASTERCARD",
  APPLE_PAY = "APPLE_PAY",
  CASH = "CASH",
  SPLIT = "SPLIT",
  REVERSAL = "REVERSAL",
  NONE = "NONE",
};

export enum SupplierStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
};



export interface AddTenantSaleLineData {
  saleLine_insert: SaleLine_Key;
  inventoryStock_update?: InventoryStock_Key | null;
  auditEvent_insert: AuditEvent_Key;
}

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

export interface AdjustTenantInventoryData {
  inventoryStock_update?: InventoryStock_Key | null;
  inventoryMovement_insert: InventoryMovement_Key;
}

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

export interface AppUser_Key {
  id: UUIDString;
  __typename?: 'AppUser_Key';
}

export interface AssignOrganizationLicenseTrustedData {
  organizationLicense_insert: OrganizationLicense_Key;
  licenseHistory_insert: LicenseHistory_Key;
  auditEvent_insert: AuditEvent_Key;
}

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

export interface AssignTenantEmployeeOutletTrustedData {
  employeeOutlet_upsert: EmployeeOutlet_Key;
  auditEvent_insert: AuditEvent_Key;
}

export interface AssignTenantEmployeeOutletTrustedVariables {
  organizationId: UUIDString;
  employeeId: UUIDString;
  outletId: UUIDString;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}

export interface AssignTenantServicePersonOutletTrustedData {
  servicePersonOutlet_upsert: ServicePersonOutlet_Key;
  auditEvent_insert: AuditEvent_Key;
}

export interface AssignTenantServicePersonOutletTrustedVariables {
  organizationId: UUIDString;
  servicePersonId: UUIDString;
  outletId: UUIDString;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}

export interface AuditEvent_Key {
  id: UUIDString;
  __typename?: 'AuditEvent_Key';
}

export interface BootstrapMasterAdminData {
  appUser_upsert: AppUser_Key;
  userRole_upsert: UserRole_Key;
  auditEvent_upsert: AuditEvent_Key;
}

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

export interface ChangeLicensePlanStatusData {
  licensePlan_update?: LicensePlan_Key | null;
  auditEvent_insert: AuditEvent_Key;
}

export interface ChangeLicensePlanStatusVariables {
  id: UUIDString;
  status: LicensePlanStatus;
  action: string;
  auditId: UUIDString;
  requestId: string;
}

export interface ChangeOrganizationAdministratorStatusData {
  appUser_update?: AppUser_Key | null;
  organizationMembership_update?: OrganizationMembership_Key | null;
  auditEvent_insert: AuditEvent_Key;
}

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

export interface ChangeOrganizationLicensePlanTrustedData {
  organizationLicense_update?: OrganizationLicense_Key | null;
  licenseHistory_insert: LicenseHistory_Key;
  auditEvent_insert: AuditEvent_Key;
}

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

export interface ChangeOrganizationStatusData {
  organization_update?: Organization_Key | null;
  auditEvent_insert: AuditEvent_Key;
}

export interface ChangeOrganizationStatusVariables {
  id: UUIDString;
  status: OrganizationStatus;
  action: string;
  auditId: UUIDString;
  requestId: string;
}

export interface ChangeTenantCustomerStatusData {
  customer_update?: Customer_Key | null;
  auditEvent_insert: AuditEvent_Key;
}

export interface ChangeTenantCustomerStatusVariables {
  organizationId: UUIDString;
  id: UUIDString;
  status: CustomerStatus;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}

export interface ChangeTenantEmployeeLoginAccessTrustedData {
  employee_update?: Employee_Key | null;
  appUser_update?: AppUser_Key | null;
  auditEvent_insert: AuditEvent_Key;
}

export interface ChangeTenantEmployeeLoginAccessTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
  userId: UUIDString;
  loginAccess: LoginAccessStatus;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}

export interface ChangeTenantEmployeeStatusTrustedData {
  employee_update?: Employee_Key | null;
  auditEvent_insert: AuditEvent_Key;
}

export interface ChangeTenantEmployeeStatusTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
  status: EmploymentStatus;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}

export interface ChangeTenantExpenseApprovalData {
  expense_update?: Expense_Key | null;
  auditEvent_insert: AuditEvent_Key;
}

export interface ChangeTenantExpenseApprovalVariables {
  organizationId: UUIDString;
  id: UUIDString;
  approvalStatus: ExpenseApprovalStatus;
  reason?: string | null;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}

export interface ChangeTenantOutletStatusData {
  outlet_update?: Outlet_Key | null;
  auditEvent_insert: AuditEvent_Key;
}

export interface ChangeTenantOutletStatusTrustedData {
  outlet_update?: Outlet_Key | null;
  auditEvent_insert: AuditEvent_Key;
}

export interface ChangeTenantOutletStatusTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
  status: OutletStatus;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}

export interface ChangeTenantOutletStatusVariables {
  organizationId: UUIDString;
  id: UUIDString;
  status: OutletStatus;
  auditId: UUIDString;
  requestId: string;
}

export interface ChangeTenantProductStatusData {
  product_update?: Product_Key | null;
  auditEvent_insert: AuditEvent_Key;
}

export interface ChangeTenantProductStatusVariables {
  organizationId: UUIDString;
  id: UUIDString;
  status: ProductStatus;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}

export interface ChangeTenantPurchaseStatusData {
  purchase_update?: Purchase_Key | null;
  auditEvent_insert: AuditEvent_Key;
}

export interface ChangeTenantPurchaseStatusVariables {
  organizationId: UUIDString;
  id: UUIDString;
  status: PurchaseStatus;
  reason?: string | null;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}

export interface ChangeTenantServicePersonStatusTrustedData {
  servicePerson_update?: ServicePerson_Key | null;
  auditEvent_insert: AuditEvent_Key;
}

export interface ChangeTenantServicePersonStatusTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
  status: EmploymentStatus;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}

export interface ChangeTenantSupplierStatusData {
  supplier_update?: Supplier_Key | null;
  auditEvent_insert: AuditEvent_Key;
}

export interface ChangeTenantSupplierStatusVariables {
  organizationId: UUIDString;
  id: UUIDString;
  status: SupplierStatus;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}

export interface ClaimLifecycleIdempotencyData {
  lifecycleIdempotency_insert: LifecycleIdempotency_Key;
}

export interface ClaimLifecycleIdempotencyVariables {
  idempotencyKey: string;
  operationType: string;
  requestFingerprint: string;
}

export interface CompleteLifecycleIdempotencyData {
  lifecycleIdempotency_update?: LifecycleIdempotency_Key | null;
}

export interface CompleteLifecycleIdempotencyVariables {
  idempotencyKey: string;
  status: ProvisioningAttemptStatus;
  resultReference?: string | null;
}

export interface CreateLicensePlanData {
  licensePlan_insert: LicensePlan_Key;
  auditEvent_insert: AuditEvent_Key;
}

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

export interface CreateOrganizationData {
  organization_insert: Organization_Key;
  auditEvent_insert: AuditEvent_Key;
}

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

export interface CreateTenantCustomerData {
  customer_insert: Customer_Key;
  auditEvent_insert: AuditEvent_Key;
}

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

export interface CreateTenantEmployeeProfileTrustedData {
  employee_insert: Employee_Key;
  auditEvent_insert: AuditEvent_Key;
}

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

export interface CreateTenantExpenseData {
  expense_insert: Expense_Key;
  auditEvent_insert: AuditEvent_Key;
}

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

export interface CreateTenantInventoryStockData {
  inventoryStock_upsert: InventoryStock_Key;
  inventoryMovement_insert: InventoryMovement_Key;
}

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

export interface CreateTenantOutletData {
  outlet_insert: Outlet_Key;
  auditEvent_insert: AuditEvent_Key;
}

export interface CreateTenantOutletTrustedData {
  outlet_insert: Outlet_Key;
  auditEvent_insert: AuditEvent_Key;
}

export interface CreateTenantOutletTrustedVariables {
  organizationId: UUIDString;
  outletCode: string;
  name: string;
  contactPerson: string;
  email?: string | null;
  phone: string;
  address: string;
  city: string;
  state?: string | null;
  postalCode?: string | null;
  timezone: string;
  currency: string;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}

export interface CreateTenantOutletVariables {
  organizationId: UUIDString;
  outletCode: string;
  name: string;
  contactPerson: string;
  email?: string | null;
  phone: string;
  address: string;
  city: string;
  state?: string | null;
  postalCode?: string | null;
  timezone: string;
  currency: string;
  auditId: UUIDString;
  requestId: string;
}

export interface CreateTenantProductData {
  product_insert: Product_Key;
  auditEvent_insert: AuditEvent_Key;
}

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

export interface CreateTenantPurchaseData {
  purchase_insert: Purchase_Key;
  auditEvent_insert: AuditEvent_Key;
}

export interface CreateTenantPurchaseLineData {
  purchaseLine_insert: PurchaseLine_Key;
  auditEvent_insert: AuditEvent_Key;
}

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

export interface CreateTenantSaleData {
  sale_insert: Sale_Key;
  auditEvent_insert: AuditEvent_Key;
}

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

export interface CreateTenantServicePersonTrustedData {
  servicePerson_insert: ServicePerson_Key;
  auditEvent_insert: AuditEvent_Key;
}

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

export interface CreateTenantSupplierData {
  supplier_insert: Supplier_Key;
  auditEvent_insert: AuditEvent_Key;
}

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

export interface Customer_Key {
  id: UUIDString;
  __typename?: 'Customer_Key';
}

export interface DeleteAppUserTrustedData {
  appUser_delete?: AppUser_Key | null;
}

export interface DeleteAppUserTrustedVariables {
  id: UUIDString;
}

export interface DeleteLicensePlanData {
  licensePlan_delete?: LicensePlan_Key | null;
  auditEvent_insert: AuditEvent_Key;
}

export interface DeleteLicensePlanTrustedData {
  licensePlan_delete?: LicensePlan_Key | null;
  auditEvent_insert: AuditEvent_Key;
}

export interface DeleteLicensePlanTrustedVariables {
  id: UUIDString;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}

export interface DeleteLicensePlanVariables {
  id: UUIDString;
  auditId: UUIDString;
  requestId: string;
}

export interface DeleteOrganizationTrustedData {
  organization_delete?: Organization_Key | null;
}

export interface DeleteOrganizationTrustedVariables {
  id: UUIDString;
}

export interface EmployeeOutlet_Key {
  employeeId: UUIDString;
  outletId: UUIDString;
  __typename?: 'EmployeeOutlet_Key';
}

export interface Employee_Key {
  id: UUIDString;
  __typename?: 'Employee_Key';
}

export interface EnsureAppUserRoleTrustedData {
  userRole_upsert: UserRole_Key;
}

export interface EnsureAppUserRoleTrustedVariables {
  userId: UUIDString;
  roleId: UUIDString;
}

export interface Expense_Key {
  id: UUIDString;
  __typename?: 'Expense_Key';
}

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

export interface GetAppUserByFirebaseUidVariables {
  firebaseUid: string;
}

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

export interface GetAppUserForBootstrapVariables {
  firebaseUid: string;
}

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
      };
      status: MembershipStatus;
    })[];
  } & AppUser_Key)[];
}

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

export interface GetLicensePlanReferencesTrustedData {
  organizationLicenses: ({
    id: UUIDString;
  } & OrganizationLicense_Key)[];
  licenseHistories: ({
    id: UUIDString;
  } & LicenseHistory_Key)[];
}

export interface GetLicensePlanReferencesTrustedVariables {
  id: UUIDString;
}

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

export interface GetLicensePlanTrustedVariables {
  id: UUIDString;
}

export interface GetLicensePlanVariables {
  id: UUIDString;
}

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

export interface GetLifecycleIdempotencyVariables {
  idempotencyKey: string;
}

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

export interface GetOrganizationAdministratorVariables {
  organizationId: UUIDString;
  userId: UUIDString;
}

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

export interface GetOrganizationLicenseHistoryPublicVariables {
  organizationId: UUIDString;
}

export interface GetOrganizationLicenseHistoryVariables {
  organizationId: UUIDString;
}

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

export interface GetOrganizationLicensePublicVariables {
  organizationId: UUIDString;
}

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

export interface GetOrganizationLicenseTrustedVariables {
  organizationId: UUIDString;
}

export interface GetOrganizationLicenseVariables {
  organizationId: UUIDString;
}

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

export interface GetOrganizationTrustedVariables {
  id: UUIDString;
}

export interface GetOrganizationVariables {
  id: UUIDString;
}

export interface GetTenantInventoryStockTrustedData {
  inventoryStocks: ({
    onHandQty: number;
  })[];
}

export interface GetTenantInventoryStockTrustedVariables {
  organizationId: UUIDString;
  outletId: UUIDString;
  productId: UUIDString;
}

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

export interface GetTenantMembershipTrustedVariables {
  organizationId: UUIDString;
  firebaseUid: string;
}

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
      };
      status: MembershipStatus;
    })[];
  } & AppUser_Key)[];
}

export interface GetUserAuthorizationByFirebaseUidVariables {
  firebaseUid: string;
}

export interface InventoryMovement_Key {
  id: UUIDString;
  __typename?: 'InventoryMovement_Key';
}

export interface InventoryStock_Key {
  organizationId: UUIDString;
  outletId: UUIDString;
  productId: UUIDString;
  __typename?: 'InventoryStock_Key';
}

export interface LicenseHistory_Key {
  id: UUIDString;
  __typename?: 'LicenseHistory_Key';
}

export interface LicensePlan_Key {
  id: UUIDString;
  __typename?: 'LicensePlan_Key';
}

export interface LifecycleIdempotency_Key {
  idempotencyKey: string;
  __typename?: 'LifecycleIdempotency_Key';
}

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

export interface ListOrganizationAdministratorsVariables {
  organizationId: UUIDString;
}

export interface ListOrganizationLicensePlanAssignmentsData {
  organizationLicenses: ({
    plan: {
      id: UUIDString;
    } & LicensePlan_Key;
  })[];
}

export interface ListOrganizationUsersForDeletionTrustedData {
  organizationMemberships: ({
    user: {
      id: UUIDString;
      firebaseUid: string;
    } & AppUser_Key;
  })[];
}

export interface ListOrganizationUsersForDeletionTrustedVariables {
  organizationId: UUIDString;
}

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

export interface ListTenantCustomersVariables {
  organizationId: UUIDString;
}

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

export interface ListTenantEmployeesVariables {
  organizationId: UUIDString;
}

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

export interface ListTenantExpensesVariables {
  organizationId: UUIDString;
}

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

export interface ListTenantInventoryVariables {
  organizationId: UUIDString;
  outletId?: UUIDString | null;
}

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
    city: string;
    state?: string | null;
    postalCode?: string | null;
    timezone: string;
    currency: string;
    status: OutletStatus;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & Outlet_Key)[];
}

export interface ListTenantOutletsVariables {
  organizationId: UUIDString;
}

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

export interface ListTenantProductsVariables {
  organizationId: UUIDString;
}

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

export interface ListTenantPurchasesVariables {
  organizationId: UUIDString;
}

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

export interface ListTenantSalesVariables {
  organizationId: UUIDString;
}

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

export interface ListTenantServicePersonsVariables {
  organizationId: UUIDString;
}

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

export interface ListTenantSuppliersVariables {
  organizationId: UUIDString;
}

export interface ModifyOrganizationCommercialTermsTrustedData {
  organizationLicense_update?: OrganizationLicense_Key | null;
  licenseHistory_insert: LicenseHistory_Key;
  auditEvent_insert: AuditEvent_Key;
}

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

export interface OrganizationLicense_Key {
  id: UUIDString;
  __typename?: 'OrganizationLicense_Key';
}

export interface OrganizationMembership_Key {
  organizationId: UUIDString;
  userId: UUIDString;
  __typename?: 'OrganizationMembership_Key';
}

export interface Organization_Key {
  id: UUIDString;
  __typename?: 'Organization_Key';
}

export interface Outlet_Key {
  id: UUIDString;
  __typename?: 'Outlet_Key';
}

export interface Permission_Key {
  id: UUIDString;
  __typename?: 'Permission_Key';
}

export interface Product_Key {
  id: UUIDString;
  __typename?: 'Product_Key';
}

export interface ProvisionOrganizationAdministratorData {
  appUser_insert: AppUser_Key;
  organizationMembership_insert: OrganizationMembership_Key;
  userRole_upsert: UserRole_Key;
  auditEvent_insert: AuditEvent_Key;
}

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

export interface ProvisionTenantEmployeeTrustedData {
  appUser_insert: AppUser_Key;
  organizationMembership_insert: OrganizationMembership_Key;
  userRole_upsert: UserRole_Key;
  employee_insert: Employee_Key;
  auditEvent_insert: AuditEvent_Key;
}

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

export interface ProvisioningReconciliation_Key {
  id: UUIDString;
  __typename?: 'ProvisioningReconciliation_Key';
}

export interface PurchaseLine_Key {
  id: UUIDString;
  __typename?: 'PurchaseLine_Key';
}

export interface Purchase_Key {
  id: UUIDString;
  __typename?: 'Purchase_Key';
}

export interface ReceiveTenantPurchaseLineData {
  purchaseLine_update?: PurchaseLine_Key | null;
  purchase_update?: Purchase_Key | null;
  inventoryStock_update?: InventoryStock_Key | null;
  auditEvent_insert: AuditEvent_Key;
}

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

export interface RecordAdministratorSecurityEventData {
  auditEvent_insert: AuditEvent_Key;
}

export interface RecordAdministratorSecurityEventVariables {
  auditId: UUIDString;
  actorFirebaseUid: string;
  action: string;
  targetId: UUIDString;
  organizationId: UUIDString;
  requestId: string;
}

export interface RecordPasswordChangeData {
  auditEvent_insert: AuditEvent_Key;
}

export interface RecordPasswordChangeVariables {
  userId: UUIDString;
  auditId: UUIDString;
  requestId: string;
}

export interface RecordProvisioningReconciliationData {
  provisioningReconciliation_insert: ProvisioningReconciliation_Key;
}

export interface RecordProvisioningReconciliationVariables {
  idempotencyKey: string;
  firebaseUid: string;
  errorClass: string;
}

export interface RecordSuccessfulLoginData {
  appUser_update?: AppUser_Key | null;
  auditEvent_insert: AuditEvent_Key;
}

export interface RecordSuccessfulLoginVariables {
  userId: UUIDString;
  auditId: UUIDString;
  requestId: string;
}

export interface RenewOrganizationLicenseTrustedData {
  organizationLicense_update?: OrganizationLicense_Key | null;
  licenseHistory_insert: LicenseHistory_Key;
  auditEvent_insert: AuditEvent_Key;
}

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

export interface ResolveOrganizationAdministratorIdentityVariables {
  organizationId: UUIDString;
  appUserId: UUIDString;
}

export interface ResolveUsernameLoginData {
  appUsers: ({
    id: UUIDString;
    firebaseUid: string;
    email: string;
    status: AppUserStatus;
  } & AppUser_Key)[];
}

export interface ResolveUsernameLoginVariables {
  username: string;
}

export interface RolePermission_Key {
  roleId: UUIDString;
  permissionId: UUIDString;
  __typename?: 'RolePermission_Key';
}

export interface Role_Key {
  id: UUIDString;
  __typename?: 'Role_Key';
}

export interface SaleLine_Key {
  id: UUIDString;
  __typename?: 'SaleLine_Key';
}

export interface Sale_Key {
  id: UUIDString;
  __typename?: 'Sale_Key';
}

export interface ServicePersonOutlet_Key {
  servicePersonId: UUIDString;
  outletId: UUIDString;
  __typename?: 'ServicePersonOutlet_Key';
}

export interface ServicePerson_Key {
  id: UUIDString;
  __typename?: 'ServicePerson_Key';
}

export interface Supplier_Key {
  id: UUIDString;
  __typename?: 'Supplier_Key';
}

export interface UpdateAppUserProfileData {
  appUser_update?: AppUser_Key | null;
  auditEvent_insert: AuditEvent_Key;
}

export interface UpdateAppUserProfileVariables {
  userId: UUIDString;
  displayName: string;
  phone?: string | null;
  auditId: UUIDString;
  requestId: string;
}

export interface UpdateLicensePlanData {
  licensePlan_update?: LicensePlan_Key | null;
  auditEvent_insert: AuditEvent_Key;
}

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

export interface UpdateOrganizationAdministratorData {
  appUser_update?: AppUser_Key | null;
  auditEvent_insert: AuditEvent_Key;
}

export interface UpdateOrganizationAdministratorVariables {
  organizationId: UUIDString;
  userId: UUIDString;
  displayName: string;
  phone: string;
  auditId: UUIDString;
  requestId: string;
}

export interface UpdateOrganizationData {
  organization_update?: Organization_Key | null;
  auditEvent_insert: AuditEvent_Key;
}

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

export interface UpdateTenantCustomerData {
  customer_update?: Customer_Key | null;
  auditEvent_insert: AuditEvent_Key;
}

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

export interface UpdateTenantEmployeeTrustedData {
  employee_update?: Employee_Key | null;
  auditEvent_insert: AuditEvent_Key;
}

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

export interface UpdateTenantExpenseData {
  expense_update?: Expense_Key | null;
  auditEvent_insert: AuditEvent_Key;
}

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

export interface UpdateTenantOutletData {
  outlet_update?: Outlet_Key | null;
  auditEvent_insert: AuditEvent_Key;
}

export interface UpdateTenantOutletTrustedData {
  outlet_update?: Outlet_Key | null;
  auditEvent_insert: AuditEvent_Key;
}

export interface UpdateTenantOutletTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
  name: string;
  contactPerson: string;
  email?: string | null;
  phone: string;
  address: string;
  city: string;
  state?: string | null;
  postalCode?: string | null;
  timezone: string;
  currency: string;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}

export interface UpdateTenantOutletVariables {
  organizationId: UUIDString;
  id: UUIDString;
  name: string;
  contactPerson: string;
  email?: string | null;
  phone: string;
  address: string;
  city: string;
  state?: string | null;
  postalCode?: string | null;
  timezone: string;
  currency: string;
  auditId: UUIDString;
  requestId: string;
}

export interface UpdateTenantProductData {
  product_update?: Product_Key | null;
  auditEvent_insert: AuditEvent_Key;
}

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

export interface UpdateTenantServicePersonTrustedData {
  servicePerson_update?: ServicePerson_Key | null;
  auditEvent_insert: AuditEvent_Key;
}

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

export interface UpdateTenantSupplierData {
  supplier_update?: Supplier_Key | null;
  auditEvent_insert: AuditEvent_Key;
}

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

export interface UserRole_Key {
  userId: UUIDString;
  roleId: UUIDString;
  __typename?: 'UserRole_Key';
}

export interface VoidTenantExpenseData {
  expense_update?: Expense_Key | null;
  auditEvent_insert: AuditEvent_Key;
}

export interface VoidTenantExpenseVariables {
  organizationId: UUIDString;
  id: UUIDString;
  reason: string;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}

export interface VoidTenantSaleData {
  sale_update?: Sale_Key | null;
  auditEvent_insert: AuditEvent_Key;
}

export interface VoidTenantSaleVariables {
  organizationId: UUIDString;
  saleId: UUIDString;
  reason: string;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}

interface GetCurrentUserAuthorizationRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetCurrentUserAuthorizationData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetCurrentUserAuthorizationData, undefined>;
  operationName: string;
}
export const getCurrentUserAuthorizationRef: GetCurrentUserAuthorizationRef;

export function getCurrentUserAuthorization(options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserAuthorizationData, undefined>;
export function getCurrentUserAuthorization(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserAuthorizationData, undefined>;

interface GetUserAuthorizationByFirebaseUidRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserAuthorizationByFirebaseUidVariables): QueryRef<GetUserAuthorizationByFirebaseUidData, GetUserAuthorizationByFirebaseUidVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetUserAuthorizationByFirebaseUidVariables): QueryRef<GetUserAuthorizationByFirebaseUidData, GetUserAuthorizationByFirebaseUidVariables>;
  operationName: string;
}
export const getUserAuthorizationByFirebaseUidRef: GetUserAuthorizationByFirebaseUidRef;

export function getUserAuthorizationByFirebaseUid(vars: GetUserAuthorizationByFirebaseUidVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserAuthorizationByFirebaseUidData, GetUserAuthorizationByFirebaseUidVariables>;
export function getUserAuthorizationByFirebaseUid(dc: DataConnect, vars: GetUserAuthorizationByFirebaseUidVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserAuthorizationByFirebaseUidData, GetUserAuthorizationByFirebaseUidVariables>;

interface ResolveUsernameLoginRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ResolveUsernameLoginVariables): QueryRef<ResolveUsernameLoginData, ResolveUsernameLoginVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ResolveUsernameLoginVariables): QueryRef<ResolveUsernameLoginData, ResolveUsernameLoginVariables>;
  operationName: string;
}
export const resolveUsernameLoginRef: ResolveUsernameLoginRef;

export function resolveUsernameLogin(vars: ResolveUsernameLoginVariables, options?: ExecuteQueryOptions): QueryPromise<ResolveUsernameLoginData, ResolveUsernameLoginVariables>;
export function resolveUsernameLogin(dc: DataConnect, vars: ResolveUsernameLoginVariables, options?: ExecuteQueryOptions): QueryPromise<ResolveUsernameLoginData, ResolveUsernameLoginVariables>;

interface RecordSuccessfulLoginRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RecordSuccessfulLoginVariables): MutationRef<RecordSuccessfulLoginData, RecordSuccessfulLoginVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RecordSuccessfulLoginVariables): MutationRef<RecordSuccessfulLoginData, RecordSuccessfulLoginVariables>;
  operationName: string;
}
export const recordSuccessfulLoginRef: RecordSuccessfulLoginRef;

export function recordSuccessfulLogin(vars: RecordSuccessfulLoginVariables): MutationPromise<RecordSuccessfulLoginData, RecordSuccessfulLoginVariables>;
export function recordSuccessfulLogin(dc: DataConnect, vars: RecordSuccessfulLoginVariables): MutationPromise<RecordSuccessfulLoginData, RecordSuccessfulLoginVariables>;

interface UpdateAppUserProfileRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateAppUserProfileVariables): MutationRef<UpdateAppUserProfileData, UpdateAppUserProfileVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateAppUserProfileVariables): MutationRef<UpdateAppUserProfileData, UpdateAppUserProfileVariables>;
  operationName: string;
}
export const updateAppUserProfileRef: UpdateAppUserProfileRef;

export function updateAppUserProfile(vars: UpdateAppUserProfileVariables): MutationPromise<UpdateAppUserProfileData, UpdateAppUserProfileVariables>;
export function updateAppUserProfile(dc: DataConnect, vars: UpdateAppUserProfileVariables): MutationPromise<UpdateAppUserProfileData, UpdateAppUserProfileVariables>;

interface RecordPasswordChangeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RecordPasswordChangeVariables): MutationRef<RecordPasswordChangeData, RecordPasswordChangeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RecordPasswordChangeVariables): MutationRef<RecordPasswordChangeData, RecordPasswordChangeVariables>;
  operationName: string;
}
export const recordPasswordChangeRef: RecordPasswordChangeRef;

export function recordPasswordChange(vars: RecordPasswordChangeVariables): MutationPromise<RecordPasswordChangeData, RecordPasswordChangeVariables>;
export function recordPasswordChange(dc: DataConnect, vars: RecordPasswordChangeVariables): MutationPromise<RecordPasswordChangeData, RecordPasswordChangeVariables>;

interface GetAppUserForBootstrapRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetAppUserForBootstrapVariables): QueryRef<GetAppUserForBootstrapData, GetAppUserForBootstrapVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetAppUserForBootstrapVariables): QueryRef<GetAppUserForBootstrapData, GetAppUserForBootstrapVariables>;
  operationName: string;
}
export const getAppUserForBootstrapRef: GetAppUserForBootstrapRef;

export function getAppUserForBootstrap(vars: GetAppUserForBootstrapVariables, options?: ExecuteQueryOptions): QueryPromise<GetAppUserForBootstrapData, GetAppUserForBootstrapVariables>;
export function getAppUserForBootstrap(dc: DataConnect, vars: GetAppUserForBootstrapVariables, options?: ExecuteQueryOptions): QueryPromise<GetAppUserForBootstrapData, GetAppUserForBootstrapVariables>;

interface BootstrapMasterAdminRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: BootstrapMasterAdminVariables): MutationRef<BootstrapMasterAdminData, BootstrapMasterAdminVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: BootstrapMasterAdminVariables): MutationRef<BootstrapMasterAdminData, BootstrapMasterAdminVariables>;
  operationName: string;
}
export const bootstrapMasterAdminRef: BootstrapMasterAdminRef;

export function bootstrapMasterAdmin(vars: BootstrapMasterAdminVariables): MutationPromise<BootstrapMasterAdminData, BootstrapMasterAdminVariables>;
export function bootstrapMasterAdmin(dc: DataConnect, vars: BootstrapMasterAdminVariables): MutationPromise<BootstrapMasterAdminData, BootstrapMasterAdminVariables>;

interface GetCurrentAppUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetCurrentAppUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetCurrentAppUserData, undefined>;
  operationName: string;
}
export const getCurrentAppUserRef: GetCurrentAppUserRef;

export function getCurrentAppUser(options?: ExecuteQueryOptions): QueryPromise<GetCurrentAppUserData, undefined>;
export function getCurrentAppUser(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetCurrentAppUserData, undefined>;

interface GetAppUserByFirebaseUidRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetAppUserByFirebaseUidVariables): QueryRef<GetAppUserByFirebaseUidData, GetAppUserByFirebaseUidVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetAppUserByFirebaseUidVariables): QueryRef<GetAppUserByFirebaseUidData, GetAppUserByFirebaseUidVariables>;
  operationName: string;
}
export const getAppUserByFirebaseUidRef: GetAppUserByFirebaseUidRef;

export function getAppUserByFirebaseUid(vars: GetAppUserByFirebaseUidVariables, options?: ExecuteQueryOptions): QueryPromise<GetAppUserByFirebaseUidData, GetAppUserByFirebaseUidVariables>;
export function getAppUserByFirebaseUid(dc: DataConnect, vars: GetAppUserByFirebaseUidVariables, options?: ExecuteQueryOptions): QueryPromise<GetAppUserByFirebaseUidData, GetAppUserByFirebaseUidVariables>;

interface ListLicensePlansRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListLicensePlansData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListLicensePlansData, undefined>;
  operationName: string;
}
export const listLicensePlansRef: ListLicensePlansRef;

export function listLicensePlans(options?: ExecuteQueryOptions): QueryPromise<ListLicensePlansData, undefined>;
export function listLicensePlans(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListLicensePlansData, undefined>;

interface ListOrganizationLicensePlanAssignmentsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListOrganizationLicensePlanAssignmentsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListOrganizationLicensePlanAssignmentsData, undefined>;
  operationName: string;
}
export const listOrganizationLicensePlanAssignmentsRef: ListOrganizationLicensePlanAssignmentsRef;

export function listOrganizationLicensePlanAssignments(options?: ExecuteQueryOptions): QueryPromise<ListOrganizationLicensePlanAssignmentsData, undefined>;
export function listOrganizationLicensePlanAssignments(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListOrganizationLicensePlanAssignmentsData, undefined>;

interface GetLicensePlanRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetLicensePlanVariables): QueryRef<GetLicensePlanData, GetLicensePlanVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetLicensePlanVariables): QueryRef<GetLicensePlanData, GetLicensePlanVariables>;
  operationName: string;
}
export const getLicensePlanRef: GetLicensePlanRef;

export function getLicensePlan(vars: GetLicensePlanVariables, options?: ExecuteQueryOptions): QueryPromise<GetLicensePlanData, GetLicensePlanVariables>;
export function getLicensePlan(dc: DataConnect, vars: GetLicensePlanVariables, options?: ExecuteQueryOptions): QueryPromise<GetLicensePlanData, GetLicensePlanVariables>;

interface GetLicensePlanTrustedRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetLicensePlanTrustedVariables): QueryRef<GetLicensePlanTrustedData, GetLicensePlanTrustedVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetLicensePlanTrustedVariables): QueryRef<GetLicensePlanTrustedData, GetLicensePlanTrustedVariables>;
  operationName: string;
}
export const getLicensePlanTrustedRef: GetLicensePlanTrustedRef;

export function getLicensePlanTrusted(vars: GetLicensePlanTrustedVariables, options?: ExecuteQueryOptions): QueryPromise<GetLicensePlanTrustedData, GetLicensePlanTrustedVariables>;
export function getLicensePlanTrusted(dc: DataConnect, vars: GetLicensePlanTrustedVariables, options?: ExecuteQueryOptions): QueryPromise<GetLicensePlanTrustedData, GetLicensePlanTrustedVariables>;

interface CreateLicensePlanRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateLicensePlanVariables): MutationRef<CreateLicensePlanData, CreateLicensePlanVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateLicensePlanVariables): MutationRef<CreateLicensePlanData, CreateLicensePlanVariables>;
  operationName: string;
}
export const createLicensePlanRef: CreateLicensePlanRef;

export function createLicensePlan(vars: CreateLicensePlanVariables): MutationPromise<CreateLicensePlanData, CreateLicensePlanVariables>;
export function createLicensePlan(dc: DataConnect, vars: CreateLicensePlanVariables): MutationPromise<CreateLicensePlanData, CreateLicensePlanVariables>;

interface UpdateLicensePlanRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateLicensePlanVariables): MutationRef<UpdateLicensePlanData, UpdateLicensePlanVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateLicensePlanVariables): MutationRef<UpdateLicensePlanData, UpdateLicensePlanVariables>;
  operationName: string;
}
export const updateLicensePlanRef: UpdateLicensePlanRef;

export function updateLicensePlan(vars: UpdateLicensePlanVariables): MutationPromise<UpdateLicensePlanData, UpdateLicensePlanVariables>;
export function updateLicensePlan(dc: DataConnect, vars: UpdateLicensePlanVariables): MutationPromise<UpdateLicensePlanData, UpdateLicensePlanVariables>;

interface ChangeLicensePlanStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ChangeLicensePlanStatusVariables): MutationRef<ChangeLicensePlanStatusData, ChangeLicensePlanStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ChangeLicensePlanStatusVariables): MutationRef<ChangeLicensePlanStatusData, ChangeLicensePlanStatusVariables>;
  operationName: string;
}
export const changeLicensePlanStatusRef: ChangeLicensePlanStatusRef;

export function changeLicensePlanStatus(vars: ChangeLicensePlanStatusVariables): MutationPromise<ChangeLicensePlanStatusData, ChangeLicensePlanStatusVariables>;
export function changeLicensePlanStatus(dc: DataConnect, vars: ChangeLicensePlanStatusVariables): MutationPromise<ChangeLicensePlanStatusData, ChangeLicensePlanStatusVariables>;

interface DeleteLicensePlanRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteLicensePlanVariables): MutationRef<DeleteLicensePlanData, DeleteLicensePlanVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteLicensePlanVariables): MutationRef<DeleteLicensePlanData, DeleteLicensePlanVariables>;
  operationName: string;
}
export const deleteLicensePlanRef: DeleteLicensePlanRef;

export function deleteLicensePlan(vars: DeleteLicensePlanVariables): MutationPromise<DeleteLicensePlanData, DeleteLicensePlanVariables>;
export function deleteLicensePlan(dc: DataConnect, vars: DeleteLicensePlanVariables): MutationPromise<DeleteLicensePlanData, DeleteLicensePlanVariables>;

interface GetLicensePlanReferencesTrustedRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetLicensePlanReferencesTrustedVariables): QueryRef<GetLicensePlanReferencesTrustedData, GetLicensePlanReferencesTrustedVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetLicensePlanReferencesTrustedVariables): QueryRef<GetLicensePlanReferencesTrustedData, GetLicensePlanReferencesTrustedVariables>;
  operationName: string;
}
export const getLicensePlanReferencesTrustedRef: GetLicensePlanReferencesTrustedRef;

export function getLicensePlanReferencesTrusted(vars: GetLicensePlanReferencesTrustedVariables, options?: ExecuteQueryOptions): QueryPromise<GetLicensePlanReferencesTrustedData, GetLicensePlanReferencesTrustedVariables>;
export function getLicensePlanReferencesTrusted(dc: DataConnect, vars: GetLicensePlanReferencesTrustedVariables, options?: ExecuteQueryOptions): QueryPromise<GetLicensePlanReferencesTrustedData, GetLicensePlanReferencesTrustedVariables>;

interface DeleteLicensePlanTrustedRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteLicensePlanTrustedVariables): MutationRef<DeleteLicensePlanTrustedData, DeleteLicensePlanTrustedVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteLicensePlanTrustedVariables): MutationRef<DeleteLicensePlanTrustedData, DeleteLicensePlanTrustedVariables>;
  operationName: string;
}
export const deleteLicensePlanTrustedRef: DeleteLicensePlanTrustedRef;

export function deleteLicensePlanTrusted(vars: DeleteLicensePlanTrustedVariables): MutationPromise<DeleteLicensePlanTrustedData, DeleteLicensePlanTrustedVariables>;
export function deleteLicensePlanTrusted(dc: DataConnect, vars: DeleteLicensePlanTrustedVariables): MutationPromise<DeleteLicensePlanTrustedData, DeleteLicensePlanTrustedVariables>;

interface ListOrganizationsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListOrganizationsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListOrganizationsData, undefined>;
  operationName: string;
}
export const listOrganizationsRef: ListOrganizationsRef;

export function listOrganizations(options?: ExecuteQueryOptions): QueryPromise<ListOrganizationsData, undefined>;
export function listOrganizations(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListOrganizationsData, undefined>;

interface GetOrganizationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOrganizationVariables): QueryRef<GetOrganizationData, GetOrganizationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetOrganizationVariables): QueryRef<GetOrganizationData, GetOrganizationVariables>;
  operationName: string;
}
export const getOrganizationRef: GetOrganizationRef;

export function getOrganization(vars: GetOrganizationVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganizationData, GetOrganizationVariables>;
export function getOrganization(dc: DataConnect, vars: GetOrganizationVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganizationData, GetOrganizationVariables>;

interface GetOrganizationTrustedRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOrganizationTrustedVariables): QueryRef<GetOrganizationTrustedData, GetOrganizationTrustedVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetOrganizationTrustedVariables): QueryRef<GetOrganizationTrustedData, GetOrganizationTrustedVariables>;
  operationName: string;
}
export const getOrganizationTrustedRef: GetOrganizationTrustedRef;

export function getOrganizationTrusted(vars: GetOrganizationTrustedVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganizationTrustedData, GetOrganizationTrustedVariables>;
export function getOrganizationTrusted(dc: DataConnect, vars: GetOrganizationTrustedVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganizationTrustedData, GetOrganizationTrustedVariables>;

interface ListOrganizationAdministratorsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListOrganizationAdministratorsVariables): QueryRef<ListOrganizationAdministratorsData, ListOrganizationAdministratorsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListOrganizationAdministratorsVariables): QueryRef<ListOrganizationAdministratorsData, ListOrganizationAdministratorsVariables>;
  operationName: string;
}
export const listOrganizationAdministratorsRef: ListOrganizationAdministratorsRef;

export function listOrganizationAdministrators(vars: ListOrganizationAdministratorsVariables, options?: ExecuteQueryOptions): QueryPromise<ListOrganizationAdministratorsData, ListOrganizationAdministratorsVariables>;
export function listOrganizationAdministrators(dc: DataConnect, vars: ListOrganizationAdministratorsVariables, options?: ExecuteQueryOptions): QueryPromise<ListOrganizationAdministratorsData, ListOrganizationAdministratorsVariables>;

interface GetOrganizationAdministratorRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOrganizationAdministratorVariables): QueryRef<GetOrganizationAdministratorData, GetOrganizationAdministratorVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetOrganizationAdministratorVariables): QueryRef<GetOrganizationAdministratorData, GetOrganizationAdministratorVariables>;
  operationName: string;
}
export const getOrganizationAdministratorRef: GetOrganizationAdministratorRef;

export function getOrganizationAdministrator(vars: GetOrganizationAdministratorVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganizationAdministratorData, GetOrganizationAdministratorVariables>;
export function getOrganizationAdministrator(dc: DataConnect, vars: GetOrganizationAdministratorVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganizationAdministratorData, GetOrganizationAdministratorVariables>;

interface ProvisionOrganizationAdministratorRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ProvisionOrganizationAdministratorVariables): MutationRef<ProvisionOrganizationAdministratorData, ProvisionOrganizationAdministratorVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ProvisionOrganizationAdministratorVariables): MutationRef<ProvisionOrganizationAdministratorData, ProvisionOrganizationAdministratorVariables>;
  operationName: string;
}
export const provisionOrganizationAdministratorRef: ProvisionOrganizationAdministratorRef;

export function provisionOrganizationAdministrator(vars: ProvisionOrganizationAdministratorVariables): MutationPromise<ProvisionOrganizationAdministratorData, ProvisionOrganizationAdministratorVariables>;
export function provisionOrganizationAdministrator(dc: DataConnect, vars: ProvisionOrganizationAdministratorVariables): MutationPromise<ProvisionOrganizationAdministratorData, ProvisionOrganizationAdministratorVariables>;

interface EnsureAppUserRoleTrustedRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: EnsureAppUserRoleTrustedVariables): MutationRef<EnsureAppUserRoleTrustedData, EnsureAppUserRoleTrustedVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: EnsureAppUserRoleTrustedVariables): MutationRef<EnsureAppUserRoleTrustedData, EnsureAppUserRoleTrustedVariables>;
  operationName: string;
}
export const ensureAppUserRoleTrustedRef: EnsureAppUserRoleTrustedRef;

export function ensureAppUserRoleTrusted(vars: EnsureAppUserRoleTrustedVariables): MutationPromise<EnsureAppUserRoleTrustedData, EnsureAppUserRoleTrustedVariables>;
export function ensureAppUserRoleTrusted(dc: DataConnect, vars: EnsureAppUserRoleTrustedVariables): MutationPromise<EnsureAppUserRoleTrustedData, EnsureAppUserRoleTrustedVariables>;

interface UpdateOrganizationAdministratorRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateOrganizationAdministratorVariables): MutationRef<UpdateOrganizationAdministratorData, UpdateOrganizationAdministratorVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateOrganizationAdministratorVariables): MutationRef<UpdateOrganizationAdministratorData, UpdateOrganizationAdministratorVariables>;
  operationName: string;
}
export const updateOrganizationAdministratorRef: UpdateOrganizationAdministratorRef;

export function updateOrganizationAdministrator(vars: UpdateOrganizationAdministratorVariables): MutationPromise<UpdateOrganizationAdministratorData, UpdateOrganizationAdministratorVariables>;
export function updateOrganizationAdministrator(dc: DataConnect, vars: UpdateOrganizationAdministratorVariables): MutationPromise<UpdateOrganizationAdministratorData, UpdateOrganizationAdministratorVariables>;

interface ChangeOrganizationAdministratorStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ChangeOrganizationAdministratorStatusVariables): MutationRef<ChangeOrganizationAdministratorStatusData, ChangeOrganizationAdministratorStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ChangeOrganizationAdministratorStatusVariables): MutationRef<ChangeOrganizationAdministratorStatusData, ChangeOrganizationAdministratorStatusVariables>;
  operationName: string;
}
export const changeOrganizationAdministratorStatusRef: ChangeOrganizationAdministratorStatusRef;

export function changeOrganizationAdministratorStatus(vars: ChangeOrganizationAdministratorStatusVariables): MutationPromise<ChangeOrganizationAdministratorStatusData, ChangeOrganizationAdministratorStatusVariables>;
export function changeOrganizationAdministratorStatus(dc: DataConnect, vars: ChangeOrganizationAdministratorStatusVariables): MutationPromise<ChangeOrganizationAdministratorStatusData, ChangeOrganizationAdministratorStatusVariables>;

interface ResolveOrganizationAdministratorIdentityRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ResolveOrganizationAdministratorIdentityVariables): QueryRef<ResolveOrganizationAdministratorIdentityData, ResolveOrganizationAdministratorIdentityVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ResolveOrganizationAdministratorIdentityVariables): QueryRef<ResolveOrganizationAdministratorIdentityData, ResolveOrganizationAdministratorIdentityVariables>;
  operationName: string;
}
export const resolveOrganizationAdministratorIdentityRef: ResolveOrganizationAdministratorIdentityRef;

export function resolveOrganizationAdministratorIdentity(vars: ResolveOrganizationAdministratorIdentityVariables, options?: ExecuteQueryOptions): QueryPromise<ResolveOrganizationAdministratorIdentityData, ResolveOrganizationAdministratorIdentityVariables>;
export function resolveOrganizationAdministratorIdentity(dc: DataConnect, vars: ResolveOrganizationAdministratorIdentityVariables, options?: ExecuteQueryOptions): QueryPromise<ResolveOrganizationAdministratorIdentityData, ResolveOrganizationAdministratorIdentityVariables>;

interface RecordAdministratorSecurityEventRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RecordAdministratorSecurityEventVariables): MutationRef<RecordAdministratorSecurityEventData, RecordAdministratorSecurityEventVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RecordAdministratorSecurityEventVariables): MutationRef<RecordAdministratorSecurityEventData, RecordAdministratorSecurityEventVariables>;
  operationName: string;
}
export const recordAdministratorSecurityEventRef: RecordAdministratorSecurityEventRef;

export function recordAdministratorSecurityEvent(vars: RecordAdministratorSecurityEventVariables): MutationPromise<RecordAdministratorSecurityEventData, RecordAdministratorSecurityEventVariables>;
export function recordAdministratorSecurityEvent(dc: DataConnect, vars: RecordAdministratorSecurityEventVariables): MutationPromise<RecordAdministratorSecurityEventData, RecordAdministratorSecurityEventVariables>;

interface GetLifecycleIdempotencyRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetLifecycleIdempotencyVariables): QueryRef<GetLifecycleIdempotencyData, GetLifecycleIdempotencyVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetLifecycleIdempotencyVariables): QueryRef<GetLifecycleIdempotencyData, GetLifecycleIdempotencyVariables>;
  operationName: string;
}
export const getLifecycleIdempotencyRef: GetLifecycleIdempotencyRef;

export function getLifecycleIdempotency(vars: GetLifecycleIdempotencyVariables, options?: ExecuteQueryOptions): QueryPromise<GetLifecycleIdempotencyData, GetLifecycleIdempotencyVariables>;
export function getLifecycleIdempotency(dc: DataConnect, vars: GetLifecycleIdempotencyVariables, options?: ExecuteQueryOptions): QueryPromise<GetLifecycleIdempotencyData, GetLifecycleIdempotencyVariables>;

interface GetOrganizationLicenseRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOrganizationLicenseVariables): QueryRef<GetOrganizationLicenseData, GetOrganizationLicenseVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetOrganizationLicenseVariables): QueryRef<GetOrganizationLicenseData, GetOrganizationLicenseVariables>;
  operationName: string;
}
export const getOrganizationLicenseRef: GetOrganizationLicenseRef;

export function getOrganizationLicense(vars: GetOrganizationLicenseVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganizationLicenseData, GetOrganizationLicenseVariables>;
export function getOrganizationLicense(dc: DataConnect, vars: GetOrganizationLicenseVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganizationLicenseData, GetOrganizationLicenseVariables>;

interface GetOrganizationLicenseTrustedRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOrganizationLicenseTrustedVariables): QueryRef<GetOrganizationLicenseTrustedData, GetOrganizationLicenseTrustedVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetOrganizationLicenseTrustedVariables): QueryRef<GetOrganizationLicenseTrustedData, GetOrganizationLicenseTrustedVariables>;
  operationName: string;
}
export const getOrganizationLicenseTrustedRef: GetOrganizationLicenseTrustedRef;

export function getOrganizationLicenseTrusted(vars: GetOrganizationLicenseTrustedVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganizationLicenseTrustedData, GetOrganizationLicenseTrustedVariables>;
export function getOrganizationLicenseTrusted(dc: DataConnect, vars: GetOrganizationLicenseTrustedVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganizationLicenseTrustedData, GetOrganizationLicenseTrustedVariables>;

interface GetOrganizationLicenseHistoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOrganizationLicenseHistoryVariables): QueryRef<GetOrganizationLicenseHistoryData, GetOrganizationLicenseHistoryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetOrganizationLicenseHistoryVariables): QueryRef<GetOrganizationLicenseHistoryData, GetOrganizationLicenseHistoryVariables>;
  operationName: string;
}
export const getOrganizationLicenseHistoryRef: GetOrganizationLicenseHistoryRef;

export function getOrganizationLicenseHistory(vars: GetOrganizationLicenseHistoryVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganizationLicenseHistoryData, GetOrganizationLicenseHistoryVariables>;
export function getOrganizationLicenseHistory(dc: DataConnect, vars: GetOrganizationLicenseHistoryVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganizationLicenseHistoryData, GetOrganizationLicenseHistoryVariables>;

interface GetOrganizationLicensePublicRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOrganizationLicensePublicVariables): QueryRef<GetOrganizationLicensePublicData, GetOrganizationLicensePublicVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetOrganizationLicensePublicVariables): QueryRef<GetOrganizationLicensePublicData, GetOrganizationLicensePublicVariables>;
  operationName: string;
}
export const getOrganizationLicensePublicRef: GetOrganizationLicensePublicRef;

export function getOrganizationLicensePublic(vars: GetOrganizationLicensePublicVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganizationLicensePublicData, GetOrganizationLicensePublicVariables>;
export function getOrganizationLicensePublic(dc: DataConnect, vars: GetOrganizationLicensePublicVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganizationLicensePublicData, GetOrganizationLicensePublicVariables>;

interface GetOrganizationLicenseHistoryPublicRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOrganizationLicenseHistoryPublicVariables): QueryRef<GetOrganizationLicenseHistoryPublicData, GetOrganizationLicenseHistoryPublicVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetOrganizationLicenseHistoryPublicVariables): QueryRef<GetOrganizationLicenseHistoryPublicData, GetOrganizationLicenseHistoryPublicVariables>;
  operationName: string;
}
export const getOrganizationLicenseHistoryPublicRef: GetOrganizationLicenseHistoryPublicRef;

export function getOrganizationLicenseHistoryPublic(vars: GetOrganizationLicenseHistoryPublicVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganizationLicenseHistoryPublicData, GetOrganizationLicenseHistoryPublicVariables>;
export function getOrganizationLicenseHistoryPublic(dc: DataConnect, vars: GetOrganizationLicenseHistoryPublicVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganizationLicenseHistoryPublicData, GetOrganizationLicenseHistoryPublicVariables>;

interface ListOrganizationsTrustedRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListOrganizationsTrustedData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListOrganizationsTrustedData, undefined>;
  operationName: string;
}
export const listOrganizationsTrustedRef: ListOrganizationsTrustedRef;

export function listOrganizationsTrusted(options?: ExecuteQueryOptions): QueryPromise<ListOrganizationsTrustedData, undefined>;
export function listOrganizationsTrusted(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListOrganizationsTrustedData, undefined>;

interface ListOrganizationUsersForDeletionTrustedRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListOrganizationUsersForDeletionTrustedVariables): QueryRef<ListOrganizationUsersForDeletionTrustedData, ListOrganizationUsersForDeletionTrustedVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListOrganizationUsersForDeletionTrustedVariables): QueryRef<ListOrganizationUsersForDeletionTrustedData, ListOrganizationUsersForDeletionTrustedVariables>;
  operationName: string;
}
export const listOrganizationUsersForDeletionTrustedRef: ListOrganizationUsersForDeletionTrustedRef;

export function listOrganizationUsersForDeletionTrusted(vars: ListOrganizationUsersForDeletionTrustedVariables, options?: ExecuteQueryOptions): QueryPromise<ListOrganizationUsersForDeletionTrustedData, ListOrganizationUsersForDeletionTrustedVariables>;
export function listOrganizationUsersForDeletionTrusted(dc: DataConnect, vars: ListOrganizationUsersForDeletionTrustedVariables, options?: ExecuteQueryOptions): QueryPromise<ListOrganizationUsersForDeletionTrustedData, ListOrganizationUsersForDeletionTrustedVariables>;

interface DeleteOrganizationTrustedRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteOrganizationTrustedVariables): MutationRef<DeleteOrganizationTrustedData, DeleteOrganizationTrustedVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteOrganizationTrustedVariables): MutationRef<DeleteOrganizationTrustedData, DeleteOrganizationTrustedVariables>;
  operationName: string;
}
export const deleteOrganizationTrustedRef: DeleteOrganizationTrustedRef;

export function deleteOrganizationTrusted(vars: DeleteOrganizationTrustedVariables): MutationPromise<DeleteOrganizationTrustedData, DeleteOrganizationTrustedVariables>;
export function deleteOrganizationTrusted(dc: DataConnect, vars: DeleteOrganizationTrustedVariables): MutationPromise<DeleteOrganizationTrustedData, DeleteOrganizationTrustedVariables>;

interface DeleteAppUserTrustedRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteAppUserTrustedVariables): MutationRef<DeleteAppUserTrustedData, DeleteAppUserTrustedVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteAppUserTrustedVariables): MutationRef<DeleteAppUserTrustedData, DeleteAppUserTrustedVariables>;
  operationName: string;
}
export const deleteAppUserTrustedRef: DeleteAppUserTrustedRef;

export function deleteAppUserTrusted(vars: DeleteAppUserTrustedVariables): MutationPromise<DeleteAppUserTrustedData, DeleteAppUserTrustedVariables>;
export function deleteAppUserTrusted(dc: DataConnect, vars: DeleteAppUserTrustedVariables): MutationPromise<DeleteAppUserTrustedData, DeleteAppUserTrustedVariables>;

interface AssignOrganizationLicenseTrustedRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AssignOrganizationLicenseTrustedVariables): MutationRef<AssignOrganizationLicenseTrustedData, AssignOrganizationLicenseTrustedVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AssignOrganizationLicenseTrustedVariables): MutationRef<AssignOrganizationLicenseTrustedData, AssignOrganizationLicenseTrustedVariables>;
  operationName: string;
}
export const assignOrganizationLicenseTrustedRef: AssignOrganizationLicenseTrustedRef;

export function assignOrganizationLicenseTrusted(vars: AssignOrganizationLicenseTrustedVariables): MutationPromise<AssignOrganizationLicenseTrustedData, AssignOrganizationLicenseTrustedVariables>;
export function assignOrganizationLicenseTrusted(dc: DataConnect, vars: AssignOrganizationLicenseTrustedVariables): MutationPromise<AssignOrganizationLicenseTrustedData, AssignOrganizationLicenseTrustedVariables>;

interface ChangeOrganizationLicensePlanTrustedRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ChangeOrganizationLicensePlanTrustedVariables): MutationRef<ChangeOrganizationLicensePlanTrustedData, ChangeOrganizationLicensePlanTrustedVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ChangeOrganizationLicensePlanTrustedVariables): MutationRef<ChangeOrganizationLicensePlanTrustedData, ChangeOrganizationLicensePlanTrustedVariables>;
  operationName: string;
}
export const changeOrganizationLicensePlanTrustedRef: ChangeOrganizationLicensePlanTrustedRef;

export function changeOrganizationLicensePlanTrusted(vars: ChangeOrganizationLicensePlanTrustedVariables): MutationPromise<ChangeOrganizationLicensePlanTrustedData, ChangeOrganizationLicensePlanTrustedVariables>;
export function changeOrganizationLicensePlanTrusted(dc: DataConnect, vars: ChangeOrganizationLicensePlanTrustedVariables): MutationPromise<ChangeOrganizationLicensePlanTrustedData, ChangeOrganizationLicensePlanTrustedVariables>;

interface ModifyOrganizationCommercialTermsTrustedRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ModifyOrganizationCommercialTermsTrustedVariables): MutationRef<ModifyOrganizationCommercialTermsTrustedData, ModifyOrganizationCommercialTermsTrustedVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ModifyOrganizationCommercialTermsTrustedVariables): MutationRef<ModifyOrganizationCommercialTermsTrustedData, ModifyOrganizationCommercialTermsTrustedVariables>;
  operationName: string;
}
export const modifyOrganizationCommercialTermsTrustedRef: ModifyOrganizationCommercialTermsTrustedRef;

export function modifyOrganizationCommercialTermsTrusted(vars: ModifyOrganizationCommercialTermsTrustedVariables): MutationPromise<ModifyOrganizationCommercialTermsTrustedData, ModifyOrganizationCommercialTermsTrustedVariables>;
export function modifyOrganizationCommercialTermsTrusted(dc: DataConnect, vars: ModifyOrganizationCommercialTermsTrustedVariables): MutationPromise<ModifyOrganizationCommercialTermsTrustedData, ModifyOrganizationCommercialTermsTrustedVariables>;

interface RenewOrganizationLicenseTrustedRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RenewOrganizationLicenseTrustedVariables): MutationRef<RenewOrganizationLicenseTrustedData, RenewOrganizationLicenseTrustedVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RenewOrganizationLicenseTrustedVariables): MutationRef<RenewOrganizationLicenseTrustedData, RenewOrganizationLicenseTrustedVariables>;
  operationName: string;
}
export const renewOrganizationLicenseTrustedRef: RenewOrganizationLicenseTrustedRef;

export function renewOrganizationLicenseTrusted(vars: RenewOrganizationLicenseTrustedVariables): MutationPromise<RenewOrganizationLicenseTrustedData, RenewOrganizationLicenseTrustedVariables>;
export function renewOrganizationLicenseTrusted(dc: DataConnect, vars: RenewOrganizationLicenseTrustedVariables): MutationPromise<RenewOrganizationLicenseTrustedData, RenewOrganizationLicenseTrustedVariables>;

interface ClaimLifecycleIdempotencyRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ClaimLifecycleIdempotencyVariables): MutationRef<ClaimLifecycleIdempotencyData, ClaimLifecycleIdempotencyVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ClaimLifecycleIdempotencyVariables): MutationRef<ClaimLifecycleIdempotencyData, ClaimLifecycleIdempotencyVariables>;
  operationName: string;
}
export const claimLifecycleIdempotencyRef: ClaimLifecycleIdempotencyRef;

export function claimLifecycleIdempotency(vars: ClaimLifecycleIdempotencyVariables): MutationPromise<ClaimLifecycleIdempotencyData, ClaimLifecycleIdempotencyVariables>;
export function claimLifecycleIdempotency(dc: DataConnect, vars: ClaimLifecycleIdempotencyVariables): MutationPromise<ClaimLifecycleIdempotencyData, ClaimLifecycleIdempotencyVariables>;

interface CompleteLifecycleIdempotencyRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CompleteLifecycleIdempotencyVariables): MutationRef<CompleteLifecycleIdempotencyData, CompleteLifecycleIdempotencyVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CompleteLifecycleIdempotencyVariables): MutationRef<CompleteLifecycleIdempotencyData, CompleteLifecycleIdempotencyVariables>;
  operationName: string;
}
export const completeLifecycleIdempotencyRef: CompleteLifecycleIdempotencyRef;

export function completeLifecycleIdempotency(vars: CompleteLifecycleIdempotencyVariables): MutationPromise<CompleteLifecycleIdempotencyData, CompleteLifecycleIdempotencyVariables>;
export function completeLifecycleIdempotency(dc: DataConnect, vars: CompleteLifecycleIdempotencyVariables): MutationPromise<CompleteLifecycleIdempotencyData, CompleteLifecycleIdempotencyVariables>;

interface RecordProvisioningReconciliationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RecordProvisioningReconciliationVariables): MutationRef<RecordProvisioningReconciliationData, RecordProvisioningReconciliationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RecordProvisioningReconciliationVariables): MutationRef<RecordProvisioningReconciliationData, RecordProvisioningReconciliationVariables>;
  operationName: string;
}
export const recordProvisioningReconciliationRef: RecordProvisioningReconciliationRef;

export function recordProvisioningReconciliation(vars: RecordProvisioningReconciliationVariables): MutationPromise<RecordProvisioningReconciliationData, RecordProvisioningReconciliationVariables>;
export function recordProvisioningReconciliation(dc: DataConnect, vars: RecordProvisioningReconciliationVariables): MutationPromise<RecordProvisioningReconciliationData, RecordProvisioningReconciliationVariables>;

interface CreateOrganizationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateOrganizationVariables): MutationRef<CreateOrganizationData, CreateOrganizationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateOrganizationVariables): MutationRef<CreateOrganizationData, CreateOrganizationVariables>;
  operationName: string;
}
export const createOrganizationRef: CreateOrganizationRef;

export function createOrganization(vars: CreateOrganizationVariables): MutationPromise<CreateOrganizationData, CreateOrganizationVariables>;
export function createOrganization(dc: DataConnect, vars: CreateOrganizationVariables): MutationPromise<CreateOrganizationData, CreateOrganizationVariables>;

interface UpdateOrganizationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateOrganizationVariables): MutationRef<UpdateOrganizationData, UpdateOrganizationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateOrganizationVariables): MutationRef<UpdateOrganizationData, UpdateOrganizationVariables>;
  operationName: string;
}
export const updateOrganizationRef: UpdateOrganizationRef;

export function updateOrganization(vars: UpdateOrganizationVariables): MutationPromise<UpdateOrganizationData, UpdateOrganizationVariables>;
export function updateOrganization(dc: DataConnect, vars: UpdateOrganizationVariables): MutationPromise<UpdateOrganizationData, UpdateOrganizationVariables>;

interface ChangeOrganizationStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ChangeOrganizationStatusVariables): MutationRef<ChangeOrganizationStatusData, ChangeOrganizationStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ChangeOrganizationStatusVariables): MutationRef<ChangeOrganizationStatusData, ChangeOrganizationStatusVariables>;
  operationName: string;
}
export const changeOrganizationStatusRef: ChangeOrganizationStatusRef;

export function changeOrganizationStatus(vars: ChangeOrganizationStatusVariables): MutationPromise<ChangeOrganizationStatusData, ChangeOrganizationStatusVariables>;
export function changeOrganizationStatus(dc: DataConnect, vars: ChangeOrganizationStatusVariables): MutationPromise<ChangeOrganizationStatusData, ChangeOrganizationStatusVariables>;

interface ListTenantOutletsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListTenantOutletsVariables): QueryRef<ListTenantOutletsData, ListTenantOutletsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListTenantOutletsVariables): QueryRef<ListTenantOutletsData, ListTenantOutletsVariables>;
  operationName: string;
}
export const listTenantOutletsRef: ListTenantOutletsRef;

export function listTenantOutlets(vars: ListTenantOutletsVariables, options?: ExecuteQueryOptions): QueryPromise<ListTenantOutletsData, ListTenantOutletsVariables>;
export function listTenantOutlets(dc: DataConnect, vars: ListTenantOutletsVariables, options?: ExecuteQueryOptions): QueryPromise<ListTenantOutletsData, ListTenantOutletsVariables>;

interface ListTenantEmployeesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListTenantEmployeesVariables): QueryRef<ListTenantEmployeesData, ListTenantEmployeesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListTenantEmployeesVariables): QueryRef<ListTenantEmployeesData, ListTenantEmployeesVariables>;
  operationName: string;
}
export const listTenantEmployeesRef: ListTenantEmployeesRef;

export function listTenantEmployees(vars: ListTenantEmployeesVariables, options?: ExecuteQueryOptions): QueryPromise<ListTenantEmployeesData, ListTenantEmployeesVariables>;
export function listTenantEmployees(dc: DataConnect, vars: ListTenantEmployeesVariables, options?: ExecuteQueryOptions): QueryPromise<ListTenantEmployeesData, ListTenantEmployeesVariables>;

interface ListTenantServicePersonsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListTenantServicePersonsVariables): QueryRef<ListTenantServicePersonsData, ListTenantServicePersonsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListTenantServicePersonsVariables): QueryRef<ListTenantServicePersonsData, ListTenantServicePersonsVariables>;
  operationName: string;
}
export const listTenantServicePersonsRef: ListTenantServicePersonsRef;

export function listTenantServicePersons(vars: ListTenantServicePersonsVariables, options?: ExecuteQueryOptions): QueryPromise<ListTenantServicePersonsData, ListTenantServicePersonsVariables>;
export function listTenantServicePersons(dc: DataConnect, vars: ListTenantServicePersonsVariables, options?: ExecuteQueryOptions): QueryPromise<ListTenantServicePersonsData, ListTenantServicePersonsVariables>;

interface ListTenantProductsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListTenantProductsVariables): QueryRef<ListTenantProductsData, ListTenantProductsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListTenantProductsVariables): QueryRef<ListTenantProductsData, ListTenantProductsVariables>;
  operationName: string;
}
export const listTenantProductsRef: ListTenantProductsRef;

export function listTenantProducts(vars: ListTenantProductsVariables, options?: ExecuteQueryOptions): QueryPromise<ListTenantProductsData, ListTenantProductsVariables>;
export function listTenantProducts(dc: DataConnect, vars: ListTenantProductsVariables, options?: ExecuteQueryOptions): QueryPromise<ListTenantProductsData, ListTenantProductsVariables>;

interface ListTenantInventoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListTenantInventoryVariables): QueryRef<ListTenantInventoryData, ListTenantInventoryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListTenantInventoryVariables): QueryRef<ListTenantInventoryData, ListTenantInventoryVariables>;
  operationName: string;
}
export const listTenantInventoryRef: ListTenantInventoryRef;

export function listTenantInventory(vars: ListTenantInventoryVariables, options?: ExecuteQueryOptions): QueryPromise<ListTenantInventoryData, ListTenantInventoryVariables>;
export function listTenantInventory(dc: DataConnect, vars: ListTenantInventoryVariables, options?: ExecuteQueryOptions): QueryPromise<ListTenantInventoryData, ListTenantInventoryVariables>;

interface ListTenantCustomersRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListTenantCustomersVariables): QueryRef<ListTenantCustomersData, ListTenantCustomersVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListTenantCustomersVariables): QueryRef<ListTenantCustomersData, ListTenantCustomersVariables>;
  operationName: string;
}
export const listTenantCustomersRef: ListTenantCustomersRef;

export function listTenantCustomers(vars: ListTenantCustomersVariables, options?: ExecuteQueryOptions): QueryPromise<ListTenantCustomersData, ListTenantCustomersVariables>;
export function listTenantCustomers(dc: DataConnect, vars: ListTenantCustomersVariables, options?: ExecuteQueryOptions): QueryPromise<ListTenantCustomersData, ListTenantCustomersVariables>;

interface ListTenantSuppliersRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListTenantSuppliersVariables): QueryRef<ListTenantSuppliersData, ListTenantSuppliersVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListTenantSuppliersVariables): QueryRef<ListTenantSuppliersData, ListTenantSuppliersVariables>;
  operationName: string;
}
export const listTenantSuppliersRef: ListTenantSuppliersRef;

export function listTenantSuppliers(vars: ListTenantSuppliersVariables, options?: ExecuteQueryOptions): QueryPromise<ListTenantSuppliersData, ListTenantSuppliersVariables>;
export function listTenantSuppliers(dc: DataConnect, vars: ListTenantSuppliersVariables, options?: ExecuteQueryOptions): QueryPromise<ListTenantSuppliersData, ListTenantSuppliersVariables>;

interface ListTenantPurchasesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListTenantPurchasesVariables): QueryRef<ListTenantPurchasesData, ListTenantPurchasesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListTenantPurchasesVariables): QueryRef<ListTenantPurchasesData, ListTenantPurchasesVariables>;
  operationName: string;
}
export const listTenantPurchasesRef: ListTenantPurchasesRef;

export function listTenantPurchases(vars: ListTenantPurchasesVariables, options?: ExecuteQueryOptions): QueryPromise<ListTenantPurchasesData, ListTenantPurchasesVariables>;
export function listTenantPurchases(dc: DataConnect, vars: ListTenantPurchasesVariables, options?: ExecuteQueryOptions): QueryPromise<ListTenantPurchasesData, ListTenantPurchasesVariables>;

interface ListTenantExpensesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListTenantExpensesVariables): QueryRef<ListTenantExpensesData, ListTenantExpensesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListTenantExpensesVariables): QueryRef<ListTenantExpensesData, ListTenantExpensesVariables>;
  operationName: string;
}
export const listTenantExpensesRef: ListTenantExpensesRef;

export function listTenantExpenses(vars: ListTenantExpensesVariables, options?: ExecuteQueryOptions): QueryPromise<ListTenantExpensesData, ListTenantExpensesVariables>;
export function listTenantExpenses(dc: DataConnect, vars: ListTenantExpensesVariables, options?: ExecuteQueryOptions): QueryPromise<ListTenantExpensesData, ListTenantExpensesVariables>;

interface CreateTenantExpenseRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTenantExpenseVariables): MutationRef<CreateTenantExpenseData, CreateTenantExpenseVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateTenantExpenseVariables): MutationRef<CreateTenantExpenseData, CreateTenantExpenseVariables>;
  operationName: string;
}
export const createTenantExpenseRef: CreateTenantExpenseRef;

export function createTenantExpense(vars: CreateTenantExpenseVariables): MutationPromise<CreateTenantExpenseData, CreateTenantExpenseVariables>;
export function createTenantExpense(dc: DataConnect, vars: CreateTenantExpenseVariables): MutationPromise<CreateTenantExpenseData, CreateTenantExpenseVariables>;

interface UpdateTenantExpenseRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTenantExpenseVariables): MutationRef<UpdateTenantExpenseData, UpdateTenantExpenseVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateTenantExpenseVariables): MutationRef<UpdateTenantExpenseData, UpdateTenantExpenseVariables>;
  operationName: string;
}
export const updateTenantExpenseRef: UpdateTenantExpenseRef;

export function updateTenantExpense(vars: UpdateTenantExpenseVariables): MutationPromise<UpdateTenantExpenseData, UpdateTenantExpenseVariables>;
export function updateTenantExpense(dc: DataConnect, vars: UpdateTenantExpenseVariables): MutationPromise<UpdateTenantExpenseData, UpdateTenantExpenseVariables>;

interface ChangeTenantExpenseApprovalRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ChangeTenantExpenseApprovalVariables): MutationRef<ChangeTenantExpenseApprovalData, ChangeTenantExpenseApprovalVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ChangeTenantExpenseApprovalVariables): MutationRef<ChangeTenantExpenseApprovalData, ChangeTenantExpenseApprovalVariables>;
  operationName: string;
}
export const changeTenantExpenseApprovalRef: ChangeTenantExpenseApprovalRef;

export function changeTenantExpenseApproval(vars: ChangeTenantExpenseApprovalVariables): MutationPromise<ChangeTenantExpenseApprovalData, ChangeTenantExpenseApprovalVariables>;
export function changeTenantExpenseApproval(dc: DataConnect, vars: ChangeTenantExpenseApprovalVariables): MutationPromise<ChangeTenantExpenseApprovalData, ChangeTenantExpenseApprovalVariables>;

interface VoidTenantExpenseRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: VoidTenantExpenseVariables): MutationRef<VoidTenantExpenseData, VoidTenantExpenseVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: VoidTenantExpenseVariables): MutationRef<VoidTenantExpenseData, VoidTenantExpenseVariables>;
  operationName: string;
}
export const voidTenantExpenseRef: VoidTenantExpenseRef;

export function voidTenantExpense(vars: VoidTenantExpenseVariables): MutationPromise<VoidTenantExpenseData, VoidTenantExpenseVariables>;
export function voidTenantExpense(dc: DataConnect, vars: VoidTenantExpenseVariables): MutationPromise<VoidTenantExpenseData, VoidTenantExpenseVariables>;

interface ListTenantSalesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListTenantSalesVariables): QueryRef<ListTenantSalesData, ListTenantSalesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListTenantSalesVariables): QueryRef<ListTenantSalesData, ListTenantSalesVariables>;
  operationName: string;
}
export const listTenantSalesRef: ListTenantSalesRef;

export function listTenantSales(vars: ListTenantSalesVariables, options?: ExecuteQueryOptions): QueryPromise<ListTenantSalesData, ListTenantSalesVariables>;
export function listTenantSales(dc: DataConnect, vars: ListTenantSalesVariables, options?: ExecuteQueryOptions): QueryPromise<ListTenantSalesData, ListTenantSalesVariables>;

interface CreateTenantSaleRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTenantSaleVariables): MutationRef<CreateTenantSaleData, CreateTenantSaleVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateTenantSaleVariables): MutationRef<CreateTenantSaleData, CreateTenantSaleVariables>;
  operationName: string;
}
export const createTenantSaleRef: CreateTenantSaleRef;

export function createTenantSale(vars: CreateTenantSaleVariables): MutationPromise<CreateTenantSaleData, CreateTenantSaleVariables>;
export function createTenantSale(dc: DataConnect, vars: CreateTenantSaleVariables): MutationPromise<CreateTenantSaleData, CreateTenantSaleVariables>;

interface AddTenantSaleLineRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddTenantSaleLineVariables): MutationRef<AddTenantSaleLineData, AddTenantSaleLineVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddTenantSaleLineVariables): MutationRef<AddTenantSaleLineData, AddTenantSaleLineVariables>;
  operationName: string;
}
export const addTenantSaleLineRef: AddTenantSaleLineRef;

export function addTenantSaleLine(vars: AddTenantSaleLineVariables): MutationPromise<AddTenantSaleLineData, AddTenantSaleLineVariables>;
export function addTenantSaleLine(dc: DataConnect, vars: AddTenantSaleLineVariables): MutationPromise<AddTenantSaleLineData, AddTenantSaleLineVariables>;

interface GetTenantInventoryStockTrustedRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTenantInventoryStockTrustedVariables): QueryRef<GetTenantInventoryStockTrustedData, GetTenantInventoryStockTrustedVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetTenantInventoryStockTrustedVariables): QueryRef<GetTenantInventoryStockTrustedData, GetTenantInventoryStockTrustedVariables>;
  operationName: string;
}
export const getTenantInventoryStockTrustedRef: GetTenantInventoryStockTrustedRef;

export function getTenantInventoryStockTrusted(vars: GetTenantInventoryStockTrustedVariables, options?: ExecuteQueryOptions): QueryPromise<GetTenantInventoryStockTrustedData, GetTenantInventoryStockTrustedVariables>;
export function getTenantInventoryStockTrusted(dc: DataConnect, vars: GetTenantInventoryStockTrustedVariables, options?: ExecuteQueryOptions): QueryPromise<GetTenantInventoryStockTrustedData, GetTenantInventoryStockTrustedVariables>;

interface VoidTenantSaleRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: VoidTenantSaleVariables): MutationRef<VoidTenantSaleData, VoidTenantSaleVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: VoidTenantSaleVariables): MutationRef<VoidTenantSaleData, VoidTenantSaleVariables>;
  operationName: string;
}
export const voidTenantSaleRef: VoidTenantSaleRef;

export function voidTenantSale(vars: VoidTenantSaleVariables): MutationPromise<VoidTenantSaleData, VoidTenantSaleVariables>;
export function voidTenantSale(dc: DataConnect, vars: VoidTenantSaleVariables): MutationPromise<VoidTenantSaleData, VoidTenantSaleVariables>;

interface CreateTenantPurchaseRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTenantPurchaseVariables): MutationRef<CreateTenantPurchaseData, CreateTenantPurchaseVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateTenantPurchaseVariables): MutationRef<CreateTenantPurchaseData, CreateTenantPurchaseVariables>;
  operationName: string;
}
export const createTenantPurchaseRef: CreateTenantPurchaseRef;

export function createTenantPurchase(vars: CreateTenantPurchaseVariables): MutationPromise<CreateTenantPurchaseData, CreateTenantPurchaseVariables>;
export function createTenantPurchase(dc: DataConnect, vars: CreateTenantPurchaseVariables): MutationPromise<CreateTenantPurchaseData, CreateTenantPurchaseVariables>;

interface CreateTenantPurchaseLineRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTenantPurchaseLineVariables): MutationRef<CreateTenantPurchaseLineData, CreateTenantPurchaseLineVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateTenantPurchaseLineVariables): MutationRef<CreateTenantPurchaseLineData, CreateTenantPurchaseLineVariables>;
  operationName: string;
}
export const createTenantPurchaseLineRef: CreateTenantPurchaseLineRef;

export function createTenantPurchaseLine(vars: CreateTenantPurchaseLineVariables): MutationPromise<CreateTenantPurchaseLineData, CreateTenantPurchaseLineVariables>;
export function createTenantPurchaseLine(dc: DataConnect, vars: CreateTenantPurchaseLineVariables): MutationPromise<CreateTenantPurchaseLineData, CreateTenantPurchaseLineVariables>;

interface ChangeTenantPurchaseStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ChangeTenantPurchaseStatusVariables): MutationRef<ChangeTenantPurchaseStatusData, ChangeTenantPurchaseStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ChangeTenantPurchaseStatusVariables): MutationRef<ChangeTenantPurchaseStatusData, ChangeTenantPurchaseStatusVariables>;
  operationName: string;
}
export const changeTenantPurchaseStatusRef: ChangeTenantPurchaseStatusRef;

export function changeTenantPurchaseStatus(vars: ChangeTenantPurchaseStatusVariables): MutationPromise<ChangeTenantPurchaseStatusData, ChangeTenantPurchaseStatusVariables>;
export function changeTenantPurchaseStatus(dc: DataConnect, vars: ChangeTenantPurchaseStatusVariables): MutationPromise<ChangeTenantPurchaseStatusData, ChangeTenantPurchaseStatusVariables>;

interface ReceiveTenantPurchaseLineRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ReceiveTenantPurchaseLineVariables): MutationRef<ReceiveTenantPurchaseLineData, ReceiveTenantPurchaseLineVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ReceiveTenantPurchaseLineVariables): MutationRef<ReceiveTenantPurchaseLineData, ReceiveTenantPurchaseLineVariables>;
  operationName: string;
}
export const receiveTenantPurchaseLineRef: ReceiveTenantPurchaseLineRef;

export function receiveTenantPurchaseLine(vars: ReceiveTenantPurchaseLineVariables): MutationPromise<ReceiveTenantPurchaseLineData, ReceiveTenantPurchaseLineVariables>;
export function receiveTenantPurchaseLine(dc: DataConnect, vars: ReceiveTenantPurchaseLineVariables): MutationPromise<ReceiveTenantPurchaseLineData, ReceiveTenantPurchaseLineVariables>;

interface CreateTenantSupplierRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTenantSupplierVariables): MutationRef<CreateTenantSupplierData, CreateTenantSupplierVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateTenantSupplierVariables): MutationRef<CreateTenantSupplierData, CreateTenantSupplierVariables>;
  operationName: string;
}
export const createTenantSupplierRef: CreateTenantSupplierRef;

export function createTenantSupplier(vars: CreateTenantSupplierVariables): MutationPromise<CreateTenantSupplierData, CreateTenantSupplierVariables>;
export function createTenantSupplier(dc: DataConnect, vars: CreateTenantSupplierVariables): MutationPromise<CreateTenantSupplierData, CreateTenantSupplierVariables>;

interface UpdateTenantSupplierRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTenantSupplierVariables): MutationRef<UpdateTenantSupplierData, UpdateTenantSupplierVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateTenantSupplierVariables): MutationRef<UpdateTenantSupplierData, UpdateTenantSupplierVariables>;
  operationName: string;
}
export const updateTenantSupplierRef: UpdateTenantSupplierRef;

export function updateTenantSupplier(vars: UpdateTenantSupplierVariables): MutationPromise<UpdateTenantSupplierData, UpdateTenantSupplierVariables>;
export function updateTenantSupplier(dc: DataConnect, vars: UpdateTenantSupplierVariables): MutationPromise<UpdateTenantSupplierData, UpdateTenantSupplierVariables>;

interface ChangeTenantSupplierStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ChangeTenantSupplierStatusVariables): MutationRef<ChangeTenantSupplierStatusData, ChangeTenantSupplierStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ChangeTenantSupplierStatusVariables): MutationRef<ChangeTenantSupplierStatusData, ChangeTenantSupplierStatusVariables>;
  operationName: string;
}
export const changeTenantSupplierStatusRef: ChangeTenantSupplierStatusRef;

export function changeTenantSupplierStatus(vars: ChangeTenantSupplierStatusVariables): MutationPromise<ChangeTenantSupplierStatusData, ChangeTenantSupplierStatusVariables>;
export function changeTenantSupplierStatus(dc: DataConnect, vars: ChangeTenantSupplierStatusVariables): MutationPromise<ChangeTenantSupplierStatusData, ChangeTenantSupplierStatusVariables>;

interface CreateTenantCustomerRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTenantCustomerVariables): MutationRef<CreateTenantCustomerData, CreateTenantCustomerVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateTenantCustomerVariables): MutationRef<CreateTenantCustomerData, CreateTenantCustomerVariables>;
  operationName: string;
}
export const createTenantCustomerRef: CreateTenantCustomerRef;

export function createTenantCustomer(vars: CreateTenantCustomerVariables): MutationPromise<CreateTenantCustomerData, CreateTenantCustomerVariables>;
export function createTenantCustomer(dc: DataConnect, vars: CreateTenantCustomerVariables): MutationPromise<CreateTenantCustomerData, CreateTenantCustomerVariables>;

interface UpdateTenantCustomerRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTenantCustomerVariables): MutationRef<UpdateTenantCustomerData, UpdateTenantCustomerVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateTenantCustomerVariables): MutationRef<UpdateTenantCustomerData, UpdateTenantCustomerVariables>;
  operationName: string;
}
export const updateTenantCustomerRef: UpdateTenantCustomerRef;

export function updateTenantCustomer(vars: UpdateTenantCustomerVariables): MutationPromise<UpdateTenantCustomerData, UpdateTenantCustomerVariables>;
export function updateTenantCustomer(dc: DataConnect, vars: UpdateTenantCustomerVariables): MutationPromise<UpdateTenantCustomerData, UpdateTenantCustomerVariables>;

interface ChangeTenantCustomerStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ChangeTenantCustomerStatusVariables): MutationRef<ChangeTenantCustomerStatusData, ChangeTenantCustomerStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ChangeTenantCustomerStatusVariables): MutationRef<ChangeTenantCustomerStatusData, ChangeTenantCustomerStatusVariables>;
  operationName: string;
}
export const changeTenantCustomerStatusRef: ChangeTenantCustomerStatusRef;

export function changeTenantCustomerStatus(vars: ChangeTenantCustomerStatusVariables): MutationPromise<ChangeTenantCustomerStatusData, ChangeTenantCustomerStatusVariables>;
export function changeTenantCustomerStatus(dc: DataConnect, vars: ChangeTenantCustomerStatusVariables): MutationPromise<ChangeTenantCustomerStatusData, ChangeTenantCustomerStatusVariables>;

interface CreateTenantProductRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTenantProductVariables): MutationRef<CreateTenantProductData, CreateTenantProductVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateTenantProductVariables): MutationRef<CreateTenantProductData, CreateTenantProductVariables>;
  operationName: string;
}
export const createTenantProductRef: CreateTenantProductRef;

export function createTenantProduct(vars: CreateTenantProductVariables): MutationPromise<CreateTenantProductData, CreateTenantProductVariables>;
export function createTenantProduct(dc: DataConnect, vars: CreateTenantProductVariables): MutationPromise<CreateTenantProductData, CreateTenantProductVariables>;

interface UpdateTenantProductRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTenantProductVariables): MutationRef<UpdateTenantProductData, UpdateTenantProductVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateTenantProductVariables): MutationRef<UpdateTenantProductData, UpdateTenantProductVariables>;
  operationName: string;
}
export const updateTenantProductRef: UpdateTenantProductRef;

export function updateTenantProduct(vars: UpdateTenantProductVariables): MutationPromise<UpdateTenantProductData, UpdateTenantProductVariables>;
export function updateTenantProduct(dc: DataConnect, vars: UpdateTenantProductVariables): MutationPromise<UpdateTenantProductData, UpdateTenantProductVariables>;

interface ChangeTenantProductStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ChangeTenantProductStatusVariables): MutationRef<ChangeTenantProductStatusData, ChangeTenantProductStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ChangeTenantProductStatusVariables): MutationRef<ChangeTenantProductStatusData, ChangeTenantProductStatusVariables>;
  operationName: string;
}
export const changeTenantProductStatusRef: ChangeTenantProductStatusRef;

export function changeTenantProductStatus(vars: ChangeTenantProductStatusVariables): MutationPromise<ChangeTenantProductStatusData, ChangeTenantProductStatusVariables>;
export function changeTenantProductStatus(dc: DataConnect, vars: ChangeTenantProductStatusVariables): MutationPromise<ChangeTenantProductStatusData, ChangeTenantProductStatusVariables>;

interface AdjustTenantInventoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdjustTenantInventoryVariables): MutationRef<AdjustTenantInventoryData, AdjustTenantInventoryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdjustTenantInventoryVariables): MutationRef<AdjustTenantInventoryData, AdjustTenantInventoryVariables>;
  operationName: string;
}
export const adjustTenantInventoryRef: AdjustTenantInventoryRef;

export function adjustTenantInventory(vars: AdjustTenantInventoryVariables): MutationPromise<AdjustTenantInventoryData, AdjustTenantInventoryVariables>;
export function adjustTenantInventory(dc: DataConnect, vars: AdjustTenantInventoryVariables): MutationPromise<AdjustTenantInventoryData, AdjustTenantInventoryVariables>;

interface CreateTenantInventoryStockRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTenantInventoryStockVariables): MutationRef<CreateTenantInventoryStockData, CreateTenantInventoryStockVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateTenantInventoryStockVariables): MutationRef<CreateTenantInventoryStockData, CreateTenantInventoryStockVariables>;
  operationName: string;
}
export const createTenantInventoryStockRef: CreateTenantInventoryStockRef;

export function createTenantInventoryStock(vars: CreateTenantInventoryStockVariables): MutationPromise<CreateTenantInventoryStockData, CreateTenantInventoryStockVariables>;
export function createTenantInventoryStock(dc: DataConnect, vars: CreateTenantInventoryStockVariables): MutationPromise<CreateTenantInventoryStockData, CreateTenantInventoryStockVariables>;

interface GetTenantMembershipTrustedRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTenantMembershipTrustedVariables): QueryRef<GetTenantMembershipTrustedData, GetTenantMembershipTrustedVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetTenantMembershipTrustedVariables): QueryRef<GetTenantMembershipTrustedData, GetTenantMembershipTrustedVariables>;
  operationName: string;
}
export const getTenantMembershipTrustedRef: GetTenantMembershipTrustedRef;

export function getTenantMembershipTrusted(vars: GetTenantMembershipTrustedVariables, options?: ExecuteQueryOptions): QueryPromise<GetTenantMembershipTrustedData, GetTenantMembershipTrustedVariables>;
export function getTenantMembershipTrusted(dc: DataConnect, vars: GetTenantMembershipTrustedVariables, options?: ExecuteQueryOptions): QueryPromise<GetTenantMembershipTrustedData, GetTenantMembershipTrustedVariables>;

interface CreateTenantOutletRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTenantOutletVariables): MutationRef<CreateTenantOutletData, CreateTenantOutletVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateTenantOutletVariables): MutationRef<CreateTenantOutletData, CreateTenantOutletVariables>;
  operationName: string;
}
export const createTenantOutletRef: CreateTenantOutletRef;

export function createTenantOutlet(vars: CreateTenantOutletVariables): MutationPromise<CreateTenantOutletData, CreateTenantOutletVariables>;
export function createTenantOutlet(dc: DataConnect, vars: CreateTenantOutletVariables): MutationPromise<CreateTenantOutletData, CreateTenantOutletVariables>;

interface UpdateTenantOutletRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTenantOutletVariables): MutationRef<UpdateTenantOutletData, UpdateTenantOutletVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateTenantOutletVariables): MutationRef<UpdateTenantOutletData, UpdateTenantOutletVariables>;
  operationName: string;
}
export const updateTenantOutletRef: UpdateTenantOutletRef;

export function updateTenantOutlet(vars: UpdateTenantOutletVariables): MutationPromise<UpdateTenantOutletData, UpdateTenantOutletVariables>;
export function updateTenantOutlet(dc: DataConnect, vars: UpdateTenantOutletVariables): MutationPromise<UpdateTenantOutletData, UpdateTenantOutletVariables>;

interface ChangeTenantOutletStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ChangeTenantOutletStatusVariables): MutationRef<ChangeTenantOutletStatusData, ChangeTenantOutletStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ChangeTenantOutletStatusVariables): MutationRef<ChangeTenantOutletStatusData, ChangeTenantOutletStatusVariables>;
  operationName: string;
}
export const changeTenantOutletStatusRef: ChangeTenantOutletStatusRef;

export function changeTenantOutletStatus(vars: ChangeTenantOutletStatusVariables): MutationPromise<ChangeTenantOutletStatusData, ChangeTenantOutletStatusVariables>;
export function changeTenantOutletStatus(dc: DataConnect, vars: ChangeTenantOutletStatusVariables): MutationPromise<ChangeTenantOutletStatusData, ChangeTenantOutletStatusVariables>;

interface CreateTenantOutletTrustedRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTenantOutletTrustedVariables): MutationRef<CreateTenantOutletTrustedData, CreateTenantOutletTrustedVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateTenantOutletTrustedVariables): MutationRef<CreateTenantOutletTrustedData, CreateTenantOutletTrustedVariables>;
  operationName: string;
}
export const createTenantOutletTrustedRef: CreateTenantOutletTrustedRef;

export function createTenantOutletTrusted(vars: CreateTenantOutletTrustedVariables): MutationPromise<CreateTenantOutletTrustedData, CreateTenantOutletTrustedVariables>;
export function createTenantOutletTrusted(dc: DataConnect, vars: CreateTenantOutletTrustedVariables): MutationPromise<CreateTenantOutletTrustedData, CreateTenantOutletTrustedVariables>;

interface UpdateTenantOutletTrustedRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTenantOutletTrustedVariables): MutationRef<UpdateTenantOutletTrustedData, UpdateTenantOutletTrustedVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateTenantOutletTrustedVariables): MutationRef<UpdateTenantOutletTrustedData, UpdateTenantOutletTrustedVariables>;
  operationName: string;
}
export const updateTenantOutletTrustedRef: UpdateTenantOutletTrustedRef;

export function updateTenantOutletTrusted(vars: UpdateTenantOutletTrustedVariables): MutationPromise<UpdateTenantOutletTrustedData, UpdateTenantOutletTrustedVariables>;
export function updateTenantOutletTrusted(dc: DataConnect, vars: UpdateTenantOutletTrustedVariables): MutationPromise<UpdateTenantOutletTrustedData, UpdateTenantOutletTrustedVariables>;

interface ChangeTenantOutletStatusTrustedRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ChangeTenantOutletStatusTrustedVariables): MutationRef<ChangeTenantOutletStatusTrustedData, ChangeTenantOutletStatusTrustedVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ChangeTenantOutletStatusTrustedVariables): MutationRef<ChangeTenantOutletStatusTrustedData, ChangeTenantOutletStatusTrustedVariables>;
  operationName: string;
}
export const changeTenantOutletStatusTrustedRef: ChangeTenantOutletStatusTrustedRef;

export function changeTenantOutletStatusTrusted(vars: ChangeTenantOutletStatusTrustedVariables): MutationPromise<ChangeTenantOutletStatusTrustedData, ChangeTenantOutletStatusTrustedVariables>;
export function changeTenantOutletStatusTrusted(dc: DataConnect, vars: ChangeTenantOutletStatusTrustedVariables): MutationPromise<ChangeTenantOutletStatusTrustedData, ChangeTenantOutletStatusTrustedVariables>;

interface CreateTenantEmployeeProfileTrustedRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTenantEmployeeProfileTrustedVariables): MutationRef<CreateTenantEmployeeProfileTrustedData, CreateTenantEmployeeProfileTrustedVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateTenantEmployeeProfileTrustedVariables): MutationRef<CreateTenantEmployeeProfileTrustedData, CreateTenantEmployeeProfileTrustedVariables>;
  operationName: string;
}
export const createTenantEmployeeProfileTrustedRef: CreateTenantEmployeeProfileTrustedRef;

export function createTenantEmployeeProfileTrusted(vars: CreateTenantEmployeeProfileTrustedVariables): MutationPromise<CreateTenantEmployeeProfileTrustedData, CreateTenantEmployeeProfileTrustedVariables>;
export function createTenantEmployeeProfileTrusted(dc: DataConnect, vars: CreateTenantEmployeeProfileTrustedVariables): MutationPromise<CreateTenantEmployeeProfileTrustedData, CreateTenantEmployeeProfileTrustedVariables>;

interface ProvisionTenantEmployeeTrustedRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ProvisionTenantEmployeeTrustedVariables): MutationRef<ProvisionTenantEmployeeTrustedData, ProvisionTenantEmployeeTrustedVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ProvisionTenantEmployeeTrustedVariables): MutationRef<ProvisionTenantEmployeeTrustedData, ProvisionTenantEmployeeTrustedVariables>;
  operationName: string;
}
export const provisionTenantEmployeeTrustedRef: ProvisionTenantEmployeeTrustedRef;

export function provisionTenantEmployeeTrusted(vars: ProvisionTenantEmployeeTrustedVariables): MutationPromise<ProvisionTenantEmployeeTrustedData, ProvisionTenantEmployeeTrustedVariables>;
export function provisionTenantEmployeeTrusted(dc: DataConnect, vars: ProvisionTenantEmployeeTrustedVariables): MutationPromise<ProvisionTenantEmployeeTrustedData, ProvisionTenantEmployeeTrustedVariables>;

interface UpdateTenantEmployeeTrustedRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTenantEmployeeTrustedVariables): MutationRef<UpdateTenantEmployeeTrustedData, UpdateTenantEmployeeTrustedVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateTenantEmployeeTrustedVariables): MutationRef<UpdateTenantEmployeeTrustedData, UpdateTenantEmployeeTrustedVariables>;
  operationName: string;
}
export const updateTenantEmployeeTrustedRef: UpdateTenantEmployeeTrustedRef;

export function updateTenantEmployeeTrusted(vars: UpdateTenantEmployeeTrustedVariables): MutationPromise<UpdateTenantEmployeeTrustedData, UpdateTenantEmployeeTrustedVariables>;
export function updateTenantEmployeeTrusted(dc: DataConnect, vars: UpdateTenantEmployeeTrustedVariables): MutationPromise<UpdateTenantEmployeeTrustedData, UpdateTenantEmployeeTrustedVariables>;

interface ChangeTenantEmployeeStatusTrustedRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ChangeTenantEmployeeStatusTrustedVariables): MutationRef<ChangeTenantEmployeeStatusTrustedData, ChangeTenantEmployeeStatusTrustedVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ChangeTenantEmployeeStatusTrustedVariables): MutationRef<ChangeTenantEmployeeStatusTrustedData, ChangeTenantEmployeeStatusTrustedVariables>;
  operationName: string;
}
export const changeTenantEmployeeStatusTrustedRef: ChangeTenantEmployeeStatusTrustedRef;

export function changeTenantEmployeeStatusTrusted(vars: ChangeTenantEmployeeStatusTrustedVariables): MutationPromise<ChangeTenantEmployeeStatusTrustedData, ChangeTenantEmployeeStatusTrustedVariables>;
export function changeTenantEmployeeStatusTrusted(dc: DataConnect, vars: ChangeTenantEmployeeStatusTrustedVariables): MutationPromise<ChangeTenantEmployeeStatusTrustedData, ChangeTenantEmployeeStatusTrustedVariables>;

interface ChangeTenantEmployeeLoginAccessTrustedRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ChangeTenantEmployeeLoginAccessTrustedVariables): MutationRef<ChangeTenantEmployeeLoginAccessTrustedData, ChangeTenantEmployeeLoginAccessTrustedVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ChangeTenantEmployeeLoginAccessTrustedVariables): MutationRef<ChangeTenantEmployeeLoginAccessTrustedData, ChangeTenantEmployeeLoginAccessTrustedVariables>;
  operationName: string;
}
export const changeTenantEmployeeLoginAccessTrustedRef: ChangeTenantEmployeeLoginAccessTrustedRef;

export function changeTenantEmployeeLoginAccessTrusted(vars: ChangeTenantEmployeeLoginAccessTrustedVariables): MutationPromise<ChangeTenantEmployeeLoginAccessTrustedData, ChangeTenantEmployeeLoginAccessTrustedVariables>;
export function changeTenantEmployeeLoginAccessTrusted(dc: DataConnect, vars: ChangeTenantEmployeeLoginAccessTrustedVariables): MutationPromise<ChangeTenantEmployeeLoginAccessTrustedData, ChangeTenantEmployeeLoginAccessTrustedVariables>;

interface CreateTenantServicePersonTrustedRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTenantServicePersonTrustedVariables): MutationRef<CreateTenantServicePersonTrustedData, CreateTenantServicePersonTrustedVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateTenantServicePersonTrustedVariables): MutationRef<CreateTenantServicePersonTrustedData, CreateTenantServicePersonTrustedVariables>;
  operationName: string;
}
export const createTenantServicePersonTrustedRef: CreateTenantServicePersonTrustedRef;

export function createTenantServicePersonTrusted(vars: CreateTenantServicePersonTrustedVariables): MutationPromise<CreateTenantServicePersonTrustedData, CreateTenantServicePersonTrustedVariables>;
export function createTenantServicePersonTrusted(dc: DataConnect, vars: CreateTenantServicePersonTrustedVariables): MutationPromise<CreateTenantServicePersonTrustedData, CreateTenantServicePersonTrustedVariables>;

interface UpdateTenantServicePersonTrustedRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTenantServicePersonTrustedVariables): MutationRef<UpdateTenantServicePersonTrustedData, UpdateTenantServicePersonTrustedVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateTenantServicePersonTrustedVariables): MutationRef<UpdateTenantServicePersonTrustedData, UpdateTenantServicePersonTrustedVariables>;
  operationName: string;
}
export const updateTenantServicePersonTrustedRef: UpdateTenantServicePersonTrustedRef;

export function updateTenantServicePersonTrusted(vars: UpdateTenantServicePersonTrustedVariables): MutationPromise<UpdateTenantServicePersonTrustedData, UpdateTenantServicePersonTrustedVariables>;
export function updateTenantServicePersonTrusted(dc: DataConnect, vars: UpdateTenantServicePersonTrustedVariables): MutationPromise<UpdateTenantServicePersonTrustedData, UpdateTenantServicePersonTrustedVariables>;

interface ChangeTenantServicePersonStatusTrustedRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ChangeTenantServicePersonStatusTrustedVariables): MutationRef<ChangeTenantServicePersonStatusTrustedData, ChangeTenantServicePersonStatusTrustedVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ChangeTenantServicePersonStatusTrustedVariables): MutationRef<ChangeTenantServicePersonStatusTrustedData, ChangeTenantServicePersonStatusTrustedVariables>;
  operationName: string;
}
export const changeTenantServicePersonStatusTrustedRef: ChangeTenantServicePersonStatusTrustedRef;

export function changeTenantServicePersonStatusTrusted(vars: ChangeTenantServicePersonStatusTrustedVariables): MutationPromise<ChangeTenantServicePersonStatusTrustedData, ChangeTenantServicePersonStatusTrustedVariables>;
export function changeTenantServicePersonStatusTrusted(dc: DataConnect, vars: ChangeTenantServicePersonStatusTrustedVariables): MutationPromise<ChangeTenantServicePersonStatusTrustedData, ChangeTenantServicePersonStatusTrustedVariables>;

interface AssignTenantEmployeeOutletTrustedRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AssignTenantEmployeeOutletTrustedVariables): MutationRef<AssignTenantEmployeeOutletTrustedData, AssignTenantEmployeeOutletTrustedVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AssignTenantEmployeeOutletTrustedVariables): MutationRef<AssignTenantEmployeeOutletTrustedData, AssignTenantEmployeeOutletTrustedVariables>;
  operationName: string;
}
export const assignTenantEmployeeOutletTrustedRef: AssignTenantEmployeeOutletTrustedRef;

export function assignTenantEmployeeOutletTrusted(vars: AssignTenantEmployeeOutletTrustedVariables): MutationPromise<AssignTenantEmployeeOutletTrustedData, AssignTenantEmployeeOutletTrustedVariables>;
export function assignTenantEmployeeOutletTrusted(dc: DataConnect, vars: AssignTenantEmployeeOutletTrustedVariables): MutationPromise<AssignTenantEmployeeOutletTrustedData, AssignTenantEmployeeOutletTrustedVariables>;

interface AssignTenantServicePersonOutletTrustedRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AssignTenantServicePersonOutletTrustedVariables): MutationRef<AssignTenantServicePersonOutletTrustedData, AssignTenantServicePersonOutletTrustedVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AssignTenantServicePersonOutletTrustedVariables): MutationRef<AssignTenantServicePersonOutletTrustedData, AssignTenantServicePersonOutletTrustedVariables>;
  operationName: string;
}
export const assignTenantServicePersonOutletTrustedRef: AssignTenantServicePersonOutletTrustedRef;

export function assignTenantServicePersonOutletTrusted(vars: AssignTenantServicePersonOutletTrustedVariables): MutationPromise<AssignTenantServicePersonOutletTrustedData, AssignTenantServicePersonOutletTrustedVariables>;
export function assignTenantServicePersonOutletTrusted(dc: DataConnect, vars: AssignTenantServicePersonOutletTrustedVariables): MutationPromise<AssignTenantServicePersonOutletTrustedData, AssignTenantServicePersonOutletTrustedVariables>;

