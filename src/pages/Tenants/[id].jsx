import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useGetTenantByIdQuery ,useUpdateTenantPasswordMutation  } from '../../api/TenantsApi';
import { useGetSubscriptionsByTenantIdQuery } from '../../api/subscriptionsApi';
import SectionBox from '../../components/ui/containers/SectionBox';
import CancelButton from '../../components/ui/buttons/CancelBtn';
import { LuPencil } from 'react-icons/lu';
import { format } from 'date-fns-jalali';
import { ar } from 'date-fns/locale';
import ProductTable from '../../components/reusable_components/DataTable'; // ✅ adjust path as needed
import AddingButton from '../../components/ui/buttons/AddingBtn';
import TextInput from '../../components/reusable_components/TextInput';
import { toast } from 'react-toastify';

export default function ShowTenant() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('subscriptions');
  const [page, setPage] = useState(1);

  const { data: tenantData, isLoading, error } = useGetTenantByIdQuery(id);
  const { data: subscriptionHistoryData, isFetching } = useGetSubscriptionsByTenantIdQuery(Number(id), {
    skip: activeTab !== 'history',
  });

  const [password, setPassword] = useState('');
const [passwordConfirmation, setPasswordConfirmation] = useState('');
const [updatePassword, { isLoading: isUpdating }] = useUpdateTenantPasswordMutation();


  const tenant = tenantData?.body;
  const subscription = tenant?.subscription;
  const history = subscriptionHistoryData?.body?.data || [];
  const pagination = subscriptionHistoryData?.body?.paginate;

  const InfoItem = ({ label, value }) => (
    <div className="flex items-center p-2 px-3">
      <span className="font-semibold text-sm text-gray-600">{label} :</span>
      <p className="text-sm text-black ms-2">{value || '-'}</p>
    </div>
  );


  const handleUpdatePassword = async (e) => {
  e.preventDefault();

  if (password !== passwordConfirmation) {
    toast.error('تأكيد كلمة المرور غير متطابق');
    return;
  }

  try {
    const response = await updatePassword({
      company_id: Number(id),
      password,
      password_confirmation: passwordConfirmation,
    }).unwrap();

    // ✅ Show success message from backend
    toast.success(response?.message || 'تم تحديث كلمة المرور بنجاح');

    // Clear form
    setPassword('');
    setPasswordConfirmation('');
  } catch (err) {
    // ✅ Show error message from backend if available
    toast.error(err?.data?.message || 'فشل تحديث كلمة المرور');
  }
};


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !tenant) {
    return (
      <div className="text-center text-red-600">
        حدث خطأ أثناء جلب بيانات الشركة
      </div>
    );
  }

  return (
    <SectionBox className="space-y-6">
      <div className="flex gap-6">
        {/* Left: Company Info */}
        <div className="w-1/3 bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 align-center border-b border-gray-200">
            <h2 className="text-base font-bold mb-0">عرض تفاصيل الشركة</h2>
          </div>

          <div className="grid grid-cols-1 mt-5">
            <InfoItem label="اسم الشركة" value={tenant?.company_name} />
            <InfoItem label="اسم الشركة المميز" value={tenant?.domain} />
            <InfoItem label="اسم المشرف المميز" value={tenant?.super_admin_name} />

            <InfoItem label="البريد الالكتروني" value={tenant?.email} />
            <InfoItem label="رقم الهاتف" value={tenant?.phone} />
            <InfoItem label="الحالة" value={tenant?.is_active ? 'نشطة' : 'غير نشطة'} />
            <InfoItem
              label="تاريخ الانشاء"
              value={
                tenant.created_at?.date
                  ? tenant.created_at.date
                  : '—'
              }
            />
            <div className="border-t border-gray-200 border-t" />
            <button className="EditPermissionBtn py-3 flex items-center justify-center w-full">
              <CancelButton onClick={() => navigate(`/app/tenant/edit/${id}`)}>
                <LuPencil /> تعديل
              </CancelButton>
            </button>
          </div>
        </div>

        {/* Right: Tabs */}
        <div className="w-2/3 bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-4 pt-3 relative">
            <div className="flex space-x-4 rtl:space-x-reverse">
             {['subscriptions', 'history', 'super_admin'].map((tab) => (
<button
  key={tab}
  onClick={() => setActiveTab(tab)}
  className={`relative px-4 py-2 text-sm font-medium border-b-2 transition-colors duration-200 ${
    activeTab === tab
      ? 'border-blue-500 text-blue-600 -mb-px z-10 bg-white'
      : 'border-transparent text-gray-600'
  }`}
>
  {tab === 'subscriptions'
    ? 'الاشتراكات'
    : tab === 'history'
    ? 'سجل الاشتراكات'
    : (
        <>
          المشرف المميز
          
        </>
      )}
</button>


))}

            </div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gray-200" />
          </div>

          <div className="px-4 mt-5">
            {activeTab === 'subscriptions' && (
              <>
                {subscription ? (
                  <div className="mb-4 rounded-lg overflow-hidden  ">
                    <div className="grid grid-cols-1 gap-2">
                      {/* <InfoItem label="رقم الاشتراك" value={subscription.id} /> */}
                                            <InfoItem label="اسم الباقة" value={subscription.plan_data?.name} />

                      <InfoItem label="حالة الاشتراك" value={subscription.status} />
                      <InfoItem label="بداية الاشتراك" value={subscription.start_date?.date} />
                      <InfoItem label="نهاية الاشتراك" value={subscription.end_date?.date} />
                      <InfoItem label="سعر الباقة الاساسي" value={subscription?.plan_data.price + ' ' + subscription?.plan_data.currency} />
                      <InfoItem label="سعر الباقة بعد الخصم " value={subscription ?.plan_data.price_after_discount + ' ' + subscription?.plan_data.currency}/>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 text-center">لا توجد اشتراكات حالياً.</p>
                )}
              </>
            )}

            {activeTab === 'history' && (
              <>
                {isFetching ? (
                  <p className="text-sm text-gray-500 text-center">جاري تحميل ...</p>
                ) : history?.length > 0 ? (
                  <ProductTable
                    headers={[
                      // { label: 'رقم الاشتراك', key: 'id' },
                                            { label: 'اسم الباقة', key: 'plan_data.name' },

                      { label: 'الحالة', key: 'status' },
                      { label: 'بداية الاشتراك', key: 'start_date.date' },
                      { label: 'نهاية الاشتراك', key: 'end_date.date' },
                    ]}
                    data={history.map((item) => ({
                      ...item,
                      'start_date.date': item.start_date?.date,
                      'end_date.date': item.end_date?.date,
                      'plan_data.name': item.plan_data?.name,
                    }))}
                    onPageChange={(page) => setPage(page)}
                    rowKey="id"
                  />
                ) : (
                  <p className="text-sm text-gray-500 text-center">لا يوجد سجل اشتراكات.</p>
                )}
              </>
            )}


    {activeTab === 'super_admin' && (
  <form onSubmit={handleUpdatePassword} className=" space-y-4">
    <div className="grid grid-cols-1 gap-4 mb-8">
      

<InfoItem
  label="اسم المشرف المميز"
  value={
    tenant?.super_admin_name ? (
      <span className="font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded">
        {tenant.super_admin_name}
      </span>
    ) : (
      '-'
    )
  }
/>

    </div>
    <div className="grid grid-cols-2 gap-4">
      <TextInput
        label="كلمة المرور الجديدة"
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <TextInput
        label="تأكيد كلمة المرور"
        name="password_confirmation"
        type="password"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
        required
      />
    </div>

    <div className="flex justify-end pt-2">
      <AddingButton type="submit" disabled={isUpdating}>
        {isUpdating ? 'جاري التحديث...' : 'تحديث كلمة المرور'}
      </AddingButton>
    </div>
  </form>
)}

          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <CancelButton onClick={() => navigate('/app/tenant')}>رجوع</CancelButton>
      </div>
    </SectionBox>
  );
}
