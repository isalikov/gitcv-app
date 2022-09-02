import React from 'react'

import { IntlProvider } from 'react-intl'
import { Route, Routes } from 'react-router-dom'

import { useAccount, useLocale } from '@gitcv/hooks'

import css from './App.scss'
import { Auth, Home, Profile } from './routes'

const App: React.FC = () => {
    const { locale, messages } = useLocale()
    const { fetchStatus } = useAccount()

    return (
        <IntlProvider locale={locale} messages={messages}>
            <div className={css.container}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route
                        path="/profile"
                        element={<Profile fetchStatus={fetchStatus} />}
                    />
                </Routes>
            </div>
        </IntlProvider>
    )
}

export default App
