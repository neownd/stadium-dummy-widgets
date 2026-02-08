<script setup>
import { ref, computed, onUnmounted } from 'vue'
import { Play, Pause, SkipBack, SkipForward, ChevronsLeft, ChevronsRight, RotateCcw } from 'lucide-vue-next'

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
  <div class="h-screen flex flex-col items-center justify-center text-white gap-6">
    <div class="text-7xl font-mono font-bold tabular-nums tracking-wider">
      {{ anzeige }}
    </div>

    <div class="flex items-center gap-1">
      <button @click="springen(-10)" class="text-white/20 hover:text-white/45 transition-colors p-2" title="-10s">
        <ChevronsLeft :size="20" :stroke-width="1.5" />
      </button>
      <button @click="springen(-1)" class="text-white/20 hover:text-white/45 transition-colors p-2" title="-1s">
        <SkipBack :size="18" :stroke-width="1.5" />
      </button>

      <button
        @click="toggle"
        class="mx-3 w-12 h-12 rounded-full flex items-center justify-center bg-white/[0.07] hover:bg-white/[0.12] transition-colors"
      >
        <Play v-if="!laeuft" :size="22" :stroke-width="1.5" class="ml-0.5" />
        <Pause v-else :size="22" :stroke-width="1.5" />
      </button>

      <button @click="springen(1)" class="text-white/20 hover:text-white/45 transition-colors p-2" title="+1s">
        <SkipForward :size="18" :stroke-width="1.5" />
      </button>
      <button @click="springen(10)" class="text-white/20 hover:text-white/45 transition-colors p-2" title="+10s">
        <ChevronsRight :size="20" :stroke-width="1.5" />
      </button>
    </div>

    <button @click="reset" class="flex items-center gap-1.5 text-white/20 hover:text-white/45 transition-colors text-xs tracking-wide uppercase">
      <RotateCcw :size="12" :stroke-width="1.5" />
      Reset
    </button>
  </div>
</template>
