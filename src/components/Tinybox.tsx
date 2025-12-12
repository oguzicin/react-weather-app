import React from "react";
import { IconType } from "react-icons";


type Props = {
    Icon?: IconType;
    header?: string;
    text?:string;
};

const Tinybox = ({ Icon, header, text }: Props) => {
    return(
        <div className="bg-white/20 rounded-lg backdrop-blur-sm w-24 h-[100px] custom-xs:w-[20vw] flex flex-col justify-evenly">
            <div className="flex justify-center h-1/4 items-center text-[#E5D9F2]">
                {header}
            </div>
            <div className="h-[40px] flex items-center justify-center text-[#E5D9F2]">
                {Icon && <Icon className="text-5xl" />}
            </div>
            <div className="flex justify-center text-[#E5D9F2]">
                {text} C°
            </div>
            
        </div>
    )
}

export default Tinybox