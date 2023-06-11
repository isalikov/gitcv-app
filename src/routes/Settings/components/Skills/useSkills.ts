import { useEffect, useMemo, useState } from 'react'

import { Skill, UniqueArray } from '@isalikov/gitcv-api'

import eq from 'fast-deep-equal'
import { v4 as uuidV4 } from 'uuid'

import { useDebounceEffect, useUser } from '@gitcv/hooks'

const useSkills = () => {
    const { saveUser, user } = useUser()
    const [title, setTitle] = useState('')

    const skills = useMemo(() => {
        if (!user?.skills) {
            return []
        }

        return user.skills
    }, [user?.skills])

    const [value, setValue] = useState<UniqueArray<Skill>>(skills)

    const disabled = title.length === 0

    const clear = () => {
        setTitle('')
    }

    const handleAdd = () => {
        setValue([...value, { title, involvement: 0, uuid: uuidV4() }])
        clear()
    }
    const handleRemove = (uuid: string) => {
        const existIndex = value.findIndex((skill) => skill.uuid === uuid)

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
            saveUser({ skills: value })
        },
        value,
        100,
        !eq(user?.skills, value)
    )

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress)

        return () => {
            document.removeEventListener('keydown', handleKeyPress)
        }
    }, [handleKeyPress])

    return { disabled, title, value, setTitle, handleAdd, handleRemove }
}

export default useSkills
