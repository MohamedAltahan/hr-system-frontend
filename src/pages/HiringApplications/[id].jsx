import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetHiringApplicationByIdQuery } from '../../api/hiringApplicationsApi';
import SectionBox from '../../components/ui/containers/SectionBox';
import CancelButton from '../../components/ui/buttons/CancelBtn';
import { LuPencil } from 'react-icons/lu';
import { useTranslation } from 'react-i18next';

const statusMap = {
  pending: 'قيد الانتظار',
  approved: 'مقبول',
  rejected: 'مرفوض',
};

const ShowHiringApplication = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useGetHiringApplicationByIdQuery(Number(id));

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
        <p className="text-red-500">{error?.data?.message || t('error_loading_data')}</p>
      </SectionBox>
    );
  }
  const statusMap = {
  pending: { label: 'قيد الانتظار', className: 'bg-yellow-100 text-yellow-800' },
  approved: { label: 'مقبول', className: 'bg-green-100 text-green-800' },
  rejected: { label: 'مرفوض', className: 'bg-red-100 text-red-800' },
};


  const app = data?.body;
  if (!app) {
    return <SectionBox><p>{t('not_found')}</p></SectionBox>;
  }

  return (
    <SectionBox className="space-y-6">
      <h2 className="text-lg font-bold">{t('show_hiring_application')}</h2>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <h2 className="text-base font-bold">{t('application_details')}</h2>
     
        </div>
      {/* Personal Data Section */}
        <div className="px-4 pt-4 text-black-700 font-semibold mb-4 ">{t('personal_data')}</div>
        <div className="grid grid-cols-2 gap-2 px-4 pb-4">
          <div className="flex items-center">
            <span className="font-semibold text-gray-600 w-40" style={{ fontSize: '14px' }}>{t('name')}:</span>
            <p className="text-gray-900 text-sm">{app.name}</p>
          </div>
          <div className="flex items-center">
            <span className="font-semibold text-gray-600 w-40" style={{ fontSize: '14px' }}>{t('email')}:</span>
            <p className="text-gray-900 text-sm">{app.email}</p>
          </div>
          <div className="flex items-center">
            <span className="font-semibold text-gray-600 w-40" style={{ fontSize: '14px' }}>{t('phone')}:</span>
            <p className="text-gray-900 text-sm">{app.phone}</p>
          </div>
          <div className="flex items-center">
            <span className="font-semibold text-gray-600 w-40" style={{ fontSize: '14px' }}>{t('birthdate')}:</span>
            <p className="text-gray-900 text-sm">{app.birthdate}</p>
          </div>
          <div className="flex items-center">
            <span className="font-semibold text-gray-600 w-40" style={{ fontSize: '14px' }}>{t('nationality')}:</span>
            <p className="text-gray-900 text-sm">{app.nationality}</p>
          </div>
          <div className="flex items-center">
            <span className="font-semibold text-gray-600 w-40" style={{ fontSize: '14px' }}>{t('religion')}:</span>
            <p className="text-gray-900 text-sm">{app.religion}</p>
          </div>
        </div>


      <div className="bg-white border-b border-gray-200 rounded-xl overflow-hidden">
</div>

        {/* Job Data Section */}
        <div className="px-4 pt-4 text-black-700 font-semibold mb-4 ">{t('job_data')}</div>
        <div className="grid grid-cols-2 gap-2 px-4 pb-4">
          <div className="flex items-center">
            <span className="font-semibold text-gray-600 w-40" style={{ fontSize: '14px' }}>{t('position')}:</span>
            <p className="text-gray-900 text-sm">{app.opening_position?.name || '-'}</p>
          </div>
      <div className="flex items-center">
  <span className="font-semibold text-gray-600 w-40" style={{ fontSize: '14px' }}>{t('status')}:</span>
  <span
    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
      statusMap[app.status]?.className || 'bg-gray-100 text-gray-800'
    }`}
  >
    {statusMap[app.status]?.label || app.status}
  </span>
</div>

          <div className="flex items-center">
            <span className="font-semibold text-gray-600 w-40" style={{ fontSize: '14px' }}>{t('current_salary')}:</span>
            <p className="text-gray-900 text-sm">{app.current_salary}</p>
          </div>
          <div className="flex items-center">
            <span className="font-semibold text-gray-600 w-40" style={{ fontSize: '14px' }}>{t('expected_salary')}:</span>
            <p className="text-gray-900 text-sm">{app.expected_salary}</p>
          </div>
        </div>

  

        {/* CV & Notes */}
        <div className="px-4 pb-4">
          <div className="flex items-center mb-2">
            <span className="font-semibold text-gray-600 w-40" style={{ fontSize: '14px' }}>{t('cv')}:</span>
            <a href={app.cv} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">
              {t('view_cv')}
            </a>
          </div>
          {app.notes && (
            <div className="flex items-center col-span-2">
              <span className="font-semibold text-gray-600 w-40" style={{ fontSize: '14px' }}>{t('notes')}:</span>
              <p className="text-gray-900 text-sm">{app.notes}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <CancelButton type="button" onClick={() => navigate(`/app/hiring-applications?opening_position_id=${app.opening_position?.id}`)}>
          {t('back')}
        </CancelButton>
      </div>
    </SectionBox>
  );
};

export default ShowHiringApplication;
