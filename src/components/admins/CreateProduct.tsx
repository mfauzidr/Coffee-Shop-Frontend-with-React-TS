import { useEffect, useState } from "react";
import { ApplyButton } from "../Buttons";
import { Option } from "../RadioGroup";
import axios from "axios";

interface CreateProductProps {
  name: string;
  image: string;
  price: string;
  description: string;
  onChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  onSelectSize: (selectedOption: Option) => void;
  onSelectCategory: (selectedOption: Option) => void;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const CreateProduct = ({
  image,
  onChange,
  onSelectSize,
  onSelectCategory,
  onImageChange,
  handleSubmit,
}: CreateProductProps) => {
  const [sizes, setSizes] = useState<Option[]>([]);
  const [categories, setCategories] = useState<Option[]>([]);
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
    const getCategories = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}/categories`
        );
        const categoriesOptions = res.data.results.map(
          (categories: {
            id: number;
            name: string;
            additionalPrice: number;
          }) => ({
            id: categories.id,
            value: categories.name,
            label: categories.name,
            additionalPrice: categories.additionalPrice,
            required: true,
          })
        );

        setCategories(categoriesOptions);
      } catch (error) {
        console.error("Error fetching categoriess:", error);
      }
    };
    getCategories();
  }, []);

  return (
    <form className="flex flex-col" action="" onSubmit={handleSubmit}>
      <div className="flex justify-between mb-6 text-lg">
        <label>Add Product</label>
      </div>
      <label className="font-bold text-sm mb-2" htmlFor="image">
        Photo Product
      </label>
      <div className="flex w-16 h-16 rounded-xl border bg-white overflow-hidden">
        <img
          className="object-cover w-full h-full text-sm"
          src={image}
          alt="Profile"
        />
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={onImageChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            id="file-upload-input"
          />
          <label htmlFor="file-upload-input">
            <button
              type="button"
              className={`flex-1 p-2 border border-amber-500 bg-amber-500 rounded font-semibold text-black text-center text-xs`}
            >
              Upload Photo
            </button>
          </label>
        </div>
      </div>
      <label className="font-bold text-sm mb-2 mt-4" htmlFor="name">
        Product Name
      </label>
      <input
        className="border rounded-lg w-full h-10 p-3 outline-none text-xs"
        id="name"
        name="name"
        type="text"
        placeholder="Enter Product Name"
        onChange={onChange}
      />
      <label className="font-bold text-sm mb-2 mt-4" htmlFor="price">
        Price
      </label>
      <input
        className="border rounded-lg w-full h-10 p-3 outline-none text-xs
             [&::-webkit-outer-spin-button]:appearance-none
             [&::-webkit-inner-spin-button]:appearance-none
             [appearance:textfield]"
        id="price"
        name="price"
        type="number"
        placeholder="Enter Product Price"
        min={0}
        onChange={onChange}
      />
      <label className="font-bold text-sm mb-2 mt-4" htmlFor="description">
        Description
      </label>
      <textarea
        className="border rounded-lg w-full h-24 p-3 outline-none text-xs resize-none"
        id="description"
        name="description"
        placeholder="Enter Product Description"
        onChange={onChange}
      />

      <fieldset className="flex flex-col">
        <label className="font-bold text-sm mb-2 mt-4" htmlFor="sizeId">
          Size
        </label>
        <ul className="flex text-sm w-auto gap-3" id="sizeId">
          {sizes?.map((option, index) => (
            <li key={option.value} className="flex w-20 h-10">
              <input
                type="radio"
                className="hidden peer"
                name="sizeId"
                id={`sizeId-${index}`}
                value={option.value}
                required={option.required}
                onChange={() => onSelectSize?.(option)}
              />
              <label
                htmlFor={`sizeId-${index}`}
                className="flex flex-col w-full h-18 justify-center items-center border border-gray-300 bg-white active:border-amber-500 peer-checked:bg-amber-300 cursor-pointer hover:bg-amber-300 peer-checked:border-amber-500 rounded-md"
              >
                {option.label}
              </label>
            </li>
          ))}
        </ul>
      </fieldset>
      <fieldset className="flex flex-col mb-4">
        <label className="font-bold text-sm mb-2 mt-4" htmlFor="categoryId">
          Category
        </label>
        <ul className="flex text-sm w-auto gap-3" id="categoryId">
          {categories?.map((option, index) => (
            <li key={option.value} className="flex w-20 h-10">
              <input
                type="radio"
                className="hidden peer"
                name="categoryId"
                id={`categoryId-${index}`}
                value={option.value}
                required={option.required}
                onChange={() => onSelectCategory?.(option)}
              />
              <label
                htmlFor={`categoryId-${index}`}
                className="flex flex-col w-full h-18 justify-center items-center text-center border border-gray-300 bg-white active:border-amber-500 peer-checked:bg-amber-300 cursor-pointer hover:bg-amber-300 peer-checked:border-amber-500 rounded-md"
              >
                {option.label}
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      <ApplyButton buttonName="Save Product" type="submit" size="text-sm" />
    </form>
  );
};

export default CreateProduct;
