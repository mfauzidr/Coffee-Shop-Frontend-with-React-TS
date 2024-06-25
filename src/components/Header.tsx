import React from 'react'
import BgImage from '../assets/img/bg-header.png'
import StatCard from './StatCard'


export const HeaderContent = () => {
    return (
      <div className="flex flex-1 bg-gradient-to-b from-gray-600 to-black justify-center items-center px-6 py-12 md:px-0 md:py-0">
        <div className="flex flex-col md:px-20 gap-6 text-white">
          <h1 className="text-2xl md:text-5xl">Start Your Day with Coffee and Good Meals</h1>
          <div className="text-sm md:text-base">We provide high quality beans, good taste, and healthy meals made by love just for you. Start your day with us for a bigger smile!</div>
          <div>
            <button 
            className="border border-amber-500 bg-amber-500 text-black h-12 w-36 rounded"
            onClick={() => (window.location.href = "/register")}
            >Get Started</button>
          </div>
          <div className="flex justify-between divide-x">
            <StatCard label="Staff" max={90} duration={40} />
            <StatCard label="Stores" max={30} duration={80} />
            <StatCard label="Customer" max={800} duration={5} />
          </div>
        </div>
      </div>
    )
  }

export const HeaderImage = () => {
  return (
    <div className="hidden md:flex md:flex-1 bg-cover bg-center" style={{ backgroundImage: `url(${BgImage})` }}></div>
  )
}

const Header = ({ BgImage }) => {
  return (
    <header className="h-screen flex flex-col-reverse md:flex-row">
      <HeaderContent />
      <HeaderImage BgImage={BgImage} />
    </header>
  )
}

export default Header
