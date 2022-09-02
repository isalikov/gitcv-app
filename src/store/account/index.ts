import { createSlice } from '@reduxjs/toolkit'

import { onSetAction } from './actions'
import initialState from './initialState'

export const envSlice = createSlice({
    initialState,
    name: 'account',
    reducers: {
        setAccountAction: onSetAction,
    },
})

export const { setAccountAction } = envSlice.actions

export default envSlice.reducer
