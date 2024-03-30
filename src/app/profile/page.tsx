"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function UploadSign() {
  const { data: session, status }: any = useSession();
  console.log(session);
  if (status === "unauthenticated") {
    redirect("/");
  }
  // const [status, setStatus] = useState("");
  console.log(session);
  const id = session?.user?.id;

  const [data, setData] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [roomData, setRoomData] = useState<any>(null);
  const [image, setImage] = useState<any>(null);
  const [imageKey, setImageKey] = useState(Date.now());

  const [isLoading, setLoading] = useState(true);
  const [roomstatus, setRoomStatus] = useState("");

  const userDataFetch = async () => {
    fetch(`/api/dbuser/${id}`)
      .then((res) => res.json())
      .then(async (data) => {
        // setData(data);
        if (data) {
          console.log(data);
          setUserData(data);
          await findRoom();
        } else {
          console.log("error fetch user data");
        }

        setLoading(false);
      });
  };


  const findRoom = async () => {

    fetch(`/api/dbroom/findroomforstudent/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // setData(data);
        if (data.rooms && Object.keys(data.rooms).length == 0) {
        //   setStatus("ยังไม่มีห้องเรียน");
          console.log(data.rooms);
          setRoomStatus("ยังไม่มีห้องเรียน");

        } else {
        //   setStatus("มีห้องเรียนแล้ว");
        //   setData(data);
          console.log(data.rooms[0].roomId);
          setRoomStatus(data.rooms[0].roomId);
        }

        setLoading(false);
      });
  };

  const refreshData = () => {};

  // useEffect(() => {
  //   // refreshData();
  //   userDataFetch();
  // }, []);

  useEffect(() => {
    if (session) {
      userDataFetch();
    }
  }, [session]);

  return (
    <>
      <div className="container mx-auto pt-7">
        <div className="rounded-md shadow-xl p-5">
          <h1 className="text-4xl pb-5 shadw">ข้อมูลส่วนตัว</h1>
          {userData?.users ? (
            <>
              <div className="flex flex-row">
                <p className="py-2 font-bold ">รหัสประจำตัว :</p>
                <p className="py-2 md:ml-2">{userData?.users?.userId}</p>
              </div>

              <div className="flex flex-row">
                <p className="py-2 font-bold ">คำนำหน้า :</p>
                <p className="py-2 md:ml-2">{userData?.users?.prefix}</p>
              </div>

              <div className="flex flex-row">
                <p className="py-2 font-bold ">ชื่อ :</p>
                <p className="py-2 md:ml-2">{userData?.users?.name}</p>
              </div>

              <div className="flex flex-row">
                <p className="py-2 font-bold ">นามสกุล :</p>
                <p className="py-2 md:ml-2">{userData?.users?.lname}</p>
              </div>

              <div className="flex flex-row">
                <p className="py-2 font-bold ">คณะ :</p>
                <p className="py-2 md:ml-2">{userData?.users?.faculty}</p>
              </div>

              <div className="flex flex-row">
                <p className="py-2 font-bold ">สาขาวิชา :</p>
                <p className="py-2 md:ml-2">{userData?.users?.major}</p>
              </div>

              <div className="flex flex-row">
                <p className="py-2 font-bold ">สิทธิ์ผู้ใช้งาน :</p>
                <p className="py-2 md:ml-2">{userData?.users?.role}</p>
              </div>

              {userData?.users && userData?.users?.role === "student" ?  
              <>
              <div className="flex flex-row">
                <p className="py-2 font-bold ">ห้อง :</p>
                <p className="py-2 md:ml-2">{roomstatus}</p>
              </div>

              </>
              
              :
              
              <></>}



              {userData?.users && userData?.users?.admin === true ?  
              <>
              <div className="flex flex-row">
                <p className="py-2 font-bold ">สถานะแอดมิน :</p>
                <p className="py-2 md:ml-2">เป็นแอดมิน</p>
              </div>

              </>
              
              :
              
              <></>}



              
            </>
          ) : (
            <p>ไม่พบผู้ใช้งาน</p>
          )}
        </div>
      </div>
    </>
  );
}
