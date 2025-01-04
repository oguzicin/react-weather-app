import React, { useState } from "react";
import { IconType } from "react-icons";
import { TiWeatherPartlySunny } from "react-icons/ti";

type Props = {
  icon?: IconType;
  header?: string;
  subheader?: string;
  text1?: string;
  text2?: string;
  text3?: string;
};

const Mainbox = ({ icon, header, text3 }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  return (
    <div
      onClick={toggleExpand}
      className={`bg-white/20  rounded-lg backdrop-blur-sm max-w-[1000px] w-[420px] h-[32rem] grid justify-evenly custom-xs:w-[90vw] custom-xs:h-[30rem] ${
        isExpanded ? "h-[39rem] custom-xs:h-[35rem] gap-0 duration-700" : "h-24 gap-0 duration-700"
      } transition-[height]  ease-in-out rounded-lg`}
    >
      <div></div>
      <div className="flex flex-row justify-center text-7xl h-18 text-white">
        {header}
      </div>
      <div className="grid grid-flow-col justify-center text-[300px] text-white">
        <TiWeatherPartlySunny />
      </div>
      <div className="overflow-hidden w-full  flex flex-col items-center justify-center text-center text-4xl text-white">
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out w-full ${
            isExpanded
              ? "max-h-40 opacity-100 duration-1000"
              : "max-h-0 opacity-0"
          }`}
        >
          <span className="text-4xl w-full justify-center flex flex-col">
            {text3}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Mainbox;
