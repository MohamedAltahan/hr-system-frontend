import React from 'react';

const TextInput = ({
  label,
  id,
  name,
  value,
  onChange,
  placeholder,
  type = 'text',
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

      <input
        type={type}
        id={id || name}
        name={name}
        {...(isControlled
          ? {
              value,
              onChange: onChange || (() => {}), // prevent warning
            }
          : {})}
        {...(!isControlled ? { defaultValue: placeholder || '' } : {})}
        placeholder={placeholder}
        required={required}
        className={`shadow-input w-full border bg-transparent placeholder:text-[#13131340] 
        text-[#0C0A34] border-gray-300 rounded-md py-2.5 px-3 focus:outline-none focus:ring-0 ${className}`}
      />
    </div>
  );
};

export default TextInput;
