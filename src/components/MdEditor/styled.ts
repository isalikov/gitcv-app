import { lighten } from 'polished'
import styled from 'styled-components'

export const Container = styled.div`
    display: grid;
    outline: 1px solid ${(props) => props.theme.colors.light};
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;

    .cm-focused {
        outline: 0 !important;
    }

    .cm-gutter {
        width: 62px;
    }

    .cm-lineNumbers {
        padding: 0 10px 0 0;
    }
`

export const Header = styled.div`
    display: flex;
    background-color: ${(props) => lighten(0.1, props.theme.colors.light)};
    align-items: center;
`

export const ModeActions = styled.div`
    display: flex;
    align-items: center;
`

export const ModeControl = styled.button<{ active: boolean }>`
    display: flex;
    gap: 6px;
    font-size: 14px;
    align-items: center;
    height: 48px;
    background-color: ${(props) =>
        props.active ? props.theme.colors.empty : 'transparent'};
    border: 0;
    outline: 0;
    padding: 0 24px;
`

export const Preview = styled.div`
    padding: 24px;

    ul {
        list-style: none;
        padding-left: 0;

        & li:before {
            display: inline-block;
            content: '—';
            width: 20px;
        }
    }

    ol {
        list-style: decimal;
        padding-left: 20px;
    }

    input[type='checkbox'] {
        margin: 0 !important;
        transform: translateY(-1px);
    }
`
