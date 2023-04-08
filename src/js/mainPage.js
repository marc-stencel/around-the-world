import { renderListElement } from "./domCreate";
import renderErrorElement from "./errorHandle";

const NAV_LIST = document.querySelector(".filters__list");
const REGIONS = [...document.querySelectorAll(".filters__item")];
const INPUT = document.querySelector(".input");
let searchValue = INPUT.value;

const sortCountriesList = (countries) => {
  countries.sort((a, b) => {
    const nameA = a.name.common;
    const nameB = b.name.common;
    return nameA.localeCompare(nameB);
  });
};

function filterCountriesList(countries, searchElement) {
  return countries.filter(({ name: { common } }) =>
    common.toLowerCase().includes(searchElement.toLowerCase())
  );
}

export default function renderMainPage() {
  document.querySelector(".filters").classList.add("filters--active");
  const MAIN_URL = `https://restcountries.com/v3.1/`;
  let cachedCountries;

  const renderCountries = (countries) => {
    sortCountriesList(countries);
    renderListElement(countries);
  };

  async function getMainData(url, searchElement) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      cachedCountries = data;

      const filteredCountries = filterCountriesList(
        cachedCountries,
        searchElement
      );

      renderCountries(filteredCountries || cachedCountries);
    } catch {
      renderErrorElement();
    }
  }

  getMainData(`${MAIN_URL}all`, searchValue);

  function searchCountry(e) {
    searchValue = e.target.value;

    const filteredCountries = filterCountriesList(cachedCountries, searchValue);

    renderCountries(filteredCountries);
  }

  function selectRegion(e) {
    searchValue = INPUT.value;
    const {
      target: { nodeName, textContent },
    } = e;

    if (nodeName === "LI") {
      REGIONS.forEach((region) => {
        region.classList.remove("filters__item--active");
      });
      e.target.classList.add("filters__item--active");
    }

    if (textContent === "All") {
      getMainData(`${MAIN_URL}all`, searchValue);
      return;
    }
    if (nodeName === "LI")
      getMainData(`${MAIN_URL}region/${textContent}`, searchValue);
  }

  NAV_LIST.addEventListener("click", selectRegion);
  NAV_LIST.addEventListener("keydown", (e) => {
    if (e.key === "Enter") selectRegion(e);
  });
  INPUT.addEventListener("input", searchCountry);
}
