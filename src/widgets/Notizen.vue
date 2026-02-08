<script setup>
import { ref } from 'vue'

const text = ref('')
</script>

<template>
  <div class="min-h-screen p-6 text-white">
    <textarea
      v-model="text"
      placeholder="Notizen hier eingeben..."
      class="w-full h-[calc(100vh-3rem)] bg-white/5 text-white placeholder-white/30 rounded-lg p-4 outline-none resize-none focus:ring-1 focus:ring-white/20 text-sm leading-relaxed"
    ></textarea>
  </div>
</template>
