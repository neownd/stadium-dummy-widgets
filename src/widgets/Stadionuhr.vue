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
  <div class="h-screen flex flex-col items-center justify-center text-white gap-5">
    <div class="text-7xl font-mono font-bold tabular-nums tracking-wider">
      {{ anzeige }}
    </div>

    <div class="flex items-center gap-2">
      <!-- -10s -->
      <button @click="springen(-10)" class="text-white/20 hover:text-white/40 p-1.5" title="-10s">
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18 17L13 12l5-5v10zM11 17L6 12l5-5v10z"/></svg>
      </button>

      <!-- -1s -->
      <button @click="springen(-1)" class="text-white/20 hover:text-white/40 p-1.5" title="-1s">
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M15 17L10 12l5-5v10z"/></svg>
      </button>

      <!-- Start/Stop -->
      <button
        @click="toggle"
        class="mx-2 w-10 h-10 rounded-full flex items-center justify-center"
        :class="laeuft ? 'bg-white/10 hover:bg-white/15' : 'bg-white/10 hover:bg-white/15'"
      >
        <!-- Play -->
        <svg v-if="!laeuft" class="w-5 h-5 ml-0.5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
        <!-- Pause -->
        <svg v-else class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>
      </button>

      <!-- +1s -->
      <button @click="springen(1)" class="text-white/20 hover:text-white/40 p-1.5" title="+1s">
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M9 7l5 5-5 5V7z"/></svg>
      </button>

      <!-- +10s -->
      <button @click="springen(10)" class="text-white/20 hover:text-white/40 p-1.5" title="+10s">
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M6 7l5 5-5 5V7zM13 7l5 5-5 5V7z"/></svg>
      </button>
    </div>

    <button @click="reset" class="text-white/20 hover:text-white/40 text-xs tracking-wide uppercase">Reset</button>
  </div>
</template>
