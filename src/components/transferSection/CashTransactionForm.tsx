"use client";

import { useState } from "react";
import { useBankAccount } from "@/context/bankAccountContext";

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  transactionType: string;
};

const CashTransactionForm = ({ transactionType, setIsOpen }: Props) => {
  const formStyles = "flex flex-col items-center justify-center h-48 w-80 ";
  const inputTitleStyle =
    "text-center text-gray-600 font-semibold tracking-wide";
  const inputStyles =
    "mt-6 px-5 text-center h-10 w-auto border border-zinc-200 text-gray-900 shadow-inner text-sm rounded-md outline-none focus:ring-cyan-500 focus:border-cyan-500";
  const buttonStyle =
    " mt-10 w-28 border border-green-700 text-green-800 font-semibold bg-green-200  rounded-md mr-3 h-7 cursor-pointer hover:bg-green-400/80";
  const {
    balance,
    deposit,
    withdraw,
    setBalance,
    transactions,
    setTransactions,
  } = useBankAccount();
  const [amount, setAmount] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseFloat(event.target.value));
    setErrorMessage("");
  };

  const handleTransactionSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (transactionType === "deposit") {
      deposit(amount);
      const debitTransaction = {
        recipient: "personal",
        accountNumber: "KW81CBKU0000000000001234560101",
        date: new Date().toDateString(),
        amount: amount,
        debit: true,
        balance: balance + amount,
      };
      setTransactions([...transactions, debitTransaction]);
    } else if (transactionType === "withdraw") {
      if (amount <= balance) {
        withdraw(amount);
        const creditTransaction = {
          recipient: "personal",
          accountNumber: "KW81CBKU0000000000001234560101",
          date: new Date().toDateString(),
          amount: amount,
          debit: false,
          balance: balance - amount,
        };
        setTransactions([...transactions, creditTransaction]);
      } else {
        setErrorMessage("Insufficient balance");
      }
    }
    setAmount(0);
    const handleClose = () => {
      setIsOpen(false);
    };

    handleClose();
  };

  return (
    <div>
      {transactionType === "deposit" ? (
        <form onSubmit={handleTransactionSubmit} className={`${formStyles}`}>
          <p className={`${inputTitleStyle}`}>Deposit Money</p>
          <input
            placeholder="enter amount"
            type="text"
            onChange={handleAmountChange}
            className={`${inputStyles}`}
          />
          <button className={`${buttonStyle}`}>Deposit</button>
        </form>
      ) : (
        <form className={`${formStyles}`} onSubmit={handleTransactionSubmit}>
          <p className={`${inputTitleStyle}`}>Withdraw Money</p>
          <input
            placeholder="enter amount"
            type="text"
            onChange={handleAmountChange}
            className={`${inputStyles}`}
          />
          <button className={`${buttonStyle}`}>Withdraw</button>
          {errorMessage && (
            <p className="text-red-500 mt-5 text-sm font-normal">
              {errorMessage}
            </p>
          )}
        </form>
      )}
    </div>
  );
};

export default CashTransactionForm;
