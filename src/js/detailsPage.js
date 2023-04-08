import { renderDetailsElement } from "./domCreate";
import renderErrorElement from "./errorHandle";

export default function renderDetailsPage() {
  const params = new URLSearchParams(document.location.search);
  const country = params.get("details");
  const DETAILS_URL = `https://restcountries.com/v3.1/name/${country}`;

  async function getDetailsData(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      renderDetailsElement(data);
    } catch {
      renderErrorElement();
    }
  }
  getDetailsData(DETAILS_URL);
}
