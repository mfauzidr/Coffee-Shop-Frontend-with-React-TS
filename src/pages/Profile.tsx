import React, { useState } from 'react';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProfileImg from "../assets/img/profile.png";
import ProfileCard from "../components/ProfileCard";
import { AddressInput, EmailInput, FullNameInput, PhoneInput, PasswordInput, ConfirmPasswordInput } from "../components/InputForm";
import { Button } from "../components/Buttons";

interface UserDataProps {
    name: string;
    email: string;
    profileImage: string;
    joinDate: string;
}

interface DataProps {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    password: string;
}

const Profile: React.FC = () => {
    const [showPasswordForm, setShowPasswordForm] = useState(false);

    const userData: UserDataProps = {
        name: 'Ghaluh Wizard',
        email: 'ghaluhwizz@gmail.com',
        profileImage: ProfileImg,
        joinDate: '20 January 2022',
    }

    const data: DataProps = {
        fullName: userData.name,
        email: userData.email,
        phone: '082116304338',
        address: 'Griya Bandung Indah',
        password: ''
    }

    const togglePasswordForm = () => {
        setShowPasswordForm(!showPasswordForm);
    }

    return (
        <>
            <Navbar bgColor={'bg-black'} position='static' />

            <div className="flex flex-col mx-16 lg:mx-32 my-8 lg:my-16 h-auto gap-4">
                <div className="flex flex-col w-full gap-2.5">
                    <h1 className="text-3xl lg:text-5xl font-medium">Profile</h1>
                </div>
                <div className="flex flex-col md:flex-row gap-6 mt-6 lg:mt-12">
                    <ProfileCard {...userData} />
                    <form id="form" className="flex flex-1 flex-col border rounded gap-4 py-4 md:py-6 px-3 md:px-12" action="">
                        <FullNameInput name='fullname' placeholder={data.fullName} />
                        <EmailInput name='email' disabled={true} placeholder={data.email} showChangeEmail={true} />
                        <PhoneInput name='phone' placeholder={data.phone} />
                        <AddressInput name='address' placeholder={data.address} />
                        <div className={`transition-all duration-500 ease-in-out ${showPasswordForm ? 'max-h-screen opacity-100' : 'max-h-0 overflow-hidden opacity-0'}`}>
                            {showPasswordForm && (
                                <>
                                    <PasswordInput label='Old Password' name='oldPassword' placeholder='Enter Old Password' />
                                    <PasswordInput label='New Password' name='newPassword' placeholder='Enter New Password' />
                                    <ConfirmPasswordInput name='confirmPass' placeholder='Confirm New Password' />
                                </>
                            )}
                        </div>
                        <div className="flex items-center justify-end pr-3 text-amber-500 cursor-pointer" onClick={togglePasswordForm}>
                            {showPasswordForm ? 'Cancel' : 'Set New Password'}
                        </div>
                        <Button buttonName={'Submit'} type={'submit'} />
                    </form>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Profile;
