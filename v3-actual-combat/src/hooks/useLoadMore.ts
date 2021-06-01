import { ref, computed, ComputedRef } from "vue";
import { useStore } from "vuex";

interface LoadPrams {
  currentPage?: number;
  pageSize?: number;
  [key: string]: any;
}

const useLoadMore = (
  actionName: string,
  total: ComputedRef<number>,
  params: LoadPrams = {}
): any => {
  const store = useStore();
  const currentPage = ref((params && params.currentPage) || 1);
  const pageSize = ref((params && params.pageSize) || 5);
  const requestParams = computed(() => {
    return {
      ...params,
      currentPage: currentPage.value + 1
    };
  });

  const loadMorePage = () => {
    store.dispatch(actionName, requestParams.value).then(() => {
      currentPage.value++;
    });
  };

  const isLastPage = computed(() => {
    return Math.floor((total.value || 1) / pageSize.value) < currentPage.value;
  });

  return {
    currentPage,
    loadMorePage,
    isLastPage
  };
};

export default useLoadMore;
