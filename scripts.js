/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/pessoas';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      limparDados()
      data.pessoas.forEach(pessoa => insertList(pessoa.nome, pessoa.cpf, pessoa.telefone))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()


/*
  --------------------------------------------------------------------------------------
  Função para colocar uma pessoa na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postPessoa = async (inputNome, inputCPF, inputTelefone) => {
  const formData = new FormData();
  formData.append('nome', inputNome);
  formData.append('cpf', inputCPF);
  formData.append('telefone', inputTelefone);

  let url = 'http://127.0.0.1:5000/pessoa';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada pessoa da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}

/*
  --------------------------------------------------------------------------------------
  Função para remover uma pessoa da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomePessoa = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove()
        deletePessoa(nomePessoa)
        alert("Removido!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar uma pessoa da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deletePessoa = (pessoa) => {
  console.log(pessoa)
  let url = 'http://127.0.0.1:5000/pessoa?nome=' + pessoa;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para bucar uma pessoa da lista
  --------------------------------------------------------------------------------------
*/
function buscarPessoa() {
  let input = document.querySelectorAll("#getNome");
  let pessoa
  for (let k = 0; k < input.length; k++) {
    pessoa = input[k].value;           // Salva o valor do campo aqui         }
  }

  let url = 'http://127.0.0.1:5000/pessoa?nome=' + pessoa;
  fetch(url, {
    method: 'get'
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log(data.nome);
      limparDados();
      insertList(data.nome, data.cpf, data.telefone);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function limparDados() {
  var table = document.getElementById('myTable');
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar uma nova pessoa, seu cpf e telefone
  --------------------------------------------------------------------------------------
*/
const newPessoa = () => {
  let inputNome = document.getElementById("newNome").value;
  let inputCPF = document.getElementById("newCPF").value;
  let inputTelefone = document.getElementById("newTelefone").value;

  if (inputNome === '') {
    alert("Escreva o nome de uma pessoal!");
  } else if (isNaN(inputCPF) || isNaN(inputTelefone)) {
    alert("CPF e telefone precisa ser somente números!");
  } else {
    insertList(inputNome, inputCPF, inputTelefone)
    postPessoa(inputNome, inputCPF, inputTelefone)
    alert("Pessoa adicionada!")
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir pessoas na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (cpf, nome, telefone) => {
  var pessoa = [cpf, nome, telefone]
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < pessoa.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = pessoa[i];
  }
  insertButton(row.insertCell(-1))
  document.getElementById("newCPF").value = "";
  document.getElementById("newNome").value = "";
  document.getElementById("newTelefone").value = "";

  removeElement()
}