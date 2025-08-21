interface ProfileCardProps {
  name?: string;
  email?: string;
  profileImage?: string | undefined;
  joinDate: string;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isEdit: boolean;
}

const ProfileCard = ({
  name,
  email,
  profileImage,
  joinDate,
  onImageChange,
  isEdit,
}: ProfileCardProps) => {
  return (
    <div className="flex flex-col items-center h-auto border rounded text-gray-600 py-6 px-7 gap-3.5 w-auto">
      <div>{name}</div>
      <div>{email}</div>
      <div className="flex w-28 h-28 rounded-full border bg-white overflow-hidden">
        <img
          className="object-cover w-full h-full"
          src={profileImage ? profileImage : undefined}
          alt="Profile"
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={onImageChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            id="file-upload-input"
          />
          <label htmlFor="file-upload-input">
            {isEdit && (
              <button
                type="button"
                className={`flex-1 p-1 lg:p-2 border border-amber-500 bg-amber-500 rounded font-semibold text-black text-center text-xs md:text-base`}
              >
                Upload New Photo
              </button>
            )}
          </label>
        </div>
      </div>
      <div className="text-sm">
        Since <span className="font-bold">{joinDate}</span>
      </div>
    </div>
  );
};

export default ProfileCard;
