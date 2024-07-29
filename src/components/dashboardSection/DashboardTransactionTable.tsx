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
import { BsSearch } from "react-icons/bs";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

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
            <p className=" text-stat py-1  tracking-wider">
              {" "}
              ${original.amount}
            </p>
          ) : (
            <p className="text-start py-1  tracking-wider">
              {" "}
              ${original.amount}
            </p>
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
      return <div className=" tracking-wider">${original.balance}</div>;
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
  const inputStyles =
    "h-10 px-4  border border-zinc-200 text-gray-900 text-sm rounded-md outline-none focus:ring-cyan-500 focus:border-cyan-500 border rounded-md shadow-md";
  const paginationButtonStyle =
    "border rounded p-1 shadow-md w-10 h-8 pl-2 mr-3  cursor-pointer active:border active:border-cyan-400";
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "date", desc: true },
  ]);

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
    enableSortingRemoval: false,
  });

  return (
    <div className="p-2  mt-5">
      <p className="text-lg mt-5 font-semibold text-gray-500 mb-2">
        Transactions
      </p>
      <div className=" flex justify-between mt-5 ">
        <div className="flex justify-between">
          <div className="relative">
            <BsSearch
              className="absolute top-3 left-4 text-neutral-600 cursor-pointer"
              size={18}
            />
            <input
              className={`${inputStyles} w-60 pl-12 `}
              placeholder="search account no."
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
          </div>

          <input
            placeholder="search by date"
            className={`${inputStyles} w-40 mx-8 p-4 cursor-pointer bg-gray-200 `}
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
            className={`${inputStyles} w-48 px-6 cursor-pointer bg-gray-200`}
          >
            <option value="">Transaction Types </option>
            <option value="deposit">Deposit</option>
            <option value="withdraw">Withdrawals</option>
            <option value="Transfer">Transfer</option>
          </select>
        </div>

        <div className="relative">
          <BsSearch
            className="absolute top-3 left-4 text-neutral-600 cursor-pointer"
            size={18}
          />
          <input
            className={`${inputStyles} w-60 pl-12`}
            placeholder="search recipient"
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
        </div>
      </div>
      <table className="w-full mt-2 ">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="text-gray-800 font-medium text-md  py-6 text-start border-b border-gray-200 h-20"
                >
                  {header.isPlaceholder ? null : (
                    <>
                      <div
                        className={
                          header.column.getCanSort()
                            ? "cursor-pointer select-none flex items-center gap-3 hover: hover:underline underline-offset-8 decoration-gray-600 decoration-1"
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
                          asc: (
                            <span>
                              <IoIosArrowUp />
                            </span>
                          ),
                          desc: (
                            <span>
                              <IoIosArrowDown />
                            </span>
                          ),
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
      <div className="flex justify-between gap-2">
        <div>
          <button
            className={`${paginationButtonStyle}`}
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <MdKeyboardDoubleArrowLeft />
          </button>
          <button
            className={`${paginationButtonStyle}`}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <MdOutlineKeyboardArrowLeft />
          </button>
        </div>
        <div className="flex justify-between">
          <span className="flex items-center gap-1">
            <div className="text-gray-500 mr-2 font-medium">Page</div>
            <strong className="text-cyan-500 font-bold mr-4 ">
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </span>
          <span className="flex items-center gap-1 text-gray-500 font-medium mr-2 cursor-pointer">
            | Go to page:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="w-16 text-cyan-500 font-bold p-1 text-center  border-zinc-200  text-sm outline-none focus:ring-cyan-500 focus:border-cyan-500 border rounded-md shadow-md"
            />
          </span>
          <select
            className=" text-gray-500 font-medium p-1 text-center  border-zinc-200  text-sm outline-none focus:ring-cyan-500 focus:border-cyan-500 border rounded-md shadow-md"
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

        <div>
          <button
            className={`${paginationButtonStyle}`}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <MdOutlineKeyboardArrowRight />
          </button>
          <button
            className={`${paginationButtonStyle}`}
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <MdKeyboardDoubleArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardTransactionTable;
