import { useContext } from 'react'

import { User } from '@isalikov/gitcv-api'
import { AxiosError } from 'axios'

import { syncAuthorizedUser, updateAuthorizedUser } from '@gitcv/api/user'
import { StateContext } from '@gitcv/state'
import { Actions } from '@gitcv/state/actions'

const useUser = () => {
    const { state, dispatch } = useContext(StateContext)

    const saveUser = async (data: Partial<User>) => {
        dispatch({ type: Actions.SAVE_USER_START })

        try {
            const payload = await updateAuthorizedUser(data)

            dispatch({ type: Actions.SAVE_USER_SUCCEED, payload })
        } catch (error) {
            const { response } = error as AxiosError

            dispatch({
                type: Actions.SAVE_USER_ERROR,
                payload: response?.status || 500,
            })
        }
    }

    const syncUser = async () => {
        dispatch({ type: Actions.SYNC_USER_START })

        try {
            const payload = await syncAuthorizedUser()
            dispatch({ type: Actions.SYNC_USER_SUCCEED, payload })
        } catch (error) {
            const { response } = error as AxiosError

            dispatch({
                type: Actions.SYNC_USER_ERROR,
                payload: response?.status || 500,
            })
        }
    }

    return { syncUser, saveUser, ...state }
}

export default useUser
