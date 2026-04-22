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

  const formatarTamanhos = (variacoes?: Variacao[]) => {
    const tamanhos =
      variacoes
        ?.filter((v) => v.disponivel)
        .map((v) => v.tamanho) || [];

    if (tamanhos.length === 0) return "Sem estoque";

    if (tamanhos.length === 1) return tamanhos[0];

    return `${tamanhos.slice(0, -1).join(", ")} e ${
      tamanhos[tamanhos.length - 1]
    }`;
  };

  const filtrados = produtos.filter((p) =>
    p.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-[#0a0f1f] to-black text-white">

      {/* 🔥 HERO */}
      <section className="p-6 md:p-10 max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          Estilo que se destaca.
          <br />
          <span className="text-blue-500">
            Qualidade que entrega.
          </span>
        </h1>

        <p className="mt-3 text-gray-400">
          Os melhores produtos para você e seus clientes.
        </p>

        <input
          placeholder="Buscar produtos..."
          className="mt-6 w-full p-3 rounded-full bg-[#111] border border-gray-700 focus:outline-none"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </section>

      {/* 🛍️ GRID */}
      <section className="p-4 md:p-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">

        {filtrados.map((p) => (
          <div
            key={p.id}
            className="bg-[#0f172a] rounded-2xl border border-gray-800 p-3 hover:scale-[1.02] transition"
          >
            {/* 📸 IMAGEM CONTROLADA */}
            <div className="w-full aspect-square overflow-hidden rounded-xl bg-black">
              <img
                src={p.imagem}
                alt={p.nome}
                className="w-full h-full object-cover"
              />
            </div>

            <h2 className="mt-3 text-sm font-semibold">
              {p.nome}
            </h2>

            <p className="text-xs text-gray-400 mt-1">
              Tamanhos disponíveis
            </p>

            <p className="text-sm text-blue-400 mt-1">
              {formatarTamanhos(p.variacoes)}
            </p>

            <button className="mt-3 w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg text-sm font-semibold">
              Ver produto
            </button>
          </div>
        ))}
      </section>

      {/* 💬 CTA FINAL */}
      <section className="bg-[#020617] border-t border-gray-800 p-6 mt-8 text-center">
        <h3 className="text-lg font-semibold">
          Precisa de ajuda?
        </h3>
        <p className="text-gray-400 text-sm mt-1">
          Fale com a gente e garanta o melhor preço
        </p>

        <a
          href="https://wa.me/"
          className="inline-block mt-4 bg-green-500 px-5 py-2 rounded-lg font-semibold"
        >
          Falar no WhatsApp
        </a>
      </section>

    </main>
  );
}
