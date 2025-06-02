import { useEffect, useState } from "react";
import { useAdd_AttendRulesRequestMutation, useDeleteAttendanceRulesMutation, useGetAllOfficalTimeQuery, useUpdate_AttendRulesMutation, useUpdate_ToogelRulesMutation } from "../../api/Attendce";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";
import swal from 'sweetalert';
import { useGetAllbranchesQuery } from "../../api/Branches";
import Switch from "react-switch"; // Import a React switch library

const PreparingAttendanceAndDeparture = () => {
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





       const { data,  isLoading,refetch } = useGetAllOfficalTimeQuery();
       const { data:branchData,  refetch:refetchBreanch } = useGetAllbranchesQuery();
       const [editMode, setEditMode] = useState(false); // Track edit mode
       const [originalData, setOriginalData] = useState(null); // To store the original data for comparison
       const [selectedId, setSelectedId] = useState(null); // Track ID being edited
      useEffect(() => {
      refetch()
      }, [refetch]);
      useEffect(() => {
        refetchBreanch()
      }, [refetchBreanch]);

        const [popupVisible, setPopupVisible] = useState(false);
        
        const handlepopClick = (item = null) => {
          if (item) {
            // Populate form data and set original data for editing
            setFormData({
              branch_id: item?.branch_id || "",
              entry_time: item?.entry_time || "",
              exit_time: item?.exit_time || "",
              break_time: item?.break_time || "",
              shift_type: item?.shift_type || "",
              work_type: item?.work_type || "",
              weekly_days: item?.weekly_days || 0,
              status: item?.status === 1,
            });
            setOriginalData({
              branch_id: item?.branch_id || "",
              entry_time: item?.entry_time || "",
              exit_time: item?.exit_time || "",
              break_time: item?.break_time || "",
              shift_type: item?.shift_type || "",
              work_type: item?.work_type || "",
              weekly_days: item?.weekly_days || 0,
              status: item?.status === 1,
            });
            setEditMode(true); // Enable edit mode
            setSelectedId(item?.id); // Set the ID of the item being edited
          } else {
            resetForm(); // Reset form for adding a new entry
          }
          setPopupVisible(true); // Show the popup
        };
        
         
           const closePopup = () => {
             setPopupVisible(false); // Hide the popup
             resetForm();
           };
             

           const [deleteAttendanceRules] = useDeleteAttendanceRulesMutation();
           const [loading, setLoading] = useState(false); // Add loading state
         
         
           const deleteSubmitHandler = async (id) => {
             // Set loading to true when the deletion process starts
        
             swal({
               title: `هل انت متأكد من حذف مواعيد الفرع ؟`,
               icon: 'warning',
               buttons: {
                 confirm: {
                   text: "حذف الفرع",
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
         
                   const data = await deleteAttendanceRules(id);  // Delete the certificate
                  
           
                   if (data?.data === 200) {
                    toast.success("تم حذف الفرع بنجاح");
                  }
                 } catch (error) {
                  console.log(error);
                  
                   toast.error("حذث مشكله اثناء الحذف ");
                 }
               } else {
                 toast.success("تم الغاء حذف الفرع");
               }  
               setLoading(false);
             });
           };

           const [formData, setFormData] = useState({
            branch_id: "",
            entry_time: "",
            exit_time: "",
            break_time: "",
            shift_type: "",
            work_type: "",
            weekly_days: 0,
            status: true
          });
          const resetForm = () => {
            setFormData({
              branch_id: "",
              entry_time: "",
              exit_time: "",
              break_time: "",
              shift_type: "",
              work_type: "",
              weekly_days: 0,
              status: true,
            });
            setOriginalData(null);
            setEditMode(false);
            setSelectedId(null);
          };
          const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({
              ...prev,
              [name]: value,
            }));
          };
          const [addAttendRulesRequest, { isLoading:Isadding }] =
    useAdd_AttendRulesRequestMutation();
    const [updateAttendRulesRequest, { isLoading: isUpdating }] =
    useUpdate_AttendRulesMutation();

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
    
      try {
        if (editMode) {
          if (!originalData) {
            throw new Error("No original data found for comparison.");
          }
    
          // Filter out only changed values
          const updatedFields = {};
          for (const key in formData) {
            if (formData[key] !== originalData[key]) {
              updatedFields[key] = formData[key];
            }
          }
    
          if (Object.keys(updatedFields).length > 0) {
            await updateAttendRulesRequest({ id: selectedId, formData: updatedFields }).unwrap();
            toast.success("تم تعديل مواعيد المكتب بنجاح!");
          } else {
            toast.info("لا توجد تغييرات للتحديث.");
          }
        } else {
          await addAttendRulesRequest(formData).unwrap();
          toast.success("تمت إضافة مواعيد المكتب بنجاح!");
        }
        closePopup();
      } catch (error) {
        console.error("Error submitting the form:", error);
        toast.error("حدث خطأ أثناء العملية. الرجاء المحاولة مرة أخرى.");
      } finally {
        setLoading(false);
      }
    };
    const [updateToggleRules, { isLoading: isToggling }] = useUpdate_ToogelRulesMutation();

    const handleToggleStatus = async (item) => {
      try {
        // Call the toggle API using the item's ID
        await updateToggleRules(item.id).unwrap();
    
        // Optionally refetch the data to reflect changes
        refetch();
    
        // Show a success message
        toast.success(`تم ${item.status === 1 ? "إلغاء تفعيل" : "تفعيل"} الحالة بنجاح!`);
      } catch (error) {
        console.error("Error toggling status:", error);
        toast.error("حدث خطأ أثناء تحديث الحالة.");
      }
    };
      



            if (isLoading||loading||isToggling) {
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
      
    <button onClick={() => handlepopClick()} className="bg-[#1468A9] cursor-pointer py-2 absolute left-[5%] top-[18.8%] text-xl text-white px-8 rounded-lg">
    إضافة جديد
    </button>
<div className="flex justify-end w-[90%] py-2 pt-5 mx-auto ">
         

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
          <tr className="opacity-50 text-[20px]" >
              <th className="font-400" style={{ padding: '5px' }}>الفرع     </th>
                          <th className="font-400" style={{ padding: '5px' }}>وقت الدخول</th>
              <th className="font-400" style={{ padding: '5px' }}>وقت الخروج</th>
              <th className="font-400" style={{ padding: '5px' }}>وقت الراحة</th>
              <th className="font-400" style={{ padding: '5px' }}>وقت المناوبة</th>
              <th className="font-400" style={{ padding: '5px' }}>نوع الدوام     </th>
              <th className="font-400" style={{ padding: '5px' }}>الحالة</th>
              <th className="font-400" style={{ padding: '5px' }}>الاجراء </th>            
            </tr>
          </thead>
          <tbody>
  {data?.data?.map((item) => {


    return (
      <tr
        key={item?.id}
        className="text-[16px] tracking-wide text-black border-gray-400 border-b"
        style={{
          height: "60px", // Adjust row height for spacing
        }}
      >
        <td style={{ padding: "5px" }}>{item?.branch?.name}</td>
        <td dir="ltr" style={{ padding: "5px" }}>{formatTime(item?.entry_time)}</td>
        <td dir="ltr" style={{ padding: "5px" }}>{formatTime(item?.exit_time)}</td>
        <td dir="ltr" style={{ padding: "5px" }}>{formatTime(item?.break_time)}</td>
        <td dir="ltr" style={{ padding: "5px" }}>{item?.shift_type=="Morning"?"صباحي":"مسائي"}</td>
        <td style={{ padding: "5px" }}>{item?.work_type=="full-time"?"دوام كامل":"دوام جزئي"}</td>
        <td style={{ padding: "5px" }}>
        <td className="flex justify-center" dir="ltr" style={{ padding: "5px" }}>
        <Switch
    checked={item?.status === 1} // True if status is 1
    
    onChange={() => handleToggleStatus(item)} // Call the toggle handler
    onColor="#22C55E" // Green for active
    offColor="#EF4444" // Red for inactive
    uncheckedIcon={false} // No icon for off state
    checkedIcon={false} // No icon for on state
    disabled={isToggling} // Disable during the API call
  />
        </td>
        </td>
        <td>
          <div className="flex items-center justify-center gap-2">
            <p                     onClick={() => handlepopClick(item)}
 className="bg-[#1468A945] px-2 cursor-pointer rounded-full">تعديل</p>
            <MdDeleteOutline
              onClick={(e) => {
                e.preventDefault();
                deleteSubmitHandler(item.id);
              }}
              className="text-red-500 text-2xl cursor-pointer"
            />
          </div>
        </td>
      </tr>
    );
  })}
</tbody>

        </table>

        {popupVisible && (
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
      <h2 className="text-3xl font-bold mb-6 text-[#110D5B] text-center">مواعيد المكتب</h2>
      
      <form  onSubmit={handleSubmit}>
      {/* Branch Name */}
      <div className="grid grid-cols-2 gap-6">
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          اسم الفرع
        </label>
        <select
          name="branch_id"
          value={formData.branch_id}
          onChange={handleChange}
          className="block w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">اختر الفرع</option>
          {branchData?.data?.map((option) => (
            <option key={option.id} value={option.id} style={{ color: "black" }}>
              {option.name}
            </option>
          ))}
        </select>
      </div>

      {/* Entry Time */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          وقت الدخول
        </label>
        <input
          type="time"
          name="entry_time"
          value={formData.entry_time}
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
          name="exit_time"
          value={formData.exit_time}
          onChange={handleChange}
          className="block w-full p-2 text-sm border text-right border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Break Time */}
      <div>
  <label className="block mb-2 text-sm font-medium text-gray-700">وقت الراحة</label>
  <input
    type="time"
    name="break_time"
    value={formData.break_time}
    onChange={handleChange}
    className="block w-full p-2 text-sm border text-right border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
  />
</div>
      <div>
        
        <label className="block mb-2 text-sm font-medium text-gray-700">
          وقت المناوبة
        </label>
        <select
          name="shift_type"
          value={formData.shift_type}
          onChange={handleChange}
          className="block w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">اختر وقت المناوبة</option>
          <option value="Morning">صباحاً</option>
          <option value="night">مساءً</option>
        </select>
      </div>

      {/* Weekly Holiday Days */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          عدد أيام العطلة الأسبوعية
        </label>
        <input
          type="number"
          name="weekly_days"
          value={formData.weekly_days}
          onChange={handleChange}
          className="block w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Work Type */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          نوع الدوام
        </label>
        <select
          name="work_type"
          value={formData.work_type}
          onChange={handleChange}
          className="block w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">اختر نوع الدوام</option>
          <option value="full-time">دوام كامل</option>
          <option value="part-time">دوام جزئي</option>
        </select>
      </div>
      </div>
   

      <button
                type="submit"
                disabled={Isadding ||isUpdating}
                className="mt-6 bg-[#42A6CA] text-white px-4 py-2 rounded hover:bg-[#52A6CA] flex items-center justify-center w-[50%] mx-auto"
              >
                {Isadding || isUpdating ? "جاري الحفظ..." : editMode ? "تعديل" : "إضافة"}
                </button>
    </form>

   
    </div>
  </div>
)}

      </div>
      </>;
 }

export default PreparingAttendanceAndDeparture;
