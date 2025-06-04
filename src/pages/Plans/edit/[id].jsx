import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SectionBox from '../../../components/ui/containers/SectionBox';
import TextInput from '../../../components/reusable_components/TextInput';
import ToggleInput from '../../../components/reusable_components/ToggleInput';
import AddingButton from '../../../components/ui/buttons/AddingBtn';
import CancelButton from '../../../components/ui/buttons/CancelBtn';
import { toast } from 'react-toastify';
import { FiMinus, FiPlus } from 'react-icons/fi';

import { useGetPlanByIdQuery, useUpdatePlanMutation } from '../../../api/PlansApi';

const EditPlan = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: planData, isLoading: isFetching } = useGetPlanByIdQuery(id);
  const [updatePlan, { isLoading: isSubmitting }] = useUpdatePlanMutation();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    currency: '',
    features: [],
    newFeature: '',
    is_trial: false,
    trial_days: '',
    price: '',
    price_after_discount: '',
    duration_in_months: '',
    is_active: true,
  });

  // Prefill data
useEffect(() => {

  if (planData?.body) {
    const plan = planData.body;
    setFormData({
      name: plan.name || '',
      description: plan.description || '',
      currency: plan.currency || '',
      features: plan.features || [],
      newFeature: '',
      is_trial: !!+plan.is_trial,
      trial_days: plan.trial_days || '',
      price: plan.price || '',
      price_after_discount: plan.price_after_discount || '',
      duration_in_months: plan.duration_in_months || '',
      is_active: !!+plan.is_active,
    });
  }
}, [planData]);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFeatureChange = (index, value) => {
    setFormData((prev) => {
      const updatedFeatures = [...prev.features];
      updatedFeatures[index] = value;
      return { ...prev, features: updatedFeatures };
    });
  };

  const addFeature = () => {
    if (!formData.newFeature.trim()) return;
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, prev.newFeature],
      newFeature: '',
    }));
  };

  const removeFeature = (index) => {
    setFormData((prev) => {
      const updated = [...prev.features];
      updated.splice(index, 1);
      return { ...prev, features: updated };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToUpload = new FormData();

    formDataToUpload.append('name[ar]', formData.name);
    formDataToUpload.append('name[en]', formData.name);
    formDataToUpload.append('description[ar]', formData.description);
    formDataToUpload.append('description[ar]]en]', formData.description);
    formDataToUpload.append('currency[ar]', formData.currency);
    formDataToUpload.append('currency[en]', formData.currency);

    formDataToUpload.append('is_trial', formData.is_trial ? '1' : '0');
    formDataToUpload.append('trial_days', formData.is_trial ? formData.trial_days : 14);

    if (!formData.is_trial) {
      formDataToUpload.append('price', formData.price);
      formDataToUpload.append('price_after_discount', formData.price_after_discount);
      formDataToUpload.append('duration_in_months', formData.duration_in_months);
    }
formDataToUpload.append('_method', 'PUT');
    formDataToUpload.append('is_active', formData.is_active ? '1' : '0');

    formData.features.forEach((feature) => {
      formDataToUpload.append('features[]', feature);
    });

    try {
      const res = await updatePlan({ id, formData: formDataToUpload }).unwrap();
      toast.success(res?.message || 'تم تعديل الباقة بنجاح');
      navigate('/app/plans');
    } catch (error) {
      toast.error(error?.data?.message || 'فشل في تعديل الباقة');
    }
  };

  return (
    <SectionBox className="space-y-6">
      <h2 className="text-xl font-bold">تعديل الباقة</h2>
      {isFetching ? (
        <p>جاري تحميل بيانات الباقة...</p>
      ) : (
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        
          <TextInput
            label="اسم الباقة"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <TextInput
            label="الوصف"
            name="description"
            value={formData.description}
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
                value={formData.price}
                onChange={handleChange}
                       step="any"  

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
            label="العملة"
            name="currency"
            value={formData.currency}
            onChange={handleChange}
          />

          <div className="col-span-2 flex gap-8 mt-3 mb-5">
            <ToggleInput
              name="is_trial"
              label="باقة تجريبية"
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

          {/* Features */}
          <div className="col-span-2">
            <label className="block mb-2 font-medium">المميزات</label>

            {formData.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 mb-2 feature_row">
                <TextInput
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  placeholder={`الميزة ${index + 1}`}
                  className="flex-1"
                  required={false}
                />
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="w-6 h-6 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white"
                >
                  <FiMinus />
                </button>
              </div>
            ))}

            <div className="flex items-center gap-3 feature_row">
              <TextInput
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
                className="w-6 h-6 flex items-center justify-center rounded-full bg-emerald-500 hover:bg-emerald-600 text-white"
              >
                <FiPlus />
              </button>
            </div>
          </div>

          <div className="col-span-2 flex justify-end gap-5 mt-5">
            <AddingButton type="submit" variant="main" disabled={isSubmitting}>
              {isSubmitting ? 'جاري التعديل...' : 'تعديل'}
            </AddingButton>
            <CancelButton type="button" onClick={() => navigate('/app/plans')}>
              إلغاء
            </CancelButton>
          </div>
        </form>
      )}
    </SectionBox>
  );
};

export default EditPlan;
