import axios from 'axios';

// Single shared axios instance for the whole app. Replaces the old pattern of
// every context re-reading `import.meta.env.VITE_API_URL` and re-mutating the
// global `axios.defaults` (which used to happen as a side effect inside
// AuthContext on import).
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // send/receive the HttpOnly `token` cookie on every request
});

// Centralized 401 handling: if a request comes back unauthorized, broadcast an
// event so AuthContext can clear the logged-in user and redirect, instead of
// every single context having to know how to react to a 401 individually.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      window.dispatchEvent(new CustomEvent('auth:unauthorized'));
    }
    return Promise.reject(error);
  }
);

export default api;

/**
 * Pulls a human-readable message out of an axios error, falling back to a
 * generic message. Centralizes the `err.response?.data?.message || err.message`
 * pattern that was previously repeated ad hoc (and inconsistently) across
 * every context.
 */
export function getErrorMessage(err, fallback = 'Something went wrong. Please try again.') {
  return err?.response?.data?.message || err?.message || fallback;
}
