import { useState } from 'react'

import { Link } from 'react-router-dom'

import { useGenerateCv, useLocale, useUser } from '@gitcv/hooks'

import { Container } from './styled'

const Dashboard = () => {
    const { getMessage } = useLocale()
    const { syncUser, syncState, user } = useUser()

    const [title, setTitle] = useState('')
    const [selected, setSelected] = useState<number[]>([])

    const { isLoading, handleGenerateCv } = useGenerateCv()

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
                        key={p.id}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                        }}
                    >
                        <input
                            checked={selected.includes(p.id)}
                            onChange={() => handleSelect(p.id)}
                            type="checkbox"
                            name={p.title}
                            id={p.id.toString()}
                        />
                        <label htmlFor={p.id.toString()}>{p.title}</label>
                    </div>
                ))}

                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <button
                    type="button"
                    style={{ margin: '12px 0' }}
                    onClick={() => handleGenerateCv(title, selected)}
                >
                    {isLoading ? 'generating ai cv...' : 'generate'}
                </button>
            </div>
            {user.cvs.map((cv) => (
                <Link to={cv.tag} key={cv.tag}>
                    {cv.title}
                </Link>
            ))}
        </Container>
    )
}

export default Dashboard
