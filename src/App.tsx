import './styles.scss'

import { IntlProvider } from 'react-intl'
import { Route, Routes } from 'react-router-dom'

import { useLocale } from '@gitcv/hooks'

import { Home, Profile, Settings } from './routes'

const App = () => {
    const { locale, messages } = useLocale()

    return (
        <IntlProvider locale={locale} messages={messages}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/:cvtag" element={<Profile />} />
            </Routes>
        </IntlProvider>
    )
}

export default App
