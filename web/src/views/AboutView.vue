<script setup lang="ts">
import { LarkInstance } from '@/util/LarkUtil'
import { ref } from 'vue'

const state = ref<{
  res: any | undefined
}>({
  res: undefined
})

function createMeeting() {
  const res = LarkInstance.createMeeting({
    summary: '',
    description: '',
    startDate: new Date(),
    duration: 0
  })

  state.value.res = res
}
</script>

<template>
  <div class="about">
    <button @click="createMeeting">建立會議</button>
    <p>{{ JSON.stringify(state.res) }}</p>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
