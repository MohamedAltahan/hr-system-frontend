import  { useEffect, useState } from 'react';
import { useDeleteRequestMutation, useGetAllRequestDataQuery } from '../../api/Self_ServicesSlice';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdDeleteOutline } from 'react-icons/md';
import swal from 'sweetalert';

const MyRequests= () => {
   const { data,  isLoading,refetch } = useGetAllRequestDataQuery();
           console.log(data);
           
     useEffect(() => {
     refetch()
     }, [refetch]);


     const [popupVisible, setPopupVisible] = useState(false);
     const [selectedOrderType, setSelectedOrderType] = useState("");
   
     const handleSvgClick = (orderType) => {
       setSelectedOrderType(orderType); // Set the order type to display
       setPopupVisible(true); // Show the popup
     };
   
     const closePopup = () => {
       setPopupVisible(false); // Hide the popup
     };



     const [deleteRequest] = useDeleteRequestMutation();
     const [loading, setLoading] = useState(false); // Add loading state
   
   
     const deleteSubmitHandler = async (id) => {
       // Set loading to true when the deletion process starts
  
       swal({
         title: `هل انت متأكد من حذف هذا الطلب ؟`,
         icon: 'warning',
         buttons: {
           confirm: {
             text: "حذف الطلب",
             value: true, 
             visible: true,
             className: "bg-red-500 border-0 text-white",
             closeModal: true,
           },
           cancel: {
             text: "ألغاء",
             value: false, 
             visible: true,
             className: "", 
             closeModal: true,
           }
         },       
         dangerMode: true,
       }).then(async (willDelete) => {
         if (willDelete) {
           try {
             setLoading(true);
   
             const data = await deleteRequest(id);  // Delete the certificate
                        
   
             if (data?.data === 200) {
               toast.success("تم حذف طلبك بنجاح");
             }
           } catch (error) {
            console.log(error);
            
             toast.error("حذث مشكله اثناء الحذف ");
           }
         } else {
           toast.success("تم الغاء حذف الطلب");
         }  
         setLoading(false);
         // Set loading to false after the deletion process is completed
       });
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
     return <>
     <div className='w-[95%]'>
     <div className="flex justify-end gap-10 pb-5">
  <Link to="/app/AddSalaryAdvance">
    <button className="bg-[#1468A9] py-3 text-xl text-white px-8 rounded-lg">
      طلب سلفة
    </button>
  </Link>
  <Link to="/app/Addvacation">
    <button className="bg-[#1468A9] py-3 text-xl text-white px-8 rounded-lg">
      طلب إجازة / مغادرة
    </button>
  </Link>
</div>
     </div>
        
        <div className="py-10 bg-[#FAF8F8] w-[90%] mx-auto rounded-lg shadow-xl">
          
        <table
          style={{ width: "100%", borderCollapse: "collapse", borderSpacing: "0 10px", textAlign: "center" }}
        >
          <thead>
            <tr className="opacity-50 text-[20px]">
              <th className="font-400" style={{ padding: '5px' }}>نوع الطلب</th>
              <th className="font-400" style={{ padding: '5px' }}>من </th>
              <th className="font-400" style={{ padding: '5px' }}>إلى</th>
              <th className="font-400" style={{ padding: '5px' }}>تاريخ الطلب </th>
              {/* <th className="font-400" style={{ padding: '5px' }}>مقدم إلى</th>             */}
              <th className="font-400" style={{ padding: '5px' }}>عدد الأيام / قيمه السلفة</th>            
              <th className="font-400" style={{ padding: '5px' }}>السبب</th>            
              <th className="font-400" style={{ padding: '5px' }}>الحالة</th>            
              <th className="font-400" style={{ padding: '5px' }}></th>            
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
                <td style={{ padding: '5px' }}>{item?.type}</td>
                <td style={{ padding: '5px' }}>{item?.from_date?<>{item?.from_date?.split("T")[0]}</>:<>--</> }</td>
                <td style={{ padding: '5px' }}>{item?.to_date?<>{item?.to_date?.split("T")[0]}</>:<>--</> }</td>
                <td style={{ padding: '5px' }}>{item?.created_at.split("T")[0]}</td>
                {/* <td style={{ padding: '5px' }}>{item?.submittedTo}</td> */}
           

                <td style={{ padding: '5px' }}>{item?.number_of_days?<>{item?.number_of_days}</>:<>{item?.loan_amount}</>}</td>
                <td className='text-center flex items-end mt-5 justify-center '>
  {item?.reason?.length > 100 ? (
    <span>
      {item?.reason.substring(0, 100)}... 
      <span className="text-blue-500 cursor-pointer" onClick={(e) => { 
        e.stopPropagation(); // Prevent td click event
        handleSvgClick(item?.reason);
      }}>المزيد</span>
    </span>
  ) : (
    item?.reason
  )}
</td>
<td style={{ padding: '5px' }}>
  {item?.status === "rejected"
   ? (
    <>
      <span className="bg-[#F9C4C4] text-[#FB0408] opacity-65 w-fit rounded-xl p-2">
        {item?.status}
      </span>
    </>
  ) :(
    <>
      <span className="bg-[#c8c7c7] text-[#0C0A34] opacity-30 w-fit rounded-xl p-2">
        {item?.status}
      </span>
    </>
  )}
</td>
                <td   onClick={(e) => {
                e.preventDefault(); 
                deleteSubmitHandler(item.id);
              }}><MdDeleteOutline className='text-red-500 text-2xl'/></td>
             
              </tr>
            ))}
            
          </tbody>
        </table>
        {popupVisible && (
        <div className="fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6  w-[30%] rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">سبب الطلب</h2>
            <p className="text-lg">{selectedOrderType}</p>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
              onClick={closePopup}
            >
              اغلاق
            </button>
          </div>
        </div>
      )}


   
      </div>
 
      </>
 }

export default MyRequests;
