"use client"
import React, { useEffect, useState } from 'react';
import RoomTable from './roomtable/page';
import Registed from './registed/page';


export default function RoomRegis() {
    const [status, setStatus] = useState("");

    const [data, setData] = useState<any>(null);
    const [userData, setUserData] = useState<any>(null);
    const [roomData, setRoomData] = useState<any>(null);


    const [isLoading, setLoading] = useState(true);

    const id = "621721100411";

    const userDataFetch = () => {
      fetch(`/api/dbuser/${id}`)
        .then((res) => res.json())
        .then((data) => {
          // setData(data);
          if(data){
            console.log(data);
            setUserData(data);
          }
          else{
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
          if(data){
            console.log(data.request);
            setRoomData(data.request);
          }
          else{
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
              status === "ยังไม่มีห้องเรียน" ? 
                (roomData && roomData.find((item:any) => item.status === "รอการอนุมัติ" && item.requesterId === id) ? "รอการอนุมัติคำขอสมัครเข้าห้องเรียน " + roomData.find((item:any) => item.status === "รอการอนุมัติ" && item.requesterId === id).roomId : <RoomTable userData={userData} refreshData={refreshData} />) 
                : "มีห้องเรียนแล้ว"
            ) : (
              "ไม่มีข้อมูล"
            )}
          </div>
        </>
      );
      
}
