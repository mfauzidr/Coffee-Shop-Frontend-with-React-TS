import React, { useCallback, useEffect, useState } from 'react';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProfileCard from "../components/ProfileCard";
import { AddressInput, EmailInput, PhoneInput, PasswordInput, ConfirmPasswordInput, FullNameInput } from "../components/InputForm";
import { SubmitButton } from "../components/Buttons";
import { useStoreSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2'

interface IProfileBody {
  id?: number;
  email?: string;
  image?: string;
  fullName?: string;
  password?: string
  phoneNumber?: string;
  address?: string;
}

const Profile = () => {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [profile, setProfile] = useState<IProfileBody[]>([]);
  const [changedImage, setSelectedImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState(false);
  // const [errorMessage, setErrorMessage] = useState('');
  const [form, setForm] = useState<IProfileBody>();


  const { token } = useStoreSelector((state: RootState) => state.auth);
  const [uuid, setUuid] = useState<string>('');

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode<{ uuid: string }>(token);
      setUuid(decodedToken.uuid);
    }
  }, [token]);



  const fetchprofile = useCallback(async () => {
    if (!uuid || !token) return;
    const url = `${import.meta.env.VITE_REACT_APP_API_URL}/users/${uuid}`;

    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });


      setProfile(res.data.results);
      setForm(res.data.results[0]);

    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  }, [uuid, token]);

  useEffect(() => {
    fetchprofile();
  }, [fetchprofile]);


  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!uuid) {
      console.error("UUID is not defined");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      if (form?.fullName) {
        formData.append('fullName', form.fullName)
      }
      if (form?.email) {
        formData.append('email', form.email);
      }
      if (form?.phoneNumber) {
        formData.append('phoneNumber', form.phoneNumber);
      }
      if (form?.address) {
        formData.append('address', form.address);
      }

      if (changedImage) {
        formData.append('image', changedImage);
      }

      if (showPasswordForm && form?.password) {
        formData.append('password', form.password);
      }

      await axios.patch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/users/${uuid}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        }
      );

      Swal.fire({
        title: "Success!",
        text: "Update Success",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
        position: "top-end",
        customClass: {
          popup: "border-solid border-5 border-primary text-sm rounded-lg shadow-lg mt-8 tbt:mt-16",
        },
        toast: true,
      });
      fetchprofile()
    } catch (error: unknown) {
      console.error("Error updating profile:", error);
      Swal.fire({
        title: "Failed!",
        text: "Update Failed!",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
        position: "top-end",
        customClass: {
          popup: "border-solid border-5 border-primary text-sm rounded-lg shadow-lg mt-8 tbt:mt-16",
        },
        toast: true,
      });
    } finally {
      setIsLoading(false);
    }
  };


  const togglePasswordForm = () => {
    setShowPasswordForm(!showPasswordForm);
    setIsError(false)
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((form) => {
      return {
        ...form,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <>
      <Navbar bgColor={'bg-black'} position='static' />

      <div className="flex flex-col mx-16 lg:mx-32 my-8 lg:my-16 h-auto gap-4">
        <div className="flex flex-col w-full gap-2.5">
          <h1 className="text-3xl lg:text-5xl font-medium">Profile</h1>
        </div>
        <div className="flex flex-col md:flex-row gap-6 mt-6 lg:mt-12">
          <ProfileCard
            name={profile[0]?.fullName}
            email={profile[0]?.email}
            profileImage={changedImage ? URL.createObjectURL(changedImage) : profile[0]?.image}
            joinDate='20 January 2022'
            onImageChange={handleImageChange}
          />
          <form id="form" className="flex flex-1 flex-col border rounded gap-4 py-4 md:py-6 px-3 md:px-12" onSubmit={handleSubmit}>
            <FullNameInput value={form?.fullName} name='fullName' placeholder={profile[0]?.fullName || 'Enter Your Full Name'} onChange={handleInputChange} />
            <EmailInput value={form?.email} name='email' disabled={true} placeholder={profile[0]?.email} showChangeEmail={true} />
            <PhoneInput value={form?.phoneNumber} name='phoneNumber' placeholder={profile[0]?.phoneNumber || 'Enter Your Phone Number'} onChange={handleInputChange} />
            <AddressInput value={form?.address} name='address' placeholder={profile[0]?.address || 'Enter Your Address'} onChange={handleInputChange} />
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
                {/* {errorMessage} */}
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
