import { useEffect, useState } from "react";
import { useGetAllbranchesQuery ,useDeleteBranchMutation} from "../../api/Branches";


import { MdEdit, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { useTranslation } from 'react-i18next';

import AddingButton from "../../components/ui/buttons/AddingBtn";
import SectionBox from "../../components/ui/containers/SectionBox";
import ProductTable from "../../components/reusable_components/DataTable";
import ConfirmDialog from "../../components/reusable_components/ConfirmDialog";

const Branches = () => {
  const [page, setPage] = useState(1);
    const { t } = useTranslation();

  const { data: branchesData } = useGetAllbranchesQuery({ name: '', page });

  const branches = (branchesData?.body?.data || []).map(branch => ({
    ...branch,
    created_at: branch.created_at?.date || '',
      is_active: branch.is_active === 1 ? t('active') : t('inactive'),

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
    { key: 'name', label: t('branch_name') },
    { key: 'phone', label: t('phone') },
    { key: 'address', label: t('address') },
    { key: 'description', label: t('description') },
    { key: 'is_active', label: t('status') },
    { key: 'created_at', label: t('created_at') },
  ];

  return (
    <SectionBox className="space-y-4">
      {/* Header */}
      <div className="grid grid-cols-2 items-center gap-4">
        <div className="containerTitle">{t('branches_managment')} </div>
        <div className="flex justify-end">
          <a href="/app/branch/add">
            <AddingButton variant="main">{t('add_branch')} </AddingButton>
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
          title={t('confirm_delete')}
          message= {t('confirm_delete_message_branches')}
        />
      </div>
    </SectionBox>
  );
};

export default Branches;
