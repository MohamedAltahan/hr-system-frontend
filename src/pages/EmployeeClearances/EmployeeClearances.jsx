import { useState } from "react";
import {
  useGetAllEmployeeClearancesQuery,
  useDeleteEmployeeClearanceMutation,
    useUpdateEmployeeClearanceStatusMutation,

} from "../../api/EmployeeClearancesApi";
import SectionBox from "../../components/ui/containers/SectionBox";
import AddingButton from "../../components/ui/buttons/AddingBtn";
import ProductTable from "../../components/reusable_components/DataTable";
import ConfirmDialog from "../../components/reusable_components/ConfirmDialog";
import { MdEdit, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import Select from "react-select";


const EmployeeClearances = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const { data: employeeClearancesData, isLoading } = useGetAllEmployeeClearancesQuery({
    page,
    per_page: 10,
  });
const StatusDropdown = ({ id, currentStatus }) => {
  const { t } = useTranslation();
  const [updateStatus] = useUpdateEmployeeClearanceStatusMutation();

  const statusOptions = [
    {
      value: "pending",
      label: t("status_pending"),
      bg: "bg-yellow-100",
      text: "text-yellow-800",
    },
    {
      value: "approved",
      label: t("status_approved"),
      bg: "bg-green-100",
      text: "text-green-800",
    },
    {
      value: "rejected",
      label: t("status_rejected"),
      bg: "bg-red-100",
      text: "text-red-800",
    },
  ];

  const defaultValue = statusOptions.find((opt) => opt.value === currentStatus);

const handleChange = async (selected) => {
  try {
    const res = await updateStatus({ id, status: selected.value }).unwrap();
    toast.success(res?.message || t("status_updated_successfully"));
  } catch (err) {
    toast.error(err?.data?.message || t("something_went_wrong"));
  }
};


  return (
   <div onClick={(e) => e.stopPropagation()}>
  <Select
    value={defaultValue}
    onChange={handleChange}
    options={statusOptions}
    isSearchable={false}
    className="min-w-[140px] w-[160px] text-xs"
    getOptionLabel={(e) => (
      <div
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${e.bg} ${e.text}`}
      >
        {e.label}
      </div>
    )}
    styles={{
      control: (base) => ({
        ...base,
        minHeight: "32px",
        borderRadius: "9999px",
        fontSize: "0.75rem",
      }),
      singleValue: (base, state) => {
        const opt = statusOptions.find((o) => o.value === state.data.value);
        return {
          ...base,
          backgroundColor: "transparent",
          color: opt?.text?.replace("text-", "#") || "#374151",
          borderRadius: "9999px",
          fontWeight: 500,
        };
      },
      option: (base, state) => {
        const opt = statusOptions.find((o) => o.value === state.data.value);
        return {
          ...base,
          backgroundColor: state.isFocused ? "#f3f4f6" : undefined,
          padding: "6px 10px",
        };
      },
      dropdownIndicator: (base) => ({
        ...base,
        paddingTop: 0,
        paddingBottom: 0,
      }),
      indicatorSeparator: () => ({ display: "none" }),
    }}
  />
</div>

  );
};



  const clearances =
    employeeClearancesData?.body?.data?.map((item) => ({
      ...item,
      employee_name: item.employee?.name || "-",
      last_working_day: item.last_working_day?.date || "-",
      notice_period: item.notice_period || "-",
      reason: item.reason || "-",
status: <StatusDropdown id={item.id} currentStatus={item.status} />,
    })) || [];

  const pagination = employeeClearancesData?.body?.paginate;

  const [deleteClearance] = useDeleteEmployeeClearanceMutation();

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await deleteClearance(selectedId).unwrap();
      toast.success(res?.message || t("deleted_successfully"));
    } catch (err) {
      toast.error(err?.data?.message || t("delete_error"));
    } finally {
      setConfirmOpen(false);
    }
  };

  const headers = [
    { key: "employee_name", label: t("employee") },
    { key: "last_working_day", label: t("last_working_day") },
    { key: "notice_period", label: t("notice_period") },
    { key: "reason", label: t("reason") },
    { key: "status", label: t("status") },
  ];

  return (
    <SectionBox className="space-y-4">
      <div className="grid grid-cols-2 items-center gap-4">
        <div className="containerTitle">{t("employee_clearances")}</div>
        <div className="flex justify-end">
          <a href="/app/employee-clearances/add">
            <AddingButton variant="main">{t("add_clearance")}</AddingButton>
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
            data={clearances}
            baseRoute="/app/employee-clearances"
            pagination={pagination}
            onPageChange={(newPage) => setPage(Number(newPage))}
            rowKey="id"
            renderActions={(item) => (
              <div className="flex gap-2 items-center">
                <a
                  href={`/app/employee-clearances/edit/${item.id}`}
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
          message={t("are_you_sure_you_want_to_delete_this_clearance")}
        />
      </div>
    </SectionBox>
  );
};

export default EmployeeClearances;
