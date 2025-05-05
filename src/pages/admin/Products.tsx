import FeatherIcon from "feather-icons-react";

const Products = () => {
  return (
    <div className="flex flex-col gap-6 p-8 w-full">
      <div className="flex justify-between items-start w-full h-full">
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-semibold">Product List</h1>
          <button className="flex items-center gap-1 justify-center w-32 h-10 border border-amber-500 rounded-md bg-amber-500 font-semibold text-sm">
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
              />
              <div className="absolute inset-y-0 right-3 flex items-center text-slate-500">
                <FeatherIcon icon="search" className="w-4 h-4" />
              </div>
            </div>

            <button className="flex items-center gap-1 h-10 px-4 rounded bg-amber-500 text-black font-medium text-sm">
              <FeatherIcon icon="filter" className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>
      </div>

      <div className="flex w-full border border-slate-300 rounded-lg">
        Content
      </div>
    </div>
  );
};

export default Products;
