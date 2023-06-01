import { createContext } from 'react'

import initialState from './initialState'
import { StateContextValue } from './types'

const StateContext = createContext<StateContextValue>({
    state: initialState,
    dispatch: () => null,
})

export default StateContext
