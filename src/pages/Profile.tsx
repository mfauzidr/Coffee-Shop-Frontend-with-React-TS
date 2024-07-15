import React, { useEffect, useState } from 'react';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProfileCard from "../components/ProfileCard";
import { AddressInput, EmailInput, FullNameInput, PhoneInput, PasswordInput, ConfirmPasswordInput } from "../components/InputForm";
import { Button } from "../components/Buttons";
import { useStoreDispatch, useStoreSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import { profileThunk } from '../redux/slices/profile';
import { jwtDecode } from 'jwt-decode';

interface DataProps {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  image: string;
}

const Profile: React.FC = () => {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const dispatch = useStoreDispatch();

  const { token } = useStoreSelector((state: RootState) => state.auth);

  const [profileData, setProfileData] = useState<DataProps>({
    fullName: 'Enter Your Fullname Here',
    email: 'Enter Your Email Here',
    phone: 'Enter Your Phone Number Here',
    address: 'Enter Your Address Here',
    image: '',
  });

  const [uuid, setUuid] = useState<string>('');
  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token) as { uuid: string };
      setUuid(decodedToken.uuid); // Store uuid in state
    }
  }, [token]);

  useEffect(() => {
    if (uuid) {
      dispatch(profileThunk(uuid))
        .unwrap()
        .then((result) => {
          if (result.results) {
            const profileResult = result.results[0];
            console.log(profileResult);
            setProfileData({
              fullName: profileResult.fullName || '',
              email: profileResult.email || '',
              phone: profileResult.phone || 'Enter Your Phone Number Here',
              address: profileResult.address || 'Enter Your ',
              image: profileResult.image || '',
            });
          } else {
            console.error("No profile data found.");
          }
        })
    }
  }, [dispatch, uuid]);

  const { fullName, email, image } = profileData;

  // Handle form submission to update profile
  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   // Assuming profileData contains updated values
  //   const { fullName, email, phone, address } = profileData;
  //   const formData = { fullName, email, phone, address };
  //   // Dispatch update profile action
  //   dispatch(updateProfileData({ ...formData, uuid }));
  // };

  const togglePasswordForm = () => {
    setShowPasswordForm(!showPasswordForm);
  };

  return (
    <>
      <Navbar bgColor={'bg-black'} position='static' />

      <div className="flex flex-col mx-16 lg:mx-32 my-8 lg:my-16 h-auto gap-4">
        <div className="flex flex-col w-full gap-2.5">
          <h1 className="text-3xl lg:text-5xl font-medium">Profile</h1>
        </div>
        <div className="flex flex-col md:flex-row gap-6 mt-6 lg:mt-12">
          <ProfileCard name={fullName} email={email} profileImage={image} joinDate='20 January 2022' />
          <form id="form" className="flex flex-1 flex-col border rounded gap-4 py-4 md:py-6 px-3 md:px-12">
            <FullNameInput name='fullname' placeholder={profileData.fullName} />
            <EmailInput name='email' disabled={true} placeholder={profileData.email} showChangeEmail={true} />
            <PhoneInput name='phone' placeholder={profileData.phone} />
            <AddressInput name='address' placeholder={profileData.address} />
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
  );
}

export default Profile;
