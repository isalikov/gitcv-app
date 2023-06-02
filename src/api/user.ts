import { User } from '@isalikov/gitcv-api'

import { AxiosResponse } from 'axios'

import request from '@gitcv/services/request'

export const fetchAuthorizedContext = async (): Promise<User> => {
    const { data } = await request.get<User, AxiosResponse<User>>('/user')

    return data
}
