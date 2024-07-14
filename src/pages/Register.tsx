// import React from 'react'
import RegisterForm from '../components/RegisterForm'

const Register = () => {
    return (
        <>
            <div className='flex h-screen'>
                <div className="w-96 h-screen bg-[url(../assets/img/bg-register.png)] bg-cover bg-no-repeat bg-center hidden lg:block"></div>
                <div className="flex flex-1 flex-col my-8 items-center justify-center">
                    <RegisterForm />
                </div>
            </div>
        </>

    )

}


export default Register