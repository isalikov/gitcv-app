import { AppState } from '../types'

const onSetLocale = (state: AppState, locale: AppState['locale']): AppState => {
    return {
        ...state,
        locale,
    }
}

export default onSetLocale
