import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MdDelete, MdEdit } from 'react-icons/md';
import { toast } from "react-toastify";

import {
  useGetAllLeavesQuery,
  useDeleteLeaveMutation,
} from '../../api/LeavesManagmentApi';
import SectionBox from '../../components/ui/containers/SectionBox';
import ProductTable from '../../components/reusable_components/DataTable';
import AddingButton from '../../components/ui/buttons/AddingBtn';
import ConfirmDialog from '../../components/reusable_components/ConfirmDialog';

const StatusChip = ({ status }) => {
  const { t } = useTranslation();
  const statusMap = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  };

  return (
    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${statusMap[status] || 'bg-gray-100 text-gray-800'}`}>
      {t(`status_${status}`)}
    </span>
  );
};

const LeavesIndex = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const { data, isLoading } = useGetAllLeavesQuery({ page });
  const [deleteLeave] = useDeleteLeaveMutation();

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };


   const handleConfirmDelete = async () => {
      try {
        const res = await deleteLeave(selectedId).unwrap();
        toast.success(res?.message || t("deleted_successfully"));
      } catch (error) {
        toast.error(error?.message || t("delete_failed"));
      } finally {
        setConfirmOpen(false);
      }
    };

  const leaves = data?.body?.data?.map((item) => ({
    ...item,
    employee_name: item.empoloyee?.name || '-',
    employee_number: item.empoloyee?.number || '-',
    department: item.empoloyee?.department || '-',
    leave_type: Object.values(item.leave_type || {})[0] || '-',
    from_date: item.from_date?.date || '-',
    to_date: item.to_date?.date || '-',
    days: item.days,
    status: <StatusChip status={item.status} />,
  })) || [];

  const pagination = data?.body?.paginate;

  const headers = [
    { key: 'employee_name', label: t('employee') },
    // { key: 'employee_number', label: t('employee_number') },
    { key: 'department', label: t('department') },
    { key: 'leave_type', label: t('leave_type') },
    { key: 'from_date', label: t('from_date') },
    { key: 'to_date', label: t('to_date') },
    { key: 'days', label: t('days_num') },
    { key: 'status', label: t('status') },
  ];

  return (
    <SectionBox className="space-y-4">
      <div className="grid grid-cols-2 items-center gap-4">
        <div className="containerTitle">{t('leaves')}</div>
        {/* <div className="flex justify-end">
          <a href="/app/leaves/add">
            <AddingButton>{t('add')}</AddingButton>
          </a>
        </div> */}
      </div>

      {isLoading ? (
        <div className="text-center">{t('loading')}</div>
      ) : (
        <ProductTable
          headers={headers}
          data={leaves}
          baseRoute="/app/leaves"
          pagination={pagination}
          onPageChange={(newPage) => setPage(newPage)}
          rowKey="id"
          renderActions={(item) => (
            <div className="flex gap-2 items-center">
              {/* <a href={`/app/leaves/edit/${item.id}`} className="text-blue-600 hover:underline">
                <MdEdit />
              </a> */}
              <button onClick={() => handleDeleteClick(item.id)} className="text-red-600">
                <MdDelete />
              </button>
            </div>
          )}
        />
      )}

      <ConfirmDialog
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title={t('confirm_delete')}
        message={t('are_you_sure_you_want_to_delete_this_leave')}
      />
    </SectionBox>
  );
};

export default LeavesIndex;
