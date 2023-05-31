import { I18, Locale } from '@gitcv/types/i18'

import en from './en'
import es from './es'
import ru from './ru'

export const getMessages = (locale: Locale): I18 => {
    switch (locale) {
        case Locale.en:
            return en

        case Locale.es:
            return es

        case Locale.ru:
            return ru

        default:
            return en
    }
}
