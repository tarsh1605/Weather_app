// import React, { useState } from "react";
// import axios from "axios";

// const App = () => {
//   const [city, setCity] = useState("");
//   const [weather, setWeather] = useState(null);
//   const [error, setError] = useState("");

//   const fetchWeather = async () => {
//     setError("");
//     setWeather(null);

//     try {
//       const response = await axios.get("http://localhost:5000/api/weather", {
//         params: { city },
//       });
//       setWeather(response.data);
//     } catch (err) {
//       setError(err.response?.data?.error || "An error occurred.");
//     }
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h1>Weather App</h1>
//       <input
//         type="text"
//         placeholder="Enter city"
//         value={city}
//         onChange={(e) => setCity(e.target.value)}
//         style={{ padding: "10px", marginRight: "10px" }}
//       />
//       <button onClick={fetchWeather} style={{ padding: "10px" }}>
//         Get Weather
//       </button>

//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {weather && (
//         <div>
//           <h2>Weather in {city}</h2>
//           <p>Temperature: {weather.temperature}°C</p>
//           <p>Condition: {weather.condition}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;
import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    setError("");
    setWeather(null);

    try {
      const response = await axios.get("http://localhost:5000/api/weather", {
        params: { city },
      });
      setWeather(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md transform transition-all hover:scale-105 duration-300">
        <h1 className="text-4xl font-bold text-blue-600 mb-6 text-center">
          Weather App
        </h1>

        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-grow p-3 border-2 border-blue-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <button
            onClick={fetchWeather}
            className="bg-blue-600 text-white px-6 rounded-r-lg hover:bg-blue-700 transition-colors active:scale-95"
          >
            Search
          </button>
        </div>

        {error && (
          <p className="text-red-500 bg-red-100 p-3 rounded-lg text-center mb-4">
            {error}
          </p>
        )}

        {weather && (
          <div className="bg-blue-50 rounded-lg p-6 shadow-inner text-center">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4 capitalize">
              {city}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <p className="text-gray-600">Temperature</p>
                <p className="text-3xl font-bold text-blue-600">
                  {weather.temperature}°C
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <p className="text-gray-600">Condition</p>
                <p className="text-xl font-semibold text-blue-500 capitalize">
                  {weather.condition}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
