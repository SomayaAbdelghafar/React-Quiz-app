import copy from "copy-to-clipboard";
import { useRef } from "react";
import { toast } from "react-toastify";

interface CodeModal{
    handleClose:()=>void,
    code:string,
}
export default function CodeModal({handleClose,code}:CodeModal) {
    const codeRef = useRef<HTMLInputElement>(null);
    const copyToClipboard = () => {
        let copyText = codeRef.current?.value;
        let isCopy = copy(copyText || "");
        if (isCopy) {
          toast.success("Copied to Clipboard");
        }
      };


  return (
    <div className="px-8">
    <div className="flex items-center justify-center">
      <div className="text-center">
        <i className="fa-solid text-4xl text-white bg-black py-1 px-2 rounded-full text-bold fa-check"></i>
        <h2 className="font-bold text-xl mt-2">
          Quiz was successfully created
        </h2>
        <div
          className={`w-full rounded-lg text-center font-semibold border-black grid grid-cols-3 my-1`}
        >
          <p className="word bg-authImage py-1 ps-1 border-y border-l border-black rounded-l-2xl">
            CODE:
          </p>
          <input
            className={`value p-1 text-center px-1 border-y border-black`}
            ref={codeRef}
            defaultValue={code}
          />
          <button
            onClick={copyToClipboard}
            className="border-y border-r border-black rounded-r-2xl"
          >
            <i className="fa-solid fa-copy "></i>
          </button>
        </div>
        <button onClick={handleClose} className="bg-secondry px-8 rounded-2xl mt-8">
          Close
        </button>
      </div>
    </div>
  </div>
  )
}
