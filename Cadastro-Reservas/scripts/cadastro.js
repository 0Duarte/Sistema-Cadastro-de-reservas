const roomNumberField = document.getElementById("room-number");
const clientNameField = document.getElementById("input-name");
const dateInField = document.getElementById("input-date-in");
const dateOutField = document.getElementById("input-date-out");
const cpfField = document.getElementById("input-cpf");
const buttonRegister = document.getElementById("button-register");
const formRegister = document.getElementById("form-register");
let successMsg = document.getElementById("ok");

document
  .getElementById("form-register")
  .addEventListener("submit", bookingRegister);
document.getElementById("button-back").addEventListener("click", () => {
  window.location.href = "home.html";
});

function bookingRegister(evt) {
  evt.preventDefault();

  const number = roomNumberField.value;
  const name = clientNameField.value;
  const cpf = cpfField.value;
  const dateIn = dateInField.value;
  const dateOut = dateOutField.value;

  if (
    number === "" ||
    name === "" ||
    dateIn === "" ||
    dateOut === "" ||
    cpf === ""
  ) {
    alert("Preencha todos os campos");
  } else {
    fetch("http://localhost:3000/reservas", {
      method: "POST",
      body: JSON.stringify({
        numero_quarto: number,
        nome_cliente: name,
        cpf: cpf,
        data_entrada: dateIn,
        data_saida: dateOut,
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
        successMsg.innerText = "Reserva cadastrada";
        alert("Cadastrado");
      })
      .catch((error) => {
        console.log(error);
        alert("errrrr");
      });
  }
}
