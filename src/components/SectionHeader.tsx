
const SectionHeader = ({title = 'Header Title',text = 'Header Text'}) => {
    return (
        <div className="flex flex-col items-center gap-6">
            <div className="text-2xl md:text-5xl text-center">
              {title}
            </div>
            <div className="w-8 h-1 md:w-16 md:h-1.5 bg-amber-500"></div>
            <div className="flex text-sm md:text-base text-center">
              {text}
            </div>
        </div>
    )
}

export default SectionHeader