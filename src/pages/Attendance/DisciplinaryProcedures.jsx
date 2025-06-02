import { useEffect, useState } from "react";
import { useGetAllDisciplinaryDataQuery } from "../../api/Attendce";
import { Link } from "react-router-dom";



const DisciplinaryProcedures = () => {






       const { data,  isLoading,refetch } = useGetAllDisciplinaryDataQuery();
            
      useEffect(() => {
      refetch()
      }, [refetch]);

        const [NotesVisible, setNotesVisible] = useState(false);
           const [selectedNotesType, setSelectedNotesType] = useState("");
         
         
         
    
           const closeNotes = () => {
            setNotesVisible(false); // Hide the popup
           };
             

       
    
           const handleSvgClick = (orderType) => {
            setSelectedNotesType(orderType); // Set the order type to display
            setNotesVisible(true); // Show the popup
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

     return <>
      
    <Link to={'/app/AddDisciplinaryProcedures'} className="bg-[#1468A9] cursor-pointer py-2 absolute left-[5%] top-[18.8%]  text-xl text-white px-8 rounded-lg">
    اجراء جديد
    </Link>


<div className="flex justify-between w-[90%] py-2 pt-5 mx-auto ">
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
          <tr className="opacity-50 text-[20px]" >
              <th className="font-400" style={{ padding: '5px' }}>أسم الموظف     </th>
                          <th className="font-400" style={{ padding: '5px' }}>قانون الأجراء التأديبي</th>
              <th className="font-400" style={{ padding: '5px' }}>بواسطة</th>
              <th className="font-400" style={{ padding: '5px' }}>السبب</th>
              <th className="font-400" style={{ padding: '5px' }}>الحالة     </th>
              <th className="font-400" style={{ padding: '5px' }}>تاريخ التنفيذ     </th>
              <th className="font-400" style={{ padding: '5px' }}>الاجراء </th>            
            </tr>
          </thead>
          <tbody>
  {filteredData?.map((item) => {


    return (
      <tr
        key={item?.id}
        className="text-[16px] tracking-wide text-black border-gray-400 border-b"
        style={{
          height: "60px", // Adjust row height for spacing
        }}
      >
        <td style={{ padding: "5px" }}>{item?.employee?.name}</td>
        <td dir="ltr" style={{ padding: "5px" }}>{item?.action_type}</td>
        <td dir="ltr" style={{ padding: "5px" }}>{item?.recorder?.name}</td>
        <td className='text-center flex items-end mt-5 justify-center '>
  {item?.reason?.length > 50 ? (
    <span>
      {item?.reason.substring(0, 50)}... 
      <span className="text-blue-500 cursor-pointer" onClick={(e) => { 
        e.stopPropagation(); // Prevent td click event
        handleSvgClick(item?.reason);
      }}>المزيد</span>
    </span>
  ) : (
    item?.reason
  )}
</td>
        <td  style={{ padding: "5px" }}>  {item?.status !== "pending" ? (
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
  )}</td>
        <td style={{ padding: "5px" }}>{item?.execution_date}</td>

        <td>
          <div className="flex items-center justify-center gap-2">
            <Link to={`/app/updateDisciplinaryProcedures/${item?.id}`} className="bg-[#1468A9] px-8 py-2 text-white cursor-pointer rounded-lg">تعديل</Link>
          </div>
        </td>
      </tr>
    );
  })}
</tbody>

        </table>

   

{NotesVisible && (
        <div className="fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6  w-[30%] rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">سبب العقوبة</h2>
            <p className="text-lg">{selectedNotesType}</p>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
              onClick={closeNotes}
            >
              اغلاق
            </button>
          </div>
        </div>
      )}

      </div>
      </>;
 }

export default DisciplinaryProcedures;
