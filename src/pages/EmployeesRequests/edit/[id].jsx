import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SectionBox from "../../../components/ui/containers/SectionBox";
import AddingButton from "../../../components/ui/buttons/AddingBtn";
import CancelButton from "../../../components/ui/buttons/CancelBtn";
import Select from "react-select";
import DateInput from "../../../components/reusable_components/DateInput";
import TextAreaInput from "../../../components/reusable_components/TextAreaInput";
import { useGetAllEmployeeQuery } from "../../../api/Employee";
import {
  useGetEmployeeRequestByIdQuery,
  useUpdateEmployeeRequestMutation,
} from "../../../api/EmployeeRequestsApi";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const EditEmployeeRequest = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: employeesData } = useGetAllEmployeeQuery({ id: 0 });
  const { data: requestData, isLoading: loadingRequest } = useGetEmployeeRequestByIdQuery(id);
  const [updateRequest, { isLoading }] = useUpdateEmployeeRequestMutation();

  const [employeeId, setEmployeeId] = useState(null);
  const [type, setType] = useState(null);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');

  const employeeOptions = employeesData?.body?.data?.map(e => ({
    value: e.id,
    label: e.name
  })) || [];

  const typeOptions = [
    { value: "leave", label: t("leave") || "إجازة" },
    { value: "loan", label: t("loan") || "سلفة" },
  ];

  useEffect(() => {
    if (requestData?.body) {
      const req = requestData.body;
      setEmployeeId({
        value: req.employee?.id,
        label: req.employee?.name,
      });

      const reqTypeKey = Object.keys(req.type)?.[0]; // e.g., "loan"
      const reqTypeLabel = req.type?.[reqTypeKey];   // e.g., "سلفة"

      setType({
        value: reqTypeKey,
        label: reqTypeLabel,
      });

      setFromDate(req.from_date?.date || '');
      setToDate(req.to_date?.date || '');
      setReason(req.reason || '');
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

          <div>
            <label className="block mb-2 text-gray-900 label-md">{t("request_type")}</label>
            <Select
              value={type}
              onChange={setType}
              options={typeOptions}
              placeholder={t("choose_type")}
            />
          </div>

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