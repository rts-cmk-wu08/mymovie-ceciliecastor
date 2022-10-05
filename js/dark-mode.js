export const darkmode = function () {
  let darkMode = localStorage.getItem("darkMode");
  const darkModeToggle = document.querySelector(".toggle");

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
    darkMode = localStorage.getItem("darkMode");
    if (darkMode !== "enabled") {
      enableDarkMode();
    } else {
      disableDarkMode();
    }
  });
};
