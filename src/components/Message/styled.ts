import FeaterIcon from 'feather-react'
import styled from 'styled-components'

import { MessageProps } from '@gitcv/components/Message/types'

export const Icon = styled(FeaterIcon)`
    color: ${(props) => props.theme.colors.dark};
`

export const Container = styled.div<MessageProps>`
    display: grid;
    grid-template-columns: 20px 1fr;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 8px;

    & ${Icon} {
        transform: translateY(
            ${(props) => (props.align === 'center' ? 0 : 2)}px
        );
    }
`

export const Text = styled.span`
    margin: 0;
    line-height: 18px;
    color: ${(props) => props.theme.colors.medium};
    vertical-align: top;
    font-size: 13px;
`
