"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaHome } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { TiArrowSync } from "react-icons/ti";
import { SiSimpleanalytics } from "react-icons/si";
import { IoMdSettings } from "react-icons/io";
import { CiLogout } from "react-icons/ci";

type Props = {};

const Sidebar = (props: Props) => {
  const pathname = usePathname();

  const sidebarComponentsStyles =
    "my-7 font-medium text-md text-zinc-600 hover hover:bg-gray-100 h-12 pl-4 py-3 rounded-md flex items-center";
  return (
    <div className="flex flex-col bg-white ml-2 px-2 pt-20 rounded-md mt-6">
      <Link
        href="/"
        className="font-mono font-semibold text-cyan-600 pl-4 text-xl leading-4"
      >
        MoneyManager
      </Link>
      <Link
        href="/dashboard"
        className={`${sidebarComponentsStyles} ${
          pathname === "/dashboard" ? "bg-gray-200 " : null
        } mt-20 `}
      >
        <FaHome className="mr-4" size={20} />
        Dashboard
      </Link>
      <Link
        href="/dashboard/transactions"
        className={`${sidebarComponentsStyles} ${
          pathname === "/dashboard/transactions" ? "bg-gray-200 " : null
        }`}
      >
        <GrTransaction className="mr-4" size={20} />
        Transactions
      </Link>
      <Link
        href="/dashboard/transfer"
        className={`${sidebarComponentsStyles} ${
          pathname === "/dashboard/transfer" ? "bg-gray-200 " : null
        }`}
      >
        <TiArrowSync className="mr-4" size={20} />
        Transfer
      </Link>
      <Link
        href="/dashboard/reports"
        className={`${sidebarComponentsStyles} ${
          pathname === "/dashboard/reports" ? "bg-gray-200 " : null
        }`}
      >
        <SiSimpleanalytics className="mr-4" size={20} />
        Reports
      </Link>
      <div className="mt-64">
        <Link
          href="/dashboard/settings"
          className={`${sidebarComponentsStyles} ${
            pathname === "/dashboard/settings" ? "bg-gray-200 " : null
          }`}
        >
          <IoMdSettings className="mr-4" size={20} />
          Settings
        </Link>
        <Link href="/" className={`${sidebarComponentsStyles}`}>
          <CiLogout className="mr-4" size={20} />
          Log out
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
