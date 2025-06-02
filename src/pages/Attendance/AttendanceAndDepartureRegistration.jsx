import  { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useGetAllAttendanceDataQuery, useUpdate_AttendMutation } from '../../api/Attendce';

const AttendanceAndDepartureRegistration = () => {
   const { data,  isLoading,refetch } = useGetAllAttendanceDataQuery();
   const [update_Attend] = useUpdate_AttendMutation();

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

  
    const [selectedItem, setSelectedItem] = useState(null);

            const [popupVisible, setPopupVisible] = useState(false);
          
            const handlepopClick = (item) => {
              setSelectedItem(item)
              setFormData({
                branch_id: item.branch_id,
                check_in_time: item.check_in_time,
                check_out_time: item.check_out_time,
                notes: item.notes,
              })
            
              console.log(item);
              console.log(selectedItem);
              setPopupVisible(true); // Show the popup
            };
            
             
               const closePopup = () => {
                 setPopupVisible(false); // Hide the popup
                 resetForm();
               };
               const [formData, setFormData] = useState({
                branch_id: "",
                check_in_time: "",
                check_out_time: "",
                notes: "",
              });
              const resetForm = () => {
                setFormData({
                  branch_id: "",
                  entry_time: "",
                  exit_time: "",
                  notes: "",
                });
       
              };
              const handleChange = (e) => {
                const { name, value } = e.target;
                setFormData((prev) => ({
                  ...prev,
                  [name]: value,
                }));
              };
              const handleSubmit = async (e) => {
                e.preventDefault();
              
                // Create an object to track changes
                const updatedFields = {};
              
                // Compare current formData with selectedItem and include only changed fields
                for (const key in formData) {
                  if (formData[key] !== selectedItem[key]) {
                    updatedFields[key] = formData[key];
                  }
                }
              
                // Ensure there's something to update
                if (Object.keys(updatedFields).length === 0) {
                  toast.info("لا توجد تغييرات لإرسالها");
                  return;
                }
              
                try {
                  // Send only updated fields along with the ID
                  const payload = {  ...updatedFields };
                  await update_Attend({id: selectedItem?.id,formData:payload}).unwrap();
                  toast.success("تم تحديث البيانات بنجاح!");
                  closePopup(); // Close popup on successful update
                } catch (error) {
                  console.error("Error updating the attendance:", error);
                  toast.error("حدث خطأ أثناء التحديث. الرجاء المحاولة مرة أخرى.");
                }
              };
              const [employeeName, setEmployeeName] = useState("");
              const [employeeId, setEmployeeId] = useState("");
              const [createdAt, setCreatedAt] = useState("");
            
              // Filter data based on input values
              const filteredData = data?.data?.filter((item) => {
                return (
                  (employeeName === "" || item.employee?.name.includes(employeeName)) &&
                  (employeeId === "" || item.employee_id.toString() === employeeId) &&
                  (createdAt === "" || item.created_at.startsWith(createdAt))
                );
              });

           if (isLoading ) {
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
        <div className="flex justify-between w-[90%] py-2 pt-5 mx-auto">
<div className="flex items-center gap-3 bg-white p-3 rounded-lg  ">
<div className="relative ">
        <input
          type="date"
          className="border border-[#000000B5] py-2  px-4 rounded-lg text-[#484848]"
          value={createdAt}
            onChange={(e) => setCreatedAt(e.target.value)}
        />
      </div>
      <input
        type="text"
        placeholder="اسم الموظف"
        className="border border-[#000000B5] w-[20%]  py-2 px-4 rounded-lg text-[#484848]"
        value={employeeName}
        onChange={(e) => setEmployeeName(e.target.value)}
      />

<input
        type="text"
        placeholder="هوية الموظف"
        className="border border-[#000000B5] w-[20%] py-2 px-4 rounded-lg text-[#484848]"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
      />

      <select
        className="border border-[#000000B5] w-[20%] py-2.5 px-4 rounded-lg text-[#484848]"
        // value={workPlace}
        // onChange={(e) => setWorkPlace(e.target.value)}
      >
        <option value="">محل العمل</option>
        <option value="office1">Office 1</option>
        <option value="office2">Office 2</option>
      </select>

   
      <button className="bg-[#1B94BF] text-white py-2 px-4 rounded-xl">بحث</button>

    </div>

                <div className="flex gap-3 items-center ">
                    <div className="bg-[#F02121] p-1.5 rounded-full">

                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
<rect width="18" height="18" fill="url(#pattern0_6599_10963)"/>
<defs>
<pattern id="pattern0_6599_10963" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlinkHref="#image0_6599_10963" transform="scale(0.015625)"/>
</pattern>
<image id="image0_6599_10963" width="64" height="64" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAATaSURBVHic7ZtbqFVFGMd/4ykLzdD0oTR7KItIz6GH85BYdLEU0sIyjQyCVAqyC71EQeZj9ND1IQiECMrISw+VvYgFgSZdQMqSDLpoHrMS8Vaaen497NnnLLdnn7322WvPOqH/l/XNzFrz/ee/ZmZ9M2styAm1S12l/m56HFIfzMu1cKiL1GMlNDyLk+rSotsWcjS+C/gSGBmzdgDbgJNFk6mDBRm7F3g4hLAykW+w0u2reFZtKFrB/pP0hMEIVMf8D6kbH/1XsSc2Pq0Iam90ui6Jw9P9V7FaXZJchCyBtjvL4V9dnBGhV30kKYHUGMh/UhGGowAxP40Iw1WAWNZ+EYaBAINOwm2fGIeBAA0fw20VYRgI8E6Gw3NFi5AnFDaaa0IIC5vgXgjUTuAr+kPxH4FvGTgUvwG4ONq9wNIQwputEii1B0QO9zm0xdjBRnWPSNGAVhFCeBfoBlYBe5q4dEzLzodDD2gWVsJmM8O3Lv4XPaCdOCtA2QTKxhkvwDmpHaqTgAeAq4H9wBfAeyGEVFtspyCpAOo1wGfA+JqiOcD9KblUkXoIvMbpjQdYpHYn5gIkFEAdD9wSk1uA0UA2tL41FZcsUvaAafSvPdaEEP4GNmTKL0/IpQ8pBRibsf+IxyOZvNEJufQhpQD7M/a4eLwik/dzQi59SCnAdvqXsHPjcXqm/JuEXPqQTIAQwp/ApzE5S51B5fEHILApFZcsUj8GX83YLwC3RfvrEMLuxFyAxAKEED6ivxfMAC6M9gcpeWRRxlpgGfBPTd6HJfAAShAghLAdeCaTdZzmdnkKRVmrwa0Z+1xggzqu3sntRFkCLKhJdwLr1eTBUHIB1BHA3TG5B/gp2tOB1alFKKMHXA9cEu3VwM3ArzF9O7BZvTQVmTIEuCdjrw0h7ARmAb/EvC5gkzoNQB2nXqveqc5Tp6sXJGNb5La42qHujvXtjsOhWjZZ7cn4O6IeqPPC44T6flxiD+Qn97Z46i2xWcDEaK8DpqozgZnAjZz6ImPUIPV0AHdRCaHnt0IotQBLMvZDwGM5rxN4GfgemBCvm0QBmyhJ5gB1pJW3tXdkss/L2EeBzcBLVB6Rk6nsHu2M5QF4ArgO6AGOxfzaiLJ4tDIHqKPUx9VdA4zjXeor6mz1/DrXj1XfrjMPqL5V57rcc0CeRjQtgDpGfUrdOwDp39SbzEyAOeqbp35XU8+GIibBPM5zC6COVper+wa5a4uHyGOE2q3OUac0ODe9AOp8dWdNYw+q2zLprWpHy6Qac073djjemZXAWiqTF8Bh4Hkqkd1lMe8EsKSsN0BDRqMeoD6dOeeE+qI6QZ2o7siUrUjIOd0QyHT7A1b2+VCn1DR+vU1MegVwThoJXhSPh4FudTbwJFCN17cAC0MIvQX4So8cPeAN6+NjtfXvdJrnnPQTmUeB14F/M3n7qPSCuSGEQwX4aBtaHgIhhOPAsjjJdVGJ2z8PIRxtte4UKGwxFEL4C/ikqPpS4Yz/ROasAGUTKBt5BKg+StoewxeIKtdCHoPVjxmmWcJvc80icuyMyb2Nzs8jwMZ4vApYPpxFiNxWAFfGrI2DnA7k+1+gme/1y0QHlTtfbfwxoDuEsK3lmh369/pl4ah6b8sNrxGh08rvKz2D+y4VPVb2EKfmbdd/6YmgmsmbU7YAAAAASUVORK5CYII="/>
</defs>
</svg>
</div>
                    <div className="bg-[#11D426] p-1.5 rounded-full">

                    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
<rect width="18" height="19" fill="url(#pattern0_6599_10964)"/>
<defs>
<pattern id="pattern0_6599_10964" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlinkHref="#image0_6599_10964" transform="matrix(0.0164931 0 0 0.015625 -0.0277778 0)"/>
</pattern>
<image id="image0_6599_10964" width="64" height="64" xlinkHref="data:image/png;base64,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"/>
</defs>
</svg>

</div>


                </div>

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
            {filteredData?.map((item, index) => (
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
                  <div className='flex  gap-3 justify-center'>
                  {/* {item?.check_out_time === null && item?.check_in_time !== null ? (
    <button
      className="bg-[#14A943] text-white rounded-2xl px-10 py-1 hover:bg-green-600"
      onClick={() => handleAction("check_out")}
    >
      تسجيل أنصراف
    </button>

  ) : <></>} */}
  <button onClick={() => handlepopClick(item)}>
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21 12.0019C20.7348 12.0019 20.4804 12.1072 20.2929 12.2948C20.1054 12.4823 20 12.7367 20 13.0019V19.0019C20 19.2671 19.8946 19.5215 19.7071 19.709C19.5196 19.8965 19.2652 20.0019 19 20.0019H5C4.73478 20.0019 4.48043 19.8965 4.29289 19.709C4.10536 19.5215 4 19.2671 4 19.0019V5.00189C4 4.73668 4.10536 4.48232 4.29289 4.29479C4.48043 4.10725 4.73478 4.00189 5 4.00189H11C11.2652 4.00189 11.5196 3.89654 11.7071 3.709C11.8946 3.52146 12 3.26711 12 3.00189C12 2.73668 11.8946 2.48232 11.7071 2.29479C11.5196 2.10725 11.2652 2.00189 11 2.00189H5C4.20435 2.00189 3.44129 2.31796 2.87868 2.88057C2.31607 3.44318 2 4.20624 2 5.00189V19.0019C2 19.7975 2.31607 20.5606 2.87868 21.1232C3.44129 21.6858 4.20435 22.0019 5 22.0019H19C19.7956 22.0019 20.5587 21.6858 21.1213 21.1232C21.6839 20.5606 22 19.7975 22 19.0019V13.0019C22 12.7367 21.8946 12.4823 21.7071 12.2948C21.5196 12.1072 21.2652 12.0019 21 12.0019ZM6 12.7619V17.0019C6 17.2671 6.10536 17.5215 6.29289 17.709C6.48043 17.8965 6.73478 18.0019 7 18.0019H11.24C11.3716 18.0027 11.5021 17.9774 11.6239 17.9277C11.7457 17.8779 11.8566 17.8046 11.95 17.7119L18.87 10.7819L21.71 8.00189C21.8037 7.90893 21.8781 7.79833 21.9289 7.67647C21.9797 7.55461 22.0058 7.4239 22.0058 7.29189C22.0058 7.15988 21.9797 7.02917 21.9289 6.90732C21.8781 6.78546 21.8037 6.67486 21.71 6.58189L17.47 2.29189C17.377 2.19816 17.2664 2.12377 17.1446 2.073C17.0227 2.02223 16.892 1.99609 16.76 1.99609C16.628 1.99609 16.4973 2.02223 16.3754 2.073C16.2536 2.12377 16.143 2.19816 16.05 2.29189L13.23 5.12189L6.29 12.0519C6.19732 12.1453 6.12399 12.2561 6.07423 12.378C6.02446 12.4998 5.99924 12.6303 6 12.7619ZM16.76 4.41189L19.59 7.24189L18.17 8.66189L15.34 5.83189L16.76 4.41189ZM8 13.1719L13.93 7.24189L16.76 10.0719L10.83 16.0019H8V13.1719Z" fill="#110D5B"/>
</svg>
  </button>
                  </div>



</td>
            
              </tr>
            ))}
            
          </tbody>
        </table>
      </div>


      {popupVisible &&  selectedItem &&  (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 w-[50%] rounded-lg shadow-lg relative">
    <button
      className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      onClick={closePopup}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
      <h2 className="text-3xl font-bold mb-6 text-[#110D5B] text-center">تعديل حضور {selectedItem?.employee.name} في {selectedItem?.attendance_date}</h2>
      
      <form  onSubmit={handleSubmit}>
      {/* Branch Name */}
      <div className="grid grid-cols-2 gap-6">
      

      {/* Entry Time */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          وقت الدخول
        </label>
        <input
          type="time"
          name="check_in_time"
          value={formData.check_in_time}
          onChange={handleChange}
          className="block w-full p-2 text-sm border text-right border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Exit Time */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          وقت الخروج
        </label>
        <input
          type="time"
          name="check_out_time"
          value={formData.check_out_time}
          onChange={handleChange}
          className="block w-full p-2 text-sm border text-right border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

 
      <div className='col-span-2'>
        <label className='text-[#949494] text-[17px]'  htmlFor="notes">ملاحظات</label>
        <textarea
                id="notes"
                name="notes"
                placeholder="ملاحظاتك هنا"
                value={formData.notes}
                onChange={handleChange}
                className="w-full px-2 py-2 text-right bg-gray-100 border-none shadow-xl text-black border-[#868686] rounded-lg"
                rows="4"
              ></textarea>
  
    </div>

    
      </div>
   

      <button
                type="submit"
                // disabled={Isadding ||isUpdating}
                className="mt-6 bg-[#42A6CA] text-white px-4 py-2 rounded hover:bg-[#52A6CA] flex items-center justify-center w-[50%] mx-auto"
              >
                 تعديل
                {/* {Isadding || isUpdating ? "جاري الحفظ..." : editMode ? "تعديل" : "إضافة"} */}
                </button>
    </form>

   
    </div>
  </div>
)}
      </div>

     );
 }

export default AttendanceAndDepartureRegistration;
