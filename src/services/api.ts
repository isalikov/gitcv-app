import { User } from '@gitcv/types/models'

import request from './request'

export const fetchAuthorizedUser = async (): Promise<User> => {
    const { data } = await request.get<User>('/')

    return data
}
