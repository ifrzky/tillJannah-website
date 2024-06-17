import React, { useState, useRef } from "react";
import Nav from "../components/Navbar";
import Footer from "../components/Footer";
import ZakatCalc from "./ZakatCalc";

const ZakatPage = () => {

  return (
    <>
      <Nav />
      <div data-aos="fade-up">
        <ZakatCalc />
      </div>
      <Footer />
    </>
  );
};

export default ZakatPage;