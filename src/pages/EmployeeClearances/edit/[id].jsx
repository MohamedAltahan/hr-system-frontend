import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SectionBox from "../../../components/ui/containers/SectionBox";
import AddingButton from "../../../components/ui/buttons/AddingBtn";
import CancelButton from "../../../components/ui/buttons/CancelBtn";
import Select from "react-select";
import DateInput from "../../../components/reusable_components/DateInput";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { useGetAllEmployeeQuery } from "../../../api/Employee";
import {
  useGetEmployeeClearanceByIdQuery,
  useUpdateEmployeeClearanceMutation,
} from "../../../api/EmployeeClearancesApi";
import TextAreaInput from "../../../components/reusable_components/TextAreaInput";
import NumberInput from "../../../components/reusable_components/NumberInput";

const EditEmployeeClearance = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [employeeId, setEmployeeId] = useState(null);
  const [lastWorkingDay, setLastWorkingDay] = useState("");
  const [noticePeriod, setNoticePeriod] = useState("");
  const [reason, setReason] = useState("");

  const { data: employeesData } = useGetAllEmployeeQuery({ id: 0 });
  const { data: clearanceData } = useGetEmployeeClearanceByIdQuery(id);
  const [updateEmployeeClearance, { isLoading: isUpdating }] = useUpdateEmployeeClearanceMutation();

  const employeeOptions =
    employeesData?.body?.data?.map((e) => ({
      value: e.id,
      label: e.name,
    })) || [];

  useEffect(() => {
    if (clearanceData?.body) {
      const clearance = clearanceData.body;
      setEmployeeId({ value: clearance?.employee?.id, label: clearance?.employee?.name });
      setLastWorkingDay(clearance?.last_working_day?.date || "");
      setNoticePeriod(clearance?.notice_period || "");
      setReason(clearance?.reason || "");
    }
  }, [clearanceData]);

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!employeeId || !lastWorkingDay || !noticePeriod || !reason) {
    toast.error(t("all_fields_required") || "جميع الحقول مطلوبة");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("employee_id", employeeId.value);
    formData.append("last_working_day", lastWorkingDay);
    formData.append("reason", reason);
    formData.append("notice_period", noticePeriod);
    formData.append("status", "pending");

    const res = await updateEmployeeClearance({ id, formData }).unwrap();

    toast.success(res?.message || t("updated_successfully"));
    navigate("/app/employee-clearances");
  } catch (err) {
    toast.error(err?.data?.message || t("something_went_wrong"));
  }
};


  return (
    <SectionBox className="space-y-6">
      <div className="containerTitle">{t("edit_employee_clearance")}</div>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 text-gray-900 label-md">{t("employee")}</label>
          <Select
            value={employeeId}
            onChange={setEmployeeId}
            options={employeeOptions}
            placeholder={t("choose_employee")}
          />
        </div>

        <DateInput
          label={t("last_working_day")}
          value={lastWorkingDay}
          onChange={(e) => setLastWorkingDay(e.target.value)}
        />

        <div>
          <NumberInput
          label={t("notice_period")}
            type="number"
            className="form-input"
            value={noticePeriod}
            onChange={(e) => setNoticePeriod(e.target.value)}
            placeholder={t("notice_period")}
          />
        </div>

        <div className="col-span-2">
          <TextAreaInput
          label={t("reason")}
            className="form-textarea w-full"
            rows={4}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder={t("reason")}
          />
        </div>

        <div className="col-span-2 flex justify-end gap-4 mt-4">
          <AddingButton type="submit" disabled={isUpdating}>
            {isUpdating ? t("loading") : t("update")}
          </AddingButton>
          <CancelButton onClick={() => navigate("/app/employee-clearances")} type="button">
            {t("cancel")}
          </CancelButton>
        </div>
      </form>
    </SectionBox>
  );
};

export default EditEmployeeClearance;
