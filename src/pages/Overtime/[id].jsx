import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetOvertimeByIdQuery } from '../../api/overtimeApi';
import SectionBox from '../../components/ui/containers/SectionBox';
import CancelButton from '../../components/ui/buttons/CancelBtn';
import { LuPencil } from 'react-icons/lu';
import { useTranslation } from 'react-i18next';

const statusOptions = {
  pending: 'قيد الانتظار',
  rejected: 'مرفوض',
  accepted: 'مقبول',
};

const ShowOvertime = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useGetOvertimeByIdQuery(Number(id));

  if (isLoading)
    return (
      <SectionBox className="space-y-6">
        <p>{t('loading')}</p>
      </SectionBox>
    );

  if (isError)
    return (
      <p>
        {t('error_occurred')}: {error?.data?.message || t('unable_to_load_data')}
      </p>
    );

  const overtime = data?.body;
  if (!overtime) return <p>{t('not_found')}</p>;

  return (
    <SectionBox className="space-y-6">
      <h2 className="text-lg font-bold">{t('show_overtime')}</h2>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <h2 className="text-base font-bold">{t('overtime_details')}</h2>
          <button className="EditPermissionBtn">
            <CancelButton onClick={() => navigate(`/app/overtime/edit/${id}`)}>
              <LuPencil /> {t('edit')}
            </CancelButton>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center px-4 py-2 text-sm">
            <span className="font-semibold text-gray-600 w-40">{t('employee_id')}:</span>
            <p className="text-gray-900">{overtime?.employee_id || '-'}</p>
          </div>

          <div className="flex items-center px-4 py-2 text-sm">
            <span className="font-semibold text-gray-600 w-40">{t('status')}:</span>
            <p className="text-gray-900">{statusOptions[overtime?.status] || '-'}</p>
          </div>

          <div className="flex items-center px-4 py-2 text-sm col-span-2">
            <span className="font-semibold text-gray-600 w-40">{t('reason')}:</span>
            <p className="text-gray-900">{overtime?.reason || '-'}</p>
          </div>

          <div className="flex items-center px-4 py-2 text-sm">
            <span className="font-semibold text-gray-600 w-40">{t('duration_in_hours')}:</span>
            <p className="text-gray-900">{overtime?.duration_in_hours || '-'}</p>
          </div>

          <div className="flex items-center px-4 py-2 text-sm">
            <span className="font-semibold text-gray-600 w-40">{t('amount')}:</span>
            <p className="text-gray-900">{overtime?.amount || '-'}</p>
          </div>

          <div className="flex items-center px-4 py-2 text-sm">
            <span className="font-semibold text-gray-600 w-40">{t('created_at')}:</span>
            <p className="text-gray-900">{overtime?.created_at?.datetime || '-'}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <CancelButton type="button" onClick={() => navigate('/app/overtime')}>
          {t('back')}
        </CancelButton>
      </div>
    </SectionBox>
  );
};

export default ShowOvertime;
