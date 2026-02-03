import React, { useState } from 'react';
import DropdownOption from './DropdownOption';
import { toTitleCase } from "../utils/utils"

export default function Dropdown({ filterName, filterOptions }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    if (filterOptions) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={toggleDropdown}
          className="inline-flex justify-center w-full rounded-md
                    shadow-sm px-4 py-2 bg-white
                    text-sm font-medium text-gray-700 hover:bg-gray-50
                    focus:outline-none"
        >
          {filterName}
          <svg
            className="ml-2 -mr-1 h-5 w-5"
            xmlns="https://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-white focus:outline-none z-999"
          role="menu"
        >
          <div className="py-1" role="none">
            {
              Object.entries(filterOptions).map(([optionName, optionValue]) => <DropdownOption optionName={toTitleCase(optionName)} optionValue={optionValue} />)
            }
          </div>
        </div>
      )}
    </div>
  );
};
