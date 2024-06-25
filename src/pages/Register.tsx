// import React from 'react'
import RegisterForm from '../components/RegisterForm'

const Register = () => {
    return(
        <>
        <div className='flex'>
            <div className="w-96 h-auto bg-[url(../src/assets/img/bg-register.png)] bg-cover bg-no-repeat bg-center hidden md:block"></div>
            <div className="flex flex-1 flex-col my-10 items-center justify-center">
                <RegisterForm />
            </div>
        </div>
        </>

    )

}

export default Register