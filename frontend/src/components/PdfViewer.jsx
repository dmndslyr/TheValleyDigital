import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate

const PdfViewer = () => {
  const { identifier } = useParams(); // Use the route parameter
  const [pdfUrl, setPdfUrl] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    // Fetch the PDF URL from the backend API
    fetch(`http://127.0.0.1:8000/print-issues/${identifier}/`)
      .then((response) => response.text()) // Read the response as text
      .then((data) => {
        try {
          const json = JSON.parse(data); // Attempt to parse as JSON
          if (json.pdf_file_url) {
            setPdfUrl(`http://127.0.0.1:8000${json.pdf_file_url}`); // Use the correct base URL
          } else {
            alert("No PDF available for this issue.");
          }
        } catch (error) {
          console.error("Error parsing JSON:", error);
          alert("Failed to fetch PDF URL. Please check the server response.");
        }
      })
      .catch((error) => console.error("Error fetching PDF URL:", error));
  }, [identifier]);

  useEffect(() => {
    // Automatically open the PDF when the URL is set
    if (pdfUrl) {
      window.open(pdfUrl, "_blank"); // Open PDF in a new tab
      navigate("/print-issue"); // Navigate back to PrintIssue component
    }
  }, [pdfUrl, navigate]);

  return (
    <div>
      <h1>Printed Issue</h1>
      {!pdfUrl && <p>Loading PDF...</p>}
    </div>
  );
};

export default PdfViewer;
