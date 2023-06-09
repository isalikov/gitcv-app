import { useContext, useEffect, useState } from 'react'

import eq from 'fast-deep-equal'

import { INPUT_FORM_DEBOUNCE } from '@gitcv/constants'
import { useDebounceEffect, useUser } from '@gitcv/hooks'
import { StateContext } from '@gitcv/state'

const useContacts = () => {
    const { state } = useContext(StateContext)
    const { saveUser } = useUser()

    const [tempKey, setTempKey] = useState('')
    const [tempValue, setTempValue] = useState('')

    const [isAppend, setIsAppend] = useState(false)

    const [contacts, setContacts] = useState<Record<string, string>>(
        state.user?.contacts || {}
    )

    const handleAppend = () => {
        if (!tempValue || !tempKey) {
            return
        }

        setContacts({
            ...contacts,
            [tempKey]: tempValue,
        })

        setIsAppend(false)
        setTempKey('')
        setTempValue('')
    }

    const handleRemove = (key: string) => {
        const payload = Object.keys(contacts)
            .filter((k) => k !== key)
            .reduce<Record<string, string>>(
                (result, k) => ({
                    ...result,
                    [k]: contacts[k],
                }),
                {}
            )

        setContacts(payload)
    }

    const handleAdd = () => {
        setIsAppend(true)
    }

    const handleChange = (key: string, value: string) => {
        setContacts({
            ...contacts,
            [key]: value,
        })
    }

    const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && isAppend) {
            handleAppend()
        }

        if (e.key === 'Escape' && isAppend) {
            setIsAppend(false)
            setTempKey('')
            setTempValue('')
        }
    }

    useDebounceEffect(
        () => {
            saveUser({ contacts })
        },
        contacts,
        INPUT_FORM_DEBOUNCE,
        !eq(contacts, state.user?.contacts)
    )

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress)

        return () => {
            document.removeEventListener('keydown', handleKeyPress)
        }
    }, [handleKeyPress])

    return {
        contacts,
        handleAdd,
        handleAppend,
        handleChange,
        handleRemove,
        isAppend,
        setTempKey,
        setTempValue,
        tempKey,
        tempValue,
    }
}

export default useContacts
