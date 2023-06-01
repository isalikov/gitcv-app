import { THEME } from '@isalikov/gitcv-api'

import { AppState } from '../types'

const onSetTheme = (state: AppState, theme: THEME): AppState => {
    return {
        ...state,
        theme,
    }
}

export default onSetTheme
