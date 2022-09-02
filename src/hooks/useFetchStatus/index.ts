import { useReducer } from 'react'

import {
    FetchStatusAction,
    FetchStatusReducer,
    FetchStatusState,
    UseFetchStatus,
} from './types'

const initialState: FetchStatusState = {
    isError: false,
    isPending: false,
    isSucceed: false,
    error: undefined,
}

const reducer: FetchStatusReducer = (state, action) => {
    switch (action.type) {
        case FetchStatusAction.FETCH_SUCCESS:
            return {
                ...state,
                isSucceed: true,
                isPending: false,
                isError: false,
            }

        case FetchStatusAction.FETCH_START:
            return {
                ...state,
                isSucceed: false,
                isPending: true,
                isError: false,
            }

        case FetchStatusAction.FETCH_ERROR:
            return {
                ...state,

                isSucceed: false,
                isPending: false,
                isError: true,
                error: action.payload,
            }

        default:
            return state
    }
}

const useFetchStatus = (): UseFetchStatus => {
    const [fetchState, dispatch] = useReducer<FetchStatusReducer>(
        reducer,
        initialState
    )

    const handleSuccess = () => {
        dispatch({
            type: FetchStatusAction.FETCH_SUCCESS,
        })
    }

    const handleStart = () => {
        dispatch({
            type: FetchStatusAction.FETCH_START,
        })
    }

    const handleError = (payload: Error) => {
        dispatch({
            payload,
            type: FetchStatusAction.FETCH_ERROR,
        })
    }

    return [
        fetchState,
        {
            error: handleError,
            success: handleSuccess,
            start: handleStart,
        },
    ]
}

export default useFetchStatus
export * from './types'
