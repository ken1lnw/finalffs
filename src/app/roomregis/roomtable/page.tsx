"use client";
import AddButton from "./addbutton/page";
// import DeleteButton from "./deletebutton/page";
// import DetailButton from "./detailbutton/page";
// import EditButton from "./editbutton/page";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

// import PrintButton from "./printbutton/page";

import { useState, useEffect } from "react";
// import StudentEditButton from "./studenteditbutton/page";

export default function RoomTable(props:any) {
  const UserData = props.userData;
  const [data, setData] = useState<any>(null);
  // const [userdata, setUserData] = useState<any>(null);
  const [isLoading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // จำนวนรายการต่อหน้า
  const totalItems = data && data.rooms ? data.rooms.length : 0; // จำนวนรายการทั้งหมด
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };


  const roomData = () => {
    fetch("/api/dbroom/")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        if (data) {
          console.log(data);
        } else {
          console.log("error set Rooms data");
        }
        setLoading(false);
      });
  };

  useEffect(() => {
    roomData();
    console.log(UserData);
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
    data?.rooms?.filter((item: any) => {
      const keys = [
        "roomId",
        "advisorId",
        "advisorPrefix",
        "advisorName",
        "advisorLastName",
      ];
      return keys.some((key) =>
      item[key]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    ) && item.roomMajor === UserData.users.major; // เพิ่มเงื่อนไขการกรองด้วย UserData.major
  }) ?? [];

  const totalFilteredItems = filteredData.length;
  const totalPagesFiltered = Math.ceil(totalFilteredItems / itemsPerPage);

  return (
    <>
{UserData && UserData.users && (UserData.users.major === null || UserData.users.major === "") ? "ผู้ใช้งานยังไม่มีสาขาวิชา" : null}
      <div className="overflow-x-auto mb-10">
        <div className="pt-4 relative mx-auto text-black container block md:flex md:items-center">
          <input
            className="border-2 border-gray-500 bg-white h-10 px-5 mb-2 md:mb-0 rounded-lg text-sm focus:outline-none w-full md:w-1/4"
            type="search"
            name="search"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {/* <AddButton userData={userdata} refreshData={refreshData}/>           */}
        </div>

        <div className="bg-white mx-auto container pt-4">
          <div className="border-x overflow-x-auto border-t">
            <table className="table-auto w-full ">
              <thead className="border-b">
                <tr className="bg-blue-400">
                  <th className="text-left p-4 font-medium">ห้องเรียน</th>
                  <th className="text-left p-4 font-medium">
                    รหัสอาจารย์ที่ปรึกษา
                  </th>
                  <th className="text-left p-4 font-medium">
                    อาจารย์ที่ปรึกษา
                  </th>
                  <th className="text-left p-4 font-medium">สาขาวิชา</th>
                  <th className="text-left p-4 font-medium">
                    จำนวนนักศึกษาในห้อง
                  </th>

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
                      <td className="p-4">{item.roomId || "ไม่มีข้อมูล"}</td>
                      <td className="p-4">{item.advisorId || "ไม่มีข้อมูล"}</td>

                      <td className="p-4">
                        {item.advisorName && item.advisorLastName
                          ? `${item.advisorName} ${item.advisorLastName}`
                          : "ไม่มีข้อมูล"}
                      </td>

                      <td className="p-4">{item.roomMajor || "ไม่มีข้อมูล"}</td>

                      <td className="p-4 textce">
                        {item.student ? item.student.length : "ไม่มีข้อมูล"}
                      </td>

                      <td className="p-4">

                        <AddButton UserData={UserData.users} roomMajor={item.roomMajor} roomId={item.roomId} roomAdvisorId={item.advisorId} refreshData={props.refreshData}/>          
                        {/* <PrintButton documentsId={item.documentsId} /> 
                          <EditButton />  */}

                        {/* <DetailButton room={item}/> */}

                        {/* <EditButton room={item} 
                        refreshData={refreshData}/> */}

                        {/* <StudentEditButton room={item} /> */}

                        {/* <DeleteButton
                          roomId={item.roomId}
                          refreshData={refreshData}
                        /> */}
                        
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
//
