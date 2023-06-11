import { useState } from 'react'

import { INPUT_FORM_DEBOUNCE } from '@gitcv/constants'
import { useDebounceEffect, useUser } from '@gitcv/hooks'

const useProfile = () => {
    const { saveUser, user } = useUser()

    const [profile, setProfile] = useState(user?.profile || '')

    const handleChange = (payload: string) => {
        setProfile(payload)
    }

    useDebounceEffect(
        () => {
            saveUser({ profile })
        },
        profile,
        INPUT_FORM_DEBOUNCE,
        profile !== user?.profile
    )

    return {
        profile,
        handleChange,
    }
}

export default useProfile
