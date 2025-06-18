import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetEvaluationByIdQuery } from '../../api/EmployeeEvaluationApi';
import SectionBox from '../../components/ui/containers/SectionBox';
import CancelButton from '../../components/ui/buttons/CancelBtn';
import { LuPencil } from 'react-icons/lu';
import { useTranslation } from 'react-i18next';

const ShowEmployeeEvaluation = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useGetEvaluationByIdQuery(Number(id));

  if (isLoading) {
    return (
      <SectionBox className="space-y-6">
        <p>{t('loading')}</p>
      </SectionBox>
    );
  }

  if (isError) {
    return <SectionBox className="space-y-6"> 
    <p>{t('something_went_wrong')} : {error?.data?.message || 'تعذر تحميل البيانات'}</p>;
  
 </SectionBox>
 }

  const evaluation = data?.body;
  if (!evaluation) return<SectionBox className="space-y-6"><p>{t('not_found') || 'لا توجد بيانات'}</p></SectionBox> ;

  return (
    <SectionBox className="space-y-6">
      {/* <h2 className="text-lg font-bold">{t('employee_evaluation')}</h2> */}

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <h2 className="text-base font-bold">{t('employee_evaluation')}</h2>
          <button className="EditPermissionBtn">
            <CancelButton onClick={() => navigate(`/app/employee-evaluation/edit/${id}`)}>
              <LuPencil /> {t('edit')}
            </CancelButton>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center px-4 py-2">
            <span className="font-semibold text-gray-600 w-40">{t('employee_name')}:</span>
            <p className="text-gray-900">{evaluation?.employee?.name || '-'}</p>
          </div>

          <div className="flex items-center px-4 py-2">
            <span className="font-semibold text-gray-600 w-40">{t('evaluator_name')}:</span>
            <p className="text-gray-900">{evaluation?.evaluator?.name || '-'}</p>
          </div>

          <div className="flex items-center px-4 py-2">
            <span className="font-semibold text-gray-600 w-40">{t('evalution_from_date')}:</span>
            <p className="text-gray-900">{evaluation?.evaluation_from || '-'}</p>
          </div>

          <div className="flex items-center px-4 py-2">
            <span className="font-semibold text-gray-600 w-40">{t('evalution_to_date')}:</span>
            <p className="text-gray-900">{evaluation?.evaluation_to || '-'}</p>
          </div>

          <div className="flex items-center px-4 py-2">
            <span className="font-semibold text-gray-600 w-40">{t('score')}:</span>
            <p className="text-gray-900">{evaluation?.score || '-'}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <CancelButton onClick={() => navigate('/app/employee-evaluation')}>
          {t('back')}
        </CancelButton>
      </div>
    </SectionBox>
  );
};

export default ShowEmployeeEvaluation;
