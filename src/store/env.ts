import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Locale } from '@gitcv/types/i18'

export type EnvState = {
    locale: Locale
}

const initialState: EnvState = {
    locale: Locale.en,
}

const onSetLocaleAction = (
    state: EnvState,
    action: PayloadAction<Locale>
): EnvState => {
    return {
        ...state,
        locale: action.payload,
    }
}

export const envSlice = createSlice({
    initialState,
    name: 'env',
    reducers: {
        setLocaleAction: onSetLocaleAction,
    },
})

export const { setLocaleAction } = envSlice.actions

export default envSlice.reducer
