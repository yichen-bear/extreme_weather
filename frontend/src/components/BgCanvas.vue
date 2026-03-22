<template>
  <canvas ref="canvasRef" id="bg-canvas"></canvas>
  <div class="atm-top"></div>
  <div class="atm-bot"></div>
  <div class="scanlines"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref(null)
let W,
  H,
  particles = [],
  animId

const rand = (a, b) => a + Math.random() * (b - a)

const spawn = () => ({
  x: rand(0, W),
  y: rand(0, H),
  vx: rand(-0.3, 0.3),
  vy: rand(-0.6, -0.1),
  r: rand(0.5, 2),
  alpha: rand(0.1, 0.5),
  color: Math.random() > 0.7 ? '#ff6b35' : '#00e5ff',
  life: rand(80, 200),
  age: 0,
})

const draw = (ctx) => {
  ctx.clearRect(0, 0, W, H)
  particles.forEach((p, i) => {
    p.x += p.vx
    p.y += p.vy
    p.age++
    const t = p.age / p.life
    const a = p.alpha * (t < 0.1 ? t * 10 : t > 0.7 ? (1 - t) / 0.3 : 1)

    ctx.beginPath()
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
    ctx.fillStyle = p.color
    ctx.globalAlpha = a
    ctx.fill()

    if (p.age >= p.life) particles[i] = spawn()
  })

  ctx.globalAlpha = 1
  ctx.lineWidth = 0.4
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x
      const dy = particles[i].y - particles[j].y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 90) {
        ctx.beginPath()
        ctx.moveTo(particles[i].x, particles[i].y)
        ctx.lineTo(particles[j].x, particles[j].y)
        ctx.strokeStyle = `rgba(0,229,255,${0.08 * (1 - dist / 90)})`
        ctx.stroke()
      }
    }
  }
  animId = requestAnimationFrame(() => draw(ctx))
}

const handleResize = () => {
  W = canvasRef.value.width = window.innerWidth
  H = canvasRef.value.height = window.innerHeight
}

onMounted(() => {
  const ctx = canvasRef.value.getContext('2d')
  handleResize()
  particles = Array.from({ length: 120 }, spawn)
  draw(ctx)
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  cancelAnimationFrame(animId)
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
#bg-canvas {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
.atm-top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 40vh;
  background: radial-gradient(ellipse at 50% 0%, rgba(0, 80, 120, 0.35) 0%, transparent 70%);
  z-index: 0;
  pointer-events: none;
}
.atm-bot {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 30vh;
  background: radial-gradient(ellipse at 50% 100%, rgba(255, 80, 30, 0.15) 0%, transparent 70%);
  z-index: 0;
  pointer-events: none;
}
.scanlines {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.03;
  background: repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 2px, #fff 3px);
}
</style>
