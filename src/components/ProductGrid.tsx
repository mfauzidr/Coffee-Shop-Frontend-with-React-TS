import { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from './ProductCard'
import PagePagination from './PagePagination'

interface Product {
  uuid: string
  image: string
  productName: string
  description: string
  price: number
  rating: number
}

interface PageInfo {
  currentPage: number
  pages: number
}

interface ProductGridProps {
  filters: {
    search: string
    category: string[]
    sortBy: string
    priceRange: [number, number]
  }
}

interface FilterParams {
  page: number;
  limit: number;
  search?: string;
  category?: string;
  sortBy?: string;
  minPrice?: number;
  maxPrice?: number;
}


const ProductGrid = ({ filters }: ProductGridProps) => {
  const [posts, setPosts] = useState<Product[]>([])
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getPosts = async (page: number | string) => {
      setLoading(true)
      setError(null)

      try {
        const url = `${import.meta.env.VITE_REACT_APP_API_URL}/products`
        const filterParams: FilterParams = {
          page: typeof page === 'number' ? page : currentPage,
          limit: 6,
          minPrice: filters.priceRange[0],
          maxPrice: filters.priceRange[1],
        };

        if (filters.search) {
          filterParams.search = filters.search;
        }

        if (filters.category.length) {
          filterParams.category = filters.category.join(',');
        }

        if (filters.sortBy) {
          filterParams.sortBy = filters.sortBy;
        }


        const res = await axios.get(url, { params: filterParams })
        setPageInfo(res.data.meta)
        setPosts(res.data.results)
        setCurrentPage(res.data.meta.currentPage)
      } catch (err) {
        setError('Failed to fetch products. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    getPosts(currentPage)
  }, [currentPage, filters])

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
    window.scrollTo({ top: 650, behavior: 'smooth' })
  }

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <>
          <div className="relative grid grid-flow-row grid-cols-2 gap-2 md:gap-8">
            {posts.map((product) => (
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
          {pageInfo && (
            <PagePagination
              currentPage={pageInfo.currentPage}
              pages={pageInfo.pages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  )
}

export default ProductGrid
