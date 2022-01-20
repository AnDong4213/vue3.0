<template>
  <m-header></m-header>
  <tab></tab>
  <router-view />
</template>

<script>
import Header from '@/components/header'
import Tab from '@/components/tab'

export default {
  components: {
    MHeader: Header,
    Tab
  }
}
</script>
