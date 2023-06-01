import { LOCALE } from '@isalikov/gitcv-api'

import { I18 } from '@gitcv/types/i18'

import en from './en'
import es from './es'

export const getMessages = (locale: LOCALE): I18 => {
    switch (locale) {
        case 'en':
            return en

        case 'es':
            return es

        default:
            return en
    }
}
