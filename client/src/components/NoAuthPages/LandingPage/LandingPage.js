import React from "react";
import Navbar from "../Navbar";
import HeroSection from "./HeroSection";
import Benefits from "./Benefits";
import About from "./About";
import Features from "./Features";
import HowItWorks from "./HowItWorks";
import Stats from "./Stats";
import Footer from "../../UIcomponent/Footer";
import { Helmet } from "react-helmet-async";
import defaulimage from "../../../media/Link-Vink-share.png";

function LandingPage() {
  return (
    <>
      <Helmet>
        <title>Link Vink: Unify All Your Links in One Place</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="title"
          content="Link Vink: Unify All Your Links in One Place"
        />
        <meta
          name="description"
          content="Link Vink is a link-unifying website designed for content creators, event organizers, affiliate marketers, and business professionals to manage and share all their links from one platform."
        />
        <meta
          name="keywords"
          content="Link Vink, Link unifying tool, content creators, event organizers, affiliate marketers, business professionals"
        />
        <meta name="author" content="Priyanshu Chaurasiya" />
        <meta name="language" content="en" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://link-vink.vercel.app/" />
        <link rel="alternate" href="https://link-vink.vercel.app/" hrefLang="en-us" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://link-vink.vercel.app/" />
        <meta
          property="og:title"
          content="Link Vink: Unify All Your Links in One Place"
        />
        <meta
          property="og:description"
          content="Link Vink is a link-unifying website designed for content creators, event organizers, affiliate marketers, and business professionals to manage and share all their links from one platform."
        />
        <meta property="og:image" content={defaulimage} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://link-vink.vercel.app/" />
        <meta
          property="twitter:title"
          content="Link Vink: Unify All Your Links in One Place"
        />
        <meta
          property="twitter:description"
          content="Link Vink is a link-unifying website designed for content creators, event organizers, affiliate marketers, and business professionals to manage and share all their links from one platform."
        />
        <meta property="twitter:image" content={defaulimage} />
      </Helmet>
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
