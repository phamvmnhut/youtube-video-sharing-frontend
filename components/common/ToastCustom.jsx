import React from "react";
import { useRouter } from 'next/router';

export default function ToastCustom({ closeToast, toastProps, title, email }) {
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  }

  return (
    <div className="">
      <div className=" font-bold">New Video</div>
      <div className="truncate">{title}</div>
      <div className=" text-indigo-500">Share by <span className=" text-black">{email}</span></div>
      <div className="mt-2 flex flex-row justify-start items-center">
        <button className=" bg-indigo-600 py-1 px-3 rounded-md text-white"
          onClick={refreshData}
        >Refresh</button>
      </div>
    </div>
  )
}
