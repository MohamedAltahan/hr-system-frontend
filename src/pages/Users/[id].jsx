import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetEmployeeByIdQuery, useGetAllEmployeeQuery } from '../../api/Employee';
import SectionBox from '../../components/ui/containers/SectionBox';
import CancelButton from '../../components/ui/buttons/CancelBtn';
import { LuPencil } from 'react-icons/lu';
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';


const genderOptions = { male: t('male'), female: t('female') };
const socialStatusOptions = { single: t('single'), married: t('married') };
const statusOptions = { 1: t('active'), 0: t('inactive') };

const ShowEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useGetEmployeeByIdQuery(Number(id));
  const { data: employeeListData } = useGetAllEmployeeQuery({ id: 0 });

  if (isLoading) {
    return (
      <SectionBox>
        <p className="text-center text-gray-600">  {t('loading')} </p>
      </SectionBox>
    );
  }

  if (isError) {
    return (
      <SectionBox>
        <p className="text-center text-red-600">
          حدث خطأ: {error?.data?.message || 'تعذر تحميل البيانات'}
        </p>
      </SectionBox>
    );
  }

  const employee = data?.body;
  if (!employee) return <SectionBox><p> {t('not_found')} </p></SectionBox>;

  const managerName =
    employeeListData?.body?.data?.find(m => m.id === employee?.direct_manager?.id)?.name || '-';

  const renderField = (label, value) => (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-0 p-2">
      <span className="font-medium text-gray-500 w-40">{label}:</span>
      <span className="text-gray-900">{value || '-'}</span>
    </div>
  );

  return (
    <SectionBox className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4">
        <h2 className="text-xl font-bold text-gray-800"> {t('show_employee')} </h2>
      <button className='EditPermissionBtn'><CancelButton   onClick={() => navigate(`/app/users/edit/${id}` )}> <LuPencil /> {t('edit')}
      </CancelButton></button>
      </div>

      {/* Card */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        {/* Optional profile photo */}
        {employee?.photo && (
          <div className="p-4 flex justify-center">
            <img
              src={employee.photo}
              alt={t('image')}
              className="w-32 h-32 rounded-full border object-cover"
            />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-4">
          {/* Personal Information */}
          <div className="col-span-full mb-2 font-semibold text-gray-700"> {t('personal_data')} </div>
          {renderField(t('name'), employee?.translations?.name?.ar)}
          {renderField(t('username'), employee?.username)}
          {renderField(t('email'), employee?.email)}
          {renderField(t('phone'), employee?.phone)}
          {renderField(t('address'), employee?.translations?.address?.ar)}
          {renderField(t('national_number') , employee?.national_id)}
          {renderField(t('date_of_birth'), employee?.birthday)}
          {renderField(t('gender'), genderOptions[employee?.gender])}
          {renderField(t('social_status'), socialStatusOptions[employee?.social_status])}
<hr className="col-span-full border-t border-gray-300 my-4" />

          {/* Work Info */}

          <div className="col-span-full mt-4 mb-2 font-semibold text-gray-700">{t('job_data')} </div>
          {renderField(t('hire_date'), (employee?.hire_date))}
          {renderField(t('direct_manager'), managerName)}
          {renderField(t('branch'), employee?.branch?.name)}
          {renderField(t('department'), employee?.department_name?.name)}
          {renderField(t('job_position'), employee?.position?.name)}
          {renderField(t('job_title'), employee?.job_title?.name)}
          {renderField(t('status'), statusOptions[employee?.is_active])}
        </div>
      </div>

      {/* Back Button */}
      <div className="flex justify-end">
        <CancelButton type="button" onClick={() => navigate('/app/users')}>{t('back')}</CancelButton>
      </div>
    </SectionBox>
  );
};

export default ShowEmployee;
