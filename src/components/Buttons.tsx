import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom';

interface SubmitButtonProps {
  buttonName?: string;
  disabled?: boolean
}

export const SubmitButton = ({ buttonName = 'Button Name', disabled }: SubmitButtonProps) => {
  return (
    <button className="border mt-4 w-full h-12 rounded-md bg-amber-500" type="submit" disabled={disabled}>
      {buttonName}
    </button>
  );
};

export const LoginMethod = () => {
  return (
    <div className="flex gap-x-3.5 items-center justify-center">
      <button className="flex-1 border shadow-md w-full h-16 rounded-xl flex items-center justify-center" type="button">
        <img className="mr-2" src="../src/assets/img/facebook-icon.png" alt="" style={{ width: '24px', height: '24px' }} />
        <span className="hidden lg:flex"> Facebook </span>
      </button>
      <button className="flex-1 border shadow-md w-full h-16 rounded-xl flex items-center justify-center" type="button">
        <img className="mr-2" src="../src/assets/img/google-icon.png" alt="" style={{ width: '24px', height: '24px' }} />
        <span className="hidden lg:flex"> Google </span>
      </button>
    </div>
  );
};

interface SignButtonProps {
  value: string;
  href: string;
  styling: string;
}

export const SignButton = ({ value, href, styling }: SignButtonProps) => {
  return (
    <Link to={href}>
      <input
        type="button"
        value={value}
        className={styling}
      />
    </Link>
  );
};

interface ProfileButtonProps {
  href: string;
}

export const ProfileButton = ({ href }: ProfileButtonProps) => {
  return (
    <Link to={href} className="border h-12 w-24 rounded-md text-white flex items-center justify-center bg-none hover:bg-slate-600" type="button">
      Profile
    </Link>
  );
};

interface LogoutButtonProps {
  onClick: () => void;
}

export const LogoutButton = ({ onClick }: LogoutButtonProps) => {
  return (
    <button onClick={onClick} className="h-12 w-24 rounded-md bg-amber-500 hover:bg-amber-900 text-white flex items-center justify-center" type="button">
      Logout
    </button>
  );
};

interface CartButtonProps {
  padding?: string;
  border?: string;
  size?: string;
}

export const CartButton = ({ padding, border, size }: CartButtonProps) => {
  return (
    <button className={`${padding} ${border} ${size}`} onClick={() => (window.location.href = "/checkout-product")}>
      <FeatherIcon icon="shopping-cart" className="text-amber-500 w-5 lg:w-6 h-5 lg:h-6" />
    </button>
  );
};

interface ButtonProps {
  type: 'button' | 'submit' | 'reset';
  buttonName: string;
  size?: string;
  link?: string;
  onClick?: () => void
}

export const Button = ({ type, buttonName, size, link = '#' }: ButtonProps) => {
  return (
    <Link to={link} className={`flex-1 ${size} py-1 lg:py-2 border border-amber-500 bg-amber-500 rounded font-semibold text-black text-center text-xs md:text-base`}>
      <button type={type}>
        {buttonName}
      </button>
    </Link>
  );
};

interface FileUploadButtonProps {
  buttonName: string;
  onFileChange: (file: File | null) => void;
  size?: string;
}import React from 'react';

interface FileUploadButtonProps {
  buttonName: string;
  onFileChange: (file: File | null) => void;
  size?: string;
}

export const FileUploadButton = ({ buttonName, onFileChange, size = 'px-8 text-sm' }: FileUploadButtonProps) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onFileChange(file);
  };

  return (
    <div className="relative">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        id="file-upload-input"
      />
      <label htmlFor="file-upload-input">
        <button
          type="button"
          className={`flex-1 ${size} py-1 lg:py-2 border border-amber-500 bg-amber-500 rounded font-semibold text-black text-center text-xs md:text-base`}
        >
          {buttonName}
        </button>
      </label>
    </div>
  );
};
