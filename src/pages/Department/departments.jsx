import { useEffect, useState } from "react";
import { useGetAllDepartmentsQuery, useDeleteDepartmentMutation } from "../../api/DepartmentsApi";
import { MdEdit, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

import AddingButton from "../../components/ui/buttons/AddingBtn";
import SectionBox from "../../components/ui/containers/SectionBox";
import ProductTable from "../../components/reusable_components/DataTable";
import ConfirmDialog from "../../components/reusable_components/ConfirmDialog";
import { useTranslation } from 'react-i18next';

const Departments = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const { data: departmentsData, isLoading } = useGetAllDepartmentsQuery({ name: '', page });

  const [deleteDepartment] = useDeleteDepartmentMutation();

  const departments = (departmentsData?.body?.data || []).map((department) => ({
    id: department.id,
    name: department.name,
    description: department.description,
    manager_name: department.manager?.name || "—",
    employees_count: department.employees_count ?? 0,
  }));

  const pagination = departmentsData?.body?.paginate;

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };

const handleConfirmDelete = async () => {
  try {
    const response = await deleteDepartment(selectedId).unwrap();
    toast.success(response?.message || "تم حذف القسم بنجاح");
  } catch (error) {
    const errorMessage =
      error?.data?.message || "حدث خطأ أثناء الحذف";
    toast.error(errorMessage);
  } finally {
    setConfirmOpen(false);
  }
};


  const headers = [
    { key: "name", label: t('department_name') },
    { key: "description", label: t('description') },
    { key: "manager_name", label: t('manager_name') },
    { key: "employees_count", label: t('employees_count') },
  ];

  return (
    <SectionBox className="space-y-4">
      {/* Header */}
      <div className="grid grid-cols-2 items-center gap-4">
        <div className="containerTitle"> {t('departments_managment')}</div>
        <div className="flex justify-end">
          <a href="/app/department/add">
            <AddingButton variant="main">{t('add_department')} </AddingButton>
          </a>
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
            data={departments}
            baseRoute="/app/department"
            pagination={pagination}
            onPageChange={(newPage) => setPage(Number(newPage))}
            rowKey="id"
            renderActions={(item) => (
              <div className="flex gap-2 items-center">
                <a href={`/app/department/edit/${item.id}`} className="text-blue-600 hover:underline editIcon">
                  <MdEdit />
                </a>
                <button onClick={() => handleDeleteClick(item.id)} className="deleteIcon">
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
          message= {t('confirm_delete_department')}
        />
      </div>
    </SectionBox>
  );
};

export default Departments;
