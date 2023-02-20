import Cookies from 'js-cookie'

export function setToken(params) {
  return  Cookies.set('TOKEN',params)
}   

export const getToken = () => {
  return Cookies.get('TOKEN')
}

export function removeToken() {
  return  Cookies.remove('TOKEN')
}