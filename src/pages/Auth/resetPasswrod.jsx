import { useEffect, useState } from "react";
import { z } from "zod";
import logo from '../../assets/MainLogo.png';
import {  useNavigate, useLocation, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useChangePasswordMutation } from "../../api/Auth";
import { toast } from "react-toastify";

const ResetPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Extract email and restoken from state
    const { email, resetToken } = location.state || {};
console.log(email);

    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setReShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [changePassword, { isLoading }] = useChangePasswordMutation();

    const passwordSchema = z.object({
        password: z.string().min(1, "كلمة المرور مطلوبة"),
        repassword: z.string().min(1, "تأكيد كلمة المرور مطلوب")
    }).refine((data) => data.password === data.repassword, {
        message: "كلمة المرور غير متطابقة",
        path: ["repassword"], // Target repassword field for the error message
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            password,
            repassword,
        };

        const validation = passwordSchema.safeParse(formData);

        if (!validation.success) {
            const firstError = validation.error.issues[0];
            setErrorMessage(firstError.message);
            return;
        }

        setErrorMessage("");

        try {
            const response = await changePassword({
                password:password,
                email,
                password_confirmation:repassword
            }).unwrap();
console.log(response);

            if (response?.status===200) {
                toast.success("تم تغيير كلمة المرور بنجاح");
                    navigate('/login', { state: { email:null } });            
            }            
        } catch (error) {
            toast.error(error?.data[0]?.description || "حدث خطأ أثناء تغيير كلمة المرور");
        }
    };


useEffect(() => {
if(!email && !resetToken) {
    navigate("/CheckEmail")
}
}, [email, navigate, resetToken]);

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
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="كلمة المرور الجديدة"
                                className="w-full border bg-[#E6E6E6] placeholder:text-[#767676] text-[#0C0A34] border-gray-300 rounded-2xl py-2.5 px-3 focus:outline-none focus:ring-0"
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 left-4 flex items-center cursor-pointer text-[#767676]"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>

                        <div className="relative mt-4">
                            <input
                                type={showRePassword ? "text" : "password"}
                                id="repassword"
                                value={repassword}
                                onChange={(e) => setRepassword(e.target.value)}
                                placeholder="إعادة إدخال كلمة المرور الجديدة"
                                className="w-full border bg-[#E6E6E6] placeholder:text-[#767676] text-[#0C0A34] border-gray-300 rounded-2xl py-2.5 px-3 focus:outline-none focus:ring-0"
                            />
                            <span
                                onClick={() => setReShowPassword(!showRePassword)}
                                className="absolute inset-y-0 left-4 flex items-center cursor-pointer text-[#767676]"
                            >
                                {showRePassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>

                        {errorMessage && (
                            <p className="text-red-500 text-center mt-2">{errorMessage}</p>
                        )}

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
                            disabled={isLoading}
                            className="w-full bg-[#1A2B88] text-white font-medium py-2.5 px-4 rounded-xl hover:bg-[#313d81] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {isLoading ? "جاري المعالجة..." : "تأكيد"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
