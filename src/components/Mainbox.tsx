import React, { useState } from "react";
import { IconType } from "react-icons";

type Props = {
  iconCode?: string;    // App.tsx'ten Icon component olarak gelecek
  header?: string;
  subheader?: string;
  text1?: string;
  text2?: string;
  text3?: string;
};

const Mainbox = ({  iconCode, header, text3, text2 }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  return (
    <div
      /* onClick={toggleExpand} bg-gradient-to-br from-orange-400 from-10% via-orange-600 via-30% to-none to-50% bg-opacity-40*/
      className={`border-0 rounded-lg bg-none backdrop-blur-sm max-w-[1000px] w-[420px] h-[32rem] grid justify-evenly custom-xs:w-[90vw] custom-xs:h-[36rem] ${
        isExpanded
          ? "h-[39rem] custom-xs:h-[full] gap-0 duration-700"
          : "h-full gap-16 duration-700"
      } transition-[height] ease-in-out`}
    >
      <div></div>

      {/* Şehir + Sıcaklık */}
      <div className="flex flex-row justify-between gap-2 custom-xs:text-[14vw] text-6xl h-18 text-[#E5D9F2]">
        <div>{header}</div>
        <div>{text2}C°</div>
      </div>

      {/* ICON (artık prop'tan geliyor) */}
      <div className="flex justify-center items-center">
        {iconCode ? (
          <img
            src={`https://openweathermap.org/img/wn/${iconCode}@4x.png`}
            alt="weather"
            className="w-[260px] h-[260px] drop-shadow-lg"
          />
        ) : (
          <div className="w-[260px] h-[260px]" />
        )}
      </div>

      {/* Alt genişleyen kısım (istersen tekrar aktif edersin) */}
      <div className="overflow-hidden w-full flex flex-col items-center justify-center text-center text-4xl text-[#E5D9F2]">
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
