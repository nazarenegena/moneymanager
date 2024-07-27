"use client";

import React from "react";
import { useState } from "react";

import { useBankAccount } from "@/context/bankAccountContext";

type Props = {};

const AccountBalanceCard = (props: Props) => {
  const [date] = useState<Date>(new Date());

  const { accountDetails, balance, setBalance } = useBankAccount();

  return (
    <div className="bg-sky-100 w-96 h-48 rounded-md p-4 shadow-md">
      {" "}
      <p className="text-sm font-semibold">Available Balance</p>
      <p className="text-4xl font-mono tracking-wider font-medium mt-5 ">
        {accountDetails?.currency} <span>{balance.toFixed(2)}</span>
      </p>
      <div className="mt-5 text-sm font-semibold">
        Date :
        <p className="mt-2 font-mono font-medium"> {date.toDateString()}</p>
      </div>
    </div>
  );
};

export default AccountBalanceCard;
