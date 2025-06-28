import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetAttendanceDepartureByIdQuery } from '../../api/AttendanceDepartmentApi';
import SectionBox from '../../components/ui/containers/SectionBox';
import CancelButton from '../../components/ui/buttons/CancelBtn';
import { LuPencil } from 'react-icons/lu';
import { useTranslation } from 'react-i18next';

const ShowAttendanceDeparture = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useGetAttendanceDepartureByIdQuery(Number(id));
  const record = data?.body;

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

  if (!record) return <p>{t('not_found') || 'لا توجد بيانات'}</p>;

  return (
    <SectionBox className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <h2 className="text-base font-bold">{t('show_attendance_departure')}</h2>
          <button className="EditPermissionBtn">
            <CancelButton onClick={() => navigate(`/app/attendance-departure/edit/${id}`)}>
              <LuPencil /> {t('edit')}
            </CancelButton>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2 pb-2" style={{ fontSize: '14px' }}>
          <div className="flex items-center px-4 py-2">
            <span className="font-semibold text-gray-600 w-28">{t('employee_name')}:</span>
            <p className="text-gray-900">{record?.empoloyee?.name || '-'}</p>
          </div>

          <div className="flex items-center px-4 py-2">
            <span className="font-semibold text-gray-600 w-28">{t('date')}:</span>
            <p className="text-gray-900">{record?.date?.date || '-'}</p>
          </div>

          <div className="flex items-center px-4 py-2">
            <span className="font-semibold text-gray-600 w-28">{t('check_in')}:</span>
            <p className="text-gray-900">{record?.check_in?.time_12hr || '-'}</p>
          </div>

          <div className="flex items-center px-4 py-2">
            <span className="font-semibold text-gray-600 w-28">{t('check_out')}:</span>
            <p className="text-gray-900">{record?.check_out?.time_12hr || '-'}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <CancelButton onClick={() => navigate('/app/attendance-departure')} type="button">
          {t('back')}
        </CancelButton>
      </div>
    </SectionBox>
  );
};

export default ShowAttendanceDeparture;
