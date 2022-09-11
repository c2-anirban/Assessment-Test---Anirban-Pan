import axiosClient from '../AxiosClient/axiosClient';

const AuthService = {
  isLoggedIn: () => {
    let token = localStorage.getItem('token');
    if (token === undefined || token === null) {
      return false;
    }
    return true;
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  setToken: (token) => {
    localStorage.setItem('token', token);
  },
  getToken: () => {
    return localStorage.getItem('token');
  },
  removeToken: () => {
    localStorage.removeItem('token');
  },

  loginByEmailPassword: (data) => {
    return axiosClient.post('/api/auth/signin', data);
  },
};

export default AuthService;
