import { useParams, useNavigate } from 'react-router-dom';
import { useGetTenantByIdQuery } from '../../api/TenantsApi';
import SectionBox from '../../components/ui/containers/SectionBox';
import CancelButton from '../../components/ui/buttons/CancelBtn';
import { LuPencil } from "react-icons/lu";import { format } from 'date-fns-jalali';
import { ar } from 'date-fns/locale';

export default function ShowTenant() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetTenantByIdQuery(id);

  const tenant = data?.body;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !tenant) {
    return (
      <div className="text-center text-red-600">
        حدث خطأ أثناء جلب بيانات الشركة
      </div>
    );
  }

  return (
    <SectionBox className="space-y-6">

 <div className=" gap-4 bg-white border border-gray-200"



        style={{ borderRadius: '10px', overflow: 'hidden' }}>

       
<div className="flex align-center items-center px-4 py-4 justify-between" style={{borderBottom: '1px solid #1515151A'}}>
  
<h2 className="text-base font-bold">عرض تفاصيل الشركة</h2>
<button className='EditPermissionBtn'><CancelButton   onClick={() => navigate(`/app/tenant/edit/${id}` )}> <LuPencil /> تعديل
</CancelButton></button>
</div>


<div className='grid grid-cols-2'>
     <div className="flex align-center items-center p-4">
          <span className="font-semibold block mb-1" style={{color:"#656565",fontSize:"14px"}}>اسم الشركة  :</span>
          <p className="mt-0" style={{color:"#000000",fontSize:"14px",marginInlineStart:"5px"}}>{tenant?.company_name || '-'}</p>
        </div>

            <div className="flex align-center items-center p-4">
          <span className="font-semibold block mb-1" style={{color:"#656565",fontSize:"14px"}}>البريد الالكتروني   :</span>
          <p className="mt-0" style={{color:"#000000",fontSize:"14px",marginInlineStart:"5px"}}>{tenant?.email || '-'}</p>
        </div>


            <div className="flex align-center items-center p-4">
          <span className="font-semibold block mb-1" style={{color:"#656565",fontSize:"14px"}}>رقم الهاتف   :</span>
          <p className="mt-0" style={{color:"#000000",fontSize:"14px",marginInlineStart:"5px"}}>{tenant?.phone || '-'}</p>
        </div>
  <div className="flex align-center items-center p-4">
          <span className="font-semibold block mb-1" style={{color:"#656565",fontSize:"14px"}}>الدومين   :</span>
          <p className="mt-0" style={{color:"#000000",fontSize:"14px",marginInlineStart:"5px"}}>{tenant?.domain || '-'}</p>
        </div>
<div className="flex align-center items-center p-4">
          <span className="font-semibold block mb-1" style={{color:"#656565",fontSize:"14px"}}>الخطة   :</span>
          <p className="mt-0" style={{color:"#000000",fontSize:"14px",marginInlineStart:"5px"}}>{tenant?.plan?.name || '-'}</p>
        </div>
<div className="flex align-center items-center p-4">
          <span className="font-semibold block mb-1" style={{color:"#656565",fontSize:"14px"}}>الحالة   :</span>
          <p className="mt-0" style={{color:"#000000",fontSize:"14px",marginInlineStart:"5px"}}>            {tenant.is_active ? 'نشطة' : 'غير نشطة'}
</p>
        </div>


        <div className="flex align-center items-center p-4">
          <span className="font-semibold block mb-1" style={{color:"#656565",fontSize:"14px"}}>تاريخ الانشاء   :</span>
          <p className="mt-0" style={{color:"#000000",fontSize:"14px",marginInlineStart:"5px"}}>{tenant.created_at?.date
            ? tenant.created_at.date
            : '—'}</p>
        </div>
      
        
       

     
</div>

 </div>
  

      <div className="mt-6 flex justify-end">
        <CancelButton
          onClick={() => navigate('/app/tenant')}
        >
          رجوع
        </CancelButton>
      </div>
    </SectionBox>
  );
}
