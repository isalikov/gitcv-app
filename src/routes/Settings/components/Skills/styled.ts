import { lighten } from 'polished'
import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`

export const Row = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 12px;
    align-items: center;
`

export const Title = styled.span`
    font-size: 15px;
    font-weight: 500;
`

export const Button = styled.button<{ disabled?: boolean }>`
    height: 30px;
    width: 30px;
    border: 0;
    outline: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: transparent;
    transition: background-color 0.2s ease-in-out;
    opacity: ${(props) => (props.disabled ? 0.5 : 1)};
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};

    &:hover {
        background-color: ${(props) =>
            props.disabled
                ? 'transparent'
                : lighten(0.13, props.theme.colors.light)};
    }
`
