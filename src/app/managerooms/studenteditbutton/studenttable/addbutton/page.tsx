"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function AddButton(props: any) {
  const [open, setOpen] = useState(false);

  // const [educationLevel, setEducationLevel] = useState("");
  // const [faculty, setFaculty] = useState("");

  const cancelButtonRef = useRef(null);
  const userData = props.user;
  const [studentId, setStudentId] = useState("");

  const [formValid, setFormValid] = useState(false);
  const [data, setData] = useState<any>(null);
  const [isLoading, setLoading] = useState(true);
  const roomData = props.roomId;

  const validateForm = () => {
    // Perform validation for each input field
    const isValid =
    studentId !== "";

    setFormValid(isValid);

    return isValid;
  };

  const resetStates = () => {
    setStudentId("");

  };

  const handleSubmit = async () => {
    if (validateForm()) {
      const userData = await usercheck();
      if (userData && Object.keys(userData).length > 0) {
        handleConfirm();
      } else {
        console.log("error no user found");
      }
    } else {
      alert("กรุณากรอกข้อมูลให้ครบทุกช่อง");
    }
  };
  
  // const usercheck = async () => {
  //   let userData = null;
  //   await fetch(`/api/dbuser/${studentId}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.users && Object.keys(data.users).length > 0) {
  //         console.log(data);
  //         userData = data;
  //       } else {
  //         console.log("error set Docs data");
  //       }
  //       setLoading(false);
  //     });
  //   return userData;
  // };

  const usercheck = async () => {
    let userData = null;
    await fetch(`/api/dbuser/${studentId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.users && Object.keys(data.users).length > 0) {
          // Check if the user already has a room
          console.log("ถึง data.users && Object.keys(data.users)");

          if (data.users.room && data.users.room.length == 0) {
            console.log("error: user already has room");
          } else {
            console.log(data);
            userData = data;
          }
        } else {
          console.log("error set Users data");
        }
        setLoading(false);
      });
    return userData;
  };
  
  
  


  const handleConfirm = async () => {
    try {
      const response = await fetch(`/api/dbroom/userinroom/edit/${roomData}`, {
        method: "PUT",
        body: JSON.stringify({
          student: [studentId]

        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // ดึงข้อมูลที่สร้างเอกสารมาจาก response
      const CreatedData = await response.json();
      setOpen(false);
      console.log("เพิ่มนักศึกษาสำเร็จ");
      console.log(CreatedData);
      props.refreshData();
      resetStates();
    } catch (error) {
      console.log("Error while Adding Student", error);
    }
  };

  useEffect(() => {
  console.log(roomData)
  }, [])
  

  return (
    <>
      <button
        type="button"
        className="flex items-center justify-center rounded-md bg-green-500 px-2 py-2 md:mr-1 md:ml-1 hover:bg-green-400 h-10 text-white w-full md:w-auto "
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
            d="M9 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H7Zm8-1c0-.6.4-1 1-1h1v-1a1 1 0 1 1 2 0v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 0 1-1-1Z"
            clipRule="evenodd"
          />
        </svg>
        เพิ่มนักศึกษา
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
                          เพิ่มนักศึกษา
                        </Dialog.Title>
                        <div className="mt-2">
                          <div className="grid grid-cols-12 gap-2 items-center">
                            <p className="py-2 col-span-12 md:col-span-3 md:text-right">
                            รหัสนักศึกษา :
                            </p>
                            <p className="py-2 col-span-12 md:col-span-9">
                              <input
                                type="text"
                                className="border border-black rounded-md p-1 w-full"
                                placeholder="รหัสห้องเรียน"
                                value={studentId}
                                onChange={(e) => {
                                  // Convert input to uppercase and remove special characters
                                  const newValue = e.target.value
                                    .toUpperCase()
                                    .replace(/[^0-9]/gi, "");
                                  setStudentId(newValue);
                                }}
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
                        // setOpen(false);
                        handleSubmit();
                      }}
                    >
                      สร้าง
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
