import { ref, Ref, onMounted, onUnmounted } from "vue";

type MyComponentProps = Ref<null | HTMLElement>;

const useClickOutside = (elementRef: MyComponentProps) => {
  const isClickOutside = ref(false);

  const handler = (e: MouseEvent) => {
    if (elementRef.value?.contains(e.target as HTMLElement)) {
      isClickOutside.value = false;
    } else {
      isClickOutside.value = true;
    }
  };
  onMounted(() => {
    document.addEventListener("click", handler);
  });
  onUnmounted(() => {
    document.removeEventListener("click", handler);
  });

  return isClickOutside;
};

export default useClickOutside;
