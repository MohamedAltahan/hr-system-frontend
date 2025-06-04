import React, { useState } from 'react';
import SectionBox from '../../components/ui/containers/SectionBox';
import AddingButton from '../../components/ui/buttons/AddingBtn';
import CancelButton from '../../components/ui/buttons/CancelBtn';
import TextInput from '../../components/reusable_components/TextInput';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
import ToggleInput from '../../components/reusable_components/ToggleInput';


import { useCreatePlanMutation } from '../../api/PlansApi'; // Adjust API hook

const AddPlan = () => {
 const [formData, setFormData] = useState({
  name: { ar: '' },
  description: { ar: '' },
  currency: { ar: '' },
  features: { ar: [] },
  newFeature: '',
  is_trial: false,
  trial_days: '',
  price: '',
  price_after_discount: '',
  duration_in_months: '',
  is_active: true,
});


  const navigate = useNavigate();
  const [createPlan, { isLoading }] = useCreatePlanMutation();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes('name') || name.includes('description') || name.includes('currency')) {
      const [field, lang] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [field]: { ...prev[field], [lang]: value },
      }));
    } else if (name === 'is_trial' || name === 'is_active' ) {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFeatureChange = (lang, index, value) => {
  setFormData((prev) => {
    const updatedFeatures = [...prev.features[lang]];
    updatedFeatures[index] = value;
    return {
      ...prev,
      features: {
        ...prev.features,
        [lang]: updatedFeatures,
      },
    };
  });
};

const addFeature = () => {
  if (!formData.newFeature.trim()) return;

  setFormData((prev) => ({
    ...prev,
    features: {
      ...prev.features,
      ar: [...prev.features.ar, prev.newFeature],
    },
    newFeature: '',
  }));
};

const removeFeature = (lang, index) => {
  setFormData((prev) => {
    const updated = [...prev.features[lang]];
    updated.splice(index, 1);
    return {
      ...prev,
      features: {
        ...prev.features,
        [lang]: updated,
      },
    };
  });
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToUpload = new FormData();

// Copy Arabic values to English when appending
formDataToUpload.append('name[ar]', formData.name.ar);
formDataToUpload.append('name[en]', formData.name.ar);

formDataToUpload.append('description[ar]', formData.description.ar);
formDataToUpload.append('description[en]', formData.description.ar);

formDataToUpload.append('currency[ar]', formData.currency.ar);
formDataToUpload.append('currency[en]', formData.currency.ar);

formDataToUpload.append('is_trial', formData.is_trial ? '1' : '0');
formDataToUpload.append('trial_days',formData.is_trial ? formData.trial_days : 14);

if (!formData.is_trial) {
  formDataToUpload.append('price', formData.price);
  formDataToUpload.append('price_after_discount', formData.price_after_discount);
  formDataToUpload.append('duration_in_months', formData.duration_in_months);
}

formDataToUpload.append('is_active', formData.is_active ? '1' : '0');

// Arabic features only, but copied to English too
formData.features.ar.forEach((feature) => {
  formDataToUpload.append('features[ar][]', feature);
  formDataToUpload.append('features[en][]', feature);
});


    try {
      const res = await createPlan(formDataToUpload).unwrap();
      toast.success(res?.message || 'تمت إضافة الباقة بنجاح');
      navigate('/app/plans');
    } catch (error) {
      toast.error(error?.data?.message || 'فشل في إضافة الباقة');
    }
  };

  return (
    <SectionBox className="space-y-6">
      <h2 className="text-xl font-bold">إضافة باقة جديدة</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

       <TextInput
  label="اسم الباقة "
  name="name.ar"
  value={formData.name.ar}
  onChange={handleChange}
  required
/>

<TextInput
  label="الوصف "
  name="description.ar"
  value={formData.description.ar}
  onChange={handleChange}
/>
       {formData.is_trial ? (
  <TextInput
    label="أيام التجربة"
    name="trial_days"
    type="number"
    value={formData.trial_days}
    onChange={handleChange}
    required
  />
) : (
  <>
    <TextInput
      label="السعر"
      name="price"
      type="number"
       step="any"  
      value={formData.price}
      onChange={handleChange}
      required
    />
    <TextInput
      label="السعر بعد الخصم"
             step="any"  

      name="price_after_discount"
      type="number"
      value={formData.price_after_discount}
      onChange={handleChange}
    />
    <TextInput
      label="مدة الباقة (شهور)"
      name="duration_in_months"
      type="number"
      value={formData.duration_in_months}
      onChange={handleChange}
      required
    />
  </>
)}


<TextInput
  label="العملة "
  name="currency.ar"
  value={formData.currency.ar}
  onChange={handleChange}
/>


<div className="col-span-2 flex  gap-8 mt-3 mb-5">
  <ToggleInput
    name="is_trial"
    label="باقة تجريبية "
    checked={formData.is_trial}
    onChange={handleChange}
  />
  <ToggleInput
    name="is_active"
    label="نشطة"
    checked={formData.is_active}
    onChange={handleChange}
  />
 
</div>











<div className="col-span-2">
  <label className="block mb-2 font-medium">المميزات</label>

  {/* Existing features */}
  {formData.features.ar.map((feature, index) => (
    <div
      key={index}
      className="flex items-center gap-3 mb-2 feature_row"
    >
      <TextInput
        name={`features_ar_${index}`}
        value={feature}
        onChange={(e) => handleFeatureChange('ar', index, e.target.value)}
        placeholder={`الميزة ${index + 1}`}
        className="flex-1"
                          required={false}

      />
      <button
        type="button"
        onClick={() => removeFeature('ar', index)}
  className="w-6 h-6 flex items-center justify-center rounded-full bg-red-500	hover:bg-red-600	text-white"
      >
        <FiMinus/>
      </button>
    </div>
  ))}

  {/* Add new feature row — SAME STYLE */}
  <div className="flex items-center gap-3 feature_row">
    <TextInput
      name="new_feature_ar"
      value={formData.newFeature}
      onChange={(e) =>
        setFormData((prev) => ({ ...prev, newFeature: e.target.value }))
      }
      placeholder="أدخل ميزة جديدة"
      className="flex-1"
                        required={false}

    />
  <button
  type="button"
  onClick={addFeature}
  className="w-6 h-6 flex items-center justify-center rounded-full bg-emerald-500	hover:bg-emerald-600	text-white"
>
  <FiPlus/>

</button>

  </div>
</div>


      

        <div className="col-span-2 flex justify-end gap-5 mt-5">
          <AddingButton type="submit" variant="main" disabled={isLoading}>
            {isLoading ? 'جاري الإضافة...' : 'إضافة'}
          </AddingButton>
          <CancelButton variant="primary" type="button" onClick={() => navigate('/app/plans')}>
            إلغاء
          </CancelButton>
        </div>

      </form>
    </SectionBox>
  );
};

export default AddPlan;
