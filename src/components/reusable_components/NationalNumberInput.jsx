import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const NationalNumberInput = ({
  label,
  id,
  name = 'national_number',
  value,
  onChange,
  placeholder = '1234567890',
  className = '',
  required = true,
}) => {
  const { t } = useTranslation();
  const [error, setError] = useState('');
  const isControlled = value !== undefined;

  const handleChange = (e) => {
    const input = e.target.value;

    // Allow only digits
    if (!/^\d*$/.test(input)) return;

    // Limit to 10 digits
    if (input.length > 10) return;

    onChange?.(e); // Pass event to parent

    // Validation
    if (input.length === 10) {
      if (!/^[1-2]\d{9}$/.test(input)) {
        setError(t('should start with 1 or 2 and be 10 digits'));
      } else {
        setError('');
      }
    } else {
      setError(t('should be 10 digits'));
    }
  };

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
        type="text"
        id={id || name}
        name={name}
        maxLength={10}
        placeholder={placeholder}
        required={required}
        {...(isControlled
          ? {
              value,
              onChange: handleChange,
            }
          : {})}
        {...(!isControlled ? { defaultValue: placeholder } : {})}
        className={`shadow-input w-full border bg-transparent placeholder:text-[#13131340] 
        text-[#0C0A34] border-gray-300 rounded-md py-2.5 px-3 focus:outline-none focus:ring-0 ${className}`}
      />

      {error && (
        <p className="text-sm text-red-500 mt-1" style={{fontSize:"10px"}}>{error}</p>
      )}
    </div>
  );
};

export default NationalNumberInput;
