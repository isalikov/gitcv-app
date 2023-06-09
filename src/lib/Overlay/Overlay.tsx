import { PropsWithChildren } from 'react'

import { createPortal } from 'react-dom'

import { Container } from './styled'

const portal = document.querySelector('#root')

const Overlay = ({ children }: PropsWithChildren<unknown>) => {
    return portal ? (
        createPortal(<Container>{children}</Container>, portal)
    ) : (
        <Container>{children}</Container>
    )
}

export default Overlay
