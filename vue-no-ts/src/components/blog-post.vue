<script>
import { h } from 'vue'

export default {
  render() {
    return h('div', null, [
      'Some text comes first.',
      h('header', this.$slots.header()),
      h('main', this.$slots.default()),
      h('footer', this.$slots.footer())
    ])
  }
}
</script>
