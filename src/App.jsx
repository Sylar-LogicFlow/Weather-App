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
  let ampm = hours >= 12 ? "AM" : "PM";
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
            width: "100%",
            height: "45px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div id="searchC">
            <form
              style={{
                width: "100%",
                textAlign: "center",
                background:
                  "linear-gradient(155deg, #99f6e4, #d4b6f5ff, #94f8e4ff)",
                borderRadius: "30px",
                display: "flex",
                boxShadow: "0px 7px 15px rgba(0, 0, 0, 0.4)",
                height: "100%",
              }}
              onSubmit={(e) => {
                e.preventDefault();
                if ((e.key = "Enter")) {
                  handleClickBtn();
                }
              }}
            >
              <input
                className="input-Sty"
                placeholder="City Search..."
                value={cityinput}
                onChange={(e) => setcityinput(e.target.value)}
              />
              <IconButton onClick={handleClickBtn}>
                <SearchIcon
                  sx={{
                    cursor: "pointer",
                    fontSize: "29px",
                    marginTop: "3px",
                    marginRight: "5px",
                    "&:hover": {
                      fontSize: "31px",
                    },
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
        <div
          style={{
            width: "50%",
            textAlign: "center",
            height: "40px",
            marginTop: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ width: "50%", height: "30px" }}>
            <select
              className="modern-select"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">select country</option>
              <hr />
              <option value="Afghanistan">Afghanistan</option>
              <option value="Albania">Albania</option>
              <option value="Algeria">Algeria</option>
              <option value="Andorra">Andorra</option>
              <option value="Angola">Angola</option>
              <option value="Antigua and Barbuda">Antigua and Barbuda</option>
              <option value="Argentina">Argentina</option>
              <option value="Armenia">Armenia</option>
              <option value="Australia">Australia</option>
              <option value="Austria">Austria</option>
              <option value="Azerbaijan">Azerbaijan</option>
              <hr />
              <option value="Burundi">Burundi</option>
              <option value="Benin">Benin</option>
              <option value="Belgium">Belgium</option>
              <option value="Bonaire">Bonaire (Sint Eustatius and Saba)</option>
              <option value="Burkina Faso">Burkina Faso</option>
              <option value="Bangladesh">Bangladesh</option>
              <option value="Bulgaria">Bulgaria</option>
              <option value="Bahrain">Bahrain</option>
              <option value="Bahamas">Bahamas</option>
              <option value="Bosnia and Herzegovina">
                Bosnia and Herzegovina
              </option>
              <option value="Belarus">Belarus</option>
              <option value="Belize">Belize</option>
              <option value="Bermuda">Bermuda</option>
              <option value="Bolivia">Bolivia</option>
              <option value="Brazil">Brazil</option>
              <option value="Barbados">Barbados</option>
              <option value="Brunei">Brunei</option>
              <option value="Bhutan">Bhutan</option>
              <option value="Bouvet Island">Bouvet Island</option>
              <option value="Botswana">Botswana</option>
              <option value="British Indian Ocean Territory">
                British Indian Ocean Territory
              </option>
              <hr />
              <option value="Central African Republic">
                Central African Republic
              </option>
              <option value="Canada">Canada</option>
              <option value="Cocos Islands">Cocos Islands</option>
              <option value="Chile">Chile</option>
              <option value="China">China</option>
              <option value="Côte d'Ivoire">Côte d'Ivoire</option>
              <option value="Cameroon">Cameroon</option>
              <option value="Congo (DRC)">Congo (DRC)</option>
              <option value="Cook Islands">Cook Islands</option>
              <option value="Colombia">Colombia</option>
              <option value="Comoros">Comoros</option>
              <option value="Cabo Verde">Cabo Verde</option>
              <option value="Costa Rica">Costa Rica</option>
              <option value="Cuba">Cuba</option>
              <option value="Curaçao">Curaçao</option>
              <option value="Christmas Island">Christmas Island</option>
              <option value="Cayman Islands">Cayman Islands</option>
              <option value="Cyprus">Cyprus</option>
              <option value="Czechia">Czechia</option>
              <option value="Croatia">Croatia</option>
              <option value="Cambodia">Cambodia</option>
              <option value="Chad">Chad</option>
              <hr />
              <option value="Djibouti">Djibouti</option>
              <option value="Dominica">Dominica</option>
              <option value="Denmark">Denmark</option>
              <option value="Dominican Republic">Dominican Republic</option>
              <hr />
              <option value="Ecuador">Ecuador</option>
              <option value="Egypt">Egypt</option>
              <option value="Eritrea">Eritrea</option>
              <option value="Estonia">Estonia</option>
              <option value="Ethiopia">Ethiopia</option>
              <option value="Equatorial Guinea">Equatorial Guinea</option>
              <option value="El Salvador">El Salvador</option>
              <option value="Eswatini">Eswatini</option>
              <option value="England">England</option>
              <hr />
              <option value="Saint Barthélemy">Saint Barthélemy</option>
              <option value="Switzerland">Switzerland</option>
              <option value="Spain">Spain</option>
              <option value="Saint Kitts and Nevis">
                Saint Kitts and Nevis
              </option>
              <option value="Saint Lucia">Saint Lucia</option>
              <option value="Sri Lanka">Sri Lanka</option>
              <option value="Saint Martin">Saint Martin</option>
              <option value="Saudi Arabia">Saudi Arabia</option>
              <option value="Sudan">Sudan</option>
              <option value="Senegal">Senegal</option>
              <option value="Singapore">Singapore</option>
              <option value="South Georgia">South Georgia</option>
              <option value="Saint Helena">Saint Helena</option>
              <option value="Svalbard">Svalbard</option>
              <option value="Solomon Islands">Solomon Islands</option>
              <option value="Sierra Leone">Sierra Leone</option>
              <option value="San Marino">San Marino</option>
              <option value="Somalia">Somalia</option>
              <option value="Saint Pierre and Miquelon">
                Saint Pierre and Miquelon
              </option>
              <option value="Serbia">Serbia</option>
              <option value="South Sudan">South Sudan</option>
              <option value="Sao Tome and Principe">
                Sao Tome and Principe
              </option>
              <option value="Suriname">Suriname</option>
              <option value="Slovakia">Slovakia</option>
              <option value="Slovenia">Slovenia</option>
              <option value="Sweden">Sweden</option>
              <option value="Sint Maarten">Sint Maarten</option>
              <option value="Seychelles">Seychelles</option>
              <option value="Syria">Syria</option>
              <option value="Saint Vincent and the Grenadines">
                Saint Vincent and the Grenadines
              </option>
              <option value="Samoa">Samoa</option>
              <option value="South Africa">South Africa</option>
              <hr />
              <option value="French Southern Territories">
                French Southern Territories
              </option>
              <option value="Finland">Finland</option>
              <option value="Fiji">Fiji</option>
              <option value="Falkland Islands">Falkland Islands</option>
              <option value="France">France</option>
              <option value="Faroe Islands">Faroe Islands</option>
              <option value="French Guiana">French Guiana</option>
              <option value="French Polynesia">French Polynesia</option>
              <hr />
              <option value="Germany">Germany</option>
              <option value="Gabon">Gabon</option>
              <option value="Georgia">Georgia</option>
              <option value="Guernsey">Guernsey</option>
              <option value="Ghana">Ghana</option>
              <option value="Gibraltar">Gibraltar</option>
              <option value="Guinea">Guinea</option>
              <option value="Guadeloupe">Guadeloupe</option>
              <option value="Gambia">Gambia</option>
              <option value="Guinea-Bissau">Guinea-Bissau</option>
              <option value="Greece">Greece</option>
              <option value="Grenada">Grenada</option>
              <option value="Greenland">Greenland</option>
              <option value="Guatemala">Guatemala</option>
              <option value="Guyana">Guyana</option>
              <option value="Guam">Guam</option>
              <hr />
              <option value="Hong Kong">Hong Kong</option>
              <option value="Heard Island and McDonald Islands">
                Heard Island and McDonald Islands
              </option>
              <option value="Honduras">Honduras</option>
              <option value="Haiti">Haiti</option>
              <option value="Hungary">Hungary</option>
              <hr />
              <option value="Indonesia">Indonesia</option>
              <option value="Isle of Man">Isle of Man</option>
              <option value="India">India</option>
              <option value="Ireland">Ireland</option>
              <option value="Iran">Iran</option>
              <option value="Ireland">Ireland</option>
              <option value="Italy">Italy</option>
              <hr />
              <option value="United Arab Emirates">United Arab Emirates</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Uganda">Uganda</option>
              <option value="Ukraine">Ukraine</option>
              <option value="US Minor Outlying Islands">
                US Minor Outlying Islands
              </option>
              <option value="Uruguay">Uruguay</option>
              <option value="United States">United States</option>
              <option value="Uzbekistan">Uzbekistan</option>
              <hr />
              <option value="Venezuela">Venezuela</option>
              <option value="British Virgin Islands">
                British Virgin Islands
              </option>
              <option value="US Virgin Islands">US Virgin Islands</option>
              <option value="Vietnam">Vietnam</option>
              <option value="Vanuatu">Vanuatu</option>
              <hr />
              <option value="Western Sahara">Western Sahara</option>
              <option value="Wallis and Futuna">Wallis and Futuna</option>
              <hr />
              <option value="Zambia">Zambia</option>
              <option value="Zimbabwe">Zimbabwe</option>
              <hr />
              <option value="Turks and Caicos Islands">
                Turks and Caicos Islands
              </option>
              <option value="Togo">Togo</option>
              <option value="Thailand">Thailand</option>
              <option value="Tajikistan">Tajikistan</option>
              <option value="Tokelau">Tokelau</option>
              <option value="Turkmenistan">Turkmenistan</option>
              <option value="Timor-Leste">Timor-Leste</option>
              <option value="Tonga">Tonga</option>
              <option value="Trinidad and Tobago">Trinidad and Tobago</option>
              <option value="Tunisia">Tunisia</option>
              <option value="Turkey">Turkey</option>
              <option value="Tuvalu">Tuvalu</option>
              <option value="Taiwan">Taiwan</option>
              <option value="Tanzania">Tanzania</option>
              <hr />
              <option value="Réunion">Réunion</option>
              <option value="Romania">Romania</option>
              <option value="Russia">Russia</option>
              <option value="Rwanda">Rwanda</option>
              <hr />
              <option value="Qatar">Qatar</option>
              <hr />
              <option value="Palestine">Palestine</option>
              <option value="Pakistan">Pakistan</option>
              <option value="Panama">Panama</option>
              <option value="Pitcairn">Pitcairn</option>
              <option value="Peru">Peru</option>
              <option value="Philippines">Philippines</option>
              <option value="Palau">Palau</option>
              <option value="Papua New Guinea">Papua New Guinea</option>
              <option value="Poland">Poland</option>
              <option value="Puerto Rico">Puerto Rico</option>
              <option value="Portugal">Portugal</option>
              <option value="Paraguay">Paraguay</option>
              <hr />
              <option value="Oman">Oman</option>
              <hr />
              <option value="North Macedonia">North Macedonia</option>
              <option value="Northern Mariana Islands">
                Northern Mariana Islands
              </option>
              <option value="Namibia">Namibia</option>
              <option value="New Caledonia">New Caledonia</option>
              <option value="Niger">Niger</option>
              <option value="Norfolk Island">Norfolk Island</option>
              <option value="Nigeria">Nigeria</option>
              <option value="Nicaragua">Nicaragua</option>
              <option value="Niue">Niue</option>
              <option value="Netherlands">Netherlands</option>
              <option value="Norway">Norway</option>
              <option value="Nepal">Nepal</option>
              <option value="Nauru">Nauru</option>
              <option value="New Zealand">New Zealand</option>
              <hr />
              <option value="Jamaica">Jamaica</option>
              <option value="Jersey">Jersey</option>
              <option value="Jordan">Jordan</option>
              <option value="Japan">Japan</option>
              <hr />
              <option value="Kazakhstan">Kazakhstan</option>
              <option value="Kenya">Kenya</option>
              <option value="Kyrgyzstan">Kyrgyzstan</option>
              <option value="Kiribati">Kiribati</option>
              <option value="South Korea">South Korea</option>
              <option value="Kuwait">Kuwait</option>
              <option value="North Korea">North Korea</option>
              <hr />
              <option value="Laos">Laos</option>
              <option value="Lebanon">Lebanon</option>
              <option value="Liberia">Liberia</option>
              <option value="Libya">Libya</option>
              <option value="Liechtenstein">Liechtenstein</option>
              <option value="Lesotho">Lesotho</option>
              <option value="Lithuania">Lithuania</option>
              <option value="Luxembourg">Luxembourg</option>
              <option value="Latvia">Latvia</option>
              <hr />
              <option value="Micronesia">Micronesia</option>
              <option value="Macao">Macao</option>
              <option value="Morocco">Morocco</option>
              <option value="Monaco">Monaco</option>
              <option value="Moldova">Moldova</option>
              <option value="Madagascar">Madagascar</option>
              <option value="Maldives">Maldives</option>
              <option value="Mexico">Mexico</option>
              <option value="Marshall Islands">Marshall Islands</option>
              <option value="Mali">Mali</option>
              <option value="Malta">Malta</option>
              <option value="Myanmar">Myanmar</option>
              <option value="Montenegro">Montenegro</option>
              <option value="Mongolia">Mongolia</option>
              <option value="Mozambique">Mozambique</option>
              <option value="Mauritania">Mauritania</option>
              <option value="Montserrat">Montserrat</option>
              <option value="Martinique">Martinique</option>
              <option value="Mauritius">Mauritius</option>
              <option value="Malawi">Malawi</option>
              <option value="Malaysia">Malaysia</option>
              <option value="Mayotte">Mayotte</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
