export default function ({ store, redirect }) {
    if (!process.client) return;
  
    const token = localStorage.getItem('token');
    console.log('token',token)
    console.log('process client', process.client)
    if (!token) {
      return window.location.href='/login'
    }
  }