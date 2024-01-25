import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="container mx-auto">
        <h1 className="text-2xl text-center py-5">ยินดีต้อนรับเข้าสู่ "ระบบยื่นเอกสารคำร้องภายในคณะวิศวกรรมศาสตร์และเทคโนโลยี มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน"</h1>
        

        <div className="flex justify-center">
          <img
            src="http://ess.rmuti.ac.th/Rmuti/Registration/Upload/contact2566.jpg"
            width="50%"
            height="50%"
            alt="homeimg1"
          />

          <img
            src="http://ess.rmuti.ac.th/Rmuti/Registration/Upload/PRform.jpg"
            width="50%"
            height="50%"
            alt="homeimg2"
          />
        </div>




      </div>
    </>
  );
}
