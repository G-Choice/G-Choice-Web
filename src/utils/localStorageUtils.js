import Cookies from 'js-cookie';
export const setToken = token => localStorage.setItem('token', token);
export const removeToken = () => localStorage.removeItem('token');
export const getToken = () => localStorage.getItem('token');
export const hasToken = () => !!localStorage.getItem('token');

export const AuthUtils =  {
  setToken,
  removeToken,
  getToken,
  hasToken
}