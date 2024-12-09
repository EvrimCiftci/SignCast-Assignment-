import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";  // Import jsPDF
import html2canvas from "html2canvas";  // Import html2canvas

const DescriptionPanel = ({ projectDetails, setProjectDetails }) => {
  const [screenOptions, setScreenOptions] = useState([]);

  // Fetch XLSX file and parse screen options
  useEffect(() => {
    const fetchScreenOptions = async () => {
      try {
        const fileResponse = await fetch("/database/PDF_Builder.xlsx");
        const fileBlob = await fileResponse.blob();

        const data = await fileBlob.arrayBuffer();
        const workbook = XLSX.read(data, { type: "array" });

        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);

        const options = jsonData.map((row) => row["Screen Size"]);
        setScreenOptions(options);
      } catch (error) {
        console.error("Error reading XLSX file:", error);
      }
    };

    fetchScreenOptions();
  }, []);

  const handleInputChange = (field, value) => {
    setProjectDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDownloadPDF = async () => {
    const doc = new jsPDF("portrait", "mm", "a4"); // Standard A4 size

   // Check if the elements are found
   const pdfHeader = document.getElementById("pdf-header");
   const diagramDisplay = document.getElementById("diagram-display");
 
   if (!pdfHeader || !diagramDisplay) {
     console.error("Element not found. Check your IDs.");
     return;
   }
 
    try {
      
      // Capture PdfHeader as an image
      const headerCanvas = await html2canvas(pdfHeader, { scale: 2 }); // Higher resolution
      const headerDataUrl = headerCanvas.toDataURL();
      doc.addImage(headerDataUrl, "PNG", 10, 10, 190, 80); // Add header image to PDF
 const margin = 20; // Adjust this value to increase or decrease the space
     const diagramYPosition = 50 + 40 + margin; // Start after header height (40) + additional margin
      // Capture DiagramDisplay as an image
      const diagramCanvas = await html2canvas(diagramDisplay, { scale: 2 });
      const diagramDataUrl = diagramCanvas.toDataURL();
      doc.addImage(diagramDataUrl, "PNG", 10, diagramYPosition, 190, 140); // Add diagram with adjusted Y position

     
      // Save the generated PDF
      doc.save("project_details.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Description</h2>

      {/* Project Title */}
      <div>
        <label className="block text-sm font-medium mb-1">Project Title</label>
        <input
          type="text"
          className="w-full border rounded-lg focus:outline-none shadow-md p-2"
          value={projectDetails.projectTitle || ""}
          onChange={(e) => handleInputChange("projectTitle", e.target.value)}
        />
      </div>

      {/* Drawer */}
      <div className="mt-2">
        <label className="block text-sm font-medium mb-1">Drawer</label>
        <input
          type="text"
          className="w-full border rounded-lg focus:outline-none shadow-md p-2"
          value={projectDetails.drawer || ""}
          onChange={(e) => handleInputChange("drawer", e.target.value)}
        />
      </div>

      {/* Department */}
      <div className="mt-2">
        <label className="block text-sm font-medium mb-1">Department</label>
        <input
          type="text"
          className="w-full border rounded-lg focus:outline-none shadow-md p-2"
          value={projectDetails.department || ""}
          onChange={(e) => handleInputChange("department", e.target.value)}
        />
      </div>

      {/* Screen Size */}
      <div className="mt-2">
        <label className="block text-sm font-medium mb-1">Screen Size</label>
        <select
          className="w-full border rounded-lg focus:outline-none shadow-md p-2"
          value={projectDetails.screenSize || ""}
          onChange={(e) => handleInputChange("screenSize", e.target.value)}
        >
          {screenOptions.map((screen, index) => (
            <option key={index} value={screen}>
              {screen}
            </option>
          ))}
        </select>
      </div>

      {/* Date */}
      <div className="mt-2">
        <label className="block text-sm font-medium mb-1">Date</label>
        <input
          type="date"
          className="w-full border rounded-lg focus:outline-none shadow-md p-2"
          value={projectDetails.date || ""}
          onChange={(e) => handleInputChange("date", e.target.value)}
        />
      </div>

      {/* Download Button */}
      <div className="mt-4">
        <button
          onClick={handleDownloadPDF}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          Download PDF
        </button>
      </div>

      {/* PdfHeader and DiagramDisplay components (hidden for PDF generation) */}
      <div id="pdf-header" style={{ display: "none" }}>
        <h1>Project Title: {projectDetails.projectTitle}</h1>
        <p>Drawer: {projectDetails.drawer}</p>
        <p>Department: {projectDetails.department}</p>
        <p>Screen Size: {projectDetails.screenSize}</p>
        <p>Date: {projectDetails.date}</p>
      </div>

      <div id="diagram-display" style={{ display: "none" }}>
        {/* Your DiagramDisplay component content */}
        <h3>Diagram Display</h3>
        <p>Screen Dimensions: {projectDetails.screenSize}</p>
        <div style={{ width: 300, height: 200, backgroundColor: "#ddd" }}>
          {/* Placeholder for diagram */}
        </div>
      </div>
    </div>
  );
};

export default DescriptionPanel;
