import { useIntl } from 'react-intl'

import { useTitle } from '@gitcv/hooks'

import { Button } from '@gitcv/lib'

import styles from './styles.scss'

const Home = () => {
    const intl = useIntl()
    useTitle(intl.formatMessage({ id: 'home.title' }))

    return (
        <div className={styles.container}>
            <Button>Login</Button>
        </div>
    )
}

export default Home
