  <template>
  <div class="player">
    <div class="normal-player"
         v-show="fullScreen">
      <div class="background">
        <img :src="currentSong.pic">
      </div>
      <div class="top">
        <div class="back"
             @click="goBack">
          <i class="icon-back"></i>
        </div>
        <h1 class="title">{{currentSong.name}}</h1>
        <h2 class="subtitle">{{currentSong.singer}}</h2>
      </div>
      <div class="middle">
        <div class="middle-l"
             :style="middleLStyle">
          <div ref="cdWrapperRef"
               class="cd-wrapper">
            <div ref="cdRef"
                 class="cd">
              <img ref="cdImageRef"
                   class="image"
                   :class="cdCls"
                   :src="currentSong.pic">
            </div>
          </div>
          <!-- <div class="playing-lyric-wrapper">
            <div class="playing-lyric">{{playingLyric}}</div>
          </div> -->
        </div>
        <!-- <scroll class="middle-r"
                ref="lyricScrollRef"
                :style="middleRStyle">
          <div class="lyric-wrapper">
            <div v-if="currentLyric"
                 ref="lyricListRef">
              <p class="text"
                 :class="{'current': currentLineNum ===index}"
                 v-for="(line,index) in currentLyric.lines"
                 :key="line.num">
                {{line.txt}}
              </p>
            </div>
            <div class="pure-music"
                 v-show="pureMusicLyric">
              <p>{{pureMusicLyric}}</p>
            </div>
          </div>
        </scroll> -->
      </div>
      <div class="bottom">
        <div class="dot-wrapper">
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
        <div class="progress-wrapper">
          <span class="time time-l">{{formatTime(currentTime)}}</span>
          <div class="progress-bar-wrapper">
            <progress-bar ref="barRef"
                          :progress="progress"
                          @progress-changing="onProgressChanging"
                          @progress-changed="onProgressChanged"></progress-bar>
          </div>
          <span class="time time-r">{{formatTime(currentSong.duration)}}</span>
        </div>
        <div class="operators">
          <div class="icon i-left">
            <i @click="changeMode"
               :class="modeIcon"></i>
          </div>
          <div class="icon i-left"
               :class="disableCls">
            <i @click="prev"
               class="icon-prev"></i>
          </div>
          <div class="icon i-center"
               :class="disableCls">
            <i @click="togglePlay"
               :class="playIcon"></i>
          </div>
          <div class="icon i-right"
               :class="disableCls">
            <i @click="next"
               class="icon-next"></i>
          </div>
          <div class="icon i-right">
            <i @click="toggleFavorite(currentSong)"
               :class="getFavoriteIcon(currentSong)"></i>
          </div>
        </div>
      </div>
    </div>
    <!--oncanplay 当媒介能够开始播放但可能因缓冲而需要停止时运行脚本 -->
    <audio ref="audioRef"
           @pause="pause"
           @canplay="ready"
           @error="error"
           @timeupdate="updateTime"
           @ended="end"></audio>
  </div>
</template>

<script>
import { computed, watch, ref } from 'vue'
import { useStore } from 'vuex'
import useMode from './use-mode'
import useFavorite from './use-favorite'
import useCd from './use-cd'
import ProgressBar from './progress-bar'
import { formatTime } from '@/assets/js/util'
import { PLAY_MODE } from '@/assets/js/constant'
import './player.scss'

export default {
  setup() {
    // data
    const audioRef = ref(null)
    const songReady = ref(false)
    const currentTime = ref(0)
    const barRef = ref(null)
    let progressChanging = false

    // vuex
    const store = useStore()
    const fullScreen = computed(() => store.state.fullScreen)
    const currentSong = computed(() => store.getters.currentSong)
    const playing = computed(() => store.state.playing)
    const currentIndex = computed(() => store.state.currentIndex)
    const playMode = computed(() => store.state.playMode)

    // hooks
    const { modeIcon, changeMode } = useMode()
    const { getFavoriteIcon, toggleFavorite } = useFavorite()
    const { cdCls, cdRef, cdImageRef } = useCd()

    // computed
    const playlist = computed(() => store.state.playlist)
    const playIcon = computed(() => {
      return playing.value ? 'icon-pause' : 'icon-play'
    })
    const disableCls = computed(() => {
      return songReady.value ? '' : 'disable'
    })
    const progress = computed(() => currentTime.value / currentSong.value.duration)

    // watch
    watch(currentSong, (newSong) => {
      if (!newSong.id || !newSong.url) {
        return
      }
      currentTime.value = 0
      songReady.value = false
      const audioEl = audioRef.value
      audioEl.src = newSong.url
      audioEl.play()
    })
    watch(playing, (newPlaying) => {
      if (!songReady.value) {
        return
      }
      const audioEl = audioRef.value
      if (newPlaying) {
        audioEl.play()
      } else {
        audioEl.pause()
      }
    })

    // methods
    function goBack() {
      store.commit('setFullScreen', false)
    }

    function prev() {
      const list = playlist.value
      if (!songReady.value || !list.length) {
        return
      }
      if (list.length === 1) {
        loop()
      } else {
        let index = currentIndex.value - 1
        if (index === -1) {
          index = list.length - 1
        }
        store.commit('setCurrentIndex', index)
        if (!playing.value) {
          store.commit('setPlayingState', true)
        }
      }
    }

    function togglePlay() {
      if (!songReady.value) {
        return
      }
      store.commit('setPlayingState', !playing.value)
    }

    function next() {
      const list = playlist.value
      if (!songReady.value || !list.length) {
        return
      }

      if (list.length === 1) {
        loop()
      } else {
        let index = currentIndex.value + 1
        if (index === list.length) {
          index = 0
        }
        store.commit('setCurrentIndex', index)
        if (!playing.value) {
          store.commit('setPlayingState', true)
        }
      }
    }

    function loop() {
      const audioEl = audioRef.value
      audioEl.currentTime = 0
      audioEl.play()
      store.commit('setPlayingState', true)
    }

    function pause() {
      store.commit('setPlayingState', false)
    }

    function ready() {
      if (songReady.value) {
        return
      }
      songReady.value = true
    }

    function error() {
      songReady.value = true
    }

    function updateTime(e) {
      if (!progressChanging) {
        currentTime.value = e.target.currentTime
      }
    }

    function onProgressChanging(progress) {
      progressChanging = true
      currentTime.value = currentSong.value.duration * progress
    }

    function onProgressChanged(progress) {
      progressChanging = false
      audioRef.value.currentTime = currentTime.value = currentSong.value.duration * progress
    }

    function end() {
      currentTime.value = 0
      if (playMode.value === PLAY_MODE.loop) {
        loop()
      } else {
        next()
      }
    }

    return {
      audioRef,
      barRef,
      fullScreen,
      currentSong,
      progress,
      currentTime,
      playIcon,
      disableCls,
      goBack,
      prev,
      togglePlay,
      next,
      pause,
      ready,
      error,
      updateTime,
      onProgressChanging,
      onProgressChanged,
      formatTime,
      end,
      // mode
      modeIcon,
      changeMode,
      // favorite
      getFavoriteIcon,
      toggleFavorite,
      // cd
      cdCls,
      cdRef,
      cdImageRef
    }
  },
  components: {
    ProgressBar
  }
}
</script>
