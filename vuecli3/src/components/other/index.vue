<template>
  <div class="parent">
    <draggable v-model="myArray"
               group="people"
               @start="drag = true"
               @end="drag = false">
      <div v-for="element in myArray"
           :key="element.id">
        {{ element.name }}
      </div>
    </draggable>
  </div>
</template>
<script>
import draggable from "vuedraggable";

export default {
  data() {
    return {
      myArray: [
        {
          name: "vue.draggable",
          order: 1,
          fixed: true,
          disabled: true
        },
        {
          name: "draggable",
          order: 2,
          fixed: true
        },
        {
          name: "component",
          order: 3,
          fixed: false
        },
        {
          name: "for",
          order: 4,
          fixed: false
        },
        {
          name: "vue.js 2.0",
          order: 5,
          fixed: false
        },
        {
          name: "based",
          order: 6,
          fixed: false
        },
        {
          name: "on",
          order: 7,
          fixed: false
        },
        {
          name: "Sortablejs",
          order: 8,
          fixed: false
        }
      ],
      obj: {
        name: "1",
        age: 8
      }
    };
  },
  components: {
    draggable
  },
  created() {
    let key = "name";
    let { obj } = this;
    obj = { ...obj, ...{ [key]: "nale" } };
    window.console.log(obj);
    this.$set(this.obj, obj);
  },
  mounted() {
    window.console.log(this.obj);
  },
  methods: {}
};
</script>
