import React from "react";
import {
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";

const COUNTRIES = ["EGYPT (+20)", "SAUDI ARABIA (+966)", "UAE (+971)"];
const CODES = ["+20", "+966", "+971"];

export function InputPhoneCountryCode({ value, onChange }) {
  const [countryIndex, setCountryIndex] = React.useState(0);
  const [number, setNumber] = React.useState("");

  React.useEffect(() => {
    if (onChange) {
      const fullPhone = `${CODES[countryIndex]}${number}`;
      onChange(fullPhone);
    }
  }, [countryIndex, number]);

  return (
    <div className="w-full max-w-[24rem] PhoneInput shadow-input">
      <div className="relative flex w-full">
        <Menu placement="bottom-start">
          <MenuHandler>
            <Button
              ripple={false}
              variant="text"
              color="blue-gray"
              className="h-10 w-14 shrink-0 rounded-r-none border border-r-0 border-blue-gray-200 bg-transparent px-3"
            >
              {CODES[countryIndex]}
            </Button>
          </MenuHandler>
          <MenuList className="max-h-[20rem] max-w-[18rem]">
            {COUNTRIES.map((country, index) => (
              <MenuItem key={country} onClick={() => setCountryIndex(index)}>
                {country}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        <Input
          type="tel"
          pattern="[0-9]*"
          inputMode="numeric"
          maxLength={12}
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="324-456-2323"
          className="appearance-none rounded-l-none !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          containerProps={{
            className: "min-w-0",
          }}
        />
      </div>
    </div>
  );
}

export default InputPhoneCountryCode;
