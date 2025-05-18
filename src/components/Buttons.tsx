import FeatherIcon from "feather-icons-react";
import { Link } from "react-router-dom";
import fb from "../src/assets/img/facebook-icon.webp";
import google from "../src/assets/img/google-icon.webp";

interface SubmitButtonProps {
  buttonName?: string;
  disabled?: boolean;
}

export const SubmitButton = ({
  buttonName = "Button Name",
  disabled,
}: SubmitButtonProps) => {
  return (
    <button
      className="border mt-4 w-full h-12 rounded-md bg-amber-500"
      type="submit"
      disabled={disabled}
    >
      {buttonName}
    </button>
  );
};

export const LoginMethod = () => {
  return (
    <div className="flex gap-x-3.5 items-center justify-center">
      <button
        className="flex-1 border shadow-md w-full h-16 rounded-xl flex items-center justify-center"
        type="button"
      >
        <img
          className="mr-2"
          src={fb}
          alt=""
          style={{ width: "24px", height: "24px" }}
        />
        <span className="hidden lg:flex"> Facebook </span>
      </button>
      <button
        className="flex-1 border shadow-md w-full h-16 rounded-xl flex items-center justify-center"
        type="button"
      >
        <img
          className="mr-2"
          src={google}
          alt=""
          style={{ width: "24px", height: "24px" }}
        />
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
      <input type="button" value={value} className={styling} />
    </Link>
  );
};

interface ProfileButtonProps {
  href: string;
}

export const ProfileButton = ({ href }: ProfileButtonProps) => {
  return (
    <Link
      to={href}
      className="border h-12 w-24 rounded-md text-white flex items-center justify-center bg-none hover:bg-slate-600"
      type="button"
    >
      Profile
    </Link>
  );
};

interface LogoutButtonProps {
  onClick: () => void;
}

export const LogoutButton = ({ onClick }: LogoutButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="h-12 w-24 rounded-md bg-amber-500 hover:bg-amber-900 text-white flex items-center justify-center"
      type="button"
    >
      Logout
    </button>
  );
};

interface CartButtonProps {
  padding?: string;
  border?: string;
  size?: string;
  isMobile?: boolean;
  onClick?: () => void;
}

export const CartButton = ({
  padding,
  border,
  size,
  onClick,
}: CartButtonProps) => {
  return (
    <button className={`${padding} ${border} ${size}`} onClick={onClick}>
      <FeatherIcon
        icon="shopping-cart"
        className="text-amber-500 w-5 lg:w-6 h-5 lg:h-6"
      />
    </button>
  );
};

interface BuyButtonProps {
  size?: string;
  onClick?: () => void;
}

export const BuyButton = ({ size, onClick }: BuyButtonProps) => {
  return (
    <button
      type="button"
      className={`flex-1 ${size} py-1 lg:py-2 border border-amber-500 bg-amber-500 rounded font-semibold text-black text-center text-xs md:text-base`}
      onClick={onClick}
    >
      Buy
    </button>
  );
};

interface ButtonProps {
  type: "button" | "submit" | "reset";
  buttonName: string;
  size?: string;
  link?: string;
  onClick?: () => void;
}

export const Button = ({
  type,
  buttonName,
  size,
  link = "#",
  onClick,
}: ButtonProps & { onClick?: () => void }) => {
  return (
    <Link
      to={link}
      onClick={() => {
        onClick?.();
      }}
      className={`flex-1 ${size} py-1 lg:py-2 border border-amber-500 bg-amber-500 rounded font-semibold text-black text-center text-xs md:text-base`}
    >
      <button type={type}>{buttonName}</button>
    </Link>
  );
};

export const ApplyButton = ({
  buttonName,
  type,
  size,
  onClick,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`flex-1 ${size} py-1 lg:py-2 border border-amber-500 bg-amber-500 rounded font-semibold text-black text-center`}
    >
      {buttonName}
    </button>
  );
};
