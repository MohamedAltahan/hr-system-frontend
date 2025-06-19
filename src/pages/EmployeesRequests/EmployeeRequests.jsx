import { useEffect, useState } from "react";
import { useGetAllEmployeeQuery } from "../../api/Employee";
import {
  useGetAllEmployeeRequestsQuery,
  useDeleteEmployeeRequestMutation,
} from "../../api/EmployeeRequestsApi";
import SectionBox from "../../components/ui/containers/SectionBox";
import AddingButton from "../../components/ui/buttons/AddingBtn";
import ProductTable from "../../components/reusable_components/DataTable";
import ConfirmDialog from "../../components/reusable_components/ConfirmDialog";
import Select from "react-select";
import { MdEdit, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import DateInput from "../../components/reusable_components/DateInput";
import dayjs from "dayjs";

const EmployeeRequests = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);


  // Get employees for filter dropdown
  const { data: employeesList } = useGetAllEmployeeQuery({ id: 0 });
  const employeeOptions =
    employeesList?.body?.data?.map((e) => ({
      value: e.id,
      label: e.name,
    })) || [];

  // Fetch employee requests
  const { data: requestsData, isLoading } = useGetAllEmployeeRequestsQuery({
    page,
    per_page: 10,
    employee_id: selectedEmployee?.value,
    from_date: fromDate,
    to_date: toDate,
  });

 const requests =
  requestsData?.body?.data?.map((item) => {
    const status = item.status;

    const statusMap = {
      pending: { label: 'قيد الانتظار', className: 'bg-yellow-100 text-yellow-800' },
      approved: { label: 'مقبول', className: 'bg-green-100 text-green-800' },
      rejected: { label: 'مرفوض', className: 'bg-red-100 text-red-800' },
    };

    const chip = (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
          statusMap[status]?.className || 'bg-gray-100 text-gray-800'
        }`}
      >
        {statusMap[status]?.label || status}
      </span>
    );

    return {
      ...item,
      employee_name: item.employee?.name,
      type_label: Object.values(item.type)[0], // e.g. 'اجازة'
      from_date: item.from_date?.date,
      to_date: item.to_date?.date,
      reviewer_name: item.reviewed_by?.name || "-",
      status: chip,
    };
  }) || [];


  const pagination = requestsData?.body?.paginate;

  const [deleteRequest] = useDeleteEmployeeRequestMutation();

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await deleteRequest(selectedId).unwrap();
      toast.success(res?.message || "Deleted successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Error while deleting");
    } finally {
      setConfirmOpen(false);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [selectedEmployee, fromDate, toDate]);

  const headers = [
    { key: "employee_name", label: t("employee") },
    { key: "type_label", label: t("request_type") },
    { key: "from_date", label: t("from_date") },
    { key: "to_date", label: t("to_date") },
    { key: "reason", label: t("reason") },
    { key: "status", label: t("status") },
    { key: "reviewer_name", label: t("reviewer") },
    // { key: "manager_comment", label: t("manager_comment") },
  ];

  return (
    <SectionBox className="space-y-4">
      <div className="grid grid-cols-2 items-center gap-4">
        <div className="containerTitle">{t("employee_requests")}</div>
        <div className="flex justify-end">
          <a href="/app/employee-requests/add">
            <AddingButton variant="main">{t("add_request")}</AddingButton>
          </a>
        </div>
      </div>

      {/* Filters */}
      {/* <div className="grid grid-cols-4 gap-4 mb-4" style={{ alignItems: "end" }}>
        <Select
          value={selectedEmployee}
          onChange={setSelectedEmployee}
          options={employeeOptions}
          placeholder={t("employee")}
          isClearable
        />
        <DateInput
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          placeholder={t("from_date")}
        />
        <DateInput
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          placeholder={t("to_date")}
        />
      </div> */}

      {/* Table */}
      <div className="w-full">
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <ProductTable
            headers={headers}
            data={requests}
            baseRoute="/app/employee-requests"
            pagination={pagination}
            onPageChange={(newPage) => setPage(Number(newPage))}
            rowKey="id"
            renderActions={(item) => (
              <div className="flex gap-2 items-center">
                <a
                  href={`/app/employee-requests/edit/${item.id}`}
                  className="font-medium text-blue-600 hover:underline editIcon"
                >
                  <MdEdit />
                </a>
                  <a
      href={`/app/employee-requests/approve/${item.id}`}
      className="font-medium text-green-600 "
      title={t("approve_request")}
    >
      ✅
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
          message={t("are_you_sure_you_want_to_delete_this_request")}
        />
      </div>
    </SectionBox>
  );
};

export default EmployeeRequests;
