import { User } from '@isalikov/gitcv-api'

import { useForm, useWatch } from 'react-hook-form'

import { INPUT_FORM_DEBOUNCE } from '@gitcv/constants'
import { useDebounceEffect, useUser } from '@gitcv/hooks'

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
    const { saveUser, syncUser, user, syncState } = useUser()

    const methods = useForm<FormValues>({
        defaultValues: getDefaultValues(user),
    })

    const values = useWatch({ control: methods.control })

    const handleSync = async () => {
        syncUser()
    }

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

    return {
        ...methods,
        photo: user?.photo,
        handleChangePhoto,
        handleSync,
        syncing: syncState.pending,
    }
}

export default usePrimaryData
