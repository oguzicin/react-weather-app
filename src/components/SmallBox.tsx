import React from "react";
import { IconType } from "react-icons";


type Props = {
    icon?: IconType;
    header: string;
};

const SmallBox = ({ icon, header }: Props) => {
    return(
        <div className="bg-white/20 rounded-lg backdrop-blur-sm w-48 h-48 flex flex-col justify-evenly items-center custom-xs:w-[43vw]">
            <div className="h-fit w-full text-center rounded-md">
                {header}
            </div>
            <div className="h-full w-full flex flex-row justify-evenly rounded-sm p-1">
                <div className="border-2 w-full h-full  rounded-md">
                  
                </div>
            </div>
        </div>
    )
}

export default SmallBox