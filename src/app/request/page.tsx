"use client"
import React, { useState } from 'react';

import R01 from "./r01/page";
import R11 from "./r11/page";
export default function History() {

  const [selectedForm, setSelectedForm] = useState('');

  const handleFormChange = (event:any) => {
    setSelectedForm(event.target.value);
  };

  return (
    <>
      <div className="container mx-auto pt-4">
        
        <label
          htmlFor="form"
          className="block mb-2 text-black"
        >
          แบบฟอร์มคำร้อง
        </label>
        <select
          id="form"
          value={selectedForm}
          onChange={handleFormChange}
          className="bg-blue-100 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option value=''>กรุณาเลือกแบบฟอร์มคำร้อง</option>
          
          <option value="r01">R.01 คำร้องทั่วไป</option>
          <option value="r11">R.11 คำร้องขอลงทะเบียนเรียนเทียบรายวิชา</option>

        </select>

        {selectedForm === 'r01' && <R01 />}
        {selectedForm === 'r11' && <R11 />}
{/* 
        <R01/>

        <R11/> */}
      </div>
    </>
  );
}
