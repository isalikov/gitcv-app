import React from 'react'

import { IntlProvider } from 'react-intl'
import { Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { Container } from '@gitcv/styled'

import { useLocale, useTheme } from './hooks'

import { Auth, Dashboard } from './routes'

const App: React.FC = () => {
    const theme = useTheme()
    const { locale, messages } = useLocale()

    return (
        <ThemeProvider theme={theme}>
            <IntlProvider locale={locale} messages={messages}>
                <Container>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/auth" element={<Auth />} />
                    </Routes>
                </Container>
            </IntlProvider>
        </ThemeProvider>
    )
}

export default App
