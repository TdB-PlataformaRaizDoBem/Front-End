const asidebar = document.getElementById('asidebar');
const btnClose = document.getElementById('toggleAside');
const open = document.getElementById('open-menu-mobile');
const btnCloseMobile = document.getElementById('toggleAside-mobile');

btnClose.addEventListener('click', () => {
  asidebar.classList.toggle('collapsed')
  document.body.classList.toggle('aside-collapsed');
})

open.addEventListener('click', () => {
  document.body.classList.toggle('aside-collapsed');
  asidebar.style.display="block"
})

btnCloseMobile.addEventListener('click', () => {
  asidebar.style.display="none"
})

const toggleTheme = document.querySelector('.toggle-theme');
toggleTheme.addEventListener('click', () => {
  toggleTheme.classList.toggle('active');
  document.body.classList.toggle('dark-mode');
});