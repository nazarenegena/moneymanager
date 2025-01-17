"use client";

import React from "react";
import avatarImg from "@/app/assets/avatar-img.jpg";
import { IoIosNotifications } from "react-icons/io";
import { useBankAccount } from "@/context/bankAccountContext";

import Image from "next/image";

type Props = {};

const Profile = (props: Props) => {
  const { accountDetails } = useBankAccount();
  return (
    <div className="flex justify-center items-center mr-6">
      <Image src={avatarImg} alt="avatar-img" width={70} className="mr-4" />
      <p className="text-md font-semibold text-gray-800 mr-2">
        {accountDetails?.accountHolder}
      </p>
      <div className="relative">
        <p className="text-red-600 text-4xl absolute bottom-3 right-2">.</p>
        <IoIosNotifications size={22} fill="#374151" className="mr-2" />
      </div>
    </div>
  );
};

export default Profile;
