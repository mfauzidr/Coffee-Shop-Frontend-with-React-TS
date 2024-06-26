// import React from 'react'
import ForgotPasswordForm from '../components/ForgotPasswordForm'

const ForgotPassword = () => {
    return (
        <>
            <div className='flex'>
                <div className="w-96 bg-[url(../assets/img/bg-forgot-pass.png)] h-screen bg-cover bg-no-repeat bg-left hidden md:block"></div>
                <div className="flex flex-1 flex-col my-10 items-center justify-center">
                    <ForgotPasswordForm />
                </div>
            </div>
        </>
    )
}

export default ForgotPassword