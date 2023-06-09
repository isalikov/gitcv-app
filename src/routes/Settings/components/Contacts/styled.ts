import { Button as ButtonComponent } from 'primereact/button'
import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`

export const Header = styled.div`
    display: flex;
    margin-bottom: 12px;
`

export const ContactRow = styled.div`
    display: flex;
    align-items: flex-end;
    gap: 12px;
    height: 62px;
`

export const HeaderRow = styled.div`
    display: flex;
    gap: 12px;
    height: 62px;
    align-items: center;
`

export const ContactLabel = styled.span`
    color: ${(props) => props.theme.colors.medium};
    font-size: 12px;
`

export const ContactContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`

export const Button = styled(ButtonComponent)`
    transform: translateY(3px);
`
