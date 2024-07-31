import { useEffect, useState } from 'react';
import './App.css';
import Footer from './Footer';
import Header from './Header';
import HeroSlider from './HeroSlider';
import ProductCard from './ProductCard';
import RecommendSlider from './RecommendSlider';

function App() {

  return (

    <>
      <Header />
      <HeroSlider />
      <RecommendSlider />
      <ProductCard />
      <Footer />
    </>




  );
}

export default App;
