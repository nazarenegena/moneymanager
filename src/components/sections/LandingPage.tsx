import React from "react";
import Navbar from "./Navbar";
import Link from "next/link";

type Props = {};

const LandingPage = (props: Props) => {
  return (
    <div>
      The LandingPage
      <Navbar />
      <button>Create Account</button>
      <button className="bg-blue-400">
        <Link href={"/dashboard"}>Get Started</Link>
      </button>
    </div>
  );
};

export default LandingPage;
