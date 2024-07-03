import React from "react";
import NavBar from "../components/ui/navbar";
import Footer from "../components/ui/footer";

const WebLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
};

export default WebLayout;
