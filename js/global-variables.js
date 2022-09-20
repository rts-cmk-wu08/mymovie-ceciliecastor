/* ---- DOM VARIABLER ---- */
//BODY
const bodySection = document.querySelector("body");

//HEADER
const header = document.createElement("header");
header.classList.add("header");
bodySection.append(header);

//MAIN
const mainElement = document.createElement("main");
mainElement.classList.add("main");
bodySection.append(mainElement);

//FOOTER
const footerElm = document.createElement("footer");
footerElm.classList.add("footer");
footerElm.innerHTML = `
  <a href="" class="footer__link"><i class="fa-solid fa-tape footer__film"></i></a>
  <a href="" class="footer__link"><i class="fa-solid fa-ticket-simple footer__ticket"></i></a>
  <a href="" class="footer__link"><i class="fa-solid fa-bookmark footer__bookmark"></i></a>
`;

bodySection.append(footerElm);

/* ---- URL VARIBLER ---- */
const apiKey = "api_key=97d3331e327df20d1c0faca85f646034";
const baseURL = "https://api.themoviedb.org/3";
const nowShowing =
  baseURL +
  "/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&" +
  apiKey;
const mostPopular =
  baseURL + "/discover/movie?sort_by=popularity.desc&" + apiKey;
const imgURL = "https://image.tmdb.org/t/p/w500";
