import { useContext, useEffect } from 'react'

import { AxiosError } from 'axios'

import { fetchAuthorizedContext } from '@gitcv/api/user'
import { StateContext } from '@gitcv/state'
import { Actions } from '@gitcv/state/actions'

const useApp = () => {
    const { state, dispatch } = useContext(StateContext)

    const isAuthorized = !!state.user
    const isLoading = state.fetchState.pending
    const isIdle = state.fetchState.idle

    const fetchInitialState = async () => {
        dispatch({ type: Actions.FETCH_CTX_START })

        try {
            const payload = await fetchAuthorizedContext()
            dispatch({ type: Actions.FETCH_CTX_SUCCEED, payload })
        } catch (error) {
            const { response } = error as AxiosError

            dispatch({
                type: Actions.FETCH_CTX_ERROR,
                payload: response?.status || 500,
            })
        }
    }

    useEffect(() => {
        fetchInitialState()
    }, [])

    return { isAuthorized, isLoading, isIdle, ...state }
}

export default useApp
