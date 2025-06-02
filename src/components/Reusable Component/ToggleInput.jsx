import React from 'react';

const ToggleInput = ({ id, name, checked, onChange, label }) => {
  return (
    <div className="flex items-center space-x-3">
      <label htmlFor={id || name} className="font-medium" style={{marginInlineEnd:'10px'}}>{label}</label>
      <div className="relative inline-block w-20   mr-2 align-middle select-none transition duration-200 ease-in">
        <input
          type="checkbox"
          name={name}
          id={id || name}
          checked={checked}
          onChange={onChange}
          className="toggle-checkbox   absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
        />
        <label
          htmlFor={id || name}
          className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default ToggleInput;
