import React, { useEffect, useState } from 'react';
import SectionBox from '../../components/ui/containers/SectionBox';
import TextInput from '../../components/reusable_components/TextInput';
import AddingButton from '../../components/ui/buttons/AddingBtn';
import CancelButton from '../../components/ui/buttons/CancelBtn';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useGetProfileQuery, useUpdateProfileMutation } from '../../api/ProfileApi';
import { useTranslation } from "react-i18next";

const ProfileEdit = () => {
    const { t } = useTranslation();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name_ar: '',
    name_en: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
    avatar: null,
  });

  const { data: profileData, isLoading: profileLoading } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  useEffect(() => {
    if (profileData?.body) {
      const { email, phone, translations, avatar } = profileData.body;
      setFormData((prev) => ({
        ...prev,
        name_ar: translations?.name?.ar || '',
        name_en: translations?.name?.en || '',
        email: email || '',
        phone: phone || '',
        avatar: null, // keep null initially so the preview works for new uploads
        currentAvatar: avatar,
        password: '',
        password_confirmation: '',
      }));
    }
  }, [profileData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'avatar' && files?.[0]) {
      setFormData((prev) => ({ ...prev, avatar: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name_ar || !formData.email || !formData.phone) {
        toast.error('يرجى ملء جميع الحقول المطلوبة');
        return;
    }

    if ((formData.password && !formData.password_confirmation) || formData.password !== formData.password_confirmation) {
        toast.error('كلمة المرور وتأكيدها غير متطابقين');
        return;
    }
    console.log('Submitting profile data:', formData);

    const submitData = new FormData();
    submitData.append('name[ar]', formData.name_ar);
    submitData.append('name[en]', formData.name_en);

    submitData.append('email', formData.email);
    submitData.append('phone', formData.phone);
    if (formData.password) submitData.append('password', formData.password);
    if (formData.password_confirmation) submitData.append('password_confirmation', formData.password_confirmation);
    if (formData.avatar) submitData.append('avatar', formData.avatar);

   

try {
  const res = await updateProfile({
    name_ar: formData.name_ar,
    name_en: formData.name_en,
    email: formData.email,
    phone: formData.phone,
    password: formData.password,
    password_confirmation: formData.password_confirmation,
    avatar: formData.avatar,
  }).unwrap();

  toast.success(res?.message || 'تم تحديث الملف الشخصي بنجاح');
  // navigate('/app');
} catch (error) {
  toast.error(error?.data?.message || 'فشل في تحديث الملف الشخصي');
}




    };


  if (profileLoading) return <p>جاري تحميل البيانات...</p>;

  return (
    <SectionBox className="space-y-6">
      <h2 className="text-xl font-bold">{t('edit_profile')}  </h2>
      <form onSubmit={handleSubmit}>
      {/* Avatar and Form Side-by-Side */}
<div className="flex flex-col md:flex-row gap-6 mt-8">
  {/* Avatar - 30% */}
  <div className="w-full md:w-[30%] flex justify-center">
    <label htmlFor="avatar-upload" className="cursor-pointer flex flex-col items-center">
      <div className="relative w-40 h-40 rounded-full overflow-hidden border border-gray-200 hover:border-blue-500 transition duration-300">
        {formData.avatar ? (
          <img
            src={URL.createObjectURL(formData.avatar)}
            alt={t('image')}
            className="w-full h-full object-cover"
          />
        ) : formData.currentAvatar ? (
          <img
            src={formData.currentAvatar}
            alt={t('current_image')}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50">
            <span className="text-2xl">📷</span>
          </div>
        )}
      </div>
      <div className="text-sm text-blue-700 hover:underline mt-2">{t('click_to_choose_image')}</div>
      <input
        id="avatar-upload"
        type="file"
        name="avatar"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
    </label>
  </div>

  {/* Form Fields - 70% */}
  <div className="w-full md:w-[70%] grid grid-cols-1 md:grid-cols-2 gap-4">
    <TextInput label={t('name_ar')} name="name_ar" value={formData.name_ar} onChange={handleChange} />
    <TextInput label={t('name_en')} name="name_en" value={formData.name_en} onChange={handleChange} />
    <TextInput label={t('email')} name="email" value={formData.email} onChange={handleChange} />
    <TextInput label={t('phone')} name="phone" value={formData.phone} onChange={handleChange} />
    <TextInput label={t('password')} name="password" type="password" value={formData.password} onChange={handleChange} required={false} />
    <TextInput label={t('confirm_password')} name="password_confirmation" required={false} type="password" value={formData.password_confirmation} onChange={handleChange} />
  </div>
</div>


        {/* Buttons */}
        <div className="col-span-2 flex justify-end gap-4 mt-5">
          <AddingButton type="submit" disabled={isUpdating}>
            {isUpdating ? t('updating') : t('update')}
          </AddingButton>
          <CancelButton type="button" onClick={() => navigate('/app')}>
            {t('cancel')}
          </CancelButton>
        </div>
      </form>
    </SectionBox>
  );
};

export default ProfileEdit;
