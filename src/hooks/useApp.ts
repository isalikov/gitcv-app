import { useContext, useEffect } from 'react'

import { matchPath } from 'react-router-dom'

import { fetchAuthorizedContext } from '@gitcv/api/user'
import { FETCH_INITIAL_STATE_DEBOUNCE } from '@gitcv/constants'
import { StateContext } from '@gitcv/state'
import { Actions } from '@gitcv/state/actions'
import { debounceRun } from '@gitcv/utils'

const useApp = () => {
    const { state, dispatch } = useContext(StateContext)

    const isLoading = state.fetchState.pending
    const isReady = !state.fetchState.idle && !isLoading && !!state.user

    const fetchInitialState = async () => {
        const timestamp = Date.now()

        dispatch({ type: Actions.FETCH_CTX_START })

        try {
            const payload = await fetchAuthorizedContext()
            debounceRun(timestamp, FETCH_INITIAL_STATE_DEBOUNCE, () =>
                dispatch({ type: Actions.FETCH_CTX_SUCCEED, payload })
            )
        } catch (e) {
            window.location.href = process.env.UNAUTHORIZED_REDIRECT!
        }
    }

    useEffect(() => {
        const match = matchPath('/auth/:token', window.location.pathname)

        if (match) {
            const { token } = match.params

            localStorage.setItem('session', token || 'nil')
            window.location.replace('/')
        } else {
            fetchInitialState()
        }
    }, [])

    return { isLoading, isReady, ...state }
}

export default useApp
