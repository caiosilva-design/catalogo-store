"use client";

import { useEffect, useState } from "react";

type Variacao = {
  tamanho: string;
  disponivel: boolean;
};

type Produto = {
  id: number;
  nome: string;
  imagem: string;
  variacoes?: Variacao[];
};

export default function Home() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://cs-store-api-production.up.railway.app/produtos")
      .then((res) => res.json())
      .then((data) => {
        setProdutos(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const produtosFiltrados = produtos.filter((p) =>
    p.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const compartilhar = (produto: Produto) => {
    const texto = `Olha esse produto 👇\n${produto.nome}`;
    const url = `https://wa.me/?text=${encodeURIComponent(texto)}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #F7F4EF;
          font-family: 'DM Sans', sans-serif;
          color: #1a1714;
          min-height: 100vh;
        }

        .page-wrapper {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 20px 80px;
        }

        /* HEADER */
        .site-header {
          padding: 52px 0 40px;
          border-bottom: 1px solid #d9d3ca;
          margin-bottom: 48px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          text-align: center;
          position: relative;
        }
        .site-header::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 50%;
          transform: translateX(-50%);
          width: 56px;
          height: 2px;
          background: #b8976a;
        }
        .brand-eyebrow {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #b8976a;
        }
        .brand-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(44px, 9vw, 76px);
          font-weight: 300;
          letter-spacing: -1px;
          line-height: 1;
          color: #1a1714;
        }
        .brand-title em {
          font-style: italic;
        }
        .brand-subtitle {
          font-size: 11px;
          font-weight: 300;
          letter-spacing: 3px;
          color: #8a8178;
          text-transform: uppercase;
          margin-top: 2px;
        }

        /* SEARCH */
        .search-wrap {
          margin-bottom: 44px;
          display: flex;
          justify-content: center;
        }
        .search-inner {
          position: relative;
          width: 100%;
          max-width: 400px;
        }
        .search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #b8976a;
          font-size: 13px;
          pointer-events: none;
          line-height: 1;
        }
        .search-input {
          width: 100%;
          padding: 14px 20px 14px 44px;
          border: 1px solid #d9d3ca;
          background: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 300;
          letter-spacing: 0.5px;
          color: #1a1714;
          outline: none;
          transition: border-color 0.2s;
          border-radius: 0;
          -webkit-appearance: none;
        }
        .search-input::placeholder { color: #b0a99f; }
        .search-input:focus { border-color: #b8976a; }

        /* COUNT */
        .count-bar {
          display: flex;
          align-items: center;
          margin-bottom: 24px;
          gap: 16px;
        }
        .count-label {
          font-size: 10px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #8a8178;
          font-weight: 300;
          white-space: nowrap;
        }
        .divider-line {
          flex: 1;
          height: 1px;
          background: #d9d3ca;
        }

        /* GRID */
        .products-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2px;
        }
        @media (min-width: 580px) {
          .products-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (min-width: 860px) {
          .products-grid { grid-template-columns: repeat(4, 1fr); }
        }

        /* CARD */
        .product-card {
          background: #fff;
          cursor: pointer;
          overflow: hidden;
          transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.3s ease;
        }
        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 32px rgba(26,23,20,0.10);
        }

        .card-img-wrap {
          position: relative;
          aspect-ratio: 3/4;
          overflow: hidden;
          background: #ede9e3;
        }
        .card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .product-card:hover .card-img { transform: scale(1.07); }

        .card-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(247,244,239,0.88);
          backdrop-filter: blur(4px);
          padding: 3px 9px;
          font-size: 8px;
          letter-spacing: 2px;
          text-transform: uppercase;
          font-weight: 500;
          color: #8a8178;
        }

        /* BODY */
        .card-body {
          padding: 14px 14px 16px;
          border-top: 1px solid #ede9e3;
        }
        .card-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 15px;
          font-weight: 400;
          line-height: 1.3;
          color: #1a1714;
          margin-bottom: 12px;
          min-height: 40px;
        }

        /* SIZES */
        .sizes-label {
          font-size: 8px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #b8976a;
          font-weight: 500;
          margin-bottom: 7px;
        }
        .sizes-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          margin-bottom: 14px;
          min-height: 26px;
        }
        .size-chip {
          padding: 3px 8px;
          border: 1px solid #d9d3ca;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.5px;
          color: #4a453f;
          background: transparent;
          transition: border-color 0.15s, color 0.15s;
        }
        .size-chip:hover {
          border-color: #b8976a;
          color: #b8976a;
        }
        .no-stock {
          font-size: 11px;
          color: #c4bcb3;
          letter-spacing: 0.5px;
          font-style: italic;
          font-family: 'Cormorant Garamond', serif;
        }

        /* SHARE */
        .share-btn {
          width: 100%;
          padding: 11px;
          background: #1a1714;
          color: #F7F4EF;
          border: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .share-btn:hover { background: #b8976a; }
        .wpp-icon {
          width: 13px;
          height: 13px;
          fill: currentColor;
          flex-shrink: 0;
        }

        /* LOADING */
        .loading-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 100px 0;
          gap: 20px;
        }
        .loading-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          font-style: italic;
          color: #8a8178;
        }
        .loading-dots { display: flex; gap: 7px; }
        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #b8976a;
          animation: pulse 1.4s ease-in-out infinite;
        }
        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes pulse {
          0%, 80%, 100% { opacity: 0.2; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1); }
        }

        /* EMPTY */
        .empty-state {
          text-align: center;
          padding: 80px 0;
        }
        .empty-state p {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-style: italic;
          color: #8a8178;
        }

        /* FOOTER */
        .site-footer {
          margin-top: 80px;
          padding-top: 32px;
          border-top: 1px solid #d9d3ca;
          text-align: center;
        }
        .footer-text {
          font-size: 9px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #c4bcb3;
        }
      `}</style>

      <div className="page-wrapper">
        <header className="site-header">
          <span className="brand-eyebrow">Coleção</span>
          <h1 className="brand-title">CS <em>Store</em></h1>
          <p className="brand-subtitle">Moda &amp; Estilo</p>
        </header>

        <div className="search-wrap">
          <div className="search-inner">
            <span className="search-icon">✦</span>
            <input
              type="text"
              placeholder="Buscar peça..."
              className="search-input"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
        </div>

        {loading && (
          <div className="loading-wrap">
            <p className="loading-text">Carregando coleção</p>
            <div className="loading-dots">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
            </div>
          </div>
        )}

        {!loading && (
          <>
            <div className="count-bar">
              <span className="count-label">
                {produtosFiltrados.length} {produtosFiltrados.length === 1 ? "peça" : "peças"}
              </span>
              <span className="divider-line" />
            </div>

            {produtosFiltrados.length === 0 ? (
              <div className="empty-state">
                <p>Nenhuma peça encontrada.</p>
              </div>
            ) : (
              <div className="products-grid">
                {produtosFiltrados.map((p) => {
                  const tamanhosDisponiveis =
                    p.variacoes?.filter((v) => v.disponivel).map((v) => v.tamanho) || [];
                  const temEstoque = tamanhosDisponiveis.length > 0;

                  return (
                    <div key={p.id} className="product-card">
                      <div className="card-img-wrap">
                        <img src={p.imagem} alt={p.nome} className="card-img" />
                        {temEstoque && (
                          <span className="card-badge">Disponível</span>
                        )}
                      </div>

                      <div className="card-body">
                        <h2 className="card-name">{p.nome}</h2>

                        {temEstoque ? (
                          <>
                            <p className="sizes-label">Tamanhos</p>
                            <div className="sizes-wrap">
                              {tamanhosDisponiveis.map((t) => (
                                <span key={t} className="size-chip">{t}</span>
                              ))}
                            </div>
                          </>
                        ) : (
                          <div className="sizes-wrap">
                            <span className="no-stock">Sem estoque no momento</span>
                          </div>
                        )}

                        <button onClick={() => compartilhar(p)} className="share-btn">
                          <svg className="wpp-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                          </svg>
                          Compartilhar
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        <footer className="site-footer">
          <p className="footer-text">CS Store · Todos os direitos reservados</p>
        </footer>
      </div>
    </>
  );
}
