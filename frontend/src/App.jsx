import React from 'react';
import Header from './components/Header';  // Adjust path if necessary
import ArticlePage from './pages/ArticlePage';
import AboutUs from './pages/AboutUs';
import Homepage from './components/homepage';
import PrintIssue from './pages/PrintIssue';
import Footer from './components/Footer';  // Adjust path if necessary
import NewsPage from './pages/NewsPage';
import EditorialsPage from './pages/EditorialsPage';
import FeaturePage from './pages/FeaturePage';
import SciTechPage from './pages/ScitechPage';
import SportsPage from './pages/SportsPage';
import OpinionPage from './pages/OpinionPage';

const App = () => {
  return (
    <>
    <Header></Header>
    <Homepage></Homepage>
    <Footer></Footer>
    </>
  );
};

export default App;