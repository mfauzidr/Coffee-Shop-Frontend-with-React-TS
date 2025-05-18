import FeatherIcon from "feather-icons-react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useStoreSelector } from "../../redux/hooks";
import { useEffect, useState } from "react";
import {
  createProduct,
  deleteProduct,
  fetchProductDetail,
  fetchProducts,
  updateProduct,
} from "../../redux/slices/products";
import Filter from "../../components/admins/FilterModal";
import ProductList from "../../components/admins/ProductList";
import CreateProduct from "../../components/admins/CreateProduct";
import Swal from "sweetalert2";
import img from "../../assets/img/no-image.webp";
import { Option } from "../../components/RadioGroup";
import EditProduct from "../../components/admins/EditProduct";

interface ProductFilters {
  search: string;
  category: string;
  sortBy: string;
}

interface IProductBody {
  id?: number;
  name?: string;
  image?: string;
  price?: string;
  description?: string;
  categoryId?: string;
  sizeId?: string;
}

const Products = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, dataCount, pageInfo, isLoading, isRejected, error } =
    useStoreSelector((state: RootState) => state.products);
  const [filters, setFilters] = useState<ProductFilters>({
    search: "",
    category: "",
    sortBy: "",
  });
  const { detailProduct } = useStoreSelector(
    (state: RootState) => state.products
  );

  const currentPage = pageInfo?.currentPage || 1;
  const [form, setForm] = useState<IProductBody>();

  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [showCreateProduct, setShowCreateProduct] = useState<boolean>(false);
  const [showEditProduct, setShowEditProduct] = useState<boolean>(false);
  const [changedImage, setSelectedImage] = useState<File | null>(null);
  const [, setSelectedSize] = useState<Option>();
  const [, setSelectedCategory] = useState<Option>();

  const uuid = detailProduct.uuid;

  useEffect(() => {
    dispatch(
      fetchProducts({ page: currentPage, limit: 6, filters, currentPage })
    );
  }, [dispatch, filters, currentPage]);

  const handlePageChange = (page: string | number) => {
    dispatch(fetchProducts({ page, limit: 6, filters, currentPage }));
    window.scrollTo({ top: 650, behavior: "smooth" });
  };

  const handleApply = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      if (form?.name) formData.append("name", form.name);
      if (form?.price) formData.append("price", form.price);
      if (form?.description) formData.append("description", form.description);
      if (form?.categoryId) formData.append("categoryId", form.categoryId);
      if (form?.sizeId) formData.append("sizeId", form.sizeId);
      if (changedImage) formData.append("image", changedImage);

      if (showCreateProduct === true) {
        await dispatch(createProduct({ formData })).unwrap();
      } else if (showEditProduct === true) {
        await dispatch(updateProduct({ uuid, formData })).unwrap();
      }

      Swal.fire({
        title: "Success!",
        text: showCreateProduct
          ? "Product successfully created."
          : "Product successfully updated.",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
        position: "top-end",
        customClass: {
          popup:
            "border-solid border-5 border-primary text-sm rounded-lg shadow-lg mt-8 tbt:mt-16",
        },
        toast: true,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire({
        title: "Failed!",
        text: showCreateProduct
          ? "Create Product Failed!"
          : "Update Product Failed",
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
    } finally {
      setForm({});
      setShowCreateProduct(false);
      setShowEditProduct(false);
      setSelectedImage(null);
    }
  };

  const handleApplyFilters = (newFilters: {
    category: string;
    sortBy: string;
    priceRange: [number, number];
  }) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
      search: prevFilters.search,
    }));
    setShowFilter(false);
  };

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setForm((form) => {
      return {
        ...form,
        [e.target.name]: e.target.value,
      };
    });
  };
  console.log("From: ", form);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const handleEditClick = async (uuid: string | undefined) => {
    if (!uuid) return;

    try {
      await dispatch(fetchProductDetail({ uuid })).unwrap();
      setShowEditProduct(true);
    } catch (error) {
      console.error("Failed to fetch product detail:", error);
      Swal.fire("Failed to fetch product details", "", "error");
    }
  };
  const handleDeleteClick = async (uuid: string | undefined) => {
    if (!uuid) return;

    try {
      await dispatch(deleteProduct({ uuid })).unwrap();
    } catch (error) {
      console.error("Failed to delete product ", error);
      Swal.fire("Failed to delete product ", "", "error");
    } finally {
      dispatch(
        fetchProducts({ page: currentPage, limit: 6, filters, currentPage })
      );
      setForm({});
      setShowCreateProduct(false);
      setShowEditProduct(false);
      setSelectedImage(null);
    }
  };

  return (
    <div>
      <div className="relative">
        <div className="flex flex-col gap-6 p-8 w-full">
          <div className="flex justify-between items-start w-full h-full">
            <div className="flex flex-col gap-6">
              <h1 className="text-3xl font-semibold">Product List</h1>
              <button
                onClick={() => setShowCreateProduct(true)}
                className="flex items-center gap-1 justify-center w-32 h-10 border border-amber-500 rounded-md bg-amber-500 font-semibold text-sm"
              >
                <FeatherIcon icon="plus" className="h-4 w-4" />
                Add Product
              </button>
            </div>

            <div className="flex flex-col gap-1 mt-9">
              <label className="text-sm text-slate-500" htmlFor="search">
                Search Product
              </label>
              <div className="flex items-center gap-2">
                <div className="relative w-80">
                  <input
                    className="h-10 w-full rounded border pr-10 pl-4 text-sm text-black focus:outline-none focus:ring-0"
                    id="search"
                    type="text"
                    placeholder="Enter Product Name"
                    onChange={(e) =>
                      setFilters({ ...filters, search: e.target.value })
                    }
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center text-slate-500">
                    <FeatherIcon icon="search" className="w-4 h-4" />
                  </div>
                </div>

                <button
                  onClick={() => setShowFilter(true)}
                  className="flex items-center gap-1 h-10 px-4 rounded bg-amber-500 text-black font-medium text-sm"
                >
                  <FeatherIcon icon="filter" className="w-4 h-4" />
                  Filter
                </button>
              </div>
            </div>
          </div>
          {isLoading && <p>Loading...</p>}
          {isRejected && (
            <p className="text-red-500">{error || "An error occurred."}</p>
          )}
          {!isLoading && !isRejected && products.length > 0 && (
            <ProductList
              products={products}
              dataCount={dataCount}
              pageInfo={pageInfo}
              handlePageChange={handlePageChange}
              onEditClick={handleEditClick}
              onDeleteClick={handleDeleteClick}
            />
          )}
        </div>
      </div>
      {showFilter && (
        <div
          className="absolute inset-0 h-full z-30 flex justify-end bg-black bg-opacity-30"
          onClick={() => setShowFilter(false)}
        >
          <div
            className="bg-white w-5/12 h-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <Filter onApplyFilters={handleApplyFilters} />
          </div>
        </div>
      )}
      {showCreateProduct && (
        <div
          className="absolute inset-0 h-auto z-30 flex justify-end bg-black bg-opacity-30"
          onClick={() => {
            setShowEditProduct(false);
            setForm({});
          }}
        >
          <div
            className="bg-white w-5/12 h-full p-6 overflow-scroll no-scrollbar pb-20"
            onClick={(e) => e.stopPropagation()}
          >
            <CreateProduct
              name="name"
              price="price"
              description="description"
              image={changedImage ? URL.createObjectURL(changedImage) : img}
              onSelectSize={(option) => {
                setSelectedSize(option);
                setForm((prev) => ({ ...prev, sizeId: String(option.id) }));
              }}
              onSelectCategory={(option) => {
                setSelectedCategory(option);
                setForm((prev) => ({ ...prev, categoryId: String(option.id) }));
              }}
              onImageChange={handleImageChange}
              onChange={handleInputChange}
              handleSubmit={(e) => handleApply(e)}
            />
          </div>
        </div>
      )}
      {showEditProduct && (
        <div
          className="absolute inset-0 h-auto z-30 flex justify-end bg-black bg-opacity-30"
          onClick={() => {
            setShowEditProduct(false);
            setForm({});
          }}
        >
          <div
            className="bg-white w-5/12 h-full p-6 overflow-scroll no-scrollbar pb-20"
            onClick={(e) => e.stopPropagation()}
          >
            <EditProduct
              detailProduct={detailProduct}
              name="name"
              price="price"
              description="description"
              image={
                changedImage
                  ? URL.createObjectURL(changedImage)
                  : detailProduct.image || img
              }
              onSelectSize={(option) => {
                setSelectedSize(option);
                setForm((prev) => ({ ...prev, sizeId: String(option.id) }));
              }}
              onSelectCategory={(option) => {
                setSelectedCategory(option);
                setForm((prev) => ({ ...prev, categoryId: String(option.id) }));
              }}
              onImageChange={handleImageChange}
              onChange={handleInputChange}
              handleSubmit={(e) => handleApply(e)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
