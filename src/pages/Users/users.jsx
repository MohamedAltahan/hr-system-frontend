import { useEffect, useState } from "react";
import { useGetAllEmployeeQuery } from "../../api/Employee"; // <- use the correct path to the API file
import AddingButton from "../../components/ui/buttons/AddingBtn";
import SectionBox from "../../components/ui/containers/SectionBox";
import ProductTable from "../../components/reusable_components/DataTable";
import { MdEdit } from "react-icons/md";
import { MdDelete } from 'react-icons/md';
import ConfirmDialog from "../../components/reusable_components/ConfirmDialog";
import Select from 'react-select';

import { useDeleteEmployeeMutation } from "../../api/Employee"; // <- use the correct path to the API file

import { useGetAllbranchesQuery } from '../../api/Branches';
import { useGetAllDepartmentsQuery } from '../../api/DepartmentsApi';
import { useGetAllPositionsQuery } from '../../api/positionsApi';
import { toast } from "react-toastify";
import TextInput from "../../components/reusable_components/TextInput";
import { useTranslation } from 'react-i18next';

const Users = () => {
  const [page, setPage] = useState(1);
  const { t } = useTranslation();


  const { data: branchsData } = useGetAllbranchesQuery({ id: 0 });
    const { data: departmentData } = useGetAllDepartmentsQuery({ id: 0 });
    const { data: positionsData } = useGetAllPositionsQuery({ id: 0 });
  
    const branchOptions = branchsData?.body?.data?.map(b => ({ value: b.id, label: b.name })) || [];
    const departmentOptions = departmentData?.body?.data?.map(d => ({ value: d.id, label: d.name })) || [];
    const positionOptions = positionsData?.body?.data?.map(p => ({ value: p.id, label: p.name })) || [];

  const [selectedBranch, setSelectedBranch] = useState(null);
const [selectedDepartment, setSelectedDepartment] = useState(null);
const [selectedPosition, setSelectedPosition] = useState(null);
const [searchName, setSearchName] = useState('');
const [searchEmployeeNumber, setSearchEmployeeNumber] = useState('');


  // Fetch employee data with pagination
const { data: employeesData, isLoading } = useGetAllEmployeeQuery({
  id: 4,
  page,
  per_page: 10,
  name: searchName,
  branch_id: selectedBranch?.value,
  department_id: selectedDepartment?.value,
  position_id: selectedPosition?.value,
  employee_number: searchEmployeeNumber,
});
  




  // refetch when page changes

const headers = [
  { key: 'avatar', label: t('employee_image') },
  { key: 'name', label: t('employee_name') },
  { key: 'employee_number', label: t('employee_code') },
  { key: 'branch', label: t('branch') }, // You may need to flatten this too if branch is an object
  { key: 'department', label: t('department') },
  { key: 'hire_date', label: t('hire_date') },
  { key: 'job_title_name', label: t('job_title') },
  { key: 'manager_name', label: t('direct_manager') },
];


  // const employees = employeesData?.body?.data || [];


  const employees = (employeesData?.body?.data || []).map(emp => ({
  ...emp,
  department: emp.department_name?.name || '',
  job_title_name: emp.job_title?.name || '',
  manager_name: emp.direct_manager?.name || '',
  branch: emp.branch?.name || '',
}));

  const pagination = employeesData?.body?.paginate;

const [deleteEmployee] = useDeleteEmployeeMutation();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
  try {
    const res = await deleteEmployee(selectedId).unwrap();
    toast.success(res?.message || 'Employee deleted successfully');
  } catch (error) {
    toast.error( error?.message || 'Failed to delete employee');
  } finally {
    setConfirmOpen(false);
  }
};
useEffect(() => {
  setPage(1); // إعادة تعيين الصفحة إلى 1 عند تغيير الفلاتر
    
}, [selectedBranch, selectedDepartment, selectedPosition, searchName]);



  return (
    <SectionBox className="space-y-4">
          {/* Header */}
      <div className="grid grid-cols-2 items-center gap-4">
        <div className="containerTitle">{t('employess_managment')}</div>
  
        <div className="flex justify-end">
          <a href="/app/users/add">
            <AddingButton variant="main"> {t('add_employee')} </AddingButton>
          </a>
        </div>
      </div>
{/* filters */}


<div className="grid grid-cols-5 gap-4 mb-4 " style={{alignItems:"end"}}>

    <div>
    <TextInput
      type="text"
      value={searchName}
      onChange={(e) => setSearchName(e.target.value)}
      placeholder={t('employee_name')}
      className="w-full border border-gray-300 rounded px-2 py-1 "
    />
  </div>
  <div>
       <TextInput
      type="text"
      value={searchEmployeeNumber}
      onChange={(e) => setSearchEmployeeNumber(e.target.value)}
      placeholder={t('employee_code')}
      className="w-full border border-gray-300 rounded px-2 py-1"
    />
  </div>
  <div className="mb-3">
    <Select
      value={selectedBranch}
      onChange={setSelectedBranch}
      options={branchOptions}
      placeholder={t('branch')}
      isClearable
    />
  </div>
  <div className="mb-3">
    <Select
      value={selectedDepartment}
      onChange={setSelectedDepartment}
      options={departmentOptions}
      placeholder={t('department')}
      isClearable
    />
  </div>
  <div className="mb-3">
    <Select
      value={selectedPosition}
      onChange={setSelectedPosition}
      options={positionOptions}
      placeholder={t('job_position')}
      isClearable
    />
  </div>

</div>


  

      {/* Table */}
      <div className="w-full">
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
         <ProductTable
  headers={headers}
  data={employees}
    baseRoute="/app/users"

  pagination={pagination}
  onPageChange={(newPage) => setPage(Number(newPage))}
  rowKey="id"
  renderActions={(item) => (
    <div className="flex gap-2 items-center">
      <a href={`/app/users/edit/${item.id}`} className="font-medium text-blue-600 hover:underline editIcon">
        <MdEdit />
      </a>
      <button
              onClick={() => handleDeleteClick(item.id)}
              className=" deleteIcon"
            >
        <MdDelete />
      </button>
    </div>
  )}
/>




        )}
          <ConfirmDialog
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title={t('confirm_delete')}
        message= {t('are_you_sure_you_want_to_delete_this_employee')}
      />
      </div>
    </SectionBox>
  );
};



export default Users;
