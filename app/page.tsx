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
      .then((data) => setProdutos(data));
  }, []);

  const compartilhar = (produto: Produto) => {
    const texto = `🔥 Olha esse produto:\n${produto.nome}`;
    window.open(
      `https://wa.me/?text=${encodeURIComponent(texto)}`,
      "_blank"
    );
  };

  const filtrados = produtos.filter((p) =>
    p.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <main className="bg-gray-100 min-h-screen">
      {/* 🔥 HEADER */}
      <header className="bg-black text-white p-4 flex justify-between items-center">
        <h1 className="font-bold text-lg">CS STORE</h1>
        <a
          href="https://wa.me/"
          className="bg-green-500 px-3 py-1 rounded text-sm"
        >
          WhatsApp
        </a>
      </header>

      {/* 🎯 HERO */}
      <div className="bg-black text-white p-6">
        <h2 className="text-2xl font-bold">
          Estilo que se destaca.
        </h2>
        <p className="text-sm mt-2">
          Compartilhe com seus clientes
        </p>

        <input
          type="text"
          placeholder="Buscar produto..."
          className="mt-4 w-full p-2 rounded text-black"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      {/* 🛍️ GRID */}
      <div className="p-4 grid grid-cols-2 gap-4">
        {filtrados.map((p) => {
          const tamanhos =
            p.variacoes
              ?.filter((v) => v.disponivel)
              .map((v) => v.tamanho) || [];

          return (
            <div
              key={p.id}
              className="bg-white rounded-xl shadow p-2"
            >
              <img
                src={p.imagem}
                className="rounded-lg w-full"
              />

              <h2 className="text-sm font-semibold mt-2">
                {p.nome}
              </h2>

              {/* 🏷️ TAMANHOS */}
              <div className="flex gap-1 mt-2 flex-wrap">
                {tamanhos.map((t, i) => (
                  <span
                    key={i}
                    className="text-xs border px-2 py-1 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* 📲 BOTÃO */}
              <button
                onClick={() => compartilhar(p)}
                className="mt-3 w-full bg-black text-white py-2 rounded"
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
