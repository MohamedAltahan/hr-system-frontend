import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SectionBox from "../../../components/ui/containers/SectionBox";
import TextInput from '../../../components/reusable_components/TextInput';
import EmailInput from '../../../components/reusable_components/EmailInput';
import NewPhoneInput from "../../../components/reusable_components/NewPhoneInput";
import AddingButton from "../../../components/ui/buttons/AddingBtn";
import CancelButton from '../../../components/ui/buttons/CancelBtn';
import { toast } from 'react-toastify';
import Select from 'react-select';
import {
  useGetEmployeeByIdQuery,
  useUpdateEmployeeMutation,
  useGetAllEmployeeQuery
} from '../../../api/Employee';
import { useGetAllRolesQuery } from '../../../api/rolesApi';
import { useGetAllAttendanceRulesQuery } from '../../../api/AttendanceRulesApi';

import { useGetAllbranchesQuery } from '../../../api/Branches';
import { useGetAllDepartmentsQuery } from '../../../api/DepartmentsApi';
import { useGetAllPositionsQuery } from '../../../api/positionsApi';
import { useGetAllJobTitlesQuery } from '../../../api/jobTitlesApi';
import { useTranslation } from 'react-i18next';



export default function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams();
      const { t } = useTranslation();
  const genderOptions = [
  { value: 'male', label: t('male') },
  { value: 'female', label: t('female') },
];

const socialStatusOptions = [
  { value: 'single', label: t('single') },
  { value: 'married', label: t('married') },
];

const statusOptions = [
  { value: 1, label: t('active') },
  { value: 0, label: t('inactive') },
];

  const [formData, setFormData] = useState({
    name_ar: '',
    name_en: '',
    email: '',
    phone: '',
    address_ar: '',
    address_en: '',
    username: '',
    password: '',
    hireDate: '',
    birthday: '',
    national_id: '',
    gender: '',
    social_status: '',
    is_active: 1,
    direct_manager_id: '',
    avatar: null,
      salary: '',
  start_date: '',
  end_date: '',
  });
const [selectedAttendanceRule, setSelectedAttendanceRule] = useState(null);

  const { data: branchsData } = useGetAllbranchesQuery({ id: 0 });
  const { data: managerData } = useGetAllEmployeeQuery({ id: 0 });
  const { data: departmentData } = useGetAllDepartmentsQuery({ id: 0 });
  const { data: positionsData } = useGetAllPositionsQuery({ id: 0 });
  const { data: jobTitlesData } = useGetAllJobTitlesQuery({ id: 0 });
  const { data, isLoading } = useGetEmployeeByIdQuery(Number(id));


  const { data: rolesData } = useGetAllRolesQuery({ id: 0 });
  
const roleOptions = rolesData?.body?.map(role => ({
  value: role.id,
  label: role.title || role.name, // use translated title if needed
})) || [];


const { data: attendanceRulesData } = useGetAllAttendanceRulesQuery({ id: 0 });

const attendanceRuleOptions = useMemo(
  () => attendanceRulesData?.body?.data?.map(rule => ({
    value: rule.id,
    label: rule.name,
  })) || [],
  [attendanceRulesData]
);



// This assumes the employee's current roles come in a field like `employee.role_ids` or `employee.roles`
const [selectedRoles, setSelectedRoles] = useState([]);

  const [editEmployee] = useUpdateEmployeeMutation();

const managerOptions = useMemo(
  () => managerData?.body?.data?.map(m => ({
    value: m.id,
    label: m.name, // use name directly
  })) || [],
  [managerData]
);



const branchOptions = useMemo(
  () => branchsData?.body?.data?.map(b => ({ value: b.id, label: b.name })) || [],
  [branchsData]
);

const departmentOptions = useMemo(
  () => departmentData?.body?.data?.map(d => ({ value: d.id, label: d.name })) || [],
  [departmentData]
);

const positionOptions = useMemo(
  () => positionsData?.body?.data?.map(p => ({ value: p.id, label: p.name })) || [],
  [positionsData]
);

const jobTitleOptions = useMemo(
  () => jobTitlesData?.body?.data?.map(j => ({ value: j.id, label: j.name })) || [],
  [jobTitlesData]
);


  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [selectedJobTitle, setSelectedJobTitle] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedManager, setSelectedManager] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(statusOptions[0]);
  const [selectedSocialStatus, setSelectedSocialStatus] = useState(null);

useEffect(() => {
  if (data?.body) {
    const employee = data.body;

    setFormData({
      name_ar: employee?.translations.name?.ar || '',
      name_en: employee?.translations.name?.en || '',
      email: employee.email || '',
      phone: employee.phone || '',
      address_ar: employee?.translations.address?.ar || '',
      address_en: employee?.translations.address?.en || '',
      username: employee.username || '',
      password: '',
      hireDate: employee.hire_date || '',
      birthday: employee.birthday || '',
      national_id: employee.national_id || '',
      gender: employee.gender || '',
      social_status: employee.social_status || '',
      is_active: employee.is_active,
      direct_manager_id: employee.direct_manager?.id || '',
      avatar: null,
        salary: employee.salary || '',
  start_date: employee.contract_start_date || '',
  end_date: employee.contract_end_date || '',
    });

    setSelectedGender(genderOptions.find(g => g.value === employee.gender));
    setSelectedStatus(statusOptions.find(s => s.value === employee.is_active));
    setSelectedSocialStatus(socialStatusOptions.find(s => s.value === employee.social_status));
    setSelectedManager(managerOptions.find(m => m.value === employee.direct_manager?.id));
    setSelectedBranch(branchOptions.find(b => b.value === employee.branch?.id));
    setSelectedDepartment(departmentOptions.find(d => d.value === employee.department_name?.id));
    setSelectedPosition(positionOptions.find(p => p.value === employee.position?.id));
    setSelectedJobTitle(jobTitleOptions.find(j => j.value === employee.job_title?.id));
    setSelectedAttendanceRule(attendanceRuleOptions.find(rule => rule.value === employee.attendance_rule?.id));

  }
}, [data, managerOptions, branchOptions, departmentOptions, positionOptions, jobTitleOptions]);
useEffect(() => {
  if (data?.body?.roles && roleOptions.length > 0) {
    const currentRoles = data.body.roles.map(role => ({
      value: role.id,
      label: role.translation?.title?.ar || role.name,
    }));
    setSelectedRoles(currentRoles);
  }
}, [data?.body?.roles, roleOptions.length]);


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'avatar') {
      setFormData({ ...formData, avatar: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('_method', 'PUT');
    form.append('name[ar]', formData.name_ar);
    form.append('name[en]', formData.name_en);
    form.append('email', formData.email);
    form.append('phone', formData.phone);
    form.append('address[ar]', formData.address_ar);
    form.append('address[en]', formData.address_en);
    form.append('username', formData.username);
    if (formData.password) form.append('password', formData.password);
    form.append('hire_date', formData.hireDate);
    form.append('birthday', formData.birthday);
    form.append('national_id', formData.national_id);
    form.append('gender', selectedGender?.value || '');
    form.append('social_status', selectedSocialStatus?.value || '');
    form.append('is_active', String(selectedStatus?.value));
    form.append('direct_manager_id', selectedManager.value || '');
    form.append('salary', formData.salary);
form.append('start_date', formData.start_date);
form.append('end_date', formData.end_date);
if (selectedAttendanceRule) {
  form.append('attendance_rule_id', selectedAttendanceRule.value);
}
    if (formData.avatar) form.append('avatar', formData.avatar);
    if (selectedBranch) form.append('branch_id', selectedBranch.value);
    if (selectedDepartment) form.append('department_id', selectedDepartment.value);
    if (selectedPosition) form.append('position_id', selectedPosition.value);
    if (selectedJobTitle) form.append('job_title_id', selectedJobTitle.value);
    selectedRoles.forEach(role => {
  form.append('role_ids[]', role.value);
});


    try {
      const res = await editEmployee({ id: Number(id), formData: form }).unwrap();
      toast.success(res?.message || 'تم تحديث الموظف بنجاح');
      navigate('/app/users');
    } catch (err) {
      toast.error(err?.data?.message || 'حدث خطأ أثناء التحديث');
      console.error(err);
    }
  };
  return (
    <SectionBox className="space-y-4">
      <h1 className="subtitle mb-6">{t('edit_employee_details')} </h1>
      <form onSubmit={handleSubmit}>
        {/* Add your full form layout here reusing from AddUser */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {/* صورة الموظف */}
              <div className="col-span-2 md:col-span-1 flex items-start justify-center">
                <div
                  style={{ minHeight: '200px', height: '300px' }}
                  className="w-full relative border-2 border-dashed border-gray-300 rounded-xl p-3 shadow-sm hover:shadow-md transition duration-300 flex flex-col items-center justify-center text-center gap-y-2"
                >
                  <label htmlFor="avatar-upload" className="cursor-pointer flex flex-col items-center">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border border-gray-200 hover:border-blue-500 transition duration-300">
                      {formData.avatar ? (
                        <img
                          src={URL.createObjectURL(formData.avatar)}
                          alt={t('image')}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50">
                          <span className="text-2xl">📷</span>
                        </div>
                      )}
                    </div>
                    <div className="text-sm text-blue-700 hover:underline mt-1"> {t('click_to_choose_image')} </div>
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
              </div>
        
              {/* بيانات الموظف */}
              <div className="col-span-2 md:col-span-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <TextInput label={t('name')} name="name_ar" value={formData.name_ar} onChange={handleChange} />
                  <TextInput label={t('username')} name="username" value={formData.username} onChange={handleChange} />
                  <TextInput label={t('password')} name="password" 
                  
                    placeholder={t('leave_blank_if_not_change')}

                  type="password" value={formData.password} onChange={handleChange}   required={false}
 />
                  <EmailInput name="email" value={formData.email} onChange={handleChange} label={t('email')} />
                  <div>
                    <label className="block text-sm mb-1"> {t('phone')}</label>
        <NewPhoneInput
          value={formData.phone}
          onChange={(value) => setFormData({ ...formData, phone: value })}
        />
        
                  </div>
                  <TextInput label={t('address')} name="address_ar" value={formData.address_ar} onChange={handleChange} />
                  <TextInput label={t('national_number')}  maxLength={14}
          inputMode="numeric" name="national_id" value={formData.national_id} onChange={handleChange} />
                 
      
        
                          <div className='mb-3'>
                    <label className="block mb-3 label-md">{t('date_of_birth')}</label>
                    <input type="date" name="birthday" value={formData.birthday} onChange={handleChange} className="w-full border p-2 rounded shadow-input" />
                  </div>
                  <div className='mb-3'>
                    <label className="block mb-3 label-md"> {t('hire_date')} </label>
                    <input type="date" name="hireDate" value={formData.hireDate} onChange={handleChange} className="w-full border p-2 rounded shadow-input" />
                  </div>
        
                  <div>
                    <label className="block mb-3 label-md">{t('gender')}</label>
                    <Select value={selectedGender} onChange={setSelectedGender} options={genderOptions} placeholder={t('choose_gender')} />
                  </div>
                  <div className='mb-3'>
                    <label className="block mb-3 label-md">{t('social_status')} </label>
                    <Select value={selectedSocialStatus} onChange={setSelectedSocialStatus} options={socialStatusOptions} placeholder={t('choose_social_status')} />
                  </div>
                  <div className='mb-3'>
                    <label className="block mb-3 label-md">{t('status')}</label>
                    <Select value={selectedStatus} onChange={setSelectedStatus} options={statusOptions} placeholder={t('choose_status')} />
                  </div>
        
                  <div className='mb-3'>
                    <label className="block mb-3 label-md">{t('branch')}</label>
                    <Select value={selectedBranch} onChange={setSelectedBranch} options={branchOptions} placeholder={t('choose_branch')} />
                  </div>
                  <div className='mb-3'>
                    <label className="block mb-3 label-md"> {t('department')} </label>
                    <Select value={selectedDepartment} onChange={setSelectedDepartment} options={departmentOptions} placeholder={t('choose_department')} />
                  </div>
                  <div className='mb-3'>
                    <label className="block mb-3 label-md"> {t('job_position')} </label>
                    <Select value={selectedPosition} onChange={setSelectedPosition} options={positionOptions} placeholder={t('choose_job_position')} />
                  </div>
                  <div className='mb-3'>
                    <label className="block mb-3 label-md"> {t('job_title')} </label>
                    <Select value={selectedJobTitle} onChange={setSelectedJobTitle} options={jobTitleOptions} placeholder={t('choose_job_title')} />
                  </div>


                    <div className='mb-3'>
                         <label className="block mb-3 label-md"> {t('direct_manager')} </label>
          <Select
         value={selectedManager}
  onChange={setSelectedManager}
  options={managerOptions}
            placeholder={t('choose_direct_manager')}  
          /> 
        </div>
        <div className="mb-3">
  <label className="block mb-3 label-md"> {t('roles')} </label>
  <Select
    isMulti
    options={roleOptions}
    value={selectedRoles}
    onChange={setSelectedRoles}
    placeholder={t('select_roles')} 
  />
</div>
<TextInput
  label={t('salary')}
  name="salary"
  type="number"
  value={formData.salary}
  onChange={handleChange}
/>

<div>
  <label className="block mb-3 label-md">{t('contract_start_date')}</label>
  <input
    type="date"
    name="start_date"
    value={formData.start_date}
    onChange={handleChange}
    className="w-full border p-2 rounded shadow-input"
/>
</div>

<div>
  <label className="block mb-3 label-md">{t('contract_end_date')}</label>
  <input
    type="date"
    name="end_date"
    value={formData.end_date}
    onChange={handleChange}
    className="w-full border p-2 rounded shadow-input"
/>
</div>

<div>
  <label className="block mb-3 label-md">{t('work_type')}</label>
  <Select
    value={selectedAttendanceRule}
    onChange={setSelectedAttendanceRule}
    options={attendanceRuleOptions}
    placeholder={t('choose_work_type')}
/>
</div>


                </div>
              </div>
            </div>
        <div className="mt-6 flex justify-end gap-4">
          <AddingButton variant="main" type="submit"> {t('update')} </AddingButton>
          <CancelButton variant="primary" type="button" onClick={() => navigate('/app/users')}> {t('cancel')} </CancelButton>
        </div>
      </form>
    </SectionBox>
  );
}
