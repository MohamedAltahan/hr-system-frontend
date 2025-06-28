import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LuPencil } from 'react-icons/lu';
import { toast } from 'react-toastify';

import {
  useGetAttendanceDepartmentRequestByIdQuery,
} from '../../api/AttendanceDepartmentRequestsApi';

import SectionBox from '../../components/ui/containers/SectionBox';
import CancelButton from '../../components/ui/buttons/CancelBtn';

const ShowAttendanceDepartmentRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data, isLoading, isError, error } = useGetAttendanceDepartmentRequestByIdQuery(id);

  if (isLoading) {
    return (
      <SectionBox className="space-y-6">
        <p>{t('loading')}</p>
      </SectionBox>
    );
  }

  if (isError) {
    return (
      <SectionBox className="space-y-6">
        <p>
          {t('something_went_wrong')}: {error?.data?.message || 'تعذر تحميل البيانات'}
        </p>
      </SectionBox>
    );
  }

  const request = data?.body;

  if (!request) {
    return (
      <SectionBox className="space-y-6">
        <p>{t('not_found') || 'لا توجد بيانات'}</p>
      </SectionBox>
    );
  }
  const StatusChip = ({ status }) => {
  const { t } = useTranslation();

  const statusMap = {
    pending: {
      label: t("status_pending"),
      className: "bg-yellow-100 text-yellow-800",
    },
    approved: {
      label: t("status_approved"),
      className: "bg-green-100 text-green-800",
    },
    rejected: {
      label: t("status_rejected"),
      className: "bg-red-100 text-red-800",
    },
  };

  const { label, className } = statusMap[status] || {
    label: status,
    className: "bg-gray-100 text-gray-800",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${className}`}
    >
      {label}
    </span>
  );
};


  return (
    <SectionBox className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <h2 className="text-base font-bold">{t('attendance_department_request')}</h2>
          {/* <button className="EditPermissionBtn">
            <CancelButton onClick={() => navigate(`/app/attendance-departure-requests/edit/${id}`)} type="button">
              <LuPencil /> {t('edit')}
            </CancelButton>
          </button> */}
        </div>

        <div className="grid grid-cols-2 gap-2 pb-3">
          {/* Employee */}
          <div className="flex items-center px-4 py-2" style={{ fontSize: '14px' }}>
            <span className="font-semibold text-gray-600 w-28">{t('employee_name')}:</span>
            <p className="text-gray-900">{request?.employee?.name || '-'}</p>
          </div>
    {/* Type */}
         {/* Request Type */}
<div className="flex items-center px-4 py-2" style={{ fontSize: '14px' }}>
  <span className="font-semibold text-gray-600 w-28">{t('request_type')}:</span>
  <p className="text-gray-900">
    {Object.values(request?.type || {})[0] || '-'}
  </p>
</div>
          {/* Date */}
          <div className="flex items-center px-4 py-2" style={{ fontSize: '14px' }}>
            <span className="font-semibold text-gray-600 w-28">{t('from_date')}:</span>
            <p className="text-gray-900">{request?.from_date?.date || '-'}</p>
          </div>

          {/* Check-in */}
          <div className="flex items-center px-4 py-2" style={{ fontSize: '14px' }}>
            <span className="font-semibold text-gray-600 w-28">{t('to_date')}:</span>
            <p className="text-gray-900">{request?.to_date?.date || '-'}</p>
          </div>
 {/* Check-in */}
          <div className="flex items-center px-4 py-2" style={{ fontSize: '14px' }}>
            <span className="font-semibold text-gray-600 w-28">{t('reason')}:</span>
            <p className="text-gray-900">{request?.reason || '-'}</p>
          </div>
          {/* Status */}
<div className="flex items-center px-4 py-2" style={{ fontSize: '14px' }}>
  <span className="font-semibold text-gray-600 w-28">{t('status')}:</span>
  <StatusChip status={request?.status} />
</div>

      <div className="flex items-center px-4 py-2" style={{ fontSize: '14px' }}>
            <span className="font-semibold text-gray-600 w-28">{t('reviewer')}:</span>
            <p className="text-gray-900">{request?.reviewed_by?.name|| '-'}</p>
          </div>
           <div className="flex items-center px-4 py-2" style={{ fontSize: '14px' }}>
            <span className="font-semibold text-gray-600 w-28">{t('reviewed_at')}:</span>
            <p className="text-gray-900">{request?.reviewed_at?.date|| '-'}</p>
          </div>

        </div>
      </div>

      <div className="flex justify-end mt-6">
        <CancelButton onClick={() => navigate('/app/attendance-departure-requests')}>
          {t('back')}
        </CancelButton>
      </div>
    </SectionBox>
  );
};

export default ShowAttendanceDepartmentRequest;
