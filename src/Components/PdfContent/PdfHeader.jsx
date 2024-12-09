import React from "react";

const PdfHeader = ({ projectDetails, screenOrientation }) => {
  const {
    projectTitle = "Untitled Project",
    drawer = "Not Specified",
    department = "Not Specified",
    screenSize = "Not Specified",
    date = new Date().toLocaleDateString(),
  } = projectDetails || {};

  return (
    <div id="pdf-header" className="bg-white mt-6 p-6 rounded-lg shadow-lg w-full ">
      {/* Header Title */}
      <div className="mb-6 flex justify-between items-center border-b pb-3 border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-800">Project Overview</h1>
        <span className="text-sm text-gray-500">{date}</span>
      </div>

      {/* Screen Orientation */}
      <div className="mb-6">
        <span className="text-sm font-medium text-gray-600">Screen Orientation:</span>
        <p className="text-lg font-semibold text-orange-500 mt-1">
          {screenOrientation === "horizontal" ? "Horizontal" : "Vertical"}
        </p>
      </div>

      {/* Rows of Details */}
      <div className="space-y-6">
        {/* Row 1 */}
        <div className="flex flex-wrap gap-6">
          <DetailItem label="Project Title" value={projectTitle} />
          <DetailItem label="Drawer" value={drawer} />
        </div>

        {/* Row 2 */}
        <div className="flex flex-wrap gap-6">
          <DetailItem label="Department" value={department} />
          <DetailItem label="Screen Size" value={screenSize} />
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value }) => (
  <div className="flex-grow  bg-gray-50 p-4 rounded-md shadow-sm h-24 border border-gray-200">
    {/* Label */}
    <div className="relative">
      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        {label}
      </span>
      <div className="h-1 w-full bg-orange-300 mt-1 "></div>
    </div>
    {/* Value */}
    <p className="text-sm font-medium text-gray-800 mt-3">{value}</p>
  </div>
);

export default PdfHeader;
