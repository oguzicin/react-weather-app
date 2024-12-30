import React, { ChangeEvent, useState } from "react";
import Navigation from "./components/Navigation";
import SmallBox from "./components/SmallBox";
import MediumBox from "./components/MediumBox";
import LargeBox from "./components/LargeBox";
import { LuCloudRainWind } from "react-icons/lu";
import Mainbox from "./components/Mainbox";
import Search from "./components/Search";
import Tinybox from "./components/Tinybox";
import { useEffect } from "react";
import { TiWeatherStormy } from "react-icons/ti";
import { TiWeatherWindyCloudy } from "react-icons/ti";
import { GiNoseSide } from "react-icons/gi";
import { BsFillDropletFill } from "react-icons/bs";
import { ImEye } from "react-icons/im";
import { FaWater } from "react-icons/fa";



function App() {

  const [term, setTerm] = useState('');

  const onInputChange = (e:ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value)
  }
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

  useEffect(() => {
    const section = document.getElementById("target-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" }); // Scrolls to the section
    }
  }, []);

  return (
    <div className="bg-slate-400 h-[full] w-[full] flex flex-row justify-center">
      <div className=" h-[full] w-[full] flex flex-col">
        <section className="">
          <div className="grid justify-center gap-10 mt-2 mb-2 w-full">
            <Search></Search>
          </div>
        </section>
        <section
          id="target-section"
          className=" pb-2 pt-4"
        >
          <div className="grid justify-center gap-10 ">
            <Mainbox header="Istanbul"></Mainbox>
          </div>
        </section>
        <section className=" pb-2 pt-2">
          <div className="grid grid-flow-col justify-evenly">
            <Tinybox
              header={"Mon"}
              Icon={TiWeatherStormy}
              text="25"
            ></Tinybox>
            <Tinybox
              header={"Thu"}
              Icon={TiWeatherStormy}
              text="25"
            ></Tinybox>
            <Tinybox
              header={"Wen"}
              Icon={TiWeatherStormy}
              text="25"
            ></Tinybox>
            <Tinybox
              header={"Thr"}
              Icon={TiWeatherStormy}
              text="25"
            ></Tinybox>
          </div>
        </section>
        <section className="pb-10 pt-10">
          <div className="grid justify-center gap-10">
            <MediumBox Icon={GiNoseSide} header="Air Pollution:" text1="Good" text2="15"></MediumBox>
            <MediumBox Icon={BsFillDropletFill} header="Precipitation" text1="Good"></MediumBox>
            <div className="grid grid-flow-col justify-between">
            <SmallBox header={"Map"}></SmallBox>
            <SmallBox header={"Map"}></SmallBox>
            </div>
            <MediumBox Icon={ImEye} header="Visibility" text1="Good"></MediumBox>
            <MediumBox Icon={FaWater} header="Humidity" text1="Good"></MediumBox>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;