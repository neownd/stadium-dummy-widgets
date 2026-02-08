<script setup>
import { ref } from 'vue'

const heim = ref('Hertha BSC')
const gast = ref('Fortuna Düsseldorf')
const toreHeim = ref(2)
const toreGast = ref(1)

const ereignisse = ref([
  { id: 1, minute: 12, typ: 'tor', spieler: 'Scherhant' },
  { id: 2, minute: 34, typ: 'gelb', spieler: 'Appelkamp' },
  { id: 3, minute: 51, typ: 'tor', spieler: 'Tabakovic' },
  { id: 4, minute: 67, typ: 'wechsel', spieler: 'Reyna → Kenny' },
  { id: 5, minute: 73, typ: 'tor', spieler: 'Hennings' },
  { id: 6, minute: 88, typ: 'rot', spieler: 'Iyoha' },
])

const typIcons = {
  tor: '\u26BD',
  gelb: '\uD83D\uDFE8',
  rot: '\uD83D\uDFE5',
  wechsel: '\uD83D\uDD04',
}
</script>

<template>
  <div class="p-4 text-white">
    <!-- Score -->
    <div class="flex items-center justify-center gap-4">
      <img src="/logos/hertha.svg" alt="" class="w-10 h-10 object-contain" />
      <span class="text-sm text-white/70">{{ heim }}</span>
      <span class="text-4xl font-bold tabular-nums">{{ toreHeim }}</span>
      <span class="text-2xl text-white/30">:</span>
      <span class="text-4xl font-bold tabular-nums">{{ toreGast }}</span>
      <span class="text-sm text-white/70">{{ gast }}</span>
      <img src="/logos/fortuna.png" alt="" class="w-10 h-10 object-contain" />
    </div>

    <!-- Ereignisse -->
    <div v-if="ereignisse.length" class="mt-4 space-y-1">
      <div
        v-for="e in ereignisse"
        :key="e.id"
        class="flex items-center gap-3 text-sm text-white/70 px-2"
      >
        <span class="text-white/40 tabular-nums w-8 text-right shrink-0">{{ e.minute }}'</span>
        <span>{{ typIcons[e.typ] }}</span>
        <span>{{ e.spieler }}</span>
      </div>
    </div>
  </div>
</template>
