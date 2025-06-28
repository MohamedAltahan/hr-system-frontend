import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetDisciplinaryActionByIdQuery } from "../../api/disciplinaryActionsApi";
import SectionBox from "../../components/ui/containers/SectionBox";
import CancelButton from "../../components/ui/buttons/CancelBtn";
import { LuPencil } from "react-icons/lu";
import { useTranslation } from "react-i18next";

const ShowDisciplinaryAction = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useGetDisciplinaryActionByIdQuery(Number(id));

  if (isLoading) {
    return (
      <SectionBox className="space-y-6">
        <p>{t("loading")}</p>
      </SectionBox>
    );
  }

  if (isError) {
    return (
      <SectionBox className="space-y-6">
        <p>{t("something_went_wrong")} : {error?.data?.message || "تعذر تحميل البيانات"}</p>
      </SectionBox>
    );
  }

  const action = data?.body;
  if (!action) return <p>{t("not_found") || "لا توجد بيانات"}</p>;

  return (
    <SectionBox className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <h2 className="text-base font-bold">{t("show_disciplinary_action")}</h2>
          <button className="EditPermissionBtn">
            <CancelButton onClick={() => navigate(`/app/disciplinary-actions/edit/${id}`)}>
              <LuPencil /> {t("edit")}
            </CancelButton>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2 pb-2" style={{ fontSize: "14px" }}>
          <div className="flex items-center px-4 py-2">
            <span className="font-semibold text-gray-600 w-32">{t("employee")}:</span>
            <p className="text-gray-900">{action?.empoloyee?.name || "-"}</p>
          </div>

          <div className="flex items-center px-4 py-2">
            <span className="font-semibold text-gray-600 w-32">{t("execution_date")}:</span>
            <p className="text-gray-900">{action?.execution_date?.date || "-"}</p>
          </div>

          <div className="flex items-center px-4 py-2">
            <span className="font-semibold text-gray-600 w-32">{t("amount")}:</span>
            <p className="text-gray-900">{action?.amount || "-"}</p>
          </div>

          <div className="flex items-center px-4 py-2">
            <span className="font-semibold text-gray-600 w-32">{t("status")}:</span>
            <p className="text-gray-900">{t(action?.status) || "-"}</p>
          </div>

          <div className="flex items-center px-4 py-2">
            <span className="font-semibold text-gray-600 w-32">{t("action_type")}:</span>
            <p className="text-gray-900">{t(action?.action_type) || "-"}</p>
          </div>

          <div className="flex items-center px-4 py-2 col-span-2">
            <span className="font-semibold text-gray-600 w-32">{t("reason")}:</span>
            <p className="text-gray-900">{action?.reason || "-"}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <CancelButton onClick={() => navigate("/app/disciplinary-actions")} type="button">
          {t("back")}
        </CancelButton>
      </div>
    </SectionBox>
  );
};

export default ShowDisciplinaryAction;
