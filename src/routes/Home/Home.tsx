import { useIntl } from 'react-intl'

import { useTitle } from '@gitcv/hooks'

import { Button } from '@gitcv/lib'

import styles from './styles.scss'

const Home = () => {
    const intl = useIntl()
    useTitle(intl.formatMessage({ id: 'home.title' }))

    return (
        <div className={styles.container}>
            <a href={process.env.OAUTH_URL}>
                <Button>Login</Button>
            </a>
        </div>
    )
}

export default Home
