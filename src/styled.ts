import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    a, button {
        cursor: pointer;
    }

    ol, ul, menu {
        list-style: none;
    }

    img {
        max-inline-size: 100%;
        max-block-size: 100%;
    }

    table {
        border-collapse: collapse;
    }

    input, textarea {
        -webkit-user-select: auto;
    }

    textarea {
        white-space: revert;
    }

    meter {
        -webkit-appearance: revert;
        appearance: revert;
    }

    ::placeholder {
        color: unset;
    }

    ::marker {
        content: initial;
    }

    html, body {
        padding: 0;
        margin: 0;
        height: 100vh;
        width: 100vw;
        overflow-y: auto;
    }

    body {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 13px;
        line-height: 24px;

        color: ${(props) => props.theme.colors.typo.default};
        background-color: ${(props) => props.theme.colors.bg.default};
    }
`

export const Container = styled.div`
    display: grid;
`
