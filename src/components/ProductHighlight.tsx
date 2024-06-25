import SectionHeader from "./SectionHeader"
import ProductCard from "./ProductCard"
import { useEffect, useState } from "react"
import axios from "axios"

const ProductHighlight = () => {
  const [ posts, setPosts ] = useState([{}])

  const getPosts = async () =>{
    const res = await axios.get('http://localhost:8888/products' , {
      params: {
        limit: 4
      },
    })

    setPosts(res.data.results)
  }
  
  useEffect(() =>{
    getPosts()
  },[])



  return (
    <section className="flex flex-col h-screen items-center mt-20 px-10 gap-6">
      <SectionHeader 
        title={<h1>Here is People’s <span className="text-amber-800">Favorite</span></h1>} 
        text="Let’s choose and have a bit taste of people’s favorite. It might be yours too!"
      />
      <div className="h-full overflow-scroll md:overflow-visible bg-gray-200 md:bg-white md:px-0">
        <div className="flex flex-col flex-1 md:flex-row mt-14 gap-5">
          {posts.map((product) => (
            <ProductCard
            key={product.id}
            id={product.id}
            image={product.image}
            productName={product.productName}
            description={product.description}
            price={product.price}
          />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductHighlight
