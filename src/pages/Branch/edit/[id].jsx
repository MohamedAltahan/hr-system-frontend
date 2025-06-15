import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetBranchByIdQuery, useUpdateBranchMutation } from '../../../api/Branches';
import SectionBox from '../../../components/ui/containers/SectionBox';
import AddingBtn from '../../../components/ui/buttons/AddingBtn';
import CancelButton from '../../../components/ui/buttons/CancelBtn';
import TextInput from '../../../components/reusable_components/TextInput';
import Toggle from '../../../components/reusable_components/ToggleInput';
import { toast } from 'react-toastify';
import { t } from 'i18next';


const EditBranch = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: branchData, isLoading: isFetching } = useGetBranchByIdQuery(+id);
  const [updateBranch, { isLoading }] = useUpdateBranchMutation();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    phone: '',
    is_active: 1,
  });

  useEffect(() => {
    if (branchData?.body) {
      const b = branchData.body;
      setFormData({
        name: b.name || '',
        description: b.description || '',
        address: b.address || '',
        phone: b.phone || '',
        is_active: b.is_active ? 1 : 0,
      });
    }
  }, [branchData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleToggle = (value) => {
    setFormData(prev => ({ ...prev, is_active: value ? 1 : 0 }));
  };
const handleSubmit = async (e) => {
  e.preventDefault();
    const payload = new FormData();
    payload.append('name_ar', formData.name);
    payload.append('name_en', formData.name);
    payload.append('description[ar]', formData.description);
    payload.append('description[en]', formData.description);
    payload.append('address[ar]', formData.address);
    payload.append('address[en]', formData.address);
    payload.append('phone', formData.phone);
    payload.append('is_active', String(formData.is_active));



   try {
      const res =    await updateBranch({ id: +id, formData: payload }).unwrap();

      toast.success(res?.message || 'Branch edited successfully');
      navigate('/app/branch');
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to edit branch');
    }

};


  return (
    <SectionBox title="تعديل فرع">
              <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

        <TextInput
          label={t('name')}
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <TextInput
          label={t('description')}
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <TextInput
          label={t('address')}
          name="address"
          value={formData.address}
          onChange={handleChange}
        />

        <TextInput
          label={t('phone')}
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <Toggle
          label={t('status')}
          checked={formData.is_active === 1}
          onChange={handleToggle}
        />

        <div className="flex justify-end gap-4">
                    <AddingBtn type="submit" isLoading={isLoading}>{t('edit')}</AddingBtn>

          <CancelButton onClick={() => navigate('/app/branch')} type="button">{t('cancel')}</CancelButton>
        </div>
      </form>
    </SectionBox>
  );
};

export default EditBranch;
