<template>
  <h1 v-show="modalIsOpen">{{count}}</h1>
  <h1>{{double}}</h1>
  <button @click="increase">+1</button><br />
  <search-input></search-input>
  <!-- <ul>
    <li v-for="number in numbers"
        :key="number">
      <h1>{{number}}</h1>
    </li>
  </ul> -->
  <h1>{{person.name}}</h1>
  <h1>{{greetings}}</h1>

  <p style="color: red;">{{error}}</p>
  <Suspense>
    <template #default>
      <div>
        <async-show />
        <dog-show />
      </div>
    </template>
    <template #fallback>
      <h1>Loading !...</h1>
    </template>
  </Suspense>

  <button @click="openModal">Open Modal</button><br />
  <modal :isOpen="modalIsOpen"
         @close-modal="onModalClose">
    <template v-slot:header>
      <div>kkk</div>
    </template>
    <p style="color: red;">ee</p>
  </modal>

  <h1 v-if="
         loading">Loading!...</h1>
  <img style="width: 200px;height: 100px;"
       v-if="loaded"
       :src="result[0].url">
  <h1>X: {{x}}, Y: {{y}}</h1>
  <button :style="{'font-size': postFontSize+ 'px'}"
          @click="updateGreeting">Update Title</button>
  <HelloWorld @enlarge-text="postFontSize += $event"
              msg="mm" />
</template>

<script lang="ts">
// import {defineComponent,ref,computed,reactive,toRefs,onMounted,onUpdated,onRenderTriggered} from "vue";
import {
  defineComponent,
  ref,
  computed,
  reactive,
  toRefs,
  watch,
  onErrorCaptured
} from "vue";
import HelloWorld from "@/components/HelloWorld.vue";
import Modal from "@/components/Modal.vue";
import AsyncShow from "@/components/AsyncShow.vue";
import DogShow from "@/components/DogShow.vue";
import useMousePosition from "@/hooks/useMousePosition";
import useURLLoader from "@/hooks/useURLLoader";

interface DataProps {
  count: number;
  double: number;
  increase: () => void;
  numbers: number[];
  person: { name?: string };
}
interface DogResult {
  message: string;
  status: string;
}
interface CatResult {
  id: string;
  url: string;
  width: number;
  height: number;
}

export default defineComponent({
  name: "App",
  data() {
    return {
      postFontSize: 16
    };
  },
  setup() {
    // count就是一个(把js原始类型转化为响应对象)响应式的对象，可以监测到改变
    /* const count = ref(0);
    const double = computed(() => {
      return count.value * 2;
    });
    const increase = () => {
      count.value++;
    };
    return {
      count,
      increase,
      double
    }; */

    /* onMounted(() => {
      console.log("onMounted");
    });
    onUpdated(() => {
      console.log("onUpdated");
    });
    onRenderTriggered(event => {
      console.log(event);
    }); */

    const error = ref(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onErrorCaptured((e: any) => {
      error.value = e;
      return true;
    });

    const data: DataProps = reactive({
      count: 0,
      increase: () => data.count++,
      double: computed(() => data.count * 2),
      numbers: [0, 1, 2],
      person: {}
    });
    data.numbers[0] = 6;
    data.person.name = "vip";

    const { x, y } = useMousePosition();
    const { result, loading, loaded } = useURLLoader<CatResult[]>(
      "https://api.thecatapi.com/v1/images/search?limit=1"
    );
    watch(result, () => {
      if (result.value) {
        console.log("result", result.value[0]?.url);
      }
    });

    const greetings = ref("");
    const updateGreeting = () => {
      greetings.value += "Hello! ";
    };
    /* watch(greetings, (newVal, oldVal) => {
      console.log(newVal, oldVal);
      document.title = "updated" + greetings.value;
    }); */
    // watch([greetings, data], (newVal, oldVal) => {
    watch([greetings, () => data.count], (newVal, oldVal) => {
      console.log(newVal, oldVal);
      document.title = "updated" + greetings.value + data.count;
    });

    const modalIsOpen = ref(false);
    const openModal = () => {
      modalIsOpen.value = true;
    };

    const onModalClose = (a: unknown) => {
      console.log("a", a);
      modalIsOpen.value = false;
    };

    const refData = toRefs(data);
    return {
      ...refData,
      greetings,
      updateGreeting,
      x,
      y,
      result,
      loading,
      loaded,
      modalIsOpen,
      openModal,
      onModalClose,
      error
    };
  },
  /* provide: {
    user: "John Doe"
  }, */
  provide() {
    // console.log("this", this);
    return {
      // user: this.modalIsOpen
      user: computed(() => this.modalIsOpen),
      haha: "hhaha"
    };
  },
  components: {
    HelloWorld,
    Modal,
    AsyncShow,
    DogShow
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
