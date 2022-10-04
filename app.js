// forked and edited from https://github.com/kubowania/whac-a-mole

const squares = document.querySelectorAll('.square')
const mole = document.querySelector('.mole')
const timeLeft = document.querySelector('#time-left')
const score = document.querySelector('#score')
const timePerformance = document.querySelector('#time_performance')

let result = 0
let hitPosition
let currentTime = 1000
let timerId = null
let numTrials = 0;
let timeperformance = 0.0;
let lastPerformance = 0.0;
let performanceHistory =[];

let timed = false;

squares.forEach(square => {
  square.addEventListener('mousedown', () => {
    if (square.id == hitPosition) {
      timeperformance = performance.now(); 
      if(result > 0){
        
        performanceHistory.push(timeperformance - lastPerformance);
      }
      
      result++
      score.textContent = result + " / " + numTrials  + " trials"
      hitPosition = null
      square.classList.remove('mole')
      square.classList.add('cleared')
      if (timed == false) randomSquare();
    }
  })
})
if (timed == false) randomSquare();



function randomSquare() {
  lastPerformance = performance.now();
  squares.forEach(square => {
    square.classList.remove('mole')
    square.classList.remove('cleared')
  })

  let randomSquare = squares[Math.floor(Math.random() * 16)]
  randomSquare.classList.add('mole')

  hitPosition = randomSquare.id
}



//function moveMole() {
//  timerId = setInterval(randomSquare, 500)
//}

//moveMole()

function countDown() {
 if (timed == true) randomSquare();
 numTrials++;
 currentTime--
 timeLeft.textContent = currentTime 

 if (currentTime == 0) {
   clearInterval(countDownTimerId)
   clearInterval(timerId)
   score.textContent = result + " / " + numTrials  + " trials"
   alert('GAME OVER! Your final score is ' + result)
   performanceHistory.sort((a,b)=>a-b);
   performanceHistory.forEach(x=>timePerformance.innerHTML += "<br>" + x);
   
 }

}


let countDownTimerId = setInterval(countDown, 400)
//let timeoutId = setTimeout(countDown, 1000)


