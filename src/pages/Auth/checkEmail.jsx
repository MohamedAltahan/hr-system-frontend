import {  useState } from "react";
import logo from '../../assets/MainLogo.png';
import { useCheckEmailMutation } from "../../api/Auth";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const CheckEmail = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    // Initialize mutation hook
    const [checkEmail, { isLoading }] = useCheckEmailMutation();

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Call the mutation function
            const response = await checkEmail({ email }).unwrap();       
                 console.log(response);
            
        
            // Success response handling
            toast.success("تم إرسال البريد الإلكتروني بنجاح");
            navigate('/ResetPassword', { state: { email } });
        } catch (err) {
            // Error response handling
            toast.error(err?.data?.message || "حدث خطأ أثناء معالجة الطلب");
            console.log(err);
            
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white px-8 w-full pb-10 max-w-xl rounded-xl shadow-xl">
                <div className="w-[65%] mx-auto">
                    <div className="flex justify-center flex-col w-full">
                        <img
                            src={logo}
                            alt="Al Kholoud HR"
                            className="mx-auto object-fill h-[250px]"
                        />
                        <h2 className="text-xl font-bold text-center mb-8 text-[#0C0A34]">
                            إعادة تسجيل كلمة المرور
                        </h2>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} // Update email state
                                placeholder="البريد الإلكتروني"
                                className="w-full border bg-[#E6E6E6] placeholder:text-[#767676] text-[#0C0A34] border-gray-300 rounded-2xl py-2.5 px-3 focus:outline-none focus:ring-0"
                            />
                        </div>

                        <div className="my-6">
                            <p className="text-center">
                                هل تريد تسجيل الدخول ؟  
                                <Link to={'/login'}>
                                    <span className="text-[#1468A9] cursor-pointer"> انقر هنا </span>
                                </Link>
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading} // Disable the button while loading
                            className="w-full bg-[#1A2B88] text-white font-medium py-2.5 px-4 rounded-xl hover:bg-[#313d81] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {isLoading ? "جاري أرسال طلبك..." : "متابعه"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CheckEmail;
