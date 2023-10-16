let listaUsuarios = [];

const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const regexSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

/* Pelo menos 8 caracteres.
Pelo menos uma letra maiúscula.
Pelo menos uma letra minúscula.
Pelo menos um dígito (número). */

document.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  if (!email || !senha) {
    alert("Preencha todos os campos");
  } else {
    console.log(email);
    console.log(senha);
    console.log(listaUsuarios);

    const usuarioEncontrado = listaUsuarios.find(
      (usuario) => usuario.email === email && usuario.senha === senha
    );
    if (usuarioEncontrado) {
      alert("Redirecionando...");
      window.location.href = "home.html";
    } else {
      alert("Usuário não encontrado");
    }
  }
});

document.getElementById("cadastrar").addEventListener("click", cadastrar);

function cadastrar(evt) {
  evt.preventDefault();

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  if (!email || !senha) {
    alert("Preencha todos os campos");
  } else if (!regexEmail.test(email)) {
    alert("Insira um email válido");
  } else if (!regexSenha.test(senha)) {
    alert(
      "A senha deve ter no mínimo 8 caracteres, entre elas letras maiúsculas, mininúsculas e números"
    );
  } else {
    console.log("validou cadastrar");

    const usuarioEncontrado = listaUsuarios.find(
      (usuario) => usuario.email === email && usuario.senha === senha
    );
    const emailEncontrado = listaUsuarios.find(
      (usuario) => usuario.email === email
    );
    if (usuarioEncontrado) {
      alert("Usuario já cadastrado, redirecionando...");
      window.location.href = "home.html";
    } else if (emailEncontrado) {
      alert("Este cadastro já existe, insira sua senha");
    } else {
      fetch("http://localhost:3000/usuarios", {
        method: "POST",
        body: JSON.stringify({
          senha: senha,
          email: email,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok === false) {
            throw new Error();
          }
          return response.json;
        })
        .then(() => {
          alert("Cadastrado, redirecionando...");
          window.location.href = "home.html";
        })
        .catch((error) => {
          console.log(error);
          alert("errrrr");
        });
    }
  }
}
const carregarCadastros = () => {
  fetch("http://localhost:3000/usuarios")
    .then((response) => {
      if (response.ok === false) {
        throw new Error();
      }
      return response.json();
    })
    .then((cadastrosUsuarios) => {
      listaUsuarios = cadastrosUsuarios;
    })
    .catch((error) => {
      console.log("Falha ao iniciar reservas");
    });
};
window.onload = carregarCadastros;
