import { useEffect, useState } from "react";
import { ApplyButton } from "./Buttons";
import Slider from "react-slider";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { fetchProducts } from "../redux/slices/products";
import axios from "axios";

interface CheckboxFilterProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

interface RadioFilterProps {
  label: string;
  checked: boolean;
  onChange: () => void;
  name: string;
  value: string;
}

interface Categories {
  id: number;
  name: string;
}

const CheckboxFilter = ({ label, checked, onChange }: CheckboxFilterProps) => {
  return (
    <li className="flex gap-2.5 items-center">
      <div className="relative flex items-center">
        <input
          className="h-6 w-6 rounded-lg appearance-none border-2 checked:bg-amber-500 checkbox-custom"
          type="checkbox"
          checked={checked}
          onChange={onChange}
        />
      </div>
      {label}
    </li>
  );
};

const RadioFilter = ({
  label,
  checked,
  onChange,
  name,
  value,
}: RadioFilterProps) => {
  return (
    <li className="flex gap-2.5 items-center">
      <div className="relative flex items-center">
        <input
          className="h-6 w-6 rounded-lg appearance-none border-2 checked:bg-amber-500 checkbox-custom"
          type="radio"
          id={value}
          checked={checked}
          onChange={onChange}
          name={name}
          value={value}
        />
        <label htmlFor={value} className="ml-3 ">
          {label}
        </label>
      </div>
    </li>
  );
};

const PriceRangeSlider = ({
  values,
  onChange,
}: {
  values: [number, number];
  onChange: (values: [number, number]) => void;
}) => {
  const minPrice = 1000;
  const maxPrice = 50000;

  return (
    <div>
      <Slider
        className="slider"
        thumbClassName="thumb"
        trackClassName="track"
        value={values}
        min={minPrice}
        max={maxPrice}
        onChange={onChange}
      />
      <div className="flex justify-between mt-3 text-sm">
        <span>Min: {values[0]}</span>
        <span>Max: {values[1]}</span>
      </div>
    </div>
  );
};

interface ListFilterProps {
  id: string;
  items: { label: string; checked: boolean; onChange: () => void }[];
}

const ListFilter = ({ id, items }: ListFilterProps) => {
  return (
    <ul id={id} className="flex flex-col gap-2 md:gap-8">
      {items.map((item, index) => (
        <CheckboxFilter
          key={index}
          label={item.label}
          checked={item.checked}
          onChange={item.onChange}
        />
      ))}
    </ul>
  );
};

interface FilterModalProps {
  onReset: () => void;
  onApplyFilters: (filters: {
    search: string;
    category: string;
    sortBy: string;
    priceRange: [number, number];
  }) => void;
}

const FilterModal = ({ onReset, onApplyFilters }: FilterModalProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [categories, setCategories] = useState<Categories[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([1000, 50000]);

  useEffect(() => {
    const getCategories = async () => {
      const url = `${import.meta.env.VITE_REACT_APP_API_URL}/categories/`;
      const res = await axios.get(url);
      setCategories(res.data.results);
    };
    getCategories();
  }, []);

  const categoryItems = categories.map((category) => ({
    id: category.id,
    label: category.name,
    checked: selectedCategories.includes(category.name),
    onChange: () => handleCategoryChange(category.name),
  }));

  const sortByItems: {
    label: string;
    checked: boolean;
    onChange: () => void;
    value: string;
  }[] = [
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

  const handleCategoryChange = (name: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(name)) {
        return prev.filter((categoryName) => categoryName !== name);
      } else {
        return [...prev, name];
      }
    });
  };

  const handleApply = () => {
    if (sortBy === "Price-ASC") {
      setSortBy("Price-DESC");
    } else if (sortBy === "Price-DESC") {
      setSortBy("Price-ASC");
    }
    const categoryString = selectedCategories.join(",");

    const filters = {
      search,
      category: categoryString,
      sortBy,
      priceRange,
    };

    onApplyFilters(filters);
    dispatch(fetchProducts({ currentPage: 1, filters }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex-1 bg-white border-4 border-amber-500 rounded-3xl max-h-[650px] p-8 gap-y-4 text-black text-sm">
      <form className="flex flex-col gap-3" action="">
        <div className="flex justify-between">
          <div>Filter</div>
          <button
            className="hover:text-amber-500"
            type="reset"
            onClick={onReset}
          >
            Reset Filter
          </button>
        </div>
        <label className="font-bold" htmlFor="search">
          Search
        </label>
        <input
          className="h-10 rounded p-5 text-black text-sm border"
          id="search"
          type="text"
          placeholder="Search here"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <label className="font-bold" htmlFor="category">
          Category
        </label>
        <ListFilter id="category" items={categoryItems} />
        <label className="font-bold" htmlFor="sort-by">
          Sort By
        </label>
        <ul className="flex flex-col gap-2">
          {sortByItems.map((item, index) => (
            <RadioFilter
              key={index}
              label={item.label}
              checked={item.checked}
              onChange={item.onChange}
              name="sortBy"
              value={item.value}
            />
          ))}
        </ul>
        <div className="">
          <label className="font-bold">Range Price</label>
          <PriceRangeSlider values={priceRange} onChange={setPriceRange} />
        </div>
        <ApplyButton
          buttonName="Apply"
          type="button"
          size="py-2"
          link="#"
          onClick={handleApply}
        />
      </form>
    </div>
  );
};

export default FilterModal;
