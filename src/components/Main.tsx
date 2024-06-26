import React from 'react';
import { useNavigate } from 'react-router-dom';
import StatCard from './StatCard';
import bgMain from '../assets/img/bg-main.png';

const Main: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/register');
  };

  return (
    <header className="h-screen flex flex-col-reverse md:flex-row">
      <div className="flex flex-1 bg-gradient-to-b from-gray-600 to-black justify-center items-center px-6 py-12 md:px-0 md:py-0">
        <div className="flex flex-col md:px-20 gap-6 text-white">
          <h1 className="text-2xl md:text-5xl">Start Your Day with Coffee and Good Meals</h1>
          <div className="text-sm md:text-base">
            We provide high quality beans, good taste, and healthy meals made by love just for you. Start your day with us for a bigger smile!
          </div>
          <div>
            <button
              className="border border-amber-500 bg-amber-500 text-black h-12 w-36 rounded hover:bg-amber-400 hover:text-white"
              onClick={handleGetStarted}
            >
              Get Started
            </button>

          </div>
          <div className="flex justify-between divide-x">
            <StatCard label="Staff" max={90} duration={40} />
            <StatCard label="Stores" max={30} duration={80} />
            <StatCard label="Customer" max={800} duration={5} />
          </div>
        </div>
      </div>
      <div className="hidden md:flex md:flex-1 bg-cover bg-center" style={{ backgroundImage: `url(${bgMain})` }}></div>
    </header>
  );
};

export default Main;
