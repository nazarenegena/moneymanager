// src/components/CreateBankAccountForm.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { useBankAccount } from "@/context/bankAccountContext";
import Link from "next/link";
import "react-country-state-city/dist/react-country-state-city.css";

type Props = {};

const CreateBankAccountForm = (props: Props) => {
  const labelStyles = "lg:mt-4 mt-2 text-sm text-gray-600 mb-3 ";
  const inputStyles =
    "lg:h-10 h-8  lg:w-80 w-60 px-2 border border-zinc-200 text-gray-900 text-sm rounded-md outline-none focus:ring-cyan-500 focus:border-cyan-500";

  const { setBalance, setAccountDetails, accountDetails } = useBankAccount();
  const router = useRouter();

  const [accountHolder, setAccountHolder] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [currency, setCurrency] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (accountHolder && accountNumber) {
      setAccountDetails({
        accountHolder,
        country,
        currency,
        accountNumber,
      });

      router.push("/dashboard");
    } else {
      setErrorMessage("fill all input fields");
    }
    // Clear the form
    setAccountHolder("");
    setAccountNumber("");
    setBalance(0);
  };

  return (
    <div className="flex flex-col justify-center relative">
      <p className="absolute  lg:top-10 top-0 lg:right-14 right-0 lg:text-lg text-sm font-mono font-semibold text-cyan-600 tracking-widest">
        MoneyManager
      </p>

      <form className="flex flex-col lg:px-48  px-24 justify-center">
        <p className="mb-4 lg:text-xl text-sm font-semibold text-black">
          Create Bank Account{" "}
        </p>
        <label htmlFor="accountholder" className={`${labelStyles}`}>
          Account Holder Name
        </label>
        <input
          placeholder="enter name"
          type="text"
          id="accountholder"
          name="accountholder"
          value={accountHolder}
          onChange={(e) => setAccountHolder(e.target.value)}
          className={`${inputStyles}`}
          required
        />
        <label htmlFor="accountnumber" className={`${labelStyles}`}>
          Account Number
        </label>
        <input
          placeholder="BE68539007547034"
          type="text"
          id="accountnumber"
          name="accountnumber"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          className={`${inputStyles}`}
          required
        />
        {errorMessage && (
          <p className="text-red-500 text-xs mt-2">{errorMessage}</p>
        )}{" "}
        <button
          onClick={handleSubmit}
          className="bg-black/95 text-white text-md lg:h-10 h-8 lg:w-80 w-60 rounded-md mt-9 hover:bg-cyan-600 shadow-sm focus:outline-none focus:ring-4 focus:ring-cyan-300"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default CreateBankAccountForm;
