import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetEmployeeAssetByIdQuery } from '../../api/EmployeeAssetsApi';
import SectionBox from '../../components/ui/containers/SectionBox';
import CancelButton from '../../components/ui/buttons/CancelBtn';
import { LuPencil } from 'react-icons/lu';
import { useTranslation } from 'react-i18next';

const ShowEmployeeAsset = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useGetEmployeeAssetByIdQuery(id);

  if (isLoading) {
    return (
      <SectionBox className="space-y-6">
        <p>{t('loading')}</p>
      </SectionBox>
    );
  }

  if (isError) {
    return <SectionBox className="space-y-6"><p>{t('something_went_wrong')} : {error?.data?.message || 'تعذر تحميل البيانات'}</p></SectionBox>;
  }

  const asset = data?.body;
  if (!asset) return  <SectionBox className="space-y-6"><p>{t('not_found') || 'لا توجد بيانات'}</p></SectionBox>;

  return (
    <SectionBox className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <h2 className="text-base font-bold">{t('employee_asset')}</h2>
          <button className="EditPermissionBtn">
            <CancelButton onClick={() => navigate(`/app/employee-assets/edit/${id}`)} type="button">
              <LuPencil /> {t('edit')}
            </CancelButton>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 pb-3">
          <div className="flex items-center px-4 py-2" style={{ fontSize: '14px' }}>
            <span className="font-semibold text-gray-600 w-28">{t('employee_name')}:</span>
            <p className="text-gray-900">{asset?.employee?.name || '-'}</p>
          </div>

          <div className="flex items-center px-4 py-2" style={{ fontSize: '14px' }}>
            <span className="font-semibold text-gray-600 w-28">{t('manager_name')}:</span>
            <p className="text-gray-900">{asset?.manager?.name || '-'}</p>
          </div>

          <div className="flex items-center px-4 py-2" style={{ fontSize: '14px' }}>
            <span className="font-semibold text-gray-600 w-28">{t('department')}:</span>
            <p className="text-gray-900">{asset?.department?.name || '-'}</p>
          </div>

          <div className="flex items-center px-4 py-2" style={{ fontSize: '14px' }}>
            <span className="font-semibold text-gray-600 w-28">{t('asset_type')}:</span>
            <p className="text-gray-900">{asset?.asset_type?.name || '-'}</p>
          </div>

          <div className="flex items-center px-4 py-2" style={{ fontSize: '14px' }}>
            <span className="font-semibold text-gray-600 w-28">{t('issue_date')}:</span>
            <p className="text-gray-900">{asset?.issue_date?.date || '-'}</p>
          </div>

          <div className="flex items-center px-4 py-2" style={{ fontSize: '14px' }}>
            <span className="font-semibold text-gray-600 w-28">{t('return_date')}:</span>
            <p className="text-gray-900">{asset?.return_date?.date || '-'}</p>
          </div>

          <div className="flex items-center px-4 py-2" style={{ fontSize: '14px' }}>
            <span className="font-semibold text-gray-600 w-28">{t('status')}:</span>
            <p className="text-gray-900">{t(asset?.status) || '-'}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <CancelButton onClick={() => navigate('/app/employee-assets')}>
          {t('back')}
        </CancelButton>
      </div>
    </SectionBox>
  );
};

export default ShowEmployeeAsset;
