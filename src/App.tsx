import React, { useEffect, useState } from "react";
import SmallBox from "./components/SmallBox";
import MediumBox from "./components/MediumBox";
import Mainbox from "./components/Mainbox";
import Tinybox from "./components/Tinybox";
import SettingsNew from "./components/SettingsNew";
import MyLocationsNew from "./components/MyLocationsNew";
import SearchNew from "./components/SearchNew";

import { FiWind } from "react-icons/fi";
import { BsFillDropletFill } from "react-icons/bs";
import { ImEye } from "react-icons/im";
import { FaWater } from "react-icons/fa";
import { GiNoseSide } from "react-icons/gi";
import {
  TiWeatherStormy,
  TiWeatherSunny,
  TiWeatherPartlySunny,
  TiWeatherShower,
  TiWeatherSnow,
} from "react-icons/ti";

type SelectedType = {
  name: string;
  country: string;
  lat: number;
  lon: number;
};

type WeatherResponse = {
  main: {
    temp: number;
    humidity: number;
    pressure: number;
    sea_level?: number;
    grnd_level?: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  visibility: number;
  coord: {
    lat: number;
    lon: number;
  };
  name: string;
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  // ❄ Kar yağışı da burada gelecek (1h veya 3h)
  snow?: {
    [key: string]: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
    country: string;
  };

    dt: number;
  timezone: number;
};

type AirPollutionResponse = {
  list: {
    main: {
      aqi: number;
    };
    components: {
      co: number;
      no: number;
      no2: number;
      o3: number;
      so2: number;
      pm2_5: number;
      pm10: number;
      nh3: number;
    };
  }[];
};

type ForecastItem = {
  dt: number;
  dt_txt: string;
  pop: number; // 0-1
  rain?: {
    "3h": number;
  };
  // ❄ Forecast için kar alanı
  snow?: {
    "3h": number;
  };
  clouds: {
    all: number;
  };
  main: {
    temp: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
};

type ForecastResponse = {
  list: ForecastItem[];
};

function App() {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [air, setAir] = useState<AirPollutionResponse | null>(null);
  const [forecast, setForecast] = useState<ForecastResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<SelectedType | null>(
    null
  );

  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      if (!API_KEY) {
        console.warn("REACT_APP_API_KEY tanımlı değil!");
        setLoading(false);
        return;
      }

      try {
        let weatherUrl: string;

        if (selectedLocation) {
          weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${selectedLocation.lat}&lon=${selectedLocation.lon}&appid=${API_KEY}&units=metric`;
        } else {
          weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=Istanbul&appid=${API_KEY}&units=metric`;
        }

        // Current weather
        const weatherRes = await fetch(weatherUrl);
        const weatherJson: WeatherResponse = await weatherRes.json();
        setWeather(weatherJson);

        const { lat, lon } = weatherJson.coord;

        // Air pollution FORECAST
        const airRes = await fetch(
          `https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );
        const airJson: AirPollutionResponse = await airRes.json();
        setAir(airJson);

        // 3-hour weather forecast
        const forecastRes = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        const forecastJson: ForecastResponse = await forecastRes.json();
        setForecast(forecastJson);

        console.log("FORECAST JSON ->", forecastJson);
      } catch (err) {
        console.error("Weather fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [API_KEY, selectedLocation]);

  // Helper fonksiyonlar
  const getWindLabel = (speed: number | undefined) => {
    if (speed === undefined) return "-";
    if (speed < 3) return "Calm";
    if (speed < 8) return "Light";
    if (speed < 14) return "Breezy";
    return "Windy";
  };

  const getVisibilityLabel = (vis: number | undefined) => {
    if (vis === undefined) return "-";
    const km = vis / 1000;
    if (km > 8) return "Excellent";
    if (km > 5) return "Good";
    if (km > 2) return "Moderate";
    return "Poor";
  };

  const getHumidityLabel = (h: number | undefined) => {
    if (h === undefined) return "-";
    if (h < 30) return "Dry";
    if (h <= 60) return "Comfortable";
    return "Humid";
  };

  const getAqiLabel = (aqi: number | undefined) => {
    switch (aqi) {
      case 1:
        return "Good";
      case 2:
        return "Fair";
      case 3:
        return "Moderate";
      case 4:
        return "Poor";
      case 5:
        return "Very Poor";
      default:
        return "-";
    }
  };

  // Artık rain yerine "precipitation" (rain + snow) üzerinden etiketliyoruz
  const getPrecipLabel = (
    pop: number | undefined,
    precip3h: number | undefined
  ) => {
    if (pop === undefined && !precip3h) return "No data";
    const prob = (pop ?? 0) * 100;

    if (prob < 20 && (precip3h ?? 0) === 0) return "Not expected";
    if (prob < 40) return "Low chance";
    if (prob < 70) return "Possible";
    return "Likely";
  };

  // 🔥 Tek icon fonksiyonu: Tinybox + Mainbox aynı fonksiyonu kullanıyor
  const getWeatherIcon = (item?: ForecastItem) => {
    const main = item?.weather?.[0]?.main || "";
    const desc = (item?.weather?.[0]?.description || "").toLowerCase();

    if (main === "Clear") return TiWeatherSunny;
    if (main === "Snow") return TiWeatherSnow;
    if (main === "Rain") return TiWeatherShower;
    if (main === "Drizzle") return TiWeatherShower;
    if (main === "Thunderstorm") return TiWeatherStormy;

    if (main === "Clouds") {
      if (desc.includes("few") || desc.includes("scattered")) {
        return TiWeatherPartlySunny;
      }
      return TiWeatherStormy;
    }

    // Mist, Fog, Haze vs.
    return TiWeatherStormy;
  };

  const mainIconCode = weather?.weather?.[0]?.icon;

  // Haftanın günü (Mon, Tue...) – Tinybox header için
  const getWeekdayShort = (dt: number) => {
    const date = new Date(dt * 1000);
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  // Ham değerler (current weather)
  const windSpeed = weather?.wind.speed;
  const windDeg = weather?.wind.deg;
  const windGust = weather?.wind.gust;

  const visibilityKm = weather ? weather.visibility / 1000 : undefined;
  const humidity = weather?.main.humidity;

  const pressure = weather?.main.pressure;
  const seaLevel = weather?.main.sea_level;
  const grndLevel = weather?.main.grnd_level;

  const aqi = air?.list?.[0]?.main.aqi;
  const comp = air?.list?.[0]?.components;

  const airDetails = comp
    ? `CO: ${comp.co.toFixed(1)} • NO: ${comp.no.toFixed(
        3
      )} • NO₂: ${comp.no2.toFixed(3)} • O₃: ${comp.o3.toFixed(
        1
      )} • SO₂: ${comp.so2.toFixed(3)} • PM2.5: ${comp.pm2_5} µg/m³ • PM10: ${
        comp.pm10
      } µg/m³ • NH₃: ${comp.nh3.toFixed(3)}`
    : "No component data available";

  const humidityDetails = weather
    ? `Pressure: ${pressure} hPa • Humidity: ${humidity}% • Sea Level: ${
        seaLevel ?? "—"
      } hPa • Ground Level: ${grndLevel ?? "—"} hPa`
    : "No humidity data";

  const windDetails =
    windSpeed !== undefined
      ? `Speed: ${windSpeed.toFixed(1)} m/s • Direction: ${windDeg}° • Gust: ${
          windGust !== undefined ? `${windGust.toFixed(1)} m/s` : "—"
        }`
      : "No wind data";

  // Forecast’ten ilk 3 saatlik veri (precipitation MediumBox için)
  const next3h = forecast?.list?.[0];
  const rain3h = next3h?.rain?.["3h"] ?? 0;
  const snow3h = next3h?.snow?.["3h"] ?? 0; // ❄ kar
  const precip3h = rain3h + snow3h; // toplam yağış (mm)

  const pop = next3h?.pop ?? 0;
  const cloudsNext = next3h?.clouds?.all;
  const popPercent = Math.round(pop * 100);

  const precipDetails = next3h
    ? `Chance: ${popPercent}% • Precip (3h): ${precip3h.toFixed(
        1
      )} mm • Rain: ${rain3h.toFixed(1)} mm • Snow: ${snow3h.toFixed(
        1
      )} mm • Clouds: ${cloudsNext ?? "-"}%`
    : "No forecast data";

  // Tinybox için günlük forecast (her 8 index bir gün) – YARINDAN itibaren
  const tinyForecasts = forecast?.list
    ? [
        forecast.list[8],
        forecast.list[16],
        forecast.list[24],
        forecast.list[32],
      ]
    : [];

  // 🌞 Mainbox için current weather'i ForecastItem formatına çevir
  const currentWeatherItem: ForecastItem | undefined = weather
    ? {
        dt: 0,
        dt_txt: "",
        pop: 0,
        rain: undefined,
        snow: undefined,
        clouds: { all: 0 },
        main: { temp: weather.main.temp },
        weather: weather.weather,
      }
    : undefined;

  const MainIcon = getWeatherIcon(currentWeatherItem);

  // İlk açılışta scroll
  useEffect(() => {
    const section = document.getElementById("target-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className="bg-[#000000] h-[full] w-[full] flex flex-row justify-center">
      <div className="h-[full] w-[full] flex flex-col pt-10">
        {/* Üst bar bg-[#A294F9]*/}
        <section>
          <div className="flex flex-row justify-between mt-2 mb-4 w-full gap-2">
            <div className="w-fit flex justify-center">
              <MyLocationsNew />
            </div>
            <div className="w-full flex justify-center">
              <SearchNew onSelectLocation={setSelectedLocation} />
            </div>
            <div className="w-fit flex justify-center">
              <SettingsNew />
            </div>
          </div>
        </section>

        {/* Mainbox */}
        <section className="pb-2 pt-0" id="target-section">
          <div className="grid justify-center gap-10">
            <Mainbox
              iconCode={mainIconCode}
              header={selectedLocation?.name || weather?.name || "Istanbul"}
              text2={weather ? Math.round(weather.main.temp).toString() : "—"}
              text3="Hello"
            />
          </div>
        </section>

        {/* Tinybox row – forecast'tan: gün + icon + derece */}
        <section className="pb-2 pt-2">
          <div className="grid grid-flow-col justify-evenly">
            {tinyForecasts.length > 0 ? (
              tinyForecasts.map((item) => {
                const IconComp = getWeatherIcon(item);
                return (
                  <Tinybox
                    key={item.dt}
                    header={getWeekdayShort(item.dt)} // Mon, Tue...
                    Icon={IconComp}
                    text={Math.round(item.main.temp).toString()}
                  />
                );
              })
            ) : (
              <>
                <Tinybox header={"Mon"} Icon={TiWeatherStormy} text="-" />
                <Tinybox header={"Tue"} Icon={TiWeatherStormy} text="-" />
                <Tinybox header={"Wed"} Icon={TiWeatherStormy} text="-" />
                <Tinybox header={"Thu"} Icon={TiWeatherStormy} text="-" />
              </>
            )}
          </div>
        </section>

        {/* MediumBox'lar */}
        <section className="pb-10 pt-10">
          <div className="grid justify-center gap-10">
            {/* WIND */}
            <MediumBox
              Icon={FiWind}
              header="Wind"
              text1={getWindLabel(windSpeed)}
              text2={
                windSpeed !== undefined
                  ? `${windSpeed.toFixed(1)} m/s`
                  : loading
                  ? "Loading..."
                  : "-"
              }
              text3={windDetails}
            />

            {/* PRECIPITATION: rain + snow (3h forecast) */}
            <MediumBox
              Icon={BsFillDropletFill}
              header="Precipitation"
              text1={getPrecipLabel(pop, precip3h)}
              text2={
                next3h
                  ? `${precip3h.toFixed(1)} mm`
                  : loading
                  ? "Loading..."
                  : "-"
              }
              text3={precipDetails}
            />

            {/* Map kutuları (sonra doldururuz) */}
            <div className="grid grid-flow-col justify-between">
              <SmallBox
                header="Sun"
                sunrise={weather?.sys.sunrise}
                sunset={weather?.sys.sunset}
                timezone={weather?.timezone} // OpenWeather timezone (seconds)
                now={weather?.dt} // server time (seconds)
              />
            </div>

            {/* VISIBILITY */}
            <MediumBox
              Icon={ImEye}
              header="Visibility"
              text1={getVisibilityLabel(weather?.visibility)}
              text2={
                visibilityKm !== undefined
                  ? `${visibilityKm.toFixed(1)} km`
                  : loading
                  ? "Loading..."
                  : "-"
              }
              text3="Visual range on the ground"
            />

            {/* HUMIDITY */}
            <MediumBox
              Icon={FaWater}
              header="Humidity"
              text1={getHumidityLabel(humidity)}
              text2={
                humidity !== undefined
                  ? `${humidity}%`
                  : loading
                  ? "Loading..."
                  : "-"
              }
              text3={humidityDetails}
            />

            {/* AIR POLLUTION */}
            <MediumBox
              Icon={GiNoseSide}
              header="Air Pollution"
              text1={getAqiLabel(aqi)}
              text2={aqi ? `AQI: ${aqi}` : loading ? "Loading..." : "-"}
              text3={airDetails}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
