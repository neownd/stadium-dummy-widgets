<script setup>
import { ref, computed, onUnmounted } from 'vue'

const sekunden = ref(0)
const laeuft = ref(false)
let interval = null

const anzeige = computed(() => {
  const total = Math.max(0, sekunden.value)
  const min = Math.floor(total / 60)
  const sek = total % 60
  return `${String(min).padStart(2, '0')}:${String(sek).padStart(2, '0')}`
})

function starten() {
  if (laeuft.value) return
  laeuft.value = true
  interval = setInterval(() => {
    sekunden.value++
  }, 1000)
}

function stoppen() {
  laeuft.value = false
  clearInterval(interval)
  interval = null
}

function toggle() {
  laeuft.value ? stoppen() : starten()
}

function springen(delta) {
  sekunden.value = Math.max(0, sekunden.value + delta)
}

function reset() {
  stoppen()
  sekunden.value = 0
}

onUnmounted(() => {
  clearInterval(interval)
})
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center text-white gap-8">
    <!-- Zeitanzeige -->
    <div class="text-8xl font-mono font-bold tabular-nums tracking-wider">
      {{ anzeige }}
    </div>

    <!-- Sprung-Buttons -->
    <div class="flex items-center gap-2">
      <button
        @click="springen(-10)"
        class="bg-white/10 hover:bg-white/20 rounded px-4 py-2 text-sm font-medium"
      >
        -10s
      </button>
      <button
        @click="springen(-1)"
        class="bg-white/10 hover:bg-white/20 rounded px-4 py-2 text-sm font-medium"
      >
        -1s
      </button>
      <button
        @click="toggle"
        class="rounded px-6 py-2 text-sm font-semibold"
        :class="laeuft ? 'bg-red-500/80 hover:bg-red-500' : 'bg-green-500/80 hover:bg-green-500'"
      >
        {{ laeuft ? 'Stop' : 'Start' }}
      </button>
      <button
        @click="springen(1)"
        class="bg-white/10 hover:bg-white/20 rounded px-4 py-2 text-sm font-medium"
      >
        +1s
      </button>
      <button
        @click="springen(10)"
        class="bg-white/10 hover:bg-white/20 rounded px-4 py-2 text-sm font-medium"
      >
        +10s
      </button>
    </div>

    <!-- Reset -->
    <button
      @click="reset"
      class="text-white/40 hover:text-white/70 text-sm"
    >
      Reset
    </button>
  </div>
</template>
