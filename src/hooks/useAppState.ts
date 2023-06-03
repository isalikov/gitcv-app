import { useContext } from 'react'

import { StateContext } from '@gitcv/state'
import { AppState } from '@gitcv/state/types'

const useAppState = (): AppState => {
    const { state } = useContext(StateContext)

    return state
}

export default useAppState
