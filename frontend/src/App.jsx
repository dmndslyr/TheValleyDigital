import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingSpinner from './components/LoadingSpinner';
import NotFoundPage from './pages/404';
import Layout from './components/Layout'; // Import the Layout component

import PrintedIssuePage from "./components/PdfViewer";
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import AboutUs from './pages/AboutUs';
import SearchInterface from './pages/SearchInterface';
import PrintIssue from './pages/PrintIssue';
import NewsPage from './pages/NewsPage';
import EditorialsPage from './pages/EditorialsPage';
import FeaturePage from './pages/FeaturePage';
import SciTechPage from './pages/ScitechPage';
import SportsPage from './pages/SportsPage';
import OpinionPage from './pages/OpinionPage';

import PdfViewer from './components/PdfViewer';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/home" element={<Layout><HomePage /></Layout>} />
          <Route path="/about-us" element={<Layout><AboutUs /></Layout>} />
          <Route path="/editorial" element={<Layout><EditorialsPage /></Layout>} />
          <Route path="/feature" element={<Layout><FeaturePage /></Layout>} />
          <Route path="/news" element={<Layout><NewsPage /></Layout>} />
          <Route path="/opinion" element={<Layout><OpinionPage /></Layout>} />
          <Route path="/sci-tech" element={<Layout><SciTechPage /></Layout>} />
          <Route path="/sports" element={<Layout><SportsPage /></Layout>} />
          <Route path="/advance-search" element={<Layout><SearchInterface /></Layout>} />
          <Route path="/article/:identifier" element={<Layout><ArticlePage /></Layout>} />
          <Route path="/print-issue" element={<Layout><PrintIssue /></Layout>} />
          <Route path="/print-issues/:identifier" element={<Layout><PdfViewer /></Layout>} />
          <Route path="/advanced-search" element={<Layout><SearchInterface /></Layout>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;

