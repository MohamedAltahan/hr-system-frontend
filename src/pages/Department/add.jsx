import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionBox from '../../components/ui/containers/SectionBox';
import TextInput from '../../components/reusable_components/TextInput';
import AddingButton from '../../components/ui/buttons/AddingBtn';
import CancelButton from '../../components/ui/buttons/CancelBtn';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';

import { useGetAllEmployeeQuery } from '../../api/Employee';
import { useCreateDepartmentMutation } from '../../api/DepartmentsApi';

export default function AddDepartment() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name_ar: '',
    name_en: '',
    description_ar: '',
    description_en: '',
    manager_id: null,
  });

  const { data: employeesData } = useGetAllEmployeeQuery({ id: 0 });
  const managerOptions = employeesData?.body?.data?.map(emp => ({
    value: emp.id,
    label: emp.name,
  })) || [];

  const [selectedManager, setSelectedManager] = useState(null);
  const [createDepartment] = useCreateDepartmentMutation();

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

    try {
      const res = await createDepartment(payload).unwrap();
      toast.success(res?.message || 'تمت إضافة القسم بنجاح');
      navigate('/app/department');
    } catch (err) {
      toast.error(err?.data?.message || 'حدث خطأ أثناء إضافة القسم');
      console.error('Error creating department:', err);
    }
  };

  return (
    <SectionBox className="space-y-6">
      <h1 className="subtitle mb-6">{t('add_department')} </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextInput
            name="name_ar"
            label={t('department_name')}
            value={formData.name_ar}
            onChange={handleChange}
          />
          {/* <TextInput
            name="name_en"
            label="اسم القسم (إنجليزي)"
            value={formData.name_en}
            onChange={handleChange}
          /> */}
          <TextInput
            name="description_ar"
            label={t('description')}
            value={formData.description_ar}
            onChange={handleChange}
          />
          {/* <TextInput
            name="description_en"
            label="وصف القسم (إنجليزي)"
            value={formData.description_en}
            onChange={handleChange}
          /> */}
          <div>
            <label className="block mb-2 label-md"> {t('responsable_manager')} </label>
            <Select
              options={managerOptions}
              value={selectedManager}
              onChange={setSelectedManager}
              placeholder={t('select_manager')}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <AddingButton type="submit">{t('add')}</AddingButton>
          <CancelButton onClick={() => navigate('/app/department')}>{t('cancel')}</CancelButton>
        </div>
      </form>
    </SectionBox>
  );
}
