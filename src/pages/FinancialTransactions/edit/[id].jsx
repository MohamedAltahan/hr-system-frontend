import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { t } from 'i18next';
import Select from 'react-select';

import {
  useGetFinancialTransactionByIdQuery,
  useUpdateFinancialTransactionMutation,
} from '../../../api/financialTransactionsApi';
import { useGetAllEmployeeQuery } from '../../../api/Employee';

import SectionBox from '../../../components/ui/containers/SectionBox';
import AddingButton from '../../../components/ui/buttons/AddingBtn';
import CancelButton from '../../../components/ui/buttons/CancelBtn';
import TextInput from '../../../components/reusable_components/TextInput';
import TextAreaInput from '../../../components/reusable_components/TextAreaInput';

const EditFinancialTransaction = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: transactionData, isLoading: isFetching } = useGetFinancialTransactionByIdQuery(Number(id));
  const [updateTransaction, { isLoading }] = useUpdateFinancialTransactionMutation();
  const { data: employeesData } = useGetAllEmployeeQuery({ page: 1 });

  const employeeOptions = useMemo(() => {
    return (
      employeesData?.body?.data?.map((emp) => ({
        value: emp.id,
        label: emp.name,
      })) || []
    );
  }, [employeesData]);

  const statusOptions = [
    { value: 'pending', label: t('pending') },
    { value: 'accepted', label: t('approved') },
    { value: 'rejected', label: t('rejected') },
  ];

  const transactionTypeOptions = [
    { value: 'increment', label: t('increment') },
    { value: 'deduction', label: t('deduction') },
  ];

  const salaryTypeOptions = [
    { value: '0', label: t('inside_salary') },
    { value: '1', label: t('outside_salary') },
  ];

  const [formData, setFormData] = useState({
    employee: null,
    transaction_name: '',
    transaction_type: null,
    amount: '',
    date: '',
    status: null,
    notes: '',
    is_outside_salary: null,
  });

  useEffect(() => {
    if (transactionData?.body) {
      const {
        empoloyee,
        transaction_name,
        transaction_type,
        amount,
        date,
        status,
        notes,
        is_outside_salary,
      } = transactionData.body;

      setFormData({
        employee: { value: empoloyee?.id, label: empoloyee?.name },
        transaction_name: transaction_name || '',
        transaction_type: transactionTypeOptions.find((opt) => opt.value === transaction_type),
        amount: amount || '',
        date: date?.date || '',
        status: statusOptions.find((opt) => opt.value === status),
        notes: notes || '',
        is_outside_salary: salaryTypeOptions.find((opt) => opt.value === String(is_outside_salary)),
      });
    }
  }, [transactionData, employeeOptions]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.employee ||
      !formData.transaction_name ||
      !formData.transaction_type ||
      !formData.amount ||
      !formData.date ||
      !formData.status
    ) {
      toast.error(t('all_fields_required'));
      return;
    }

    const formDataToUpload = new FormData();
    formDataToUpload.append('employee_id', formData.employee.value);
    formDataToUpload.append('transaction_name', formData.transaction_name);
    formDataToUpload.append('transaction_type', formData.transaction_type.value);
    formDataToUpload.append('amount', formData.amount);
    formDataToUpload.append('date', formData.date);
    formDataToUpload.append('status', formData.status.value);
    formDataToUpload.append('notes', formData.notes);
    formDataToUpload.append('is_outside_salary', formData.is_outside_salary.value);

    try {
      const res = await updateTransaction({ id: Number(id), formData: formDataToUpload }).unwrap();
      toast.success(res?.message || t('updated_successfully'));
      navigate('/app/financial-transactions');
    } catch (error) {
      toast.error(error?.data?.message || t('something_went_wrong'));
    }
  };

  if (isFetching) {
    return (
      <SectionBox className="space-y-6">
        <p>{t('loading')}</p>
      </SectionBox>
    );
  }

  return (
    <SectionBox className="space-y-6">
      <h2 className="text-xl font-bold">{t('edit_financial_transaction')}</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {/* Employee Dropdown */}
        <div>
          <label className="block mb-2 text-gray-900 label-md">{t('employee')}</label>
          <Select
            value={formData.employee}
            onChange={(selected) => setFormData((prev) => ({ ...prev, employee: selected }))}
            options={employeeOptions}
            placeholder={t('choose_employee')}
          />
        </div>

        <TextInput
          label={t('transaction_name')}
          name="transaction_name"
          value={formData.transaction_name}
          onChange={handleInputChange}
        />

        {/* Type Dropdown */}
        <div>
          <label className="block mb-2 text-gray-900 label-md">{t('transaction_type')}</label>
          <Select
            value={formData.transaction_type}
            onChange={(selected) => setFormData((prev) => ({ ...prev, transaction_type: selected }))}
            options={transactionTypeOptions}
            placeholder={t('choose_type')}
          />
        </div>

        <TextInput
          label={t('amount')}
          name="amount"
          value={formData.amount}
          onChange={handleInputChange}
          type="number"
        />

        <TextInput
          label={t('date')}
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          type="date"
        />

        {/* Status Dropdown */}
        <div>
          <label className="block mb-2 text-gray-900 label-md">{t('status')}</label>
          <Select
            value={formData.status}
            onChange={(selected) => setFormData((prev) => ({ ...prev, status: selected }))}
            options={statusOptions}
            placeholder={t('choose_status')}
          />
        </div>

        {/* Salary Type Dropdown */}
        <div>
          <label className="block mb-2 text-gray-900 label-md">{t('salary_type')}</label>
          <Select
            value={formData.is_outside_salary}
            onChange={(selected) =>
              setFormData((prev) => ({ ...prev, is_outside_salary: selected }))
            }
            options={salaryTypeOptions}
            placeholder={t('choose_salary_type')}
          />
        </div>

        <div className="col-span-2">
          <TextAreaInput
            label={t('notes')}
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
          />
        </div>

        <div className="col-span-2 flex justify-end gap-5">
          <AddingButton type="submit" variant="main" disabled={isLoading}>
            {isLoading ? t('updating') : t('update')}
          </AddingButton>
          <CancelButton type="button" onClick={() => navigate('/app/financial-transactions')}>
            {t('cancel')}
          </CancelButton>
        </div>
      </form>
    </SectionBox>
  );
};

export default EditFinancialTransaction;
