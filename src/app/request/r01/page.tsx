"use client";

import { useState, useEffect } from "react";
// import PrintR01 from "./print/page";
import { CreatR01 } from "./print/creater01";
import ConfirmModal from "../../../components/modal/requestconfirm/page";
import { set } from "date-fns";

import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);
dayjs.locale("th");

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation";

interface UserData {
  userId: string;
  prefix: string;
  name: string;
  lname: string;
  faculty: string;
  major: string;

  // และคุณสามารถเพิ่ม properties อื่นๆ ตามต้องการได้
}

export default function R01() {

  const { data: session, status }:any = useSession()

  if (status === "unauthenticated") {
    redirect('/')
  }

  if (status === "authenticated" && session?.user?.role !== "student") {
    redirect('/')
  }


  const [date, setDate] = useState("");
  const [subject, setSubject] = useState("");
  const [toWhom, setToWhom] = useState("");
  const [prefix, setPrefix] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [studentID, setStudentID] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [faculty, setFaculty] = useState("");
  const [major, setMajor] = useState("");
  const [intention, setIntention] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");

  const [formValid, setFormValid] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [roomData, setRoomData] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);


  const id = session?.user?.id;

  const [data, setData] = useState<UserData | null>({
    userId: "",
    prefix: "",
    name: "",
    lname: "",
    faculty: "",
    major: "",
  });
  const [isLoading, setLoading] = useState(true);

  // const [createdDocs, setCreatedDocs] = useState<any>("");

  useEffect(() => {
    userDataFetch();
    roomFetch();
  }, [session]);

  const userDataFetch = async () => {
    try {
      const res = await fetch(`/api/dbuser/${id}`);
      const data = await res.json();
      setUserData(data.users);
      if (data.users) {
        setStudentID(data?.users?.userId || "");
        setPrefix(data?.users?.prefix || "");
        setFirstName(data?.users?.name || "");
        setLastName(data?.users?.lname || "");
        setFaculty(data?.users?.faculty || "");
        setMajor(data?.users?.major || "");
        console.log(data.users);
      } else {
        console.log("error set Userdata");
        alert("ไม่สามารถโหลดข้อมูลผู้ใช้งานได้");
      }
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      alert("ไม่สามารถโหลดข้อมูลผู้ใช้งานได้");
    }
  };

  const roomFetch = async () => {
    try {
      const res = await fetch(`/api/dbroom/findroomforstudent/${id}`);
      const data2 = await res.json();
      if (data2) {
        setRoomData(data2);

        console.log(data2);

        // await refreshData();

        if (data2.rooms.length === 0) {
          alert("คุณยังไม่มีห้องเรียนกรุณาสมัครเข้าห้องเรียน");
        }
      } else {
        console.log("error set Rooms data");
      }
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  const createDocDB = async () => {
    const response = await fetch("/api/dbdocs", {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const createdData = await response.json();
    // setCreatedDocs(createdData.newDoc.documentsId);
    // console.log(createdData.newDoc.documentsId)
  };

  const validateForm = () => {
    // Perform validation for each input field
    const isValid =
      date !== "" &&
      subject !== "" &&
      toWhom !== "" &&
      prefix !== "" &&
      firstName !== "" &&
      lastName !== "" &&
      studentID !== "" &&
      educationLevel !== "" &&
      faculty !== "" &&
      major !== "" &&
      intention !== "" &&
      contactNumber !== "" &&
      email !== "";

    setFormValid(isValid);

    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // If the form is valid, call modifyPdf from PrintR01
      // const formDataForPrintR01 = {
      //   date: date,
      //   subject: subject,
      //   toWhom: toWhom,

      //   prefix: prefix,

      //   fullName: `${firstName} ${lastName}`,
      //   studentID: studentID,

      //   educationLevel: educationLevel,

      //   faculty: faculty,
      //   major: major,
      //   intention: intention,
      //   contactNumber: contactNumber,
      //   email: email,
      // };
      // Call modifyPdf from PrintR01 with the form data
      // CreatR01(formDataForPrintR01);
      setIsModalOpen(true);
    } else {
      // Handle form validation errors or provide feedback to the user
      alert("กรุณากรอกข้อมูลให้ครบทุกช่อง");
    }
  };

  const handleConfirm = async () => {
    // If the user confirms, call modifyPdf from PrintR01

    if (!roomData || roomData.length === 0) {
      alert("คุณยังไม่มีห้องเรียนกรุณาสมัครเข้าห้องเรียน");
      console.log("คุณยังไม่มีห้องเรียนกรุณาสมัครเข้าห้องเรียน");
      return;
    }
    const formattedDate = dayjs(date).format("DD MMMM BBBB");
    let dayPart, monthPart, yearPart;

    const response = await fetch("/api/dbdocs", {
      method: "POST",
      body: JSON.stringify({
        date: formattedDate,
        docType: "R.01 คำร้องทั่วไป",
        status: "นักศึกษายื่นคำร้อง",
        studentId: studentID,
        studentPrefix: prefix,
        studentName: firstName,
        studentLastName: lastName,
        major: major,
        roomId: roomData?.rooms[0]?.roomId,
        advisorId: roomData?.rooms[0]?.advisorId,
        advisorPrefix: roomData?.rooms[0]?.advisorPrefix,
        advisorName: roomData?.rooms[0]?.advisorName,
        advisorLastName: roomData?.rooms[0]?.advisorLastName
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // ดึงข้อมูลที่สร้างเอกสารมาจาก response
    const createdData = await response.json();

    // เก็บค่าของเอกสารที่สร้างขึ้นมาใหม่ลงในตัวแปร createdDocs
    const createdDocs = createdData.newDoc.documentsId;

    const formDataForPrintR01 = {
      createdDocs: createdDocs,
      date: date,
      subject: subject,
      toWhom: toWhom,

      prefix: prefix,

      fullName: `${firstName} ${lastName}`,
      studentID: studentID,

      educationLevel: educationLevel,

      faculty: faculty,
      major: major,
      intention: intention,
      contactNumber: contactNumber,
      email: email,
      signPath: userData.signPath,
    };

    // Call modifyPdf from PrintR01 with the form data
    await CreatR01(formDataForPrintR01);
    // console.log(createdDocs);

    // Close the confirmation modal
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    // If the user cancels, close the confirmation modal
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="container mx-auto pt-4">
        <h1 className="text-xl mb-2 mt-4">R.01 คำร้องทั่วไป</h1>

        <div className="grid grid-cols-12 gap-2">
          <div className="py-2 col-span-12 lg:col-span-2">
            <label htmlFor="วันที่" className="block mb-2 text-black">
              วันที่
            </label>
            <input
              id="วันที่"
              type="date"
              className="border border-black rounded-md p-1 w-full h-10"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="py-2 col-span-12 lg:col-span-5">
            <label htmlFor="" className=" block mb-2 text-black">
              เรื่อง
            </label>
            <input
              type="text"
              className="border border-black rounded-md p-1 w-full h-10"
              placeholder="เรื่อง"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="py-2 col-span-12 lg:col-span-5">
            <label htmlFor="" className=" block mb-2 text-black">
              เรียน
            </label>
            <input
              type="text"
              className="border border-black rounded-md p-1 w-full h-10"
              placeholder="เรียน"
              value={toWhom}
              onChange={(e) => setToWhom(e.target.value)}
            />
          </div>

          <div className="py-2 col-span-12 lg:col-span-1">
            <label htmlFor="" className=" block mb-2 text-black">
              คำนำหน้า
            </label>
            {/* <select
              id="form"
              className="border border-black rounded-md p-1 w-full h-10"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
            >
              <option value="">คำนำหน้า</option>

              <option value="นาย">นาย</option>
              <option value="นาง">นาง</option>
              <option value="นางสาว">นางสาว</option>
            </select> */}

            <input
              type="text"
              className="border border-black rounded-md p-1 w-full h-10"
              placeholder="คำนำหน้า"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
            />
          </div>

          <div className="py-2 col-span-12 lg:col-span-4">
            <label htmlFor="" className=" block mb-2 text-black">
              ชื่อ
            </label>
            <input
              type="text"
              className="border border-black rounded-md p-1 w-full h-10"
              placeholder="ชื่อ"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="py-2 col-span-12 lg:col-span-4">
            <label htmlFor="" className=" block mb-2 text-black">
              นามสกุล
            </label>
            <input
              type="text"
              className="border border-black rounded-md p-1 w-full h-10"
              placeholder="นามสกุล"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="py-2 col-span-12 lg:col-span-3">
            <label htmlFor="" className=" block mb-2 text-black">
              รหัสนักศึกษา
            </label>
            <input
              type="text"
              className="border border-black rounded-md p-1 w-full h-10"
              placeholder="รหัสนักศึกษา"
              value={studentID}
              onChange={(e) => setStudentID(e.target.value)}
            />
          </div>

          <div className="py-2 col-span-12 lg:col-span-2">
            <label htmlFor="" className=" block mb-2 text-black">
              ระดับการศึกษา
            </label>
            <select
              id="form"
              className="border border-black rounded-md p-1 w-full h-10"
              value={educationLevel}
              onChange={(e) => setEducationLevel(e.target.value)}
            >
              <option value="">ระดับการศึกษา</option>
              <option value="ปวช">ปวช.</option>
              <option value="ปวส">ปวส.</option>
              <option value="ปตรี">ปริญญาตรี</option>
              <option value="ปโท">ปริญญาโท</option>
              <option value="ปเอก">ปริญญาเอก</option>
            </select>
          </div>

          <div className="py-2 col-span-12 lg:col-span-5">
            <label htmlFor="" className=" block mb-2 text-black">
              คณะ
            </label>
            {/* <select
              id=""
              className="border border-black rounded-md p-1 w-full h-10"
              value={faculty}
              onChange={(e) => setFaculty(e.target.value)}
            >
              <option value="คณะวิศวกรรมศาสตร์และเทคโนโลยี">
                คณะวิศวกรรมศาสตร์และเทคโนโลยี
              </option>
            </select> */}

            <input
              type="text"
              className="border border-black rounded-md p-1 w-full h-10"
              placeholder="คณะ"
              value={faculty}
              onChange={(e) => setFaculty(e.target.value)}
            />
          </div>

          <div className="py-2 col-span-12 lg:col-span-5">
            <label htmlFor="" className=" block mb-2 text-black">
              สาขา
            </label>
            {/* <select
              id=""
              className="border border-black rounded-md p-1 w-full h-10"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
            >
              <option value="วิศวกรรมคอมพิวเตอร์">วิศวกรรมคอมพิวเตอร์</option>
            </select> */}
            <input
              type="major"
              className="border border-black rounded-md p-1 w-full h-10"
              placeholder="สาขา"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
            />
          </div>

          <div className="py-2 col-span-12 lg:col-span-12">
            <label htmlFor="" className=" block mb-2 text-black">
              มีความประสงค์
            </label>
            <input
              type="text"
              className="border border-black rounded-md p-1 w-full h-10"
              placeholder="มีความประสงค์"
              value={intention}
              onChange={(e) => setIntention(e.target.value)}
            />
          </div>

          <div className="py-2 col-span-12 lg:col-span-6">
            <label htmlFor="" className=" block mb-2 text-black">
              เบอร์โทรศัพท์ติดต่อนักศึกษา
            </label>
            <input
              type="text"
              className="border border-black rounded-md p-1 w-full h-10"
              placeholder="เบอร์โทรศัพท์ติดต่อนักศึกษา"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
          </div>

          <div className="py-2 col-span-12 lg:col-span-6">
            <label htmlFor="" className=" block mb-2 text-black">
              อีเมลติดต่อนักศึกษา
            </label>
            <input
              type="email"
              className="border border-black rounded-md p-1 w-full h-10"
              placeholder="อีเมลติดต่อนักศึกษา"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* <PrintR01
            formData={{
              date: { value: date, x: 341, y: 132 },

              subject: { value: subject, x: 80, y: 160 },
              toWhom: { value: toWhom, x: 80, y: 185 },

              // prefix: { value: prefix, x: 71, y: 161 },

              // firstName: { value: firstName, x: 187, y: 216 },
              // lastName: { value: lastName, x: 71, y: 161 },
              fullName: { value: `${firstName} ${lastName}`, x: 196, y: 214 },
              studentID: { value: studentID, x: 464, y: 214 },

              // educationLevel: { value: educationLevel, x: 71, y: 161 },

              faculty: { value: faculty, x: 71, y: 268 },
              major: { value: major, x: 354, y: 268 },
              intention: { value: intention, x: 145, y: 305 },
              contactNumber: { value: contactNumber, x: 98, y: 424 },
              email: { value: email, x: 91, y: 438 },

              // ... other form fields
            }}
          /> */}

          <button
            className="bg-green-500 rounded-lg h-10 my-6 col-span-12 "
            onClick={handleSubmit}
          >
            ยื่นคำร้อง
          </button>

          <ConfirmModal
            isOpen={isModalOpen}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </>
  );
}
