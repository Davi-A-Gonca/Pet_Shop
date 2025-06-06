import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Importe os componentes das suas páginas
import Login from './Login';
import Produtos from './Products';
import Pedidos from './Shop';
import Pagamento from './Payment';

// Componente da Página Inicial
const HomePage = () => (
  <div>
    <h1>Bem-vindo à Loja Online!</h1>
    <p>Escolha uma opção:</p>
    <nav>
      <ul>
        <li>
          <Link to="/login">Ir para Login</Link>
        </li>
        <li>
          <Link to="/produtos">Ver Produtos</Link>
        </li>
        <li>
          <Link to="/pedidos">Meus Pedidos</Link>
        </li>
        <li>
          <Link to="/pagamento">Fazer Pagamento</Link>
        </li>
      </ul>
    </nav>
  </div>
);

function App() {
  return (
    <Router>
      <div style={{ padding: '20px' }}>
        <Routes>
          {/* Rota para a Página Inicial */}
          <Route path="/" element={<HomePage />} />

          {/* Rotas para as outras páginas */}
          <Route path="/login" element={<Login />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/pagamento" element={<Pagamento />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;