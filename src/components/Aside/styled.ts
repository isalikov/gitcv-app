import { lighten } from 'polished'
import styled from 'styled-components'

export const Container = styled.aside`
    display: flex;
    flex-direction: column;
    height: 100vh;
    border-right: 1px solid ${(props) => props.theme.colors.light};
`

export const AsideButton = styled.button<{ isActive?: boolean }>`
    width: 61px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    outline: 0;
    border-right: 1px solid
        ${(props) =>
            props.isActive
                ? props.theme.colors.action
                : props.theme.colors.light};

    color: ${(props) =>
        props.isActive ? props.theme.colors.empty : props.theme.colors.dark};

    background-color: ${(props) =>
        props.isActive ? props.theme.colors.action : 'transparent'};

    &:hover {
        background: ${(props) =>
            props.isActive
                ? props.theme.colors.action
                : lighten(0.12, props.theme.colors.light)};
    }
`
