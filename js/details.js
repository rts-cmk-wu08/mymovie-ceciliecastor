document.addEventListener("DOMContentLoaded", () => {
  //-------------------------------------------------------------------------------

  const mainSectionDetails = document.createElement("section");
  bodySection.append(mainSectionDetails);

  const movieParams = new URLSearchParams(window.location.search);
  const movieID = movieParams.get("id");

  //HERO
  fetch(
    `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=97d3331e327df20d1c0faca85f646034`
  )
    .then((response) => response.json())
    .then((trailer) => {
      const heroPhoto = document.createElement("section");
      heroPhoto.classList.add("hero");

      mainElement.append(heroPhoto);

      console.log(trailer);
      let lastVideo = trailer.results.pop();
      console.log(lastVideo);
      const iframeEl = document.createElement("iframe");
      //iframeEl.className.add("details__iframe");
      iframeEl.setAttribute(
        "src",
        `//www.youtube.com/embed/${lastVideo.key}?&modestbranding=1&controls=0&mute=1`
      );
      iframeEl.setAttribute("style", "width :100%; height :300px;");
      iframeEl.setAttribute("class", "hero__iframe");

      heroPhoto.append(iframeEl);
    });

  /* ---- MAIN DETAILS ---- */
  fetch(
    `https://api.themoviedb.org/3/movie/${movieID}?api_key=97d3331e327df20d1c0faca85f646034`
  )
    .then((responseDetails) => responseDetails.json())
    .then((movieDetails) => {
      console.log(movieDetails);
      const headerSection = document.createElement("section");
      headerSection.classList.add("header__section");
      headerSection.innerHTML = `
          <a href="/index.html" class="header__arrow"><i class="fa-solid fa-arrow-left"></i></a>
          <h2 class="header__h2">MyMovies</h2>
          <div class="header__toggle toggle">
            <input type="checkbox" class="toggle__checkbox" name="checkbox">
            <label for="checkbox" class="toggle__switch"></label>
          </div>
        `;
      header.append(headerSection);

      /* ---- DETAILS PAGE ---- */

      //ROUNDED IMDB SCORE
      const imdbRounded =
        Math.round((movieDetails.vote_average + Number.EPSILON) * 10) / 10;

      //TIME CONVERTER FUNCTION
      function timeConverter(n) {
        const num = n;
        const hours = num / 60;
        const rHours = Math.floor(hours);
        const minutes = (hours - rHours) * 60;
        const rMinutes = Math.round(minutes);
        return rHours + "h " + rMinutes + "min";
      }

      const detailsSection = document.createElement("section");
      detailsSection.classList.add("details");
      detailsSection.innerHTML = `
      <h1 class="details__h1">${movieDetails.title}</h1>
      <h4 class="details__imdb details__p--light"><i class="showing__star fa-sharp fa-solid fa-star"></i> ${imdbRounded} / 10 IMDb</h4>
      <div class="details__genres"></div>
      <section class="details__section">
        <div class="details__length">
          <p class="details__p--light">Length</p>
          <p class="details__p--dark">${timeConverter(movieDetails.runtime)}</p>
        </div>
        <div class="details__language">
          <p class="details__p--light">Language</p>
        </div>
        <div class="details__rating">
          <p class="details__p--light">Rating</p>
          <p class="details__p--dark"></p>
        </div>
      </section>
      <section class="details__description">
        <h2 class="details__h2 baic__h2">Description</h2>
        <p class="details__p--light basic__p">${movieDetails.overview}</p>
      </section>
      `;

      mainElement.append(detailsSection);

      const languageBox = detailsSection.querySelector(".details__language");
      movieDetails.spoken_languages.forEach((language, index) => {
        let spokenLanguage = language;
        //console.log(language);
        const languageTag = document.createElement("p");
        languageTag.classList.add("details__language-p", "details__p--dark");
        languageTag.innerText = language.english_name;
        if (index < 1) {
          languageBox.append(languageTag);
        }
      });

      let genreContainer = detailsSection.querySelector(".details__genres");
      movieDetails.genres.forEach((id, index) => {
        //console.log(id);
        const genreTagDetails = document.createElement("a");
        genreTagDetails.classList.add("popular__genre", "basic__a");
        genreTagDetails.innerText = id.name;

        if (index < 3) {
          genreContainer.append(genreTagDetails);
        }
      });
    });

  //FOREACH LOOP THROUGH THE ACTORS
  fetch(
    `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=97d3331e327df20d1c0faca85f646034`
  )
    .then((responseCast) => responseCast.json())
    .then((movieCast) => {
      //console.log(movieCast);

      const castSection = document.createElement("section");
      castSection.classList.add("cast");
      castSection.innerHTML = `
        <div class="cast__heading">
          <h2 class="cast__h2">
            Cast
          </h2>
          <a href="" class="cast__btn see-more">
                <p class="cast__p see-more__p">See more</p>
          </a>
        </div>
      `;

      mainElement.append(castSection);

      movieCast.cast.forEach((castMember, index) => {
        console.log(castMember);

        const castCard = document.createElement("article");
        castCard.classList.add("cast__card");
        castCard.innerHTML = `
        <article class="cast__cards">
          <img src="${
            imgURL + castMember.profile_path
          }" alt="" class="cast__img">
          <h3 class="cast__name">${castMember.name}</h3>
          </article>
        `;
        if (index < 4) {
          castSection.append(castCard);
        }
      });
    });

  //-------------------------------------------------------------------
});
