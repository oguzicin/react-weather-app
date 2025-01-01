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
    <div className="bg-white/20 rounded-lg backdrop-blur-sm  w-full h-[2.5rem] grid justify-evenly custom-xs:max-w-[100px]">
      <div className="flex flex-row justify-center text-xl text-teal-200 w-full">
        {header}
      </div>
      <div className="flex flex-row justify-between text-[25px] text-white items-center gap-3">
        <div className="text-white"><FaSearch /></div>
        <input placeholder="Type to Search" value={input} onChange={(e) => setInput(e.target.value)} className="flex w-[250px] bg-transparent border-none h-full focus:outline-none"></input>
      </div>
    </div>
  );
};

export default Search;
