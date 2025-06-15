import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetBranchByIdQuery } from '../../api/Branches';
import SectionBox from '../../components/ui/containers/SectionBox';
import CancelButton from '../../components/ui/buttons/CancelBtn';
import { LuPencil } from 'react-icons/lu';
import { useTranslation } from 'react-i18next';

const statusOptions = {
  1: 'نشط',
  0: 'غير نشط',
};

const ShowBranch = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useGetBranchByIdQuery(Number(id));

  if (isLoading) return    <SectionBox className="space-y-6">
 <p>{t('loading')}</p> </SectionBox>;
  if (isError) return <p>حدث خطأ: {error?.data?.message || 'تعذر تحميل البيانات'}</p>;

  const branch = data?.body;
  if (!branch) return <p>الفرع غير موجود</p>;

  return (
    <SectionBox className="space-y-6">
      <h2 className="text-lg font-bold">{t('show_branch')} </h2>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <h2 className="text-base font-bold">{t('branch_details')} </h2>
          <button className="EditPermissionBtn">
            <CancelButton onClick={() => navigate(`/app/branch/edit/${id}`)}>
              <LuPencil /> {t('edit')}
            </CancelButton>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center px-4 py-2">
            <span className="font-semibold text-gray-600 w-40">{t('branch_name')}:</span>
            <p className="text-gray-900">{branch?.name || '-'}</p>
          </div>

          <div className="flex items-center px-4 py-2">
            <span className="font-semibold text-gray-600 w-40">{t('phone')} :</span>
            <p className="text-gray-900">{branch?.phone || '-'}</p>
          </div>
   <div className="flex items-center px-4 py-2">
            <span className="font-semibold text-gray-600 w-40">{t('description')}:</span>
            <p className="text-gray-900">{branch?.description || '-'}</p>
          </div>
          <div className="flex items-center px-4 py-2 ">
            <span className="font-semibold text-gray-600 w-40">{t('address')}:</span>
            <p className="text-gray-900">{branch?.address || '-'}</p>
          </div>

       

          <div className="flex items-center p-4">
            <span className="font-semibold text-gray-600 w-40">{t('status')}:</span>
            <p className="text-gray-900">{statusOptions[branch?.is_active] || '-'}</p>
          </div>

          <div className="flex items-center p-4">
            <span className="font-semibold text-gray-600 w-40">{t('created_at')} :</span>
            <p className="text-gray-900">{branch?.created_at?.datetime || '-'}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <CancelButton onClick={() => navigate('/app/branch')}>{t('back')}</CancelButton>
      </div>
    </SectionBox>
  );
};

export default ShowBranch;
