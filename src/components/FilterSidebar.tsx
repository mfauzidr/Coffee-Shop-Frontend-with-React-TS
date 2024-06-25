// import React from 'react'
import { Button } from './Buttons'

const CheckboxFilter = ({ label }) => {
    return (
      <li className="flex gap-2.5 items-center">
        <input
          className="h-6 w-6 rounded-lg appearance-none border-2 checked:bg-amber-500 checked:text-black"
          type="checkbox"
        />
        {label}
      </li>
    )
  }

const ListFilter = ({ id, items }) => {
    return (
      <ul id={id} className="flex flex-col gap-8">
        {items.map((item, index) => (
          <CheckboxFilter key={index} label={item.label} />
        ))}
      </ul>
    )
  }

const FilterSidebar = () => {
  const categoryItems = [
    { label: 'Favorite Product' },
    { label: 'Coffee' },
    { label: 'Non Coffee' },
    { label: 'Foods' },
    { label: 'Add-On' },
  ]

  const sortByItems = [
    { label: 'Buy 1 Get 1' },
    { label: 'Flash Sale' },
    { label: 'Birthday Package' },
    { label: 'Cheap' },
  ]

  return (
    <aside className="flex flex-col bg-black rounded-3xl h-fit p-8 gap-y-6">
      <form className="flex flex-col gap-6" action="">
        <div className="flex justify-between">
          <div>Filter</div>
          <button type='reset'>Reset Filter</button>
        </div>
        <label className="font-bold" htmlFor="search">Search</label>
        <input className="h-16 rounded p-5 text-black text-sm" id="search" type="text" placeholder="Search here"/>
        <label className="font-bold" htmlFor="category">Category</label>
        <ListFilter id="category" items={categoryItems} />
        <label className="font-bold" htmlFor="sort-by">Sort By</label>
        <ListFilter id="sort-by" items={sortByItems} />
        <div className="mt-4">
          <label className="font-bold">Range Price</label>
          <div className="flex items-center">
            <input type="range" className="w-1/2 appearance-none bg-gray-300 rounded cursor-pointer" id="range1" name="range1" min="0" max="100"/>
            <input type="range" className="w-1/2 appearance-none bg-gray-300 rounded cursor-pointer" id="range2" name="range2" min="0" max="100"/>
          </div>
        </div>
        <Button buttonName={"Apply"} type={'button'}/>
      </form>
    </aside>
  )
}

export default FilterSidebar
