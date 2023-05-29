import { clsV2 } from "@utils/cls";
import { useRef, useEffect } from "react";

export default function Modal({ isShow, setShow, title = "", children }) {
  const modalBoxShowSetting = useRef(null);
  const wrapperModalBoxShowSetting = useRef(null);

  useEffect(() => {
    wrapperModalBoxShowSetting.current.addEventListener("click", (event) => {
      if (modalBoxShowSetting.current && !modalBoxShowSetting.current.contains(event.target)) {
        setShow(false);
      }
    });
  }, [modalBoxShowSetting, setShow, wrapperModalBoxShowSetting]);

  useEffect(() => {
    if (isShow) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '15px';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    };
  }, [isShow]);

  return (
    <div ref={wrapperModalBoxShowSetting}
      className={clsV2(
        "fixed z-10 overflow-hidden inset-0 animate-fade animate-once animate-duration-[500ms] m-auto flex flex-col bg-black/80 justify-center",
        isShow ? "visible" : "hidden"
      )}>
      <div className="relative w-full max-w-md p-4 mx-auto">
        <div ref={modalBoxShowSetting}
          className="relative bg-slate-900 rounded-lg shadow shadow-gray-800 animate-fade animate-once animate-duration-[500ms] animate-ease-in-out border-2 border-gray-600">
          <div className="flex justify-between items-center px-6 py-4 border-b  border-gray-700">
            <h5 className="text-xl font-semibold">{title}</h5>
            <button type="button" className="text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white"
              onClick={() => setShow(false)}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
