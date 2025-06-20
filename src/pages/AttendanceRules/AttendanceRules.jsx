import { useEffect, useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import SectionBox from "../../components/ui/containers/SectionBox";
import AddingButton from "../../components/ui/buttons/AddingBtn";
import ProductTable from "../../components/reusable_components/DataTable";
import ConfirmDialog from "../../components/reusable_components/ConfirmDialog";
import {
  useGetAllAttendanceRulesQuery,
  useDeleteAttendanceRuleMutation,
} from "../../api/AttendanceRulesApi";

const AttendanceRules = () => {
  const [page, setPage] = useState(1);
  const { t } = useTranslation();

  const { data: rulesData } = useGetAllAttendanceRulesQuery({ page });
  const [deleteRule] = useDeleteAttendanceRuleMutation();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const rules = (rulesData?.body?.data || []).map((rule) => ({
    ...rule,
    entry_time: rule.entry_time?.time_12hr || "-",
    exit_time: rule.exit_time?.time_12hr || "-",
    break_time: rule.break_time?.time_12hr || "-",
    status: rule.status === 1 ? t("active") : t("inactive"),
  }));

  const pagination = rulesData?.body?.paginate;

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await deleteRule(selectedId).unwrap();
      toast.success(res?.message || "Deleted successfully");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete rule");
    } finally {
      setConfirmOpen(false);
    }
  };

  const headers = [
    { key: "name", label: t("rule_name") },
    { key: "entry_time", label: t("entry_time") },
    { key: "exit_time", label: t("exit_time") },
   
    { key: "branch", label: t("branch") },
    { key: "status", label: t("status") },
  ];

  return (
    <SectionBox className="space-y-4">
      <div className="grid grid-cols-2 items-center gap-4">
        <div className="containerTitle">{t("attendance_rules")}</div>
        <div className="flex justify-end">
          <a href="/app/attendance-rules/add">
            <AddingButton variant="main">{t("add_rule")}</AddingButton>
          </a>
        </div>
      </div>

      <div className="w-full">
        <ProductTable
          headers={headers}
          data={rules}
          baseRoute="/app/attendance-rules"
          pagination={pagination}
          onPageChange={(newPage) => setPage(Number(newPage))}
          rowKey="id"
          renderActions={(item) => (
            <div className="flex gap-2 items-center">
              <a
                href={`/app/attendance-rules/edit/${item.id}`}
                className="text-blue-600 hover:underline editIcon"
              >
                <MdEdit />
              </a>
              <button
                onClick={() => handleDeleteClick(item.id)}
                className="deleteIcon"
              >
                <MdDelete />
              </button>
            </div>
          )}
        />

        <ConfirmDialog
          isOpen={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={handleConfirmDelete}
          title={t("confirm_delete")}
          message={t("confirm_delete_message_attendance_rules")}
        />
      </div>
    </SectionBox>
  );
};

export default AttendanceRules;
