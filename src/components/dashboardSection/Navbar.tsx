import React from "react";
import Profile from "./Profile";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="flex justify-between items-center ">
      <p className="text-xl  font-semibold text-gray-800">Dashboard</p>
      <Profile />
    </div>
  );
};

export default Navbar;
