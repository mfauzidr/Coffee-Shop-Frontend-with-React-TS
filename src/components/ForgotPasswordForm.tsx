
import Brand from './Brand'
import { EmailInput } from './InputForm'
import { SubmitButton } from './Buttons'


function ForgotPasswordForm() {
  return (
    <form id="form" className="flex flex-col w-full md:w-4/5 lg:w-3/5 gap-2 px-8 lg:px-0 justify-center" action="">
      <Brand textColor={'amber-800'} />
      <div className="text-2xl text-amber-800">Forgot Password</div>
      <div className="text-base">We will send new password to your email</div>
      <EmailInput name="email" placeholder="Enter Your Email" />
      <SubmitButton buttonName='Submit' />
    </form>
  )
}

export default ForgotPasswordForm
