import React, { useState } from 'react';
import FeatherIcon from 'feather-icons-react';

const FloatingChat: React.FC = () => {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      {chatOpen && (
        <div className="fixed bottom-36 right-32 w-80 h-2/3 border-t-[19px] border-amber-500 rounded-2xl bg-white">
          <div className="flex items-center h-[72px] border-b border-slate-200">
            <div className="h-12 w-12 bg-slate-400 rounded-full ml-[19px] mr-3.5"></div>
            <div>
              <div className="text-base leading-5">Maria Angela</div>
              <div className="text-base leading-5 text-amber-500">Admin Support</div>
            </div>
          </div>
          <div className="p-5 h-72">
            <div className="flex gap-1.5 items-center justify-start mb-3">
              <div className="h-6 w-6 rounded-full bg-slate-300 border-slate-300 "></div>
              <div className="flex h-fit w-fit p-2.5 rounded-lg text-sm bg-slate-100">
                Halo, Ada yang bisa kami bantu?
              </div>
            </div>
            <div className="flex gap-1.5 items-center justify-end mt-3">
              <div className="flex h-fit w-fit p-2.5 rounded-lg text-sm bg-slate-100">
                Saya kesulitan mencari kopi
              </div>
              <div className="h-6 w-6 rounded-full bg-slate-300 border-slate-300 "></div>
            </div>
          </div>
          <form className="flex px-5 gap-1.5 mb-6" action="">
            <input
              className="flex items-center flex-1 h-11 px-3.5 rounded-lg border border-slate-200 bg-slate-50 text-gray-500 text-sm"
              type="text"
              placeholder="Masukan Pesan Anda"
            />
            <button
              className="flex items-center justify-center h-11 w-11 border-0 rounded-lg bg-amber-500"
              type="submit"
            >
              <FeatherIcon icon="send" />
            </button>
          </form>
        </div>
      )}
      <button
        className="fixed bottom-12 md:bottom-16 right-16 md:right-32 bg-amber-500 w-16 h-16 rounded-full flex items-center justify-center"
        onClick={() => setChatOpen(!chatOpen)}
      >
        <FeatherIcon icon="message-circle" size="40" />
      </button>
    </>
  );
};

export default FloatingChat;
