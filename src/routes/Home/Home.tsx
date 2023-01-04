import { useIntl } from 'react-intl'

import { Button } from 'rsuite'

import { useTitle } from '@gitcv/hooks'

import styles from './styles.scss'

const Home = () => {
    const intl = useIntl()
    useTitle(intl.formatMessage({ id: 'home.title' }))

    return (
        <div className={styles.container}>
            <a href={process.env.OAUTH_URL}>
                <Button appearance="primary">Login</Button>
            </a>
        </div>
    )
}

export default Home
