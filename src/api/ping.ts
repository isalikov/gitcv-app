import request from '@services/request'
import { IUser } from '@interfaces/User'

const ping = async (): Promise<IUser | null> =>
    request.get<IUser>('/').catch(() => null)

export default ping
