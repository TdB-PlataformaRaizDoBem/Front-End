const asidebar = document.getElementById('asidebar');
const btnClose = document.getElementById('toggleAside');

btnClose.addEventListener('click', () => {
  asidebar.classList.toggle('collapsed')
  document.body.classList.toggle('aside-collapsed');
})

const toggleTheme = document.querySelector('.toggle-theme');
toggleTheme.addEventListener('click', () => {
  toggleTheme.classList.toggle('active');
  document.body.classList.toggle('dark-mode');
});