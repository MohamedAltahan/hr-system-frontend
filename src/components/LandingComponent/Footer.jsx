import image from "../../assets/MainLogo.png";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Logo Section */}
          <div className="col-span-12 lg:col-span-2 flex justify-center lg:justify-start">
            <img src={image} alt="Logo" className="w-32 lg:w-40" />
          </div>

          {/* About Section */}
          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <h5 className="font-bold text-lg mb-3 text-blue-900">عن المنشأة</h5>
            <ul className="space-y-2 text-sm">
              <li>عن فن الخلود</li>
              <li>أصبح شريكًا</li>
              <li>شهادات العملاء</li>
              <li>انضم إلى فريقنا</li>
              <li>مركز التوثيق</li>
            </ul>
          </div>

          {/* Solutions Section */}
          <div className="col-span-6 sm:col-span-3 lg:col-span-3">
            <h5 className="font-bold text-lg mb-3 text-blue-900">حلولنا</h5>
            <ul className="space-y-2 text-sm">
              <li>مسير الرواتب</li>
              <li>تتبع الدوام والوقت</li>
              <li>الخدمات الذاتيه للموظفين</li>
              <li>الترحيب بالموظفين الجدد وانهاء الخدمات</li>
              <li>تقييم الأداء</li>
              <li>نظام تتبع الطلبات</li>
            </ul>
          </div>

          {/* Content Section */}
          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <h5 className="font-bold text-lg mb-3 text-blue-900">محتوى</h5>
            <ul className="space-y-2 text-sm">
              <li>المدونة</li>
              <li>الأوراق</li>
              <li>الأسئلة الشائعة</li>
              <li>المعجم</li>
              <li>دراسة الموظفين</li>
              <li>نظام تتبع الطلبات</li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-3">
            <h5 className="font-bold text-lg mb-3 text-blue-900">تواصل معنا</h5>
            <p className="textsm">
              المملكة العربية السعودية : <span dir="ltr" > +966 23 254 4568</span>
            </p>
            <p className="text- mt-2">
              القاهرة : <span dir="ltr" > +20 01000231578</span>
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 sm:mt-12 border-t pt-6">
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {/* Contact Information */}
            <div className="flex gap-2 items-center">
              <p dir="ltr">+965 544 64 64</p>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.54 5C6.6 5.89 6.75 6.76 6.99 7.59L5.79 8.79C5.38 7.59 5.12 6.32 5.03 5H6.54ZM16.4 17.02C17.25 17.26 18.12 17.41 19 17.47V18.96C17.68 18.87 16.41 18.61 15.2 18.21L16.4 17.02ZM7.5 3H4C3.45 3 3 3.45 3 4C3 13.39 10.61 21 20 21C20.55 21 21 20.55 21 20V16.51C21 15.96 20.55 15.51 20 15.51C18.76 15.51 17.55 15.31 16.43 14.94C16.33 14.9 16.22 14.89 16.12 14.89C15.86 14.89 15.61 14.99 15.41 15.18L13.21 17.38C10.38 15.93 8.06 13.62 6.62 10.79L8.82 8.59C9.1 8.31 9.18 7.92 9.07 7.57C8.7 6.45 8.5 5.25 8.5 4C8.5 3.45 8.05 3 7.5 3Z"
                  fill="#110D5B"
                />
              </svg>
            </div>
            <div className="flex gap-2 items-center">
              <p dir="ltr">info@alkholoudhr.com</p>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z"
                  fill="#2D345D"
                />
              </svg>
            </div>
            <div className="flex gap-2 items-center">
              <p dir="ltr">8819 Ohio St. South Gate, CA 90280</p>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C15.87 2 19 5.13 19 9C19 14.25 12 22 12 22C12 22 5 14.25 5 9C5 5.13 8.13 2 12 2ZM7 9C7 11.85 9.92 16.21 12 18.88C14.12 16.19 17 11.88 17 9C17 6.24 14.76 4 12 4C9.24 4 7 6.24 7 9ZM12 11.5C10.6193 11.5 9.5 10.3807 9.5 9C9.5 7.61929 10.6193 6.5 12 6.5C13.3807 6.5 14.5 7.61929 14.5 9C14.5 10.3807 13.3807 11.5 12 11.5Z"
                  fill="#110D5B"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
