import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SectionBox from "../../../components/ui/containers/SectionBox";
import AddingButton from "../../../components/ui/buttons/AddingBtn";
import CancelButton from "../../../components/ui/buttons/CancelBtn";
import TextInput from "../../../components/reusable_components/TextInput";
import Select from "react-select";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import { useGetAllEmployeeQuery } from "../../../api/Employee";
import {
  useGetDisciplinaryActionByIdQuery,
  useUpdateDisciplinaryActionMutation,
  useGetDisciplinaryActionsListQuery } from "../../../api/disciplinaryActionsApi";
import TextAreaInput from "../../../components/reusable_components/TextAreaInput";

const EditDisciplinaryAction = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [actionType, setActionType] = useState(null);
  const [amount, setAmount] = useState("");
  const [executionDate, setExecutionDate] = useState("");
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState(null);

  const { data: employeesData } = useGetAllEmployeeQuery({ page: 1 });
  const employeeOptions =
    employeesData?.body?.data?.map((emp) => ({
      value: emp.id,
      label: emp.name,
    })) || [];



  const statusOptions = [
    { value: "pending", label: t("pending") },
    { value: "approved", label: t("approved") },
    { value: "rejected", label: t("rejected") },
  ];

  const { data, isLoading: fetching } = useGetDisciplinaryActionByIdQuery(Number(id));
  const [updateAction, { isLoading }] = useUpdateDisciplinaryActionMutation();

  // Prepare Action Type Options
const { data: actionTypeData } = useGetDisciplinaryActionsListQuery({ page: 1 });

const actionTypeOptions = actionTypeData?.body
  ? Object.entries(actionTypeData.body).map(([key, value]) => ({
      value: key,
      label: value,
    }))
  : [];

// Prefill form data if editing
useEffect(() => {
  if (data?.body) {
    const a = data.body;

    // Employee
    setEmployee({
      value: a.empoloyee?.id,
      label: a.empoloyee?.name,
    });

    // Action Type (use value/label pair from fetched options)
    const actionTypeKey = a.action_type;
    const actionTypeLabel =
      actionTypeData?.body?.[actionTypeKey] || ''; // fallback if options not loaded yet

    setActionType({
      value: actionTypeKey,
      label: actionTypeLabel,
    });

    // Other fields
    setAmount(a.amount || '');
    setExecutionDate(a.execution_date?.date || '');
    setReason(a.reason || '');

    setStatus(
      statusOptions.find((opt) => opt.value === a.status) || null
    );
  }
}, [data, actionTypeData]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!employee || !actionType || !status || !amount || !executionDate || !reason) {
      toast.error(t("all_fields_required") || "جميع الحقول مطلوبة");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("employee_id", employee.value);
      formData.append("action_type", actionType.value);
      formData.append("amount", amount);
      formData.append("execution_date", executionDate);
      formData.append("reason", reason);
      formData.append("status", status.value);

      const res = await updateAction({ id, formData }).unwrap();
      toast.success(res?.message || t("updated_successfully"));
      navigate("/app/disciplinary-actions");
    } catch (err) {
      toast.error(err?.data?.message || t("something_went_wrong"));
    }
  };

  return (
    <SectionBox className="space-y-6">
      <div className="containerTitle">{t("edit_disciplinary_action")}</div>

      {fetching ? (
        <div className="text-center py-10">{t("loading")}</div>
      ) : (
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          {/* Employee Select */}
          <div >
            <label className="block mb-2 text-gray-900 label-md">{t("employee")}</label>
            <Select
              value={employee}
              onChange={setEmployee}
              options={employeeOptions}
              placeholder={t("choose_employee")}
            />
          </div>

          {/* Action Type */}
          <div >
            <label className="block mb-2 text-gray-900 label-md">{t("action_type")}</label>
            <Select
              value={actionType}
              onChange={setActionType}
              options={actionTypeOptions}
              placeholder={t("choose_action_type")}
            />
          </div>

          {/* Amount */}
          <TextInput
            label={t("amount")}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
          />

          {/* Execution Date */}
          <TextInput
            label={t("execution_date")}
            value={executionDate}
            onChange={(e) => setExecutionDate(e.target.value)}
            type="date"
          />
   {/* Status */}
          <div >
            <label className="block mb-2 text-gray-900 label-md">{t("status")}</label>
            <Select
              value={status}
              onChange={setStatus}
              options={statusOptions}
              placeholder={t("choose_status")}
            />
          </div>
          {/* Reason */}
          <div className="col-span-2">
            <TextAreaInput
              label={t("reason")}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>

       

          <div className="col-span-2 flex justify-end gap-4 mt-4">
            <AddingButton type="submit" disabled={isLoading}>
              {isLoading ? t("loading") : t("update")}
            </AddingButton>
            <CancelButton onClick={() => navigate("/app/disciplinary-actions")} type="button">
              {t("cancel")}
            </CancelButton>
          </div>
        </form>
      )}
    </SectionBox>
  );
};

export default EditDisciplinaryAction;
