import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LuPencil } from 'react-icons/lu';
import { toast } from "react-toastify";
  
import {
  useGetEmployeeClearanceByIdQuery,
  useUpdateEmployeeClearanceStatusMutation,
} from '../../api/EmployeeClearancesApi';

import SectionBox from '../../components/ui/containers/SectionBox';
import CancelButton from '../../components/ui/buttons/CancelBtn';

const ShowEmployeeClearance = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data, isLoading, isError, error, refetch } = useGetEmployeeClearanceByIdQuery(id);
  const [updateStatus, { isLoading: isStatusUpdating }] = useUpdateEmployeeClearanceStatusMutation();

 const StatusChip = ({ status }) => {

  const statusMap = {
    pending: {
      label: t("status_pending"), // قيد الانتظار
      className: "bg-yellow-100 text-yellow-800",
    },
    approved: {
      label: t("status_approved"), // مقبول
      className: "bg-green-100 text-green-800",
    },
    rejected: {
      label: t("status_rejected"), // مرفوض
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

  const clearance = data?.body;

  if (!clearance) {
    return (
      <SectionBox className="space-y-6">
        <p>{t('not_found') || 'لا توجد بيانات'}</p>
      </SectionBox>
    );
  }

  return (
    <SectionBox className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <h2 className="text-base font-bold">{t('employee_clearance')}</h2>
          <button className="EditPermissionBtn">
            <CancelButton onClick={() => navigate(`/app/employee-clearances/edit/${id}`)} type="button">
              <LuPencil /> {t('edit')}
            </CancelButton>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 pb-3">
          <div className="flex items-center px-4 py-2" style={{ fontSize: '14px' }}>
            <span className="font-semibold text-gray-600 w-28">{t('employee_name')}:</span>
            <p className="text-gray-900">{clearance?.employee?.name || '-'}</p>
          </div>

          <div className="flex items-center px-4 py-2" style={{ fontSize: '14px' }}>
            <span className="font-semibold text-gray-600 w-28">{t('last_working_day')}:</span>
            <p className="text-gray-900">{clearance?.last_working_day?.date || '-'}</p>
          </div>

          <div className="flex items-center px-4 py-2 " style={{ fontSize: '14px' }}>
            <span className="font-semibold text-gray-600 w-28">{t('reason')}:</span>
            <p className="text-gray-900">{clearance?.reason || '-'}</p>
          </div>

          <div className="flex items-center px-4 py-2" style={{ fontSize: '14px' }}>
            <span className="font-semibold text-gray-600 w-28">{t('notice_period')}:</span>
            <p className="text-gray-900">{clearance?.notice_period || '-'} {t('days')}</p>
          </div>

          <div className="flex items-center px-4 py-2" style={{ fontSize: '14px' }}>
            <span className="font-semibold text-gray-600 w-24">{t('status')}:</span>
             <StatusChip status={clearance?.status} />

            
          </div>

         
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <CancelButton onClick={() => navigate('/app/employee-clearances')}>
          {t('back')}
        </CancelButton>
      </div>
    </SectionBox>
  );
};

export default ShowEmployeeClearance;
