"use client";

import React from "react";
import Link from "next/link";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
  LanguageSelect,
  // @ts-ignore
} from "react-country-state-city";

import "react-country-state-city/dist/react-country-state-city.css";

type Props = {};

const CreateBankAccountForm = (props: Props) => {
  const labelStyles = "lg:mt-4 mt-2 text-sm text-gray-600 mb-3 ";
  const inputStyles =
    "lg:h-10 h-8  lg:w-80 w-60 px-2 border border-zinc-200 text-gray-900 text-sm rounded-md outline-none focus:ring-cyan-500 focus:border-cyan-500";
  return (
    <div className="flex flex-col justify-center relative">
      <p className="absolute  lg:top-10 top-0 lg:right-14 right-0 lg:text-lg text-sm font-mono font-semibold text-cyan-600 leading-10">
        MoneyManager
      </p>

      <form className="flex flex-col lg:px-48  px-24 justify-center ">
        <p className="mb-4 lg:text-xl text-sm font-semibold text-black">
          Create Bank Account{" "}
        </p>
        <label htmlFor="accountholder" className={`${labelStyles}`}>
          Account Holder Name
        </label>
        <input
          type="text"
          id="accountholder"
          name="accountholder"
          className={`${inputStyles}`}
          required
        />
        <label htmlFor="country" className={`${labelStyles}`}>
          Country
        </label>
        <input
          type="text"
          id="country"
          name="accountholder"
          className={`${inputStyles}`}
          required
        />
        <label htmlFor="currency" className={`${labelStyles}`}>
          Currency
        </label>
        <input
          type="text"
          id="currency"
          name="currency"
          className={`${inputStyles}`}
          required
        />
        <label htmlFor="dateofbirth" className={`${labelStyles}`}>
          Date of Birth
        </label>
        <input
          type="text"
          id="dateofbirth"
          name="dateofbirth"
          className={`${inputStyles}`}
          required
        />
        <label htmlFor="bankname" className={`${labelStyles}`}>
          Bank Name
        </label>
        <input
          type="text"
          id="bankname"
          name="bankname"
          className={`${inputStyles}`}
          required
        />
        <label htmlFor="accountnumber" className={`${labelStyles}`}>
          Account Number
        </label>
        <input
          type="text"
          id="accountnumber"
          name="accountnumber"
          className={`${inputStyles}`}
          required
        />
        <button className="bg-black text-white text-md lg:h-10 h-8 lg:w-80 w-60 rounded-md mt-9 hover:bg-cyan-600 shadow-sm focus:outline-none focus:ring-4 focus:ring-cyan-300">
          <Link href={"/dashboard"}> Create Account</Link>
        </button>
      </form>
    </div>
  );
};

export default CreateBankAccountForm;
