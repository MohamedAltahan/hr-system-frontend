import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SectionBox from "../../../components/ui/containers/SectionBox";
import AddingButton from "../../../components/ui/buttons/AddingBtn";
import CancelButton from "../../../components/ui/buttons/CancelBtn";
import TextInput from "../../../components/reusable_components/TextInput";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import {
  useGetAttendanceDepartureByIdQuery,
  useUpdateAttendanceDepartureMutation,
} from "../../../api/AttendanceDepartmentApi";

const EditAttendanceDeparture = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [employeeName, setEmployeeName] = useState("");
  const [date, setDate] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const { data: attendanceData, isLoading: isFetching } = useGetAttendanceDepartureByIdQuery(id);
  const [updateAttendance, { isLoading }] = useUpdateAttendanceDepartureMutation();

  useEffect(() => {
    if (attendanceData?.body) {
      const { empoloyee, date, check_in, check_out } = attendanceData.body;
      setEmployeeName(empoloyee?.name || "-");
      setDate(date?.date || "");
      setCheckIn(check_in?.time_24hr || "");
      setCheckOut(check_out?.time_24hr || "");
    }
  }, [attendanceData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || !checkIn || !checkOut) {
      toast.error(t("all_fields_required") || "جميع الحقول مطلوبة");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("date", date);
      formData.append("check_in", checkIn);
      formData.append("check_out", checkOut);

      const res = await updateAttendance({ id, formData }).unwrap();
      toast.success(res?.message || t("updated_successfully"));
      navigate("/app/attendance-departure");
    } catch (err) {
      toast.error(err?.data?.message || t("something_went_wrong"));
    }
  };

  return (
    <SectionBox className="space-y-6">
      <div className="containerTitle mb-10">{t("edit_attendance_record")}</div>

      {isFetching ? (
        <div className="text-center py-10">{t("loading")}</div>
      ) : (
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          <TextInput label={t("employee_name")} value={employeeName} disabled />

          <TextInput
            label={t("date")}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
          />

          <TextInput
            label={t("check_in")}
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            type="time"
          />

          <TextInput
            label={t("check_out")}
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            type="time"
          />

          <div className="col-span-2 flex justify-end gap-4 mt-4">
            <AddingButton type="submit" disabled={isLoading}>
              {isLoading ? t("loading") : t("update")}
            </AddingButton>
            <CancelButton onClick={() => navigate("/app/attendance-departure")} type="button">
              {t("cancel")}
            </CancelButton>
          </div>
        </form>
      )}
    </SectionBox>
  );
};

export default EditAttendanceDeparture;
