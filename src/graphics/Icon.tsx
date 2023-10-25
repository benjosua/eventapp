import React from "react";
import Image from "next/image";

const Icon = () => (
  <div className="icon">
    <Image
      src="/assets/icon.png" // Replace with the correct path to your image
      alt="ARC Icon"
      width={25} // Set the width of your image
      height={25} // Set the height of your image
    />
  </div>
);

export default Icon;
