import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetEmployeeContractByIdQuery } from '../../api/EmployeeContractsApi';
import SectionBox from '../../components/ui/containers/SectionBox';
import CancelButton from '../../components/ui/buttons/CancelBtn';
import { LuPencil } from 'react-icons/lu';
import { useTranslation } from 'react-i18next';

const ShowEmployeeContract = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useGetEmployeeContractByIdQuery(Number(id));

  if (isLoading) {
    return (
      <SectionBox className="space-y-6">
        <p>{t('loading')}</p>
      </SectionBox>
    );
  }

  if (isError) {
    return (
      <SectionBox className="space-y-6">
        <p>{t('something_went_wrong')} : {error?.data?.message || 'تعذر تحميل البيانات'}</p>
      </SectionBox>
    );
  }

  const contract = data?.body;
  if (!contract) {
    return (
      <SectionBox className="space-y-6">
        <p>{t('not_found') || 'لا توجد بيانات'}</p>
      </SectionBox>
    );
  }

  return (
    <SectionBox className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <h2 className="text-base font-bold">{t('show_employee_contract')}</h2>
          <button className="EditPermissionBtn">
            <CancelButton type="button" onClick={() => navigate(`/app/employee-contracts/edit/${id}`)}>
              <LuPencil /> {t('edit')}
            </CancelButton>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center px-4 py-2">
            <span className="font-semibold text-gray-600 w-40">{t('employee_name')}:</span>
            <p className="text-gray-900">{contract?.employee?.name || '-'}</p>
          </div>

          <div className="flex items-center px-4 py-2">
            <span className="font-semibold text-gray-600 w-40">{t('attendance_rule')}:</span>
            <p className="text-gray-900">{contract?.attendance_rule?.name || '-'}</p>
          </div>

          <div className="flex items-center px-4 py-2">
            <span className="font-semibold text-gray-600 w-40">{t('salary')}:</span>
            <p className="text-gray-900">{contract?.salary || '-'}</p>
          </div>

          <div className="flex items-center px-4 py-2">
            <span className="font-semibold text-gray-600 w-40">{t('start_date')}:</span>
            <p className="text-gray-900">{contract?.start_date?.date || '-'}</p>
          </div>

          <div className="flex items-center px-4 py-2">
            <span className="font-semibold text-gray-600 w-40">{t('end_date')}:</span>
            <p className="text-gray-900">{contract?.end_date?.date || '-'}</p>
          </div>

          <div className="flex items-center px-4 py-2">
            <span className="font-semibold text-gray-600 w-40">{t('status')}:</span>
            <p className="text-gray-900">{contract?.is_active === '1' ? t('active') : t('inactive')}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <CancelButton onClick={() => navigate('/app/employee-contracts')} type="button">
          {t('back')}
        </CancelButton>
      </div>
    </SectionBox>
  );
};

export default ShowEmployeeContract;
