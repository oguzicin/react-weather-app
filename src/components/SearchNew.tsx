import React, { ChangeEvent, useState } from "react";
import { IconType } from "react-icons";
import { FaSearch } from "react-icons/fa";

type Props = {
  icon?: IconType;
  subheader?: string;
  text1?: string;
  text2?: string;
};

const Search = ({ icon }: Props) => {
  const [term, setTerm] = useState("");
  const [options, setOptions] = useState<[]>([]);
  const [input, setInput] = useState("");

  const getSearchOptions = (value: string) => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${
        process.env.REACT_APP_API_KEY
      }`
    )
      .then((res) => res.json())
      .then((data) => console.log({ data }));
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setTerm(value);

    if (value === "") return;

    getSearchOptions(value);
  };

  const handleOptionClick = (selectedName: string) => {
    setTerm(selectedName);
    setOptions([]); 
  };
  
  return (
    <div className="bg-white/20 rounded-lg backdrop-blur-sm  w-full h-[2.5rem] flex flex-col justify-evenly custom-xs:w-full custom-xs:items-center ">

      <div className="relative flex flex-row justify-between text-[25px] text-white items-center align-middle text-center gap-3 custom-xs:text-base custom-xs:flex-row ps-2">
        <div className="text-white h-fit ">
          <FaSearch />
        </div>
        <input
          placeholder="Type to Search"
          type="text"
          value={term}
          onChange={onInputChange}
          className="flex w-[250px] bg-transparent h-full focus:outline-none custom-xs:w-full"
        ></input>

        {options.length > 0 && (
          <ul className="absolute top-full left-0 bg-white w-full rounded-b-md shadow-md z-10">
            {options.map((option: { name: string }, index: number) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-black"
                onClick={() => handleOptionClick(option.name)}
              >
                {option.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;
