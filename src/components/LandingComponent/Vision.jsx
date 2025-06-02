import Star from '../Icons/Star';

const Vision = () => {
  return <>
    <div className="md:bg-feature relative">
      {/* Demo Section */}
      <div className="w-[90%] lg:w-[50%] mx-auto text-center py-10 lg:py-20">
        <h1 className="text-[#1D1B42] font-bold text-2xl lg:text-4xl">
          احصل على نسخة مجانية تجريبية Demo
        </h1>
        <p className="bg-white shadow-2xl text-[#1D1B42] opacity-60 text-base lg:text-lg font-semibold px-6 lg:px-8 rounded-xl py-6 lg:py-8 mt-5">
          احصل على نسخة تجريبية من برنامج الخلود لإدارة الموارد البشرية لمدة 10
          يومًا مجانًا! اختبر بنفسك قوة وكفاءة هذا الحل المتكامل الذي سيحدث ثورة
          في طريقة إدارة شركتك للموارد البشرية. اكتشف الميزات المتقدمة، من إدارة
          التوظيف وتقييم الأداء إلى تحليل البيانات وإدارة الرواتب. استفد من الدعم
          الفني المتواصل خلال الفترة التجريبية وتأكد من أن برنامج الخلود هو
          الشريك المثالي لنمو شركتك ونجاحها. لا تفوت هذه الفرصة، واشترك الآن
          لتجربة فريدة ومذهلة في إدارة الموارد البشرية.
        </p>
      </div>

      {/* Vision Section */}
      <div className="pt-10 lg:pt-20">
        <div className="header">
          <h2 className="text-[#1D1B42] font-bold text-3xl lg:text-5xl text-center">
            رؤيتنا مع شركاء النجاح
          </h2>
          <div className="flex gap-2 lg:gap-4 justify-center pt-5">
            <Star />
            <Star />
            <Star />
            <Star />
            <Star />
          </div>

          {/* Main Content */}
          <div className="bg-white mt-10 shadow-2xl w-[90%] lg:w-[50%] mx-auto pt-8 lg:pt-10 text-[#1D1B42] text-base lg:text-lg font-semibold px-6 lg:px-8 rounded-3xl py-10 lg:py-12">
            <p className="opacity-60">
              احصل على نسخة تجريبية من برنامج الخلود لإدارة الموارد البشرية لمدة 10
              يومًا مجانًا! اختبر بنفسك قوة وكفاءة هذا الحل المتكامل الذي سيحدث
              ثورة في طريقة إدارة شركتك للموارد البشرية. اكتشف الميزات المتقدمة، من
              إدارة التوظيف وتقييم الأداء إلى تحليل البيانات وإدارة الرواتب. استفد
              من الدعم الفني المتواصل خلال الفترة التجريبية وتأكد من أن برنامج
              الخلود هو الشريك المثالي لنمو شركتك ونجاحها. لا تفوت هذه الفرصة،
              واشترك الآن لتجربة فريدة ومذهلة في إدارة الموارد البشرية.
            </p>
          </div>

          {/* Overlapping Content */}
          <div className="relative flex flex-col items-center mt-10 lg:mt-20">
            <div className="absolute -top-5 lg:-top-10 left-4 lg:left-36 bg-white shadow-2xl w-[90%] lg:w-[50%] pt-8 lg:pt-10 text-[#1D1B42] text-base lg:text-lg font-semibold px-6 lg:px-8 rounded-3xl py-10 lg:py-12">
              <p className="opacity-60">
                احصل على نسخة تجريبية من برنامج الخلود لإدارة الموارد البشرية لمدة
                10 يومًا مجانًا! اختبر بنفسك قوة وكفاءة هذا الحل المتكامل الذي
                سيحدث ثورة في طريقة إدارة شركتك للموارد البشرية. اكتشف الميزات
                المتقدمة، من إدارة التوظيف وتقييم الأداء إلى تحليل البيانات وإدارة
                الرواتب. استفد من الدعم الفني المتواصل خلال الفترة التجريبية
                وتأكد من أن برنامج الخلود هو الشريك المثالي لنمو شركتك ونجاحها.
                لا تفوت هذه الفرصة، واشترك الآن لتجربة فريدة ومذهلة في إدارة
                الموارد البشرية.
              </p>
            </div>
          </div>

          {/* Footer Text */}
        
        </div>
        <div className="pt-48 md:block hidden relative lg:pt-64 text-center text-[#1D1B42] opacity-90">
            <p className="w-[90%] lg:w-[35%] relative text-base lg:text-xl mx-auto pb-5">
              معًا، نصنع قصص نجاح ملهمة ونبني مستقبلًا مشرقًا يعتمد على التفوق
              والتميز في إدارة الموارد البشرية.
            </p>
          </div>
      </div>
    </div>
  
  </>;
};

export default Vision;
