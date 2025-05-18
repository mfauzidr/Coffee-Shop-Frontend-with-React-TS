import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import ImageProduct from "../../components/ImageProduct";
import SmallImg1 from "../../assets/img/coffee-2.webp";
import SmallImg2 from "../../assets/img/coffee-3.webp";
import SmallImg3 from "../../assets/img/coffee-4.webp";
import ProductRec from "../../components/ProductRec";
import ProductDetailForm from "../../components/ProductDetailForm";
import { useStoreDispatch, useStoreSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { fetchProductDetail } from "../../redux/slices/products";

const DetailProduct = () => {
  const productImages = {
    small: [SmallImg1, SmallImg2, SmallImg3],
  };

  const { uuid } = useParams<{ uuid: string }>();
  console.log(uuid);
  const dispatch = useStoreDispatch();
  const { detailProduct } = useStoreSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    if (uuid) {
      dispatch(fetchProductDetail({ uuid }));
    } else {
      console.error("UUID is undefined");
    }
  }, [uuid, dispatch]);

  return (
    <>
      <div className="block md:flex mx-8 md:mx-16 lg:mx-32 my-8 md:my-16 lg:my-32 h-auto gap-5">
        {detailProduct && (
          <>
            <ImageProduct
              smallImages={{ small: productImages.small }}
              image={detailProduct.image}
            />
            <ProductDetailForm
              productId={uuid as string}
              isFlashSale={true}
              name={detailProduct.productName}
              desc={detailProduct.description}
              price={detailProduct.price}
              ratingProduct={detailProduct.rating || undefined}
              isRecommended={detailProduct.isRecommended || true}
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
