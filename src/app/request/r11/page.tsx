"use client";

import { useState } from "react";
import { CreatR11 } from "./print/creater11";

export default function R11() {
  const [date, setDate] = useState("");
  const [toWhom, setToWhom] = useState("");
  const [prefix, setPrefix] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [studentID, setStudentID] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [faculty, setFaculty] = useState("");
  const [major, setMajor] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");

  const [semester, setSemester] = useState("");
  const [academicYear, setAcademicYear] = useState("");

  const [studentCourseCode, setStudentCourseCode] = useState("");
  const [studentCourseTitle, setStudentCourseTitle] = useState("");
  const [studentCourseCredit, setStudentCourseCredit] = useState("");

  const [structureCourseCode, setStructureCourseCode] = useState("");
  const [structureCourseTitle, setStructureCourseTitle] = useState("");
  const [structureSection, setStructureSection] = useState("");

  const [professor, setProfessor] = useState("");

  const [formValid, setFormValid] = useState(false);

  const validateForm = () => {
    // Perform validation for each input field
    const isValid =
      date !== "" &&
      toWhom !== "" &&
      prefix !== "" &&
      firstName !== "" &&
      lastName !== "" &&
      studentID !== "" &&
      educationLevel !== "" &&
      faculty !== "" &&
      major !== "" &&
      contactNumber !== "" &&
      email !== "" &&
      semester !== "" &&
      academicYear !== "" &&

      studentCourseCode !== "" &&
      studentCourseTitle !== "" &&
      studentCourseCredit !== "" &&

      structureCourseCode !== "" &&
      structureCourseTitle !== "" &&
      structureSection !== "" &&
      professor !== "";

    setFormValid(isValid);

    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // If the form is valid, call modifyPdf from PrintR01
      const formDataForPrintR11 = {
        date: date,

        toWhom: toWhom,

        prefix: prefix,

        fullName: `${firstName} ${lastName}`,
        studentID: studentID,

        educationLevel:educationLevel,

        faculty:faculty,
        major:major,
        
        contactNumber: contactNumber,
        email: email,

        semester:semester,
        academicYear: academicYear,

        studentCourseCode:studentCourseCode,
        studentCourseTitle: studentCourseTitle,
        studentCourseCredit: studentCourseCredit,

        structureCourseCode:structureCourseCode,
        structureCourseTitle: structureCourseTitle,
        structureSection: structureSection,



        professor: professor,
      };
      // Call modifyPdf from PrintR01 with the form data
      CreatR11(formDataForPrintR11);
      console.log(formDataForPrintR11);
    } else {
      // Handle form validation errors or provide feedback to the user
      alert("กรุณากรอกข้อมูลให้ครบทุกช่อง");
   
      
    }
  };

  return (
    <>
      <div className="container mx-auto pt-4">
        <h1 className="text-xl mb-2 mt-4">
          R.11 คำร้องขอลงทะเบียนเรียนเทียบรายวิชา
        </h1>

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

          <div className="py-2 col-span-12 lg:col-span-10">
            <label htmlFor="" className=" block mb-2 text-black">
              เรียน คณบดีคณะ
            </label>
            <input
              type="text"
              className="border border-black rounded-md p-1 w-full h-10"
              placeholder="เรียน คณบดีคณะ"
              value={toWhom}
              onChange={(e) => setToWhom(e.target.value)}
            />
          </div>

          <div className="py-2 col-span-12 lg:col-span-1">
            <label htmlFor="" className=" block mb-2 text-black">
              คำนำหน้า
            </label>
            <select
              id="form"
              className="border border-black rounded-md p-1 w-full h-10"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
            >
              <option value="">คำนำหน้า</option>

              <option value="นาย">นาย</option>
              <option value="นาง">นาง</option>
              <option value="นางสาว">นางสาว</option>
            </select>
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
              <option value="ปริญญาตรี">ปริญญาตรี</option>
              <option value="ปริญญาโท">ปริญญาโท</option>
              <option value="ปริญญาเอก">ปริญญาเอก</option>
            </select>
          </div>

          <div className="py-2 col-span-12 lg:col-span-5">
            <label htmlFor="" className=" block mb-2 text-black">
              คณะ
            </label>
            {/* <select
              id="form"
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
              id="form"
              className="border border-black rounded-md p-1 w-full h-10"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
            >
              <option value="วิศวกรรมคอมพิวเตอร์">วิศวกรรมคอมพิวเตอร์</option>
            </select> */}
            <input
              type="text"
              className="border border-black rounded-md p-1 w-full h-10"
              placeholder="สาขา"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
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

          <div className="py-2 col-span-12 lg:col-span-6 mt-10">
            <label htmlFor="" className=" block mb-2 text-black">
              มีความประสงค์ลงทะเบียนเทียบรายวิชาใน ภาคการเรียนที่
            </label>
            <input
              type="text"
              className="border border-black rounded-md p-1 w-full h-10"
              placeholder="ภาคการเรียนที่"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
            />
          </div>

          <div className="py-2 col-span-12 lg:col-span-6 mt-10">
            <label htmlFor="" className=" block mb-2 text-black">
              ปีการศึกษา
            </label>
            <input
              type="text"
              className="border border-black rounded-md p-1 w-full h-10"
              placeholder="ปีการศึกษา"
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
            />
          </div>

          <div className="py-2 col-span-12 lg:col-span-3">
            <label htmlFor="" className=" block mb-2 text-black">
              โครงสร้างหลักสูตรนักศึกษา รหัสวิชา
            </label>
            <input
              type="text"
              className="border border-black rounded-md p-1 w-full h-10"
              placeholder="รหัสวิชา"
              value={studentCourseCode}
              onChange={(e) => setStudentCourseCode(e.target.value)}
            />
          </div>

          <div className="py-2 col-span-12 lg:col-span-7">
            <label htmlFor="" className=" block mb-2 text-black">
              ชื่อวิชา
            </label>
            <input
              type="text"
              className="border border-black rounded-md p-1 w-full h-10"
              placeholder="ชื่อวิชา"
              value={studentCourseTitle}
              onChange={(e) => setStudentCourseTitle(e.target.value)}
            />
          </div>

          <div className="py-2 col-span-12 lg:col-span-2">
            <label htmlFor="" className=" block mb-2 text-black">
              หน่วยกิต
            </label>
            <input
              type="text"
              className="border border-black rounded-md p-1 w-full h-10"
              placeholder="หน่วยกิต"
              value={studentCourseCredit}
              onChange={(e) => setStudentCourseCredit(e.target.value)}
            />
          </div>

          <div className="py-2 col-span-12 lg:col-span-3">
            <label htmlFor="" className=" block mb-2 text-black">
              โครงสร้างหลักสูตรที่ต้องการลงทะเบียนเรียน
            </label>
            <input
              type="text"
              className="border border-black rounded-md p-1 w-full h-10"
              placeholder="รหัสวิชา"
              value={structureCourseCode}
              onChange={(e) => setStructureCourseCode(e.target.value)}
            />
          </div>

          <div className="py-2 col-span-12 lg:col-span-7">
            <label htmlFor="" className=" block mb-2 text-black">
              ชื่อวิชา
            </label>
            <input
              type="text"
              className="border border-black rounded-md p-1 w-full h-10"
              placeholder="ชื่อวิชา"
              value={structureCourseTitle}
              onChange={(e) => setStructureCourseTitle(e.target.value)}
            />
          </div>

 

          <div className="py-2 col-span-12 lg:col-span-2">
            <label htmlFor="" className=" block mb-2 text-black">
              กลุ่มเรียน
            </label>
            <input
              type="text"
              className="border border-black rounded-md p-1 w-full h-10"
              placeholder="กลุ่มเรียน"
              value={structureSection}
              onChange={(e) => setStructureSection(e.target.value)}
            />
          </div>

          <div className="py-2 col-span-12 lg:col-span-2">
            <label htmlFor="" className=" block mb-2 text-black">
              อาจารย์ผู้สอน
            </label>
            <input
              type="text"
              className="border border-black rounded-md p-1 w-full h-10"
              placeholder="อาจารย์ผู้สอน"
              value={professor}
              onChange={(e) => setProfessor(e.target.value)}
            />
          </div>

          <button
            className="bg-green-500 rounded-lg h-10 my-6 col-span-12 "
            onClick={handleSubmit}
          >
            ยื่นคำร้อง
          </button>
        </div>
      </div>
    </>
  );
}
