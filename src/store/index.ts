import { configureStore } from '@reduxjs/toolkit'

import env from './env'
import user from './user'

export const store = configureStore({
    reducer: {
        env,
        user,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
