import { useState } from "react";
import {
  useGetAllHiringApplicationsQuery,
  useDeleteHiringApplicationMutation,
} from "../../api/hiringApplicationsApi";

import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { useTranslation } from 'react-i18next';
import { useSearchParams } from "react-router-dom";

import SectionBox from "../../components/ui/containers/SectionBox";
import ProductTable from "../../components/reusable_components/DataTable";
import ConfirmDialog from "../../components/reusable_components/ConfirmDialog";

const HiringApplications = () => {
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();

  const openingPositionId = searchParams.get("opening_position_id");
const status = searchParams.get("status") || "pending"; // <- default to pending

  const { data: applicationsData } = useGetAllHiringApplicationsQuery({
    opening_position_id: openingPositionId ? Number(openingPositionId) : undefined,
    status: status || undefined,
    page,
  });

  const pagination = applicationsData?.body?.paginate;

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [deleteHiringApplication] = useDeleteHiringApplicationMutation();

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await deleteHiringApplication(selectedId).unwrap();
      toast.success(res?.message || t('deleted_successfully'));
    } catch (error) {
      toast.error(error?.data?.message || t('delete_failed'));
    } finally {
      setConfirmOpen(false);
    }
  };

  const applications = (applicationsData?.body?.data || []).map((item) => {
    const statusMap = {
      pending: { label: 'قيد الانتظار', className: 'bg-yellow-100 text-yellow-800' },
      accepted: { label: 'مقبول', className: 'bg-green-100 text-green-800' },
      rejected: { label: 'مرفوض', className: 'bg-red-100 text-red-800' },
    };

    return {
      ...item,
      position: item.opening_position?.name || '-',
      cv_link: item.cv
        ? <a href={item.cv} target="_blank" rel="noopener noreferrer">{t('view_cv')}</a>
        : '-',
      birthdate: item.birthdate || '-',
      status: (
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            statusMap[item.status]?.className || 'bg-gray-100 text-gray-800'
          }`}
        >
          {statusMap[item.status]?.label || item.status}
        </span>
      ),
    };
  });

  const headers = [
    { key: 'name', label: t('name') },
    { key: 'email', label: t('email') },
    { key: 'phone', label: t('phone') },
    { key: 'current_salary', label: t('current_salary') },
    { key: 'expected_salary', label: t('expected_salary') },
    { key: 'status', label: t('status') },
  ];

  const handleTabClick = (newStatus) => {
    const params = new URLSearchParams(searchParams);
    if (newStatus) {
      params.set("status", newStatus);
    } else {
      params.delete("status");
    }
    params.set("page", "1"); // reset to page 1
    setSearchParams(params);
  };

  return (
    <SectionBox className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-3">
        <div className="containerTitle">{t('hiring_applications')}</div>

        <div className="flex gap-2">
          {[
           
            { key: "pending", label: t("pending_applications") },
            { key: "rejected", label: t("rejected_applications") },
          ].map(({ key, label }) => (
            <button
              key={key || "all"}
              onClick={() => handleTabClick(key)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium border transition ${
                (!status && key === null) || status === key
                  ? 'bg-[#055393] text-white border-[#055393]'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <ProductTable
        headers={headers}
        data={applications}
        baseRoute="/app/hiring-applications"
        pagination={pagination}
        onPageChange={(newPage) => setPage(Number(newPage))}
        rowKey="id"
        renderActions={(item) => (
          <div className="flex gap-2 items-center">
            <button onClick={() => handleDeleteClick(item.id)} className="deleteIcon">
              <MdDelete />
            </button>
          </div>
        )}
      />

      <ConfirmDialog
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title={t('confirm_delete')}
        message={t('confirm_delete_message_hiring_application')}
      />
    </SectionBox>
  );
};

export default HiringApplications;
