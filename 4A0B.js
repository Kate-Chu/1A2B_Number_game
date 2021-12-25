const answer = [];
const guessInput = document.querySelector("#guessInput");
const submit = document.querySelector("#submit");
const ansScreen = document.querySelector(".ans-screen");
const showAns = document.querySelector("#show-ans");
const newGame = document.querySelector("#new-game");
const rule = document.querySelector(".rule")
const ruleText = document.querySelector("rule-text")
let corA
let corB
let guessCorrection = ''

// Generate answer randomly 
// 隨機指派正確答案
const generateNewAnswer = () => {
  for (let i = 0; i < 4; i++) {
    answer[i] = Math.floor(Math.random() * 10);
  }
}

// Examine if the number and index are exactly the same with the answer
// 比對Ａ值（數字與位置皆正確）
const getCorrectA = () => {
  let guess = Array.from(guessInput.value, Number)
  corA = 0
  for (let i = 0; i < 4; i++) {
    if (answer[i] === guess[i]) {
      corA += 1;
    }
  }
  return corA
}

// Examine if the number is correct whether in the wrong index 
// 比對Ｂ值（數字正確，位置不正確）
const getCorrectB = () => {
  let guess = Array.from(guessInput.value, Number)
  corB = 0
  for (let i = 0; i < 4; i++) {
    if (answer[i] === guess[i]) {
      answer.slice(i, 1)
      guess.slice(i, 1)
    }
  }
  answer.forEach(function (ansNum) {
    guess.forEach(function (guessNum) {
      if (guessNum === ansNum) {
        corB += 1;
      }
    });
  });
  if (corA > 0) {
    corB -= corA
  }
  return corB
}

generateNewAnswer()

rule.addEventListener('click', e => {
  ruleText.style.display = 'inline-block'
})

submit.addEventListener('click', (e) => {
  getCorrectA();
  getCorrectB();
  guessCorrection = `${corA}A${corB}B`

  if (guessInput.value.toString('') === answer.join('')) {
    submit.disabled = true;
    return ansScreen.innerText = 'U WIN!'
  }

  return ansScreen.innerText = guessCorrection
})

guessInput.addEventListener('', e => {
  getCorrectA();
  getCorrectB();
  guessCorrection = `${corA}A${corB}B`

  if (guessInput.value.toString('') === answer.join('')) {
    submit.disabled = true;
    return ansScreen.innerText = 'U WIN!'
  }

  return ansScreen.innerText = guessCorrection
})


showAns.addEventListener('click', (e) => {
  submit.disabled = true;
  return ansScreen.innerText = answer.join('')
})

newGame.addEventListener('click', (e) => {
  submit.disabled = false;
  guessInput.value = ''
  guessCorrection = '0A0B'
  generateNewAnswer()
  return ansScreen.innerText = guessCorrection
})


// Modal part
const modal = document.getElementById("myModal");
const btn = document.getElementById("ruleBtn");
const close = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
}

close.onclick = function () {
  modal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}