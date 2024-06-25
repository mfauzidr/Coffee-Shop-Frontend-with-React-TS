import SectionHeader from "./SectionHeader"
import Maps from '../assets/img/maps.png'



const Stores = () => {
    return (
        <div className="flex flex-col items-center gap-14 bg-[rgba(195, 190, 183, 0.3)] my-12 px-5 pt-8">
            <SectionHeader
                title={<h1><span className="text-amber-800">Visit Our Store</span> in the Spot on the Map Below</h1>}
                text="You can explore the menu that we provide with fun and have their own taste and make your day better."
            />  
            <div className="flex items-center px-6">
                <img className="h-auto" src={`${Maps}`} alt="Maps" />
            </div>
        </div>
    )
}

export default Stores