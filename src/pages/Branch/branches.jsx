import { useEffect, useState } from "react";
import { useGetAllbranchesQuery ,useDeleteBranchMutation} from "../../api/Branches";


import { MdEdit, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

import AddingButton from "../../components/ui/buttons/AddingBtn";
import SectionBox from "../../components/ui/containers/SectionBox";
import ProductTable from "../../components/reusable Component/DataTable";
import ConfirmDialog from "../../components/Reusable Component/ConfirmDialog";

const Branches = () => {
  const [page, setPage] = useState(1);

  const { data: branchesData } = useGetAllbranchesQuery({ name: '', page });

  const branches = (branchesData?.body?.data || []).map(branch => ({
    ...branch,
    created_at: branch.created_at?.date || '',
      is_active: branch.is_active === 1 ? 'نشط' : 'غير نشط',

  }));

  const pagination = branchesData?.body?.paginate;

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
const [deleteBranch, { isLoading }] = useDeleteBranchMutation();

  const handleDeleteClick = (id) => {
    
    setSelectedId(id);
    setConfirmOpen(true);
  };



  const handleConfirmDelete = async () => {
  try {
    const res = await deleteBranch(selectedId).unwrap();
    toast.success(res?.message || 'Branch deleted successfully');
  } catch (error) {
    toast.error( error?.message || 'Failed to delete Branch');
  } finally {
    setConfirmOpen(false);
  }
};

  const headers = [
    { key: 'name', label: 'اسم الفرع' },
    { key: 'phone', label: 'رقم الهاتف' },
    { key: 'address', label: 'العنوان' },
    { key: 'description', label: 'الوصف' },
    { key: 'is_active', label: 'الحالة' },
    { key: 'created_at', label: 'تاريخ الإنشاء' },
  ];

  return (
    <SectionBox className="space-y-4">
      {/* Header */}
      <div className="grid grid-cols-2 items-center gap-4">
        <div className="containerTitle">إدارة الفروع</div>
        <div className="flex justify-end">
          <a href="/app/branch/add">
            <AddingButton variant="main">إضافة فرع</AddingButton>
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
            data={branches}
            baseRoute="/app/branch"
            pagination={pagination}
            onPageChange={(newPage) => setPage(Number(newPage))}
            rowKey="id"
            renderActions={(item) => (
              <div className="flex gap-2 items-center">
                <a href={`/app/branch/edit/${item.id}`} className="text-blue-600 hover:underline editIcon">
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
          message="هل أنت متأكد أنك تريد حذف هذا الفرع؟"
        />
      </div>
    </SectionBox>
  );
};

export default Branches;
