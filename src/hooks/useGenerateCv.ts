import { useContext } from 'react'

import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'

import { createCv } from '@gitcv/api/cv'
import { StateContext } from '@gitcv/state'
import { Actions } from '@gitcv/state/actions'

const useGenerateCv = () => {
    const nav = useNavigate()
    const { state, dispatch } = useContext(StateContext)

    const isLoading = state.genCvState.pending

    const handleGenerateCv = async (title: string, repos: number[]) => {
        dispatch({ type: Actions.GEN_CV_START })

        try {
            const payload = await createCv({ title, repos })
            dispatch({ type: Actions.GEN_CV_SUCCEED, payload })

            nav(`/${payload.tag}`)
        } catch (error) {
            const { response } = error as AxiosError

            dispatch({
                type: Actions.GEN_CV_ERROR,
                payload: response?.status || 500,
            })
        }
    }

    return {
        isLoading,
        handleGenerateCv,
    }
}

export default useGenerateCv
