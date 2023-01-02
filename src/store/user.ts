import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { User } from '@gitcv/types/models'

export type UserState = {
    pending: boolean
    succeed: boolean
    error: boolean
    status?: number
    user?: User
}

const initialState: UserState = {
    pending: false,
    succeed: false,
    error: false,
}

const onUserFetchingStart = (state: UserState): UserState => ({
    ...state,
    error: false,
    pending: true,
    succeed: false,
})

const onUserFetchingSucceed = (
    state: UserState,
    action: PayloadAction<User>
): UserState => ({
    ...state,
    error: false,
    pending: false,
    succeed: true,
    status: 200,
    user: action.payload,
})
const onUserFetchingError = (
    state: UserState,
    action: PayloadAction<number | undefined>
): UserState => ({
    ...state,
    error: true,
    pending: false,
    succeed: false,
    status: action.payload,
})

export const envSlice = createSlice({
    initialState,
    name: 'user',
    reducers: {
        userFetchingStart: onUserFetchingStart,
        userFetchingSucceed: onUserFetchingSucceed,
        userFetchingError: onUserFetchingError,
    },
})

export const { userFetchingStart, userFetchingSucceed, userFetchingError } =
    envSlice.actions

export default envSlice.reducer
