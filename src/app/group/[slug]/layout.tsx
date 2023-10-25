import React from "react";

import Footer from "../../_components/Footer"; // Import the Footer component
import Header from "../../_components/Header"; // Import the Header component

export default function Layout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Header />
      <hr />
      {/* Include shared UI here e.g. a header or sidebar */}
      {children}
      <hr />
      <Footer />
    </main>
  );
}
