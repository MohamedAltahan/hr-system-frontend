import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SectionBox from '../../../components/ui/containers/SectionBox';
import TextInput from '../../../components/reusable_components/TextInput';
import AddingButton from '../../../components/ui/buttons/AddingBtn';
import CancelButton from '../../../components/ui/buttons/CancelBtn';
import { toast } from 'react-toastify';
import { useUpdateRoleMutation, useGetRoleByIdQuery } from '../../../api/RolesApi';
import { useGetAllPermissionsQuery } from '../../../api/PermissionsApi';
import { useTranslation } from 'react-i18next';

const EditRole = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: { ar: '', en: '' },
    name: '',
    permissions: [],
  });

  const { data: roleData, isLoading: roleLoading } = useGetRoleByIdQuery(id);
  const { data: permissionsData } = useGetAllPermissionsQuery({});


  const [updateRole, { isLoading: isUpdating }] = useUpdateRoleMutation();

  // Populate form with fetched role data
  useEffect(() => {
    if (roleData?.body) {
const { title, name, permissions, translation } = roleData.body;
setFormData({
  title: {
    ar: translation?.title?.ar || '',
    en: translation?.title?.en || '',
  },
  name: name || '',
  permissions: permissions?.map(p => p.id) || [],
});


    }
  }, [roleData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'title_ar') {
      setFormData(prev => ({
        ...prev,
        title: { ...prev.title, ar: value },
      }));
    } else if (name === 'title_en') {
      setFormData(prev => ({
        ...prev,
        title: { ...prev.title, en: value },
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePermissionToggle = (permissionId) => {
    setFormData(prev => {
      const exists = prev.permissions.includes(permissionId);
      return {
        ...prev,
        permissions: exists
          ? prev.permissions.filter(id => id !== permissionId)
          : [...prev.permissions, permissionId],
      };
    });
  };

  const handleGroupToggle = (groupPermissions) => {
    const allSelected = groupPermissions.every(p => formData.permissions.includes(p.id));
    setFormData(prev => ({
      ...prev,
      permissions: allSelected
        ? prev.permissions.filter(id => !groupPermissions.some(p => p.id === id))
        : [...new Set([...prev.permissions, ...groupPermissions.map(p => p.id)])],
    }));
  };

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

    const payload = new FormData();
    payload.append('title[ar]', formData.title.ar);
payload.append('title[en]', formData.title.ar);
payload.append('_method', 'PUT');
    payload.append('name', formData.name);
    formData.permissions.forEach(id => {
      payload.append('permission_Ids[]', id);
    });

    try {
      const res = await updateRole({ id, body: payload }).unwrap();
      toast.success(res?.message || 'تم تحديث الدور بنجاح');
      navigate('/app/role');
    } catch (err) {
      toast.error(err?.data?.message || 'فشل في تحديث الدور');
    }
  };

  

const groupedPermissions = permissionsData?.body?.reduce((acc, perm) => {
  const group = perm.group || 'other';
  if (!acc[group]) acc[group] = [];
  acc[group].push(perm);
  return acc;
}, {}) || {};

console.log("permissionsData", permissionsData);



    if (roleLoading) return     <SectionBox className="space-y-6">
 <p> {t('loading')} </p> </SectionBox>;
  return (
    <SectionBox className="space-y-6">
      <h2 className="text-xl font-bold"> {t('edit_role')} </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <TextInput
          label={t('name_ar')}
          name="title_ar"
          value={formData.title.ar}
          onChange={handleChange}
        />
       
        <TextInput
          label={t('name_en')}
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <h2 className="col-span-2 text-[#131313] font-semibold mt-6"> {t('select_permissions')} </h2>
        

        <div className="col-span-2 grid grid-cols-1 gap-4 overflow-y-auto">
{permissionsData?.body && Object.entries(groupedPermissions).map(([groupName, permissions]) => (

            <div key={groupName} className="bg-white border rounded-md shadow-sm">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="font-bold capitalize">{groupName}</h3>
                <label className="flex items-center gap-2" style={{ fontSize: '14px', fontWeight: '400', fontFamily: 'Cairo' }}>
                  
                  <input
                    type="checkbox"
                    checked={permissions.every(p => formData.permissions.includes(p.id))}
                    onChange={() => handleGroupToggle(permissions)}
                    className="w-5 h-5"
                  />
                  {t('select_all')} 
                </label>
              </div>
              
              <div className="grid grid-cols-3 gap-3 p-4">
                {permissions.map((perm) => (
                  <label key={perm.id} className="flex items-center gap-2 mr-2 ml-2" style={{ fontSize: '14px', fontWeight: '400', fontFamily: 'Cairo' }}>
                    <input
                      type="checkbox"
                      checked={formData.permissions.includes(perm.id)}
                      onChange={() => handlePermissionToggle(perm.id)}
                      className="w-5 h-5"
                    />
                    {perm.title || perm.name}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="col-span-2 flex justify-end gap-4 mt-5">
          <AddingButton type="submit" disabled={isUpdating}>
            {isUpdating ? t('updating') : t('update')}
          </AddingButton>
          <CancelButton type="button" onClick={() => navigate('/app/role')}>
            {t('cancel')}
          </CancelButton>
        </div>
      </form>
    </SectionBox>
  );
};

export default EditRole;
