import { createRouter, createWebHistory } from 'vue-router'
import Spielstand from './widgets/Spielstand.vue'
import Stadionuhr from './widgets/Stadionuhr.vue'
import Notizen from './widgets/Notizen.vue'

const routes = [
  { path: '/spielstand', component: Spielstand },
  { path: '/stadionuhr', component: Stadionuhr },
  { path: '/notizen', component: Notizen },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
