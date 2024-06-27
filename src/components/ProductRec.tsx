import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import axios from 'axios';

interface Product {
  uuid: string;
  image: string;
  productName: string;
  description: string;
  price: number;
  isFlashSale: boolean;
  ratingProduct?: number;
}

const ProductRec: React.FC = () => {

  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = async () => {
    try {
      const res = await axios.get('https://coffee-shop-backend-with-t-git-396322-mochammad-fauzis-projects.vercel.app/products', {
        params: {
          limit: 3,
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
    <div className="flex flex-1 text-black">
      <div className="flex flex-1 mt-7 md:mt-14 gap-5 items-center md:justify-center max-w-full overflow-x-auto md:overflow-visible">
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
  );
}

export default ProductRec;
