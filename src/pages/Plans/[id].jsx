import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetPlanByIdQuery } from '../../api/PlansApi';
import SectionBox from '../../components/ui/containers/SectionBox';
import CancelButton from '../../components/ui/buttons/CancelBtn';
import { LuPencil } from 'react-icons/lu';

const ShowPlan = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useGetPlanByIdQuery(id);

  if (isLoading) return <p>جاري التحميل...</p>;
  if (isError) return <p>حدث خطأ: {error?.data?.message || 'تعذر تحميل البيانات'}</p>;

  const plan = data?.body;

  if (!plan) return <p>الباقة غير موجودة</p>;

  return (
    <SectionBox className="space-y-6">
      <h2 className="text-lg font-bold">عرض الباقة</h2>

      <div className="gap-4 bg-white border border-gray-200" style={{ borderRadius: '10px', overflow: 'hidden' }}>
        <div className="flex items-center justify-between px-4 py-4" style={{ borderBottom: '1px solid #1515151A' }}>
          <h2 className="text-base font-bold">عرض تفاصيل الباقة</h2>
          <button className="EditPermissionBtn">
            <CancelButton onClick={() => navigate(`/app/plans/edit/${id}`)}>
              <LuPencil /> تعديل
            </CancelButton>
          </button>
        </div>

        <div className="grid grid-cols-2">
          <div className="flex items-center p-4">
            <span className="font-semibold" style={{ color: '#656565', fontSize: '14px', fontWeight: '500' }}>اسم الباقة :</span>
            <p className="ml-2" style={{ color: '#000', fontSize: '14px', fontWeight: '500' }}>{plan.name || '-----'}</p>
          </div>

          <div className="flex items-center p-4">
            <span className="font-semibold" style={{ color: '#656565', fontSize: '14px', fontWeight: '500' }}>الوصف :</span>
            <p className="ml-2" style={{ color: '#000', fontSize: '14px', fontWeight: '500' }}>{plan.description || '-'}</p>
          </div>

          <div className="flex items-center p-4">
            <span className="font-semibold" style={{ color: '#656565', fontSize: '14px', fontWeight: '500' }}>العملة :</span>
            <p className="ml-2" style={{ color: '#000', fontSize: '14px', fontWeight: '500' }}>{plan.currency || '-----'}</p>
          </div>

          <div className="flex items-center p-4">
            <span className="font-semibold" style={{ color: '#656565', fontSize: '14px', fontWeight: '500' }}>السعر :</span>
            <p className="ml-2" style={{ color: '#000', fontSize: '14px', fontWeight: '500' }}>{plan.price || '----'}</p>
          </div>

          <div className="flex items-center p-4">
            <span className="font-semibold" style={{ color: '#656565', fontSize: '14px', fontWeight: '500' }}>السعر بعد الخصم :</span>
            <p className="ml-2" style={{ color: '#000', fontSize: '14px', fontWeight: '500' }}>{plan.price_after_discount || '----'}</p>
          </div>

          <div className="flex items-center p-4">
            <span className="font-semibold" style={{ color: '#656565', fontSize: '14px', fontWeight: '500' }}>مدة الاشتراك (شهور) :</span>
            <p className="ml-2" style={{ color: '#000', fontSize: '14px', fontWeight: '500' }}>{plan.duration_in_months || '----'}</p>
          </div>

          <div className="flex items-center p-4">
            <span className="font-semibold" style={{ color: '#656565', fontSize: '14px', fontWeight: '500' }}>تجريبي؟ :</span>
            <p className="ml-2" style={{ color: '#000', fontSize: '14px', fontWeight: '500' }}>{+plan.is_trial ? 'نعم' : 'لا'}</p>
          </div>

       
            <div className="flex items-center p-4">
              <span className="font-semibold" style={{ color: '#656565', fontSize: '14px', fontWeight: '500' }}>أيام التجربة :</span>
              <p className="ml-2" style={{ color: '#000', fontSize: '14px', fontWeight: '500' }}>{plan.trial_days || '----'}</p>
            </div>
         

          <div className="flex items-center p-4">
            <span className="font-semibold" style={{ color: '#656565', fontSize: '14px', fontWeight: '500' }}>الحالة :</span>
            <p className="ml-2" style={{ color: '#000', fontSize: '14px', fontWeight: '500' }}>{+plan.is_active ? 'مفعل' : 'غير مفعل'}</p>
          </div>

         <div className="flex flex-col col-span-2 p-4">
  <span className="font-semibold mb-2" style={{ color: '#656565', fontSize: '14px', fontWeight: '500' }}>
    المميزات :
  </span>

  <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-4">
    {plan.features?.length > 0 ? (
      plan.features.map((feature, index) => (
        <li
          key={index}
          className="flex items-center gap-2 text-gray-700 bg-gray-100 px-3 py-2 rounded"
        >
          <svg
            className="w-4 h-4 text-green-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414L8.414 15.414a1 1 0 01-1.414 0L3.293 11.707a1 1 0 111.414-1.414L7 12.586l8.293-8.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm">{feature}</span>
        </li>
      ))
    ) : (
      <li className="text-gray-500 text-sm">لا توجد مميزات</li>
    )}
  </ul>
</div>

        </div>
      </div>

      <div className="flex justify-end mt-6">
        <CancelButton onClick={() => navigate('/app/plans')}>رجوع</CancelButton>
      </div>
    </SectionBox>
  );
};

export default ShowPlan;
