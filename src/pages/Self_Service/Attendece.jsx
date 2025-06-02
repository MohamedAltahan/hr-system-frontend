import  { useEffect } from 'react';
import { useAdd_AttendeRequestMutation, useGetAllAttendanceDataQuery } from '../../api/Self_ServicesSlice';
import { toast } from 'react-toastify';

const Attendece = () => {
   const { data,  isLoading,refetch } = useGetAllAttendanceDataQuery();
   const [addAttendance,{isLoading:loading}] = useAdd_AttendeRequestMutation();

   const formatTime = (time) => {
    if (!time) return ""; // Handle undefined or null times
    const [hours, minutes] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes);

    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  };
     useEffect(() => {
     refetch()
     }, [refetch]);

     const handleAction = async (action) => {
      const getCurrentTime = () => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0'); // Ensure two digits for hours
        const minutes = String(now.getMinutes()).padStart(2, '0'); // Ensure two digits for minutes
        return `${hours}:${minutes}`;
      };
  
      const getCurrentLocation = () => {
        return new Promise((resolve, reject) => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                resolve(`${lat},${lon}`); // Format as "lat,lon"
              },
              (error) => {
                reject(error);
              }
            );
          } else {
            reject(new Error("Geolocation is not supported by this browser."));
          }
        });
      };
  
      try {
        const time = getCurrentTime();
        const location = await getCurrentLocation();
  
        const payload = {
          type: action,
          time,
          location,
        };
  
  
        // Send the payload using the mutation
        const response = await addAttendance(payload);
        console.log(response);
        
        if (response.data.status === 200|| response.data.status ===201) {
          if(action==="check_in"){
            toast.success("تم تسجيل حضورك بنجاح ")
          }else(
            toast.success("تم تسجيل أنصرافك بنجاح ")

          )
          
        }else{
          if(action==="check_in"){
            toast.error("لا يمكنك تسجيل حضورك في نفس اليوم مرتين")
          }else(
            toast.error("لا يمكنك تسجيل أنصرافك في نفس اليوم مرتين")

          )
        }
        

  
      } catch (error) {
        toast.error("لقد حدث مشكله حاول في وقت لاحق")

        console.error("Error capturing location or time:", error);
      }
    };
    
    
            
           if (isLoading ||loading) {
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
      <div className="  mx-auto">
        <div className='flex p-2 justify-end w-[90%] ms-auto mx-auto '>
        <button
      className="bg-[#1468A9]  text-white rounded-2xl px-10 py-1 hover:bg-[#1468A9]"
      onClick={() => handleAction("check_in")}
      >
      تسجيل حضور
    </button>
      </div>
        <div className="py-10 bg-[#FAF8F8] w-[90%] mx-auto rounded-lg shadow-xl">
      
        <table
          style={{ width: "100%", borderCollapse: "collapse", borderSpacing: "0 10px", textAlign: "center" }}
        >
          <thead>
            <tr className="opacity-50 text-[20px]">
              <th className="font-400" style={{ padding: '5px' }}>التاريخ</th>
              <th className="font-400" style={{ padding: '5px' }}>الاسم بالكامل</th>
              <th className="font-400" style={{ padding: '5px' }}>حضور في</th>
              <th className="font-400" style={{ padding: '5px' }}>انصراف في</th>
              <th className="font-400" style={{ padding: '5px' }}>الحالة     </th>
              <th className="font-400" style={{ padding: '5px' }}>التسجيل بواسطة</th>            
              <th className="font-400" style={{ padding: '5px' }}>أجراء </th>            
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
                <td style={{ padding: '5px' }}>{item?.attendance_date}</td>
                <td style={{ padding: '5px' }}>{item?.employee?.name}</td>
                <td dir='ltr' style={{ padding: '5px' }}>{formatTime(item?.check_in_time)}</td>
                <td dir='ltr' style={{ padding: '5px' }}>{formatTime(item?.check_out_time)}</td>
                <td style={{ padding: '5px' }}>
  {item?.status === "مقبول" || item?.status=="accepted"? (
    <>
      <span className="bg-[#C0FBBB] text-[#5DAF56] w-fit rounded-xl p-2">
      مقبول
      </span>
    </>
  ) : item?.statusForAttendece === "مقبول جزئيًا" ? (
    <>
      <span className="bg-[#FDF5AB] text-[#F9AB35] w-fit rounded-xl p-2">
        {item?.status}
      </span>
    </>
  ) : (
    <>
      <span className="bg-[#D9D9D9] text-[#0C0A34] opacity-30 w-fit rounded-xl p-2">
        {item?.status}
      </span>
    </>
  )}
</td>

                <td style={{ padding: '5px' }}>{item?.recorded_by}</td>
                <td style={{ padding: '5px' }}>
  {item?.check_out_time === null && item?.check_in_time !== null ? (
    <button
      className="bg-[#14A943] text-white rounded-2xl px-10 py-1 hover:bg-green-600"
      onClick={() => handleAction("check_out")}
    >
      تسجيل أنصراف
    </button>
  ) : (
    <button
      className="bg-gray-300 text-gray-600 rounded px-4 py-2 cursor-not-allowed"
      disabled
    >
      -
    </button>
  )}
</td>
            
              </tr>
            ))}
            
          </tbody>
        </table>
      </div>
      </div>

     );
 }

export default Attendece;
