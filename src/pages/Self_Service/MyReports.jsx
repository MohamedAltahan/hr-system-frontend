import  { useEffect } from 'react';
import {  useGetAllReportsDataQuery } from '../../api/Self_ServicesSlice';

const MyReports = () => {
   const { data,  isLoading,refetch } = useGetAllReportsDataQuery();
           console.log(data);
           
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
        <div className="py-10 bg-[#FAF8F8] w-[90%] mx-auto rounded-lg shadow-xl">
        <table
          style={{ width: "100%", borderCollapse: "collapse", borderSpacing: "0 10px", textAlign: "center" }}
        >
          <thead>
            <tr className="opacity-50 text-[23px]">
              <th className="font-400" style={{ padding: '5px' }} >الاسم بالكامل</th>
              <th className="font-400" style={{ padding: '5px' }}>التقرير</th>
              <th className="font-400" style={{ padding: '5px' }}>تاريخ التقرير</th>
              <th className="font-400" style={{ padding: '5px' }}>النوع</th>
              <th className="font-400" style={{ padding: '5px' }}>الحالة</th>            
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((item, index) => (
              <tr
                key={index}
                className="text-[16px] tracking-wide text-black   border-gray-400 border-b"
                style={{
                  height: "60px", // Adjust row height for spacing
                }}
              >
                <td style={{ padding: '5px' }}>{item?.assignee?.name}</td>
                <td style={{ padding: '5px' }}>{item?.report_name}</td>
                <td style={{ padding: '5px' }}>{item?.report_date}</td>
           

                <td style={{ padding: '5px' }}>{item?.report_type}</td>
                <td style={{ padding: '5px' }}>{item?.status}</td>
             
              </tr>
            ))}
            
          </tbody>
        </table>
      </div>
     );
 }

export default MyReports;
