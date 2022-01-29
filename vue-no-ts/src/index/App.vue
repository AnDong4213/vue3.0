<template>
  <!-- <m-header></m-header>
  <tab></tab> -->
  <section>
    <div>
      <router-link to="/recommend">recommend</router-link>
    </div>
    <div>
      <router-link to="/singer">singer</router-link>
    </div>
    <div>
      <router-link to="/search">search</router-link>
    </div>
    <div>
      <router-link to="/vue3">Vue3</router-link>
    </div>
  </section>
  <router-view />
</template>

<script>
// import Header from '@/components/header'
// import Tab from '@/components/tab'

export default {
  created() {
    /* console.log(process.env.NODE_ENV)
    console.log(process.env.VUE_APP_AN)
    console.log(process.env.VUE_APP_LOCAL_AN)
    console.log(process.env.VUE_APP_SECRET_KEY) */
    // console.log(process.env.NODE_ENV)
  },
  components: {
    // MHeader: Header,
    // Tab
  }
}
</script>

<style lang="scss" scoped>
section {
  display: flex;
  > div {
    margin: 10px;
  }
}
</style>
