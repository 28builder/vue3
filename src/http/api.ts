import $http from './index'

interface loginData {
    userName: string,
    password: string
}
export const login = (data: loginData) => $http({url: '/login', method: 'post', data})
export const getList = (data: any) => $http({url: '/getList', method: 'get', data})
export const getRouter = () => $http({url: '/getRouter', method: 'get'})