<script>
import { h } from 'vue'

function getChildrenTextContent(children) {
  return children
    .map((node) => {
      return typeof node.children === 'string'
        ? node.children
        : Array.isArray(node.children)
        ? getChildrenTextContent(node.children)
        : ''
    })
    .join('')
}

export default {
  props: {
    level: {
      type: Number,
      required: true
    }
  },
  render() {
    // console.log(this.$slots.default())
    const headingId = getChildrenTextContent(this.$slots.default())
      .toLowerCase()
      .replace(/\W+/g, '-')
      .replace(/(^-|-$)/g, '')

    return h(`h${this.level}`, null, [
      h(
        'a',
        {
          name: headingId,
          href: `#${headingId}`,
          class: 'a-style',
          onClick: ($event) => console.log('clicked', $event.target)
        },
        this.$slots.default()
      ),
      Array.from({ length: 20 }).map(() => {
        return h('span', 'hi')
      })
    ])
  }
}
</script>

<style lang="scss" scoped>
.a-style {
  color: orange;
}
</style>
