import React, { useState } from "react";

const Notes = ({ onDimensionsChange }) => {
  const [dimensions, setDimensions] = useState({ height: 2, width: 2, depth: 2 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = Math.min(Math.max(0, Number(value)), 5); // Clamp between 0 and 5
    setDimensions((prev) => ({ ...prev, [name]: newValue }));
    onDimensionsChange({ ...dimensions, [name]: newValue });
  };

  return (
    <div className="h-full w-full mt-6 border-2 border-gray-300 p-4 flex flex-col rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Notes</h2>
      <div className="flex flex-row w-full">
        <div className="w-1/2">
          <h4 className="font-semibold mb-2 text-gray-600">Receptacle Box  (in inches):</h4>
          <p className="text-gray-500">Adjust dimensions for the Receptacle Box (0-5 inches).</p>
        </div>
        <div className="w-1/2">
          {["Height", "Width", "Depth"].map((dim) => (
            <div className="flex flex-row border-2 border-gray-300 h-10 rounded-sm mt-1" key={dim}>
              <label
                htmlFor={dim}
                className="w-1/2 h-full pt-1 roboto font-semibold bg-gray-200 text-center"
              >
                {dim}
              </label>
              <input
                type="number"
                name={dim.toLowerCase()}
                value={dimensions[dim.toLowerCase()]}
                onChange={handleChange}
                className="w-1/2 h-full focus:outline-none p-2 text-center"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notes;
