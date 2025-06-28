import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SectionBox from "../../../components/ui/containers/SectionBox";
import AddingButton from "../../../components/ui/buttons/AddingBtn";
import CancelButton from "../../../components/ui/buttons/CancelBtn";
import Select from "react-select";
import TextInput from "../../../components/reusable_components/TextInput";
import DateInput from "../../../components/reusable_components/DateInput";
import TextAreaInput from "../../../components/reusable_components/TextAreaInput";
import { useGetAllEmployeeQuery } from "../../../api/Employee";
import {
  useGetEmployeeRequestByIdQuery,
  useUpdateEmployeeRequestMutation,
  useGetEmployeeRequestTypesQuery
} from "../../../api/EmployeeRequestsApi";
import { useGetAllLeaveTypesQuery } from "../../../api/leaveTypesApi";

import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const EditEmployeeRequest = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: employeesData } = useGetAllEmployeeQuery({ id: 0 });
  const { data: requestData, isLoading: loadingRequest } = useGetEmployeeRequestByIdQuery(id);
    const { data: requestTypesData, isLoading: loadingTypes } = useGetEmployeeRequestTypesQuery();
  
  const [updateRequest, { isLoading }] = useUpdateEmployeeRequestMutation();
const { data: leaveTypesData, isLoading: loadingLeaveTypes } = useGetAllLeaveTypesQuery();
const [leaveType, setLeaveType] = useState(null);


  const [employeeId, setEmployeeId] = useState(null);
  const [type, setType] = useState(null);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');
  const [time, setTime] = useState('');

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
useEffect(() => {
  if (requestData?.body) {
    const req = requestData.body;

    setEmployeeId({
      value: req.employee?.id,
      label: req.employee?.name,
    });

    // Type
    const reqTypeKey = Object.keys(req.type)?.[0]; // e.g., "leave"
    const reqTypeLabel = req.type?.[reqTypeKey];   // e.g., "إجازة"

    setType({
      value: reqTypeKey,
      label: reqTypeLabel,
    });

    // Leave Type (if exists)
    if (req.leave_type) {
      const reqLeaveTypeKey = Object.keys(req.leave_type)?.[0]; // e.g., "3"
      const reqLeaveTypeLabel = req.leave_type?.[reqLeaveTypeKey]; // e.g., "Annual Leave"

      setLeaveType({
        value: reqLeaveTypeKey,
        label: reqLeaveTypeLabel,
      });
    }

    setFromDate(req.from_date?.date || '');
    setToDate(req.to_date?.date || '');
    setReason(req.reason || '');
        // Set time (if exists)
    if (req.time?.time_24hr) {
      setTime(req.time.time_24hr); // Format: "18:14"
    }

  }
}, [requestData]);


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
      ...(['late_arrival', 'early_departure'].includes(type.value) && { time }),

    };

    const res = await updateRequest({ id, body: payload }).unwrap(); // ✅ FIXED
    toast.success(res?.message || t("updated_successfully"));
    navigate("/app/employee-requests");
  } catch (error) {
    toast.error(error?.data?.message || t("something_went_wrong"));
  }
};


  return (
    <SectionBox className="space-y-6">
      <div className="containerTitle">{t("edit_employee_request")}</div>

      {loadingRequest ? (
        <p>{t("loading")}</p>
      ) : (
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

{/* Time Input - only for late_arrival or early_departure */}
{['late_arrival', 'early_departure'].includes(type?.value) && (
  <div>
  
    
              <TextInput
                label={t("time")}
                value={time}
                onChange={(e) => setTime(e.target.value)}
                type="time"
              />
  </div>
)}


          <DateInput
            label={t("from_date")}
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />

          <DateInput
            label={t("to_date")}
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />

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

          <div className="col-span-2 flex justify-end gap-4 mt-4">
            <AddingButton type="submit" disabled={isLoading}>
              {isLoading ? t("loading") : t("update")}
            </AddingButton>
            <CancelButton type="button" onClick={() => navigate("/app/employee-requests")}>
              {t("cancel")}
            </CancelButton>
          </div>
        </form>
      )}
    </SectionBox>
  );
};

export default EditEmployeeRequest;