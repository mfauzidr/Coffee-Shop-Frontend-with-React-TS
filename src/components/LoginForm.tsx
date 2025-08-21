import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Brand from "./Brand";
import { EmailInput, PasswordInput } from "./InputForm";
import { LoginMethod, SubmitButton } from "./Buttons";
import { jwtDecode } from "jwt-decode";

import { useStoreSelector, useStoreDispatch } from "../redux/hooks";
import { authAction } from "../redux/slices/auth";
import { fetchProfile } from "../redux/slices/profile";
interface DecodedToken {
  role: string;
  uuid: string;
}

function LoginForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useStoreDispatch();
  const { isLoading } = useStoreSelector((state) => state.auth);
  const navigate = useNavigate();

  const resetAlerts = () => {
    setIsSuccess(false);
    setIsError(false);
  };

  const LoginProcess = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;

    if (!email || !password) {
      setIsError(true);
      setIsSuccess(false);
      setErrorMessage("Please fill out the form correctly!");
      return;
    }

    try {
      const token = await dispatch(
        authAction.loginThunk({ email, password })
      ).unwrap();

      const decoded: DecodedToken = jwtDecode(token);

      await dispatch(fetchProfile({ uuid: decoded.uuid })).unwrap();

      setIsSuccess(true);

      setTimeout(() => {
        if (decoded.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      }, 2000);
    } catch (err) {
      console.error("Login error:", err);
      setIsError(true);
      setErrorMessage("Login failed! Wrong Email or Password");
      setIsSuccess(false);
    }
  };

  return (
    <form
      onSubmit={LoginProcess}
      id="form"
      className="flex flex-col w-full md:w-4/5 lg:w-3/5 gap-2 px-8 lg:px-0 h-screen justify-center"
      onClick={resetAlerts}
    >
      <Brand textColor="amber-800" />
      <div className="text-xl text-amber-800">Login</div>
      <div className="text-base">Fill out the form correctly</div>

      <EmailInput
        name="email"
        placeholder="Enter Your Email"
        disabled={false}
      />
      <PasswordInput
        label="Password"
        name="password"
        placeholder="Enter Your Password"
        showSetNew={false}
      />

      <div className="flex justify-between">
        <div>
          <span
            className={`text-green-500 font-semibold ${
              isSuccess ? "" : "hidden"
            }`}
          >
            Login Successfully
          </span>
          <span
            className={`text-red-500 font-semibold ${isError ? "" : "hidden"}`}
          >
            {errorMessage}
          </span>
        </div>
        <Link to="/forgot-password" className="text-amber-500 self-end">
          Lupa Password?
        </Link>
      </div>

      <SubmitButton buttonName={isLoading ? "loading..." : "LOGIN"} />

      <div className="flex items-center justify-center">
        Not have an account?{" "}
        <Link to="/register" className="text-amber-500 ml-1">
          Register
        </Link>
      </div>
      <div className="flex items-center justify-center">
        <div className="flex-grow border-t border-gray-300 mx-2"></div>
        <div className="text-gray-300 px-2">or</div>
        <div className="flex-grow border-t border-gray-300 mx-2"></div>
      </div>
      <LoginMethod />
    </form>
  );
}

export default LoginForm;
