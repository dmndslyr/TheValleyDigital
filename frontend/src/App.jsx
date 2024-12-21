import React from 'react';
import Header from './components/Header';  // Adjust path if necessary
import ArticlePage from './pages/ArticlePage';
import AboutUs from './pages/AboutUs';
import PrintIssue from './pages/PrintIssue';
import Footer from './components/Footer';  // Adjust path if necessary

const App = () => {
  return (
    <>
    <Header></Header>
    <PrintIssue></PrintIssue>
    <Footer></Footer>
    </>
  );
};

export default App;