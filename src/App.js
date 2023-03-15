import './style.css';
import { FiSearch} from 'react-icons/fi';
import { useState } from 'react';

import api from './services/api';

function App() {

  const [input, setInput] = useState('78050110');
  const [cep, setCep] = useState({});

  async function handleSearch() {
    if (input === '') {
      alert('Preencha algum CEP')
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput('');
    } catch {
      alert('Ops. Erro ao pesquisar CEP');
    }
  }

  return (
    <div className="container">
      <h1 className='title'>Consulte CEP</h1>
      <div className='containerInput'>
        <input type="text" placeholder='Digite seu cep' value={input} onChange={(e) => setInput(e.target.value)} />
        <button className='buttonSearch' onClick={handleSearch}>
          <FiSearch size={25} color="FFF"/>
        </button>
      </div>
      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>Cep: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>{cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade}, {cep.uf}</span>
        </main>
      )}
    </div>
  );
}

export default App;