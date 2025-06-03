import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const PasswordInput = ({
  label,
  id,
  name,
  value,
  onChange,
  placeholder,
  className = '',
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-6 relative">
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-black label-sm mb-3"
        >
          {label}
        </label>
      )}
      <input
        type={showPassword ? 'text' : 'password'}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className={`shadow-input w-full border bg-transparent placeholder:text-[#13131340] 
        text-[#0C0A34] border-gray-300 rounded-md py-2.5 px-3 focus:outline-none focus:ring-0 ${className} `}
      />
      <span
        onClick={() => setShowPassword(!showPassword)}
        className="absolute inset-y-0 left-4 flex items-center cursor-pointer text-[#767676] "
        style={{marginBlockStart:'27px',display:'flex',alignItems:'center'}}
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </span>
    </div>
  );
};

export default PasswordInput;
