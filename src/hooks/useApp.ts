import { useContext, useEffect } from 'react'

import { AxiosError } from 'axios'

import { fetchAuthorizedContext } from '@gitcv/api/user'
import { StateContext } from '@gitcv/state'

const useApp = () => {
    const { state, dispatch } = useContext(StateContext)

    const fetchInitialState = async () => {
        try {
            const user = await fetchAuthorizedContext()
        } catch (error) {
            console.log(error as AxiosError)
        }
    }

    useEffect(() => {
        fetchInitialState()
    }, [])
}

export default useApp
