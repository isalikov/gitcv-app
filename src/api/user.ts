import request from '@gitcv/services/request'
import { User } from '@gitcv/types/models'

export const fetchAuthorizedUser = async (): Promise<User> =>
    request.get<User>('/')
