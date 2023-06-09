import { PropsWithChildren } from 'react'

import { Container, Title, Body } from './styled'
import { SectionProps } from './types'

const Section = ({ title, children }: PropsWithChildren<SectionProps>) => {
    return (
        <Container>
            <Title>{title}</Title>
            <Body>{children}</Body>
        </Container>
    )
}

export default Section
