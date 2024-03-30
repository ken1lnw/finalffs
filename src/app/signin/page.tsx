"use client";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { FormEvent, useRef, useState } from "react";

export default function SignIn() {
  const personalid = useRef<HTMLInputElement>(null);
  const name = useRef<HTMLInputElement>(null);
  const [loginError, setLoginError] = useState<any>(null);

  const { data: session }: any = useSession();
  if (session) {
    if(session?.user.admin === true){

      redirect("/manageusers");

    }
    else{
      if(session?.user.role === 'student' || session?.user.role === 'teacher' || session?.user.role === 'officer'){
        redirect("/history");
      }
      
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const respone = await signIn("credentials", {
      id: formData.get("personalid"),
      name: formData.get("name"),
      redirect: false,
    });

    if (!respone?.ok) {
      setLoginError("ผิดพลาดกรุณาลองใหม่อีกครั้ง");
    } else {
      setLoginError(null);
    
      // if(session?.user.admin === true){

      //   redirect("/manageusers");

      // }
      // else{
      //   if(session?.user.role === 'student' || session?.user.role === 'teacher' || session?.user.role === 'officer'){
      //     redirect("/history");
      //   }
        
      // }

      
    }
  };

  // const handleLogin = () => {

  //   signIn("credentials", {
  //     perosnalid: personalid.current?.value,
  //     name: name.current?.value,
  //     redirect: true,
  //     callbackUrl: "/",
  //   });
  // };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            // className="mx-auto h-10 w-auto"
            className="mx-auto w-auto"
            src="/loco.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            เข้าสู่ระบบ
          </h2>
          {loginError && (
            <p className="text-center text-red-500">{loginError}</p>
          )}
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="personalid"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                รหัสประจำตัว
              </label>
              <div className="mt-2">
                <input
                  ref={personalid}
                  id="personalid"
                  name="personalid"
                  type="text"
                  required
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  ชื่อ
                </label>
              </div>
              <div className="mt-2">
                <input
                  ref={name}
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                เข้าสู่ระบบ
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
