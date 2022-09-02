import { configureStore } from '@reduxjs/toolkit'

import account from './account'
import env from './env'

export const store = configureStore({
    reducer: {
        env,
        account,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
