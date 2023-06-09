import { lighten } from 'polished'
import styled from 'styled-components'

export const Container = styled.div`
    display: grid;
    grid-template-rows: 48px 1fr;
    padding: 24px;
    border: 1px solid ${(props) => lighten(0.1, props.theme.colors.light)};
    border-radius: 12px;
`

export const Title = styled.span`
    font-size: 16px;
    font-weight: 500;
`

export const Body = styled.div`
    display: flex;
    flex-direction: column;
`
