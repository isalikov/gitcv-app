import { useReducer } from 'react'

import StateContext from './StateContext'
import { Actions } from './actions'
import { onSetLocale, onSetTheme } from './handlers'
import initialState from './initialState'
import { ActionType, AppState } from './types'

const reducer = (state: AppState, action: ActionType): AppState => {
    switch (action.type) {
        case Actions.SET_LOCALE:
            return onSetLocale(state, action.payload)

        case Actions.SET_THEME:
            return onSetTheme(state, action.payload)

        default:
            return state
    }
}

const useStateContext = () => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return { StateContext, value: { state, dispatch } }
}

export default useStateContext
