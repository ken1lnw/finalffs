"use client";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function DetailButton(props: any) {
  const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);
  const userData = props.user;

  return (
    <>
      <button
        type="button"
        className=" justify-center rounded-md bg-green-500 px-2 py-2 mr-1 hover:bg-green-400"
        onClick={() => setOpen(true)} // Set open state to true when button is clicked
      >
        <svg
          className="w-5 h-5 text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm9.4-5.5a1 1 0 1 0 0 2 1 1 0 1 0 0-2ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4c0-.6-.4-1-1-1h-2Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="md:flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="">
                      {/* <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div> */}
                      <div className="mt-3 text-center sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          ข้อมูล {userData?.prefix} {userData?.name}{" "}
                          {userData?.lname}
                        </Dialog.Title>
                        <div className="mt-2">
                          <div className="grid grid-cols-12 gap-2">
                            <p className="py-2 col-span-12 md:col-span-3 md:text-right">
                              รหัสนักศึกษา :
                            </p>
                            <p className="py-2 col-span-12 md:col-span-9">
                              {userData?.userId}
                            </p>

                            <p className="py-2 col-span-12 md:col-span-3 md:text-right">
                              คำนำหน้า :
                            </p>
                            <p className="py-2 col-span-12 md:col-span-9">
                              {userData?.prefix}
                            </p>

                            <p className="py-2 col-span-12 md:col-span-3 md:text-right">
                              ชื่อ :
                            </p>
                            <p className="py-2 col-span-12 md:col-span-9">
                              {userData?.name}
                            </p>

                            <p className="py-2 col-span-12 md:col-span-3 md:text-right">
                              นามสกุล :
                            </p>
                            <p className="py-2 col-span-12 md:col-span-9">
                              {userData?.lname}
                            </p>

                            <p className="py-2 col-span-12 md:col-span-3 md:text-right">
                              สาขาวิชา :
                            </p>
                            <p className="py-2 col-span-12 md:col-span-9">
                              {userData?.major}
                            </p>

                            <p className="py-2 col-span-12 md:col-span-3 md:text-right">
                              ระดับผู้ใช้ :
                            </p>
                            <p className="py-2 col-span-12 md:col-span-9">
                              {userData?.role}
                            </p>

                            <p className="py-2 col-span-12 md:col-span-3 md:text-right">
                              ระดับแอดมิน :
                            </p>
                            <p className="py-2 col-span-12 md:col-span-9">
                              {userData?.admin.toString()}
                            </p>
{/* 
                            <p className="py-2 col-span-12 md:col-span-3 md:text-right">
                              ห้องเรียน :
                            </p>
                     
                     
                              {Array.isArray(userData?.room) &&
                              userData?.room.length > 0 ? (
                                <p className="py-2 col-span-12 md:col-span-9">
                                  {userData?.room}
                                </p>
                              ) : (
                                <p className="py-2 col-span-12 md:col-span-9">
                                  ไม่มี
                                </p>
                              )} */}
                     


                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    {/* <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={() => setOpen(false)}
                    >
                      ยืนยัน
                    </button> */}
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-400 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      ปิด
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
