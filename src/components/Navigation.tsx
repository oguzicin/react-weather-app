import React from "react";
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <div className="rounded-md h-12 w-[28rem] ps-10 pe-10">
      <div className="bg-blue-300 rounded-xl text-white">
        <ul className="flex flex-row h-12 items-center justify-evenly">
          <li className="w-full h-full rounded-xl flex flex-row justify-center items-center">
            <button className="w-full h-full">home</button>
          </li>
          <li className="w-full h-full rounded-xl flex flex-row justify-center items-center">
            <button className="w-full h-full">home</button>
          </li>
          <li className="w-full h-full rounded-xl flex flex-row justify-center items-center">
            <button className="w-full h-full">home</button>
          </li>
          <li className="w-full h-full rounded-xl flex flex-row justify-center items-center">
            <button className="w-full h-full">home</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
