"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function EditButton(props: any) {
  const [open, setOpen] = useState(false);

  const majorItem = props.majorItem;

  const majorId = props?.majorItem?.majorId;
  const cancelButtonRef = useRef(null);

  const [teacherId, setTeacherId] = useState("");

  const [headData, setHeadData] = useState<any>(null);

  const resetStates = () => {
    // setMajorId(majorItem?.majorId);
    setTeacherId("");
  };

  
  // useEffect(() => {
  //   if (headData) {
  //     handleConfirm();
  //   }
  // }, [headData]);
  

  const handleCheck = async () => {
    try {
      const response = await fetch(`/api/dbuser/${teacherId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const userData = await response.json();
      if (!response.ok) {
        // throw new Error('HTTP status ' + response.status);

        if (response.status == 404) {
          alert(`ไม่พบผู้ใช้งาน`);
        } else {
          alert(`ผิดพลาดระหว่างสร้างสาขา`);
        }
      } else {
        if (userData.users.major === null || userData.users.major === "") {
          // setHeadData(userData?.users);

           handleConfirm(userData?.users);
        } else {
          if (userData.users.major === majorId) {
            if (userData.users.role === "teacher") {
              console.log(headData)
              // setHeadData(userData?.users);

               handleConfirm(userData?.users);
            } else {
              alert(`ผู้ใช้งานไม่ใช่อาจารย์`);
            }
          } else {
            alert(
              `ผู้ใช้งานไม่ได้อยู่ในสาขานี้ แต่อยู่ในสาขา ${userData.users.major}`
            );
          }
        }
      }

      props.refreshData();
    } catch (error) {
      alert(`ผิดพลาดระหว่างแก้ไขข้อมูล`);
    }
  };

  const handleConfirm = async (headData:any) => {
    try {
      const response = await fetch(`/api/dbmajor/${majorId}`, {
        method: "PUT",
        body: JSON.stringify({
          // majorId: majorId,
          headdepartmentId: headData.userId,
          headdepartmentPrefix: headData.prefix,
          headdepartmentName: headData.name,
          headdepartmentLastName: headData.lname,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        // throw new Error('HTTP status ' + response.status);
        alert(`ผิดพลาดระหว่างสร้างสาขา`);
      } else {
        alert(`แก้ไขข้อมูลสาขาสำเร็จ`);
        const EditedData = await response.json();
        await props.refreshData();
        console.log(EditedData);
      }
    } catch (error) {
      alert(`ผิดพลาดระหว่างแก้ไขข้อมูล`);
      console.log(error);
    }
  };

  return (
    <>
      <button
        type="button"
        className=" justify-center rounded-md bg-yellow-500 px-2 py-2 mr-1 hover:bg-yellow-400"
        onClick={() => setOpen(true)} // Set open state to true when button is clicked
      >
        <svg
          className="w-5 h-5 text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" />
          <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z" />
        </svg>
      </button>

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={() => {
            setOpen(false);
            resetStates(); // Reset states when closing dialog
          }}
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
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
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
                          แก้ไขข้อมูล {majorItem?.majorId}
                        </Dialog.Title>
                        <div className="mt-2">
                          <div className="grid grid-cols-12 gap-2 items-center">
                            {/* <p className="py-2 col-span-12 md:col-span-4 md:text-right">
                              สาขาวิชา :
                            </p>
                            <p className="py-2 col-span-12 md:col-span-8">
                              <input
                                type="text"
                                className="border border-black rounded-md p-1 w-full"
                                placeholder="สาขาวิชา"
                                value={majorId}
                                onChange={(e) => setMajorId(e.target.value)}
                              />
                            </p> */}

                            <p className="py-2 col-span-12 md:col-span-4 md:text-right">
                              รหัสหัวหน้าสาขา :
                            </p>
                            <p className="py-2 col-span-12 md:col-span-8">
                              <input
                                type="text"
                                className="border border-black rounded-md p-1 w-full"
                                placeholder="รหัสหัวหน้าสาขา"
                                value={teacherId}
                                onChange={(e) => setTeacherId(e.target.value)}
                              />
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                      onClick={() => {
                        setOpen(false);
                        // handleConfirm();
                        handleCheck();
                      }}
                    >
                      ยืนยัน
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => {
                        setOpen(false);
                        resetStates();
                      }}
                      ref={cancelButtonRef}
                    >
                      ยกเลิก
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
