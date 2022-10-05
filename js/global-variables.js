/* ---- URL VARIBLER ---- */
const apiKey = "api_key=97d3331e327df20d1c0faca85f646034";
const baseURL = "https://api.themoviedb.org/3";
const nowShowing =
  baseURL +
  "/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&" +
  apiKey;
const mostPopular =
  baseURL + "/discover/movie?sort_by=popularity.desc&" + apiKey + "&page=1";
const imgURL = "https://image.tmdb.org/t/p/w500";

/* ------- DOM VARIABLER ------- */
/* ---- BODY ---- */
const bodySection = document.querySelector("body");

/* ---- HEADER ---- */
const header = document.createElement("header");
header.classList.add("header");
bodySection.append(header);

header.innerHTML = `
    <a href="/index.html" class="header__navigation"><i class="header__icon fa-solid fa-bars"></i></a>
    <h2 class="header__h2 header__h2-index">MyMovies</h2>
    <div class="header__toggle toggle">
        <input type="checkbox" class="toggle__checkbox" name="checkbox">
        <label for="checkbox" class="toggle__switch"></label>
    </div>
  `;

/* ---- MAIN ---- */

const mainElement = document.createElement("main");
mainElement.classList.add("main");
bodySection.append(mainElement);
