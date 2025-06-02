import { useEffect } from "react";
import { useGetAllFinancialDataQuery } from "../../api/Self_ServicesSlice";

const FinancialData = () => {


          const { data,  isLoading,refetch } = useGetAllFinancialDataQuery();
          
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
        <div className="p-10 bg-[#FAF8F8] rounded-lg w-[95%] mx-auto shadow-xl  ">
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
    <thead>
        <tr className="opacity-50 text-[20px]">
            <th className="font-400" style={{ padding: '5px' }}>الاسم بالكامل</th>
            <th className="font-400" style={{ padding: '5px' }}>الشهر</th>
            <th className="font-400" style={{ padding: '5px' }}>الراتب الأساسي</th>
            <th className="font-400" style={{ padding: '5px' }}>البدلات</th>
            <th className="font-400" style={{ padding: '5px' }}>علاوات</th>
            <th className="font-400" style={{ padding: '5px' }}>الخصومات</th>
            <th className="font-400" style={{ padding: '5px' }}>الإجمالي</th>
            <th className="font-400" style={{ padding: '5px' }}>طريقة الدفع</th>
            <th className="font-400" style={{ padding: '5px' }}>البنك</th>
            <th className="font-400" style={{ padding: '5px' }}>رقم البيان</th>
        </tr>
    </thead>
    <tbody>
    {data?.data?.length > 0 ? (
  data.data.map((emp, index) => (
    <tr key={index} className="text-[16px] tracking-wide">
      <td style={{ padding: '5px' }}>{emp?.employee?.name || 'غير متوفر'}</td>
      <td style={{ padding: '5px' }}>{emp?.month || 'غير متوفر'}</td>
      <td style={{ padding: '5px' }}>{emp?.basic_salary ? `${emp.basic_salary} ر.س` : 'غير متوفر'}</td>
      <td style={{ padding: '5px' }}>{emp?.allowances ? `${emp.allowances} ر.س` : 'غير متوفر'}</td>
      <td style={{ padding: '5px' }}>{emp?.bonuses ? `${emp.bonuses} ر.س` : 'غير متوفر'}</td>
      <td style={{ padding: '5px' }}>{emp?.deductions ? `${emp.deductions} ر.س` : 'غير متوفر'}</td>
      <td style={{ padding: '5px' }}>{emp?.net_salary ? `${emp.net_salary} ر.س` : 'غير متوفر'}</td>
      <td style={{ padding: '5px' }}>{emp?.payment_method || 'غير متوفر'}</td>
      <td style={{ padding: '5px' }}>{emp?.bank_name || 'غير متوفر'}</td>
      <td style={{ padding: '5px' }}>{emp?.bank_account_number || 'غير متوفر'}</td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan="10" className="text-center">لا توجد بيانات لعرضها</td>
  </tr>
)}

      
    </tbody>
</table>

        </div>
    );
}

export default FinancialData;
