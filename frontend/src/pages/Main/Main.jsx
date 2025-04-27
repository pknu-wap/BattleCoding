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
        <QuizSection />
    </div>
  );
}

export default Main;