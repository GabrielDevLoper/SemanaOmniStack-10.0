import React,{useState} from 'react';


// Componente: Bloco isolado de HTML
// Propriedades: Informações que um componente pai para para o componente filho
// Estado

function App() {
  const [counter, setCounter] = useState(0);

  function incrementCounter(){
    setCounter(counter+1);
  }


  return (
    <>
      <h1>Contador: {counter}</h1>
      <button onClick={incrementCounter}>Incrementar</button>
    </>
  );
}

export default App;
