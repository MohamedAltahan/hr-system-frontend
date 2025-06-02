import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetDepartmentByIdQuery } from '../../api/DepartmentsApi';
import SectionBox from '../../components/ui/containers/SectionBox';
import CancelButton from '../../components/ui/buttons/CancelBtn';
import { LuPencil } from "react-icons/lu";

const ShowDepartment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useGetDepartmentByIdQuery(id);

  if (isLoading) return <p>جاري التحميل...</p>;

  if (isError) return <p>حدث خطأ: {error?.data?.message || 'تعذر تحميل البيانات'}</p>;

  const department = data?.body;

  if (!department) return <p>القسم غير موجود</p>;

  return (
    <SectionBox className="space-y-6">
  <h2 className="text-lg font-bold">عرض  القسم</h2>
      

      <div className=" gap-4 bg-white border border-gray-200"



        style={{ borderRadius: '10px', overflow: 'hidden' }}>

<div className="flex align-center items-center px-4 py-4 justify-between" style={{borderBottom: '1px solid #1515151A'}}>
<h2 className="text-base font-bold">عرض تفاصيل القسم</h2>
<button className='EditPermissionBtn'><CancelButton   onClick={() => navigate(`/app/department/edit/${id}` )}> <LuPencil /> تعديل
</CancelButton></button>
</div>


<div className='grid grid-cols-2'>
     <div className="flex align-center items-center p-4">
          <span className="font-semibold block mb-1" style={{color:"#656565",fontSize:"14px",fontWeight:"500"}}>اسم القسم  :</span>
          <p className="mt-0" style={{color:"#000000",fontSize:"14px",fontWeight:"500",marginInlineStart:"5px"}}>{department.translations?.name?.ar || '-'}</p>
        </div>


         {/* <div className="flex align-center items-center p-4">
          <span className="font-semibold block mb-1" style={{color:"#656565",fontSize:"14px",fontWeight:"500"}}>اسم القسم (EN) :</span>
          <p className="mt-0" style={{color:"#000000",fontSize:"14px",fontWeight:"500",marginInlineStart:"5px"}}>{department?.translations?.name?.en || '-'}</p>
        </div> */}

         <div className="flex align-center items-center p-4">
          <span className="font-semibold block mb-1" style={{color:"#656565",fontSize:"14px",fontWeight:"500"}}> الوصف  :</span>
          <p className="mt-0" style={{color:"#000000",fontSize:"14px",fontWeight:"500",marginInlineStart:"5px"}}>{department?.translations?.description?.ar || '-'}</p>
        </div>

        
         {/* <div className="flex align-center items-center p-4">
          <span className="font-semibold block mb-1" style={{color:"#656565",fontSize:"14px",fontWeight:"500"}}>الوصف  (EN) :</span>
          <p className="mt-0" style={{color:"#000000",fontSize:"14px",fontWeight:"500",marginInlineStart:"5px"}}>{department?.translations?.description?.en || '-'}</p>
        </div> */}

        
         <div className="flex align-center items-center p-4">
          <span className="font-semibold block mb-1" style={{color:"#656565",fontSize:"14px",fontWeight:"500"}}>المدير المسؤول :</span>
          <p className="mt-0" style={{color:"#000000",fontSize:"14px",fontWeight:"500",marginInlineStart:"5px"}}>{department?.manager?.name || '-'}</p>
        </div>

     
</div>
       
      
       
      </div>




      

     

      <div className="flex justify-end mt-6">
        <CancelButton onClick={() => navigate('/app/department')}>
          رجوع 
        </CancelButton>
      </div>
    </SectionBox>
  );
};

export default ShowDepartment;
