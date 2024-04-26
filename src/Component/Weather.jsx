import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  IoMdSubway,
  IoMdRainy,
  IoMdCloudy,
  IoMdThunderstorm,
  IoMdSearch,
  IoMdSunny,
  IoMdSnow,
} from "react-icons/io";
import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
} from "react-icons/bs";
import { TbTemperatureCelsius } from "react-icons/tb";
import { ImSpinner8 } from "react-icons/im";

const API_KEY = "56ac494ecfee3a81d076c93650cefa24";
const Weather = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("Delhi");
  const [error, setError] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    e.preventDefault();
    if (inputValue) {
      setLocation(inputValue);
      setInputValue(""); 
    } else {
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
      }, 500);
    }
  };

  useEffect(() => {
    if (!location) return; // Prevent fetching if no location is set
    setLoading(true);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;

    axios.get(url).then((response) => {
      setData(response.data);
      setError(null); // Clear previous errors on successful fetch
    }).catch((err) => {
      setLoading(false)
      setError("Not found");
      console.error(err);
    }).finally(() => {
      setLoading(false);
    });
  }, [location]);



  if (!data) {
    return  <div className="flex justify-center items-center bg-gradient-bg h-screen">
    <ImSpinner8 className="text-white text-5xl  animate-spin" />
  </div>;
  }


  let icon;
  // console.log(data.weather[0].main);

  switch (data.weather[0].main) {
    case "Clouds":
      icon = <IoMdCloudy className="text-[#31cafb]" />;
      break;
    case "Haze":
      icon = <BsCloudHaze2Fill className="" />;
      break;
    case "Rain":
      icon = <IoMdRainy className="text-blue-500" />;
      break;
    case "Clear":
      icon = <IoMdSunny />;
      break;
    case "Drizzle":
      icon = <BsCloudDrizzleFill />;
      break;
    case "Snow":
      icon = <IoMdSnow />;
      break;
    case "Thundestorm":
      icon = <IoMdThunderstorm />;
      break;
  }

  const date = new Date();

  return (
    <div className="w-full h-screen bg-gradient-bg flex flex-col items-center justify-center px-4 lg:px-0">
      {error && (
        <div className="w-full bg-black/30 p-2 max-w-[450px] text-center text-white text-xl m-3 rounded-lg">{error}</div>
      )}

      <form
        className={`${
          animate ? "animate-shake" : "animate-none"
        } h-16 bg-black/30 w-full max-w-[450px] rounded-lg backdrop-blur-[32px] mb-5`}
      >
        <div className="h-full relative flex items-center justify-between p-7">
          <input
            onChange={(e) => handleInput(e)}
            type="text"
            placeholder="Search by City"
            className="flex-1 bg-transparent outline-none placeholder:text-white text-white text-xl font-light pl-6 "
          />
          <button
            onClick={(e) => handleSubmit(e)}
            className="text-white text-2xl  bg-[#1ab8ed] hover:bg-[#15abdd] w-20 h-12 rounded-full flex justify-center items-center transition"
          >
            <IoMdSearch />
          </button>
        </div>
      </form>
      <div className="w-full max-w-[450px] bg-black/20 min-h-[284px] text-white backdrop-blur-[32px] rounded-lg py-10 px-4">
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <ImSpinner8 className="text-white text-5xl animate-spin" />
          </div>
        ) : (
          <div>
            {/* CARD 1 */}

            <div className="flex items-center justify-around  gap-x-5">
              <div className="flex items-center text-[87px]">
                {icon}
                <span className="text-xl ml-2">{data.weather[0].main}</span>
              </div>
              <div>
                <div className="text-2xl font-semibold">
                  {data.name}, {data.sys.country}
                </div>
                <div>
                  {date.getUTCDate()}/{date.getUTCMonth() + 1}/
                  {date.getUTCFullYear()}
                </div>
              </div>
            </div>
            {/* CARD 2 */}
            <div className="my-10">
              <div className="flex justify-center items-center">
                <div className="text-[144px] leading-none font-light">
                  {parseInt(data.main.temp)}
                </div>
                <div className="text-4xl">
                  <TbTemperatureCelsius />
                </div>
              </div>
              <div className="capitalize text-center">
                {data.weather[0].description}
              </div>
            </div>
            {/* CARD 3 */}
            <div className="max-w-[378px] mx-auto flex flex-col gap-y-6">
              <div className="flex justify-between">
                <div className="flex items-center gap-x-2">
                  <div className="text-[20px]">
                    <BsEye />
                  </div>
                  <div>
                    Visibility{" "}
                    <span className="ml-2">{data.visibility / 1000} km</span>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  <div className="text-[20px]">
                    <BsThermometer />
                  </div>
                  <div className="flex">
                    Feels like{" "}
                    <div className="flex ml-2">
                      {parseInt(data.main.feels_like)}
                    </div>
                    <TbTemperatureCelsius />
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-x-2">
                  <div className="text-[20px]">
                    <BsWater />
                  </div>
                  <div>
                    Humidity{" "}
                    <span className="ml-2">{data.main.humidity} %</span>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  <div className="text-[20px]">
                    <BsWind />
                  </div>
                  <div>
                    Wind <span className="ml-2">{data.wind.speed} m/s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
