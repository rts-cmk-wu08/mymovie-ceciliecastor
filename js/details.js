const mainSectionDetails = document.querySelector(".main-details");

/* ---- HEADER ---- */
const headerSectionDetails = document.createElement("header");
headerSectionDetails.classList.add("header");
headerSectionDetails.innerHTML = `
    <video class="header__video" src=""></video>
    <div class="header__container">
        <div class="header__toggle toggle">
            <i class="header__back fa-regular fa-arrow-left"></i>
            <label class="toggle__switch">
                <input type="checkbox" class="toggle__checkbox">
                <span class="toggle__slider round"></span>
            </label>
        </div>
        <p class="header__p basic__p">Play Trailer</p>
    </div>
`;
mainSectionDetails.append(headerSectionDetails);

/* ---- DETAILS PAGE ---- */
const detailsSection = document.createElement("section");
detailsSection.classList.add("details");
detailsSection.innerHTML = `
    <h1 class="details__h1"></h1>
    <p class="details__imdb"></p>
    <div class="details__genres"></div>
    <section class="details__section">
        <div class="details__length">
            <p class="details__p--light"></p>
            <p class="details__p--dark"></p>
        </div>
        <div class="details__language">
            <p class="details__p--light"></p>
            <p class="details__p--dark"></p>
        </div>
        <div class="details__rating">
            <p class="details__p--light"></p>
            <p class="details__p--dark"></p>
        </div>
</section>
    <section class="details__description">
        <h2 class="details__h2 baic__h2"></h2>
        <p class="details__p basic__p"></p>
    </section>
`;
//FOREACH LOOP THROUGH THE ACTORS
