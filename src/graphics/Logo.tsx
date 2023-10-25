import React from "react";
import Image from "next/image";

const Logo = () => (
  <div className="logo">
    <Image
      src="/assets/logo.png" // Replace with the correct path to your image
      alt="ARC Logo"
      width={200} // Set the width of your image
      height={100} // Set the height of your image
    />
  </div>
);

export default Logo;
