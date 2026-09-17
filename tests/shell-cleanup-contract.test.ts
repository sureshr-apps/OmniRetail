import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const read = (path: string) => readFileSync(new URL(`../src/${path}`, import.meta.url), 'utf8');

describe('requested shell cleanup', () => {
  it('removes support, notification, and tenant status decorations', () => {
    const header = read('shared/layout/Header.tsx');
    const tenantSidebar = read('shared/layout/TenantSidebar.tsx');

    expect(header).not.toContain('Docs & Support');
    expect(header).not.toContain('Bell');
    expect(tenantSidebar).not.toContain('Retail Operations');
    expect(tenantSidebar).not.toContain('Live');
  });

  it('removes the sample cart action from Billing/POS', () => {
    const orderItemsTable = read('features/billing/components/OrderItemsTable.tsx');
    const billingPage = read('features/billing/pages/BillingPage.tsx');

    expect(orderItemsTable).not.toContain('Load Sample Cart');
    expect(orderItemsTable).not.toContain('onQuickAddFirstItem');
    expect(billingPage).not.toContain('onQuickAddFirstItem');
  });

  it('allows password audit recording without a role-specific capability', () => {
    const functions = readFileSync(new URL('../functions/src/index.ts', import.meta.url), 'utf8');
    const start = functions.indexOf('export const recordPasswordChange');
    const end = functions.indexOf('export const provisionOrganizationAdministrator', start);
    const handler = functions.slice(start, end);

    expect(handler).not.toContain("requireCapability(record, 'profile.change_password')");
  });

  it('does not present unsupported Service Person date fields', () => {
    const modal = read('features/service-persons/components/ServicePersonModal.tsx');
    const drawer = read('features/service-persons/components/ServicePersonDetailDrawer.tsx');

    expect(modal).not.toContain('Date of Joining');
    expect(modal).not.toContain('dateOfJoining');
    expect(drawer).not.toContain('dateOfJoining');
  });

  it('does not present the removed Service Person skills field', () => {
    const modal = read('features/service-persons/components/ServicePersonModal.tsx');
    const drawer = read('features/service-persons/components/ServicePersonDetailDrawer.tsx');

    expect(modal).not.toContain('Skills &amp; Certifications');
    expect(modal).not.toContain('skillsString');
    expect(drawer).not.toContain('Skills &amp; Certifications');
    expect(drawer).not.toContain('person.skills');
  });

  it('does not present placeholder Service Person jobs or activity sections', () => {
    const drawer = read('features/service-persons/components/ServicePersonDetailDrawer.tsx');
    expect(drawer).not.toContain('Open Service Jobs');
    expect(drawer).not.toContain('Recent Activity Timeline');
    expect(drawer).not.toContain('openJobs');
    expect(drawer).not.toContain('timelineEvents');
    expect(drawer).toContain('Service Notes');
    expect(drawer).toContain('{person.notes}');
  });

  it('keeps Service Person detail actions ordered with edit as the green right-side action', () => {
    const drawer = read('features/service-persons/components/ServicePersonDetailDrawer.tsx');
    const footer = drawer.slice(drawer.indexOf('{/* Panel Footer Actions */'));
    expect(footer.indexOf('<span>Delete</span>')).toBeLessThan(footer.indexOf('<span>{isInactive ? \'Activate\' : \'Deactivate\'}</span>'));
    expect(footer.indexOf('<span>{isInactive ? \'Activate\' : \'Deactivate\'}</span>')).toBeLessThan(footer.indexOf('<span>Edit Profile</span>'));

    const editButton = footer.slice(footer.indexOf('onClick={() => onEdit(person)}'), footer.indexOf('onClick={() => onEdit(person)}') + 300);
    expect(editButton).toContain('bg-primary');
    expect(editButton).toContain('text-on-primary');
  });

  it('does not present the removed Outlet activity section', () => {
    const drawer = read('features/outlets/components/OutletDetailDrawer.tsx');
    const types = read('features/outlets/types/index.ts');
    expect(drawer).not.toContain('Recent Outlet Activity');
    expect(drawer).not.toContain('recentActivity');
    expect(types).not.toContain('OutletActivity');
    expect(types).not.toContain('recentActivity');
  });

  it('keeps the Add Product form aligned to India-market catalogue choices', () => {
    const modal = read('features/products/components/AddProductModal.tsx');
    const page = read('features/products/pages/ProductsPage.tsx');
    const detail = read('features/products/components/ProductDetailDrawer.tsx');
    const productTypes = read('features/products/types/index.ts');

    expect(modal).not.toContain('Service Item');
    expect(modal).not.toContain('Punarva Studio');
    expect(modal).not.toContain('Supplier Part Code');
    expect(modal).not.toContain('supplierProductCode');
    expect(modal).not.toContain('($)');
    for (const rate of ['GST 0%', 'GST 5%', 'GST 12%', 'GST 18%', 'GST 28%']) {
      expect(modal).toContain(rate);
    }
    expect(modal).toContain('list="product-category-options"');
    expect(modal).toContain('list="product-subcategory-options"');
    expect(modal).toContain('list="product-brand-options"');
    expect(modal).toContain("type !== 'service' ? Number(reorderLevel)");
    expect(modal).toContain("suppliers.filter((supplier) => supplier.status === 'Active')");
    expect(read('features/products/components/EditProductModal.tsx')).toContain('list="edit-product-brand-options"');
    expect(read('features/products/components/EditProductModal.tsx')).toContain("errs.categoryName = 'Category is required'");
    expect(read('features/products/components/EditProductModal.tsx')).toContain("suppliers.filter((supplier) => supplier.status === 'Active')");
    expect(modal).toContain('activeSuppliers.map');
    expect(page).not.toContain('const subcategories = useMemo');
    expect(page).toContain('categoryOptions={categoryOptions}');
    expect(page).toContain('ManageProductTaxonomyModal');
    expect(page).toContain('productService.deleteCategory');
    expect(page).toContain('productService.deleteSubcategory');
    const taxonomyModal = read('features/products/components/ManageProductTaxonomyModal.tsx');
    expect(taxonomyModal).toContain("event.key === 'Escape'");
    expect(taxonomyModal).toContain("document.body.style.overflow = 'hidden'");
    expect(page).toContain('supplierService.getAllSuppliers()');
    expect(detail).not.toContain('Supplier SKU:');
    expect(detail).not.toContain('Recent Ledger Activity');
    expect(detail).not.toContain('recentActivity');
    expect(productTypes).not.toContain('ProductLedgerActivity');
    expect(productTypes).not.toContain('recentActivity');
  });

  it('keeps employee login setup username/password based and removes unsupported defaults', () => {
    const modal = read('features/employees/components/EmployeeModal.tsx');

    expect(modal).not.toContain('Email Address');
    expect(modal).not.toContain('Temporary secure activation link');
    expect(modal).not.toContain("setCity('Austin')");
    expect(modal).not.toContain("setState('Texas')");
    expect(modal).toContain('Initial Password');
    expect(modal).toContain('initialPassword');
    expect(modal).toContain('allowLogin');
    expect(modal).toContain('allowLogin,');
    expect(modal).toContain('<option value="User">User</option>');
    expect(modal).toContain('<option value="Admin">Admin</option>');
    expect(modal).not.toContain('Cashier / Standard POS');
    expect(read('features/employees/components/EmployeeDetailDrawer.tsx')).not.toContain('onToggleLoginAccess');
    expect(read('features/employees/components/EmployeeDetailDrawer.tsx')).not.toContain('>Email</span>');
    expect(read('features/employees/components/EmployeeDetailDrawer.tsx')).not.toContain('Enable Access');
    expect(read('features/employees/components/EmployeeDetailDrawer.tsx')).not.toContain('Disable Access');
    expect(read('features/employees/components/EmployeeDetailDrawer.tsx')).not.toContain('Terminal Override PIN');
    expect(read('features/employees/components/EmployeeDetailDrawer.tsx')).not.toContain('Last Active Session');
    expect(read('features/employees/components/EmployeeDetailDrawer.tsx')).not.toContain('Recent Activity Log');
    expect(read('features/employees/types/index.ts')).not.toContain('recentActivity');
    expect(read('features/employees/types/index.ts')).not.toContain('terminalPinConfigured');
    expect(read('features/employees/types/index.ts')).not.toContain('lastActiveSession');
  });

  it('keeps employee role fields editable with suggestions and outlet selection as a dropdown', () => {
    const modal = read('features/employees/components/EmployeeModal.tsx');

    expect(modal).not.toContain('employee-designation-options');
    expect(modal).not.toContain('employee-department-options');
    expect(modal).toContain('value={selectedOutlets[0] ?? \'\'}');
    expect(modal).not.toContain('handleOutletCheckboxToggle');
  });

  it('keeps employee dates, address, and notes in the approved form contract', () => {
    const modal = read('features/employees/components/EmployeeModal.tsx');
    const drawer = read('features/employees/components/EmployeeDetailDrawer.tsx');

    expect(modal).toContain('placeholder="DD/MM/YYYY"');
    expect(modal).toContain('parseEmployeeDate(dateOfBirth)');
    expect(modal).toContain('parseEmployeeDate(dateOfJoining)');
    expect(modal).toContain('value={address}');
    expect(modal).toContain('value={notes}');
    expect(modal).not.toContain('City');
    expect(modal).not.toContain('State / Province');
    expect(modal).not.toContain('Postal Code');
    expect(drawer).toContain('formatEmployeeDateForDisplay(employee.dateOfBirth)');
    expect(drawer).toContain('formatEmployeeDateForDisplay(employee.dateOfJoining)');
    expect(drawer).toContain('{employee.notes}');
  });
});
