import { UpdateUserBody, User } from '@isalikov/gitcv-api'

import request from '@gitcv/services/request'

export const fetchAuthorizedContext = async (): Promise<User> => {
    const { data } = await request.get<User>('/user')

    return data
}

export const syncAuthorizedUser = async (): Promise<User> => {
    const { data } = await request.post<User>('/user/sync')

    return data
}

export const updateAuthorizedUser = async (
    body: UpdateUserBody
): Promise<User> => {
    const { data } = await request.patch<User>('/user', body)

    return data
}
