import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LuPencil } from "react-icons/lu";
import SectionBox from "../../components/ui/containers/SectionBox";
import CancelButton from "../../components/ui/buttons/CancelBtn";

import { useGetCarriedForwardLeaveByIdQuery } from "../../api/CarriedForwardLeavesApi";

const ShowCarriedForwardLeave = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data, isLoading, isError, error } = useGetCarriedForwardLeaveByIdQuery(id);
  const leave = data?.body;

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
        <p>{t("something_went_wrong")}: {error?.data?.message || "تعذر تحميل البيانات"}</p>
      </SectionBox>
    );
  }

  if (!leave) {
    return (
      <SectionBox className="space-y-6">
        <p>{t("not_found")}</p>
      </SectionBox>
    );
  }

  return (
    <SectionBox className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <h2 className="text-base font-bold">{t("carried_forward_leave")}</h2>
          <button className="EditPermissionBtn">
            <CancelButton onClick={() => navigate(`/app/carried_forward_leaves/edit/${id}`)} type="button">
            <LuPencil /> {t("edit")}
          </CancelButton>
      </button>
        </div>

        <div className="grid grid-cols-2 gap-2 pb-3 text-sm">
          <div className="flex items-center px-4 py-2">
            <span className="font-semibold text-gray-600 w-32">{t("employee_name")}:</span>
            <p className="text-gray-900">{leave.empoloyee?.name || "-"}</p>
          </div>
{/* 
          <div className="flex items-center px-4 py-2">
            <span className="font-semibold text-gray-600 w-32">{t("employee_number")}:</span>
            <p className="text-gray-900">{leave.empoloyee?.number || "-"}</p>
          </div> */}

          <div className="flex items-center px-4 py-2">
            <span className="font-semibold text-gray-600 w-32">{t("department")}:</span>
            <p className="text-gray-900">{leave.empoloyee?.department || "-"}</p>
          </div>

          <div className="flex items-center px-4 py-2">
            <span className="font-semibold text-gray-600 w-32">{t("year")}:</span>
            <p className="text-gray-900">{leave.year || "-"}</p>
          </div>

          <div className="flex items-center px-4 py-2">
            <span className="font-semibold text-gray-600 w-32">{t("days_balance")}:</span>
            <p className="text-gray-900">{leave.days_balance || 0}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <CancelButton onClick={() => navigate("/app/carried_forward_leaves")}>
          {t("back")}
        </CancelButton>
      </div>
    </SectionBox>
  );
};

export default ShowCarriedForwardLeave;
