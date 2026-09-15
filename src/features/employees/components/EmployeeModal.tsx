import React, { useState, useEffect } from 'react';
import {
  Employee,
  CreateEmployeeInput,
  UpdateEmployeeInput,
  AssignmentScope,
} from '../types';
import { formatEmployeeCode } from '../utils/formatEmployeeCode';
import { formatEmployeeDateForDisplay, parseEmployeeDate } from '../utils/date';

interface EmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitCreate: (input: CreateEmployeeInput) => Promise<void>;
  onSubmitUpdate: (id: string, input: UpdateEmployeeInput) => Promise<void>;
  employeeToEdit: Employee | null;
  availableOutlets: string[];
}

export function EmployeeModal({
  isOpen,
  onClose,
  onSubmitCreate,
  onSubmitUpdate,
  employeeToEdit,
  availableOutlets,
}: EmployeeModalProps) {
  // Form State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('Female');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [dateOfJoining, setDateOfJoining] = useState('');
  const [phone, setPhone] = useState('');
  const [designation, setDesignation] = useState('Sales Associate');
  const [department, setDepartment] = useState('Retail Operations & Sales');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  // Scope & Outlets
  const [assignmentScope, setAssignmentScope] = useState<AssignmentScope>('Specific Outlets');
  const [selectedOutlets, setSelectedOutlets] = useState<string[]>([]);

  // Application Login & Security
  const [allowLogin, setAllowLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [permissionProfile, setPermissionProfile] = useState('User');
  const [initialPassword, setInitialPassword] = useState('');

  // Validation & UI State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  const isEditing = Boolean(employeeToEdit);

  // Initialize or reset form
  useEffect(() => {
    if (!isOpen) {
      setErrors({});
      setShowSuccessNotification(false);
      return;
    }

    if (employeeToEdit) {
      setFirstName(employeeToEdit.firstName || '');
      setLastName(employeeToEdit.lastName || '');
      setGender(employeeToEdit.gender || 'Prefer not to say');
      setDateOfBirth(formatEmployeeDateForDisplay(employeeToEdit.dateOfBirth));
      setDateOfJoining(formatEmployeeDateForDisplay(employeeToEdit.dateOfJoining));
      setPhone(employeeToEdit.phone || '');
      setDesignation(employeeToEdit.designation || 'Sales Associate');
      setDepartment(employeeToEdit.department || 'Retail Operations & Sales');
      setAddress(employeeToEdit.address || '');
      setNotes(employeeToEdit.notes || '');
      setAssignmentScope(employeeToEdit.assignmentScope || 'Specific Outlets');
      setSelectedOutlets(employeeToEdit.outletAssignment || []);
      setAllowLogin(employeeToEdit.loginAccess === 'Enabled');
      setUsername(employeeToEdit.username || '');
      setPermissionProfile(employeeToEdit.permissionProfile || 'User');
      setInitialPassword('');
    } else {
      // Default new employee
      setFirstName('');
      setLastName('');
      setGender('Female');
      setDateOfBirth('');
      const today = new Date().toISOString().split('T')[0];
      setDateOfJoining(formatEmployeeDateForDisplay(today));
      setPhone('');
      setDesignation('Sales Associate');
      setDepartment('Retail Operations & Sales');
      setAddress('');
      setNotes('');
      setAssignmentScope('Specific Outlets');
      setSelectedOutlets(availableOutlets.length > 0 ? [availableOutlets[0]] : []);
      setAllowLogin(true);
      setUsername('');
      setPermissionProfile('User');
      setInitialPassword('');
    }
    setErrors({});
    setShowSuccessNotification(false);
  }, [isOpen, employeeToEdit, availableOutlets]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!firstName.trim()) errs.firstName = 'First name is required.';
    if (!lastName.trim()) errs.lastName = 'Last name is required.';
    if (!designation.trim()) errs.designation = 'Designation is required.';

    if (!phone.trim()) {
      errs.phone = 'Phone number is required.';
    } else if (phone.trim().length < 7) {
      errs.phone = 'Please enter a valid phone number.';
    }

    if (!parseEmployeeDate(dateOfJoining)) {
      errs.dateOfJoining = 'Date of joining is required.';
    }
    if (dateOfBirth.trim() && !parseEmployeeDate(dateOfBirth)) {
      errs.dateOfBirth = 'Use a valid date in DD/MM/YYYY format.';
    }

    if (!isEditing && allowLogin) {
      if (!username.trim()) errs.username = 'Username is required when login access is enabled.';
      if (initialPassword.length < 6) errs.initialPassword = 'Initial password must be at least 6 characters.';
    }

    if (assignmentScope === 'Specific Outlets' && selectedOutlets.length === 0) {
      errs.outlets = 'Please assign at least one outlet when scope is Specific Outlets.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsSubmitting(true);

      if (isEditing && employeeToEdit) {
        await onSubmitUpdate(employeeToEdit.id, {
          firstName,
          lastName,
          designation,
          department,
          phone,
          gender,
          dateOfBirth: parseEmployeeDate(dateOfBirth),
          dateOfJoining: parseEmployeeDate(dateOfJoining),
          address,
          notes,
          assignmentScope,
          outletAssignment: assignmentScope === 'Entire Organization' ? ['Organization-wide (All Outlets)'] : selectedOutlets,
          username: username.trim() || undefined,
          permissionProfile,
        });
      } else {
        await onSubmitCreate({
          firstName,
          lastName,
          designation,
          department,
          phone,
          gender,
          dateOfBirth: parseEmployeeDate(dateOfBirth),
          dateOfJoining: parseEmployeeDate(dateOfJoining),
          address,
          notes,
          assignmentScope,
          outletAssignment: assignmentScope === 'Entire Organization' ? ['Organization-wide (All Outlets)'] : selectedOutlets,
          allowLogin,
          username: username.trim() || undefined,
          permissionProfile,
          initialPassword: allowLogin ? initialPassword : undefined,
        });
      }

      setShowSuccessNotification(true);
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err) {
      console.error('Failed to save employee:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-xs flex items-center justify-center p-4 select-none">
      <div className="bg-surface-container-lowest w-full max-w-3xl rounded-lg shadow-xl border border-outline-variant/40 flex flex-col max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="px-space-xl py-space-base bg-surface-container-low border-b border-outline-variant/30 flex items-center justify-between shrink-0">
          <div>
            <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
              {isEditing && employeeToEdit ? `Edit Employee (${formatEmployeeCode(employeeToEdit.employeeCode)})` : 'Add New Employee'}
            </h2>
            <p className="font-caption text-caption text-on-surface-variant mt-0.5">
              Create personnel record, designate store assignment, and configure application access.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Success Alert Banner */}
        {showSuccessNotification && (
          <div className="mx-space-xl mt-space-base p-space-sm bg-emerald-50 border border-emerald-200 rounded text-emerald-800 text-caption flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-emerald-600">check_circle</span>
            <span>
              {isEditing
                ? 'Employee record successfully updated!'
                : 'Employee record successfully created! Access credentials have been dispatched.'}
            </span>
          </div>
        )}

        {/* Validation summary */}
        {Object.keys(errors).length > 0 && (
          <div className="mx-space-xl mt-space-base p-space-sm bg-error-container/20 border border-error/30 rounded text-on-error-container text-caption flex items-start gap-2">
            <span className="material-symbols-outlined text-[16px] text-error mt-0.5">warning</span>
            <div>
              <span className="font-semibold block">Please correct the highlighted fields:</span>
              <ul className="list-disc list-inside mt-0.5 space-y-0.5 text-error">
                {Object.values(errors).map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Modal Form Body (Scrollable) */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-space-xl space-y-space-2xl">
          {/* Section 1: Employee Information */}
          <div className="space-y-space-base">
            <div className="flex items-center gap-2 border-b border-outline-variant/20 pb-2">
              <span className="material-symbols-outlined text-[18px] text-primary">badge</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                1. Employee Information
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-base">
              {isEditing && employeeToEdit && (
                <div>
                  <label className="block font-caption text-caption text-on-surface-variant mb-1 font-medium">
                    Employee Code
                  </label>
                  <input
                    type="text"
                    disabled
                    value={formatEmployeeCode(employeeToEdit.employeeCode)}
                    className="w-full h-9 px-3 rounded bg-surface-container border border-outline-variant/30 font-body-mono-num text-caption text-on-surface-variant cursor-not-allowed"
                  />
                </div>
              )}

              <div>
                <label className="block font-caption text-caption text-on-surface mb-1 font-medium">
                  First Name <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="e.g. Rachel"
                  className={`w-full h-9 px-3 rounded bg-surface-container-lowest border font-body-default text-body-default text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary ${
                    errors.firstName ? 'border-error ring-1 ring-error' : 'border-outline-variant/40'
                  }`}
                />
              </div>

              <div>
                <label className="block font-caption text-caption text-on-surface mb-1 font-medium">
                  Last Name <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="e.g. Green"
                  className={`w-full h-9 px-3 rounded bg-surface-container-lowest border font-body-default text-body-default text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary ${
                    errors.lastName ? 'border-error ring-1 ring-error' : 'border-outline-variant/40'
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-base">
              <div>
                <label className="block font-caption text-caption text-on-surface mb-1 font-medium">
                  Gender
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full h-9 px-3 rounded bg-surface-container-lowest border border-outline-variant/40 font-caption text-caption text-on-surface focus:outline-none focus:border-primary cursor-pointer"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Non-binary / Other">Non-binary / Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              <div>
                <label className="block font-caption text-caption text-on-surface mb-1 font-medium">
                  Date of Birth
                </label>
                <input
                  type="text"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  placeholder="DD/MM/YYYY"
                  inputMode="numeric"
                  maxLength={10}
                  className={`w-full h-9 px-3 rounded bg-surface-container-lowest border font-body-default text-body-default text-on-surface focus:outline-none focus:border-primary ${errors.dateOfBirth ? 'border-error ring-1 ring-error' : 'border-outline-variant/40'}`}
                />
                {errors.dateOfBirth && <p className="text-[11px] text-error mt-0.5">{errors.dateOfBirth}</p>}
              </div>

              <div>
                <label className="block font-caption text-caption text-on-surface mb-1 font-medium">
                  Date of Joining <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  value={dateOfJoining}
                  onChange={(e) => setDateOfJoining(e.target.value)}
                  placeholder="DD/MM/YYYY"
                  inputMode="numeric"
                  maxLength={10}
                  className={`w-full h-9 px-3 rounded bg-surface-container-lowest border font-body-default text-body-default text-on-surface focus:outline-none focus:border-primary ${
                    errors.dateOfJoining ? 'border-error ring-1 ring-error' : 'border-outline-variant/40'
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-base">
              <div>
                <label className="block font-caption text-caption text-on-surface mb-1 font-medium">
                  Phone Number <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className={`w-full h-9 px-3 rounded bg-surface-container-lowest border font-body-default text-body-default text-on-surface focus:outline-none focus:border-primary ${
                    errors.phone ? 'border-error ring-1 ring-error' : 'border-outline-variant/40'
                  }`}
                />
              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-base">
              <div>
                <label className="block font-caption text-caption text-on-surface mb-1 font-medium">
                  Designation <span className="text-error">*</span>
                </label>
                <input
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  className={`w-full h-9 px-3 rounded bg-surface-container-lowest border font-body-default text-body-default text-on-surface focus:outline-none focus:border-primary ${
                    errors.designation ? 'border-error ring-1 ring-error' : 'border-outline-variant/40'
                  }`}
                />
              </div>

              <div>
                <label className="block font-caption text-caption text-on-surface mb-1 font-medium">
                  Department
                </label>
                <input
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full h-9 px-3 rounded bg-surface-container-lowest border border-outline-variant/40 font-body-default text-body-default text-on-surface focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block font-caption text-caption text-on-surface mb-1 font-medium">
                Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="104 Fashion Avenue, Suite 3B"
                className="w-full h-9 px-3 rounded bg-surface-container-lowest border border-outline-variant/40 font-body-default text-body-default text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block font-caption text-caption text-on-surface mb-1 font-medium">
                Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any relevant employee notes"
                rows={3}
                className="w-full px-3 py-2 rounded bg-surface-container-lowest border border-outline-variant/40 font-body-default text-body-default text-on-surface focus:outline-none focus:border-primary resize-y"
              />
            </div>
          </div>

          {/* Section 2: Organization and Outlet Access */}
          <div className="space-y-space-base">
            <div className="flex items-center gap-2 border-b border-outline-variant/20 pb-2">
              <span className="material-symbols-outlined text-[18px] text-primary">storefront</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                2. Organization and Outlet Access
              </h3>
            </div>

            <div className="space-y-space-sm">
              <label className="block font-caption text-caption text-on-surface mb-1 font-medium">
                Assignment Scope
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-base">
                <label
                  className={`flex items-center gap-2 p-3 rounded border cursor-pointer transition-all ${
                    assignmentScope === 'Specific Outlets'
                      ? 'border-primary bg-primary-container/5 ring-1 ring-primary'
                      : 'border-outline-variant/40 bg-surface-container-lowest hover:bg-surface-container-low'
                  }`}
                >
                  <input
                    type="radio"
                    name="scope"
                    checked={assignmentScope === 'Specific Outlets'}
                    onChange={() => setAssignmentScope('Specific Outlets')}
                    className="text-primary focus:ring-primary"
                  />
                  <div>
                    <span className="font-body-medium text-body-medium font-semibold block text-on-surface">
                      Specific Outlet(s)
                    </span>
                    <span className="font-caption text-caption text-on-surface-variant">
                      Employee operates within assigned store branches
                    </span>
                  </div>
                </label>

                <label
                  className={`flex items-center gap-2 p-3 rounded border cursor-pointer transition-all ${
                    assignmentScope === 'Entire Organization'
                      ? 'border-primary bg-primary-container/5 ring-1 ring-primary'
                      : 'border-outline-variant/40 bg-surface-container-lowest hover:bg-surface-container-low'
                  }`}
                >
                  <input
                    type="radio"
                    name="scope"
                    checked={assignmentScope === 'Entire Organization'}
                    onChange={() => setAssignmentScope('Entire Organization')}
                    className="text-primary focus:ring-primary"
                  />
                  <div>
                    <span className="font-body-medium text-body-medium font-semibold block text-on-surface">
                      Entire Organization
                    </span>
                    <span className="font-caption text-caption text-on-surface-variant">
                      Global access across all current and future outlets
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {assignmentScope === 'Specific Outlets' && (
              <div>
                <label className="block font-caption text-caption text-on-surface mb-1 font-medium">
                  Select Outlet <span className="text-error">*</span>
                </label>
                <select
                  value={selectedOutlets[0] ?? ''}
                  onChange={(e) => setSelectedOutlets(e.target.value ? [e.target.value] : [])}
                  className={`w-full h-9 px-3 rounded bg-surface-container-lowest border font-caption text-caption text-on-surface focus:outline-none focus:border-primary cursor-pointer ${
                    errors.outlets ? 'border-error ring-1 ring-error' : 'border-outline-variant/40'
                  }`}
                >
                  <option value="">Select an outlet</option>
                  {availableOutlets.map((outletName) => <option key={outletName} value={outletName}>{outletName}</option>)}
                </select>
                {errors.outlets && (
                  <p className="text-xs text-error mt-1">{errors.outlets}</p>
                )}
              </div>
            )}
          </div>

          {/* Section 3: Application Login */}
          {!isEditing && (
            <div className="space-y-space-base">
              <div className="flex items-center gap-2 border-b border-outline-variant/20 pb-2">
                <span className="material-symbols-outlined text-[18px] text-primary">security</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  3. Application Login &amp; Security
                </h3>
              </div>

              <div className="p-space-base rounded bg-surface-container-low border border-outline-variant/30 flex items-center justify-between">
                <div>
                  <span className="font-body-medium text-body-medium font-semibold block text-on-surface">
                    Allow this employee to log in to the application
                  </span>
                  <span className="font-caption text-caption text-on-surface-variant">
                    Grants POS terminal and back-office dashboard access credentials.
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={allowLogin}
                    onChange={(e) => setAllowLogin(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-outline-variant/50 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-outline-variant after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                </label>
              </div>

              <div
                className={`space-y-space-base transition-all ${
                  allowLogin ? '' : 'opacity-40 pointer-events-none'
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-base">
                  <div>
                    <label className="block font-caption text-caption text-on-surface mb-1 font-medium">
                      Username / Terminal ID
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder={
                        firstName && lastName
                          ? `${firstName.toLowerCase()}.${lastName.toLowerCase()}`
                          : 'rachel.green'
                      }
                      className="w-full h-9 px-3 rounded bg-surface-container-lowest border border-outline-variant/40 font-body-default text-body-default text-on-surface focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block font-caption text-caption text-on-surface mb-1 font-medium">
                      Initial Password <span className="text-error">*</span>
                    </label>
                    <input
                      type="password"
                      value={initialPassword}
                      onChange={(e) => setInitialPassword(e.target.value)}
                      placeholder="At least 6 characters"
                      autoComplete="new-password"
                      className={`w-full h-9 px-3 rounded bg-surface-container-lowest border font-body-default text-body-default text-on-surface focus:outline-none focus:border-primary ${
                        errors.initialPassword ? 'border-error ring-1 ring-error' : 'border-outline-variant/40'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block font-caption text-caption text-on-surface mb-1 font-medium">
                      Login Role / Permission Profile
                    </label>
                    <select
                      value={permissionProfile}
                      onChange={(e) => setPermissionProfile(e.target.value)}
                      className="w-full h-9 px-3 rounded bg-surface-container-lowest border border-outline-variant/40 font-caption text-caption text-on-surface focus:outline-none focus:border-primary cursor-pointer"
                    >
                      <option value="User">User</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Modal Footer (Inside Form) */}
          <div className="px-space-xl py-space-base -mx-space-xl -mb-space-xl bg-surface-container-low border-t border-outline-variant/30 flex items-center justify-end gap-space-sm shrink-0">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="h-9 px-space-lg rounded border border-outline-variant/40 bg-surface-container-lowest hover:bg-surface-container font-body-medium text-body-medium text-on-surface transition-colors cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="h-9 px-space-xl rounded bg-primary hover:bg-primary-container text-on-primary font-body-medium text-body-medium font-semibold shadow-xs transition-all flex items-center gap-1 cursor-pointer disabled:opacity-50"
            >
              <span>
                {isSubmitting
                  ? 'Saving...'
                  : isEditing
                  ? 'Save Changes'
                  : 'Create Employee'}
              </span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
