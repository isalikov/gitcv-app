import { CV } from '@gitcv/types/models'

export type AccountState = {
    email: string
    login: string
    name: string
    photo: string
    cv: Array<CV>
}
