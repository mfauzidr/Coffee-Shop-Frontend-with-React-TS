// import React from 'react'
import LoginForm from '../components/LoginForm'

const Login = () => {
    return(
        <>
        <div className='flex'>
            <div className="w-96 h-auto bg-[url(../src/assets/img/bg-login.png)] bg-cover bg-no-repeat bg-center hidden md:block"></div>
            <div className="flex flex-1 flex-col my-10 items-center justify-center">
                <LoginForm />
            </div>
        </div>
        </>
    )
}

export default Login