//Menu Hamburguer das telas inicias
const menuBtn = document.querySelector(".menu-icon");
const menuMobile = document.querySelector(".menu-mobile");

menuBtn.addEventListener("click", () => {
  menuMobile.classList.toggle("active");
});

//detecção de pág para o header
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("#nav-bar a, .menu-mobile a");
  const currentPage = window.location.pathname.split("/").pop();

  links.forEach(link => {
    const href = link.getAttribute("href");

    // Garante que funcione mesmo com caminhos relativos ou ./ no início
    if (href === currentPage || href === `./${currentPage}`) {
      link.classList.add("current-page");
      link.setAttribute("aria-current", "page");
    }
  });
});

// FORMULÁRIOS DE CONTATO
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

btnAjuda.addEventListener("click", () => mostrarFormulario(formAjuda));
btnDuvidas.addEventListener("click", () => mostrarFormulario(formDuvidas));

// ETAPAS DO FORMULÁRIO DE AJUDA
const btnProximaEtapa = document.getElementById("btn-proxima-etapa");
const btnVoltar = document.getElementById("btn-voltar");
const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");

btnProximaEtapa.addEventListener("click", () => {
  if (validarEtapa1()) {
    step1.classList.remove("active");
    step2.classList.add("active");
  }
});

btnVoltar.addEventListener("click", () => {
  step2.classList.remove("active");
  step1.classList.add("active");
});

// MÁSCARAS
function mascara(formato, objeto) {
  const campo = objeto;
  let v = campo.value.replace(/\D/g, ""); // Remove tudo que não for número

  if (formato === "cpf") {
    v = v
      .replace(/^(\d{3})(\d)/, "$1.$2")
      .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1-$2");
  }

  if (formato === "celular") {
    v = v.replace(/^(\d{2})(\d)/, "($1) $2");
    // Adiciona o traço a partir do 7º número (DDD + 5 primeiros dígitos)
    if (v.length > 10) {
      v = v.replace(/(\d{5})(\d{1,4})/, "$1-$2");
    } else {
      v = v.replace(/(\d{4})(\d{1,4})/, "$1-$2");
    }
  }

  if (formato === "telefone") {
    v = v.replace(/^(\d{2})(\d)/, "($1) $2");
    if (v.length > 9) {
      v = v.replace(/(\d{4})(\d{1,4})/, "$1-$2");
    }
  }

  if (formato === "cep") {
    v = v.replace(/^(\d{5})(\d)/, "$1-$2");
  }

  campo.value = v;
}

function somenteNumeros(e) {
  const tecla = e.keyCode ? e.keyCode : e.which;
  if (
    (tecla > 47 && tecla < 58) ||
    (tecla > 95 && tecla < 106) ||
    tecla === 8 ||
    tecla === 9
  ) {
    return true;
  }
  e.preventDefault();
  return false;
}

// VALIDAÇÕES DE CAMPOS
function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, "");
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
  let resto = 11 - (soma % 11);
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(9))) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
  resto = 11 - (soma % 11);
  if (resto === 10 || resto === 11) resto = 0;
  return resto === parseInt(cpf.charAt(10));
}

function validarEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validarCEP(cep) {
  return /^\d{5}-?\d{3}$/.test(cep);
}

function validarTelefone(tel) {
  return /^\(\d{2}\)\s?\d{4,5}-\d{4}$/.test(tel);
}

// ETAPA 1 - Validação antes de avançar
function validarEtapa1() {
  const nome = document.getElementById("txtNome");
  const cpf = document.getElementById("txtCPF");
  const email = document.getElementById("txtEmail");
  const cep = document.getElementById("txtCEP");
  const celular = document.getElementById("telCelular");

  if (nome.value.trim().length < 3) {
    alert("Por favor, insira seu nome completo.");
    nome.focus();
    return false;
  }

  if (!validarCPF(cpf.value)) {
    alert("CPF inválido. Verifique e tente novamente.");
    cpf.focus();
    return false;
  }

  if (!validarEmail(email.value)) {
    alert("E-mail inválido.");
    email.focus();
    return false;
  }

  if (!validarCEP(cep.value)) {
    alert("CEP inválido. O formato correto é 00000-000.");
    cep.focus();
    return false;
  }

  if (!validarTelefone(celular.value)) {
    alert("Número de celular inválido. Use o formato (11) 91234-5678.");
    celular.focus();
    return false;
  }

  return true;
}

// FORMULÁRIO DE DÚVIDAS
formDuvidas.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome-duvidas");
  const email = document.getElementById("email-duvidas");
  const msg = document.getElementById("mensagem-duvidas");

  if (nome.value.trim().length < 3) {
    alert("Por favor, insira seu nome completo.");
    nome.focus();
    return;
  }

  if (!validarEmail(email.value)) {
    alert("E-mail inválido.");
    email.focus();
    return;
  }

  if (msg.value.trim().length < 10) {
    alert("A mensagem deve ter pelo menos 10 caracteres.");
    msg.focus();
    return;
  }

  alert("Mensagem enviada com sucesso!");
  formDuvidas.reset();
});

// ==============================
// FORMULÁRIO DE AJUDA
formAjuda.addEventListener("submit", (e) => {
  e.preventDefault();

  const dificuldades = document.getElementById("dificuldades");
  const acompanhamento = document.getElementById("acompanhamento");
  const tempo = document.getElementById("tempo");
  const origem = document.getElementById("origem");

  if (!acompanhamento.value) {
    alert("Por favor, selecione se possui acompanhamento odontológico.");
    acompanhamento.focus();
    return;
  }

  if (dificuldades.value.trim().length < 3) {
    alert("Descreva suas dificuldades.");
    dificuldades.focus();
    return;
  }

  if (!tempo.value) {
    alert("Selecione há quanto tempo sente os problemas.");
    tempo.focus();
    return;
  }

  if (!origem.value) {
    alert("Informe como conheceu a Turma do Bem.");
    origem.focus();
    return;
  }

  alert("Pedido de ajuda enviado com sucesso!");
  formAjuda.reset();
  step2.classList.remove("active");
  step1.classList.add("active");
});
