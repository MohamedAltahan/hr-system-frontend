import  { useEffect } from 'react';
import { useGetAllTasksDataQuery } from '../../api/Self_ServicesSlice';

const Tasks = () => {
 const { data,  isLoading,refetch } = useGetAllTasksDataQuery();
           
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
            <tr className="opacity-50 text-[20px]">
              <th className="font-400" style={{ padding: '5px' }}>نوع المهمة</th>
              <th className="font-400" style={{ padding: '5px' }}>من</th>
              <th className="font-400" style={{ padding: '5px' }}> الي</th>
              <th className="font-400" style={{ padding: '5px' }}>تاريخ المهمة      </th>
              <th className="font-400" style={{ padding: '5px' }}>بواسطة</th>            
              <th className="font-400" style={{ padding: '5px' }}>عدد الأيام</th>            
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
                <td style={{ padding: '5px' }}>{item?.task_name}</td>
                <td style={{ padding: '5px' }}>{item?.start_time}</td>
                <td style={{ padding: '5px' }}>{item?.end_time}</td>
                <td style={{ padding: '5px' }}>{item?.created_at?.split("T")[0]}</td>
                <td style={{ padding: '5px' }}>{item?.creator?.name}</td>
                <td style={{ padding: '5px' }}>{item?.duration}</td>
                <td style={{ padding: '5px' }}>
  {item?.status !== "pending" ? (
    <>
      <span className="bg-[#C0FBBB] text-[#5DAF56] w-fit rounded-xl p-2">
        {item?.status}
      </span>
    </>
  ) :(
    <>
      <span className="bg-[#b6b6b6] text-[#0C0A34] opacity-50 w-fit rounded-xl p-2">
        {item?.status}
      </span>
    </>
  )}
</td>

                
             
              </tr>
            ))}
            
          </tbody>
        </table>
      </div>
     );
 }

export default Tasks;
