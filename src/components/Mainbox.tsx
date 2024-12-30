import React from "react";
import { IconType } from "react-icons";
import { TiWeatherPartlySunny } from "react-icons/ti";


type Props = {
    icon?: IconType;
    header?: string;
    subheader?: string;
    text1?:string;
    text2?:string;
};

const Mainbox = ({ icon, header, }: Props) => {
    return(
        <div className="bg-white/20 rounded-lg backdrop-blur-sm max-w-[1000px] w-[420px] h-[36rem] grid justify-evenly custom-xs:w-[90vw] custom-xs:h-[30rem]">
            <div className="flex flex-row justify-center text-7xl h-18 text-white">
                {header}
            </div>
            <div className="grid grid-flow-col justify-center text-[300px] text-white">
            
            <TiWeatherPartlySunny />

            </div>
        </div>
    )
}

export default Mainbox;