// Esses são os símbolos do caça-níquel (os emojis)
const symbols = ["💎", "🃏", "🍀", "💵", "7️⃣"];

// Pega os três espaços onde vai mostrar os símbolos
const reels = [
  document.getElementById("reel1"),
  document.getElementById("reel2"),
  document.getElementById("reel3")
];

// Pega o botão de jogar, a área da mensagem e o saldo
const spinBtn = document.getElementById("spinBtn");
const resultDiv = document.getElementById("result");
const balanceSpan = document.getElementById("balance");

// Começa com 100 créditos
let balance = 100;

// Cada jogada custa 10 créditos
const costPerPlay = 10;

// Valores dos bônus por emoji
const bonusValues = {
  "💎": 40,
  "🃏": 20,
  "🍀": 10,
  "💵": 30,
  "7️⃣": 50
};

const sounds = {
  "🃏": new Audio("som/quack-efeito-sonoro.mp3"),
  "💵": new Audio("som/quack-efeito-sonoro.mp3"),
  "🍀": new Audio("som/quack-efeito-sonoro.mp3"),
  "💎": new Audio("som/quack-efeito-sonoro.mp3"),
  "7️⃣": new Audio("som/quack-efeito-sonoro.mp3")
};

// Quando clicar no botão de jogar
spinBtn.addEventListener("click", () => {
  // Se não tiver créditos suficientes, avisa e para
  if(balance < costPerPlay) {
    resultDiv.textContent = "F5 pra recarregar o saldo";
    resultDiv.style.color = "#f55"; // vermelho pra avisar
    return;
  }

  // Paga os 10 créditos da jogada
  balance -= costPerPlay;
  balanceSpan.textContent = balance;

  // Desliga o botão pra não apertar várias vezes
  spinBtn.disabled = true;

  // Limpa a mensagem de resultado
  resultDiv.textContent = "";

  // Vai guardar os símbolos que vão sair no fim
  let spins = [0, 0, 0];

  // Quantas vezes as roletas vão girar pra animar
  const maxSpins = 20;

  // Quanto tempo entre cada troca de símbolo (em milissegundos)
  const spinInterval = 80;

  let count = 0;

  // Aqui é o intervalo que vai fazer as roletas girarem
  let interval = setInterval(() => {
    // Muda o símbolo de cada roleta de forma aleatória
    for (let i = 0; i < reels.length; i++) {
      reels[i].textContent = symbols[Math.floor(Math.random() * symbols.length)];
    }

    count++;

    // Quando girar o tanto que queria, para a animação
    if (count >= maxSpins) {
      clearInterval(interval);

      // Sorteia os símbolos finais e mostra na tela
      for (let i = 0; i < reels.length; i++) {
        let finalSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        reels[i].textContent = finalSymbol;
        spins[i] = finalSymbol;
      }

      // Se os 3 símbolos forem iguais, ganha créditos extras conforme o emoji
      if (spins[0] === spins[1] && spins[1] === spins[2]) {
        const winValue = bonusValues[spins[0]] || 0;
        balance += winValue;
        resultDiv.textContent = `Parabéns! Você ganhou ${winValue} créditos!`;
        resultDiv.style.color = "#4CAF50"; // verde pra vitória

         // Toca o som correspondente
         const sound = sounds[spins[0]];
         if(sound) {
        sound.play();
  }
      } else {
        // Se não
        resultDiv.textContent = "Não Pagou!";
        resultDiv.style.color = "#ffb800"; // amarelo
      }

      // Atualiza o saldo na tela
      balanceSpan.textContent = balance;

      // Liga o botão pra poder jogar de novo
      spinBtn.disabled = false;
    }
  }, spinInterval);
});
