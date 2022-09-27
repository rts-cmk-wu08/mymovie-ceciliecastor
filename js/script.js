document.addEventListener("DOMContentLoaded", () => {
  //-------------------------------------------

  /* ---- HEADER ---- */
  header.innerHTML = `
    <a href=""><i class="fa-solid fa-bars header__menu"></i></a>
    <h2 class="header__h2 header__h2-index">MyMovies</h2>
    <div class="header__toggle toggle">
        <input type="checkbox" class="toggle__checkbox" name="checkbox">
        <label for="checkbox" class="toggle__switch"></label>
    </div>

  `;

  /* ---- TOGGLE BUTTON ---- */

  let darkMode = localStorage.getItem("darkMode");
  const darkModeToggle = document.querySelector(".toggle");
  // console.log(darkMode);

  const enableDarkMode = () => {
    document.body.classList.add("theme--dark");
    localStorage.setItem("darkMode", "enabled");
  };

  const disableDarkMode = () => {
    document.body.classList.remove("theme--dark");
    localStorage.setItem("darkMode", null);
  };

  if (darkMode === "enabled") {
    enableDarkMode();
  }

  darkModeToggle.addEventListener("click", () => {
    //console.log("test");
    darkMode = localStorage.getItem("darkMode");
    if (darkMode !== "enabled") {
      enableDarkMode();
      //console.log(darkMode);
    } else {
      disableDarkMode();
    }
  });

  /* ---- NOW SHOWING MOVIES ---- */
  moviesShowing(nowShowing);

  function moviesShowing(urlOne) {
    fetch(urlOne)
      .then((resOne) => resOne.json())
      .then((dataOne) => {
        showMoviesShowing(dataOne.results);
        //console.log(dataOne.results);
      });
  }

  function showMoviesShowing(dataOne) {
    const nowShowingGrid = document.createElement("section");
    nowShowingGrid.classList.add("showing");
    nowShowingGrid.innerHTML = `
        <div class="showing__title">
            <h2 class="showing__h2 basic__h2">Now Showing</h2>
            <a href="" class="showing__btn see-more">
                <p class="showing__p see-more__p">See more</p>
            </a>
        </div>
    `;
    mainElement.append(nowShowingGrid);

    const showingFlex = document.createElement("section");
    showingFlex.classList.add("showing__flex");

    nowShowingGrid.append(showingFlex);

    dataOne.forEach((movieOne) => {
      const showingSection = document.createElement("article");
      showingSection.classList.add("showing__card");
      showingSection.innerHTML = `
      <article class="showing__movie">
            <a href="/details.html?id=${
              movieOne.id
            }" class="showing__movie-link">
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
            </a>
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
            <a href="" class="popular__btn see-more">
                <p class="popular__p see-more__p">See more</p>
            </a>
        </div>
    `;
    mainElement.append(popularMainGrid);

    //Kører en forEach loop, hvor der oprettes et movie card for hver objekt
    data.forEach((movie) => {
      const popularSection = document.createElement("section");
      popularSection.classList.add("popular__card");
      popularSection.innerHTML = `

        <article class="popular__movie">
           <a href="/details.html?id=${movie.id}" class="popular__link">
           <img src="${imgURL + movie.poster_path}" alt="" class="popular__img">
            </a>
            <div class="popular__info">
              <a href="/details.html?id=${movie.id}" class="popular__link">
                <h3 class="popular__h3 basic__h3">${movie.title}</h3>
                <h4 class="popular__h4 basic__h4 basic__h4--grey"><i class="popular__star fa-sharp fa-solid fa-star"></i> ${
                  movie.vote_average
                } / 10 IMDb</h4>
                <div class="popular__genre-box">
                </div>
                <h5 class="popular__h5 popular__h5--time basic__h5"></h5>
                </a>
            </div>
        </article>
        `;

      popularMainGrid.append(popularSection);

      const genreBox = popularSection.querySelector(".popular__genre-box");
      movie.genre_ids.forEach((id, index) => {
        //console.log(id);
        let currentGenre = genres.find((genre) => genre.id == id);

        const genreTag = document.createElement("a");
        genreTag.classList.add("popular__genre", "basic__a");
        genreTag.innerText = currentGenre.name;
        if (index < 3) {
          genreBox.append(genreTag);
        }
      });
    });
  }

  //FOOTER
  const footerElm = document.createElement("footer");
  footerElm.classList.add("footer");
  footerElm.innerHTML = `
  <a href="" class="footer__link"><i class="fa-solid fa-tape footer__film"></i></a>
  <a href="" class="footer__link"><i class="fa-solid fa-ticket-simple footer__ticket"></i></a>
  <a href="" class="footer__link"><i class="fa-solid fa-bookmark footer__bookmark"></i></a>
`;

  bodySection.append(footerElm);

  //-------------------------------------------
});
