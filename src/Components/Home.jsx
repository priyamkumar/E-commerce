import React from "react";
import HeroSection from "./HeroSection";
import FeaturedProducts from "./FeaturedProducts";
import MetaData from "./MetaData";

export default function Home() {
  return (
    <div id="home">
      <MetaData title="E-Commerce" />
      <HeroSection />
      <FeaturedProducts />
    </div>
  );
}
