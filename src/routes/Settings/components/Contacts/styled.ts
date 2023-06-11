import { lighten } from 'polished'
import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`

export const ContactRow = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 12px;
    align-items: flex-end;
`

export const AddRow = styled.div`
    display: grid;
    grid-template-columns: auto 1fr 1fr;
    gap: 12px;
    align-items: flex-end;
    margin-bottom: 12px;
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

export const Button = styled.button<{ disabled?: boolean }>`
    height: 30px;
    width: 30px;
    border: 0;
    outline: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transform: translateY(-6px);
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
