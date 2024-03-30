"use client";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react"

interface NavigationItem {
  name: string;
  href: string;
  current: boolean;
  subItems?: {
    name: string;
    href: string;
    current: boolean;
  }[];
}

// const navigation = [
//   { name: "หน้าแรก", href: "/", current: false },
//   { name: "ยื่นคำร้อง", href: "/request", current: false },
//   { name: "ประวัติ", href: "/history", current: false },
//   { name: "แอดมิน", href: "", current: false, subItems: [
//     { name: "จัดการคำร้อง", href: "/managedocs", current: false },
//     { name: "จัดการผู้ใช้งาน", href: "/manageusers", current: false },
//     { name: "จัดการห้องเรียน", href: "/managerooms", current: false },
//     { name: "จัดการสาขา", href: "/managemajors", current: false }
//   ]},
//   { name: "จัดการห้องเรียน(อาจารย์)", href: "/teachermanagerooms", current: false },
//   { name: "สมัครเข้าห้องเรียน", href: "/roomregis", current: false },
// ];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { data: session }:any = useSession()
  const pathname = usePathname();

  let navigation: NavigationItem[] = [
    { name: "หน้าแรก", href: "/", current: false },
  ];


  if(session){
    console.log(session);
    if(session.user.role === 'student'){
      navigation.push(
        { name: "ยื่นคำร้อง", href: "/request", current: false },
        { name: "ประวัติ", href: "/history", current: false },
        { name: "สมัครเข้าห้องเรียน", href: "/roomregis", current: false },
      )
    } else if(session.user.role === 'teacher'){
      navigation.push(
        { name: "ประวัติ", href: "/history", current: false },
        { name: "จัดการห้องเรียน(อาจารย์)", href: "/teachermanagerooms", current: false },
      )
    }
    else if(session.user.role === 'officer'){
      navigation.push(
        { name: "ประวัติ", href: "/history", current: false },
      )
    }
    if(session.user.admin){
      navigation.push(
        { name: "แอดมิน", href: "", current: false, subItems: [
          { name: "จัดการคำร้อง", href: "/managedocs", current: false },
          { name: "จัดการผู้ใช้งาน", href: "/manageusers", current: false },
          { name: "จัดการห้องเรียน", href: "/managerooms", current: false },
          { name: "จัดการสาขา", href: "/managemajors", current: false }
        ]}
      )
    }
  }




  const [currentPage, setCurrentPage] = useState(() => {
    // ให้เริ่มต้นค่าเป็น pathname ปัจจุบัน
    const initialPage = navigation.find((item) => item.href === pathname);
    return initialPage ? initialPage.name : "หน้าแรก";
  });

  const handleNavigationClick = (name: string) => {
    setCurrentPage(name);
  };
  
//   if(session){
// console.log(session.user);
//   }

  return (
    <>
      {" "}
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                    {navigation.map((item) => (
  <div key={item.name} className="relative">
    {/* ตรวจสอบว่ามี subItems หรือไม่ */}
    {item.subItems ? (
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button
            className={classNames(
              currentPage === item.name
                ? "bg-gray-900 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white",
              "rounded-md px-3  text-sm font-medium"
            )}
          >
            {item.name}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {item.subItems.map((subItem) => (
              <Menu.Item key={subItem.name}>
                {({ active }) => (
                  <Link
                    href={subItem.href}
                    onClick={() => handleNavigationClick(subItem.name)}
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-700"
                    )}
                  >
                    {subItem.name}
                  </Link>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    ) : (
      // หากไม่มี subItems ให้แสดง link ตามปกติ
      <Link
        key={item.name}
        href={item.href}
        onClick={() => handleNavigationClick(item.name)}
        className={classNames(
          currentPage === item.name
            ? "bg-gray-900 text-white"
            : "text-gray-300 hover:bg-gray-700 hover:text-white",
          "rounded-md px-3 py-2 text-sm font-medium"
        )}
        aria-current={item.current ? "page" : undefined}
      >
        {item.name}
      </Link>
    )}
  </div>
))}

                    </div>
                  </div>
                </div>
                { session ?(
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <div className="text-white hidden md:block">
                    <p>{session?.user?.name} {session?.user?.lname}</p>
                  </div>
                  {/* <button
                    type="button"
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />

                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button> */}

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://cdn.pixabay.com/photo/2013/07/13/10/44/man-157699_1280.png"
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        
                      <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/profile"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              ข้อมูลส่วนตัว
                            </a>
                          )}
                        </Menu.Item>
                        
                        
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/uploadsign"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              อัพโหลดลายเซ็น
                            </a>
                          )}
                        </Menu.Item>
                        
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              // href="/api/auth/signout"
                              onClick={() => signOut({ callbackUrl: '/', redirect:true })}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              ออกจากระบบ
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
                ) : 
                
                <>
                
                <a

        href={'/signin'}
        // onClick={() => signIn('Credentials', {callbackUrl: "/history"})}

        className={classNames(
          currentPage === "เข้าสู่ระบบ"
            ? "bg-gray-900 text-white"
            : "text-gray-300 hover:bg-gray-700 hover:text-white",
          "rounded-md px-3 py-2 text-sm font-medium"
        )}
      >
        เข้าสู่ระบบ
      </a>


                </>
                }
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
  <div className="space-y-1 px-2 pb-3 pt-2">
    {navigation.map((item) => (
      <div key={item.name} className="relative">
        {/* ตรวจสอบว่ามี subItems หรือไม่ */}
        {item.subItems ? (
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button
                  className={classNames(
                    "block rounded-md px-3 py-2 text-base font-medium",
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  )}
                >
                  {item.name} +
                </Disclosure.Button>
                <Disclosure.Panel>
                  <div className="space-y-1">

                  {item.subItems ? (
  // ถ้า subItems มีค่า
  // ให้แสดงเนื้อหาของ subItems
  <>
  
  {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        onClick={() => handleNavigationClick(subItem.name)}
                        className={classNames(
                          "block px-4 py-2 text-sm text-white",
                          currentPage === subItem.name && "bg-gray-100",
                        )}
                      >
                        - {subItem.name}
                      </Link>
                    ))}
  
  </>
  
) : <></>
  // ถ้า subItems เป็น undefined
  // ให้ทำอะไรก็ตามที่คุณต้องการ
}



                   
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ) : (
          // หากไม่มี subItems ให้แสดง link ตามปกติ
          <Disclosure.Button
            key={item.name}
            as="a"
            href={item.href}
            className={classNames(
              item.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
              "block rounded-md px-3 py-2 text-base font-medium"
            )}
            aria-current={item.current ? "page" : undefined}
          >
            {item.name}
          </Disclosure.Button>
        )}
      </div>
    ))}
  </div>
</Disclosure.Panel>

          </>
        )}
      </Disclosure>
    </>
  );
}
