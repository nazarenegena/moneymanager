import React from "react";

type Props = {
  setIsOpen: (isOpen: boolean) => void;
  transactionType: string;
};

const CashTransactionForm = ({ setIsOpen, transactionType }: Props) => {
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      {transactionType === "deposit" ? (
        <form className="flex flex-col justify-center h-48 w-80 ">
          <p className="text-center text-gray-600 font-semibold tracking-wide">
            Deposit Money
          </p>
          <input
            placeholder="enter amount"
            type="text"
            className="mt-6 px-5 text-center h-10 w-auto border border-zinc-200 text-gray-900 shadow-inner text-sm rounded-md outline-none focus:ring-cyan-500 focus:border-cyan-500"
          />
          <div className="flex justify-center mt-10">
            <button className="w-28 border border-green-700 text-green-800 font-semibold bg-green-200  rounded-md mr-3 h-7 cursor-pointer hover:bg-green-400/80">
              Deposit
            </button>
            <button className="w-28 border border-red-700 text-red-800 font-semibold bg-red-200 rounded-md cursor-pointer hover:bg-red-400/80">
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <form className="flex flex-col justify-center h-48 w-80 ">
          <p className="text-center text-gray-600 font-semibold tracking-wide">
            Withdraw Money
          </p>
          <input
            placeholder="enter amount"
            type="text"
            className="mt-6 px-5 text-center h-10 w-auto border border-zinc-200 text-gray-900 shadow-inner text-sm rounded-md outline-none focus:ring-cyan-500 focus:border-cyan-500"
          />
          <div className="flex justify-center mt-10">
            <button className="w-28 border border-green-700 text-green-800 font-semibold bg-green-200  rounded-md mr-3 h-7 cursor-pointer hover:bg-green-400/80">
              Withdraw
            </button>
            <button className="w-28 border border-red-700 text-red-800 font-semibold bg-red-200 rounded-md cursor-pointer hover:bg-red-400/80">
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CashTransactionForm;
