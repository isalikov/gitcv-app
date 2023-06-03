export type GenericAction<T, P = void> = P extends void
    ? {
          type: T
      }
    : {
          type: T
          payload: P
      }

export type GenericReducer<S, T> = (state: S, action: T) => S

export type FetchState = {
    idle: boolean
    pending: boolean
    succeed: boolean
    error: number | null
}
