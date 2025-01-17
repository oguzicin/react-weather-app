import React, { useState } from "react";
import { IconType } from "react-icons";
import { RiSettingsFill } from "react-icons/ri";


type Props = {
    icon?: IconType;
    header?: string;
    subheader?: string;
    text1?:string;
    text2?:string;
};

const Settings = ({ icon, header, }: Props) => {

    const [isExpanded, setIsExpanded] = useState(false);


    const togglePanel = () => {
        setIsExpanded(!isExpanded);
    };

    return(
        <button className="bg-white/20 rounded-lg backdrop-blur-sm max-w-[10000px] w-12 h-[2.5rem] grid justify-evenly" onClick={togglePanel}>
            <div className="flex flex-row justify-center text-xl text-teal-200 w-full">
                {header}
            </div>
            <div className="grid grid-flow-col justify-center text-[25px] text-white">
            
            <RiSettingsFill />

            </div>
        </button>
    )
}

export default Settings;