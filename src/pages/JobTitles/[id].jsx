import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetJobTitleByIdQuery } from '../../api/JobTitlesApi';
import SectionBox from '../../components/ui/containers/SectionBox';
import CancelButton from '../../components/ui/buttons/CancelBtn';
import { LuPencil } from 'react-icons/lu';
import { useTranslation } from 'react-i18next';

const ShowJobTitle = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useGetJobTitleByIdQuery(Number(id));

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
        <p className="text-red-600">{error?.data?.message || t('failed_to_load_data')}</p>
      </SectionBox>
    );
  }

  const jobTitle = data?.body;
  if (!jobTitle) {
    return (
      <SectionBox className="space-y-6">
        <p>{t('job_title_not_found')}</p>
      </SectionBox>
    );
  }

  return (
    <SectionBox className="space-y-6">
      {/* <h2 className="text-lg font-bold">{t('show_job_title')}</h2> */}

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <h2 className="text-base font-bold">{t('job_title_details')}</h2>
                    <button className="EditPermissionBtn">

          <CancelButton type="button" onClick={() => navigate(`/app/job-titles/edit/${id}`)}>
            <LuPencil className="mr-1" />
            {t('edit')}
          </CancelButton>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 p-4">
          <div className="flex items-center">
            <span className="font-semibold text-gray-600 w-40">{t('job_title')} :</span>
            <p className="text-gray-900">{jobTitle?.name || '-'}</p>
          </div>

         

        </div>
      </div>

      <div className="flex justify-end mt-6">
        <CancelButton onClick={() => navigate('/app/job-titles')} type="button">
          {t('back')}
        </CancelButton>
      </div>
    </SectionBox>
  );
};

export default ShowJobTitle;
