import { PropsWithChildren } from 'react'

import { Route, Routes, BrowserRouter } from 'react-router-dom'

import { useApp } from '@gitcv/hooks'
import { IntlProvider, StateProvider, ThemeProvider } from '@gitcv/providers'
import { Container, GlobalStyle } from '@gitcv/styled'

import { AppLoading, Aside } from './components'
import { Cv, Settings } from './routes'

export const AppProviders = ({ children }: PropsWithChildren<unknown>) => (
    <StateProvider>
        <ThemeProvider>
            <IntlProvider>{children}</IntlProvider>
        </ThemeProvider>
    </StateProvider>
)

export const AppRoutes = () => {
    const { isLoading, isReady } = useApp()

    return (
        <BrowserRouter>
            <GlobalStyle />
            {isLoading && <AppLoading />}
            {isReady && !isLoading && (
                <Container>
                    <Aside />
                    <Routes>
                        <Route path="/" element={<Settings />} />
                        <Route path="/:tag" element={<Cv />} />
                    </Routes>
                </Container>
            )}
        </BrowserRouter>
    )
}
