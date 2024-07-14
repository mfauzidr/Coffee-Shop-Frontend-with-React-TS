import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ConfirmPasswordInput, EmailInput, FullNameInput, PasswordInput } from './InputForm';
import { LoginMethod, SubmitButton } from './Buttons';
import Brand from './Brand';

const RegisterForm: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const registerProcess = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const fullname = form.fullname.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (!fullname || !email || !password || !confirmPassword) {
      setErrorMessage('Please fill out the form correctly!');
      setIsError(true);
      setIsSuccess(false);
      return;
    }

    if (!email.includes('@')) {
      setErrorMessage('Please enter a valid email address!');
      setIsError(true);
      setIsSuccess(false);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match!');
      setIsError(true);
      setIsSuccess(false);
      return;
    }

    const formData = new URLSearchParams();
    formData.append('fullName', fullname);
    formData.append('email', email);
    formData.append('password', password);

    console.log('Form Data:', formData.toString())

    try {
      await axios.post('https://coffee-shop-backend-with-typescript.vercel.app/register', formData);

      setIsSuccess(true);
      setIsError(false);

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err: any) {
      setErrorMessage(err.response?.data?.message || 'Something went wrong');
      setIsError(true);
      setIsSuccess(false);
    }
  };

  return (
    <>
      <form onSubmit={registerProcess} id="form" className="flex flex-col w-full md:w-4/5 lg:w-3/5 gap-2 px-8 lg:px-0 h-screen justify-center">
        <Brand textColor="amber-800" />
        <div className="text-xl text-amber-800">Register</div>
        <div className="text-base">Fill out the form correctly!</div>
        <FullNameInput name="fullname" placeholder="Enter Your Full Name" />
        <EmailInput name="email" placeholder="Enter Your Email" />
        <PasswordInput label='Password' name="password" placeholder="Enter Your Password" showSetNew={false} />
        <ConfirmPasswordInput name="confirmPassword" placeholder="Confirm Your Password" />
        <div
          id="alert-success"
          className={`bg-green-300 border border-green-400 text-green-960 px-10 py-4 rounded text-bold ${isSuccess ? '' : 'hidden'}`}
        >
          Register Successfully
        </div>
        <div
          id="alert-error"
          className={`bg-red-300 border border-red-400 text-red-900 px-10 py-4 rounded text-bold ${isError ? '' : 'hidden'}`}
        >
          {errorMessage}
        </div>
        <div>
          <SubmitButton buttonName="Register" />
        </div>
      </form>
      <div className="flex flex-col w-full lg:w-3/5 mt-5 gap-2 px-4 lg:px-0">
        <div className="flex items-center justify-center">
          Have an account? <Link to="/login" className="text-amber-500">Login</Link>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex-grow border-t border-gray-300 mx-2"></div>
          <div className="divider">or</div>
          <div className="flex-grow border-t border-gray-300 mx-2"></div>
        </div>
        <LoginMethod />
      </div>
    </>
  );
}

export default RegisterForm;
