import { useEffect, useRef, useState } from 'react'

import { Language, UniqueArray } from '@isalikov/gitcv-api'

import eq from 'fast-deep-equal'
import { v4 as uuidV4 } from 'uuid'

import { useDebounceEffect, useUser } from '@gitcv/hooks'

const useLanguages = () => {
    const { saveUser, user } = useUser()
    const [level, setLevel] = useState<Language['level'] | null>(null)
    const [title, setTitle] = useState('')

    const { current: levels } = useRef([
        {
            label: 'Native',
            value: 'native',
        },
        {
            label: 'Beginner',
            value: 'beginner',
        },
        {
            label: 'A1',
            value: 'A1',
        },
        {
            label: 'A2',
            value: 'A2',
        },
        {
            label: 'B1',
            value: 'B1',
        },
        {
            label: 'B2',
            value: 'B2',
        },
        {
            label: 'C1',
            value: 'C1',
        },
        {
            label: 'C2',
            value: 'C2',
        },
    ])

    const [value, setValue] = useState<UniqueArray<Language>>(
        user?.languages || []
    )

    const disabled = title.length === 0 || !level

    const clear = () => {
        setLevel(null)
        setTitle('')
    }

    const handleAdd = () => {
        if (level) {
            setValue([...value, { level, title, uuid: uuidV4() }])
            clear()
        }
    }
    const handleRemove = (uuid: string) => {
        const existIndex = value.findIndex((language) => language.uuid === uuid)

        if (existIndex > -1) {
            setValue([
                ...value.slice(0, existIndex),
                ...value.slice(existIndex + 1),
            ])
        }
    }

    const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && !disabled) {
            handleAdd()
        }
    }

    useDebounceEffect(
        () => {
            saveUser({ languages: value })
        },
        value,
        100,
        !eq(user?.languages, value)
    )

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress)

        return () => {
            document.removeEventListener('keydown', handleKeyPress)
        }
    }, [handleKeyPress])

    return {
        disabled,
        level,
        levels,
        title,
        value,
        handleAdd,
        handleRemove,
        setLevel,
        setTitle,
    }
}

export default useLanguages
