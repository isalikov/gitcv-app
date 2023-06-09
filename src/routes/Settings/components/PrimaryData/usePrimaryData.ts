import { useContext } from 'react'

import { User } from '@isalikov/gitcv-api'

import { useForm, useWatch } from 'react-hook-form'

import { INPUT_FORM_DEBOUNCE } from '@gitcv/constants'
import { useDebounceEffect, useUser } from '@gitcv/hooks'
import { StateContext } from '@gitcv/state'

import { FormValues } from './types'

const initialState: FormValues = {
    name: '',
    position: '',
}

const getDefaultValues = (user: User | null): FormValues => {
    if (!user) {
        return initialState
    }

    return {
        name: user.name,
        position: user.position,
    }
}

const usePrimaryData = () => {
    const { state } = useContext(StateContext)
    const { saveUser } = useUser()

    const methods = useForm<FormValues>({
        defaultValues: getDefaultValues(state.user),
    })

    const values = useWatch({ control: methods.control })

    const handleChangePhoto = (photo: string) => {
        saveUser({ photo })
    }

    useDebounceEffect(
        () => {
            saveUser(values)
        },
        values,
        INPUT_FORM_DEBOUNCE,
        methods.formState.isDirty
    )

    return { ...methods, photo: state.user?.photo, handleChangePhoto }
}

export default usePrimaryData
