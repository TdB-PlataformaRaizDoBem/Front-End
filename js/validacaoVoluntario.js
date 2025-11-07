document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form-voluntario");
  
  window.mascara = function (formato, campo) {
    if (!campo) return;
    let v = campo.value;

    if (formato === "cpf") {
      // aceita números e X/x
      v = v.replace(/[^\dXx]/g, "");
      v = v
        .replace(/^(\d{3})(\d)/, "$1.$2")
        .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})([\dXx]{1,2})$/, ".$1-$2");
      campo.value = v.slice(0, 14);
      return;
    }

    if (formato === "cep") {
      v = v.replace(/\D/g, "");
      v = v.replace(/^(\d{5})(\d)/, "$1-$2");
      campo.value = v.slice(0, 9);
      return;
    }

    if (formato === "celular" || formato === "telefone") {
      // formata fixo (8) ou celular (9) com DDD
      const nums = v.replace(/\D/g, "");
      if (nums.length <= 10) {
        // até 10 dígitos => formato de fixo (DD) 1234-5678
        let res = nums.replace(
          /^(\d{0,2})(\d{0,4})(\d{0,4}).*/,
          (m, p1, p2, p3) =>
            !p2 ? (p1 ? `(${p1}` : "") : `(${p1}) ${p2}${p3 ? "-" + p3 : ""}`
        );
        campo.value = res;
      } else {
        // >10 dígitos => celular com 5 dígitos no meio (DD) 91234-5678
        let res = nums.replace(
          /^(\d{0,2})(\d{0,5})(\d{0,4}).*/,
          (m, p1, p2, p3) =>
            !p2 ? (p1 ? `(${p1}` : "") : `(${p1}) ${p2}${p3 ? "-" + p3 : ""}`
        );
        campo.value = res;
      }
      return;
    }
  };

  // Bloqueio de caracteres não-numéricos (usado no onkeypress)
  window.somenteNumeros = function (e) {
    const tecla = e.keyCode ? e.keyCode : e.which;
    if (
      (tecla >= 48 && tecla <= 57) ||
      (tecla >= 96 && tecla <= 105) ||
      tecla === 8 ||
      tecla === 9 ||
      tecla === 46 ||
      (tecla >= 37 && tecla <= 40)
    ) {
      return true;
    }
    e.preventDefault();
    return false;
  };

  // Funções auxiliares (internas)
  function aplicarMascaraCPF(valor) {
    return valor
      .replace(/[^\dXx]/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})([\dXx]{1,2})$/, "$1-$2")
      .slice(0, 14);
  }

  function aplicarMascaraCEP(valor) {
    return valor
      .replace(/\D/g, "")
      .replace(/^(\d{5})(\d)/, "$1-$2")
      .slice(0, 9);
  }

  function aplicarMascaraTelefone(valor) {
    const numeros = valor.replace(/\D/g, "");
    if (numeros.length <= 10) {
      // fixo
      return numeros.replace(
        /^(\d{0,2})(\d{0,4})(\d{0,4}).*/,
        (m, p1, p2, p3) =>
          !p2 ? (p1 ? `(${p1}` : "") : `(${p1}) ${p2}${p3 ? "-" + p3 : ""}`
      );
    } else {
      // celular (com 5 no meio)
      return numeros.replace(
        /^(\d{0,2})(\d{0,5})(\d{0,4}).*/,
        (m, p1, p2, p3) =>
          !p2 ? (p1 ? `(${p1}` : "") : `(${p1}) ${p2}${p3 ? "-" + p3 : ""}`
      );
    }
  }

  // Se quiser aplicar máscaras por listener (além do inline), mantemos aqui:
  if (form) {
    form.addEventListener("input", (e) => {
      const t = e.target;
      if (!t) return;

      if (t.id === "txtCPF") t.value = aplicarMascaraCPF(t.value);
      if (t.id === "txtCEPResidencial") t.value = aplicarMascaraCEP(t.value);
      if (t.id === "txtCEPClinica") t.value = aplicarMascaraCEP(t.value);

      // ids possíveis para telefones/celular
      if (
        t.id === "txtTelefoneComercial" ||
        t.id === "celular" ||
        t.id === "txtCelular" ||
        t.id === "txtTelefone"
      ) {
        t.value = aplicarMascaraTelefone(t.value);
      }
    });
  }

  // VALIDAÇÕES AUXILIARES
  const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validarCEP = (cep) => /^\d{5}-\d{3}$/.test(cep);
  const validarTelefone = (tel) => /^\(\d{2}\)\s?\d{4,5}-\d{4}$/.test(tel);
  const validarCRO = (cro) => /^[A-Z]{2,3}\d{4,6}$/i.test(cro.trim());

  function validarCPF(cpf) {
    cpf = cpf.replace(/[^\dXx]+/g, "");
    if (/[Xx]/.test(cpf)) return true; // aceitar CPF que contenha X/x (casos especiais)
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

  // VALIDAÇÃO PRINCIPAL NO SUBMIT
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nome = document.getElementById("txtNome");
      const nomeSocial = document.getElementById("txtNomeSocial");
      const dataNasc = document.getElementById("DataNascimento");
      const cpf = document.getElementById("txtCPF");
      const rg = document.getElementById("txtRG");
      const email = document.getElementById("txtEmail");
      const cro = document.getElementById("txtCRO");

      // Endereço residencial
      const cepResidencial = document.getElementById("txtCEPResidencial");
      const cidadeResidencial = document.getElementById("txtCidadeResidencial");
      const estadoResidencial = document.getElementById("txtEstadoResidencial");

      // Endereço clínico
      const cepClinica = document.getElementById("txtCEPClinica");
      const cidadeClinica = document.getElementById("txtCidadeClinica");
      const estadoClinica = document.getElementById("txtEstadoClinica");
      const telComercial =
        document.getElementById("txtTelefoneComercial") ||
        document.getElementById("celular");

      // Preferências
      const tipoAtuacao = document.getElementById("tipoAtuacao");
      const publico = document.getElementById("publicoAtendido");
      const qtdCriancas = document.getElementById("qtdCriancas");
      const qtdMulheres = document.getElementById("qtdMulheres");

      // Regras
      if (!nome || nome.value.trim().length < 3)
        return alert("Digite seu nome completo.");
      if (!nomeSocial || nomeSocial.value.trim().length < 2)
        return alert("Digite como gostaria de ser chamado.");
      if (!dataNasc || !dataNasc.value)
        return alert("Informe sua data de nascimento.");
      if (!cpf || !validarCPF(cpf.value))
        return alert("CPF inválido. Verifique o número.");
      if (!rg || rg.value.trim().length < 5) return alert("RG inválido.");
      if (!email || !validarEmail(email.value))
        return alert("E-mail inválido. Verifique o formato.");

      if (!cro || !validarCRO(cro.value))
        return alert("CRO inválido. Exemplo: SP12345.");

      if (!cepResidencial || !validarCEP(cepResidencial.value))
        return alert("CEP residencial inválido.");
      if (!cidadeResidencial || cidadeResidencial.value.trim().length < 2)
        return alert("Informe a cidade do endereço residencial.");
      if (!estadoResidencial || estadoResidencial.value.trim().length < 2)
        return alert("Informe o estado do endereço residencial.");

      if (!cepClinica || !validarCEP(cepClinica.value))
        return alert("CEP da clínica inválido.");
      if (!cidadeClinica || cidadeClinica.value.trim().length < 2)
        return alert("Informe a cidade do endereço da clínica.");
      if (!estadoClinica || estadoClinica.value.trim().length < 2)
        return alert("Informe o estado do endereço da clínica.");

      if (!telComercial || !validarTelefone(telComercial.value))
        return alert("Telefone comercial inválido. Ex: (11) 2345-6789.");

      if (!tipoAtuacao || !tipoAtuacao.value)
        return alert("Selecione o tipo de atuação.");
      if (!publico || !publico.value)
        return alert("Selecione o público que deseja atender.");
      if (!qtdCriancas || qtdCriancas.value === "" || qtdCriancas.value < 0)
        return alert("Informe quantas crianças/jovens deseja atender.");
      if (!qtdMulheres || qtdMulheres.value === "" || qtdMulheres.value < 0)
        return alert("Informe quantas mulheres deseja atender.");

      // sucesso
      alert("Cadastro enviado com sucesso!");
      form.reset();
    });
  }
});
