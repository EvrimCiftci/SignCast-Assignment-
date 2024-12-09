import React from "react";

const ScreenDimensions = ({ configuration, setConfiguration, screenData }) => {
  // Define realistic limits
  const MIN_DIMENSION = 0; // Minimum INCH
  const MAX_DIMENSION = 115; // Maximum INCH for a screen is 115

  
  const handleInputChange = (field, value) => {
    const parsedValue = parseFloat(value) || 0; // Default to 0 if input is empty
    const clampedValue = Math.min(Math.max(parsedValue, MIN_DIMENSION), MAX_DIMENSION); // Clamp the value

    setConfiguration((prev) => ({
      ...prev,
      [field]: clampedValue, // Save value directly in inches
    }));
  };

  return (
    <div className="border-2 flex flex-col bg-white border-gray-300 w-5/12 h-full p-4 rounded-lg shadow-lg overflow-hidden">
      <h2 className="text-sm font-bold mb-4 md:text-2xl">Screen Dimensions</h2>

      {/* Height Input */}
      <div className="flex flex-wrap border-2 border-gray-300 h-16 text-center rounded-sm">
        <label
          htmlFor="Height"
          className="w-full h-1/2 pt-4 font-semibold bg-gray-200 md:w-1/2 md:h-full text-sm md:text-md mb-2"
        >
          Height (inches)
        </label>
        <input
          type="number"
          id="Height"
          className="w-full h-1/2 md:h-full md:w-1/2 focus:outline-none p-2"
          min={MIN_DIMENSION}
          max={MAX_DIMENSION}
          value={configuration.height || screenData?.height || 0}
          onChange={(e) => handleInputChange("height", e.target.value)}
        />
      </div>

      {/* Width Input */}
      <div className="flex flex-wrap border-2 border-gray-300 h-16 mt-2 text-center rounded-sm">
        <label
          htmlFor="Width"
          className="w-full h-1/2 pt-4 font-semibold bg-gray-200 md:w-1/2 md:h-full text-sm md:text-md mb-2"
        >
          Width (inches)
        </label>
        <input
          type="number"
          id="Width"
          className="w-full h-1/2 md:h-full md:w-1/2 focus:outline-none p-2"
          min={MIN_DIMENSION}
          max={MAX_DIMENSION}
          value={configuration.width || screenData?.width || 0}
          onChange={(e) => handleInputChange("width", e.target.value)}
        />
      </div>

      {/* Depth Input */}
      <div className="flex flex-wrap border-2 border-gray-300 h-16 mt-2 text-center rounded-sm">
        <label
          htmlFor="Depth"
          className="w-full h-1/2 pt-4 font-semibold bg-gray-200 md:w-1/2 md:h-full text-sm md:text-md mb-2"
        >
          Depth (inches)
        </label>
        <input
          type="number"
          id="Depth"
          className="w-full h-1/2 md:h-full md:w-1/2 focus:outline-none p-2"
          min={MIN_DIMENSION}
          max={MAX_DIMENSION}
          value={configuration.depth || 0}
          onChange={(e) => handleInputChange("depth", e.target.value)}
        />
      </div>
    </div>
  );
};

export default ScreenDimensions;
