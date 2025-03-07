import React from "react";
import { CiDesktopMouse1 } from "react-icons/ci";

export default function HeroSection() {
  return (
      <div className="hero text-center p-5 bg-image">
        <div className="mask">
          <div className="text-container text-white">
            <h2 className="hero-heading">Welcome to E-Commerce</h2>
            <h2 className="hero-subheading">
              Our products are waiting for you below.
            </h2>
            <a className="btn btn-dark btn-lg" href="#featured-products" role="button">
              Scroll <CiDesktopMouse1 />
            </a>
          </div>
        </div>
      </div>
  );
}
