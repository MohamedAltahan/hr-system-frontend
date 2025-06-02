import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetBranchByIdQuery } from '../../api/Branches';
import SectionBox from '../../components/ui/containers/SectionBox';
import CancelButton from '../../components/ui/buttons/CancelBtn';
import { LuPencil } from 'react-icons/lu';

const statusOptions = {
  1: 'نشط',
  0: 'غير نشط',
};

const ShowBranch = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useGetBranchByIdQuery(Number(id));

  if (isLoading) return <p>جاري التحميل...</p>;
  if (isError) return <p>حدث خطأ: {error?.data?.message || 'تعذر تحميل البيانات'}</p>;

  const branch = data?.body;
  if (!branch) return <p>الفرع غير موجود</p>;

  return (
    <SectionBox className="space-y-6">
      <h2 className="text-lg font-bold">عرض الفرع</h2>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <h2 className="text-base font-bold">تفاصيل الفرع</h2>
          <button className="EditPermissionBtn">
            <CancelButton onClick={() => navigate(`/app/branch/edit/${id}`)}>
              <LuPencil /> تعديل
            </CancelButton>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center px-4 py-2">
            <span className="font-semibold text-gray-600 w-40">الاسم:</span>
            <p className="text-gray-900">{branch?.name || '-'}</p>
          </div>

          <div className="flex items-center px-4 py-2">
            <span className="font-semibold text-gray-600 w-40">رقم الهاتف:</span>
            <p className="text-gray-900">{branch?.phone || '-'}</p>
          </div>
   <div className="flex items-center px-4 py-2">
            <span className="font-semibold text-gray-600 w-40">الوصف:</span>
            <p className="text-gray-900">{branch?.description || '-'}</p>
          </div>
          <div className="flex items-center px-4 py-2 ">
            <span className="font-semibold text-gray-600 w-40">العنوان:</span>
            <p className="text-gray-900">{branch?.address || '-'}</p>
          </div>

       

          <div className="flex items-center p-4">
            <span className="font-semibold text-gray-600 w-40">الحالة:</span>
            <p className="text-gray-900">{statusOptions[branch?.is_active] || '-'}</p>
          </div>

          <div className="flex items-center p-4">
            <span className="font-semibold text-gray-600 w-40">تاريخ الإنشاء:</span>
            <p className="text-gray-900">{branch?.created_at?.datetime || '-'}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <CancelButton onClick={() => navigate('/app/branch')}>رجوع</CancelButton>
      </div>
    </SectionBox>
  );
};

export default ShowBranch;
