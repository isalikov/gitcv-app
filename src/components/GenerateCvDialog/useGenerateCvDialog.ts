import { useContext, useMemo, useState } from 'react'

import { AxiosError } from 'axios'
import { SelectItem } from 'primereact/selectitem'
import { useNavigate } from 'react-router-dom'

import { createCv } from '@gitcv/api/cv'
import { StateContext } from '@gitcv/state'
import { Actions } from '@gitcv/state/actions'

const useGenerateCvDialog = () => {
    const nav = useNavigate()
    const { state, dispatch } = useContext(StateContext)
    const [repos, setRepos] = useState<number[]>([])
    const [title, setTitle] = useState('')

    const isLoading = state.genCvState.pending

    const options = useMemo(() => {
        if (!state.user) {
            return []
        }

        return state.user.repos.map<SelectItem>((repo) => ({
            label: repo.title,
            value: repo.id,
        }))
    }, [state.user?.repos])

    const handleGenerateCv = async () => {
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
        handleGenerateCv,
        isLoading,
        options,
        repos,
        setRepos,
        setTitle,
        title,
    }
}

export default useGenerateCvDialog
