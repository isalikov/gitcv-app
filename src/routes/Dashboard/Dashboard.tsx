import { useLocale, useUser } from '@gitcv/hooks'

import { Container } from './styled'

const Dashboard = () => {
    const { getMessage } = useLocale()
    const { syncUser, syncState, user } = useUser()

    return (
        <Container>
            <h1>{user?.name}</h1>
            <span>{getMessage('home.dashboard')}</span>
            <button type="button" onClick={syncUser}>
                {syncState.pending ? 'syncing...' : 'sync user'}
            </button>
        </Container>
    )
}

export default Dashboard
