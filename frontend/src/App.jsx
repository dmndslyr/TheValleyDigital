import React from 'react';
import Header from './components/Header';  // Adjust path if necessary
import ArticlePage from './pages/ArticlePage';
import AboutUs from './pages/AboutUs';
import SearchInterface from './pages/SearchInterface';
import LoginPage from './pages/Login';
import PrintIssue from './pages/PrintIssue';
import Footer from './components/Footer';  // Adjust path if necessary
import './App.css'

const App = () => {
  return (
    <>
    <Header></Header>
    <SearchInterface></SearchInterface>
    <Footer></Footer>
    </>
  );
};

export default App;