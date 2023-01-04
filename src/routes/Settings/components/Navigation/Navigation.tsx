import { useSelector } from 'react-redux'

import { NavLink } from 'react-router-dom'

import { RootState } from '@gitcv/store'
import { UserState } from '@gitcv/store/user'

import styles from './styles.scss'

const Navigation = () => {
    const { user } = useSelector<RootState, UserState>((state) => state.user)

    return (
        <div className={styles.container}>
            <div className={styles.user}>
                <img
                    src={user?.photo}
                    alt={user?.photo}
                    className={styles.photo}
                />

                <span className={styles.name}>{user?.login}</span>
            </div>

            <div className={styles.nav}>
                <NavLink to="/settings" className={styles.navItem}>
                    Dashboard
                </NavLink>

                <NavLink to="/settings/privacy" className={styles.navItem}>
                    Privacy
                </NavLink>
            </div>
        </div>
    )
}

export default Navigation
