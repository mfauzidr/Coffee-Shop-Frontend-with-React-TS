import React from 'react';
import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom';

interface SubmitButtonProps {
  buttonName?: string;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ buttonName = 'Button Name' }) => {
  return (
    <button className="border mt-4 w-full h-12 rounded-md bg-amber-500" type="submit">
      {buttonName}
    </button>
  );
};

export const LoginMethod: React.FC = () => {
  return (
    <div className="flex gap-x-3.5 items-center justify-center">
      <button className="flex-1 border shadow-md w-full h-16 rounded-xl flex items-center justify-center" type="button">
        <img className="mr-2" src="../src/assets/img/facebook-icon.png" alt="" style={{ width: '24px', height: '24px' }} />
        <span className="hidden md:flex"> Facebook </span>
      </button>
      <button className="flex-1 border shadow-md w-full h-16 rounded-xl flex items-center justify-center" type="button">
        <img className="mr-2" src="../src/assets/img/google-icon.png" alt="" style={{ width: '24px', height: '24px' }} />
        <span className="hidden md:flex"> Google </span>
      </button>
    </div>
  );
};

interface SignButtonProps {
  value: string;
  href: string;
  styling: string;
}

export const SignButton: React.FC<SignButtonProps> = ({ value, href, styling }) => {
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

interface CartButtonProps {
  padding: string;
  border: string;
  size: string;
}

export const CartButton: React.FC<CartButtonProps> = ({ padding, border, size }) => {
  return (
    <button className={`${padding} ${border} ${size}`} onClick={() => (window.location.href = "/checkout-product")}>
      <FeatherIcon icon="shopping-cart" className="text-amber-500" />
    </button>
  );
};

interface ButtonProps {
  type: 'button' | 'submit' | 'reset';
  buttonName: string;
  size: string;
  link?: string;
}

export const Button: React.FC<ButtonProps> = ({ type, buttonName, size, link = '#' }) => {
  return (
    <Link to={link} className={`flex-1 ${size} py-2 border border-amber-500 bg-amber-500 rounded font-semibold text-black text-center`}>
      <button type={type}>
        {buttonName}
      </button>
    </Link>
  );
};
