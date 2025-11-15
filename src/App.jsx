import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import AirIcon from "@mui/icons-material/Air";
import WaterIcon from "@mui/icons-material/Water";
import Divider from "@mui/material/Divider";
import CompressIcon from "@mui/icons-material/Compress";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import BasicCard from "./components/CardsCmp";
import SimpleSnackbar from "./components/Snakebar";

import CountrySelect from "./AutoCountry";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

let ischanged = false;
function App() {
  const [date, setdate] = useState("");
  const [timeZ, settimeZ] = useState("");
  const [latlong, setlatlong] = useState({ lat: "", lon: "", name: "" });
  const [cityinput, setcityinput] = useState("");
  const [country, setCountry] = useState("");
  const [message, setmessage] = useState("");
  const [open, setOpen] = useState(false);
  const [dots, setdots] = useState("");
  const [searchpage, setsearchpage] = useState(false);

  useEffect(() => {
    const intervel = setInterval(() => {
      setdots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);
    return () => clearInterval(intervel);
  }, []);

  // api 1 for long and lat
  function handleClickBtn() {
    if (cityinput && country) {
      axios
        .get(
          `https://api.api-ninjas.com/v1/geocoding?city=${cityinput.trim()}&country=${country}`,
          {
            headers: {
              "X-Api-Key": "G3AJKN5ZPG/2DxxlnfO1FQ==CZfI2ptJwGgc42sP",
            },
          }
        )
        .then((res) => {
          if (res.data.length > 0) {
            setlatlong({
              lat: res?.data?.[0]?.latitude,
              lon: res?.data?.[0]?.longitude,
              name: res?.data?.[0]?.name,
            });
            setOpen(false);
          } else {
            setOpen(true);
            setmessage("City not found");
            setTimeout(() => {
              setOpen(false);
            }, 2500);
          }
          setsearchpage(true);
        })
        .catch((error) => {
          console.log("error is: " + error);
        });
      setcityinput("");
      setCountry("");
      setOpen(true);
      setmessage("searching" + dots);
      setTimeout(() => {
        setOpen(false);
      }, 2500);
    } else {
      setmessage("should fill both of Country, City");
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 2500);
    }
  }
  // ===api 1===

  // api 2 to get current weather
  useEffect(() => {
    if (latlong.lat && latlong.lon) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latlong.lat}&lon=${latlong.lon}&appid=ebc43e710fc7dda0b586a2c819fa4d05&units=metric`
        )
        .then((res) => {
          setdate(res);
        })
        .catch((error) => console.log("Error is: " + error));

      const intervel = setInterval(() => {
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latlong.lat}&lon=${latlong.lon}&appid=ebc43e710fc7dda0b586a2c819fa4d05&units=metric`
          )
          .then((res) => {
            setdate(res);
          })
          .catch((error) => console.log("Error is: " + error));
      }, 5 * 60 * 1000);
      return () => clearInterval(intervel);
    }
  }, [latlong]);

  const resIcon = date?.data?.weather[0]?.icon;
  const discripe = date?.data?.weather[0]?.description;
  const linkresIcon = `https://openweathermap.org/img/wn/${resIcon}@2x.png`;
  // ===api 2===

  // api 3 timeapi
  useEffect(() => {
    if (latlong.lat && latlong.lon) {
      axios
        .get(
          `https://timeapi.io/api/time/current/coordinate?latitude=${latlong.lat}&longitude=${latlong.lon}`
        )
        .then((res) => {
          settimeZ(res.data);
        })
        .catch((error) => console.log("error is: " + error));

      const intervel = setInterval(() => {
        axios
          .get(
            `https://timeapi.io/api/time/current/coordinate?latitude=${latlong.lat}&longitude=${latlong.lon}`
          )
          .then((res) => {
            settimeZ(res.data);
          })
          .catch((error) => console.log("error is: " + error));
      }, 50000);
      return () => clearInterval(intervel);
    }
  }, [latlong]);

  const Day = timeZ?.dayOfWeek;
  const data = timeZ?.date;
  const cityName = latlong?.name;
  const timezoneS = timeZ?.timeZone?.split("/")[0];
  let [hours, minutes] = timeZ?.time
    ? timeZ.time.split(":").map(Number)
    : [0, 0];
  hours = hours % 12;
  hours = hours ? hours : 12;
  let ampm = hours > 12 ? "PM" : "AM";
  // ===api 3===

  // handlechange theme button
  function handlechangeTheme() {
    document.body.classList.toggle("bodyC");
    document.getElementById("firstDiv").classList.toggle("firstDivC");
    document.getElementById("SecoundDiv").classList.toggle("SecoundDivC");
    if (!ischanged) {
      document.getElementById("CardId").style.background =
        "linear-gradient(135deg, #1d2020, #102725, #262a2b, #000000)";
    } else {
      document.getElementById("CardId").style.background =
        "linear-gradient(135deg, #00838f, #5fa8a1, #18d7ec, #0b8591)";
    }
    ischanged = !ischanged;
  }

  const Cities = [
    { title: "New York" },
    { title: "Los Angeles" },
    { title: "Chicago" },
    { title: "Houston" },
    { title: "Miami" },
    { title: "San Francisco" },
    { title: "Las Vegas" },
    { title: "Toronto" },
    { title: "Vancouver" },
    { title: "Montreal" },
    { title: "Mexico City" },
    { title: "Cancun" },

    { title: "Buenos Aires" },
    { title: "Santiago" },
    { title: "Lima" },
    { title: "Bogota" },
    { title: "Rio de Janeiro" },
    { title: "São Paulo" },
    { title: "Quito" },
    { title: "Montevideo" },
    { title: "Caracas" },

    { title: "London" },
    { title: "Paris" },
    { title: "Rome" },
    { title: "Milan" },
    { title: "Madrid" },
    { title: "Barcelona" },
    { title: "Berlin" },
    { title: "Amsterdam" },
    { title: "Brussels" },
    { title: "Vienna" },
    { title: "Prague" },
    { title: "Budapest" },
    { title: "Warsaw" },
    { title: "Lisbon" },
    { title: "Dublin" },
    { title: "Zurich" },
    { title: "Geneva" },
    { title: "Stockholm" },
    { title: "Oslo" },
    { title: "Helsinki" },
    { title: "Athens" },

    { title: "Tokyo" },
    { title: "Osaka" },
    { title: "Kyoto" },
    { title: "Beijing" },
    { title: "Shanghai" },
    { title: "Hong Kong" },
    { title: "Seoul" },
    { title: "Bangkok" },
    { title: "Singapore" },
    { title: "Kuala Lumpur" },
    { title: "Jakarta" },
    { title: "Manila" },
    { title: "Hanoi" },
    { title: "Taipei" },
    { title: "Dubai" },
    { title: "Abu Dhabi" },
    { title: "Doha" },
    { title: "Riyadh" },
    { title: "Jeddah" },
    { title: "Tehran" },
    { title: "Mumbai" },
    { title: "New Delhi" },
    { title: "Bangalore" },
    { title: "Istanbul" },

    { title: "Cairo" },
    { title: "Alexandria" },
    { title: "Giza" },
    { title: "Casablanca" },
    { title: "Rabat" },
    { title: "Marrakech" },
    { title: "Tunis" },
    { title: "Algiers" },
    { title: "Oran" },
    { title: "Johannesburg" },
    { title: "Cape Town" },
    { title: "Nairobi" },
    { title: "Accra" },
    { title: "Addis Ababa" },
    { title: "Lagos" },
    { title: "Kampala" },
    { title: "Kigali" },

    { title: "Sydney" },
    { title: "Melbourne" },
    { title: "Brisbane" },
    { title: "Perth" },
    { title: "Adelaide" },
    { title: "Auckland" },
    { title: "Wellington" },
  ];

  return (
    <div>
      <SimpleSnackbar message={message} open={open} set={setOpen} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100vh",
          alignItems: "center",
          width: "100%",
          flexDirection: "column",
        }}
      >
        {/* =search= */}
        <div
          style={{
            marginTop: "25px",
            width: "90%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            id="searchC"
            style={{
              width: "65%",
              maxWidth: "650px",
            }}
          >
            <form
              style={{
                width: "100%",
                background:
                  "linear-gradient(155deg, #a0f8e5, #d6b9f7, #98f8e5)",
                borderRadius: "30px",
                display: "flex",
                alignItems: "center",
                padding: "5px 10px",
                boxShadow: "0px 7px 18px rgba(0, 0, 0, 0.3)",
              }}
              onSubmit={(e) => {
                e.preventDefault();
                handleClickBtn();
              }}
            >
              <label style={{ color: "purple" }}>City:</label>
              <Autocomplete
                fullWidth
                id="city-select-demo"
                options={Cities}
                autoHighlight
                freeSolo
                inputValue={cityinput}
                onInputChange={(event, newInputValue) =>
                  setcityinput(newInputValue)
                }
                getOptionLabel={(option) =>
                  typeof option === "string" ? option : option.title
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label=""
                    variant="standard"
                    InputProps={{
                      ...params.InputProps,
                      disableUnderline: true,
                    }}
                    style={{
                      marginLeft: "10px",
                    }}
                  />
                )}
              />

              <IconButton
                onClick={handleClickBtn}
                style={{
                  height: "45px",
                  width: "45px",
                  marginRight: "5px",
                  borderRadius: "50%",
                  background: "#ffffff55",
                  backdropFilter: "blur(3px)",
                }}
              >
                <SearchIcon
                  style={{
                    cursor: "pointer",
                    fontSize: "26px",
                  }}
                />
              </IconButton>
            </form>
          </div>
        </div>
        {/* ===search=== */}

        {/* =weather Data=  */}
        {!searchpage ? (
          <div className="Divsearchpage">
            <h1>search for a city</h1>
            <span className="Spantextattention">
              ⚠️ Make sure city and country are correct before searching
            </span>
          </div>
        ) : latlong.lat && latlong.lon ? (
          <div className="weatherinformation">
            {/* =first div= */}
            <div className="firstDiv" id="firstDiv">
              <div style={{ margin: "10px" }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h1 style={{ fontSize: "34px" }}>
                    {Day ? Day : `loading${dots}`}
                  </h1>
                  <p style={{ margin: "10px", fontSize: "17px" }}>
                    {`${hours}:${minutes < 10 ? "0" + minutes : minutes}  `}
                    {ampm}
                  </p>
                </div>
                <h2>{data ? data : `loading${dots}`}</h2>
                <h3>
                  {timezoneS + "/" + cityName
                    ? timezoneS + "/" + cityName
                    : `loading${dots}`}
                </h3>
              </div>
              <div
                style={{
                  display: "flex",
                }}
              >
                <div style={{ margin: "10px" }}>
                  <h1 style={{ fontSize: "42px" }}>
                    {Math.round(date?.data?.main?.temp)
                      ? Math.round(date?.data?.main?.temp)
                      : `loading${dots}`}
                    &#176;C
                  </h1>
                  <h3>{discripe}</h3>
                </div>
                <div>
                  <img
                    src={linkresIcon}
                    alt="..."
                    style={{
                      width: "70px",
                      height: "70px",
                    }}
                  />
                </div>
              </div>
            </div>
            {/* ===first div=== */}
            <hr />
            <hr />
            <hr />
            {/* =secound div= */}
            <div className="SecoundDiv" id="SecoundDiv">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    margin: "10px",
                    width: "100%",
                    color: "white",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "2px",
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      <LocationOnIcon />
                      <h2>location</h2>
                    </div>
                    <h2 style={{ marginRight: "15px" }}>
                      {cityName ? cityName : `loading${dots}`}
                    </h2>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "2px",
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      <CompressIcon />
                      <h2>Pressure</h2>
                    </div>
                    <h3 style={{ marginRight: "15px" }}>
                      {date?.data?.main?.pressure
                        ? date?.data?.main?.pressure
                        : `loading${dots}`}{" "}
                      <CompressIcon
                        sx={{ fontSize: "14px", marginBottom: "5px" }}
                      />
                    </h3>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "2px",
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      <AirIcon />
                      <h2>wind speed</h2>
                    </div>
                    <h3 style={{ marginRight: "10px" }}>
                      {date?.data?.wind?.speed
                        ? date?.data?.wind?.speed
                        : `loading${dots}`}{" "}
                      KM/h
                    </h3>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "2px",
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      <WaterIcon />
                      <h2>humidity</h2>
                    </div>
                    <h3 style={{ marginRight: "15px" }}>
                      {date?.data?.main?.humidity
                        ? date?.data?.main?.humidity
                        : `loading${dots}`}{" "}
                      <WaterIcon
                        sx={{ fontSize: "14px", marginBottom: "5px" }}
                      />
                    </h3>
                  </div>

                  <Divider style={{ marginBottom: "2px" }} />

                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ display: "flex", marginRight: "10px" }}>
                        <ThermostatIcon />
                        <h3>Temp-max: </h3>
                      </div>
                      <h3>
                        {Math.round(date?.data?.main?.temp_min)
                          ? `${Math.round(date?.data?.main?.temp_max)}`
                          : ""}
                        <ThermostatIcon
                          sx={{ fontSize: "14px", marginBottom: "5px" }}
                        />
                      </h3>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "2px",
                      }}
                    >
                      <div style={{ display: "flex", marginRight: "10px" }}>
                        <ThermostatIcon />
                        <h3>Temp-min: </h3>
                      </div>
                      <h3 style={{ marginRight: "13px" }}>
                        {Math.round(date?.data?.main?.temp_min)
                          ? `${Math.round(date?.data?.main?.temp_min)}`
                          : ""}
                        <ThermostatIcon
                          sx={{ fontSize: "14px", marginBottom: "5px" }}
                        />
                      </h3>
                    </div>
                  </div>
                </div>
                <div style={{ height: "50%", marginTop: "10px" }}>
                  <BasicCard
                    time={timeZ}
                    discription={discripe}
                    data={date}
                    dot={dots}
                  />
                </div>
                <div style={{ height: "15%", textAlign: "center" }}>
                  <button className="btn-div" onClick={handlechangeTheme}>
                    change theme
                  </button>
                </div>
              </div>
            </div>
            {/* ===secound div=== */}
          </div>
        ) : (
          <div className="Divnotfoundpage">
            <img src="image-notFound-page.png" alt="..." className="imgC" />
            <span className="SpantextError">
              ❌ We couldn’t find this location. Make sure your Country and City
              are correct
            </span>
          </div>
        )}
        {/* ===weather Data===  */}

        {/* selection  */}
        <CountrySelect country={country} setCountry={setCountry} />
      </div>
    </div>
  );
}

export default App;
