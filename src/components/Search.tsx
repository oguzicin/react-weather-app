import React from "react";
import { IconType } from "react-icons";
import { LiaSearchLocationSolid } from "react-icons/lia";


type Props = {
    icon?: IconType;
    header?: string;
    subheader?: string;
    text1?:string;
    text2?:string;
};

const Search = ({ icon, header, }: Props) => {
    return(
        <div className="bg-white/20 rounded-lg backdrop-blur-sm max-w-[1000px] w-[full] h-[2.5rem] grid justify-evenly">
            <div className="flex flex-row justify-center text-xl text-teal-200 w-full">
                {header}
            </div>
            <div className="grid grid-flow-col justify-center text-[25px] text-teal-200">
            
            <LiaSearchLocationSolid />

            </div>
        </div>
    )
}

export default Search;