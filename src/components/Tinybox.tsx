import React from "react";

type Props = {
  iconCode?: string;
  header?: string;
  text?: string;
};

const Tinybox = ({ iconCode, header, text }: Props) => {
  return (
    <div className="bg-white/20 rounded-lg backdrop-blur-sm w-24 h-[100px] custom-xs:w-[20vw] flex flex-col justify-evenly">
      <div className="flex justify-center h-1/4 items-center text-[#E5D9F2]">
        {header}
      </div>

      <div className="h-[40px] flex items-center justify-center">
        {iconCode && (
          <img
            src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
            alt="weather"
            className="w-12 h-12"
          />
        )}
      </div>

      <div className="flex justify-center text-[#E5D9F2]">
        {text}°C
      </div>
    </div>
  );
};

export default Tinybox;
