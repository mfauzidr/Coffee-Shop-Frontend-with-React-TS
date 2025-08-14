import { useState } from "react";
import FeatherIcon from "feather-icons-react";

const FloatingChat = () => {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      {chatOpen && (
        <div
          className={`fixed bottom-12 right-12 w-96 h-2/3 border-t-[19px] border-amber-500 rounded-2xl bg-white flex flex-col`}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
            <h2 className="text-base font-semibold">Chat Support</h2>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={() => {
                setChatOpen(false);
              }}
            >
              <FeatherIcon icon="x" size="20" />
            </button>
          </div>

          <div className="flex items-center h-[72px] border-b border-slate-200 px-5">
            <div className="h-12 w-12 bg-slate-400 rounded-full mr-3.5"></div>
            <div>
              <div className="text-base leading-5">Maria Angela</div>
              <div className="text-base leading-5 text-amber-500">
                Admin Support
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5">
            <div className="flex gap-1.5 items-center justify-start mb-3">
              <div className="h-6 w-6 rounded-full bg-slate-300"></div>
              <div className="flex h-fit w-fit p-2.5 rounded-lg text-sm bg-slate-100">
                Halo, Ada yang bisa kami bantu?
              </div>
            </div>
            <div className="flex gap-1.5 items-center justify-end mt-3">
              <div className="flex h-fit w-fit p-2.5 rounded-lg text-sm bg-slate-100">
                Saya kesulitan mencari kopi
              </div>
              <div className="h-6 w-6 rounded-full bg-slate-300"></div>
            </div>
          </div>

          <form className="flex px-5 gap-1.5 py-4 border-t border-slate-200">
            <input
              className="flex-1 h-11 px-3.5 rounded-lg border border-slate-200 bg-slate-50 text-gray-500 text-sm"
              type="text"
              placeholder="Masukan Pesan Anda"
            />
            <button
              className="flex items-center justify-center h-11 w-11 rounded-lg bg-amber-500"
              type="submit"
            >
              <FeatherIcon icon="send" />
            </button>
          </form>
        </div>
      )}

      {!chatOpen && (
        <button
          className="fixed bottom-12 right-12 bg-amber-500 w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
          onClick={() => setChatOpen(true)}
        >
          <FeatherIcon icon="message-circle" size="40" />
        </button>
      )}
    </>
  );
};

export default FloatingChat;
