import { useParams } from 'react-router-dom'

import styles from './styles.scss'
import { CVParams } from './types'

const CV = () => {
    const { cvtag } = useParams<CVParams>()

    return <div className={styles.container}>{cvtag || 'new'}</div>
}

export default CV
