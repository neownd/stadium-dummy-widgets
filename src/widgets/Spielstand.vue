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
  { id: 4, minute: 67, typ: 'wechsel', spieler: 'Reyna \u2192 Kenny' },
  { id: 5, minute: 73, typ: 'tor', spieler: 'Hennings' },
  { id: 6, minute: 88, typ: 'rot', spieler: 'Iyoha' },
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

      <div class="flex items-baseline gap-3">
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
    <div v-if="ereignisse.length" class="mt-5 border-t border-white/10 pt-3 space-y-1.5">
      <div
        v-for="e in ereignisse"
        :key="e.id"
        class="flex items-center gap-3 text-[13px] text-white/70"
      >
        <span class="tabular-nums w-8 text-right text-white/40 shrink-0">{{ e.minute }}'</span>

        <!-- Tor -->
        <svg v-if="e.typ === 'tor'" class="w-4 h-4 shrink-0 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2 L14.5 8.5 L21 9.5 L16.5 14 L17.5 21 L12 17.5 L6.5 21 L7.5 14 L3 9.5 L9.5 8.5 Z" />
        </svg>

        <!-- Gelbe Karte -->
        <span v-else-if="e.typ === 'gelb'" class="w-3 h-4 rounded-[2px] bg-yellow-400 shrink-0"></span>

        <!-- Rote Karte -->
        <span v-else-if="e.typ === 'rot'" class="w-3 h-4 rounded-[2px] bg-red-500 shrink-0"></span>

        <!-- Auswechslung -->
        <svg v-else-if="e.typ === 'wechsel'" class="w-4 h-4 shrink-0 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
        </svg>

        <span>{{ e.spieler }}</span>
      </div>
    </div>
  </div>
</template>
