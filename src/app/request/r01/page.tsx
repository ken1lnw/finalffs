import { useState } from "react";
import PrintR01 from "./print/page";

export default function R01() {
  const [date, setDate] = useState("");
  const [subject, setSubject] = useState("");
  const [toWhom, setToWhom] = useState("");
  const [prefix, setPrefix] = useState("นาย");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [studentID, setStudentID] = useState("");
  const [educationLevel, setEducationLevel] = useState("ปริญญาตรี");
  const [faculty, setFaculty] = useState("วิศวกรรมศาสตร์และเทคโนโลยี");
  const [major, setMajor] = useState("");
  const [intention, setIntention] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");

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
              placeholder="นามสกุล"
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
              <option value="นาย">ปวช.</option>
              <option value="นาย">ปวส.</option>
              <option selected value="นาง">
                ปริญญาตรี
              </option>
              <option value="นางสาว">ปริญญาโท</option>
              <option value="นางสาว">ปริญญาเอก</option>
            </select>
          </div>

          <div className="py-2 col-span-12 lg:col-span-5">
            <label htmlFor="" className=" block mb-2 text-black">
              คณะ
            </label>
            <select
              id=""
              className="border border-black rounded-md p-1 w-full h-10"
              value={faculty}
              onChange={(e) => setFaculty(e.target.value)}
            >
              <option value="คณะวิศวกรรมศาสตร์และเทคโนโลยี">
                คณะวิศวกรรมศาสตร์และเทคโนโลยี
              </option>
            </select>
          </div>

          <div className="py-2 col-span-12 lg:col-span-5">
            <label htmlFor="" className=" block mb-2 text-black">
              สาขา
            </label>
            <select
              id=""
              className="border border-black rounded-md p-1 w-full h-10"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
            >
              <option value="วิศวกรรมคอมพิวเตอร์">วิศวกรรมคอมพิวเตอร์</option>
            </select>
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

        

          <PrintR01
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
          />
        </div>
      </div>
    </>
  );
}
