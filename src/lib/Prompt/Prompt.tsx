import { PropsWithChildren } from 'react'

import Icon from 'feather-react'

import { Button } from 'primereact/button'

import { useLocale } from '@gitcv/hooks'

import { Container, Body, Footer, Header, Title, CloseButton } from './styled'
import { PromptProps } from './types'

const Prompt = ({
    children,
    disabled,
    loading,
    onDismiss,
    onSubmit,
    title,
    width = 490,
}: PropsWithChildren<PromptProps>) => {
    const { getMessage } = useLocale()

    return (
        <Container width={width}>
            <Header>
                <Title>{title}</Title>
                <CloseButton type="button" onClick={onDismiss}>
                    <Icon name="x" />
                </CloseButton>
            </Header>

            <Body>{children}</Body>
            <Footer>
                <Button
                    disabled={disabled}
                    loading={loading}
                    size="small"
                    type="button"
                    onClick={onSubmit}
                >
                    {getMessage('label.generate')}
                </Button>
            </Footer>
        </Container>
    )
}

export default Prompt
