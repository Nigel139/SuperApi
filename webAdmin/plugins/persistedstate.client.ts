import { defineNuxtPlugin } from '#app'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import type { Pinia } from 'pinia' 

export default defineNuxtPlugin((nuxtApp) => {

  const pinia = nuxtApp.$pinia as Pinia | undefined
  if (pinia) {
    pinia.use(createPersistedState({
      storage: import.meta.client ? localStorage : undefined,
      auto: true
    }))
  } else {
    console.warn('Pinia instance not found. Persistence plugin skipped.')
  }
})