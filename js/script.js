document.addEventListener("DOMContentLoaded", () => {
  //-------------------------------------------

  //API Key
  const apiKey = "api_key=97d3331e327df20d1c0faca85f646034";
  const baseURL = "https://api.themoviedb.org/3";
  const nowShowing =
    baseURL +
    "/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&" +
    apiKey;
  const mostPopular =
    baseURL + "/discover/movie?sort_by=popularity.desc&" + apiKey;
  const imgURL = "https://image.tmdb.org/t/p/w500";
  const mainSection = document.querySelector(".main");

  /* ---- HEADER ---- */
  const headerSection = document.createElement("header");
  headerSection.classList.add("header");
  headerSection.innerHTML = `
   <!-- <section class="header__info">
         <div class="header__time">
            ur 
        </div>
        <div class="header__info-right">
            signal
            internet
            batteri
        </div>
    </section> -->
    <h1 class="header__h1">MyMovies</h1>
    <div class="header__toggle toggle">
        <label class="toggle__switch">
        <input type="checkbox" class="toggle__checkbox">
        <span class="toggle__slider round"></span>
    </div>
</label>
  `;
  mainSection.append(headerSection);

  /* ---- NOW SHOWING MOVIES ---- */
  moviesShowing(nowShowing);

  function moviesShowing(urlOne) {
    fetch(urlOne)
      .then((resOne) => resOne.json())
      .then((dataOne) => {
        showMoviesShowing(dataOne.results);
      });
  }

  function showMoviesShowing(dataOne) {
    const nowShowingGrid = document.createElement("section");
    nowShowingGrid.classList.add("showing");
    nowShowingGrid.innerHTML = `
        <div class="showing__title">
            <h2 class="showing__h2 basic__h2">Now Showing</h2>
            <a href="" class="showing__btn">
                <p class="showing__p basic__p">See more</p>
            </a>
        </div>
    `;
    mainSection.append(nowShowingGrid);

    const showingFlex = document.createElement("section");
    showingFlex.classList.add("showing__flex");

    nowShowingGrid.append(showingFlex);

    dataOne.forEach((movieOne) => {
      const showingSection = document.createElement("article");
      showingSection.classList.add("showing__card");
      showingSection.innerHTML = `

        <article class="showing__movie">
            <img src="${
              imgURL + movieOne.poster_path
            }" alt="" class="showing__img">
            <div class="showing__info">
                <h3 class="showing__h3 basic__h3">${movieOne.title}</h3>
                <h4 class="showing__h4 basic__h4 basic__h4--grey"><i class="showing__star fa-sharp fa-solid fa-star"></i> ${
                  movieOne.vote_average
                } / 10 IMDb</h4>
                <div class="showing__genre-box">
                </div>
                <h5 class="showing__h5 showing__h5--time basic__h5"></h5>
            </div>
        </article>
        `;
      showingFlex.append(showingSection);
    });
  }

  /* ---- POPULAR MOVIES ---- */
  //Kalder funktion med parametret const mostPopular
  getMovies(mostPopular);

  //Funktionen fetcher url'en og konverterer data til en json fil aktiverer funktionen showMovies
  function getMovies(url) {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        showMovies(data.results);
      });
  }

  //Kør funktionen showMovies der tager et parameter
  function showMovies(data) {
    const popularMainGrid = document.createElement("section");
    popularMainGrid.classList.add("popular");
    popularMainGrid.innerHTML = `
        <div class="popular__title">
            <h2 class="popular__h2 basic__h2">Popular</h2>
            <a href="" class="popular__btn">
                <p class="popular__p basic__p">See more</p>
            </a>
        </div>
    `;
    mainSection.append(popularMainGrid);

    //Kører en forEach loop, hvor der oprettes et movie card for hver objekt
    data.forEach((movie) => {
      const popularSection = document.createElement("section");
      popularSection.classList.add("popular__card");
      popularSection.innerHTML = `

        <article class="popular__movie">
            <img src="${
              imgURL + movie.poster_path
            }" alt="" class="popular__img">
            <div class="popular__info">
                <h3 class="popular__h3 basic__h3">${movie.title}</h3>
                <h4 class="popular__h4 basic__h4 basic__h4--grey"><i class="popular__star fa-sharp fa-solid fa-star"></i> ${
                  movie.vote_average
                } / 10 IMDb</h4>
                <div class="popular__genre-box">
                </div>
                <h5 class="popular__h5 popular__h5--time basic__h5"></h5>
            </div>
        </article>
        `;

      popularMainGrid.append(popularSection);

      const genreBox = popularSection.querySelector(".popular__genre-box");
      movie.genre_ids.forEach((genre) => {
        const genreTag = document.createElement("a");
        genreTag.classList.add("popular__genre", "basic__a");
        genreTag.innerText = genre;

        genreBox.append(genreTag);
      });
    });
  }

  //-------------------------------------------
});
