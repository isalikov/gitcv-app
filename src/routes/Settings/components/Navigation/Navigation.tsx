import ShieldIcon from '@rsuite/icons/Shield'
import DashboardIcon from '@rsuite/icons/legacy/Dashboard'
import { useSelector } from 'react-redux'

import { NavLink } from 'react-router-dom'
import { Sidenav, Nav } from 'rsuite'

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

                <span className={styles.name}>{user?.name}</span>
            </div>

            <Sidenav>
                <Sidenav.Body>
                    <Nav activeKey="1">
                        <Nav.Item eventKey="1" icon={<DashboardIcon />}>
                            <NavLink to="/settings">Dashboard</NavLink>
                        </Nav.Item>

                        <Nav.Item eventKey="2" icon={<ShieldIcon />}>
                            <NavLink to="/settings/privacy">Privacy</NavLink>
                        </Nav.Item>
                    </Nav>
                </Sidenav.Body>
            </Sidenav>
        </div>
    )
}

export default Navigation
