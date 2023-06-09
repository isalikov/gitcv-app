import { useMemo } from 'react'

import { useParams } from 'react-router-dom'

import { useAppState, useTitle } from '@gitcv/hooks'
import { Container } from '@gitcv/routes/Cv/styled'

const Cv = () => {
    const { tag } = useParams<{ tag: string }>()
    const { user } = useAppState()

    const cv = useMemo(() => {
        return user?.cvs.find((item) => item.tag === tag)
    }, [user?.cvs, tag])

    if (!cv) {
        return <span>not found</span>
    }

    useTitle(cv.title)
    return (
        <Container>
            <h3>{cv.title}</h3>
        </Container>
    )
}

export default Cv
