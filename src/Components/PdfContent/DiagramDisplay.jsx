import React, { useRef, useState, useEffect } from "react";

// DiagramDisplay component renders a dynamic diagram based on various configuration and dimension properties
const DiagramDisplay = ({ configuration, nicheDimensions, diBoxDimensions }) => {
  const containerRef = useRef(null); // Reference to the container element for dynamically tracking size
  const [containerDimensions, setContainerDimensions] = useState({
    width: 0, // Container width
    height: 0, // Container height
  });

  // Destructuring configuration, nicheDimensions, and diBoxDimensions for better access and default values
  const {
    width = 10, // Default width of the screen
    height = 8, // Default height of the screen
    depth = 2, // Default depth of the screen
    screenOrientation = "vertical", // Default screen orientation ("vertical" or "horizontal")
    floorDistance = 0, // Distance from the floor to the screen
    installationType = "niche", // Type of installation: either "niche" or "flat"
    screenMFR = "N/A", // Manufacturer of the screen
    mediaPlayerMFG = "N/A", // Manufacturer of the media player
    mountMFG = "N/A", // Manufacturer of the mount
    gap = 0, // Gap between niche and screen
  } = configuration || {}; // Default values applied if no configuration is passed

  // Extracting dimensions of the niche and DiBox (receptacle)
  const {
    nicheWidth = 12, // Niche width with a fallback value
    nicheHeight = 10, // Niche height
    nicheDepth = 2, // Niche depth
  } = nicheDimensions || {}; // Fallback if nicheDimensions is undefined

  const {
    height: diHeight = 0, // DiBox height with fallback
    width: diWidth = 0, // DiBox width
    depth: diDepth = 0, // DiBox depth
  } = diBoxDimensions || {}; // Fallback if diBoxDimensions is undefined

  // Ensuring dimensions are within defined range, ensuring both visual clarity and dimensional constraints
  const effectiveNicheWidth = Math.min(Math.max(nicheWidth || 1, 6), 125); // Limits niche width
  const effectiveNicheHeight = Math.min(Math.max(nicheHeight || 1, 6), 125); // Limits niche height
  const effectiveNicheDepth = Math.max(nicheDepth || 1, 1); // Ensure depth is at least 1 inch
  const effectiveDiWidth = Math.max(diWidth || 1, 3); // Ensure DiBox width is at least 3 inches
  const effectiveDiHeight = Math.max(diHeight || 1, 3); // Ensure DiBox height is at least 3 inches

  // useEffect hook ensures the container dimensions are updated dynamically on window resize
  useEffect(() => {
    const updateContainerDimensions = () => {
      if (containerRef.current) {
        setContainerDimensions({
          width: containerRef.current.offsetWidth, // Update container width
          height: containerRef.current.offsetHeight, // Update container height
        });
      }
    };

    updateContainerDimensions(); // Initial call to set container dimensions
    window.addEventListener("resize", updateContainerDimensions); // Update on resize

    // Cleanup on component unmount to remove resize event listener
    return () => window.removeEventListener("resize", updateContainerDimensions);
  }, []);

  // Dynamically calculating gap based on screen width
  const dynamicGap = width > 55 ? 2 : 1.5; // If width > 55 inches, use a larger gap
  const adjustedWidth = width + (installationType === "niche" ? dynamicGap : 0); // Adjust width for niche installation
  const adjustedHeight = height + (installationType === "niche" ? dynamicGap : 0); // Adjust height similarly

  // Calculating scale factor to scale the diagram based on container size
  const scaleFactor = Math.min(
    containerDimensions.width / 150, // Scaling based on container width
    containerDimensions.height / 150 // Scaling based on container height
  );

  // Final width and height based on orientation and scale factor
  const finalWidth =
    screenOrientation === "vertical"
      ? adjustedWidth * scaleFactor
      : adjustedHeight * scaleFactor;
  const finalHeight =
    screenOrientation === "vertical"
      ? adjustedHeight * scaleFactor
      : adjustedWidth * scaleFactor;

  // Calculating the vertical distance from the floor to the screen center
  const distanceToScreenCenter = floorDistance + adjustedHeight / 2;

  return (
    <div
      id="diagram-display"
      ref={containerRef}
      className="relative w-full h-full border border-gray-300 shadow-lg rounded-lg bg-white p-4 flex flex-col justify-center items-center"
    >
      {/* Surface Type Indicator: Niche or Flat installation */}
      <div className="absolute top-2 left-2 text-sm text-white bg-orange-600 px-2 py-1 rounded z-20 shadow">
        {installationType === "niche" ? "Niche Surface" : "Flat Surface"}
      </div>

      {/* Installation Area: Represents the region where the screen and other components are installed */}
      <div
        className="relative bg-gray-100 border border-dashed border-gray-400 flex flex-col justify-center items-center"
        style={{
          width:
            installationType === "flat"
              ? "800px" // Fixed size for flat installation
              : `${effectiveNicheWidth * scaleFactor}px`, // Scaled size for niche installation
          height:
            installationType === "flat"
              ? "800px" // Fixed height for flat installation
              : `${effectiveNicheHeight * scaleFactor}px`, // Scaled height for niche installation
        }}
      >
        {/* Screen Area: Represents the actual screen */}
        <div
          className="bg-gray-200 border border-blue-500 flex flex-col items-center justify-center"
          style={{
            width: `${finalWidth}px`, // Width of the screen
            height: `${finalHeight}px`, // Height of the screen
          }}
        >
          <p className="text-gray-700 text-sm font-bold">Screen Area</p>
          <p className="text-gray-500 text-xs">{`${width}" x ${height}" x ${depth}"`}</p>{" "}
          {/* Display screen dimensions */}
        </div>

        {/* Niche Dimensions: Only shown if installation type is niche */}
        {installationType === "niche" && (
          <>
            <div className="absolute top-[-20px] text-xs text-red-500 bg-white px-1">
              W: {effectiveNicheWidth}"
            </div>
            <div className="absolute left-[-40px] top-1/2 transform -translate-y-1/2 text-xs text-red-500 bg-white px-1">
              H: {effectiveNicheHeight}"
            </div>
            <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 text-xs text-red-500 bg-white px-1">
              D: {effectiveNicheDepth}"
            </div>
          </>
        )}

        {/* Gap Line and Information: Visual indicator for the gap between niche and screen */}
        {installationType === "niche" && (
          <div
            className="absolute bg-orange-500 left-full top-1/2 transform -translate-y-1/2"
            style={{
              width: "2px", // Thin gap line
              height: `${finalHeight}px`, // Full height of the screen
              right: `${finalWidth}px`, // Positioned to the right of the screen
            }}
          >
            <p
              className="absolute mr-2 left-[-20px] bottom-1 text-xs text-black bg-white px-1"
              style={{
                transform: "rotate(0deg)", // Horizontal text
                transformOrigin: "left bottom",
              }}
            >
              Gap: {dynamicGap} inches
            </p>
          </div>
        )}

        {/* DiBox (Receptacle Box) Information */}
        <div
          className="absolute bg-gray-300 border-2 border-dashed border-gray-400 flex flex-col items-center justify-center shadow-sm"
          style={{
            width: `${effectiveDiWidth * 20}px`, // Scaled width for DiBox
            height: `${effectiveDiHeight * 20}px`, // Scaled height for DiBox
            left: "0", // Positioned at the left of the installation area
            bottom: "5%", // Positioned at the bottom
          }}
        >
          <p className="text-xs font-bold">Receptacle Box</p>
          <p className="text-xs">{`W: ${effectiveDiWidth}"`}</p>
          <p className="text-xs">{`H: ${effectiveDiHeight}"`}</p>
          <p className="text-xs">{`D: ${diDepth}"`}</p>
        </div>

        {/* Floor Distance Line: Indicates the distance from the floor to the center of the screen */}
        <div
          className="absolute w-0.5 bg-black"
          style={{
            left: `${finalWidth / 2}px`, // Positioned at the center of the screen
            bottom: "0", // Starts from the bottom of the screen
            height: `${distanceToScreenCenter}px`, // Extends upward to the middle
          }}
        >
          <p
            className="absolute left-2 text-xs text-black bg-white px-1"
            style={{
              bottom: `${distanceToScreenCenter + 5}px`, // Position the text slightly above the bottom
            }}
          >
            Floor Distance: {floorDistance}"
          </p>
        </div>
      </div>

      {/* Information Box: Displays general information about the installation */}
      <div className="absolute bottom-4 right-4 bg-gray-200 p-3 rounded border shadow-md">
        <p className="text-gray-600 text-sm font-bold">Information</p>
        <p className="text-gray-600 text-xs">{`Screen MFR: ${screenMFR}`}</p>
        <p className="text-gray-600 text-xs">{`Media Player MFG: ${mediaPlayerMFG}`}</p>
        <p className="text-gray-600 text-xs">{`Mount MFG: ${mountMFG}`}</p>
      </div>
    </div>
  );
};

export default DiagramDisplay;
