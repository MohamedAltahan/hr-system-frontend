import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionBox from "../../components/ui/containers/SectionBox";
import AddingButton from "../../components/ui/buttons/AddingBtn";
import CancelButton from "../../components/ui/buttons/CancelBtn";
import TextInput from "../../components/reusable_components/TextInput";
import Select from "react-select";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import { useGetAllEmployeeQuery } from "../../api/Employee";
import { useCreateDisciplinaryActionMutation ,useGetDisciplinaryActionsListQuery} from "../../api/disciplinaryActionsApi";
import TextAreaInput from "../../components/reusable_components/TextAreaInput";

const AddDisciplinaryAction = () => {
  const { t } = useTranslation();
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


      const { data: actionTypeData } = useGetDisciplinaryActionsListQuery({ page: 1 });
  const actionTypeOptions =
    actionTypeData?.body
? Object.entries(actionTypeData.body).map(([key, value]) => ({
        value: key,
        label: value,
      }))
    : [];


  const statusOptions = [
    { value: "pending", label: t("pending") },
    { value: "accepted", label: t("approved") },
    { value: "rejected", label: t("rejected") },
  ];

  const [createAction, { isLoading }] = useCreateDisciplinaryActionMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!employee || !actionType || !status || !amount || !executionDate || !reason) {
      toast.error(t("all_fields_required") || "\u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0644 \u0645\u0637\u0644\u0648\u0628\u0629");
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

      const res = await createAction(formData).unwrap();
      toast.success(res?.message || t("added_successfully"));
      navigate("/app/disciplinary-actions");
    } catch (err) {
      toast.error(err?.data?.message || t("something_went_wrong"));
    }
  };

  return (
    <SectionBox className="space-y-6">
      <div className="containerTitle">{t("add_disciplinary_action")}</div>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 text-gray-900 label-md">{t("employee")}</label>
          <Select
            value={employee}
            onChange={setEmployee}
            options={employeeOptions}
            placeholder={t("choose_employee")}
          />
        </div>

        <div>
          <label className="block mb-2 text-gray-900 label-md">{t("action_type")}</label>
          <Select
            value={actionType}
            onChange={setActionType}
            options={actionTypeOptions}
            placeholder={t("choose_action_type")}
          />
        </div>

        <TextInput
          label={t("amount")}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
        />

        <TextInput
          label={t("execution_date")}
          value={executionDate}
          onChange={(e) => setExecutionDate(e.target.value)}
          type="date"
        />

        <div>
          <label className="block mb-2 text-gray-900 label-md">{t("status")}</label>
          <Select
            value={status}
            onChange={setStatus}
            options={statusOptions}
            placeholder={t("choose_status")}
          />
        </div>

        <div className="col-span-2">
          <TextAreaInput
            label={t("reason")}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>

        <div className="col-span-2 flex justify-end gap-4 mt-4">
          <AddingButton type="submit" disabled={isLoading}>
            {isLoading ? t("loading") : t("save")}
          </AddingButton>
          <CancelButton onClick={() => navigate("/app/disciplinary-actions")} type="button">
            {t("cancel")}
          </CancelButton>
        </div>
      </form>
    </SectionBox>
  );
};

export default AddDisciplinaryAction;
