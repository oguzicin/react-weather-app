import React, { useEffect, useRef, useState } from "react";
import { IconType } from "react-icons";

type Props = {
  Icon?: IconType;
  header?: string;
  text1?: string;
  text2?: string;
  text3?: string; // kutu genişleyince görülecek detay
};

const MediumBox = ({ Icon, header, text1, text2, text3 }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const toggleExpand = () => setIsExpanded((prev) => !prev);

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
      className={`overflow-hidden flex flex-col bg-white/20 rounded-lg backdrop-blur-sm w-[420px] custom-xm:w-[90vw] justify-center transition-[height] duration-700 ease-in-out ${
        isExpanded ? "h-64 gap-5" : "h-24 gap-0"
      }`}
    >
      <div className="flex flex-row">
        <div className="text-[#E5D9F2] flex justify-center items-center w-1/3">
          {Icon && <Icon className="text-[40px]" />}
        </div>
        <div className="w-1/3 flex flex-col items-center justify-center text-center text-[#E5D9F2]">
          {header}
          <br />
          <span className="text-2xl text-green-300">{text1}</span>
        </div>
        <div className="w-1/3 flex flex-col items-center justify-center text-center text-3xl custom-xm:text-[7vw] text-[#E5D9F2]">
          {text2}
        </div>
      </div>

      {/* Genişleyen detay kısmı */}
      <div className="overflow-hidden w-full flex flex-col items-center justify-center text-center text-base text-[#E5D9F2] px-4 pb-2">
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out w-full ${
            isExpanded ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <span className="w-full flex flex-col text-sm md:text-base">
            {text3}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MediumBox;
