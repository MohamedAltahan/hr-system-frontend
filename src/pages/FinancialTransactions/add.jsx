import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateFinancialTransactionMutation } from '../../api/financialTransactionsApi';
import { useGetAllEmployeeQuery } from '../../api/Employee';
import SectionBox from '../../components/ui/containers/SectionBox';
import AddingButton from '../../components/ui/buttons/AddingBtn';
import CancelButton from '../../components/ui/buttons/CancelBtn';
import TextInput from '../../components/reusable_components/TextInput';
import TextAreaInput from '../../components/reusable_components/TextAreaInput';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { t } from 'i18next';

const AddFinancialTransaction = () => {
  const [formData, setFormData] = useState({
    employee: null,
    transaction_name: '',
    transaction_type: null,
    amount: '',
    date: '',
    status: { value: 'pending', label: t('pending') },
    notes: '',
    is_outside_salary: { value: '0', label: t('inside_salary') },
  });

  const navigate = useNavigate();
  const [createTransaction, { isLoading }] = useCreateFinancialTransactionMutation();
  const { data: employeesData } = useGetAllEmployeeQuery({ page: 1 });

  const employeeOptions =
    employeesData?.body?.data?.map((emp) => ({
      value: emp.id,
      label: emp.name,
    })) || [];

  const statusOptions = [
    { value: 'pending', label: t('pending') },
    { value: 'accepted', label: t('accepted') },
    { value: 'rejected', label: t('rejected') },
  ];

  const transactionTypeOptions = [
    { value: 'increment', label: t('increment') },
    { value: 'decrement', label: t('decrement') },
  ];

  const outsideSalaryOptions = [
    { value: '1', label: t('outside_salary') },
    { value: '0', label: t('inside_salary') },
  ];

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
      const res = await createTransaction(formDataToUpload).unwrap();
      toast.success(res?.message || t('added_successfully'));
      navigate('/app/financial-transactions');
    } catch (error) {
      toast.error(error?.data?.message || t('something_went_wrong'));
    }
  };

  return (
    <SectionBox className="space-y-6">
      <h2 className="text-xl font-bold">{t('add_financial_transaction')}</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
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

        <div>
          <label className="block mb-2 text-gray-900 label-md">{t('status')}</label>
          <Select
            value={formData.status}
            onChange={(selected) => setFormData((prev) => ({ ...prev, status: selected }))}
            options={statusOptions}
            placeholder={t('choose_status')}
          />
        </div>

        <div>
          <label className="block mb-2 text-gray-900 label-md">{t('salary_type')}</label>
          <Select
            value={formData.is_outside_salary}
            onChange={(selected) => setFormData((prev) => ({ ...prev, is_outside_salary: selected }))}
            options={outsideSalaryOptions}
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
            {isLoading ? t('adding') : t('add')}
          </AddingButton>
          <CancelButton type="button" onClick={() => navigate('/app/financial-transactions')}>
            {t('cancel')}
          </CancelButton>
        </div>
      </form>
    </SectionBox>
  );
};

export default AddFinancialTransaction;
