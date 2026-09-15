import { ConnectorConfig, DataConnect, OperationOptions, ExecuteOperationResponse } from 'firebase-admin/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;

export enum AppUserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}
export enum CustomerStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}
export enum CustomerType {
  INDIVIDUAL = "INDIVIDUAL",
  BUSINESS = "BUSINESS",
}
export enum EmploymentStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}
export enum ExpenseApprovalStatus {
  DRAFT = "DRAFT",
  PENDING_APPROVAL = "PENDING_APPROVAL",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}
export enum ExpenseStatus {
  ACTIVE = "ACTIVE",
  VOIDED = "VOIDED",
}
export enum InventoryAdjustmentMode {
  INCREASE = "INCREASE",
  DECREASE = "DECREASE",
  RECONCILE = "RECONCILE",
}
export enum LicenseEventType {
  ASSIGNED = "ASSIGNED",
  PLAN_CHANGED = "PLAN_CHANGED",
  COMMERCIAL_TERMS_MODIFIED = "COMMERCIAL_TERMS_MODIFIED",
  RENEWED = "RENEWED",
}
export enum LicensePlanStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}
export enum LoginAccessStatus {
  ENABLED = "ENABLED",
  DISABLED = "DISABLED",
}
export enum MembershipStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}
export enum OrganizationStatus {
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
}
export enum OutletStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}
export enum ProductStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}
export enum ProductType {
  STOCKABLE = "STOCKABLE",
  SERVICE = "SERVICE",
  CONSUMABLE = "CONSUMABLE",
}
export enum PurchasePaymentStatus {
  PAID = "PAID",
  PARTIALLY_PAID = "PARTIALLY_PAID",
  UNPAID = "UNPAID",
}
export enum PurchaseReceiptStatus {
  PENDING = "PENDING",
  PARTIALLY_RECEIVED = "PARTIALLY_RECEIVED",
  RECEIVED = "RECEIVED",
}
export enum PurchaseStatus {
  ACTIVE = "ACTIVE",
  DRAFT = "DRAFT",
  CANCELLED = "CANCELLED",
}
export enum SaleStatus {
  COMPLETED = "COMPLETED",
  PARTIAL_REFUND = "PARTIAL_REFUND",
  REFUNDED = "REFUNDED",
  VOIDED = "VOIDED",
}
export enum SaleTenderType {
  VISA = "VISA",
  MASTERCARD = "MASTERCARD",
  APPLE_PAY = "APPLE_PAY",
  CASH = "CASH",
  SPLIT = "SPLIT",
  REVERSAL = "REVERSAL",
  NONE = "NONE",
}
export enum SupplierStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

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

export interface Category_Key {
  id: UUIDString;
  __typename?: 'Category_Key';
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

export interface CreateTenantCategoryTrustedData {
  category_insert: Category_Key;
  auditEvent_insert: AuditEvent_Key;
}

export interface CreateTenantCategoryTrustedVariables {
  id: UUIDString;
  organizationId: UUIDString;
  value: string;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}

export interface CreateTenantCustomerData {
  customer_insert: Customer_Key;
  auditEvent_insert: AuditEvent_Key;
}

export interface CreateTenantCustomerVariables {
  id: UUIDString;
  organizationId: UUIDString;
  type: CustomerType;
  name: string;
  phone: string;
  email: string;
  taxId?: string | null;
  documentType?: string | null;
  documentValue?: string | null;
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

export interface CreateTenantProductData {
  product_insert: Product_Key;
  auditEvent_insert: AuditEvent_Key;
}

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
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}

export interface CreateTenantSubcategoryTrustedData {
  subcategory_insert: Subcategory_Key;
  auditEvent_insert: AuditEvent_Key;
}

export interface CreateTenantSubcategoryTrustedVariables {
  id: UUIDString;
  organizationId: UUIDString;
  categoryId: UUIDString;
  value: string;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}

export interface CreateTenantSupplierData {
  supplier_insert: Supplier_Key;
  auditEvent_insert: AuditEvent_Key;
}

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

export interface DeleteTenantCategoryTrustedData {
  category_delete?: Category_Key | null;
  auditEvent_insert: AuditEvent_Key;
}

export interface DeleteTenantCategoryTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}

export interface DeleteTenantCustomerTrustedData {
  customer_delete?: Customer_Key | null;
  auditEvent_insert: AuditEvent_Key;
}

export interface DeleteTenantCustomerTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}

export interface DeleteTenantEmployeeOutletTrustedData {
  employeeOutlet_delete?: EmployeeOutlet_Key | null;
  auditEvent_insert: AuditEvent_Key;
}

export interface DeleteTenantEmployeeOutletTrustedVariables {
  organizationId: UUIDString;
  employeeId: UUIDString;
  outletId: UUIDString;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}

export interface DeleteTenantEmployeeTrustedData {
  employee_delete?: Employee_Key | null;
  auditEvent_insert: AuditEvent_Key;
}

export interface DeleteTenantEmployeeTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}

export interface DeleteTenantOutletTrustedData {
  outlet_delete?: Outlet_Key | null;
  auditEvent_insert: AuditEvent_Key;
}

export interface DeleteTenantOutletTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}

export interface DeleteTenantProductTrustedData {
  product_delete?: Product_Key | null;
  auditEvent_insert: AuditEvent_Key;
}

export interface DeleteTenantProductTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}

export interface DeleteTenantServicePersonOutletTrustedData {
  servicePersonOutlet_delete?: ServicePersonOutlet_Key | null;
  auditEvent_insert: AuditEvent_Key;
}

export interface DeleteTenantServicePersonOutletTrustedVariables {
  organizationId: UUIDString;
  servicePersonId: UUIDString;
  outletId: UUIDString;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}

export interface DeleteTenantServicePersonTrustedData {
  servicePerson_delete?: ServicePerson_Key | null;
  auditEvent_insert: AuditEvent_Key;
}

export interface DeleteTenantServicePersonTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}

export interface DeleteTenantSubcategoryTrustedData {
  subcategory_delete?: Subcategory_Key | null;
  auditEvent_insert: AuditEvent_Key;
}

export interface DeleteTenantSubcategoryTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}

export interface DeleteTenantSupplierTrustedData {
  supplier_delete?: Supplier_Key | null;
  auditEvent_insert: AuditEvent_Key;
}

export interface DeleteTenantSupplierTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
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

export interface GetOrganizationAdministratorTrustedVariables {
  organizationId: UUIDString;
  userId: UUIDString;
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
    documentType?: string | null;
    documentValue?: string | null;
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
  } & Customer_Key)[];
}

export interface GetTenantCustomerTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
}

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

export interface GetTenantEmployeeTrustedVariables {
  organizationId: UUIDString;
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

export interface GetTenantOutletTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
}

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
    imageUrl?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & Product_Key)[];
}

export interface GetTenantProductTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
}

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

export interface GetTenantServicePersonTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
}

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

export interface GetTenantSupplierTrustedVariables {
  organizationId: UUIDString;
  id: UUIDString;
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

export interface ListTenantCategoriesTrustedVariables {
  organizationId: UUIDString;
}

export interface ListTenantCategoriesVariables {
  organizationId: UUIDString;
}

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

export interface ListTenantCustomerPurchaseHistoryVariables {
  organizationId: UUIDString;
  customerId: UUIDString;
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
    customerCode: number;
    type: CustomerType;
    name: string;
    phone: string;
    email: string;
    taxId?: string | null;
    documentType?: string | null;
    documentValue?: string | null;
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
    outletCode: number;
    name: string;
    contactPerson: string;
    email?: string | null;
    phone: string;
    address: string;
    status: OutletStatus;
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

export interface ProvisionTenantEmployeeLoginTrustedData {
  appUser_insert: AppUser_Key;
  organizationMembership_insert: OrganizationMembership_Key;
  userRole_upsert: UserRole_Key;
  employee_update?: Employee_Key | null;
  auditEvent_insert: AuditEvent_Key;
}

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
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}

export interface ProvisionTenantEmployeeTrustedData {
  appUser_insert: AppUser_Key;
  organizationMembership_insert: OrganizationMembership_Key;
  userRole_upsert: UserRole_Key;
  employee_insert: Employee_Key;
  auditEvent_insert: AuditEvent_Key;
}

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

export interface ResolveTenantEmployeeIdentityTrustedVariables {
  organizationId: UUIDString;
  employeeId: UUIDString;
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

export interface Subcategory_Key {
  id: UUIDString;
  __typename?: 'Subcategory_Key';
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
  documentType?: string | null;
  documentValue?: string | null;
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

export interface UpdateTenantEmployeeLoginTrustedData {
  appUser_update?: AppUser_Key | null;
  organizationMembership_update?: OrganizationMembership_Key | null;
  removeAdminRole?: UserRole_Key | null;
  removeEmployeeRole?: UserRole_Key | null;
  userRole_upsert: UserRole_Key;
  employee_update?: Employee_Key | null;
  auditEvent_insert: AuditEvent_Key;
}

export interface UpdateTenantEmployeeLoginTrustedVariables {
  organizationId: UUIDString;
  employeeId: UUIDString;
  userId: UUIDString;
  username: string;
  email: string;
  roleId: UUIDString;
  loginAccess: LoginAccessStatus;
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
  gender?: string | null;
  dateOfBirth?: DateString | null;
  dateOfJoining: DateString;
  address?: string | null;
  notes?: string | null;
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
  address?: string | null;
  specialization?: string | null;
  yearsOfExperience?: number | null;
  assignmentScope: string;
  notes?: string | null;
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

/** Generated Node Admin SDK operation action function for the 'GetCurrentUserAuthorization' Query. Allow users to execute without passing in DataConnect. */
export function getCurrentUserAuthorization(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<GetCurrentUserAuthorizationData>>;
/** Generated Node Admin SDK operation action function for the 'GetCurrentUserAuthorization' Query. Allow users to pass in custom DataConnect instances. */
export function getCurrentUserAuthorization(options?: OperationOptions): Promise<ExecuteOperationResponse<GetCurrentUserAuthorizationData>>;

/** Generated Node Admin SDK operation action function for the 'GetUserAuthorizationByFirebaseUid' Query. Allow users to execute without passing in DataConnect. */
export function getUserAuthorizationByFirebaseUid(dc: DataConnect, vars: GetUserAuthorizationByFirebaseUidVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetUserAuthorizationByFirebaseUidData>>;
/** Generated Node Admin SDK operation action function for the 'GetUserAuthorizationByFirebaseUid' Query. Allow users to pass in custom DataConnect instances. */
export function getUserAuthorizationByFirebaseUid(vars: GetUserAuthorizationByFirebaseUidVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetUserAuthorizationByFirebaseUidData>>;

/** Generated Node Admin SDK operation action function for the 'ResolveUsernameLogin' Query. Allow users to execute without passing in DataConnect. */
export function resolveUsernameLogin(dc: DataConnect, vars: ResolveUsernameLoginVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ResolveUsernameLoginData>>;
/** Generated Node Admin SDK operation action function for the 'ResolveUsernameLogin' Query. Allow users to pass in custom DataConnect instances. */
export function resolveUsernameLogin(vars: ResolveUsernameLoginVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ResolveUsernameLoginData>>;

/** Generated Node Admin SDK operation action function for the 'RecordSuccessfulLogin' Mutation. Allow users to execute without passing in DataConnect. */
export function recordSuccessfulLogin(dc: DataConnect, vars: RecordSuccessfulLoginVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<RecordSuccessfulLoginData>>;
/** Generated Node Admin SDK operation action function for the 'RecordSuccessfulLogin' Mutation. Allow users to pass in custom DataConnect instances. */
export function recordSuccessfulLogin(vars: RecordSuccessfulLoginVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<RecordSuccessfulLoginData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateAppUserProfile' Mutation. Allow users to execute without passing in DataConnect. */
export function updateAppUserProfile(dc: DataConnect, vars: UpdateAppUserProfileVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateAppUserProfileData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateAppUserProfile' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateAppUserProfile(vars: UpdateAppUserProfileVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateAppUserProfileData>>;

/** Generated Node Admin SDK operation action function for the 'RecordPasswordChange' Mutation. Allow users to execute without passing in DataConnect. */
export function recordPasswordChange(dc: DataConnect, vars: RecordPasswordChangeVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<RecordPasswordChangeData>>;
/** Generated Node Admin SDK operation action function for the 'RecordPasswordChange' Mutation. Allow users to pass in custom DataConnect instances. */
export function recordPasswordChange(vars: RecordPasswordChangeVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<RecordPasswordChangeData>>;

/** Generated Node Admin SDK operation action function for the 'GetAppUserForBootstrap' Query. Allow users to execute without passing in DataConnect. */
export function getAppUserForBootstrap(dc: DataConnect, vars: GetAppUserForBootstrapVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetAppUserForBootstrapData>>;
/** Generated Node Admin SDK operation action function for the 'GetAppUserForBootstrap' Query. Allow users to pass in custom DataConnect instances. */
export function getAppUserForBootstrap(vars: GetAppUserForBootstrapVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetAppUserForBootstrapData>>;

/** Generated Node Admin SDK operation action function for the 'BootstrapMasterAdmin' Mutation. Allow users to execute without passing in DataConnect. */
export function bootstrapMasterAdmin(dc: DataConnect, vars: BootstrapMasterAdminVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<BootstrapMasterAdminData>>;
/** Generated Node Admin SDK operation action function for the 'BootstrapMasterAdmin' Mutation. Allow users to pass in custom DataConnect instances. */
export function bootstrapMasterAdmin(vars: BootstrapMasterAdminVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<BootstrapMasterAdminData>>;

/** Generated Node Admin SDK operation action function for the 'GetCurrentAppUser' Query. Allow users to execute without passing in DataConnect. */
export function getCurrentAppUser(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<GetCurrentAppUserData>>;
/** Generated Node Admin SDK operation action function for the 'GetCurrentAppUser' Query. Allow users to pass in custom DataConnect instances. */
export function getCurrentAppUser(options?: OperationOptions): Promise<ExecuteOperationResponse<GetCurrentAppUserData>>;

/** Generated Node Admin SDK operation action function for the 'GetAppUserByFirebaseUid' Query. Allow users to execute without passing in DataConnect. */
export function getAppUserByFirebaseUid(dc: DataConnect, vars: GetAppUserByFirebaseUidVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetAppUserByFirebaseUidData>>;
/** Generated Node Admin SDK operation action function for the 'GetAppUserByFirebaseUid' Query. Allow users to pass in custom DataConnect instances. */
export function getAppUserByFirebaseUid(vars: GetAppUserByFirebaseUidVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetAppUserByFirebaseUidData>>;

/** Generated Node Admin SDK operation action function for the 'ListLicensePlans' Query. Allow users to execute without passing in DataConnect. */
export function listLicensePlans(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<ListLicensePlansData>>;
/** Generated Node Admin SDK operation action function for the 'ListLicensePlans' Query. Allow users to pass in custom DataConnect instances. */
export function listLicensePlans(options?: OperationOptions): Promise<ExecuteOperationResponse<ListLicensePlansData>>;

/** Generated Node Admin SDK operation action function for the 'ListOrganizationLicensePlanAssignments' Query. Allow users to execute without passing in DataConnect. */
export function listOrganizationLicensePlanAssignments(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<ListOrganizationLicensePlanAssignmentsData>>;
/** Generated Node Admin SDK operation action function for the 'ListOrganizationLicensePlanAssignments' Query. Allow users to pass in custom DataConnect instances. */
export function listOrganizationLicensePlanAssignments(options?: OperationOptions): Promise<ExecuteOperationResponse<ListOrganizationLicensePlanAssignmentsData>>;

/** Generated Node Admin SDK operation action function for the 'GetLicensePlan' Query. Allow users to execute without passing in DataConnect. */
export function getLicensePlan(dc: DataConnect, vars: GetLicensePlanVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetLicensePlanData>>;
/** Generated Node Admin SDK operation action function for the 'GetLicensePlan' Query. Allow users to pass in custom DataConnect instances. */
export function getLicensePlan(vars: GetLicensePlanVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetLicensePlanData>>;

/** Generated Node Admin SDK operation action function for the 'GetLicensePlanTrusted' Query. Allow users to execute without passing in DataConnect. */
export function getLicensePlanTrusted(dc: DataConnect, vars: GetLicensePlanTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetLicensePlanTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'GetLicensePlanTrusted' Query. Allow users to pass in custom DataConnect instances. */
export function getLicensePlanTrusted(vars: GetLicensePlanTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetLicensePlanTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'CreateLicensePlan' Mutation. Allow users to execute without passing in DataConnect. */
export function createLicensePlan(dc: DataConnect, vars: CreateLicensePlanVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateLicensePlanData>>;
/** Generated Node Admin SDK operation action function for the 'CreateLicensePlan' Mutation. Allow users to pass in custom DataConnect instances. */
export function createLicensePlan(vars: CreateLicensePlanVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateLicensePlanData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateLicensePlan' Mutation. Allow users to execute without passing in DataConnect. */
export function updateLicensePlan(dc: DataConnect, vars: UpdateLicensePlanVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateLicensePlanData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateLicensePlan' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateLicensePlan(vars: UpdateLicensePlanVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateLicensePlanData>>;

/** Generated Node Admin SDK operation action function for the 'ChangeLicensePlanStatus' Mutation. Allow users to execute without passing in DataConnect. */
export function changeLicensePlanStatus(dc: DataConnect, vars: ChangeLicensePlanStatusVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ChangeLicensePlanStatusData>>;
/** Generated Node Admin SDK operation action function for the 'ChangeLicensePlanStatus' Mutation. Allow users to pass in custom DataConnect instances. */
export function changeLicensePlanStatus(vars: ChangeLicensePlanStatusVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ChangeLicensePlanStatusData>>;

/** Generated Node Admin SDK operation action function for the 'DeleteLicensePlan' Mutation. Allow users to execute without passing in DataConnect. */
export function deleteLicensePlan(dc: DataConnect, vars: DeleteLicensePlanVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteLicensePlanData>>;
/** Generated Node Admin SDK operation action function for the 'DeleteLicensePlan' Mutation. Allow users to pass in custom DataConnect instances. */
export function deleteLicensePlan(vars: DeleteLicensePlanVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteLicensePlanData>>;

/** Generated Node Admin SDK operation action function for the 'GetLicensePlanReferencesTrusted' Query. Allow users to execute without passing in DataConnect. */
export function getLicensePlanReferencesTrusted(dc: DataConnect, vars: GetLicensePlanReferencesTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetLicensePlanReferencesTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'GetLicensePlanReferencesTrusted' Query. Allow users to pass in custom DataConnect instances. */
export function getLicensePlanReferencesTrusted(vars: GetLicensePlanReferencesTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetLicensePlanReferencesTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'DeleteLicensePlanTrusted' Mutation. Allow users to execute without passing in DataConnect. */
export function deleteLicensePlanTrusted(dc: DataConnect, vars: DeleteLicensePlanTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteLicensePlanTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'DeleteLicensePlanTrusted' Mutation. Allow users to pass in custom DataConnect instances. */
export function deleteLicensePlanTrusted(vars: DeleteLicensePlanTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteLicensePlanTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'ListOrganizations' Query. Allow users to execute without passing in DataConnect. */
export function listOrganizations(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<ListOrganizationsData>>;
/** Generated Node Admin SDK operation action function for the 'ListOrganizations' Query. Allow users to pass in custom DataConnect instances. */
export function listOrganizations(options?: OperationOptions): Promise<ExecuteOperationResponse<ListOrganizationsData>>;

/** Generated Node Admin SDK operation action function for the 'GetOrganization' Query. Allow users to execute without passing in DataConnect. */
export function getOrganization(dc: DataConnect, vars: GetOrganizationVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetOrganizationData>>;
/** Generated Node Admin SDK operation action function for the 'GetOrganization' Query. Allow users to pass in custom DataConnect instances. */
export function getOrganization(vars: GetOrganizationVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetOrganizationData>>;

/** Generated Node Admin SDK operation action function for the 'GetOrganizationTrusted' Query. Allow users to execute without passing in DataConnect. */
export function getOrganizationTrusted(dc: DataConnect, vars: GetOrganizationTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetOrganizationTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'GetOrganizationTrusted' Query. Allow users to pass in custom DataConnect instances. */
export function getOrganizationTrusted(vars: GetOrganizationTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetOrganizationTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'ListOrganizationAdministrators' Query. Allow users to execute without passing in DataConnect. */
export function listOrganizationAdministrators(dc: DataConnect, vars: ListOrganizationAdministratorsVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListOrganizationAdministratorsData>>;
/** Generated Node Admin SDK operation action function for the 'ListOrganizationAdministrators' Query. Allow users to pass in custom DataConnect instances. */
export function listOrganizationAdministrators(vars: ListOrganizationAdministratorsVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListOrganizationAdministratorsData>>;

/** Generated Node Admin SDK operation action function for the 'GetOrganizationAdministrator' Query. Allow users to execute without passing in DataConnect. */
export function getOrganizationAdministrator(dc: DataConnect, vars: GetOrganizationAdministratorVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetOrganizationAdministratorData>>;
/** Generated Node Admin SDK operation action function for the 'GetOrganizationAdministrator' Query. Allow users to pass in custom DataConnect instances. */
export function getOrganizationAdministrator(vars: GetOrganizationAdministratorVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetOrganizationAdministratorData>>;

/** Generated Node Admin SDK operation action function for the 'ProvisionOrganizationAdministrator' Mutation. Allow users to execute without passing in DataConnect. */
export function provisionOrganizationAdministrator(dc: DataConnect, vars: ProvisionOrganizationAdministratorVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ProvisionOrganizationAdministratorData>>;
/** Generated Node Admin SDK operation action function for the 'ProvisionOrganizationAdministrator' Mutation. Allow users to pass in custom DataConnect instances. */
export function provisionOrganizationAdministrator(vars: ProvisionOrganizationAdministratorVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ProvisionOrganizationAdministratorData>>;

/** Generated Node Admin SDK operation action function for the 'EnsureAppUserRoleTrusted' Mutation. Allow users to execute without passing in DataConnect. */
export function ensureAppUserRoleTrusted(dc: DataConnect, vars: EnsureAppUserRoleTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<EnsureAppUserRoleTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'EnsureAppUserRoleTrusted' Mutation. Allow users to pass in custom DataConnect instances. */
export function ensureAppUserRoleTrusted(vars: EnsureAppUserRoleTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<EnsureAppUserRoleTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateOrganizationAdministrator' Mutation. Allow users to execute without passing in DataConnect. */
export function updateOrganizationAdministrator(dc: DataConnect, vars: UpdateOrganizationAdministratorVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateOrganizationAdministratorData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateOrganizationAdministrator' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateOrganizationAdministrator(vars: UpdateOrganizationAdministratorVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateOrganizationAdministratorData>>;

/** Generated Node Admin SDK operation action function for the 'ChangeOrganizationAdministratorStatus' Mutation. Allow users to execute without passing in DataConnect. */
export function changeOrganizationAdministratorStatus(dc: DataConnect, vars: ChangeOrganizationAdministratorStatusVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ChangeOrganizationAdministratorStatusData>>;
/** Generated Node Admin SDK operation action function for the 'ChangeOrganizationAdministratorStatus' Mutation. Allow users to pass in custom DataConnect instances. */
export function changeOrganizationAdministratorStatus(vars: ChangeOrganizationAdministratorStatusVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ChangeOrganizationAdministratorStatusData>>;

/** Generated Node Admin SDK operation action function for the 'GetOrganizationAdministratorTrusted' Query. Allow users to execute without passing in DataConnect. */
export function getOrganizationAdministratorTrusted(dc: DataConnect, vars: GetOrganizationAdministratorTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetOrganizationAdministratorTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'GetOrganizationAdministratorTrusted' Query. Allow users to pass in custom DataConnect instances. */
export function getOrganizationAdministratorTrusted(vars: GetOrganizationAdministratorTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetOrganizationAdministratorTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'ResolveOrganizationAdministratorIdentity' Query. Allow users to execute without passing in DataConnect. */
export function resolveOrganizationAdministratorIdentity(dc: DataConnect, vars: ResolveOrganizationAdministratorIdentityVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ResolveOrganizationAdministratorIdentityData>>;
/** Generated Node Admin SDK operation action function for the 'ResolveOrganizationAdministratorIdentity' Query. Allow users to pass in custom DataConnect instances. */
export function resolveOrganizationAdministratorIdentity(vars: ResolveOrganizationAdministratorIdentityVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ResolveOrganizationAdministratorIdentityData>>;

/** Generated Node Admin SDK operation action function for the 'RecordAdministratorSecurityEvent' Mutation. Allow users to execute without passing in DataConnect. */
export function recordAdministratorSecurityEvent(dc: DataConnect, vars: RecordAdministratorSecurityEventVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<RecordAdministratorSecurityEventData>>;
/** Generated Node Admin SDK operation action function for the 'RecordAdministratorSecurityEvent' Mutation. Allow users to pass in custom DataConnect instances. */
export function recordAdministratorSecurityEvent(vars: RecordAdministratorSecurityEventVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<RecordAdministratorSecurityEventData>>;

/** Generated Node Admin SDK operation action function for the 'GetOrganizationLicense' Query. Allow users to execute without passing in DataConnect. */
export function getOrganizationLicense(dc: DataConnect, vars: GetOrganizationLicenseVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetOrganizationLicenseData>>;
/** Generated Node Admin SDK operation action function for the 'GetOrganizationLicense' Query. Allow users to pass in custom DataConnect instances. */
export function getOrganizationLicense(vars: GetOrganizationLicenseVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetOrganizationLicenseData>>;

/** Generated Node Admin SDK operation action function for the 'GetOrganizationLicenseTrusted' Query. Allow users to execute without passing in DataConnect. */
export function getOrganizationLicenseTrusted(dc: DataConnect, vars: GetOrganizationLicenseTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetOrganizationLicenseTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'GetOrganizationLicenseTrusted' Query. Allow users to pass in custom DataConnect instances. */
export function getOrganizationLicenseTrusted(vars: GetOrganizationLicenseTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetOrganizationLicenseTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'GetOrganizationLicenseHistory' Query. Allow users to execute without passing in DataConnect. */
export function getOrganizationLicenseHistory(dc: DataConnect, vars: GetOrganizationLicenseHistoryVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetOrganizationLicenseHistoryData>>;
/** Generated Node Admin SDK operation action function for the 'GetOrganizationLicenseHistory' Query. Allow users to pass in custom DataConnect instances. */
export function getOrganizationLicenseHistory(vars: GetOrganizationLicenseHistoryVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetOrganizationLicenseHistoryData>>;

/** Generated Node Admin SDK operation action function for the 'GetOrganizationLicensePublic' Query. Allow users to execute without passing in DataConnect. */
export function getOrganizationLicensePublic(dc: DataConnect, vars: GetOrganizationLicensePublicVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetOrganizationLicensePublicData>>;
/** Generated Node Admin SDK operation action function for the 'GetOrganizationLicensePublic' Query. Allow users to pass in custom DataConnect instances. */
export function getOrganizationLicensePublic(vars: GetOrganizationLicensePublicVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetOrganizationLicensePublicData>>;

/** Generated Node Admin SDK operation action function for the 'GetOrganizationLicenseHistoryPublic' Query. Allow users to execute without passing in DataConnect. */
export function getOrganizationLicenseHistoryPublic(dc: DataConnect, vars: GetOrganizationLicenseHistoryPublicVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetOrganizationLicenseHistoryPublicData>>;
/** Generated Node Admin SDK operation action function for the 'GetOrganizationLicenseHistoryPublic' Query. Allow users to pass in custom DataConnect instances. */
export function getOrganizationLicenseHistoryPublic(vars: GetOrganizationLicenseHistoryPublicVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetOrganizationLicenseHistoryPublicData>>;

/** Generated Node Admin SDK operation action function for the 'ListOrganizationsTrusted' Query. Allow users to execute without passing in DataConnect. */
export function listOrganizationsTrusted(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<ListOrganizationsTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'ListOrganizationsTrusted' Query. Allow users to pass in custom DataConnect instances. */
export function listOrganizationsTrusted(options?: OperationOptions): Promise<ExecuteOperationResponse<ListOrganizationsTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'ListOrganizationUsersForDeletionTrusted' Query. Allow users to execute without passing in DataConnect. */
export function listOrganizationUsersForDeletionTrusted(dc: DataConnect, vars: ListOrganizationUsersForDeletionTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListOrganizationUsersForDeletionTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'ListOrganizationUsersForDeletionTrusted' Query. Allow users to pass in custom DataConnect instances. */
export function listOrganizationUsersForDeletionTrusted(vars: ListOrganizationUsersForDeletionTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListOrganizationUsersForDeletionTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'DeleteOrganizationTrusted' Mutation. Allow users to execute without passing in DataConnect. */
export function deleteOrganizationTrusted(dc: DataConnect, vars: DeleteOrganizationTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteOrganizationTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'DeleteOrganizationTrusted' Mutation. Allow users to pass in custom DataConnect instances. */
export function deleteOrganizationTrusted(vars: DeleteOrganizationTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteOrganizationTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'DeleteAppUserTrusted' Mutation. Allow users to execute without passing in DataConnect. */
export function deleteAppUserTrusted(dc: DataConnect, vars: DeleteAppUserTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteAppUserTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'DeleteAppUserTrusted' Mutation. Allow users to pass in custom DataConnect instances. */
export function deleteAppUserTrusted(vars: DeleteAppUserTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteAppUserTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'AssignOrganizationLicenseTrusted' Mutation. Allow users to execute without passing in DataConnect. */
export function assignOrganizationLicenseTrusted(dc: DataConnect, vars: AssignOrganizationLicenseTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<AssignOrganizationLicenseTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'AssignOrganizationLicenseTrusted' Mutation. Allow users to pass in custom DataConnect instances. */
export function assignOrganizationLicenseTrusted(vars: AssignOrganizationLicenseTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<AssignOrganizationLicenseTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'ChangeOrganizationLicensePlanTrusted' Mutation. Allow users to execute without passing in DataConnect. */
export function changeOrganizationLicensePlanTrusted(dc: DataConnect, vars: ChangeOrganizationLicensePlanTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ChangeOrganizationLicensePlanTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'ChangeOrganizationLicensePlanTrusted' Mutation. Allow users to pass in custom DataConnect instances. */
export function changeOrganizationLicensePlanTrusted(vars: ChangeOrganizationLicensePlanTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ChangeOrganizationLicensePlanTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'ModifyOrganizationCommercialTermsTrusted' Mutation. Allow users to execute without passing in DataConnect. */
export function modifyOrganizationCommercialTermsTrusted(dc: DataConnect, vars: ModifyOrganizationCommercialTermsTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ModifyOrganizationCommercialTermsTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'ModifyOrganizationCommercialTermsTrusted' Mutation. Allow users to pass in custom DataConnect instances. */
export function modifyOrganizationCommercialTermsTrusted(vars: ModifyOrganizationCommercialTermsTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ModifyOrganizationCommercialTermsTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'RenewOrganizationLicenseTrusted' Mutation. Allow users to execute without passing in DataConnect. */
export function renewOrganizationLicenseTrusted(dc: DataConnect, vars: RenewOrganizationLicenseTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<RenewOrganizationLicenseTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'RenewOrganizationLicenseTrusted' Mutation. Allow users to pass in custom DataConnect instances. */
export function renewOrganizationLicenseTrusted(vars: RenewOrganizationLicenseTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<RenewOrganizationLicenseTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'RecordProvisioningReconciliation' Mutation. Allow users to execute without passing in DataConnect. */
export function recordProvisioningReconciliation(dc: DataConnect, vars: RecordProvisioningReconciliationVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<RecordProvisioningReconciliationData>>;
/** Generated Node Admin SDK operation action function for the 'RecordProvisioningReconciliation' Mutation. Allow users to pass in custom DataConnect instances. */
export function recordProvisioningReconciliation(vars: RecordProvisioningReconciliationVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<RecordProvisioningReconciliationData>>;

/** Generated Node Admin SDK operation action function for the 'CreateOrganization' Mutation. Allow users to execute without passing in DataConnect. */
export function createOrganization(dc: DataConnect, vars: CreateOrganizationVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateOrganizationData>>;
/** Generated Node Admin SDK operation action function for the 'CreateOrganization' Mutation. Allow users to pass in custom DataConnect instances. */
export function createOrganization(vars: CreateOrganizationVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateOrganizationData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateOrganization' Mutation. Allow users to execute without passing in DataConnect. */
export function updateOrganization(dc: DataConnect, vars: UpdateOrganizationVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateOrganizationData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateOrganization' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateOrganization(vars: UpdateOrganizationVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateOrganizationData>>;

/** Generated Node Admin SDK operation action function for the 'ChangeOrganizationStatus' Mutation. Allow users to execute without passing in DataConnect. */
export function changeOrganizationStatus(dc: DataConnect, vars: ChangeOrganizationStatusVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ChangeOrganizationStatusData>>;
/** Generated Node Admin SDK operation action function for the 'ChangeOrganizationStatus' Mutation. Allow users to pass in custom DataConnect instances. */
export function changeOrganizationStatus(vars: ChangeOrganizationStatusVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ChangeOrganizationStatusData>>;

/** Generated Node Admin SDK operation action function for the 'ListTenantOutlets' Query. Allow users to execute without passing in DataConnect. */
export function listTenantOutlets(dc: DataConnect, vars: ListTenantOutletsVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListTenantOutletsData>>;
/** Generated Node Admin SDK operation action function for the 'ListTenantOutlets' Query. Allow users to pass in custom DataConnect instances. */
export function listTenantOutlets(vars: ListTenantOutletsVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListTenantOutletsData>>;

/** Generated Node Admin SDK operation action function for the 'ListTenantEmployees' Query. Allow users to execute without passing in DataConnect. */
export function listTenantEmployees(dc: DataConnect, vars: ListTenantEmployeesVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListTenantEmployeesData>>;
/** Generated Node Admin SDK operation action function for the 'ListTenantEmployees' Query. Allow users to pass in custom DataConnect instances. */
export function listTenantEmployees(vars: ListTenantEmployeesVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListTenantEmployeesData>>;

/** Generated Node Admin SDK operation action function for the 'ListTenantServicePersons' Query. Allow users to execute without passing in DataConnect. */
export function listTenantServicePersons(dc: DataConnect, vars: ListTenantServicePersonsVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListTenantServicePersonsData>>;
/** Generated Node Admin SDK operation action function for the 'ListTenantServicePersons' Query. Allow users to pass in custom DataConnect instances. */
export function listTenantServicePersons(vars: ListTenantServicePersonsVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListTenantServicePersonsData>>;

/** Generated Node Admin SDK operation action function for the 'ListTenantCategories' Query. Allow users to execute without passing in DataConnect. */
export function listTenantCategories(dc: DataConnect, vars: ListTenantCategoriesVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListTenantCategoriesData>>;
/** Generated Node Admin SDK operation action function for the 'ListTenantCategories' Query. Allow users to pass in custom DataConnect instances. */
export function listTenantCategories(vars: ListTenantCategoriesVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListTenantCategoriesData>>;

/** Generated Node Admin SDK operation action function for the 'ListTenantProducts' Query. Allow users to execute without passing in DataConnect. */
export function listTenantProducts(dc: DataConnect, vars: ListTenantProductsVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListTenantProductsData>>;
/** Generated Node Admin SDK operation action function for the 'ListTenantProducts' Query. Allow users to pass in custom DataConnect instances. */
export function listTenantProducts(vars: ListTenantProductsVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListTenantProductsData>>;

/** Generated Node Admin SDK operation action function for the 'ListTenantInventory' Query. Allow users to execute without passing in DataConnect. */
export function listTenantInventory(dc: DataConnect, vars: ListTenantInventoryVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListTenantInventoryData>>;
/** Generated Node Admin SDK operation action function for the 'ListTenantInventory' Query. Allow users to pass in custom DataConnect instances. */
export function listTenantInventory(vars: ListTenantInventoryVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListTenantInventoryData>>;

/** Generated Node Admin SDK operation action function for the 'ListTenantCustomers' Query. Allow users to execute without passing in DataConnect. */
export function listTenantCustomers(dc: DataConnect, vars: ListTenantCustomersVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListTenantCustomersData>>;
/** Generated Node Admin SDK operation action function for the 'ListTenantCustomers' Query. Allow users to pass in custom DataConnect instances. */
export function listTenantCustomers(vars: ListTenantCustomersVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListTenantCustomersData>>;

/** Generated Node Admin SDK operation action function for the 'ListTenantCustomerPurchaseHistory' Query. Allow users to execute without passing in DataConnect. */
export function listTenantCustomerPurchaseHistory(dc: DataConnect, vars: ListTenantCustomerPurchaseHistoryVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListTenantCustomerPurchaseHistoryData>>;
/** Generated Node Admin SDK operation action function for the 'ListTenantCustomerPurchaseHistory' Query. Allow users to pass in custom DataConnect instances. */
export function listTenantCustomerPurchaseHistory(vars: ListTenantCustomerPurchaseHistoryVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListTenantCustomerPurchaseHistoryData>>;

/** Generated Node Admin SDK operation action function for the 'ListTenantSuppliers' Query. Allow users to execute without passing in DataConnect. */
export function listTenantSuppliers(dc: DataConnect, vars: ListTenantSuppliersVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListTenantSuppliersData>>;
/** Generated Node Admin SDK operation action function for the 'ListTenantSuppliers' Query. Allow users to pass in custom DataConnect instances. */
export function listTenantSuppliers(vars: ListTenantSuppliersVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListTenantSuppliersData>>;

/** Generated Node Admin SDK operation action function for the 'ListTenantPurchases' Query. Allow users to execute without passing in DataConnect. */
export function listTenantPurchases(dc: DataConnect, vars: ListTenantPurchasesVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListTenantPurchasesData>>;
/** Generated Node Admin SDK operation action function for the 'ListTenantPurchases' Query. Allow users to pass in custom DataConnect instances. */
export function listTenantPurchases(vars: ListTenantPurchasesVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListTenantPurchasesData>>;

/** Generated Node Admin SDK operation action function for the 'ListTenantExpenses' Query. Allow users to execute without passing in DataConnect. */
export function listTenantExpenses(dc: DataConnect, vars: ListTenantExpensesVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListTenantExpensesData>>;
/** Generated Node Admin SDK operation action function for the 'ListTenantExpenses' Query. Allow users to pass in custom DataConnect instances. */
export function listTenantExpenses(vars: ListTenantExpensesVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListTenantExpensesData>>;

/** Generated Node Admin SDK operation action function for the 'CreateTenantExpense' Mutation. Allow users to execute without passing in DataConnect. */
export function createTenantExpense(dc: DataConnect, vars: CreateTenantExpenseVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateTenantExpenseData>>;
/** Generated Node Admin SDK operation action function for the 'CreateTenantExpense' Mutation. Allow users to pass in custom DataConnect instances. */
export function createTenantExpense(vars: CreateTenantExpenseVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateTenantExpenseData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateTenantExpense' Mutation. Allow users to execute without passing in DataConnect. */
export function updateTenantExpense(dc: DataConnect, vars: UpdateTenantExpenseVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateTenantExpenseData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateTenantExpense' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateTenantExpense(vars: UpdateTenantExpenseVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateTenantExpenseData>>;

/** Generated Node Admin SDK operation action function for the 'ChangeTenantExpenseApproval' Mutation. Allow users to execute without passing in DataConnect. */
export function changeTenantExpenseApproval(dc: DataConnect, vars: ChangeTenantExpenseApprovalVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ChangeTenantExpenseApprovalData>>;
/** Generated Node Admin SDK operation action function for the 'ChangeTenantExpenseApproval' Mutation. Allow users to pass in custom DataConnect instances. */
export function changeTenantExpenseApproval(vars: ChangeTenantExpenseApprovalVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ChangeTenantExpenseApprovalData>>;

/** Generated Node Admin SDK operation action function for the 'VoidTenantExpense' Mutation. Allow users to execute without passing in DataConnect. */
export function voidTenantExpense(dc: DataConnect, vars: VoidTenantExpenseVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<VoidTenantExpenseData>>;
/** Generated Node Admin SDK operation action function for the 'VoidTenantExpense' Mutation. Allow users to pass in custom DataConnect instances. */
export function voidTenantExpense(vars: VoidTenantExpenseVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<VoidTenantExpenseData>>;

/** Generated Node Admin SDK operation action function for the 'ListTenantSales' Query. Allow users to execute without passing in DataConnect. */
export function listTenantSales(dc: DataConnect, vars: ListTenantSalesVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListTenantSalesData>>;
/** Generated Node Admin SDK operation action function for the 'ListTenantSales' Query. Allow users to pass in custom DataConnect instances. */
export function listTenantSales(vars: ListTenantSalesVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListTenantSalesData>>;

/** Generated Node Admin SDK operation action function for the 'CreateTenantSale' Mutation. Allow users to execute without passing in DataConnect. */
export function createTenantSale(dc: DataConnect, vars: CreateTenantSaleVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateTenantSaleData>>;
/** Generated Node Admin SDK operation action function for the 'CreateTenantSale' Mutation. Allow users to pass in custom DataConnect instances. */
export function createTenantSale(vars: CreateTenantSaleVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateTenantSaleData>>;

/** Generated Node Admin SDK operation action function for the 'AddTenantSaleLine' Mutation. Allow users to execute without passing in DataConnect. */
export function addTenantSaleLine(dc: DataConnect, vars: AddTenantSaleLineVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<AddTenantSaleLineData>>;
/** Generated Node Admin SDK operation action function for the 'AddTenantSaleLine' Mutation. Allow users to pass in custom DataConnect instances. */
export function addTenantSaleLine(vars: AddTenantSaleLineVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<AddTenantSaleLineData>>;

/** Generated Node Admin SDK operation action function for the 'GetTenantInventoryStockTrusted' Query. Allow users to execute without passing in DataConnect. */
export function getTenantInventoryStockTrusted(dc: DataConnect, vars: GetTenantInventoryStockTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetTenantInventoryStockTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'GetTenantInventoryStockTrusted' Query. Allow users to pass in custom DataConnect instances. */
export function getTenantInventoryStockTrusted(vars: GetTenantInventoryStockTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetTenantInventoryStockTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'VoidTenantSale' Mutation. Allow users to execute without passing in DataConnect. */
export function voidTenantSale(dc: DataConnect, vars: VoidTenantSaleVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<VoidTenantSaleData>>;
/** Generated Node Admin SDK operation action function for the 'VoidTenantSale' Mutation. Allow users to pass in custom DataConnect instances. */
export function voidTenantSale(vars: VoidTenantSaleVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<VoidTenantSaleData>>;

/** Generated Node Admin SDK operation action function for the 'CreateTenantPurchase' Mutation. Allow users to execute without passing in DataConnect. */
export function createTenantPurchase(dc: DataConnect, vars: CreateTenantPurchaseVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateTenantPurchaseData>>;
/** Generated Node Admin SDK operation action function for the 'CreateTenantPurchase' Mutation. Allow users to pass in custom DataConnect instances. */
export function createTenantPurchase(vars: CreateTenantPurchaseVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateTenantPurchaseData>>;

/** Generated Node Admin SDK operation action function for the 'CreateTenantPurchaseLine' Mutation. Allow users to execute without passing in DataConnect. */
export function createTenantPurchaseLine(dc: DataConnect, vars: CreateTenantPurchaseLineVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateTenantPurchaseLineData>>;
/** Generated Node Admin SDK operation action function for the 'CreateTenantPurchaseLine' Mutation. Allow users to pass in custom DataConnect instances. */
export function createTenantPurchaseLine(vars: CreateTenantPurchaseLineVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateTenantPurchaseLineData>>;

/** Generated Node Admin SDK operation action function for the 'ChangeTenantPurchaseStatus' Mutation. Allow users to execute without passing in DataConnect. */
export function changeTenantPurchaseStatus(dc: DataConnect, vars: ChangeTenantPurchaseStatusVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ChangeTenantPurchaseStatusData>>;
/** Generated Node Admin SDK operation action function for the 'ChangeTenantPurchaseStatus' Mutation. Allow users to pass in custom DataConnect instances. */
export function changeTenantPurchaseStatus(vars: ChangeTenantPurchaseStatusVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ChangeTenantPurchaseStatusData>>;

/** Generated Node Admin SDK operation action function for the 'ReceiveTenantPurchaseLine' Mutation. Allow users to execute without passing in DataConnect. */
export function receiveTenantPurchaseLine(dc: DataConnect, vars: ReceiveTenantPurchaseLineVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ReceiveTenantPurchaseLineData>>;
/** Generated Node Admin SDK operation action function for the 'ReceiveTenantPurchaseLine' Mutation. Allow users to pass in custom DataConnect instances. */
export function receiveTenantPurchaseLine(vars: ReceiveTenantPurchaseLineVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ReceiveTenantPurchaseLineData>>;

/** Generated Node Admin SDK operation action function for the 'CreateTenantSupplier' Mutation. Allow users to execute without passing in DataConnect. */
export function createTenantSupplier(dc: DataConnect, vars: CreateTenantSupplierVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateTenantSupplierData>>;
/** Generated Node Admin SDK operation action function for the 'CreateTenantSupplier' Mutation. Allow users to pass in custom DataConnect instances. */
export function createTenantSupplier(vars: CreateTenantSupplierVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateTenantSupplierData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateTenantSupplier' Mutation. Allow users to execute without passing in DataConnect. */
export function updateTenantSupplier(dc: DataConnect, vars: UpdateTenantSupplierVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateTenantSupplierData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateTenantSupplier' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateTenantSupplier(vars: UpdateTenantSupplierVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateTenantSupplierData>>;

/** Generated Node Admin SDK operation action function for the 'ChangeTenantSupplierStatus' Mutation. Allow users to execute without passing in DataConnect. */
export function changeTenantSupplierStatus(dc: DataConnect, vars: ChangeTenantSupplierStatusVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ChangeTenantSupplierStatusData>>;
/** Generated Node Admin SDK operation action function for the 'ChangeTenantSupplierStatus' Mutation. Allow users to pass in custom DataConnect instances. */
export function changeTenantSupplierStatus(vars: ChangeTenantSupplierStatusVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ChangeTenantSupplierStatusData>>;

/** Generated Node Admin SDK operation action function for the 'GetTenantSupplierTrusted' Query. Allow users to execute without passing in DataConnect. */
export function getTenantSupplierTrusted(dc: DataConnect, vars: GetTenantSupplierTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetTenantSupplierTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'GetTenantSupplierTrusted' Query. Allow users to pass in custom DataConnect instances. */
export function getTenantSupplierTrusted(vars: GetTenantSupplierTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetTenantSupplierTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'CreateTenantCustomer' Mutation. Allow users to execute without passing in DataConnect. */
export function createTenantCustomer(dc: DataConnect, vars: CreateTenantCustomerVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateTenantCustomerData>>;
/** Generated Node Admin SDK operation action function for the 'CreateTenantCustomer' Mutation. Allow users to pass in custom DataConnect instances. */
export function createTenantCustomer(vars: CreateTenantCustomerVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateTenantCustomerData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateTenantCustomer' Mutation. Allow users to execute without passing in DataConnect. */
export function updateTenantCustomer(dc: DataConnect, vars: UpdateTenantCustomerVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateTenantCustomerData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateTenantCustomer' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateTenantCustomer(vars: UpdateTenantCustomerVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateTenantCustomerData>>;

/** Generated Node Admin SDK operation action function for the 'ChangeTenantCustomerStatus' Mutation. Allow users to execute without passing in DataConnect. */
export function changeTenantCustomerStatus(dc: DataConnect, vars: ChangeTenantCustomerStatusVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ChangeTenantCustomerStatusData>>;
/** Generated Node Admin SDK operation action function for the 'ChangeTenantCustomerStatus' Mutation. Allow users to pass in custom DataConnect instances. */
export function changeTenantCustomerStatus(vars: ChangeTenantCustomerStatusVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ChangeTenantCustomerStatusData>>;

/** Generated Node Admin SDK operation action function for the 'GetTenantCustomerTrusted' Query. Allow users to execute without passing in DataConnect. */
export function getTenantCustomerTrusted(dc: DataConnect, vars: GetTenantCustomerTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetTenantCustomerTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'GetTenantCustomerTrusted' Query. Allow users to pass in custom DataConnect instances. */
export function getTenantCustomerTrusted(vars: GetTenantCustomerTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetTenantCustomerTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'ListTenantCategoriesTrusted' Query. Allow users to execute without passing in DataConnect. */
export function listTenantCategoriesTrusted(dc: DataConnect, vars: ListTenantCategoriesTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListTenantCategoriesTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'ListTenantCategoriesTrusted' Query. Allow users to pass in custom DataConnect instances. */
export function listTenantCategoriesTrusted(vars: ListTenantCategoriesTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListTenantCategoriesTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'CreateTenantCategoryTrusted' Mutation. Allow users to execute without passing in DataConnect. */
export function createTenantCategoryTrusted(dc: DataConnect, vars: CreateTenantCategoryTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateTenantCategoryTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'CreateTenantCategoryTrusted' Mutation. Allow users to pass in custom DataConnect instances. */
export function createTenantCategoryTrusted(vars: CreateTenantCategoryTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateTenantCategoryTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'CreateTenantSubcategoryTrusted' Mutation. Allow users to execute without passing in DataConnect. */
export function createTenantSubcategoryTrusted(dc: DataConnect, vars: CreateTenantSubcategoryTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateTenantSubcategoryTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'CreateTenantSubcategoryTrusted' Mutation. Allow users to pass in custom DataConnect instances. */
export function createTenantSubcategoryTrusted(vars: CreateTenantSubcategoryTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateTenantSubcategoryTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'CreateTenantProduct' Mutation. Allow users to execute without passing in DataConnect. */
export function createTenantProduct(dc: DataConnect, vars: CreateTenantProductVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateTenantProductData>>;
/** Generated Node Admin SDK operation action function for the 'CreateTenantProduct' Mutation. Allow users to pass in custom DataConnect instances. */
export function createTenantProduct(vars: CreateTenantProductVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateTenantProductData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateTenantProduct' Mutation. Allow users to execute without passing in DataConnect. */
export function updateTenantProduct(dc: DataConnect, vars: UpdateTenantProductVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateTenantProductData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateTenantProduct' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateTenantProduct(vars: UpdateTenantProductVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateTenantProductData>>;

/** Generated Node Admin SDK operation action function for the 'ChangeTenantProductStatus' Mutation. Allow users to execute without passing in DataConnect. */
export function changeTenantProductStatus(dc: DataConnect, vars: ChangeTenantProductStatusVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ChangeTenantProductStatusData>>;
/** Generated Node Admin SDK operation action function for the 'ChangeTenantProductStatus' Mutation. Allow users to pass in custom DataConnect instances. */
export function changeTenantProductStatus(vars: ChangeTenantProductStatusVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ChangeTenantProductStatusData>>;

/** Generated Node Admin SDK operation action function for the 'GetTenantProductTrusted' Query. Allow users to execute without passing in DataConnect. */
export function getTenantProductTrusted(dc: DataConnect, vars: GetTenantProductTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetTenantProductTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'GetTenantProductTrusted' Query. Allow users to pass in custom DataConnect instances. */
export function getTenantProductTrusted(vars: GetTenantProductTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetTenantProductTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'AdjustTenantInventory' Mutation. Allow users to execute without passing in DataConnect. */
export function adjustTenantInventory(dc: DataConnect, vars: AdjustTenantInventoryVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<AdjustTenantInventoryData>>;
/** Generated Node Admin SDK operation action function for the 'AdjustTenantInventory' Mutation. Allow users to pass in custom DataConnect instances. */
export function adjustTenantInventory(vars: AdjustTenantInventoryVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<AdjustTenantInventoryData>>;

/** Generated Node Admin SDK operation action function for the 'CreateTenantInventoryStock' Mutation. Allow users to execute without passing in DataConnect. */
export function createTenantInventoryStock(dc: DataConnect, vars: CreateTenantInventoryStockVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateTenantInventoryStockData>>;
/** Generated Node Admin SDK operation action function for the 'CreateTenantInventoryStock' Mutation. Allow users to pass in custom DataConnect instances. */
export function createTenantInventoryStock(vars: CreateTenantInventoryStockVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateTenantInventoryStockData>>;

/** Generated Node Admin SDK operation action function for the 'GetTenantMembershipTrusted' Query. Allow users to execute without passing in DataConnect. */
export function getTenantMembershipTrusted(dc: DataConnect, vars: GetTenantMembershipTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetTenantMembershipTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'GetTenantMembershipTrusted' Query. Allow users to pass in custom DataConnect instances. */
export function getTenantMembershipTrusted(vars: GetTenantMembershipTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetTenantMembershipTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'ResolveTenantEmployeeIdentityTrusted' Query. Allow users to execute without passing in DataConnect. */
export function resolveTenantEmployeeIdentityTrusted(dc: DataConnect, vars: ResolveTenantEmployeeIdentityTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ResolveTenantEmployeeIdentityTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'ResolveTenantEmployeeIdentityTrusted' Query. Allow users to pass in custom DataConnect instances. */
export function resolveTenantEmployeeIdentityTrusted(vars: ResolveTenantEmployeeIdentityTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ResolveTenantEmployeeIdentityTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'CreateTenantOutlet' Mutation. Allow users to execute without passing in DataConnect. */
export function createTenantOutlet(dc: DataConnect, vars: CreateTenantOutletVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateTenantOutletData>>;
/** Generated Node Admin SDK operation action function for the 'CreateTenantOutlet' Mutation. Allow users to pass in custom DataConnect instances. */
export function createTenantOutlet(vars: CreateTenantOutletVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateTenantOutletData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateTenantOutlet' Mutation. Allow users to execute without passing in DataConnect. */
export function updateTenantOutlet(dc: DataConnect, vars: UpdateTenantOutletVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateTenantOutletData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateTenantOutlet' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateTenantOutlet(vars: UpdateTenantOutletVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateTenantOutletData>>;

/** Generated Node Admin SDK operation action function for the 'ChangeTenantOutletStatus' Mutation. Allow users to execute without passing in DataConnect. */
export function changeTenantOutletStatus(dc: DataConnect, vars: ChangeTenantOutletStatusVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ChangeTenantOutletStatusData>>;
/** Generated Node Admin SDK operation action function for the 'ChangeTenantOutletStatus' Mutation. Allow users to pass in custom DataConnect instances. */
export function changeTenantOutletStatus(vars: ChangeTenantOutletStatusVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ChangeTenantOutletStatusData>>;

/** Generated Node Admin SDK operation action function for the 'CreateTenantOutletTrusted' Mutation. Allow users to execute without passing in DataConnect. */
export function createTenantOutletTrusted(dc: DataConnect, vars: CreateTenantOutletTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateTenantOutletTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'CreateTenantOutletTrusted' Mutation. Allow users to pass in custom DataConnect instances. */
export function createTenantOutletTrusted(vars: CreateTenantOutletTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateTenantOutletTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateTenantOutletTrusted' Mutation. Allow users to execute without passing in DataConnect. */
export function updateTenantOutletTrusted(dc: DataConnect, vars: UpdateTenantOutletTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateTenantOutletTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateTenantOutletTrusted' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateTenantOutletTrusted(vars: UpdateTenantOutletTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateTenantOutletTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'ChangeTenantOutletStatusTrusted' Mutation. Allow users to execute without passing in DataConnect. */
export function changeTenantOutletStatusTrusted(dc: DataConnect, vars: ChangeTenantOutletStatusTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ChangeTenantOutletStatusTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'ChangeTenantOutletStatusTrusted' Mutation. Allow users to pass in custom DataConnect instances. */
export function changeTenantOutletStatusTrusted(vars: ChangeTenantOutletStatusTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ChangeTenantOutletStatusTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'DeleteTenantOutletTrusted' Mutation. Allow users to execute without passing in DataConnect. */
export function deleteTenantOutletTrusted(dc: DataConnect, vars: DeleteTenantOutletTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteTenantOutletTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'DeleteTenantOutletTrusted' Mutation. Allow users to pass in custom DataConnect instances. */
export function deleteTenantOutletTrusted(vars: DeleteTenantOutletTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteTenantOutletTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'DeleteTenantEmployeeTrusted' Mutation. Allow users to execute without passing in DataConnect. */
export function deleteTenantEmployeeTrusted(dc: DataConnect, vars: DeleteTenantEmployeeTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteTenantEmployeeTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'DeleteTenantEmployeeTrusted' Mutation. Allow users to pass in custom DataConnect instances. */
export function deleteTenantEmployeeTrusted(vars: DeleteTenantEmployeeTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteTenantEmployeeTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'DeleteTenantServicePersonTrusted' Mutation. Allow users to execute without passing in DataConnect. */
export function deleteTenantServicePersonTrusted(dc: DataConnect, vars: DeleteTenantServicePersonTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteTenantServicePersonTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'DeleteTenantServicePersonTrusted' Mutation. Allow users to pass in custom DataConnect instances. */
export function deleteTenantServicePersonTrusted(vars: DeleteTenantServicePersonTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteTenantServicePersonTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'DeleteTenantServicePersonOutletTrusted' Mutation. Allow users to execute without passing in DataConnect. */
export function deleteTenantServicePersonOutletTrusted(dc: DataConnect, vars: DeleteTenantServicePersonOutletTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteTenantServicePersonOutletTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'DeleteTenantServicePersonOutletTrusted' Mutation. Allow users to pass in custom DataConnect instances. */
export function deleteTenantServicePersonOutletTrusted(vars: DeleteTenantServicePersonOutletTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteTenantServicePersonOutletTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'DeleteTenantCustomerTrusted' Mutation. Allow users to execute without passing in DataConnect. */
export function deleteTenantCustomerTrusted(dc: DataConnect, vars: DeleteTenantCustomerTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteTenantCustomerTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'DeleteTenantCustomerTrusted' Mutation. Allow users to pass in custom DataConnect instances. */
export function deleteTenantCustomerTrusted(vars: DeleteTenantCustomerTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteTenantCustomerTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'DeleteTenantSupplierTrusted' Mutation. Allow users to execute without passing in DataConnect. */
export function deleteTenantSupplierTrusted(dc: DataConnect, vars: DeleteTenantSupplierTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteTenantSupplierTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'DeleteTenantSupplierTrusted' Mutation. Allow users to pass in custom DataConnect instances. */
export function deleteTenantSupplierTrusted(vars: DeleteTenantSupplierTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteTenantSupplierTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'DeleteTenantProductTrusted' Mutation. Allow users to execute without passing in DataConnect. */
export function deleteTenantProductTrusted(dc: DataConnect, vars: DeleteTenantProductTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteTenantProductTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'DeleteTenantProductTrusted' Mutation. Allow users to pass in custom DataConnect instances. */
export function deleteTenantProductTrusted(vars: DeleteTenantProductTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteTenantProductTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'DeleteTenantCategoryTrusted' Mutation. Allow users to execute without passing in DataConnect. */
export function deleteTenantCategoryTrusted(dc: DataConnect, vars: DeleteTenantCategoryTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteTenantCategoryTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'DeleteTenantCategoryTrusted' Mutation. Allow users to pass in custom DataConnect instances. */
export function deleteTenantCategoryTrusted(vars: DeleteTenantCategoryTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteTenantCategoryTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'DeleteTenantSubcategoryTrusted' Mutation. Allow users to execute without passing in DataConnect. */
export function deleteTenantSubcategoryTrusted(dc: DataConnect, vars: DeleteTenantSubcategoryTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteTenantSubcategoryTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'DeleteTenantSubcategoryTrusted' Mutation. Allow users to pass in custom DataConnect instances. */
export function deleteTenantSubcategoryTrusted(vars: DeleteTenantSubcategoryTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteTenantSubcategoryTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'GetTenantOutletTrusted' Query. Allow users to execute without passing in DataConnect. */
export function getTenantOutletTrusted(dc: DataConnect, vars: GetTenantOutletTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetTenantOutletTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'GetTenantOutletTrusted' Query. Allow users to pass in custom DataConnect instances. */
export function getTenantOutletTrusted(vars: GetTenantOutletTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetTenantOutletTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'CreateTenantEmployeeProfileTrusted' Mutation. Allow users to execute without passing in DataConnect. */
export function createTenantEmployeeProfileTrusted(dc: DataConnect, vars: CreateTenantEmployeeProfileTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateTenantEmployeeProfileTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'CreateTenantEmployeeProfileTrusted' Mutation. Allow users to pass in custom DataConnect instances. */
export function createTenantEmployeeProfileTrusted(vars: CreateTenantEmployeeProfileTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateTenantEmployeeProfileTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'ProvisionTenantEmployeeTrusted' Mutation. Allow users to execute without passing in DataConnect. */
export function provisionTenantEmployeeTrusted(dc: DataConnect, vars: ProvisionTenantEmployeeTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ProvisionTenantEmployeeTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'ProvisionTenantEmployeeTrusted' Mutation. Allow users to pass in custom DataConnect instances. */
export function provisionTenantEmployeeTrusted(vars: ProvisionTenantEmployeeTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ProvisionTenantEmployeeTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'ProvisionTenantEmployeeLoginTrusted' Mutation. Allow users to execute without passing in DataConnect. */
export function provisionTenantEmployeeLoginTrusted(dc: DataConnect, vars: ProvisionTenantEmployeeLoginTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ProvisionTenantEmployeeLoginTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'ProvisionTenantEmployeeLoginTrusted' Mutation. Allow users to pass in custom DataConnect instances. */
export function provisionTenantEmployeeLoginTrusted(vars: ProvisionTenantEmployeeLoginTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ProvisionTenantEmployeeLoginTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateTenantEmployeeLoginTrusted' Mutation. Allow users to execute without passing in DataConnect. */
export function updateTenantEmployeeLoginTrusted(dc: DataConnect, vars: UpdateTenantEmployeeLoginTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateTenantEmployeeLoginTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateTenantEmployeeLoginTrusted' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateTenantEmployeeLoginTrusted(vars: UpdateTenantEmployeeLoginTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateTenantEmployeeLoginTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateTenantEmployeeTrusted' Mutation. Allow users to execute without passing in DataConnect. */
export function updateTenantEmployeeTrusted(dc: DataConnect, vars: UpdateTenantEmployeeTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateTenantEmployeeTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateTenantEmployeeTrusted' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateTenantEmployeeTrusted(vars: UpdateTenantEmployeeTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateTenantEmployeeTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'ChangeTenantEmployeeStatusTrusted' Mutation. Allow users to execute without passing in DataConnect. */
export function changeTenantEmployeeStatusTrusted(dc: DataConnect, vars: ChangeTenantEmployeeStatusTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ChangeTenantEmployeeStatusTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'ChangeTenantEmployeeStatusTrusted' Mutation. Allow users to pass in custom DataConnect instances. */
export function changeTenantEmployeeStatusTrusted(vars: ChangeTenantEmployeeStatusTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ChangeTenantEmployeeStatusTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'ChangeTenantEmployeeLoginAccessTrusted' Mutation. Allow users to execute without passing in DataConnect. */
export function changeTenantEmployeeLoginAccessTrusted(dc: DataConnect, vars: ChangeTenantEmployeeLoginAccessTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ChangeTenantEmployeeLoginAccessTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'ChangeTenantEmployeeLoginAccessTrusted' Mutation. Allow users to pass in custom DataConnect instances. */
export function changeTenantEmployeeLoginAccessTrusted(vars: ChangeTenantEmployeeLoginAccessTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ChangeTenantEmployeeLoginAccessTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'GetTenantEmployeeTrusted' Query. Allow users to execute without passing in DataConnect. */
export function getTenantEmployeeTrusted(dc: DataConnect, vars: GetTenantEmployeeTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetTenantEmployeeTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'GetTenantEmployeeTrusted' Query. Allow users to pass in custom DataConnect instances. */
export function getTenantEmployeeTrusted(vars: GetTenantEmployeeTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetTenantEmployeeTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'CreateTenantServicePersonTrusted' Mutation. Allow users to execute without passing in DataConnect. */
export function createTenantServicePersonTrusted(dc: DataConnect, vars: CreateTenantServicePersonTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateTenantServicePersonTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'CreateTenantServicePersonTrusted' Mutation. Allow users to pass in custom DataConnect instances. */
export function createTenantServicePersonTrusted(vars: CreateTenantServicePersonTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateTenantServicePersonTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateTenantServicePersonTrusted' Mutation. Allow users to execute without passing in DataConnect. */
export function updateTenantServicePersonTrusted(dc: DataConnect, vars: UpdateTenantServicePersonTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateTenantServicePersonTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateTenantServicePersonTrusted' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateTenantServicePersonTrusted(vars: UpdateTenantServicePersonTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateTenantServicePersonTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'ChangeTenantServicePersonStatusTrusted' Mutation. Allow users to execute without passing in DataConnect. */
export function changeTenantServicePersonStatusTrusted(dc: DataConnect, vars: ChangeTenantServicePersonStatusTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ChangeTenantServicePersonStatusTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'ChangeTenantServicePersonStatusTrusted' Mutation. Allow users to pass in custom DataConnect instances. */
export function changeTenantServicePersonStatusTrusted(vars: ChangeTenantServicePersonStatusTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ChangeTenantServicePersonStatusTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'GetTenantServicePersonTrusted' Query. Allow users to execute without passing in DataConnect. */
export function getTenantServicePersonTrusted(dc: DataConnect, vars: GetTenantServicePersonTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetTenantServicePersonTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'GetTenantServicePersonTrusted' Query. Allow users to pass in custom DataConnect instances. */
export function getTenantServicePersonTrusted(vars: GetTenantServicePersonTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetTenantServicePersonTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'AssignTenantEmployeeOutletTrusted' Mutation. Allow users to execute without passing in DataConnect. */
export function assignTenantEmployeeOutletTrusted(dc: DataConnect, vars: AssignTenantEmployeeOutletTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<AssignTenantEmployeeOutletTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'AssignTenantEmployeeOutletTrusted' Mutation. Allow users to pass in custom DataConnect instances. */
export function assignTenantEmployeeOutletTrusted(vars: AssignTenantEmployeeOutletTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<AssignTenantEmployeeOutletTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'DeleteTenantEmployeeOutletTrusted' Mutation. Allow users to execute without passing in DataConnect. */
export function deleteTenantEmployeeOutletTrusted(dc: DataConnect, vars: DeleteTenantEmployeeOutletTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteTenantEmployeeOutletTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'DeleteTenantEmployeeOutletTrusted' Mutation. Allow users to pass in custom DataConnect instances. */
export function deleteTenantEmployeeOutletTrusted(vars: DeleteTenantEmployeeOutletTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteTenantEmployeeOutletTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'AssignTenantServicePersonOutletTrusted' Mutation. Allow users to execute without passing in DataConnect. */
export function assignTenantServicePersonOutletTrusted(dc: DataConnect, vars: AssignTenantServicePersonOutletTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<AssignTenantServicePersonOutletTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'AssignTenantServicePersonOutletTrusted' Mutation. Allow users to pass in custom DataConnect instances. */
export function assignTenantServicePersonOutletTrusted(vars: AssignTenantServicePersonOutletTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<AssignTenantServicePersonOutletTrustedData>>;

