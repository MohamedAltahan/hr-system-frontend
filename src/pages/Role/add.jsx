import React, { useState } from 'react';
import SectionBox from '../../components/ui/containers/SectionBox';
import AddingButton from '../../components/ui/buttons/AddingBtn';
import TextInput from '../../components/reusable_components/TextInput';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import CancelButton from '../../components/ui/buttons/CancelBtn';
import { useCreateRoleMutation } from '../../api/RolesApi';
import { useGetAllPermissionsQuery } from '../../api/PermissionsApi';
import { useTranslation } from 'react-i18next';

const AddRole = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    title: { ar: '', en: '' },
    name: '',
    permissions: [] ,
  });

  const navigate = useNavigate();
  const [addRole, { isLoading }] = useCreateRoleMutation();

  // Fetch permissions list
  const {
    data: permissionsData,
    isLoading: permissionsLoading,
    error: permissionsError,
  } = useGetAllPermissionsQuery({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'title_ar') {
      setFormData((prev) => ({
        ...prev,
        title: {
          ...prev.title,
          ar: value,
        },
      }));
    } else if (name === 'title_en') {
      setFormData((prev) => ({
        ...prev,
        title: {
          ...prev.title,
          en: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Toggle permission selection
  const handlePermissionToggle = (permissionId) => {
    setFormData((prev) => {
      const exists = prev.permissions.includes(permissionId);
      if (exists) {
        return {
          ...prev,
          permissions: prev.permissions.filter((id) => id !== permissionId),
        };
      } else {
        return {
          ...prev,
          permissions: [...prev.permissions, permissionId],
        };
      }
    });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.ar || !formData.name) {
      toast.error(t('please_fill_all_fields'));
      return;
    }

    if (formData.permissions.length === 0) {
      toast.error(t('please_select_at_least_one_permission'));
      return;
    }

    const formDataToUpload = new FormData();
    formDataToUpload.append('title[ar]', formData.title.ar);
    formDataToUpload.append('title[en]', formData.title.ar); 
    formDataToUpload.append('name', formData.name);

    formData.permissions.forEach((permId) => {
      formDataToUpload.append('permission_Ids[]', permId.toString());
    });

    try {
      const res = await addRole(formDataToUpload).unwrap();
      toast.success(res?.message || 'تمت إضافة الدور بنجاح');
      navigate('/app/role');
    } catch (error) {
      toast.error(error?.data?.message || 'فشل في إضافة الدور');
    }
  };

  if (permissionsLoading) return <SectionBox className="space-y-6"><p>{t('loading')} </p></SectionBox> ;

  // Group permissions by group key
  const groupedPermissions = permissionsData?.body?.reduce((groups, permission) => {
    const group = permission.group || 'other';
    if (!groups[group]) groups[group] = [];
    groups[group].push(permission);
    return groups;
  }, {}) || {};


  const handleGroupToggle = (groupPermissions) => {
  const allSelected = groupPermissions.every(p =>
    formData.permissions.includes(p.id)
  );

  setFormData((prev) => ({
    ...prev,
    permissions: allSelected
      ? prev.permissions.filter(id => !groupPermissions.some(p => p.id === id)) // Deselect all
      : [...new Set([...prev.permissions, ...groupPermissions.map(p => p.id)])] // Select all
  }));
};


  return (
    <SectionBox className="space-y-6">
      <h2 className="text-xl font-bold">{t('add_role')} </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <TextInput
          label={t('name_ar')}
          name="title_ar"
          value={formData.title.ar}
          onChange={handleChange}
          required
        />


        <TextInput
          label={t('name_en')}
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <h2 className="col-span-2  mb-1 mt-5 text-[#131313]" style={{ fontSize: '14px', fontWeight: '600', fontFamily: 'Cairo' }}> {t('select_permissions')} </h2>

      <div className="col-span-2 overflow-y-auto grid grid-cols-1 gap-6 space-y-0" style={{boxShadow:"box-shadow: 0px 0px 2px 0px #00000040;"}}>
  {Object.entries(groupedPermissions).map(([groupName, permissions]) => (
    <div
      key={groupName}
      className="bg-white border border-gray-200"
        style={{ borderRadius: '10px', overflow: 'hidden' }}
    >
   <div className="flex items-center justify-between p-4  " style={{borderBottom: '1px solid #1515151A'}}>
    <h3 className="font-bold capitalize">{groupName}</h3>
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={permissions.every(p => formData.permissions.includes(p.id))}
        onChange={() => handleGroupToggle(permissions)}
        className="w-5 h-5"
      />
      <label className="" style={{ fontSize: '14px', fontWeight: '400', fontFamily: 'Cairo' }}> {t('select_all')} </label>
    </div>
  </div>
      {/* Change here: grid with 2 columns */}
      <div className="grid grid-cols-3 gap-3 p-4">
        {permissions.map((permission) => (
          <div key={permission.id} className="flex items-center">
            <input
              type="checkbox"
              checked={formData.permissions.includes(permission.id)}
              onChange={() => handlePermissionToggle(permission.id)}
              className="w-5 h-5"
            />
            <label className="mr-2  ml-2 permission_title" style={{ fontSize: '14px', fontWeight: '400', fontFamily: 'Cairo' }}>
              {permission.title || permission.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  ))}
</div>




        <div className="col-span-2 flex justify-end gap-5 mt-5">
          <AddingButton type="submit" variant="main" disabled={isLoading}>
            {isLoading ? t('adding') : t('add')}
          </AddingButton>

          <CancelButton
            variant="primary"
            type="button"
            onClick={() => navigate('/app/role')}
          >
            {t('cancel')}
          </CancelButton>
        </div>
      </form>
    </SectionBox>
  );
};

export default AddRole;
