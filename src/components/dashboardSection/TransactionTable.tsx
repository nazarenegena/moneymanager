"use client";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import React, { useState } from "react";

type Props = {};

interface ITransaction {
  date: string;
  accountNumber: string;
  recipient: string;
  amount: string;
}

const transactionData: ITransaction[] = [
  {
    date: "2024-05-12",
    accountNumber: "AL47 2121 1009 3569 8711",
    recipient: "James",
    amount: " + USD 5000",
  },
  {
    date: "2024-05-19",
    accountNumber: "LU28 2801 9406 4475 0003",
    recipient: "Daisy",
    amount: " - USD 2000",
  },
  {
    date: "2024-06-27",
    accountNumber: "CY17 0128 0012 5272 4002",
    recipient: "Brenda",
    amount: " + USD 15000",
  },
  {
    date: "2024-07-10",
    accountNumber: "NO93 8601 1117 0947 0128",
    recipient: "Peter",
    amount: " + USD 200,000",
  },
  {
    date: "2024-07-21",
    accountNumber: "KW81 CBK5 0063 7845 9406",
    recipient: "James",
    amount: " - USD 5000",
  },
];
const columnHelper = createColumnHelper<ITransaction>();
const columns = [
  columnHelper.accessor("date", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("recipient", {
    header: () => "name",
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("accountNumber", {
    header: () => "account",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),

  columnHelper.accessor("amount", {
    header: () => "amount",
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
];

const TransactionTable = (props: Props) => {
  const [transactions, setTransactions] = useState(() => [...transactionData]);
  const table = useReactTable({
    data: transactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2 mt-10 ">
      <p className="text-xl  font-semibold text-gray-800 mb-2">Transactions</p>
      <table className="w-full">
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
              className="border-b border-gray-200 h-20 font-normal text-sm text-gray-500"
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

export default TransactionTable;
