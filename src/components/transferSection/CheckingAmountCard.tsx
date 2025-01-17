"use client";

import { useState } from "react";
import { useBankAccount } from "@/context/bankAccountContext";

type Props = {};

const CheckingAmountCard = (props: Props) => {
  const { balance, accountDetails, setBalance } = useBankAccount();
  const [date, setDate] = useState<Date>(new Date());
  return (
    <div className="bg-black/95 w-[30rem] h-[30rem] rounded-md p-4 shadow-lg mt-12">
      {" "}
      <p className="mt-6 text-lg font-semibold text-gray-300">
        Bank Account Profile
      </p>
      <p className="mt-10 text-md font-normal text-gray-400">Balance</p>
      <p className="text-4xl text-cyan-600 font-mono tracking-wider font-medium mt-6 ">
        {accountDetails?.currency} <span>{balance.toFixed(2)}</span>
      </p>
      {/* <hr className="bg-black mt-5" /> */}
      <div className="bg-gray-500 w-full h-0.5 mt-5"></div>
      <div>
        <p className="text-gray-400 font-medium mt-5">IBAN Account</p>
        <p className="text-gray-300 mt-2 font-bold tracking-wider">
          {accountDetails?.accountNumber}
        </p>
        <p className="text-gray-400 mt-5 font-medium">Account Holder</p>
        <p className="text-gray-300 mt-2 font-bold tracking-wider">
          {accountDetails?.accountHolder}
        </p>
      </div>
      <div className="mt-5 text-sm font-semibold text-gray-400">
        Date :
        <p className="mt-2 font-mono font-medium text-gray-300">
          {date.toDateString()}
        </p>
      </div>
    </div>
  );
};

export default CheckingAmountCard;
