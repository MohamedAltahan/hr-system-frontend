import { useState } from 'react';
import { useGetAllRolesQuery, useDeleteRoleMutation } from '../../api/RolesApi';
import SectionBox from '../../components/ui/containers/SectionBox';
import AddingButton from '../../components/ui/buttons/AddingBtn';
import ProductTable from '../../components/reusable_components/DataTable';
import { MdEdit, MdDelete } from 'react-icons/md';
import ConfirmDialog from '../../components/reusable_components/ConfirmDialog';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const Roles = () => {
  const [page, setPage] = useState(1);
  const { t } = useTranslation();
  const { data: rolesData, isLoading } = useGetAllRolesQuery({ page, per_page: 10 });
  const [deleteRole] = useDeleteRoleMutation();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await deleteRole(selectedId).unwrap();
      toast.success(res?.message || 'تم حذف الدور بنجاح');
    } catch (error) {
      toast.error(error?.data?.message || 'فشل في حذف الدور');
    } finally {
      setConfirmOpen(false);
    }
  };

  const roles = rolesData?.body || [];
  const pagination = rolesData?.body?.paginate;
  

  const headers = [
    { key: 'title_ar', label: t('name') + ' (AR)' },
    { key: 'title_en', label: t('name') + ' (EN)' },
   
  ];

  const tableData = roles.map((role) => ({
    ...role,
    title_ar: role.translation?.title?.ar || role.title,
    title_en: role.name|| '',
    permissions: role.permissions.map((p) => p.title).join(', '),
  }));

  return (
    <SectionBox className="space-y-4">
      {/* Header */}
      <div className="grid grid-cols-2 items-center gap-4">
        <div className="containerTitle">{t('roles_mamagment')} </div>
        <div className="flex justify-end">
          <a href="/app/role/add">
            <AddingButton variant="main"> {t('add_role')} </AddingButton>
          </a>
        </div>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <ProductTable
          headers={headers}
          data={tableData}
          rowKey="id"
          baseRoute="/app/role"
          pagination={pagination}
          onPageChange={(newPage) => setPage(Number(newPage))}
          renderActions={(item) => (
            <div className="flex gap-2 items-center">
              <a href={`/app/role/edit/${item.id}`} className="font-medium text-blue-600 hover:underline editIcon">
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
        message= {t('are_you_sure_delete_role')}   
      />
    </SectionBox>
  );
};

export default Roles;
