import { useContext } from 'react'

import { AxiosError } from 'axios'

import { syncAuthorizedUser } from '@gitcv/api/user'
import { StateContext } from '@gitcv/state'
import { Actions } from '@gitcv/state/actions'

const useUser = () => {
    const { state, dispatch } = useContext(StateContext)

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

    return { syncUser, ...state }
}

export default useUser
