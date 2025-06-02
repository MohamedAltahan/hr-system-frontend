import { useEffect, useState } from "react";
import mainImage from '../../assets/auth_background.png';
import { useAdminloginMutation } from "../../api/Auth";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "../../components/Reusable Component/TextInput";
import PasswordInput from "../../components/Reusable Component/PasswordInput";
import Button from "../../components/ui/buttons/Button";

const Login = () => {

  const navigate=useNavigate()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [adminLogin, { isLoading, error }] = useAdminloginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      username: username,
      password: password,
    };

    try {
     const response=  await adminLogin(formData);
     if(response?.data?.status==200){
      toast.success("تم تسجيل الدخول بنجاح")
      
      localStorage.setItem("HrSystem",response.data.response.body.token)
      localStorage.setItem("user", JSON.stringify(response.data.response.body.user))
      localStorage.setItem("roles", JSON.stringify(response.data.response.body.user.roles))
      localStorage.setItem("lang", "ar");
      navigate('/app/dashboard')
     }
     if(response?.error){
      toast.error("هناك خطأ ف الأيميل او الباسورد")
     }
     
    } catch (err) {
      console.error("Login failed", err);
      toast.error("هناك خطأ ف الأيميل او الباسورد")

    }
  };
  useEffect(() => {
   if(error){
    toast.error(error.response.data)
   }
  }, [error]);

  return (
    <div className="flex  items-center justify-center h-screen" style={{ backgroundImage: `url(${mainImage})`, backgroundSize: 'cover', 
    }}>
  
<div className="flex w-full items-center justify-center h-screen" style={{backgroundColor: '#13131399', backgroundSize: 'cover'}}>
      <div className="bg-white px-8  py-8 rounded-3xl shadow-lg flex flex-col items-center justify-center w-[30%] h-[80%] relative">
        <div className="w-[90%] mx-auto">
          {/* <div className="flex justify-center flex-col w-full">
            <img
              src={logo}
              alt="Al Kholoud HR"
              className="mx-auto object-fill h-[250px]"
            />
            <h2 className="text-3xl font-bold text-center mb-8 text-[#0C0A34]">
              تسجيل الدخول إلي حسابك
            </h2>
          </div> */}
<h2 className="title-lg mb-5">مرحبًا بك مرة أخرى  👋</h2>
<span className="title-sm  mb-8" style={{ color: 'var(--secondary-color)' , display: 'block',lineHeight: '1.5'}}> مرحبا بك مجددا في الخلود HR، سجّل الدخول لبدء إدارة مشاريعك</span>
          <form onSubmit={handleSubmit}>


   <TextInput
        label="اسم المستخدم"
        id="username"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="ادخل اسم المستخدم"
      />

         

          
    



          <PasswordInput
        label="كلمة المرور"
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="ادخل كلمة المرور " 
      />

            <div className="my-6">
              <p className="text-end  ">

   <Link to={'/CheckEmail'}>
            <span className=" cursor-pointer title-sm text-underline" style={{ color: 'var(--primary-color)' }}>نسيت كلمة المرور </span>
          </Link>
                        </p>
            </div>


            <Button variant="main"    type="submit" disabled={isLoading}>  {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}</Button>
          </form>
          <div className="flex items-center justify-center mt-4">
            <span className="text-sm text-black">ليس لديك حساب؟</span>
            <Link to="/Register">
              <span className="title-sm mt-3 hover:underline cursor-pointer mr-2" style={{ color: 'var(--primary-color)',fontWeight: '600' }}>
                 قم بالتسجيل الان
              </span>
            </Link>
          </div>

        </div>
      </div>
      </div>
    </div>
  );
};

export default Login;
