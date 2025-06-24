import { useState } from "react";
import {
  useGetAllHiringApplicationsQuery,
  useDeleteHiringApplicationMutation,
} from "../../api/hiringApplicationsApi";

import { MdEdit, MdDelete, MdVisibility } from "react-icons/md";
import { toast } from "react-toastify";
import { useTranslation } from 'react-i18next';
import { useSearchParams } from "react-router-dom";

import AddingButton from "../../components/ui/buttons/AddingBtn";
import SectionBox from "../../components/ui/containers/SectionBox";
import ProductTable from "../../components/reusable_components/DataTable";
import ConfirmDialog from "../../components/reusable_components/ConfirmDialog";

const HiringApplications = ({  }) => {
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();

  const openingPositionId = searchParams.get("opening_position_id");
  

  const { t } = useTranslation();

const { data: applicationsData } = useGetAllHiringApplicationsQuery({ opening_position_id: openingPositionId, page });


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
  const status = item.status;

  const statusMap = {
    pending: { label: 'قيد الانتظار', className: 'bg-yellow-100 text-yellow-800' },
    accepted: { label: 'مقبول', className: 'bg-green-100 text-green-800' },
    rejected: { label: 'مرفوض', className: 'bg-red-100 text-red-800' },
  };

  const chip = (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
        statusMap[status]?.className || 'bg-gray-100 text-gray-800'
      }`}
    >
      {statusMap[status]?.label || status}
    </span>
  );

  return {
    ...item,
    position: item.opening_position?.name || '-',
    cv_link: item.cv
      ? <a href={item.cv} target="_blank" rel="noopener noreferrer">{t('view_cv')}</a>
      : '-',
    status: chip,
    birthdate: item.birthdate || '-',
  };
});


    const headers = [
        { key: 'name', label: t('name') },
        { key: 'email', label: t('email') },
        { key: 'phone', label: t('phone') },
        { key: 'current_salary', label: t('current_salary') },
            { key: 'expected_salary', label: t('expected_salary') },

            { key: 'status', label: t('status') },

        // { key: 'cv_link', label: t('cv') },
        
    ];

  return (
    <SectionBox className="space-y-4">
      <div className="grid grid-cols-2 items-center gap-4">
        <div className="containerTitle mb-3">{t('hiring_applications')}</div>
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
  <a
    href={`/app/hiring-applications/change-application-status/${item.id}`}
    className="text-blue-600 hover:underline editIcon"
          title={t("change_status")}

  >
      ✅
  </a>

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
