import {useState} from 'react'
import { Link } from 'react-router-dom'
import Brand from './Brand'
import { EmailInput, PasswordInput } from './InputForm'
import { LoginMethod, SubmitButton } from './Buttons'
import axios from 'axios'


function LoginForm() {
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)

  const loginProcess = async (e) => {
    e.preventDefault()
    const {value:email} = e.target.email
    const {value:password} = e.target.password
    const form = new URLSearchParams()
    form.append('email', email)
    form.append('password', password)
    try{
      const {data} = await axios.post('http://localhost:8888/auth/login', form.toString())
      setIsSuccess(true)
      setIsError(false)
      console.log(data)

      setTimeout(() => {
        window.location.href = '/'
      }, 2000)
    }catch(err){
      setIsError(true)
      setIsSuccess(false)
    }
  }

  return (
    <form onSubmit={loginProcess} id="form" className="flex flex-col w-full md:w-3/5 gap-6 px-4 md:px-0" action="">
      <Brand textColor={'amber-800'}/>
      <div className="text-2xl text-amber-800">Login</div>
      <div className="text-base">Fill out the form correctly</div>
      <EmailInput />
      <PasswordInput showSetNew={false} />
      <div className="text-right">
        <Link to='/forgot-password' className="text-amber-500">Lupa Password?</Link>
      </div>
      <div
          id="alert-success"
          className={`bg-green-300 border border-green-400 text-green-960 px-10 py-4 rounded text-bold ${isSuccess ? '' : 'hidden'}`}
        >
          Login Successfully
        </div>
        <div
          id="alert-error"
          className={`bg-red-300 border border-red-400 text-red-900 px-10 py-4 rounded text-bold ${isError ? '' : 'hidden'}`}
        >
          Wrong email or Password!
        </div>
      <SubmitButton buttonName='Login' />
      <div className="flex items-center justify-center">
        Not have an account?<span><Link to='/register' className="text-amber-500">Register</Link></span>
      </div>
      <div className="flex items-center justify-center">
        <div className="flex-grow border-t border-gray-300 mx-2"></div>
        <div className="text-gray-300 px-2">or</div>
        <div className="flex-grow border-t border-gray-300 mx-2"></div>
      </div>
      <LoginMethod/>
    </form>
  )
}

export default LoginForm
