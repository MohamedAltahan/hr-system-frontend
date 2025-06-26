import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionBox from "../../components/ui/containers/SectionBox";
import AddingButton from "../../components/ui/buttons/AddingBtn";
import CancelButton from "../../components/ui/buttons/CancelBtn";
import Select from "react-select";
import DateInput from "../../components/reusable_components/DateInput";
import TextAreaInput from "../../components/reusable_components/TextAreaInput"; // or use a normal textarea
import { useGetAllEmployeeQuery } from "../../api/Employee";
import { useCreateEmployeeRequestMutation ,useGetEmployeeRequestTypesQuery} from "../../api/EmployeeRequestsApi";

import { useGetAllLeaveTypesQuery } from "../../api/leaveTypesApi";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const AddEmployeeRequest = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
const [leaveType, setLeaveType] = useState(null);

  const [employeeId, setEmployeeId] = useState(null);
  const [type, setType] = useState(null);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');

  const { data: employeesData } = useGetAllEmployeeQuery({ id: 0 });
  const { data: requestTypesData, isLoading: loadingTypes } = useGetEmployeeRequestTypesQuery();
const { data: leaveTypesData, isLoading: loadingLeaveTypes } = useGetAllLeaveTypesQuery();


  const employeeOptions = employeesData?.body?.data?.map(e => ({
    value: e.id,
    label: e.name
  })) || [];

 const typeOptions =
  requestTypesData?.body
    ? Object.entries(requestTypesData.body).map(([key, value]) => ({
        value: key,
        label: value,
      }))
    : [];
 const leaveTypeOptions =
  leaveTypesData?.body
    ? Object.entries(leaveTypesData.body).map(([key, value]) => ({
        value: key,
        label: value,
      }))
    : [];
   


  const [createEmployeeRequest, { isLoading }] = useCreateEmployeeRequestMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!employeeId || !type || !fromDate || !toDate || !reason.trim()) {
      toast.error(t("all_fields_required") || "جميع الحقول مطلوبة");
      return;
    }

    if (new Date(fromDate) > new Date(toDate)) {
      toast.error(t("from_date_cannot_be_after_to_date") || "تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية");
      return;
    }
if (type?.value === 'leave' && !leaveType) {
  toast.error(t("choose_leave_type"));
  return;
}
    try {
      const payload = {
    employee_id: employeeId.value,
  type: type.value,
  from_date: fromDate,
  to_date: toDate,
  reason,
  ...(type.value === 'leave' && {
    leave_type: leaveType.value,
  }),
};
      const res = await createEmployeeRequest(payload).unwrap();
      toast.success(res?.message || t("created_successfully"));
      navigate("/app/employee-requests");
    } catch (error) {
      toast.error(error?.data?.message || t("something_went_wrong"));
    }
  };

  return (
    <SectionBox className="space-y-6">
      <div className="containerTitle">{t("add_employee_request")}</div>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        {/* Employee */}
        <div>
          <label className="block mb-2 text-gray-900 label-md">{t("employee")}</label>
          <Select
            value={employeeId}
            onChange={setEmployeeId}
            options={employeeOptions}
            placeholder={t("choose_employee")}
          />
        </div>

        {/* Type */}
       {/* Request Type */}
<div>
  <label className="block mb-2 text-gray-900 label-md">{t("request_type")}</label>
  <Select
    value={type}
    onChange={setType}
    options={typeOptions}
    placeholder={t("choose_type")}
  />
</div>

{/* Leave Type - only if type is "leave" */}
{type?.value === 'leave' && (
  <div>
    <label className="block mb-2 text-gray-900 label-md">{t("leave_type")}</label>
    <Select
      value={leaveType}
      onChange={setLeaveType}
      options={leaveTypeOptions}
      placeholder={t("choose_leave_type")}
      isLoading={loadingLeaveTypes}
    />
  </div>
)}


        {/* From Date */}
        <DateInput
          label={t("from_date")}
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />

        {/* To Date */}
        <DateInput
          label={t("to_date")}
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />

        {/* Reason */}
        <div className="col-span-2">
          <TextAreaInput
          label={t('reason')}
            rows={4}
            className="w-full border rounded-md p-2"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder={t("write_reason")}
          />
        </div>

        {/* Buttons */}
        <div className="col-span-2 flex justify-end gap-4 mt-4">
          <AddingButton type="submit" disabled={isLoading}>
            {isLoading ? t("loading") : t("add")}
          </AddingButton>
          <CancelButton onClick={() => navigate("/app/employee-requests")} type="button">
            {t("cancel")}
          </CancelButton>
        </div>
      </form>
    </SectionBox>
  );
};

export default AddEmployeeRequest;
