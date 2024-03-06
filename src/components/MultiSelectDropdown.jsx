import React, { useState } from 'react';

const MultiSelectDropdown = ({ AllBuyers }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleCheckboxChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((selectedOption) => selectedOption !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-4">
      {/* <label className="block text-sm font-medium text-gray-700">Select Order By</label> */}
      <div className="">
       
        <div className="absolute top-full left-0 bg-white border border-gray-300 mt-2 rounded-md w-full p-2 overflow-y-auto max-h-40">
          {AllBuyers.map((ele) => (
            <label key={ele.name} className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-blue-500"
                onChange={() => handleCheckboxChange(ele.name)}
                checked={selectedOptions.includes(ele.name)}
              />
              <span className="ml-2">{ele.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Display selected options */}
      {/* <div className="mt-2">
        <strong>Selected Options:</strong>
        <ul>
          {selectedOptions.map((option) => (
            <li key={option}>{option}</li>
          ))}
        </ul>
      </div>*/}
    </div> 
  );
};

export default MultiSelectDropdown;
