import { User } from '@isalikov/gitcv-api'

import request from '@gitcv/services/request'

export const fetchAuthorizedContext = async (): Promise<User> => {
    const { data } = await request.get<User>('/user')

    return data as User
}

export const syncAuthorizedUser = async (): Promise<User> => {
    const { data } = await request.post<User>('/user/sync')

    return data as User
}
