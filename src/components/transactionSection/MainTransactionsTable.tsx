"use client";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import React, { useState } from "react";
import Image from "next/image";
import profileImage from "@/app/assets/profile-img.jpg";

type Props = {};

interface ITransaction {
  date: string;
  accountNumber: string;
  recipient: string;
  amount: string;
  debit: boolean;
}

const transactionData: ITransaction[] = [
  {
    date: "2024-05-12",
    accountNumber: "AL47 2121 1009 3569 8711",
    recipient: "James_A",
    amount: " + $ 5000",
    debit: true,
  },
  {
    date: "2024-05-19",
    accountNumber: "LU28 2801 9406 4475 0003",
    recipient: "Daisy_K",
    amount: " - $ 2000",
    debit: false,
  },
  {
    date: "2024-06-27",
    accountNumber: "CY17 0128 0012 5272 4002",
    recipient: "Brenda_M",
    amount: " + $ 15000",
    debit: true,
  },
  {
    date: "2024-07-10",
    accountNumber: "NO93 8601 1117 0947 0128",
    recipient: "Peter_J",
    amount: " + $ 200,000",
    debit: true,
  },
  {
    date: "2024-07-13",
    accountNumber: "KW81 CBK5 0063 7845 9406",
    recipient: "John_W",
    amount: " - $ 5000",
    debit: false,
  },
  {
    date: "2024-07-20",
    accountNumber: "BT14 0128 5272 5102 0012",
    recipient: "Alex_M",
    amount: " + $ 3000",
    debit: true,
  },
  {
    date: "2024-07-23",
    accountNumber: "JW91 0063 7845 9406 CBK5",
    recipient: "Milan_K",
    amount: " - $ 1200",
    debit: false,
  },
];
const columnHelper = createColumnHelper<ITransaction>();
const columns = [
  columnHelper.accessor("recipient", {
    header: () => "Name",
    // cell: (info) => info.renderValue(),
    cell: ({ row: { original } }) => {
      return (
        <div className="flex  items-center mr-6">
          <Image
            src={profileImage}
            alt="profile-img "
            width={30}
            className="mr-3"
          />
          {original.recipient}
        </div>
      );
    },
    footer: (info) => info.column.id,
  }),

  columnHelper.accessor("accountNumber", {
    header: () => "Account No.",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),

  columnHelper.accessor("amount", {
    header: () => "Amount",
    cell: ({ row: { original } }) => {
      return (
        <div
          className={`${
            original.debit
              ? "text-green-600 bg-green-100 rounded-full w-32 text-center py-1"
              : "text-red-600 bg-red-100 rounded-full w-32 text-center py-1"
          } font-semibold`}
        >
          {original.amount}
        </div>
      );
    },
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("date", {
    header: () => "Date",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
];

const MainTransactionTable = (props: Props) => {
  const [transactions, setTransactions] = useState(() => [...transactionData]);

  const table = useReactTable({
    data: transactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2  ">
      <p className="text-2xl  font-semibold text-gray-800 mb-2">Transactions</p>
      <table className="w-full mt-12">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="text-gray-800 font-medium text-lg text-start py-6"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="border-b border-gray-200 h-20 font-medium text-sm text-gray-500"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="h-4" />
    </div>
  );
};

export default MainTransactionTable;
