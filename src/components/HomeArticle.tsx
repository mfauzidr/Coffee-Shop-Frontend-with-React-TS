import FeatherIcon from "feather-icons-react";
import BgImage from "../assets/img/bg-article.webp";

const HomeArticle = () => {
  return (
    <>
      <article className="flex h-1/2">
        <div className="flex lg:flex-1 justify-center items-center bg-white px-16 py-12 lg:px-0">
          <div className="flex flex-col flex-1 lg:px-32 gap-6">
            <h1 className="text-2xl lg:text-3xl relative pl-6">
              <span className="border-l-4 lg:border-l-8 border-l-amber-500 h-full lg:h-1/2 absolute left-0 lg:top-1/2 lg:transform lg:-translate-y-1/2"></span>
              We Provide <span className="text-amber-800">Good Coffee</span> and{" "}
              <span className="text-amber-800">Healthy Meals</span>
            </h1>

            <div className="text-sm lg:text-base">
              You can explore the menu that we provide with fun and have their
              own taste and make your day better.
            </div>
            <ul className="flex flex-col gap-6 text-sm lg:text-base">
              <li className="flex gap-2.5">
                <FeatherIcon icon="check-circle" className="text-green-600" />
                High quality beans
              </li>
              <li className="flex gap-2.5">
                <FeatherIcon icon="check-circle" className="text-green-600" />
                Healthy meals, you can request the ingredients
              </li>
              <li className="flex gap-2.5">
                <FeatherIcon icon="check-circle" className="text-green-600" />
                Chat with our staff to get better experience for ordering
              </li>
              <li className="flex gap-2.5">
                <FeatherIcon icon="check-circle" className="text-green-600" />
                Free member card with a minimum purchase of IDR 200.000
              </li>
            </ul>
          </div>
        </div>
        <div
          className="hidden lg:flex lg:flex-1 bg-cover bg-center"
          style={{ backgroundImage: `url(${BgImage})` }}
        ></div>
      </article>
    </>
  );
};

export default HomeArticle;
