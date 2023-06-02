import { PropsWithChildren } from 'react'

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
    useApp()

    return (
        <BrowserRouter>
            <GlobalStyle />
            <Container>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/auth" element={<Auth />} />
                </Routes>
            </Container>
        </BrowserRouter>
    )
}
