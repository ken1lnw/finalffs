"use client";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function PrintButton(props:any) {
  const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);

  const handlePrint = () => {
    // เปิด URL โดยใช้ documentsId
    window.open(`/docsign/${props.documentsId}.pdf`, "_blank");
  };

  return (
    <>
      <button
        type="button"
        className=" justify-center rounded-md bg-blue-500 px-2 py-2 mr-1 hover:bg-blue-400"
        // onClick={() => setOpen(true)} // Set open state to true when button is clicked
        onClick={() => handlePrint()} // เรียกใช้ handlePrint เมื่อคลิก
      >
        <svg
          className="w-5 h-5 text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M5 20h10a1 1 0 0 0 1-1v-5H4v5a1 1 0 0 0 1 1Z" />
          <path d="M18 7H2a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2v-3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Zm-1-2V2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3h14Z" />
        </svg>
      </button>


    </>
  );
}
