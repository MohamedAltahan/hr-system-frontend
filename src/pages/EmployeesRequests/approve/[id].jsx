import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SectionBox from "../../../components/ui/containers/SectionBox";
import AddingButton from "../../../components/ui/buttons/AddingBtn";
import CancelButton from "../../../components/ui/buttons/CancelBtn";
import Select from "react-select";
import TextAreaInput from "../../../components/reusable_components/TextAreaInput";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useUpdateEmployeeRequestStatusMutation } from "../../../api/EmployeeRequestsApi";

const ApproveEmployeeRequest = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [status, setStatus] = useState(null);
  const [manager_comment, setComment] = useState("");
  const [updateStatus, { isLoading }] = useUpdateEmployeeRequestStatusMutation();

  const statusOptions = [
    { value: "pending", label: t("pending") },
    { value: "approved", label: t("approved") },
    { value: "rejected", label: t("rejected") },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!status) {
      toast.error(t("please_choose_status"));
      return;
    }

    try {
      const payload = {
        id,
        status: status.value,
        manager_comment,
      };
      const res = await updateStatus(payload).unwrap();
      toast.success(res?.message || t("status_updated_successfully"));
      navigate("/app/employee-requests");
    } catch (error) {
      toast.error(error?.data?.message || t("something_went_wrong"));
    }
  };

  return (
    <SectionBox className="space-y-6">
      <div className="containerTitle">{t("approve_request")}</div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 ">
        <div>
          <label className="block mb-2 text-gray-900">{t("choose_status")}</label>
          <Select
            value={status}
            onChange={setStatus}
            options={statusOptions}
            placeholder={t("choose_status")}
          />
        </div>

        <div>
          <TextAreaInput
            label={t("manager_comment")}
            value={manager_comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-4">
          <AddingButton type="submit" disabled={isLoading}>
            {isLoading ? t("loading") : t("confirm")}
          </AddingButton>
          <CancelButton onClick={() => navigate("/app/employee-requests")} type="button">
            {t("cancel")}
          </CancelButton>
        </div>
      </form>
    </SectionBox>
  );
};

export default ApproveEmployeeRequest;
