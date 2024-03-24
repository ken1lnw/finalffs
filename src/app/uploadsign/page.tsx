"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function UploadSign() {
  const [status, setStatus] = useState("");

  const [data, setData] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [roomData, setRoomData] = useState<any>(null);
  const [image, setImage] = useState<any>(null);
  const [imageKey, setImageKey] = useState(Date.now());

  const [isLoading, setLoading] = useState(true);

  const id = "621721100411";

  const userDataFetch = () => {
    fetch(`/api/dbuser/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // setData(data);
        if (data) {
          console.log(data);
          setUserData(data);
          setImage(data.users.signPath);
        } else {
          console.log("error fetch user data");
        }

        setLoading(false);
      });
  };

  const refreshData = () => {};

  useEffect(() => {
    // refreshData();
    userDataFetch();
  }, []);

  const fileInput = useRef<any>(null);

  const uploadFile = async () => {
    if (fileInput.current && fileInput.current.files.length > 0) {
      const file = fileInput.current.files[0];
      const extension = file.name.split(".").pop();
      const newFileName = Math.floor(Math.random() * 10000) + "." + extension;
      const formData = new FormData();

      if (
        userData?.users?.signPath === null ||
        userData?.users?.signPath === ""
      ) {
        formData.append("file", file, newFileName);
        const response = await fetch("/api/uploadimage", {
            method: "POST",
            body: formData,
          });
    
          if (response.ok) {
            console.log("File uploaded successfully");
            await editSignPath(newFileName);
            alert("อัพโหลดไฟล์รูปภาพสำเร็จ");
            setImageKey(Date.now()); // Update the image key to force re-rendering of the image
            fileInput.current.value = ""; // Clear the file input

            userDataFetch();
          } else {
            console.log("File upload failed");
          }

      }
      else{
        formData.append("file", file,image );
        const response = await fetch("/api/uploadimage", {
            method: "POST",
            body: formData,
          });
    
          if (response.ok) {
            const responseData = await response.json();

            console.log("File uploaded successfully");
            setImageKey(Date.now()); // Update the image key to force re-rendering of the image
            fileInput.current.value = ""; // Clear the file input

            alert("อัพโหลดไฟล์รูปภาพสำเร็จ");
            userDataFetch();
          } else {
            console.log("File upload failed");
          }
      }

      
    } else {
      alert("คุณยังไม่ได้เลือกไฟล์");
    }
  };

  const editSignPath = async (newFileName: String) => {
    const response = await fetch(`/api/dbuser/${userData.users.userId}`, {
      method: "PUT",
      body: JSON.stringify({
        // userId: studentID,
        signPath: newFileName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log("uploaded DB successfully");
    } else {
      console.log("Db upload failed");
    }
  };

  return (
    <>
      <div className="container mx-auto pt-4">
        {userData?.users ? (
          userData?.users?.signPath === null ||
          userData?.users?.signPath === "" ? (
            <>
              <div>
                ไม่มีลายเซ็น
                {/* <Image
                  src={`/sign/${image}`}
                  width={200}
                  height={200}
                  alt="Sign"
                /> */}
              </div>

              <div className="pt-5">
                <input
                  ref={fileInput}
                  className="border border-black rounded-md w-full md:w-60"
                  type="file"
                  accept="image/png, image/jpeg"
                />

                <button
                  type="button"
                  className="border border-black inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                  // onClick={onConfirm}
                  onClick={uploadFile}
                >
                  อัพโหลด
                </button>
              </div>

              <p>
              รูปภาพที่อัพโหลดต้องมีพื้นหลังโปร่งแสง
              </p>
              
            </>
          ) : (
            <>
              <div className="flex justify-center md:block">
                <Image
                  src={`/sign/${image}?${imageKey}`}
                  width={200}
                  height={100}
                  alt="Sign"
                />
              </div>

              <div className="pt-5">
                <input
                  ref={fileInput}
                  className="border border-black rounded-md w-full md:w-60"
                  type="file"
                  accept="image/png, image/jpeg"
                />

                <button
                  type="button"
                  className="border border-black inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                  // onClick={onConfirm}
                  onClick={uploadFile}
                >
                  อัพโหลด
                </button>
               
              </div>

              <p>
              รูปภาพที่อัพโหลดต้องมีพื้นหลังโปร่งแสง
              </p>
            </>
          )
        ) : (
          "ไม่มีข้อมูลผู้ใช้งาน"
        )}
      </div>
    </>
  );
}
