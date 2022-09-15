document.addEventListener("DOMContentLoaded", () => {
  //-------------------------------------------------------------------------------

  const mainSectionDetails = document.querySelector(".main");

  const movieParams = new URLSearchParams(window.location.search);
  const movieID = movieParams.get("id");
  console.log(movieID);

  fetch(
    `https://api.themoviedb.org/3/movie/${movieID}?api_key=97d3331e327df20d1c0faca85f646034`
  )
    .then((responseDetails) => responseDetails.json())
    .then((movieDeatils) => {
      console.log(movieDeatils);
      const headerSectionDetails = document.createElement("header");
      headerSectionDetails.classList.add("header-details");
      headerSectionDetails.innerHTML = `
    <img class="header-details__img" src="${imgURL + movieDeatils.poster_path}">
    <div class="header-details__container">
        <div class="header-details__toggle toggle">
            <i class="header-details__back fa-regular fa-arrow-left"></i>
            <label class="toggle__switch">
                <input type="checkbox" class="toggle__checkbox">
                <span class="toggle__slider round"></span>
            </label>
        </div>
        <p class="header-details__p basic__p">Play Trailer</p>
    </div>
`;
      mainSectionDetails.append(headerSectionDetails);

      /* ---- DETAILS PAGE ---- */
      const detailsSection = document.createElement("section");
      detailsSection.classList.add("details");
      detailsSection.innerHTML = `
    <h1 class="details__h1">${movieDeatils.title}</h1>
    <h4 class="details__imdb basic__h4"><i class="showing__star fa-sharp fa-solid fa-star"></i> ${movieDeatils.vote_average} / 10 IMDb</h4>
    <div class="details__genres"></div>
    <section class="details__section">
        <div class="details__length">
            <p class="details__p--light">Length</p>
            <p class="details__p--dark">${movieDeatils.runtime}</p>
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
        <p class="details__p basic__p">${movieDeatils.overview}</p>
    </section>
    <section class="details__cast">
        <h2 class="details__h2 basic__h2">Cast</h2>
        <a href="" class="details__btn showMore__btn">
                <p class="details__p basic__p">See more</p>
        </a>
        <section class="details__cast-gallery">
            <div class="details__cell">
            </div>
        </section>
    </section>
`;

      mainSectionDetails.append(detailsSection);
    });

  //FOREACH LOOP THROUGH THE ACTORS

  //fetch();

  //-------------------------------------------------------------------
});
