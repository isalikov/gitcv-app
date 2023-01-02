import React from 'react'

import { IntlProvider } from 'react-intl'
import { Route, Routes } from 'react-router-dom'

import { useLocale } from '@gitcv/hooks'

import { Home } from './routes/Home'

import styles from './styles.scss'

const App: React.FC = () => {
    const { locale, messages } = useLocale()

    return (
        <IntlProvider locale={locale} messages={messages}>
            <div className={styles.container}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/settings" element={<div>settings</div>} />
                    <Route path="/:cvtag" element={<div>cvtag</div>} />
                </Routes>
            </div>
        </IntlProvider>
    )
}

export default App
