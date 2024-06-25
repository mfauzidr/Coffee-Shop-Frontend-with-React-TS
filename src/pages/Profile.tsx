import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import ProfileImg from "../assets/img/profile.png"
import ProfileCard from "../components/ProfileCard"
import { AddressInput, EmailInput, FullNameInput, PasswordInput, PhoneInput } from "../components/InputForm"
import { Button } from "../components/Buttons"

const Profile = () => {
    const userData = {
        name: 'Ghaluh Wizard',
        email: 'ghaluhwizz@gmail.com',
        profileImage: ProfileImg,
        joinDate: '20 January 2022',
      }

      const inputPlaceholder = {
        fullName: userData.name,
        email: userData.email,
        phone: '082116304338',
        address: 'Griya Bandung Indah',
        password: ''
      }

    return(
        <>
        <Navbar bgColor={'bg-black'} />

        <div className="flex flex-col mx-32 my-32 h-auto gap-5">
            <div className="flex flex-col w-full gap-2.5">
                <h1 className="text-5xl font-medium">Profile</h1>
            </div>
            <div className="flex gap-5 mt-12">
                <ProfileCard {...userData}/>
                <form id="form" className="flex flex-1 flex-col border rounded gap-6 py-6 px-12" action="">
                    <FullNameInput placeholder={inputPlaceholder.fullName} />
                    <EmailInput placeholder={inputPlaceholder.email} />
                    <PhoneInput placeholder={inputPlaceholder.phone} />
                    <PasswordInput placeholder={inputPlaceholder.password} />
                    <AddressInput placeholder={inputPlaceholder.address} />
                    <Button buttonName={'Submit'} type={'Submit'} />

                </form>

            </div>
        </div>

        <Footer />
        </>
    )
}

export default Profile