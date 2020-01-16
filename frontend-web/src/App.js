import React,{useState} from 'react';
import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';



// Componente: Bloco isolado de HTML
// Propriedades: Informações que um componente pai para para o componente filho
// Estado: informações mantidas pelo componente (lembrar: imutabilidade)

function App() {
 
  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form>
          <div className="input-block">
            <label htmlFor="github_username">Usuário do Github</label>
            <input name="github_username" id="github_username" required/>
          </div>

          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input name="techs" id="techs" required/>
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Longitude</label>
              <input name="latitude" id="latitude" required/>
            </div>
            
            <div className="input-block">
              <label htmlFor="longitude">Latitude</label>
              <input name="longitude" id="longitude" required/>
            </div>
          </div>

          <button type="submit">Salvar</button>
        </form>
      </aside>
      <main>
        <ul>
          <li className="dev-item">
            <header>
              <img src="https://avatars0.githubusercontent.com/u/46577395?s=460&v=4" alt="Gabriel Barreto"/>
              <div className="user-info">
                <strong>Gabriel Barreto</strong>
                <span>NodeJS, ReactJS</span>
              </div>
            </header>
            <p>Estudante de Engenharia da computação apaixonado por programação e principalmente por desenvolvimento web</p>
            <a href="https://github.com/GabrielDevLoper">Acessar Perfil no Github</a>
          </li>

          <li className="dev-item">
            <header>
              <img src="https://avatars0.githubusercontent.com/u/46577395?s=460&v=4" alt="Gabriel Barreto"/>
              <div className="user-info">
                <strong>Gabriel Barreto</strong>
                <span>NodeJS, ReactJS</span>
              </div>
            </header>
            <p>Estudante de Engenharia da computação apaixonado por programação e principalmente por desenvolvimento web</p>
            <a href="https://github.com/GabrielDevLoper">Acessar Perfil no Github</a>
          </li>

          <li className="dev-item">
            <header>
              <img src="https://avatars0.githubusercontent.com/u/46577395?s=460&v=4" alt="Gabriel Barreto"/>
              <div className="user-info">
                <strong>Gabriel Barreto</strong>
                <span>NodeJS, ReactJS</span>
              </div>
            </header>
            <p>Estudante de Engenharia da computação apaixonado por programação e principalmente por desenvolvimento web</p>
            <a href="https://github.com/GabrielDevLoper">Acessar Perfil no Github</a>
          </li>

          <li className="dev-item">
            <header>
              <img src="https://avatars0.githubusercontent.com/u/46577395?s=460&v=4" alt="Gabriel Barreto"/>
              <div className="user-info">
                <strong>Gabriel Barreto</strong>
                <span>NodeJS, ReactJS</span>
              </div>
            </header>
            <p>Estudante de Engenharia da computação apaixonado por programação e principalmente por desenvolvimento web</p>
            <a href="https://github.com/GabrielDevLoper">Acessar Perfil no Github</a>
          </li>
        </ul>
      </main>
    </div>
  );
}

export default App;
