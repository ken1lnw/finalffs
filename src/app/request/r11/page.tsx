export default function R11() {
    return (
      <>
        <div className="container mx-auto pt-4">
          <h1 className="text-xl mb-2 mt-4">R.11 คำร้องขอลงทะเบียนเรียนเทียบรายวิชา</h1>
  
          <div className="grid grid-cols-12 gap-2">
            <div className="py-2 col-span-12 lg:col-span-2">
              <label htmlFor="วันที่" className="block mb-2 text-black">
                วันที่
              </label>
              <input
                id="วันที่"
                type="date"
                className="border border-black rounded-md p-1 w-full h-10"
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
              />
            </div>
  
           
  
            <div className="py-2 col-span-12 lg:col-span-1">
            <label htmlFor="" className=" block mb-2 text-black">
              คำนำหน้า
            </label>
            <select
              id="form"
              className="border border-black rounded-md p-1 w-full h-10"
              
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
              
            />
          </div>
  
            <div className="py-2 col-span-12 lg:col-span-2">
              <label htmlFor="" className=" block mb-2 text-black">
                ระดับการศึกษา
              </label>
              <select
                id="form"
                className="border border-black rounded-md p-1 w-full h-10"
              >
                <option value="">ระดับการศึกษา</option>
                <option value="นาย">ปวช.</option>
                <option value="นาย">ปวส.</option>
                <option selected value="นาง">ปริญญาตรี</option>
                <option value="นางสาว">ปริญญาโท</option>
                <option value="นางสาว">ปริญญาเอก</option>
              </select>
            </div>
  
            <div className="py-2 col-span-12 lg:col-span-5">
              <label htmlFor="" className=" block mb-2 text-black">
                คณะ
              </label>
              <select
                id="form"
                className="border border-black rounded-md p-1 w-full h-10"
              >
                <option value="คณะวิศวกรรมศาสตร์และเทคโนโลยี">คณะวิศวกรรมศาสตร์และเทคโนโลยี</option>
  
              </select>
            </div>
  
  
            <div className="py-2 col-span-12 lg:col-span-5">
              <label htmlFor="" className=" block mb-2 text-black">
                สาขา
              </label>
              <select
                id="form"
                className="border border-black rounded-md p-1 w-full h-10"
              >
                <option value="วิศวกรรมคอมพิวเตอร์">วิศวกรรมคอมพิวเตอร์</option>
  
              </select>
            </div>
  
  
            <div className="py-2 col-span-12 lg:col-span-6 mt-10">
              <label htmlFor="" className=" block mb-2 text-black">
              มีความประสงค์ลงทะเบียนเทียบรายวิชาใน ภาคการเรียนที่
              </label>
              <input
                type="text"
                className="border border-black rounded-md p-1 w-full h-10"
                placeholder="ภาคการเรียนที่"
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
              />
            </div>
  
  
            <div className="py-2 col-span-12 lg:col-span-7">
              <label htmlFor="" className=" block mb-2 text-black">
                ชื่อวิชา
              </label>
              <input
                type="email"
                className="border border-black rounded-md p-1 w-full h-10"
                placeholder="ชื่อวิชา"
              />
            </div>

            <div className="py-2 col-span-12 lg:col-span-2">
              <label htmlFor="" className=" block mb-2 text-black">
                หน่วยกิต
              </label>
              <input
                type="email"
                className="border border-black rounded-md p-1 w-full h-10"
                placeholder="หน่วยกิต"
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
              />
            </div>
  
  
            <div className="py-2 col-span-12 lg:col-span-7">
              <label htmlFor="" className=" block mb-2 text-black">
                ชื่อวิชา
              </label>
              <input
                type="email"
                className="border border-black rounded-md p-1 w-full h-10"
                placeholder="ชื่อวิชา"
              />
            </div>

            <div className="py-2 col-span-12 lg:col-span-2">
              <label htmlFor="" className=" block mb-2 text-black">
                หน่วยกิต
              </label>
              <input
                type="email"
                className="border border-black rounded-md p-1 w-full h-10"
                placeholder="หน่วยกิต"
              />
            </div>

            <div className="py-2 col-span-12 lg:col-span-2">
              <label htmlFor="" className=" block mb-2 text-black">
                อาจารย์ผู้สอน
              </label>
              <input
                type="email"
                className="border border-black rounded-md p-1 w-full h-10"
                placeholder="อาจารย์ผู้สอน"
              />
            </div>
  
  
            <button className="bg-green-500 rounded-lg h-10 my-6 col-span-12 ">ยื่นคำร้อง</button>
  
  
            
          </div>
        </div>
      </>
    );
  }
  