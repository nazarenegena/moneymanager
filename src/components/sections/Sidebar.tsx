import Link from "next/link";
import React from "react";

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <div>
      <Link href={"/"} className="bg-blue-300">
        HomeLogo
      </Link>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/dashboard/transactions">Transactions</Link>
      <Link href="/dashboard/mywallet">My Wallet</Link>
      <Link href="/dashboard/search">Search</Link>
    </div>
  );
};

export default Sidebar;
