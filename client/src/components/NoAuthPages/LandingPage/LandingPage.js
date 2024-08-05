import React from "react";
import Navbar from "../Navbar";
import HeroSection from "./HeroSection";
import Benefits from "./Benefits";
import About from "./About";
import Features from "./Features";
import HowItWorks from "./HowItWorks";
import Stats from "./Stats";
import Footer from "../../UIcomponent/Footer";

function LandingPage() {
  return (
    <>
      <Navbar />
      <div className="container">
        <HeroSection />
        <About />
        <Benefits />
        <Features />
        <HowItWorks />
        <Stats />
      </div>
      <Footer />
    </>
  );
}

export default LandingPage;
