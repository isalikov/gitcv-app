import { PropsWithChildren } from 'react'

import { Container, Text, Icon } from './styled'
import { MessageProps } from './types'

const Message = ({
    children,
    align = 'top',
}: PropsWithChildren<MessageProps>) => {
    return (
        <Container align={align}>
            <Icon size={20} name="info" />
            <Text>{children}</Text>
        </Container>
    )
}

export default Message
