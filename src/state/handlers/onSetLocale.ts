import { LOCALE } from '@isalikov/gitcv-api'

import { AppState } from '../types'

const onSetLocale = (state: AppState, locale: LOCALE): AppState => {
    return {
        ...state,
        locale,
    }
}

export default onSetLocale
