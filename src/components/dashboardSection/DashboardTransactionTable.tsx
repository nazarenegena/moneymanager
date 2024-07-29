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
  }),
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
    enableColumnFilter: false,

    footer: (info) => info.column.id,
  }),

  columnHelper.accessor("accountNumber", {
    header: () => "Account No.",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
    enableColumnFilter: false,
  }),

  columnHelper.accessor("amount", {
    header: () => "Amount",
    cell: ({ row: { original } }) => {
      return (
        <>
          <div
            className={`${
              original.debit
                ? "text-green-600 bg-green-100 rounded-full w-32 text-center py-1"
                : "text-red-600 bg-red-100 rounded-full w-32 text-center py-1"
            } font-semibold`}
          >
            $ {original.amount}
          </div>
        </>
      );
    },
    enableColumnFilter: false,

    // meta: {
    //   filterVariant: "range",
    // },
    // filterFn: "includesString",
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
    },

    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    filterFromLeafRows: true,
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
      <p className="text-2xl  font-semibold text-gray-800 mb-2">Transactions</p>
      <table className="w-full mt-12 ">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="text-gray-800 font-medium text-lg  py-6 "
                >
                  {header.column.getCanFilter() ? (
                    <div>
                      <Filter column={header.column} />
                    </div>
                  ) : null}
                  {header.isPlaceholder ? null : (
                    <>
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
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
                      {/* {header.column.getCanFilter() ? (
                        <div>
                          <Filter column={header.column} />
                        </div>
                      ) : null} */}
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
function Filter({ column }: { column: Column<any, unknown> }) {
  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};

  return filterVariant === "range" ? (
    <div>
      <div className="flex space-x-2">
        {/* See faceted column filters example for min max values functionality */}
        <DebouncedInput
          type="number"
          value={(columnFilterValue as [number, number])?.[0] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder={`Min`}
          className="w-24 border shadow rounded"
        />
        <DebouncedInput
          type="number"
          value={(columnFilterValue as [number, number])?.[1] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder={`Max`}
          className="w-24 border shadow rounded"
        />
      </div>
      <div className="h-1" />
    </div>
  ) : filterVariant === "select" ? (
    <select
      onChange={(e) => column.setFilterValue(e.target.value)}
      value={columnFilterValue?.toString()}
    >
      {/* See faceted column filters example for dynamic select options */}
      <option value="">All</option>
      <option value="receipient">Deposits</option>
      <option value="accountNumber">Acc No</option>
      <option value="debit">debit</option>
    </select>
  ) : (
    <DebouncedInput
      className="w-38 text-sm h-8 text-center border border-gray-200 inner-shadow rounded-full"
      onChange={(value) => column.setFilterValue(value)}
      placeholder={`Search...`}
      type="text"
      value={(columnFilterValue ?? "") as string}
    />
    // See faceted column filters example for datalist search suggestions
  );
}
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

export default DashboardTransactionTable;
