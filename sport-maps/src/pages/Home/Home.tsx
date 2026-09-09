import { useState } from "react";

export default function Home() {
    const [modalidade, setModalidade] = useState("Skate");
    
    const locais = [
        {
            modalidade: "Skate",
            nome: "Pista de Skate Vila Bocaina",
            distancia: "A 450 m de você",
            cidade: "Mauá, SP",
            nota: "4.8",
            imagem:
            "https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?auto=format&fit=crop&w=300&q=80",
        },
    {
      modalidade: "Corrida",
      nome: "Parque Linear do Guaíba",
      distancia: "A 1.2 km de você",
      cidade: "Mauá, SP",
      nota: "4.5",
      imagem:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=300&q=80",
    },
];

    return(
<main className="layout">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <section>
            <h3>Escolha sua Modalidade</h3>

            <div className="filters">
              {["Skate", "Corrida", "Patins", "Basquete"].map((item) => (
                <button
                  key={item}
                  className={`filter-btn ${
                    modalidade === item ? "active" : ""
                  }`}
                  onClick={() => setModalidade(item)}
                >
                  <span className="filter-icon">
                    {item === "Skate" && "●"}
                    {item === "Corrida" && "⌁"}
                    {item === "Patins" && "▥"}
                    {item === "Basquete" && "◉"}
                  </span>

                  {item}
                </button>
              ))}
            </div>
          </section>

          <div className="divider" />

          {/* LISTA */}
          <section>
            <div className="list-header">
              <h3>Locais Próximos</h3>
              <a href="#lista">Ver em lista</a>
            </div>

            <div className="places">
              {locais.map((local, index) => (
                <div className="place-card" key={index}>
                  <img src={local.imagem} alt={local.nome} />

                  <div className="place-info">
                    <div className="place-top">
                      <span className="place-tag">
                        {local.modalidade}
                      </span>

                      <span className="rating">
                        ★ {local.nota}
                      </span>
                    </div>

                    <div className="place-name">{local.nome}</div>

                    <div className="place-meta">
                      <span>⌖</span>
                      {local.distancia} · {local.cidade}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </aside>

        {/* MAPA */}
        <section className="map">
          {/* Ruas */}
          <div className="road road-horizontal road-1" />
          <div className="road road-horizontal road-2" />
          <div className="road road-vertical road-1-v" />
          <div className="road road-vertical road-2-v" />

          {/* Área azul */}
          <div className="water" />

          {/* Áreas verdes */}
          <div className="park park-1" />
          <div className="park park-2" />

          {/* Marcador principal */}
          <div className="map-marker main-marker">
            <span>〽</span>
          </div>

          {/* Outros marcadores */}
          <div className="map-marker secondary-marker marker-1">
            <span>×</span>
          </div>

          <div className="map-marker secondary-marker marker-2">
            <span>×</span>
          </div>
        </section>
      </main>
)}