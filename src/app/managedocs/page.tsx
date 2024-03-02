"use client";
// import DeleteButton from "./deletebutton/page";
// import EditButton from "./editbutton/page";
// import PrintButton from "./printbutton/page";

import { useState, useEffect } from "react";

export default function History() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    fetch("/api/dbdocs")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        // console.log(data);
        if (data) {
          console.log(data);
        } else {
          console.log("error set Docs data");
        }

        setLoading(false);
        // console.log(data.users);
      });
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const refreshData = () => {
    fetch("/api/dbdocs")
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
  
  // Call refreshData in useEffect
  useEffect(() => {
    refreshData();
  }, []);
  

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
                  <th className="text-left p-4 font-medium">คำร้อง</th>
                  <th className="text-left p-4 font-medium">
                    รหัสนักศึกษาผู้ยื่น
                  </th>
                  <th className="text-left p-4 font-medium">วันที่</th>
                  <th className="text-left p-4 font-medium">สถานะ</th>
                  <th className="text-left p-4 font-medium">จัดการ</th>
                </tr>
              </thead>
              <tbody>
      
                {data &&
                  data.docs &&
                  data.docs
                    .filter((item: any) => {
                      const docTypeMatch = item.docType
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase());
                      const studentIdMatch = item.studentId
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase());
                      const dateMatch = item.date
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase());
                      const statusMatch = item.status
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase());
                      return (
                        docTypeMatch ||
                        studentIdMatch ||
                        dateMatch ||
                        statusMatch
                      );
                    })
                    .map((item: any, index: number) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-4">{item.docType || "ไม่มีข้อมูล"}</td>
                        <td className="p-4">
                          {item.studentId || "ไม่มีข้อมูล"}
                        </td>
                        <td className="p-4">{item.date || "ไม่มีข้อมูล"}</td>
                        <td className="p-4">{item.status || "ไม่มีข้อมูล"}</td>
                        <td className="p-4">
                          {/* <PrintButton documentsId={item.documentsId} /> <EditButton /> <DeleteButton documentsId={item.documentsId} refreshData={refreshData} /> */}
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
