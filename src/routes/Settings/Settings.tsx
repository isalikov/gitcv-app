import { useEffect } from 'react'

import { useIntl } from 'react-intl'
import { useSelector } from 'react-redux'
import { Route, Routes, useNavigate } from 'react-router-dom'

import { Loader } from 'rsuite'

import { useTitle } from '@gitcv/hooks'
import { RootState } from '@gitcv/store'
import { UserState } from '@gitcv/store/user'

import { Navigation } from './components'
import { CV, Dashboard, Privacy } from './routes'
import styles from './styles.scss'

const Settings = () => {
    const nav = useNavigate()
    const user = useSelector<RootState, UserState>((state) => state.user)

    const intl = useIntl()
    useTitle(intl.formatMessage({ id: 'settings.title' }))

    useEffect(() => {
        if (user.error && user.status !== 200) {
            nav('/', { replace: true })
        }
    }, [user.pending, user.status])

    if (user.pending) {
        return <Loader center />
    }

    return (
        <div className={styles.container}>
            <Navigation />
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/cv" element={<CV />} />
                <Route path="/cv/:cvtag" element={<CV />} />
            </Routes>
        </div>
    )
}

export default Settings
