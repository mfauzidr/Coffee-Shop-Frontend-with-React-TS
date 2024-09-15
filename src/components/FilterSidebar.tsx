import { useEffect, useState } from 'react';
import { ApplyButton } from './Buttons';
import Slider from 'react-slider';
import axios from 'axios';

interface CheckboxFilterProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

interface Categories {
  id: number;
  name: string;
}

interface FilterSidebarProps {
  onApplyFilters: (filters: {
    search: string;
    category: string[];
    sortBy: string;
    priceRange: [number, number];
  }) => void;
}

const CheckboxFilter = ({ label, checked, onChange }: CheckboxFilterProps) => {
  return (
    <li className="flex gap-2.5 items-center">
      <div className="relative">
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

const PriceRangeSlider = ({ values, onChange }: { values: [number, number]; onChange: (values: [number, number]) => void }) => {
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
      <div className='flex justify-between mt-3 text-sm'>
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
    <ul id={id} className="flex flex-col gap-8">
      {items.map((item, index) => (
        <CheckboxFilter key={index} label={item.label} checked={item.checked} onChange={item.onChange} />
      ))}
    </ul>
  );
};

const FilterSidebar = ({ onApplyFilters }: FilterSidebarProps) => {
  const [categories, setCategories] = useState<Categories[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('');
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
    checked: selectedCategories.includes(category.name), // Check by name
    onChange: () => handleCategoryChange(category.name), // Pass name here
  }));

  const sortByItems = [
    { label: 'Alphabet', checked: sortBy === 'Alphabet', onChange: () => setSortBy('Alphabet') },
    { label: 'Latest', checked: sortBy === 'Latest', onChange: () => setSortBy('Latest') },
    { label: 'Oldest', checked: sortBy === 'Oldest', onChange: () => setSortBy('Oldest') },
    { label: 'Price', checked: sortBy === 'Price', onChange: () => setSortBy('Price') },
  ];

  const handleCategoryChange = (name: string) => {
    setSelectedCategories((prev) =>
      prev.includes(name) ? prev.filter((categoryName) => categoryName !== name) : [...prev, name]
    );
  };

  const handleApply = () => {
    const filters = {
      search,
      category: selectedCategories,
      sortBy,
      priceRange,
    };
    onApplyFilters(filters);
  };

  const handleReset = () => {
    setSearch('');
    setSelectedCategories([]);
    setSortBy('');
    setPriceRange([1000, 50000]);
    handleApply()
  };

  return (
    <aside className="hidden lg:flex flex-col bg-black rounded-3xl h-fit p-8 gap-y-6">
      <form className="flex flex-col gap-6" action="">
        <div className="flex justify-between">
          <div>Filter</div>
          <button type="reset" onClick={handleReset}>Reset Filter</button>
        </div>
        <label className="font-bold" htmlFor="search">Search</label>
        <input
          className="h-10 rounded p-5 text-black text-sm"
          id="search"
          type="text"
          placeholder="Search here"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <label className="font-bold" htmlFor="category">Category</label>
        <ListFilter id="category" items={categoryItems} />
        <label className="font-bold" htmlFor="sort-by">Sort By</label>
        <ListFilter id="sortBy" items={sortByItems} />
        <div className="mt-4">
          <label className="font-bold">Range Price</label>
          <PriceRangeSlider values={priceRange} onChange={setPriceRange} />
        </div>
        <ApplyButton buttonName="Apply" type="button" size="py-2" link="#" onClick={handleApply} />
      </form>
    </aside>
  );
};

export default FilterSidebar;
