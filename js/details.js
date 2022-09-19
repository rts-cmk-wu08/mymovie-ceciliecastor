document.addEventListener("DOMContentLoaded", () => {
  //-------------------------------------------------------------------------------

  const mainSectionDetails = document.createElement("section");
  bodySection.append(mainSectionDetails);

  const movieParams = new URLSearchParams(window.location.search);
  const movieID = movieParams.get("id");
  console.log(movieID);

  fetch(
    `https://api.themoviedb.org/3/movie/${movieID}?api_key=97d3331e327df20d1c0faca85f646034`
  )
    .then((responseDetails) => responseDetails.json())
    .then((movieDeatils) => {
      console.log(movieDeatils);
      const headerSectionDetails = document.createElement("section");
      headerSectionDetails.classList.add("header-details");
      headerSectionDetails.innerHTML = `
    <div class="header-details__container">
            <i class="fa-regular fa-arrow-left header-details__back "></i>
            <div class="toggle">
            <label class="toggle__switch">
                <input type="checkbox" class="toggle__checkbox">
                <span class="toggle__slider round"></span>
            </label>
            </div>
    </div>
`;
      header.append(headerSectionDetails);

      /* ---- DETAILS PAGE ---- */

      //ROUNDED IMDB SCORE
      const imdbRounded =
        Math.round((movieDeatils.vote_average + Number.EPSILON) * 10) / 10;

      //TIME CONVERTER FUNCTION
      function timeConverter(n) {
        const num = n;
        const hours = num / 60;
        const rHours = Math.floor(hours);
        const minutes = (hours - rHours) * 60;
        const rMinutes = Math.round(minutes);
        return rHours + "h " + rMinutes + "min";
      }

      //COUNTRY ABBREVIATION CONVERTER

      const heroPhoto = document.createElement("section");
      heroPhoto.classList.add("hero");
      heroPhoto.innerHTML = `
            <img class="hero__img" src="${
              imgURL + movieDeatils.backdrop_path
            }" alt="">
            <i class="hero__play fa-sharp fa-solid fa-circle-play"></i>
            <p class="hero__p basic__p">Play Trailer</p>
      `;

      mainElement.append(heroPhoto);

      const detailsSection = document.createElement("section");
      detailsSection.classList.add("details");
      detailsSection.innerHTML = `
      
    <h1 class="details__h1">${movieDeatils.title}</h1>
    <h4 class="details__imdb details__p--light"><i class="showing__star fa-sharp fa-solid fa-star"></i> ${imdbRounded} / 10 IMDb</h4>
    <div class="details__genres"></div>
    <section class="details__section">
        <div class="details__length">
            <p class="details__p--light">Length</p>
            <p class="details__p--dark">${timeConverter(
              movieDeatils.runtime
            )}</p>
        </div>
        <div class="details__language">
            <p class="details__p--light">Language</p>
            <p class="details__p--dark"></p>
        </div>
        <div class="details__rating">
            <p class="details__p--light">Rating</p>
            <p class="details__p--dark"></p>
        </div>
</section>
    <section class="details__description">
        <h2 class="details__h2 baic__h2">Description</h2>
        <p class="details__p--light basic__p">${movieDeatils.overview}</p>
    </section>
`;

      mainElement.append(detailsSection);
    });

  //FOREACH LOOP THROUGH THE ACTORS
  fetch(
    `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=97d3331e327df20d1c0faca85f646034`
  )
    .then((responseCast) => responseCast.json())
    .then((movieCast) => {
      console.log(movieCast);

      const castSection = document.createElement("section");
      castSection.classList.add("cast");
      castSection.innerHTML = `
        <div class="cast__heading">
          <h2 class="cast__h2">
            Cast
          </h2>
          <a href="" class="cast__btn">
                <p class="cast__p basic__p">See more</p>
          </a>
        </div>
        <section class="cast__scroll">

        </section>
      `;

      mainElement.append(castSection);

      movieCast.cast.forEach((castMember) => {
        console.log(castMember);

        const castCard = document.createElement("article");
        castCard.classList.add("cast__card");
        castCard.innerHTML = `
        <article class="card__cards">
          <img src="${
            imgURL + castMember.profile_path
          }" alt="" class="cast__img">
          <h3 class="cast__name">${castMember.name}</h3>
          </article>
        `;
        castScroll.append(castCard);
      });
    });

  //-------------------------------------------------------------------
});
