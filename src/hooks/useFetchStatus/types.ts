import { GenericAction, GenericReducer } from '@gitcv/types/helpers'

export const enum FetchStatusAction {
    FETCH_START = 'FetchStatusAction > FETCH_START',
    FETCH_SUCCESS = 'FetchStatusAction > FETCH_SUCCESS',
    FETCH_ERROR = 'FetchStatusAction > FETCH_ERROR',
}

export type FetchStatusActionType =
    | GenericAction<FetchStatusAction.FETCH_START>
    | GenericAction<FetchStatusAction.FETCH_SUCCESS>
    | GenericAction<FetchStatusAction.FETCH_ERROR, Error>

export type FetchStatusState = {
    isSucceed: boolean
    isPending: boolean
    isError: boolean
    error: Error | undefined
}

export type FetchStatusReducer = GenericReducer<
    FetchStatusState,
    FetchStatusActionType
>

export type UseFetchStatusActions = {
    error: (error: Error, options?: ErrorOptions) => void
    start: () => void
    success: () => void
}

export type ErrorOptions = {
    quiet?: boolean
}

export type UseFetchStatus = [FetchStatusState, UseFetchStatusActions]
