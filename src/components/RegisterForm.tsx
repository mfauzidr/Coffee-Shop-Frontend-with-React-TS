import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ConfirmPasswordInput, EmailInput, FullNameInput, PasswordInput } from './InputForm';
import { LoginMethod, SubmitButton } from './Buttons';
import Brand from './Brand';

interface RegisterElements {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function RegisterForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [form, setForm] = useState<RegisterElements>({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const registerProcess = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { fullname, email, password, confirmPassword } = form;

    if (!fullname || !email || !password || !confirmPassword) {
      setIsError(true);
      setIsSuccess(false);
      return;
    }

    if (!email.includes('@')) {
      setIsError(true);
      setIsSuccess(false);
      return;
    }

    if (password !== confirmPassword) {
      setIsError(true);
      setIsSuccess(false);
      return;
    }

    const formData = new URLSearchParams();
    formData.append('fullname', fullname);
    formData.append('email', email);
    formData.append('password', password);

    try {
      const { data } = await axios.post('http://localhost:8888/auth/register', formData);
      setIsSuccess(true);
      setIsError(false);

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      console.log(err);
      setIsError(true);
      setIsSuccess(false);
    }
  };

  return (
    <>
      <form onSubmit={registerProcess} id="form" className="flex flex-col w-full md:w-3/5 gap-6 px-4 md:px-0">
        <Brand textColor={'amber-800'} />
        <div className="text-2xl text-amber-800">Register</div>
        <div className="text-base">Fill out the form correctly!</div>
        <FullNameInput name="fullname" value={form.fullname} onChange={onChangeHandler} placeholder="Enter Your Full Name" />
        <EmailInput name="email" value={form.email} onChange={onChangeHandler} placeholder="Enter Your Email" />
        <PasswordInput name="password" value={form.password} onChange={onChangeHandler} placeholder="Enter Your Password" showSetNew={false} />
        <ConfirmPasswordInput name="confirmPassword" value={form.confirmPassword} onChange={onChangeHandler} placeholder="Confirm Your Password" />
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
          Please fill out the form correctly!
        </div>
        <div>
          <SubmitButton buttonName="Register" />
        </div>
      </form>
      <div className="flex flex-col w-full md:w-3/5 mt-6 gap-6 px-4 md:px-0">
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
