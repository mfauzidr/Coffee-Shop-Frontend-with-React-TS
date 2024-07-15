import { useState, FormEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Brand from './Brand';
import { EmailInput, PasswordInput } from './InputForm';
import { LoginMethod, SubmitButton } from './Buttons';
import { useNavigate } from "react-router-dom";

import { useStoreSelector, useStoreDispatch } from "../redux/hooks";
import { authAction } from "../redux/slices/auth";

function LoginForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const dispatch = useStoreDispatch();
  const { token, isLoading } = useStoreSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setIsSuccess(true)
      setTimeout(() => {
        navigate('/')
      }, 2000);
    }
  }, [token, navigate]);

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
      return;
    }

    try {
      const resultAction = await dispatch(authAction.loginThunk({ email, password }));
      console.log(resultAction);


    } catch (err) {
      setIsError(true);
      setIsSuccess(false);
    }
  };

  return (
    <form onSubmit={LoginProcess}
      id="form"
      className="flex flex-col w-full md:w-4/5 lg:w-3/5 gap-2 px-8 lg:px-0 h-screen justify-center"
      onClick={resetAlerts}
    >
      <Brand textColor="amber-800" />
      <div className="text-xl text-amber-800">Login</div>
      <div className="text-base">Fill out the form correctly</div>
      <EmailInput name="email" placeholder="Enter Your Email" />
      <PasswordInput label='Password' name="password" placeholder="Enter Your Password" showSetNew={false} />
      <div className="flex justify-between">
        <div>
          <span
            id="alert-success"
            className={`text-green-500 rounded text-bold ${isSuccess ? '' : 'hidden'}`}
          >
            Login Successfully
          </span>
          <span
            id="alert-error"
            className={`text-red-500 rounded text-bold ${isError ? '' : 'hidden'}`}
          >
            Wrong email or Password!
          </span>
        </div>
        <Link to="/forgot-password" className="text-amber-500 self-end">Lupa Password?</Link>
      </div>
      <SubmitButton buttonName={isLoading ? " loading..." : "LOGIN"} />
      <div className="flex items-center justify-center">
        Not have an account? <span><Link to="/register" className="text-amber-500">Register</Link></span>
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
