import { AppState } from '@gitcv/state/types'
import { I18 } from '@gitcv/types/i18'

import en from './en'
import es from './es'

export const getMessages = (locale: AppState['locale']): I18 => {
    switch (locale) {
        case 'en':
            return en

        case 'es':
            return es

        default:
            return en
    }
}
