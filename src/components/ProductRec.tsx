import Product1 from '../assets/img/home-p-3.png'
import Product2 from '../assets/img/home-p-4.png'
import ProductCard from './ProductCard'

const ProductRec = () => {
    const productData = [
        {
          isFlashSale: true,
          image: Product1,
          name: "Hazelnut Latte",
          description: "You can explore the menu that we provide with fun and have their own taste and make your day better.",
          price: 20000,
          ratingProduct: 5.0,
        },
        {
          isFlashSale: true,
          image: Product2,
          name: "Hazelnut Latte",
          description: "You can explore the menu that we provide with fun and have their own taste and make your day better.",
          price: 20000,
          ratingProduct: 3.9,
        },
        {
          isFlashSale: true,
          image: Product2,
          name: "Hazelnut Latte",
          description: "You can explore the menu that we provide with fun and have their own taste and make your day better.",
          price: 20000,
          ratingProduct: 5.0,
        },        
    ]

    return (
        <>
          <div className="flex flex-1 text-black">
            <div className="flex flex-col flex-1 md:flex-row mt-14 gap-5 items-center justify-center">
                {productData.map((product, index) => (
                    <ProductCard 
                    key={index}
                    isFlashSale={product.isFlashSale}
                    image={product.image}
                    title={product.name}
                    description={product.description}
                    price={product.price}
                    ratingProduct={product.ratingProduct}
                    />
                ))}
            </div>
          </div>
        </>
    )
}

export default ProductRec