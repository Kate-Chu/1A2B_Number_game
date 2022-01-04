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
const pinkCircle = document.querySelector(".circle_b3")
const answer = [];

let corA
let corB
let guessCorrection = ''

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

// Generate answer randomly 
// 隨機指派正確答案
const generateNewAnswer = () => {
  let numArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  for (let i = 0; i < 4; i++) {
    answer[i] = numArr[Math.floor(Math.random() * numArr.length)]
    numArr.splice(numArr.indexOf(answer[i]), 1)
  }
}

// compare the guess with the answer
//  比對輸入值與答案
const getCorrection = () => {
  let guess = Array.from(guessInput.value, Number)
  let corA = 0
  let corB = 0
  for (let i = 0; i < 4; i++) {
    const answerIndex = answer.indexOf(guess[i])
    if (answerIndex === i) {
      corA++
    } else if (answerIndex !== -1) {
      corB++
    }
  }
  guessCorrection = `${corA}A${corB}B`
  return guessCorrection
}


// after guess submitted
// 提交答案以後動作
const afterSubmit = () => {
  getCorrection();
  pinkCircle.classList.add('wrong')
  pinkCircle.addEventListener('animationend', event => event.target.classList.remove('wrong'), { once: true })
  if (guessInput.value.toString('') === answer.join('')) {
    pinkCircle.classList.add('correct')
    submit.disabled = true
    return ansScreen.innerText = 'U WIN!'
  }
}

generateNewAnswer()

submit.addEventListener('click', (e) => {
  afterSubmit()
  return ansScreen.innerText = guessCorrection
})

guessInput.addEventListener('keydown', e => {
  if (e.key === "Enter") {
    e.preventDefault()
    afterSubmit()
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
  pinkCircle.style.bottom = "-20px"
  pinkCircle.classList.remove('correct')
  generateNewAnswer()
  return ansScreen.innerText = guessCorrection
})

