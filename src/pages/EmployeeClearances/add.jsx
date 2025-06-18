import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionBox from "../../components/ui/containers/SectionBox";
import AddingButton from "../../components/ui/buttons/AddingBtn";
import CancelButton from "../../components/ui/buttons/CancelBtn";
import Select from "react-select";
import DateInput from "../../components/reusable_components/DateInput";
import TextAreaInput from "../../components/reusable_components/TextAreaInput";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { useGetAllEmployeeQuery } from "../../api/Employee";
import { useCreateEmployeeClearanceMutation } from "../../api/EmployeeClearancesApi";
import NumberInput from "../../components/reusable_components/NumberInput";

const AddEmployeeClearance = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [employeeId, setEmployeeId] = useState(null);
  const [reason, setReason] = useState("");
  const [lastWorkingDay, setLastWorkingDay] = useState("");
  const [noticePeriod, setNoticePeriod] = useState("");

  const { data: employeesData } = useGetAllEmployeeQuery({ id: 0 });
  const [createClearance, { isLoading }] = useCreateEmployeeClearanceMutation();

  const employeeOptions =
    employeesData?.body?.data?.map((e) => ({
      value: e.id,
      label: e.name,
    })) || [];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!employeeId || !reason || !lastWorkingDay || !noticePeriod) {
      toast.error(t("all_fields_required") || "جميع الحقول مطلوبة");
      return;
    }

    const payload = {
      employee_id: employeeId.value,
      reason,
      last_working_day: lastWorkingDay,
      notice_period: Number(noticePeriod),
    };

    try {
      const res = await createClearance(payload).unwrap();
      toast.success(res?.message || t("created_successfully"));
      navigate("/app/employee-clearances");
    } catch (err) {
      toast.error(err?.data?.message || t("something_went_wrong"));
    }
  };

  return (
    <SectionBox className="space-y-6">
      <div className="containerTitle">{t("add_employee_clearance")}</div>

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
            min="0"
            className="form-input w-full border border-gray-300 rounded-md px-3 py-2"
            value={noticePeriod}
            onChange={(e) => setNoticePeriod(e.target.value)}
            placeholder={t("enter_notice_period")}
          />
        </div>
          <div className="col-span-2">
          <label className="block mb-2 text-gray-900 label-md"></label>
          <TextAreaInput
          label={t("reason")}
            className="form-textarea w-full border border-gray-300 rounded-md px-3 py-2"
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder={t("enter_reason")}
          />
        </div>

        <div className="col-span-2 flex justify-end gap-4 mt-4">
          <AddingButton type="submit" disabled={isLoading}>
            {isLoading ? t("loading") : t("add")}
          </AddingButton>
          <CancelButton onClick={() => navigate("/app/employee-clearances")}>
            {t("cancel")}
          </CancelButton>
        </div>
      </form>
    </SectionBox>
  );
};

export default AddEmployeeClearance;
