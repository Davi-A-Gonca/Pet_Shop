import './App.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = "http://10.4.230.10:8083/projeto/api/v1/user";
const SIGNIN = API_URL + "user";
const LOGIN = API_URL + "login";

function Login() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    password: ""});
  const [signin, setSignin] = useState(null);
  const [loginMessage, setLoginMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
  fetch(SIGNIN)
    .then((res) => res.json()) 
    .then((data) => setUsers(data))
    .catch((error) => console.error("Erro ao buscar usuários:", error)); // Adicionado tratamento de erro
  }, []);

  const handleLogin = async () => {
    const newUser = form;
    const method = "POST";

    setLoginMessage("");

    console.log(JSON.stringify(newUser));

    const response = await fetch(LOGIN, 
      {
        method,
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(newUser)
      }
    );

    console.log("Nome: " + newUser.name);
    
    try{
      if(response.ok){
        navigate('/produtos', { state: newUser.name });
      }else {
        console.error("Erro ao carregar usuários para login:", response.statusText);
        setLoginMessage(response.statusText);
        return;
      }
    }catch (e){
      console.error("Erro ao Efetuar Login:\n", e);
      setLoginMessage("Não foi possível conectar ao servidor. Verifique sua conexão ou a API.");
    }
  };

  const handleSignIn = async () => {
    const newUser = form;
    const method = "POST";

    const response = await fetch(SIGNIN, {
      method,
      headers: {"Content-Type" : "application/json"},
    });

    if(response.ok){
      setLoginMessage("AAAAAAAAAAAAAAAAA");
      setUsers(
        [...users, newUser]
      );

      setForm({name: "", password: ""}); 
    }else{
      console.error("Erro ao carregar usuários para login:", response);
      setLoginMessage(response);
    }
  };

  const alternateSignIn = async () => {
    if(!signin){
      setSignin(1);
    }else{
      setSignin(null);
    }
  };

  return (
    <div className='bg-dark'>

      <link href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css' rel='stylesheet'/>

      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" defer></script>

      <div className="container-fluid p-5 text-center">

        <p className='h1 text-white'>
          {signin ? "Cadastro" : "Login"}
        </p>

        <div className='container mt-3'>
          <div className="form-floating mb-3 mt-3">
            <input className="form-control" type='text' placeholder='Nome' value={form.name} onChange={(e) => setForm({...form, name: e.target.value})}/><br/>
            <label for="nome">Nome</label>
          </div>
          
          <div className="form-floating mb-3 mt-3">
            <input className="form-control" type='password' placeholder='password' value={form.password} onChange={(e) => setForm({...form, password: e.target.value})}/><br/>
            <p className='text-white' onClick={alternateSignIn}>{signin ? "Login" : "Inscreva-se"}</p>
            <label for="password">Senha</label>
          </div>
          
          <button button type="button" className="btn btn-primary" onClick={signin ? handleSignIn : handleLogin}>
            {signin ? "Cadastro" : "Login"}
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