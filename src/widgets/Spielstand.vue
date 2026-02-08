<script setup>
import { ref } from 'vue'

const heim = ref('Hertha BSC')
const gast = ref('Fortuna Düsseldorf')
const toreHeim = ref(2)
const toreGast = ref(1)

const ereignisse = ref([
  { id: 1, minute: 12, typ: 'tor', spieler: 'Scherhant', team: 'heim' },
  { id: 2, minute: 34, typ: 'gelb', spieler: 'Appelkamp', team: 'gast' },
  { id: 3, minute: 51, typ: 'tor', spieler: 'Tabakovic', team: 'heim' },
  { id: 4, minute: 67, typ: 'wechsel', spieler: 'Reyna \u2192 Kenny', team: 'heim' },
])
</script>

<template>
  <div class="p-5 text-white">
    <!-- Score -->
    <div class="flex items-center justify-center gap-5">
      <div class="flex items-center gap-3">
        <img src="/logos/hertha.svg" alt="" class="w-11 h-11 object-contain" />
        <span class="text-sm font-medium text-white/80">{{ heim }}</span>
      </div>

      <div class="flex items-center gap-3">
        <span class="text-5xl font-bold tabular-nums">{{ toreHeim }}</span>
        <span class="text-2xl font-light text-white/30">:</span>
        <span class="text-5xl font-bold tabular-nums">{{ toreGast }}</span>
      </div>

      <div class="flex items-center gap-3">
        <span class="text-sm font-medium text-white/80">{{ gast }}</span>
        <img src="/logos/fortuna.png" alt="" class="w-11 h-11 object-contain" />
      </div>
    </div>

    <!-- Ereignisse -->
    <div v-if="ereignisse.length" class="mt-5 space-y-px">
      <div
        v-for="e in ereignisse"
        :key="e.id"
        class="flex items-center bg-white/[0.03] hover:bg-white/[0.06] transition-colors rounded-lg px-4 py-2.5"
      >
        <!-- Minute -->
        <span class="tabular-nums text-xs font-medium text-white/40 w-10 shrink-0">{{ e.minute }}'</span>

        <!-- Icon -->
        <div class="w-8 shrink-0 flex justify-center">
          <!-- Tor -->
          <span v-if="e.typ === 'tor'" class="w-5 h-5 rounded-full border-2 border-white/50 flex items-center justify-center text-[9px] font-bold text-white/50">G</span>
          <!-- Gelbe Karte -->
          <span v-else-if="e.typ === 'gelb'" class="w-3.5 h-[18px] rounded-[2px] bg-yellow-400"></span>
          <!-- Rote Karte -->
          <span v-else-if="e.typ === 'rot'" class="w-3.5 h-[18px] rounded-[2px] bg-red-500"></span>
          <!-- Auswechslung -->
          <svg v-else-if="e.typ === 'wechsel'" class="w-4 h-4 text-emerald-400/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 15l4-4-4-4" /><path d="M19 9l-4 4 4 4" />
          </svg>
        </div>

        <!-- Spieler -->
        <span class="text-sm text-white/75 flex-1">{{ e.spieler }}</span>

        <!-- Team-Indikator -->
        <span class="text-[11px] text-white/30 uppercase tracking-wider">{{ e.team === 'heim' ? heim : gast }}</span>
      </div>
    </div>
  </div>
</template>
