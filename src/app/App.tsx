import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { IntlProvider } from 'react-intl'

import { useLocale } from '@app/store/hooks'

import css from './App.sass'
import { Auth, Home } from './routes'

const App: React.FC = () => {
    const { locale, messages } = useLocale()

    return (
        <IntlProvider locale={locale} messages={messages}>
            <div className={css.container}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/auth" element={<Auth />} />
                </Routes>
            </div>
        </IntlProvider>
    )
}

export default App
