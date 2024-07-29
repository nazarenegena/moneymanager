"use client";

import { useState } from "react";
import "react-country-state-city/dist/react-country-state-city.css";
import * as ibantools from "ibantools";
import { format } from "date-fns";

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
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string>("");

  const [transactionErrorMessage, setTransactionErrorMessage] =
    useState<string>("");

  const [ibanErrorMessage, setIbanErrorMessage] = useState<string>("");
  const { transactions, setTransactions, balance, setBalance } =
    useBankAccount();

  const ibanAccountCheck = (value: string) => {
    return ibantools.validateIBAN(value);
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!ibanAccountCheck(accountNumber).valid) {
      setIbanErrorMessage("Not a Valid IBAN account, check spaces or format ");
      return;
    }

    if (accountHolderName && amount && accountNumber) {
      const transaction = {
        recipient: accountHolderName,
        accountNumber: accountNumber,
        date: format(new Date(), "yyyy-MM-dd HH:mm:ss a"),
        amount: amount,
        debit: false,
        balance: balance - amount,
        transactionType: "transfer",
      };

      if (amount && balance > amount) {
        setTransactions([...transactions, transaction]);
        setBalance(balance - amount);
        setAccountHolderName("");
        setAccountNumber("");
        setAmount(0);
        setBankType("");
      } else {
        setTransactionErrorMessage("insufficient balance, cant send");
      }
    } else {
      setSubmitErrorMessage("failed transaction fill in all the details");
    }
  };
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
        onChange={(e) => setAccountNumber(e.target.value)}
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
      {submitErrorMessage && (
        <p className="text-red-500 text-xs mt-2">{submitErrorMessage}</p>
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
