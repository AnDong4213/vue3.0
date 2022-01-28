<template>
  <!-- <m-header></m-header>
  <tab></tab> -->
  <router-view />
</template>

<script>
// import Header from '@/components/header'
// import Tab from '@/components/tab'

export default {
  created() {
    console.log(process.env.NODE_ENV)
    console.log(process.env.VUE_APP_SECRET_KEY)
  },
  components: {
    // MHeader: Header,
    // Tab
  }
}
</script>
