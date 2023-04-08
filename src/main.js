import "./scss/style.scss";
import renderMainPage from "./js/mainPage";
import renderDetailsPage from "./js/detailsPage";

if (document.location.search) renderDetailsPage();
else {
  renderMainPage();
}
