import './App.css';
import { useState, useEffect } from 'react';

const API_URL = "http://localhost:8080/projeto/api/v1/product";

function Products() {
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    name: "",
    type: "",
    description: "",
    price: "",
    weight: "",
    availability: false,
  });

  const [editionId, setEditionId] = useState(null);

  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Erro ao buscar produtos: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
        setMessage("Erro ao carregar produtos. Verifique sua conexão ou a API.");
      }
    };

    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async () => {
    setMessage(""); // Limpa mensagens anteriores

    if (!form.name || !form.type || !form.description || form.price === "" || form.weight === "") {
      setMessage("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    if (isNaN(form.price) || isNaN(form.weight)) {
      setMessage("Preço e Peso devem ser números.");
      return;
    }

    const productToSave = { ...form };

    if (editionId) {
      productToSave.id = editionId;
    }

    const method = editionId ? "PUT" : "POST";
    const url = editionId ? `${API_URL}/${editionId}` : API_URL; 

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productToSave),
      });

      if (response.ok) {
        const savedProduct = await response.json(); 

        setProducts((prevProducts) =>
          editionId
            ? prevProducts.map((p) => (p.id === editionId ? savedProduct : p))
            : [...prevProducts, savedProduct] // Adiciona à lista
        );
        setMessage(`Produto ${editionId ? "atualizado" : "adicionado"} com sucesso!`);
        setEditionId(null); 
        setForm({ 
          name: "",
          type: "",
          description: "",
          price: "",
          weight: "",
          availability: false,
        });
      } else {
        const errorData = await response.json();
        setMessage(`Erro ao ${editionId ? "atualizar" : "adicionar"} produto: ${errorData.message || response.statusText}`);
        console.error(`Erro na requisição ${method}:`, response.statusText, errorData);
      }
    } catch (error) {
      setMessage("Erro de rede. Verifique sua conexão.");
      console.error("Erro de rede:", error);
    }
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditionId(product.id);
    setMessage(""); 
  };

  const handleDelete = async (id) => {
    setMessage(""); 

    if (!window.confirm("Tem certeza que deseja excluir este produto?")) {
      return; 
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (response.ok) {
        setProducts(products.filter((p) => p.id !== id)); 
        setMessage("Produto excluído com sucesso!");
      } else {
        const errorData = await response.json();
        setMessage(`Erro ao excluir produto: ${errorData.message || response.statusText}`);
        console.error("Erro ao excluir:", response.statusText, errorData);
      }
    } catch (error) {
      setMessage("Erro de rede ao excluir. Verifique sua conexão.");
      console.error("Erro de rede:", error);
    }
  };

  return (
    <div className="bg-dark min-vh-100">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" defer></script>

      <div className="container-fluid p-5 text-white text-center">
        <p className='h1'>{editionId ? "Atualização de Produto" : "Cadastro de Novo Produto"}</p>
        <p className='h5'>{editionId ? "Edite os detalhes do produto selecionado" : "Preencha os dados para adicionar um novo produto"}</p>

        <div className='container mt-4'>
          <div className="form-floating mb-3">
            <input
              className="form-control"
              type='text'
              placeholder='Nome do Produto'
              name='name'
              value={form.name}
              onChange={handleChange}
              id='productName'
              required
            />
            <label htmlFor="productName">Nome do Produto</label>
          </div>

          {/* Tipo do Produto */}
          <div className="form-floating mb-3">
            <input
              className="form-control"
              type='text'
              placeholder='Tipo (Ex: Eletrônico, Roupa, Alimento)'
              name='type'
              value={form.type}
              onChange={handleChange}
              id='productType'
              required
            />
            <label htmlFor="productType">Tipo</label>
          </div>

          <div className="form-floating mb-3">
            <textarea
              className="form-control"
              placeholder='Descrição do Produto'
              name='description'
              value={form.description}
              onChange={handleChange}
              id='productDescription'
              style={{ height: '100px' }}
              required
            ></textarea>
            <label htmlFor="productDescription">Descrição</label>
          </div>

          {/* Preço do Produto */}
          <div className="form-floating mb-3">
            <input
              className="form-control"
              type='number' // Tipo numérico para preço
              step="0.01" // Permite valores decimais
              placeholder='Preço'
              name='price'
              value={form.price}
              onChange={handleChange}
              id='productPrice'
              required
            />
            <label htmlFor="productPrice">Preço (R$)</label>
          </div>

          {/* Peso do Produto */}
          <div className="form-floating mb-3">
            <input
              className="form-control"
              type='number' // Tipo numérico para peso
              step="0.001" // Permite valores decimais para peso
              placeholder='Peso (kg)'
              name='weight'
              value={form.weight}
              onChange={handleChange}
              id='productWeight'
              required
            />
            <label htmlFor="productWeight">Peso (kg)</label>
          </div>

          {/* Disponibilidade */}
          <div className="form-check form-switch mb-3 text-start">
            <input
              className="form-check-input"
              type='checkbox'
              role='switch'
              name='availability'
              checked={form.availability}
              onChange={handleChange}
              id='productAvailability'
            />
            <label className="form-check-label text-white" htmlFor="productAvailability">Disponível para venda</label>
          </div>

          {/* Mensagens de feedback */}
          {message && (
            <div className={`alert ${message.includes('sucesso') ? 'alert-success' : 'alert-danger'} mt-3`} role="alert">
              {message}
            </div>
          )}

          {/* Botão de Ação */}
          <button type="button" className="btn btn-primary mt-3" onClick={handleSubmit}>
            {editionId ? "Atualizar Produto" : "Adicionar Produto"}
          </button>

          {editionId && ( // Botão para cancelar edição, visível apenas em modo de edição
            <button
              type="button"
              className="btn btn-secondary mt-3 ms-2"
              onClick={() => {
                setEditionId(null);
                setForm({ name: "", type: "", description: "", price: "", weight: "", availability: false });
                setMessage("");
              }}
            >
              Cancelar Edição
            </button>
          )}
        </div>
      </div>

      <div className='bg-dark p-5'>
        <h1 className='text-white text-center mb-4'>Lista de Produtos</h1>
        {products.length === 0 && !message.includes("Erro") ? (
            <p className="text-white text-center">Nenhum produto cadastrado.</p>
        ) : (
            <div className="table-responsive"> {/* Adicionado para tabelas em telas pequenas */}
                <table className="table table-dark table-striped table-hover"> {/* Melhorias visuais na tabela */}
                    <thead>
                        <tr className='text-white text-center'>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Tipo</th>
                            <th>Descrição</th>
                            <th>Preço</th>
                            <th>Peso</th>
                            <th>Disponibilidade</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.type}</td>
                                <td>{product.description}</td>
                                <td>R$ {parseFloat(product.price).toFixed(2)}</td> {/* Formata preço */}
                                <td>{parseFloat(product.weight).toFixed(3)} kg</td> {/* Formata peso */}
                                <td>{product.availability ? "✅ Sim" : "❌ Não"}</td>
                                <td>
                                    <div className="btn-group btn-group-sm" role="group" aria-label="Ações do Produto">
                                        <button className="btn btn-success" onClick={() => handleEdit(product)} title="Editar">
                                            <span role="img" aria-label="Editar">✏️</span>
                                        </button>
                                        <button className="btn btn-danger" onClick={() => handleDelete(product.id)} title="Excluir">
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

export default Products;