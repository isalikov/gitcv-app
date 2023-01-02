import { useEffect } from 'react'

import { useIntl } from 'react-intl'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useTitle } from '@gitcv/hooks'
import { RootState } from '@gitcv/store'
import { UserState } from '@gitcv/store/user'

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
        return <div>Loading ...</div>
    }

    return <div className={styles.container}>Settings</div>
}

export default Settings
