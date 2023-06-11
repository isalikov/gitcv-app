import { PropsWithChildren } from 'react'

import { Container, Text, Icon } from './styled'

const Message = ({ children }: PropsWithChildren<unknown>) => {
    return (
        <Container>
            <Icon size={20} name="info" />
            <Text>{children}</Text>
        </Container>
    )
}

export default Message
