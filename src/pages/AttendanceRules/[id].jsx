import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetAttendanceRuleByIdQuery } from '../../api/AttendanceRulesApi';
import SectionBox from '../../components/ui/containers/SectionBox';
import CancelButton from '../../components/ui/buttons/CancelBtn';
import { LuPencil } from 'react-icons/lu';
import { useTranslation } from 'react-i18next';

const statusOptions = {
  1: 'نشط',
  0: 'غير نشط',
};

const ShowAttendanceRule = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useGetAttendanceRuleByIdQuery(Number(id));

  if (isLoading)
    return (
      <SectionBox className="space-y-6">
        <p>{t('loading')}</p>
      </SectionBox>
    );

  if (isError)
    return <p>حدث خطأ: {error?.data?.message || 'تعذر تحميل البيانات'}</p>;

  const rule = data?.body;
  if (!rule) return <p>{t('not_found')}</p>;

  return (
    <SectionBox className="space-y-6">
      <h2 className="text-lg font-bold">{t('show_attendance_rule')}</h2>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <h2 className="text-base font-bold">{t('attendance_rule_details')}</h2>
          <button className="EditPermissionBtn">
            <CancelButton onClick={() => navigate(`/app/attendance-rules/edit/${id}`)}>
              <LuPencil /> {t('edit')}
            </CancelButton>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center px-4 py-2">
            <span className="font-semibold text-gray-600 w-40">{t('name')}:</span>
            <p className="text-gray-900">{rule?.name || '-'}</p>
          </div>

          <div className="flex items-center px-4 py-2">
            <span className="font-semibold text-gray-600 w-40">{t('entry_time')}:</span>
            <p className="text-gray-900">{rule?.entry_time?.time_24hr || '-'}</p>
          </div>

          <div className="flex items-center px-4 py-2">
            <span className="font-semibold text-gray-600 w-40">{t('exit_time')}:</span>
            <p className="text-gray-900">{rule?.exit_time?.time_24hr || '-'}</p>
          </div>

          <div className="flex items-center px-4 py-2">
            <span className="font-semibold text-gray-600 w-40">{t('break_time')}:</span>
            <p className="text-gray-900">{rule?.break_time?.time_24hr || '-'}</p>
          </div>

          <div className="flex items-center px-4 py-2">
            <span className="font-semibold text-gray-600 w-40">{t('grace_period_minutes')}:</span>
            <p className="text-gray-900">{rule?.grace_period_minutes || '-'}</p>
          </div>

          <div className="flex items-center px-4 py-2">
            <span className="font-semibold text-gray-600 w-40">{t('shift_time')}:</span>
            <p className="text-gray-900">{rule?.shift_time || '-'}</p>
          </div>

          <div className="flex items-center px-4 py-2">
            <span className="font-semibold text-gray-600 w-40">{t('work_type')}:</span>
            <p className="text-gray-900">{rule?.work_type || '-'}</p>
          </div>

          <div className="flex items-center px-4 py-2">
            <span className="font-semibold text-gray-600 w-40">{t('weekly_days_count')}:</span>
            <p className="text-gray-900">{rule?.weekly_days_count || '-'}</p>
          </div>

          <div className="flex items-center px-4 py-2">
            <span className="font-semibold text-gray-600 w-40">{t('branch')}:</span>
            <p className="text-gray-900">{rule?.branch || '-'}</p>
          </div>

          <div className="flex items-center px-4 py-2">
            <span className="font-semibold text-gray-600 w-40">{t('status')}:</span>
            <p className="text-gray-900">{statusOptions[rule?.status] || '-'}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <CancelButton type="button" onClick={() => navigate('/app/attendance-rules')}>
          {t('back')}
        </CancelButton>
      </div>
    </SectionBox>
  );
};

export default ShowAttendanceRule;
