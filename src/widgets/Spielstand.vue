<script setup>
import { ref } from 'vue'

const heim = ref('Hertha BSC')
const gast = ref('Fortuna Düsseldorf')
const toreHeim = ref(0)
const toreGast = ref(0)

const ereignisse = ref([])

const neueMinute = ref('')
const neuerTyp = ref('tor')
const neuerSpieler = ref('')

const typLabels = {
  tor: '\u26BD Tor',
  gelb: '\uD83D\uDFE8 Gelbe Karte',
  rot: '\uD83D\uDFE5 Rote Karte',
  wechsel: '\uD83D\uDD04 Auswechslung',
}

function ereignisHinzufuegen() {
  if (!neueMinute.value || !neuerSpieler.value) return
  ereignisse.value.push({
    id: Date.now(),
    minute: neueMinute.value,
    typ: neuerTyp.value,
    spieler: neuerSpieler.value,
  })
  neueMinute.value = ''
  neuerSpieler.value = ''
}

function ereignisEntfernen(id) {
  ereignisse.value = ereignisse.value.filter(e => e.id !== id)
}
</script>

<template>
  <div class="min-h-screen p-6 text-white">
    <!-- Wappen + Mannschaftsnamen -->
    <div class="flex items-center justify-center gap-4 mb-6">
      <div class="flex items-center gap-2">
        <img src="/logos/hertha.svg" alt="Hertha BSC" class="w-10 h-10 object-contain" />
        <input
          v-model="heim"
          class="bg-white/10 text-center text-lg font-semibold rounded px-3 py-1 w-44 outline-none focus:ring-1 focus:ring-white/30"
        />
      </div>
      <span class="text-white/40 text-sm">vs</span>
      <div class="flex items-center gap-2">
        <input
          v-model="gast"
          class="bg-white/10 text-center text-lg font-semibold rounded px-3 py-1 w-44 outline-none focus:ring-1 focus:ring-white/30"
        />
        <img src="/logos/fortuna.png" alt="Fortuna Düsseldorf" class="w-10 h-10 object-contain" />
      </div>
    </div>

    <!-- Spielstand -->
    <div class="flex items-center justify-center gap-6 mb-8">
      <div class="flex items-center gap-3">
        <button @click="toreHeim > 0 && toreHeim--" class="bg-white/10 hover:bg-white/20 rounded-full w-8 h-8 text-lg">-</button>
        <span class="text-5xl font-bold tabular-nums w-12 text-center">{{ toreHeim }}</span>
        <button @click="toreHeim++" class="bg-white/10 hover:bg-white/20 rounded-full w-8 h-8 text-lg">+</button>
      </div>
      <span class="text-3xl text-white/40 font-light">:</span>
      <div class="flex items-center gap-3">
        <button @click="toreGast > 0 && toreGast--" class="bg-white/10 hover:bg-white/20 rounded-full w-8 h-8 text-lg">-</button>
        <span class="text-5xl font-bold tabular-nums w-12 text-center">{{ toreGast }}</span>
        <button @click="toreGast++" class="bg-white/10 hover:bg-white/20 rounded-full w-8 h-8 text-lg">+</button>
      </div>
    </div>

    <!-- Ereignis hinzufügen -->
    <div class="flex flex-wrap items-end gap-2 mb-6">
      <input
        v-model="neueMinute"
        type="number"
        min="1"
        max="120"
        placeholder="Min"
        class="bg-white/10 rounded px-3 py-2 w-20 outline-none focus:ring-1 focus:ring-white/30 text-sm"
      />
      <select
        v-model="neuerTyp"
        class="bg-white/10 rounded px-3 py-2 outline-none focus:ring-1 focus:ring-white/30 text-sm"
      >
        <option value="tor">Tor</option>
        <option value="gelb">Gelbe Karte</option>
        <option value="rot">Rote Karte</option>
        <option value="wechsel">Auswechslung</option>
      </select>
      <input
        v-model="neuerSpieler"
        placeholder="Spieler"
        class="bg-white/10 rounded px-3 py-2 flex-1 min-w-32 outline-none focus:ring-1 focus:ring-white/30 text-sm"
        @keyup.enter="ereignisHinzufuegen"
      />
      <button
        @click="ereignisHinzufuegen"
        class="bg-white/15 hover:bg-white/25 rounded px-4 py-2 text-sm font-medium"
      >
        Hinzufügen
      </button>
    </div>

    <!-- Ereignisliste -->
    <div class="space-y-1">
      <div
        v-for="e in ereignisse"
        :key="e.id"
        class="flex items-center gap-3 bg-white/5 rounded px-3 py-2 text-sm group"
      >
        <span class="text-white/50 tabular-nums w-10">{{ e.minute }}'</span>
        <span>{{ typLabels[e.typ] }}</span>
        <span class="text-white/80">{{ e.spieler }}</span>
        <button
          @click="ereignisEntfernen(e.id)"
          class="ml-auto text-white/30 hover:text-white/70 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          &times;
        </button>
      </div>
      <p v-if="ereignisse.length === 0" class="text-white/30 text-sm text-center py-4">
        Noch keine Ereignisse
      </p>
    </div>
  </div>
</template>
