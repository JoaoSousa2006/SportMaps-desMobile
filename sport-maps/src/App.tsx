import "./App.css";
import "./pages/Home/Home"
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from "./pages/Home/Home";


function App() {

  return (
    <div className="app">
      {/* HEADER */}
      <header className="header">
        <div className="logo">
          <div className="logo-icon">⌾</div>
          <span>SPORT-MAPS</span>
        </div>

        <div className="search-container">
          <span className="search-icon">⌕</span>

          <input
            className="search"
            placeholder="Buscar endereço, bairro ou cidade..."
          />

          <span className="search-location">⌖</span>
        </div>

        <nav className="nav">
          <div className="nav-item active">
            <span>⌾</span>
            Explorar
          </div>

          <div className="nav-item">
            <span>♡</span>
            Favoritos
          </div>

          <div className="nav-item cart">
            <span>🛒</span>
            <small>3</small>
            Carrinho
          </div>

          <div className="user">
            <div className="avatar">LP</div>

            <div className="user-info">
              <strong>Lucas Pereira</strong>
              <span>Atleta Bronze</span>
            </div>
          </div>
        </nav>
      </header>

      {/* CONTEÚDO */}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/sobre" element={<Sobre />} /> */}
      </Routes>

    </div>
  );
}

export default App;
