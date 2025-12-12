import React, { ChangeEvent, useState } from "react";
import { IconType } from "react-icons";
import { FaSearch } from "react-icons/fa";

type SelectedType = {
  name: string;
  country: string;
  lat: number;
  lon: number;
};

type Props = {
  icon?: IconType;
  subheader?: string;
  text1?: string;
  text2?: string;
  onSelectLocation: (opt: SelectedType) => void;
};

const SearchNew = ({ icon, onSelectLocation }: Props) => {
  const [term, setTerm] = useState("");
  const [options, setOptions] = useState<SelectedType[]>([]);

  const getSearchOptions = (value: string) => {
    const apiKey = process.env.REACT_APP_API_KEY;
    if (!apiKey) {
      console.warn("REACT_APP_API_KEY tanımlı değil!");
      return;
    }

    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
        value.trim()
      )}&limit=5&appid=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        setOptions(
          data.map((item: any) => ({
            name: item.name,
            country: item.country,
            lat: item.lat,
            lon: item.lon,
          }))
        );
      })
      .catch((err) => console.error("Error fetching geo data:", err));
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTerm(value);

    const trimmed = value.trim();
    if (trimmed === "") {
      setOptions([]);
      return;
    }

    getSearchOptions(trimmed);
  };

  const handleOptionClick = (opt: SelectedType) => {
    setTerm(`${opt.name}, ${opt.country}`);
    setOptions([]);
    onSelectLocation(opt);
  };

  return (
    <div className="bg-white/20 rounded-lg backdrop-blur-sm w-full h-[2.5rem] flex flex-col justify-evenly custom-xs:w-full custom-xs:items-center z-10">
      <div className="relative flex flex-row justify-between text-[25px] text-white items-center gap-3 custom-xs:text-base ps-2">
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

        {options.length > 0 && (
          <ul className="absolute bg-white/10 backdrop-blur-3xl top-10 p-1 gap-2 flex flex-col left-0 w-full rounded-md shadow-md">
            {options.map((option, index) => (
              <li
                key={index}
                className="px-4 py-2 bg-white/20 hover:bg-white/40 rounded-md cursor-pointer text-black"
                onClick={() => handleOptionClick(option)}
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
