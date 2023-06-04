import { useState } from 'react'

import { useLocale, useUser } from '@gitcv/hooks'

import { Container } from './styled'

const Dashboard = () => {
    const { getMessage } = useLocale()
    const { syncUser, syncState, user } = useUser()

    const [selected, setSelected] = useState<number[]>([])

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
                {syncState.pending ? 'syncing...' : 'sync user'}
            </button>

            <h4>projects</h4>

            <div>
                {user.repos.map((p) => (
                    <div key={p.id}>
                        <input
                            checked={selected.includes(p.id)}
                            onChange={() => handleSelect(p.id)}
                            type="checkbox"
                            name={p.name}
                            id={p.id?.toString()}
                        />
                        <label htmlFor={p.id?.toString()}>{p.name}</label>
                    </div>
                ))}

                <button type="button">make a cv</button>
            </div>
        </Container>
    )
}

export default Dashboard
