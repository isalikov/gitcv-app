import { lighten } from 'polished'
import styled from 'styled-components'

export const Container = styled.div<{ width: number }>`
    display: grid;
    background-color: ${(props) => props.theme.colors.empty};
    width: ${(props) => props.width}px;
    border-radius: 12px;
    box-shadow: ${(props) => props.theme.shadow};
`

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    height: 50px;
    padding: 0 24px;
    align-items: center;
`

export const Body = styled.div`
    display: flex;
    padding: 24px;
`

export const Footer = styled.div`
    border-top: 1px dotted ${(props) => props.theme.colors.light};
    height: 68px;
    display: flex;
    justify-content: flex-end;
    padding: 0 24px;
    align-items: center;
    background-color: ${(props) => lighten(0.14, props.theme.colors.light)};
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
`

export const Title = styled.span`
    color: ${(props) => props.theme.colors.dark};
    font-size: 16px;
    font-weight: 500;
`

export const CloseButton = styled.button`
    background-color: transparent;
    border: 0;
    outline: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;

    &:hover {
        background-color: ${(props) => lighten(0.12, props.theme.colors.light)};
    }
`
