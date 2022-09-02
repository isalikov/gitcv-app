import { PayloadAction } from '@reduxjs/toolkit'

import { EnvState } from '@gitcv/store/env/types'
import { Locale } from '@gitcv/types/i18'

const onSetLocaleAction = (state: EnvState, action: PayloadAction<Locale>) => {
    return {
        ...state,
        locale: action.payload,
    }
}

export default onSetLocaleAction
