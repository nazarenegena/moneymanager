import React from "react";
import { BsSearch } from "react-icons/bs";

type Props = {};

const Searchbar = (props: Props) => {
  return (
    <div className="relative ">
      {" "}
      <input
        placeholder="search"
        type="text"
        className="bg-gray-200 h-10 w-72 rounded-md px-4 shadow-inner outline-none border border-gray-200 focus:ring-cyan-500 focus:border-cyan-500"
      />
      <BsSearch
        className="absolute top-3 right-6 text-neutral-600 cursor-pointer"
        size={18}
      />
    </div>
  );
};

export default Searchbar;
