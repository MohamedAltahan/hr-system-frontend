import { useState } from "react";
import {
  useGetAllDisciplinaryActionsQuery,
  useDeleteDisciplinaryActionMutation,
} from "../../api/disciplinaryActionsApi";
import SectionBox from "../../components/ui/containers/SectionBox";
import AddingButton from "../../components/ui/buttons/AddingBtn";
import ProductTable from "../../components/reusable_components/DataTable";
import ConfirmDialog from "../../components/reusable_components/ConfirmDialog";
import { MdEdit, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const DisciplinaryActions = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const { data, isLoading } = useGetAllDisciplinaryActionsQuery({ page });
  const [deleteAction] = useDeleteDisciplinaryActionMutation();

  const actions = data?.body?.data || [];
  const pagination = data?.body?.paginate;

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await deleteAction(selectedId).unwrap();
      toast.success(res?.message || t("deleted_successfully"));
    } catch (error) {
        console.log(error);
        
      toast.error(error?.data?.message || t("delete_failed"));
    } finally {
      setConfirmOpen(false);
    }
  };

  const transformedData = actions.map((item) => ({
    ...item,
    employee_name: item.empoloyee?.name || "-",
    execution_date: item.execution_date?.date || "-",
    status: t(item.status),
    action_type: t(item.action_type),
  }));

  const headers = [
    { key: "employee_name", label: t("employee") },
    { key: "execution_date", label: t("execution_date") },
    { key: "amount", label: t("amount") },
    { key: "reason", label: t("reason") },
    { key: "status", label: t("status") },
    { key: "action_type", label: t("action_type") },
  ];

  return (
    <SectionBox className="space-y-4">
      <div className="grid grid-cols-2 items-center gap-4">
        <div className="containerTitle">{t("disciplinary_actions")}</div>
        <div className="flex justify-end">
          <a href="/app/disciplinary-actions/add">
            <AddingButton variant="main">{t("add_disciplinary_action")}</AddingButton>
          </a>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <ProductTable
          headers={headers}
          data={transformedData}
          baseRoute="/app/disciplinary-actions"
          pagination={pagination}
          onPageChange={(newPage) => setPage(Number(newPage))}
          rowKey="id"
          renderActions={(item) => (
            <div className="flex gap-2 items-center">
              <a
                href={`/app/disciplinary-actions/edit/${item.id}`}
                className="font-medium text-blue-600 hover:underline editIcon"
              >
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
        title={t("confirm_delete")}
        message={t("are_you_sure_you_want_to_delete_this_disciplinary_action")}
      />
    </SectionBox>
  );
};

export default DisciplinaryActions;
