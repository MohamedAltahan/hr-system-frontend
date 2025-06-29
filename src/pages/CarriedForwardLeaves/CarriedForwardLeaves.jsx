import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { MdEdit, MdDelete } from "react-icons/md";
import SectionBox from "../../components/ui/containers/SectionBox";
import AddingButton from "../../components/ui/buttons/AddingBtn";
import ConfirmDialog from "../../components/reusable_components/ConfirmDialog";
import ProductTable from "../../components/reusable_components/DataTable";
import { toast } from "react-toastify";

import {
  useGetAllCarriedForwardLeavesQuery,
  useDeleteCarriedForwardLeaveMutation,
} from "../../api/CarriedForwardLeavesApi";

const CarriedForwardLeaves = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const { data, isLoading } = useGetAllCarriedForwardLeavesQuery({ page });
  const [deleteLeave] = useDeleteCarriedForwardLeaveMutation();

  const leaves =
    data?.body?.data?.map((item) => ({
      ...item,
      employee_name: item.empoloyee?.name || "-",
      employee_number: item.empoloyee?.number || "-",
      department: item.empoloyee?.department || "-",
      days_balance: item.days_balance,
      year: item.year,
    })) || [];

  const pagination = data?.body?.paginate;

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };



    const handleConfirmDelete = async () => {
      try {
        const res = await deleteLeave(selectedId).unwrap();
        toast.success(res?.message || t("deleted_successfully"));
      } catch (err) {
        toast.error(err?.data?.message || t("delete_error"));
      } finally {
        setConfirmOpen(false);
      }
    };

  const headers = [
    { key: "employee_name", label: t("employee") },
    // { key: "employee_number", label: t("employee_number") },
    { key: "department", label: t("department") },
    { key: "year", label: t("year") },
    { key: "days_balance", label: t("days_balance") },
  ];

  return (
    <SectionBox className="space-y-4">
      <div className="grid grid-cols-2 items-center gap-4">
        <div className="containerTitle">{t("carried-forward-leaves")}</div>
        <div className="flex justify-end">
          <a href="/app/carried-forward-leaves/add">
            <AddingButton variant="main">{t("add_leave")}</AddingButton>
          </a>
        </div>
      </div>

      <div className="w-full">
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <ProductTable
            headers={headers}
            data={leaves}
            baseRoute="/app/carried-forward-leaves"
            pagination={pagination}
            onPageChange={(newPage) => setPage(Number(newPage))}
            rowKey="id"
            renderActions={(item) => (
              <div className="flex gap-2 items-center">
                <a
                  href={`/app/carried-forward-leaves/edit/${item.id}`}
                  className="text-blue-600 hover:underline editIcon"
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
          message={t("are_you_sure_you_want_to_delete_this_leave")}
        />
      </div>
    </SectionBox>
  );
};

export default CarriedForwardLeaves;
