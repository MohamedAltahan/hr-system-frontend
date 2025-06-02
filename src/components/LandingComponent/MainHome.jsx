import mainLogo from "../../assets/mainpage.png"
const MainHome = () => {
    return (
        <div>
        <div className="grid grid-cols-1 lg:grid-cols-12 items-end justify-between px-6 lg:px-10">
          {/* Text Section */}
          <div className="col-span-6 flex flex-col gap-4 items-start py-6 lg:py-10">
            <h1 className="text-[#0C0A34] font-black text-2xl lg:text-4xl text-center lg:text-start">
              ما هو برنامج الخلود HR
            </h1>
            <p className="text-[#110D5B] lg:w-[75%] w-full p-1 opacity-60 text-sm lg:text-base text-center lg:text-start">
              هو التطبيق الرائد الذي يجمع بين التكنولوجيا المتقدمة والاستراتيجيات الحديثة
              لضمان أن تكون إدارة الموارد البشرية لشركتك ذات فعالية قصوى. يهدف هذا
              البرنامج إلى تحسين عمليات التوظيف، وإدارة الأداء، وتطوير المهارات، وإدارة
              الرواتب والمزايا بأسلوب يجمع بين الدقة والاستجابة السريعة.
            </p>
            <button className="border rounded-3xl border-black px-4 py-2 self-center lg:self-start">
              ما يميزنا
            </button>
          </div>
      
          {/* Image Section */}
          <div className="col-span-6 relative hidden lg:block">
            <div className="absolute -bottom-3 -right-[327px]">
              <svg
                width="652"
                height="40"
                viewBox="0 0 852 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 15.5C2.067 15.5 0.5 17.067 0.5 19C0.5 20.933 2.067 22.5 4 22.5L4 15.5ZM814.333 19.0001C814.333 29.3094 822.691 37.6667 833 37.6667C843.309 37.6667 851.667 29.3094 851.667 19.0001C851.667 8.69076 843.309 0.333407 833 0.333406C822.691 0.333406 814.333 8.69076 814.333 19.0001ZM4 22.5L833 22.5001L833 15.5001L4 15.5L4 22.5Z"
                  fill="#20163D"
                />
              </svg>
            </div>
            <img src={mainLogo} alt="Main Logo" className="w-full" />
            <div className="absolute bottom-1 -left-10">
              <svg
                width="362"
                height="8"
                viewBox="0 0 362 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 4L358 3.99997"
                  stroke="#20163D"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      
        {/* Additional Description */}
        <div className="w-[90%] lg:w-[50%] pt-6 lg:pt-10 mx-auto text-[#110D5B] opacity-60 text-sm lg:text-base text-center">
          من خلال برنامج الخلود، يمكن للشركات تحسين تجربة الموظفين وزيادة رضاهم، مما
          يؤدي في النهاية إلى زيادة الإنتاجية والأداء العام للشركة. يتيح البرنامج أيضًا
          للإدارة الوصول السهل إلى بيانات محورية وتحليلات دقيقة تدعم عمليات اتخاذ
          القرار، مما يجعله أداة حيوية لأي منظمة تسعى للنمو والتفوق في سوق العمل
          اليوم.
        </div>
      </div>
      
    );
}

export default MainHome;
