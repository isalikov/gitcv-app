import { useMemo } from 'react'

import { getMessages } from '@gitcv/i18'
import { Locale } from '@gitcv/types/i18'

const useLocale = () => {
    const locale = Locale.en
    const messages = useMemo(() => getMessages(locale), [locale])

    return {
        locale,
        messages,
    }
}

export default useLocale
