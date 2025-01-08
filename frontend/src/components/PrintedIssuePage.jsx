import React, { useEffect, useState } from "react";

const PrintedIssuePage = ({ identifier }) => {
    const [pdfUrl, setPdfUrl] = useState("");

    useEffect(() => {
        // Fetch the PDF URL from the backend API
        fetch(`http://localhost:8000/printed-issues/${identifier}/`)
            .then((response) => response.json())
            .then((data) => {
                if (data.pdf_file_url) {
                    setPdfUrl(data.pdf_file_url);
                } else {
                    alert("No PDF available for this issue.");
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

export default PrintedIssuePage;
