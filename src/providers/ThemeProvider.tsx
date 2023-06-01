import { PropsWithChildren } from 'react'

import { ThemeProvider as ThemeProviderContainer } from 'styled-components'

import { useTheme } from '@gitcv/hooks'

const ThemeProvider = ({ children }: PropsWithChildren<unknown>) => {
    const theme = useTheme()

    return (
        <ThemeProviderContainer theme={theme}>
            {children}
        </ThemeProviderContainer>
    )
}

export default ThemeProvider
