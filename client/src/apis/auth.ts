import request from '../utils/request'
import {
  LoginBodyDto,
  LoginResponseDto,
  RegisterBodyDto,
  RegisterResponseDto,
  CheckTokenBodyDto,
  CheckTokenResponseDto,
} from '../@types/dto'

// 登录
export async function signIn(payload: any): Promise<any> {
  return new Promise((resolve, reject) => {
    request
      .post<any>('/auth/login', payload)
      .then((data) => {
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

// 注册
export async function signUp(payload: any): Promise<any> {
  return new Promise((resolve, reject) => {
    request
      .post<any>('/auth/signup', payload)
      .then((data) => {
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export function checkToken(payload: any): Promise<any> {
  return new Promise((resolve, reject) => {
    request
      .post<any>('/auth/checkToken', payload)
      .then((data) => {
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
