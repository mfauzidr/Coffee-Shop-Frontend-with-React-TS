import { FileUploadButton } from './Buttons';

interface ProfileCardProps {
  name: string;
  email: string;
  profileImage: string;
  joinDate: string;
  onImageChange: (file: File | null) => void;
}

const ProfileCard = ({ name, email, profileImage, joinDate, onImageChange }: ProfileCardProps) => {
  return (
    <div className="flex flex-col items-center h-auto border rounded text-gray-600 py-6 px-7 gap-3.5 w-auto">
      <div>{name}</div>
      <div>{email}</div>
      <div className="flex w-28 h-28 rounded-full border bg-white overflow-hidden">
        <img className="object-cover w-full h-full" src={profileImage} alt="Profile" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <FileUploadButton buttonName="Upload New Photo" onFileChange={onImageChange} />
      </div>
      <div className="text-sm">
        Since <span className="font-bold">{joinDate}</span>
      </div>
    </div>
  );
};


export default ProfileCard;
