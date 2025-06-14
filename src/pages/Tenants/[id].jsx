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
import { useTranslation } from 'react-i18next';


export default function ShowTenant() {
      const { t } = useTranslation();

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
            <h2 className="text-base font-bold mb-0">{t('show_tenant_details')}</h2>
          </div>

          <div className="grid grid-cols-1 mt-5">
            <InfoItem label={t('company_name')} value={tenant?.company_name} />
            <InfoItem label={t('company_unique_name')} value={tenant?.domain} />
            <InfoItem label={t('super_admin_name')} value={tenant?.super_admin_name} />

            <InfoItem label={t('email')} value={tenant?.email} />
            <InfoItem label={t('phone')} value={tenant?.phone} />
            <InfoItem label={t('status')} value={tenant?.is_active ? t('active') : t('not_active')} />
            <InfoItem
              label={t('created_at')}
              value={
                tenant.created_at?.date
                  ? tenant.created_at.date
                  : '—'
              }
            />
            <div className="border-t border-gray-200 border-t" />
            <button className="EditPermissionBtn py-3 flex items-center justify-center w-full">
              <CancelButton onClick={() => navigate(`/app/tenant/edit/${id}`)}>
                <LuPencil /> {t('edit')}
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
    ?  t('subscriptions') 
    : tab === 'history'
    ? t('subscription_history')
    : (
        <>
          {t('super_admin')} 
          
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
                      {/* <InfoItem label={t('plan_name')} value={subscription.plan_data?.name} /> */}

                      <InfoItem label={t('Subscription_type')}
                       value={subscription.plan_data?.price == 0 ? t('trail_subscription') : t('subscription')+' ' + subscription.plan_data?.duration_in_months + t('months')} />

                      <InfoItem label={t('subscription_status')} value={subscription.status} />
                      <InfoItem label={t('subscription_starts_at')} value={subscription.start_date?.date} />
                      <InfoItem label={t('subscription_ends_at')} value={subscription.end_date?.date} />
                     
                      {/* <InfoItem label={t('main_price_of_plan')} value={subscription?.plan_data.price + ' ' + subscription?.plan_data.currency} />
                      <InfoItem label={t('plan_price_after_discount')} value={subscription ?.plan_data.price_after_discount + ' ' + subscription?.plan_data.currency}/>
                      */}
                     
                      <InfoItem label={t('subscription_price')} value={subscription ?.plan_data.price + ' ' + subscription?.plan_data.currency_translated}/>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 text-center">{t('no_subscriptions_now')}</p>
                )}
              </>
            )}

            {activeTab === 'history' && (
              <>
                {isFetching ? (
                  <p className="text-sm text-gray-500 text-center">{t('loading')}</p>
                ) : history?.length > 0 ? (
                  <ProductTable
                    headers={[
                      // { label: t('plan_name'), key: 'plan_data.name' },
                      { label: t('price'), key: 'plan_data.price' },
                      { label: t('status'), key: 'status' },
                      { label: t('subscription_starts_at'), key: 'start_date.date' },
                      { label: t('subscription_ends_at'), key: 'end_date.date' },
                    ]}
                    data={history.map((item) => ({
                      ...item,
                      'start_date.date': item.start_date?.date,
                      'end_date.date': item.end_date?.date,
                      'plan_data.price': item.plan_data?.price ? `${item.plan_data.price} ${item.plan_data.currency_translated}` : t('trail'),
                    }))}
                    onPageChange={(page) => setPage(page)}
                    rowKey="id"
                  />
                ) : (
                  <p className="text-sm text-gray-500 text-center">{t('no_subscriptions_history')}</p>
                )}
              </>
            )}


    {activeTab === 'super_admin' && (
  <form onSubmit={handleUpdatePassword} className=" space-y-4">
    <div className="grid grid-cols-1 gap-4 mb-8">
      

<InfoItem
  label={t('super_admin_name')}
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
        label={t('new_password')}
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <TextInput
        label={t('confirm_new_password')}
                name="password_confirmation"
        type="password"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
        required
      />
    </div>

    <div className="flex justify-end pt-2">
      <AddingButton type="submit" disabled={isUpdating}>
        {isUpdating ? t('updating') : t('update_password')}
      </AddingButton>
    </div>
  </form>
)}

          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <CancelButton onClick={() => navigate('/app/tenant')}>{t('back')}</CancelButton>
      </div>
    </SectionBox>
  );
}
