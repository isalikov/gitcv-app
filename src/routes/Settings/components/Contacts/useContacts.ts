import { useEffect, useState } from 'react'

import eq from 'fast-deep-equal'

import { INPUT_FORM_DEBOUNCE } from '@gitcv/constants'
import { useDebounceEffect, useUser } from '@gitcv/hooks'

const useContacts = () => {
    const { saveUser, user } = useUser()

    const [key, setKey] = useState('')
    const [value, setValue] = useState('')

    const [contacts, setContacts] = useState<Record<string, string>>(
        user?.contacts || {}
    )

    const disabled = !key || !value

    const clear = () => {
        setKey('')
        setValue('')
    }

    const handleAdd = () => {
        if (disabled) {
            return
        }

        setContacts({
            ...contacts,
            [key]: value,
        })

        clear()
    }

    const handleChange = (keyString: string, valueString: string) => {
        setContacts({
            ...contacts,
            [keyString]: valueString,
        })
    }

    const handleRemove = (keyString: string) => {
        setContacts(
            Object.keys(contacts)
                .filter((k) => k !== keyString)
                .reduce<Record<string, string>>(
                    (result, k) => ({
                        ...result,
                        [k]: contacts[k],
                    }),
                    {}
                )
        )
    }

    const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && !disabled) {
            handleAdd()
        }
    }

    useDebounceEffect(
        () => {
            saveUser({ contacts })
        },
        contacts,
        INPUT_FORM_DEBOUNCE,
        !eq(contacts, user?.contacts)
    )

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress)

        return () => {
            document.removeEventListener('keydown', handleKeyPress)
        }
    }, [handleKeyPress])

    return {
        disabled,
        contacts,
        key,
        value,
        setKey,
        setValue,
        handleAdd,
        handleChange,
        handleRemove,
    }
}

export default useContacts
