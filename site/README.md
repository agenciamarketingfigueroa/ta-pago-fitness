# Tá Pago! Fitness

Site institucional e páginas de vendas em português, com HTML estático, CSS responsivo e JavaScript sem dependências de execução.

## Rodar e atualizar

Requer Node.js 20 ou superior.

```sh
npm run build
npm run check
npm start
```

Prévia: http://127.0.0.1:4173. Arquivos para hospedagem: `dist/`.

- `products.mjs`: catálogo, preços, parcelas, descrições e links da Hotmart.
- `build.mjs`: gera a página institucional, catálogo e cinco páginas de produto.
- `pixel.mjs`: Meta Pixel 2284410015213545. Um PageView por carregamento de página, sem eventos adicionais. Script no head e fallback noscript no body.
- `dist/styles.css`, `dist/app.js`: estilos e interações.
- `.github/workflows/pages.yml` (na raiz do repositório): gera, verifica e publica `site/dist/` no GitHub Pages a cada envio para `main`.

As páginas usam os preços informados pelo proprietário. O checkout da Hotmart é externo; alterar o preço no site não altera a oferta na Hotmart.

## Conteúdo e identidade

As capas foram renderizadas a partir dos PDFs fornecidos. O símbolo original da marca foi recuperado do design Canva `DAFltm5XYaQ`, elemento `https://media-public.canva.com/OHsTI/MAEFrwOHsTI/1/s3-1.svg`. Fotografia de treino: Unsplash, `https://unsplash.com/photos/1517836357463-d25dfeac3438` (arquivo: images.unsplash.com/photo-1517836357463-d25dfeac3438). Fontes Barlow Condensed e DM Sans servidas localmente.

Os PDFs integrais não são publicados na pasta pública; somente suas capas. Os clientes seguem para a Hotmart para comprar.

O Top 30 é um bundle dos três materiais de receitas: R$14,90 à vista ou 4x de R$4,06 (total R$16,24). Individuais: R$9,90 ou 3x de R$3,53. Dieta com IA: R$29,90 ou 9x de R$3,93.

## Observações editoriais dos materiais originais

O ebook de IA contém afirmações nutricionais que merecem revisão profissional, incluindo regras universais de déficit calórico e frequência alimentar. A página de vendas não reproduz essas regras nem promete perda de peso.

Há inconsistências nos PDFs de receitas: um título de sopa acompanha ingredientes de contrafilé; a receita de frango com mel e laranja aparece repetida; o título final das sobremesas menciona hambúrguer, mas os ingredientes são de bolo de cenoura. A copy usa exemplos coerentes conferidos no conteúdo. Os PDFs originais não foram alterados.

## Publicação

O site público usa `https://tapagofitness.com.br`. O código fica em `site/`, e o workflow do GitHub Pages executa `npm run build` e `npm run check` antes de publicar `site/dist/`. Para atualizar o site, altere os arquivos em `site/`, faça commit e envie para a branch `main`.

O DNS do domínio está no Cloudflare, com os registros A do GitHub Pages e o CNAME `www` apontando para `agenciamarketingfigueroa.github.io`. O Registro.br delega o domínio aos nameservers do Cloudflare. Alterações de DNS podem levar algum tempo para se propagar.
