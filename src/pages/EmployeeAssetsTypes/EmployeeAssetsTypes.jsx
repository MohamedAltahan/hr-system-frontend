import { useState } from "react";
import {
  useGetAllEmployeeAssetTypesQuery,
  useDeleteEmployeeAssetTypeMutation,
} from "../../api/EmployeeAssetTypesApi";
import SectionBox from "../../components/ui/containers/SectionBox";
import AddingButton from "../../components/ui/buttons/AddingBtn";
import ProductTable from "../../components/reusable_components/DataTable";
import ConfirmDialog from "../../components/reusable_components/ConfirmDialog";
import { MdEdit, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const EmployeeAssetTypes = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const { data: assetTypesData, isLoading } = useGetAllEmployeeAssetTypesQuery({
    page,
    per_page: 10,
  });

  const assetTypes =
    assetTypesData?.body?.data?.map((item) => ({
      ...item,
      branch_name: item.branch?.name || "-",
    })) || [];

  const pagination = assetTypesData?.body?.paginate;

  const [deleteAssetType] = useDeleteEmployeeAssetTypeMutation();

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await deleteAssetType(selectedId).unwrap();
      toast.success(res?.message || "Deleted successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Error while deleting");
    } finally {
      setConfirmOpen(false);
    }
  };

  const headers = [
    { key: "name", label: t("name") },
    { key: "description", label: t("description") },
    { key: "branch_name", label: t("branch") },
  ];

  return (
    <SectionBox className="space-y-4">
      <div className="grid grid-cols-2 items-center gap-4">
        <div className="containerTitle">{t("asset_types")}</div>
        <div className="flex justify-end">
          <a href="/app/employee-asset-types/add">
            <AddingButton variant="main">{t("add_asset_type")}</AddingButton>
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
            data={assetTypes}
            baseRoute="/app/employee-asset-types"
            pagination={pagination}
            onPageChange={(newPage) => setPage(Number(newPage))}
            rowKey="id"
            renderActions={(item) => (
              <div className="flex gap-2 items-center">
                <a
                  href={`/app/employee-asset-types/edit/${item.id}`}
                  className="font-medium text-blue-600 hover:underline editIcon"
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
        )}

        <ConfirmDialog
          isOpen={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={handleConfirmDelete}
          title={t("confirm_delete")}
          message={t("are_you_sure_you_want_to_delete_this_asset_type")}
        />
      </div>
    </SectionBox>
  );
};

export default EmployeeAssetTypes;
