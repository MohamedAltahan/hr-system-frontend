import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionBox from "../../components/ui/containers/SectionBox";
import AddingButton from "../../components/ui/buttons/AddingBtn";
import CancelButton from "../../components/ui/buttons/CancelBtn";
import Select from "react-select";
import DateInput from "../../components/reusable_components/DateInput";
import NumberInput from "../../components/reusable_components/NumberInput";
import TextAreaInput from "../../components/reusable_components/TextAreaInput";
import ToggleInput from "../../components/reusable_components/ToggleInput";
import { useGetAllEmployeeQuery } from "../../api/Employee";
import { useGetAllAttendanceRulesQuery } from "../../api/AttendanceRulesApi";
import { useCreateEmployeeContractMutation } from "../../api/EmployeeContractsApi";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const AddEmployeeContract = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [employeeId, setEmployeeId] = useState(null);
  const [attendanceRuleId, setAttendanceRuleId] = useState(null);
  const [salary, setSalary] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [note, setNote] = useState("");

  const { data: employeesData } = useGetAllEmployeeQuery({ id: 0 });
  const employeeOptions = employeesData?.body?.data?.map(e => ({
    value: e.id,
    label: e.name
  })) || [];

  const { data: rulesData } = useGetAllAttendanceRulesQuery({});
  const attendanceOptions = rulesData?.body?.data?.map(rule => ({
    value: rule.id,
    label: rule.name
  })) || [];

  const [createContract, { isLoading }] = useCreateEmployeeContractMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!employeeId || !attendanceRuleId || salary === "" || !startDate || !endDate) {
      toast.error(t("all_fields_required"));
      return;
    }

    try {
      const payload = {
        employee_id: employeeId.value,
        attendance_rule_id: attendanceRuleId.value,
        salary: Number(salary),
        start_date: startDate,
        end_date: endDate,
        is_active: isActive ? 1 : 0,
        note
      };

      const res = await createContract(payload).unwrap();
      toast.success(res?.message || t("created_successfully"));
      navigate("/app/employee-contracts");
    } catch (err) {
      toast.error(err?.data?.message || t("something_went_wrong"));
    }
  };

  return (
    <SectionBox className="space-y-6">
      {/* Header with Toggle */}
      
      {/* Form Start */}
      <form onSubmit={handleSubmit} >
      <div className="flex items-center justify-between mb-9 relative">
        <h1 className="subtitle">{t("add_employee_contract")}</h1>
        <div >
          <ToggleInput
            label={t("status")}
            name="is_active"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
        </div>
      </div>
<div className="grid grid-cols-2 gap-6">
        {/* Employee Select */}
        <div>
          <label className="block mb-2 label-md">{t("employee")}</label>
          
          <Select
            value={employeeId}
            onChange={setEmployeeId}
            options={employeeOptions}
            placeholder={t("choose_employee")}
          />
        </div>

        {/* Attendance Rule Select */}
        <div>
          <label className="block mb-2 label-md">{t("attendance_rule")}</label>
          <Select
            value={attendanceRuleId}
            onChange={setAttendanceRuleId}
            options={attendanceOptions}
            placeholder={t("choose_attendance_rule")}
          />
        </div>

        {/* Salary */}
        <NumberInput
          label={t("salary")}
          name="salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          placeholder={t("enter_salary")}
        />

        {/* Start Date */}
        <DateInput
          label={t("start_date")}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        {/* End Date */}
        <DateInput
          label={t("end_date")}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        {/* Note */}
        <div className="col-span-2">
          <TextAreaInput
            label={t("note")}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={t("enter_note")}
            className="w-full p-2 border rounded-md"
            rows={3}
          />
        </div>
</div>
        {/* Submit / Cancel Buttons */}
        <div className="col-span-2 flex justify-end gap-4 mt-4">
          <AddingButton type="submit" disabled={isLoading}>
            {isLoading ? t("loading") : t("add")}
          </AddingButton>
          <CancelButton type="button" onClick={() => navigate("/app/employee-contracts")}>
            {t("cancel")}
          </CancelButton>
        </div>
      </form>
    </SectionBox>
  );
};

export default AddEmployeeContract;
