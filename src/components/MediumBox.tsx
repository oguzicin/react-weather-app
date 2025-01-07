import React, { useEffect, useRef, useState } from "react";
import { IconType } from "react-icons";
import { GiNoseSide } from "react-icons/gi";

type Props = {
  Icon?: IconType;
  header?: string;
  subheader?: string;
  text1?: string;
  text2?: string;
  text3?: string;
};

const MediumBox = ({ Icon, header, text1, text2, text3 }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  const boxRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <div
      ref={boxRef}
      onClick={toggleExpand}
      className={`overflow-hidden flex flex-col  bg-white/20 rounded-lg backdrop-blur-sm w-[420px] h-32 custom-xs:w-[90vw] justify-center transition-[height] duration-900 ease-in-out ${
        isExpanded ? "h-64 gap-5 duration-700" : "h-24 gap-0 duration-700"
      } transition-[gap]  ease-in-out rounded-lg`}
    >
      <div className="flex flex-row">
        <div className=" text-white flex justify-center items-center w-1/3">
          {Icon && <Icon className="text-[40px]" />}
        </div>
        <div className=" w-1/3 flex flex-col items-center justify-center text-center text-white">
          {header}
          <br></br>
          <span className="text-2xl text-green-300">{text1}</span>
        </div>
        <div className=" w-1/3 flex flex-col items-center justify-center text-center text-4xl text-white">
          {text2}
        </div>
      </div>
      <div className="overflow-hidden w-full  flex flex-col items-center justify-center text-center text-4xl text-white">
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out w-full ${
            isExpanded ? "max-h-40 opacity-100 duration-1000" : "max-h-0 opacity-0"
          }`}
        >
          <span className="text-4xl w-full justify-center flex flex-col">{text3}</span>
        </div>
      </div>
    </div>
  );
};

export default MediumBox;
