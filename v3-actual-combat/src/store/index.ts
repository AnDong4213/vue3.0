import { createStore, Commit } from "vuex";
import axios from "axios";

export interface UserProps {
  isLogin: boolean;
  nickName?: string;
  _id?: string;
  column?: string;
  email?: string;
}

export interface ResponseType<P> {
  code: number;
  msg: string;
  data: P;
}
export interface ImageProps {
  _id?: string;
  url?: string;
  createdAt?: string;
  fitUrl?: string;
}
export interface ColumnProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
}
export interface PostProps {
  _id?: string;
  title: string;
  excerpt?: string;
  content?: string;
  image?: ImageProps | string;
  createdAt?: string;
  column: string;
  author?: string;
}
export interface GlobalDataProps {
  token: string;
  error: GlobalErrorProps;
  loading: boolean;
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}
export interface GlobalErrorProps {
  status: boolean;
  message?: string;
}
const getAndCommit = async (
  url: string,
  mutationName: string,
  commit: Commit
) => {
  const { data } = await axios.get(url);
  commit(mutationName, data);
  return data;
};
const postAndCommit = async (
  url: string,
  mutationName: string,
  commit: Commit,
  payload: unknown
) => {
  try {
    const { data } = await axios.post(url, payload);
    commit(mutationName, data);
    return data;
  } catch (error) {
    return Promise.reject(new Error(error.message));
  }
};

const store = createStore<GlobalDataProps>({
  state: {
    token: window.localStorage.getItem("token") || "",
    error: { status: false },
    loading: false,
    columns: [],
    posts: [],
    user: { isLogin: false }
  },
  mutations: {
    login(state, rawData) {
      const { token } = rawData.data;
      state.token = token;
      window.localStorage.setItem("token", token);
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    },
    fetchCurrentUser(state, rawData) {
      state.user = { isLogin: true, ...rawData.data };
    },
    setError(state, e: GlobalErrorProps) {
      state.error = e;
    },
    createPost(state, newPost) {
      state.posts.push(newPost);
    },
    fetchColumns(state, rawData) {
      state.columns = rawData.data.list;
    },
    fetchColumn(state, rawData) {
      state.columns = [rawData.data];
    },
    fetchPosts(state, rawData) {
      state.posts = rawData.data.list;
    },
    setLoading(state, status) {
      state.loading = status;
    },
    logout(state) {
      state.token = "";
      window.localStorage.removeItem("token");
      delete axios.defaults.headers.common.Authorization;
    }
  },
  actions: {
    fetchColumns({ commit }) {
      return getAndCommit("/columns", "fetchColumns", commit);
    },
    fetchColumn({ commit }, cid) {
      return getAndCommit(`/columns/${cid}`, "fetchColumn", commit);
    },
    fetchPosts({ commit }, cid) {
      return getAndCommit(`/columns/${cid}/posts`, "fetchPosts", commit);
    },
    login({ commit }, payload) {
      return postAndCommit("/user/login", "login", commit, payload);
    },
    fetchCurrentUser({ commit }) {
      return getAndCommit("/user/current", "fetchCurrentUser", commit);
    },
    createPost({ commit }, payload) {
      return postAndCommit("/posts", "createPost", commit, payload);
    },
    async loginAndFetch({ dispatch }, loginData) {
      await dispatch("login", loginData);
      return await dispatch("fetchCurrentUser");
    }
    /* loginAndFetch2({ dispatch }, loginData) {
      return dispatch("login", loginData).then(() => {
        return dispatch("fetchCurrentUser");
      });
    } */
  },
  getters: {
    getColumnById: state => (id: string) => {
      return state.columns.find(c => c._id === id);
    },
    getPostsByCid: state => (cid: string) => {
      return state.posts.filter(post => post.column === cid);
    }
  }
});

export default store;
