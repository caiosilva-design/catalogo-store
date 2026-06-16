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

type GrupoCategoria = "Todos" | "Masculina" | "Feminina" | "Bermuda" | "Caixa";

function getCategoria(nome: string): GrupoCategoria {
  const n = nome.toLowerCase();
  if (n.includes("feminina") || n.includes("feminino")) return "Feminina";
  if (n.includes("Caixa")) return "Caixa";
  if (n.includes("bermuda")) return "Bermuda";
  return "Masculina";
}

function normalizarTamanho(tamanho: string): string {
  if (tamanho.toUpperCase().includes("UNICO")) return "ÚNICO";
  return tamanho.toUpperCase();
}

const ORDEM_TAMANHOS = ["P", "M", "G", "GG", "XL", "2XL", "3XL", "4XL", "ÚNICO"];

function ordenarTamanhos(tamanhos: string[]): string[] {
  return [...tamanhos].sort((a, b) => {
    const ia = ORDEM_TAMANHOS.indexOf(a);
    const ib = ORDEM_TAMANHOS.indexOf(b);
    if (ia === -1 && ib === -1) return a.localeCompare(b);
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });
}

export default function Home() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState<string | null>(null);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<GrupoCategoria>("Todos");
  const [imagemExpandida, setImagemExpandida] = useState<string | null>(null);
  const [tamanhosDinamicos, setTamanhosDinamicos] = useState<string[]>([]);

  useEffect(() => {
    fetch("https://cs-store-api-production.up.railway.app/produtos")
      .then((res) => res.json())
      .then((data: Produto[]) => {
        setProdutos(data);
        setLoading(false);

        // Extrai tamanhos disponíveis de todas as variações
        const tamanhosBrutos = new Set<string>();
        data.forEach((p) => {
          p.variacoes?.forEach((v) => {
            if (v.disponivel) {
              tamanhosBrutos.add(normalizarTamanho(v.tamanho));
            }
          });
        });

        setTamanhosDinamicos(ordenarTamanhos(Array.from(tamanhosBrutos)));
      });

    const params = new URLSearchParams(window.location.search);
    const buscaUrl = params.get("busca");
    if (buscaUrl) setBusca(buscaUrl);
  }, []);

  const formatarTamanhos = (variacoes?: Variacao[]) => {
    const tamanhos =
      variacoes
        ?.filter((v) => v.disponivel)
        .map((v) => normalizarTamanho(v.tamanho)) || [];

    if (tamanhos.length === 0) return "Sem estoque";
    const ordenados = ordenarTamanhos(tamanhos);
    if (ordenados.length === 1) return ordenados[0];
    return `${ordenados.slice(0, -1).join(", ")} e ${ordenados[ordenados.length - 1]}`;
  };

  const compartilhar = (produto: Produto) => {
    const nome = encodeURIComponent(produto.nome);
    const link = `https://catalogo-store.vercel.app/?busca=${nome}`;
    const texto = `🔥 Olha esse produto:\n${produto.nome}\n${link}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`);
  };

  const produtosFiltrados = produtos.filter((p) => {
    const n = p.nome.toLowerCase();
    const permitido = !n.includes("drop") && !n.includes("vip") && !n.includes("upgrade");
    const matchBusca = p.nome.toLowerCase().includes(busca.toLowerCase());

    const matchCategoria =
      categoriaSelecionada === "Todos" || getCategoria(p.nome) === categoriaSelecionada;

    const matchTamanho =
      !tamanhoSelecionado ||
      p.variacoes?.some(
        (v) => v.disponivel && normalizarTamanho(v.tamanho) === tamanhoSelecionado
      );

    return permitido && matchBusca && matchCategoria && matchTamanho;
  });

  const categorias: GrupoCategoria[] = ["Todos", "Masculina", "Feminina", "Bermuda", "Caixa"];

  return (
    <>
      <style>{`
        body {
          background: #020617;
          font-family: sans-serif;
          color: white;
          user-select: none;
        }

        img {
          -webkit-user-drag: none;
          user-select: none;
          pointer-events: auto;
        }

        .container {
          max-width: 1100px;
          margin: auto;
          padding: 20px;
        }

        .title {
          text-align: center;
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 20px;
          color: black;
        }

        .search {
          width: 100%;
          padding: 12px;
          border-radius: 999px;
          border: 1px solid #1e293b;
          background: #020617;
          color: white;
          margin-bottom: 20px;
          box-sizing: border-box;
        }

        .filter-section {
          margin-bottom: 12px;
        }

        .filter-label {
          font-size: 11px;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 6px;
        }

        .filters {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 6px 14px;
          border-radius: 999px;
          border: 1px solid #1e293b;
          background: transparent;
          color: #cbd5e1;
          cursor: pointer;
          font-size: 13px;
          transition: all 0.15s;
        }

        .filter-btn:hover {
          border-color: #334155;
          color: white;
        }

        .active {
          background: #2563eb;
          border-color: #2563eb;
          color: white;
        }

        .active-categoria {
          background: #7c3aed;
          border-color: #7c3aed;
          color: white;
        }

        .divider {
          border: none;
          border-top: 1px solid #1e293b;
          margin: 16px 0;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-top: 20px;
        }

        @media (min-width: 700px) {
          .grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .card {
          background: #0f172a;
          border-radius: 12px;
          padding: 10px;
        }

        .img {
          width: 100%;
          aspect-ratio: 1/1;
          object-fit: cover;
          border-radius: 10px;
          cursor: pointer;
        }

        .name {
          margin-top: 10px;
          font-size: 14px;
        }

        .sizes {
          font-size: 12px;
          color: #60a5fa;
          margin-top: 5px;
        }

        .btn {
          margin-top: 10px;
          width: 100%;
          padding: 10px;
          border-radius: 10px;
          background: #2563eb;
          border: none;
          color: white;
          font-weight: bold;
          cursor: pointer;
        }

        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
        }

        .modal img {
          max-width: 90%;
          max-height: 90%;
          border-radius: 10px;
        }

        .count {
          font-size: 12px;
          color: #475569;
          margin-top: 4px;
        }
      `}</style>

      <div className="container">
        <h1 className="title">Catálogo</h1>

        <input
          className="search"
          placeholder="Buscar produto..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />

        {/* Filtro de categoria */}
        <div className="filter-section">
          <div className="filter-label">Categoria</div>
          <div className="filters">
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoriaSelecionada(cat)}
                className={`filter-btn ${categoriaSelecionada === cat ? "active-categoria" : ""}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <hr className="divider" />

        {/* Filtro de tamanho dinâmico */}
        <div className="filter-section">
          <div className="filter-label">Tamanho</div>
          <div className="filters">
            <button
              onClick={() => setTamanhoSelecionado(null)}
              className={`filter-btn ${tamanhoSelecionado === null ? "active" : ""}`}
            >
              Todos
            </button>

            {tamanhosDinamicos.map((t) => (
              <button
                key={t}
                onClick={() => setTamanhoSelecionado(t)}
                className={`filter-btn ${tamanhoSelecionado === t ? "active" : ""}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {loading && <p>Carregando...</p>}

        {!loading && (
          <p className="count">{produtosFiltrados.length} produto{produtosFiltrados.length !== 1 ? "s" : ""}</p>
        )}

        <div className="grid">
          {produtosFiltrados.map((p) => (
            <div key={p.id} className="card">
              <img
                src={`/api/image?url=${encodeURIComponent(p.imagem)}`}
                className="img"
                onClick={() => setImagemExpandida(p.imagem)}
                onContextMenu={(e) => e.preventDefault()}
                draggable={false}
              />

              <p className="name">{p.nome}</p>

              <p className="sizes">
                {formatarTamanhos(p.variacoes)}
              </p>

              <button className="btn" onClick={() => compartilhar(p)}>
                Compartilhar produto
              </button>
            </div>
          ))}
        </div>
      </div>

      {imagemExpandida && (
        <div className="modal" onClick={() => setImagemExpandida(null)}>
          <img
            src={`/api/image?url=${encodeURIComponent(imagemExpandida)}`}
            onContextMenu={(e) => e.preventDefault()}
            draggable={false}
          />
        </div>
      )}
    </>
  );
}
