"use client";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  Column,
  ColumnDef,
  ColumnFiltersState,
  RowData,
  getPaginationRowModel,
  getSortedRowModel,
  SortingFn,
  SortingState,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
} from "@tanstack/react-table";

import React, { useState } from "react";
import Image from "next/image";
import profileImage from "@/app/assets/profile-img.jpg";
import { useBankAccount } from "@/context/bankAccountContext";

type Props = {};

export interface ITransaction {
  date: string;
  accountNumber: string;
  recipient: string;
  amount: number;
  debit: boolean;
  balance: number;
  transactionType: string;
}

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "text" | "range" | "select";
  }
}

const columnHelper = createColumnHelper<ITransaction>();
const columns = [
  columnHelper.accessor("date", {
    header: () => "Date",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
    enableColumnFilter: false,
    enableSorting: true,
  }),
  columnHelper.accessor("recipient", {
    header: () => "Name",
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
    enableColumnFilter: false,
    enableSorting: false,
    footer: (info) => info.column.id,
  }),

  columnHelper.accessor("accountNumber", {
    header: () => "Account No.",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
    enableColumnFilter: false,
    enableSorting: false,
  }),

  columnHelper.accessor("amount", {
    header: () => "Amount",
    cell: ({ row: { original } }) => {
      return (
        <>
          {original.debit ? (
            <p className=" text-stat py-1">{original.amount}</p>
          ) : (
            <p className="text-start py-1">{original.amount}</p>
          )}
        </>
      );
    },
    enableColumnFilter: false,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("transactionType", {
    header: () => "Transction Type",
    cell: ({ row: { original } }) => {
      return (
        <>
          {original.debit ? (
            <p className="text-green-600 bg-green-100 rounded-full w-32 text-center py-1">
              {original.transactionType}
            </p>
          ) : (
            <p className="text-red-600 bg-red-100 rounded-full w-32 text-center py-1">
              {original.transactionType}
            </p>
          )}
        </>
      );
    },
    enableColumnFilter: false,
    meta: {
      filterVariant: "select",
    },
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("balance", {
    header: () => "Balance",
    cell: ({ row: { original } }) => {
      return (
        <div className="font-semibold text-gray-700">$ {original.balance}</div>
      );
    },
    enableColumnFilter: false,
    footer: (info) => info.column.id,
  }),
];

const DashboardTransactionTable = (props: Props) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { transactions, setTransactions } = useBankAccount();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 4,
  });
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data: transactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
    filterFns: {},
    onPaginationChange: setPagination,

    state: {
      columnFilters,
      pagination,
      sorting,
    },
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    filterFromLeafRows: true,
    onSortingChange: setSorting,
  });

  return (
    <div className="p-2  ">
      <input
        placeholder="search by receipient"
        type="text"
        onChange={(e) =>
          setColumnFilters((prev) => [
            ...prev,
            {
              id: "recipient",
              value: e.target.value,
            },
          ])
        }
      />
      <input
        placeholder="search by account no."
        type="text"
        onChange={(e) =>
          setColumnFilters((prev) => [
            ...prev,
            {
              id: "accountNumber",
              value: e.target.value,
            },
          ])
        }
      />
      <input
        placeholder="search by date"
        type="date"
        onChange={(e) =>
          setColumnFilters((prev) => [
            ...prev,
            {
              id: "date",
              value: e.target.value,
            },
          ])
        }
      />

      <select
        onChange={(e) =>
          setColumnFilters((prev) => [
            ...prev,
            {
              id: "transactionType",
              value: e.target.value,
            },
          ])
        }
      >
        <option value="">All</option>
        <option value="deposit">Deposit</option>
        <option value="withdraw">Withdrawals</option>
        <option value="Transfer">Transfer</option>
      </select>
      <p className="text-2xl  font-semibold text-gray-800 mb-2">Transactions</p>
      <table className="w-full mt-12 ">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="text-gray-800 font-medium text-lg  py-6 text-start"
                >
                  {header.isPlaceholder ? null : (
                    <>
                      <div
                        className={
                          header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : ""
                        }
                        onClick={header.column.getToggleSortingHandler()}
                        title={
                          header.column.getCanSort()
                            ? header.column.getNextSortingOrder() === "asc"
                              ? "Sort ascending"
                              : header.column.getNextSortingOrder() === "desc"
                              ? "Sort descending"
                              : "Clear sort"
                            : undefined
                        }
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: " 🔼",
                          desc: " 🔽",
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </>
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
      <div className="flex items-center gap-2">
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DashboardTransactionTable;
