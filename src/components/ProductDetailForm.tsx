import { useEffect, useState } from "react";
import RatingStar from "./RatingStar";
import { BuyButton } from "./Buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import RadioGroup from "./RadioGroup";
import axios from "axios";
import { addToCart } from "../redux/slices/cart";
import { useStoreSelector } from "../redux/hooks";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { Option } from "./RadioGroup";
import Swal from "sweetalert2";

interface ProductDetailFormProps {
  isFlashSale: boolean;
  name: string;
  price: number;
  ratingProduct?: number | undefined;
  isRecommended: boolean;
  desc: string;
  productId: string;
}

const ProductDetailForm = ({
  isFlashSale,
  name,
  price,
  ratingProduct,
  isRecommended,
  desc,
  productId,
}: ProductDetailFormProps) => {
  const [sizes, setSizes] = useState<Option[]>([]);
  const [variants, setVariants] = useState<Option[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useStoreSelector((state: RootState) => state.auth);
  const [uuid, setUuid] = useState<string>("");
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState<Option | undefined>(
    undefined
  );
  const [selectedVariant, setSelectedVariant] = useState<Option | undefined>(
    undefined
  );

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode<{ uuid: string }>(token);
      setUuid(decodedToken.uuid);
    }
  }, [token]);

  useEffect(() => {
    const getSizes = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}/size`
        );
        const sizeOptions = res.data.results.map(
          (size: { id: number; size: string; additionalPrice: number }) => ({
            id: size.id,
            value: size.size,
            label: size.size,
            additionalPrice: size.additionalPrice,
          })
        );

        setSizes(sizeOptions);
      } catch (error) {
        console.error("Error fetching sizes:", error);
      }
    };
    getSizes();
  }, []);

  useEffect(() => {
    const getVariants = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}/variant`
        );
        const variantOptions = res.data.results.map(
          (variant: { id: number; name: string; additionalPrice: number }) => ({
            id: variant.id,
            value: variant.name,
            label: variant.name,
            additionalPrice: variant.additionalPrice,
            required: true,
          })
        );

        setVariants(variantOptions);
      } catch (error) {
        console.error("Error fetching variants:", error);
      }
    };
    getVariants();
  }, []);

  const [quantity, setQuantity] = useState<number>(1);

  const decreaseBtn = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  const increaseBtn = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const discount = price / 2;

  const handleBuy = async (productId: string) => {
    if (!selectedSize || !selectedVariant) {
      Swal.fire({
        title: "Failed!",
        text: "Please select size and variant first.",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
        position: "top-end",
        customClass: {
          popup:
            "border-solid border-5 border-primary text-sm rounded-lg shadow-lg mt-8 tbt:mt-16",
        },
        toast: true,
      });
      return;
    }

    try {
      const userId = uuid;
      const sizeId = [selectedSize.id];
      const variantId = [selectedVariant.id];
      const qty = [quantity];

      await dispatch(
        addToCart({ userId, productId, sizeId, variantId, qty })
      ).unwrap();

      setTimeout(() => {
        navigate("/checkout-product");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    } catch (error) {
      Swal.fire({
        title: "Failed!",
        text: "Failed to add product to cart.",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
        position: "top-end",
        customClass: {
          popup:
            "border-solid border-5 border-primary text-sm rounded-lg shadow-lg mt-8 tbt:mt-16",
        },
        toast: true,
      });
    }
  };

  return (
    <form className="flex flex-col flex-1 w-full h-auto mt-5 md:mt-0">
      <div className="flex flex-col gap-1 md:gap-4">
        {isFlashSale && (
          <div className="bg-red-600 text-white text-xs md:text-lg px-2.5 py-1 rounded-3xl w-20 md:w-32">
            Flash Sale!
          </div>
        )}
        <h2 className="text-2xl md:text-5xl font-normal md:font-medium">
          {name}
        </h2>
        <div className="flex items-center text-lg md:text-2xl text-amber-500">
          {isFlashSale ? (
            <div>
              <span className="text-xs font-bold text-red-500 line-through">
                IDR {price?.toLocaleString("id")}
              </span>
              IDR {discount.toLocaleString("id")}
            </div>
          ) : (
            `Rp. ${price?.toLocaleString("id")} ,-`
          )}
        </div>
        <RatingStar rating={ratingProduct! | 0} />
        <div className="flex gap-2 md:gap-6 text-xs md:text-lg">
          <div>20+ Review</div>
          {isRecommended && (
            <div className="flex items-left border-l border-black">
              <div className="flex items-center ml-2 md:ml-6 gap-1 md:gap-2">
                Recommendation
                <FontAwesomeIcon
                  icon={faThumbsUp}
                  style={{ color: "#f59e0b" }}
                />
              </div>
            </div>
          )}
        </div>
        <div className="text-xs md:text-md">{desc}</div>
        <div className="flex items-center">
          <div className="flex items-center">
            <button
              type="button"
              className="flex items-center justify-center w-5 md:w-8 h-5 md:h-8 text-xs md:text-md bg-white rounded border border-amber-500 focus:outline-none disabled:bg-gray-300 disabled:border-gray-300"
              onClick={decreaseBtn}
              disabled={quantity < 2}
            >
              -
            </button>
            <input
              type="text"
              className="w-6 md:w-12 h-4 md:h-8 text-center border text-xs md:text-md"
              value={quantity}
              readOnly
            />
            <button
              type="button"
              className="flex items-center justify-center w-5 md:w-8 h-5 md:h-8 text-xs md:text-md bg-amber-500 rounded border border-amber-500 focus:outline-none"
              onClick={increaseBtn}
            >
              +
            </button>
          </div>
        </div>
        <RadioGroup
          groupName="size"
          label="Choose Size"
          options={sizes}
          onChange={(option) => setSelectedSize(option)}
        />
        <RadioGroup
          groupName="variant"
          label="Hot/Ice?"
          options={variants}
          onChange={(option) => setSelectedVariant(option)}
        />
      </div>
      <div className="block md:flex md:gap-x-7 md:mt-14">
        <div className="flex flex-1 justify-center items-center h-11 text-sm font-medium border border-amber-500 rounded-md mt-4 md:mt-0 bg-amber-500">
          <BuyButton onClick={() => handleBuy(productId)} />
        </div>
        {/**<label className="flex flex-1 justify-center items-center h-11 text-sm font-medium text-amber-500 border border-amber-500 rounded-md mt-4 md:mt-0 bg-white gap-2.5 cursor-pointer">
          <CartButton />
        </label>**/}
      </div>
    </form>
  );
};

export default ProductDetailForm;
