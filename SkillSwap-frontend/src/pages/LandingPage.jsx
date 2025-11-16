import React from 'react';
import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import Steps from '../components/landing/Steps';
import Features from '../components/landing/Features';
import CallToAction from '../components/landing/CallToAction';
import Footer from '../components/landing/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Steps />
      <Features />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default LandingPage;