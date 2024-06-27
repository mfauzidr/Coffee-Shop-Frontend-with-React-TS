import React, { useEffect, useState } from 'react';
import SectionHeader from './SectionHeader';
import ProductCard from './ProductCard';
import axios from 'axios';

// Define the Product type here
interface Product {
  uuid: string;
  image: string;
  productName: string;
  description: string;
  price: number;
  isFlashSale: boolean;
  ratingProduct?: number;
}

const ProductHighlight: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = async () => {
    try {
      const res = await axios.get('https://coffee-shop-backend-with-t-git-396322-mochammad-fauzis-projects.vercel.app/products', {
        params: {
          limit: 4,
        },
      });
      setProducts(res.data.results);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section className="flex flex-col h-screen items-center mt-20 px-10 gap-6">
      <SectionHeader
        title={<h1>Here is People’s <span className="text-amber-800">Favorite</span></h1>}
        text="Let’s choose and have a bit taste of people’s favorite. It might be yours too!"
      />
      <div className="h-auto max-w-full overflow-x-auto md:overflow-visible">
        <div className="flex flex-1 md:flex-row mt-5 md:mt-14 gap-2 md:gap-5 w-80 md:w-full">
          {products.map((product) => (
            <ProductCard
              key={product.uuid}
              uuid={product.uuid}
              image={product.image}
              productName={product.productName}
              description={product.description}
              price={product.price}
              isFlashSale={product.isFlashSale}
              ratingProduct={product.ratingProduct}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductHighlight;
