const apiKey = "api_key=97d3331e327df20d1c0faca85f646034";
const baseURL = "https://api.themoviedb.org/3";
const nowShowing =
  baseURL +
  "/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&" +
  apiKey;
const mostPopular =
  baseURL + "/discover/movie?sort_by=popularity.desc&" + apiKey;
const imgURL = "https://image.tmdb.org/t/p/w500";
