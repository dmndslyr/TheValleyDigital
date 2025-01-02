import React from 'react';

import Header from './components/Header';
import EditorHeader from './components/EditorHeader';
import EditorSidebar from './components/EditorSidebar';
import Footer from './components/Footer';
import PublishArticle from './pages/PublishArticle';

import ArticlePage from './pages/ArticlePage';
import AboutUs from './pages/AboutUs';
import SearchInterface from './pages/SearchInterface';
import LoginPage from './pages/Login';
import PrintIssue from './pages/PrintIssue';

import NewsPage from './pages/NewsPage';
import EditorialsPage from './pages/EditorialsPage';
import FeaturePage from './pages/FeaturePage';
import SciTechPage from './pages/ScitechPage';
import SportsPage from './pages/SportsPage';
import OpinionPage from './pages/OpinionPage';


const App = () => {
  return (
    <>
    <PublishArticle></PublishArticle>
    </>
  );
};

export default App;