// import React from 'react'
// import FeatherIcon from 'feather-icons-react'
import Brand from './Brand'
import { EmailInput } from './InputForm'
import { SubmitButton } from './Buttons'


function ForgotPasswordForm() {
  return (
    <form id="form" className="flex flex-col w-full md:w-3/5 gap-6 px-4 md:px-0" action="">
    <Brand textColor={'amber-800'} />
      <div className="text-2xl text-amber-800">Forgot Password</div>
      <div className="text-base">We will send new password to your email</div>
      <EmailInput />
      <SubmitButton buttonName='Submit' />
    </form>
  )
}

export default ForgotPasswordForm
