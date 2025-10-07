const btnAjuda = document.getElementById("btn-ajuda");
const btnDuvidas = document.getElementById("btn-duvidas");
const formAjuda = document.getElementById("form-ajuda");
const formDuvidas = document.getElementById("form-duvidas");

btnAjuda.addEventListener("click", () => {
  formAjuda.style.display = "block";
  formDuvidas.style.display = "none";
});

btnDuvidas.addEventListener("click", () => {
  formDuvidas.style.display = "block";
  formAjuda.style.display = "none";
});

// Controle de etapas dentro do formulário de ajuda
const btnProximaEtapa = document.getElementById("btn-proxima-etapa");
const btnVoltar = document.getElementById("btn-voltar");
const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");

btnProximaEtapa.addEventListener("click", () => {
  step1.classList.remove("active");
  step2.classList.add("active");
});

btnVoltar.addEventListener("click", () => {
  step2.classList.remove("active");
  step1.classList.add("active");
});
