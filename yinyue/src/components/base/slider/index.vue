<template>
  <div class="slider"
       ref="rootRef">
    <div class="slider-group">
      <div class="slider-page"
           v-for="item in sliders"
           :key="item.id">
        <a :href="item.link">
          <img :src="item.pic"
               class="g-img-gray" />
        </a>
      </div>
    </div>
    <div class="dots-wrapper">
      <span class="dot"
            v-for="(item, index) in sliders"
            :key="item.id"
            :class="{ active: currentPageIndex === index }">
      </span>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import useSlider from './use-slider'

export default {
  name: 'slider',
  props: {
    sliders: {
      type: Array,
      default() {
        return []
      }
    }
  },
  setup() {
    const rootRef = ref(null)
    const { currentPageIndex } = useSlider(rootRef)

    return {
      rootRef,
      currentPageIndex
    }
  }
}
</script>

<style lang="scss" scoped>
.slider {
  min-height: 1px;
  font-size: 0;
  touch-action: pan-y; // touch-action 用于设置触摸屏用户如何操纵元素的区域。pan-y启用单指垂直平移手势。
  .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    .slider-page {
      display: inline-block;
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden; // 指定当元素背面朝向观察者时是否可见
      a {
        display: block;
        width: 100%;
      }
      img {
        display: block;
        width: 100%;
      }
    }
  }
  .dots-wrapper {
    position: absolute;
    left: 50%;
    bottom: 12px;
    line-height: 12px;
    transform: translateX(-50%);
    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: $color-text-l;
      &.active {
        width: 20px;
        border-radius: 5px;
        background: $color-text-ll;
      }
    }
  }
}
</style>
