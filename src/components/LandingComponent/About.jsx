import second from "../../assets/second.png";

const About = () => {
  return (
    <div className="md:bg-feature relative pt-10">
      {/* Header Section */}
      <h1 className="text-right text-[#FEFEFE] bg-[#0C0A34ED] w-[90%] lg:w-[50%] ms-auto py-3 px-4 tracking-wide text-2xl lg:text-4xl font-semibold rounded-r-xl">
        ماذا ستجد ببرنامج الخلود HR
      </h1>

      {/* Description Section */}
      <div className="ms-auto py-6 text-[#1D1B42] opacity-80 font-medium bg-white w-[90%] lg:w-[35%] px-6 lg:px-10 shadow-2xl rounded-3xl my-6 lg:my-10">
        <p>
          باختيارك لبرنامج الخلود، تضمن تحقيق أعلى مستوى من الكفاءة والدقة في إدارة
          موارد شركتك البشرية، مع توفير تجربة مستخدم سلسة وآمنة لك وللموظفين.
        </p>
      </div>

      {/* Image Section */}
      <div className="lg:absolute  top-10 -right-12 lg:-right-24 w-[90%] lg:w-[70%]">
        <img src={second} className="w-full" alt="HR Program Illustration" />
      </div>

      {/* Features Section */}
      <div className="me-0 lg:me-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-[90%] lg:w-[50%] ms-auto text-center gap-3 lg:me-5">
          <div className="border border-[#08053F] rounded-2xl py-2 px-2">
            <p className="text-[#08053F] opacity-55">تحليل البيانات والتقارير</p>
          </div>
          <div className="border border-[#08053F] rounded-2xl py-2">
            <p className="text-[#08053F] opacity-55">إدارة التوظيف</p>
          </div>
          <div className="border border-[#08053F] rounded-2xl py-2">
            <p className="text-[#08053F] opacity-55">أمان البيانات</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-[90%] lg:w-[55%] pt-5 ms-auto text-center gap-3 lg:me-5">
          <div className="border border-[#08053F] rounded-2xl py-2 px-2">
            <p className="text-[#08053F] opacity-55">الدعم الفني</p>
          </div>
          <div className="border border-[#08053F] rounded-2xl py-2">
            <p className="text-[#08053F] opacity-55">التكامل مع الأنظمة الأخرى</p>
          </div>
          <div className="border border-[#08053F] rounded-2xl py-2">
            <p className="text-[#08053F] opacity-55">إدارة الحضور والإجازات</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-[90%] lg:w-[57%] pt-5 ms-auto text-center gap-3 lg:me-5">
          <div className="border border-[#08053F] rounded-2xl py-2 px-2">
            <p className="text-[#08053F] opacity-55">واجهة مستخدم واضحة</p>
          </div>
          <div className="border border-[#08053F] rounded-2xl py-2 px-2">
            <p className="text-[#08053F] opacity-55">
              إدارة الرواتب والمكافآت والخصومات
            </p>
          </div>
          <div className="border border-[#08053F] rounded-2xl py-2 px-2">
            <p className="text-[#08053F] opacity-55">التدريب وتطوير المهارات</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
