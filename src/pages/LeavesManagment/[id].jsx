import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LuPencil } from "react-icons/lu";
import SectionBox from "../../components/ui/containers/SectionBox";
import CancelButton from "../../components/ui/buttons/CancelBtn";
import { useGetLeaveByIdQuery } from "../../api/LeavesManagmentApi";

const StatusChip = ({ status }) => {
  const { t } = useTranslation();

  const statusMap = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
        statusMap[status] || "bg-gray-100 text-gray-800"
      }`}
    >
      {t(`status_${status}`)}
    </span>
  );
};

const ShowLeave = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useGetLeaveByIdQuery(id);

  if (isLoading) {
    return <SectionBox>{t("loading")}</SectionBox>;
  }

  if (isError) {
    return (
      <SectionBox>
        <p className="text-red-600">{error?.data?.message || t("something_went_wrong")}</p>
      </SectionBox>
    );
  }

  const leave = data?.body;

  if (!leave) {
    return (
      <SectionBox>
        <p>{t("not_found")}</p>
      </SectionBox>
    );
  }

  const leaveType = Object.values(leave.leave_type || {})[0] || "-";

  return (
    <SectionBox className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <h2 className="text-base font-bold">{t("leave_details")}</h2>
          {/* <button>
            <CancelButton onClick={() => navigate(`/app/leaves/edit/${id}`)} type="button">
              <LuPencil /> {t("edit")}
            </CancelButton>
          </button> */}
        </div>

        <div className="grid grid-cols-2 gap-2 pb-3" style={{ fontSize: '14px' }}>
          <div className="flex items-center px-4 py-2">
            <span className="font-semibold text-gray-600 w-32">{t("employee_name")}:</span>
            <p className="text-gray-900">{leave.empoloyee?.name || "-"}</p>
          </div>

          <div className="flex items-center px-4 py-2">
            <span className="font-semibold text-gray-600 w-32">{t("department")}:</span>
            <p className="text-gray-900">{leave.empoloyee?.department || "-"}</p>
          </div>

          <div className="flex items-center px-4 py-2">
            <span className="font-semibold text-gray-600 w-32">{t("leave_type")}:</span>
            <p className="text-gray-900">{leaveType}</p>
          </div>

          <div className="flex items-center px-4 py-2">
            <span className="font-semibold text-gray-600 w-32">{t("from_date")}:</span>
            <p className="text-gray-900">{leave.from_date?.date || "-"}</p>
          </div>

          <div className="flex items-center px-4 py-2">
            <span className="font-semibold text-gray-600 w-32">{t("to_date")}:</span>
            <p className="text-gray-900">{leave.to_date?.date || "-"}</p>
          </div>

          <div className="flex items-center px-4 py-2">
            <span className="font-semibold text-gray-600 w-32">{t("days_num")}:</span>
            <p className="text-gray-900">{leave.days}</p>
          </div>

          <div className="flex items-center px-4 py-2">
            <span className="font-semibold text-gray-600 w-32">{t("status")}:</span>
            <StatusChip status={leave.status} />
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <CancelButton onClick={() => navigate("/app/leaves")}>
          {t("back")}
        </CancelButton>
      </div>
    </SectionBox>
  );
};

export default ShowLeave;
