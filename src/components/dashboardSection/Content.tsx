import React from "react";
import AccountBalanceCard from "./AccountBalanceCard";
import DashboardTransactionTable from "./DashboardTransactionTable";

type Props = {};

const Content = (props: Props) => {
  return (
    <div className="mt-11">
      <AccountBalanceCard />
      <DashboardTransactionTable />
    </div>
  );
};

export default Content;
