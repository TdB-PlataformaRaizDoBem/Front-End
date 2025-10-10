const btnAjuda = document.getElementById("btn-ajuda");
const btnDuvidas = document.getElementById("btn-duvidas");
const formAjuda = document.getElementById("form-ajuda");
const formDuvidas = document.getElementById("form-duvidas");

formDuvidas.style.display = "none";

function mostrarFormulario(form) {
  formAjuda.style.display = "none";
  formDuvidas.style.display = "none";
  form.style.display = "grid";
}

btnAjuda.addEventListener("click", () => {
  mostrarFormulario(formAjuda);
});

btnDuvidas.addEventListener("click", () => {
  mostrarFormulario(formDuvidas);
});

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
