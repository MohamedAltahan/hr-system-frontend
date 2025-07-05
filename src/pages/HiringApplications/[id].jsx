import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetHiringApplicationByIdQuery, useChangeHiringApplicationStatusMutation } from '../../api/hiringApplicationsApi';
import SectionBox from '../../components/ui/containers/SectionBox';
import CancelButton from '../../components/ui/buttons/CancelBtn';
import AddingButton from '../../components/ui/buttons/AddingBtn';
import TextAreaInput from '../../components/reusable_components/TextAreaInput';
import Modal from '../../components/ui/modals/Modal';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const statusMap = {
  pending: { label: 'قيد الانتظار', className: 'bg-yellow-100 text-yellow-800' },
  accepted: { label: 'مقبول', className: 'bg-green-100 text-green-800' },
  rejected: { label: 'مرفوض', className: 'bg-red-100 text-red-800' },
};

const ShowHiringApplication = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useGetHiringApplicationByIdQuery(Number(id));
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [changeStatus, { isLoading: isChanging }] = useChangeHiringApplicationStatusMutation();

  const handleChangeStatus = async (newStatus, note = '') => {
    try {
      const res = await changeStatus({
        application_id: Number(id),
        status: newStatus,
        note,
      }).unwrap();
      toast.success(res?.message || t('updated_successfully'));
      // window.location.reload();
    } catch (err) {
      toast.error(err?.data?.message || t('something_went_wrong'));
    }
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
        <p className="text-red-500">{error?.data?.message || t('error_loading_data')}</p>
      </SectionBox>
    );
  }

  const app = data?.body;
  if (!app) {
    return (
      <SectionBox>
        <p>{t('not_found')}</p>
      </SectionBox>
    );
  }

  return (
    <SectionBox className="space-y-6">
      <h2 className="text-lg font-bold">{t('show_hiring_application')}</h2>


      {/* Tabs below the title */}
<div className="flex gap-2 mt-2">
  {[
    { key: "applications", label: t("all_applications"), path: `/app/hiring-applications` },
    { key: "interviews", label: t("employee_interviews"), path: `/app/employee-interviews` },
    { key: "contracts", label: t("employee_contracts"), path: `/app/employee-contracts` },
  ].map(({ key, label, path }) => (
    <button
      key={key}
      onClick={() => navigate(path)}
      className={`px-4 py-2 rounded-md text-sm font-medium border transition ${
        location.pathname.includes(key)
          ? 'bg-[#055393] text-white border-[#055393]'
          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
      }`}
    >
      {label}
    </button>
  ))}
</div>


      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {/* <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <h2 className="text-base font-bold">{t('application_details')}</h2>
        </div> */}

        {/* Personal Data */}
        <div className="px-4 pt-4 text-black-700 font-semibold mb-4">{t('personal_data')}</div>
        <div className="grid grid-cols-2 gap-2 px-4 pb-4">
          {[
            { label: 'name', value: app.name },
            { label: 'email', value: app.email },
            { label: 'phone', value: app.phone },
            { label: 'birthdate', value: app.birthdate },
            { label: 'nationality', value: app.nationality },
            { label: 'religion', value: app.religion },
          ].map((item, idx) => (
            <div className="flex items-center" key={idx}>
              <span className="font-semibold text-gray-600 w-40 text-sm">{t(item.label)}:</span>
              <p className="text-gray-900 text-sm">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Job Data */}
        <div className="px-4 pt-4 text-black-700 font-semibold mb-4">{t('job_data')}</div>
        <div className="grid grid-cols-2 gap-2 px-4 pb-4">
          <div className="flex items-center">
            <span className="font-semibold text-gray-600 w-40 text-sm">{t('position')}:</span>
            <p className="text-gray-900 text-sm">{app.opening_position?.name || '-'}</p>
          </div>
          <div className="flex items-center">
            <span className="font-semibold text-gray-600 w-40 text-sm">{t('status')}:</span>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                statusMap[app.status]?.className || 'bg-gray-100 text-gray-800'
              }`}
            >
              {statusMap[app.status]?.label || app.status}
            </span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold text-gray-600 w-40 text-sm">{t('current_salary')}:</span>
            <p className="text-gray-900 text-sm">{app.current_salary}</p>
          </div>
          <div className="flex items-center">
            <span className="font-semibold text-gray-600 w-40 text-sm">{t('expected_salary')}:</span>
            <p className="text-gray-900 text-sm">{app.expected_salary}</p>
          </div>
        </div>

        {/* CV & Notes */}
        <div className="px-4 pb-4">
          <div className="flex items-center mb-2">
            <span className="font-semibold text-gray-600 w-40 text-sm">{t('cv')}:</span>
            <a
              href={app.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline text-sm"
            >
              {t('view_cv')}
            </a>
          </div>
          {app.notes && (
            <div className="flex items-center col-span-2">
              <span className="font-semibold text-gray-600 w-40 text-sm">{t('notes')}:</span>
              <p className="text-gray-900 text-sm">{app.notes}</p>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-6 gap-2">
        <CancelButton onClick={() => navigate(`/app/hiring-applications?opening_position_id=${app.opening_position?.id}`)}>
          {t('back')}
        </CancelButton>
<div className="flex justify-end mt-6 gap-3">
  <button

    onClick={() => handleChangeStatus('accepted')}
    disabled={isChanging}
    className="min-w-[100px] text-sm py-2 px-4 rounded-md bg-blue-600 hover:bg-blue-700 transition-colors duration-200 text-white shadow-sm"
  >
    { t('accept')}
  </button>

  <button
    type="button"
    onClick={() => setShowRejectModal(true)}
    className="min-w-[100px] text-sm py-2 px-4 rounded-md bg-red-600 hover:bg-red-700 transition-colors duration-200 text-white shadow-sm"
  >
    {t('reject')}
  </button>
</div>

      </div>

      {/* Reject Modal */}
      {showRejectModal && (
<Modal isOpen={showRejectModal} onClose={() => setShowRejectModal(false)} title={t('reject_application')}>
          <div className="space-y-4">
            <TextAreaInput
              label={t('reason_optional')}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder={t('write_reason_if_any')}
            />
            <div className="flex justify-end gap-2">
              <CancelButton onClick={() => setShowRejectModal(false)}>{t('cancel')}</CancelButton>
              <AddingButton
                onClick={() => {
                  handleChangeStatus('rejected', rejectReason);
                  setShowRejectModal(false);
                }}
                disabled={isChanging}
              >
                {isChanging ? t('loading') : t('confirm_reject')}
              </AddingButton>
            </div>
          </div>
        </Modal>
      )}
    </SectionBox>
  );
};

export default ShowHiringApplication;
