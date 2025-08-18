import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { Button } from "./Buttons";

const MessageSection = () => {
  return (
    <div className="flex p-5 border border-gray-200 h-fit md:max-w-md lg:max-w-lg xl-max-w-xl 2xl:max-w-2xl">
      <div className="flex flex-col gap-2.5">
        <div className="flex w-12 h-12 rounded-2xl bg-yellow-950 justify-center items-center">
          <FontAwesomeIcon icon={faMessage} style={{ color: "#ffffff" }} />
        </div>
        <div className="text-lg text-gray-700 font-bold">Send Us Message</div>
        <div className="flex text-gray-700">
          If you're unable to find an answer or your product quickly, please
          describe your problem and tell us. We will give you a solution.
        </div>
        <Button type="button" buttonName="Send Message" />
      </div>
    </div>
  );
};

export default MessageSection;
