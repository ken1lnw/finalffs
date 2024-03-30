"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [userData, setUserData] = useState<any>();
  const [docData, setDocData] = useState<any>();

  const userDataFetch = async () => {
    fetch(`/api/dbuser`)
      .then((res) => res.json())
      .then(async (data) => {
        // setData(data);
        if (data) {
          // console.log(data.users.length);
          setUserData(data.users.length);
          await docDataFetch();
        } else {
          console.log("error fetch user data");
        }
      });
  };

  const docDataFetch = async () => {
    fetch(`/api/dbdocs`)
      .then((res) => res.json())
      .then(async (data) => {
        // setData(data);
        if (data) {
          // console.log(data);
          setDocData(data.docs.length);
        } else {
          console.log("error fetch user data");
        }
      });
  };

  useEffect(() => {
    userDataFetch();
  }, []);

  return (
    <>
      <div className="container mx-auto">
        <div className="block">
          <Image
            src="/loco.png"
            width={200}
            height={75}
            alt="loco"
            className="mx-auto mt-5"
          ></Image>

          <h1 className="text-2xl text-center py-5">
            ระบบยื่นเอกสารคำร้องภายในคณะวิศวกรรมศาสตร์และเทคโนโลยี
            มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน
          </h1>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-16 justify-center items-center">
          <div className="flex">
            <div className="shadow-lg bg-gray-50 ">
              <div className="flex items-center bg-green-500 text-white h-16 p-10 rounded-t-md">
                <svg
                  className="w-10 h-10 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H6Zm7.25-2.095c.478-.86.75-1.85.75-2.905a5.973 5.973 0 0 0-.75-2.906 4 4 0 1 1 0 5.811ZM15.466 20c.34-.588.535-1.271.535-2v-1a5.978 5.978 0 0 0-1.528-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2h-4.535Z"
                    clipRule="evenodd"
                  />
                </svg>

                <p className="text-xl ml-1 rounded-b-md">จำนวนผู้ใช้งาน</p>
              </div>

              <div className="text-center my-5 text-2xl">{docData}</div>
            </div>
          </div>

          <div className="flex">
            <div className="shadow-lg bg-gray-50 ">
              <div className="flex items-center bg-green-500 text-white h-16 p-10 rounded-t-md">
                <svg
                  className="w-10 h-10 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M20 10H4v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8ZM9 13v-1h6v1a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1Z"
                    clipRule="evenodd"
                  />
                  <path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 1 1 0 4H4a2 2 0 0 1-2-2Z" />
                </svg>

                <p className="text-xl ml-1 rounded-b-md">จำนวนคำร้อง</p>
              </div>

              <div className="text-center my-5 text-2xl">{userData}</div>
            </div>
          </div>
        </div>

        <div className="mx-2 md:mx-0 shadow-lg">
          <div className="bg-blue-500 text-white p-5 mt-10 rounded-t-md text-xl">
            แนะนำระบบ
          </div>
          <div className="mx-5 py-5 rounded-b-md">
            <div>
              <span className="font-bold">
                ระบบยื่นเอกสารคำร้องภายในคณะวิศวกรรมศาสตร์และเทคโนโลยี{" "}
              </span>
              มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน
              คือระบบที่ใช้สำหรับยื่นเอกสารคำร้องต่างๆ เพื่อแก้ปัญหาและ
              ลดระยะเวลาในการดำเนินการยื่นเอกสารคำร้องอีกทั้งยังลดข้อจำกัดทางด้านอุปกรณ์แก่ผู้ใช้งาน
              โดยระบบการดำเนินการยื่นเอกสารเดิม
              นักศึกษาจะเป็นผู้ดำเนินการติดต่อและส่งเอกสาร
              เพื่อขอลายมือชื่อไปยังผู้ที่เกี่ยวข้องภายในเอกสารซึ่งทำให้เกิดปัญหาสำหรับผู้ที่ไม่สะดวกเดินทางไปติดต่อดำเนินการได้ด้วยตัวเอง
            </div>

            <div className="mt-5">
              <div className="font-bold">ประโยชน์</div>

              <ul className="list-disc ml-9 mt-2">
                <li>เพื่อลดระยะเวลาในการดำเนินการยื่นเอกสารคำร้อง</li>
                <li>เพื่อแก้ปัญหาสำหรับผู้ที่ไม่สะดวกเดินทางไปติดต่อดำเนินการได้ด้วยตัวเอง</li>
                <li>เพื่ออำนวยความสะดวกแก่ผู้ใช้งานที่เกี่ยวข้อง</li>
                <li>เพื่อลดข้อจำกัดทางด้านอุปกรณ์แก่ผู้ใช้งาน</li>
              </ul>

            </div>


            <div className="mt-5">
              <div className="font-bold">ข้อตกลงในการให้บริการ</div>

              <ul className="list-disc ml-9 mt-2">
                <li>ระบบนี้ให้บริการแก่บุคลากรและนักศึาษาภายในคณะวิศวกรรมศาสตร์และเทคโนโลยี มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน นครราชสีมา เท่านั้น</li>
                <li>ผู้ใช้งานต้องมีบัญชีอินอินเตอร์เน็ตสำหรับมหาวิทยาลัยเทคโนโลยีราชมงคลอีสานในการใช้งาน</li>
                <li>เอกสารคำร้องที่สามารถใช้งานได้ ได้แก่ R.01 คำร้องทั่วไป และ R.11 คำร้องขอลงทะเบียนเรียนเทียบรายวิชา</li>

              </ul>

            </div>


            <div className="mt-5">
              <div className="font-bold">ผู้พัฒนา</div>

              <ul className="list-disc ml-9 mt-2">
                <li>นายภูมินันท์ อนันตึก</li>
                <div>นักศึกษาสาขาวิศวกรรมคอมพิวเตอร์ คณะวิศวกรรมศาสตร์และเทคโนโลยี มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน นครราชสีมา</div>
                <div>รหัสนักศึกษา 62172110041-1</div>
              </ul>

            </div>

            <div className="mt-5">
              <div className="font-bold">อาจารย์ที่ปรึกษาระบบ</div>

              <ul className="list-disc ml-9 mt-2">
                <li>อาจารย์ประกาย นาดี</li>
                <div>อาจารย์สาขาวิศวกรรมคอมพิวเตอร์ คณะวิศวกรรมศาสตร์และเทคโนโลยี มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน นครราชสีมา</div>
                <li>อาจารย์สุภัทรา เกิดเมฆ</li>
                <div>อาจารย์สาขาวิศวกรรมคอมพิวเตอร์ คณะวิศวกรรมศาสตร์และเทคโนโลยี มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน นครราชสีมา</div>

              </ul>

            </div>


          </div>
        </div>



        <div className="mx-2 md:mx-0 shadow-lg mb-10">
          <div className="bg-blue-500 text-white p-5 mt-10 rounded-t-md text-xl">
            วิธีการใช้งาน
          </div>
          <div className="mx-5 py-5 rounded-b-md">

            <div className="">
              <div className="font-bold">เข้าสู่ระบบ</div>

              <ul className="list-disc ml-9 mt-2">
                <li>คลิก &quot;เข้าสู่ระบบ&quot; จากเมนูด้านขวาบน และดำเนินการยืนยันตัวตนโดยใช้บัญชีอินเทอร์เน็ต มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน</li>
              </ul>

            </div>


            <div className="mt-5">
              <div className="font-bold">นักศึกษา</div>

              <ul className="list-disc ml-9 mt-2">
                <li>ตรวจสอบข้อมูลส่วนตัวโดยคลิกที่รูปคนด้านขวาบนของจอและเลือก &quot;ข้อมูลส่วนตัว&quot;</li>
                {/* <li>อัพโหลดลายมือชื่อโดยคลิกที่รูปคนด้านขวาบนของจอและเลือก &quot;อัพโหลดลายเซ็น&quot;</li> */}
                <li>ในกรณีที่นักศึกษายังไม่มีห้องเรียน สามารถคลิก &quot;สมัครเข้าห้องเรียน&quot; และเลือกห้องที่ต้องการสมัครในตาราง และคลิกปุ่ม &quot;สมัครเข้าห้องเรียน&quot; สีเขียว และรอการดำเนินการจากอาจารย์ประจำห้อง</li>
                <li>ยื่นคำร้องโดยคลิกเมนู &quot;ยื่นคำร้อง&quot; เลือกคำร้องที่ต้องการยื่น กรอกข้อมูลให้ครบ และคลิก &quot;ยื่นคำร้อง&quot;</li>
                <li>ตรวจสอบประวัติและสถานะคำร้องโดยคลิกเมนู &quot;ประวัติ&quot;</li>

              </ul>

            </div>

            <div className="mt-5">
              <div className="font-bold">อาจารย์ที่ปรึกษา</div>

              <ul className="list-disc ml-9 mt-2">
              <li>ตรวจสอบข้อมูลส่วนตัวโดยคลิกที่รูปคนด้านขวาบนของจอและเลือก &quot;ข้อมูลส่วนตัว&quot;</li>
                <li>อัพโหลดลายมือชื่อโดยคลิกที่รูปคนด้านขวาบนของจอและเลือก &quot;อัพโหลดลายเซ็น&quot;</li>
                <li>สร้างห้องเรียนโดยคลิก &quot;จัดการห้องเรียน&quot; และคลิกปุ่ม &quot;เพิ่มห้องเรียน&quot; สีเขียว กรอกรหัสห้องเรียนและคลิกปุ่ม &quot;สร้าง&quot;</li>
                <li>จัดการคำร้องสมัครเข้าห้องเรียนโดยคลิก &quot;จัดการห้องเรียน&quot; หากต้องการรับสมัครให้คลิปปุ่มสีเขียวรูปเครื่องหมายถูก หากไม่ต้องการรับสมัครให้คลิปปุ่มสีแดงรูปเครื่องหมายกากบาท
                  ในกรณีที่ไม่มีคำร้องสมัครเข้าห้องเรียนจะแสดง &quot;ไม่มีคำร้องสมัครเข้าห้องเรียน&quot;
                </li>
                <li>ตรวจสอบประวัติและสถานะคำร้องโดย คลิกเมนู &quot;ประวัติ&quot;</li>
                <li>จัดการเอกสารคำร้องโดยคลิกเมนู &quot;ประวัติ&quot; คำร้องที่อาจารย์ที่ปรึกษาสามารถจัดการได้จะต้องมีสถานะเอกสารเป็น &quot;นักศึกษายื่นคำร้อง&quot; จัดการคำร้องโดยคลิกปุ่มสีเขียวรูปกากบาทสีเขียว จากนั้นกรอกข้อมูลและคลิก &quot;ยืนยัน&quot;
                </li>


              </ul>

            </div>

            <div className="mt-5">
              <div className="font-bold">หัวหน้าสาขา</div>

              <ul className="list-disc ml-9 mt-2">
              <li>ตรวจสอบข้อมูลส่วนตัวโดยคลิกที่รูปคนด้านขวาบนของจอและเลือก &quot;ข้อมูลส่วนตัว&quot;</li>
                <li>อัพโหลดลายมือชื่อโดยคลิกที่รูปคนด้านขวาบนของจอและเลือก &quot;อัพโหลดลายเซ็น&quot;</li>
                <li>ตรวจสอบประวัติและสถานะคำร้องโดย คลิกเมนู &quot;ประวัติ&quot;</li>
                <li>จัดการเอกสารคำร้องโดยคลิกเมนู &quot;ประวัติ&quot; คำร้องที่อาจารย์ที่ปรึกษาสามารถจัดการได้จะต้องมีสถานะเอกสารเป็น &quot;อาจารย์ที่ปรึกษาลงความเห็น&quot; จัดการคำร้องโดยคลิกปุ่มสีเขียวรูปกากบาทสีเขียว จากนั้นกรอกข้อมูลและคลิก &quot;ยืนยัน&quot;
                </li>


              </ul>

            </div>

            <div className="mt-5">
              <div className="font-bold">เจ้าหน้าที่</div>

              <ul className="list-disc ml-9 mt-2">
                <li>ตรวจสอบประวัติและสถานะคำร้องโดย คลิกเมนู &quot;ประวัติ&quot;</li>
                <li>จัดการเอกสารคำร้องโดยคลิกเมนู &quot;ประวัติ&quot; คำร้องที่อาจารย์ที่ปรึกษาสามารถจัดการได้จะต้องมีสถานะเอกสารเป็น &quot;หัวหน้าสาขาลงความเห็น&quot; จัดการคำร้องโดยคลิกปุ่มสีเขียวรูปกากบาทสีเขียว จากนั้นกรอกข้อมูลและคลิก &quot;ยืนยัน&quot;
                </li>


              </ul>

            </div>


            <div className="mt-5">
              <div className="font-bold">แอดมิน</div>

              <ul className="list-disc ml-9 mt-2">
                <li>จัดการคำร้องทั้งหมดโดยคลิกเมนู &quot;แอดมิน&quot; เลือก &quot;จัดการคำร้อง&quot;</li>
                <li>จัดการผู้ใช้งานทั้งหมดโดยคลิกเมนู &quot;แอดมิน&quot; เลือก &quot;จัดการผู้ใช้งาน&quot;</li>
                <li>จัดการห้องเรียนทั้งหมดโดยคลิกเมนู &quot;แอดมิน&quot; เลือก &quot;จัดการห้องเรียน&quot;</li>
                <li>จัดการสาขาวิชาทั้งหมดโดยคลิกเมนู &quot;แอดมิน&quot; เลือก &quot;จัดการสาขา&quot;</li>


              </ul>

            </div>


      


          </div>
        </div>


      </div>
    </>
  );
}
