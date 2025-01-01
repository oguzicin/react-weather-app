import React,{ChangeEvent, useState} from "react";
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
    const [term, setTerm] = useState("");
    const [options, setOptions] = useState<[]>([])
    const[input, setInput] = useState("")
    
    const getSearchOptions = (value: string) => {
      fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${process.env.REACT_APP_API_KEY}`
      )
      .then((res) => res.json())
      .then((data) => console.log({data}))
  
    }
  
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.trim()
      setTerm(value);
  
      if (value === '') return
  
      getSearchOptions(value)
    };
    // http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

  



  return (
    <div className="bg-white/20 rounded-lg backdrop-blur-sm  w-full h-[2.5rem] flex flex-col justify-evenly custom-xs:w-full custom-xs:items-center ">
      <div className="flex flex-row justify-center text-xl text-teal-200 w-full">
        {header}
      </div>
      <div className="flex flex-row justify-between text-[25px] text-white items-center align-middle text-center gap-3 custom-xs:text-base custom-xs:flex-row ">
        <div className="text-white h-fit"><FaSearch /></div>
        <input placeholder="Type to Search" type="text" value={term} onChange={onInputChange} className="flex w-[250px] bg-transparent h-full focus:outline-none custom-xs:w-full"></input>
        {options.map((option: {name: string}) => <p>{option.name}</p>)}
      </div>
    </div>
  );
};

export default Search;
