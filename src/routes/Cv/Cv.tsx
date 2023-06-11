import { useMemo } from 'react'

import { useParams } from 'react-router-dom'

import { MdEditor } from '@gitcv/components'
import { useAppState, useTitle } from '@gitcv/hooks'
import { Content, Container } from '@gitcv/routes/Cv/styled'

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
            <Content>
                <h3>{cv.title}</h3>
                <MdEditor value={cv.profile} onChange={() => {}} />
            </Content>
        </Container>
    )
}

export default Cv
