import { useState } from 'react'

import { Link } from 'react-router-dom'

import { createCv } from '@gitcv/api/user'
import { useLocale, useUser } from '@gitcv/hooks'

import { Container } from './styled'

const Dashboard = () => {
    const { getMessage } = useLocale()
    const { syncUser, syncState, user } = useUser()

    const [loading, setLoading] = useState(false)
    const [selected, setSelected] = useState<number[]>([])

    const handleGen = async () => {
        setLoading(true)
        await createCv(selected)
        setLoading(false)
    }

    const handleSelect = (id: number) => {
        const existIndex = selected.findIndex((s) => s === id)

        if (existIndex > -1) {
            setSelected([
                ...selected.slice(0, existIndex),
                ...selected.slice(existIndex + 1),
            ])
        } else {
            setSelected([...selected, id])
        }
    }

    if (!user) {
        return <div>no user in state</div>
    }

    return (
        <Container>
            <h1>{user.name}</h1>
            <span>{getMessage('home.dashboard')}</span>
            <button type="button" onClick={syncUser}>
                {syncState.pending ? 'syncing...' : 'sync'}
            </button>

            <h2>Repos</h2>

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {user.repos.map((p) => (
                    <div
                        key={p.githubID}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                        }}
                    >
                        <input
                            checked={selected.includes(p.githubID)}
                            onChange={() => handleSelect(p.githubID)}
                            type="checkbox"
                            name={p.name}
                            id={p.githubID.toString()}
                        />
                        <label htmlFor={p.githubID.toString()}>{p.name}</label>
                    </div>
                ))}

                <button
                    type="button"
                    style={{ margin: '12px 0' }}
                    onClick={handleGen}
                >
                    {loading ? 'generating ai cv...' : 'generate'}
                </button>
            </div>
            {user.cvs.map((cv) => (
                <Link to={cv.uuid} key={cv.uuid}>
                    {cv.uuid}
                </Link>
            ))}
        </Container>
    )
}

export default Dashboard
