import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams

const PdfViewer = () => {
  const { identifier } = useParams(); // Use the route parameter
  const [pdfUrl, setPdfUrl] = useState("");

  useEffect(() => {
    // Fetch the PDF URL from the backend API
    fetch(`http://127.0.0.1:8000/print-issues/${identifier}/`)
      .then((response) => response.text()) // Read the response as text
      .then((data) => {
        try {
          const json = JSON.parse(data); // Attempt to parse as JSON
          if (json.pdf_file_url) {
            setPdfUrl(json.pdf_file_url);
          } else {
            alert("No PDF available for this issue.");
          }
        } catch (error) {
          console.error("Error parsing JSON:", error);
          console.error("Full response:", data); // Log the full response
          alert("Failed to fetch PDF URL. Please check the server response.");
        }
      })
      .catch((error) => console.error("Error fetching PDF URL:", error));
  }, [identifier]);

  const openPdf = () => {
    if (pdfUrl) {
      window.open(pdfUrl, "_blank"); // Open PDF in a new tab
    } else {
      alert("PDF not found.");
    }
  };

  return (
    <div>
      <h1>Printed Issue</h1>
      {pdfUrl ? (
        <button onClick={openPdf}>Open PDF</button>
      ) : (
        <p>Loading PDF...</p>
      )}
    </div>
  );
};

export default PdfViewer;
