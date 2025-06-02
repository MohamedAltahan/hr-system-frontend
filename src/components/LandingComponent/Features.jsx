import Arrow from '../Icons/Arrow';
import './Landing.css';

const Features = () => {
  return (
    <>
      <div className="md:bg-feature relative">
        {/* Header Section */}
        <div className="w-[90%] lg:w-[50%] mx-auto text-center pt-10 lg:pt-20">
          <h1 className="text-[#0C0A34] font-bold text-3xl lg:text-5xl">ما يميزنا</h1>
          <p className="text-[#110D5B] opacity-60 pt-4 lg:pt-6 font-medium text-base lg:text-lg">
            برنامج الخلود لإدارة الموارد البشرية يتميز بالعديد من الخصائص التي تجعل
            منه الحل الأمثل لإدارة كل جوانب الموارد البشرية بفعالية وسهولة. إليك
            بعض المميزات الرئيسية:
          </p>
        </div>

        {/* Feature Section 1 */}
        <div className="relative w-[90%] lg:w-[35%] mx-auto pt-10 lg:pt-20">
          <div className="absolute top-16 -right-8 hidden lg:block">
            <Arrow />
          </div>
          <h2 className="w-full lg:w-[95%] text-right opacity-60">
            <span className="text-[#110D5B] text-lg font-bold">تكامل شامل: </span>
            يتضمن برنامج الخلود جميع وظائف الموارد البشرية في منصة واحدة، بدءًا من
            التوظيف وإدارة الأداء، وصولًا إلى التدريب وتطوير المهارات.
          </h2>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 w-[90%] lg:w-[75%] mx-auto pt-10 lg:pt-20">
          <div className="relative col-span-6 mx-auto">
            <div className="absolute -top-1 -right-8 hidden lg:block">
              <Arrow />
            </div>
            <h2 className="w-full lg:w-[86%] text-right opacity-60">
              <span className="text-[#110D5B] text-lg font-bold">سرعة الاستجابة: </span>
              يتيح البرنامج معالجة البيانات والمهام بسرعة ودقة، مما يوفر الوقت ويزيد
              من كفاءة العمليات الإدارية.
            </h2>
          </div>

          <div className="relative col-span-6 mx-auto"></div>

          <div className="relative col-span-6 mx-auto"></div>

          <div className="relative col-span-6 mx-auto">
            <div className="absolute -top-1 -right-8 hidden lg:block">
              <Arrow />
            </div>
            <h2 className="w-full lg:w-[86%] text-right opacity-60">
              <span className="text-[#110D5B] text-lg font-bold">تحليل البيانات المتقدم: </span>
              يقدم البرنامج تقارير وتحليلات تفصيلية تساعد في اتخاذ قرارات مستنيرة،
              وذلك من خلال الاستفادة من البيانات الضخمة والتكنولوجيا الذكية.
            </h2>
          </div>

          <div className="relative col-span-6 mx-auto">
            <div className="absolute -top-1 -right-8 hidden lg:block">
              <Arrow />
            </div>
            <h2 className="w-full lg:w-[86%] text-right opacity-60">
              <span className="text-[#110D5B] text-lg font-bold">واجهة مستخدم سهلة: </span>
              تصميم سهل الاستخدام يضمن أن يتمكن جميع أفراد فريق العمل من التعامل مع
              النظام بكفاءة دون الحاجة إلى تدريب مكثف.
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 w-[90%] lg:w-[75%] mx-auto">
          <div className="relative col-span-6 mx-auto"></div>

          <div className="relative col-span-6 mx-auto">
            <div className="absolute -top-1 -right-8 hidden lg:block">
              <Arrow />
            </div>
            <h2 className="w-full lg:w-[86%] text-right opacity-60">
              <span className="text-[#110D5B] text-lg font-bold">إدارة الرواتب والمكافآت: </span>
              يسهل البرنامج عمليات حساب الرواتب والمزايا بدقة متناهية، مع الالتزام
              بكافة التشريعات والقوانين المحلية والدولية.
            </h2>
          </div>

          <div className="relative col-span-6 mx-auto">
            <div className="absolute -top-1 -right-8 hidden lg:block">
              <Arrow />
            </div>
            <h2 className="w-full lg:w-[86%] text-right opacity-60">
              <span className="text-[#110D5B] text-lg font-bold">أمان البيانات: </span>
              يعتمد برنامج الخلود أعلى معايير الأمان لحماية بيانات شركتك وموظفيك من
              أي تهديدات.
            </h2>
          </div>

          <div className="relative col-span-6 mx-auto"></div>

          <div className="relative col-span-6 mx-auto"></div>

          <div className="relative col-span-6 mx-auto">
            <div className="absolute top-0 -right-8 hidden lg:block">
              <Arrow />
            </div>
            <h2 className="w-full lg:w-[86%] text-right opacity-60">
              <span className="text-[#110D5B] text-lg font-bold">مرونة التخصيص: </span>
              يمكن تكييف البرنامج وفق احتياجات ومتطلبات شركتك الخاصة، مما يجعله
              حلاً مثالياً لكافة أحجام وأنواع المؤسسات.
            </h2>
          </div>
        </div>
      </div>


    </>
  );
};

export default Features;
