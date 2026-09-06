🛍️ Catálogo Store
Catálogo de produtos desenvolvido com Next.js + React + TypeScript, criado para facilitar a visualização e o compartilhamento de produtos por revendedores.
A aplicação consome os produtos através de uma API externa, apresenta um catálogo responsivo e permite filtrar os produtos por categoria, qualidade e tamanho, além de compartilhar produtos diretamente pelo WhatsApp.
✨ Funcionalidades
🔎 Busca de produtos por nome
🗂️ Filtro por categoria
⭐ Filtro por qualidade
📏 Filtro por tamanho
📦 Exibição dos tamanhos disponíveis em estoque
🖼️ Visualização ampliada das imagens
📱 Layout responsivo para celular e desktop
💬 Compartilhamento de produtos pelo WhatsApp
🔗 Possibilidade de abrir o catálogo já com um produto pesquisado através da URL
🚫 Ocultação de produtos classificados como `drop`, `vip` ou `upgrade`
🖼️ Proxy interno para carregamento das imagens dos produtos
---
🚀 Tecnologias utilizadas
Next.js `14.2.3`
React `18.2.0`
TypeScript
Tailwind CSS
PostCSS
API REST externa
WhatsApp Web / WhatsApp
---
📁 Estrutura do projeto
```text
catalogo-store/
├── app/
│   ├── api/
│   │   └── image/
│   │       └── route.ts       # Proxy para carregamento das imagens
│   │
│   ├── layout.tsx             # Layout e metadados da aplicação
│   └── page.tsx               # Página principal do catálogo
│
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```
---
⚙️ Requisitos
Antes de iniciar, certifique-se de ter instalado:
Node.js 18 ou superior
npm ou outro gerenciador de pacotes
Para verificar:
```bash
node -v
npm -v
```
---
📥 Instalação
Clone o projeto:
```bash
git clone <URL_DO_REPOSITORIO>
```
Entre na pasta:
```bash
cd catalogo-store
```
Instale as dependências:
```bash
npm install
```
---
💻 Executando em desenvolvimento
Inicie o servidor de desenvolvimento:
```bash
npm run dev
```
Depois acesse:
```text
http://localhost:3000
```
A aplicação será atualizada automaticamente enquanto você desenvolve.
---
🏗️ Build de produção
Para gerar a versão de produção:
```bash
npm run build
```
Depois, execute:
```bash
npm start
```
A aplicação ficará disponível em:
```text
http://localhost:3000
```
---
🔌 API
O catálogo utiliza uma API externa para obter os produtos.
Endpoint atual:
```text
https://cs-store-api-production.up.railway.app/produtos
```
A aplicação faz uma requisição para esse endpoint ao carregar a página.
📦 Estrutura esperada
Cada produto deve possuir uma estrutura semelhante a:
```json
{
  "id": 1,
  "nome": "Camiseta Premium Masculina",
  "imagem": "https://exemplo.com/imagem.jpg",
  "variacoes": [
    {
      "tamanho": "P",
      "disponivel": true
    },
    {
      "tamanho": "M",
      "disponivel": true
    },
    {
      "tamanho": "G",
      "disponivel": false
    }
  ]
}
```
Campos
Campo	Tipo	Descrição
`id`	`number`	Identificador do produto
`nome`	`string`	Nome do produto
`imagem`	`string`	URL da imagem
`variacoes`	`array`	Variações disponíveis
`variacoes[].tamanho`	`string`	Tamanho da peça
`variacoes[].disponivel`	`boolean`	Indica se existe estoque
---
🗂️ Categorias
A categoria é identificada automaticamente com base no nome do produto.
Atualmente existem:
Todos
Masculina
Feminina
Cropped
Bermuda
Caixa
A classificação utiliza palavras presentes no nome do produto.
Por exemplo:
```text
Cropped Feminino
```
será classificado como:
```text
Cropped
```
Enquanto:
```text
Bermuda Masculina
```
será classificado como:
```text
Bermuda
```
Produtos que não se enquadram nas categorias específicas são classificados como Masculina.
---
⭐ Qualidade
Os produtos também podem ser classificados automaticamente por qualidade:
Todas
Premium
Tailandesa
Produtos contendo `tailandesa` no nome são classificados como Tailandesa.
Os demais produtos elegíveis são classificados como Premium.
As categorias abaixo não possuem filtro de qualidade:
Bermuda
Caixa
Cropped
---
📏 Tamanhos
Os tamanhos são obtidos dinamicamente através das variações dos produtos.
A ordem utilizada é:
```text
P
M
G
GG
XL
2XL
3XL
4XL
ÚNICO
```
O sistema também normaliza variações como:
```text
UNICO
```
para:
```text
ÚNICO
```
Somente tamanhos com estoque disponível aparecem nos filtros.
---
🔎 Busca através da URL
É possível abrir o catálogo já filtrado por um produto utilizando o parâmetro `busca`.
Exemplo:
```text
https://catalogo-store.vercel.app/?busca=Camiseta
```
Ao abrir a página, o sistema lê o parâmetro e preenche automaticamente a busca.
Isso é utilizado principalmente no compartilhamento de produtos.
---
💬 Compartilhamento pelo WhatsApp
Cada produto possui o botão:
```text
Compartilhar produto
```
Ao clicar, o sistema gera uma mensagem contendo o nome do produto e um link para o catálogo.
Exemplo:
```text
🔥 Olha esse produto:
Camiseta Premium Masculina
https://catalogo-store.vercel.app/?busca=Camiseta%20Premium%20Masculina
```
O link permite que a pessoa receba o produto já localizado através da busca.
---
🖼️ Proxy de imagens
As imagens dos produtos são carregadas através da rota:
```text
/api/image?url=URL_DA_IMAGEM
```
Essa rota funciona como um proxy entre o navegador e a URL original da imagem.
Arquivo responsável:
```text
app/api/image/route.ts
```
O endpoint:
Recebe a URL da imagem.
Faz uma requisição para a origem.
Obtém o conteúdo da imagem.
Retorna a imagem para o navegador.
Define cache de até 1 ano.
Exemplo:
```text
/api/image?url=https%3A%2F%2Fexemplo.com%2Fproduto.jpg
```
---
🚫 Produtos ocultos
Alguns produtos são automaticamente removidos da exibição.
Atualmente são ignorados produtos cujo nome contenha:
```text
drop
vip
upgrade
```
A comparação não diferencia letras maiúsculas e minúsculas.
---
📱 Responsividade
O catálogo utiliza um grid adaptável.
Desktop
A partir de aproximadamente `700px` de largura:
```text
4 produtos por linha
```
Mobile
Em telas menores:
```text
2 produtos por linha
```
Isso permite utilizar o catálogo tanto em computadores quanto em celulares.
---
🌐 Deploy
O projeto está preparado para deploy na Vercel.
O endereço configurado atualmente é:
```text
https://catalogo-store.vercel.app/
```
Deploy pela Vercel
Faça login na Vercel.
Importe o repositório do projeto.
A Vercel identificará automaticamente o projeto Next.js.
Execute o deploy.
Não são necessárias variáveis de ambiente para a configuração atual, pois o endereço da API está definido diretamente no código.
---
📜 Scripts disponíveis
Comando	Descrição
`npm run dev`	Inicia o ambiente de desenvolvimento
`npm run build`	Gera o build de produção
`npm start`	Inicia a aplicação em produção
---
🔧 Personalização
Os principais ajustes da aplicação estão em:
```text
app/page.tsx
```
Nesse arquivo é possível alterar:
Categorias
Filtros
Ordem dos tamanhos
Regras de classificação
Produtos ocultos
Texto do compartilhamento
URL da API
Layout
Cores
Quantidade de produtos por linha
Alterar a API
Atualmente a API está definida em:
```typescript
fetch("https://cs-store-api-production.up.railway.app/produtos")
```
Para utilizar outra API, altere essa URL.
---
🎨 Interface
A aplicação utiliza uma interface simples e focada na visualização dos produtos.
Principais elementos:
Campo de busca
Filtros em formato de botões
Cards de produtos
Imagem do produto
Tamanhos disponíveis
Botão de compartilhamento
Modal para visualização ampliada
---
🔒 Observações
O projeto desabilita algumas interações com as imagens, como:
Arrastar imagens
Menu de contexto sobre as imagens
Essas medidas dificultam a interação direta com as imagens pelo navegador, mas não representam uma proteção real contra cópia ou download.
---
📄 Licença
Este projeto é privado e destinado ao uso do proprietário do catálogo.
Não é permitida a redistribuição, comercialização ou utilização do código sem autorização do proprietário.
---
👨‍💻 Desenvolvimento
Projeto desenvolvido para gerenciamento e divulgação de catálogo de produtos para revendedores.
Catálogo Store  
🛍️ Catálogo de produtos  
📱 Responsivo  
💬 Compartilhamento via WhatsApp  
⚡ Next.js + React + TypeScript
