import React, { ChangeEvent, useState } from "react";
import { IconType } from "react-icons";
import { FaSearch } from "react-icons/fa";
import { selectedType } from "..";

type Props = {
  icon?: IconType;
  subheader?: string;
  text1?: string;
  text2?: string;
};

const SearchNew = ({ icon }: Props) => {
  const [term, setTerm] = useState("");
  const [options, setOptions] = useState<{ name: string; country: string }[]>(
    []
  );

  const getSearchOptions = (value: string) => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${
        process.env.REACT_APP_API_KEY
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        
        setOptions(
          data.map((item: any) => ({
            name: item.name,
            country: item.country,
          }))
        );
      })
      .catch((err) => console.error("Error fetching data:", err));
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setTerm(value);


    if (value === "") {
      setOptions([]);
      return;
    }

    getSearchOptions(value);
  };

  const handleOptionClick = (selectedName: string) => {
    setTerm(selectedName); 
    setOptions([]); 
    console.log(selectedName)

  };

  const handleOptionSelect = (selectedOpt: selectedType) => {
    setTerm(selectedOpt.name); 
    setOptions([]); 
    console.log(selectedOpt)

    fetch(
      `
        https://api.openweathermap.org/data/2.5/weather?lat=${selectedOpt.lat}&lon=${selectedOpt.lon}&appid=${process.env.REACT_APP_API_KEY}`
    )

    .then((res) => res.json())
    .then((data) => {console.log({data})})
  };

  return (
    <div className="bg-white/20 rounded-lg backdrop-blur-sm w-full h-[2.5rem] flex flex-col justify-evenly custom-xs:w-full custom-xs:items-center z-10">
      <div className="relative flex flex-row justify-between text-[25px] text-white items-center align-middle text-center gap-3 custom-xs:text-base custom-xs:flex-row ps-2">
        <div className="text-white h-fit">
          <FaSearch />
        </div>
        <input
          placeholder="Type to Search"
          type="text"
          value={term}
          onChange={onInputChange}
          className="flex w-[250px] bg-transparent h-full focus:outline-none custom-xs:w-full"
        />
        {/* Display Search Options */}
        {options.length > 0 && (
          <ul className="absolute bg-zinc-400 top-10 p-1 gap-1 flex flex-col left-0 w-full rounded-md shadow-md">
            {options.map((option, index) => (
              <li
                key={index}
                className="px-4 py-2  hover:bg-zinc-100 rounded-md cursor-pointer text-black"
                onClick={() => handleOptionClick(option.name)}
              >
                {option.name}, {option.country}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchNew;
