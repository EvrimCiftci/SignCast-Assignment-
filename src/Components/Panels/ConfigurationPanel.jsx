import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx"; // Importing the XLSX library to read Excel files

const ConfigurationPanel = ({ configuration, setConfiguration }) => {
  const [data, setData] = useState({
    Screen: [],
    MediaPlayer: [],
    Mount: [],
    ReceptacleBox: [],
  });
  const [loading, setLoading] = useState(true);

  // Handle dropdown selection changes and update the configuration state
  const handleDropdownChange = (field, value) => {
    setConfiguration((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle numeric input field changes and parse as float
  const handleInputChange = (field, value) => {
    setConfiguration((prev) => ({
      ...prev,
      [field]: parseFloat(value) || 0,
    }));
  };

  // Load and parse the Excel file when the component mounts
  useEffect(() => {
    fetch("/database/PDF_Builder.xlsx")
      .then((response) => response.arrayBuffer())
      .then((buffer) => {
        const workbook = XLSX.read(buffer, { type: "array" });
        const parsedData = {
          Screen: XLSX.utils.sheet_to_json(workbook.Sheets["Screen MFR"]),
          MediaPlayer: XLSX.utils.sheet_to_json(workbook.Sheets["Media Player MFR"]),
          Mount: XLSX.utils.sheet_to_json(workbook.Sheets["Mounts"]),
          ReceptacleBox: XLSX.utils.sheet_to_json(workbook.Sheets["Receptacle Box"]),
        };
        setData(parsedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading Excel file:", error);
        setLoading(false);
      });
  }, []);

  // Dropdown component for rendering options dynamically
  const Dropdown = ({ label, id, options, field }) => (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-sm font-medium text-gray-600">
        {label}
      </label>
      <select
        id={id}
        className="p-2 mt-1 border border-gray-300 rounded-md shadow-sm"
        value={configuration[field] || ""}
        onChange={(e) => handleDropdownChange(field, e.target.value)}
      >
        {options && options.length > 0 ? (
          options.map((option, index) => (
            <option key={index} value={option}>
              {option || "Not Available"}
            </option>
          ))
        ) : (
          <option>No options available</option>
        )}
      </select>
    </div>
  );

  // Button groups for screen orientation and installation type
  const buttonGroups = [
    {
      rowKey: "screenOrientation",
      buttons: [
        { label: "Vertical", key: "vertical" },
        { label: "Horizontal", key: "horizontal" },
      ],
    },
    {
      rowKey: "installationType",
      buttons: [
        { label: "Niche", key: "niche" },
        { label: "Flat", key: "flat" },
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-100 shadow-md rounded-md w-full max-w-md">
      <h2 className="text-xl font-bold text-gray-800">Select Your Configuration</h2>

      {loading ? (
        <p>Loading options...</p>
      ) : (
        <>
          <Dropdown
            label="Screen MFR"
            id="screenMFR"
            options={data.Screen.map((item) => item["Screen MFR"] || "No Screen MFR")}
            field="screenMFR"
          />
          <Dropdown
            label="Media Player MFG"
            id="mediaPlayerMFG"
            options={data.MediaPlayer.map((item) => item["MFG. PART"] || "No Media Player MFG")}
            field="mediaPlayerMFG"
          />
          <Dropdown
            label="Mount MFG"
            id="mountMFG"
            options={data.Mount.map((item) => item["MFG. PART"] || "No Mount MFG")}
            field="mountMFG"
          />
          <Dropdown
            label="Receptacle Box MFG"
            id="receptacleBoxMFG"
            options={data.ReceptacleBox.map((item) => item["MFG. PART"] || "No Receptacle Box MFG")}
            field="receptacleBoxMFG"
          />
        </>
      )}

      {buttonGroups.map(({ rowKey, buttons }) => (
        <div key={rowKey} className="relative flex w-full">
          {buttons.map(({ label, key }) => (
            <button
              key={key}
              className={`relative overflow-hidden focus:outline-none font-bold p-4 w-1/2 transition ease-in-out duration-300 border-none outline-none rounded-sm group ${
                configuration[rowKey] === key ? "bg-orange-500 text-white" : "text-gray-800"
              }`}
              onClick={() =>
                setConfiguration((prev) => ({ ...prev, [rowKey]: key }))
              }
            >
              <span
                className={`absolute inset-0 transition-all duration-500 transform ${
                  configuration[rowKey] === key ? "scale-100" : "scale-0"
                }`}
                style={{ backgroundColor: "#FF6F00" }}
              ></span>
              <span className="relative z-10">{label}</span>
            </button>
          ))}
        </div>
      ))}

      {configuration.installationType && (
        <div className="flex flex-col mt-4">
          <label htmlFor="floorDistance" className="text-sm font-medium text-gray-600">
            Floor Distance (ft)
          </label>
          <input
            type="number"
            id="floorDistance"
            value={configuration.floorDistance || ""}
            className="p-2 mt-1 border border-gray-300 rounded-md shadow-sm"
            onChange={(e) => handleInputChange("floorDistance", e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export default ConfigurationPanel;
