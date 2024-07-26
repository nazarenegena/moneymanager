import React from "react";

type Props = {};

const AccountBalanceCard = (props: Props) => {
  return (
    <div className="bg-sky-100 w-96 h-48 rounded-md p-4 shadow-md">
      {" "}
      <p className="text-sm font-semibold">Account Balance</p>
      <p className="text-4xl font-mono leading-10 font-medium mt-5 ">
        USD 10,000.00
      </p>
      <div className="mt-5 text-sm font-semibold">
        Date :<p className="mt-2 font-mono font-medium"> 2024-07-26</p>
      </div>
    </div>
  );
};

export default AccountBalanceCard;
