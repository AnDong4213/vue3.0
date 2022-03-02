  <template>
  <div class="player">
    <div class="normal-player"
         v-show="fullScreen">
      <div class="background">
        <img :src="currentSong.pic">
      </div>
      <div class="top">
        <div class="back">
          <i class="icon-back"></i>
        </div>
        <h1 class="title">{{currentSong.name}}</h1>
        <h2 class="subtitle">{{currentSong.singer}}</h2>
      </div>
    </div>
    <audio ref="audioRef"></audio>
  </div>
</template>

<script>
import { computed, watch, ref } from 'vue'
import { useStore } from 'vuex'
import './player.scss'

export default {
  setup() {
    const audioRef = ref(null)
    // vuex
    const store = useStore()
    const fullScreen = computed(() => store.state.fullScreen)
    const currentSong = computed(() => store.getters.currentSong)

    return {
      fullScreen,
      currentSong
    }
  }
}
</script>
