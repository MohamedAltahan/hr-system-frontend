import { useState } from "react";
import {
  useGetAllAttendanceDepartmentRequestsQuery,
  useDeleteAttendanceDepartmentRequestMutation,
  useUpdateAttendanceDepartmentRequestStatusMutation,
} from "../../api/AttendanceDepartmentRequestsApi";

import SectionBox from "../../components/ui/containers/SectionBox";
import AddingButton from "../../components/ui/buttons/AddingBtn";
import ProductTable from "../../components/reusable_components/DataTable";
import ConfirmDialog from "../../components/reusable_components/ConfirmDialog";
import { MdEdit, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import Select from "react-select";

const StatusDropdown = ({ id, currentStatus }) => {
  const { t } = useTranslation();
  const [updateStatus] = useUpdateAttendanceDepartmentRequestStatusMutation();

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
      const formData = new FormData();
      formData.append("status", selected.value);

      const res = await updateStatus({ id, formData }).unwrap();
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
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? "#f3f4f6" : undefined,
            padding: "6px 10px",
          }),
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

const AttendanceDepartmentRequests = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const { data, isLoading } = useGetAllAttendanceDepartmentRequestsQuery({ page });
  const [deleteRequest] = useDeleteAttendanceDepartmentRequestMutation();

  const requests =
    data?.body?.data?.map((item) => ({
      ...item,
      employee_name: item.employee?.name || "-",
      type: Object.values(item.type || {})[0] || "-",
      reason: item.reason || "-",
      status: <StatusDropdown id={item.id} currentStatus={item.status} />,
      reviewed_by:item.reviewed_by?.name
    })) || [];

  const pagination = data?.body?.paginate;

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await deleteRequest(selectedId).unwrap();
      toast.success(res?.message || t("deleted_successfully"));
    } catch (err) {
      toast.error(err?.data?.message || t("delete_error"));
    } finally {
      setConfirmOpen(false);
    }
  };

  const headers = [
    { key: "employee_name", label: t("employee") },
    { key: "type", label: t("request_type") },
    { key: "reason", label: t("reason") },
    { key: "status", label: t("status") },
    { key: "reviewed_by", label: t("reviewer") },
  ];

  return (
    <SectionBox className="space-y-4">
      <div className="grid grid-cols-2 items-center gap-4">
        <div className="containerTitle">{t("attendance_department_requests")}</div>
        {/* <div className="flex justify-end">
          <a href="/app/attendance-department-requests/add">
            <AddingButton variant="main">{t("add_request")}</AddingButton>
          </a>
        </div> */}
      </div>

      <div className="w-full">
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <ProductTable
            headers={headers}
            data={requests}
            baseRoute="/app/attendance-departure-requests"
            pagination={pagination}
            onPageChange={(newPage) => setPage(Number(newPage))}
            rowKey="id"
            renderActions={(item) => (
              <div className="flex gap-2 items-center">
                {/* <a
                  href={`/app/attendance-departure-requests/edit/${item.id}`}
                  className="font-medium text-blue-600 hover:underline editIcon"
                >
                  <MdEdit />
                </a> */}
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
          message={t("are_you_sure_you_want_to_delete_this_request")}
        />
      </div>
    </SectionBox>
  );
};

export default AttendanceDepartmentRequests;
