import qs from "qs";

const apiUrl = process.env.VUE_APP_API_URL;

interface Config extends RequestInit {
  token?: string;
  data?: Record<string, unknown>;
}

export const fetchHttp = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
): Promise<any> => {
  const config = {
    method: "GET",
    headers: {
      "Content-Type": data ? "application/json" : "",
      Authorization: token ? `${token}` : "",
      ...headers
    },
    ...customConfig
  };
  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        // await auth.logout();
        window.location.reload();
        return Promise.reject({ message: "请重新登录" });
      }

      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
};

export const useFetchHttp = (
  ...[endpoint, config]: Parameters<typeof fetchHttp>
): Promise<any> => {
  const token = "eyJhbGciOiJIUzI1NiJ9";

  return fetchHttp(endpoint, { ...config, token });
};
