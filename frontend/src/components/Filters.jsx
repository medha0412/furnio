import React from 'react';

const Filters = ({
  categories = [],
  materials = [],
  selectedCategory,
  selectedMaterial,
  brand,
  minPrice,
  maxPrice,
  onSelectCategory,
  onSelectMaterial,
  onChangeBrand,
  onChangeMinPrice,
  onChangeMaxPrice,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 mb-4">
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-xs sm:text-sm text-gray-700 font-medium">Category:</span>
        <button
          className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm ${selectedCategory ? 'bg-gray-200' : 'bg-yellow-600 text-white'}`}
          onClick={() => onSelectCategory?.('')}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c}
            className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm ${selectedCategory === c ? 'bg-yellow-600 text-white' : 'bg-gray-200'}`}
            onClick={() => onSelectCategory?.(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-xs sm:text-sm text-gray-700 font-medium">Material:</span>
        <button
          className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm ${selectedMaterial ? 'bg-gray-200' : 'bg-yellow-600 text-white'}`}
          onClick={() => onSelectMaterial?.('')}
        >
          All
        </button>
        {materials.map((m) => (
          <button
            key={m}
            className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm ${selectedMaterial === m ? 'bg-yellow-600 text-white' : 'bg-gray-200'}`}
            onClick={() => onSelectMaterial?.(m)}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
        <input
          placeholder="Brand"
          className="border rounded px-2 py-1 text-xs sm:text-sm w-full sm:w-32"
          value={brand}
          onChange={(e) => onChangeBrand?.(e.target.value)}
        />
        <input
          placeholder="Min"
          type="number"
          className="border rounded px-2 py-1 w-full sm:w-20 text-xs sm:text-sm"
          value={minPrice}
          onChange={(e) => onChangeMinPrice?.(e.target.value)}
        />
        <input
          placeholder="Max"
          type="number"
          className="border rounded px-2 py-1 w-full sm:w-20 text-xs sm:text-sm"
          value={maxPrice}
          onChange={(e) => onChangeMaxPrice?.(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Filters;
