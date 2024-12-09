import React, { useState, useEffect } from "react";

const NicheDimensions = ({ onNicheChange, initialDimensions }) => {
  const [nicheWidth, setNicheWidth] = useState(initialDimensions?.nicheWidth || 0);
  const [nicheHeight, setNicheHeight] = useState(initialDimensions?.nicheHeight || 0);
  const [nicheDepth, setNicheDepth] = useState(initialDimensions?.nicheDepth || 0);

  // Update MainLayout's state whenever the input values change
  const updateDimensions = (dimension, value) => {
    if (dimension === "nicheWidth") {
      setNicheWidth(value);
    }
    if (dimension === "nicheHeight") {
      setNicheHeight(value);
    }
    if (dimension === "nicheDepth") {
      setNicheDepth(value);
    }
  };

  // Update parent state after the local state is set
  useEffect(() => {
    onNicheChange({ nicheWidth, nicheHeight, nicheDepth });
  }, [nicheWidth, nicheHeight, nicheDepth, onNicheChange]);

  return (
    <div className="border-2 flex flex-col bg-white border-gray-300 w-5/12 h-full p-4 rounded-lg shadow-lg">
      <h2 className="text-sm font-bold mb-4 md:text-2xl">Niche Dimensions</h2>
      
      {/* Height input */}
      <div className="flex flex-wrap border-2 border-gray-300 h-16 text-center rounded-sm">
        <label htmlFor="Height" className="w-full h-1/2 pt-4 roboto font-semibold bg-gray-200 md:w-1/2 md:h-full text-sm md:text-lg mb-2">
          Height
        </label>
        <input
          type="number"
          value={nicheHeight}
          onChange={(e) => updateDimensions("nicheHeight", Number(e.target.value))}
          className="w-full h-1/2 md:h-full md:w-1/2 focus:outline-none p-2"
        />
      </div>
      
      {/* Width input */}
      <div className="flex flex-wrap border-2 border-gray-300 h-16 mt-2 text-center rounded-sm">
        <label htmlFor="Width" className="w-full h-1/2 pt-4 roboto font-semibold bg-gray-200 md:w-1/2 md:h-full text-sm md:text-lg mb-2">
          Width
        </label>
        <input
          type="number"
          value={nicheWidth}
          onChange={(e) => updateDimensions("nicheWidth", Number(e.target.value))}
          className="w-full h-1/2 md:h-full md:w-1/2 focus:outline-none p-2"
        />
      </div>
      
      {/* Depth input */}
      <div className="flex flex-wrap border-2 border-gray-300 h-16 mt-2 text-center rounded-sm">
        <label htmlFor="Depth" className="w-full h-1/2 pt-4 roboto font-semibold bg-gray-200 md:w-1/2 md:h-full text-sm md:text-lg mb-2">
          Depth
        </label>
        <input
          type="number"
          value={nicheDepth}
          onChange={(e) => updateDimensions("nicheDepth", Number(e.target.value))}
          className="w-full h-1/2 md:h-full md:w-1/2 focus:outline-none p-2"
        />
      </div>
    </div>
  );
};

export default NicheDimensions;
