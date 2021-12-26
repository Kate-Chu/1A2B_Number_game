const guessInput = document.querySelector("#guessInput");
const submit = document.querySelector("#submit");
const ansScreen = document.querySelector(".ans-screen");
const showAns = document.querySelector("#show-ans");
const newGame = document.querySelector("#new-game");
const rule = document.querySelector(".rule")
const ruleText = document.querySelector("rule-text")
const modal = document.querySelector("#myModal");
const btn = document.querySelector("#ruleBtn");
const close = document.getElementsByClassName("close")[0];
const answer = [];

let corA
let corB
let guessCorrection = ''

// Generate answer randomly 
// 隨機指派正確答案
const generateNewAnswer = () => {
  let numArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  for (let i = 0; i < 4; i++) {
    answer[i] = numArr[Math.floor(Math.random() * numArr.length)]
    numArr.splice(numArr.indexOf(answer[i]), 1)
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

// Examine if the correct number but incorrect index
// 比對Ｂ值（數字正確，位置不正確）
const getCorrectB = () => {
  let guess = Array.from(guessInput.value, Number)
  corB = 0
  for (let guessNum of guess) {
    if (answer.indexOf(guessNum) !== -1) {
      corB += 1
    }
  }
  if (corA > 0) {
    corB -= corA
  }
  return corB
}

generateNewAnswer()

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

guessInput.addEventListener('keydown', e => {
  if (e.key === "Enter") {
    e.preventDefault()
    getCorrectA();
    getCorrectB();
    guessCorrection = `${corA}A${corB}B`
    if (guessInput.value.toString('') === answer.join('')) {
      submit.disabled = true;
      return ansScreen.innerText = 'U WIN!'
    }

    return ansScreen.innerText = guessCorrection
  }
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

// Modal
btn.onclick = () => {
  modal.style.display = "block"
}

close.onclick = () => {
  modal.style.display = "none"
}

window.onclick = e => {
  if (e.target == modal) {
    modal.style.display = "none"
  }
}