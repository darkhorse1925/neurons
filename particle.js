const header = document.querySelector('header')
const canvas = document.getElementById('particle-area')
const ctx = canvas.getContext('2d')

canvas.width= header.offsetWidth
canvas.height = header.offsetHeight

window.addEventListener('resize', ()=>{
  canvas.width= header.offsetWidth
  canvas.height = header.offsetHeight
})

function clear () {
  ctx.clearRect(0,0, canvas.width, canvas.height)
}

//settings 
const count = 10
let particleArray = []
const maxVelocity = 2
const minVelocity = 0.5
ctx.lineWidth = 1

console.log(Math.round(Math.random()) ? 1 : -1)

class Particle {
  constructor() {
    this.radius = Math.random() *7+ 3
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height

    this.velocityX = Math.random() * maxVelocity + minVelocity
    this.velocityX *= Math.round(Math.random()) ? 1 : -1

    this.velocityY = Math.random() * maxVelocity + minVelocity
    this.velocityY *= Math.round(Math.random()) ? 1 : -1

    this.color = `hsl(${Math.random() * 360}, 100%,50%)`

  }

  draw() {
    ctx.fillStyle = this.color
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI *2)
      ctx.fill()
  }

  update() {
    this.draw()
    if (this.x > canvas.width || this.x < 0) {
      this.velocityX = -this.velocityX
    } 
    this.x += this.velocityX
    if (this.y > canvas.height || this.y < 0) {
      this.velocityY = -this.velocityY
    } 
    this.y += this.velocityY
  }
}

function init() {
  for (let i= 0 ; i< count; i++) {
    particleArray.push(new Particle)
  }
}
init()


function connect() {
  let distanceX 
  let distanceY
  let distance
  for(let i=0; i < count; i++){
    for(let j=i; j< count; j++){
      distanceX= particleArray[i].x - particleArray[j].x
      distanceY = particleArray[i].y - particleArray[j].y
      distance = Math.sqrt((distanceX*distanceX)+(distanceY*distanceY))
      if (distance < 200) {
        ctx.strokeStyle = 'lightgrey'
        ctx.beginPath()
        ctx.moveTo(particleArray[i].x, particleArray[i].y)
        ctx.lineTo(particleArray[j].x, particleArray[j].y)
        ctx.stroke()
      }
    }
  }
}



function render() {
  clear()
  for (let i= 0; i< count; i++) {
    particleArray[i].update()
  }
  connect()
  requestAnimationFrame(render)
}

render()
