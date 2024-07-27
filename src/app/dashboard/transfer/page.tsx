"use client";
import React, { useState } from "react";
import CashTransactionForm from "@/components/transferSection/CashTransactionForm";
import CheckingAmountCard from "@/components/transferSection/CheckingAmountCard";
import TransferMoneyForm from "@/components/transferSection/TransferMoneyForm";
import Modal from "@/components/transferSection/Modal";

export default function Page() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [transactionType, setTransactionType] = useState("");

  const buttonStyles =
    "text-white w-56 h-10 rounded-md cursor-pointer text-md shadow-md";
  return (
    <div className="bg-white ml-2 pl-10 pr-2 pt-14 rounded-md mt-4">
      <p className="text-2xl font-semibold text-gray-800 ">Transfer</p>
      <div className="grid grid-cols-[40%_60%] ">
        <div className="h-80">
          <CheckingAmountCard />
          <div className="mt-[7.8rem] flex">
            <button
              onClick={() => {
                setTransactionType("deposit");
                setIsOpen(true);
              }}
              className={`${buttonStyles} bg-cyan-500 hover:bg-cyan-600/80`}
            >
              Make a deposit
            </button>
            <button
              onClick={() => {
                setTransactionType("withdraw");
                setIsOpen(true);
              }}
              className={`${buttonStyles} ml-4 bg-black/95 hover:bg-black/70`}
            >
              Withdraw Money
            </button>
          </div>
        </div>
        <div className="">
          <TransferMoneyForm />
        </div>
      </div>

      {isOpen ? (
        <Modal onClose={() => setIsOpen(false)}>
          <CashTransactionForm
            setIsOpen={setIsOpen}
            transactionType={transactionType}
          />
        </Modal>
      ) : null}
    </div>
  );
}
