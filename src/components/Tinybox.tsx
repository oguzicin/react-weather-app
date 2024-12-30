import React from "react";
import { IconType } from "react-icons";


type Props = {
    Icon?: IconType;
    header?: string;
    text?:string;
};

const Tinybox = ({ Icon, header, text }: Props) => {
    return(
        <div className="bg-white/20 rounded-lg backdrop-blur-sm w-24 h-[118px] custom-xs:w-[20vw]">
            <div className="flex justify-center h-1/4 items-center text-teal-100">
                {header}
            </div>
            <div className="h-[60px] flex items-center justify-center text-white">
                {Icon && <Icon className="text-5xl" />}
            </div>
            <div className="flex justify-center text-white">
                {text} C°
            </div>
            
        </div>
    )
}

export default Tinybox