import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 15000,
});

api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('ag_token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

api.interceptors.response.use(
  res => res,
  err => {
    const msg = err.response?.data?.message || 'An error occurred';
    return Promise.reject(new Error(msg));
  }
);

export const propertyService = {
  getAll:     (params) => api.get('/properties', { params }),
  getById:    (id)     => api.get(`/properties/${id}`),
  create:     (data)   => api.post('/properties', data),
  update:     (id, d)  => api.put(`/properties/${id}`, d),
  delete:     (id)     => api.delete(`/properties/${id}`),
  getFeatured:()       => api.get('/properties/featured'),
  getMine:    ()       => api.get('/properties/mine'),
};

export const authService = {
  login:    (d) => api.post('/auth/login', d),
  register: (d) => api.post('/auth/register', d),
  me:       ()  => api.get('/auth/me'),
};

export const reviewService = {
  create:    (pid, d) => api.post(`/properties/${pid}/reviews`, d),
  getByProp: (pid)    => api.get(`/properties/${pid}/reviews`),
};

export default api;
