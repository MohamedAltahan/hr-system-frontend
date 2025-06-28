import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';

import {
  useGetOvertimeByIdQuery,
  useUpdateOvertimeMutation,
} from '../../../api/overtimeApi';
import { useGetAllEmployeeQuery } from '../../../api/Employee';
import SectionBox from '../../../components/ui/containers/SectionBox';
import AddingButton from '../../../components/ui/buttons/AddingBtn';
import CancelButton from '../../../components/ui/buttons/CancelBtn';
import TextInput from '../../../components/reusable_components/TextInput';
import TextAreaInput from '../../../components/reusable_components/TextAreaInput';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { t } from 'i18next';

const EditOvertime = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: overtimeData, isLoading: isFetching } = useGetOvertimeByIdQuery(Number(id));
  const [updateOvertime, { isLoading }] = useUpdateOvertimeMutation();
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

  const [formData, setFormData] = useState({
    employee: null,
    status: null,
    reason: '',
    duration_in_hours: '',
    amount: '',
  });

 useEffect(() => {
  if (overtimeData?.body) {
    const {
      empoloyee,
      status,
      reason,
      duration_in_hours,
      amount
    } = overtimeData.body;

    setFormData({
      employee: {
        value: empoloyee?.id,
        label: empoloyee?.name,
      },
      status: statusOptions.find((s) => s.value === status),
      reason: reason || '',
      duration_in_hours: duration_in_hours || '',
      amount: amount || '',
    });
  }
}, [overtimeData, employeeOptions]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.employee || !formData.status) {
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
      const res = await updateOvertime({
        id: Number(id),
        formData: formDataToUpload,
      }).unwrap();

      toast.success(res?.message || t('updated_successfully'));
      navigate('/app/overtime');
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
      <h2 className="text-xl font-bold">{t('edit_overtime')}</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {/* Employee Dropdown */}
        <div>
          <label className="block mb-2 text-gray-900 label-md">{t('employee')}</label>
          <Select
            value={formData.employee}
            onChange={(selected) =>
              setFormData((prev) => ({ ...prev, employee: selected }))
            }
            options={employeeOptions}
            placeholder={t('choose_employee')}
          />
        </div>

        {/* Status Dropdown */}
        <div>
          <label className="block mb-2 text-gray-900 label-md">{t('status')}</label>
          <Select
            value={formData.status}
            onChange={(selected) =>
              setFormData((prev) => ({ ...prev, status: selected }))
            }
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
            {isLoading ? t('updating') : t('update')}
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

export default EditOvertime;
