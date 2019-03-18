import axiosDefault from 'axios'

const token = document.head.querySelector('meta[name="csrf-token"]');
let axiosWithToken = axiosDefault

axiosWithToken.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
axiosWithToken.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

export default axiosWithToken