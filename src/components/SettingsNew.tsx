import React, { useState } from "react";
import { IconType } from "react-icons";
import { RiSettingsFill } from "react-icons/ri";

type Props = {
  icon?: IconType;
  header?: string;
  subheader?: string;
  text1?: string;
  text2?: string;
};

const SettingsNew = ({ icon: Icon = RiSettingsFill, header }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const togglePanel = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex z-50">
      {/* Button */}
      <button
        className="bg-white/20 rounded-lg backdrop-blur-sm max-w-[1000px] w-12 h-[2.5rem] grid justify-evenly custom-xs:w-8"
        onClick={togglePanel}
      >
        <div className="flex flex-row justify-center text-xl text-teal-200 w-full">
          {header}
        </div>
        <div className="grid grid-flow-col justify-center text-[25px] text-white">
          <Icon />
        </div>
      </button>

      {/* Expanded Window */}
      {isExpanded && (
        <>
          {/* Background Overlay */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20"
            onClick={togglePanel} // Close when clicking on the background
          ></div>

          {/* Expanded Content */}
          <div className="fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#A294F9] rounded-lg shadow-lg p-6 z-20 w-[73vw] h-64 custom-xm:max-w-[90vw] min-h-fit">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 border-2 text-white p-2 rounded-md w-10"
              onClick={togglePanel}
            >
              ✕
            </button>

            {/* Content */}
            <h2 className="text-lg font-semibold text-gray-800 text-white">
              Location Details
            </h2>
            <div className="mt-4 space-y-2 text-white">
              <p className="text-sm">Subheader: {header}</p>
              <p className="text-sm">Further details about this location can be added here.</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SettingsNew;
