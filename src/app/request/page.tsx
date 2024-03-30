"use client";
import React, { useEffect, useState } from "react";

import R01 from "./r01/page";
import R11 from "./r11/page";
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation";
export default function History() {
  const { data: session, status }:any = useSession()

  if (status === "unauthenticated") {
    redirect('/')
  }

  if (status === "authenticated" && session?.user?.role !== "student") {
    redirect('/')
  }


  const id = session?.user?.id;
  const [roomstatus, setStatus] = useState("");
  const [data, setData] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [roomData, setRoomData] = useState<any>(null);
  const [isLoading, setLoading] = useState(true);

  const [selectedForm, setSelectedForm] = useState("");

  const handleFormChange = (event: any) => {
    setSelectedForm(event.target.value);
  };

  const userDataFetch = () => {
    fetch(`/api/dbuser/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // setData(data);
        if (data) {
          console.log(data);
          setUserData(data);
        } else {
          console.log("error fetch user data");
        }

        setLoading(false);
      });
  };

  const roomFetch = () => {
    fetch(`/api/dbroom/request`)
      .then((res) => res.json())
      .then((data) => {
        // setData(data);
        if (data) {
          console.log(data.request);
          setRoomData(data.request);
        } else {
          console.log("error fetch roomRequest data");
        }

        setLoading(false);
      });
  };

  const refreshData = () => {
    roomFetch();
    userDataFetch();
    fetch(`/api/dbroom/findroomforstudent/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // setData(data);
        if (data.rooms && Object.keys(data.rooms).length == 0) {
          setStatus("ยังไม่มีห้องเรียน");
        } else {
          setStatus("มีห้องเรียนแล้ว");
          setData(data);
          console.log(data);
        }

        setLoading(false);
      });
  };

  useEffect(() => {
    refreshData();
    // userDataFetch();
  }, []);

  return (
    <>
      <div className="container mx-auto pt-4">
        {userData?.users ? (
          roomstatus === "ยังไม่มีห้องเรียน" ? (
            "ยังไม่มีห้องเรียน กรุณาสมัครเข้าห้องเรียน"
          ) : (
            <>
              <label htmlFor="form" className="block mb-2 text-black">
                แบบฟอร์มคำร้อง
              </label>
              <select
                id="form"
                value={selectedForm}
                onChange={handleFormChange}
                className="bg-blue-100 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="">กรุณาเลือกแบบฟอร์มคำร้อง</option>
                <option value="r01">R.01 คำร้องทั่วไป</option>
                <option value="r11">
                  R.11 คำร้องขอลงทะเบียนเรียนเทียบรายวิชา
                </option>
              </select>
              {selectedForm === "r01" && <R01 />}
              {selectedForm === "r11" && <R11 />}
            </>
          )
        ) : (
          "ไม่มีข้อมูลผู้ใช้งาน"
        )}
      </div>
    </>
  );
}
