<template>
  <div>
    search
  </div>
</template>

<script>
export default {
  name: 'search',
  components: {},
  created() {
    /* const courseWeeks = [
      '2022-4-5',
      '2022-4-6',
      '2022-4-12',
      '2022-4-13',
      '2022-4-19',
      '2022-4-20',
      '2022-4-26',
      '2022-4-27'
    ]
    // console.log(courseWeeks)
    const users = [
      ['08:03', '08:26'],
      ['13:06', '13:29']
    ]
    const setArr = new Set(courseWeeks)
    const mapArr = new Map(users) */
    // console.log(setArr)
    // console.log(mapArr)
    /* for (const item of setArr.entries()) {
      console.log(item)
    } */
    /* for (const mapItem of mapArr.entries()) {
      for (const setItem of setArr.entries()) {
        setItem[0] = setItem[0] + ' ' + mapItem[0]
        setItem[1] = setItem[1] + ' ' + mapItem[1]
        console.log(setItem)
      }
    } */
    /* const timeSection = []
    for (const setItem of setArr.entries()) {
      for (const mapItem of mapArr.entries()) {
        mapItem[0] = setItem[0] + ' ' + mapItem[0]
        mapItem[1] = setItem[1] + ' ' + mapItem[1]
        timeSection.push(mapItem)
      }
    }
    console.log(timeSection)

    Array('4')
      .fill()
      .forEach((item, index) => {
        console.log(index)
      }) */
  }
}
</script>
