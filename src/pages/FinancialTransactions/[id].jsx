import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetFinancialTransactionByIdQuery } from '../../api/financialTransactionsApi';
import SectionBox from '../../components/ui/containers/SectionBox';
import CancelButton from '../../components/ui/buttons/CancelBtn';
import { LuPencil } from 'react-icons/lu';
import { useTranslation } from 'react-i18next';

const statusOptions = {
  pending: 'قيد الانتظار',
  rejected: 'مرفوض',
  accepted: 'مقبول',
};

const ShowFinancialTransaction = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useGetFinancialTransactionByIdQuery(Number(id));

  if (isLoading) {
    return (
      <SectionBox className="space-y-6">
        <p>{t('loading')}</p>
      </SectionBox>
    );
  }

  if (isError) {
    return (
      <p>
        {t('error_occurred')}: {error?.data?.message || t('unable_to_load_data')}
      </p>
    );
  }

  const transaction = data?.body;
  if (!transaction) return <p>{t('not_found')}</p>;

  return (
    <SectionBox className="space-y-6">
      <h2 className="text-lg font-bold">{t('show_financial_transaction')}</h2>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <h2 className="text-base font-bold">{t('transaction_details')}</h2>
          <button className="EditPermissionBtn">
            <CancelButton onClick={() => navigate(`/app/financial-transactions/edit/${id}`)}>
              <LuPencil /> {t('edit')}
            </CancelButton>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center px-4 py-2 text-sm">
            <span className="font-semibold text-gray-600 w-40">{t('employee_name')}:</span>
            <p className="text-gray-900">{transaction?.empoloyee?.name || '-'}</p>
          </div>

          <div className="flex items-center px-4 py-2 text-sm">
            <span className="font-semibold text-gray-600 w-40">{t('department')}:</span>
            <p className="text-gray-900">{transaction?.empoloyee?.department || '-'}</p>
          </div>

          <div className="flex items-center px-4 py-2 text-sm">
            <span className="font-semibold text-gray-600 w-40">{t('transaction_name')}:</span>
            <p className="text-gray-900">{transaction?.transaction_name || '-'}</p>
          </div>

          <div className="flex items-center px-4 py-2 text-sm">
            <span className="font-semibold text-gray-600 w-40">{t('transaction_type')}:</span>
            <p className="text-gray-900">{t(transaction?.transaction_type) || '-'}</p>
          </div>

          <div className="flex items-center px-4 py-2 text-sm">
            <span className="font-semibold text-gray-600 w-40">{t('amount')}:</span>
            <p className="text-gray-900">{transaction?.amount || '-'}</p>
          </div>

          <div className="flex items-center px-4 py-2 text-sm">
            <span className="font-semibold text-gray-600 w-40">{t('date')}:</span>
            <p className="text-gray-900">{transaction?.date?.datetime || '-'}</p>
          </div>

          <div className="flex items-center px-4 py-2 text-sm">
            <span className="font-semibold text-gray-600 w-40">{t('status')}:</span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium
                ${
                  transaction?.status === 'accepted'
                    ? 'bg-green-100 text-green-800'
                    : transaction?.status === 'rejected'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }
              `}
            >
              {statusOptions[transaction?.status] || '-'}
            </span>
          </div>

          <div className="flex items-center px-4 py-2 text-sm col-span-2">
            <span className="font-semibold text-gray-600 w-40">{t('notes')}:</span>
            <p className="text-gray-900">{transaction?.notes || '-'}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <CancelButton type="button" onClick={() => navigate('/app/financial-transactions')}>
          {t('back')}
        </CancelButton>
      </div>
    </SectionBox>
  );
};

export default ShowFinancialTransaction;
