import { combineReducers, compose, createStore } from 'redux'

import { IUser } from '@interfaces/User'

import env, { envState, EnvState } from './reducers/env'

export interface ReduxState {
    env: EnvState
}

const initialState: ReduxState = {
    env: envState,
}

const composeEnhancers =
    process.env.NODE_ENV !== 'production'
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
        : compose

const enhancers = composeEnhancers()
const reducers = combineReducers<ReduxState>({ env })

export default (user: IUser | null) => {
    console.log(user)

    return createStore(reducers, initialState, enhancers)
}
