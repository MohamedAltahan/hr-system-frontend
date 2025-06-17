import { useState } from "react";
import { useGetAllJobTitlesQuery, useDeleteJobTitleMutation } from "../../api/JobTitlesApi";
import SectionBox from "../../components/ui/containers/SectionBox";
import AddingButton from "../../components/ui/buttons/AddingBtn";
import ProductTable from "../../components/reusable_components/DataTable";
import ConfirmDialog from "../../components/reusable_components/ConfirmDialog";
import { MdEdit, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const JobTitles = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const { data: jobTitlesData, isLoading } = useGetAllJobTitlesQuery({ page, per_page: 10 });
  const jobTitles = jobTitlesData?.body?.data || [];
  const pagination = jobTitlesData?.body?.paginate;

  const [deleteJobTitle] = useDeleteJobTitleMutation();

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await deleteJobTitle(selectedId).unwrap();
      toast.success(res?.message || t("deleted_successfully"));
    } catch (error) {
      toast.error(error?.message || t("delete_failed"));
    } finally {
      setConfirmOpen(false);
    }
  };

  const headers = [
    { key: "name", label: t("job_title") },
  ];

  return (
    <SectionBox className="space-y-4">
      <div className="grid grid-cols-2 items-center gap-4">
        <div className="containerTitle">{t("job_titles")}</div>
        <div className="flex justify-end">
          <a href="/app/job-titles/add">
            <AddingButton variant="main">{t("add_job_title")}</AddingButton>
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
            data={jobTitles}
            baseRoute="/app/job-titles"
            pagination={pagination}
            onPageChange={(newPage) => setPage(Number(newPage))}
            rowKey="id"
            renderActions={(item) => (
              <div className="flex gap-2 items-center">
                <a href={`/app/job-titles/edit/${item.id}`} className="font-medium text-blue-600 hover:underline editIcon">
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
          message={t("are_you_sure_you_want_to_delete_this_record")}
        />
      </div>
    </SectionBox>
  );
};

export default JobTitles;
