import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SectionBox from '../../../components/ui/containers/SectionBox';
import TextInput from '../../../components/reusable_components/TextInput';
import EmailInput from '../../../components/reusable_components/EmailInput';
import NewPhoneInput from '../../../components/reusable_components/NewPhoneInput';
import AddingButton from '../../../components/ui/buttons/AddingBtn';
import CancelButton from '../../../components/ui/buttons/CancelBtn';
import Select from 'react-select';
import ToggleInput from '../../../components/reusable_components/ToggleInput';
import { DollarSign } from 'lucide-react'; // Optional icon


import Modal from '../../../components/ui/modals/Modal'; // Assuming you have a reusable modal


import { toast } from 'react-toastify';

import { useGetTenantByIdQuery, useUpdateTenantMutation } from '../../../api/TenantsApi';
import { useGetAllPlansQuery ,useAssignPlanToTenantMutation} from '../../../api/PlansApi';

import {

  useCreateSubscriptionMutation,
} from '../../../api/subscriptionsApi'; 

export default function EditTenant() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: tenantData, isLoading: tenantLoading } = useGetTenantByIdQuery(id);

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const company_id = user?.company_id;

  const { data: plansData } = useGetAllPlansQuery({ page: 1, status: 'active' ,company_id : id });

    const [createSubscription, { isLoading: isCreating }] = useCreateSubscriptionMutation();


  const planOptions = useMemo(() => {
    return plansData?.body?.data?.map(plan => ({
      value: plan.id,
      label: plan.name,
    })) || [];
  }, [plansData]);

  const [formData, setFormData] = useState({
    company_name_ar: '',
    company_name_en: '',
    email: '',
    phone: '',
    domain: '',
    is_active: 1,
  });

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [logo, setLogo] = useState(null);

  const [updateTenant, { isLoading: updateLoading }] = useUpdateTenantMutation();

useEffect(() => {
  if (tenantData?.body && planOptions.length > 0) {
    const tenant = tenantData.body;

    setFormData({
      company_name_ar: tenant.company_name || '',
      company_name_en: tenant.company_name || '',
      email: tenant.email || '',
      phone: tenant.phone || '',
      domain: tenant.domain || '',
      is_active: tenant.is_active ?? 1,
      plan_id: tenant.plan?.id || null,
    });

    const planOption = planOptions.find(p => p.value === tenant.plan?.id);

    if (planOption) {
      setSelectedPlan(planOption);
    } else if (tenant.plan) {
      // Fallback: use tenant's current plan if not found in options
      setSelectedPlan({
        value: tenant.plan.id,
        label: tenant.plan.name,
      });
    } else {
      setSelectedPlan(null);
    }
  }
}, [tenantData, planOptions]);




const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
const [tempSelectedPlan, setTempSelectedPlan] = useState(null);
const [showSubscribeSelect, setShowSubscribeSelect] = useState(false);
const [subscriptionPlan, setSubscriptionPlan] = useState(null);

const [assignPlanToTenant, { isLoading: assigning }] = useAssignPlanToTenantMutation();

const handleOpenPlanModal = () => {
  setTempSelectedPlan(selectedPlan);
  setIsPlanModalOpen(true);
};

const handleAssignPlan = async () => {
  if (!tempSelectedPlan) return;
  try {
    await assignPlanToTenant({
      company_id: Number(id),
      plan_id: tempSelectedPlan.value,
    }).unwrap();

    toast.success('تم تعيين الباقة بنجاح');
    setSelectedPlan(tempSelectedPlan);
    setShowSubscribeSelect(true);  // Show subscription option now
    // Keep modal open, don't close it yet
  } catch (err) {
    toast.error(err?.data?.message || 'فشل تعيين الباقة');
  }
};
;



  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked ? 1 : 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('company_name[ar]', formData.company_name_ar);
    form.append('company_name[en]', formData.company_name_en);
    form.append('email', formData.email);
    form.append('phone', formData.phone);
    form.append('domain', formData.domain);
    form.append('plan_id', selectedPlan?.value);
    form.append('is_active', formData.is_active ? '1' : '0');

    if (logo) {
      form.append('logo', logo);
    }

    try {
      const res = await updateTenant({ id, formData: form }).unwrap();
      toast.success(res?.message || 'تم تحديث بيانات الشركة بنجاح');
      setTimeout(() => navigate('/app/tenant'), 1500);
    } catch (err) {
      toast.error(err?.data?.message || 'حدث خطأ أثناء تحديث الشركة');
      console.error('Update tenant error:', err);
    }
  };

  if (tenantLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
const handlePlanChange = async (selectedOption) => {
    setSelectedPlan(selectedOption);

    try {
      await createSubscription({
        company_id: Number(id),

        plan_id: selectedOption.value,
      }).unwrap();
setIsPlanModalOpen(false);
      // Optionally navigate or show success
      // navigate(`/tenants/${id}/subscriptions`);
    } catch (err) {
      console.error('Failed to create subscription:', err);
      // Optionally show error toast
    }
  };




const handleConfirmSubscribe = async () => {
  if (!subscriptionPlan) return;
  try {
    await createSubscription({
      company_id: Number(id),
      plan_id: subscriptionPlan.value,
    }).unwrap();

    toast.success('تم الاشتراك في الباقة بنجاح');
    setIsPlanModalOpen(false);
    setShowSubscribeSelect(false);
    setSubscriptionPlan(null);
    // navigate(`/tenants/${id}/subscriptions`);
  } catch (err) {
    toast.error(err?.data?.message || 'فشل الاشتراك في الباقة');
  }
};



  return (
    <SectionBox className="space-y-4">
      <form onSubmit={handleSubmit}>
         <div className="flex items-center justify-between mb-9">
    <h1 className="subtitle">تعديل شركة</h1>
    <div style={{position:"absolute",insetInlineEnd:'0'}}>
    <ToggleInput
      label="الحالة"
      name="is_active"
      checked={formData.is_active === 1}
      onChange={handleChange}
      
    />
    </div>
  </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextInput
            label="اسم الشركة "
            name="company_name_ar"
            value={formData.company_name_ar}
            onChange={handleChange}
          />
         
          <EmailInput
            label="البريد الإلكتروني"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <NewPhoneInput
            label="رقم الهاتف"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <TextInput
            label="الدومين"
            name="domain"
            value={formData.domain}
            onChange={handleChange}
          />
          {/* <div className="mb-3">
            <label className="block mb-2 label-md">الباقة</label>
            
         <Select
        value={selectedPlan}
        onChange={handlePlanChange}
        options={planOptions}
        placeholder="اختر الباقة"
        isDisabled={isCreating || tenantLoading}
      />
          </div> */}


<button
style={{width:'fit-content',fontFamily:"Cairo-Regular",fontSize:'14px'}}
  type="button"
  onClick={handleOpenPlanModal}
  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
>
  <DollarSign className="w-4 h-4" />
  تحديد سعر
</button> 


          
   <Modal isOpen={isPlanModalOpen} onClose={() => {
  setIsPlanModalOpen(false);
  setShowSubscribeSelect(false);
  setSubscriptionPlan(null);
}} title=" تحديد السعر">
  <div className="space-y-6 px-2 py-1">

    {/* Plan assignment select */}
    <div>
      <Select
        value={tempSelectedPlan}
        onChange={setTempSelectedPlan}
        options={planOptions}
        placeholder="اختر الباقة"
        isSearchable
        isDisabled={assigning}
        className="text-right"
      />
    </div>

    <div className="flex justify-between gap-4 pt-4">
      <button
        className="px-4 py-2 text-sm rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300"
        onClick={() => {
          setIsPlanModalOpen(false);
          setShowSubscribeSelect(false);
          setSubscriptionPlan(null);
        }}
      >
        إلغاء
      </button>

      <button
        className="px-4 py-2 text-sm rounded-md bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50"
        onClick={handleAssignPlan}
        disabled={assigning || !tempSelectedPlan}
      >
        تأكيد التعيين
      </button>
    </div>

    {/* Show subscription select only after assign */}
    {showSubscribeSelect && (
      <div className="mt-6 border-t pt-6">
        <label className="block mb-2 label-md">الاشتراك في باقة</label>
        <Select
          value={subscriptionPlan}
          onChange={setSubscriptionPlan}
          options={planOptions}
          placeholder="اختر باقة للاشتراك"
          isSearchable
          isDisabled={isCreating}
          className="text-right"
        />
        <div className="flex justify-end gap-4 pt-4">
          {/* <button
            className="px-4 py-2 text-sm rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300"
            onClick={() => {
              setShowSubscribeSelect(false);
              setSubscriptionPlan(null);
            }}
          >
            إلغاء الاشتراك
          </button> */}
          <button
            className="px-4 py-2 text-sm rounded-md bg-green-600 hover:bg-green-700 text-white disabled:opacity-50"
            onClick={handleConfirmSubscribe}
            disabled={!subscriptionPlan || isCreating}
          >
            تأكيد الاشتراك
          </button>
        </div>
      </div>
    )}

  </div>
</Modal>




         
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <AddingButton type="submit" disabled={updateLoading}>
            حفظ التغييرات
          </AddingButton>
          <CancelButton type="button" onClick={() => navigate('/app/tenant')}>
            إلغاء
          </CancelButton>
        </div>
      </form>
    </SectionBox>
  );
}
