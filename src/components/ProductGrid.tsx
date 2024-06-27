import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import PagePagination from './PagePagination';

interface Product {
  uuid: string;
  image: string;
  productName: string;
  description: string;
  price: number;
  rating: number;
}

interface PageInfo {
  currentPage: number;
  totalPage: number;
}

const ProductGrid: React.FC = () => {
  const [posts, setPosts] = useState<Product[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const getPosts = async (page: number | string) => {
      let res;
      if (page === 'next') {
        res = await axios.get('https://coffee-shop-backend-with-t-git-396322-mochammad-fauzis-projects.vercel.app/products', {
          params: {
            page: currentPage + 1,
            limit: 6
          },
        });
      } else {
        res = await axios.get('https://coffee-shop-backend-with-t-git-396322-mochammad-fauzis-projects.vercel.app/products', {
          params: {
            page,
            limit: 6
          },
        });
      }
      setPageInfo(res.data.meta);
      setPosts(res.data.results);
      setCurrentPage(res.data.meta.currentPage);
    };

    getPosts(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <div className="flex flex-1 max-w-3xl text-black">
        <div className="relative grid grid-flow-row grid-cols-2 gap-2 md:gap-8">
          {posts &&
            posts.map((product) => (
              <ProductCard
                key={product.uuid}
                uuid={product.uuid}
                isFlashSale={true}
                image={product.image}
                productName={product.productName}
                description={product.description}
                price={product.price}
                ratingProduct={product.rating}
              />
            ))}
        </div>
      </div>
      <PagePagination pages={pageInfo?.totalPage || 0} currentPage={currentPage} onPageChange={handlePageChange} />
    </>
  );
};

export default ProductGrid;
