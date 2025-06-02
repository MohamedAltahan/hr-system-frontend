import { useEffect } from "react";
import {  useGetAttendanceAnalysisQuery } from "../../api/Attendce";

const AnalyzingEmployeePerformance = () => {
       const { data,  isLoading,refetch } = useGetAttendanceAnalysisQuery();
            
      useEffect(() => {
      refetch()
      }, [refetch]);

        // const [popupVisible, setPopupVisible] = useState(false);
          //  const [selectedOrderType, setSelectedOrderType] = useState("");
         
          //  const handlepopClick = (orderType) => {
          //    setSelectedOrderType(orderType); // Set the order type to display
          //    setPopupVisible(true); // Show the popup
          //  };
         
          //  const closePopup = () => {
          //    setPopupVisible(false); // Hide the popup
          //  };
             
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
      

<div className="flex justify-end w-[90%] py-2 pt-5 mx-auto">
         

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
          <th className="font-400" style={{ padding: '5px' }}>الاسم بالكامل</th>
              <th className="font-400" style={{ padding: '5px' }}>التاريخ</th>
              <th className="font-400" style={{ padding: '5px' }}>الشهر</th>
              <th className="font-400" style={{ padding: '5px' }}>الترحيل</th>
              <th className="font-400" style={{ padding: '5px' }}>الملاحظات     </th>
              <th className="font-400" style={{ padding: '5px' }}>لائحة العقوبات     </th>
              {/* <th className="font-400" style={{ padding: '5px' }}>الاجراء </th>             */}
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((item) => (
              <tr
                key={item?.id}
                className="text-[16px] tracking-wide text-black   border-gray-400 border-b"
                style={{
                  height: "60px", // Adjust row height for spacing
                }}
              >
                <td style={{ padding: '5px' }}>{item?.employee.name}</td>
                <td style={{ padding: '5px' }}>{item?.date}</td>
                <td style={{ padding: '5px' }}>{item?.month}</td>
                <td style={{ padding: '5px' }}>{item?.schedule_type}</td>
                <td style={{ padding: '5px' }}>{item?.penalty_notes}</td>
                <td style={{ padding: '5px' }}>{
                  item?.penalty_status=="Absent"?<>
                  <p className="bg-[#F9C4C4] text-[#FB04084D] rounded-xl px-4 py-2 w-fit mx-auto">{item?.penalty_status}</p>
                  </>:<>
                  <p className="bg-[#FDF5AB] text-[#F9AB35] rounded-xl px-4 py-2 w-fit mx-auto">{item?.penalty_status}</p>

                  </>
                  }</td>
{/* <td            onClick={() => handlepopClick(item)}      // Handle click event
 className='text-center flex items-end mt-5 justify-center  cursor-pointer '><svg width="25" height="17" viewBox="0 0 25 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M24.8489 7.86762C22.4952 3.27517 17.8355 0.167969 12.5 0.167969C7.16447 0.167969 2.50345 3.27734 0.151018 7.86806C0.0517306 8.06446 0 8.28145 0 8.50152C0 8.72159 0.0517306 8.93858 0.151018 9.13498C2.50475 13.7274 7.16447 16.8346 12.5 16.8346C17.8355 16.8346 22.4965 13.7253 24.8489 9.13455C24.9482 8.93815 25 8.72116 25 8.50108C25 8.28101 24.9482 8.06402 24.8489 7.86762ZM12.5 14.7513C11.2638 14.7513 10.0555 14.3847 9.02766 13.698C7.99985 13.0112 7.19878 12.0351 6.72573 10.8931C6.25268 9.75103 6.12891 8.49437 6.37007 7.28199C6.61123 6.06961 7.20648 4.95596 8.08056 4.08188C8.95464 3.20781 10.0683 2.61255 11.2807 2.37139C12.493 2.13024 13.7497 2.25401 14.8917 2.72706C16.0338 3.2001 17.0099 4.00118 17.6967 5.02899C18.3834 6.05679 18.75 7.26517 18.75 8.5013C18.7504 9.32218 18.589 10.1351 18.275 10.8935C17.9611 11.652 17.5007 12.3412 16.9203 12.9216C16.3398 13.5021 15.6507 13.9624 14.8922 14.2764C14.1338 14.5903 13.3209 14.7517 12.5 14.7513ZM12.5 4.33464C12.1281 4.33983 11.7586 4.39516 11.4015 4.49913C11.6958 4.89916 11.8371 5.39144 11.7996 5.88669C11.7621 6.38195 11.5484 6.84737 11.1972 7.19857C10.846 7.54976 10.3806 7.76347 9.88537 7.80094C9.39012 7.8384 8.89784 7.69714 8.49781 7.40278C8.27001 8.24201 8.31113 9.13154 8.61538 9.94618C8.91962 10.7608 9.47167 11.4595 10.1938 11.944C10.916 12.4284 11.7719 12.6742 12.641 12.6468C13.5102 12.6193 14.3489 12.32 15.039 11.7909C15.7291 11.2619 16.236 10.5297 16.4882 9.69748C16.7404 8.86526 16.7253 7.9749 16.445 7.15172C16.1647 6.32854 15.6333 5.61399 14.9256 5.10864C14.2179 4.60329 13.3696 4.33259 12.5 4.33464Z" fill="black"/>
</svg>
</td> */}
          
              </tr>
            ))}
            
          </tbody>
        </table>

        {/* {popupVisible && (
        <div className="fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6  w-[30%] rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">سبب الطلب</h2>
            <p className="text-lg">{selectedOrderType?.branchName}</p>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
              onClick={closePopup}
            >
              اغلاق
            </button>
          </div>
        </div>
      )} */}
      </div>
      </>;
 }

export default AnalyzingEmployeePerformance;
