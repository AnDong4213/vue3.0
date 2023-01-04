<template>
  <svg aria-hidden="true">
    <use :xlink:href="`#icon-${iconName}`" />
  </svg>
</template>
<script lang="ts">
export default {
  name: 'SvgIcon',
  props: {
    iconName: {
      type: String,
      default: '',
      require: true
    }
  }
}
</script>
