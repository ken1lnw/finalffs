"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function AddButton(props: any) {
  const [open, setOpen] = useState(false);

  // const [educationLevel, setEducationLevel] = useState("");
  // const [faculty, setFaculty] = useState("");

  const cancelButtonRef = useRef(null);
  const userData = props.userData;
  const [roomId, setRoomId] = useState("");
  const [major, setMajor] = useState(userData ? userData.major : "ไม่พบข้อมูล");
  const [teacherId, setTeacherId] = useState(userData ? userData.userId : "ไม่พบข้อมูล");
  const [prefix, setPrefix] = useState(userData ?  userData.prefix : "ไม่พบข้อมูล");
  const [firstName, setFirstName] = useState(userData ?  userData.name : "ไม่พบข้อมูล");
  const [lastName, setLastName] = useState(userData ?  userData.lname : "ไม่พบข้อมูล");
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (userData) {
      setMajor(userData.major);
      setTeacherId(userData.userId);
      setPrefix(userData.prefix);
      setFirstName(userData.name);
      setLastName(userData.lname);
    }
  }, [userData]);

  const validateForm = () => {
    // Perform validation for each input field
    const isValid =
      roomId !== "" &&
      prefix !== "" &&
      firstName !== "" &&
      lastName !== "" &&
      major !== "";

    setFormValid(isValid);

    return isValid;
  };

  const resetStates = () => {
    setRoomId("");
    // setMajor(userData.major);
    // setTeacherId(userData.userId);
    // setPrefix(userData.prefix);
    // setFirstName(userData.name);
    // setLastName(userData.lname);
  };

  const handleSubmit = () => {
    if (validateForm()) {
      handleConfirm();
      setOpen(false);
    } else {
      // Handle form validation errors or provide feedback to the user
      alert("กรุณากรอกข้อมูลให้ครบทุกช่อง");
    }
  };

  const handleConfirm = async () => {

    try {

      const response = await fetch(`/api/dbroom/`, {
        method: "POST",
        body: JSON.stringify({
          // userId: studentID,
          roomId: roomId,
          advisorId: teacherId,
          advisorPrefix: prefix,
          advisorName: firstName,
          advisorLastName: lastName,
          roomMajor: major,

        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // ดึงข้อมูลที่สร้างเอกสารมาจาก response
      const CreatedData = await response.json();
      setOpen(false);
      console.log("สร้างห้องสำเร็จ");
      console.log(CreatedData);
      props.refreshData();
      resetStates();
    } catch (error) {
      console.log("Error while Creating Room", error);
    }
  };

  return (
    <>
      <button
  type="button"
  className="flex items-center justify-center rounded-md bg-green-500 px-2 py-2 md:mr-1 md:ml-1 hover:bg-green-400 h-10 text-white w-full md:w-auto "
  onClick={() => {
    setOpen(true);
    // console.log(userData);
  }}
>
        <svg
          className="w-5 h-5 text-white mr-1"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm11-4.2a1 1 0 1 0-2 0V11H7.8a1 1 0 1 0 0 2H11v3.2a1 1 0 1 0 2 0V13h3.2a1 1 0 1 0 0-2H13V7.8Z"
            clipRule="evenodd"
          />
        </svg>
        เพิ่มห้องเรียน
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
                          เพิ่มห้องเรียน
                        </Dialog.Title>
                        <div className="mt-2">
                          <div className="grid grid-cols-12 gap-2 items-center">
           

                            <p className="py-2 col-span-12 md:col-span-3 md:text-right">
                              รหัสห้องเรียน :
                            </p>
                            <p className="py-2 col-span-12 md:col-span-9">
                              <input
                                type="text"
                                className="border border-black rounded-md p-1 w-full"
                                placeholder="รหัสห้องเรียน"
                                value={roomId}
                                onChange={(e) => {
                                  // Convert input to uppercase and remove special characters
                                  const newValue = e.target.value.toUpperCase().replace(/[^A-Z0-9]/gi, '');
                                  setRoomId(newValue);
                              }}
                              />
                            </p>

                            <p className="py-2 col-span-12 md:col-span-3 md:text-right">
                              สาขาวิชา :
                            </p>
                            <p className="py-2 col-span-12 md:col-span-9">
                              <input
                                type="text"
                                className="border border-black rounded-md p-1 w-full disabled:bg-slate-200"
                                placeholder="สาขาวิชา"
                                value={major}
                                disabled
                                onChange={(e) => setMajor(e.target.value)}
                              />
                            </p>

                            <p className="py-2 col-span-12">อาจารย์ที่ปรึกษา</p>

                            <p className="py-2 col-span-12 md:col-span-3 md:text-right">
                              รหัสประจำตัว :
                            </p>
                            <p className="py-2 col-span-12 md:col-span-9">
                              <input
                                type="text"
                                className="border border-black rounded-md p-1 w-full disabled:bg-slate-200"
                                placeholder="รหัสประจำตัว"
                                value={teacherId}
                                disabled
                                onChange={(e) => setTeacherId(e.target.value)}
                              />
                            </p>

                            <p className="py-2 col-span-12 md:col-span-3 md:text-right">
                              คำนำหน้า :
                            </p>
                            <p className="py-2 col-span-12 md:col-span-9">
                              <input
                                type="text"
                                className="border border-black rounded-md p-1 w-full disabled:bg-slate-200"
                                placeholder="คำนำหน้า"
                                value={prefix}
                                disabled
                                onChange={(e) => setPrefix(e.target.value)}
                              />
                            </p>

                            <p className="py-2 col-span-12 md:col-span-3 md:text-right">
                              ชื่อ :
                            </p>
                            <p className="py-2 col-span-12 md:col-span-9">
                              <input
                                type="text"
                                className="border border-black rounded-md p-1 w-full disabled:bg-slate-200"
                                placeholder="ชื่อ"
                                value={firstName}
                                disabled
                                onChange={(e) => setFirstName(e.target.value)}
                              />
                            </p>

                            <p className="py-2 col-span-12 md:col-span-3 md:text-right">
                              นามสกุล :
                            </p>
                            <p className="py-2 col-span-12 md:col-span-9">
                              <input
                                type="text"
                                className="border border-black rounded-md p-1 w-full disabled:bg-slate-200"
                                placeholder="นามสกุล"
                                value={lastName}
                                disabled
                                onChange={(e) => setLastName(e.target.value)}
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
