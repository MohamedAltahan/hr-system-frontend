import { useEffect, useState } from "react";
import { useGetAllEmployeeQuery } from "../../api/Employee";
import {
  useGetAllEmployeeAssetsQuery,
  useDeleteEmployeeAssetMutation,
} from "../../api/EmployeeAssetsApi";
import SectionBox from "../../components/ui/containers/SectionBox";
import AddingButton from "../../components/ui/buttons/AddingBtn";
import ProductTable from "../../components/reusable_components/DataTable";
import ConfirmDialog from "../../components/reusable_components/ConfirmDialog";
import { MdEdit, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const EmployeeAssets = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const { data: employeeAssetsData, isLoading } = useGetAllEmployeeAssetsQuery({
    page,
    per_page: 10,
  });

  const assets =
    employeeAssetsData?.body?.data?.map((item) => ({
      ...item,
      employee_name: item.employee?.name || "-",
      manager_name: item.manager?.name || "-",
      asset_type_name: item.asset_type?.name || "-",
      issue_date: item.issue_date?.date || "-",
      return_date: item.return_date?.date || "-",
    })) || [];

  const pagination = employeeAssetsData?.body?.paginate;

  const [deleteAsset] = useDeleteEmployeeAssetMutation();

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await deleteAsset(selectedId).unwrap();
      toast.success(res?.message || "Deleted successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Error while deleting");
    } finally {
      setConfirmOpen(false);
    }
  };

  const headers = [
    { key: "employee_name", label: t("employee") },
    { key: "asset_type_name", label: t("asset_type") },
    { key: "manager_name", label: t("manager") },
    { key: "issue_date", label: t("issue_date") },
    { key: "return_date", label: t("return_date") },
  ];

  return (
    <SectionBox className="space-y-4">
      <div className="grid grid-cols-2 items-center gap-4">
        <div className="containerTitle">{t("employee_assets")}</div>
        <div className="flex justify-end">
          <a href="/app/employee-assets/add">
            <AddingButton variant="main">{t("add_asset")}</AddingButton>
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
            data={assets}
            baseRoute="/app/employee-assets"
            pagination={pagination}
            onPageChange={(newPage) => setPage(Number(newPage))}
            rowKey="id"
            renderActions={(item) => (
              <div className="flex gap-2 items-center">
                <a
                  href={`/app/employee-assets/edit/${item.id}`}
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
          message={t("are_you_sure_you_want_to_delete_this_asset")}
        />
      </div>
    </SectionBox>
  );
};

export default EmployeeAssets;
