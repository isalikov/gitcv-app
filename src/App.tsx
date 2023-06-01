import { PropsWithChildren } from 'react'

import { Route, Routes, BrowserRouter } from 'react-router-dom'

import { IntlProvider, StateProvider, ThemeProvider } from '@gitcv/providers'
import { Container, GlobalStyle } from '@gitcv/styled'

import { Auth, Dashboard } from './routes'

const Providers = ({ children }: PropsWithChildren<unknown>) => (
    <StateProvider>
        <ThemeProvider>
            <IntlProvider>{children}</IntlProvider>
        </ThemeProvider>
    </StateProvider>
)

const App = () => (
    <Providers>
        <BrowserRouter>
            <GlobalStyle />
            <Container>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/auth" element={<Auth />} />
                </Routes>
            </Container>
        </BrowserRouter>
    </Providers>
)

export default App
