import React,{useState, useEffect} from 'react';
import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';
import api from './services/api';
import DevItem from './components/DevItem';
import DevForm from './components/DevForm';



// Componente: Bloco isolado de HTML
// Propriedades: Informações que um componente pai para para o componente filho
// Estado: informações mantidas pelo componente (lembrar: imutabilidade)

function App() {
  const [devs, setDevs] = useState([]);

  //Comando faz com que carreguem os usuarios cadastrados apenas uma vez.
  useEffect(() => {
    async function loadDevs(){
      const response = await api.get('/listarDevs');
      setDevs(response.data);
    }

    loadDevs();
  },[]);
 
  async function handleAddDev(data){
    const response = await api.post('/addDevs', data);
    console.log(response.data);

    //Fazendo uma adição no array, para que os devs se atualizem automaticamente
    //ao salvar
    setDevs([...devs, response.data]);
  }
  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}/>
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev}/>
          ))}
         
        </ul>
      </main>
    </div>
  );
}

export default App;
