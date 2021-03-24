import { createStore } from "vuex";
import { testData, testPosts, ColumnProps, PostProps } from "@/testData";
// export { ColumnProps, PostProps } from "@/testData";
interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
  columnId?: number;
}

export interface GlobalDataProps {
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}

const store = createStore<GlobalDataProps>({
  state: {
    columns: testData,
    posts: testPosts,
    user: { isLogin: true, name: "viking", columnId: 1 }
  },
  getters: {
    getColumnById: state => (id: number) => {
      return state.columns.find(c => c.id === id);
    },
    getPostsByCid: state => (cid: number) =>
      state.posts.filter(post => post.columnId === cid)
  },
  mutations: {
    login(state) {
      state.user = { ...state.user, isLogin: true, name: "viking" };
    },
    createPost(state, newPost) {
      state.posts.push(newPost);
    }
  },
  actions: {},
  modules: {}
});

export default store;
