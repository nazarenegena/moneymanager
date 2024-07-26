import React from "react";
import AccountBalanceCard from "./AccountBalanceCard";
import TransactionTable from "./TransactionTable";

type Props = {};

const Content = (props: Props) => {
  return (
    <div className="mt-11">
      <AccountBalanceCard />
      <TransactionTable />
    </div>
  );
};

export default Content;
