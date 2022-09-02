import { PayloadAction } from '@reduxjs/toolkit'

import { AccountState } from '@gitcv/store/account/types'
import { User } from '@gitcv/types/models'

const onSetAction = (
    state: AccountState,
    action: PayloadAction<User>
): AccountState => {
    return {
        ...state,
        email: action.payload.email || '',
        login: action.payload.login,
        name: action.payload.name,
        photo: action.payload.photo,
        cv: action.payload.cv,
    }
}

export default onSetAction
