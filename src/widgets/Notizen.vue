<script setup>
import { ref } from 'vue'

const text = ref('')
</script>

<template>
  <div class="h-screen p-3 text-white">
    <textarea
      v-model="text"
      placeholder="Notizen hier eingeben..."
      class="w-full h-full bg-transparent text-white placeholder-white/30 p-3 outline-none resize-none text-sm leading-relaxed"
    ></textarea>
  </div>
</template>
