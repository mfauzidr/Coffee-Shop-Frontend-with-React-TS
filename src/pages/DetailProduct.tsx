import Footer from "../components/Footer"
import ImageProduct from "../components/ImageProduct"
import Navbar from "../components/Navbar"
import SmallImg1 from '../assets/img/coffee-2.png'
import SmallImg2 from '../assets/img/coffee-3.png'
import SmallImg3 from '../assets/img/coffee-4.png'
import ProductRec from "../components/ProductRec"
import PagePagination from "../components/PagePagination"
import ProductDetailForm from "../components/ProductDetailForm"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

const DetailProduct = () => {
    const productImages = {
        small: [
            SmallImg1,
            SmallImg2,
            SmallImg3,
        ]
    }
    const {id} = useParams()
    const [product, setProduct] = useState({})
    
    const getPost = async () =>{
        const res = await axios.get(`http://localhost:8888/products/${id}`)
        console.log(res.data.results)
        setProduct(res.data.results)
    }

    useEffect(() =>{
        getPost(id)
    },[id])

    // const { isFlashSale=true, name, description, price, ratingProduct, isRecomendation } = productData[0]

    return(
        <>
        <Navbar bgColor='bg-black' />
        <div className="flex mx-32 my-32 h-auto gap-5">
            <ImageProduct smallImages={productImages} image={product.image} />
            <ProductDetailForm
                isFlashSale={true}
                name={product.name}
                desc={product.description}
                price={product.basePrice}
                ratingProduct={product.rating}
                isRecommended={product.isRecommended}
            />
        </div>
        <div className="flex flex-col h-auto mx-32 gap-6">
            <div className="flex">
                <h1 className="text-5xl tracking-tighter">Recommendation <span className="text-amber-800">For You</span></h1>
            </div>
            <div className="flex flex-col gap-6 justify-center mb-8">
                <ProductRec />
                <PagePagination />
            </div>
        </div>

        <Footer />
        </>
    )
}

export default DetailProduct