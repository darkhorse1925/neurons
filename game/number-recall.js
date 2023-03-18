const playArea = document.getElementById('play-area')
const levelDisplay = document.getElementById('level')

let level = 0
let number = ''



function numberGenerator(count) {
  let num = ''
  for(let i = 0; i < count; i++){
    num += Math.floor(Math.random() * 10)
  }
  return num
}

let timerBar 
let timerSize = 100

function decreaseTimer() {
  const currentTime = document.getElementById('current-time')
  currentTime.style.width = timerSize + 'px' 
  timerBar = setTimeout(decreaseTimer, 10 * level)
  timerSize--
}

function enterNumber () {
  clearTimeout(timerBar)
  console.log(timerSize)

  let str = '?'
  playArea.innerHTML = `
    <div style ="font-size:2rem" >${str.repeat(level)}</div>
    <input id='number-input' autocomplete='off' />
    <button class='next-btn' onclick='check()'>Submit</button>
  `
  document.getElementById('number-input').focus()
}

/*~~~~~~~~~= GAME STARTS HERE =~~~~~~~~~*/
function start() {
  level = 0
  play()
}

function play() {
  level += 1
  levelDisplay.innerHTML = `Level: ${level}`

  number = numberGenerator(level)
  playArea.innerHTML = `
    <div id='number-display'>${number}</div>
    <div id="timer">
      <div id="current-time"></div>
    </div>
    `
  timerSize = 100
  decreaseTimer()
  setTimeout(enterNumber, level * 1000)
}

function check () {
  const userInput = document.getElementById('number-input')
  if(userInput.value){
    if (userInput.value === number){
      playArea.innerHTML = `
        <div>
          <div class='result'>Number</div>
          <div class='result-num'>${number}</div>
        </div>
        <div>
          <div class='result'>Your Answer</div>
          <div class='result-num'>${userInput.value}</div>
        </div>
        <button class='next-btn' onclick='play()'>Next</button>
      `
    }
    else{
      let errorString = ``
      for (let i = 0; i < level ; i++) {
        if (userInput.value.charAt(i) !== number.charAt(i)){
          errorString += `<span style='color: red'>${userInput.value.charAt(i)}</span>`
        } else errorString += userInput.value.charAt(i)
      }
      playArea.innerHTML = `
        <div>
          <div class='result'>Number</div>
          <div class='result-num'>${number}</div>
        </div>
        <div>
          <div class='result'>Your Answer</div>
          <div class='result-num'>${errorString}</div>
        </div>
        <div class='result-num'>Your Level: ${level}</div>
        <button class='next-btn' onclick='start()'>Restart</button>
      `
    }
  }
}



