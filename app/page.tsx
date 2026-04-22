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
      .then(setProdutos);
  }, []);

  const compartilhar = (produto: Produto) => {
    const texto = `🔥 ${produto.nome}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`);
  };

  const filtrados = produtos.filter((p) =>
    p.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <main className="bg-[#f5f5f5] min-h-screen">
      
      {/* 🔥 HERO */}
      <section className="bg-black text-white p-8">
        <h1 className="text-3xl font-bold leading-tight">
          Estilo que se destaca.
          <br />
          Qualidade que entrega.
        </h1>

        <p className="mt-3 text-gray-300">
          Os melhores produtos para você compartilhar.
        </p>

        <input
          placeholder="Buscar produtos..."
          className="mt-6 w-full p-3 rounded-full text-black"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </section>

      {/* 🧩 CATEGORIAS (fake por enquanto) */}
      <div className="flex gap-2 overflow-x-auto p-4">
        {["Todos", "Camisetas", "Moletons", "Calças"].map((cat) => (
          <button
            key={cat}
            className="bg-white px-4 py-2 rounded-full text-sm shadow"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 🛍️ GRID */}
      <section className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
        {filtrados.map((p) => {
          const tamanhos =
            p.variacoes
              ?.filter((v) => v.disponivel)
              .map((v) => v.tamanho) || [];

          return (
            <div
              key={p.id}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition p-3"
            >
              <img
                src={p.imagem}
                className="rounded-xl w-full"
              />

              <h2 className="mt-2 text-sm font-semibold">
                {p.nome}
              </h2>

              <p className="text-xs text-gray-400">
                Tamanhos disponíveis
              </p>

              <div className="flex gap-1 mt-2 flex-wrap">
                {tamanhos.map((t, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 border rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <button
                onClick={() => compartilhar(p)}
                className="mt-3 w-full bg-black text-white py-2 rounded-full text-sm"
              >
                Compartilhar
              </button>
            </div>
          );
        })}
      </section>

      {/* 💚 CTA FINAL */}
      <div className="bg-black text-white p-6 mt-6">
        <h3 className="text-lg font-bold">
          Gostou de algum produto?
        </h3>
        <p className="text-sm text-gray-400">
          Fale agora no WhatsApp
        </p>

        <a
          href="https://wa.me/"
          className="mt-3 inline-block bg-green-500 px-4 py-2 rounded-full"
        >
          Falar no WhatsApp
        </a>
      </div>
    </main>
  );
}
