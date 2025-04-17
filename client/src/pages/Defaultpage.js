import React from "react";
import HeroSection from "../components/sections/HeroSection";
import KeyBenefits from "../components/sections/KeyBenefits";
import AppFeatures from "../components/sections/AppFeatures";

import CTASection from "../components/sections/CTASection";
import FooterSection from "../components/sections/FooterSection";

const DefaultPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <HeroSection />
      <KeyBenefits />
      <AppFeatures />

      <CTASection />
      <FooterSection />
    </div>
  );
};

export default DefaultPage;
