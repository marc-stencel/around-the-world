export default function renderErrorElement() {
  const main = document.querySelector(".main");

  const errorElement = document.createElement("div");
  errorElement.classList.add("country", "country--error");
  main.appendChild(errorElement);

  const undoElement = document.createElement("div");
  undoElement.classList.add("undo");
  errorElement.appendChild(undoElement);

  const undoLink = document.createElement("a");
  undoLink.classList.add("undo__link");
  undoLink.href = "/";
  undoLink.setAttribute("aria-label", "Undo");
  undoElement.appendChild(undoLink);

  const undoText = document.createElement("span");
  undoText.innerText = "X";
  undoText.classList.add("undo__text");
  undoLink.appendChild(undoText);

  const countryText = document.createElement("strong");
  countryText.innerText = "Resource could not be loaded, please try again.";
  countryText.classList.add("country__text--error");
  errorElement.appendChild(countryText);
}
