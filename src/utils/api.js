//const API_URL = "http://localhost:8080/https://bowdens.me/api";
const API_URL = "/api";

export const api = {
  get: async (endpoint, init = {}) => {
    const res = await fetch(`${API_URL}${endpoint}`, {
            ...init,
            method: 'GET',
            headers: {
                ...(init.headers ? init.headers : {}),
            }
        });
        if (!res.ok) {
            return res.json().catch(() => {
                return { error: 'Could not decode JSON' };
            }).then(({ error }) => {
                return Promise.reject(new Error(error));
            });
        } else {
            return res.json();
        }
  },
  post: async (endpoint, body = {}, init = {}) => {
    const res = await fetch(`${API_URL}${endpoint}`, {
          ...init,
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
              ...(init.headers ? init.headers : {}),
              'Content-Type': 'application/json',
          }
      });
      if (!res.ok) {
          return res.json().catch(() => {
              return { error: 'Could not decode JSON' };
          }).then(({ error }) => {
              return Promise.reject(new Error(error));
          });
      } else {
          return res.json();
      }
  },
  put: async (endpoint, body = {}, init = {}) => {
    const res = await fetch(`${API_URL}${endpoint}`, {
          ...init,
          method: 'PUT',
          body: JSON.stringify(body),
          headers: {
              ...(init.headers ? init.headers : {}),
              'Content-Type': 'application/json',
          }
      });
      if (!res.ok) {
          return res.json().catch(() => {
              return { error: 'Could not decode JSON' };
          }).then(({ error }) => {
              return Promise.reject(new Error(error));
          });
      } else {
          return res.json();
      }
  },
  delete: async (endpoint, init = {}) => {
    const res = await fetch(`${API_URL}${endpoint}`, {
          ...init,
          method: 'DELETE',
          headers: {
              ...(init.headers ? init.headers : {}),
          }
      });
      if (!res.ok) {
          return res.json().catch(() => {
              return { error: 'Could not decode JSON' };
          }).then(({ error }) => {
              return Promise.reject(new Error(error));
          });
      } else {
          return res.json();
      }
  },
  descriptors: () => api.get("/"),
  soldier: {
      first:(degree, n) => api.get(`/soldier/first/${degree}/${n}`),
      last: (degree, n) => api.get(`/soldier/first/${degree}/${n}`)
  },
  magic: {
      blue: {
          name:  (degree, n) => api.get(`/blue/name/${degree}/${n}`),
          stats:  (degree, n) => api.get(`/blue/stats/${degree}/${n}`),
          text: (degree, n) => api.get(`/blue/text/${degree}/${n}`)
      }
  }
};