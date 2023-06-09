import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import PrimeReact from 'primereact/api'

import styled, { createGlobalStyle } from 'styled-components'

PrimeReact.cssTransition = true
PrimeReact.ripple = true

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
        font-family: 'Hanken Grotesk', sans-serif;
        font-weight: 400;
        font-size: 14px;
        line-height: normal;

        color: ${(props) => props.theme.colors.dark};
        background-color: ${(props) => props.theme.colors.empty};
    }
`

export const Container = styled.div`
    display: grid;
    grid-template-columns: 61px 1fr;
`
