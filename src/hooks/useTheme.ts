import lightTheme from '@gitcv/themes/light'

import { Theme } from '@gitcv/types/theme'

import useAppState from './useAppState'

const useTheme = (): Theme => {
    const state = useAppState()

    switch (state.theme) {
        case 'dark':
            return lightTheme

        default:
            return lightTheme
    }
}

export default useTheme
