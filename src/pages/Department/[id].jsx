import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetDepartmentByIdQuery } from '../../api/DepartmentsApi';
import SectionBox from '../../components/ui/containers/SectionBox';
import CancelButton from '../../components/ui/buttons/CancelBtn';
import { LuPencil } from "react-icons/lu";
import { useTranslation } from 'react-i18next';

const ShowDepartment = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useGetDepartmentByIdQuery(id);

  if (isLoading) return
      <SectionBox className="space-y-6">

   <p>{t('loading')}</p>;
</SectionBox>

  if (isError) return <p>حدث خطأ: {error?.data?.message || 'تعذر تحميل البيانات'}</p>;

  const department = data?.body;

  if (!department) return     <SectionBox className="space-y-6">
<p> {t('department_not_found')} </p>; </SectionBox>;

  return (
    <SectionBox className="space-y-6">
  <h2 className="text-lg font-bold">{t('show_department')}</h2>
      

      <div className=" gap-4 bg-white border border-gray-200"



        style={{ borderRadius: '10px', overflow: 'hidden' }}>

<div className="flex align-center items-center px-4 py-4 justify-between" style={{borderBottom: '1px solid #1515151A'}}>
<h2 className="text-base font-bold">{t('show_department_details')}</h2>
<button className='EditPermissionBtn'><CancelButton type="button"  onClick={() => navigate(`/app/department/edit/${id}` )}> <LuPencil /> {t('edit')}
</CancelButton></button>
</div>


<div className='grid grid-cols-2'>
     <div className="flex align-center items-center p-4">
          <span className="font-semibold block mb-1" style={{color:"#656565",fontSize:"14px",fontWeight:"500"}}> {t('department_name')}  :</span>
          <p className="mt-0" style={{color:"#000000",fontSize:"14px",fontWeight:"500",marginInlineStart:"5px"}}>{department.translations?.name?.ar || '-'}</p>
        </div>


         {/* <div className="flex align-center items-center p-4">
          <span className="font-semibold block mb-1" style={{color:"#656565",fontSize:"14px",fontWeight:"500"}}>اسم القسم (EN) :</span>
          <p className="mt-0" style={{color:"#000000",fontSize:"14px",fontWeight:"500",marginInlineStart:"5px"}}>{department?.translations?.name?.en || '-'}</p>
        </div> */}

         <div className="flex align-center items-center p-4">
          <span className="font-semibold block mb-1" style={{color:"#656565",fontSize:"14px",fontWeight:"500"}}> {t('description')}  :</span>
          <p className="mt-0" style={{color:"#000000",fontSize:"14px",fontWeight:"500",marginInlineStart:"5px"}}>{department?.translations?.description?.ar || '-'}</p>
        </div>

        
         {/* <div className="flex align-center items-center p-4">
          <span className="font-semibold block mb-1" style={{color:"#656565",fontSize:"14px",fontWeight:"500"}}>الوصف  (EN) :</span>
          <p className="mt-0" style={{color:"#000000",fontSize:"14px",fontWeight:"500",marginInlineStart:"5px"}}>{department?.translations?.description?.en || '-'}</p>
        </div> */}

        
         <div className="flex align-center items-center p-4">
          <span className="font-semibold block mb-1" style={{color:"#656565",fontSize:"14px",fontWeight:"500"}}> {t('responsable_manager')} :</span>
          <p className="mt-0" style={{color:"#000000",fontSize:"14px",fontWeight:"500",marginInlineStart:"5px"}}>{department?.manager?.name || '-'}</p>
        </div>

     
</div>
       
      
       
      </div>




      

     

      <div className="flex justify-end mt-6">
        <CancelButton onClick={() => navigate('/app/department')}>
          {t('back')} 
        </CancelButton>
      </div>
    </SectionBox>
  );
};

export default ShowDepartment;
