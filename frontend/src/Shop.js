import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';

const API_URL = "http://10.4.230.10:8081/projeto/api/v1/payment";

function Shop() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    nameOfCustomer: "",
    totalProducts: 0,
    totalPrice: 0.0
  });
  const [editionId, setEditionId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await fetch(API_URL);
          if (!response.ok) {
            // Se a resposta não for OK (ex: 404, 500), lança um erro
            throw new Error(`Erro ao carregar usuários: ${response.status} ${response.statusText}`);
          }
          const data = await response.json();
          setItems(data); // Armazena a lista de usuários no estado
          console.log("Usuários carregados com sucesso.");
        } catch (error) {
          console.error("Erro de rede ou API ao carregar usuários:", error);
          setMessage("Erro ao carregar dados dos usuários. Tente novamente mais tarde.");
        }
      };
  
      fetchUsers(); // Chama a função para buscar os usuários
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm({
      ...form,
      [name]: type === 'number' ? parseFloat(value) : value, // Converte para número se for input type="number"
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede o recarregamento da página
    setMessage(""); // Limpa mensagens anteriores

    // Validação básica do formulário
    if (!form.nameOfCustomer || isNaN(form.totalProducts) || isNaN(form.totalPrice) || form.totalProducts < 0 || form.totalPrice < 0) {
      setMessage("Por favor, preencha todos os campos corretamente. Total de Produtos e Preço Total devem ser números positivos.");
      return;
    }

    const paymentToSave = { ...form };
    // Se sua API espera 'totalPrice' como String (para BigDecimal no backend), use toFixed(2)
    // Caso contrário, se a API espera um Number diretamente, remova o .toFixed(2)
    paymentToSave.totalPrice = parseFloat(form.totalPrice).toFixed(2);

    const method = editionId ? "PUT" : "POST";
    const url = editionId ? `${API_URL}/${editionId}` : API_URL;

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentToSave),
      });

      if (response.ok) {
        const savedPayment = await response.json(); // Pega o pagamento retornado pela API (com ID)

        setItems((prevPayments) =>
          editionId
            ? prevPayments.map((p) => (p.id === editionId ? savedPayment : p)) // Atualiza na lista
            : [...prevPayments, savedPayment] // Adiciona à lista
        );
        setMessage(`Pagamento ${editionId ? "atualizado" : "adicionado"} com sucesso!`);
        setEditionId(null); // Sai do modo de edição
        setForm({ // Reseta o formulário
          nameOfCustomer: "",
          totalProducts: 0,
          totalPrice: 0.0,
        });
      } else {
        const errorData = await response.json();
        setMessage(`Erro ao ${editionId ? "atualizar" : "adicionar"} pagamento: ${errorData.message || response.statusText}`);
        console.error(`Erro na requisição ${method}:`, response.statusText, errorData);
      }
    } catch (error) {
      setMessage("Erro de rede. Verifique sua conexão.");
      console.error("Erro de rede:", error);
    }
  };

  const handleEdit = (payment) => {
    // Garante que os valores numéricos são números ao carregar no formulário
    setForm({
      ...payment,
      totalProducts: parseFloat(payment.totalProducts),
      totalPrice: parseFloat(payment.totalPrice),
    });
    setEditionId(payment.id);
    setMessage(""); // Limpa mensagens
  };

  const handleDelete = async (id) => {
    setMessage(""); // Limpa mensagens

    if (!window.confirm("Tem certeza que deseja excluir este pagamento?")) {
      return; // Cancela se o usuário não confirmar
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (response.ok) {
        setItems(items.filter((p) => p.id !== id)); // Remove da lista local
        setMessage("Pagamento excluído com sucesso!");
      } else {
        const errorData = await response.json();
        setMessage(`Erro ao excluir pagamento: ${errorData.message || response.statusText}`);
        console.error("Erro ao excluir:", response.statusText, errorData);
      }
    } catch (error) {
      setMessage("Erro de rede ao excluir. Verifique sua conexão.");
      console.error("Erro de rede:", error);
    }
  };

  return (
    <div className="bg-dark min-vh-100 pb-5"> {/* min-vh-100 para ocupar a altura total da tela */}
      {/* Links para Bootstrap CSS e JS (melhor incluir no index.html ou como dependência global) */}
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" defer></script>

      <div className="container-fluid p-5 text-white text-center">
        <h1 className='display-5'>{editionId ? "Atualização de Pagamento" : "Registro de Novo Pagamento"}</h1>
        <p className='lead'>{editionId ? "Edite os detalhes do pagamento selecionado" : "Preencha os dados para registrar um novo pagamento"}</p>

        <form onSubmit={handleSubmit} className='container mt-4 bg-dark text-white p-4 rounded shadow'>
          {/* Nome do Cliente */}
          <div className="form-floating mb-3">
            <input
              className="form-control"
              type='text'
              placeholder='Nome do Cliente'
              name='nameOfCustomer'
              value={form.nameOfCustomer}
              onChange={handleChange}
              id='nameOfCustomer'
              required
            />
            <label htmlFor="nameOfCustomer">Nome do Cliente</label>
          </div>

          {/* Total de Produtos */}
          <div className="form-floating mb-3">
            <input
              className="form-control"
              type='number'
              placeholder='Total de Produtos'
              name='totalProducts'
              value={form.totalProducts}
              onChange={handleChange}
              id='totalProducts'
              required
              min="0"
            />
            <label htmlFor="totalProducts">Total de Produtos</label>
          </div>

          {/* Preço Total */}
          <div className="form-floating mb-3">
            <input
              className="form-control"
              type='number'
              step="0.01" // Permite duas casas decimais
              placeholder='Preço Total'
              name='totalPrice'
              value={form.totalPrice}
              onChange={handleChange}
              id='totalPrice'
              required
              min="0"
            />
            <label htmlFor="totalPrice">Preço Total (R$)</label>
          </div>

          {/* Mensagens de feedback */}
          {message && (
            <div className={`alert ${message.includes('sucesso') ? 'alert-success' : 'alert-danger'} mt-3`} role="alert">
              {message}
            </div>
          )}

          {/* Botões de Ação */}
          <div className="d-grid gap-2 d-md-flex justify-content-md-center mt-3">
            <button type="submit" className="btn btn-primary btn-lg">
              {editionId ? "Atualizar Pagamento" : "Registrar Pagamento"}
            </button>
            {editionId && (
              <button
                type="button"
                className="btn btn-secondary btn-lg"
                onClick={() => {
                  setEditionId(null);
                  setForm({ nameOfCustomer: "", totalProducts: 0, totalPrice: 0.0 });
                  setMessage("");
                }}
              >
                Cancelar Edição
              </button>
            )}
          </div>
        </form> 
      </div>

      <div className='container mt-5'>
        <h2 className='text-white text-center mb-4'>Lista de Pagamentos</h2>
        {items.length === 0 && !message.includes("Erro ao carregar") ? (
            <p className="text-white text-center">Nenhum pagamento registrado.</p>
        ) : (
            <div className="table-responsive">
                <table className="table table-dark table-striped table-hover align-middle">
                    <thead>
                        <tr className='text-center'>
                            <th>ID</th>
                            <th>Cliente</th>
                            <th>Qtd. Prod.</th>
                            <th>Preço Total</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((payment) => (
                            <tr key={payment.id} className="text-center">
                                <td>{payment.id}</td>
                                <td>{payment.nameOfCustomer}</td>
                                <td>{payment.totalProducts}</td>
                                <td>R$ {parseFloat(payment.totalPrice).toFixed(2)}</td> {/* Formata para 2 casas decimais */}
                                <td>
                                    <div className="btn-group btn-group-sm" role="group">
                                        <button className="btn btn-success" onClick={() => handleEdit(payment)} title="Editar">
                                            <span role="img" aria-label="Editar">✏️</span>
                                        </button>
                                        <button className="btn btn-danger" onClick={() => handleDelete(payment.id)} title="Excluir">
                                            <span role="img" aria-label="Excluir">🗑️</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}
      </div>
    </div>
  );
}

export default Shop;