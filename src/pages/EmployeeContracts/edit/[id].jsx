import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SectionBox from "../../../components/ui/containers/SectionBox";
import AddingButton from "../../../components/ui/buttons/AddingBtn";
import CancelButton from "../../../components/ui/buttons/CancelBtn";
import Select from "react-select";
import DateInput from "../../../components/reusable_components/DateInput";
import ToggleInput  from '../../../components/reusable_components/ToggleInput'
import NumberInput from "../../../components/reusable_components/NumberInput";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import {
  useGetEmployeeContractByIdQuery,
  useUpdateEmployeeContractMutation,
} from "../../../api/EmployeeContractsApi";
import { useGetAllEmployeeQuery } from "../../../api/Employee";
import { useGetAllAttendanceRulesQuery } from "../../../api/AttendanceRulesApi";

const EditEmployeeContract = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const [employeeId, setEmployeeId] = useState(null);
  const [attendanceRuleId, setAttendanceRuleId] = useState(null);
  const [salary, setSalary] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isActive, setIsActive] = useState(true);

  const { data: employeesData } = useGetAllEmployeeQuery({ id: 0 });
  const { data: rulesData } = useGetAllAttendanceRulesQuery({});
  const { data: contractData, isLoading: isContractLoading } = useGetEmployeeContractByIdQuery(id);
  const [updateContract, { isLoading }] = useUpdateEmployeeContractMutation();

  const employeeOptions =
    employeesData?.body?.data?.map((e) => ({ value: e.id, label: e.name })) || [];

  const ruleOptions =
    rulesData?.body?.data?.map((r) => ({ value: r.id, label: r.name })) || [];

  useEffect(() => {
    if (contractData?.body) {
      const contract = contractData.body;
      setEmployeeId({ value: contract.employee.id, label: contract.employee.name });
      setAttendanceRuleId({ value: contract.attendance_rule.id, label: contract.attendance_rule.name });
      setSalary(contract.salary || "");
      setStartDate(contract.start_date?.date || "");
      setEndDate(contract.end_date?.date || "");
      setIsActive(contract.is_active || "1");
    }
  }, [contractData]);

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!employeeId || !attendanceRuleId || !salary || !startDate || !endDate) {
    toast.error(t("all_fields_required"));
    return;
  }

  if (new Date(startDate) > new Date(endDate)) {
    toast.error(t("from_date_cannot_be_after_to_date"));
    return;
  }

  try {
    const formData = new FormData();
    formData.append("employee_id", employeeId.value);
    formData.append("attendance_rule_id", attendanceRuleId.value);
    formData.append("salary", salary);
    formData.append("start_date", startDate);
    formData.append("end_date", endDate);
    formData.append("is_active", isActive ? "1" : "0");

    const res = await updateContract({
      id,
      formData,
    }).unwrap();

    toast.success(res?.message || t("updated_successfully"));
    navigate("/app/employee-contracts");
  } catch (error) {
    toast.error(error?.data?.message || t("something_went_wrong"));
  }
};

  return (
    <SectionBox className="space-y-6">


          <div className="flex items-center justify-between mb-9">
            <h1 className="subtitle">{t('edit_employee_contract')}</h1>
            <div style={{ position: 'absolute', insetInlineEnd: '0' }}>
              <ToggleInput
                label={t('status')}
                name="is_active"
checked={isActive}
onChange={(e) => setIsActive(e.target.checked ? 1 : 0)}
              />

              
            </div>
          </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        {/* Employee */}
        <div>
          <label className="block mb-2 label-md">
            {t("employee")}
          </label>
          <Select
            value={employeeId}
            onChange={setEmployeeId}
            options={employeeOptions}
            placeholder={t("choose_employee")}
          />
        </div>

        {/* Attendance Rule */}
        <div>
          <label className="block mb-2 label-md">
            {t("attendance_rule")}
          </label>
          <Select
            value={attendanceRuleId}
            onChange={setAttendanceRuleId}
            options={ruleOptions}
            placeholder={t("choose_attendance_rule")}
          />
        </div>

        {/* Salary */}
        <NumberInput
          label={t("salary")}
          name="salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          placeholder={t("salary")}
          min={0}
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

     

        {/* Buttons */}
        <div className="col-span-2 flex justify-end gap-4 mt-4">
          <AddingButton type="submit" disabled={isLoading}>
            {isLoading ? t("loading") : t("update")}
          </AddingButton>
          <CancelButton type="button" onClick={() => navigate("/app/employee-contracts")}>
            {t("cancel")}
          </CancelButton>
        </div>
      </form>
    </SectionBox>
  );
};

export default EditEmployeeContract;
