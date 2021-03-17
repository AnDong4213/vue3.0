import { onMounted, onUnmounted, reactive, toRefs } from "vue";

const useMousePosition = () => {
  /* const x = ref(0);
  const y = ref(0);

  const updateMouse = (e: MouseEvent) => {
    x.value = e.pageX;
    y.value = e.pageY;
  };
  onMounted(() => {
    document.addEventListener("click", updateMouse);
  });
  onUnmounted(() => {
    document.removeEventListener("click", updateMouse);
  });

  return { x, y }; */

  const data = reactive({
    x: 0,
    y: 0
  });

  const updateMouse = (e: MouseEvent) => {
    data.x = e.pageX;
    data.y = e.pageY;
  };
  onMounted(() => {
    document.addEventListener("click", updateMouse);
  });
  onUnmounted(() => {
    document.removeEventListener("click", updateMouse);
  });
  const refData = toRefs(data);

  return { ...refData };
};

export default useMousePosition;
