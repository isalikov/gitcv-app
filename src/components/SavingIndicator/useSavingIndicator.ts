import { useContext, useEffect, useState } from 'react'

import {
    SAVE_INDICATOR_DEBOUNCE,
    SUCCEED_INDICATOR_DEBOUNCE,
} from '@gitcv/constants'
import { StateContext } from '@gitcv/state'

const useSavingIndicator = () => {
    const { state } = useContext(StateContext)
    const [active, setActive] = useState(false)
    const [succeed, setSucceed] = useState(false)

    const handleActive = () => {
        setActive(true)

        setTimeout(() => {
            setActive(false)
        }, SAVE_INDICATOR_DEBOUNCE)
    }

    const handleSucceed = () => {
        setSucceed(true)

        setTimeout(() => {
            setSucceed(false)
        }, SUCCEED_INDICATOR_DEBOUNCE)
    }

    useEffect(() => {
        if (state.saveState.pending) {
            handleActive()
        }

        if (state.saveState.succeed && !succeed && !active) {
            handleSucceed()
        }
    }, [state.saveState, active])

    return {
        active,
        succeed,
    }
}

export default useSavingIndicator
