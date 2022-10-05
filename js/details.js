import { genres } from "./genre.js";
//-------------------------------

genres();

const mainSectionDetails = document.createElement("section");
bodySection.append(mainSectionDetails);

const movieParams = new URLSearchParams(window.location.search);
const movieID = movieParams.get("id");

const navigationBack = document.querySelector(".header__icon");
navigationBack.classList.add("fa-solid", "fa-arrow-left");

/* ---- HERO ---- */
fetch(baseURL + `/movie/${movieID}/videos?` + apiKey)
  .then((response) => response.json())
  .then((trailer) => {
    console.log(trailer);
    const heroPhoto = document.createElement("section");
    heroPhoto.classList.add("hero");

    mainElement.append(heroPhoto);

    console.log(trailer);
    let lastVideo = trailer.results.pop();
    console.log(lastVideo);
    const iframeEl = document.createElement("iframe");
    iframeEl.setAttribute(
      "src",
      `//www.youtube.com/embed/${lastVideo.key}?&modestbranding=1&controls=0&mute=1`
    );
    iframeEl.setAttribute("style", "width :100%; height :300px;");
    iframeEl.setAttribute("class", "hero__iframe");

    heroPhoto.append(iframeEl);
  });

/* ---- DETAILS PAGE ---- */
fetch(
  `https://api.themoviedb.org/3/movie/${movieID}?api_key=97d3331e327df20d1c0faca85f646034`
)
  .then((responseDetails) => responseDetails.json())
  .then((movieDetails) => {
    console.log(movieDetails);

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

    // let pgRating;
    // if (movieDetails.adult === true) {
    //   pgRating = "PG-13";
    // } else {
    //   pgRating = "P";
    // }

    // function pgRating(r);
    let pgRating;

    const detailsSection = document.createElement("section");
    detailsSection.classList.add("details");
    detailsSection.innerHTML = `
      <h1 class="details__h1">${movieDetails.title}</h1>
      <h4 class="details__imdb details__p--light"><i class="showing__star fa-sharp fa-solid fa-star"></i> ${imdbRounded} / 10 IMDb</h4>
      <div class="details__genre-box genre-box"></div>
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
          <p class="details__p--dark pg-rating"></p>
        </div>
      </section>
      <section class="details__description">
        <h2 class="details__h2 baic__h2">Description</h2>
        <p class="details__p--light basic__p">${movieDetails.overview}</p>
      </section>
      `;

    mainElement.append(detailsSection);

    fetch(
      `https://api.themoviedb.org/3/movie/${movieID}/release_dates?api_key=97d3331e327df20d1c0faca85f646034`
    )
      .then((res) => res.json())
      .then((object) => {
        //console.log(object);
        object.results.forEach((releaseDate) => {
          console.log(releaseDate);
          if (releaseDate.iso_3166_1 === "US") {
            releaseDate.release_dates.forEach((rating) => {
              document.querySelector(".pg-rating").innerHTML =
                rating.certification;
              console.log(rating.certification);
            });
          }
        });
      });

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

    let genreContainer = detailsSection.querySelector(".details__genre-box");
    movieDetails.genres.forEach((id, index) => {
      //console.log(id);
      const genreTagDetails = document.createElement("a");
      genreTagDetails.classList.add("popular__genre", "genre-tag");
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
      const castCard = document.createElement("article");
      castCard.classList.add("cast__card");
      castCard.innerHTML = `
          <img src="${
            imgURL + castMember.profile_path
          }" alt="" class="cast__img">
          <h3 class="cast__name">${castMember.name}</h3>
        `;
      if (index < 4) {
        castSection.append(castCard);
      }
    });
  });
