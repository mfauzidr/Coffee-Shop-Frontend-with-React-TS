import { useState } from 'react';
import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom';

interface InputProps {
  name: string;
  placeholder?: string;
}

export const FullNameInput = ({ name, placeholder = 'Enter Your Full Name' }: InputProps) => {
  return (
    <div className="relative">
      <label className="block font-semibold" htmlFor={name}>
        Full Name
        <i className="absolute inset-y-0 left-0 flex items-center pl-3 pt-6">
          <FeatherIcon icon="user" className="h-5 w-5 text-gray-500" />
        </i>
      </label>
      <input
        className="border rounded-lg w-full h-11 pl-10 outline-none"
        id={name}
        name={name}
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
};

export const EmailInput = ({ name, placeholder = 'Enter Your Email' }: InputProps) => {
  return (
    <div className="relative">
      <label className="block font-semibold" htmlFor={name}>
        Email
        <i className="absolute inset-y-0 left-0 flex items-center pl-3 pt-6">
          <FeatherIcon icon="mail" className="h-5 w-5 text-gray-500" />
        </i>
      </label>
      <input
        className="border rounded-lg w-full h-11 pl-10 outline-none"
        id={name}
        name={name}
        type="email"
        placeholder={placeholder}
      />
    </div>
  );
};

export const PasswordInput = ({ name, placeholder = 'Enter Your Password', showSetNew = true }: InputProps & { showSetNew?: boolean }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <label className="block font-semibold" htmlFor={name}>
        Password
        {showSetNew && (
          <span className="absolute right-0 top-0 flex items-center pr-3 text-amber-500 self-items-end">
            <Link to="#">Set New Password</Link>
          </span>
        )}
        <i className="absolute inset-y-0 left-0 flex items-center pl-3 pt-6">
          <FeatherIcon icon="lock" className="h-5 w-5 text-gray-500" />
        </i>
      </label>
      <div className="flex border rounded-lg w-full h-11 pl-10 pr-3 items-center">
        <input
          className="w-full outline-none"
          id={name}
          name={name}
          type={showPassword ? 'text' : 'password'}

          placeholder={placeholder}
        />
        <button onClick={togglePassword} id="reveal-password" className="justify-self-end" type="button">
          <i>
            <FeatherIcon icon="eye-off" className="text-gray-500 h-5 w-5" />
          </i>
        </button>
      </div>
    </div>
  );
};

export const ConfirmPasswordInput = ({ name, placeholder = 'Enter Your Password Again' }: InputProps) => {
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
          type={showPassword ? 'text' : 'password'}

          placeholder={placeholder}
        />
        <button onClick={togglePassword} id="reveal-confirm-password" className="justify-self-end" type="button">
          <i>
            <FeatherIcon icon="eye-off" className="text-gray-500 h-5 w-5" />
          </i>
        </button>
      </div>
    </div>
  );
};
