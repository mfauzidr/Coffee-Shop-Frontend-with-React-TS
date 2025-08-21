import { useState } from "react";
import FeatherIcon from "feather-icons-react";

interface InputProps {
  label?: string;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  showChangeEmail?: boolean;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
}

export const FullNameInput = ({
  name,
  value,
  disabled = false,
  onChange,
}: InputProps) => {
  return (
    <div className="relative">
      <label className="block font-semibold" htmlFor={name}>
        Full Name
        <i className="absolute inset-y-0 left-0 flex items-center pl-3 pt-6">
          <FeatherIcon icon="user" className="h-5 w-5 text-gray-500" />
        </i>
      </label>
      {disabled ? (
        <div className="border rounded-lg border-gray-200 w-full h-11 pl-10 flex items-center">
          {value}
        </div>
      ) : (
        <input
          className="border rounded-lg w-full h-11 pl-10 outline-none"
          id={name}
          name={name}
          type="text"
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export const EmailInput = ({
  value,
  name,
  showChangeEmail = false,
  disabled = false,
  onChange,
  onClick,
}: InputProps) => {
  return (
    <div className="relative">
      <label className="block font-semibold" htmlFor={name}>
        Email
        {showChangeEmail && (
          <span className="absolute right-0 top-0 flex items-center pr-3 text-amber-500 self-items-end">
            <button type="button" onClick={onClick}>
              Change
            </button>
          </span>
        )}
        <i className="absolute inset-y-0 left-0 flex items-center pl-3 pt-6">
          <FeatherIcon icon="mail" className="h-5 w-5 text-gray-500" />
        </i>
      </label>
      {disabled ? (
        value && (
          <div className="border rounded-lg border-gray-200 w-full h-11 pl-10 flex items-center">
            {value}
          </div>
        )
      ) : (
        <input
          className="border rounded-lg w-full h-11 pl-10 outline-none"
          id={name}
          value={value}
          name={name}
          type="email"
          onChange={onChange}
          placeholder="Enter Your Email"
        />
      )}
    </div>
  );
};

export const PasswordInput = ({
  value,
  label,
  name,
  placeholder = "Enter Your Password",
}: InputProps & { showSetNew?: boolean }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <label className="block font-semibold" htmlFor={name}>
        {label}
        <i className="absolute left-0 top-0 flex items-center pl-3 pt-9">
          <FeatherIcon icon="lock" className="h-5 w-5 text-gray-500" />
        </i>
      </label>
      <div className="flex border rounded-lg w-full h-11 pl-10 pr-3 items-center">
        <input
          className="w-full outline-none"
          id={name}
          name={name}
          type={showPassword ? "text" : "password"}
          value={value}
          placeholder={placeholder}
        />
        <button
          onClick={togglePassword}
          id="reveal-password"
          className="justify-self-end"
          type="button"
        >
          <i>
            <FeatherIcon
              icon={`${showPassword ? "eye" : "eye-off"}`}
              className="text-gray-500 h-5 w-5"
            />
          </i>
        </button>
      </div>
    </div>
  );
};

export const ConfirmPasswordInput = ({
  value,
  name,
  placeholder = "Enter Your Password Again",
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <label className="block font-semibold" htmlFor={name}>
        Confirm Password
        <i className="absolute inset-y-0 left-0 flex items-center pl-3 pt-6">
          <FeatherIcon icon="lock" className="h-5 w-5 text-gray-500" />
        </i>
      </label>
      <div className="flex border rounded-lg w-full h-11 pl-10 pr-3 items-center">
        <input
          className="w-full outline-none"
          id={name}
          name={name}
          type={showPassword ? "text" : "password"}
          value={value}
          placeholder={placeholder}
        />
        <button
          onClick={togglePassword}
          id="reveal-confirm-password"
          className="justify-self-end"
          type="button"
        >
          <i>
            <FeatherIcon
              icon={`${showPassword ? "eye" : "eye-off"}`}
              className="text-gray-500 h-5 w-5"
            />
          </i>
        </button>
      </div>
    </div>
  );
};

export const AddressInput = ({
  name,
  value,
  disabled = false,
  onChange,
}: InputProps) => {
  return (
    <div className="relative">
      <label className="block font-semibold" htmlFor="address">
        Address
        <i className="absolute inset-y-0 left-0 flex items-center pl-3 pt-6">
          <FeatherIcon icon="map-pin" className="h-5 w-5 text-gray-500" />
        </i>
      </label>
      {disabled ? (
        value ? (
          <div className="border rounded-lg border-gray-200 w-full h-11 pl-10 flex items-center">
            {value}
          </div>
        ) : (
          <div className="border rounded-lg border-gray-200 w-full h-11 pl-10 flex items-center text-gray-400">
            Enter Your Address
          </div>
        )
      ) : (
        <input
          className="border rounded-lg w-full h-11 pl-10 outline-none"
          id="address"
          name={name}
          type="text"
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export const PhoneInput = ({
  name,
  value,
  disabled = false,
  onChange,
}: InputProps) => {
  return (
    <div className="relative">
      <label className="block font-semibold" htmlFor="phone">
        Phone
        <i className="absolute inset-y-0 left-0 flex items-center pl-3 pt-6">
          <FeatherIcon icon="phone" className="h-5 w-5 text-gray-500" />
        </i>
      </label>
      {disabled ? (
        value ? (
          <div className="border rounded-lg border-gray-200 w-full h-11 pl-10 flex items-center">
            {value}
          </div>
        ) : (
          <div className="border rounded-lg border-gray-200 w-full h-11 pl-10 flex items-center text-gray-400">
            Enter Your Phone Number
          </div>
        )
      ) : (
        <input
          className="border rounded-lg w-full h-11 pl-10 outline-none"
          id="phone"
          name={name}
          type="tel"
          pattern="[0-9]{1,13}"
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
};
