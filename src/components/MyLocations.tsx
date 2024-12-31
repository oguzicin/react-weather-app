import React from "react";
import { IconType } from "react-icons";
import { FaLocationDot } from "react-icons/fa6";


type Props = {
    icon?: IconType;
    header?: string;
    subheader?: string;
    text1?:string;
    text2?:string;
};

const MyLocations = ({ icon, header, }: Props) => {
    return(
        <button className="bg-white/20 rounded-lg backdrop-blur-sm max-w-[1000px] w-12 h-[2.5rem] grid justify-evenly">
            <div className="flex flex-row justify-center text-xl text-teal-200 w-full">
                {header}
            </div>
            <div className="grid grid-flow-col justify-center text-[25px] text-white">
            
            <FaLocationDot />

            </div>
        </button>
    )
}

export default MyLocations;