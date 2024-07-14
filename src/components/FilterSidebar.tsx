import React, { useState } from 'react';
import { Button } from './Buttons';
import Slider from 'react-slider'

interface CheckboxFilterProps {
  label: string;
}

const CheckboxFilter: React.FC<CheckboxFilterProps> = ({ label }) => {
  return (
    <li className="flex gap-2.5 items-center">
      <div className="relative">
        <input
          className="h-6 w-6 rounded-lg appearance-none border-2 checked:bg-amber-500 checkbox-custom"
          type="checkbox"
        />
      </div>
      {label}
    </li>
  );
};

const PriceRangeSlider: React.FC = () => {
  const minPrice = 1000
  const maxPrice = 50000

  const [values, setValues] = useState([minPrice, maxPrice])

  return (
    <>
      <Slider className={"slider"}
        onChange={setValues}
        value={values}
        min={minPrice}
        max={maxPrice}
      />

    </>
  )
}

interface ListFilterProps {
  id: string;
  items: { label: string }[];
}

const ListFilter: React.FC<ListFilterProps> = ({ id, items }) => {
  return (
    <ul id={id} className="flex flex-col gap-8">
      {items.map((item, index) => (
        <CheckboxFilter key={index} label={item.label} />
      ))}
    </ul>
  );
};

const FilterSidebar: React.FC = () => {
  const categoryItems = [
    { label: 'Favorite Product' },
    { label: 'Coffee' },
    { label: 'Non Coffee' },
    { label: 'Foods' },
    { label: 'Add-On' },
  ];

  const sortByItems = [
    { label: 'Buy 1 Get 1' },
    { label: 'Flash Sale' },
    { label: 'Birthday Package' },
    { label: 'Cheap' },
  ];

  return (
    <aside className="hidden lg:flex flex-col bg-black rounded-3xl h-fit p-8 gap-y-6">
      <form className="flex flex-col gap-6" action="">
        <div className="flex justify-between">
          <div>Filter</div>
          <button type="reset">Reset Filter</button>
        </div>
        <label className="font-bold" htmlFor="search">
          Search
        </label>
        <input className="h-10 rounded p-5 text-black text-sm" id="search" type="text" placeholder="Search here" />
        <label className="font-bold" htmlFor="category">
          Category
        </label>
        <ListFilter id="category" items={categoryItems} />
        <label className="font-bold" htmlFor="sort-by">
          Sort By
        </label>
        <ListFilter id="sort-by" items={sortByItems} />
        <div className="mt-4">
          <label className="font-bold">Range Price</label>
          <PriceRangeSlider />
        </div>
        <Button buttonName="Apply" type="button" size="py-2" link="#" />
      </form>
    </aside>
  );
};

export default FilterSidebar;
