import './styles.scss'

import { useEffect } from 'react'

import { AxiosError } from 'axios'
import { IntlProvider } from 'react-intl'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import { useLocale } from '@gitcv/hooks'
import { fetchAuthorizedUser } from '@gitcv/services/api'
import { AppDispatch } from '@gitcv/store'
import {
    userFetchingSucceed,
    userFetchingError,
    userFetchingStart,
} from '@gitcv/store/user'

import { AuthHandler, Home, Profile, Settings } from './routes'

const App = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { locale, messages } = useLocale()

    const fetchUser = async () => {
        dispatch(userFetchingStart())

        try {
            const user = await fetchAuthorizedUser()
            dispatch(userFetchingSucceed(user))
        } catch (e: unknown) {
            const { response } = e as AxiosError

            dispatch(userFetchingError(response?.status))
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <IntlProvider locale={locale} messages={messages}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth/:token" element={<AuthHandler />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/:cvtag" element={<Profile />} />
            </Routes>
        </IntlProvider>
    )
}

export default App
