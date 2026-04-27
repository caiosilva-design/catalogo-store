export const metadata = {
  title: "Produtos",
  description: "Garanta em liquidação!",
  openGraph: {
    title: "Catálogo a pronta entrega!",
    description: "Confira nosso catálogo personalizado!",
    url: "https://catalogo-store.vercel.app/",
    siteName: "Produtos",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body style={{ margin: 0, background: "#F7F4EF" }}>{children}</body>
    </html>
  );
}
