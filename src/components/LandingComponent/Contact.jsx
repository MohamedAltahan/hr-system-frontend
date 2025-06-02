const Contact = () => {
  return (
    <div className="pt-96 lg:pt-4 flex items-center justify-center">
      <div className="w-[90%] lg:w-[80%] mx-auto md:bg-feature py-10 rounded-xl">
        {/* Header Section */}
        <h2 className="text-2xl lg:text-5xl font-extrabold text-center text-gray-800 mb-4">
          تواصل معنا الآن بكل سهولة
        </h2>
        <p className="text-center text-[#74738B] text-sm lg:text-lg w-[90%] lg:w-[54%] mx-auto">
          نسعى لجعل تجربتك معنا مميزة وسهلة. يمكنك التواصل معنا بكل سهولة ويسر عبر
          قنواتنا المختلفة. سواء كنت بحاجة إلى استفسارات، دعم فني، أو معلومات
          إضافية.
        </p>

        {/* Contact Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center pb-10 lg:pb-5 gap-6 lg:gap-3 md:bg-feature2 py-10 rounded-xl mt-10">
          {/* Contact Info */}
          <div className="lg:col-span-6 ms-auto text-center lg:text-right">
            <h1 className="font-bold text-2xl lg:text-4xl">تواصل معنا</h1>
            <p className="text-sm lg:text-xl font-semibold pt-5 text-[#6F6C90] pe-0 lg:pe-10 w-full lg:w-[80%] tracking-wide">
              تواصل مع فريق فن الخلود الآن عبر إرسال رسالتك.
            </p>
          </div>

          {/* Form Section */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start gap-5">
            <div className="flex flex-col w-full lg:w-[60%] gap-1">
              <label htmlFor="name">الأسم</label>
              <input
                className="py-2 rounded-3xl px-4 shadow-xl"
                type="text"
                name="name"
                id="name"
                placeholder="الاسم"
              />
            </div>
            <div className="flex flex-col w-full lg:w-[60%] gap-1">
              <label htmlFor="email">البريد الإلكتروني</label>
              <input
                className="py-2 rounded-3xl px-4 shadow-xl"
                type="email"
                name="email"
                id="email"
                placeholder="البريد الإلكتروني"
              />
            </div>
            <div className="flex flex-col w-full lg:w-[60%] gap-1">
              <label htmlFor="message">أكتب رسالتك</label>
              <textarea
                className="py-2 rounded-3xl px-4 shadow-xl"
                name="message"
                id="message"
                placeholder="رسالتك هنا"
                rows="3"
              ></textarea>
            </div>
            <button
              type="button"
              className="bg-[#1A2B88] text-white py-2 px-10 rounded-2xl"
            >
              ارسال الرسالة
            </button>
          </div>
        </div>

        {/* Decorative Section */}
        <div className=" mx-auto text-center relative hidden md:block py-10 rounded-xl">
          <svg
            className="absolute left-[10%] lg:left-[20%] -bottom-6"
            width="955"
            height="12"
            viewBox="0 0 1255 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 7.76562L1251 4"
              stroke="#20163D"
              strokeWidth="7"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Contact;
