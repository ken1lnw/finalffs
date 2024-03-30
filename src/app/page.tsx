import Image from "next/image";

export default function Home() {
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
        <div className="flex">

          <div className="shadow-lg bg-gray-50">
            <div className="flex items-center bg-blue-500 text-white h-16 p-10">
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

              <p className="text-xl ml-1">จำนวนผู้ใช้งาน</p>
            </div>

            <div className="text-center my-5 text-2xl">2</div>
          </div>
        </div>
      </div>
    </>
  );
}
