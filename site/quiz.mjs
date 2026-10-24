export const questions = [
  ['<span class="quiz-question-intro">Vamos utilizar IA para criar nossa dieta,</span> você já <em>utiliza IA?</em>', ['Sim, uso no dia a dia', 'Já usei algumas vezes', 'Conheço, mas nunca usei', 'Ainda não sei como funciona']],
  ['Na hora de comer,<br>você <em>se organiza?</em>', ['Decido tudo na hora', 'Repito sempre o mesmo', 'Tento, mas me perco', 'Já planejo minhas refeições']],
  ['O que mais dificulta<br><em>sua rotina?</em>', ['Falta de tempo', 'Não saber por onde começar', 'Ideias que não cabem no bolso', 'Manter a organização']],
  ['Você conta com<br>um <em>nutricionista?</em>', ['Sim, tenho acompanhamento', 'Já tive, mas parei', 'Quero, mas não cabe no bolso', 'Nunca tive acompanhamento']],
  ['Já tentou se organizar<br><em>por conta própria?</em>', ['Sim, e fiquei sem direção', 'Sim, mas não mantive a rotina', 'Ainda não sei como começar', 'Sim, e quero melhorar']],
  ['Pesquisar sobre alimentação<br>costuma ser <em>como?</em>', ['Muita informação diferente', 'Demorado demais', 'Difícil de adaptar à minha vida', 'Tranquilo, sei onde procurar']],
  ['O que mais pesa<br>na hora das <em>compras?</em>', ['Comprar sem uma lista', 'Deixar alimentos estragarem', 'Escolher ingredientes caros', 'Já consigo me organizar']],
  ['E se um ingrediente<br>não combina <em>com você?</em>', ['Fico sem saber o que trocar', 'Procuro alternativas na internet', 'Desisto daquela ideia', 'Já sei como buscar opções']],
  ['O que mais ajudaria<br>a <em>usar a IA?</em>', ['Um passo a passo simples', 'Exemplos do que perguntar', 'Aprender a explicar minha rotina', 'Saber refinar as respostas']],
  ['Qual seria a maior<br>vantagem na <em>sua rotina?</em>', ['Gastar menos tempo pesquisando', 'Planejar melhor minhas compras', 'Ter ideias com o que gosto', 'Sair do improviso com um guia']],
];

export function renderQuiz({ origin, mark, pixelHead, pixelBody, product }) {
  const path = '/dieta-com-ia/';
  const title = 'Quiz: organize suas ideias de alimentação';
  const description = 'Responda perguntas rápidas sobre sua rotina e conheça o guia Dieta com IA.';
  const steps = questions.map(([question, answers], index) => `
    <section class="quiz-step" data-step="${index}" ${index ? 'hidden' : ''} aria-labelledby="question-${index}">
      ${index === 0 ? `<h1 id="question-${index}">${question}</h1>` : `<h2 id="question-${index}">${question}</h2>`}
      <div class="quiz-answers" role="group" aria-labelledby="question-${index}">
        ${answers.map((answer, choice) => `<button type="button" class="quiz-answer" data-answer="${choice}"><span class="quiz-answer-letter" aria-hidden="true">${'ABCD'[choice]}</span><span>${answer}</span><span class="quiz-answer-arrow" aria-hidden="true">↗</span></button>`).join('')}
      </div>
    </section>`).join('');
  const checkout = product.checkout.replaceAll('&', '&amp;');
  return `<!doctype html>
<html lang="pt-BR"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#000000"><meta name="robots" content="noindex, nofollow">
<title>${title} | Tá Pago! Fitness</title><meta name="description" content="${description}">
<meta property="og:title" content="${title} | Tá Pago! Fitness"><meta property="og:description" content="${description}">
<meta property="og:type" content="website"><meta property="og:image" content="${origin}/assets/og.jpg"><meta property="og:url" content="${origin}${path}">
<link rel="canonical" href="${origin}${path}"><link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">
<link rel="preload" href="/assets/barlow-condensed-700.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/fonts.css"><link rel="stylesheet" href="/styles.css"><link rel="stylesheet" href="/quiz.css">
<script type="module" src="/attribution.js"></script><script src="/quiz.js" defer></script>${pixelHead}
</head><body class="quiz-page">${pixelBody}
<main class="quiz-shell" id="main">
  <header class="quiz-header"><div class="logo" aria-label="Tá Pago! Fitness">${mark}<span>Tá Pago!<small>FITNESS</small></span></div></header>
  <div class="quiz-main">
    <div class="quiz-progress" aria-label="Progresso do quiz"><span class="quiz-progress-label" id="quiz-progress-label">PERGUNTA 01 / ${questions.length}</span><div class="quiz-progress-track"><span id="quiz-progress-fill" style="width:${100 / questions.length}%"></span></div></div>
    <div id="quiz-steps">${steps}</div>
    <section class="quiz-result" id="quiz-result" hidden aria-labelledby="result-title">
      <div class="quiz-result-copy">
        <span class="eyebrow">MENOS IMPROVISO. MAIS DIREÇÃO.</span>
        <h2 id="result-title">Você não precisa<br>começar <em>do zero.</em></h2>
        <p>Chega de abrir o ChatGPT e não saber o que escrever. Com o <strong>Dieta com IA</strong>, você tem um passo a passo para explicar sua rotina, explorar ideias de refeições e organizar suas compras.</p>
        <ul class="check-list"><li>Exemplos de perguntas: comece com uma direção</li><li>Substituições: explore opções com ingredientes de que você gosta</li><li>Lista de compras: organize o que precisa levar do mercado</li><li>24 páginas em PDF: consulte no celular, no seu ritmo</li></ul>
        <p class="quiz-value">O ChatGPT está à sua disposição. <strong>Aprenda a pedir o que você precisa.</strong> Um guia direto para consultar sempre que surgir uma dúvida sobre como perguntar.</p>
      </div>
      <div class="quiz-offer">
        <p class="quiz-reference">Pensou em separar <strong>R$67</strong> para aprender a usar IA na sua rotina? Você pode começar com este ebook por:</p>
        <p class="quiz-offer-label">EBOOK COMPLETO · PAGAMENTO ÚNICO</p>
        <div class="quiz-price"><span>R$</span>${product.price}</div>
        <p class="quiz-installments">à vista · sem mensalidade do ebook</p>
        <a class="button dark quiz-checkout" href="${checkout}" target="_blank" rel="noopener noreferrer">Quero começar agora <span aria-hidden="true">↗</span></a>
        <p class="quiz-checkout-note">Compra pela Hotmart · PDF para ler no celular</p>
      </div>
      <p class="quiz-disclaimer">Você está comprando um ebook educativo, não uma dieta personalizada. Ele não substitui acompanhamento nutricional. Sugestões de IA precisam de avaliação profissional antes de orientar sua alimentação. O acesso à ferramenta de IA é separado.</p>
    </section>
    <button type="button" class="quiz-back" id="quiz-back" hidden>← Voltar</button>
  </div>
</main></body></html>`;
}
