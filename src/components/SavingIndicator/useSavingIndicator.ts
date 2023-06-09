import { useContext, useEffect, useState } from 'react'

import { SAVE_INDICATOR_DEBOUNCE } from '@gitcv/constants'
import { StateContext } from '@gitcv/state'

const useSavingIndicator = () => {
    const { state } = useContext(StateContext)
    const [active, setActive] = useState(false)

    const handleActive = () => {
        setActive(true)

        setTimeout(() => {
            setActive(false)
        }, SAVE_INDICATOR_DEBOUNCE)
    }

    useEffect(() => {
        if (state.saveState.pending) {
            handleActive()
        }
    }, [state.saveState.pending])

    return {
        active,
    }
}

export default useSavingIndicator
