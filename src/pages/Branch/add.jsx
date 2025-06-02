import React, { useState } from 'react';
import { useCreateBranchMutation } from '../../api/Branches';
import SectionBox from '../../components/ui/containers/SectionBox';
import AddingButton from '../../components/ui/buttons/AddingBtn';
import TextInput from '../../components/Reusable Component/TextInput';
import ToggleInput from '../../components/Reusable Component/ToggleInput';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import TextAreaInput from '../../components/Reusable Component/TextAreaInput';
import CancelButton from '../../components/ui/buttons/CancelBtn';
import NewPhoneInput from '../../components/Reusable Component/NewPhoneInput';

const AddBranch = () => {
  const [formData, setFormData] = useState({
    name: { ar: '', en: '' },
    description: { ar: '', en: '' },
    address: { ar: '', en: '' },
    phone: '',
    is_active: 1,
  });

  const navigate = useNavigate();
  const [addBranch, { isLoading }] = useCreateBranchMutation();

const handleChange = (e) => {
  const { name, value, type, checked } = e.target;

  if (name.includes('_ar')) {
    const key = name.split('_')[0];
    setFormData((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        ar: value,
        en: value,
      },
    }));
  } else if (type === 'checkbox') {
    // Convert boolean to 1 or 0
    setFormData((prev) => ({
      ...prev,
      [name]: checked ? 1 : 0,
    }));
  } else {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();

 const formDataToUpload = new FormData();
formDataToUpload.append('name[ar]', formData.name.ar);
formDataToUpload.append('name[en]', formData.name.en);
formDataToUpload.append('description[ar]', formData.description.ar);
formDataToUpload.append('description[en]', formData.description.en);
formDataToUpload.append('address[ar]', formData.address.ar);
formDataToUpload.append('address[en]', formData.address.en);
formDataToUpload.append('phone', formData.phone);
formDataToUpload.append('is_active', formData.is_active);





    try {
      const res = await addBranch(formDataToUpload).unwrap();
      toast.success(res?.message || 'Branch added successfully');
      navigate('/app/branch');
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to add branch');
    }
  };

  return (
    <SectionBox className="space-y-6">
      <h2 className="text-xl font-bold">إضافة فرع جديد</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <TextInput
          label="الاسم"
          name="name_ar"
          value={formData.name.ar}
          onChange={handleChange}
        />
        <TextInput
          label="الوصف"
          name="description_ar"
          value={formData.description.ar}
          onChange={handleChange}
        />

        <TextInput
          label="العنوان"
          name="address_ar"
          value={formData.address.ar}
          onChange={handleChange}
        />

        <NewPhoneInput
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          label="رقم الهاتف"
          name="phone"
          className="w-full"
        />

        

        <ToggleInput
          label="الحالة"
          name="is_active"
  checked={formData.is_active === 1}
          onChange={handleChange}
        />

        <div className="col-span-2 flex justify-end gap-5">
          <AddingButton type="submit" variant="main" disabled={isLoading}>
            {isLoading ? 'جاري الإضافة...' : 'إضافة'}
          </AddingButton>

          <CancelButton
            variant="primary"
            type="button"
            onClick={() => navigate('/app/branch')}
          >
            إلغاء
          </CancelButton>
        </div>
      </form>
    </SectionBox>
  );
};

export default AddBranch;
