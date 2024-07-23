import React, { useEffect, useState } from 'react';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProfileCard from "../components/ProfileCard";
import { AddressInput, EmailInput, FullNameInput, PhoneInput, PasswordInput, ConfirmPasswordInput } from "../components/InputForm";
import { SubmitButton } from "../components/Buttons";
import { useStoreSelector, useStoreDispatch } from '../redux/hooks';
import { RootState } from '../redux/store';
import axios from 'axios';
import { updateProfileData } from '../redux/slices/profile';
import { jwtDecode } from 'jwt-decode';

interface DataProps {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  image: string;
}

const Profile = () => {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [profileData, setProfileData] = useState<DataProps>({
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
    image: '',
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useStoreDispatch();
  const { token } = useStoreSelector((state: RootState) => state.auth);
  const [uuid, setUuid] = useState<string>('');

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode<{ uuid: string }>(token);
      setUuid(decodedToken.uuid);
    }
  }, [token]);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!uuid || !token) return;

      try {
        const url = `https://coffee-shop-backend-with-typescript.vercel.app/users/${uuid}`;
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (res.data && res.data.results && res.data.results.length > 0) {
          const profileResult = res.data.results[0];
          console.log(profileResult);
          setProfileData({
            fullName: profileResult.fullName || '',
            email: profileResult.email || '',
            phoneNumber: profileResult.phone || '',
            address: profileResult.address || '',
            image: profileResult.image || '',
          });
        } else {
          console.error("Invalid API response structure:", res.data);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    }

    fetchProfileData();
  }, [uuid, token]);

  const handleImageChange = (file: File | null) => {
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData((prevData) => ({
          ...prevData,
          image: reader.result as string
        }));
      };
      reader.readAsDataURL(file); // Read the file as a Data URL for preview
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;


    if (!uuid) {
      console.error("UUID is not defined");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('fullName', profileData.fullName);
      formData.append('email', profileData.email);
      formData.append('phoneNumber', profileData.phoneNumber);
      formData.append('address', profileData.address);

      if (selectedImage) {
        formData.append('image', selectedImage); // Send the image as a File object
      }

      // Add new password to FormData if applicable
      if (showPasswordForm && password) {
        if (password !== confirmPassword) {
          setErrorMessage('Passwords do not match!');
          setIsError(true);
          return;
        }
      }

      const response = await axios.patch(`https://coffee-shop-backend-with-typescript.vercel.app/users/${uuid}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        // Extract the image URL from the backend response
        const imageUrl = response.data.results[0]?.image;

        // Update the profile data with the image URL
        const updatedData = {
          fullName: profileData.fullName,
          email: profileData.email,
          phoneNumber: profileData.phoneNumber,
          address: profileData.address,
          image: imageUrl || profileData.image // Use the image URL from the backend response
        };

        await dispatch(updateProfileData({ uuid, ...updatedData })).unwrap();
        alert('Profile updated successfully!');
      } else {
        console.error("Error updating profile:", response.data.message);
        alert(`Error: ${response.data.message}`);
      }
    } catch (error: unknown) {
      console.error("Error updating profile:", error);
      alert(`Error: ${error instanceof Error ? error.message : 'An unexpected error occurred'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordForm = () => {
    setShowPasswordForm(!showPasswordForm);
    setIsError(false)
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { fullName, email, phoneNumber, address, image } = profileData;

  return (
    <>
      <Navbar bgColor={'bg-black'} position='static' />

      <div className="flex flex-col mx-16 lg:mx-32 my-8 lg:my-16 h-auto gap-4">
        <div className="flex flex-col w-full gap-2.5">
          <h1 className="text-3xl lg:text-5xl font-medium">Profile</h1>
        </div>
        <div className="flex flex-col md:flex-row gap-6 mt-6 lg:mt-12">
          <ProfileCard
            name={fullName || ''}
            email={email}
            profileImage={image}
            joinDate='20 January 2022'
            onImageChange={handleImageChange}
          />
          <form id="form" className="flex flex-1 flex-col border rounded gap-4 py-4 md:py-6 px-3 md:px-12" onSubmit={handleSubmit}>
            <FullNameInput name='fullName' placeholder={fullName || 'Enter Your Full Name'} onChange={handleInputChange} />
            <EmailInput name='email' disabled={true} placeholder={email} showChangeEmail={true} />
            <PhoneInput name='phoneNumber' placeholder={phoneNumber || 'Enter Your Phone Number'} onChange={handleInputChange} />
            <AddressInput name='address' placeholder={address || 'Enter Your Address'} onChange={handleInputChange} />
            <div className={`transition-all duration-500 ease-in-out ${showPasswordForm ? 'max-h-screen opacity-100' : 'max-h-0 overflow-hidden opacity-0'}`}>
              {showPasswordForm && (
                <>
                  <PasswordInput label='New Password' name='password' placeholder='Enter New Password' />
                  <ConfirmPasswordInput name='confirmPassword' placeholder='Confirm New Password' />
                </>
              )}
            </div>
            <div className='flex justify-between'>
              <div
                id="alert-error"
                className={`flex text-red-400 text-base ${isError ? 'block' : 'invisible'}`}
              >
                {errorMessage}
              </div>
              <div className="flex items-center self-end pr-3 text-amber-500 cursor-pointer" onClick={togglePasswordForm}>
                {showPasswordForm ? 'Cancel' : 'Set New Password'}
              </div>
            </div>

            <SubmitButton buttonName={isLoading ? 'Submitting...' : 'Submit'} disabled={isLoading} />
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Profile;
