import React, { useState, useEffect } from "react";
import DiagramDisplay from "./PdfContent/DiagramDisplay"; // Component for displaying the diagram based on configurations
import ConfigurationPanel from "./Panels/ConfigurationPanel"; // Panel for managing configuration settings
import DescriptionPanel from "./Panels/DescriptionPanel"; // Panel for managing project descriptions
import ScreenDimensions from "./Dimensions/ScreenDimensions"; // Component for managing screen dimensions
import NicheDimensions from "./Dimensions/NicheDimensions"; // Component for managing niche dimensions
import Notes from "./Dimensions/Notes"; // Component for managing notes and DiBox dimensions
import PdfHeader from "./PdfContent/PdfHeader"; // Component to render the project header for PDF

function MainLayout({ screenOptions }) {
  // State to manage screen configuration
  const [configuration, setConfiguration] = useState({
    screenOrientation: "vertical", // Default screen orientation
    installationType: "niche", // Default installation type (niche or flat)
    screenMFR: "", // Manufacturer of the screen
    make: "", // Make of the screen
    screenSize: "", // Screen size in inches or cm
    height: "", // Screen height
    width: "", // Screen width
    weight: "", // Screen weight
  });

  // State to manage project details
  const [projectDetails, setProjectDetails] = useState({
    projectTitle: "", // Project title
    drawer: "", // Assigned drawer
    department: "", // Department handling the project
    screenSize: "", // Size of the screen
    date: new Date().toLocaleDateString(), // Current date in locale format
  });

  // State to manage niche dimensions for niche installation
  const [nicheDimensions, setNicheDimensions] = useState({
    nicheWidth: 0, // Width of the niche
    nicheHeight: 0, // Height of the niche
    nicheDepth: 0, // Depth of the niche
  });

  // State to manage flat dimensions for flat installation
  const [flatDimensions, setFlatDimensions] = useState({
    flatWidth: 1000, // Default flat width
    flatHeight: 1000, // Default flat height
  });

  // State to manage dimensions of the DiBox (display installation box)
  const [diBoxDimensions, setDiBoxDimensions] = useState({
    height: 2, // Height of the DiBox
    width: 2, // Width of the DiBox
    depth: 2, // Depth of the DiBox
  });

  // Effect hook to update flat dimensions based on installation type
  useEffect(() => {
    // If the installation type is "flat", update the flatHeight value
    if (configuration.installationType === "flat") {
      setFlatDimensions((prev) => ({
        ...prev,
        flatHeight: 1500, // Set new height when installation is flat
      }));
    }
  }, [configuration.installationType]); // Dependency on installationType to trigger the effect

  return (
    <div className="flex flex-wrap w-screen h-screen">
      {/* Diagram Display Section */}
      <div className="h-screen overflow-hidden w-3/6 flex justify-center p-10">
        <DiagramDisplay
          configuration={configuration} // Pass configuration for diagram display
          nicheDimensions={nicheDimensions} // Pass niche dimensions for niche installation
          flatDimensions={flatDimensions} // Pass flat dimensions if installation type is flat
          diBoxDimensions={diBoxDimensions} // Pass DiBox dimensions for rendering
        />
      </div>

      {/* Dimensions and Notes Section */}
      <div className="flex flex-col w-2/6 pt-10 justify-between h-screen">
        {/* First Half of the Dimensions Section: Niche and Screen Dimensions */}
        <div className="flex flex-row w-full justify-between h-1/2">
          {configuration.installationType === "niche" && (
            <NicheDimensions onNicheChange={setNicheDimensions} /> // Render niche dimensions only if installation type is niche
          )}
          <ScreenDimensions
            configuration={configuration} // Pass configuration to screen dimensions component
            setConfiguration={setConfiguration} // Function to update configuration state
          />
        </div>
        
        {/* Second Half of the Dimensions Section: Notes and PDF Header */}
        <div className="flex flex-col w-full justify-between h-1/2">
          <Notes onDimensionsChange={setDiBoxDimensions} /> 
          <PdfHeader
            projectDetails={projectDetails} // Pass project details to render PDF header
            screenOrientation={configuration.screenOrientation} // Pass current screen orientation
          />
        </div>
      </div>

      {/* Configuration and Description Panels */}
      <div className="flex flex-col w-1/6 p-10 h-screen">
        {/* Configuration Panel */}
        <ConfigurationPanel
          configuration={configuration} // Pass configuration to update settings
          setConfiguration={setConfiguration} // Function to update configuration
          projectDetails={projectDetails} // Pass project details
          setProjectDetails={setProjectDetails} // Function to update project details
        />
        {/* Description Panel */}
        <DescriptionPanel
          projectDetails={projectDetails} // Pass project details for description editing
          setProjectDetails={setProjectDetails} // Function to update project details
          screenOptions={screenOptions} // Pass screen options for the project description
        />
      </div>
    </div>
  );
}

export default MainLayout;
