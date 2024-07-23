import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import axios from 'axios';
import PagePagination from './PagePagination';

interface Product {
  uuid: string;
  image: string;
  productName: string;
  description: string;
  price: number;
  isFlashSale: boolean;
  ratingProduct?: number;
}

interface PageInfo {
  currentPage: number;
  totalPage: number;
}

const ProductRec = () => {

  const [products, setProducts] = useState<Product[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const getProducts = async (page: number | string) => {
      let res;
      try {
        if (page === 'next') {
          res = await axios.get('https://coffee-shop-backend-with-t-git-396322-mochammad-fauzis-projects.vercel.app/products', {
            params: {
              page: currentPage + 1,
              limit: 3
            },
          });
        } else {
          res = await axios.get('https://coffee-shop-backend-with-t-git-396322-mochammad-fauzis-projects.vercel.app/products', {
            params: {
              page,
              limit: 3
            },
          });
          setPageInfo(res.data.meta);
          setProducts(res.data.results);
          setCurrentPage(res.data.meta.currentPage);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="block text-black">
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
      <PagePagination pages={pageInfo?.totalPage || 0} currentPage={currentPage} onPageChange={handlePageChange} />
    </div>
  );
}

export default ProductRec;
