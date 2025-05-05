import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../../components/Footer";
import ImageProduct from "../../components/ImageProduct";
import SmallImg1 from "../../assets/img/coffee-2.png";
import SmallImg2 from "../../assets/img/coffee-3.png";
import SmallImg3 from "../../assets/img/coffee-4.png";
import ProductRec from "../../components/ProductRec";
import ProductDetailForm from "../../components/ProductDetailForm";

interface Product {
  image: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  isRecommended: boolean;
}

const DetailProduct = () => {
  const productImages = {
    small: [SmallImg1, SmallImg2, SmallImg3],
  };

  const { uuid } = useParams<{ uuid: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const getPost = async (uuid: string) => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}/products/${uuid}`
        );
        if (res.data && res.data.results && res.data.results.length > 0) {
          setProduct(res.data.results[0]);
        } else {
          console.error("Invalid API response structure:", res.data);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    if (uuid) {
      getPost(uuid);
    } else {
      console.error("UUID is undefined");
    }
  }, [uuid]);

  return (
    <>
      <div className="block md:flex mx-8 md:mx-16 lg:mx-32 my-8 md:my-16 lg:my-32 h-auto gap-5">
        {product && (
          <>
            <ImageProduct
              smallImages={{ small: productImages.small }}
              image={product.image}
            />
            <ProductDetailForm
              productId={uuid as string}
              isFlashSale={true}
              name={product.name}
              desc={product.description}
              price={product.price}
              ratingProduct={product.rating}
              isRecommended={product.isRecommended}
            />
          </>
        )}
      </div>
      <div className="flex flex-col h-auto mx-8 md:mx-16 lg:mx-32 gap-6">
        <div className="flex w-full">
          <h1 className="text-2xl md:text-4xl lg:text-5xl tracking-tighter">
            Recommendation <span className="text-amber-800">For You</span>
          </h1>
        </div>
        <div className="flex flex-col gap-6 justify-center mb-8">
          <ProductRec />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DetailProduct;
