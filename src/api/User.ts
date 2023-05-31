import { User } from '@isalikov/gitcv-api'

import { AxiosResponse } from 'axios'

import request from '@gitcv/services/request'

export const fetchAuthorizedUser = async () => {
    const { data } = await request.get<User, AxiosResponse<User>>('/user')

    return data
}
