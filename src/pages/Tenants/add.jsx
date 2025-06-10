import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionBox from '../../components/ui/containers/SectionBox';
import TextInput from '../../components/reusable_components/TextInput';
import EmailInput from '../../components/reusable_components/EmailInput';
import PhoneInput from '../../components/reusable_components/PhoneInput';
import AddingButton from '../../components/ui/buttons/AddingBtn';
import CancelButton from '../../components/ui/buttons/CancelBtn';
import Select from 'react-select';
import { toast } from 'react-toastify';

import { useCreateTenantMutation } from '../../api/TenantsApi';
import { useGetAllPlansQuery } from '../../api/PlansApi';
import NewPhoneInput from '../../components/reusable_components/NewPhoneInput';

export default function AddTenant() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    company_name_ar: '',
    company_name_en: '',
    email: '',
    phone: '',
    domain: '',
    active:'1'
  });

const user = JSON.parse(localStorage.getItem('user') || '{}');
const company_id = user?.company_id;

const { data: plansData } = useGetAllPlansQuery({
  // company_id: Number(id), 
  page: 1,
  status: 'active',
});
  
  const planOptions = plansData?.body?.data?.map(plan => ({
    value: plan.id,
    label: plan.name,
  })) || [];

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [createTenant] = useCreateTenantMutation();

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
      is_active: formData.active
    };

    try {
      const res = await createTenant(payload).unwrap();
      toast.success(res?.message || 'تم إنشاء الشركة بنجاح');
      setTimeout(() => navigate('/app/tenant'), 1500);
    } catch (err) {
      toast.error(err?.data?.message || 'حدث خطأ أثناء إنشاء الشركة');
      console.error('Create tenant error:', err);
    }
  };

  return (
    <SectionBox className="space-y-4">
      <h1 className="subtitle mb-9 ">إضافة شركة</h1>
    <form onSubmit={handleSubmit}>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
    <TextInput
      label="اسم الشركة (عربي)"
      name="company_name_ar"
      value={formData.company_name_ar}
      onChange={handleChange}
    />
    <TextInput
      label="اسم الشركة المميز (إنجليزي)"
      name="domain"
      value={formData.domain}
      onChange={handleChange}
      placeholder="يستخدم عند تسجيل الدخول"
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
    <div className="mb-3">
      <label className="block mb-2 label-md">الباقة</label>
      <Select
        value={selectedPlan}
        onChange={setSelectedPlan}
        options={planOptions}
        placeholder="اختر الباقة"
      />
    </div>
  </div>

  {/* 👇 Hint Box Here */}
  <div className="mt-4 p-4 bg-yellow-50 border border-yellow-300 rounded text-yellow-800 text-sm"
  style={{borderRadius: '12px'}}>
    <p className='mb-2'><strong> اسم المستخدم الافتراضي: </strong> admin</p>
    <p><strong>كلمة المرور الافتراضية:</strong> admin</p>
  </div>

  <div className="mt-6 flex justify-end gap-4">
    <AddingButton type="submit">إضافة</AddingButton>
    <CancelButton type="button" onClick={() => navigate('/app/tenant')}>
      إلغاء
    </CancelButton>
  </div>
</form>

    </SectionBox>
  );
}


