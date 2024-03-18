"use client";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function AddButton(props: any) {
  const [open, setOpen] = useState(false);

  // const [educationLevel, setEducationLevel] = useState("");
  // const [faculty, setFaculty] = useState("");

  const cancelButtonRef = useRef(null);
  const userData = props.UserData;
  const roomIdData = props.roomId;
  const roomAdvisorIdData = props.roomAdvisorId;
  const roomMajorData = props.roomMajor;


  const [roomId, setRoomId] = useState("");
  const [major, setMajor] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [prefix, setPrefix] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [formValid, setFormValid] = useState(false);


  

  const handleConfirm = async () => {
    try {
      console.log(userData);
      const response = await fetch(`/api/dbroom/request`, {
        method: "POST",
        body: JSON.stringify({
          // userId: studentID,
          status: "รอการอนุมัติ",
          roomId: roomIdData,
          roomAdvisorId: roomAdvisorIdData,
          roomMajor: roomMajorData,
          requesterId: userData.userId,
          requesterPrefix: userData.prefix,
          requesterName: userData.name,
          requesterLastName: userData.lname,
          requesterMajor: userData.major,

          // id String @id @default(auto()) @map("_id") @db.ObjectId
          // status String?
          // roomId        String?
          // requesterId String?
          // requesterPrefix String?
          // requesterName String?
          // requesterLastName String?
          // requesterMajor String?

        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        // throw new Error('HTTP status ' + response.status);
          alert(`ผิดพลาดระหว่างส่งคำขอสมัครเข้าห้องเรียน`);

      }
      else{
        alert(`ส่งคำขอสมัครเข้าห้องเรียนสำเร็จ`);
      }

      // ดึงข้อมูลที่สร้างเอกสารมาจาก response
      const CreatedData = await response.json();
      setOpen(false);
      // console.log("สร้างห้องสำเร็จ");
      console.log(CreatedData);
      props.refreshData();
    } catch (error) {
      console.log("Error while Requesting enter Room", error);
    }
  };

  return (
    <>
      <button
        type="button"
        className="flex items-center justify-center rounded-md bg-green-500 px-2 py-2 md:mr-1 md:ml-1 hover:bg-green-400 h-10 text-white w-full md:w-auto "
        onClick={() => setOpen(true)} // Set open state to true when button is clicked
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
        สมัครเข้าห้องเรียน
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
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          คุณแน่ใจหรือไม่
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            กรุณาตรวจสอบให้แน่ใจว่าคุณต้องการสมัครเข้าห้องเรียน
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                      onClick={handleConfirm}
                    >
                      สมัคร
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
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
