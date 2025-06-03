import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetDepartmentByIdQuery, useUpdateDepartmentMutation } from '../../../api/DepartmentsApi';
import { useGetAllEmployeeQuery } from '../../../api/Employee';
import SectionBox from '../../../components/ui/containers/SectionBox';
import TextInput from '../../../components/reusable_components/TextInput';
import AddingButton from '../../../components/ui/buttons/AddingBtn';
import CancelButton from '../../../components/ui/buttons/CancelBtn';
import Select from 'react-select';
import { toast } from 'react-toastify';

const EditDepartment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useGetDepartmentByIdQuery(id);
  const [updateDepartment, { isLoading: isUpdating }] = useUpdateDepartmentMutation();
  const { data: employeesData } = useGetAllEmployeeQuery({ id: 0 });
  

  const [formData, setFormData] = useState({
    name_ar: '',
    name_en: '',
    description_ar: '',
    description_en: '',
    manager_id: null,
  });

  const [selectedManager, setSelectedManager] = useState(null);

  useEffect(() => {
    if (data?.body) {
      const department = data.body;

      setFormData({
        name_ar: department.translations?.name?.ar || '',
        name_en: department.translations?.name?.en || '',
        description_ar: department.translations?.description?.ar || '',
        description_en: department.translations?.description?.en || '',
        manager_id: department.manager?.id || null,
      });

      setSelectedManager(
        department.manager
          ? { value: department.manager.id, label: department.manager.name }
          : null
      );
    }
  }, [data]);

  const managerOptions = employeesData?.body?.data?.map(emp => ({
    value: emp.id,
    label: emp.name,
  })) || [];
    console.log(managerOptions);
    

    


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();

    const payload = new FormData();
    payload.append('name[ar]', formData.name_ar);
    payload.append('name[en]', formData.name_ar);
    payload.append('description[ar]', formData.description_ar);
    payload.append('description[en]', formData.description_ar);
    if (selectedManager) {
      payload.append('manager_id', selectedManager.value);
    }
    payload.append('_method', 'PUT'); // For Laravel-style APIs

    try {
      const res = await updateDepartment({ id, data: payload }).unwrap();

      toast.success(res?.message || 'تم تعديل القسم بنجاح');
      navigate('/app/department');
    } catch (err) {
      toast.error(err?.data?.message || 'حدث خطأ أثناء تعديل القسم');
      console.error('Error updating department:', err);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <SectionBox className="space-y-6">
      <h1 className="subtitle mb-9">تعديل قسم</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextInput
            name="name_ar"
            label="اسم القسم"
            value={formData.name_ar}
            onChange={handleChange}
          />

        
          <TextInput
            name="description_ar"
            label="الوصف"
            value={formData.description_ar}
            onChange={handleChange}
          />

        

          <div>
            <label className="block mb-2 label-md">المدير المسؤول</label>
            <Select
              options={managerOptions}
              value={selectedManager}
              onChange={setSelectedManager}
              placeholder="اختر المدير"
              isClearable
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <AddingButton type="submit">
            {isUpdating ? 'جاري التحديث...' : 'تحديث القسم'}
          </AddingButton>
          <CancelButton onClick={() => navigate('/app/department')} type="button">
            إلغاء
          </CancelButton>
        </div>
      </form>
    </SectionBox>
  );
};

export default EditDepartment;
