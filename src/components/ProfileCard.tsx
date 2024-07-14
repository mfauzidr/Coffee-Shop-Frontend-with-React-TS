import React from 'react'
import { Button } from './Buttons'

interface ProfileCardProps {
  name: string;
  email: string;
  profileImage: string;
  joinDate: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, email, profileImage, joinDate }) => {
  return (
    <div className="flex flex-col items-center h-auto border rounded text-gray-600 py-6 px-7 gap-3.5 w-auto">
      <div>{name}</div>
      <div>{email}</div>
      <div className="flex w-28 h-28 rounded-full border bg-white overflow-hidden">
        <img className="object-cover" src={profileImage} alt="Profile" />
      </div>
      <div>
        <Button buttonName={'Upload New Photo'} size={'px-8 text-sm'} type={'button'} />
      </div>
      <div className="text-sm">
        Since <span className="font-bold">{joinDate}</span>
      </div>
    </div>
  )
}

export default ProfileCard
