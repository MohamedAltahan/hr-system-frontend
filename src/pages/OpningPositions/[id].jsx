import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetOpeningPositionByIdQuery } from '../../api/OpningPositionsApi';
import SectionBox from '../../components/ui/containers/SectionBox';
import CancelButton from '../../components/ui/buttons/CancelBtn';
import { LuPencil } from 'react-icons/lu';
import { useTranslation } from 'react-i18next';

const statusOptions = {
  1: 'منشور',
  0: 'غير منشور',
};

const ShowOpeningPosition = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useGetOpeningPositionByIdQuery(Number(id));

  if (isLoading) return <SectionBox><p>{t('loading')}</p></SectionBox>;
  if (isError) return <SectionBox><p>{error?.data?.message || t('something_went_wrong')}</p></SectionBox>;

  const position = data?.body;
  if (!position) return <p>{t('not_found')}</p>;

  return (
    <SectionBox className="space-y-6">
      <h2 className="text-lg font-bold">{t('show_opening_position')}</h2>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <h2 className="text-base font-bold">{t('position_details')}</h2>
          <button className="EditPermissionBtn">
              <CancelButton onClick={() => navigate(`/app/opening-positions/edit/${id}`)}>
            <LuPencil className="mr-1" /> {t('edit')}
          </CancelButton>
        </button>
        </div>

        <div className="">
          <div className="flex items-center px-4 py-2">
            <span className="font-semibold text-gray-600 w-48">{t('position')} :</span>
            <p className="text-gray-900">{position?.position?.[1] || '-'}</p>
          </div>

          <div className="flex items-center px-4 py-2">
            <span className="font-semibold text-gray-600 w-48">{t('department')} :</span>
            <p className="text-gray-900">{position?.department?.name || '-'}</p>
          </div>

          <div className="flex items-center px-4 py-2">
            <span className="font-semibold text-gray-600 w-48">{t('number_of_vacancies')} :</span>
            <p className="text-gray-900">{position?.number_of_vacancies || '-'}</p>
          </div>

<div className="flex items-center px-4 py-2">
  <span className="font-semibold text-gray-600 w-48">{t('status')} :</span>
  <span
    className={`px-3 py-1 rounded-full text-xs font-medium ${
      position?.is_published === 1
        ? 'bg-green-100 text-green-700'
        : 'bg-red-100 text-red-700'
    }`}
  >
    {statusOptions[position?.is_published] || '-'}
  </span>
</div>


          <div className="flex items-center px-4 py-2 col-span-2">
            <span className="font-semibold text-gray-600 w-48">{t('description')} :</span>
            <p className="text-gray-900">{position?.description || '-'}</p>
          </div>

          <div className="flex items-center px-4 py-2 col-span-2">
            <span className="font-semibold text-gray-600 w-48">{t('job_page')} :</span>
            <a
              href={position?.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-all"
            >
              {position?.website || '-'}
            </a>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <CancelButton type="button" onClick={() => navigate('/app/opening-positions')}>
          {t('back')}
        </CancelButton>
      </div>
    </SectionBox>
  );
};

export default ShowOpeningPosition;
