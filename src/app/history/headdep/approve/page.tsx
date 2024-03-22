"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
import ConfirmTeacherModal from "./confirm/page";
import { HeadDepApproveR01} from "./print/tapprove01";
dayjs.extend(buddhistEra);
dayjs.locale("th");

export default function HeadDepartmentApprove(props: any) {
  const [open, setOpen] = useState(false);

  // const [educationLevel, setEducationLevel] = useState("");
  // const [faculty, setFaculty] = useState("");

  const cancelButtonRef = useRef(null);
  const teacherData = props.teacherData;
  const docData = props.docData;

  const [isLoading, setLoading] = useState(true);

  const [formValid, setFormValid] = useState(false);

  const [comment, setComment] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [date, setDate] = useState("");
  const [major, setMajor] = useState<any>(null);

  const currentDate = dayjs();
  const formattedDate = currentDate.format("DD MMMM BBBB");

  const resetStates = () => {
    setComment("");

  };

  useEffect(() => {
    
  console.log(teacherData);
 
  }, [])



  const majorFetch = async () => {
    try {
      const res = await fetch(`/api/dbmajor/${teacherData.major}`);
      const data2 = await res.json();
      if (data2) {
        // console.log(data2.majors);
        await handleConfirm(data2.majors);


        
      } else {
        console.log("error set Major data");
        alert("ผิดพลาดไม่มีข้อมูลสาขาวิชา กรุณาติดต่อผู้ดูแลระบบ")
        setIsModalOpen(false);

      }
      setLoading(false);
    } catch (error) {
        alert("ผิดพลาดในการดาวน์โหลดข้อมูลสาขาวิชา กรุณาติดต่อผู้ดูแลระบบ")
      console.error("Failed to fetch user data:", error);
      setIsModalOpen(false);

    }
  };
  

  const handleConfirm = async (major:any) => {

    // await majorFetch();
    if(major == null){
        alert("ผิดพลาดไม่มีข้อมูลสาขาวิชา กรุณาติดต่อผู้ดูแลระบบ")
        setIsModalOpen(false);
        return;

    }

    console.log(major);


    try {

      const response = await fetch(`/api/dbdocs/${docData.documentsId}`, {
        method: "PUT",
        body: JSON.stringify({

            status: "หัวหน้าสาขาลงความเห็น",
            // status: "นักศึกษายื่นคำร้อง",
            headDepartmentComment: comment ,
            headDepartmentDate: formattedDate ,
        
          
            headDepartmentId: major.headdepartmentId,
            headDepartmentPrefix: major.headdepartmentPrefix,
            headDepartmentName: major.headdepartmentName,
            headDepartmentLastName: major.headdepartmentLastName,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if(!response.ok){
        alert("บันทึกข้อมูลเอกสารลงบนฐานข้อมูลไม่สำเร็จ")
        props.refreshData();
        return;
      }

      // ดึงข้อมูลที่สร้างเอกสารมาจาก response
      const EditedData = await response.json();




      const formDataForPrintR01 = {
        DocsId: docData.documentsId,
        headDepartmentDate: formattedDate,
        headDepartmentId: teacherData.userId,
        headDepartmentPrefix:teacherData.prefix,
        headDepartmentName:teacherData.name,
        headDepartmentLastName:teacherData.lname,
        headDepartmentComment: comment
      };
  
      // Call modifyPdf from PrintR01 with the form data
      await HeadDepApproveR01(formDataForPrintR01);
      // console.log(createdDocs);







      console.log("บันทึกข้อมูลลงบนเอกสารสำเร็จ");
      // alert("บันทึกข้อมูลลงบนเอกสารสำเร็จ")

      console.log(EditedData);
      setIsModalOpen(false);
      resetStates();
      props.refreshData();
      
    } catch (error) {
        alert("ไม่สามารถบันทึกข้อมูลเอกสารลงบนฐานข้อมูลได้")
        resetStates();
      console.log("Error while Editing Doc Data");
    }



  };



  const validateForm = () => {
    // Perform validation for each input field
    const isValid =
      comment !== "";

    setFormValid(isValid);

    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setIsModalOpen(true);
    } else {
      // Handle form validation errors or provide feedback to the user
      alert("กรุณากรอกข้อมูลให้ครบทุกช่อง");
    }
  };

  const handleCancel = () => {
    // If the user cancels, close the confirmation modal
    setIsModalOpen(false);
    resetStates();
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
          onClose={() => {
            setOpen(false);
            // resetStates(); // Reset states when closing dialog
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
                          ความเห็นของหัวหน้าสาขาวิชา
                        </Dialog.Title>
                        <div className="mt-2">
                          <div className="grid grid-cols-12 gap-2 items-center">

                          <p className="pt-2 col-span-12">
                              ความเห็น
                            </p>

                            <p className="pb-2 col-span-12">
                              <input
                                type="text"
                                className="border border-black rounded-md p-1 w-full"
                                placeholder="ความเห็น"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
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

      <ConfirmTeacherModal
            isOpen={isModalOpen}
            onConfirm={majorFetch}
            onCancel={handleCancel}
          />
    </>
  );
}
