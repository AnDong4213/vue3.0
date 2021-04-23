import { createStore, Commit } from "vuex";
import axios, { AxiosRequestConfig } from "axios";

export interface UserProps {
  isLogin: boolean;
  nickName?: string;
  _id?: string;
  column?: string;
  email?: string;
  avatar?: ImageProps;
  description?: string;
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
  author?: string | UserProps;
  isHTML?: boolean;
}
export interface GlobalErrorProps {
  status: boolean;
  message?: string;
}

interface ListProps<P> {
  [id: string]: P;
}

export interface GlobalPostsProps {
  data: ListProps<PostProps>;
  loadedColumns: ListProps<{ total?: number; currentPage?: number }>;
}

export interface GlobalDataProps {
  token: string;
  error: GlobalErrorProps;
  loading: boolean;
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}

/* const getAndCommit = async (
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
    console.log("payload", payload);
    const { data } = await axios.post(url, payload);
    commit(mutationName, data);
    return data;
  } catch (error) {
    return Promise.reject(new Error(error.message));
  }
}; */
const asyncAndCommit = async (
  url: string,
  mutationName: string,
  commit: Commit,
  config: AxiosRequestConfig = { method: "get" }
) => {
  try {
    const { data } = await axios(url, {
      method: config.method,
      data: config.data
    });
    // console.log(data);
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
    createPost(state, { data }) {
      state.posts.push(data);
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
    fetchPost(state, { data }) {
      state.posts = [data];
    },
    updatePost(state, { data }) {
      state.posts = state.posts.map(post => {
        if (post._id === data._id) {
          return data;
        } else {
          return post;
        }
      });
    },
    setLoading(state, status) {
      state.loading = status;
    },
    deletePost(state, { data }) {
      state.posts = state.posts.filter(post => post._id !== data._id);
    },
    logout(state) {
      state.token = "";
      window.localStorage.removeItem("token");
      delete axios.defaults.headers.common.Authorization;
    }
  },
  actions: {
    fetchColumns({ commit }) {
      return asyncAndCommit("/columns", "fetchColumns", commit);
    },
    fetchColumn({ commit }, cid) {
      return asyncAndCommit(`/columns/${cid}`, "fetchColumn", commit);
    },
    fetchPosts({ commit }, cid) {
      return asyncAndCommit(`/columns/${cid}/posts`, "fetchPosts", commit);
    },
    login({ commit }, payload) {
      return asyncAndCommit("/user/login", "login", commit, {
        data: payload,
        method: "post"
      });
    },
    fetchCurrentUser({ commit }) {
      return asyncAndCommit("/user/current", "fetchCurrentUser", commit);
    },
    createPost({ commit }, payload) {
      return asyncAndCommit("/posts", "createPost", commit, {
        data: payload,
        method: "post"
      });
    },
    updatePost({ commit }, { id, payload }) {
      return asyncAndCommit(`/posts/${id}`, "updatePost", commit, {
        method: "patch",
        data: payload
      });
    },
    deletePost({ commit }, id) {
      return asyncAndCommit(`/posts/${id}`, "deletePost", commit, {
        method: "delete"
      });
    },
    async loginAndFetch({ dispatch }, loginData) {
      await dispatch("login", loginData);
      return await dispatch("fetchCurrentUser");
    },
    /* loginAndFetch2({ dispatch }, loginData) {
      return dispatch("login", loginData).then(() => {
        return dispatch("fetchCurrentUser");
      });
    } */
    fetchPost({ commit, state }, id) {
      const data = state.posts;
      const certainPost = data[0];
      if (!certainPost || !certainPost.content) {
        return asyncAndCommit(`/posts/${id}`, "fetchPost", commit);
      } else {
        return Promise.resolve({ data: certainPost });
      }
    }
  },
  getters: {
    getColumnById: state => (id: string) => {
      return state.columns.find(c => c._id === id);
    },
    getPostsByCid: state => (cid: string) => {
      return state.posts.filter(post => post.column === cid);
    },
    getCurrentPost: state => (id: string) => {
      return state.posts.find(post => post._id === id);
    }
  }
});

export default store;
