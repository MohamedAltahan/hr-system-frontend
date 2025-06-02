import { useEffect, useState } from "react";
import { useGetAllDepartmentsQuery, useDeleteDepartmentMutation } from "../../api/DepartmentsApi";
import { MdEdit, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

import AddingButton from "../../components/ui/buttons/AddingBtn";
import SectionBox from "../../components/ui/containers/SectionBox";
import ProductTable from "../../components/reusable Component/DataTable";
import ConfirmDialog from "../../components/Reusable Component/ConfirmDialog";

const Departments = () => {
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
      await deleteDepartment(selectedId).unwrap();
      toast.success("تم حذف القسم بنجاح");
    } catch (error) {
      toast.error("حدث خطأ أثناء الحذف");
    } finally {
      setConfirmOpen(false);
    }
  };

  const headers = [
    { key: "name", label: "اسم القسم" },
    { key: "description", label: "الوصف" },
    { key: "manager_name", label: "المدير" },
    { key: "employees_count", label: "عدد الموظفين" },
  ];

  return (
    <SectionBox className="space-y-4">
      {/* Header */}
      <div className="grid grid-cols-2 items-center gap-4">
        <div className="containerTitle">إدارة الأقسام</div>
        <div className="flex justify-end">
          <a href="/app/department/add">
            <AddingButton variant="main">إضافة قسم</AddingButton>
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
          title="تأكيد الحذف"
          message="هل أنت متأكد أنك تريد حذف هذا القسم؟"
        />
      </div>
    </SectionBox>
  );
};

export default Departments;
