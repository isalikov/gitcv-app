import { useIntl } from 'react-intl'

import { useTitle } from '@gitcv/hooks'

import styles from './styles.scss'

const Home = () => {
    const intl = useIntl()
    useTitle(intl.formatMessage({ id: 'home.title' }))

    return <div className={styles.container}>Home</div>
}

export default Home
