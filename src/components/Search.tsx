import React,{useState} from "react";
import { IconType } from "react-icons";
import { FaSearch } from "react-icons/fa";

type Props = {
  icon?: IconType;
  header?: string;
  subheader?: string;
  text1?: string;
  text2?: string;
};

const Search = ({ icon, header }: Props) => {

    const[input, setInput] = useState("")



  return (
    <div className="bg-white/20 rounded-lg backdrop-blur-sm  w-full h-[2.5rem] flex flex-col justify-evenly custom-xs:w-full custom-xs:items-center ">
      <div className="flex flex-row justify-center text-xl text-teal-200 w-full">
        {header}
      </div>
      <div className="flex flex-row justify-between text-[25px] text-white items-center align-middle text-center gap-3 custom-xs:text-base custom-xs:flex-row ">
        <div className="text-white h-fit"><FaSearch /></div>
        <input placeholder="Type to Search" value={input} onChange={(e) => setInput(e.target.value)} className="flex w-[250px] bg-transparent h-full focus:outline-none custom-xs:w-full"></input>
      </div>
    </div>
  );
};

export default Search;
