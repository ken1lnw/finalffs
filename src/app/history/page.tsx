"use client";
import DeleteButton from "./deletebutton/page";
import EditButton from "./editbutton/page";
import PrintButton from "./printbutton/page";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

import { useState, useEffect } from "react";
import TeacherApprove from "./teacher/approve/page";
import HeadDepartmentApprove from "./headdep/approve/page";
import OfficerApprove from "./officer/approve/page";

export default function History() {
  const [data, setData] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [majorData, setMajorData] = useState<any>(null);
  const [isHead, setIsHead] = useState(false);
  const [isOfficer, setIsOfficer] = useState(false);
  const [allDoc, setAllDoc] = useState<any>(null);

  const [isLoading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // จำนวนรายการต่อหน้า
  const totalItems = data ? data.docs.length : 0; // จำนวนรายการทั้งหมด
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const id = "621721100411";

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const userid = async () => {
    try {
      const res = await fetch(`/api/dbuser/${id}`);
      const data2 = await res.json();
      setUserData(data2.users);
      if (data2) {
        console.log(data2.users);
        if (data2?.users?.role === "officer") {
          setIsOfficer(true);
          await lastFetch();
        } else {
          await majorFetch(data2.users);
          await refreshData();
        }
      } else {
        console.log("error set Rooms data");
      }
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  const refreshData = () => {
    fetch(`/api/dbdocs/user/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        if (data) {
          console.log(data);
        } else {
          console.log("error set Docs data");
        }
        setLoading(false);
      });
  };

  const majorFetch = async (user: any) => {
    try {
      const res = await fetch(`/api/dbmajor/${user.major}`);
      const data2 = await res.json();
      if (data2) {
        console.log(data2);
        if (data2?.majors?.headdepartmentId === user.userId) {
          setIsHead(true);
        }
      } else {
        console.log("error set Major data");
        alert("ผิดพลาดไม่มีข้อมูลสาขาวิชา กรุณาติดต่อผู้ดูแลระบบ");
      }
      setLoading(false);
    } catch (error) {
      alert("ผิดพลาดในการดาวน์โหลดข้อมูลสาขาวิชา กรุณาติดต่อผู้ดูแลระบบ");
      console.error("Failed to fetch user data:", error);
    }
  };

  const lastFetch = async () => {
    fetch(`/api/dbdocs/`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        if (data) {
          console.log(data.docs);
        } else {
          console.log("error set Docs data");
        }
        setLoading(false);
      });
  };

  // Call refreshData in useEffect
  useEffect(() => {
    userid();
  }, []);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPagesFiltered && currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const filteredData =
    data?.docs?.filter((item: any) => {
      const keys = [
        "documentsId",
        "docType",
        "date",
        "major",
        "status",
        "roomId",
        "studentId",
        "studentName",
        "studentLastName",
        "advisorId",
        "advisorName",
        "advisorLastName",
        "headDepartmentId",
        "headDepartmentName",
        "headDepartmentLastName",
        "officerId",
        "officerName",
        "officerLastName",
      ];
      return keys.some((key) =>
        item[key]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    }) ?? [];

  const totalFilteredItems = filteredData.length;
  const totalPagesFiltered = Math.ceil(totalFilteredItems / itemsPerPage);

  return (
    <>
      <div className="overflow-x-auto">
        <div className="pt-4 relative mx-auto text-black container">
          <input
            className="border-2 border-gray-500 bg-white h-10 px-5 rounded-lg text-sm focus:outline-none w-full md:w-1/4"
            type="search"
            name="search"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button type="submit" className="absolute right-0 top-0"></button>
        </div>

        <div className="bg-white mx-auto container pt-4">
          <div className="border-x overflow-x-auto border-t">
            <table className="table-auto w-full ">
              <thead className="border-b">
                <tr className="bg-blue-400">
                  <th className="text-left p-4 font-medium">รหัสคำร้อง</th>
                  <th className="text-left p-4 font-medium">คำร้อง</th>
                  <th className="text-left p-4 font-medium">
                    รหัสนักศึกษาผู้ยื่น
                  </th>
                  <th className="text-left p-4 font-medium">วันที่</th>
                  <th className="text-left p-4 font-medium">สาขาวิชา</th>
                  <th className="text-left p-4 font-medium">สถานะเอกสาร</th>
                  <th className="text-left p-4 font-medium">จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {filteredData
                  .slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage
                  )
                  .map((item: any, index: number) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        {item.documentsId || "ไม่มีข้อมูล"}
                      </td>
                      <td className="p-4">{item.docType || "ไม่มีข้อมูล"}</td>
                      <td className="p-4">{item.studentId || "ไม่มีข้อมูล"}</td>
                      <td className="p-4">{item.date || "ไม่มีข้อมูล"}</td>
                      <td className="p-4">{item.major || "ไม่มีข้อมูล"}</td>
                      <td className="p-4">{item.status || "ไม่มีข้อมูล"}</td>
                      <td className="p-4">
                        <PrintButton documentsId={item.documentsId} />

                        {userData?.role === "student" &&
                          item.status === "นักศึกษายื่นคำร้อง" && (
                            <>
                              {/* <PrintButton documentsId={item.documentsId} /> */}
                              <DeleteButton
                                documentsId={item.documentsId}
                                refreshData={userid}
                              />
                            </>
                          )}

                        {/* {userData?.role === "student" &&
                          item.status !== "นักศึกษายื่นคำร้อง" && (
                            <>
                              <PrintButton documentsId={item.documentsId} />
                            </>
                          )} */}

                        {userData?.role === "teacher" &&
                          item.status === "นักศึกษายื่นคำร้อง" && (
                            <>
                              <TeacherApprove
                                teacherData={userData}
                                docData={item}
                                refreshData={userid}
                              />
                            </>
                          )}

                        {userData?.role === "teacher" &&
                          item.status === "อาจารย์ที่ปรึกษาลงความเห็น" &&
                          isHead === true && (
                            <>
                              <HeadDepartmentApprove
                                teacherData={userData}
                                docData={item}
                                refreshData={userid}
                              />
                            </>
                          )}

                        {userData?.role === "officer" &&
                          item.status === "หัวหน้าสาขาลงความเห็น" &&
                           (
                            <>
                              <OfficerApprove
                                teacherData={userData}
                                docData={item}
                                refreshData={userid}
                              />
                            </>
                          )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {/* pagination  */}
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
              <div className="flex flex-1 justify-between sm:hidden">
                <a
                  onClick={handlePreviousPage}
                  className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Previous
                </a>
                <a
                  onClick={handleNextPage}
                  className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Next
                </a>
              </div>

              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-medium">
                      {Math.min(
                        (currentPage - 1) * itemsPerPage + 1,
                        totalFilteredItems
                      )}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {Math.min(currentPage * itemsPerPage, totalFilteredItems)}
                    </span>{" "}
                    of <span className="font-medium">{totalFilteredItems}</span>{" "}
                    results
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-700">
                    Page <span className="font-medium">{currentPage}</span> of{" "}
                    <span className="font-medium">{totalPagesFiltered}</span>
                  </p>
                </div>

                <div>
                  <nav
                    className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                    aria-label="Pagination"
                  >
                    <a
                      onClick={handlePreviousPage}
                      className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      <span className="sr-only">Previous</span>
                      <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                    </a>

                    <a
                      onClick={handleNextPage}
                      className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      <span className="sr-only">Next</span>
                      <ChevronRightIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </a>
                  </nav>
                </div>
              </div>
            </div>
            {/*  */}
          </div>
        </div>
      </div>
    </>
  );
}
