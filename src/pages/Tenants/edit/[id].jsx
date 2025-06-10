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

  // Fetch plans
  const { data: allPlansData } = useGetAllPlansQuery({ page: 1, status: 'active' });
  const { data: companyPlansData } = useGetAllPlansQuery({ page: 1, status: 'active', company_id: id });

  const [updateTenant, { isLoading: updateLoading }] = useUpdateTenantMutation();
  const [assignPlanToTenant, { isLoading: assigning }] = useAssignPlanToTenantMutation();
  const [createSubscription, { isLoading: isCreating }] = useCreateSubscriptionMutation();

  const assignPlanOptions = useMemo(() => {
    return allPlansData?.body?.data?.map(plan => ({
      value: plan.id,
      label: plan.name,
    })) || [];
  }, [allPlansData]);

  const subscribePlanOptions = useMemo(() => {
    return companyPlansData?.body?.data?.map(plan => ({
      value: plan.id,
      label: plan.name,
    })) || [];
  }, [companyPlansData]);

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

  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [tempSelectedPlan, setTempSelectedPlan] = useState(null);
  const [showSubscribeSelect, setShowSubscribeSelect] = useState(false);
  const [subscriptionPlan, setSubscriptionPlan] = useState(null);

  useEffect(() => {
    if (tenantData?.body) {
      const tenant = tenantData.body;

      setFormData({
        company_name_ar: tenant.company_name || '',
        company_name_en: tenant.company_name || '',
        email: tenant.email || '',
        phone: tenant.phone || '',
        domain: tenant.domain || '',
        is_active: tenant.is_active ?? 1,
      });

      const planOption = assignPlanOptions.find(p => p.value === tenant.plan?.id);
      if (planOption) {
        setSelectedPlan(planOption);
      } else if (tenant.plan) {
        setSelectedPlan({
          value: tenant.plan.id,
          label: tenant.plan.name,
        });
      } else {
        setSelectedPlan(null);
      }
    }
  }, [tenantData, assignPlanOptions]);

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
      setShowSubscribeSelect(true); // show subscription input after success
    } catch (err) {
      toast.error(err?.data?.message || 'فشل تعيين الباقة');
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
    } catch (err) {
      toast.error(err?.data?.message || 'فشل الاشتراك في الباقة');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value,
    }));
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
    }
  };

  if (tenantLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <SectionBox className="space-y-4">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-between mb-9">
          <h1 className="subtitle">تعديل شركة</h1>
          <div style={{ position: 'absolute', insetInlineEnd: '0' }}>
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
            label="اسم الشركة"
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

          <button
          style={{width:'fit-content'}}
            type="button"
            onClick={handleOpenPlanModal}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700"
          >
            <DollarSign className="w-4 h-4" />
            تحديد السعر
          </button>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <AddingButton type="submit" disabled={updateLoading}>حفظ التغييرات</AddingButton>
          <CancelButton type="button" onClick={() => navigate('/app/tenant')}>إلغاء</CancelButton>
        </div>
      </form>

      {/* Plan Modal */}
      <Modal isOpen={isPlanModalOpen} onClose={() => {
        setIsPlanModalOpen(false);
        setShowSubscribeSelect(false);
        setSubscriptionPlan(null);
      }} title="تحديد السعر">
        <div className="space-y-6 px-2 py-1">
          <Select
            value={tempSelectedPlan}
            onChange={setTempSelectedPlan}
            options={assignPlanOptions}
            placeholder="اختر الباقة"
            isSearchable
            isDisabled={assigning}
            className="text-right"
          />

          <div className="flex justify-end gap-4 pt-4">
            {/* <button
              className="px-4 py-2 text-sm rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 border"
              onClick={() => {
                setIsPlanModalOpen(false);
                setShowSubscribeSelect(false);
                setSubscriptionPlan(null);
              }}
            >
              إلغاء
            </button> */}

            <button
              className="px-4 py-2 text-sm rounded-md bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50"
              onClick={handleAssignPlan}
              disabled={assigning || !tempSelectedPlan}
            >
              تأكيد التعيين
            </button>
          </div>

          {showSubscribeSelect && (
            <div className="mt-6 border-t pt-6">
              <label className="block mb-2 label-md">الاشتراك في باقة</label>
              <Select
                value={subscriptionPlan}
                onChange={setSubscriptionPlan}
                options={subscribePlanOptions}
                placeholder="اختر باقة للاشتراك"
                isSearchable
                isDisabled={isCreating}
                className="text-right"
              />
              <div className="flex justify-end pt-4">
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
    </SectionBox>
  );
}

