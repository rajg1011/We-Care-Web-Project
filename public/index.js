// File for simple javaScipt of home Page

const bar = document.getElementsByClassName("bar-icon")[0];
bar.addEventListener("click", () => {
  document.querySelector(".xmark-hide").classList.toggle("xmark-responsive");
  document.querySelector(".fa-bars").classList.toggle("bar-responsive");
  document
    .querySelector(".header-hr-visible")
    .classList.toggle("header-hr-invisible");
  document.querySelector(".nav-list").classList.toggle("nav-list-responsive");
});
