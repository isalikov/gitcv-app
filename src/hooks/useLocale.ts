import { useMemo } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import en from '@gitcv/i18/en'
import es from '@gitcv/i18/es'
import { AppDispatch, RootState } from '@gitcv/store'
import { setLocaleAction } from '@gitcv/store/env'
import { I18, Locale } from '@gitcv/types/i18'

const getMessages = (locale: Locale): I18 => {
    switch (locale) {
        case Locale.en:
            return en

        case Locale.es:
            return es

        default:
            return en
    }
}

const useLocale = () => {
    const dispatch = useDispatch<AppDispatch>()

    const locale = useSelector<RootState, Locale>((state) => state.env.locale)
    const messages = useMemo(() => getMessages(locale), [locale])

    const setLocale = (payload: Locale) => {
        dispatch(setLocaleAction(payload))
    }

    return {
        locale,
        messages,
        setLocale,
    }
}

export default useLocale
