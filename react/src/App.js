import { render } from "@testing-library/react";
import react, { useEffect, useState } from "react";

const apiKey = "633be71e9ba941b4aba43319241004";
function App() {
  const [city, setCity] = useState("");
  const [cityArr, setCityarr] = useState([]);

  const handleButtonClick = async () => {
    const res = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
    );
    const response = await res.json();
    if (!response) {
      alert("invalid city name");
      return;
    }
    if (!response.current) {
      alert("invalid city name");
      return;
    }
    const temp = response.current.temp_c;

    if (!temp) {
      alert("invalid city name");
    } else {
      setCityarr((prevState) => ({
        [city]: temp,
        ...prevState,
      }));
      localStorage.setItem(city, temp);
    }
  };

  const handleDelete = (city) => {
    console.log(city);
    localStorage.removeItem(city);
    const currentState = { ...cityArr };
    delete currentState[city];
    setCityarr(currentState);
  };

  const handleUpdate = async (city) => {
    const res = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
    );
    const response = await res.json();
    const temp = response.current.temp_c;
    localStorage.setItem(city, temp);
    setCityarr((prevState) => ({
      ...prevState,
      [city]: temp
    }))
    console.log(city, temp);
  };

  useEffect(() => {
    const keys = Object.keys(localStorage);
    const localStorageObject = {};
    keys.forEach((key) => {
      const value = localStorage.getItem(key);
      localStorageObject[key] = value;
    });
    setCityarr(localStorageObject);
  }, []);

  return (
    <>
      <div className="header"> Enter City Name </div>
      <br />
      <div className="formCont">
        <div className="formContainer">
          <input
            id="cityInput"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button id="submitButton" onClick={handleButtonClick}>
            Click me
          </button>
        </div>
      </div>
      <div className="listContainer">
        <ul id="cityList">
          {Object.entries(cityArr).map(([city, value], index) => (
            <li key={index}>
              {city} : {value}
              <div>
                <button
                  className="delete"
                  key={index + 1}
                  onClick={() => handleDelete(city)}
                >
                  Delete
                </button>
                <button
                  className="update"
                  key={index + 2}
                  onClick={() => handleUpdate(city)}
                >
                  Update
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
