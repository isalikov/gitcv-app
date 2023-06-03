import { User } from '@isalikov/gitcv-api'

import { AxiosResponse } from 'axios'

import request from '@gitcv/services/request'

export const fetchAuthorizedContext = async (): Promise<User> => {
    const { data } = await request.get<User, AxiosResponse<User>>('/user')

    return data
}

export const syncAuthorizedUser = async (): Promise<User> => {
    const { data } = await request.post<User, AxiosResponse<User>>('/user/sync')

    return data
}
