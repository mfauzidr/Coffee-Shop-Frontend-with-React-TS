import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import axios from 'axios';
import PagePagination from './PagePagination'

const ProductGrid = () => {
  const [posts, setPosts] = useState([{}])
  const [pageInfo, setPageInfo] = useState(null)
  const [currentPage, setCurrentPage] = useState()

  const getPosts = async (page) => {
    let res
        if (page === 'next') {
            res = await axios.get('http://localhost:8888/products', {
                params: {
                    page: currentPage + 1,
                    limit: 6
                },
            })
        } else {
            res = await axios.get('http://localhost:8888/products', {
                params: {
                    page,
                    limit: 6
                },
            })
        }
    setPageInfo(res.data.pageInfo)
    setPosts(res.data.results)
    setCurrentPage(res.data.pageInfo.currentPage)
  }

  useEffect(() => {
    getPosts(currentPage)
  }, [currentPage])

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  return (
    <>
      <div className="flex flex-1 max-w-3xl text-black">
        <div className="relative grid grid-flow-row grid-cols-2 gap-8">
          {posts &&
            posts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
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
  )
}

export default ProductGrid
