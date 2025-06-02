import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetEmployeeByIdQuery, useGetAllEmployeeQuery } from '../../api/Employee';
import SectionBox from '../../components/ui/containers/SectionBox';
import CancelButton from '../../components/ui/buttons/CancelBtn';
import { LuPencil } from 'react-icons/lu';

const genderOptions = { male: 'ذكر', female: 'أنثى' };
const socialStatusOptions = { single: 'أعزب', married: 'متزوج' };
const statusOptions = { 1: 'نشط', 0: 'غير نشط' };

const ShowEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useGetEmployeeByIdQuery(Number(id));
  const { data: employeeListData } = useGetAllEmployeeQuery({ id: 0 });

  if (isLoading) {
    return (
      <SectionBox>
        <p className="text-center text-gray-600">جاري تحميل بيانات الموظف...</p>
      </SectionBox>
    );
  }

  if (isError) {
    return (
      <SectionBox>
        <p className="text-center text-red-600">
          حدث خطأ: {error?.data?.message || 'تعذر تحميل البيانات'}
        </p>
      </SectionBox>
    );
  }

  const employee = data?.body;
  if (!employee) return <SectionBox><p>الموظف غير موجود</p></SectionBox>;

  const managerName =
    employeeListData?.body?.data?.find(m => m.id === employee?.direct_manager?.id)?.name || '-';

  const renderField = (label, value) => (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-0 p-2">
      <span className="font-medium text-gray-500 w-40">{label}:</span>
      <span className="text-gray-900">{value || '-'}</span>
    </div>
  );

  return (
    <SectionBox className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4">
        <h2 className="text-xl font-bold text-gray-800">عرض الموظف</h2>
      <button className='EditPermissionBtn'><CancelButton   onClick={() => navigate(`/app/users/edit/${id}` )}> <LuPencil /> تعديل
      </CancelButton></button>
      </div>

      {/* Card */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        {/* Optional profile photo */}
        {employee?.photo && (
          <div className="p-4 flex justify-center">
            <img
              src={employee.photo}
              alt="صورة الموظف"
              className="w-32 h-32 rounded-full border object-cover"
            />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-4">
          {/* Personal Information */}
          <div className="col-span-full mb-2 font-semibold text-gray-700">البيانات الشخصية</div>
          {renderField('الاسم', employee?.translations?.name?.ar)}
          {renderField('اسم المستخدم', employee?.username)}
          {renderField('البريد الإلكتروني', employee?.email)}
          {renderField('رقم الهاتف', employee?.phone)}
          {renderField('العنوان', employee?.translations?.address?.ar)}
          {renderField('الرقم القومي', employee?.national_id)}
          {renderField('تاريخ الميلاد', employee?.birthday)}
          {renderField('الجنس', genderOptions[employee?.gender])}
          {renderField('الحالة الاجتماعية', socialStatusOptions[employee?.social_status])}
<hr className="col-span-full border-t border-gray-300 my-4" />

          {/* Work Info */}

          <div className="col-span-full mt-4 mb-2 font-semibold text-gray-700">البيانات الوظيفية</div>
          {renderField('تاريخ التعيين', (employee?.hire_date))}
          {renderField('المدير المباشر', managerName)}
          {renderField('الفرع', employee?.branch?.name)}
          {renderField('القسم', employee?.department_name?.name)}
          {renderField('المنصب الوظيفي', employee?.position?.name)}
          {renderField('المسمى الوظيفي', employee?.job_title?.name)}
          {renderField('الحالة', statusOptions[employee?.is_active])}
        </div>
      </div>

      {/* Back Button */}
      <div className="flex justify-end">
        <CancelButton onClick={() => navigate('/app/users')}>رجوع</CancelButton>
      </div>
    </SectionBox>
  );
};

export default ShowEmployee;
