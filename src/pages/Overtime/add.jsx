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

const AddOvertime = () => {
  const [formData, setFormData] = useState({
    employee_id: '',
    status: 'pending',
    reason: '',
    duration_in_hours: '',
    amount: '',
  });

  const navigate = useNavigate();
  const [addOvertime, { isLoading }] = useCreateOvertimeMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToUpload = new FormData();
    formDataToUpload.append('employee_id', formData.employee_id);
    formDataToUpload.append('status', formData.status);
    formDataToUpload.append('reason', formData.reason);
    formDataToUpload.append('duration_in_hours', formData.duration_in_hours);
    formDataToUpload.append('amount', formData.amount);

    try {
      const res = await addOvertime(formDataToUpload).unwrap();
      toast.success(res?.message || 'Overtime added successfully');
      navigate('/app/overtime');
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to add overtime');
    }
  };

  return (
    <SectionBox className="space-y-6">
      <h2 className="text-xl font-bold">{t('add_new_overtime')}</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <TextInput
          label={t('employee_id')}
          name="employee_id"
          value={formData.employee_id}
          onChange={handleChange}
        />

        <Select
          label={t('status')}
          name="status"
          value={formData.status}
          onChange={handleChange}
          options={[
            { value: 'pending', label: t('pending') },
            { value: 'accepted', label: t('accepted') },
            { value: 'rejected', label: t('rejected') },
          ]}
        />

        <TextInput
          label={t('duration_in_hours')}
          name="duration_in_hours"
          value={formData.duration_in_hours}
          onChange={handleChange}
        />

        <TextInput
          label={t('amount')}
          name="amount"
          value={formData.amount}
          onChange={handleChange}
        />

        <TextAreaInput
          label={t('reason')}
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          rows={4}
          className="col-span-2"
        />

        <div className="col-span-2 flex justify-end gap-5">
          <AddingButton type="submit" variant="main" disabled={isLoading}>
            {isLoading ? t('adding') : t('add_overtime')}
          </AddingButton>

          <CancelButton
            variant="primary"
            type="button"
            onClick={() => navigate('/app/overtime')}
          >
            {t('cancel')}
          </CancelButton>
        </div>
      </form>
    </SectionBox>
  );
};

export default AddOvertime;
