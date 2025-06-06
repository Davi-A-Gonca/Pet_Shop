import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Importe os componentes das suas páginas
import Login from './Login';
import Produtos from './Products';
import Pedidos from './Shop';
import Pagamento from './Payment';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/pagamento" element={<Pagamento />} />
      </Routes>
    </Router>
  );
}

export default App;