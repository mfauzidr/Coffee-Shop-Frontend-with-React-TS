// FilterSidebar.tsx
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { fetchProducts } from "../redux/slices/products";
import axios from "axios";
import { FilterForm } from "./FilterForm";
import { useMediaQuery } from "react-responsive";

interface FilterSidebarProps {
  showFilter: boolean;
  onClose: () => void;
  filters: {
    search: string;
    category: string;
    sortBy: string;
    priceRange: [number, number];
  };
}

interface Categories {
  id: number;
  name: string;
}
const FilterSidebar = ({
  showFilter,
  onClose,
  filters,
}: FilterSidebarProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [categories, setCategories] = useState<Categories[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([1000, 50000]);

  useEffect(() => {
    setSearch(filters.search);
    setSelectedCategories(filters.category ? filters.category.split(",") : []);
    setSortBy(filters.sortBy);
    setPriceRange(filters.priceRange);
  }, [filters]);

  const isDesktop = useMediaQuery({ minWidth: 1024 });

  useEffect(() => {
    const getCategories = async () => {
      const url = `${import.meta.env.VITE_REACT_APP_API_URL}/categories/`;
      const res = await axios.get(url);
      setCategories(res.data.results);
    };
    getCategories();
  }, []);

  const handleCategoryChange = (name: string) => {
    setSelectedCategories((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    );
  };

  const handleReset = () => {
    setSearch("");
    setSelectedCategories([]);
    setSortBy("");
    setPriceRange([1000, 50000]);
    dispatch(fetchProducts({ currentPage: 1, filters: {} }));
    if (!isDesktop) onClose();
  };

  const handleApply = () => {
    const filters = {
      search,
      category: selectedCategories.join(","),
      sortBy,
      priceRange,
    };
    dispatch(fetchProducts({ currentPage: 1, filters }));
    if (!isDesktop) onClose();
  };

  const categoryItems = categories.map((c) => ({
    label: c.name,
    checked: selectedCategories.includes(c.name),
    onChange: () => handleCategoryChange(c.name),
  }));

  const sortByItems = [
    {
      label: "Alphabet",
      checked: sortBy === "Alphabet",
      onChange: () => setSortBy("Alphabet"),
      value: "Alphabet",
    },
    {
      label: "Latest",
      checked: sortBy === "Latest",
      onChange: () => setSortBy("Latest"),
      value: "Latest",
    },
    {
      label: "Oldest",
      checked: sortBy === "Oldest",
      onChange: () => setSortBy("Oldest"),
      value: "Oldest",
    },
    {
      label: "Price",
      checked: sortBy === "Price-ASC" || sortBy === "Price-DESC",
      onChange: () =>
        setSortBy(sortBy === "Price-ASC" ? "Price-DESC" : "Price-ASC"),
      value: "Price",
    },
  ];

  return (
    <>
      {isDesktop && (
        <aside className="flex flex-col bg-black rounded-3xl h-fit p-8 gap-y-6 text-white w-80">
          <FilterForm
            search={search}
            setSearch={setSearch}
            categoryItems={categoryItems}
            sortByItems={sortByItems}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            onReset={handleReset}
            onApply={handleApply}
          />
        </aside>
      )}

      {!isDesktop && showFilter && (
        <div
          className="fixed inset-0 z-30 flex justify-center bg-black bg-opacity-30"
          onClick={onClose}
        >
          <div
            className="w-full h-fit mx-4 md:mx-12 mt-36 md:mt-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex-1 bg-white border-4 border-amber-500 rounded-3xl max-h-screen p-8 gap-y-4 text-black text-sm">
              <FilterForm
                search={search}
                setSearch={setSearch}
                categoryItems={categoryItems}
                sortByItems={sortByItems}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                onReset={handleReset}
                onApply={handleApply}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterSidebar;
