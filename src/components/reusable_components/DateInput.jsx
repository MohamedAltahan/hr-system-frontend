import React from "react";

const DateInput = ({
  label,
  id,
  name,
  value,
  onChange,
  placeholder,
  className = "",
  required = true,
}) => {
  const isControlled = value !== undefined;

  return (
    <div className="">
      {label && (
        <label
          htmlFor={id || name}
          className="block mb-2 text-gray-900 dark:text-black label-md mb-3"
        >
          {label}
        </label>
      )}

      <input
        type="date"
        id={id || name}
        name={name}
        {...(isControlled
          ? {
              value,
              onChange: onChange || (() => {}),
            }
          : {})}
        {...(!isControlled ? { defaultValue: placeholder || '' } : {})}
        placeholder={placeholder}
        required={required}
        className={`shadow-input w-full border bg-transparent placeholder:text-[#13131340] 
        text-[#0C0A34] border-gray-300 rounded-md py-2.5 px-3 
        focus:outline-none focus:ring-0 focus:border-gray-300 ${className}`}
      />
    </div>
  );
};

export default DateInput;
