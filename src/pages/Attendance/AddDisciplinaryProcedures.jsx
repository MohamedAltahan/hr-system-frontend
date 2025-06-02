import {  useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { useGetAllEmployeeQuery } from '../../api/Employee';
import { useAdd_disciplinaryMutation, useGetAllDisciplinarybyIdQuery, useUpdate_disciplinaryMutation } from '../../api/Attendce';

const AddDisciplinaryProcedures = () => {
    const { id } = useParams();
    console.log(id);
    
    const [errors, setErrors] = useState({});
    const navigate = useNavigate(); // React Router hook for navigation
       const { data,  refetch } = useGetAllEmployeeQuery();
       const { data: disciplinaryData, isFetching } = useGetAllDisciplinarybyIdQuery(id, {
        skip: !id, // Skip the query if no `id` is provided
      });
            
      useEffect(() => {
      refetch()
      }, [refetch]);
      useEffect(() => {
        if (disciplinaryData && !isFetching) {
            console.log(disciplinaryData);
            
          // Populate formData with the data fetched
          setFormData({
            employee_id: disciplinaryData?.data?.employee_id || '',
            recorded_by: disciplinaryData?.data?.recorded_by || '',
            action_type: disciplinaryData?.data?.action_type || '',
            amount: disciplinaryData?.data?.amount || '',
            execution_date: disciplinaryData?.data?.execution_date || '',
            reason: disciplinaryData?.data?.reason || '',
          });
        }
      }, [disciplinaryData, isFetching]);
      const schema = z.object({
        employee_id: z.number().min(1, 'اسم الموظف مطلوب.'),
        recorded_by: z.number().min(1, 'اسم الموظف مطلوب.'),
        action_type: z.string().nonempty('نوع الإجراء مطلوب.'),
        amount: z.number().positive('الخصم مطلوب ويجب أن يكون رقمًا موجبًا.'),
        execution_date: z.string().nonempty('التاريخ مطلوب.'),
        reason: z.string().nonempty('السبب مطلوب.'),
      });
    // Local state to manage form data
    const [formData, setFormData] = useState({
        employee_id: '',
        recorded_by: '', // Assuming a static value for the user making the record
        action_type: '',
        amount: '',
        execution_date: '',
        reason: '',
      });
  
    // Redux Toolkit mutation hook
    const [add_disciplinary, { isLoading: isAdding }] = useAdd_disciplinaryMutation();
    const [update_disciplinary, { isLoading: isUpdating }] = useUpdate_disciplinaryMutation();
    
    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: name === 'amount' ? parseFloat(value) : value,
        }));
      };
  
    // Handle file input

  
    // Handle form submission

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const sanitizedData = {
            ...formData,
            employee_id: Number(formData.employee_id),
            recorded_by: Number(formData.recorded_by),
            amount: Number(formData.amount),
          };
          const result = schema.safeParse(sanitizedData);

        if (!result.success) {
          const fieldErrors = {};
          result.error.errors.forEach((err) => {
            fieldErrors[err.path[0]] = err.message;
          });
          setErrors(fieldErrors);
          return;
        }
    
        try {
            if (id) {
                // Update disciplinary action
                const response = await update_disciplinary({ id, formData: sanitizedData }).unwrap();
                if (response.status === 200) {
                  toast.success('تم تعديل البيانات بنجاح');
                  navigate('/app/Attendance/DisciplinaryProcedures');
                }
              } else {
                // Add new disciplinary action
                const response = await add_disciplinary(sanitizedData).unwrap();
                if (response.status === 201) {
                  toast.success('تم تقديم طلبك بنجاح');
                  navigate('/app/Attendance/DisciplinaryProcedures');
                }
              }
            } catch (err) {
              console.error('Error submitting the request:', err);
              toast.error('فشل في إرسال الطلب');
            }
          };
        
    return (
        <div className='p-10'>


<nav className="flex pb-10" aria-label="Breadcrumb">
      <button className="inline-flex items-center text-4xl font-medium text-[#110D5B] hover:text-[#403aaf] ">
      {id ? 'تعديل إجراء تأديبي' : 'إتخاذ إجراء تأديبي'}
      </button>
</nav>



<div className="bg-white  p-10  shadow-2xl shadow-gray-400 w-[95%] rounded-lg mx-auto">

  <form className="font font-medium  rounded-lg mx-auto gap-5"  onSubmit={handleSubmit}>
    {/* Leave Type */}
  <div className='grid grid-cols-12 gap-5'>
  <div className="col-span-4">
  <div className="flex flex-col justify-between gap-2">
    <label className="text-[#949494] text-[17px]" htmlFor="employee_id">اسم الموظف</label>
    <select
                id="employee_id"
                name="employee_id"
                value={formData.employee_id}
                onChange={(e) =>
                    setFormData((prev) => ({ ...prev, employee_id: Number(e.target.value) }))
                  }
                                  className="w-full px-2 py-2 text-right bg-gray-100 border-none shadow-xl text-[#949494] border-[#868686] rounded-lg"
              >
        <option value="" disabled className="text-gray-500">الموظف</option>
        {data?.data?.map((option) => (
          <option key={option.id} value={option.id} style={{ color: 'black' }}>
            {option.name}
          </option>
      
))}
    </select>
    {errors.employee_id && <p className="text-red-500 text-sm">{errors.employee_id}</p>}

  </div>
</div>

    <div className="col-span-4">
    <div className="flex flex-col justify-between gap-2">
        <label className='text-[#949494] text-[17px]'  htmlFor="action_type">نوع الإجراء</label>
        <input
                type="text"
                id="action_type"
                name="action_type"
                placeholder="الإجراء"
                value={formData.action_type}
                onChange={handleChange}
                className="w-full px-2 py-2 text-right bg-gray-100 border-none shadow-xl text-[#949494] border-[#868686] rounded-lg"
              />
                    {errors.action_type && <p className="text-red-500 text-sm">{errors.action_type}</p>}

    </div>
    </div>
    <div className="col-span-4">
    <div className="flex flex-col justify-between gap-2">
        <label className='text-[#949494] text-[17px]'  htmlFor="amount">الخصم</label>
        <input
                type="number"
                id="amount"
                name="amount"
                placeholder="EGP"
                value={formData.amount}
                onChange={handleChange}
                className="w-full px-2 py-2 text-right bg-gray-100 border-none shadow-xl text-[#949494] border-[#868686] rounded-lg"
              />
                     {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}

    </div>
    </div>
    <div className="col-span-4">
    <div className="flex flex-col justify-between gap-2">
        <label htmlFor="execution_date">التاريخ</label>
        <div className="flex justify-between gap-4">
  <div className="relative w-full">
  <input
                type="date"
                id="execution_date"
                name="execution_date"
                value={formData.execution_date}
                onChange={handleChange}
                className="w-full px-2 py-2 text-right bg-gray-100 border-none shadow-xl text-[#949494] border-[#868686] rounded-lg"
              />
     {errors.execution_date && (
                <p className="text-red-500 text-sm">{errors.execution_date}</p>
              )}
  </div>

</div>

   
    </div>
</div>
    <div className="col-span-4">
    <div className="flex flex-col justify-between gap-2">
    <label className="text-[#949494] text-[17px]" htmlFor="recorded_by">أرفاق موظف</label>
    <select
      id="recorded_by"
      name="recorded_by"
      value={formData.recorded_by}
      onChange={handleChange}
      className="w-full px-2 py-2 text-right bg-gray-100 border-none shadow-xl text-[#949494] border-[#868686] rounded-lg"
      >
        <option value="" disabled className="text-gray-500">الموظف</option>
        {data?.data?.map((option) => (
          <option key={option.id} value={option.id} style={{ color: 'black' }}>
            {option.name}
          </option>
      
))}
    </select>
    {errors.leave_type && (
      <p className="text-red-500 text-sm">{errors.leave_type}</p>
    )}
  </div>
</div>
    
    
    {/* Notes */}
    <div className='col-span-6'>
    <div className="flex flex-col justify-between gap-2">
        <label className='text-[#949494] text-[17px]'  htmlFor="reason">ملاحظات</label>
        <textarea
                id="reason"
                name="reason"
                placeholder="ملاحظاتك هنا"
                value={formData.reason}
                onChange={handleChange}
                className="w-full px-2 py-2 text-right bg-gray-100 border-none shadow-xl text-[#949494] border-[#868686] rounded-lg"
                rows="4"
              ></textarea>
         {errors.reason && (
            <p className="text-red-500 text-sm">{errors.reason}</p>
          )}
    </div>
    </div>
  </div>
    

    

    
    <div className="col-span-1 flex justify-end">
            <button
              type="submit"
              className="bg-[#42A6CA] text-white py-2 px-8 w-[25%] rounded-3xl text-xl hover:bg-[#0f4f7d] transition"
              disabled={isAdding||isUpdating }
            >
              {isAdding||isUpdating ? 'جاري الإرسال...' : id ? 'تعديل' : 'إضافة'}
              </button>
          </div>
  </form>

</div>

        </div>
    );
}

export default AddDisciplinaryProcedures;
