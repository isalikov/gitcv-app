import { useContext } from 'react'

import { useIntl } from 'react-intl'

import { StateContext } from '@gitcv/state'
import { Actions } from '@gitcv/state/actions'
import { I18 } from '@gitcv/types/i18'

const useLocale = () => {
    const intl = useIntl()
    const { state, dispatch } = useContext(StateContext)

    const getMessage = (id: keyof I18) => {
        return intl.formatMessage({ id })
    }

    const setEnglishLocale = () => {
        dispatch({ type: Actions.SET_LOCALE, payload: 'en' })
    }

    const setSpanishLocale = () => {
        dispatch({ type: Actions.SET_LOCALE, payload: 'es' })
    }

    return {
        locale: state.locale,

        getMessage,

        setEnglishLocale,
        setSpanishLocale,
    }
}

export default useLocale
