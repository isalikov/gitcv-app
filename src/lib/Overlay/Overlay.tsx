import { PropsWithChildren } from 'react'

import { Container } from './styled'

const Overlay = ({ children }: PropsWithChildren<unknown>) => {
    return <Container>{children}</Container>
}

export default Overlay
