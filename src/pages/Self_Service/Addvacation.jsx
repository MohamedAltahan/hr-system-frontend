import { IoIosArrowBack } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { useAdd_RequestMutation } from '../../api/Self_ServicesSlice';

const Addvacation = () => {
    const [errors, setErrors] = useState({});
    const navigate = useNavigate(); // React Router hook for navigation

    const schema = z.object({
      leave_type: z.string().nonempty('نوع الإجازة مطلوب.'),
      from_date: z.string().nonempty('تاريخ البداية مطلوب.'),
      to_date: z.string().nonempty('تاريخ النهاية مطلوب.'),
      reason: z.string().nonempty("السبب مطلوب"),
       Paid: z.boolean(),
        AirlineTickets: z.boolean(),
      });
    // Local state to manage form data
    const [formData, setFormData] = useState({
      type: "Leave",
      leave_type: '',
      from_date: '',
      to_date: '',
      reason: '',
      file_path: null,
      Paid: false,
      AirlineTickets: false,
    });
  
    // Redux Toolkit mutation hook
    const [add_Request, { isLoading }] = useAdd_RequestMutation();
  
    // Handle input change
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      if (type === 'checkbox') {
        setFormData((prev) => ({
          ...prev,
          [name]: checked,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    };
  
    // Handle file input
    const handleFileChange = (e) => {
      setFormData((prev) => ({
        ...prev,
        file_path: e.target.files[0],
      }));
    };
  
    // Handle form submission

    
    const handleSubmit = async (e) => {
      e.preventDefault();
    console.log(formData);
    
      // Validate form data
      const result = schema.safeParse(formData);
    console.log(!result.success);
    
      if (!result.success) {
        console.log(1);
        
        // Extract and display validation errors
        const fieldErrors = {};
        result.error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
    
        setErrors(fieldErrors);

        return;
      }
    
      // Validation passed, proceed to prepare data for the API
      const data = new FormData();
      data.append('leave_type', formData.leave_type);
      data.append('type', formData.type);
      data.append('from_date', formData.from_date);
      data.append('to_date', formData.to_date);
      data.append('reason', formData.reason);
      if (formData.file_path) {
        data.append('file_path', formData.file_path);
      }
      data.append('Paid', formData.Paid);
      data.append('AirlineTickets', formData.AirlineTickets);
    
      // Call the mutation
      try {
      const reposnes=  await add_Request(data).unwrap();
      console.log(reposnes);
      if(reposnes.status==201) {
        toast.success("تم تقديم طلبك بنجاح")
        setFormData({
          type: "Leave",
          leave_type: '',
          from_date: '',
          to_date: '',
          reason: '',
          file_path: null,
            Paid: false,
            AirlineTickets: false,
          });
  
          // Navigate to /Self_Service/MyRequests
          navigate('/app/Self_Service/MyRequests');
      }

      
      } catch (err) {
        console.error('Error submitting the request:', err);
        toast.error("Failed to submit the request")

        // alert('Failed to submit the request');
      }
    };
    
    return (
        <div className='p-10'>


<nav className="flex" aria-label="Breadcrumb">
  <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
    <li className="inline-flex items-center">
      <Link to={'/app/Self_Service/MyRequests'} className="inline-flex items-center text-2xl font-medium text-[#6F6C90] hover:text-blue-600 ">
        طلباتي
      </Link>
    </li>
    <li>
      <div className="flex items-center">
      <IoIosArrowBack className='mt-0.5 text-[#6F6C90]'/>
        <a className="ms-1 text-2xl font-medium text-[#6F6C90] hover:text-blue-600  ">طلب إجازة</a>
      </div>
    </li>
  
  </ol>
</nav>



<div className="bg-[#FAF8F8]  p-10  shadow-xl w-[65%] rounded-lg mx-auto">
    <div className='w-[50%] rounded-lg mx-auto text-center'>
  <h5 className="text-[#170F49] text-2xl font-bold">طلب إجازة</h5>
  <p className="text-[#6F6C90] text-lg mb-6">إضافة المعلومات الشخصية للموظف أولا</p>
    </div>
  
  <form className="space-y-6  w-[50%] rounded-lg mx-auto"  onSubmit={handleSubmit}>
    {/* Leave Type */}
    <div className="flex flex-col justify-between gap-4">
        <label className='text-[#170F49] text-[16px]'  htmlFor="leave_type">نوع الإجازة</label>
      <input
        type="text"
        id="leave_type"
        name="leave_type"
        placeholder="الإسم"
        value={formData.leave_type}
        onChange={handleChange}
        className="w-full px-2 py-2.5 text-right border-none shadow-xl  border-gray-300 rounded-3xl focus:outline-none focus:ring-0 focus:ring-blue-500"
        />
           {errors.leave_type && (
            <p className="text-red-500 text-sm">{errors.leave_type}</p>
          )}
    </div>
    
    {/* Date Range */}
    <div className="flex flex-col justify-between gap-4">
        <label htmlFor="from_date">التاريخ</label>
        <div className="flex justify-between gap-4">
  <div className="relative w-1/2">
    <input
      type="text"
      id="from_date"
      name="from_date"
      value={formData.from_date}
      onChange={handleChange}
      onFocus={(e) => (e.target.type = "date")}
      onBlur={(e) => (e.target.type = "text")}
      className="w-full px-2 py-2.5 text-right border-none shadow-xl  border-gray-300 rounded-3xl focus:outline-none focus:ring-0 focus:ring-blue-500"
    />
      {errors.from_date && (
            <p className="text-red-500 text-sm">{errors.from_date}</p>
          )}
  </div>
  <div className="relative w-1/2">
    <input
      id="to_date"
      type="text"
      name="to_date"
      value={formData.to_date}
      onChange={handleChange}
      onFocus={(e) => (e.target.type = "date")}
      onBlur={(e) => (e.target.type = "text")}
      className="w-full px-2 py-2.5 text-right border-none shadow-xl  border-gray-300 rounded-3xl focus:outline-none focus:ring-0 focus:ring-blue-500"
    />
     {errors.to_date && (
            <p className="text-red-500 text-sm">{errors.to_date}</p>
          )}
  </div>
</div>

   
    </div>
    
    {/* Notes */}
    <div className="flex flex-col justify-between gap-4">
        <label className='text-[#170F49] text-[16px]'  htmlFor="reason">ملاحظات</label>
        <textarea
        id="reason"
        name="reason"
        placeholder="ملاحظاتك هنا"
        value={formData.reason}
        onChange={handleChange}
        className="w-full px-2 py-2.5 text-right border-none shadow-xl  border-gray-300 rounded-3xl focus:outline-none focus:ring-0 focus:ring-blue-500"
        rows="4"
      ></textarea>
         {errors.reason && (
            <p className="text-red-500 text-sm">{errors.reason}</p>
          )}
    </div>
    
     
    
    {/* File Upload */}
     <div className="">
      <label className="text-[#170F49] text-[16px]">إرفاق ملف</label>
      <div className="flex bg-white px-2 py-8 shadow-xl rounded-3xl  relative flex-col items-center space-y-2">
        <div >
        <svg width="41" height="35" viewBox="0 0 41 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M30.7056 9.20921C30.1401 9.09646 29.6772 8.74283 29.438 8.23717C26.7901 2.64921 20.652 -0.475332 14.5174 0.655584C8.92775 1.68058 4.54588 6.14275 3.61142 11.7615C3.33467 13.4203 3.35517 15.0808 3.66779 16.6985C3.77029 17.2264 3.54308 17.8141 3.07671 18.2378C1.12067 20.0161 0 22.5496 0 25.1907C0 30.3703 4.21446 34.5865 9.39583 34.5865H28.1875C35.2532 34.5865 41 28.8397 41 21.774C41 15.6838 36.6711 10.3982 30.7056 9.20921ZM25.8317 20.4193C25.4986 20.7524 25.0613 20.9198 24.6239 20.9198C24.1866 20.9198 23.7493 20.7524 23.4161 20.4193L20.5 17.5032V26.0448C20.5 26.9895 19.7347 27.7532 18.7917 27.7532C17.8487 27.7532 17.0833 26.9895 17.0833 26.0448V17.5032L14.1672 20.4193C13.4993 21.0873 12.4196 21.0873 11.7516 20.4193C11.0837 19.7513 11.0837 18.6717 11.7516 18.0037L16.3761 13.3793C17.0355 12.7198 17.9016 12.3884 18.7677 12.3833L18.7917 12.3782L18.8156 12.3833C19.6834 12.3884 20.5478 12.7198 21.2073 13.3793L25.8317 18.0037C26.4997 18.6717 26.4997 19.7513 25.8317 20.4193Z" fill="grey"/>
</svg>

        </div>
        <p className="text-[#170F49] text-[12px] font-thin">Drop your file or upload from your device</p>
        <input
          type="file"
          onChange={handleFileChange}
          className="opacity-0 absolute inset-0 cursor-pointer"
        />


{errors.file_path && (
            <p className="text-red-500 text-sm">{errors.file_path}</p>
          )}
      </div>
    </div> 
    
    {/* Options */}
    <div className="text-right space-y-2">
      <div>
        <input type="checkbox"  
            id="Paid"
            name="Paid"
            checked={formData.Paid}
            onChange={handleChange}
        className="mr-2" />
        <label htmlFor="Paid" className="text-[#170F49] ms-2">
          الإجازة مدفوعة مدتها
        </label>
        {errors.Paid && (
            <p className="text-red-500 text-sm">{errors.Paid}</p>
          )}
      </div>
      
      <div>
        <input type="checkbox"  id="AirlineTickets"
                name="AirlineTickets"
                checked={formData.AirlineTickets}
                onChange={handleChange} className="mr-2" />
        <label htmlFor="AirlineTickets" className="text-[#170F49] ms-2">
        إرفاق تذكرة طيران
        </label>
        {errors.AirlineTickets && (
            <p className="text-red-500 text-sm">{errors.AirlineTickets}</p>
          )}
      </div>
     
    </div>
    
    {/* Submit Button */}
    <div className='flex justify-center'>
    <button
              type="submit"
              className="bg-[#1A2B88] text-white py-2 px-12 w-[80%] rounded-3xl text-xl hover:bg-[#0f4f7d] transition"
              disabled={isLoading}
            >
              {isLoading ? 'جاري الإرسال...' : 'تقديم الطلب'}
            </button>
    </div>
  </form>
</div>

        </div>
    );
}

export default Addvacation;
