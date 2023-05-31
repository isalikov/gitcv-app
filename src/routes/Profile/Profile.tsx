import { useParams } from 'react-router-dom'

import { useTitle } from '@gitcv/hooks'

import { ProfileParams } from '@gitcv/routes/Profile/types'

import styles from './styles.scss'

const Profile = () => {
    const { cvtag } = useParams<ProfileParams>()
    useTitle(cvtag)

    return <div className={styles.container}>Profile Name</div>
}

export default Profile
