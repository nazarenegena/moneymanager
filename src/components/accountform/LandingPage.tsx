import React from "react";
import CreateBankAccountForm from "./CreateBankAccountForm";
import MobilePayment from "@/app/assets/mobile-payment.svg";
import Image from "next/image";

type Props = {};

const LandingPage = (props: Props) => {
  return (
    <div className="grid grid-cols-2 h-full">
      <div className=" bg-gray-500 flex justify-center">
        <Image
          src={MobilePayment}
          alt="mobileappsvg"
          width={500}
          height={500}
        />{" "}
      </div>
      <CreateBankAccountForm />
    </div>
  );
};

export default LandingPage;
