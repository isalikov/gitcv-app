import { useEffect } from 'react'

import { useDispatch } from 'react-redux'

import { fetchAuthorizedUser } from '@gitcv/api/user'
import { useFetchStatus } from '@gitcv/hooks'
import { AppDispatch } from '@gitcv/store'
import { setAccountAction } from '@gitcv/store/account'

const useAccount = () => {
    const [fetchStatus, fetchActions] = useFetchStatus()

    const dispatch = useDispatch<AppDispatch>()

    const getAuthorizedUser = async () => {
        fetchActions.start()
        try {
            const user = await fetchAuthorizedUser()
            dispatch(setAccountAction(user))

            fetchActions.success()
        } catch (e) {
            fetchActions.error(e)
        }
    }

    useEffect(() => {
        getAuthorizedUser()
    }, [])

    return {
        fetchStatus,
        getAuthorizedUser,
    }
}

export default useAccount
