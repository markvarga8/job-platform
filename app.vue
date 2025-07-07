<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'

const { loadUser } = useAuth()
loadUser()
</script>
