import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");

  if (!url) {
    return new Response("URL obrigatória", { status: 400 });
  }

  try {
    const res = await fetch(url);

    if (!res.ok) {
      return new Response("Erro ao buscar imagem", { status: 500 });
    }

    const contentType = res.headers.get("content-type") || "image/jpeg";
    const buffer = await res.arrayBuffer();

    return new Response(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000",
      },
    });
  } catch (error) {
    return new Response("Erro interno", { status: 500 });
  }
}
