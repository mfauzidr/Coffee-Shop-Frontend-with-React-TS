import React, { useState } from "react";
import ProfileCard from "../../components/ProfileCard";
import {
  AddressInput,
  EmailInput,
  PhoneInput,
  PasswordInput,
  FullNameInput,
} from "../../components/InputForm";
import { SubmitButton } from "../../components/Buttons";
import { useStoreSelector } from "../../redux/hooks";
import { AppDispatch, RootState } from "../../redux/store";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { fetchProfile, updateProfileData } from "../../redux/slices/profile";

interface IProfileBody {
  id?: number;
  email?: string;
  image?: string;
  fullName?: string;
  password?: string;
  phoneNumber?: string;
  address?: string;
}

const Profile = () => {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const { profile } = useStoreSelector((state: RootState) => state.profile);
  const [changedImage, setSelectedImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState(false);
  const [form, setForm] = useState<IProfileBody>();
  const uuid = profile.uuid;
  const dispatch = useDispatch<AppDispatch>();
  const [isEdit, setIsEdit] = useState<boolean>(true);
  const [showModalEmail, setShowModalEmail] = useState<boolean>(false);

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
      if (form?.fullName) formData.append("fullName", form.fullName);
      if (form?.email) formData.append("email", form.email);
      if (form?.phoneNumber) formData.append("phoneNumber", form.phoneNumber);
      if (form?.address) formData.append("address", form.address);
      if (changedImage) formData.append("image", changedImage);
      // if (showPasswordForm && form?.password) {
      //   formData.append("password", form.password);
      // }

      await dispatch(updateProfileData({ uuid, formData })).unwrap();

      Swal.fire({
        title: "Success!",
        text: "Update Success",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
        position: "top-end",
        customClass: {
          popup:
            "border-solid border-5 border-primary text-sm rounded-lg shadow-lg mt-8 tbt:mt-16",
        },
        toast: true,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire({
        title: "Failed!",
        text: "Update Failed!",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
        position: "top-end",
        customClass: {
          popup:
            "border-solid border-5 border-primary text-sm rounded-lg shadow-lg mt-8 tbt:mt-16",
        },
        toast: true,
      });
    } finally {
      setIsLoading(false);
      setIsEdit(false);
      dispatch(fetchProfile({ uuid }));
    }
  };

  const togglePasswordForm = () => {
    setShowPasswordForm(!showPasswordForm);
    setIsError(false);
  };
  const toggleEditProfile = () => {
    setIsEdit(!isEdit);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((form) => {
      return {
        ...form,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleClickChangeEmail = () => {
    setShowModalEmail(true);
  };

  return (
    <>
      <div className="flex flex-col mx-16 lg:mx-32 my-8 lg:my-16 h-auto gap-4">
        <div className="flex flex-col w-full gap-2.5">
          <h1 className="text-3xl lg:text-5xl font-medium">Profile</h1>
        </div>
        <div className="flex flex-col md:flex-row gap-6 mt-6 lg:mt-12">
          <ProfileCard
            isEdit={!isEdit}
            name={profile?.fullName}
            email={profile?.email}
            profileImage={
              changedImage ? URL.createObjectURL(changedImage) : profile?.image
            }
            joinDate="20 January 2022"
            onImageChange={handleImageChange}
          />
          <form
            id="form"
            className="flex flex-1 flex-col border rounded gap-4 py-4 md:py-6 px-3 md:px-12"
            onSubmit={handleSubmit}
          >
            <div className="flex self-end">
              <div
                className="flex items-center self-end pr-3 text-amber-500 cursor-pointer"
                onClick={toggleEditProfile}
              >
                {!isEdit ? "Cancel" : "Edit Profile"}
              </div>
            </div>
            <FullNameInput
              value={profile?.fullName}
              name="fullName"
              onChange={handleInputChange}
              disabled={isEdit}
            />
            <EmailInput
              value={profile?.email}
              name="email"
              disabled={true}
              showChangeEmail={true}
              onClick={handleClickChangeEmail}
            />
            <PhoneInput
              value={profile?.phone}
              name="phone"
              disabled={isEdit}
              onChange={handleInputChange}
            />
            <AddressInput
              value={profile?.address}
              name="address"
              disabled={isEdit}
              onChange={handleInputChange}
            />

            <div className="flex justify-between">
              <div
                id="alert-error"
                className={`flex text-red-400 text-base ${
                  isError ? "block" : "invisible"
                }`}
              ></div>
              <div
                className="flex items-center self-end pr-3 text-amber-500 cursor-pointer"
                onClick={togglePasswordForm}
              >
                {showPasswordForm ? "Cancel" : "Set New Password"}
              </div>
            </div>

            {!isEdit && (
              <SubmitButton
                buttonName={isLoading ? "Submitting..." : "Submit"}
                disabled={isLoading}
              />
            )}
          </form>
        </div>
      </div>
      {showModalEmail && (
        <div
          className="fixed inset-0 z-30 flex justify-center items-center bg-black bg-opacity-30"
          onClick={() => setShowModalEmail(false)}
        >
          <div
            className="bg-white border-4 border-amber-500 rounded-3xl p-8 max-h-screen text-black text-sm w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            This Is Change Email Modal
          </div>
        </div>
      )}
      {showPasswordForm && (
        <div
          className="fixed inset-0 z-30 flex justify-center items-center bg-black bg-opacity-30"
          onClick={() => setShowPasswordForm(false)}
        >
          <div
            className="bg-white border-4 border-amber-500 rounded-3xl p-8 max-h-screen text-black text-sm w-1/2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center text-xl text-center mb-10">
              Provide your current password and set a new one.
            </div>
            <div className="flex flex-col gap-5 bg-">
              <PasswordInput
                label="Old Password"
                name="oldPassword"
                placeholder="Enter Old Password"
              />
              <PasswordInput
                label="New Password"
                name="password"
                placeholder="Enter New Password"
              />
              <PasswordInput
                label="Confirm Password"
                name="confirmPassword"
                placeholder="Enter New Password Again"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
