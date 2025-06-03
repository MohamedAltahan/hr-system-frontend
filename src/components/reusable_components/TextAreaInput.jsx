import React from 'react';

const TextAreaInput = ({
  label,
  id,
  name,
  value,
  onChange,
  placeholder,
  rows = 4,
  className = '',
  required = true,
}) => {
  const isControlled = value !== undefined;

  return (
    <div className="mb-3">
      {label && (
        <label
          htmlFor={id || name}
          className="block mb-2 text-gray-900 dark:text-black label-md mb-3"
        >
          {label}
        </label>
      )}

      <textarea
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
        rows={rows}
        className={`textArea w-full border bg-transparent placeholder:text-[#13131340] 
        text-[#0C0A34] border-gray-300 rounded-md py-2.5 px-3 focus:outline-none focus:ring-0 ${className}`}
      />
    </div>
  );
};

export default TextAreaInput;
