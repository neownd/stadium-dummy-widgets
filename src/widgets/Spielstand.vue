<script setup>
import { ref } from 'vue'

const heim = ref('Hertha BSC')
const gast = ref('Fortuna Düsseldorf')
const toreHeim = ref(0)
const toreGast = ref(0)

const ereignisse = ref([])

const typIcons = {
  tor: '\u26BD',
  gelb: '\uD83D\uDFE8',
  rot: '\uD83D\uDFE5',
  wechsel: '\uD83D\uDD04',
}
</script>

<template>
  <div class="p-3 text-white">
    <!-- Score -->
    <div class="flex items-center justify-center gap-3">
      <img src="/logos/hertha.svg" alt="" class="w-7 h-7 object-contain" />
      <span class="text-xs text-white/60 truncate max-w-20">{{ heim }}</span>
      <span class="text-2xl font-bold tabular-nums">{{ toreHeim }}</span>
      <span class="text-lg text-white/30">:</span>
      <span class="text-2xl font-bold tabular-nums">{{ toreGast }}</span>
      <span class="text-xs text-white/60 truncate max-w-20">{{ gast }}</span>
      <img src="/logos/fortuna.png" alt="" class="w-7 h-7 object-contain" />
    </div>

    <!-- Ereignisse -->
    <div v-if="ereignisse.length" class="mt-2 space-y-0.5">
      <div
        v-for="e in ereignisse"
        :key="e.id"
        class="flex items-center gap-2 text-xs text-white/70 px-1"
      >
        <span class="text-white/40 tabular-nums w-7 text-right shrink-0">{{ e.minute }}'</span>
        <span>{{ typIcons[e.typ] }}</span>
        <span class="truncate">{{ e.spieler }}</span>
      </div>
    </div>
  </div>
</template>
