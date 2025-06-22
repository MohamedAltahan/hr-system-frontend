import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetEmployeeAssetTypeByIdQuery } from '../../api/EmployeeAssetTypesApi';
import SectionBox from '../../components/ui/containers/SectionBox';
import CancelButton from '../../components/ui/buttons/CancelBtn';
import { LuPencil } from 'react-icons/lu';
import { useTranslation } from 'react-i18next';

const ShowEmployeeAssetType = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useGetEmployeeAssetTypeByIdQuery(id);

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
        <p>{t('something_went_wrong')} : {error?.data?.message || 'تعذر تحميل البيانات'}</p>
      </SectionBox>
    );
  }

  const assetType = data?.body;

  if (!assetType) {
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
          <h2 className="text-base font-bold">{t('asset_type')}</h2>
          <button className="EditPermissionBtn">
            <CancelButton
              onClick={() => navigate(`/app/employee-asset-types/edit/${id}`)}
              type="button"
            >
              <LuPencil /> {t('edit')}
            </CancelButton>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 pb-2">
          <div className="flex items-center px-4 py-2" style={{ fontSize: '14px' }}>
            <span className="font-semibold text-gray-600 w-28">{t('name')}:</span>
            <p className="text-gray-900">{assetType?.name || '-'}</p>
          </div>

          <div className="flex items-center px-4 py-2" style={{ fontSize: '14px' }}>
            <span className="font-semibold text-gray-600 w-28">{t('description')}:</span>
            <p className="text-gray-900">{assetType?.description || '-'}</p>
          </div>

          <div className="flex items-center px-4 py-2" style={{ fontSize: '14px' }}>
            <span className="font-semibold text-gray-600 w-28">{t('branch')}:</span>
            <p className="text-gray-900">{assetType?.branch?.name || '-'}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <CancelButton onClick={() => navigate('/app/employee-asset-types')}>
          {t('back')}
        </CancelButton>
      </div>
    </SectionBox>
  );
};

export default ShowEmployeeAssetType;
