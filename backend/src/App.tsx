//import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
//import heroImg from './assets/hero.png'
import './App.css'
import meunome from "./assets/forme"

function App() {

  return (
    <>
      <header>
        <div className="logo">SPORT-MAPS</div>
        <input className="search" placeholder="Buscar endereço, bairro ou cidade..."/> 
        <nav>
          <span>Explorar</span>
          <span>Favoritos</span>
          <span>Carrinho</span>
          <div className="user">
            <div className="avatar"></div>
            <span>Usuário</span>
          </div>
        </nav>
      </header>

      <div className="layout">

        <aside>
          <h3>Escolha sua Modalidade</h3>
          <div className="filters">
            <button className="filter-btn active">Skate</button>
            <button className="filter-btn">Corrida</button>
            <button className="filter-btn">Patins</button>
            <button className="filter-btn">Basquete</button>
          </div>

          <div className="list-header">
            <h3>Locais Próximos</h3>
            <a href="#">Ver em lista</a>
          </div>

          <div className="place-card">
            {/* <img src=""> */}
            <div className="place-info">
              <div className="place-tag">Skate</div>
              <div className="place-name">Nome do local</div>
              <div className="place-meta">Distância · Cidade</div>
            </div>
          </div>

          <div className="place-card">
            {/* <img src=""> */}
            <div className="place-info">
              <div className="place-tag">Corrida</div>
              <div className="place-name">Nome do local</div>
              <div className="place-meta">Distância · Cidade</div>
            </div>
          </div>
        </aside>

        <div className="map" id="map">
        </div>

      </div>
    </>
  )
}

export default App
