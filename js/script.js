document.addEventListener("DOMContentLoaded", () => {
  //-------------------------------------------

  //API Key
  const apiKey = "api_key=97d3331e327df20d1c0faca85f646034";
  const baseURL = "https://api.themoviedb.org/3";
  const mostPopular =
    baseURL + "/discover/movie?sort_by=popularity.desc&" + apiKey;
  const nowShowing =
    baseURL +
    "/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22" +
    apiKey;
  const imgURL = "https://image.tmdb.org/t/p/w500";
  const mainSection = document.querySelector(".main");

  //MOST POPULAR MOVIES
  getMovies(mostPopular);
  moviesShowing(nowShowing);

  function getMovies(url) {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        showMovies(data.results);
        moviesShowing(data.results);
      });
  }

  /* ---- NOW SHOWING ---- */
  function moviesShowing(data) {
    const moviesShowingSection = document.createElement("section");
    moviesShowingSection.classList.add("showing");
    moviesShowingSection.innerHTML = `
        <div class="showing__title">
           <h2 class="showing__h2 basic__h2">Now showing</h2>
            <a href="" class="showing__btn">
                <p class="showing__p basic__p">See more</p>
            </a>
        </div>
     `;
    mainSection.append(moviesShowingSection);

    genres.filter((genreResults) => genreResults.id);
    console.log(genres);

    // data.forEach((movie) => {
    //   console.log(movie);

    // });
  }

  /* ---- POPULAR MOVIES ---- */
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

    data.forEach((movie) => {
      console.log(movie);
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
        console.log(genre);
        const genreTag = document.createElement("a");
        genreTag.classList.add("popular__genre", "basic__a");
        genreTag.innerText = genre;

        genreBox.append(genreTag);
      });
    });
  }

  //-------------------------------------------
});
