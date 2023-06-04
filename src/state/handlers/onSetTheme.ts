import { AppState } from '../types'

const onSetTheme = (state: AppState, theme: AppState['theme']): AppState => {
    return {
        ...state,
        theme,
    }
}

export default onSetTheme
