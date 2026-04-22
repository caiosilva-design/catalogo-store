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

  useEffect(() => {
    fetch("https://cs-store-api-production.up.railway.app/produtos")
      .then((res) => res.json())
      .then((data) => setProdutos(data))
      .catch((err) => console.error(err));
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
    <main className="p-4">
      {/* 🔎 Busca */}
      <input
        type="text"
        placeholder="Buscar produto..."
        className="w-full mb-4 p-2 border rounded"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      {/* 🛍️ Grid */}
      <div className="grid grid-cols-2 gap-4">
        {produtosFiltrados.map((p) => {
          const tamanhos =
            p.variacoes
              ?.filter((v) => v.disponivel)
              .map((v) => v.tamanho)
              .join(" • ") || "Sem estoque";

          return (
            <div key={p.id} className="border rounded p-2">
              <img
                src={p.imagem}
                alt={p.nome}
                className="w-full rounded"
              />

              <h2 className="text-sm font-bold mt-2">{p.nome}</h2>

              <p className="text-xs text-gray-600 mt-1">
                {tamanhos}
              </p>

              <button
                onClick={() => compartilhar(p)}
                className="mt-2 w-full bg-green-500 text-white text-sm py-1 rounded"
              >
                Compartilhar
              </button>
            </div>
          );
        })}
      </div>
    </main>
  );
}
