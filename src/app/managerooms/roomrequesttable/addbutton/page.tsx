"use client";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function AddButton(props: any) {
  const requesterId = props.requesterId;
  const roomMajorData = props.roomMajor;
  const roomIdData = props.roomId;
  const idRequest = props.idRequest;


  const [isLoading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);






  const handleSubmit = async () => {
  
      const userData = await usercheck();
      // const roomData = await roomcheck();
      if (userData && Object.keys(userData).length > 0) {

        const roomData = await roomcheck();
        if (roomData && Object.keys(roomData).length > 0) 
        {
          handleConfirm();
        }

   
      } 


  };



  const usercheck = async () => {
    let userData = null;
    await fetch(`/api/dbuser/${requesterId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.users && Object.keys(data.users).length > 0) {
          // Check if the user already has a room
          // console.log("ถึง data.users && Object.keys(data.users)");

          if (data.users.major == roomMajorData) {
            // console.log(data);
            

            if (data.users.role === 'student'){
              userData = data;
            }
            else{
              console.log("error: user not student");

              alert("ผู้ใช้งานไม่ใช่นักศึกษา");

            }



          } else {
            console.log("error: user not the same major");
            alert("ผู้ใช้งานไม่ใช่นักศึกษาภายในสาขาวิชา");
          }



        } else {
          console.log("error set Users data");
          alert("ไม่พบผู้ใช้งาน");
        }
        setLoading(false);
      });
    return userData;
  };


  const roomcheck = async () => {
    let roomData = null;
    await fetch(`/api/dbroom/findroomforstudent/${requesterId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data.rooms && Object.keys(data.rooms).length == 0) {
          // if (data.rooms && Array.isArray(data.rooms) && data.rooms.length > 0 && data.rooms[0].roomId) {

          // Check if the user already has a room
          // console.log("ถึง data.users && Object.keys(data.users)");
          roomData = data;

        } else {
          console.log("error user already has room");
          alert(`ผู้ใช้งานมีห้องอยู่แล้ว ห้อง ${data.rooms[0].roomId}`);
        }
        setLoading(false);
      });
    return roomData;
  };



  const handleDelete = async () => {
    try {
      const deleteRequest = await fetch(`/api/dbroom/request/${idRequest}`, {
        method: "DELETE",
        body: JSON.stringify({}),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (deleteRequest.ok) {
        // ทำอะไรสักอย่างเมื่อลบข้อมูลสำเร็จ
        // alert("สำเร็จ");
        // console.log("Room Deleted successfully");
      } else {
        // ทำอะไรสักอย่างเมื่อมีข้อผิดพลาดเกิดขึ้นในการลบข้อมูล
        alert("ลบคำร้องไม่สำเร็จ");
        console.error("Room Delete request failed");
      }
      // props.refreshData();
      // setOpen(false);
    } catch (error) {
      // ทำอะไรสักอย่างเมื่อเกิดข้อผิดพลาดในการ fetch
      console.error("Error occurred while deleting Room Request", error);
    }
  };






  const handleConfirm = async () => {
    try {
      const response = await fetch(`/api/dbroom/userinroom/edit/${roomIdData}`, {
        method: "PUT",
        body: JSON.stringify({
          student: [requesterId],
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        // throw new Error('HTTP status ' + response.status);
        if (response.status == 400) {
          alert(`ผู้ใช้งานนี้อยู่ภายในห้องนี้แล้ว`);
        } else {
          alert(`ผิดพลาด`);
        }
      }

      await handleDelete();
      // ดึงข้อมูลที่สร้างเอกสารมาจาก response
      const CreatedData = await response.json();
      setOpen(false);
      console.log("เพิ่มนักศึกษาสำเร็จ");
       alert("เพิ่มนักศึกษาสำเร็จ");
      console.log(CreatedData);
      props.refreshData();
    } catch (error) {
      console.log("Error while Adding Student", error);
    }
  };

  return (
    <>
      <button
        type="button"
        className=" justify-center rounded-md bg-green-500 px-2 py-2 mr-1  hover:bg-green-400"
        onClick={() => setOpen(true)} // Set open state to true when button is clicked
      >
        <svg
          className="w-5 h-5 text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 11.917 9.724 16.5 19 7.5"
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
                            กรุณาตรวจสอบให้แน่ใจว่าต้องการ &quot;อนุมัติ&quot; ผู้ใช้งานท่านนี้เข้าสู่ห้องเรียน
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                      onClick={handleSubmit}
                    >
                      อนุมัติ
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
