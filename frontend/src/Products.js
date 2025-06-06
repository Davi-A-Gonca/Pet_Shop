import './App.css';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const API_URL = "http://localhost:8080/projeto/api/v1/dogFood";
const ORDER = "http://localhost:8082/projeto/api/v1/order;";

function Products() {
  const location = useLocation();
  const dadosRecebidos = location.state;

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

  const [cart, setCart] = useState([]);

  const navigate = useNavigate();


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

  const addCart = async(product) => {
    const existingItem = cart.find(item => item.product.id === product.id);

    if (existingItem) {
      setCart(
        cart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
      setMessage(`Sucesso Mais um(a) ${product.name} adicionado(a) ao carrinho!`);
    } else {
      setCart([...cart, { product: product, quantity: 1 }]);
      setMessage(`Sucesso ${product.name} adicionado(a) ao carrinho!`);
    }
  };

  const removeCart = async(productId) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === productId);

      if (existingItem.quantity > 1) {
        // Se a quantidade for maior que 1, apenas diminui
        return prevCart.map(item =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        // Se a quantidade for 1, remove o item completamente
        setMessage(`Item removido do carrinho!`);
        return prevCart.filter(item => item.product.id !== productId);
      }
    });
  };

  const removeAllFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
    setMessage(`Todos os itens deste tipo foram removidos do carrinho!`);
  };

  // Calcular o total de produtos no carrinho
  const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  // Calcular o preço total do carrinho
  const totalPriceOfCart = cart.reduce((total, item) => total + (parseFloat(item.product.price) * item.quantity), 0);

  // Função para finalizar a compra e navegar para a página de Pagamento
  const handleCheckout = async () => { // Torne a função assíncrona
  if (cart.length === 0) {
    setMessage("Seu carrinho está vazio. Adicione produtos antes de finalizar a compra.");
    return;
  }

  // Prepara os dados para o POST na API de Ordem
  const orderData = {
    // Certifique-se de que 'username' está definido no seu componente (ex: de um estado ou contexto de usuário logado)
    nameOfCustomer: dadosRecebidos, // Use 'username' se estiver disponível, senão "Convidado"
    totalProducts: totalItemsInCart,
    totalPrice: parseFloat(totalPriceOfCart).toFixed(2) // Garante 2 casas decimais para o backend
  };

  console.log(orderData);

  setMessage("Processando sua compra..."); // Feedback imediato ao usuário

  try {
    const response = await fetch(ORDER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Se sua API de ordem exigir autenticação (ex: token JWT), adicione aqui:
        // 'Authorization': `Bearer ${seuTokenDeAutenticacao}`,
      },
      body: JSON.stringify(orderData), // Envia os dados da ordem como JSON
    });

    if (response.ok) {
      // Compra finalizada com sucesso!
      const orderConfirmation = await response.json(); // Pega a resposta do backend (ex: ID da ordem)
      console.log("Ordem criada com sucesso:", orderConfirmation);

      setMessage("Compra finalizada com sucesso! Redirecionando para o pagamento.");
      // Opcional: Você pode passar o ID da ordem para a próxima página, se precisar
      navigate('/pagamento', { 
        state: {
          name: dadosRecebidos,
          quantity: totalItemsInCart,
          price: parseFloat(totalPriceOfCart).toFixed(2) 
        } 
      });
      setCart([]); // Limpa o carrinho após a compra
    } else {
      // Houve um erro na API
      const errorData = await response.json().catch(() => null); // Tenta ler JSON de erro
      const errorMessage = errorData?.message || response.statusText || "Erro desconhecido ao finalizar a compra.";
      console.error("Erro ao criar ordem:", response.status, response.statusText, errorData);
      setMessage(`Erro ao finalizar a compra: ${errorMessage}`);
    }
  } catch (error) {
    // Erros de rede (servidor offline, CORS, etc.)
    console.error("Erro de rede ao finalizar a compra:", error);
    setMessage("Não foi possível conectar ao servidor para finalizar a compra. Tente novamente.");
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
                          <th>Nome</th>
                          <th>Tipo</th>
                          <th>Descrição</th>
                          <th>Preço</th>
                          <th>Peso</th>
                          <th>Disponibilidade</th>
                          <th>Ações</th>
                          <th>Comprar</th>
                      </tr>
                  </thead>
                  <tbody>
                      {products.map((product) => (
                          <tr key={product.id}>
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
                              <td>
                                <button className="btn btn-info" onClick={() => addCart(product)} >
                                  🛒 Add
                                </button><br/>
                                <button className="btn btn-danger" onClick={() => removeCart(product.id)} >
                                  🛒 Remover
                                </button>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
        )}
      </div>

      <div className='container mt-5 text-white'>
        <h2 className='text-center mb-4'>Seu Carrinho de Compras ({totalItemsInCart} itens)</h2>
        {cart.length === 0 ? (
          <p className="text-center">O carrinho está vazio. Adicione alguns produtos!</p>
        ) : (
          <div>
            <div className="table-responsive">
                <table className="table table-dark table-striped table-hover align-middle">
                    <thead>
                        <tr className='text-center'>
                            <th>Produto</th>
                            <th>Preço Unit.</th>
                            <th>Quantidade</th>
                            <th>Subtotal</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map(item => (
                            <tr key={item.product.id}>
                                <td>{item.product.name}</td>
                                <td>R$ {parseFloat(item.product.price).toFixed(2)}</td>
                                <td>
                                    <div className="d-flex justify-content-center align-items-center">
                                        <button className="btn btn-secondary btn-sm me-2" onClick={() => removeCart(item.product.id)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button className="btn btn-secondary btn-sm ms-2" onClick={() => addCart(item.product)}>+</button>
                                    </div>
                                </td>
                                <td>R$ {(parseFloat(item.product.price) * item.quantity).toFixed(2)}</td>
                                <td>
                                    <button className="btn btn-danger btn-sm" onClick={() => removeAllFromCart(item.product.id)} title="Remover todos deste tipo">
                                        Remover
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="text-end mt-4">
              <h4>Total do Carrinho: <span className="text-success">R$ {totalPriceOfCart.toFixed(2)}</span></h4>
              <button className="btn btn-primary btn-lg mt-3" onClick={handleCheckout}>
                Finalizar Compra ({totalItemsInCart} itens)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;