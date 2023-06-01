import { PropsWithChildren } from 'react'

import { useStateContext } from '@gitcv/state'

const StateProvider = ({ children }: PropsWithChildren<unknown>) => {
    const { StateContext, value } = useStateContext()

    return (
        <StateContext.Provider value={value}>{children}</StateContext.Provider>
    )
}

export default StateProvider
