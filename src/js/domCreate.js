function renderCountryInfo(text, value) {
  const countryText = document.createElement("p");
  countryText.innerText = text;
  countryText.classList.add("country__text");

  const countryValue = document.createElement("span");
  countryValue.innerText = value;
  countryValue.classList.add("country__value");
  countryText.appendChild(countryValue);

  if (value.includes(" km")) {
    const superScript = document.createElement("sup");
    superScript.innerText = 2;
    superScript.classList.add("country__value");
    countryText.appendChild(superScript);
  }

  return countryText;
}

export function renderListElement(data) {
  const main = document.querySelector(".main");
  main.innerHTML = "";

  const list = document.createElement("ul");
  list.classList.add("list");
  main.appendChild(list);

  data.forEach(
    ({
      area,
      capital,
      flags: { alt: flagAlt, png: flagUrl },
      name: { common },
      population,
      region,
    }) => {
      const listItem = document.createElement("li");
      listItem.classList.add("list__item", "country");
      list.appendChild(listItem);

      const listLink = document.createElement("a");
      listLink.classList.add("list__link");
      listLink.href = `?details=${common}`;
      listLink.setAttribute("aria-label", `Learn more about ${common}`);
      listItem.appendChild(listLink);

      const countryHead = document.createElement("div");
      countryHead.classList.add("country__head");
      listLink.appendChild(countryHead);

      const countryImg = document.createElement("img");
      countryImg.classList.add("country__img");
      countryImg.src = `${flagUrl}`;
      countryImg.alt = `${flagAlt}`;
      countryImg.setAttribute("loading", "lazy");
      countryHead.appendChild(countryImg);

      const countryName = document.createElement("strong");
      countryName.innerText = `${common}`;
      countryName.classList.add("country__name");
      countryHead.appendChild(countryName);

      const countryInfo = document.createElement("div");
      countryInfo.classList.add("country__info");
      listLink.appendChild(countryInfo);

      countryInfo.appendChild(
        renderCountryInfo("Capital: ", `${capital || "No capital"}`)
      );
      countryInfo.appendChild(renderCountryInfo("Region: ", `${region}`));
      countryInfo.appendChild(
        renderCountryInfo(
          "Population: ",
          `${population.toLocaleString("pl-PL")}`
        )
      );
      countryInfo.appendChild(
        renderCountryInfo("Area: ", `${area.toLocaleString("pl-PL")} km`)
      );
    }
  );
}

export function renderDetailsElement(data) {
  data.forEach(
    ({
      area,
      capital,
      currencies,
      flags: { alt: flagAlt, png: flagUrl },
      independent,
      languages,
      maps: { googleMaps },
      name: { common, official },
      population,
      region,
      subregion,
      timezones,
    }) => {
      document.querySelector(".main").innerHTML += `
      <div class="country country--details">
        <div class="undo">
          <a href="/" class="undo__link" aria-label="Undo">
            <span class="undo__text">X</span>
          </a>
        </div>
        
        <div class="country__head">
          <img class="country__img" src="${flagUrl}" alt="${flagAlt}">
          <strong class="country__name">${common}</strong>
          ${
            independent
              ? ""
              : `<p class="country__text">
                    <span class="country__value country__independent">Dependent</span>
                </p>`
          }
        </div>

        <div class="country__info">
          <p class="country__text">
            Capital: <span class="country__value">${
              capital || "No capital"
            }</span>
          </p>

          <p class="country__text">
            Official name: <span class="country__value">${official}</span>
          </p>

          <p class="country__text">
            Region: <span class="country__value">${region}</span>
          </p>

          <p class="country__text">
            Subregion: <span class="country__value">${
              subregion || "No subregion"
            }</span>
          </p>

          <p class="country__text">
            Number of time zones: <span class="country__value">${
              timezones.length
            }</span>
          </p>

          ${
            languages
              ? `<p class="country__text">
                  Languages: <span class="country__value">${Object.values(
                    languages
                  ).join(", ")}</span>
                </p>`
              : ""
          }

          ${
            currencies
              ? `<p class="country__text">
                  Currencies: <span class="country__value">${Object.values(
                    currencies
                  )
                    .map((currency) => currency.name)
                    .join(", ")}</span>
                </p>`
              : ""
          }

          <p class="country__text">
            Population: <span class="country__value">${population.toLocaleString(
              "pl-PL"
            )}</span>
          </p>

          <p class="country__text">
            Area: <span class="country__value">${area.toLocaleString(
              "pl-PL"
            )} km</span><sup class="country__value">2</sup>
          </p>
          
          <a class="country__text--link" href="${googleMaps}" rel="noopener noreferrer" target="_blank" aria-label="Check Google Maps">
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-geo-fill" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411z"/>
            </svg>
          </a>
        </div>
      </div>`;
    }
  );
}
