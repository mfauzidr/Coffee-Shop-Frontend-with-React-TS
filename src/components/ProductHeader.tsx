import BgHeader from '../assets/img/bg-product.png'

const ProductHeader = () => {
    return (
        <header className="hidden md:flex items-center h-40 md:h-72 w-full bg-cover bg-center" style={{ backgroundImage: `url(${BgHeader})` }}>
            <h1 className="text-3xl md:text-5xl mx-32 w-4/6 text-white">We Provide Good Coffee and Healthy Meals</h1>
        </header>
    )
}

export default ProductHeader