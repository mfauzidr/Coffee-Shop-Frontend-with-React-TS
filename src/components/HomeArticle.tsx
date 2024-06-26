import FeatherIcon from "feather-icons-react"
import BgImage from '../assets/img/bg-article.png'


const HomeArticle = () => {
    return (
        <>
            <article className="flex h-1/2">
                <div className="flex md:flex-1 justify-center items-center bg-white px-6 py-12 md:px-0">
                    <div className="flex flex-col flex-1 md:px-20 gap-6">
                        <h1 className="text-2xl md:text-5xl relative pl-6">
                            <span className="border-l-4 md:border-l-8 border-l-amber-500 h-full md:h-1/2 absolute left-0 md:top-1/2 md:transform md:-translate-y-1/2"></span>
                            We Provide <span className="text-amber-800">Good Coffee</span> and <span className="text-amber-800">Healthy Meals</span>
                        </h1>

                        <div className="text-sm md:text-base">
                            You can explore the menu that we provide with fun and have their own taste and make your day better.
                        </div>
                        <ul className="flex flex-col gap-6 text-sm md:text-base">
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
                <div className="hidden md:flex md:flex-1 bg-cover bg-center" style={{ backgroundImage: `url(${BgImage})` }}></div>
            </article>
        </>
    )
}

export default HomeArticle