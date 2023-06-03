import { PropsWithChildren, useEffect } from 'react'

import { Route, Routes, BrowserRouter } from 'react-router-dom'

import { useApp } from '@gitcv/hooks'
import { IntlProvider, StateProvider, ThemeProvider } from '@gitcv/providers'
import { Container, GlobalStyle } from '@gitcv/styled'

import { Auth, Dashboard } from './routes'

export const AppProviders = ({ children }: PropsWithChildren<unknown>) => (
    <StateProvider>
        <ThemeProvider>
            <IntlProvider>{children}</IntlProvider>
        </ThemeProvider>
    </StateProvider>
)

export const AppRoutes = () => {
    const { isAuthorized, isLoading, isIdle } = useApp()

    const home = isAuthorized && !isLoading ? <Dashboard /> : <div>loading</div>

    useEffect(() => {
        if (!isIdle && !isLoading && !isAuthorized) {
            window.location.href = 'https://github.com'
        }
    }, [isAuthorized, isIdle, isLoading])

    return (
        <BrowserRouter>
            <GlobalStyle />
            <Container>
                <Routes>
                    <Route path="/" element={home} />
                    <Route path="/auth/:token" element={<Auth />} />
                </Routes>
            </Container>
        </BrowserRouter>
    )
}
