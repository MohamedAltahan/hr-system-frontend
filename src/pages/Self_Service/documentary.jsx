import { useEffect, useState } from "react";
import { useGetAllDocumentariesDataQuery } from "../../api/Self_ServicesSlice";

const Documentary = () => {

            const { data,  isLoading,refetch } = useGetAllDocumentariesDataQuery();
            
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
              <th className="font-400" style={{ padding: '5px' }}>اسم الوثيقة</th>
              <th className="font-400" style={{ padding: '5px' }}>نوع الوثيقة</th>
              <th className="font-400" style={{ padding: '5px' }}>تاريخ الإصدار</th>
              <th className="font-400" style={{ padding: '5px' }}>اسم المسئول     </th>
              <th className="font-400" style={{ padding: '5px' }}>الحالة     </th>
              <th className="font-400" style={{ padding: '5px' }}>عرض </th>            
              <th className="font-400" style={{ padding: '5px' }}>تاريخ الاستلام </th>            
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
                <td style={{ padding: '5px' }}>{item?.document_name}</td>
                <td style={{ padding: '5px' }}>{item?.document_type}</td>
                <td style={{ padding: '5px' }}>{item?.issue_date?.split(" ")[0]}</td>
                <td style={{ padding: '5px' }}>{item?.responsible_person}</td>
                <td style={{ padding: '5px' }}>
  {item?.status === "مقبول" ? (
    <>
      <span className="bg-[#C0FBBB] text-[#5DAF56] w-fit rounded-xl p-2">
        {item?.status}
      </span>
    </>
  ) : item?.status === "Pending" ? (
    <>
      <span className="bg-[#FDF5AB] text-[#F9AB35] w-fit rounded-xl p-2">
        {item?.status}
      </span>
    </>
  ) : (
    <>
      <span className="bg-[#D9D9D9] text-[#0C0A34] opacity-50 w-fit rounded-xl p-2">
        {item?.status}
      </span>
    </>
  )}
</td>

<td className='text-center flex items-end mt-5 justify-center '>
  {item?.notes?.length > 100 ? (
    <span>
      {item?.notes.substring(0, 100)}... 
      <span className="text-blue-500 cursor-pointer" onClick={(e) => { 
        e.stopPropagation(); // Prevent td click event
        handleSvgClick(item?.notes);
      }}>المزيد</span>
    </span>
  ) : (
    item?.notes
  )}
</td>
                <td style={{ padding: '5px' }}>{item?.receive_date}</td>
             
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
     );
 }

export default Documentary;
