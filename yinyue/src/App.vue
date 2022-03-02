<template>
  <m-header></m-header>
  <tab></tab>
  <router-view />
  <player></player>
</template>

<script>
import Header from '@/components/header'
import Tab from '@/components/tab'
import Player from '@/components/player/player'

export default {
  components: {
    MHeader: Header,
    Tab,
    Player
  }
}
</script>
