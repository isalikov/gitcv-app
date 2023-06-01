import { useLocale } from '@gitcv/hooks'

const Dashboard = () => {
    const { getMessage } = useLocale()

    return <div>{getMessage('home.dashboard')}</div>
}

export default Dashboard
