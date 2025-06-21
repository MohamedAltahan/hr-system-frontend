import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useGetAllOpeningPositionsQuery,
  useDeleteOpeningPositionMutation,
} from "../../api/OpningPositionsApi";
import SectionBox from "../../components/ui/containers/SectionBox";
import AddingButton from "../../components/ui/buttons/AddingBtn";
import Pagination from "../../components/reusable_components/Pagination";
import JobCard from "../../components/Card/JobCard";
import ConfirmDialog from "../../components/reusable_components/ConfirmDialog";
import { toast } from "react-toastify";

const OpeningPositions = () => {
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { t } = useTranslation();

  const { data, isLoading, isError, error } = useGetAllOpeningPositionsQuery({ page });
  const [deletePosition] = useDeleteOpeningPositionMutation(); // ✅ moved here

  const handleConfirmDelete = async () => {
    try {
      const res = await deletePosition(selectedId).unwrap();
      toast.success(res?.message || "Deleted successfully");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete position");
    } finally {
      setConfirmOpen(false);
    }
  };

  const handleTogglePublish = (id) => {
    console.log("Toggle publish status for job ID:", id);
    // TODO: call API mutation to toggle is_published
  };

  const positions = data?.body?.data || [];
  const pagination = data?.body?.paginate;
  

  return (
    <SectionBox className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="containerTitle">{t("opening_positions")}</h2>
        <a href="/app/opening-positions/add">
          <AddingButton variant="main">{t("add_position")}</AddingButton>
        </a>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {positions.map((position) => (
          <JobCard
            key={position.id}
            data={position}
            onTogglePublish={handleTogglePublish}
            onDelete={(id) => {
              setSelectedId(id);
              setConfirmOpen(true);
            }}
          />
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <Pagination pagination={pagination} onPageChange={(newPage) => setPage(Number(newPage))} />
      </div>

      <ConfirmDialog
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title={t("confirm_delete")}
        message={t("confirm_delete_message_opening_position")}
      />
    </SectionBox>
  );
};

export default OpeningPositions;
