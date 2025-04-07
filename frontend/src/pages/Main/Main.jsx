import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import QuizSection from './components/QuizSection';
import './Main.scss';

function Main() {
  return (
    <div className='main'>
      <Navbar />
      <HeroSection />
    </div>
  );
}

export default Main;