import { PropsWithChildren, useContext, useMemo } from 'react'

import { IntlProvider as IntlProviderContainer } from 'react-intl'

import { getMessages } from '@gitcv/i18'
import { StateContext } from '@gitcv/state'

const IntlProvider = ({ children }: PropsWithChildren<unknown>) => {
    const { state } = useContext(StateContext)

    const messages = useMemo(() => getMessages(state.locale), [state.locale])

    return (
        <IntlProviderContainer locale={state.locale} messages={messages}>
            {children}
        </IntlProviderContainer>
    )
}

export default IntlProvider
