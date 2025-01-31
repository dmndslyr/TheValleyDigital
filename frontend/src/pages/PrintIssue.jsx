import React, { useEffect, useState } from 'react';
import './PrintIssue.css';
import placeholderImg from '../assets/placeholder-issue.jpg'; 
import printIssueimg from '../assets/print-issue2.png';
import logo from '../assets/DIGITAL_print.png';

function PrintIssue() {
  const [latestIssue, setLatestIssue] = useState(null);
  const [pastIssues, setPastIssues] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/print-issues/')
      .then(response => response.json())
      .then(data => {
        console.log("Backend response:", data); // Log the response data
        if (data.printed_issues.length > 0) {
          setLatestIssue(data.printed_issues[0]); // Assuming the latest issue is the first one in the list
          setPastIssues(data.printed_issues.slice(1)); // The rest are past issues
        }
      })
      .catch(error => console.error('Error fetching printed issues:', error));
  }, []);

  // Adjust the navigation function to fetch the PDF file URL and redirect
  const navigateToIssue = (identifier) => {
    console.log("Navigating to issue with identifier:", identifier); // Log the identifier
    // Fetch the details of the issue to get the PDF URL
    fetch(`http://127.0.0.1:8000/print-issues/${identifier}/`)
      .then(response => response.json())
      .then(data => {
        console.log("Fetched issue data:", data); // Log the fetched issue data
        const pdfFileUrl = data.pdf_file_url; // Extract the PDF URL
        if (pdfFileUrl) {
          // Redirect to the PDF URL
          window.location.href = pdfFileUrl;
        } else {
          console.error("PDF file URL not found");
        }
      })
      .catch(error => console.error('Error fetching issue details:', error));
  };

  return (
    <div className='print-issue'>
      <div className='print-issue-header'>
        <h1>PRINT ISSUES</h1>
        <div className='header-slice'></div>
        <div className='header-slice'></div>
      </div>
      <h2>LATEST ISSUE</h2>
      {latestIssue && (
        <div className="latest-issue">
          <div className="issue-photo">
            <img src={placeholderImg} alt='img'></img>
            <button onClick={() => navigateToIssue(latestIssue.id)}>READ ONLINE</button>
          </div>
          <div className='right-latest-issue'>
            <img src={logo} alt='logo'></img>
            <h3>VOLUME {latestIssue.volume}, NO.{latestIssue.issue_no}</h3>
            <p>16 pages | {latestIssue.month_range}</p>
          </div>
        </div>
      )}
      <h2>OTHER ISSUES</h2>
      <div className='past-issues'>
        {pastIssues.map((issue, index) => (
          <div key={index} className='past-issue'>
            <div className="past-issue-photo">
              <img src={printIssueimg} alt='img' /> 
            </div> 
            <div className='right-past-issue'> 
              <h3>THE VALLEY</h3>
              <h3>VOLUME {issue.volume}, NO.{issue.issue_no}</h3> 
              <p>12 pages | {issue.month_range}</p>
              <button onClick={() => navigateToIssue(issue.id)}>READ ONLINE</button> 
            </div> 
          </div>
        ))}
      </div>
    </div>
  );
}

export default PrintIssue;
