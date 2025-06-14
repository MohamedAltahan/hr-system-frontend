import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionBox from '../../components/ui/containers/SectionBox';
import TextInput from '../../components/reusable_components/TextInput';
import EmailInput from '../../components/reusable_components/EmailInput';
import NewPhoneInput from '../../components/reusable_components/NewPhoneInput';
import AddingButton from '../../components/ui/buttons/AddingBtn';
import CancelButton from '../../components/ui/buttons/CancelBtn';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';


import { useCreateTenantMutation } from '../../api/TenantsApi';
import { useGetAllPlansQuery } from '../../api/PlansApi';

export default function AddTenant() {
        const { t } = useTranslation();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    company_name_ar: '',
    company_name_en: '',
    email: '',
    phone: '',
    domain: '',
    active: '1',
    trial_days: '',
  });

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const company_id = user?.company_id;

  const { data: plansData } = useGetAllPlansQuery({
    page: 1,
    status: 'active',
  });

  const planOptions = plansData?.body?.data?.map(plan => ({
    value: plan.id,
    label: plan.name,
  })) || [];

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [createTenant, { isLoading }] = useCreateTenantMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      company_name: {
        ar: formData.company_name_ar,
        en: formData.company_name_ar,
      },
      email: formData.email,
      phone: formData.phone,
      domain: formData.domain,
      plan_id: selectedPlan?.value,
      is_active: formData.active,
      trial_days: formData.trial_days,
    };

    try {
      const res = await createTenant(payload).unwrap();
      toast.success(res?.message || 'تم إنشاء الشركة بنجاح');
      navigate('/app/tenant');
    } catch (err) {
      toast.error(err?.data?.message || 'حدث خطأ أثناء إنشاء الشركة');
      console.error('Create tenant error:', err);
    }
  };

  return (
    <SectionBox className="space-y-4">
      <h1 className="subtitle mb-9">{t('add_tenant')} </h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
  <TextInput
    label={t("company_name_ar")}
    name="company_name_ar"
    value={formData.company_name_ar}
    onChange={handleChange}
  />
  <TextInput
    label={t("domain")}
    name="domain"
    value={formData.domain}
    onChange={handleChange}
    placeholder={t("domain_placeholder")}
  />
  <EmailInput
    label={t("email")}
    name="email"
    value={formData.email}
    onChange={handleChange}
  />
  <NewPhoneInput
    label={t("phone")}
    name="phone"
    value={formData.phone}
    onChange={handleChange}
  />
 <TextInput
    label={t("num_trial_days")}
    name="trial_days"
    value={formData.trial_days}
    onChange={handleChange}
  />

  {/* <div className="mb-3">
    <label className="block mb-2 label-md">{t("plan")}</label>
    <Select
      value={selectedPlan}
      onChange={setSelectedPlan}
      options={planOptions}
      placeholder={t("select_plan")}
      isDisabled={isLoading}
    />
  </div> */}
</div>


        {/* Hint box */}
     <div
  className="mt-4 p-4 bg-yellow-50 border border-yellow-300 rounded text-yellow-800 text-sm"
  style={{ borderRadius: '12px' }}
>
  <p className="mb-2">
    <strong>{t('default_username')}:</strong> admin
  </p>
  <p>
    <strong>{t('default_password')}:</strong> admin
  </p>
</div>

{/* Buttons */}
<div className="mt-6 flex justify-end gap-4">
  <AddingButton type="submit" disabled={isLoading}>
    {isLoading ? t('adding') : t('add')}
  </AddingButton>
  <CancelButton
    type="button"
    onClick={() => navigate('/app/tenant')}
    disabled={isLoading}
  >
    {t('cancel')}
  </CancelButton>
</div>

      </form>
    </SectionBox>
  );
}
