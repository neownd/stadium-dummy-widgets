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

    <div class="flex items-center gap-2">
      <button @click="springen(-10)" class="flex items-center gap-1.5 bg-white/[0.06] hover:bg-white/[0.1] transition-colors rounded-lg px-3 py-2 text-xs text-white/50" title="-10s">
        <ChevronsLeft :size="14" :stroke-width="1.5" /> 10s
      </button>
      <button @click="springen(-1)" class="flex items-center gap-1.5 bg-white/[0.06] hover:bg-white/[0.1] transition-colors rounded-lg px-3 py-2 text-xs text-white/50" title="-1s">
        <SkipBack :size="14" :stroke-width="1.5" /> 1s
      </button>

      <button
        @click="toggle"
        class="flex items-center gap-1.5 bg-white/[0.08] hover:bg-white/[0.13] transition-colors rounded-lg px-5 py-2 text-sm text-white/70"
      >
        <Play v-if="!laeuft" :size="16" :stroke-width="1.5" />
        <Pause v-else :size="16" :stroke-width="1.5" />
        {{ laeuft ? 'Stop' : 'Start' }}
      </button>

      <button @click="springen(1)" class="flex items-center gap-1.5 bg-white/[0.06] hover:bg-white/[0.1] transition-colors rounded-lg px-3 py-2 text-xs text-white/50" title="+1s">
        1s <SkipForward :size="14" :stroke-width="1.5" />
      </button>
      <button @click="springen(10)" class="flex items-center gap-1.5 bg-white/[0.06] hover:bg-white/[0.1] transition-colors rounded-lg px-3 py-2 text-xs text-white/50" title="+10s">
        10s <ChevronsRight :size="14" :stroke-width="1.5" />
      </button>
    </div>

    <button @click="reset" class="flex items-center gap-1.5 bg-white/[0.04] hover:bg-white/[0.08] transition-colors rounded-lg px-3 py-1.5 text-xs text-white/30">
      <RotateCcw :size="12" :stroke-width="1.5" />
      Reset
    </button>
  </div>
</template>
