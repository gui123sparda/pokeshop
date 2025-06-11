async function fazerLogin() {
  const login = document.getElementById('login').value;
  const senha = document.getElementById('senha').value;

  const resposta = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ login, senha })
  });

  const dados = await resposta.json();
  alert(dados.message || dados.error);
}

async function cadastrarUsuario() {
  const nome = document.getElementById('nome').value;
  const endereco = document.getElementById('endereco').value;
  const email = document.getElementById('email').value;
  const login = document.getElementById('cadLogin').value;
  const senha = document.getElementById('cadSenha').value;
  const administrador = document.getElementById('admin').checked;

  const resposta = await fetch('/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, endereco, email, login, senha, administrador })
  });

  const dados = await resposta.json();
  alert(dados.message || dados.error);
}
