import React, { ReactNode } from "react";
import { TiCancelOutline } from "react-icons/ti";

type ModalProps = {
  children: ReactNode;
  onClose?: () => void;
};

const Modal = ({ children, onClose }: ModalProps) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 backdrop-blur-sm bg-black/60 flex justify-center items-center z-50">
      <TiCancelOutline
        onClick={onClose}
        className=" absolute top-[22rem] right-[31rem] cursor-pointer"
        size={36}
        fill="#ffff"
      />
      <div
        className="bg-white p-5 rounded-md shadow-md "
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
