let dadosReserva = [];

document.getElementById("logout").addEventListener("click", () => {
  window.location.href = "index.html";
});
document.getElementById("cadastro").addEventListener("click", () => {
  window.location.href = "cadastro.html";
});

function gerarLinhasTabela() {
  dadosReserva.map((reserva) => {
    const tr = document.createElement("tr");
    tr.setAttribute("id", reserva.id);

    const tdNumeroQuarto = document.createElement("td");
    tdNumeroQuarto.innerHTML = reserva.numero_quarto;
    tr.appendChild(tdNumeroQuarto);

    const tdNomeCliente = document.createElement("td");
    tdNomeCliente.innerHTML = reserva.nome_cliente;
    tr.appendChild(tdNomeCliente);

    const tdCpfCliente = document.createElement("td");
    tdCpfCliente.innerHTML = reserva.cpf;
    tr.appendChild(tdCpfCliente);

    const tdData = document.createElement("td");
    tdData.innerHTML = `${reserva.data_entrada} - ${reserva.data_saida}`;
    tr.appendChild(tdData);

    const tdAcoes = document.createElement("td");

    const botaoDeletar = document.createElement("button");
    botaoDeletar.innerHTML = "Deletar";
    botaoDeletar.addEventListener("click", () => deletarItem(reserva.id));
    tdAcoes.appendChild(botaoDeletar);
    tr.appendChild(tdAcoes);
    document.getElementById("corpo-tabela").appendChild(tr);
  });
}

function deletarItem(id) {
  fetch(`http://localhost:3000/reservas/${id}`, {
    method: "DELETE",
  })
    .then(() => {
      alert("Deletado com sucesso");
      document.getElementById(id).remove();
    })
    .catch((error) => {
      alert("Erro ao deletar reserva");
    });
}

const pegarReservas = () => {
  fetch("http://localhost:3000/reservas")
    .then((response) => {
      if (response.ok === false) {
        throw new Error();
      }
      return response.json();
    })
    .then((reserva) => {
      dadosReserva = reserva;
      gerarLinhasTabela();
    })
    .catch((error) => {
      console.log("Falha ao iniciar reservas");
    });
};

window.onload = pegarReservas;
