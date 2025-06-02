import { FaFacebook, FaInstagramSquare, FaTelegram } from "react-icons/fa";
import './Self_Service.css'
import { useGetAllPersonlaDataQuery } from "../../api/Self_ServicesSlice";
import { useEffect } from "react";
const PersonalData = () => {

    
      const { data,  isLoading,refetch } = useGetAllPersonlaDataQuery();
      console.log(data?.data);
      
useEffect(() => {
refetch()
}, [refetch]);
       
      if (isLoading) {
        return (
          <div className="flex justify-center items-center h-[60vh] p-10 bg-[#FAF8F8] rounded-lg w-[90%] mx-auto shadow-xl ">
            {/* Beautiful SVG Spinner */}
            <div className="flex flex-col items-center gap-4">
              <svg
                className="animate-spin h-16 w-16 text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 2.042.764 3.901 2.009 5.291l2-1.73z"
                ></path>
              </svg>
              <p className="text-lg font-medium text-gray-600">Loading, please wait...</p>
            </div>
          </div>
        );
      }
    return (
        <div className="p-10 bg-[#FAF8F8] rounded-lg w-[90%] mx-auto shadow-xl  ">
          {data?.data.map((data)=>{  
                   return(<>
            <div className="personalData grid grid-cols-12 gap-x-4 items-center w-[85%] mx-auto">

            <div className="col-span-6 flex flex-col gap-6 text-[#0C0A34] p-6">
  <h1 className="text-lg font-medium">
    رقم الموظف: <span className="font-normal">{data?.id}</span>
  </h1>
  <h1 className="text-lg font-medium">
    رقم الهاتف: <span className="font-normal">{data?.phone}</span>
  </h1>
  <h1 className="text-lg font-medium">
    العنوان الحالي: <span className="font-normal">{data?.address}</span>
  </h1>
  <h1 className="text-lg font-medium">
    البريد الإلكتروني: <span className="font-normal">{data?.email}</span>
  </h1>
  <div>
    <h1 className="text-lg font-medium">مواقع التواصل الإجتماعي:</h1>
    <div className="flex gap-5 text-3xl pt-3">
      <FaInstagramSquare style={{ color: "#E4405F" }} />
      <FaTelegram style={{ color: "#0088CC" }} />
      <FaFacebook style={{ color: "#1877F2" }} />
    </div>
  </div>
</div>

<div className="col-span-2 flex flex-col items-start justify-center gap-4 text-[#0C0A34]">
  <div className="text-xl font-medium">
    الديانة:
    <span className="block font-normal text-lg">{data?.religion}</span>
  </div>
  <div className="text-xl font-medium">
    رقم الجواز:
    <span className="block font-normal text-lg">{data?.passport_number}</span>
  </div>
  <div className="text-xl font-medium">
    مدة الخدمة:
    <span className="block font-normal text-lg">{data?.service_duration}</span>
  </div>
  <div className="text-xl font-medium">
    طبيعة العمل:
    <span className="block font-normal text-lg">{data?.work_nature}</span>
  </div>
  <div className="text-xl font-medium">
    نوع العقد:
    <span className="block font-normal text-lg">{data?.contract_type}</span>
  </div>
</div>


<div className="col-span-2 flex flex-col items-start justify-center gap-4 text-[#0C0A34]">
  <div className="text-lg font-normal">
    القسم:
    <span className="block font-normal text-md">الحسابات</span>
  </div>
  <div className="text-lg font-normal">
    تاريخ الميلاد:
    <span className="block font-normal text-md">{data?.birthday}</span>
  </div>
  <div className="text-lg font-normal">
    رقم القسم:
    <span className="block font-normal text-md">{data?.department_id?data?.department_id:1}</span>
  </div>
  <div className="text-lg font-normal">
    رقم المدير المباشر:
    <span className="block font-normal text-md">{data?.direct_manager_id?data?.direct_manager_id:15}</span>
  </div>
  <div className="text-lg font-normal">
    الجنسية:
    <span className="block font-normal text-md">{data?.nationality}</span>
  </div>
</div>

<div className="col-span-2 flex flex-col items-start justify-center gap-4 text-[#0C0A34]">
  <div className="text-lg font-normal">
    الحالة الإجتماعية:
    <span className="block font-normal text-md">{data?.social_status}</span>
  </div>
  <div className="text-lg font-normal">
    الرقم القومي:
    <span className="block font-normal text-md">{data?.nationalid}</span>
  </div>
  <div className="text-lg font-normal">
    تاريخ التوظيف:
    <span className="block font-normal text-md">{data?.hire_date}</span>
  </div>
  <div className="text-lg font-normal">
    رقم الفرع:
    <span className="block font-normal text-md">{data?.branch_id}</span>
  </div>
  <div className="text-lg font-normal">
    الجنس:
    <span className="block font-normal text-md">{data?.gender}</span>
  </div>
</div>

        </div>
        </>
     )

 })}
    </div>
    
    );
}

export default PersonalData;
