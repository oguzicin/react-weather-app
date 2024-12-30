import React from "react";
import { IconType } from "react-icons";
import { GiNoseSide } from "react-icons/gi";

type Props = {
    Icon?: IconType;
    header?: string;
    subheader?: string;
    text1?:string;
    text2?:string;
};

const MediumBox = ({ Icon, header, text1, text2 }: Props) => {
    return(
        <div className="flex flex-row bg-white/20 rounded-lg backdrop-blur-sm w-[420px] h-32 custom-xs:w-[90vw] justify-center">
            <div className=" text-white flex justify-center items-center w-1/3">
            {Icon && <Icon className="text-[40px]" />}
            </div>
            <div className=" w-1/3 flex flex-col items-center justify-center text-center">
                {header}<br></br>
               <span className="text-2xl text-green-300">{text1}</span> 
            </div>
            <div  className=" w-1/3 flex flex-col items-center justify-center text-center text-4xl text-white">
                {text2}
            </div>
        </div>
    )
}

export default MediumBox