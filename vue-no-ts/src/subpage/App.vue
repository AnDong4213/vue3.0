<template>
  <section>
    <div>
      <router-link to="/recommend">recommend2</router-link>
    </div>
    <div>
      <router-link to="/singer">singer2</router-link>
    </div>
    <h2>我的第二个页面</h2>
  </section>
  <router-view />
</template>

<script>
// import Header from '@/components/header'
// import Tab from '@/components/tab'

export default {
  created() {},
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
