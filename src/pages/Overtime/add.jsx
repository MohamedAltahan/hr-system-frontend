import React, { useState } from 'react';
import { useCreateOvertimeMutation } from '../../api/overtimeApi';
import SectionBox from '../../components/ui/containers/SectionBox';
import AddingButton from '../../components/ui/buttons/AddingBtn';
import TextInput from '../../components/reusable_components/TextInput';
import TextAreaInput from '../../components/reusable_components/TextAreaInput';
import CancelButton from '../../components/ui/buttons/CancelBtn';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';
import Select from 'react-select';
import { useGetAllEmployeeQuery } from '../../api/Employee';

const AddOvertime = () => {
  const [formData, setFormData] = useState({
    employee: null,
    status: { value: 'pending', label: t('pending') },
    reason: '',
    duration_in_hours: '',
    amount: '',
  });

  const navigate = useNavigate();
  const [addOvertime, { isLoading }] = useCreateOvertimeMutation();

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.employee || !formData.status || !formData.reason || !formData.duration_in_hours || !formData.amount) {
      toast.error(t('all_fields_required'));
      return;
    }

    const formDataToUpload = new FormData();
    formDataToUpload.append('employee_id', formData.employee.value);
    formDataToUpload.append('status', formData.status.value);
    formDataToUpload.append('reason', formData.reason);
    formDataToUpload.append('duration_in_hours', formData.duration_in_hours);
    formDataToUpload.append('amount', formData.amount);

    try {
      const res = await addOvertime(formDataToUpload).unwrap();
      toast.success(res?.message || t('added_successfully'));
      navigate('/app/overtime');
    } catch (error) {
      toast.error(error?.data?.message || t('something_went_wrong'));
    }
  };

  return (
    <SectionBox className="space-y-6">
      <h2 className="text-xl font-bold">{t('add_new_overtime')}</h2>
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

        <div>
          <label className="block mb-2 text-gray-900 label-md">{t('status')}</label>
          <Select
            value={formData.status}
            onChange={(selected) => setFormData((prev) => ({ ...prev, status: selected }))}
            options={statusOptions}
            placeholder={t('choose_status')}
          />
        </div>

        <TextInput
          label={t('duration_in_hours')}
          name="duration_in_hours"
          value={formData.duration_in_hours}
          onChange={handleInputChange}
        />

        <TextInput
          label={t('amount')}
          name="amount"
          value={formData.amount}
          onChange={handleInputChange}
        />

        <div className="col-span-2">
          <TextAreaInput
            label={t('reason')}
            name="reason"
            value={formData.reason}
            onChange={handleInputChange}
          />
        </div>

        <div className="col-span-2 flex justify-end gap-5">
          <AddingButton type="submit" variant="main" disabled={isLoading}>
            {isLoading ? t('adding') : t('add')}
          </AddingButton>
          <CancelButton type="button" onClick={() => navigate('/app/overtime')}>
            {t('cancel')}
          </CancelButton>
        </div>
      </form>
    </SectionBox>
  );
};

export default AddOvertime;
