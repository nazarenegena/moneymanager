"use client";

import { ITransaction } from "@/components/transactionSection/MainTransactionsTable";
// src/context/BankAccountContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  SetStateAction,
  Dispatch,
} from "react";

interface BankAccountDetails {
  accountHolder: string;
  country: string;
  currency: string;
  accountNumber: string;
}

interface BankAccountContextType {
  balance: number;
  transactions: ITransaction[];
  setTransactions: Dispatch<SetStateAction<ITransaction[]>>;
  accountDetails: BankAccountDetails | null;
  setBalance: (balance: number) => void;
  deposit: (amount: number) => void;
  withdraw: (amount: number) => void;
  setAccountDetails: (details: BankAccountDetails) => void;
}

const BankAccountContext = createContext<BankAccountContextType | undefined>(
  undefined
);

export const useBankAccount = () => {
  const context = useContext(BankAccountContext);
  if (!context) {
    throw new Error("useBankAccount must be used within a BankAccountProvider");
  }
  return context;
};

interface BankAccountProviderProps {
  children: ReactNode;
}

export const BankAccountProvider = ({ children }: BankAccountProviderProps) => {
  const [balance, setBalance] = useState<number>(0);
  const [accountDetails, setAccountDetails] =
    useState<BankAccountDetails | null>(null);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const deposit = (amount: number) => {
    setBalance((prevBalance) => prevBalance + amount);
  };

  const withdraw = (amount: number) => {
    setBalance((prevBalance) => prevBalance - amount);
  };

  return (
    <BankAccountContext.Provider
      value={{
        balance,
        transactions,
        setTransactions,
        setBalance,
        deposit,
        withdraw,
        accountDetails,
        setAccountDetails,
      }}
    >
      {children}
    </BankAccountContext.Provider>
  );
};
