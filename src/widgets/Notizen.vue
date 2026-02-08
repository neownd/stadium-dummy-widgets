<script setup>
import { ref } from 'vue'

const text = ref('')
</script>

<template>
  <div class="h-screen p-3 text-white">
    <textarea
      v-model="text"
      placeholder="Notizen hier eingeben..."
      class="w-full h-full bg-white/5 text-white placeholder-white/30 rounded p-3 outline-none resize-none focus:ring-1 focus:ring-white/20 text-sm leading-relaxed"
    ></textarea>
  </div>
</template>
