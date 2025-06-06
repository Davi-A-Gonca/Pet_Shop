import './App.css';
import { useState, useEffect } from 'react';

const API_URL = "http://localhost:8083/projeto/api/v1/user";

function Login() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    password: ""});
  const [login, setLogin] = useState(null);
  const [loginMessage, setloginMessage] = useState("");

  useEffect(() => {
  fetch(API_URL)
    .then((res) => res.json()) 
    .then((data) => setUsers(data))
    .catch((error) => console.error("Erro ao buscar usuários:", error)); // Adicionado tratamento de erro
  }, []);

  const handleLogin = async () => {
    const newUser = form;
    const method = "POST";
    var currentUsers = [];

    setloginMessage("");

    const response = await fetch(API_URL, {
      method,
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify(newUser),
    });

    if(response.ok){
      currentUsers = await response.json();
      
    }else {
      console.error("Erro ao carregar usuários para login:", response.statusText);
      return;
    }
  };

  const handleSignIn = async () => {
    const newUser = form;
    const method = "GET";

    const response = await fetch(API_URL, {
      method,
      headers: {"Content-Type" : "application/json"},
    });

    if(response.ok){
      setUsers(
        [...users, newUser]
      );

      setForm({name: "", password: ""});
    }
  };

  return (
    <div className='bg-dark'>

      <link href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css' rel='stylesheet'/>

      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" defer></script>

      <div className="container-fluid p-5 text-center">

        <p className='h1 text-white'>
          {login ? "Login" : "Cadastro"}
        </p>

        <div className='container mt-3'>
          <div class="form-floating mb-3 mt-3">
            <input class="form-control" type='text' placeholder='Nome' value={form.nome} onChange={(e) => setForm({...form, nome: e.target.value})}/><br/>
            <label for="nome">Nome</label>
          </div>
          
          <div class="form-floating mb-3 mt-3">
            <input class="form-control" type='password' placeholder='password' value={form.password} onChange={(e) => setForm({...form, password: e.target.value})}/><br/>
            <label for="password">Senha</label>
          </div>
          
          <button button type="button" class="btn btn-primary" onClick={login ? handleSignIn : handleLogin}>
            {login ? "Cadastro" : "Login"}
          </button>
        </div>

        <p style={{ marginTop: '15px', color: loginMessage.includes('sucesso') ? 'green' : 'red' }}>
          {loginMessage}
        </p>

      </div>

    </div>
  );
}

export default Login;