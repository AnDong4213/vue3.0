export const mix = {
  data() {
    return {
      age: 18,
      sex: 'female',
      name: '八戒'
    }
  },
  mounted: function () {
    this.age++;
    window.console.log(this.age) //11
  },
  computed: {
    say: function () {
      return '我在mix里面'
    }
  },
  methods: {
    print: function () {
      return '这里是mix';
    }
  }
}