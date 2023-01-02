import { useIntl } from 'react-intl'

import { useTitle } from '@gitcv/hooks'

import styles from './styles.scss'

const Settings = () => {
    const intl = useIntl()
    useTitle(intl.formatMessage({ id: 'settings.title' }))

    return <div className={styles.container}>Settings</div>
}

export default Settings
