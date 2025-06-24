import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useChangeHiringApplicationStatusMutation } from '../../../api/hiringApplicationsApi';
import SectionBox from '../../../components/ui/containers/SectionBox';
import CancelButton from '../../../components/ui/buttons/CancelBtn';
import AddingButton from '../../../components/ui/buttons/AddingBtn';
import { useTranslation } from 'react-i18next';
import TextAreaInput from '../../../components/reusable_components/TextAreaInput';
import Select from 'react-select';
import { toast } from "react-toastify";




const ChangeApplicationStatus = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState('pending');
  const [note, setNote] = useState('');
  const [changeStatus, { isLoading }] = useChangeHiringApplicationStatusMutation();
const statusOptions = [
  { value: 'pending', label: t('pending') },
  { value: 'accepted', label: t('approved') },
  { value: 'rejected', label: t('rejected') },
];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await changeStatus({
        application_id: Number(id),
        status,
        note,
      }).unwrap();

    toast.success(res?.message || t("updated_successfully"));
      navigate('/app/opening-positions');
    } catch (err) {
    toast.error(err?.data?.message || t("something_went_wrong"));
    }
  };

  return (
    <SectionBox className="space-y-6">
      <h2 className="text-lg font-bold">{t('change_application_status')}</h2>

      <form onSubmit={handleSubmit} className="space-y-4 ">
        <div className="flex flex-col max-w-xl">
          <div>
      <label className="block mb-2 label-md">{t('status')}</label>
      <Select
        options={statusOptions}
        value={statusOptions.find((opt) => opt.value === setStatus)}
        onChange={(selected) => setStatus(selected?.value)}
        placeholder={t('select_status')}
      />
    </div>

        </div>

        <div className="flex flex-col max-w-xl" >
          <TextAreaInput
          label={ t('notes')}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 min-h-[100px]"
            placeholder={t('write_reason_if_any')}
          />
        </div>

        <div className="flex" style={{justifyContent: "end",    gap: "15px"}}>
          <AddingButton type="submit" disabled={isLoading}>
            {isLoading ? t('loading') : t('update')}
          </AddingButton>
                    <CancelButton onClick={() => navigate(-1)}>{t('cancel')}</CancelButton>

        </div>
      </form>
    </SectionBox>
  );
};

export default ChangeApplicationStatus;
