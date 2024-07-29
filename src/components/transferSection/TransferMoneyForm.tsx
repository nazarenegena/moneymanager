"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
  LanguageSelect,
  // @ts-ignore
} from "react-country-state-city";

import "react-country-state-city/dist/react-country-state-city.css";
import * as ibantools from "ibantools";
import { useBankAccount } from "@/context/bankAccountContext";
/// <reference path="iban.d.ts" />

type Props = {};

const TransferMoneyForm = (props: Props) => {
  const labelStyles = "lg:mt-4 mt-2 text-sm text-gray-700 mb-3 font-medium";
  const inputStyles =
    "lg:h-10 h-8  lg:w-96 w-60 px-2 border border-zinc-200 text-gray-900 shadow-inner text-sm rounded-md outline-none focus:ring-cyan-500 focus:border-cyan-500";

  const [accountHolderName, setAccountHolderName] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [bankType, setBankType] = useState("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [transactionErrorMessage, setTransactionErrorMessage] =
    useState<string>("");

  const [ibanErrorMessage, setIbanErrorMessage] = useState<string>("");
  const { transactions, setTransactions, balance, setBalance } =
    useBankAccount();

  const handleBankTypeChange = (value: string) => {
    setBankType(value);
    if (value === "SWIFT") {
      setErrorMessage("Can't send to this bank account");
    } else {
      setErrorMessage("");
    }
  };

  const ibanAccounCheck = (value: string) => {
    setAccountNumber(value);
    try {
      const result = ibantools.validateIBAN(value);
      if (!result.valid) {
        setIbanErrorMessage("not valid or remove spaces");
      } else {
        setIbanErrorMessage("");
      }
      console.log(`IBAN ${value} valid`);
    } catch (error) {
      setErrorMessage("Invalid IBAN format");
    }
    return true;
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (accountHolderName && amount && accountNumber) {
      const transaction = {
        recipient: accountHolderName,
        accountNumber: accountNumber,
        date: new Date().toDateString(),
        amount: amount,
        debit: false,
      };

      if (amount && balance > amount) {
        setTransactions([...transactions, transaction]);
        setBalance(balance - amount);
      } else {
        setTransactionErrorMessage("insufficient balance, cant send");
      }
    } else {
      console.log("not allowed");
    }
    setAccountHolderName("");
    setAccountNumber("");
    setAmount(0);
    setBankType("");
  };
  console.log(transactions, "the transaction");

  return (
    <form className="flex flex-col lg:px-48 px-24 justify-center mt-10">
      <p className="mb-4 lg:text-lg text-sm font-semibold text-gray-600">
        Transfer money
      </p>
      <label htmlFor="accountholder" className={`${labelStyles}`}>
        Account Holder Name
      </label>
      <input
        type="text"
        id="accountholder"
        name="accountholder"
        className={`${inputStyles}`}
        value={accountHolderName}
        onChange={(e) => setAccountHolderName(e.target.value)}
        required
      />

      <div>
        <p className="mt-4 text-sm text-gray-700 mb-3 font-medium">
          Bank Account Type
        </p>
        <div className="flex flex-col">
          <div className="flex text-center items-center">
            <input
              type="radio"
              id="iban"
              name="bankType"
              value="IBAN"
              checked={bankType === "IBAN"}
              onChange={(e) => handleBankTypeChange(e.target.value)}
              className="peer appearance-none w-4 h-4 border-2 border-cyan-500 rounded-full focus:ring-cyan-500 focus:ring"
              required
            />
            <label
              htmlFor="iban"
              className="ml-2 text-xs text-gray-700 font-bold peer-checked:text-cyan-500"
            >
              IBAN
            </label>
          </div>
          <div className="mt-3 flex text-center items-center">
            <input
              type="radio"
              id="swift"
              name="bankType"
              value="SWIFT"
              checked={bankType === "SWIFT"}
              onChange={(e) => handleBankTypeChange(e.target.value)}
              className="peer appearance-none w-4 h-4 border-2 border-cyan-500 rounded-full focus:ring-cyan-500 focus:ring"
              required
            />
            <label
              htmlFor="swift"
              className="ml-2 text-xs text-gray-700 font-bold peer-checked:text-cyan-500"
            >
              SWIFT
            </label>
          </div>
        </div>
      </div>

      {errorMessage && (
        <p className="text-red-500 text-xs mt-2">{errorMessage}</p>
      )}

      <label htmlFor="bankname" className={`${labelStyles}`}>
        Bank Name
      </label>
      <input
        type="text"
        id="bankname"
        name="bankname"
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
        className={`${inputStyles}`}
        value={accountNumber}
        onChange={(e) => ibanAccounCheck(e.target.value)}
        required
      />
      {ibanErrorMessage && (
        <p className="text-red-500 text-xs mt-2">{ibanErrorMessage}</p>
      )}

      <label htmlFor="bankname" className={`${labelStyles}`}>
        Amount
      </label>
      <input
        type="number"
        id="amount"
        name="amount"
        onChange={(e) => setAmount(parseFloat(e.target.value))}
        className={`${inputStyles}`}
        required
      />
      {transactionErrorMessage && (
        <p className="text-red-500 text-xs mt-2">{transactionErrorMessage}</p>
      )}
      <button
        className="bg-black/95 text-white text-md lg:h-10 h-8 lg:w-96 w-60 rounded-md mt-9 hover:bg-black/70 shadow-sm"
        onClick={handleSubmit}
      >
        Transfer
      </button>
    </form>
  );
};

export default TransferMoneyForm;
