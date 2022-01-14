/**
 *
 * @param {number} x x
 * @param {number} y y
 * @param {number} radius radius
 * @param {string | array} color example: "red" | ["red", "blue"]
 * @param {{number, number}} velocity 
 * @param {number} timeToLeave ms
 * @param {CanvasRenderingContext2D} canvasContent
 */
function Particle(x, y, radius, color, velocity, timeToLeave, canvasContent) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.velocity = velocity;
  this.ctx = canvasContent;
  this.ttl = timeToLeave;
  this.color = "black";
  if (typeof color === "string") this.color = color;
  else if (Array.isArray(color))
    this.color = color[~~(Math.random() * color.length)];

  const self = this;
  const PI = Math.PI;

  self.draw = function () {
    self.ctx.beginPath();
    self.ctx.arc(self.x, self.y, self.radius, 0, PI * 2);
    self.ctx.fillStyle = self.color;
    self.ctx.fill();
    self.ctx.closePath();
  };

  self.update = function () {
    self.draw();
    self.x += self.velocity.x;
    self.y += self.velocity.y;
    self.ttl--;
  };
}

const main = ((Particle) => {
  const size = { width: window.innerWidth, height: window.innerHeight };
  const colors = [
    "#5e02e9",
    "#3c70ef",
    "#30d800",
    "#e7e200",
    "#fd8b00",
    "#f20800",
    "#ffffff",
  ];
  const canvas = document.querySelector("#canvas");
  canvas.width = size.width;
  canvas.height = size.height;
  const ctx = canvas.getContext("2d");
  let particles = [];
  const particleCount = 20;
  const mouse = {
    x : canvas.width/2,
    y : canvas.height/2
  }
  function init() {
    // particles = [];
    for (let index = 0; index < particleCount; index++) {
      const radian = (Math.PI * 2) / particleCount;
      const velocity = {
        x: Math.cos(radian * index),
        y: Math.sin(radian * index),
      };
      particles.push(new Particle(mouse.x, mouse.y, 10, colors, velocity, 300, ctx));
    }
  }
  function generationCircle(){
    init();
    setTimeout(generationCircle, 350);
  }
  function animation() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle, index) => {
      if(particle.ttl === 0){
        particles.splice(index, 1);
      }
      particle.update();
    });
    requestAnimationFrame(animation);
  }
  init();
  animation();
  generationCircle();
  canvas.addEventListener("click", (event)=> {
    mouse.x = event.x;
    mouse.y = event.y;
  })
})(Particle);
