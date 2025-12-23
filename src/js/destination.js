const params = new URLSearchParams(window.location.search);
const city = params.get("city");

const cityName = document.getElementById("cityName");
const loading = document.querySelector("#loading");
const cityInfoBox = document.querySelector("#cityInfo");
const errorBox = document.querySelector("#error");

const lat = document.querySelector("#lat");
const lon = document.querySelector("#lon");
const country = document.querySelector("#country");
const state = document.querySelector("#state");
const population = document.querySelector("#population");

let GEODB_API_KEY = "b04afd35f7msh98c500451580f11p11c3ecjsne8970976c47a";
let GEODB_HOST = "wft-geo-db.p.rapidapi.com";
if (city) {
  cityName.textContent = city;

  async function fetchCityDetails(cityName) {
    try {
      let res = await fetch(
        `https://${GEODB_HOST}/v1/geo/cities?namePrefix=${city}&limit=1`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": GEODB_API_KEY,
            "x-RapidAPI-Host": GEODB_HOST,
          },
        }
      );
      // console.log(res);

      if (!res.ok) {
        console.log("API Response Not Fetched...");
      }
      let data = await res.json();
      console.log(data);
      if (!data.data || data.data.length === 0) {
        console.log("City Not Found");
      }
      let cityData = data.data[0];
      //Display City Info
      lat.textContent = cityData.latitude;
      lon.textContent = cityData.longitude;
      country.textContent = cityData.country;
      state.textContent = cityData.region || "N/A";
      population.textContent = cityData.population
        ? cityData.population.toLocaleString()
        : "N/A";
      loading.classList.add("hidden");
      cityInfoBox.classList.remove("hidden");
    } catch (error) {
      console.log(error);
      loading.classList.add("hidden");
      errorBox.classList.remove("hidden");
    }
  }
  fetchCityDetails(city);
} else {
  cityName.textContent = "Unknown City";
  loading.classList.add("hidden");
}
