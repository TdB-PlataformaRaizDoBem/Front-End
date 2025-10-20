const menuBtn = document.querySelector(".menu-icon");
const menuMobile = document.querySelector(".menu-mobile");

menuBtn.addEventListener("click", () => {
  menuMobile.classList.toggle("active");
});