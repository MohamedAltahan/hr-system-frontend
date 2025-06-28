import { useState } from "react";
import {
  useGetAllAttendanceDepartureQuery,
  useDeleteAttendanceDepartureMutation,
} from "../../api/AttendanceDepartmentApi"; // adjust path if needed
import SectionBox from "../../components/ui/containers/SectionBox";
import AddingButton from "../../components/ui/buttons/AddingBtn";
import ProductTable from "../../components/reusable_components/DataTable";
import ConfirmDialog from "../../components/reusable_components/ConfirmDialog";
import { MdEdit, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const AttendanceDeparture = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const { data: attendanceData, isLoading } = useGetAllAttendanceDepartureQuery({ page, per_page: 10 });
  const rawItems = attendanceData?.body?.data || [];
  const pagination = attendanceData?.body?.paginate;

  const [deleteAttendance] = useDeleteAttendanceDepartureMutation();

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await deleteAttendance(selectedId).unwrap();
      toast.success(res?.message || t("deleted_successfully"));
    } catch (error) {
      toast.error(error?.message || t("delete_failed"));
    } finally {
      setConfirmOpen(false);
    }
  };

  // Flatten data for the table
  const items = rawItems.map((item) => ({
    ...item,
    employee_name: item.empoloyee?.name || "-",
    date: item.date?.date || "-",
    check_in: item.check_in?.time_12hr || "-",
    check_out: item.check_out?.time_12hr || "-",
  }));

  const headers = [
    { key: "employee_name", label: t("employee") },
    { key: "date", label: t("date") },
    { key: "check_in", label: t("check_in") },
    { key: "check_out", label: t("check_out") },
  ];

  return (
    <SectionBox className="space-y-4">
      <div className="grid grid-cols-2 items-center gap-4">
        <div className="containerTitle">{t("attendance_departure")}</div>
        {/* <div className="flex justify-end">
          <a href="/app/attendance/add">
            <AddingButton variant="main">{t("add_attendance")}</AddingButton>
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
            data={items}
            baseRoute="/app/attendance-departure"
            pagination={pagination}
            onPageChange={(newPage) => setPage(Number(newPage))}
            rowKey="id"
            renderActions={(item) => (
              <div className="flex gap-2 items-center">
                <a
                  href={`/app/attendance-departure/edit/${item.id}`}
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
          message={t("are_you_sure_you_want_to_delete_this_attendance_department")}
        />
      </div>
    </SectionBox>
  );
};

export default AttendanceDeparture;
