import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetEmployeeRequestByIdQuery } from '../../api/EmployeeRequestsApi';
import SectionBox from '../../components/ui/containers/SectionBox';
import CancelButton from '../../components/ui/buttons/CancelBtn';
import { LuPencil } from 'react-icons/lu';
import { useTranslation } from 'react-i18next';

const ShowEmployeeRequest = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useGetEmployeeRequestByIdQuery(Number(id));

  if (isLoading) {
    return (
      <SectionBox className="space-y-6">
        <p>{t('loading')}</p>
      </SectionBox>
    );
  }

  if (isError) {
    return <p>{t('something_went_wrong')} : {error?.data?.message || 'تعذر تحميل البيانات'}</p>;
  }

  const request = data?.body;
  if (!request) return <p>{t('not_found') || 'لا توجد بيانات'}</p>;

  return (
    <SectionBox className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <h2 className="text-base font-bold">{t('show_employee_request')}</h2>
          <button className="EditPermissionBtn">
            <CancelButton onClick={() => navigate(`/app/employee-requests/edit/${id}`)}>
              <LuPencil /> {t('edit')}
            </CancelButton>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2 pb-2" style={{ fontSize: '14px' }}>
          <div className="flex items-center px-4 py-2">
            <span className="font-semibold text-gray-600 w-28">{t('employee_name')}:</span>
            <p className="text-gray-900">{request?.employee?.name || '-'}</p>
          </div>

       <div className="flex items-center px-4 py-2">
  <span className="font-semibold text-gray-600 w-28">{t('request_type')}:</span>
  <p className="text-gray-900">{Object.values(request?.type || {})[0] || '-'}</p>
</div>

{Object.keys(request?.type || {})[0] === 'leave' && (
  <div className="flex items-center px-4 py-2">
    <span className="font-semibold text-gray-600 w-28">{t('leave_type')}:</span>
    <p className="text-gray-900">
      {Object.values(request?.leave_type || {})[0] || '-'}
    </p>
  </div>
)}

{['late_arrival', 'early_departure'].includes(Object.keys(request?.type || {})[0]) && (
  <div className="flex items-center px-4 py-2">
    <span className="font-semibold text-gray-600 w-28">{t('time')}:</span>
    <p className="text-gray-900">{request?.time?.time_12hr || request?.time?.time_24hr || '-'}</p>
  </div>
)}



          <div className="flex items-center px-4 py-2">
            <span className="font-semibold text-gray-600 w-28">{t('from_date')}:</span>
            <p className="text-gray-900">{request?.from_date?.date || '-'}</p>
          </div>

          <div className="flex items-center px-4 py-2">
            <span className="font-semibold text-gray-600 w-28">{t('to_date')}:</span>
            <p className="text-gray-900">{request?.to_date?.date || '-'}</p>
          </div>

          {request?.loan_amount && (
            <div className="flex items-center px-4 py-2">
              <span className="font-semibold text-gray-600 w-28">{t('loan_amount')}:</span>
              <p className="text-gray-900">{request?.loan_amount}</p>
            </div>
          )}

          <div className="flex items-center px-4 py-2 col-span-2">
            <span className="font-semibold text-gray-600 w-28">{t('reason')}:</span>
            <p className="text-gray-900">{request?.reason || '-'}</p>
          </div>

          <div className="flex items-center px-4 py-2">
            <span className="font-semibold text-gray-600 w-28">{t('status')}:</span>
            <p className="text-gray-900">{t(request?.status) || '-'}</p>
          </div>

          <div className="flex items-center px-4 py-2">
            <span className="font-semibold text-gray-600 w-28">{t('reviewer')}:</span>
            <p className="text-gray-900">{request?.reviewed_by?.name || '-'}</p>
          </div>

          {request?.manager_comment && (
            <div className="flex items-center px-4 py-2 col-span-2">
              <span className="font-semibold text-gray-600 w-28">{t('manager_comment')}:</span>
              <p className="text-gray-900">{request?.manager_comment}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <CancelButton onClick={() => navigate('/app/employee-requests')} type="button">
          {t('back')}
        </CancelButton>
      </div>
    </SectionBox>
  );
};

export default ShowEmployeeRequest;
