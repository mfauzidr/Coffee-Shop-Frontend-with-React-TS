import Slider from "react-slider";
import { ApplyButton } from "./Buttons";

interface CheckboxFilterProps {
  label: string;
  checked: boolean;
  onChange: () => void;
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

interface ListFilterProps {
  id: string;
  items: { label: string; checked: boolean; onChange: () => void }[];
}

const ListFilter = ({ id, items }: ListFilterProps) => {
  return (
    <ul id={id} className="flex flex-col gap-3 lg:gap-6 ">
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

interface RadioFilterProps {
  label: string;
  checked: boolean;
  onChange: () => void;
  name: string;
  value: string;
}

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

interface FilterFormProps {
  search: string;
  setSearch: (value: string) => void;
  categoryItems: { label: string; checked: boolean; onChange: () => void }[];
  sortByItems: {
    label: string;
    checked: boolean;
    onChange: () => void;
    value: string;
  }[];
  priceRange: [number, number];
  setPriceRange: (values: [number, number]) => void;
  onReset: () => void;
  onApply: () => void;
}

export const FilterForm = ({
  search,
  setSearch,
  categoryItems,
  sortByItems,
  priceRange,
  setPriceRange,
  onReset,
  onApply,
}: FilterFormProps) => (
  <form className="flex flex-col gap-3 lg:gap-6">
    <div className="flex justify-between">
      <div>Filter</div>
      <button type="reset" onClick={onReset}>
        Reset Filter
      </button>
    </div>

    <label className="font-bold">Search</label>
    <input
      className="h-10 rounded p-5 text-black text-sm border"
      type="text"
      placeholder="Search here"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />

    <label className="font-bold">Category</label>
    <ListFilter id="category" items={categoryItems} />

    <label className="font-bold">Sort By</label>
    <ul className="flex flex-col gap-3 lg:gap-6">
      {sortByItems.map((item, idx) => (
        <RadioFilter key={idx} {...item} name="sortBy" />
      ))}
    </ul>

    <label className="font-bold">Range Price</label>
    <PriceRangeSlider values={priceRange} onChange={setPriceRange} />

    <ApplyButton
      buttonName="Apply"
      type="button"
      size="py-2"
      link="#"
      onClick={onApply}
    />
  </form>
);
