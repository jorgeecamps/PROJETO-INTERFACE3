import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './style.css';
import api from './services/api';


function App() {
  const [input, setInput] = useState('');
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch(event) {
    event.preventDefault();

    if (input === '') {
      alert("Preencha o campo");
      return;
    }

    try {
      setLoading(true);

      const response = await api.get(`search.php?f=${input}`);

      setCocktails(response.data.drinks || []);
      setInput('');
    } catch {
      alert("Ops, erro ao buscar");
      setInput('');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador de Coquetéis</h1>

      <form className='containerInput' onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Digite uma letra para buscar cocktails.."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="buttonSearch" type='submit'>
          <FiSearch size={25} color='#FFF' />
        </button>
      </form>

      <main className='main'>
        {loading ? (
          <p>Buscando Coquetéis...</p>
        ) : (
          <ul>
            {cocktails.map(cocktail => (
              <li key={cocktail.idDrink}>
                <div className="header">
                  <i><FiSearch size={25} color='#FFF' /></i>
                  <h2>{cocktail.strDrink}</h2>
                </div>
                <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
                <p>Categoria: {cocktail.strCategory}</p>
                <p>Tipo: {cocktail.strAlcoholic}</p>
                <p>Copo: {cocktail.strGlass}</p>
                <p>Instruções: {cocktail.strInstructions}</p>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

export default App;
