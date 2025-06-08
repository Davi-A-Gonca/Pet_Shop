import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Login from './Login';
import Produtos from './Products';
import Pedidos from './Shop';
import Pagamento from './Payment';

function App() {

  return (
    <div>
      <link rel="stylesheet" href="https://www.w3schools.com/w3css/5/w3.css"/>

      <Router>
        <nav className="w3-bar w3-purple">
          <div href="#" className="w3-bar-item w3-button">
            <Link to="/">Login</Link>
          </div>
          <div href="#" className="w3-bar-item w3-button">
            <Link to="/produtos">Produtos</Link>
          </div>
          <div href="#" className="w3-bar-item w3-button">
            <Link to="/pedidos">Pedidos</Link>
          </div>
          <div href="#" className="w3-bar-item w3-button">
            <Link to="/pagamento">Pagamento</Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/pagamento" element={<Pagamento />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
