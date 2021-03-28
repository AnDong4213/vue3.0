import { createStore } from "vuex";
import { testPosts } from "@/testData";
import axios from "axios";

interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
  columnId?: number;
}

interface ImageProps {
  _id?: string;
  url?: string;
  createdAt?: string;
}
export interface ColumnProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
}
export interface PostProps {
  id: number;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
  columnId: number;
}

export interface GlobalDataProps {
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}

const store = createStore<GlobalDataProps>({
  state: {
    columns: [],
    posts: testPosts,
    user: { isLogin: true, name: "viking", columnId: 1 }
  },
  getters: {
    getColumnById: state => (id: string) => {
      return state.columns.find(c => c._id === id);
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
    },
    fetchColumns(state, rawData) {
      state.columns = rawData.data.list;
    }
  },
  actions: {
    fetchColumns(context) {
      axios.get("/columns").then(resp => {
        context.commit("fetchColumns", resp.data);
      });
    }
  },
  modules: {}
});

export default store;
